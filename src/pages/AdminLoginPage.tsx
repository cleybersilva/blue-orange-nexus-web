import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useIsApprovedAdmin, useMyAdminRequest, useCreateAdminRequest } from '@/hooks/useBlogData';
import { Loader2, Eye, EyeOff, Clock, CheckCircle, XCircle } from 'lucide-react';
import RoleSelector from '@/components/admin/RoleSelector';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [requestedRole, setRequestedRole] = useState<'admin' | 'author_admin' | 'author'>('author');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccessRequest, setShowAccessRequest] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { data: isApprovedAdmin, isLoading: checkingAdmin } = useIsApprovedAdmin();
  const { data: myRequest, isLoading: checkingRequest } = useMyAdminRequest();
  const createAdminRequest = useCreateAdminRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isApprovedAdmin) {
      navigate('/admin/blog');
    }
  }, [user, isApprovedAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          setError('Conta criada com sucesso! Agora você pode solicitar acesso administrativo.');
          setIsSignUp(false);
          setShowAccessRequest(true);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError('Credenciais inválidas. Verifique seu email e senha.');
        }
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccessRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createAdminRequest.mutateAsync({
        email: user.email || '',
        full_name: fullName || user.user_metadata?.full_name || '',
        message,
        role: requestedRole
      });
      setShowAccessRequest(false);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  };

  // Mostrar página de status se o usuário está logado mas não é admin aprovado
  if (user && !checkingAdmin && !checkingRequest) {
    if (myRequest) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <span className="text-3xl font-bold">
                  <span className="text-orange">Agência</span>
                  <span className="text-navy">Digital</span>
                </span>
              </Link>
              <p className="text-gray-600 mt-2">Status da Solicitação</p>
            </div>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {myRequest.status === 'pending' && <Clock size={48} className="text-orange" />}
                  {myRequest.status === 'approved' && <CheckCircle size={48} className="text-green-600" />}
                  {myRequest.status === 'rejected' && <XCircle size={48} className="text-red-600" />}
                </div>
                <CardTitle>Solicitação de Acesso Administrativo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge 
                    variant={myRequest.status === 'approved' ? 'default' : 
                            myRequest.status === 'rejected' ? 'destructive' : 'secondary'}
                    className="text-sm"
                  >
                    {myRequest.status === 'pending' && 'Aguardando Aprovação'}
                    {myRequest.status === 'approved' && 'Aprovada'}
                    {myRequest.status === 'rejected' && 'Rejeitada'}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> {myRequest.email}</p>
                  <p><strong>Nome:</strong> {myRequest.full_name}</p>
                  {myRequest.message && (
                    <p><strong>Mensagem:</strong> {myRequest.message}</p>
                  )}
                  <p><strong>Solicitado em:</strong> {new Date(myRequest.requested_at).toLocaleDateString('pt-BR')}</p>
                </div>

                {myRequest.status === 'pending' && (
                  <Alert>
                    <AlertDescription>
                      Sua solicitação está sendo analisada. Você receberá uma notificação quando for aprovada.
                    </AlertDescription>
                  </Alert>
                )}

                {myRequest.status === 'rejected' && (
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
          </div>
        </div>
      );
    }

    if (!isApprovedAdmin && !showAccessRequest) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <span className="text-3xl font-bold">
                  <span className="text-orange">Agência</span>
                  <span className="text-navy">Digital</span>
                </span>
              </Link>
              <p className="text-gray-600 mt-2">Acesso Não Autorizado</p>
            </div>

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
                  onClick={() => setShowAccessRequest(true)}
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
          </div>
        </div>
      );
    }

    if (showAccessRequest) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <span className="text-3xl font-bold">
                  <span className="text-orange">Agência</span>
                  <span className="text-navy">Digital</span>
                </span>
              </Link>
              <p className="text-gray-600 mt-2">Solicitar Acesso</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Solicitar Acesso Administrativo</CardTitle>
                <CardDescription>
                  Preencha as informações para solicitar acesso ao painel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAccessRequest} className="space-y-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="role">Tipo de Acesso Solicitado</Label>
                    <RoleSelector
                      currentRole={requestedRole}
                      onRoleChange={(role) => setRequestedRole(role)}
                      userRole="admin"
                      adminLevel="root"
                      disabled={false}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem (Opcional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Explique brevemente por que precisa de acesso administrativo..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange hover:bg-orange-dark text-white"
                    disabled={createAdminRequest.isPending}
                  >
                    {createAdminRequest.isPending ? (
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
                      onClick={() => setShowAccessRequest(false)}
                      className="text-gray-600"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }

  if (checkingAdmin || checkingRequest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold">
              <span className="text-orange">Agência</span>
              <span className="text-navy">Digital</span>
            </span>
          </Link>
          <p className="text-gray-600 mt-2">Painel Administrativo</p>
        </div>

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
            <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-orange transition-colors">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
