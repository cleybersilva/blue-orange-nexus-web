
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRequests, useApproveAdminRequest, useRejectAdminRequest } from '@/hooks/useBlogData';
import { ArrowLeft, LogOut, Clock, CheckCircle, XCircle, Users, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const AdminRequestsPage = () => {
  const { user, signOut } = useAuth();
  const { data: requests, isLoading } = useAdminRequests();
  const approveRequest = useApproveAdminRequest();
  const rejectRequest = useRejectAdminRequest();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleApprove = async (requestId: string) => {
    if (window.confirm('Tem certeza que deseja aprovar esta solicitação? O usuário terá acesso total ao painel administrativo.')) {
      await approveRequest.mutateAsync(requestId);
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
            <Button variant="outline" onClick={() => navigate('/admin/blog')}>
              <ArrowLeft size={16} className="mr-2" />
              Dashboard
            </Button>
            <span className="text-2xl font-bold">
              <span className="text-orange">Agência</span>
              <span className="text-navy">Digital</span>
            </span>
            <Badge variant="secondary">Admin</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.email}
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
          <h1 className="text-3xl font-bold text-navy mb-2">Gerenciar Solicitações</h1>
          <p className="text-gray-600">Aprove ou rejeite solicitações de acesso administrativo</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-orange" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Solicitações Pendentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={20} className="text-orange" />
                  Solicitações Pendentes ({pendingRequests.length})
                </CardTitle>
                <CardDescription>
                  Solicitações aguardando sua aprovação
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Nenhuma solicitação pendente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{request.full_name}</h3>
                            <p className="text-gray-600">{request.email}</p>
                            {request.message && (
                              <p className="text-sm text-gray-700 mt-2 p-2 bg-white rounded border">
                                "{request.message}"
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              Solicitado em {format(new Date(request.requested_at), 'dd/MM/yyyy \'às\' HH:mm')}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                              disabled={approveRequest.isPending}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              {approveRequest.isPending ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <CheckCircle size={14} className="mr-1" />
                              )}
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(request.id)}
                              disabled={rejectRequest.isPending}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              {rejectRequest.isPending ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <XCircle size={14} className="mr-1" />
                              )}
                              Rejeitar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Histórico de Solicitações */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Solicitações</CardTitle>
                <CardDescription>
                  Solicitações já processadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {processedRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Nenhuma solicitação processada</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {processedRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{request.full_name}</h3>
                              <Badge 
                                variant={request.status === 'approved' ? 'default' : 'destructive'}
                                className="text-xs"
                              >
                                {request.status === 'approved' ? 'Aprovada' : 'Rejeitada'}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">{request.email}</p>
                            {request.message && (
                              <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
                                "{request.message}"
                              </p>
                            )}
                            <div className="flex gap-4 text-xs text-gray-500 mt-2">
                              <span>Solicitado: {format(new Date(request.requested_at), 'dd/MM/yyyy')}</span>
                              {request.reviewed_at && (
                                <span>Processado: {format(new Date(request.reviewed_at), 'dd/MM/yyyy')}</span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            {request.status === 'approved' ? (
                              <CheckCircle size={20} className="text-green-600" />
                            ) : (
                              <XCircle size={20} className="text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRequestsPage;
