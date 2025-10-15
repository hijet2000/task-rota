import { RoleDefinition, Employee } from '../types.ts';
import { initialRoleDefinitions } from '../data/roles.ts';
import { employees } from '../data/mockData.ts';

// In a real app, this would be a more robust store.
let roleDefinitions: RoleDefinition[] = initialRoleDefinitions;
// Default to Elaine Benes (Manager, ID 9) for demo, who has tasks assigned.
let currentUser: Employee | null = employees.find(e => e.id === 9) || null;

export const updateRoleDefinitions = (newRoles: RoleDefinition[]) => {
    roleDefinitions = newRoles;
};

export const setCurrentUser = (employee: Employee | null) => {
    currentUser = employee;
};

export const getPermissions = () => {
    const userRole = currentUser ? roleDefinitions.find(r => r.name === currentUser!.role) : null;
    const permissions = new Set(userRole?.permissions || []);
    
    const hasPermission = (permissionId: string) => {
        return permissions.has(permissionId) || permissions.has('is_super_admin');
    };

    return { currentUser, permissions, hasPermission };
};