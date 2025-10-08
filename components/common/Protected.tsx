
import React from 'react';
import { getPermissions } from '../../lib/permissions.ts';

interface ProtectedProps {
    children: React.ReactNode;
    permission: string;
    fallback?: React.ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children, permission, fallback = null }) => {
    const { hasPermission } = getPermissions();

    if (hasPermission(permission)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
