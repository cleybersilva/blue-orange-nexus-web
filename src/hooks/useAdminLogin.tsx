
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsApprovedAdmin, useMyAdminRequest, useCreateAdminRequest } from '@/hooks/useBlogData';

export const useAdminLogin = () => {
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
  const [hasRedirected, setHasRedirected] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { data: isApprovedAdmin, isLoading: checkingAdmin } = useIsApprovedAdmin();
  const { data: myRequest, isLoading: checkingRequest } = useMyAdminRequest();
  const createAdminRequest = useCreateAdminRequest();
  const navigate = useNavigate();

  // Função centralizada para redirecionamento
  const redirectToDashboard = () => {
    if (!hasRedirected) {
      console.log('AdminLoginPage - Redirecting to dashboard...');
      setHasRedirected(true);
      navigate('/admin/blog', { replace: true });
    }
  };

  // Effect principal para verificar permissões e redirecionar
  useEffect(() => {
    console.log('AdminLoginPage - Main effect triggered');
    console.log('AdminLoginPage - User:', user?.email);
    console.log('AdminLoginPage - Is Approved Admin:', isApprovedAdmin);
    console.log('AdminLoginPage - Checking Admin:', checkingAdmin);
    console.log('AdminLoginPage - Checking Request:', checkingRequest);
    console.log('AdminLoginPage - Has Redirected:', hasRedirected);
    
    // Bypass completo para admin root
    if (user?.email === 'cleyber.silva@live.com') {
      console.log('AdminLoginPage - ROOT ADMIN DETECTED - IMMEDIATE REDIRECT');
      redirectToDashboard();
      return;
    }
    
    // Se ainda está carregando, aguardar
    if (checkingAdmin || checkingRequest) {
      console.log('AdminLoginPage - Still loading permissions...');
      return;
    }
    
    // Se usuário está logado e as verificações terminaram
    if (user && !checkingAdmin && !checkingRequest) {
      console.log('AdminLoginPage - Processing permissions for user:', user.email);
      
      // Verificar qualquer tipo de admin aprovado
      if (isApprovedAdmin && (
        isApprovedAdmin.isAdmin || 
        isApprovedAdmin.isRoot || 
        isApprovedAdmin.isAuthorAdmin || 
        isApprovedAdmin.isAuthor
      )) {
        console.log('AdminLoginPage - User has admin permissions, redirecting');
        redirectToDashboard();
        return;
      }
      
      console.log('AdminLoginPage - User does not have admin permissions');
    }
  }, [user, isApprovedAdmin, checkingAdmin, checkingRequest, hasRedirected, navigate]);

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
            console.log('AdminLoginPage - Root admin signed up, will redirect after auth state change');
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
          console.log('AdminLoginPage - Sign in successful, auth state will handle redirect');
          // Não fazer redirect aqui - deixar o useEffect handle
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

  return {
    // State
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    message,
    setMessage,
    requestedRole,
    setRequestedRole,
    isSignUp,
    setIsSignUp,
    showPassword,
    setShowPassword,
    error,
    setError,
    loading,
    showAccessRequest,
    setShowAccessRequest,
    
    // Data
    user,
    isApprovedAdmin,
    myRequest,
    checkingAdmin,
    checkingRequest,
    createAdminRequest,
    
    // Functions
    handleSubmit,
    handleAccessRequest
  };
};
