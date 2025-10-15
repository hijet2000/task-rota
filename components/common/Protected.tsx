import React from 'react';
import { getPermissions } from '../../lib/permissions.ts';
import PermissionDenied from '../PermissionDenied.tsx';

interface ProtectedProps {
  permission: string;
  children: React.ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ permission, children }) => {
  const { hasPermission } = getPermissions();

  if (!hasPermission(permission)) {
    return <PermissionDenied />;
  }

  return <>{children}</>;
};
