

import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import PermissionDenied from '../PermissionDenied';
import { FeatureId } from '../../types';
import { useFeatures } from '../../lib/features';
import FeatureDisabled from './FeatureDisabled';

interface ProtectedPageProps {
  permission: string | string[] | null; // Allow null for public pages
  feature?: FeatureId | null;
  pageTitle?: string;
  children: React.ReactNode;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({ permission, feature, pageTitle, children }) => {
  const { hasPermission } = usePermissions();
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