

import React, { useState } from 'react';
import { Card, Button, Input } from './ui';
import { notificationTemplates as mockTemplates } from '../data/notificationTemplates';
import { NotificationTemplate } from '../types';
import { TemplateEditorModal } from './TemplateEditorModal';
import { PencilIcon, TrashIcon } from './icons';

interface TemplateLibraryProps {
    isModal?: boolean;
    closeModal?: () => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ isModal, closeModal }) => {
    const [templates, setTemplates] = useState<NotificationTemplate[]>(mockTemplates);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
    
    const handleAdd = () => {
        setSelectedTemplate(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (template: NotificationTemplate) => {
        setSelectedTemplate(template);
        setIsEditorOpen(true);
    };

    const handleSave = (template: NotificationTemplate) => {
        if (selectedTemplate) {
            setTemplates(templates.map(t => t.id === template.id ? template : t));
        } else {
            setTemplates([...templates, { ...template, id: `tpl_${Date.now()}` }]);
        }
        setIsEditorOpen(false);
    };

    const content = (
        <div className="space-y-4">
            {templates.map(template => (
                <div key={template.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                        <h4 className="text-md font-semibold text-gray-800">{template.name}</h4>
                        <p className="text-sm text-gray-500">{template.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Triggers on: <span className="font-mono">{template.event}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                         <Button variant="secondary" size="sm" onClick={() => handleEdit(template)}>
                            <PencilIcon className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button variant="secondary" size="sm" className="text-red-600 hover:bg-red-50">
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
    
    if (isModal) {
        return (
            <>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Manage Notification Templates</h2>
                    {closeModal && <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">&times;</button>}
                </div>
                <div className="mb-4">
                    <Button onClick={handleAdd}>Create New Template</Button>
                </div>
                {content}
                 <TemplateEditorModal 
                    isOpen={isEditorOpen}
                    onClose={() => setIsEditorOpen(false)}
                    onSave={handleSave}
                    template={selectedTemplate}
                />
            </>
        );
    }

    return (
        <>
            <Card
                title="Notification Templates"
                description="Manage the content of automated messages sent for different events."
                footer={<Button onClick={handleAdd}>Create New Template</Button>}
            >
                {content}
            </Card>
            <TemplateEditorModal 
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onSave={handleSave}
                template={selectedTemplate}
            />
        </>
    );
};