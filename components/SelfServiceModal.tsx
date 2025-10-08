
import React from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button } from './ui.tsx';

interface SelfServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SelfServiceModal: React.FC<SelfServiceModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Employee Self Service"
        >
            <div className="p-4">
                <p className="text-gray-600">This is a placeholder for the employee self service portal.</p>
                <div className="mt-6 text-right">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </Modal>
    );
};
