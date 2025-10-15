




import React, { useState, useEffect } from 'react';
import { Card, Button } from '../ui';
import { RoleDefinition } from '../../types';
import { RoleEditorModal } from './RoleEditorModal';
import { PencilIcon, TrashIcon } from '../icons';
import { useAppStore } from '../../store/appStore';

export const RolesPermissionsSettings: React.FC = () => {
    const { roles, updateRoles } = useAppStore(state => ({
        roles: state.roles,
        updateRoles: state.updateRoles,
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleDefinition | null>(null);

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
            const newRoles = roles.filter(r => r.name !== roleName);
            updateRoles(newRoles);
        }
    };

    const handleSaveRole = (roleToSave: RoleDefinition) => {
        let newRoles: RoleDefinition[];
        const roleExists = roles.some(r => r.name === selectedRole?.name);

        if (roleExists && selectedRole) {
            // Update existing role
            newRoles = roles.map(r => r.name === selectedRole!.name ? roleToSave : r);
        } else {
            // Add new role
            newRoles = [...roles, roleToSave];
        }
        updateRoles(newRoles);
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
