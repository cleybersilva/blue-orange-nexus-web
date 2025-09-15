import React, { useState } from 'react';
import { Plus, Search, Edit, Globe, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSitePages } from '@/hooks/useSaasQueries';
import { useCreateSitePage } from '@/hooks/useSaasMutations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const SitePagesPage = () => {
  const { data: pages = [], isLoading } = useSitePages();
  const createPage = useCreateSitePage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewPageOpen, setIsNewPageOpen] = useState(false);
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    status: 'draft'
  });

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newPage.slug || newPage.title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    
    await createPage.mutateAsync({
      ...newPage,
      slug,
      content: {}
    });
    
    setIsNewPageOpen(false);
    setNewPage({
      title: '',
      slug: '',
      meta_title: '',
      meta_description: '',
      status: 'draft'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6">Carregando páginas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Páginas do Site</h1>
          <p className="text-muted-foreground">Gerencie todas as páginas do seu website</p>
        </div>
        
        <Dialog open={isNewPageOpen} onOpenChange={setIsNewPageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Página
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Página</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Página</Label>
                <Input
                  id="title"
                  value={newPage.title}
                  onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={newPage.slug}
                  onChange={(e) => setNewPage({...newPage, slug: e.target.value})}
                  placeholder="Gerado automaticamente se vazio"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL: /{newPage.slug || newPage.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}
                </p>
              </div>

              <div>
                <Label htmlFor="meta_title">Meta Título (SEO)</Label>
                <Input
                  id="meta_title"
                  value={newPage.meta_title}
                  onChange={(e) => setNewPage({...newPage, meta_title: e.target.value})}
                  placeholder="Título para mecanismos de busca"
                />
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Descrição (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={newPage.meta_description}
                  onChange={(e) => setNewPage({...newPage, meta_description: e.target.value})}
                  placeholder="Descrição para mecanismos de busca"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newPage.status} onValueChange={(value) => setNewPage({...newPage, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsNewPageOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createPage.isPending}>
                  {createPage.isPending ? 'Criando...' : 'Criar Página'}
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
              placeholder="Buscar páginas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <Card key={page.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      /{page.slug}
                    </p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(page.status)}`}>
                  {page.status === 'published' ? 'Publicado' : 'Rascunho'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {page.meta_title && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Meta Título:</p>
                    <p className="text-sm line-clamp-2">{page.meta_title}</p>
                  </div>
                )}
                
                {page.meta_description && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Meta Descrição:</p>
                    <p className="text-sm line-clamp-3 text-muted-foreground">{page.meta_description}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Atualizado em {new Date(page.updated_at).toLocaleDateString('pt-BR')}
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  {page.status === 'published' && (
                    <Button size="sm" variant="outline">
                      <Globe className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhuma página encontrada</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Tente buscar com outros termos' : 'Comece criando sua primeira página'}
          </p>
        </div>
      )}
    </div>
  );
};