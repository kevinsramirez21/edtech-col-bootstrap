import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AssociateData {
  id: string;
  nombre_empresa: string;
  pagina_web: string | null;
  descripcion: string | null;
  linkedin: string | null;
  logo_url: string | null;
  servicios: string[] | null;
}

interface EnrichmentResult {
  campo: string;
  valor_sugerido: string | null;
  confianza: "alta" | "media" | "baja";
  fuente: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Parse request body - now supports force_fields parameter
    const { asociado_id, force_fields } = await req.json();
    // force_fields: string[] - optional array of fields to force re-search
    // Example: ["logo_url"] - will search logo even if it already has data
    // Example: ["linkedin", "servicios"] - will search both fields

    if (!asociado_id) {
      throw new Error("asociado_id is required");
    }

    console.log(`Request for ${asociado_id}, force_fields:`, force_fields);

    // Get associate data
    const { data: associate, error: fetchError } = await supabase
      .from("asociados")
      .select("id, nombre_empresa, pagina_web, descripcion, linkedin, logo_url, servicios")
      .eq("id", asociado_id)
      .single();

    if (fetchError || !associate) {
      throw new Error(`Associate not found: ${fetchError?.message}`);
    }

    // Check for existing high-confidence approved enrichments
    const { data: existingEnrichments } = await supabase
      .from("asociados_enrichment")
      .select("campo, confianza, aprobado")
      .eq("asociado_id", asociado_id)
      .eq("aprobado", true)
      .eq("confianza", "alta");

    // Get fields that already have high-confidence approved data
    const completedFields = new Set(
      (existingEnrichments || []).map((e: any) => e.campo)
    );

    // Also check if field already has data in the associate record
    const fieldsWithData = new Set<string>();
    if (associate.linkedin) fieldsWithData.add("linkedin");
    if (associate.logo_url) fieldsWithData.add("logo_url");
    if (associate.servicios && associate.servicios.length > 0) fieldsWithData.add("servicios");

    // Combine completed fields with fields that already have data
    const skipFields = new Set([...completedFields, ...fieldsWithData]);

    // Determine which fields to enrich
    const allFields = ["linkedin", "logo_url", "servicios"];
    
    // If force_fields is provided, use those (allows re-searching existing data)
    // Otherwise, only search fields that don't have data
    let fieldsToEnrich: string[];
    
    if (force_fields && Array.isArray(force_fields) && force_fields.length > 0) {
      // Validate that force_fields contains valid field names
      fieldsToEnrich = force_fields.filter(f => allFields.includes(f));
      console.log(`Forcing enrichment of fields: ${fieldsToEnrich.join(", ")}`);
    } else {
      // Default behavior: only enrich empty fields
      fieldsToEnrich = allFields.filter(f => !skipFields.has(f));
    }

    if (fieldsToEnrich.length === 0) {
      console.log(`All fields already complete for: ${associate.nombre_empresa}`);
      return new Response(JSON.stringify({
        success: true,
        nombre_empresa: associate.nombre_empresa,
        enrichments_count: 0,
        message: "All fields already have data or high-confidence approved suggestions",
        enrichments: []
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Enriching data for: ${associate.nombre_empresa}`);
    console.log(`Fields to enrich: ${fieldsToEnrich.join(", ")}`);

    // Build dynamic prompt based on fields to enrich
    const fieldInstructions: string[] = [];
    if (fieldsToEnrich.includes("linkedin")) {
      fieldInstructions.push("1. LinkedIn de la empresa (URL completa del perfil de empresa en linkedin.com/company/...)");
    }
    if (fieldsToEnrich.includes("logo_url")) {
      fieldInstructions.push(`2. Logo de la empresa - MUY IMPORTANTE:
   - PRIORIDAD 1: Busca el logo en el sitio web oficial de la empresa (og:image, /logo.png, /images/logo.svg, etc.)
   - PRIORIDAD 2: Busca logos en CDNs públicos como Clearbit (https://logo.clearbit.com/dominio.com)
   - PRIORIDAD 3: Solo si no hay otra opción, busca en directorios como Crunchbase
   - La URL debe ser PERMANENTE y directa a una imagen (.png, .jpg, .svg, .webp)
   - NUNCA uses URLs de LinkedIn/media.licdn.com (expiran rápidamente)
   - NUNCA uses URLs con parámetros de expiración (?e=, ?expires=, etc.)
   - NO uses URLs de favicon.ico (son muy pequeños)
   - Si solo encuentras URLs temporales, marca confianza como "baja"`);
    }
    if (fieldsToEnrich.includes("servicios")) {
      fieldInstructions.push("3. Servicios principales que ofrece (lista de 3-5 servicios relacionados con educación/tecnología)");
    }

    const prompt = `Investiga la empresa EdTech colombiana "${associate.nombre_empresa}".
${associate.pagina_web ? `Sitio web oficial: ${associate.pagina_web}` : "No tiene sitio web registrado."}
${associate.descripcion ? `Descripción actual: ${associate.descripcion}` : ""}

Busca y verifica la siguiente información:
${fieldInstructions.join("\n")}

IMPORTANTE: Solo reporta información que puedas verificar. Si no encuentras algo con certeza, indícalo.`;

    // Build dynamic tool properties based on fields to enrich
    const toolProperties: Record<string, any> = {};
    const requiredFields: string[] = [];

    if (fieldsToEnrich.includes("linkedin")) {
      toolProperties.linkedin = {
        type: "object",
        properties: {
          url: { type: "string", description: "URL completa del LinkedIn de la empresa (formato: https://linkedin.com/company/nombre)" },
          confianza: { type: "string", enum: ["alta", "media", "baja"] },
          fuente: { type: "string", description: "Donde se encontró esta información" }
        },
        required: ["confianza", "fuente"]
      };
      requiredFields.push("linkedin");
    }

    if (fieldsToEnrich.includes("logo_url")) {
      toolProperties.logo_url = {
        type: "object",
        properties: {
          url: { type: "string", description: "URL PERMANENTE directa a la imagen del logo. NUNCA uses URLs de media.licdn.com (LinkedIn) porque expiran. Usa URLs del sitio oficial o Clearbit (https://logo.clearbit.com/dominio.com). Debe terminar en .png, .jpg, .svg o .webp" },
          confianza: { type: "string", enum: ["alta", "media", "baja"], description: "Marca 'baja' si la URL es temporal o de LinkedIn" },
          fuente: { type: "string", description: "Indica si es del sitio oficial, Clearbit, u otra fuente. Si es temporal, indícalo explícitamente." }
        },
        required: ["confianza", "fuente"]
      };
      requiredFields.push("logo_url");
    }

    if (fieldsToEnrich.includes("servicios")) {
      toolProperties.servicios = {
        type: "object",
        properties: {
          lista: { type: "array", items: { type: "string" }, description: "Lista de servicios principales" },
          confianza: { type: "string", enum: ["alta", "media", "baja"] },
          fuente: { type: "string", description: "Donde se encontró esta información" }
        },
        required: ["confianza", "fuente"]
      };
      requiredFields.push("servicios");
    }

    // Call Lovable AI with tool calling for structured output
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Eres un investigador experto en empresas de tecnología educativa (EdTech) de Colombia y Latinoamérica.

CONTEXTO IMPORTANTE:
- Todas las empresas que investigas son EdTechs (empresas de tecnología educativa) colombianas o con operaciones en Colombia.
- Son empresas asociadas a Colombia EdTech, la asociación de empresas de tecnología educativa de Colombia.
- Busca específicamente perfiles de empresas relacionadas con: educación, e-learning, capacitación digital, plataformas educativas, LMS, gamificación educativa, contenidos digitales de aprendizaje, tutorías online, etc.
- Si encuentras varias empresas con el mismo nombre, SIEMPRE prioriza la que tenga relación con el sector educativo/EdTech en Colombia.

REGLAS CRÍTICAS PARA LOGOS:
- PRIORIDAD 1: Logo del sitio web oficial de la empresa (og:image, /logo.png, /assets/logo.svg, header del sitio)
- PRIORIDAD 2: Clearbit Logo API (https://logo.clearbit.com/dominio.com) - URLs permanentes
- PRIORIDAD 3: Logos en directorios públicos como Crunchbase (solo si tienen URLs permanentes)
- NUNCA uses URLs de LinkedIn (media.licdn.com) - estas expiran y dejan de funcionar
- NUNCA uses URLs con parámetros de expiración (?e=, ?expires=, ?v=beta, etc.)
- La URL debe ser PERMANENTE y apuntar directamente a un archivo de imagen (.png, .jpg, .svg, .webp)
- NO uses URLs de favicon.ico (son muy pequeños, menos de 64x64px)
- NO uses URLs de páginas HTML, solo de imágenes
- Si solo encuentras URLs temporales (como las de LinkedIn), indica confianza "baja" y explica en la fuente que es temporal

REGLAS GENERALES:
- Solo reporta datos que puedas confirmar con certeza
- Prioriza fuentes oficiales (sitio web de la empresa, LinkedIn oficial)
- Para cada dato indica la fuente exacta donde lo encontraste
- Si no estás seguro de un dato o no lo encuentras, marca la confianza como "baja"
- Las URLs deben ser completas (https://...)
- Para servicios, extrae los principales relacionados con educación/EdTech`
          },
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report_company_info",
              description: "Reporta la información encontrada sobre la empresa",
              parameters: {
                type: "object",
                properties: toolProperties,
                required: requiredFields
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "report_company_info" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI request failed: ${response.status}`);
    }

    const aiResponse = await response.json();
    console.log("AI Response:", JSON.stringify(aiResponse, null, 2));

    // Extract tool call result
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const companyInfo = JSON.parse(toolCall.function.arguments);
    console.log("Parsed company info:", JSON.stringify(companyInfo, null, 2));

    // Prepare enrichment records
    const enrichments: EnrichmentResult[] = [];

    // LinkedIn
    if (companyInfo.linkedin?.url && companyInfo.linkedin.url !== "No disponible") {
      enrichments.push({
        campo: "linkedin",
        valor_sugerido: companyInfo.linkedin.url,
        confianza: companyInfo.linkedin.confianza,
        fuente: companyInfo.linkedin.fuente
      });
    }

    // Logo
    if (companyInfo.logo_url?.url && companyInfo.logo_url.url !== "No disponible") {
      enrichments.push({
        campo: "logo_url",
        valor_sugerido: companyInfo.logo_url.url,
        confianza: companyInfo.logo_url.confianza,
        fuente: companyInfo.logo_url.fuente
      });
    }

    // Servicios
    if (companyInfo.servicios?.lista?.length > 0) {
      enrichments.push({
        campo: "servicios",
        valor_sugerido: JSON.stringify(companyInfo.servicios.lista),
        confianza: companyInfo.servicios.confianza,
        fuente: companyInfo.servicios.fuente
      });
    }

    // Save enrichments to database using upsert
    if (enrichments.length > 0) {
      for (const enrichment of enrichments) {
        const { error: upsertError } = await supabase
          .from("asociados_enrichment")
          .upsert({
            asociado_id: associate.id,
            campo: enrichment.campo,
            valor_actual: enrichment.campo === "servicios" 
              ? JSON.stringify(associate.servicios || [])
              : (associate as any)[enrichment.campo] || null,
            valor_sugerido: enrichment.valor_sugerido,
            confianza: enrichment.confianza,
            fuente: enrichment.fuente,
            verificado: false,
            aprobado: null
          }, {
            onConflict: "asociado_id,campo"
          });

        if (upsertError) {
          console.error(`Error upserting enrichment for ${enrichment.campo}:`, upsertError);
        }
      }
    }

    console.log(`Found ${enrichments.length} enrichment suggestions for ${associate.nombre_empresa}`);

    return new Response(JSON.stringify({
      success: true,
      nombre_empresa: associate.nombre_empresa,
      enrichments_count: enrichments.length,
      enrichments
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in enrich-associate:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
