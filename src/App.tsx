
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
