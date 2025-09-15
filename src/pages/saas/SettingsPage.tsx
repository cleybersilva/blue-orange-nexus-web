import React, { useState } from 'react';
import { Settings, User, Shield, Database, Zap, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    company_name: 'AgênciaDigital HUB',
    company_email: 'contato@agenciadigitalhub.com',
    company_phone: '+55 11 99999-9999',
    company_address: '',
    website_url: 'https://agenciadigitalhub.com',
    timezone: 'America/Sao_Paulo'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    whatsapp_notifications: true,
    project_updates: true,
    new_leads: true,
    deadlines: true,
    daily_summary: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    smtp_host: '',
    smtp_port: '587',
    smtp_user: '',
    smtp_password: '',
    whatsapp_api_key: '',
    analytics_id: '',
    recaptcha_key: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Configure seu sistema SaaS</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Geral</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Integrações</span>
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Site</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company_name">Nome da Empresa</Label>
                  <Input
                    id="company_name"
                    value={generalSettings.company_name}
                    onChange={(e) => setGeneralSettings({...generalSettings, company_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="company_email">Email Corporativo</Label>
                  <Input
                    id="company_email"
                    type="email"
                    value={generalSettings.company_email}
                    onChange={(e) => setGeneralSettings({...generalSettings, company_email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company_phone">Telefone</Label>
                  <Input
                    id="company_phone"
                    value={generalSettings.company_phone}
                    onChange={(e) => setGeneralSettings({...generalSettings, company_phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="website_url">Website</Label>
                  <Input
                    id="website_url"
                    value={generalSettings.website_url}
                    onChange={(e) => setGeneralSettings({...generalSettings, website_url: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company_address">Endereço</Label>
                <Textarea
                  id="company_address"
                  value={generalSettings.company_address}
                  onChange={(e) => setGeneralSettings({...generalSettings, company_address: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                    <SelectItem value="America/New_York">Nova York (UTC-5)</SelectItem>
                    <SelectItem value="Europe/London">Londres (UTC+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button>Convidar Usuário</Button>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  Lista de usuários será implementada aqui
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Autenticação de dois fatores</h4>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login único (SSO)</h4>
                    <p className="text-sm text-muted-foreground">Permitir login via Google/Microsoft</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Logs de auditoria</h4>
                    <p className="text-sm text-muted-foreground">Registrar todas as ações do sistema</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button>Salvar Configurações de Segurança</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Configurações de Email (SMTP)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp_host">Servidor SMTP</Label>
                    <Input
                      id="smtp_host"
                      value={integrationSettings.smtp_host}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, smtp_host: e.target.value})}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp_port">Porta</Label>
                    <Input
                      id="smtp_port"
                      value={integrationSettings.smtp_port}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, smtp_port: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp_user">Usuário</Label>
                    <Input
                      id="smtp_user"
                      value={integrationSettings.smtp_user}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, smtp_user: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp_password">Senha</Label>
                    <Input
                      id="smtp_password"
                      type="password"
                      value={integrationSettings.smtp_password}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, smtp_password: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">WhatsApp API</h4>
                <div>
                  <Label htmlFor="whatsapp_api_key">Chave da API</Label>
                  <Input
                    id="whatsapp_api_key"
                    value={integrationSettings.whatsapp_api_key}
                    onChange={(e) => setIntegrationSettings({...integrationSettings, whatsapp_api_key: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Analytics e Monitoramento</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="analytics_id">Google Analytics ID</Label>
                    <Input
                      id="analytics_id"
                      value={integrationSettings.analytics_id}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, analytics_id: e.target.value})}
                      placeholder="GA4-XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recaptcha_key">reCAPTCHA Key</Label>
                    <Input
                      id="recaptcha_key"
                      value={integrationSettings.recaptcha_key}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, recaptcha_key: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Button>Salvar Integrações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Modo Manutenção</h4>
                    <p className="text-sm text-muted-foreground">Exibir página de manutenção para visitantes</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cache</h4>
                    <p className="text-sm text-muted-foreground">Habilitar cache para melhor performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Compressão de imagens</h4>
                    <p className="text-sm text-muted-foreground">Otimizar automaticamente imagens carregadas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">SEO Padrão</h4>
                <div>
                  <Label htmlFor="default_meta_title">Meta Título Padrão</Label>
                  <Input
                    id="default_meta_title"
                    placeholder="AgênciaDigital HUB - Soluções Digitais Completas"
                  />
                </div>
                <div>
                  <Label htmlFor="default_meta_description">Meta Descrição Padrão</Label>
                  <Textarea
                    id="default_meta_description"
                    placeholder="Transformamos ideias em soluções digitais inovadoras..."
                  />
                </div>
              </div>

              <Button>Salvar Configurações do Site</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};