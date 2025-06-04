
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import SobreNos from './pages/SobreNos';
import ServicosPage from './pages/ServicosPage';
import Agendar from './pages/Agendar';
import ProjectsPage from './pages/ProjectsPage';
import WebsitesPage from './pages/services/WebsitesPage';
import EcommercePage from './pages/services/EcommercePage';
import AppsPage from './pages/services/AppsPage';
import LMSPage from './pages/services/LMSPage';
import MarketingPage from './pages/services/MarketingPage';
import SocialMediaPage from './pages/services/SocialMediaPage';
import DesignPage from './pages/services/DesignPage';
import PoliticalPage from './pages/services/PoliticalPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminAuthorsPage from './pages/AdminAuthorsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminRequestsPage from './pages/AdminRequestsPage';
import ArticleEditor from './components/admin/ArticleEditor';
import PWAFuturo2025 from './pages/blog/PWAFuturo2025';
import CaseEcommerceIA from './pages/blog/CaseEcommerceIA';
import MarketingDataDriven from './pages/blog/MarketingDataDriven';
import ChatbotsAutomacao from './pages/blog/ChatbotsAutomacao';
import TendenciasUXUI2025 from './pages/blog/TendenciasUXUI2025';
import IAMarketingDigital2025 from './pages/blog/IAMarketingDigital2025';
import { LanguageProvider } from './components/LanguageProvider';
import { CalendlyProvider } from './components/CalendlyProvider';
import { AuthProvider } from './hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import FloatingSocialButtons from './components/FloatingSocialButtons';
import NotFound from './pages/NotFound';
import WebsitePortfolioPage from './pages/services/WebsitePortfolioPage';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <LanguageProvider>
        <CalendlyProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <div className="App">
                <Toaster />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sobre-nos" element={<SobreNos />} />
                  <Route path="/sobre" element={<SobreNos />} />
                  <Route path="/servicos" element={<ServicosPage />} />
                  <Route path="/contato" element={<Agendar />} />
                  <Route path="/agendar" element={<Agendar />} />
                  <Route path="/projetos" element={<ProjectsPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  
                  {/* Blog Article Routes - Static pages */}
                  <Route path="/blog/pwa-futuro-2025" element={<PWAFuturo2025 />} />
                  <Route path="/blog/case-ecommerce-ia" element={<CaseEcommerceIA />} />
                  <Route path="/blog/marketing-digital-data-driven" element={<MarketingDataDriven />} />
                  <Route path="/blog/chatbots-automacao" element={<ChatbotsAutomacao />} />
                  <Route path="/blog/tendencias-ux-ui-2025" element={<TendenciasUXUI2025 />} />
                  <Route path="/blog/ia-marketing-digital-2025" element={<IAMarketingDigital2025 />} />
                  
                  {/* Dynamic blog article route */}
                  <Route path="/blog/:slug" element={<BlogArticlePage />} />
                  
                  <Route path="/servicos/websites" element={<WebsitesPage />} />
                  <Route path="/servicos/ecommerce" element={<EcommercePage />} />
                  <Route path="/servicos/apps" element={<AppsPage />} />
                  <Route path="/servicos/lms" element={<LMSPage />} />
                  <Route path="/servicos/marketing-digital" element={<MarketingPage />} />
                  <Route path="/servicos/social-media" element={<SocialMediaPage />} />
                  <Route path="/servicos/design-grafico" element={<DesignPage />} />
                  <Route path="/servicos/marketing-politico" element={<PoliticalPage />} />
                  <Route path="/servicos/websites/portfolio" element={<WebsitePortfolioPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin/blog" element={<AdminDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/authors" element={<AdminAuthorsPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/requests" element={<AdminRequestsPage />} />
                  
                  {/* Article Editor Routes */}
                  <Route path="/admin/articles/new" element={<ArticleEditor />} />
                  <Route path="/admin/articles/edit/:id" element={<ArticleEditor />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FloatingSocialButtons />
              </div>
            </AuthProvider>
          </QueryClientProvider>
        </CalendlyProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
