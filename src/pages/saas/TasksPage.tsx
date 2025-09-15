import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProjectTasks, useProjects } from "@/hooks/useSaasQueries";
import { useCreateTask, useUpdateTask } from "@/hooks/useSaasMutations";
import { Plus, Calendar, User, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface TaskFormData {
  title: string;
  description: string;
  project_id: string;
  priority: string;
  due_date: string;
  status: string;
}

export default function TasksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const { data: tasks, refetch } = useProjectTasks();
  const { data: projects } = useProjects();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    project_id: '',
    priority: 'medium',
    due_date: '',
    status: 'todo'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTask) {
        await updateTask.mutateAsync({
          id: editingTask.id,
          data: formData
        });
      } else {
        await createTask.mutateAsync(formData);
      }
      
      setIsDialogOpen(false);
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        project_id: '',
        priority: 'medium',
        due_date: '',
        status: 'todo'
      });
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar tarefa');
    }
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      project_id: task.project_id,
      priority: task.priority,
      due_date: task.due_date || '',
      status: task.status
    });
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await updateTask.mutateAsync({
        id: taskId,
        data: { status: newStatus }
      });
      refetch();
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'todo': return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredTasks = tasks?.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <p className="text-muted-foreground">Gerencie todas as tarefas dos projetos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTask(null);
              setFormData({
                title: '',
                description: '',
                project_id: '',
                priority: 'medium',
                due_date: '',
                status: 'todo'
              });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
              <DialogDescription>
                {editingTask ? 'Edite as informações da tarefa.' : 'Adicione uma nova tarefa ao projeto.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="project_id">Projeto</Label>
                <Select value={formData.project_id} onValueChange={(value) => setFormData({...formData, project_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">A Fazer</SelectItem>
                      <SelectItem value="in_progress">Em Progresso</SelectItem>
                      <SelectItem value="completed">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="due_date">Data de Vencimento</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingTask ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Todas
        </Button>
        <Button
          variant={filter === 'todo' ? 'default' : 'outline'}
          onClick={() => setFilter('todo')}
        >
          A Fazer
        </Button>
        <Button
          variant={filter === 'in_progress' ? 'default' : 'outline'}
          onClick={() => setFilter('in_progress')}
        >
          Em Progresso
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Concluídas
        </Button>
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  {task.description && (
                    <p className="text-muted-foreground mb-2">{task.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {task.project?.name && (
                      <span>Projeto: {task.project.name}</span>
                    )}
                    {task.due_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.due_date).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Select value={task.status} onValueChange={(value) => handleStatusChange(task.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">A Fazer</SelectItem>
                      <SelectItem value="in_progress">Em Progresso</SelectItem>
                      <SelectItem value="completed">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={() => handleEdit(task)}>
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}