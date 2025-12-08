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
  twitter: string | null;
  logo_url: string | null;
  servicios: string[] | null;
  tamano_empresa: string | null;
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

    const { asociado_id } = await req.json();

    if (!asociado_id) {
      throw new Error("asociado_id is required");
    }

    // Get associate data
    const { data: associate, error: fetchError } = await supabase
      .from("asociados")
      .select("id, nombre_empresa, pagina_web, descripcion, linkedin, twitter, logo_url, servicios, tamano_empresa")
      .eq("id", asociado_id)
      .single();

    if (fetchError || !associate) {
      throw new Error(`Associate not found: ${fetchError?.message}`);
    }

    console.log(`Enriching data for: ${associate.nombre_empresa}`);

    // Build prompt for AI research
    const prompt = `Investiga la empresa EdTech colombiana "${associate.nombre_empresa}".
${associate.pagina_web ? `Sitio web oficial: ${associate.pagina_web}` : "No tiene sitio web registrado."}
${associate.descripcion ? `Descripción actual: ${associate.descripcion}` : ""}

Busca y verifica la siguiente información:
1. LinkedIn de la empresa (URL completa del perfil de empresa)
2. Twitter/X de la empresa (URL completa)
3. Logo de la empresa (URL directa a imagen, preferiblemente del sitio oficial)
4. Servicios principales que ofrece (lista de 3-5 servicios)
5. Tamaño de la empresa (startup, pequeña, mediana, grande)

IMPORTANTE: Solo reporta información que puedas verificar. Si no encuentras algo con certeza, indícalo.`;

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

REGLAS:
- Solo reporta datos que puedas confirmar con certeza
- Prioriza fuentes oficiales (sitio web de la empresa, LinkedIn oficial, redes sociales oficiales)
- Para cada dato indica la fuente exacta donde lo encontraste
- Si no estás seguro de un dato o no lo encuentras, marca la confianza como "baja"
- Las URLs deben ser completas (https://...)
- Para servicios, extrae los principales relacionados con educación/EdTech del sitio web
- Para tamaño, usa: "startup" (<10 empleados), "pequeña" (10-50), "mediana" (50-200), "grande" (>200)`
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
                properties: {
                  linkedin: {
                    type: "object",
                    properties: {
                      url: { type: "string", description: "URL completa del LinkedIn de la empresa" },
                      confianza: { type: "string", enum: ["alta", "media", "baja"] },
                      fuente: { type: "string", description: "Donde se encontró esta información" }
                    },
                    required: ["confianza", "fuente"]
                  },
                  twitter: {
                    type: "object",
                    properties: {
                      url: { type: "string", description: "URL completa del Twitter/X de la empresa" },
                      confianza: { type: "string", enum: ["alta", "media", "baja"] },
                      fuente: { type: "string", description: "Donde se encontró esta información" }
                    },
                    required: ["confianza", "fuente"]
                  },
                  logo_url: {
                    type: "object",
                    properties: {
                      url: { type: "string", description: "URL directa al logo de la empresa" },
                      confianza: { type: "string", enum: ["alta", "media", "baja"] },
                      fuente: { type: "string", description: "Donde se encontró esta información" }
                    },
                    required: ["confianza", "fuente"]
                  },
                  servicios: {
                    type: "object",
                    properties: {
                      lista: { type: "array", items: { type: "string" }, description: "Lista de servicios principales" },
                      confianza: { type: "string", enum: ["alta", "media", "baja"] },
                      fuente: { type: "string", description: "Donde se encontró esta información" }
                    },
                    required: ["confianza", "fuente"]
                  },
                  tamano_empresa: {
                    type: "object",
                    properties: {
                      valor: { type: "string", enum: ["startup", "pequena", "mediana", "grande"] },
                      confianza: { type: "string", enum: ["alta", "media", "baja"] },
                      fuente: { type: "string", description: "Donde se encontró esta información" }
                    },
                    required: ["confianza", "fuente"]
                  }
                },
                required: ["linkedin", "twitter", "logo_url", "servicios", "tamano_empresa"]
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
    if (companyInfo.linkedin?.url && companyInfo.linkedin.url !== associate.linkedin) {
      enrichments.push({
        campo: "linkedin",
        valor_sugerido: companyInfo.linkedin.url,
        confianza: companyInfo.linkedin.confianza,
        fuente: companyInfo.linkedin.fuente
      });
    }

    // Twitter
    if (companyInfo.twitter?.url && companyInfo.twitter.url !== associate.twitter) {
      enrichments.push({
        campo: "twitter",
        valor_sugerido: companyInfo.twitter.url,
        confianza: companyInfo.twitter.confianza,
        fuente: companyInfo.twitter.fuente
      });
    }

    // Logo
    if (companyInfo.logo_url?.url && companyInfo.logo_url.url !== associate.logo_url) {
      enrichments.push({
        campo: "logo_url",
        valor_sugerido: companyInfo.logo_url.url,
        confianza: companyInfo.logo_url.confianza,
        fuente: companyInfo.logo_url.fuente
      });
    }

    // Servicios
    if (companyInfo.servicios?.lista?.length > 0) {
      const serviciosStr = JSON.stringify(companyInfo.servicios.lista);
      const currentServiciosStr = JSON.stringify(associate.servicios || []);
      if (serviciosStr !== currentServiciosStr) {
        enrichments.push({
          campo: "servicios",
          valor_sugerido: serviciosStr,
          confianza: companyInfo.servicios.confianza,
          fuente: companyInfo.servicios.fuente
        });
      }
    }

    // Tamaño empresa
    if (companyInfo.tamano_empresa?.valor && companyInfo.tamano_empresa.valor !== associate.tamano_empresa) {
      enrichments.push({
        campo: "tamano_empresa",
        valor_sugerido: companyInfo.tamano_empresa.valor,
        confianza: companyInfo.tamano_empresa.confianza,
        fuente: companyInfo.tamano_empresa.fuente
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
