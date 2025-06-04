import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import WebsitesPage from './pages/services/WebsitesPage';
import ECommercePage from './pages/services/ECommercePage';
import AppsPage from './pages/services/AppsPage';
import LMSSolutionsPage from './pages/services/LMSSolutionsPage';
import MarketingDigitalPage from './pages/services/MarketingDigitalPage';
import SocialMediaPage from './pages/services/SocialMediaPage';
import DesignGraficoPage from './pages/services/DesignGraficoPage';
import MarketingPoliticoPage from './pages/services/MarketingPoliticoPage';
import { LanguageProvider } from './components/LanguageProvider';
import { CalendlyProvider } from './components/CalendlyProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from '@/components/ui/toaster';
import FloatingSocialButtons from './components/FloatingSocialButtons';
import NotFoundPage from './pages/NotFoundPage';
import WebsitePortfolioPage from './pages/services/WebsitePortfolioPage';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <LanguageProvider>
        <CalendlyProvider>
          <QueryClientProvider client={queryClient}>
            <div className="App">
              <Toaster />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/servicos" element={<ServicesPage />} />
                <Route path="/contato" element={<ContactPage />} />
                <Route path="/projetos" element={<ProjectsPage />} />
                <Route path="/servicos/websites" element={<WebsitesPage />} />
                <Route path="/servicos/ecommerce" element={<ECommercePage />} />
                <Route path="/servicos/apps" element={<AppsPage />} />
                <Route path="/servicos/lms" element={<LMSSolutionsPage />} />
                <Route path="/servicos/marketing-digital" element={<MarketingDigitalPage />} />
                <Route path="/servicos/social-media" element={<SocialMediaPage />} />
                <Route path="/servicos/design-grafico" element={<DesignGraficoPage />} />
                <Route path="/servicos/marketing-politico" element={<MarketingPoliticoPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/servicos/websites/portfolio" element={<WebsitePortfolioPage />} />
              </Routes>
              <FloatingSocialButtons />
            </div>
          </QueryClientProvider>
        </CalendlyProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
