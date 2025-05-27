
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Crown, Edit, Users } from 'lucide-react';

interface RoleSelectorProps {
  currentRole?: 'admin' | 'author_admin' | 'author';
  onRoleChange: (role: 'admin' | 'author_admin' | 'author') => void;
  userRole?: 'admin' | 'author_admin' | 'author';
  adminLevel?: 'root' | 'admin';
  disabled?: boolean;
  showAsSelector?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  currentRole, 
  onRoleChange, 
  userRole, 
  adminLevel,
  disabled = false,
  showAsSelector = true
}) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield size={14} />;
      case 'author_admin':
        return <Users size={14} />;
      case 'author':
        return <Edit size={14} />;
      default:
        return null;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'author_admin':
        return 'Administrador de Autores';
      case 'author':
        return 'Autor';
      default:
        return role;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Acesso total ao sistema';
      case 'author_admin':
        return 'Gerencia autores e artigos';
      case 'author':
        return 'Cria e edita apenas seus artigos';
      default:
        return '';
    }
  };

  // Determinar quais roles o usuário atual pode atribuir
  const getAvailableRoles = () => {
    if (userRole === 'admin' && adminLevel === 'root') {
      // Root pode atribuir qualquer role
      return ['admin', 'author_admin', 'author'];
    } else if (userRole === 'admin') {
      // Admin pode atribuir author_admin e author
      return ['author_admin', 'author'];
    } else if (userRole === 'author_admin') {
      // Author admin pode atribuir apenas author
      return ['author'];
    }
    // Para solicitações de acesso, mostrar todas as opções
    return ['admin', 'author_admin', 'author'];
  };

  const availableRoles = getAvailableRoles();

  // Exibir como badge quando não é seletor
  if (currentRole && !showAsSelector) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="flex items-center gap-1">
          {getRoleIcon(currentRole)}
          {getRoleLabel(currentRole)}
        </Badge>
        <span className="text-xs text-gray-500">{getRoleDescription(currentRole)}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Select value={currentRole} onValueChange={onRoleChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um role">
            {currentRole && (
              <div className="flex items-center gap-2">
                {getRoleIcon(currentRole)}
                <span>{getRoleLabel(currentRole)}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableRoles.map((role) => (
            <SelectItem key={role} value={role}>
              <div className="flex items-center gap-2">
                {getRoleIcon(role)}
                <div className="flex flex-col">
                  <span>{getRoleLabel(role)}</span>
                  <span className="text-xs text-gray-500">{getRoleDescription(role)}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {currentRole && (
        <p className="text-xs text-gray-600">{getRoleDescription(currentRole)}</p>
      )}
    </div>
  );
};

export default RoleSelector;
