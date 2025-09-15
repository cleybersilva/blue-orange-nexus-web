import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  Settings, 
  Lock, 
  Eye, 
  Users, 
  MessageSquare,
  FileText,
  Download,
  Upload,
  Plus,
  Edit,
  Share2,
  Shield,
  Key,
  Bell,
  Palette,
  Layout
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [portalSettings, setPortalSettings] = useState({
    enabled: true,
    domain: 'portal.agenciadigital.com',
    theme_color: '#3B82F6',
    logo_url: '',
    welcome_message: 'Bem-vindo ao seu portal de cliente',
    allow_file_upload: true,
    allow_comments: true,
    require_approval: false,
    email_notifications: true,
    custom_css: ''
  });

  const { toast } = useToast();

  // Mock data para demonstração
  const portalStats = {
    activeClients: 23,
    totalLogins: 456,
    filesShared: 128,
    messagesExchanged: 89
  };

  const recentActivity = [
    {
      id: '1',
      client: 'Empresa ABC',
      action: 'Visualizou projeto "Website Redesign"',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'view'
    },
    {
      id: '2', 
      client: 'Tech Corp',
      action: 'Baixou arquivo "Proposta_Final.pdf"',
      timestamp: '2024-01-15T09:15:00Z',
      type: 'download'
    },
    {
      id: '3',
      client: 'Startup XYZ',
      action: 'Enviou nova mensagem',
      timestamp: '2024-01-14T16:45:00Z',
      type: 'message'
    }
  ];

  const portalFeatures = [
    {
      name: 'Visualização de Projetos',
      description: 'Clientes podem acompanhar o progresso dos seus projetos',
      enabled: true
    },
    {
      name: 'Download de Arquivos',
      description: 'Permite download de deliverables e documentos',
      enabled: true
    },
    {
      name: 'Sistema de Mensagens',
      description: 'Comunicação direta entre cliente e equipe',
      enabled: true
    },
    {
      name: 'Aprovação Online',
      description: 'Clientes podem aprovar trabalhos diretamente no portal',
      enabled: false
    },
    {
      name: 'Faturamento',
      description: 'Visualização de faturas e histórico de pagamentos',
      enabled: false
    },
    {
      name: 'Relatórios',
      description: 'Relatórios personalizados de progresso e métricas',
      enabled: false
    }
  ];

  const handleSaveSettings = async () => {
    try {
      // Implementar salvamento das configurações
      toast({
        title: "Sucesso",
        description: "Configurações do portal salvas com sucesso"
      });
      setIsSettingsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar configurações",
        variant: "destructive"
      });
    }
  };

  const toggleFeature = (featureName: string) => {
    // Implementar toggle de features
    toast({
      title: "Feature atualizada",
      description: `${featureName} ${portalFeatures.find(f => f.name === featureName)?.enabled ? 'desabilitada' : 'habilitada'}`
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'view':
        return <Eye className="h-4 w-4 text-blue-600" />;
      case 'download':
        return <Download className="h-4 w-4 text-green-600" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portal do Cliente</h1>
          <p className="text-muted-foreground">
            Configure e gerencie o portal de acesso para seus clientes
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Globe className="h-4 w-4 mr-2" />
            Visitar Portal
          </Button>
          
          <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Configurações do Portal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="domain">Domínio do Portal</Label>
                    <Input
                      id="domain"
                      value={portalSettings.domain}
                      onChange={(e) => setPortalSettings(prev => ({ ...prev, domain: e.target.value }))}
                      placeholder="portal.suaempresa.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="theme_color">Cor do Tema</Label>
                    <Input
                      id="theme_color"
                      type="color"
                      value={portalSettings.theme_color}
                      onChange={(e) => setPortalSettings(prev => ({ ...prev, theme_color: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="logo_url">URL do Logo</Label>
                  <Input
                    id="logo_url"
                    value={portalSettings.logo_url}
                    onChange={(e) => setPortalSettings(prev => ({ ...prev, logo_url: e.target.value }))}
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>
                
                <div>
                  <Label htmlFor="welcome_message">Mensagem de Boas-vindas</Label>
                  <Textarea
                    id="welcome_message"
                    value={portalSettings.welcome_message}
                    onChange={(e) => setPortalSettings(prev => ({ ...prev, welcome_message: e.target.value }))}
                    placeholder="Mensagem que aparecerá na página inicial do portal"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow_upload">Permitir upload de arquivos</Label>
                    <Switch
                      id="allow_upload"
                      checked={portalSettings.allow_file_upload}
                      onCheckedChange={(checked) => setPortalSettings(prev => ({ ...prev, allow_file_upload: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow_comments">Permitir comentários</Label>
                    <Switch
                      id="allow_comments"
                      checked={portalSettings.allow_comments}
                      onCheckedChange={(checked) => setPortalSettings(prev => ({ ...prev, allow_comments: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_approval">Aprovar uploads antes de publicar</Label>
                    <Switch
                      id="require_approval"
                      checked={portalSettings.require_approval}
                      onCheckedChange={(checked) => setPortalSettings(prev => ({ ...prev, require_approval: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email_notifications">Notificações por email</Label>
                    <Switch
                      id="email_notifications"
                      checked={portalSettings.email_notifications}
                      onCheckedChange={(checked) => setPortalSettings(prev => ({ ...prev, email_notifications: checked }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="custom_css">CSS Personalizado</Label>
                  <Textarea
                    id="custom_css"
                    value={portalSettings.custom_css}
                    onChange={(e) => setPortalSettings(prev => ({ ...prev, custom_css: e.target.value }))}
                    placeholder="/* CSS personalizado para o portal */"
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveSettings}>
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="access">Controle de Acesso</TabsTrigger>
          <TabsTrigger value="activity">Atividades</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portalStats.activeClients}</div>
                <p className="text-xs text-muted-foreground">Com acesso ao portal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Logins</CardTitle>
                <Key className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portalStats.totalLogins}</div>
                <p className="text-xs text-muted-foreground">Este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Arquivos Compartilhados</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portalStats.filesShared}</div>
                <p className="text-xs text-muted-foreground">Downloads realizados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portalStats.messagesExchanged}</div>
                <p className="text-xs text-muted-foreground">Trocadas este mês</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Status do Portal</CardTitle>
              <CardDescription>
                Configurações atuais do portal do cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-green-100 text-green-800">
                      Portal Ativo
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Domínio</Label>
                  <p className="text-sm text-muted-foreground mt-1">{portalSettings.domain}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Última Atualização</Label>
                  <p className="text-sm text-muted-foreground mt-1">15/01/2024 às 14:30</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Versão</Label>
                  <p className="text-sm text-muted-foreground mt-1">v2.1.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Funcionalidades */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades Disponíveis</CardTitle>
              <CardDescription>
                Ative ou desative funcionalidades do portal conforme necessário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {portalFeatures.map((feature) => (
                <div key={feature.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{feature.name}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={() => toggleFeature(feature.name)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Controle de Acesso */}
        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Controle de Acesso</CardTitle>
                <CardDescription>
                  Gerencie permissões e acessos dos clientes
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Acesso
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Administradores</h4>
                      <p className="text-sm text-muted-foreground">Acesso total ao portal</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">3 usuários</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Clientes Premium</h4>
                      <p className="text-sm text-muted-foreground">Acesso a funcionalidades avançadas</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">8 usuários</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Clientes Padrão</h4>
                      <p className="text-sm text-muted-foreground">Acesso básico ao portal</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">12 usuários</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Atividades */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Acompanhe as atividades dos clientes no portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.client}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}