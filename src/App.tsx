
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SobreNos from "./pages/SobreNos";
import Agendar from "./pages/Agendar";
import ProjectsPage from "./pages/ProjectsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import { CalendlyProvider } from "./components/CalendlyProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Ensure language updates apply to the entire app
const AppWithLanguage = () => {
  useEffect(() => {
    // Force all components to re-render when language changes
    const lang = localStorage.getItem('preferredLanguage') || 'pt-BR';
    document.documentElement.lang = lang;
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <CalendlyProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-uso" element={<TermsOfUse />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </CalendlyProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppWithLanguage />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
