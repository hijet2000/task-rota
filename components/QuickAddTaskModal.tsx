import React, { useState } from 'react';
import { Modal, Button, Input, Select } from './ui.tsx';
import { Task } from '../types.ts';
import { projects } from '../data/projectData.ts';

interface QuickAddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Partial<Task>) => void;
}

export const QuickAddTaskModal: React.FC<QuickAddTaskModalProps> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [projectId, setProjectId] = useState(projects[0]?.id || '');

    const handleSave = () => {
        if (title.trim()) {
            onSave({
                title: title.trim(),
                projectId,
                status: 'Draft',
            });
            setTitle('');
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Quick Add Task"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Create Task</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input
                    label="Task Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Order new menus"
                    autoFocus
                />
                <Select label="Project" value={projectId} onChange={e => setProjectId(e.target.value)}>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>
            </div>
        </Modal>
    );
};
