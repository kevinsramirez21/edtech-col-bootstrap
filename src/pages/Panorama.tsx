import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { KPI } from "@/components/ui/kpi";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Brain, Briefcase, GraduationCap, Sparkles, Globe, Target, DollarSign } from "lucide-react";

const Panorama = () => {
  return (
    <>
      <Section className="py-8 bg-sand">
        <Breadcrumbs 
          items={[
            { label: "Mundo EdTech", href: "/mundo-edtech" },
            { label: "Panorama" }
          ]} 
        />
      </Section>
      
      {/* Hero Intro */}
      <Section className="py-16 bg-gradient-to-b from-sand to-white">
        <div className="max-w-4xl mx-auto text-center">
          <CopySlot file="panorama.mdx" />
        </div>
      </Section>

      {/* Contexto Global */}
      <Section className="py-16">
        <SectionHeader
          title="El Contexto Global"
          subtitle="Transformación sin precedentes"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPI
            value="2 años"
            label="Duplicación del Conocimiento"
            description="El conocimiento ahora se duplica cada 2 años"
            variant="accent"
            icon={Brain}
          />
          <KPI
            value="$10T"
            label="Mercado Global 2030"
            description="Gasto global en educación"
            variant="default"
            icon={DollarSign}
          />
          <KPI
            value="50%"
            label="Habilidades Obsoletas"
            description="En menos de 5 años (WEF)"
            variant="sand"
            icon={TrendingDown}
          />
          <KPI
            value="73%"
            label="Operación Global"
            description="EdTechs colombianas en 2-10 países"
            variant="accent"
            icon={Globe}
          />
        </div>

        <div className="prose max-w-4xl mx-auto mb-16">
          <CopySlot file="panorama.mdx" />
        </div>

        {/* Línea del Tiempo de Aceleración */}
        <Card className="mb-16">
          <CardHeader>
            <h3 className="text-2xl font-bold text-gray-900">Aceleración del Conocimiento</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="min-w-[80px]">1900</Badge>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-primary-900 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <span className="text-sm text-gray-600 min-w-[200px]">Cada siglo</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="min-w-[80px]">1945</Badge>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-primary-700 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <span className="text-sm text-gray-600 min-w-[200px]">Cada 25 años (Computadora)</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="min-w-[80px]">1982</Badge>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-accent-brand rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm text-gray-600 min-w-[200px]">Cada 8 años (Internet)</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="min-w-[80px]">2025</Badge>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-[#F73C5C] rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-sm text-gray-600 min-w-[200px]">Cada 2 años (IA y Cuántica)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Tendencias Clave */}
      <Section className="py-16 bg-sand">
        <SectionHeader
          title="Tendencias Clave en EdTech"
          subtitle="Evolución de modelos de negocio"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-[#F73C5C] mb-2">+59%</div>
              <div className="text-lg font-semibold mb-1">Gamificación</div>
              <div className="text-sm text-gray-600">10.24% → 16.32%</div>
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-[#F73C5C] mb-2">+58%</div>
              <div className="text-lg font-semibold mb-1">Tutores Inteligentes</div>
              <div className="text-sm text-gray-600">7.0% → 11.05%</div>
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-[#F73C5C] mb-2">+39%</div>
              <div className="text-lg font-semibold mb-1">Personalización</div>
              <div className="text-sm text-gray-600">18.9% → 26.32%</div>
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-[#F73C5C] mb-2">+4%</div>
              <div className="text-lg font-semibold mb-1">Aprendizaje Colaborativo</div>
              <div className="text-sm text-gray-600">15.75% → 16.32%</div>
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Los 5 Clusters */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Los Cinco Clusters del Ecosistema EdTech</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Global Giants</h4>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">Pearson, Google</p>
              <p className="text-gray-700">Gigantes con productos gratuitos y alianzas industriales</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Regional Rising</h4>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">Platzi, Comfandi</p>
              <p className="text-gray-700">Colaboración regional y credencialización</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Education-as-Usual</h4>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">Universidad tradicional</p>
              <p className="text-gray-700">Universidad pública tradicional y MOOCs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Peer to Peer</h4>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">OER, Blockchain</p>
              <p className="text-gray-700">Aprendizaje entre pares descentralizado</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Robo Revolution</h4>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">IA, Smart Classrooms</p>
              <p className="text-gray-700">Personalización masiva mediante IA</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Neoeducación */}
      <Section className="py-16">
        <SectionHeader
          title="La Nueva Educación: Neoeducación"
          subtitle="Un cambio paradigmático"
          centered
        />
        
        <div className="max-w-4xl mx-auto mb-12">
          <CopySlot file="panorama.mdx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Sparkles className="w-8 h-8 text-[#F73C5C] mb-2" />
              <h4 className="text-lg font-semibold">Apuestas Pedagógicas</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Evaluación primero y subjetiva</li>
                <li>• Métodos experimentales y adaptativos</li>
                <li>• Power Skills (no habilidades blandas)</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <GraduationCap className="w-8 h-8 text-[#F73C5C] mb-2" />
              <h4 className="text-lg font-semibold">Experiencia 360</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Tech-enabled (habilitador, no reemplazo)</li>
                <li>• Data-oriented (decisiones basadas en datos)</li>
                <li>• Personalización continua</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Target className="w-8 h-8 text-[#F73C5C] mb-2" />
              <h4 className="text-lg font-semibold">Tesis de Industria</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Nicho Técnico (Platzi)</li>
                <li>• Nicho Geográfico (Mangus)</li>
                <li>• Nicho Industrial (Revive)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Mercado Laboral */}
      <Section className="py-16 bg-sand">
        <SectionHeader
          title="El Mercado Laboral en Transformación"
          subtitle="La crisis de competencias"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">50%</div>
              <div className="text-sm text-gray-700">Habilidades obsoletas en 5 años (WEF)</div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">29%</div>
              <div className="text-sm text-gray-700">Programas alineados al mercado (McKinsey)</div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-yellow-700 mb-2">60%</div>
              <div className="text-sm text-gray-700">Estudiantes buscan alternativas fuera de la U tradicional</div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">49%</div>
              <div className="text-sm text-gray-700">Empresas sin competencias adecuadas (LinkedIn)</div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <CopySlot file="panorama.mdx" />
        </div>

        {/* Top 10 Competencias Faltantes */}
        <Card className="mt-12">
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900">Top 10 Competencias Faltantes</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge>1</Badge>
                  <span className="text-sm">Business Strategy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>2</Badge>
                  <span className="text-sm">Strategic Planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>3</Badge>
                  <span className="text-sm">Sales Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>4</Badge>
                  <span className="text-sm">Project Planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>5</Badge>
                  <span className="text-sm">Operations Management</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge>6</Badge>
                  <span className="text-sm">Marketing Strategy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>7</Badge>
                  <span className="text-sm">Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>8</Badge>
                  <span className="text-sm">Business Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>9</Badge>
                  <span className="text-sm">Negotiation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>10</Badge>
                  <span className="text-sm">Team Leadership</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contracción por Automatización */}
        <Card className="mt-12 bg-red-50 border-red-200">
          <CardHeader>
            <h3 className="text-xl font-bold text-red-900">Contracción del Mercado "White-Collar" por IA</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Banking & Finance</span>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-3 bg-gray-200 rounded-full">
                    <div className="h-3 bg-red-600 rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                  <span className="text-red-600 font-bold min-w-[60px]">-94.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Scientific R&D</span>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-3 bg-gray-200 rounded-full">
                    <div className="h-3 bg-red-600 rounded-full" style={{ width: '80.1%' }}></div>
                  </div>
                  <span className="text-red-600 font-bold min-w-[60px]">-80.1%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Software Development</span>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-3 bg-gray-200 rounded-full">
                    <div className="h-3 bg-red-600 rounded-full" style={{ width: '52.5%' }}></div>
                  </div>
                  <span className="text-red-600 font-bold min-w-[60px]">-52.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Mathematics</span>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-3 bg-gray-200 rounded-full">
                    <div className="h-3 bg-red-600 rounded-full" style={{ width: '49.8%' }}></div>
                  </div>
                  <span className="text-red-600 font-bold min-w-[60px]">-49.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Cambios en K-12 */}
      <Section className="py-16">
        <SectionHeader
          title="Cambios Sistémicos en K-12"
          subtitle="Transformaciones en curso"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Menos colegios privados</h4>
              <p className="text-sm text-gray-600">Mayor presión sobre calidad pública</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Aprendizajes fundamentales en riesgo</h4>
              <p className="text-sm text-gray-600">50%+ sin competencias básicas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Tecnología solo lo indispensable</h4>
              <p className="text-sm text-gray-600">Con niños pequeños</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Más habilidades laborales</h4>
              <p className="text-sm text-gray-600">Al graduarse del colegio</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Integración salud-educación</h4>
              <p className="text-sm text-gray-600">Para decisiones pedagógicas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Superpoderes para profesores</h4>
              <p className="text-sm text-gray-600">Herramientas avanzadas de enseñanza</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-center text-gray-800">
              <span className="font-bold text-yellow-900">Menos del 40%</span> de docentes en América Latina se siente preparado para integrar tecnología en sus prácticas pedagógicas (UNESCO)
            </p>
          </CardContent>
        </Card>
      </Section>

      {/* Educación Superior */}
      <Section className="py-16 bg-sand">
        <SectionHeader
          title="Cambios en Educación Superior"
          subtitle="Nuevas dinámicas"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Hiperpersonalización</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Tutores virtuales</li>
                <li>• Adaptación en tiempo real</li>
                <li>• Rutas personalizadas de aprendizaje</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Los Nuevos Negocios</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Técnicos y Lifelong Learning</li>
                <li>• Universidades Corporativas</li>
                <li>• Hacku, Sistel, Laboratoria</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Operación Global</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Education as a Service</li>
                <li>• Colaboración con OPMs / VC</li>
                <li>• 73% opera en 2-10 países</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ROI */}
      <Section className="py-16">
        <SectionHeader
          title="Educación = ROI (o Muerte)"
          subtitle="Customer Education: El Nuevo Paradigma"
          centered
        />
        
        <div className="text-center mb-12">
          <div className="text-6xl font-bold text-[#F73C5C] mb-4">372%</div>
          <p className="text-xl text-gray-700">ROI Comprobado (Forrester TEI Model, 2024)</p>
          <p className="text-gray-600 mt-2">86% de empresas confirman rentabilidad en Customer Education</p>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 text-center">Impacto Medible de Programas de Educación al Cliente</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">📈 Adopción</span>
                  <span className="text-green-600 font-bold">+38.3%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">⭐ Engagement</span>
                  <span className="text-green-600 font-bold">+30.7%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">😊 Satisfacción</span>
                  <span className="text-green-600 font-bold">+26.2%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">💎 LTV</span>
                  <span className="text-green-600 font-bold">+34.6%</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold">⏱️ Ciclo de ventas</span>
                  <span className="text-blue-600 font-bold">-8.1%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold">🎫 Tickets de soporte</span>
                  <span className="text-blue-600 font-bold">-15.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold">💵 Costos de soporte</span>
                  <span className="text-blue-600 font-bold">-7.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Perspectivas Colombia */}
      <Section className="py-16 bg-sand">
        <SectionHeader
          title="Perspectivas para Colombia"
          subtitle="Oportunidades específicas"
          centered
        />
        
        <div className="max-w-4xl mx-auto mb-12">
          <CopySlot file="panorama.mdx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">El Agro</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Vacío educativo en zonas rurales</li>
                <li>• Déficit de topógrafos para ganadería sostenible</li>
                <li>• Competencias transversales: datos, agrotech</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Los Ninis</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Jóvenes que ni estudian ni trabajan</li>
                <li>• Necesitan orientación vocacional</li>
                <li>• Formación práctica y acompañamiento</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Silver Economy</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Población mayor de 60 años</li>
                <li>• Aprendizaje continuo</li>
                <li>• Actualización tecnológica</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Creadores de Contenido</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• YouTubers, TikTokers, OnlyFans</li>
                <li>• Formación en business e impuestos</li>
                <li>• Branding personal</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader>
            <h3 className="text-xl font-bold text-primary-900 text-center">Las Tres Necesidades de los Jóvenes</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔍</div>
                <p className="font-semibold text-sm">"No sé qué estudiar"</p>
                <p className="text-xs text-gray-600 mt-1">Falta de orientación vocacional</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💰</div>
                <p className="font-semibold text-sm">"No tengo dinero suficiente"</p>
                <p className="text-xs text-gray-600 mt-1">Barreras económicas</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🤔</div>
                <p className="font-semibold text-sm">"No sé si es correcto"</p>
                <p className="text-xs text-gray-600 mt-1">Incertidumbre sobre el futuro</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">😔</div>
                <p className="font-semibold text-sm">"Me siento solo"</p>
                <p className="text-xs text-gray-600 mt-1">Necesidad de acompañamiento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* El Cambio de Discurso */}
      <Section className="py-16">
        <SectionHeader
          title="El Cambio de Discurso"
          subtitle='De "Enseñamos X" a "Usamos Datos e IA"'
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Nuevo Posicionamiento EdTech</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Personalización basada en datos</li>
                <li>• Evaluación continua y formativa</li>
                <li>• Reportes de progreso en tiempo real</li>
                <li>• IA como co-piloto educativo</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Descentralización de Títulos</h4>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Badges digitales</li>
                <li>• Microcredenciales</li>
                <li>• Portfolios de competencias</li>
                <li>• Blockchain para certificación</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Target className="w-8 h-8 text-[#F73C5C] mb-2" />
              <h4 className="text-lg font-semibold">Nicho Técnico</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Ejemplo: Platzi</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Habilidades digitales específicas</li>
                <li>• Rutas de aprendizaje claras</li>
                <li>• Comunidad especializada</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Globe className="w-8 h-8 text-[#F73C5C] mb-2" />
              <h4 className="text-lg font-semibold">Nicho Geográfico</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Ejemplo: Mangus Academy</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Soluciones adaptadas localmente</li>
                <li>• Contenido regionalizado</li>
                <li>• Contexto cultural específico</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Briefcase className="w-8 h-8 text-[#F73C5C] mb-2" />
              <h4 className="text-lg font-semibold">Nicho Industrial</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Ejemplo: Revive</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Sectores específicos (salud, etc.)</li>
                <li>• Formación ultraespecializada</li>
                <li>• Propuestas para públicos concretos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Financiamiento */}
      <Section className="py-16 bg-sand">
        <SectionHeader
          title="Financiamiento: Blended Finance"
          subtitle="Nueva puerta de entrada al sector público"
          centered
        />
        
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">💰</div>
                <h4 className="font-semibold mb-2">Donantes + Gobiernos</h4>
                <p className="text-sm text-gray-600">Reducir riesgo inicial</p>
              </div>
              <div>
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-semibold mb-2">Pilotos Medibles</h4>
                <p className="text-sm text-gray-600">Demostrar impacto</p>
              </div>
              <div>
                <div className="text-4xl mb-3">📈</div>
                <h4 className="font-semibold mb-2">Escalamiento Contractual</h4>
                <p className="text-sm text-gray-600">Crecimiento sostenible</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* El Futuro es Ahora */}
      <Section className="py-16 bg-gradient-to-b from-primary-900 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">El Futuro es Ahora</h2>
          
          <div className="prose prose-invert max-w-none mb-12">
            <CopySlot file="panorama.mdx" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3 text-white">Principios de la Neoeducación</h4>
                <ul className="space-y-2 text-sm text-left text-white/90">
                  <li>• La evaluación va primero (y es subjetiva)</li>
                  <li>• El método ya no es lineal (experimental y adaptativo)</li>
                  <li>• Habilidades blandas = Power Skills</li>
                  <li>• Todos tendremos un GPT "segundo cerebro"</li>
                  <li>• Los títulos están descentralizados</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3 text-white">La Nueva Ecuación</h4>
                <div className="text-left space-y-4 text-sm text-white/90">
                  <div>
                    <p className="font-semibold text-red-300">❌ Modelo Viejo:</p>
                    <p>Estudiamos → Graduamos → Desempleo</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-300">✅ Modelo Nuevo:</p>
                    <p>Estrellarse con el mercado → Graduarse con:</p>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Modelos mentales</li>
                      <li>• Power Skills</li>
                      <li>• Business Acumen</li>
                      <li>• Digital Capacities</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Datos de Impacto */}
      <Section className="py-16">
        <SectionHeader
          title="Datos de Impacto: Colombia EdTech"
          subtitle="Nuestro ecosistema"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPI
            value="+12M"
            label="Personas Impactadas"
            description="En 50+ países"
            variant="accent"
            icon={Users}
          />
          <KPI
            value="90+"
            label="Organizaciones EdTech"
            description="Asociadas"
            variant="default"
            icon={Briefcase}
          />
          <KPI
            value="45+"
            label="Voluntarios Activos"
            description="Transformando la educación"
            variant="sand"
            icon={Users}
          />
          <KPI
            value="73%"
            label="Operación Internacional"
            description="En 2-10 países"
            variant="accent"
            icon={Globe}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-green-700 mb-1">3</div>
              <p className="text-sm text-gray-700">Buy-outs exitosos</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-blue-700 mb-1">2</div>
              <p className="text-sm text-gray-700">Compras de empresas (EdTech & FoodTech)</p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-orange-700 mb-1">4</div>
              <p className="text-sm text-gray-700">Fracasos documentados (aprendizajes valiosos)</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Conclusión */}
      <Section className="py-16 bg-sand">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Unidad</h2>
          <p className="text-2xl text-[#F73C5C] font-semibold mb-6">"Ya están las soluciones"</p>
          <p className="text-lg text-gray-700 mb-8">
            No esperemos que los gobiernos cambien las lógicas de la educación. Con un mercado de <span className="font-bold">$10 trillones</span> para 2030, el sector privado, las organizaciones sin fines de lucro, y las alianzas público-privadas están <span className="font-bold">transformando la educación HOY</span>.
          </p>
          <p className="text-xl font-semibold text-gray-900">
            El futuro de la educación no es una promesa lejana. <span className="text-[#F73C5C]">El futuro es ahora.</span>
          </p>
        </div>
      </Section>
    </>
  );
};

export default Panorama;
