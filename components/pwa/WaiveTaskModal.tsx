import React from 'react';
import { Modal, Button, Input } from '../ui.tsx';

interface WaiveTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskTitle: string;
}

export const WaiveTaskModal: React.FC<WaiveTaskModalProps> = ({ isOpen, onClose, taskTitle }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Waive Task: ${taskTitle}`}
            footer={
                 <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button>Confirm Waive</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">Please provide a reason for waiving this required task. This will be logged for your manager to review.</p>
                <Input label="Reason for waiving" placeholder="e.g., Equipment broken" />
            </div>
        </Modal>
    );
};
