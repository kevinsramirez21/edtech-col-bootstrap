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
                <Badge variant="outline" className="min-w-[100px] flex items-center justify-center text-lg py-2 border-2 border-primary-700">1900</Badge>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-4 bg-primary-900 rounded-full transition-all duration-1000" style={{ width: '10%' }}></div>
                </div>
                <span className="text-base text-primary-900 font-medium min-w-[200px]">Cada siglo</span>
              </div>
              <div className="flex items-center gap-6">
                <Badge variant="outline" className="min-w-[100px] flex items-center justify-center text-lg py-2 border-2 border-primary-700">1945</Badge>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-4 bg-primary-700 rounded-full transition-all duration-1000" style={{ width: '30%' }}></div>
                </div>
                <span className="text-base text-primary-900 font-medium min-w-[200px]">Cada 25 años</span>
              </div>
              <div className="flex items-center gap-6">
                <Badge variant="outline" className="min-w-[100px] flex items-center justify-center text-lg py-2 border-2 border-accent">1982</Badge>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-4 bg-accent rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                </div>
                <span className="text-base text-primary-900 font-medium min-w-[200px]">Cada 8 años</span>
              </div>
              <div className="flex items-center gap-6">
                <Badge variant="outline" className="min-w-[100px] flex items-center justify-center text-lg py-2 border-2 border-accent">2025</Badge>
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
      <Section className="py-20 bg-sand">
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
              <Sparkles className="w-16 h-16 text-accent-brand mb-6 mx-auto drop-shadow-lg" />
              <h3 className="text-2xl font-bold mb-6 text-white">Apuestas Pedagógicas</h3>
              <ul className="space-y-3 text-base text-white/90 text-left">
                <li>• Evaluación primero y subjetiva</li>
                <li>• Métodos experimentales y adaptativos</li>
                <li>• Power Skills (no habilidades blandas)</li>
              </ul>
            </Card>
            
            <Card className="p-10 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500">
              <GraduationCap className="w-16 h-16 text-accent-brand mb-6 mx-auto drop-shadow-lg" />
              <h3 className="text-2xl font-bold mb-6 text-white">Experiencia 360</h3>
              <ul className="space-y-3 text-base text-white/90 text-left">
                <li>• Tech-enabled (habilitador, no reemplazo)</li>
                <li>• Data-oriented (decisiones basadas en datos)</li>
                <li>• Personalización continua</li>
              </ul>
            </Card>
            
            <Card className="p-10 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500">
              <Target className="w-16 h-16 text-accent-brand mb-6 mx-auto drop-shadow-lg" />
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
              Cambios Sistémicos en K-12
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-primary-700 mb-6">Transformaciones en Curso</h3>
              <p className="text-lg text-primary-900 mb-8 leading-relaxed">
                El sistema K-12 está experimentando cambios fundamentales que están redefiniendo la educación básica y media:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-700 mb-3">Menos colegios privados</h4>
                      <p className="text-base text-primary-900 leading-relaxed">Mayor presión sobre la calidad de la educación pública</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-700 mb-3">Aprendizajes fundamentales en riesgo</h4>
                      <p className="text-base text-primary-900 leading-relaxed">Más del 50% de estudiantes sin competencias básicas de lectura y matemáticas</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-700 mb-3">Tecnología solo para lo indispensable</h4>
                      <p className="text-base text-primary-900 leading-relaxed">Con niños pequeños - enfoque en desarrollo humano primero</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">4</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-700 mb-3">Más habilidades laborales</h4>
                      <p className="text-base text-primary-900 leading-relaxed">Integradas al graduarse del colegio</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">5</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-700 mb-3">Integración salud-educación</h4>
                      <p className="text-base text-primary-900 leading-relaxed">Para decisiones pedagógicas basadas en desarrollo integral</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">6</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-700 mb-3">Más superpoderes para profesores</h4>
                      <p className="text-base text-primary-900 leading-relaxed">Herramientas avanzadas de enseñanza potenciadas por IA</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <Card className="p-10 bg-gradient-to-br from-red-50 to-white border-0 shadow-2xl">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-red-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <span className="text-4xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-900 mb-4">La Brecha Digital Docente</h3>
                  <p className="text-lg text-primary-900 mb-4 leading-relaxed">
                    <strong className="text-red-600">Menos del 40%</strong> de docentes en América Latina se siente preparado para integrar tecnología en sus prácticas pedagógicas (UNESCO).
                  </p>
                  <p className="text-base text-primary-900 leading-relaxed">
                    El BID identifica una <strong>"brecha de competencias digitales docentes"</strong> que limita el aprovechamiento de herramientas EdTech incluso cuando hay acceso a infraestructura. Esta brecha es más crítica que la brecha de acceso tecnológico.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Educación Superior */}
      <Section className="py-20 bg-primary-700 text-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Cambios en Educación Superior
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-xl text-white/90 mb-12 text-center leading-relaxed">
              La educación superior está experimentando su transformación más profunda desde su creación
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Hiperpersonalización</h3>
                <ul className="space-y-3 text-white/90">
                  <li>• Tutores virtuales con IA que conocen a cada estudiante</li>
                  <li>• Adaptación de contenido y ritmo en tiempo real</li>
                  <li>• Rutas personalizadas según objetivos y capacidades</li>
                </ul>
              </Card>
              
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Nuevos Modelos</h3>
                <ul className="space-y-3 text-white/90">
                  <li>• <strong>Técnicos y Lifelong Learning</strong>: Educación continua como norma</li>
                  <li>• <strong>Universidades Corporativas</strong>: Hacku, Sistel, Laboratoria</li>
                  <li>• <strong>Micro-credentials</strong>: Certificaciones específicas</li>
                </ul>
              </Card>
              
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Operación Global</h3>
                <ul className="space-y-3 text-white/90">
                  <li>• Education as a Service</li>
                  <li>• Colaboración con OPMs, VCs EdTech, Big Tech</li>
                  <li>• <strong>73%</strong> de EdTechs colombianas operan en 2-10 países</li>
                </ul>
              </Card>
            </div>
            
            <Card className="p-8 bg-accent/20 border-accent/40">
              <p className="text-xl text-white font-semibold text-center">
                El diploma universitario tradicional está siendo complementado (y en algunos casos reemplazado) por portfolios de competencias verificables
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* ROI */}
      <Section className="py-20 bg-sand">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Educación = ROI (o Muerte)
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-primary-900 max-w-3xl mx-auto">
              La educación ya no es un gasto - es una inversión con retorno medible
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="p-10 bg-gradient-to-br from-accent-brand/10 to-white border-2 border-accent-brand/30 mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-primary-700 mb-4">Customer Education: El Nuevo Paradigma</h3>
                <p className="text-xl text-primary-900 mb-6">
                  <strong className="text-accent-brand">86%</strong> de las empresas confirman que sus estrategias de Customer Education son <strong>rentables y generan retorno medible</strong>
                </p>
                <div className="inline-block bg-accent-brand text-white px-8 py-4 rounded-xl">
                  <div className="text-5xl font-bold mb-2">372%</div>
                  <div className="text-lg">ROI Comprobado</div>
                  <div className="text-sm opacity-90">Forrester TEI Model, 2024</div>
                </div>
              </div>
            </Card>
            
            <h3 className="text-2xl font-bold text-primary-700 mb-8 text-center">Impacto Medible de Programas de Educación al Cliente</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-2 border-primary-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-primary-700">📈 Adopción de producto</span>
                  <span className="text-3xl font-bold text-primary-700">+38.3%</span>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-2 border-primary-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-primary-700">⭐ Engagement de usuarios</span>
                  <span className="text-3xl font-bold text-primary-700">+30.7%</span>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-2 border-primary-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-primary-700">😊 Satisfacción del cliente</span>
                  <span className="text-3xl font-bold text-primary-700">+26.2%</span>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-2 border-primary-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-primary-700">💎 Valor de vida (LTV)</span>
                  <span className="text-3xl font-bold text-primary-700">+34.6%</span>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-2 border-accent-brand/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-primary-700">⏱️ Ciclo de ventas</span>
                  <span className="text-3xl font-bold text-accent-brand">-8.1%</span>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-2 border-accent-brand/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-primary-700">🎫 Tickets de soporte</span>
                  <span className="text-3xl font-bold text-accent-brand">-15.5%</span>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-2 border-accent-brand/30 md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-primary-700">💵 Costos de soporte</span>
                  <span className="text-3xl font-bold text-accent-brand">-7.2%</span>
                </div>
              </Card>
            </div>
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
          
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-700 mb-8 text-center">Nuevos Segmentos Emergentes</h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-10 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-sand border-2 border-accent-brand/20 flex items-center justify-center shadow-lg">
                  <span className="text-4xl">👥</span>
                </div>
                <h4 className="text-xl font-bold text-primary-700 mb-3 text-center">Los Ninis</h4>
                <p className="text-sm text-accent mb-4 text-center italic">Investigación José Manuel Restrepo</p>
                <p className="text-base text-primary-900 mb-6 text-center leading-relaxed">Jóvenes que ni estudian ni trabajan - segmento en crecimiento</p>
                <div className="border-t-2 border-sand pt-6">
                  <p className="text-sm font-bold text-primary-700 mb-3 text-center">Necesidades Críticas:</p>
                  <ul className="space-y-2 text-sm text-primary-900">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Orientación vocacional efectiva</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Formación práctica inmediata</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Acompañamiento psicosocial</span>
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card className="p-10 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-sand border-2 border-accent-brand/20 flex items-center justify-center shadow-lg">
                  <span className="text-4xl">👴</span>
                </div>
                <h4 className="text-xl font-bold text-primary-700 mb-6 text-center">Silver Economy</h4>
                <p className="text-base text-primary-900 mb-6 text-center leading-relaxed">Población mayor de 60 años - segmento ignorado y en expansión</p>
                <div className="border-t-2 border-sand pt-6">
                  <p className="text-sm font-bold text-primary-700 mb-3 text-center">Necesidades Críticas:</p>
                  <ul className="space-y-2 text-sm text-primary-900">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Aprendizaje continuo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Actualización tecnológica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Propósito post-jubilación</span>
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card className="p-10 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-sand border-2 border-accent-brand/20 flex items-center justify-center shadow-lg">
                  <span className="text-4xl">📱</span>
                </div>
                <h4 className="text-xl font-bold text-primary-700 mb-6 text-center">Creadores de Contenido</h4>
                <p className="text-base text-primary-900 mb-6 text-center leading-relaxed">OnlyFans, YouTubers, TikTokers - nueva economía creativa</p>
                <div className="border-t-2 border-sand pt-6">
                  <p className="text-sm font-bold text-primary-700 mb-3 text-center">Necesidades Críticas:</p>
                  <ul className="space-y-2 text-sm text-primary-900">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Formación en business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Manejo tributario</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Branding personal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Diversificación de ingresos</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <Card className="p-10 bg-gradient-to-br from-accent/10 to-white border-2 border-accent/30">
              <h3 className="text-2xl font-bold text-primary-700 mb-6 text-center">
                Las Cuatro Necesidades Críticas de los Jóvenes Colombianos
              </h3>
              <p className="text-center text-sm text-primary-900 mb-8 italic">Investigación profunda de Educación Estrella</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🔍</span>
                  <div>
                    <h4 className="font-bold text-primary-700 mb-2">"No sé qué estudiar"</h4>
                    <p className="text-primary-900">Falta crítica de orientación vocacional real</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h4 className="font-bold text-primary-700 mb-2">"No tengo el dinero suficiente"</h4>
                    <p className="text-primary-900">Barreras económicas estructurales</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤔</span>
                  <div>
                    <h4 className="font-bold text-primary-700 mb-2">"No sé si es el camino correcto"</h4>
                    <p className="text-primary-900">Incertidumbre paralizante sobre el futuro</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">😔</span>
                  <div>
                    <h4 className="font-bold text-primary-700 mb-2">"Me siento solo"</h4>
                    <p className="text-primary-900">Necesidad fundamental de acompañamiento y comunidad</p>
                  </div>
                </div>
              </div>
            </Card>
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
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              De "Enseñamos X" a "Usamos Datos e IA para Transformar Vidas"
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Card className="p-10 bg-white/10 backdrop-blur-sm border-white/20 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">El Nuevo Posicionamiento de EdTechs Exitosas</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📊</span>
                  <div>
                    <h4 className="font-bold text-white mb-2">Personalización Real</h4>
                    <p className="text-white/90">Basada en datos de comportamiento de aprendizaje</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h4 className="font-bold text-white mb-2">Evaluación Continua</h4>
                    <p className="text-white/90">No punitiva sino orientadora y formativa</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📈</span>
                  <div>
                    <h4 className="font-bold text-white mb-2">Reportes en Tiempo Real</h4>
                    <p className="text-white/90">Para estudiantes, docentes y empleadores</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <h4 className="font-bold text-white mb-2">IA como Co-piloto</h4>
                    <p className="text-white/90">Augmentando capacidades humanas</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-10 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">La Descentralización de Títulos y Credenciales</h3>
              <p className="text-lg text-white/90 mb-6">
                El monopolio universitario del credencialismo está terminando:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">🏅 Badges Digitales</h4>
                  <p className="text-sm text-white/90">Con evidencia de competencias específicas</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">📜 Microcredenciales</h4>
                  <p className="text-sm text-white/90">Apilables y reconocidas por industria</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">💼 Portfolios de Competencias</h4>
                  <p className="text-sm text-white/90">Verificables en tiempo real</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">⛓️ Blockchain</h4>
                  <p className="text-sm text-white/90">Certificación inmutable y global</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Financiamiento */}
      <Section className="py-20 bg-sand">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-700 leading-tight">
              Financiamiento: Blended Finance
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-primary-900 max-w-3xl mx-auto">
              Nueva puerta de entrada al sector público
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-primary-900 mb-12 text-center leading-relaxed">
              El modelo de <strong className="text-primary-700">financiamiento mixto</strong> (blended finance) se consolida como estrategia exitosa para EdTechs que quieren trabajar con gobiernos
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-10 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-3xl">1</span>
                </div>
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Donantes + Gobiernos</h3>
                <p className="text-base text-primary-900 leading-relaxed">Reducir riesgo inicial y probar concepto</p>
              </Card>
              
              <Card className="p-10 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary-700 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-3xl">2</span>
                </div>
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Pilotos Medibles</h3>
                <p className="text-base text-primary-900 leading-relaxed">Demostrar impacto con datos duros</p>
              </Card>
              
              <Card className="p-10 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-3xl">3</span>
                </div>
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Escalamiento Contractual</h3>
                <p className="text-base text-primary-900 leading-relaxed">Crecimiento sostenible con contratación pública</p>
              </Card>
            </div>
            
            <Card className="p-10 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Beneficios del Modelo</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">✓</span>
                  <span>Entrar al sector público sin procesos de licitación tradicionales</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">✓</span>
                  <span>Demostrar valor antes de compromiso total del gobierno</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">✓</span>
                  <span>Escalar con evidencia sólida de impacto</span>
                </li>
              </ul>
            </Card>
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
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              El Futuro es Ahora
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-12 rounded-full"></div>
          </div>
          
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="p-10 bg-white/10 backdrop-blur-sm border-white/20 mb-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Los Cinco Principios de la Neoeducación</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="text-lg text-white/90 pt-1">
                    <strong className="text-white">La evaluación va primero</strong>, y es subjetiva y adaptada a cada persona
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="text-lg text-white/90 pt-1">
                    El <strong className="text-white">método ya no es lineal</strong> → Es experimental, iterativo y adaptativo
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="text-lg text-white/90 pt-1">
                    <strong className="text-white">Habilidades blandas = Power Skills</strong> - son competencias críticas, no complementarias
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <p className="text-lg text-white/90 pt-1">
                    Todos tendremos un <strong className="text-white">GPT "segundo cerebro"</strong> - la IA será extensión cognitiva
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <p className="text-lg text-white/90 pt-1">
                    Los <strong className="text-white">títulos están descentralizados</strong> - valor en competencias demostrables, no en diplomas
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-10 bg-accent/20 backdrop-blur-sm border-accent/40 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">La Nueva Ecuación del Empleo</h3>
              
              <div className="mb-8">
                <p className="text-white/90 mb-4 text-center">❌ El modelo viejo (que ya no funciona):</p>
                <div className="bg-white/10 p-6 rounded-lg">
                  <p className="text-lg text-white text-center font-mono">
                    Estudiamos → Nos graduamos → Buscamos empleo → <span className="text-red-300">Fracaso/Frustración</span>
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-white/90 mb-4 text-center">✅ El nuevo modelo (que está emergiendo):</p>
                <div className="bg-white/10 p-6 rounded-lg">
                  <p className="text-lg text-white mb-4 font-mono">
                    Ingresamos a la educación → <strong>Nos enfrentamos al mercado MIENTRAS estudiamos</strong> →
                  </p>
                  <p className="text-lg text-white mb-4 font-mono">
                    Nos graduamos con experiencia → <span className="text-green-300">Empleabilidad aumentada por:</span>
                  </p>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-center gap-2">
                      <span className="text-green-300">✓</span> Modelos mentales empresariales
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-300">✓</span> Power Skills probadas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-300">✓</span> Business Acumen desarrollado
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-300">✓</span> Capacidades digitales avanzadas
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <div className="text-center">
              <Card className="p-10 bg-white/10 backdrop-blur-sm border-white/20 mb-8">
                <h3 className="text-3xl font-bold text-white mb-6">"Las soluciones ya existen - ahora necesitamos unidad y escala"</h3>
                <p className="text-xl text-white/90 mb-6">
                  No podemos esperar que los gobiernos cambien las lógicas de la educación desde arriba. Con un mercado de <strong className="text-accent">$10 trillones USD</strong> para 2030, el sector privado, las organizaciones sin fines de lucro, y las alianzas público-privadas están <strong className="text-accent">transformando la educación HOY</strong>.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 p-6 rounded-lg">
                    <p className="text-lg text-white">⚡ El conocimiento se duplica cada <strong>2 años</strong></p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-lg">
                    <p className="text-lg text-white">⚡ 50% de habilidades obsoletas en <strong>5 años</strong></p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-lg">
                    <p className="text-lg text-white">⚡ La brecha educación-empleo <strong>se amplía</strong> cada día</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-lg">
                    <p className="text-lg text-white">⚡ Los estudiantes ya buscan <strong>alternativas</strong></p>
                  </div>
                </div>
                
                <p className="text-2xl font-bold text-accent mb-8">
                  El futuro de la educación no es una promesa lejana. El futuro es ahora.
                </p>
              </Card>
              
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-10 py-6 rounded-xl shadow-2xl hover:shadow-accent/40 transition-all duration-500 hover:scale-110 text-lg" asChild>
                <Link to="/asociados" className="flex items-center space-x-3">
                  <span>Sé Parte del Cambio</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>
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
