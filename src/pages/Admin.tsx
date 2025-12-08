import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Users, Building2, Settings, BarChart3, Handshake, Mail, LogOut, Shield, TrendingUp, Clock, Sparkles } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AssociatesAdmin } from "@/components/admin/associates-admin"
import { VolunteersAdmin } from "@/components/admin/volunteers-admin"
import { AlliesAdmin } from "@/components/admin/allies-admin"
import { NewsletterAdmin } from "@/components/admin/newsletter-admin"
import { EnrichmentAdmin } from "@/components/admin/enrichment-admin"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/integrations/supabase/client"

interface DashboardStats {
  associates: number;
  pendingVolunteers: number;
  pendingAllies: number;
  newsletterSubscribers: number;
}

export default function Admin() {
  const { user, signOut } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    associates: 0,
    pendingVolunteers: 0,
    pendingAllies: 0,
    newsletterSubscribers: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [associatesRes, volunteersRes, alliesRes, newsletterRes] = await Promise.all([
        supabase.from("asociados").select("id", { count: "exact", head: true }),
        supabase.from("solicitudes_voluntarios").select("id", { count: "exact", head: true }).eq("estado", "pendiente"),
        supabase.from("solicitudes_aliados").select("id", { count: "exact", head: true }).eq("estado", "pendiente"),
        supabase.from("newsletter_subscriptions").select("id", { count: "exact", head: true }).eq("subscribed", true)
      ])

      setStats({
        associates: associatesRes.count || 0,
        pendingVolunteers: volunteersRes.count || 0,
        pendingAllies: alliesRes.count || 0,
        newsletterSubscribers: newsletterRes.count || 0
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const getUserInitials = () => {
    if (!user?.email) return "AD"
    return user.email.substring(0, 2).toUpperCase()
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Panel de Administración - Colombia EdTech</title>
        <meta name="description" content="Panel de administración para gestionar Colombia EdTech" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-[#003889] to-[#0B47CE] text-white shadow-xl">
          <Section className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-white/30 shadow-lg">
                  <AvatarFallback className="bg-white/20 text-white text-lg font-bold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">Panel de Administración</h1>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                      <Shield className="w-3 h-3" />
                      Admin
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>
          </Section>
        </div>

        {/* KPI Dashboard */}
        <Section className="py-6 -mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Asociados</p>
                    <p className="text-3xl font-bold text-[#003889]">{stats.associates}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#003889] to-[#0B47CE] flex items-center justify-center shadow-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>Empresas EdTech registradas</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Voluntarios Pendientes</p>
                    <p className="text-3xl font-bold text-amber-600">{stats.pendingVolunteers}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-amber-600">
                  <Clock className="w-3 h-3" />
                  <span>Esperando revisión</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Aliados Pendientes</p>
                    <p className="text-3xl font-bold text-[#F73C5C]">{stats.pendingAllies}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#F73C5C] to-rose-500 flex items-center justify-center shadow-lg">
                    <Handshake className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-[#F73C5C]">
                  <Clock className="w-3 h-3" />
                  <span>Solicitudes por aprobar</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Suscriptores Newsletter</p>
                    <p className="text-3xl font-bold text-emerald-600">{stats.newsletterSubscribers}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>Suscripciones activas</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Dashboard Content */}
        <Section className="pb-12">
          <Tabs defaultValue="associates" className="space-y-6">
            <TabsList className="bg-white shadow-md border-0 p-1.5 rounded-xl h-auto flex-wrap">
              <TabsTrigger 
                value="associates" 
                className="gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#003889] data-[state=active]:to-[#0B47CE] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Asociados</span>
              </TabsTrigger>
              <TabsTrigger 
                value="volunteers" 
                className="gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#003889] data-[state=active]:to-[#0B47CE] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Voluntarios</span>
                {stats.pendingVolunteers > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-amber-500 text-white text-xs rounded-full font-medium">
                    {stats.pendingVolunteers}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="allies" 
                className="gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#003889] data-[state=active]:to-[#0B47CE] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Handshake className="w-4 h-4" />
                <span className="hidden sm:inline">Aliados</span>
                {stats.pendingAllies > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-[#F73C5C] text-white text-xs rounded-full font-medium">
                    {stats.pendingAllies}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="newsletter" 
                className="gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#003889] data-[state=active]:to-[#0B47CE] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Newsletter</span>
              </TabsTrigger>
              <TabsTrigger 
                value="enrichment" 
                className="gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#003889] data-[state=active]:to-[#0B47CE] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Enriquecimiento IA</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#003889] data-[state=active]:to-[#0B47CE] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analíticas</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#003889] data-[state=active]:to-[#0B47CE] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Configuración</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="associates" className="space-y-6">
              <AssociatesAdmin />
            </TabsContent>

            <TabsContent value="volunteers" className="space-y-6">
              <VolunteersAdmin />
            </TabsContent>

            <TabsContent value="allies" className="space-y-6">
              <AlliesAdmin />
            </TabsContent>

            <TabsContent value="newsletter" className="space-y-6">
              <NewsletterAdmin />
            </TabsContent>

            <TabsContent value="enrichment" className="space-y-6">
              <EnrichmentAdmin />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
                  <CardTitle className="flex items-center gap-2 text-white text-xl">
                    <BarChart3 className="w-6 h-6" />
                    Analíticas y Reportes
                  </CardTitle>
                  <p className="text-white/80 text-sm mt-1">Visualiza el rendimiento de tu organización</p>
                </div>
                <CardContent className="p-8">
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Próximamente</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      Estamos trabajando en un dashboard de analíticas completo con métricas de crecimiento, engagement y más.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-600 to-slate-800 p-6">
                  <CardTitle className="flex items-center gap-2 text-white text-xl">
                    <Settings className="w-6 h-6" />
                    Configuración del Sistema
                  </CardTitle>
                  <p className="text-white/80 text-sm mt-1">Personaliza tu experiencia de administración</p>
                </div>
                <CardContent className="p-8">
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Settings className="w-12 h-12 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Próximamente</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      Aquí podrás configurar notificaciones, permisos de usuario, integraciones y más.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Section>
      </main>
    </AdminLayout>
  )
}
