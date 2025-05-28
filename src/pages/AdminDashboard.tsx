import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useAllArticles, useMyArticles, useAuthors, useDeleteArticle, useIsApprovedAdmin, useAdminRequests } from '@/hooks/useBlogData';
import { Loader2, Plus, Edit, Eye, Users, FileText, LogOut, Trash2, UserCheck, Clock, BarChart3, Crown, Shield, BookOpen, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import HubHighlight from '@/components/ui/hub-highlight';

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: allArticles, isLoading: allArticlesLoading, refetch: refetchAllArticles } = useAllArticles();
  const { data: myArticles, isLoading: myArticlesLoading, refetch: refetchMyArticles } = useMyArticles();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const { data: adminInfo, isLoading: checkingAdmin } = useIsApprovedAdmin();
  const { data: adminRequests } = useAdminRequests();
  const deleteArticle = useDeleteArticle();
  const navigate = useNavigate();

  console.log('AdminDashboard - User:', user?.email);
  console.log('AdminDashboard - Admin Info:', adminInfo);
  console.log('AdminDashboard - All Articles:', allArticles);
  console.log('AdminDashboard - My Articles:', myArticles);
  console.log('AdminDashboard - Auth Loading:', authLoading);
  console.log('AdminDashboard - Checking Admin:', checkingAdmin);

  // Force refetch articles when dashboard loads
  useEffect(() => {
    if (user && adminInfo && (adminInfo.isAdmin || adminInfo.isAuthorAdmin || adminInfo.isAuthor)) {
      console.log('AdminDashboard - Forcing articles refetch...');
      refetchAllArticles();
      refetchMyArticles();
    }
  }, [user, adminInfo, refetchAllArticles, refetchMyArticles]);

  useEffect(() => {
    if (!authLoading && !user) {
      console.log('No user found, redirecting to login');
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && !checkingAdmin && (!adminInfo?.isAdmin && !adminInfo?.isAuthorAdmin && !adminInfo?.isAuthor)) {
      console.log('User not authorized, redirecting to login');
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

  if (!adminInfo?.isAdmin && !adminInfo?.isAuthorAdmin && !adminInfo?.isAuthor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-navy/20">
          <CardHeader>
            <CardTitle className="text-center text-navy">Acesso Não Autorizado</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-orange/20 bg-orange/5">
              <AlertDescription className="text-navy">
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

  const handleRefreshArticles = () => {
    console.log('AdminDashboard - Manually refreshing articles...');
    refetchAllArticles();
    refetchMyArticles();
  };

  // Determinar quais artigos mostrar baseado no role do usuário
  const articles = adminInfo?.isAuthor ? myArticles : allArticles;
  const articlesLoading = adminInfo?.isAuthor ? myArticlesLoading : allArticlesLoading;
  
  const publishedArticles = articles?.filter(article => article.status === 'published') || [];
  const draftArticles = articles?.filter(article => article.status === 'draft') || [];
  const pendingRequests = adminRequests?.filter(req => req.status === 'pending') || [];

  // Determinar o badge do usuário
  const getUserBadge = () => {
    if (adminInfo?.isRoot) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1 bg-orange text-white">
          <Crown size={12} />
          Admin Root
        </Badge>
      );
    } else if (adminInfo?.isAdmin) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-navy/10 text-navy">
          <Shield size={12} />
          Admin
        </Badge>
      );
    } else if (adminInfo?.isAuthorAdmin) {
      return (
        <Badge variant="outline" className="flex items-center gap-1 border-navy/20 text-navy">
          <Users size={12} />
          Author Admin
        </Badge>
      );
    } else if (adminInfo?.isAuthor) {
      return (
        <Badge variant="outline" className="flex items-center gap-1 border-navy/20 text-navy">
          <BookOpen size={12} />
          Autor
        </Badge>
      );
    }
    return null;
  };

  // Determinar se pode ver analytics
  const canViewAnalytics = adminInfo?.isAdmin || adminInfo?.isAuthorAdmin;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-navy/10">
        <div className="container-custom flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                <span className="text-orange">Agência</span>
                <span className="text-navy">Digital</span>
                <HubHighlight />
              </span>
            </Link>
            {getUserBadge()}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Bem-vindo, {adminInfo?.profile?.full_name || user.email}
            </span>
            <Button variant="outline" onClick={handleSignOut} className="border-navy/20 text-navy hover:bg-navy hover:text-white">
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-navy mb-2">
                Dashboard {adminInfo?.isAuthor ? 'do Autor' : 'Administrativo'}
              </h1>
              <p className="text-gray-600">
                {adminInfo?.isAuthor 
                  ? 'Gerencie seus artigos e conteúdo' 
                  : 'Gerencie artigos, autores e conteúdo do blog'}
              </p>
            </div>
            <Button 
              onClick={handleRefreshArticles}
              variant="outline"
              className="border-navy/20 text-navy hover:bg-navy hover:text-white"
            >
              <RefreshCw size={16} className="mr-2" />
              Atualizar Artigos
            </Button>
          </div>
        </div>

        {/* Alerta de solicitações pendentes - apenas para admins e author_admins */}
        {pendingRequests.length > 0 && (adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
          <Alert className="mb-6 border-orange/20 bg-orange/5">
            <Clock className="h-4 w-4 text-orange" />
            <AlertDescription className="flex items-center justify-between text-navy">
              <span>Você tem {pendingRequests.length} solicitação(ões) de acesso pendente(s)</span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => navigate('/admin/requests')}
                className="ml-4 border-navy/20 text-navy hover:bg-navy hover:text-white"
              >
                Ver Solicitações
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className={`grid w-full ${canViewAnalytics ? 'grid-cols-2' : 'grid-cols-1'} bg-white border border-navy/20`}>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-orange data-[state=active]:text-white">Dashboard</TabsTrigger>
            {canViewAnalytics && (
              <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-orange data-[state=active]:text-white">
                <BarChart3 size={16} />
                Analytics
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-navy/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-navy">
                    {adminInfo?.isAuthor ? 'Meus Artigos' : 'Total de Artigos'}
                  </CardTitle>
                  <FileText className="h-4 w-4 text-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-navy">{articles?.length || 0}</div>
                </CardContent>
              </Card>
              
              <Card className="border-navy/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-navy">Publicados</CardTitle>
                  <Eye className="h-4 w-4 text-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{publishedArticles.length}</div>
                </CardContent>
              </Card>
              
              <Card className="border-navy/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-navy">Rascunhos</CardTitle>
                  <Edit className="h-4 w-4 text-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange">{draftArticles.length}</div>
                </CardContent>
              </Card>

              {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
                <Card className="border-navy/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-navy">Solicitações</CardTitle>
                    <UserCheck className="h-4 w-4 text-orange" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange">{pendingRequests.length}</div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-navy/20">
                <CardHeader>
                  <CardTitle className="text-navy">Ações Rápidas</CardTitle>
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
                  
                  {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full border-navy/20 text-navy hover:bg-navy hover:text-white" 
                        onClick={() => navigate('/admin/authors')}
                      >
                        <Users size={16} className="mr-2" />
                        Gerenciar Autores
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-navy/20 text-navy hover:bg-navy hover:text-white" 
                        onClick={() => navigate('/admin/requests')}
                      >
                        <UserCheck size={16} className="mr-2" />
                        Gerenciar Solicitações
                        {pendingRequests.length > 0 && (
                          <Badge variant="secondary" className="ml-2 bg-orange/10 text-orange">
                            {pendingRequests.length}
                          </Badge>
                        )}
                      </Button>
                    </>
                  )}
                  
                  {adminInfo?.isRoot && (
                    <Button 
                      variant="outline" 
                      className="w-full border-navy/20 text-navy hover:bg-navy hover:text-white" 
                      onClick={() => navigate('/admin/users')}
                    >
                      <Crown size={16} className="mr-2" />
                      Gerenciar Usuários
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-navy/20 text-navy hover:bg-navy hover:text-white" 
                    onClick={() => navigate('/blog')}
                  >
                    <Eye size={16} className="mr-2" />
                    Ver Blog Público
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-navy/20">
                <CardHeader>
                  <CardTitle className="text-navy">
                    {adminInfo?.isAuthor ? 'Meus Artigos Recentes' : 'Artigos Recentes'}
                  </CardTitle>
                  <CardDescription>
                    {adminInfo?.isAuthor ? 'Seus últimos artigos' : 'Últimos artigos criados ou editados'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {articlesLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-6 h-6 animate-spin text-orange" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {articles?.slice(0, 5).map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-3 border border-navy/10 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate text-navy">{article.title}</h4>
                            <p className="text-xs text-gray-500">
                              {format(new Date(article.created_at), 'dd/MM/yyyy')}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className={article.status === 'published' ? 'bg-orange text-white' : 'bg-navy/10 text-navy'}>
                              {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                              className="border-navy/20 text-navy hover:bg-navy hover:text-white"
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
            <Card className="border-navy/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-navy">
                      {adminInfo?.isAuthor ? 'Meus Artigos' : 'Todos os Artigos'}
                    </CardTitle>
                    <CardDescription>
                      {adminInfo?.isAuthor 
                        ? 'Gerencie seus artigos do blog' 
                        : 'Gerencie todos os artigos do blog'}
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={handleRefreshArticles}
                    size="sm"
                    variant="outline"
                    className="border-navy/20 text-navy hover:bg-navy hover:text-white"
                  >
                    <RefreshCw size={14} className="mr-1" />
                    Atualizar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {articlesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-orange" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles?.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 border border-navy/10 rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <h3 className="font-medium text-navy">{article.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Por: {article.author?.name}</span>
                            <span>{format(new Date(article.created_at), 'dd/MM/yyyy')}</span>
                            <span>{article.read_time} min de leitura</span>
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className={`text-xs ${article.status === 'published' ? 'bg-orange text-white' : 'bg-navy/10 text-navy'}`}>
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
                              className="border-navy/20 text-navy hover:bg-navy hover:text-white"
                            >
                              <Eye size={14} className="mr-1" />
                              Ver
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                            className="border-navy/20 text-navy hover:bg-navy hover:text-white"
                          >
                            <Edit size={14} className="mr-1" />
                            Editar
                          </Button>
                          {(adminInfo?.isAdmin || adminInfo?.isRoot) && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {articles?.length === 0 && (
                      <div className="text-center py-8">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
                        <p className="text-gray-600 mb-4">
                          {adminInfo?.isAuthor 
                            ? 'Comece criando seu primeiro artigo' 
                            : 'Comece criando o primeiro artigo'}
                        </p>
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

          {canViewAnalytics && (
            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
