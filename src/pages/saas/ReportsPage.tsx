import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Eye, 
  MessageSquare,
  FileText,
  Plus,
  Search,
  Filter,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    type: 'analytics',
    period: '7d',
    format: 'pdf'
  });

  const { toast } = useToast();

  const analyticsData = {
    visitors: {
      total: 12547,
      change: 15.3,
      trend: 'up'
    },
    pageviews: {
      total: 28394,
      change: -2.1,
      trend: 'down'
    },
    bounceRate: {
      total: 32.5,
      change: -8.2,
      trend: 'down'
    },
    avgSession: {
      total: 245,
      change: 12.8,
      trend: 'up'
    }
  };

  const topPages = [
    { path: '/', views: 8945, change: 12.3 },
    { path: '/servicos', views: 4521, change: -5.2 },
    { path: '/sobre', views: 3210, change: 18.7 },
    { path: '/contato', views: 2847, change: 8.9 },
    { path: '/blog', views: 1956, change: 22.1 }
  ];

  const savedReports = [
    {
      id: '1',
      name: 'Relatório Semanal de Tráfego',
      type: 'analytics',
      last_generated: '2024-01-15T10:30:00Z',
      format: 'PDF',
      status: 'ready'
    },
    {
      id: '2',
      name: 'Performance de Formulários',
      type: 'forms',
      last_generated: '2024-01-14T15:45:00Z',
      format: 'Excel',
      status: 'processing'
    },
    {
      id: '3',
      name: 'Análise SEO Mensal',
      type: 'seo',
      last_generated: '2024-01-01T09:00:00Z',
      format: 'PDF',
      status: 'ready'
    }
  ];

  const handleGenerateReport = async () => {
    if (!newReport.name) {
      toast({
        title: "Erro",
        description: "Nome do relatório é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      // Implementar geração de relatório
      toast({
        title: "Sucesso",
        description: "Relatório sendo gerado. Você receberá uma notificação quando estiver pronto."
      });
      setIsReportDialogOpen(false);
      setNewReport({
        name: '',
        type: 'analytics',
        period: '7d',
        format: 'pdf'
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao gerar relatório",
        variant: "destructive"
      });
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

  const getStatusBadge = (status: string) => {
    const statusColors = {
      ready: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    }
    return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios e Analytics</h1>
          <p className="text-muted-foreground">
            Visualize métricas e gere relatórios personalizados
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar Novo Relatório</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="report_name">Nome do Relatório</Label>
                  <Input
                    id="report_name"
                    value={newReport.name}
                    onChange={(e) => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Relatório Semanal"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="report_type">Tipo</Label>
                    <Select
                      value={newReport.type}
                      onValueChange={(value) => setNewReport(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="forms">Formulários</SelectItem>
                        <SelectItem value="seo">SEO</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="report_period">Período</Label>
                    <Select
                      value={newReport.period}
                      onValueChange={(value) => setNewReport(prev => ({ ...prev, period: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7 dias</SelectItem>
                        <SelectItem value="30d">30 dias</SelectItem>
                        <SelectItem value="90d">90 dias</SelectItem>
                        <SelectItem value="1y">1 ano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="report_format">Formato</Label>
                  <Select
                    value={newReport.format}
                    onValueChange={(value) => setNewReport(prev => ({ ...prev, format: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleGenerateReport}>
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Relatórios Salvos</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
        </TabsList>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.visitors.total.toLocaleString()}</div>
                <div className="flex items-center text-xs">
                  {getTrendIcon(analyticsData.visitors.trend, analyticsData.visitors.change)}
                  <span className={analyticsData.visitors.change > 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(analyticsData.visitors.change)}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.pageviews.total.toLocaleString()}</div>
                <div className="flex items-center text-xs">
                  {getTrendIcon(analyticsData.pageviews.trend, analyticsData.pageviews.change)}
                  <span className={analyticsData.pageviews.change > 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(analyticsData.pageviews.change)}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.bounceRate.total}%</div>
                <div className="flex items-center text-xs">
                  {getTrendIcon(analyticsData.bounceRate.trend, analyticsData.bounceRate.change)}
                  <span className={analyticsData.bounceRate.change > 0 ? 'text-red-600' : 'text-green-600'}>
                    {Math.abs(analyticsData.bounceRate.change)}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.avgSession.total}s</div>
                <div className="flex items-center text-xs">
                  {getTrendIcon(analyticsData.avgSession.trend, analyticsData.avgSession.change)}
                  <span className={analyticsData.avgSession.change > 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(analyticsData.avgSession.change)}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs período anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top páginas */}
          <Card>
            <CardHeader>
              <CardTitle>Páginas Mais Visitadas</CardTitle>
              <CardDescription>Ranking das páginas com mais visualizações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">
                        {index + 1}
                      </span>
                      <span className="font-mono text-sm">{page.path}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{page.views.toLocaleString()}</span>
                      <div className="flex items-center">
                        {getTrendIcon(page.change > 0 ? 'up' : 'down', page.change)}
                        <span className={`text-xs ${page.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(page.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatórios Salvos */}
        <TabsContent value="reports" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar relatórios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="grid gap-4">
            {savedReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5" />
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription>
                        Gerado em {formatDate(report.last_generated)}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{report.format}</Badge>
                      <Badge className={getStatusBadge(report.status)}>
                        {report.status === 'ready' ? 'Pronto' : 
                         report.status === 'processing' ? 'Processando' : 'Erro'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report.status === 'ready' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Velocidade de Carregamento</CardTitle>
                <CardDescription>Tempo médio de carregamento das páginas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">1.2s</div>
                <p className="text-sm text-muted-foreground">
                  15% mais rápido que o mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
                <CardDescription>Métricas de experiência do usuário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">LCP</span>
                  <span className="text-sm font-medium text-green-600">1.8s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">FID</span>
                  <span className="text-sm font-medium text-green-600">45ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">CLS</span>
                  <span className="text-sm font-medium text-yellow-600">0.08</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}