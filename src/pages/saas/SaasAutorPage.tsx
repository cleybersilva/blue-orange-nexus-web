import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { useAllArticles, useMyArticles, useAuthors, useDeleteArticle, useIsApprovedAdmin, useAdminRequests } from '@/hooks/useBlogData';
import { Loader2, Plus, Edit, Eye, Users, FileText, UserCheck, Clock, BookOpen, RefreshCw, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const SaasAutorPage = () => {
  const { user } = useAuth();
  const { data: allArticles, isLoading: allArticlesLoading, refetch: refetchAllArticles } = useAllArticles();
  const { data: myArticles, isLoading: myArticlesLoading, refetch: refetchMyArticles } = useMyArticles();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const { data: adminInfo, isLoading: checkingAdmin } = useIsApprovedAdmin();
  const { data: adminRequests } = useAdminRequests();
  const deleteArticle = useDeleteArticle();
  const navigate = useNavigate();

  // Force refetch articles when component loads
  useEffect(() => {
    if (user && adminInfo && (adminInfo.isAdmin || adminInfo.isAuthorAdmin || adminInfo.isAuthor)) {
      refetchAllArticles();
      refetchMyArticles();
    }
  }, [user, adminInfo, refetchAllArticles, refetchMyArticles]);

  if (checkingAdmin || !user) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!adminInfo?.isAdmin && !adminInfo?.isAuthorAdmin && !adminInfo?.isAuthor) {
    return (
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-center text-destructive">Acesso Não Autorizado</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertDescription>
              Você não tem permissão para acessar o gerenciamento de conteúdo.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este artigo? Esta ação não pode ser desfeita.')) {
      await deleteArticle.mutateAsync(id);
    }
  };

  const handleRefreshArticles = () => {
    refetchAllArticles();
    refetchMyArticles();
  };

  // Determinar quais artigos mostrar baseado no role do usuário
  const articles = (adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) ? allArticles : myArticles;
  const articlesLoading = (adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) ? allArticlesLoading : myArticlesLoading;
  
  const publishedArticles = articles?.filter(article => article.status === 'published') || [];
  const draftArticles = articles?.filter(article => article.status === 'draft') || [];
  const pendingRequests = adminRequests?.filter(req => req.status === 'pending') || [];

  // Determinar o badge do usuário
  const getUserBadge = () => {
    if (adminInfo?.isRoot) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <BookOpen size={12} />
          Admin Root
        </Badge>
      );
    } else if (adminInfo?.isAdmin) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <BookOpen size={12} />
          Admin
        </Badge>
      );
    } else if (adminInfo?.isAuthorAdmin) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Users size={12} />
          Author Admin
        </Badge>
      );
    } else if (adminInfo?.isAuthor) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <BookOpen size={12} />
          Autor
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard {adminInfo?.isAuthor ? 'do Autor' : 'de Conteúdo'}
            </h1>
            <p className="text-muted-foreground">
              {adminInfo?.isAuthor 
                ? 'Gerencie seus artigos e conteúdo' 
                : 'Gerencie artigos, autores e conteúdo do blog'}
            </p>
          </div>
          {getUserBadge()}
        </div>
        <Button 
          onClick={handleRefreshArticles}
          variant="outline"
        >
          <RefreshCw size={16} className="mr-2" />
          Atualizar Artigos
        </Button>
      </div>

      {/* Alerta de solicitações pendentes */}
      {pendingRequests.length > 0 && (adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Você tem {pendingRequests.length} solicitação(ões) de acesso pendente(s)</span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => navigate('/admin/requests')}
            >
              Ver Solicitações
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) ? 'Total de Artigos' : 'Meus Artigos'}
            </CardTitle>
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
            <div className="text-2xl font-bold text-orange-500">{draftArticles.length}</div>
          </CardContent>
        </Card>

        {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solicitações</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions and Recent Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Ferramentas principais de gerenciamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full" 
              onClick={() => navigate('/admin/articles/new')}
            >
              <Plus size={16} className="mr-2" />
              Criar Novo Artigo
            </Button>
            
            {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
              <>
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
              </>
            )}
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/blog')}
            >
              <Eye size={16} className="mr-2" />
              Ver Blog Público
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) ? 'Artigos Recentes' : 'Meus Artigos Recentes'}
            </CardTitle>
            <CardDescription>
              {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) ? 'Últimos artigos criados ou editados' : 'Seus últimos artigos'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {articlesLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {articles?.slice(0, 5).map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{article.title}</h4>
                      <p className="text-xs text-muted-foreground">
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
                      {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {(!articles || articles.length === 0) && (
                  <div className="text-center py-6 text-muted-foreground">
                    Nenhum artigo encontrado
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Articles Table */}
      {articles && articles.length > 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Todos os Artigos</CardTitle>
            <CardDescription>Lista completa de artigos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">
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
                    {(adminInfo?.isAdmin || adminInfo?.isAuthorAdmin) && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SaasAutorPage;