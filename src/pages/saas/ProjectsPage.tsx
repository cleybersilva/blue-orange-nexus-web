import React, { useState } from 'react';
import { Plus, Filter, Calendar, Users, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjects, useClients } from '@/hooks/useSaasQueries';
import { useCreateProject } from '@/hooks/useSaasMutations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const ProjectsPage = () => {
  const { data: projects = [], isLoading } = useProjects();
  const { data: clients } = useClients();
  const createProject = useCreateProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'website',
    status: 'planning',
    priority: 'medium',
    client_id: ''
  });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'review': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6">Carregando projetos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projetos</h1>
          <p className="text-muted-foreground">Gerencie todos os projetos da agência</p>
        </div>
        
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

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Timeline
        </Button>
        <Button variant="outline">
          <FolderKanban className="h-4 w-4 mr-2" />
          Kanban
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.client?.name || 'Cliente não definido'}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description || 'Sem descrição'}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-xs">
                  {project.type}
                </Badge>
                <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                {project.start_date && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Início: {new Date(project.start_date).toLocaleDateString('pt-BR')}
                  </div>
                )}
                {project.due_date && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Prazo: {new Date(project.due_date).toLocaleDateString('pt-BR')}
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center">
                    R$ {project.budget.toLocaleString('pt-BR')}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Tente buscar com outros termos' : 'Comece criando seu primeiro projeto'}
          </p>
        </div>
      )}
    </div>
  );
};