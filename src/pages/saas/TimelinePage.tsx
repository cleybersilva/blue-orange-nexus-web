import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, FileText, MessageSquare, CheckCircle } from "lucide-react";
import { useProjects } from "@/hooks/useSaasQueries";

interface TimelineEvent {
  id: string;
  type: 'project' | 'task' | 'message' | 'meeting';
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'in_progress';
  user: string;
  project?: string;
}

export default function TimelinePage() {
  const { data: projects } = useProjects();

  // Mock timeline data - in real app, this would come from API
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      type: 'project',
      title: 'Projeto Website E-commerce Iniciado',
      description: 'Kickoff meeting realizado com cliente ABC Corp',
      date: '2025-01-15T10:00:00Z',
      status: 'completed',
      user: 'João Silva',
      project: 'E-commerce ABC'
    },
    {
      id: '2',
      type: 'task',
      title: 'Design Homepage Finalizado',
      description: 'Mockups da página inicial aprovados pelo cliente',
      date: '2025-01-14T16:30:00Z',
      status: 'completed',
      user: 'Maria Santos',
      project: 'E-commerce ABC'
    },
    {
      id: '3',
      type: 'message',
      title: 'Cliente Solicitou Alterações',
      description: 'Ajustes na seção de produtos conforme feedback',
      date: '2025-01-14T09:15:00Z',
      status: 'pending',
      user: 'Cliente ABC',
      project: 'E-commerce ABC'
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Reunião de Review Agendada',
      description: 'Apresentação dos protótipos finais',
      date: '2025-01-16T14:00:00Z',
      status: 'in_progress',
      user: 'Equipe Design',
      project: 'E-commerce ABC'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <FileText className="h-4 w-4" />;
      case 'task':
        return <CheckCircle className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Timeline</h1>
          <p className="text-muted-foreground">Acompanhe todas as atividades e eventos</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Filtrar por Data
        </Button>
      </div>

      <div className="grid gap-4">
        {timelineEvents.map((event, index) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`p-2 rounded-full ${getStatusColor(event.status)}`}>
                    {getIcon(event.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-2">{event.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {event.user}
                    </div>
                    {event.project && (
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {event.project}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Cronograma Visual</CardTitle>
          <CardDescription>Vista em linha do tempo dos próximos eventos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-muted"></div>
            <div className="space-y-6">
              {timelineEvents.slice(0, 4).map((event, index) => (
                <div key={event.id} className="relative flex items-center gap-4">
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center ${getStatusColor(event.status)}`}>
                      {getIcon(event.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}