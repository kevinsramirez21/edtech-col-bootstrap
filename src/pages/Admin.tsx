import { Helmet } from "react-helmet-async"
import { Users, Building2, Settings, BarChart3 } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AssociatesAdmin } from "@/components/admin/associates-admin"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"

export default function Admin() {
  const { user } = useAuth()

  return (
    <AdminLayout>
      <Helmet>
        <title>Panel de Administración - Colombia EdTech</title>
        <meta name="description" content="Panel de administración para gestionar Colombia EdTech" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <Section className="bg-white border-b py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900">
                Panel de Administración
              </h1>
              <p className="text-gray-600 mt-2">
                Bienvenido, {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Admin</span>
            </div>
          </div>
        </Section>

        {/* Dashboard Content */}
        <Section className="py-8">
          <Tabs defaultValue="associates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="associates" className="gap-2">
                <Building2 className="w-4 h-4" />
                Asociados
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Analíticas
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                Configuración
              </TabsTrigger>
            </TabsList>

            <TabsContent value="associates" className="space-y-6">
              <AssociatesAdmin />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Gestión de Usuarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600">
                      Gestión de usuarios próximamente
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analíticas y Reportes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600">
                      Analíticas y reportes próximamente
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configuración del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600">
                      Configuración del sistema próximamente
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