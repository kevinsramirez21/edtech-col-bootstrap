import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/ui/skip-to-content";

// Pages
import Index from "./pages/Index";
import Somos from "./pages/Somos";
import Asociados from "./pages/Asociados";
import Aliados from "./pages/Aliados";
import Voluntariado from "./pages/Voluntariado";
import InvestigacionPoliticaPublica from "./pages/InvestigacionPoliticaPublica";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Eventos from "./pages/Eventos";
import EventoDetail from "./pages/EventoDetail";
import Contacto from "./pages/Contacto";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <SkipToContent />
          <Navbar />
          <main id="main-content" className="flex-1" role="main">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/somos" element={<Somos />} />
              <Route path="/asociados" element={<Asociados />} />
              <Route path="/aliados" element={<Aliados />} />
              <Route path="/voluntariado" element={<Voluntariado />} />
              <Route path="/investigacion-politica-publica" element={<InvestigacionPoliticaPublica />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/eventos/:slug" element={<EventoDetail />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
