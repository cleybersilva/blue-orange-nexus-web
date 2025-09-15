import React, { useState } from 'react';
import { Plus, Search, Edit, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForms, useFormSubmissions } from '@/hooks/useSaasQueries';
import { useCreateForm } from '@/hooks/useSaasMutations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export const FormsPage = () => {
  const { data: forms = [], isLoading } = useForms();
  const { data: allSubmissions = [] } = useFormSubmissions();
  const createForm = useCreateForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  const [newForm, setNewForm] = useState({
    name: '',
    description: '',
    is_active: true
  });

  const handleCreateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await createForm.mutateAsync({
      ...newForm,
      fields: [
        { type: 'text', name: 'name', label: 'Nome', required: true },
        { type: 'email', name: 'email', label: 'Email', required: true },
        { type: 'textarea', name: 'message', label: 'Mensagem', required: true }
      ],
      settings: {
        send_notification: true,
        redirect_url: '',
        success_message: 'Obrigado! Sua mensagem foi enviada com sucesso.'
      }
    });
    
    setIsNewFormOpen(false);
    setNewForm({
      name: '',
      description: '',
      is_active: true
    });
  };

  const getSubmissionCount = (formId: string) => {
    return allSubmissions.filter(sub => sub.form_id === formId).length;
  };

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6">Carregando formulários...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Formulários</h1>
          <p className="text-muted-foreground">Gerencie todos os formulários do seu site</p>
        </div>
        
        <Dialog open={isNewFormOpen} onOpenChange={setIsNewFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Formulário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Formulário</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateForm} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Formulário</Label>
                <Input
                  id="name"
                  value={newForm.name}
                  onChange={(e) => setNewForm({...newForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newForm.description}
                  onChange={(e) => setNewForm({...newForm, description: e.target.value})}
                  placeholder="Descreva o propósito deste formulário"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newForm.is_active}
                  onCheckedChange={(checked) => setNewForm({...newForm, is_active: checked})}
                />
                <Label htmlFor="is_active">Formulário ativo</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsNewFormOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createForm.isPending}>
                  {createForm.isPending ? 'Criando...' : 'Criar Formulário'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar formulários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => {
          const submissionCount = getSubmissionCount(form.id);
          
          return (
            <Card key={form.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{form.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {submissionCount} envios
                      </p>
                    </div>
                  </div>
                  <Badge variant={form.is_active ? "default" : "secondary"}>
                    {form.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {form.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {form.description}
                    </p>
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Campos:</p>
                    <div className="flex flex-wrap gap-1">
                      {(form.fields as any[])?.map((field, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {field.label}
                        </Badge>
                      )) || (
                        <Badge variant="outline" className="text-xs">
                          Sem campos configurados
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Criado em {new Date(form.created_at).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Dados
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhum formulário encontrado</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Tente buscar com outros termos' : 'Comece criando seu primeiro formulário'}
          </p>
        </div>
      )}
    </div>
  );
};