import * as React from "react"
import { Navigate } from "react-router-dom"
import { Shield, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useAdmin } from "@/hooks/use-admin"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading: authLoading } = useAuth()
  const { isAdmin, loading: adminLoading } = useAdmin()

  // Show loading while checking authentication and admin status
  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-700" />
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Shield className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Acceso Denegado
          </h1>
          <p className="text-gray-600 mb-6">
            No tienes permisos para acceder a esta sección. 
            Solo los administradores pueden ver esta página.
          </p>
          <button
            onClick={() => window.history.back()}
            className="text-primary-700 hover:text-primary-800 font-medium"
          >
            Volver atrás
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}