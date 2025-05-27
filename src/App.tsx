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
import ServicosPage from "./pages/ServicosPage";
import BlogPage from "./pages/BlogPage";
import WebsitesPage from "./pages/services/WebsitesPage";
import EcommercePage from "./pages/services/EcommercePage";
import AppsPage from "./pages/services/AppsPage";
import LMSPage from "./pages/services/LMSPage";
import MarketingPage from "./pages/services/MarketingPage";
import SocialMediaPage from "./pages/services/SocialMediaPage";
import DesignPage from "./pages/services/DesignPage";
import PoliticalPage from "./pages/services/PoliticalPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import { CalendlyProvider } from "./components/CalendlyProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

// Component to force re-render when language changes
const LanguageHandler = () => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Language change detected in App');
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    i18n.on('languageChanged', (lng) => {
      console.log('i18n language changed to:', lng);
    });
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      i18n.off('languageChanged');
    };
  }, [i18n]);

  return null;
};

// Ensure language updates apply to the entire app
const AppWithLanguage = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <CalendlyProvider>
          <LanguageHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/servicos/websites" element={<WebsitesPage />} />
            <Route path="/servicos/ecommerce" element={<EcommercePage />} />
            <Route path="/servicos/aplicativos" element={<AppsPage />} />
            <Route path="/servicos/lms" element={<LMSPage />} />
            <Route path="/servicos/marketing" element={<MarketingPage />} />
            <Route path="/servicos/midias-sociais" element={<SocialMediaPage />} />
            <Route path="/servicos/design" element={<DesignPage />} />
            <Route path="/servicos/politicas" element={<PoliticalPage />} />
            <Route path="/blog" element={<BlogPage />} />
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
