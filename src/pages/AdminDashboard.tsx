import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useAllArticles, useAuthors, useDeleteArticle, useIsApprovedAdmin, useAdminRequests } from '@/hooks/useBlogData';
import { Loader2, Plus, Edit, Eye, Users, FileText, LogOut, Trash2, UserCheck, Clock, BarChart3, Crown, Shield } from 'lucide-react';
import { format } from 'date-fns';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: articles, isLoading: articlesLoading } = useAllArticles();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const { data: adminInfo, isLoading: checkingAdmin } = useIsApprovedAdmin();
  const { data: adminRequests } = useAdminRequests();
  const deleteArticle = useDeleteArticle();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && !checkingAdmin && !adminInfo?.isAdmin) {
      navigate('/admin/login');
    }
  }, [user, adminInfo, checkingAdmin, navigate]);

  if (authLoading || checkingAdmin || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  if (!adminInfo?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Acesso Não Autorizado</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Você não tem permissão para acessar o painel administrativo. Entre em contato com o administrador.
              </AlertDescription>
            </Alert>
            <div className="text-center mt-4">
              <Link to="/" className="text-gray-600 hover:text-orange transition-colors">
                ← Voltar ao site
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este artigo? Esta ação não pode ser desfeita.')) {
      await deleteArticle.mutateAsync(id);
    }
  };

  const publishedArticles = articles?.filter(article => article.status === 'published') || [];
  const draftArticles = articles?.filter(article => article.status === 'draft') || [];
  const pendingRequests = adminRequests?.filter(req => req.status === 'pending') || [];

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
            <div className="flex items-center gap-2">
              {adminInfo?.isRoot ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Crown size={12} />
                  Admin Root
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield size={12} />
                  Admin
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Bem-vindo, {adminInfo?.profile?.full_name || user.email}
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

        {/* Alerta de solicitações pendentes */}
        {pendingRequests.length > 0 && (
          <Alert className="mb-6 border-orange bg-orange-50">
            <Clock className="h-4 w-4 text-orange" />
            <AlertDescription className="flex items-center justify-between">
              <span>Você tem {pendingRequests.length} solicitação(ões) de acesso pendente(s)</span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => navigate('/admin/requests')}
                className="ml-4"
              >
                Ver Solicitações
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Solicitações</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange">{pendingRequests.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>Ferramentas principais de gerenciamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-orange hover:bg-orange-dark text-white" 
                    onClick={() => navigate('/admin/articles/new')}
                  >
                    <Plus size={16} className="mr-2" />
                    Criar Novo Artigo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate('/admin/authors')}
                  >
                    <Users size={16} className="mr-2" />
                    Gerenciar Autores
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate('/admin/requests')}
                  >
                    <UserCheck size={16} className="mr-2" />
                    Gerenciar Solicitações
                    {pendingRequests.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {pendingRequests.length}
                      </Badge>
                    )}
                  </Button>
                  {adminInfo?.isRoot && (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => navigate('/admin/users')}
                    >
                      <Crown size={16} className="mr-2" />
                      Gerenciar Usuários
                    </Button>
                  )}
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
                              onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
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
                              {article.status === 'published' ? 'Publicado' : 
                               article.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {article.status === 'published' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                            >
                              <Eye size={14} className="mr-1" />
                              Ver
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                          >
                            <Edit size={14} className="mr-1" />
                            Editar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {articles?.length === 0 && (
                      <div className="text-center py-8">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
                        <p className="text-gray-600 mb-4">Comece criando seu primeiro artigo</p>
                        <Button 
                          onClick={() => navigate('/admin/articles/new')}
                          className="bg-orange hover:bg-orange-dark text-white"
                        >
                          <Plus size={16} className="mr-2" />
                          Criar Primeiro Artigo
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
