import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { AuthProvider } from "@/hooks/use-auth";

// Pages
import Index from "./pages/Index";
import Somos from "./pages/Somos";
import Asociados from "./pages/Asociados";
import AssociatesDirectory from "./pages/AssociatesDirectory";
import Aliados from "./pages/Aliados";
import Voluntariado from "./pages/Voluntariado";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <SkipToContent />
              <Navbar />
              <main id="main-content" className="flex-1" role="main">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/somos" element={<Somos />} />
                  <Route path="/asociados" element={<Asociados />} />
                  <Route path="/asociados/directorio" element={<AssociatesDirectory />} />
                  <Route path="/aliados" element={<Aliados />} />
                  <Route path="/voluntariado" element={<Voluntariado />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
