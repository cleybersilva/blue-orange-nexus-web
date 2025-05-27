
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AccessDeniedCardProps {
  onRequestAccess: () => void;
}

const AccessDeniedCard: React.FC<AccessDeniedCardProps> = ({ onRequestAccess }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitar Acesso Administrativo</CardTitle>
        <CardDescription>
          Você precisa ser aprovado para acessar o painel administrativo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertDescription>
            Sua conta foi criada com sucesso, mas você precisa solicitar acesso administrativo.
          </AlertDescription>
        </Alert>

        <Button 
          onClick={onRequestAccess}
          className="w-full bg-orange hover:bg-orange-dark text-white"
        >
          Solicitar Acesso
        </Button>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-600 hover:text-orange transition-colors">
            ← Voltar ao site
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessDeniedCard;
