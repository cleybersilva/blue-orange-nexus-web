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
    console.log('AdminLoginPage - User ID:', user?.id);
    console.log('AdminLoginPage - Is Approved Admin:', isApprovedAdmin);
    console.log('AdminLoginPage - My Request:', myRequest);
    console.log('AdminLoginPage - Checking Admin:', checkingAdmin);
    console.log('AdminLoginPage - Checking Request:', checkingRequest);
    
    // PRIORIDADE MÁXIMA: Admin Root Cleyber
    if (user?.email === 'cleyber.silva@live.com') {
      console.log('AdminLoginPage - ROOT ADMIN CLEYBER DETECTED - IMMEDIATE REDIRECT');
      navigate('/admin/blog', { replace: true });
      return;
    }
    
    // Se o usuário está logado e as verificações terminaram
    if (user && !checkingAdmin && !checkingRequest) {
      console.log('AdminLoginPage - All checks completed, processing permissions...');
      console.log('AdminLoginPage - Full permission object:', isApprovedAdmin);
      
      // Verificação para qualquer admin root
      if (isApprovedAdmin && (isApprovedAdmin.isRoot || 
          (isApprovedAdmin.isAdmin && isApprovedAdmin.profile?.admin_level === 'root'))) {
        console.log('AdminLoginPage - ROOT ADMIN detected, redirecting immediately');
        navigate('/admin/blog', { replace: true });
        return;
      }
      
      // Qualquer tipo de admin aprovado
      if (isApprovedAdmin && (isApprovedAdmin.isAdmin || isApprovedAdmin.isAuthorAdmin || isApprovedAdmin.isAuthor)) {
        console.log('AdminLoginPage - User has admin access, redirecting to dashboard');
        navigate('/admin/blog', { replace: true });
        return;
      }
      
      console.log('AdminLoginPage - User does not have admin access');
      console.log('AdminLoginPage - isApprovedAdmin detailed:', {
        exists: !!isApprovedAdmin,
        isAdmin: isApprovedAdmin?.isAdmin,
        isRoot: isApprovedAdmin?.isRoot,
        isAuthorAdmin: isApprovedAdmin?.isAuthorAdmin,
        isAuthor: isApprovedAdmin?.isAuthor,
        profile: isApprovedAdmin?.profile
      });
    }
  }, [user, isApprovedAdmin, myRequest, checkingAdmin, checkingRequest, navigate]);

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
          
          // Verificação especial para admin root após signup
          if (email === 'cleyber.silva@live.com') {
            console.log('AdminLoginPage - Root admin signed up, redirecting immediately');
            navigate('/admin/blog', { replace: true });
            return;
          }
          
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
          
          // Verificação especial para admin root após login
          if (email === 'cleyber.silva@live.com') {
            console.log('AdminLoginPage - Root admin logged in, redirecting immediately');
            navigate('/admin/blog', { replace: true });
            return;
          }
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

  // Mostrar loader durante verificações (exceto para admin root)
  if (checkingAdmin || checkingRequest) {
    // Bypass loader para admin root
    if (user?.email === 'cleyber.silva@live.com') {
      console.log('AdminLoginPage - Root admin bypassing loader, redirecting...');
      navigate('/admin/blog', { replace: true });
      return null;
    }
    
    console.log('AdminLoginPage - Still checking permissions...');
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

  // Debug especial para verificar estado do usuário
  if (user) {
    console.log('AdminLoginPage - RENDER DEBUG:', {
      userEmail: user.email,
      userId: user.id,
      hasIsApprovedAdmin: !!isApprovedAdmin,
      isApprovedAdminValue: isApprovedAdmin,
      hasMyRequest: !!myRequest,
      myRequestValue: myRequest,
      showAccessRequest
    });
  }

  // PROTEÇÃO EXTRA: Admin root nunca deve ver outras telas
  if (user?.email === 'cleyber.silva@live.com') {
    console.log('AdminLoginPage - Root admin in render, forcing redirect');
    navigate('/admin/blog', { replace: true });
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  // Verificação extra para admin root - nunca deve mostrar solicitação
  if (user && isApprovedAdmin && (isApprovedAdmin.isRoot || 
      (isApprovedAdmin.isAdmin && isApprovedAdmin.profile?.admin_level === 'root'))) {
    console.log('AdminLoginPage - Root admin detected in render, forcing redirect');
    navigate('/admin/blog', { replace: true });
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  // IMPORTANTE: Admin com qualquer permissão deve ser redirecionado
  if (user && isApprovedAdmin && (isApprovedAdmin.isAdmin || isApprovedAdmin.isAuthorAdmin || isApprovedAdmin.isAuthor)) {
    console.log('AdminLoginPage - Admin user detected in render, forcing redirect');
    navigate('/admin/blog', { replace: true });
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  // Status da solicitação existente - só mostra se não tem permissões admin
  if (user && myRequest && !isApprovedAdmin?.isAdmin && !isApprovedAdmin?.isAuthorAdmin && !isApprovedAdmin?.isAuthor) {
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

  // Card de acesso negado - só mostra se não tem permissões admin e não tem solicitação pendente
  if (user && !isApprovedAdmin?.isAdmin && !isApprovedAdmin?.isAuthorAdmin && !isApprovedAdmin?.isAuthor && !myRequest && !showAccessRequest) {
    return (
      <PageLayout>
        <AccessDeniedCard onRequestAccess={() => setShowAccessRequest(true)} />
      </PageLayout>
    );
  }

  // Formulário de login/signup
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
