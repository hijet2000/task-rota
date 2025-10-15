import React from 'react';
import { Modal, Button } from './ui.tsx';
import { Task } from '../types.ts';

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, onClose, task }) => {
    if (!task) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`${task.code}: ${task.title}`}
            footer={<Button onClick={onClose}>Close</Button>}
        >
            <div className="p-4 space-y-4">
                <p className="text-gray-700">{task.description || "No description provided."}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-semibold text-gray-500">Status</p>
                        <p>{task.status}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">Priority</p>
                        <p>{task.priority}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">Due Date</p>
                        <p>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None'}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
