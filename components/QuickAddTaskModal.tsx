import React, { useState, useEffect } from 'react';
// FIX: Implement the QuickAddTaskModal component.
import { Modal, Button, Input, Select } from './ui.tsx';
import { useAppStore } from '../store/appStore.ts';
import { Task } from '../types.ts';

interface QuickAddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const QuickAddTaskModal: React.FC<QuickAddTaskModalProps> = ({ isOpen, onClose }) => {
    const { projects, addTask, currentUser } = useAppStore();
    const [title, setTitle] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        if (isOpen && projects.length > 0 && !projectId) {
            setProjectId(projects[0].id);
        }
    }, [isOpen, projects, projectId]);


    const handleSave = () => {
        if (!title.trim() || !projectId) {
            alert('Title and project are required.');
            return;
        }

        const taskData: Omit<Task, 'id' | 'code' | 'createdAt' | 'updatedAt' | 'activity' | 'slaState'> = {
            title,
            description: '',
            status: 'Draft',
            priority: 'Medium',
            assigneeIds: currentUser ? [currentUser.id] : [],
            dueDate: null,
            labels: [],
            checklist: [],
            attachments: [],
            dependencies: [],
            projectId: projectId,
        };

        addTask(taskData);
        setTitle('');
        if (projects.length > 0) {
            setProjectId(projects[0].id);
        }
        onClose();
    };
    
    // Clear state on close
    const handleClose = () => {
        setTitle('');
        if (projects.length > 0) {
            setProjectId(projects[0].id || '');
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Quick Add Task"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add Task</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input 
                    label="Task Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Follow up with the new client"
                />
                <Select
                    label="Project"
                    value={projectId}
                    onChange={e => setProjectId(e.target.value)}
                >
                     {projects.length === 0 ? <option disabled>No projects available</option> :
                        projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </Select>
            </div>
        </Modal>
    );
};
