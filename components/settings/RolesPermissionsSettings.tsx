


import React, { useState, useEffect } from 'react';
// FIX: Corrected relative import path for ui.tsx.
import { Card, Button } from '../ui.tsx';
// FIX: Corrected relative import path for roles.ts.
import { initialRoleDefinitions } from '../../data/roles.ts';
// FIX: Corrected relative import path for types.ts.
import { RoleDefinition } from '../../types.ts';
// FIX: Corrected relative import path for permissions.ts.
import { updateRoleDefinitions } from '../../lib/permissions.ts';
// FIX: Corrected relative import path for RoleEditorModal.tsx.
import { RoleEditorModal } from './RoleEditorModal.tsx';
// FIX: Corrected relative import path for icons.tsx.
import { PencilIcon, TrashIcon } from '../icons.tsx';

export const RolesPermissionsSettings: React.FC = () => {
    const [roles, setRoles] = useState<RoleDefinition[]>(initialRoleDefinitions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleDefinition | null>(null);

    // Update the central permissions "store" whenever roles change
    useEffect(() => {
        updateRoleDefinitions(roles);
    }, [roles]);

    const handleAddRole = () => {
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    const handleEditRole = (role: RoleDefinition) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const handleDeleteRole = (roleName: string) => {
        if (window.confirm(`Are you sure you want to delete the "${roleName}" role? This cannot be undone.`)) {
            setRoles(prevRoles => prevRoles.filter(r => r.name !== roleName));
        }
    };

    const handleSaveRole = (roleToSave: RoleDefinition) => {
        setRoles(prevRoles => {
            const roleExists = prevRoles.some(r => r.name === selectedRole?.name);
            if (roleExists && selectedRole) {
                // Update existing role
                return prevRoles.map(r => r.name === selectedRole!.name ? roleToSave : r);
            } else {
                // Add new role
                return [...prevRoles, roleToSave];
            }
        });
        setIsModalOpen(false);
    };

    return (
        <>
            <Card
                title="Roles & Permissions"
                description="Define what each user role can see and do within the application."
                footer={<Button onClick={handleAddRole}>Add New Role</Button>}
            >
                <div className="space-y-4">
                    {roles.map((role) => (
                        <div key={role.name} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="text-md font-semibold text-gray-800">{role.name} {role.isDefault && <span className="text-xs bg-gray-200 text-gray-600 font-medium px-2 py-0.5 rounded-full ml-2">Default</span>}</h4>
                                <p className="text-sm text-gray-500">{role.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="secondary" size="sm" onClick={() => handleEditRole(role)}>
                                    <PencilIcon className="w-4 h-4 mr-1" /> Edit
                                </Button>
                                {!role.isDefault && (
                                    <Button variant="secondary" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDeleteRole(role.name)}>
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <RoleEditorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRole}
                role={selectedRole}
                existingRoleNames={roles.map(r => r.name)}
            />
        </>
    );
};