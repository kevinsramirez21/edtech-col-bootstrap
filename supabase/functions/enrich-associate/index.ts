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
  tipo_organizacion: string | null;
  correo_contacto: string | null;
}

// Organization type categories
const ORGANIZATION_TYPES = [
  "K12 (Colegios)",
  "Educación Superior",
  "Educación para la Vida",
  "Cajas de Compensación",
  "Universidades"
] as const;

interface EnrichmentOption {
  valor: string;
  confianza: "alta" | "media" | "baja";
  fuente: string;
}

interface EnrichmentResult {
  campo: string;
  opciones: EnrichmentOption[];
}

interface LogoSearchResult {
  url: string;
  confianza: "alta" | "media" | "baja";
  fuente: string;
}

// Extract domain from URL
function extractDomain(url: string | null): string | null {
  if (!url) return null;
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

// Verify if a URL returns a valid image
async function verifyImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { 
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LogoFinder/1.0)"
      }
    });
    
    if (!response.ok) return false;
    
    const contentType = response.headers.get("content-type") || "";
    return contentType.startsWith("image/");
  } catch (error) {
    console.log(`Failed to verify image URL ${url}:`, error);
    return false;
  }
}

// Try Clearbit Logo API
async function tryClearbit(domain: string): Promise<LogoSearchResult | null> {
  const clearbitUrl = `https://logo.clearbit.com/${domain}`;
  console.log(`Trying Clearbit for domain: ${domain}`);
  
  const isValid = await verifyImageUrl(clearbitUrl);
  if (isValid) {
    console.log(`✓ Clearbit logo found for ${domain}`);
    return {
      url: clearbitUrl,
      confianza: "alta",
      fuente: "Clearbit Logo API (verificado)"
    };
  }
  
  console.log(`✗ Clearbit logo not found for ${domain}`);
  return null;
}

// Scrape website for ALL potential logos (returns array)
async function scrapeWebsiteForLogos(websiteUrl: string, domain: string): Promise<LogoSearchResult[]> {
  console.log(`Scraping website for logos: ${websiteUrl}`);
  const results: LogoSearchResult[] = [];
  const seenUrls = new Set<string>();
  
  try {
    const response = await fetch(websiteUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LogoFinder/1.0)"
      }
    });
    
    if (!response.ok) {
      console.log(`Failed to fetch website: ${response.status}`);
      return results;
    }
    
    const html = await response.text();
    const baseUrl = websiteUrl.endsWith("/") ? websiteUrl.slice(0, -1) : websiteUrl;
    
    // List of logo patterns to search (in order of priority)
    const logoPatterns: { regex: RegExp; name: string; confianza: "alta" | "media" | "baja" }[] = [
      // og:image meta tag
      { regex: /<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/gi, name: "og:image", confianza: "alta" },
      { regex: /<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/gi, name: "og:image", confianza: "alta" },
      // Twitter image
      { regex: /<meta\s+(?:property|name)=["']twitter:image["']\s+content=["']([^"']+)["']/gi, name: "twitter:image", confianza: "alta" },
      // Apple touch icon (usually high quality)
      { regex: /<link\s+[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/gi, name: "apple-touch-icon", confianza: "alta" },
      // High-res favicon
      { regex: /<link\s+[^>]*rel=["']icon["'][^>]*sizes=["'](?:192x192|180x180|152x152|144x144|128x128|96x96)["'][^>]*href=["']([^"']+)["']/gi, name: "high-res favicon", confianza: "media" },
      // Logo in img tag with logo in class/id/alt
      { regex: /<img\s+[^>]*(?:class|id|alt)=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)["']/gi, name: "img with logo class", confianza: "alta" },
      { regex: /<img\s+[^>]*src=["']([^"']+)["'][^>]*(?:class|id|alt)=["'][^"']*logo[^"']*["']/gi, name: "img with logo class", confianza: "alta" },
      // Logo in header/nav img
      { regex: /<(?:header|nav)[^>]*>[\s\S]*?<img\s+[^>]*src=["']([^"']+)["']/gi, name: "header/nav img", confianza: "media" },
      // Common logo paths
      { regex: /["']([^"']*\/logo[^"']*\.(?:png|jpg|jpeg|svg|webp))["']/gi, name: "path with 'logo'", confianza: "media" },
      { regex: /["']([^"']*\/brand[^"']*\.(?:png|jpg|jpeg|svg|webp))["']/gi, name: "path with 'brand'", confianza: "media" },
    ];
    
    for (const pattern of logoPatterns) {
      // Use matchAll to get all matches
      const matches = html.matchAll(pattern.regex);
      
      for (const match of matches) {
        if (!match[1]) continue;
        let logoUrl = match[1];
        
        // Skip data URIs, tiny icons, and tracking pixels
        if (logoUrl.startsWith("data:")) continue;
        if (logoUrl.includes("favicon.ico")) continue;
        if (logoUrl.includes("pixel") || logoUrl.includes("tracking")) continue;
        if (logoUrl.includes("1x1")) continue;
        
        // Convert relative URLs to absolute
        if (logoUrl.startsWith("//")) {
          logoUrl = `https:${logoUrl}`;
        } else if (logoUrl.startsWith("/")) {
          logoUrl = `${baseUrl}${logoUrl}`;
        } else if (!logoUrl.startsWith("http")) {
          logoUrl = `${baseUrl}/${logoUrl}`;
        }
        
        // Skip if already seen
        if (seenUrls.has(logoUrl)) continue;
        seenUrls.add(logoUrl);
        
        // Verify the image exists
        console.log(`Checking ${pattern.name}: ${logoUrl}`);
        const isValid = await verifyImageUrl(logoUrl);
        
        if (isValid) {
          console.log(`✓ Found valid logo via ${pattern.name}: ${logoUrl}`);
          results.push({
            url: logoUrl,
            confianza: pattern.confianza,
            fuente: `Sitio web oficial (${pattern.name})`
          });
          
          // Stop after finding 5 valid logos
          if (results.length >= 5) {
            console.log(`Found 5 logos, stopping search`);
            return results;
          }
        }
      }
    }
    
    console.log(`Found ${results.length} valid logos on website`);
    return results;
  } catch (error) {
    console.log(`Error scraping website:`, error);
    return results;
  }
}

// Main function to find MULTIPLE logo options
async function findLogoOptions(websiteUrl: string | null): Promise<LogoSearchResult[]> {
  const domain = extractDomain(websiteUrl);
  const allOptions: LogoSearchResult[] = [];
  
  if (!domain) {
    console.log("No valid domain to search for logo");
    return allOptions;
  }
  
  // Layer 1: Try Clearbit first (fast and reliable)
  const clearbitResult = await tryClearbit(domain);
  if (clearbitResult) {
    allOptions.push(clearbitResult);
  }
  
  // Layer 2: Scrape the website for ALL logos
  if (websiteUrl) {
    const fullUrl = websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`;
    const scrapeResults = await scrapeWebsiteForLogos(fullUrl, domain);
    
    // Add scrape results, avoiding duplicates
    for (const result of scrapeResults) {
      if (!allOptions.some(o => o.url === result.url)) {
        allOptions.push(result);
      }
    }
    
    // Try with www if not present and we still have room
    if (!websiteUrl.includes("www.") && allOptions.length < 5) {
      const wwwUrl = `https://www.${domain}`;
      const wwwResults = await scrapeWebsiteForLogos(wwwUrl, domain);
      for (const result of wwwResults) {
        if (!allOptions.some(o => o.url === result.url)) {
          allOptions.push(result);
          if (allOptions.length >= 5) break;
        }
      }
    }
  }
  
  console.log(`Total logo options found: ${allOptions.length}`);
  return allOptions;
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

    // === AUTHENTICATION CHECK ===
    // Verify that the caller is an authenticated administrator
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("Missing Authorization header");
      return new Response(JSON.stringify({ error: "Unauthorized: No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const jwt = authHeader.replace("Bearer ", "");
    
    // Create a client with the user's JWT to verify their identity
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

    // Check if user has admin role using the has_role function
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

    // Use service role for data operations
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Parse request body - now supports force_fields parameter
    const { asociado_id, force_fields } = await req.json();

    if (!asociado_id) {
      throw new Error("asociado_id is required");
    }

    console.log(`Request for ${asociado_id}, force_fields:`, force_fields);

    // Get associate data
    const { data: associate, error: fetchError } = await supabase
      .from("asociados")
      .select("id, nombre_empresa, pagina_web, descripcion, linkedin, logo_url, servicios, tipo_organizacion, correo_contacto")
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
    if (associate.tipo_organizacion) fieldsWithData.add("tipo_organizacion");
    if (associate.correo_contacto) fieldsWithData.add("correo_contacto");

    // Combine completed fields with fields that already have data
    const skipFields = new Set([...completedFields, ...fieldsWithData]);

    // Determine which fields to enrich
    const allFields = ["linkedin", "logo_url", "servicios", "tipo_organizacion", "correo_contacto"];
    
    let fieldsToEnrich: string[];
    
    if (force_fields && Array.isArray(force_fields) && force_fields.length > 0) {
      fieldsToEnrich = force_fields.filter(f => allFields.includes(f));
      console.log(`Forcing enrichment of fields: ${fieldsToEnrich.join(", ")}`);
    } else {
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

    const enrichments: EnrichmentResult[] = [];
    
    // Handle logo_url with MULTIPLE options
    if (fieldsToEnrich.includes("logo_url")) {
      console.log("=== Starting logo search (multiple options) ===");
      const logoOptions = await findLogoOptions(associate.pagina_web);
      
      if (logoOptions.length > 0) {
        enrichments.push({
          campo: "logo_url",
          opciones: logoOptions.map(opt => ({
            valor: opt.url,
            confianza: opt.confianza,
            fuente: opt.fuente
          }))
        });
        console.log(`Found ${logoOptions.length} logo options`);
        // Remove logo_url from AI fields since we found options
        fieldsToEnrich = fieldsToEnrich.filter(f => f !== "logo_url");
      } else {
        console.log("No logos found via direct search, will try AI as fallback");
      }
    }

    // Use AI for remaining fields (linkedin, servicios, and logo as fallback)
    if (fieldsToEnrich.length > 0) {
      console.log(`Using AI for fields: ${fieldsToEnrich.join(", ")}`);
      
      // Build dynamic prompt based on fields to enrich
      const fieldInstructions: string[] = [];
      if (fieldsToEnrich.includes("linkedin")) {
        fieldInstructions.push("1. LinkedIn de la empresa (URL completa del perfil de empresa en linkedin.com/company/...)");
      }
      if (fieldsToEnrich.includes("logo_url")) {
        fieldInstructions.push(`2. Logo de la empresa - IMPORTANTE:
   - Busca en el sitio web oficial de la empresa primero
   - Usa Clearbit como segunda opción: https://logo.clearbit.com/dominio.com
   - La URL debe ser PERMANENTE y directa a una imagen
   - NUNCA uses URLs de LinkedIn (media.licdn.com) - expiran
   - Si solo encuentras URLs temporales, marca confianza como "baja"`);
      }
      if (fieldsToEnrich.includes("servicios")) {
        fieldInstructions.push("3. Servicios principales que ofrece (lista de 3-5 servicios relacionados con educación/tecnología)");
      }
      if (fieldsToEnrich.includes("tipo_organizacion")) {
        fieldInstructions.push(`4. Tipos de organización - Puede pertenecer a UNA O MÁS de estas categorías (selecciona todas las que apliquen):
   - "K12 (Colegios)": empresas que sirven a colegios, educación primaria y secundaria
   - "Educación Superior": empresas enfocadas en educación universitaria o técnica superior
   - "Educación para la Vida": empresas de formación continua, cursos online, upskilling, capacitación profesional
   - "Cajas de Compensación": cajas de compensación familiar
   - "Universidades": instituciones universitarias directamente
   Ejemplo: una empresa que vende a colegios y universidades debería tener ["K12 (Colegios)", "Universidades"]`);
      }
      if (fieldsToEnrich.includes("correo_contacto")) {
        fieldInstructions.push("5. Correo electrónico de contacto - Busca en la página de contacto, footer, o información de la empresa. Debe ser un email válido como info@empresa.com o contacto@empresa.com.");
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
              description: "Lista de categorías a las que pertenece la organización (puede ser más de una)"
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
            email: { type: "string", description: "Correo electrónico de contacto de la empresa" },
            confianza: { type: "string", enum: ["alta", "media", "baja"] },
            fuente: { type: "string", description: "Donde se encontró esta información" }
          },
          required: ["confianza", "fuente"]
        };
        requiredFields.push("correo_contacto");
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
Solo reporta datos que puedas confirmar con certeza.
Prioriza fuentes oficiales (sitio web de la empresa, LinkedIn oficial).
Para cada dato indica la fuente exacta donde lo encontraste.
Las URLs deben ser completas (https://...).
Para servicios, extrae los principales relacionados con educación/EdTech.`
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

        // Logo (only if not already found via direct search)
        if (fieldsToEnrich.includes("logo_url") && companyInfo.logo_url?.url && companyInfo.logo_url.url !== "No disponible") {
          // Verify the AI-suggested URL
          const isValid = await verifyImageUrl(companyInfo.logo_url.url);
          if (isValid) {
            enrichments.push({
              campo: "logo_url",
              opciones: [{
                valor: companyInfo.logo_url.url,
                confianza: companyInfo.logo_url.confianza,
                fuente: `${companyInfo.logo_url.fuente} (verificado)`
              }]
            });
          } else {
            console.log(`AI suggested logo URL is invalid: ${companyInfo.logo_url.url}`);
          }
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

        // Tipo de Organización (now supports multiple)
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
    }
    // Save FIRST option of each enrichment to database for tracking
    if (enrichments.length > 0) {
      for (const enrichment of enrichments) {
        const firstOption = enrichment.opciones[0];
        if (!firstOption) continue;
        
        const { error: upsertError } = await supabase
          .from("asociados_enrichment")
          .upsert({
            asociado_id: associate.id,
            campo: enrichment.campo,
            valor_actual: enrichment.campo === "servicios" 
              ? JSON.stringify(associate.servicios || [])
              : (associate as any)[enrichment.campo] || null,
            valor_sugerido: firstOption.valor,
            confianza: firstOption.confianza,
            fuente: firstOption.fuente,
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

    const totalOptions = enrichments.reduce((sum, e) => sum + e.opciones.length, 0);
    console.log(`Found ${enrichments.length} fields with ${totalOptions} total options for ${associate.nombre_empresa}`);

    return new Response(JSON.stringify({
      success: true,
      nombre_empresa: associate.nombre_empresa,
      enrichments_count: enrichments.length,
      total_options: totalOptions,
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
