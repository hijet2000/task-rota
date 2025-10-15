import { plans, currentTenant } from '../data/plans.ts';
import { FeatureId } from '../types.ts';

// This simulates the GET /api/features endpoint
const getTenantFeatures = (): Set<FeatureId> => {
    const plan = plans.find(p => p.id === currentTenant.planId);
    return new Set(plan?.features || []);
};

const enabledFeatures = getTenantFeatures();

// This hook provides a function to check if a feature is enabled for the current tenant's plan.
export const useFeatures = () => {
    const hasFeature = (featureId: FeatureId | null): boolean => {
        if (featureId === null) return true; // null means it's a core feature available to all
        return enabledFeatures.has(featureId);
    };

    return { hasFeature, planId: currentTenant.planId };
};
