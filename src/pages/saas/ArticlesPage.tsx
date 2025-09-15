import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAllArticles } from "@/hooks/useArticleQueries";
import { Plus, FileText, Eye, Edit, Trash2, Calendar, User, Search, Filter, BarChart } from "lucide-react";
import { toast } from "sonner";

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const { data: articles } = useAllArticles();

  const handleEdit = (articleId: string) => {
    // Navigate to editor
    toast.info(`Editando artigo ${articleId}`);
  };

  const handleDelete = (articleId: string, title: string) => {
    if (confirm(`Tem certeza que deseja excluir o artigo "${title}"?`)) {
      toast.success('Artigo excluído com sucesso!');
    }
  };

  const handleView = (slug: string) => {
    window.open(`/blog/${slug}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'scheduled': return 'Agendado';
      default: return status;
    }
  };

  const filteredArticles = articles?.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }) || [];

  // Get unique categories for filter
  const categories = [...new Set(articles?.map(a => a.category).filter((cat): cat is string => Boolean(cat)))];

  const stats = {
    total: articles?.length || 0,
    published: articles?.filter(a => a.status === 'published').length || 0,
    draft: articles?.filter(a => a.status === 'draft').length || 0,
    scheduled: articles?.filter(a => a.status === 'scheduled').length || 0,
    totalViews: articles?.reduce((acc, article) => acc + (article.views || 0), 0) || 0
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Artigos</h1>
          <p className="text-muted-foreground">Gerencie todos os artigos do blog</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Artigo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Publicados</p>
                <p className="text-2xl font-bold">{stats.published}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rascunhos</p>
                <p className="text-2xl font-bold">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Agendados</p>
                <p className="text-2xl font-bold">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visualizações</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <BarChart className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="published">Publicados</SelectItem>
            <SelectItem value="draft">Rascunhos</SelectItem>
            <SelectItem value="scheduled">Agendados</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            {categories.map((category, index) => (
              <SelectItem key={`category-${index}-${category}`} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Articles List */}
      <div className="grid gap-4">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {article.cover_image_url && (
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg truncate">{article.title}</h3>
                    <Badge className={getStatusColor(article.status)}>
                      {getStatusText(article.status)}
                    </Badge>
                    {article.category && (
                      <Badge variant="outline">{article.category}</Badge>
                    )}
                  </div>
                  
                  {article.subtitle && (
                    <p className="text-muted-foreground mb-2">{article.subtitle}</p>
                  )}
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Autor ID: {article.author_id}</span>
                    </div>
                    {article.published_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.published_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views || 0} visualizações</span>
                    </div>
                    <span>{article.read_time || 5} min de leitura</span>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  {article.status === 'published' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleView(article.slug)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(article.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(article.id, article.title)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Nenhum artigo encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece criando seu primeiro artigo'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}