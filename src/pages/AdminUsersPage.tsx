
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfiles, useIsApprovedAdmin, useDeleteUserProfile, useUpdateAdminLevel } from '@/hooks/useBlogData';
import { Loader2, Users, LogOut, Trash2, Shield, Crown, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const AdminUsersPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: adminInfo, isLoading: checkingAdmin } = useIsApprovedAdmin();
  const { data: profiles, isLoading: profilesLoading } = useUserProfiles();
  const deleteUser = useDeleteUserProfile();
  const updateAdminLevel = useUpdateAdminLevel();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  React.useEffect(() => {
    if (user && !checkingAdmin && (!adminInfo?.isRoot)) {
      navigate('/admin/blog');
    }
  }, [user, adminInfo, checkingAdmin, navigate]);

  if (authLoading || checkingAdmin || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  if (!adminInfo?.isRoot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Apenas o administrador root tem acesso a esta página.
              </AlertDescription>
            </Alert>
            <div className="text-center mt-4">
              <Link to="/admin/blog" className="text-gray-600 hover:text-orange transition-colors">
                ← Voltar ao dashboard
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

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (userEmail === 'cleyber.silva@live.com') {
      alert('Não é possível deletar o usuário root!');
      return;
    }
    
    if (window.confirm(`Tem certeza que deseja deletar o usuário ${userEmail}? Esta ação não pode ser desfeita.`)) {
      await deleteUser.mutateAsync(userId);
    }
  };

  const handleUpdateAdminLevel = async (userId: string, currentLevel: string, userEmail: string) => {
    if (userEmail === 'cleyber.silva@live.com') {
      alert('Não é possível alterar o nível do usuário root!');
      return;
    }

    const newLevel = currentLevel === 'root' ? 'admin' : 'root';
    if (window.confirm(`Deseja alterar o nível de ${userEmail} para ${newLevel}?`)) {
      await updateAdminLevel.mutateAsync({ userId, adminLevel: newLevel });
    }
  };

  const adminUsers = profiles?.filter(p => p.role === 'admin' && p.approved) || [];
  const pendingUsers = profiles?.filter(p => p.role === 'admin' && !p.approved) || [];
  const regularUsers = profiles?.filter(p => p.role !== 'admin') || [];

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
            <Badge variant="secondary">Admin Root</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/blog')}>
              Dashboard
            </Button>
            <span className="text-sm text-gray-600">
              {adminInfo?.profile?.full_name}
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
          <h1 className="text-3xl font-bold text-navy mb-2">Gerenciamento de Usuários</h1>
          <p className="text-gray-600">Gerencie administradores e usuários do sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administradores Ativos</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminUsers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Pendentes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange">{pendingUsers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profiles?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Administradores */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Administradores Ativos</CardTitle>
            <CardDescription>Usuários com acesso administrativo aprovado</CardDescription>
          </CardHeader>
          <CardContent>
            {profilesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-orange" />
              </div>
            ) : (
              <div className="space-y-4">
                {adminUsers.map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{profile.full_name || 'Nome não informado'}</h3>
                        {profile.admin_level === 'root' && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <Crown size={12} />
                            ROOT
                          </Badge>
                        )}
                        {profile.admin_level === 'admin' && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Shield size={12} />
                            ADMIN
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{profile.email}</p>
                      <p className="text-xs text-gray-500">
                        Criado em: {format(new Date(profile.created_at), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {profile.email !== 'cleyber.silva@live.com' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUpdateAdminLevel(profile.id, profile.admin_level || 'admin', profile.email || '')}
                          >
                            {profile.admin_level === 'root' ? 'Rebaixar para Admin' : 'Promover para Root'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteUser(profile.id, profile.email || '')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </>
                      )}
                      {profile.email === 'cleyber.silva@live.com' && (
                        <Badge variant="outline">Usuário Root - Protegido</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {adminUsers.length === 0 && (
                  <p className="text-center text-gray-500 py-4">Nenhum administrador encontrado</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usuários Regulares */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Usuários</CardTitle>
            <CardDescription>Lista completa de usuários do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...pendingUsers, ...regularUsers].map((profile) => (
                <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{profile.full_name || 'Nome não informado'}</h3>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">
                        Criado em: {format(new Date(profile.created_at), 'dd/MM/yyyy')}
                      </p>
                      {!profile.approved && profile.role === 'admin' && (
                        <Badge variant="secondary">Aguardando Aprovação</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteUser(profile.id, profile.email || '')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              {[...pendingUsers, ...regularUsers].length === 0 && (
                <p className="text-center text-gray-500 py-4">Nenhum usuário encontrado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminUsersPage;
