
import React from 'react';
import { getPermissions } from '../../lib/permissions.ts';
import PermissionDenied from '../PermissionDenied.tsx';
import { FeatureId } from '../../types.ts';
import { useFeatures } from '../../lib/features.ts';
import FeatureDisabled from './FeatureDisabled.tsx';

interface ProtectedPageProps {
  permission: string | string[] | null; // Allow null for public pages
  feature?: FeatureId | null;
  pageTitle?: string;
  children: React.ReactNode;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({ permission, feature, pageTitle, children }) => {
  const { hasPermission } = getPermissions();
  const { hasFeature } = useFeatures();

  if (feature && !hasFeature(feature)) {
    return <FeatureDisabled pageTitle={pageTitle} />;
  }
  
  if (permission === null) {
      return <>{children}</>;
  }
  
  const permissionsToCheck = Array.isArray(permission) ? permission : [permission];

  if (permissionsToCheck.some(p => hasPermission(p))) {
    return <>{children}</>;
  }

  return <PermissionDenied />;
};