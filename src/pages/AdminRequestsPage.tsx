
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRequests, useIsApprovedAdmin, useApproveAdminRequest, useRejectAdminRequest } from '@/hooks/useBlogData';
import { Loader2, Users, LogOut, Check, X, Clock, AlertTriangle, UserCheck, Shield, Crown } from 'lucide-react';
import { format } from 'date-fns';
import RoleSelector from '@/components/admin/RoleSelector';

const AdminRequestsPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: adminInfo, isLoading: checkingAdmin } = useIsApprovedAdmin();
  const { data: requests, isLoading: requestsLoading } = useAdminRequests();
  const approveRequest = useApproveAdminRequest();
  const rejectRequest = useRejectAdminRequest();
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'author_admin' | 'author'>('author');
  const [dialogOpen, setDialogOpen] = useState(false);

  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  React.useEffect(() => {
    if (user && !checkingAdmin && (!adminInfo?.isAdmin && !adminInfo?.isAuthorAdmin)) {
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

  if (!adminInfo?.isAdmin && !adminInfo?.isAuthorAdmin) {
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
                Você não tem permissão para acessar esta página.
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

  const handleApprove = (requestId: string) => {
    setSelectedRequest(requestId);
    setSelectedRole('author');
    setDialogOpen(true);
  };

  const confirmApproval = async () => {
    if (selectedRequest) {
      await approveRequest.mutateAsync({ 
        requestId: selectedRequest, 
        role: selectedRole 
      });
      setDialogOpen(false);
      setSelectedRequest(null);
    }
  };

  const handleReject = async (requestId: string) => {
    if (window.confirm('Tem certeza que deseja rejeitar esta solicitação?')) {
      await rejectRequest.mutateAsync(requestId);
    }
  };

  const pendingRequests = requests?.filter(req => req.status === 'pending') || [];
  const processedRequests = requests?.filter(req => req.status !== 'pending') || [];

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
              ) : adminInfo?.isAdmin ? (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield size={12} />
                  Admin
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users size={12} />
                  Author Admin
                </Badge>
              )}
            </div>
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
          <h1 className="text-3xl font-bold text-navy mb-2">Solicitações de Acesso</h1>
          <p className="text-gray-600">Gerencie solicitações de acesso ao sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solicitações Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange">{pendingRequests.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Processadas</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processedRequests.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Solicitações</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Solicitações Pendentes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Solicitações Pendentes</CardTitle>
            <CardDescription>Solicitações aguardando aprovação</CardDescription>
          </CardHeader>
          <CardContent>
            {requestsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-orange" />
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{request.full_name}</h3>
                      <p className="text-sm text-gray-600">{request.email}</p>
                      {request.message && (
                        <p className="text-sm text-gray-500 mt-1">"{request.message}"</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Solicitado em: {format(new Date(request.created_at), 'dd/MM/yyyy HH:mm')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={approveRequest.isPending}
                      >
                        <Check size={14} className="mr-1" />
                        Aprovar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReject(request.id)}
                        className="text-red-600 hover:text-red-700"
                        disabled={rejectRequest.isPending}
                      >
                        <X size={14} className="mr-1" />
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingRequests.length === 0 && (
                  <p className="text-center text-gray-500 py-4">Nenhuma solicitação pendente</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Solicitações Processadas */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Solicitações</CardTitle>
            <CardDescription>Solicitações já processadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{request.full_name}</h3>
                    <p className="text-sm text-gray-600">{request.email}</p>
                    {request.message && (
                      <p className="text-sm text-gray-500 mt-1">"{request.message}"</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Processado em: {request.reviewed_at ? format(new Date(request.reviewed_at), 'dd/MM/yyyy HH:mm') : 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                      {request.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                    </Badge>
                  </div>
                </div>
              ))}
              {processedRequests.length === 0 && (
                <p className="text-center text-gray-500 py-4">Nenhuma solicitação processada</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Aprovação com Seleção de Role */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aprovar Solicitação</DialogTitle>
              <DialogDescription>
                Selecione o nível de acesso que deseja conceder ao usuário.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <RoleSelector
                currentRole={selectedRole}
                onRoleChange={setSelectedRole}
                userRole={adminInfo?.profile?.role}
                adminLevel={adminInfo?.profile?.admin_level}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={confirmApproval}
                disabled={approveRequest.isPending}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {approveRequest.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Aprovando...
                  </>
                ) : (
                  'Aprovar'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminRequestsPage;
