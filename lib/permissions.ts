
// FIX: Added .ts extension to import path
import { Employee, Role, RoleDefinition } from '../types.ts';
// FIX: Added .ts extension to import path
import { initialRoleDefinitions } from '../data/roles.ts';

let activeUser: Employee | null = null;
let roleDefinitions: RoleDefinition[] = initialRoleDefinitions;

export const login = (user: Employee) => {
    activeUser = user;
};

export const logout = () => {
    activeUser = null;
};

export const updateRoleDefinitions = (newRoles: RoleDefinition[]) => {
    roleDefinitions = newRoles;
};

export const getAvailableRoles = (): RoleDefinition[] => {
    return roleDefinitions;
};

export const getPermissions = () => {
    // If no user is logged in, return a default state with no permissions.
    if (!activeUser) {
        return {
            currentUser: null,
            hasPermission: () => false,
            hasRole: () => false,
            isOneOfRoles: () => false,
        };
    }

    const userRoleDefinition = roleDefinitions.find(rd => rd.name === activeUser!.role);
    const userPermissions = userRoleDefinition?.permissions || [];

    const hasPermission = (permissionId: string): boolean => {
        return userPermissions.includes(permissionId);
    };

    const hasRole = (role: Role): boolean => {
        return activeUser!.role === role;
    };
    
    const isOneOfRoles = (roles: Role[]): boolean => {
        return roles.includes(activeUser!.role);
    }

    return { currentUser: activeUser, hasPermission, hasRole, isOneOfRoles };
};
