
import React, { useState, useEffect } from 'react';
// FIX: Added .tsx extension to import path.
import { Modal, Button, Input, TagInput } from './ui.tsx';
// FIX: Added .ts extension to import path
import { TaskTemplate, Task } from '../types.ts';
// FIX: Added .tsx extension to import path
import { PlusCircleIcon, TrashIcon } from './icons.tsx';

interface TemplateEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: TaskTemplate | null;
    onSave: (template: TaskTemplate) => void;
}

const getInitialFormData = (template: TaskTemplate | null): Partial<TaskTemplate> => {
    return {
        name: template?.name || '',
        description: template?.description || '',
        category: template?.category || 'General',
        tasks: template?.tasks || [],
    };
};

export const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({ isOpen, onClose, template, onSave }) => {
    const [formData, setFormData] = useState(getInitialFormData(template));

    useEffect(() => {
        setFormData(getInitialFormData(template));
    }, [template, isOpen]);

    const handleSave = () => {
        // Basic validation
        if (formData.name && formData.tasks) {
            onSave(formData as TaskTemplate);
            onClose();
        }
    };

    const handleAddTask = () => {
        // FIX: Corrected the type of a new template task by omitting the 'activity' property, aligning it with the TaskTemplate interface which defines tasks without an activity log.
        const newTask: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt' | 'code' | 'slaState' | 'activity'> = {
            title: 'New Task',
            description: '',
            status: 'Draft',
            priority: 'Medium',
            assigneeIds: [],
            dueDate: null,
            labels: [],
            checklist: [],
            attachments: [],
            dependencies: [],
        };
        setFormData(prev => ({ ...prev, tasks: [...(prev.tasks || []), newTask] }));
    };

    const handleRemoveTask = (index: number) => {
        setFormData(prev => ({ ...prev, tasks: (prev.tasks || []).filter((_, i) => i !== index) }));
    };

    const handleTaskChange = (index: number, field: keyof Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt' | 'code' | 'slaState' | 'activity'>, value: any) => {
        const newTasks = [...(formData.tasks || [])];
        (newTasks[index] as any)[field] = value;
        setFormData(prev => ({ ...prev, tasks: newTasks }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={template ? `Edit Template: ${template.name}` : 'Create New Template'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Template</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input 
                    label="Template Name" 
                    value={formData.name || ''} 
                    onChange={e => setFormData(f => ({...f, name: e.target.value}))}
                />
                <Input 
                    label="Description" 
                    value={formData.description || ''} 
                    onChange={e => setFormData(f => ({...f, description: e.target.value}))}
                />
                <Input 
                    label="Category" 
                    value={formData.category || ''} 
                    onChange={e => setFormData(f => ({...f, category: e.target.value}))}
                />
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tasks in this template</h3>
                    <div className="space-y-2 p-2 border rounded-md max-h-60 overflow-y-auto">
                        {(formData.tasks || []).map((task, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                <Input 
                                    label="" 
                                    className="flex-grow"
                                    value={task.title} 
                                    onChange={e => handleTaskChange(index, 'title', e.target.value)}
                                />
                                <button onClick={() => handleRemoveTask(index)}>
                                    <TrashIcon className="w-5 h-5 text-red-500" />
                                </button>
                            </div>
                        ))}
                         <Button variant="secondary" onClick={handleAddTask} className="w-full">
                            <PlusCircleIcon className="w-4 h-4 mr-2" />
                            Add Task
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
