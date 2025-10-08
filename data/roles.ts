// FIX: Implemented missing roles and permissions data file.
import { Permission, RoleDefinition } from '../types.ts';

export const allPermissions: Permission[] = [
    { id: 'view_rota', description: 'View own rota' },
    { id: 'view_full_rota', description: 'View rota for all staff' },
    { id: 'manage_shifts', description: 'Create, edit, and publish shifts' },
    { id: 'approve_timesheets', description: 'Approve staff timesheets' },
    { id: 'access_reports', description: 'Access reports dashboard' },
    { id: 'manage_employees', description: 'Add, edit, and remove employees' },
    { id: 'manage_locations', description: 'Add, edit, and remove locations' },
    { id: 'manage_leave', description: 'Approve and manage leave requests' },
    { id: 'manage_settings', description: 'Manage tenant-level settings' },
    { id: 'manage_roles', description: 'Manage user roles and permissions' },
    { id: 'manage_billing', description: 'Manage billing and subscription' },
];

export const initialRoleDefinitions: RoleDefinition[] = [
    {
        name: 'Owner',
        description: 'Full access to all features, including billing and admin settings.',
        isDefault: true,
        permissions: allPermissions.map(p => p.id),
    },
    {
        name: 'Admin',
        description: 'Full access to most features, except for billing.',
        isDefault: true,
        permissions: allPermissions.filter(p => p.id !== 'manage_billing').map(p => p.id),
    },
    {
        name: 'Manager',
        description: 'Can manage schedules, approve timesheets, and view reports for their locations.',
        isDefault: true,
        permissions: [
            'view_rota',
            'view_full_rota',
            'manage_shifts',
            'approve_timesheets',
            'access_reports',
            'manage_employees',
            'manage_locations',
            'manage_leave',
        ],
    },
    {
        name: 'Member',
        description: 'Can view their own schedule, clock in/out, and request leave.',
        isDefault: true,
        permissions: ['view_rota'],
    }
];
