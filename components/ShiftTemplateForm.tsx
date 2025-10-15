// FIX: Implemented ShiftTemplateForm component
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from './ui.tsx';
import { TaskTemplate, Task } from '../types.ts';

interface TemplateEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (template: TaskTemplate) => void;
    template: TaskTemplate | null;
}

export const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({ isOpen, onClose, onSave, template }) => {
    const [formData, setFormData] = useState<Partial<TaskTemplate>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(template || { name: '', description: '', category: 'General', tasks: [] });
        }
    }, [isOpen, template]);
    
    const handleSave = () => {
        if (formData.name) {
            onSave(formData as TaskTemplate);
            onClose();
        } else {
            alert('Template name is required.');
        }
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={template ? 'Edit Template' : 'Create Template'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Template</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Template Name" value={formData.name || ''} onChange={e => setFormData(f => ({...f, name: e.target.value}))} />
                <Input label="Description" value={formData.description || ''} onChange={e => setFormData(f => ({...f, description: e.target.value}))} />
                <Input label="Category" value={formData.category || ''} onChange={e => setFormData(f => ({...f, category: e.target.value}))} />
                {/* A full task editor would be here. This is a simplified version. */}
                <p className="text-sm text-gray-600">Task list editor coming soon.</p>
            </div>
        </Modal>
    );
};
