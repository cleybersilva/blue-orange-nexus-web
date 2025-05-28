
import React from 'react';
import { useAdminLogin } from '@/hooks/useAdminLogin';
import AdminLoginLoading from '@/components/admin/AdminLoginLoading';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AccessRequestForm from '@/components/admin/AccessRequestForm';
import RequestStatusCard from '@/components/admin/RequestStatusCard';
import AccessDeniedCard from '@/components/admin/AccessDeniedCard';

const AdminLoginPage = () => {
  const {
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
  } = useAdminLogin();

  // Mostrar loader durante verificações iniciais
  if (checkingAdmin || checkingRequest) {
    console.log('AdminLoginPage - Showing loader while checking permissions');
    return <AdminLoginLoading />;
  }

  // Status da solicitação existente - só mostra se não tem permissões admin
  if (user && myRequest && !isApprovedAdmin?.isAdmin && !isApprovedAdmin?.isAuthorAdmin && !isApprovedAdmin?.isAuthor && !isApprovedAdmin?.isRoot) {
    return (
      <AdminPageLayout>
        <RequestStatusCard request={myRequest} />
      </AdminPageLayout>
    );
  }

  // Formulário de solicitação de acesso
  if (user && showAccessRequest) {
    return (
      <AdminPageLayout>
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
      </AdminPageLayout>
    );
  }

  // Card de acesso negado - só mostra se não tem permissões admin e não tem solicitação pendente
  if (user && !isApprovedAdmin?.isAdmin && !isApprovedAdmin?.isAuthorAdmin && !isApprovedAdmin?.isAuthor && !isApprovedAdmin?.isRoot && !myRequest && !showAccessRequest) {
    return (
      <AdminPageLayout>
        <AccessDeniedCard onRequestAccess={() => setShowAccessRequest(true)} />
      </AdminPageLayout>
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
