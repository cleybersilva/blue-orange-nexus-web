import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  TrendingUp, 
  Globe, 
  Share,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useSitePages } from '@/hooks/useSaasQueries';
import { useToast } from '@/hooks/use-toast';

export default function SeoPage() {
  const [activeTab, setActiveTab] = useState('seo');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRedirectDialogOpen, setIsRedirectDialogOpen] = useState(false);
  const [newRedirect, setNewRedirect] = useState({
    source_path: '',
    destination_url: '',
    type: '301',
    notes: '',
    is_active: true
  });

  const { data: pages } = useSitePages();
  const { toast } = useToast();

  // Mock data para exemplificar
  const seoPages = [
    {
      id: '1',
      title: 'Página Inicial',
      path: '/',
      meta_title: 'AgênciaDigital HUB - Desenvolvimento Web e Marketing Digital',
      meta_description: 'Transforme sua presença digital com nossos serviços especializados...',
      score: 85,
      issues: ['Meta description muito longa']
    },
    {
      id: '2', 
      title: 'Sobre Nós',
      path: '/sobre',
      meta_title: 'Sobre a AgênciaDigital HUB',
      meta_description: '',
      score: 60,
      issues: ['Meta description ausente', 'Title muito curto']
    }
  ];

  const redirects = [
    {
      id: '1',
      source_path: '/old-page',
      destination_url: '/new-page',
      type: '301',
      hits: 245,
      last_hit: '2024-01-15',
      is_active: true
    },
    {
      id: '2',
      source_path: '/produto-antigo',
      destination_url: '/servicos',
      type: '301', 
      hits: 89,
      last_hit: '2024-01-10',
      is_active: true
    }
  ];

  const handleCreateRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRedirect.source_path || !newRedirect.destination_url) {
      toast({
        title: "Erro",
        description: "Caminho de origem e destino são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
      // Implementar criação no Supabase
      toast({
        title: "Sucesso",
        description: "Redirecionamento criado com sucesso"
      });
      setIsRedirectDialogOpen(false);
      setNewRedirect({
        source_path: '',
        destination_url: '',
        type: '301',
        notes: '',
        is_active: true
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar redirecionamento",
        variant: "destructive"
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO & Redirecionamentos</h1>
          <p className="text-muted-foreground">
            Otimize o SEO das páginas e gerencie redirecionamentos
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seo" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>SEO das Páginas</span>
          </TabsTrigger>
          <TabsTrigger value="redirects" className="flex items-center space-x-2">
            <ArrowRight className="h-4 w-4" />
            <span>Redirecionamentos</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Analytics SEO</span>
          </TabsTrigger>
        </TabsList>

        {/* SEO das Páginas */}
        <TabsContent value="seo" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar páginas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="grid gap-4">
            {seoPages.map((page) => (
              <Card key={page.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CardTitle className="text-lg">{page.title}</CardTitle>
                      <CardDescription>{page.path}</CardDescription>
                    </div>
                    <Badge className={getScoreBadge(page.score)}>
                      Score: {page.score}/100
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Meta Title</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {page.meta_title || 'Não definido'}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Meta Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {page.meta_description || 'Não definida'}
                      </p>
                    </div>
                    
                    {page.issues.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium flex items-center text-yellow-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Problemas Encontrados
                        </Label>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          {page.issues.map((issue, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Redirecionamentos */}
        <TabsContent value="redirects" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar redirecionamentos..."
                className="pl-8"
              />
            </div>
            
            <Dialog open={isRedirectDialogOpen} onOpenChange={setIsRedirectDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Redirecionamento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Redirecionamento</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateRedirect} className="space-y-4">
                  <div>
                    <Label htmlFor="source">Caminho de Origem</Label>
                    <Input
                      id="source"
                      value={newRedirect.source_path}
                      onChange={(e) => setNewRedirect(prev => ({ ...prev, source_path: e.target.value }))}
                      placeholder="/pagina-antiga"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="destination">URL de Destino</Label>
                    <Input
                      id="destination"
                      value={newRedirect.destination_url}
                      onChange={(e) => setNewRedirect(prev => ({ ...prev, destination_url: e.target.value }))}
                      placeholder="/nova-pagina"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Tipo de Redirecionamento</Label>
                    <Select
                      value={newRedirect.type}
                      onValueChange={(value) => setNewRedirect(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="301">301 - Permanente</SelectItem>
                        <SelectItem value="302">302 - Temporário</SelectItem>
                        <SelectItem value="308">308 - Permanente (Preserva método)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notas (Opcional)</Label>
                    <Textarea
                      id="notes"
                      value={newRedirect.notes}
                      onChange={(e) => setNewRedirect(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Motivo do redirecionamento..."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active_redirect"
                      checked={newRedirect.is_active}
                      onCheckedChange={(checked) => setNewRedirect(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="active_redirect">Redirecionamento ativo</Label>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsRedirectDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Criar Redirecionamento</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {redirects.map((redirect) => (
              <Card key={redirect.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {redirect.source_path}
                        </span>
                        <ArrowRight className="h-4 w-4 mx-2" />
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {redirect.destination_url}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {redirect.hits} acessos • Último: {redirect.last_hit}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{redirect.type}</Badge>
                      <Badge variant={redirect.is_active ? "default" : "secondary"}>
                        {redirect.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics SEO */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Páginas Indexadas</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">+3 esta semana</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">78</div>
                <p className="text-xs text-muted-foreground">+5 desde o último mês</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Redirecionamentos Ativos</CardTitle>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">334 acessos este mês</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Páginas com Problemas de SEO</CardTitle>
              <CardDescription>
                Páginas que precisam de atenção para melhorar o SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoPages.filter(page => page.issues.length > 0).map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{page.title}</h4>
                      <p className="text-sm text-muted-foreground">{page.path}</p>
                      <p className="text-sm text-red-600 mt-1">
                        {page.issues.length} problema(s) encontrado(s)
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getScoreBadge(page.score)}>
                        {page.score}/100
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Corrigir
                      </Button>
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