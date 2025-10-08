
import React from 'react';
import { Modal, Button } from './ui.tsx';

interface BulkApplyTemplateFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BulkApplyTemplateForm: React.FC<BulkApplyTemplateFormProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Bulk Apply Template"
        >
            <div className="p-4">
                <p className="text-gray-600">This is a placeholder for a form to apply a task template to multiple shifts or dates.</p>
                <div className="mt-6 text-right">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </Modal>
    );
};
