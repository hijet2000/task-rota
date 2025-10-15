import { useAppStore } from '../store/appStore.ts';

/**
 * A hook that provides the current user's authentication and permission status.
 *
 * --- SECURITY NOTE ---
 * This is a client-side mock for demonstration purposes. In a real application,
 * the user object and their roles/permissions would be sourced from a secure,
 * server-validated session (e.g., from an HttpOnly cookie or an auth context
 * populated after login). Permission checks should always be enforced on the backend.
 * ---------------------
 */
export const usePermissions = () => {
    const { currentUser, roles } = useAppStore(state => ({
        currentUser: state.currentUser,
        roles: state.roles,
    }));

    const userRole = currentUser ? roles.find(r => r.name === currentUser.role) : null;
    const permissions = new Set(userRole?.permissions || []);

    const hasPermission = (permissionId: string | null): boolean => {
        if (permissionId === null) {
            return true; // Publicly accessible
        }
        // Super admin ('is_super_admin' permission) has all permissions.
        if (permissions.has('is_super_admin')) {
            return true;
        }
        return permissions.has(permissionId);
    };

    return { currentUser, permissions, hasPermission };
};
