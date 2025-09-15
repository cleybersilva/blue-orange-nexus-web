import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import {
  Home,
  FolderKanban,
  Users,
  BookOpen,
  Globe,
  FileText,
  Zap,
  Inbox,
  Folder,
  BarChart3,
  Settings,
  Calendar,
  CheckSquare,
  MessageSquare,
  Star
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  {
    id: 'favorites',
    label: 'Favoritos',
    items: [
      { icon: Home, label: 'Dashboard', href: '/saas', end: true },
      { icon: FolderKanban, label: 'Projetos', href: '/saas/projects' },
      { icon: Users, label: 'Clientes', href: '/saas/clients' }
    ]
  },
  {
    id: 'projects',
    label: 'Projetos',
    items: [
      { icon: FolderKanban, label: 'Visão Geral', href: '/saas/projects' },
      { icon: Calendar, label: 'Timeline', href: '/saas/projects/timeline' },
      { icon: CheckSquare, label: 'Tarefas', href: '/saas/projects/tasks' },
      { icon: MessageSquare, label: 'Aprovações', href: '/saas/projects/approvals', badge: 3 },
      { icon: Folder, label: 'Arquivos', href: '/saas/projects/files' }
    ]
  },
  {
    id: 'clients',
    label: 'Clientes',
    items: [
      { icon: Users, label: 'Contas', href: '/saas/clients' },
      { icon: Users, label: 'Contatos', href: '/saas/clients/contacts' },
      { icon: Globe, label: 'Portal do Cliente', href: '/saas/clients/portal' }
    ]
  },
  {
    id: 'content',
    label: 'Conteúdo',
    items: [
      { icon: BookOpen, label: 'Dashboard do Autor', href: '/saas/conteudo/autor' },
      { icon: BookOpen, label: 'Artigos', href: '/saas/content/articles' },
      { icon: BookOpen, label: 'Categorias', href: '/saas/content/categories' },
      { icon: BookOpen, label: 'Tags', href: '/saas/content/tags' },
      { icon: Folder, label: 'Mídia', href: '/saas/content/media' }
    ]
  },
  {
    id: 'site',
    label: 'Site',
    items: [
      { icon: Globe, label: 'Páginas', href: '/saas/site/pages' },
      { icon: Globe, label: 'Seções', href: '/saas/site/sections' },
      { icon: Globe, label: 'Menus', href: '/saas/site/menus' },
      { icon: Globe, label: 'Cabeçalho', href: '/saas/site/header' },
      { icon: Globe, label: 'Rodapé', href: '/saas/site/footer' },
      { icon: Globe, label: 'SEO & Redirects', href: '/saas/site/seo' }
    ]
  },
  {
    id: 'tools',
    label: 'Ferramentas',
    items: [
      { icon: FileText, label: 'Formulários', href: '/saas/forms' },
      { icon: Zap, label: 'Automação', href: '/saas/automation' },
      { icon: Inbox, label: 'Mensagens', href: '/saas/messages', badge: 12 },
      { icon: BarChart3, label: 'Relatórios', href: '/saas/reports' }
    ]
  },
  {
    id: 'admin',
    label: 'Administração',
    items: [
      { icon: Settings, label: 'Configurações', href: '/saas/settings' }
    ]
  }
];

export const SaasSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (href: string, end?: boolean) => {
    if (end) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {menuItems.map((section) => (
          <SidebarGroup key={section.id}>
            {!collapsed && (
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.href}
                        className={({ isActive: navIsActive }) =>
                          `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            navIsActive || isActive(item.href, item.end)
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};