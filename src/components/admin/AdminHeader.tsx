
import React from 'react';
import { Link } from 'react-router-dom';
import HubHighlight from '@/components/ui/hub-highlight';

interface AdminHeaderProps {
  subtitle: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ subtitle }) => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-block">
        <span className="text-3xl font-bold">
          <span className="text-orange">Agência</span>
          <span className="text-white">Digital</span>
          <HubHighlight className="text-white" />
        </span>
      </Link>
      <p className="text-white/80 mt-2 font-medium">{subtitle}</p>
    </div>
  );
};

export default AdminHeader;
