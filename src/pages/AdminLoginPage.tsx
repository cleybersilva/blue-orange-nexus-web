
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useIsApprovedAdmin, useMyAdminRequest, useCreateAdminRequest } from '@/hooks/useBlogData';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AccessRequestForm from '@/components/admin/AccessRequestForm';
import RequestStatusCard from '@/components/admin/RequestStatusCard';
import AccessDeniedCard from '@/components/admin/AccessDeniedCard';

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
    console.log('AdminLoginPage - User:', user?.email);
    console.log('AdminLoginPage - Is Approved Admin:', isApprovedAdmin);
    console.log('AdminLoginPage - Checking Admin:', checkingAdmin);
    
    if (user && isApprovedAdmin) {
      console.log('AdminLoginPage - Redirecting to admin dashboard');
      navigate('/admin/blog');
    }
  }, [user, isApprovedAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        console.log('AdminLoginPage - Attempting sign up for:', email);
        const { error } = await signUp(email, password, fullName);
        if (error) {
          console.error('AdminLoginPage - Sign up error:', error);
          setError(error.message);
        } else {
          console.log('AdminLoginPage - Sign up successful');
          setError('Conta criada com sucesso! Agora você pode solicitar acesso administrativo.');
          setIsSignUp(false);
          setShowAccessRequest(true);
        }
      } else {
        console.log('AdminLoginPage - Attempting sign in for:', email);
        const { error } = await signIn(email, password);
        if (error) {
          console.error('AdminLoginPage - Sign in error:', error);
          setError('Credenciais inválidas. Verifique seu email e senha.');
        } else {
          console.log('AdminLoginPage - Sign in successful');
        }
      }
    } catch (err) {
      console.error('AdminLoginPage - Unexpected error:', err);
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

  // Mostrar loader durante verificações
  if (checkingAdmin || checkingRequest) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  // Layout base da página para outros estados
  const PageLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AdminHeader subtitle="Painel Administrativo" />
        {children}
        <div className="text-center mt-6">
          <a href="/" className="text-white/80 hover:text-orange transition-colors font-medium">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );

  // Status da solicitação existente
  if (user && myRequest && !checkingAdmin && !checkingRequest) {
    return (
      <PageLayout>
        <RequestStatusCard request={myRequest} />
      </PageLayout>
    );
  }

  // Formulário de solicitação de acesso
  if (user && showAccessRequest) {
    return (
      <PageLayout>
        <AccessRequestForm
          fullName={fullName}
          setFullName={setFullName}
          requestedRole={requestedRole}
          setRequestedRole={setRequestedRole}
          message={message}
          setMessage={setMessage}
          isLoading={createAdminRequest.isPending}
          onSubmit={handleAccessRequest}
          onCancel={() => setShowAccessRequest(false)}
        />
      </PageLayout>
    );
  }

  // Card de acesso negado
  if (user && !checkingAdmin && !isApprovedAdmin && !showAccessRequest) {
    return (
      <PageLayout>
        <AccessDeniedCard onRequestAccess={() => setShowAccessRequest(true)} />
      </PageLayout>
    );
  }

  // Formulário de login/signup - não usa PageLayout pois o AdminLoginForm já tem seu próprio layout
  return (
    <AdminLoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      fullName={fullName}
      setFullName={setFullName}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      error={error}
      setError={setError}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};

export default AdminLoginPage;
