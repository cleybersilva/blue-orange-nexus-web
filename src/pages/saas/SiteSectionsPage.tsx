import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Edit, Trash2, Eye, Move } from 'lucide-react';
import { useSiteSections, useSitePages } from '@/hooks/useSaasQueries';
import { useCreateSiteSection, useUpdateSiteSection } from '@/hooks/useSaasMutations';
import { useToast } from '@/hooks/use-toast';

export default function SiteSectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPageId, setSelectedPageId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState({
    name: '',
    type: 'hero',
    content: '',
    order_index: 0,
    is_active: true,
    page_id: ''
  });

  const { data: sections, isLoading } = useSiteSections(selectedPageId);
  const { data: pages } = useSitePages();
  const createSectionMutation = useCreateSiteSection();
  const updateSectionMutation = useUpdateSiteSection();
  const { toast } = useToast();

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSection.name || !newSection.page_id) {
      toast({
        title: "Erro",
        description: "Nome e página são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
      await createSectionMutation.mutateAsync({
        ...newSection,
        content: newSection.content ? JSON.parse(newSection.content) : {}
      });
      
      setNewSection({
        name: '',
        type: 'hero',
        content: '',
        order_index: 0,
        is_active: true,
        page_id: ''
      });
      setIsDialogOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Seção criada com sucesso"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar seção",
        variant: "destructive"
      });
    }
  };

  const toggleSectionStatus = async (section: any) => {
    try {
      await updateSectionMutation.mutateAsync({
        id: section.id,
        data: { ...section, is_active: !section.is_active }
      });
      
      toast({
        title: "Sucesso",
        description: `Seção ${section.is_active ? 'desativada' : 'ativada'} com sucesso`
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar seção",
        variant: "destructive"
      });
    }
  };

  const getSectionTypeColor = (type: string) => {
    const colors = {
      hero: 'bg-blue-100 text-blue-800',
      features: 'bg-green-100 text-green-800',
      cta: 'bg-orange-100 text-orange-800',
      testimonials: 'bg-purple-100 text-purple-800',
      faq: 'bg-gray-100 text-gray-800',
      contact: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredSections = sections?.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.type.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
          <h1 className="text-3xl font-bold">Seções do Site</h1>
          <p className="text-muted-foreground">
            Gerencie as seções e blocos de conteúdo das páginas
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Seção
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Seção</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSection} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Seção</Label>
                  <Input
                    id="name"
                    value={newSection.name}
                    onChange={(e) => setNewSection(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Hero Principal"
                  />
                </div>
                <div>
                  <Label htmlFor="page">Página</Label>
                  <Select
                    value={newSection.page_id}
                    onValueChange={(value) => setNewSection(prev => ({ ...prev, page_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a página" />
                    </SelectTrigger>
                    <SelectContent>
                      {pages?.map((page) => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={newSection.type}
                    onValueChange={(value) => setNewSection(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero</SelectItem>
                      <SelectItem value="features">Características</SelectItem>
                      <SelectItem value="cta">Call-to-Action</SelectItem>
                      <SelectItem value="testimonials">Depoimentos</SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                      <SelectItem value="contact">Contato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={newSection.order_index}
                    onChange={(e) => setNewSection(prev => ({ ...prev, order_index: parseInt(e.target.value) }))}
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="content">Conteúdo (JSON)</Label>
                <Textarea
                  id="content"
                  value={newSection.content}
                  onChange={(e) => setNewSection(prev => ({ ...prev, content: e.target.value }))}
                  placeholder='{"title": "Título", "subtitle": "Subtítulo"}'
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newSection.is_active}
                  onCheckedChange={(checked) => setNewSection(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="active">Seção ativa</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Criar Seção</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar seções..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedPageId} onValueChange={setSelectedPageId}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filtrar por página" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as páginas</SelectItem>
            {pages?.map((page) => (
              <SelectItem key={page.id} value={page.id}>
                {page.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredSections.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Move className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma seção encontrada</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Crie sua primeira seção para começar.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredSections.map((section: any) => (
            <Card key={section.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                    <CardDescription>
                      Página: {section.page?.title || 'N/A'} • Ordem: {section.order_index}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSectionTypeColor(section.type)}>{section.type}</Badge>
                    <Badge variant={section.is_active ? "default" : "secondary"}>
                      {section.is_active ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleSectionStatus(section)}
                  >
                    <Switch 
                      checked={section.is_active}
                      onChange={() => {}}
                      className="data-[state=checked]:bg-primary"
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p><strong>Conteúdo:</strong></p>
                  <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-auto">
                    {JSON.stringify(section.content, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}