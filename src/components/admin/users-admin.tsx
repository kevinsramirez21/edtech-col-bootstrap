import { useEffect, useState } from "react"
import { Loader2, Shield, ShieldOff, RefreshCw, UserCog } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface AdminUser {
  id: string
  email: string | null
  created_at: string
  last_sign_in_at: string | null
  confirmed: boolean
  first_name: string | null
  last_name: string | null
  organization: string | null
  roles: string[]
}

export function UsersAdmin() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action: "list" },
    })
    if (error || data?.error) {
      toast({
        title: "Error al cargar usuarios",
        description: data?.error ?? error?.message,
        variant: "destructive",
      })
      setUsers([])
    } else {
      setUsers(data.users ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleAdmin = async (target: AdminUser) => {
    const makeAdmin = !target.roles.includes("administrador")
    setUpdatingId(target.id)
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action: "set_admin", user_id: target.id, make_admin: makeAdmin },
    })
    setUpdatingId(null)

    if (error || data?.error) {
      toast({
        title: "No se pudo actualizar el rol",
        description: data?.error ?? error?.message,
        variant: "destructive",
      })
      return
    }

    toast({
      title: makeAdmin ? "Administrador asignado" : "Rol de administrador removido",
      description: target.email ?? target.id,
    })
    fetchUsers()
  }

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      !q ||
      u.email?.toLowerCase().includes(q) ||
      `${u.first_name ?? ""} ${u.last_name ?? ""}`.toLowerCase().includes(q) ||
      u.organization?.toLowerCase().includes(q)
    )
  })

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#003889] to-[#0B47CE] p-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <CardTitle className="flex items-center gap-2 text-white text-xl">
            <UserCog className="w-6 h-6" />
            Usuarios registrados
          </CardTitle>
          <p className="text-white/80 text-sm mt-1">
            Consulta las cuentas registradas y gestiona los permisos de administrador
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchUsers}
          disabled={loading}
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      <CardContent className="p-6 space-y-4">
        <Input
          placeholder="Buscar por correo, nombre u organización..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        {loading ? (
          <div className="py-16 text-center text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />
            Cargando usuarios...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">No hay usuarios para mostrar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="py-3 pr-4 font-medium">Usuario</th>
                  <th className="py-3 pr-4 font-medium">Roles</th>
                  <th className="py-3 pr-4 font-medium">Registro</th>
                  <th className="py-3 pr-4 font-medium">Último acceso</th>
                  <th className="py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => {
                  const isAdmin = u.roles.includes("administrador")
                  const isSelf = u.id === user?.id
                  return (
                    <tr key={u.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <div className="font-medium text-foreground">{u.email ?? "—"}</div>
                        <div className="text-muted-foreground text-xs">
                          {[u.first_name, u.last_name].filter(Boolean).join(" ") || "Sin nombre"}
                          {u.organization ? ` · ${u.organization}` : ""}
                          {isSelf ? " · (tú)" : ""}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {(u.roles.length ? u.roles : ["visitante"]).map((r) => (
                            <Badge key={r} variant={r === "administrador" ? "default" : "secondary"}>
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {new Date(u.created_at).toLocaleDateString("es-CO")}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {u.last_sign_in_at
                          ? new Date(u.last_sign_in_at).toLocaleDateString("es-CO")
                          : "Nunca"}
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          size="sm"
                          variant={isAdmin ? "outline" : "default"}
                          disabled={updatingId === u.id || (isAdmin && isSelf)}
                          onClick={() => toggleAdmin(u)}
                        >
                          {updatingId === u.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : isAdmin ? (
                            <ShieldOff className="w-4 h-4 mr-2" />
                          ) : (
                            <Shield className="w-4 h-4 mr-2" />
                          )}
                          {isAdmin ? "Quitar admin" : "Hacer admin"}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
