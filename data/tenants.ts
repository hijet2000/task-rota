// FIX: Added .ts extension to import path
import { Tenant } from '../types.ts';

export const tenants: Tenant[] = [
    {
        id: 'tenant-001',
        name: 'The Grand Cafe',
        // FIX: Changed 'Pro' to 'pro' to match the BillingPlan['id'] type.
        plan: 'pro',
        activeUsers: 8,
        status: 'Active',
        health: 'OK',
    },
    {
        id: 'tenant-002',
        name: 'Downtown Dental Care',
        // FIX: Changed 'Pro' to 'pro' to match the BillingPlan['id'] type.
        plan: 'pro',
        activeUsers: 15,
        status: 'Active',
        health: 'OK',
    },
    {
        id: 'tenant-003',
        name: 'City Events Co.',
        // FIX: Changed 'Enterprise' to 'enterprise' to match the BillingPlan['id'] type.
        plan: 'enterprise',
        activeUsers: 52,
        status: 'Active',
        health: 'OK',
    },
    {
        id: 'tenant-004',
        name: 'Corner Store Inc.',
        // FIX: Changed 'Pro' to 'pro' to match the BillingPlan['id'] type.
        plan: 'pro',
        activeUsers: 4,
        status: 'Suspended',
        health: 'Error',
    },
    {
        id: 'tenant-005',
        name: 'New Startup Ltd.',
        plan: 'Trial',
        activeUsers: 2,
        status: 'Trial',
        health: 'OK',
    },
];