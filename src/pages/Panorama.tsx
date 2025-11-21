import { Section } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  DollarSign,
  Target,
  Lightbulb,
  Brain,
  Rocket,
  BookOpen,
  Award,
  BarChart3,
  ArrowRight,
  TrendingDown,
  Sparkles
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { generatePageMeta } from "@/lib/seo";

const Panorama = () => {
  const meta = generatePageMeta({
    title: "Panorama del Futuro de la Educación",
    description: "Explorando las tendencias, desafíos y oportunidades que están redefiniendo el aprendizaje en el siglo XXI"
  });

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
      </Helmet>

      {/* Hero Section */}
      <Section className="py-24 md:py-32 lg:py-40 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent-brand rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sand rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight drop-shadow-2xl">
              Panorama del Futuro de la Educación
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto text-white/90 leading-relaxed mb-12 font-medium">
              Explorando las tendencias, desafíos y oportunidades que están redefiniendo 
              el aprendizaje en el siglo XXI
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-10 py-6 rounded-xl shadow-2xl hover:shadow-accent/40 transition-all duration-500 hover:scale-110 text-lg" asChild>
              <Link to="/asociados" className="flex items-center space-x-3">
                <span>Únete a la Transformación</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Contexto Global */}
      <Section className="py-20 bg-sand">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Contexto Global
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>

          {/* KPIs principales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-10 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-4 text-accent">2 años</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Duplicación del Conocimiento</div>
              <div className="text-sm text-primary-900">El conocimiento se duplica ahora</div>
            </Card>
            
            <Card className="p-10 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-700 flex items-center justify-center">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-4 text-primary-700">$10T</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Mercado Global 2030</div>
              <div className="text-sm text-primary-900">Gasto global en educación</div>
            </Card>
            
            <Card className="p-10 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                <TrendingDown className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-4 text-accent">50%</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Habilidades Obsoletas</div>
              <div className="text-sm text-primary-900">En menos de 5 años (WEF)</div>
            </Card>
            
            <Card className="p-10 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-700 flex items-center justify-center">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-4 text-primary-700">73%</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Operación Global</div>
              <div className="text-sm text-primary-900">EdTechs colombianas en 2-10 países</div>
            </Card>
          </div>

          {/* Timeline de aceleración */}
          <Card className="p-10 bg-white border-0 shadow-xl">
            <h3 className="text-2xl font-bold mb-8 text-primary-700 text-center">Aceleración del Conocimiento</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <Badge variant="outline" className="min-w-[100px] text-lg py-2 border-2 border-primary-700">1900</Badge>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-4 bg-primary-900 rounded-full transition-all duration-1000" style={{ width: '10%' }}></div>
                </div>
                <span className="text-base text-primary-900 font-medium min-w-[200px]">Cada siglo</span>
              </div>
              <div className="flex items-center gap-6">
                <Badge variant="outline" className="min-w-[100px] text-lg py-2 border-2 border-primary-700">1945</Badge>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-4 bg-primary-700 rounded-full transition-all duration-1000" style={{ width: '30%' }}></div>
                </div>
                <span className="text-base text-primary-900 font-medium min-w-[200px]">Cada 25 años</span>
              </div>
              <div className="flex items-center gap-6">
                <Badge variant="outline" className="min-w-[100px] text-lg py-2 border-2 border-accent">1982</Badge>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-4 bg-accent rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                </div>
                <span className="text-base text-primary-900 font-medium min-w-[200px]">Cada 8 años</span>
              </div>
              <div className="flex items-center gap-6">
                <Badge variant="outline" className="min-w-[100px] text-lg py-2 border-2 border-accent">2025</Badge>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-4 bg-accent rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
                </div>
                <span className="text-base text-primary-900 font-medium min-w-[200px]">Cada 2 años</span>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Tendencias Clave */}
      <Section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Tendencias Clave en EdTech
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>
          
          {/* Crecimiento de modelos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-8 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-5xl font-bold text-accent mb-3">+59%</div>
              <div className="text-xl font-semibold mb-2 text-primary-700">Gamificación</div>
              <div className="text-sm text-primary-900 mb-4">10.24% → 16.32%</div>
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto" />
            </Card>
            
            <Card className="p-8 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-5xl font-bold text-accent mb-3">+58%</div>
              <div className="text-xl font-semibold mb-2 text-primary-700">Tutores Inteligentes</div>
              <div className="text-sm text-primary-900 mb-4">7.0% → 11.05%</div>
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto" />
            </Card>
            
            <Card className="p-8 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-5xl font-bold text-accent mb-3">+39%</div>
              <div className="text-xl font-semibold mb-2 text-primary-700">Personalización</div>
              <div className="text-sm text-primary-900 mb-4">18.9% → 26.32%</div>
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto" />
            </Card>
            
            <Card className="p-8 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-5xl font-bold text-accent mb-3">+4%</div>
              <div className="text-xl font-semibold mb-2 text-primary-700">Aprendizaje Colaborativo</div>
              <div className="text-sm text-primary-900 mb-4">15.75% → 16.32%</div>
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto" />
            </Card>
          </div>

          {/* Los 5 Clusters */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-700">Los Cinco Clusters del Ecosistema EdTech</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-xl font-bold mb-4 text-primary-700">Global Giants</h4>
              <p className="text-sm text-accent mb-3 font-semibold">Pearson, Google</p>
              <p className="text-base text-primary-900 leading-relaxed">Gigantes con productos gratuitos y alianzas industriales</p>
            </Card>
            
            <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-xl font-bold mb-4 text-primary-700">Regional Rising</h4>
              <p className="text-sm text-accent mb-3 font-semibold">Platzi, Comfandi</p>
              <p className="text-base text-primary-900 leading-relaxed">Colaboración regional y credencialización</p>
            </Card>
            
            <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-xl font-bold mb-4 text-primary-700">Education-as-Usual</h4>
              <p className="text-sm text-accent mb-3 font-semibold">Universidad tradicional</p>
              <p className="text-base text-primary-900 leading-relaxed">Universidad pública tradicional y MOOCs</p>
            </Card>
            
            <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-xl font-bold mb-4 text-primary-700">Peer to Peer</h4>
              <p className="text-sm text-accent mb-3 font-semibold">OER, Blockchain</p>
              <p className="text-base text-primary-900 leading-relaxed">Aprendizaje entre pares descentralizado</p>
            </Card>
            
            <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-xl font-bold mb-4 text-primary-700">Robo Revolution</h4>
              <p className="text-sm text-accent mb-3 font-semibold">IA, Smart Classrooms</p>
              <p className="text-base text-primary-900 leading-relaxed">Personalización masiva mediante IA</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Neoeducación */}
      <Section className="py-20 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,60,92,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(11,71,206,0.15),transparent_70%)]"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Neoeducación
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-12 rounded-full"></div>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">Un cambio paradigmático en la forma de aprender y enseñar</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500">
              <Sparkles className="w-16 h-16 text-accent mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-6 text-white">Apuestas Pedagógicas</h3>
              <ul className="space-y-3 text-base text-white/90 text-left">
                <li>• Evaluación primero y subjetiva</li>
                <li>• Métodos experimentales y adaptativos</li>
                <li>• Power Skills (no habilidades blandas)</li>
              </ul>
            </Card>
            
            <Card className="p-10 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500">
              <GraduationCap className="w-16 h-16 text-accent mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-6 text-white">Experiencia 360</h3>
              <ul className="space-y-3 text-base text-white/90 text-left">
                <li>• Tech-enabled (habilitador, no reemplazo)</li>
                <li>• Data-oriented (decisiones basadas en datos)</li>
                <li>• Personalización continua</li>
              </ul>
            </Card>
            
            <Card className="p-10 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500">
              <Target className="w-16 h-16 text-accent mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-6 text-white">Tesis de Industria</h3>
              <ul className="space-y-3 text-base text-white/90 text-left">
                <li>• Nicho Técnico (Platzi)</li>
                <li>• Nicho Geográfico (Mangus)</li>
                <li>• Nicho Industrial (Revive)</li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Mercado Laboral */}
      <Section className="py-20 bg-sand">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Mercado Laboral en Transformación
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-primary-900 max-w-3xl mx-auto">La crisis de competencias que está transformando el mundo del trabajo</p>
          </div>
          
          {/* Estadísticas de crisis */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-8 text-center bg-red-50 border-2 border-red-200">
              <div className="text-5xl font-bold text-red-600 mb-4">50%</div>
              <div className="text-base text-primary-900 font-medium">Habilidades obsoletas en 5 años (WEF)</div>
            </Card>
            
            <Card className="p-8 text-center bg-orange-50 border-2 border-orange-200">
              <div className="text-5xl font-bold text-orange-600 mb-4">29%</div>
              <div className="text-base text-primary-900 font-medium">Programas alineados al mercado (McKinsey)</div>
            </Card>
            
            <Card className="p-8 text-center bg-yellow-50 border-2 border-yellow-200">
              <div className="text-5xl font-bold text-yellow-700 mb-4">60%</div>
              <div className="text-base text-primary-900 font-medium">Estudiantes buscan alternativas fuera de la U tradicional</div>
            </Card>
            
            <Card className="p-8 text-center bg-red-50 border-2 border-red-200">
              <div className="text-5xl font-bold text-red-600 mb-4">49%</div>
              <div className="text-base text-primary-900 font-medium">Empresas sin competencias adecuadas (LinkedIn)</div>
            </Card>
          </div>

          {/* Competencias faltantes */}
          <Card className="p-10 bg-white border-0 shadow-xl mb-12">
            <h3 className="text-2xl font-bold mb-8 text-primary-700 text-center">Top 10 Competencias Faltantes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {['Business Strategy', 'Strategic Planning', 'Sales Management', 'Project Planning', 'Operations Management'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Badge className="bg-accent text-white text-lg py-2 px-4">{i + 1}</Badge>
                    <span className="text-base text-primary-900 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {['Marketing Strategy', 'Management', 'Business Development', 'Negotiation', 'Team Leadership'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Badge className="bg-accent text-white text-lg py-2 px-4">{i + 6}</Badge>
                    <span className="text-base text-primary-900 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Contracción por IA */}
          <Card className="p-10 bg-red-50 border-2 border-red-200">
            <h3 className="text-2xl font-bold mb-8 text-red-900 text-center">Contracción del Mercado "White-Collar" por IA</h3>
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                { sector: 'Banking & Finance', percentage: 94.2 },
                { sector: 'Scientific R&D', percentage: 80.1 },
                { sector: 'Software Development', percentage: 52.5 },
                { sector: 'Mathematics', percentage: 49.8 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-6">
                  <span className="text-base font-semibold text-primary-900 min-w-[180px]">{item.sector}</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-4 bg-red-600 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-red-600 font-bold text-lg min-w-[80px] text-right">-{item.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* K-12 */}
      <Section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Cambios en K-12
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="prose prose-lg max-w-5xl mx-auto">
            <CopySlot file="panorama.mdx" />
          </div>
        </div>
      </Section>

      {/* Educación Superior */}
      <Section className="py-20 bg-primary-700 text-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Educación Superior
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="prose prose-lg prose-invert max-w-5xl mx-auto text-white/90">
            <CopySlot file="panorama.mdx" />
          </div>
        </div>
      </Section>

      {/* ROI */}
      <Section className="py-20 bg-sand">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              ROI en EdTech
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="prose prose-lg max-w-5xl mx-auto">
            <CopySlot file="panorama.mdx" />
          </div>
        </div>
      </Section>

      {/* Colombia */}
      <Section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Perspectivas para Colombia
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="prose prose-lg max-w-5xl mx-auto">
            <CopySlot file="panorama.mdx" />
          </div>
        </div>
      </Section>

      {/* Cambio de Discurso */}
      <Section className="py-20 bg-accent text-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              El Cambio de Discurso
            </h2>
            <div className="w-32 h-1 bg-white mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="prose prose-lg prose-invert max-w-5xl mx-auto text-white/90">
            <CopySlot file="panorama.mdx" />
          </div>
        </div>
      </Section>

      {/* Financiamiento */}
      <Section className="py-20 bg-sand">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Financiamiento
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="prose prose-lg max-w-5xl mx-auto">
            <CopySlot file="panorama.mdx" />
          </div>
        </div>
      </Section>

      {/* El Futuro es Ahora */}
      <Section className="py-20 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,60,92,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(11,71,206,0.15),transparent_70%)]"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              El Futuro es Ahora
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-12 rounded-full"></div>
          </div>
          <div className="prose prose-lg prose-invert max-w-5xl mx-auto text-white/90 mb-12">
            <CopySlot file="panorama.mdx" />
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-10 py-6 rounded-xl shadow-2xl hover:shadow-accent/40 transition-all duration-500 hover:scale-110 text-lg" asChild>
            <Link to="/asociados" className="flex items-center space-x-3">
              <span>Sé Parte del Cambio</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Datos de Impacto */}
      <Section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Datos de Impacto Global
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-10 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-4 text-accent">$341B</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Mercado EdTech Global</div>
              <div className="text-sm text-primary-900">proyección 2025</div>
            </Card>
            
            <Card className="p-10 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-700 flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-4 text-primary-700">700M</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Usuarios de EdTech</div>
              <div className="text-sm text-primary-900">en el mundo</div>
            </Card>
            
            <Card className="p-10 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-4 text-accent">16.3%</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Crecimiento anual</div>
              <div className="text-sm text-primary-900">del sector</div>
            </Card>
            
            <Card className="p-10 text-center bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-700 flex items-center justify-center">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-4 text-primary-700">85%</div>
              <div className="text-lg font-semibold mb-2 text-primary-700">Instituciones adoptando</div>
              <div className="text-sm text-primary-900">tecnología educativa</div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Panorama;
