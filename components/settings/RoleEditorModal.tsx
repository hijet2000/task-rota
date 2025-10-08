import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from '../ui.tsx';
// FIX: Added .ts extension to import path
import { RoleDefinition } from '../../types.ts';
import { allPermissions } from '../../data/roles.ts';

interface RoleEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (role: RoleDefinition) => void;
    role: RoleDefinition | null;
    existingRoleNames: string[];
}

export const RoleEditorModal: React.FC<RoleEditorModalProps> = ({ isOpen, onClose, onSave, role, existingRoleNames }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [permissions, setPermissions] = useState<string[]>([]);
    const [error, setError] = useState('');

    const isEditing = role !== null;

    useEffect(() => {
        if (isOpen) {
            setName(role?.name || '');
            setDescription(role?.description || '');
            setPermissions(role?.permissions || []);
            setError('');
        }
    }, [isOpen, role]);

    const handlePermissionChange = (permissionId: string, isChecked: boolean) => {
        setPermissions(prev =>
            isChecked ? [...prev, permissionId] : prev.filter(p => p !== permissionId)
        );
    };

    const handleSave = () => {
        const trimmedName = name.trim();
        if (!trimmedName) {
            setError('Role name is required.');
            return;
        }
        if (!isEditing && existingRoleNames.map(r => r.toLowerCase()).includes(trimmedName.toLowerCase())) {
            setError('A role with this name already exists.');
            return;
        }
        
        onSave({
            name: trimmedName as any,
            description: description.trim(),
            permissions,
            isDefault: role?.isDefault || false,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? `Edit Role: ${role.name}` : 'Add New Role'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Role</Button>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Role Name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g., Head Chef"
                        disabled={role?.isDefault}
                    />
                    <Input
                        label="Description"
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="A brief description of the role's purpose."
                    />
                </div>
                {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}
                
                <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-2">Permissions</h4>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                        {allPermissions.map(p => (
                        <label key={p.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={permissions.includes(p.id)}
                            onChange={(e) => handlePermissionChange(p.id, e.target.checked)}
                            />
                            <span className="text-sm text-gray-600">{p.description}</span>
                        </label>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};