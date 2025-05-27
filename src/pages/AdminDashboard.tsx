
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useBlogArticles, useAuthors } from '@/hooks/useBlogData';
import { Loader2, Plus, Edit, Eye, Users, FileText, LogOut, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: articles, isLoading: articlesLoading } = useBlogArticles();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const publishedArticles = articles?.filter(article => article.status === 'published') || [];
  const draftArticles = articles?.filter(article => article.status === 'draft') || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                <span className="text-orange">Agência</span>
                <span className="text-navy">Digital</span>
              </span>
            </Link>
            <Badge variant="secondary">Admin</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Bem-vindo, {user.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">Gerencie artigos, autores e conteúdo do blog</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Artigos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles?.length || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publicados</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{publishedArticles.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange">{draftArticles.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Autores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{authors?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Ferramentas principais de gerenciamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-orange hover:bg-orange-dark text-white" onClick={() => navigate('/admin/blog/new')}>
                <Plus size={16} className="mr-2" />
                Criar Novo Artigo
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/admin/authors')}>
                <Users size={16} className="mr-2" />
                Gerenciar Autores
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/blog')}>
                <Eye size={16} className="mr-2" />
                Ver Blog Público
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Artigos Recentes</CardTitle>
              <CardDescription>Últimos artigos criados ou editados</CardDescription>
            </CardHeader>
            <CardContent>
              {articlesLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-orange" />
                </div>
              ) : (
                <div className="space-y-3">
                  {articles?.slice(0, 5).map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{article.title}</h4>
                        <p className="text-xs text-gray-500">
                          {format(new Date(article.created_at), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/admin/blog/edit/${article.id}`)}
                        >
                          <Edit size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {articles?.length === 0 && (
                    <p className="text-center text-gray-500 py-4">Nenhum artigo encontrado</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Articles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Artigos</CardTitle>
            <CardDescription>Gerencie todos os artigos do blog</CardDescription>
          </CardHeader>
          <CardContent>
            {articlesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-orange" />
              </div>
            ) : (
              <div className="space-y-4">
                {articles?.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Por: {article.author?.name}</span>
                        <span>{format(new Date(article.created_at), 'dd/MM/yyyy')}</span>
                        <span>{article.read_time} min de leitura</span>
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                          {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/blog/${article.slug}`)}
                      >
                        <Eye size={14} className="mr-1" />
                        Ver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/admin/blog/edit/${article.id}`)}
                      >
                        <Edit size={14} className="mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
