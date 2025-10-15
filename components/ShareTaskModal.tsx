
import React from 'react';
import { Modal, Button, Input } from './ui.tsx';

interface ShareTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskCode: string;
}

export const ShareTaskModal: React.FC<ShareTaskModalProps> = ({ isOpen, onClose, taskCode }) => {
    const publicUrl = `${window.location.origin}/public/task/${taskCode}`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Share Task"
            footer={<Button variant="secondary" onClick={onClose}>Done</Button>}
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Anyone with this public link can view the task details. They will not be able to make changes.
                </p>
                <div className="flex space-x-2">
                    <Input label="" readOnly value={publicUrl} className="flex-grow" />
                    <Button onClick={() => navigator.clipboard.writeText(publicUrl)}>Copy Link</Button>
                </div>
            </div>
        </Modal>
    );
};
