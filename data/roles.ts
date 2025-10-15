// FIX: Corrected relative import path for types.ts.
import { RoleDefinition, Permission } from '../types.ts';

export const allPermissions: Permission[] = [
    { id: 'manage_employees', description: 'Manage Employees', category: 'People' },
    { id: 'manage_locations', description: 'Manage Locations', category: 'General' },
    { id: 'approve_timesheets', description: 'Approve Timesheets', category: 'Payroll' },
    { id: 'access_reports', description: 'Access Reports', category: 'Reporting' },
    { id: 'manage_settings', description: 'Manage Settings', category: 'Admin' },
    { id: 'manage_leave', description: 'Manage Leave Requests', category: 'Leave' },
    { id: 'is_super_admin', description: 'Super Admin', category: 'Admin' },
];

export const initialRoleDefinitions: RoleDefinition[] = [
    {
        name: 'Owner',
        description: 'Has all permissions.',
        isDefault: false,
        permissions: ['manage_employees', 'manage_locations', 'approve_timesheets', 'access_reports', 'manage_settings', 'manage_leave', 'is_super_admin'],
    },
    {
        name: 'Admin',
        description: 'Can manage most settings.',
        isDefault: false,
        permissions: ['manage_employees', 'manage_locations', 'approve_timesheets', 'access_reports', 'manage_settings', 'manage_leave'],
    },
    {
        name: 'Manager',
        description: 'Can manage people, schedules, and approve timesheets.',
        isDefault: false,
        permissions: ['manage_employees', 'approve_timesheets', 'access_reports', 'manage_leave'],
    },
    {
        name: 'Member',
        description: 'Base role for employees.',
        isDefault: true,
        permissions: [],
    },
];