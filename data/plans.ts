import { Plan, FeatureId, Tenant } from '../types.ts';

export const plans: Plan[] = [
    {
        id: 'basic',
        name: 'Basic',
        price: 5,
        userLimit: 10,
        features: [
            'rota',
            'people',
            'locations',
            'leave',
            'time_clock',
            'timesheets',
            'my_work',
            'settings',
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 10,
        userLimit: 50,
        features: [
            'rota',
            'people',
            'locations',
            'leave',
            'time_clock',
            'timesheets',
            'my_work',
            'projects',
            'templates',
            'notifications',
            'reports',
            'settings',
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 0, // Custom
        userLimit: 'unlimited',
        features: [
            'rota',
            'people',
            'locations',
            'leave',
            'time_clock',
            'timesheets',
            'my_work',
            'projects',
            'templates',
            'notifications',
            'reports',
            'automations',
            'integrations',
            'settings',
            'admin',
        ]
    }
];

// Mock the current tenant's context. In a real app this would come from an auth context.
export const currentTenant: Pick<Tenant, 'id' | 'planId'> = {
    id: 'tenant-001',
    planId: 'pro', // The current user is on the Pro plan
};
