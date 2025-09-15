import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClients, useProjects } from '@/hooks/useSaasQueries';
import { useCreateProject } from '@/hooks/useSaasMutations';
import {
  FolderKanban,
  Calendar,
  CheckSquare,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight
} from 'lucide-react';

const kpiCards = [
  {
    title: 'Projetos Ativos',
    value: '12',
    description: '+2 este mês',
    icon: FolderKanban,
    trend: 'up'
  },
  {
    title: 'Marcos na Semana',
    value: '8',
    description: '3 vencendo hoje',
    icon: Calendar,
    trend: 'warning'
  },
  {
    title: 'Tarefas Pendentes',
    value: '24',
    description: '6 vencendo hoje',
    icon: CheckSquare,
    trend: 'warning'
  },
  {
    title: 'Novos Contatos',
    value: '5',
    description: 'Últimos 7 dias',
    icon: Users,
    trend: 'up'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'project',
    title: 'Projeto Website E-commerce aprovado pelo cliente',
    time: '2 min atrás',
    user: 'Cliente: Loja ABC'
  },
  {
    id: 2,
    type: 'task',
    title: 'Tarefa "Design homepage" marcada como concluída',
    time: '15 min atrás',
    user: 'Por: Ana Designer'
  },
  {
    id: 3,
    type: 'content',
    title: 'Artigo "Tendências UX 2025" publicado no blog',
    time: '1h atrás',
    user: 'Por: Editor'
  },
  {
    id: 4,
    type: 'client',
    title: 'Novo lead recebido via formulário de contato',
    time: '2h atrás',
    user: 'Lead: Empresa XYZ'
  }
];

const activeProjects = [
  {
    id: 1,
    name: 'Website E-commerce',
    client: 'Loja ABC',
    progress: 75,
    status: 'Em andamento',
    dueDate: '2025-01-20'
  },
  {
    id: 2,
    name: 'Campanha Social Media',
    client: 'Empresa XYZ',
    progress: 45,
    status: 'Em revisão',
    dueDate: '2025-01-15'
  },
  {
    id: 3,
    name: 'Identidade Visual',
    client: 'Startup Tech',
    progress: 90,
    status: 'Aguardando aprovação',
    dueDate: '2025-01-10'
  }
];

export default function SaasDashboard() {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'website',
    status: 'planning',
    priority: 'medium',
    client_id: ''
  });

  const { data: clients } = useClients();
  const createProject = useCreateProject();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.client_id) {
      alert('Cliente é obrigatório');
      return;
    }
    try {
      await createProject.mutateAsync(newProject);
      setIsNewProjectOpen(false);
      setNewProject({
        name: '',
        description: '',
        type: 'website',
        status: 'planning',
        priority: 'medium',
        client_id: ''
      });
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está o resumo do que está acontecendo.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Projeto</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Projeto *</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="client">Cliente *</Label>
                  <Select value={newProject.client_id} onValueChange={(value) => setNewProject({...newProject, client_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients?.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={newProject.type} onValueChange={(value) => setNewProject({...newProject, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="campaign">Campanha</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="app">App</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newProject.status} onValueChange={(value) => setNewProject({...newProject, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planejamento</SelectItem>
                        <SelectItem value="in_progress">Em Progresso</SelectItem>
                        <SelectItem value="review">Revisão</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select value={newProject.priority} onValueChange={(value) => setNewProject({...newProject, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createProject.isPending}>
                    {createProject.isPending ? 'Criando...' : 'Criar Projeto'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${
                card.trend === 'up' ? 'text-green-600' : 
                card.trend === 'warning' ? 'text-yellow-600' : 
                'text-muted-foreground'
              }`}>
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Timeline/Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timeline - Atividades Recentes
            </CardTitle>
            <CardDescription>
              Atualizações em tempo real dos seus projetos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todas as atividades
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Projetos Ativos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              Projetos Ativos
            </CardTitle>
            <CardDescription>
              Acompanhe o progresso dos seus projetos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="space-y-2 p-3 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <Badge variant={
                      project.status === 'Em andamento' ? 'default' :
                      project.status === 'Em revisão' ? 'secondary' :
                      'outline'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progresso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Prazo: {new Date(project.dueDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todos os projetos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Minha Fila & Alertas SLA */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Minha Fila
            </CardTitle>
            <CardDescription>
              Tarefas atribuídas a você
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded border">
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Revisar design da homepage</p>
                  <p className="text-xs text-muted-foreground">Projeto: Website E-commerce</p>
                </div>
                <Badge variant="destructive">Urgente</Badge>
              </div>
              <div className="flex items-center gap-3 p-2 rounded border">
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Criar conteúdo para blog</p>
                  <p className="text-xs text-muted-foreground">Categoria: Marketing Digital</p>
                </div>
                <Badge variant="secondary">Hoje</Badge>
              </div>
              <div className="flex items-center gap-3 p-2 rounded border">
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Configurar analytics</p>
                  <p className="text-xs text-muted-foreground">Projeto: Campanha Social</p>
                </div>
                <Badge variant="outline">Amanhã</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertas SLA
            </CardTitle>
            <CardDescription>
              Itens que precisam de atenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded border border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Projeto sem atualização há 5 dias</p>
                  <p className="text-xs text-muted-foreground">Identidade Visual - Startup Tech</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded border border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Aprovação pendente há 2 dias</p>
                  <p className="text-xs text-muted-foreground">Website E-commerce - Loja ABC</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded border border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Lead sem resposta há 1 dia</p>
                  <p className="text-xs text-muted-foreground">Empresa XYZ - Orçamento</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}