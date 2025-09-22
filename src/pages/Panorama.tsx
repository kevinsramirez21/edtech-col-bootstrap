import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { KPI } from "@/components/ui/kpi";
import { Badge } from "@/components/ui/badge";

const Panorama = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Mundo EdTech", href: "/mundo-edtech" },
            { label: "Panorama" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Panorama EdTech Colombia"
          subtitle="Estado del ecosistema"
          description="Una mirada integral al estado actual y las tendencias del sector EdTech en Colombia"
        />
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <KPI
            value="120+"
            label="Startups EdTech"
            description="Empresas activas en el ecosistema"
            variant="accent"
          />
          <KPI
            value="$45M"
            label="Inversión 2023"
            description="Capital levantado por el sector"
            variant="default"
          />
          <KPI
            value="2.5M"
            label="Estudiantes Impactados"
            description="Usuarios de soluciones EdTech"
            variant="sand"
          />
          <KPI
            value="85%"
            label="Adopción Digital"
            description="Instituciones con herramientas digitales"
            variant="accent"
          />
        </div>

        {/* Market Segments */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Segmentos del Mercado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">K-12</h3>
                  <Badge>35%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Plataformas de aprendizaje, gestión académica y contenidos educativos para educación básica y media.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Educación Superior</h3>
                  <Badge>28%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  LMS, herramientas de evaluación y plataformas de educación virtual para universidades.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Capacitación Corporativa</h3>
                  <Badge>22%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Soluciones de formación empresarial, desarrollo de habilidades y gestión del talento.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Idiomas</h3>
                  <Badge>10%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Plataformas de aprendizaje de idiomas y certificación de competencias lingüísticas.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">STEM</h3>
                  <Badge>5%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Herramientas especializadas en ciencias, tecnología, ingeniería y matemáticas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trends */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tendencias Clave</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Inteligencia Artificial en Educación</h3>
                <p className="text-gray-600">
                  El 65% de las startups EdTech están incorporando IA para personalización del aprendizaje, 
                  tutorías virtuales y análisis predictivo del rendimiento estudiantil.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Micro-aprendizaje y Gamificación</h3>
                <p className="text-gray-600">
                  Crecimiento del 45% en plataformas que ofrecen contenidos bite-sized y elementos 
                  de juego para mejorar el engagement y la retención.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Educación Rural y Accesibilidad</h3>
                <p className="text-gray-600">
                  Iniciativas específicas para llevar educación de calidad a zonas rurales, 
                  con soluciones optimizadas para conectividad limitada.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <CopySlot file="panorama.mdx" />
      </Section>
    </>
  );
};

export default Panorama;