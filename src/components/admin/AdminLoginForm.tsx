
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import HubHighlight from '@/components/ui/hub-highlight';

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
  const handlePasswordToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header com AgênciaDigitalHub */}
        <div className="text-center mb-8">
          <span className="text-3xl font-bold">
            <span className="text-orange">Agência</span>
            <span className="text-white">Digital</span>
            <HubHighlight />
          </span>
          <p className="text-white/80 mt-2 font-medium">Painel Administrativo</p>
        </div>

        <Card className="border-navy/20 bg-white shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-navy mb-2">
              {isSignUp ? 'Criar Conta Admin' : 'Login Administrativo'}
            </CardTitle>
            <CardDescription className="text-navy/70">
              {isSignUp 
                ? 'Crie sua conta para solicitar acesso administrativo'
                : 'Acesse o painel de gerenciamento do blog'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-navy font-semibold">
                    Nome Completo
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Seu nome completo"
                    className="border-navy/20 focus:border-orange focus:ring-orange h-12 text-navy placeholder:text-navy/50"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-navy font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@agenciadigital.com"
                  className="border-navy/20 focus:border-orange focus:ring-orange h-12 text-navy placeholder:text-navy/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-navy font-semibold">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    placeholder="••••••••"
                    className="border-navy/20 focus:border-orange focus:ring-orange h-12 text-navy placeholder:text-navy/50 pr-12"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/60 hover:text-orange transition-colors p-1"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert 
                  variant={error.includes('sucesso') ? 'default' : 'destructive'} 
                  className={error.includes('sucesso') 
                    ? 'border-orange/20 bg-orange/5' 
                    : 'border-red-200 bg-red-50'
                  }
                >
                  <AlertDescription 
                    className={error.includes('sucesso') 
                      ? 'text-navy' 
                      : 'text-red-700'
                    }
                  >
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-orange hover:bg-orange/90 text-white font-semibold h-12 text-base transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
                  className="text-orange hover:text-orange/80 font-medium"
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
        
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-white/80 hover:text-orange transition-colors font-medium"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
