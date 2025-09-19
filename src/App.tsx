
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
import { Toaster as Sonner } from "sonner";
import FloatingSocialButtons from './components/FloatingSocialButtons';
import NotFound from './pages/NotFound';
import WebsitePortfolioPage from './pages/services/WebsitePortfolioPage';
import EcommerceModaPage from './pages/portfolio/EcommerceModaPage';
import AppDeliveryPage from './pages/portfolio/AppDeliveryPage';
import SiteInstitucionalPage from './pages/portfolio/SiteInstitucionalPage';
import DashboardAnaliticoPage from './pages/portfolio/DashboardAnaliticoPage';
import RedeSocialCorporativaPage from './pages/portfolio/RedeSocialCorporativaPage';
import MarketplaceB2BPage from './pages/portfolio/MarketplaceB2BPage';
import AppGestaoFinanceiraPage from './pages/portfolio/AppGestaoFinanceiraPage';
import PortalEducacionalPage from './pages/portfolio/PortalEducacionalPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import { SaasLayout } from './components/saas/SaasLayout';
import SaasDashboard from './pages/saas/SaasDashboard';
import SaasAutorPage from './pages/saas/SaasAutorPage';
import { ProjectsPage as SaasProjectsPage } from './pages/saas/ProjectsPage';
import { ClientsPage } from './pages/saas/ClientsPage';
import { SitePagesPage } from './pages/saas/SitePagesPage';
import { FormsPage } from './pages/saas/FormsPage';
import { MessagesPage } from './pages/saas/MessagesPage';
import { SettingsPage } from './pages/saas/SettingsPage';
import TimelinePage from './pages/saas/TimelinePage';
import ProfilePage from './pages/saas/ProfilePage';
import TasksPage from './pages/saas/TasksPage';
import ApprovalsPage from './pages/saas/ApprovalsPage';
import FilesPage from './pages/saas/FilesPage';
import ContactsPage from './pages/saas/ContactsPage';
import CategoriesPage from './pages/saas/CategoriesPage';
import TagsPage from './pages/saas/TagsPage';
import ArticlesPage from './pages/saas/ArticlesPage';
import SiteSectionsPage from './pages/saas/SiteSectionsPage';
import MenusPage from './pages/saas/MenusPage';
import HeaderPage from './pages/saas/HeaderPage';
import FooterPage from './pages/saas/FooterPage';
import SeoPage from './pages/saas/SeoPage';
import AutomationPage from './pages/saas/AutomationPage';
import ReportsPage from './pages/saas/ReportsPage';
import AccountsPage from './pages/saas/AccountsPage';
import ClientPortalPage from './pages/saas/ClientPortalPage';
import MediaPage from './pages/saas/MediaPage';

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
                <Sonner />
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
                  
                  {/* Portfolio Project Pages */}
                  <Route path="/portfolio/ecommerce-moda" element={<EcommerceModaPage />} />
                  <Route path="/portfolio/app-delivery" element={<AppDeliveryPage />} />
                  <Route path="/portfolio/site-institucional" element={<SiteInstitucionalPage />} />
                  <Route path="/portfolio/dashboard-analitico" element={<DashboardAnaliticoPage />} />
                  <Route path="/portfolio/rede-social-corporativa" element={<RedeSocialCorporativaPage />} />
                  <Route path="/portfolio/marketplace-b2b" element={<MarketplaceB2BPage />} />
                  <Route path="/portfolio/app-gestao-financeira" element={<AppGestaoFinanceiraPage />} />
                  <Route path="/portfolio/portal-educacional" element={<PortalEducacionalPage />} />
                  
                  {/* Legal Pages */}
                  <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
                  <Route path="/termos-uso" element={<TermsOfUse />} />
                  
        {/* SaaS Routes */}
        <Route path="/saas" element={<SaasLayout />}>
          <Route index element={<SaasDashboard />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="projects" element={<SaasProjectsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="client-portal" element={<ClientPortalPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="forms" element={<FormsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="site/pages" element={<SitePagesPage />} />
          <Route path="site/sections" element={<SiteSectionsPage />} />
          <Route path="site/menus" element={<MenusPage />} />
          <Route path="site/header" element={<HeaderPage />} />
          <Route path="site/footer" element={<FooterPage />} />
          <Route path="site/seo" element={<SeoPage />} />
          <Route path="automation" element={<AutomationPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="conteudo/autor" element={<SaasAutorPage />} />
        </Route>
                  
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
