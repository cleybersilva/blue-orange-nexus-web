
import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({ children }) => {
  return (
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
};

export default AdminPageLayout;
