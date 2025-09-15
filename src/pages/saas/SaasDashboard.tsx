import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
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