
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import AuthorManager from '@/components/admin/AuthorManager';
import HubHighlight from '@/components/ui/hub-highlight';
import { ArrowLeft, LogOut } from 'lucide-react';

const AdminAuthorsPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-navy/10">
        <div className="container-custom flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/blog')} className="border-navy/20 text-navy hover:bg-navy hover:text-white">
              <ArrowLeft size={16} className="mr-2" />
              Dashboard
            </Button>
            <span className="text-2xl font-bold">
              <span className="text-orange">Agência</span>
              <span className="text-navy">Digital</span>
              <HubHighlight />
            </span>
            <Badge variant="secondary" className="bg-orange/10 text-orange">Admin</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut} className="border-navy/20 text-navy hover:bg-navy hover:text-white">
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <AuthorManager />
      </main>
    </div>
  );
};

export default AdminAuthorsPage;
