
import React from 'react';
import { Loader2 } from 'lucide-react';

const AdminLoginLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange mx-auto mb-4" />
        <p className="text-white/80">Verificando permissões...</p>
      </div>
    </div>
  );
};

export default AdminLoginLoading;
