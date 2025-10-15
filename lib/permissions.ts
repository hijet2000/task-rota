import { RoleDefinition, Employee } from '../types.ts';
import { initialRoleDefinitions } from '../data/roles.ts';
import { employees } from '../data/mockData.ts';

// --- SECURITY WARNING ---
// The authentication and permission model in this file is for DEMONSTRATION PURPOSES ONLY
// and is NOT SECURE for production use.
//
// In a real-world application, you MUST NOT manage authentication or permissions on the
// client-side. Doing so allows any user to easily manipulate their identity and permissions
// by changing variables in their browser's developer console.
//
// A production-ready implementation should include:
// 1. A secure backend service for user authentication (e.g., using OAuth, JWTs).
// 2. User sessions validated on the server with every sensitive request.
// 3. Permissions and roles enforced on the backend, not trusted from the client.
// 4. Sensitive session information stored in secure, HTTP-only cookies.
// --------------------------


// In a real app, this would be a more robust store, likely managed by the backend.
let roleDefinitions: RoleDefinition[] = initialRoleDefinitions;
// DEMO ONLY: A hardcoded current user. In a real app, this would be determined
// by a secure, server-validated session.
let currentUser: Employee | null = employees.find(e => e.id === 9) || null; // Default to Elaine Benes (Manager) for demo

export const updateRoleDefinitions = (newRoles: RoleDefinition[]) => {
    // DEMO ONLY: This allows client-side role definition updates. In production,
    // this would be a protected admin action that calls a backend API.
    roleDefinitions = newRoles;
};

// SEC-FIX: Removed the insecure `setCurrentUser` function which allowed arbitrary user switching on the client.

export const getPermissions = () => {
    // This is a mock permission check based on the hardcoded user.
    const userRole = currentUser ? roleDefinitions.find(r => r.name === currentUser!.role) : null;
    const permissions = new Set(userRole?.permissions || []);
    
    const hasPermission = (permissionId: string) => {
        // Super admin check is also mocked here. In production, this would be a claim in a JWT or session.
        return permissions.has(permissionId) || permissions.has('is_super_admin');
    };

    return { currentUser, permissions, hasPermission };
};
