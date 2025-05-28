
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface AdminRequest {
  id: string;
  email: string;
  full_name: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
}

interface RequestStatusCardProps {
  request: AdminRequest;
}

const RequestStatusCard: React.FC<RequestStatusCardProps> = ({ request }) => {
  const getIcon = () => {
    switch (request.status) {
      case 'pending':
        return <Clock size={48} className="text-orange" />;
      case 'approved':
        return <CheckCircle size={48} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={48} className="text-red-600" />;
    }
  };

  const getBadgeVariant = () => {
    switch (request.status) {
      case 'pending':
        return 'secondary' as const;
      case 'approved':
        return 'default' as const;
      case 'rejected':
        return 'destructive' as const;
    }
  };

  const getStatusText = () => {
    switch (request.status) {
      case 'pending':
        return 'Aguardando Aprovação';
      case 'approved':
        return 'Aprovada';
      case 'rejected':
        return 'Rejeitada';
    }
  };

  return (
    <Card className="border-navy/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          {getIcon()}
        </div>
        <CardTitle className="text-navy">Solicitação de Acesso Administrativo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant={getBadgeVariant()} className="text-sm">
            {getStatusText()}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p><strong className="text-navy">Email:</strong> {request.email}</p>
          <p><strong className="text-navy">Nome:</strong> {request.full_name}</p>
          {request.message && (
            <p><strong className="text-navy">Mensagem:</strong> {request.message}</p>
          )}
          <p><strong className="text-navy">Solicitado em:</strong> {new Date(request.requested_at).toLocaleDateString('pt-BR')}</p>
        </div>

        {request.status === 'pending' && (
          <Alert className="border-orange/20 bg-orange/5">
            <AlertDescription className="text-navy">
              Sua solicitação está sendo analisada. Você receberá uma notificação quando for aprovada.
            </AlertDescription>
          </Alert>
        )}

        {request.status === 'rejected' && (
          <Alert variant="destructive">
            <AlertDescription>
              Sua solicitação foi rejeitada. Entre em contato com o administrador para mais informações.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center pt-4">
          <Link to="/" className="text-gray-600 hover:text-orange transition-colors">
            ← Voltar ao site
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestStatusCard;
