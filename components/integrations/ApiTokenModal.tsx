import React from 'react';
// FIX: Added .tsx extension to import path.
import { Modal, Button, Input, Card } from '../ui.tsx';

interface ApiTokenModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const allScopes = ['read:shifts', 'write:shifts', 'read:employees', 'write:employees', 'read:reports', 'read:timesheets'];

export const ApiTokenModal: React.FC<ApiTokenModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Generate New API Token"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button>Generate Token</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Token Name" type="text" placeholder="e.g., My Custom App" />
                
                <Card title="Permissions" description="Select the scopes this token will have access to.">
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {allScopes.map(scope => (
                            <label key={scope} className="flex items-center space-x-2">
                                <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">{scope}</span>
                            </label>
                        ))}
                    </div>
                </Card>
            </div>
        </Modal>
    );
};
