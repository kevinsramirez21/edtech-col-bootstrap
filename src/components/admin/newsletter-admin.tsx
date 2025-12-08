import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mail, CheckCircle, XCircle, Search, Download, Users } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed: boolean;
  created_at: string;
}

export function NewsletterAdmin() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Error al cargar suscripciones");
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = 
        statusFilter === "todos" || 
        (statusFilter === "activas" && sub.subscribed) ||
        (statusFilter === "inactivas" && !sub.subscribed);
      
      return matchesSearch && matchesStatus;
    });
  }, [subscriptions, searchTerm, statusFilter]);

  const exportToCSV = () => {
    const activeEmails = subscriptions.filter(s => s.subscribed).map(s => s.email);
    const csvContent = "data:text/csv;charset=utf-8," + activeEmails.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter_subscribers_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${activeEmails.length} emails exportados`);
  };

  const activeCount = subscriptions.filter(s => s.subscribed).length;
  const inactiveCount = subscriptions.filter(s => !s.subscribed).length;

  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mx-auto mb-4" />
            <p className="text-slate-500">Cargando suscripciones...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Suscripciones Newsletter</h2>
              <p className="text-white/80 text-sm">
                {activeCount} activas · {inactiveCount} inactivas · {subscriptions.length} total
              </p>
            </div>
          </div>
          <Button 
            onClick={exportToCSV}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-b">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{activeCount}</p>
              <p className="text-xs text-slate-500">Suscripciones activas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{inactiveCount}</p>
              <p className="text-xs text-slate-500">Suscripciones inactivas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar por email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-200"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 border-slate-200">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="activas">Activas</SelectItem>
            <SelectItem value="inactivas">Inactivas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CardContent className="p-0">
        {filteredSubscriptions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Users className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No hay suscripciones</h3>
            <p className="text-slate-500">No se encontraron suscripciones al newsletter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Email</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Fecha de suscripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <a href={`mailto:${subscription.email}`} className="text-[#0B47CE] hover:underline flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {subscription.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      {subscription.subscribed ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Activa
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-100">
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactiva
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {format(new Date(subscription.created_at), "d MMM yyyy, HH:mm", { locale: es })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
