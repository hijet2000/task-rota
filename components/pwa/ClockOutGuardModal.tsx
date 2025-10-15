import React from 'react';
import { Modal, Button } from '../ui.tsx';
import { AlertTriangleIcon } from '../icons.tsx';

interface ClockOutGuardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onForceClockOut: () => void;
}

export const ClockOutGuardModal: React.FC<ClockOutGuardModalProps> = ({ isOpen, onClose, onForceClockOut }) => {
    // In a real app, this would check for incomplete tasks.
    const incompleteTasksCount = 2;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Incomplete Shift Tasks"
        >
            <div className="text-center">
                <AlertTriangleIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-lg font-medium">You have {incompleteTasksCount} incomplete tasks for this shift.</p>
                <p className="text-gray-600 mt-2">Are you sure you want to clock out? Your manager will be notified of any incomplete required tasks.</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <Button variant="secondary" onClick={onClose}>
                        Go Back
                    </Button>
                    <Button onClick={onForceClockOut} className="bg-red-600 hover:bg-red-700">
                        Clock Out Anyway
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
