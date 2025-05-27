
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface AdminLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  fullName: string;
  setFullName: (fullName: string) => void;
  isSignUp: boolean;
  setIsSignUp: (isSignUp: boolean) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  isSignUp,
  setIsSignUp,
  showPassword,
  setShowPassword,
  error,
  setError,
  loading,
  onSubmit
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isSignUp ? 'Criar Conta Admin' : 'Login Administrativo'}</CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Crie sua conta para solicitar acesso administrativo'
            : 'Acesse o painel de gerenciamento do blog'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Seu nome completo"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@agenciadigital.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant={error.includes('sucesso') ? 'default' : 'destructive'}>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-orange hover:bg-orange-dark text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? 'Criando conta...' : 'Entrando...'}
              </>
            ) : (
              isSignUp ? 'Criar Conta' : 'Entrar'
            )}
          </Button>

          <div className="text-center pt-4">
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-orange"
            >
              {isSignUp 
                ? 'Já tem uma conta? Faça login' 
                : 'Não tem conta? Criar nova conta'
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminLoginForm;
