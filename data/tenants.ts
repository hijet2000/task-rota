// FIX: Implemented tenants mock data.
import { Tenant } from '../types.ts';

export const tenants: Tenant[] = [
    {
        id: 'tenant-001',
        name: 'The Grand Cafe',
        planId: 'pro',
        activeUsers: 8,
        status: 'Active',
        health: 'OK',
    },
    {
        id: 'tenant-002',
        name: 'Dental Care Associates',
        planId: 'pro',
        activeUsers: 15,
        status: 'Active',
        health: 'OK',
    },
    {
        id: 'tenant-003',
        name: 'New Startup Inc.',
        planId: 'basic',
        activeUsers: 3,
        status: 'Trial',
        health: 'OK',
    },
    {
        id: 'tenant-004',
        name: 'Old Company LLC',
        planId: 'pro',
        activeUsers: 25,
        status: 'Suspended',
        health: 'Error',
    }
];