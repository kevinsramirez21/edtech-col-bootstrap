import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    // === AUTHENTICATION CHECK ===
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("Missing Authorization header");
      return new Response(JSON.stringify({ error: "Unauthorized: No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const jwt = authHeader.replace("Bearer ", "");
    
    const supabaseAuth = createClient(SUPABASE_URL!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${jwt}` } }
    });
    
    const { data: userData, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !userData?.user) {
      console.error("Auth error:", authError?.message);
      return new Response(JSON.stringify({ error: "Unauthorized: Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: isAdmin, error: roleError } = await supabaseAuth.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "administrador"
    });

    if (roleError || !isAdmin) {
      console.error("Role check failed:", roleError?.message, "isAdmin:", isAdmin);
      return new Response(JSON.stringify({ error: "Forbidden: Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Authenticated admin user: ${userData.user.email}`);
    // === END AUTHENTICATION CHECK ===

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { asociado_id, feedback_messages, fields } = await req.json();

    if (!asociado_id) {
      throw new Error("asociado_id is required");
    }

    console.log(`Enriching ${asociado_id} with feedback context`);
    console.log(`Feedback messages:`, feedback_messages);
    console.log(`Fields to enrich:`, fields);

    // Get associate data
    const { data: associate, error: fetchError } = await supabase
      .from("asociados")
      .select("id, nombre_empresa, pagina_web, descripcion, linkedin, logo_url, servicios, tipo_organizacion, correo_contacto")
      .eq("id", asociado_id)
      .single();

    if (fetchError || !associate) {
      throw new Error(`Associate not found: ${fetchError?.message}`);
    }

    // Build context from feedback
    const feedbackContext = feedback_messages && feedback_messages.length > 0
      ? `\n\n### CONTEXTO IMPORTANTE DEL ASOCIADO:\nEl administrador ha registrado el siguiente feedback de comunicaciones con esta empresa:\n${feedback_messages.map((m: string, i: number) => `${i + 1}. "${m}"`).join("\n")}\n\nUSA ESTE FEEDBACK para guiar tus sugerencias. Si el asociado pidió cambios específicos, prioriza esos datos.`
      : "";

    const fieldsToEnrich = fields || ["linkedin", "logo_url", "servicios", "tipo_organizacion", "correo_contacto"];

    // Build dynamic prompt based on fields to enrich
    const fieldInstructions: string[] = [];
    if (fieldsToEnrich.includes("linkedin")) {
      fieldInstructions.push("1. LinkedIn de la empresa (URL completa del perfil de empresa en linkedin.com/company/...)");
    }
    if (fieldsToEnrich.includes("logo_url")) {
      fieldInstructions.push(`2. Logo de la empresa - Busca en el sitio web oficial primero. La URL debe ser PERMANENTE y directa a una imagen.`);
    }
    if (fieldsToEnrich.includes("servicios")) {
      fieldInstructions.push("3. Servicios principales que ofrece (lista de 3-5 servicios relacionados con educación/tecnología)");
    }
    if (fieldsToEnrich.includes("tipo_organizacion")) {
      fieldInstructions.push(`4. Tipos de organización - Puede pertenecer a una o más de estas categorías:
   - "K12 (Colegios)", "Educación Superior", "Educación para la Vida", "Cajas de Compensación", "Universidades"`);
    }
    if (fieldsToEnrich.includes("correo_contacto")) {
      fieldInstructions.push("5. Correo electrónico de contacto - Busca en la página de contacto, footer, o información de la empresa. Debe ser un email válido.");
    }

    const prompt = `Investiga la empresa EdTech colombiana "${associate.nombre_empresa}".
${associate.pagina_web ? `Sitio web oficial: ${associate.pagina_web}` : "No tiene sitio web registrado."}
${associate.descripcion ? `Descripción actual: ${associate.descripcion}` : ""}

Datos actuales:
- LinkedIn: ${associate.linkedin || "No registrado"}
- Logo: ${associate.logo_url || "No registrado"}
- Servicios: ${associate.servicios?.join(", ") || "No registrados"}
- Tipo organización: ${associate.tipo_organizacion || "No clasificado"}
- Correo contacto: ${associate.correo_contacto || "No registrado"}
${feedbackContext}

Busca y verifica la siguiente información:
${fieldInstructions.join("\n")}

IMPORTANTE: 
- Considera el feedback del asociado como prioridad máxima.
- Solo reporta información que puedas verificar.
- Si el feedback menciona algo específico que el asociado quiere cambiar, incluye esa información.`;

    // Build dynamic tool properties
    const toolProperties: Record<string, unknown> = {};
    const requiredFields: string[] = [];

    if (fieldsToEnrich.includes("linkedin")) {
      toolProperties.linkedin = {
        type: "object",
        properties: {
          url: { type: "string", description: "URL completa del LinkedIn de la empresa" },
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
          url: { type: "string", description: "URL permanente de la imagen del logo" },
          confianza: { type: "string", enum: ["alta", "media", "baja"] },
          fuente: { type: "string" }
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

    if (fieldsToEnrich.includes("tipo_organizacion")) {
      toolProperties.tipo_organizacion = {
        type: "object",
        properties: {
          categorias: { 
            type: "array",
            items: {
              type: "string", 
              enum: ["K12 (Colegios)", "Educación Superior", "Educación para la Vida", "Cajas de Compensación", "Universidades"]
            },
            description: "Lista de categorías a las que pertenece la organización"
          },
          confianza: { type: "string", enum: ["alta", "media", "baja"] },
          fuente: { type: "string", description: "Donde se encontró esta información" }
        },
        required: ["categorias", "confianza", "fuente"]
      };
      requiredFields.push("tipo_organizacion");
    }

    if (fieldsToEnrich.includes("correo_contacto")) {
      toolProperties.correo_contacto = {
        type: "object",
        properties: {
          email: { type: "string", description: "Correo electrónico de contacto" },
          confianza: { type: "string", enum: ["alta", "media", "baja"] },
          fuente: { type: "string", description: "Donde se encontró esta información" }
        },
        required: ["confianza", "fuente"]
      };
      requiredFields.push("correo_contacto");
    }

    // Call Lovable AI
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
            content: `Eres un investigador experto en empresas de tecnología educativa (EdTech) de Colombia.
Solo reporta datos que puedas confirmar con certeza.
Prioriza fuentes oficiales (sitio web de la empresa, LinkedIn oficial).
Para cada dato indica la fuente exacta donde lo encontraste.
Las URLs deben ser completas (https://...).
IMPORTANTE: Si hay feedback del asociado, úsalo para guiar tu investigación y priorizar los cambios que el asociado solicitó.`
          },
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report_company_info",
              description: "Reporta la información encontrada sobre la empresa, considerando el feedback del asociado",
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

    interface EnrichmentResult {
      campo: string;
      opciones: Array<{
        valor: string;
        confianza: string;
        fuente: string;
      }>;
    }

    const enrichments: EnrichmentResult[] = [];

    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall) {
      const companyInfo = JSON.parse(toolCall.function.arguments);
      console.log("Parsed company info:", JSON.stringify(companyInfo, null, 2));

      // LinkedIn
      if (companyInfo.linkedin?.url && companyInfo.linkedin.url !== "No disponible") {
        enrichments.push({
          campo: "linkedin",
          opciones: [{
            valor: companyInfo.linkedin.url,
            confianza: companyInfo.linkedin.confianza,
            fuente: companyInfo.linkedin.fuente
          }]
        });
      }

      // Logo
      if (companyInfo.logo_url?.url && companyInfo.logo_url.url !== "No disponible") {
        enrichments.push({
          campo: "logo_url",
          opciones: [{
            valor: companyInfo.logo_url.url,
            confianza: companyInfo.logo_url.confianza,
            fuente: companyInfo.logo_url.fuente
          }]
        });
      }

      // Servicios
      if (companyInfo.servicios?.lista?.length > 0) {
        enrichments.push({
          campo: "servicios",
          opciones: [{
            valor: JSON.stringify(companyInfo.servicios.lista),
            confianza: companyInfo.servicios.confianza,
            fuente: companyInfo.servicios.fuente
          }]
        });
      }

      // Tipo de Organización
      if (companyInfo.tipo_organizacion?.categorias?.length > 0) {
        enrichments.push({
          campo: "tipo_organizacion",
          opciones: [{
            valor: JSON.stringify(companyInfo.tipo_organizacion.categorias),
            confianza: companyInfo.tipo_organizacion.confianza,
            fuente: companyInfo.tipo_organizacion.fuente
          }]
        });
      }

      // Correo de contacto
      if (companyInfo.correo_contacto?.email && companyInfo.correo_contacto.email !== "No disponible") {
        enrichments.push({
          campo: "correo_contacto",
          opciones: [{
            valor: companyInfo.correo_contacto.email,
            confianza: companyInfo.correo_contacto.confianza,
            fuente: companyInfo.correo_contacto.fuente
          }]
        });
      }
    }

    // Store AI response in feedback
    if (enrichments.length > 0) {
      const aiSummary = enrichments.map(e => `${e.campo}: ${e.opciones[0]?.valor}`).join("\n");
      await supabase
        .from("asociados_feedback")
        .insert({
          asociado_id,
          mensaje: `🤖 Sugerencias encontradas:\n${aiSummary}`,
          rol: "asistente",
          contexto_usado: true
        });
    }

    const totalOptions = enrichments.reduce((sum, e) => sum + e.opciones.length, 0);
    console.log(`Found ${enrichments.length} fields with ${totalOptions} total options for ${associate.nombre_empresa}`);

    return new Response(JSON.stringify({
      success: true,
      nombre_empresa: associate.nombre_empresa,
      enrichments_count: enrichments.length,
      total_options: totalOptions,
      enrichments,
      used_feedback: feedback_messages?.length > 0
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in enrich-with-feedback:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
