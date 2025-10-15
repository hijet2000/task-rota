import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from '../ui.tsx';
import { ShiftTaskTemplate } from '../../types.ts';

interface ShiftTemplateEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: ShiftTaskTemplate | null;
}

export const ShiftTemplateEditorModal: React.FC<ShiftTemplateEditorModalProps> = ({ isOpen, onClose, template }) => {
    const [formData, setFormData] = useState<Partial<ShiftTaskTemplate>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(template || { name: '', description: '', tasks: [] });
        }
    }, [isOpen, template]);

    const handleSave = () => {
        if (formData.name) {
            // onSave(formData as ShiftTaskTemplate);
            console.log("Saving shift template", formData);
            onClose();
        } else {
            alert('Template name is required.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={template ? 'Edit Shift Template' : 'Create Shift Template'}
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
                {/* A full task list editor would be here. */}
                <p className="text-sm text-gray-600 p-4 bg-gray-50 rounded-md text-center">
                    Task list editor for shift templates is coming soon.
                </p>
            </div>
        </Modal>
    );
};
