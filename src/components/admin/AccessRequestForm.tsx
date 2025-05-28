
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import RoleSelector from '@/components/admin/RoleSelector';

interface AccessRequestFormProps {
  fullName: string;
  setFullName: (name: string) => void;
  requestedRole: 'admin' | 'author_admin' | 'author';
  setRequestedRole: (role: 'admin' | 'author_admin' | 'author') => void;
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const AccessRequestForm: React.FC<AccessRequestFormProps> = ({
  fullName,
  setFullName,
  requestedRole,
  setRequestedRole,
  message,
  setMessage,
  isLoading,
  onSubmit,
  onCancel
}) => {
  return (
    <Card className="border-navy/20">
      <CardHeader>
        <CardTitle className="text-navy">Solicitar Acesso Administrativo</CardTitle>
        <CardDescription>
          Preencha as informações para solicitar acesso ao painel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-navy">Nome Completo</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Seu nome completo"
              className="border-navy/20 focus:border-orange"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-navy">Tipo de Acesso Solicitado</Label>
            <RoleSelector
              currentRole={requestedRole}
              onRoleChange={(role) => setRequestedRole(role)}
              userRole="admin"
              adminLevel="root"
              disabled={false}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-navy">Mensagem (Opcional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explique brevemente por que precisa de acesso administrativo..."
              rows={3}
              className="border-navy/20 focus:border-orange"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange hover:bg-orange-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Solicitação'
            )}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={onCancel}
              className="text-gray-600 hover:text-orange"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccessRequestForm;
