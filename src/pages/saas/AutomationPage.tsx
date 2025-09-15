import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Zap, 
  Mail, 
  MessageSquare, 
  Calendar,
  Clock,
  Settings,
  Activity
} from 'lucide-react';
import { useAutomationWorkflows } from '@/hooks/useSaasQueries';
import { useCreateAutomationWorkflow } from '@/hooks/useSaasMutations';
import { useToast } from '@/hooks/use-toast';

export default function AutomationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger_type: 'form_submission',
    trigger_config: {},
    actions: [],
    is_active: true
  });

  const { data: workflows, isLoading } = useAutomationWorkflows();
  const createWorkflowMutation = useCreateAutomationWorkflow();
  const { toast } = useToast();

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newWorkflow.name) {
      toast({
        title: "Erro",
        description: "Nome do workflow é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      await createWorkflowMutation.mutateAsync(newWorkflow);
      
      setNewWorkflow({
        name: '',
        description: '',
        trigger_type: 'form_submission',
        trigger_config: {},
        actions: [],
        is_active: true
      });
      setIsDialogOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Workflow criado com sucesso"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar workflow",
        variant: "destructive"
      });
    }
  };

  const getTriggerIcon = (type: string) => {
    const icons = {
      form_submission: Mail,
      page_visit: Activity,
      user_signup: MessageSquare,
      scheduled: Clock,
      webhook: Zap
    };
    const IconComponent = icons[type as keyof typeof icons] || Zap;
    return <IconComponent className="h-4 w-4" />;
  };

  const getTriggerBadgeColor = (type: string) => {
    const colors = {
      form_submission: 'bg-blue-100 text-blue-800',
      page_visit: 'bg-green-100 text-green-800',
      user_signup: 'bg-purple-100 text-purple-800',
      scheduled: 'bg-orange-100 text-orange-800',
      webhook: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const mockWorkflows = [
    {
      id: '1',
      name: 'Boas-vindas por Email',
      description: 'Enviar email de boas-vindas quando novo usuário se cadastra',
      trigger_type: 'user_signup',
      is_active: true,
      executions: 234,
      success_rate: 98,
      last_run: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Formulário de Contato',
      description: 'Notificar equipe quando formulário é preenchido',
      trigger_type: 'form_submission',
      is_active: true,
      executions: 89,
      success_rate: 100,
      last_run: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      name: 'Relatório Semanal',
      description: 'Gerar e enviar relatório semanal de métricas',
      trigger_type: 'scheduled',
      is_active: false,
      executions: 12,
      success_rate: 95,
      last_run: '2024-01-08T08:00:00Z'
    }
  ];

  const filteredWorkflows = mockWorkflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Automação</h1>
          <p className="text-muted-foreground">
            Configure workflows automáticos para otimizar processos
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Workflow</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Workflow</Label>
                  <Input
                    id="name"
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Boas-vindas por Email"
                  />
                </div>
                <div>
                  <Label htmlFor="trigger">Tipo de Gatilho</Label>
                  <Select
                    value={newWorkflow.trigger_type}
                    onValueChange={(value) => setNewWorkflow(prev => ({ ...prev, trigger_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form_submission">Envio de Formulário</SelectItem>
                      <SelectItem value="page_visit">Visita de Página</SelectItem>
                      <SelectItem value="user_signup">Cadastro de Usuário</SelectItem>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o que este workflow faz..."
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newWorkflow.is_active}
                  onCheckedChange={(checked) => setNewWorkflow(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="active">Workflow ativo</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Criar Workflow</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows Ativos</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">de 3 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Execuções Hoje</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.2%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">Execução</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar workflows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid gap-4">
        {filteredWorkflows.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Zap className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum workflow encontrado</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Crie seu primeiro workflow para começar a automatizar processos.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredWorkflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded">
                    {getTriggerIcon(workflow.trigger_type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <CardDescription>{workflow.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTriggerBadgeColor(workflow.trigger_type)}>
                      {workflow.trigger_type.replace('_', ' ')}
                    </Badge>
                    <Badge variant={workflow.is_active ? "default" : "secondary"}>
                      {workflow.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={workflow.is_active ? "text-orange-600" : "text-green-600"}
                  >
                    {workflow.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-muted-foreground">Execuções</Label>
                    <p className="font-medium">{workflow.executions}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Taxa de Sucesso</Label>
                    <p className={`font-medium ${workflow.success_rate >= 95 ? 'text-green-600' : 'text-orange-600'}`}>
                      {workflow.success_rate}%
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Última Execução</Label>
                    <p className="font-medium">{formatDate(workflow.last_run)}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Histórico
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}