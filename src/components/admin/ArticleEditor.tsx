
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCreateArticle, useUpdateArticle, useArticleById, useAuthors } from '@/hooks/useBlogData';
import { Loader2, Save, Eye, ArrowLeft, RefreshCw } from 'lucide-react';

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  console.log('ArticleEditor - Component mounted with ID:', id);
  console.log('ArticleEditor - Is editing mode:', isEditing);
  
  const { data: article, isLoading: articleLoading, error: articleError, refetch: refetchArticle } = useArticleById(id || '');
  const { data: authors } = useAuthors();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  console.log('ArticleEditor - Hook results:', {
    article: article,
    articleLoading: articleLoading,
    articleError: articleError,
    authorsCount: authors?.length || 0
  });

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    summary: '',
    content: '',
    author_id: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    category: 'Tecnologia',
    cover_image_url: '',
    read_time: 5,
    published_at: '',
    scheduled_at: ''
  });

  const [isFormPopulated, setIsFormPopulated] = useState(false);

  // Debug do estado do formulário
  useEffect(() => {
    console.log('ArticleEditor - Form data state:', formData);
    console.log('ArticleEditor - Is form populated:', isFormPopulated);
  }, [formData, isFormPopulated]);

  // Efeito principal para popular o formulário
  useEffect(() => {
    console.log('ArticleEditor - Main effect triggered:', {
      isEditing,
      hasArticle: !!article,
      articleId: article?.id,
      isFormPopulated
    });
    
    if (isEditing && article && !isFormPopulated) {
      console.log('ArticleEditor - Populating form with article data:', article);
      
      // Converter datas para formato input datetime-local
      const formatDateForInput = (dateString: string | null) => {
        if (!dateString) return '';
        try {
          return new Date(dateString).toISOString().slice(0, 16);
        } catch (error) {
          console.error('Error formatting date:', error);
          return '';
        }
      };
      
      const newFormData = {
        title: article.title || '',
        subtitle: article.subtitle || '',
        summary: article.summary || '',
        content: article.content || '',
        author_id: article.author_id || '',
        status: article.status || 'draft',
        category: article.category || 'Tecnologia',
        cover_image_url: article.cover_image_url || '',
        read_time: article.read_time || 5,
        published_at: formatDateForInput(article.published_at),
        scheduled_at: formatDateForInput(article.scheduled_at)
      };
      
      console.log('ArticleEditor - Setting new form data:', newFormData);
      setFormData(newFormData);
      setIsFormPopulated(true);
      
      console.log('ArticleEditor - Form populated successfully');
    } else if (!isEditing) {
      // Reset para novo artigo
      setIsFormPopulated(false);
      console.log('ArticleEditor - New article mode, form reset');
    }
  }, [article, isEditing, isFormPopulated]);

  // Efeito para resetar quando o ID muda
  useEffect(() => {
    console.log('ArticleEditor - ID changed, resetting form population flag');
    setIsFormPopulated(false);
  }, [id]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('ArticleEditor - Submitting form with data:', formData);
    
    if (!formData.title || !formData.summary || !formData.content || !formData.author_id) {
      console.log('ArticleEditor - Missing required fields');
      return;
    }

    const slug = generateSlug(formData.title);
    const articleData = {
      ...formData,
      slug,
      published_at: formData.status === 'published' ? (formData.published_at || new Date().toISOString()) : null,
      scheduled_at: formData.status === 'scheduled' ? formData.scheduled_at : null
    };

    try {
      if (isEditing) {
        await updateArticle.mutateAsync({ id: id!, ...articleData });
      } else {
        await createArticle.mutateAsync(articleData);
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
    }
  };

  const handlePreview = () => {
    if (isEditing && article) {
      window.open(`/blog/${article.slug}`, '_blank');
    }
  };

  const handleRefreshArticle = () => {
    console.log('ArticleEditor - Manually refreshing article data');
    setIsFormPopulated(false);
    refetchArticle();
  };

  // Loading state
  if (articleLoading && isEditing) {
    console.log('ArticleEditor - Showing loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados do artigo...</p>
          <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (articleError && isEditing) {
    console.log('ArticleEditor - Showing error state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-navy">Erro ao Carregar Artigo</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Erro: {articleError?.message || 'Erro desconhecido'}
            </p>
            <div className="space-y-2">
              <Button onClick={handleRefreshArticle} className="bg-orange hover:bg-orange-dark text-white">
                Tentar Novamente
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/blog')}>
                Voltar ao Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not found state
  if (isEditing && !articleLoading && !article && !articleError) {
    console.log('ArticleEditor - Showing not found state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-navy">Artigo Não Encontrado</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">O artigo que você está tentando editar não foi encontrado.</p>
            <p className="text-sm text-gray-500 mb-4">ID: {id}</p>
            <Button onClick={() => navigate('/admin/blog')} className="bg-orange hover:bg-orange-dark text-white">
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log('ArticleEditor - Rendering main form');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/blog')}>
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold text-navy">
              {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
            </h1>
            {isEditing && (
              <Button variant="outline" size="sm" onClick={handleRefreshArticle}>
                <RefreshCw size={16} className="mr-2" />
                Recarregar
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing && (
              <Button variant="outline" onClick={handlePreview}>
                <Eye size={16} className="mr-2" />
                Visualizar
              </Button>
            )}
            <Badge variant={formData.status === 'published' ? 'default' : 'secondary'}>
              {formData.status === 'published' ? 'Publicado' : 
               formData.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo do Artigo</CardTitle>
                  {isEditing && (
                    <CardDescription>
                      Editando: {article?.title || formData.title || 'Carregando...'}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Digite o título do artigo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle">Subtítulo</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Subtítulo opcional"
                    />
                  </div>

                  <div>
                    <Label htmlFor="summary">Resumo *</Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Escreva um resumo do artigo (será exibido na listagem)"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Conteúdo *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Escreva o conteúdo completo do artigo..."
                      rows={20}
                      required
                      className="min-h-[500px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Configurações */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="author">Autor *</Label>
                    <Select 
                      value={formData.author_id} 
                      onValueChange={(value) => setFormData({ ...formData, author_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um autor" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors?.map((author) => (
                          <SelectItem key={author.id} value={author.id}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Negócios">Negócios</SelectItem>
                        <SelectItem value="IA">Inteligência Artificial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value: 'draft' | 'published' | 'scheduled') => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Rascunho</SelectItem>
                        <SelectItem value="published">Publicado</SelectItem>
                        <SelectItem value="scheduled">Agendado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="read_time">Tempo de Leitura (min)</Label>
                    <Input
                      id="read_time"
                      type="number"
                      value={formData.read_time}
                      onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                      min="1"
                      max="60"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cover_image">URL da Imagem de Capa</Label>
                    <Input
                      id="cover_image"
                      value={formData.cover_image_url}
                      onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>

                  {formData.status === 'published' && (
                    <div>
                      <Label htmlFor="published_at">Data de Publicação</Label>
                      <Input
                        id="published_at"
                        type="datetime-local"
                        value={formData.published_at}
                        onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                      />
                    </div>
                  )}

                  {formData.status === 'scheduled' && (
                    <div>
                      <Label htmlFor="scheduled_at">Agendar para</Label>
                      <Input
                        id="scheduled_at"
                        type="datetime-local"
                        value={formData.scheduled_at}
                        onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                        required={formData.status === 'scheduled'}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full bg-orange hover:bg-orange-dark text-white"
                disabled={createArticle.isPending || updateArticle.isPending}
              >
                {(createArticle.isPending || updateArticle.isPending) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? 'Atualizar Artigo' : 'Criar Artigo'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ArticleEditor;
