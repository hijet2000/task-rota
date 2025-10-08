
import React, { useState } from 'react';
// FIX: Added .tsx extension to import path
import { TemplateCard } from './ShiftTemplateCard.tsx';
// FIX: Added .ts extension to import path
import { templates } from '../data/templatesData.ts';
// FIX: Added .ts extension to import path
import { TaskTemplate } from '../types.ts';
// FIX: Added .tsx extension to import path
import { TemplateEditorModal } from './ShiftTemplateForm.tsx';
// FIX: Added .tsx extension to import path
import { UseTemplateModal } from './UseTemplateModal.tsx';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';

export const TemplatesPage: React.FC = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isUseModalOpen, setIsUseModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);

    const handleEdit = (template: TaskTemplate) => {
        setSelectedTemplate(template);
        setIsEditorOpen(true);
    };

    const handleUse = (template: TaskTemplate) => {
        setSelectedTemplate(template);
        setIsUseModalOpen(true);
    }
    
    const handleAdd = () => {
        setSelectedTemplate(null);
        setIsEditorOpen(true);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Task Templates</h1>
                <Button onClick={handleAdd}>Create Template</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {templates.map(template => (
                    <TemplateCard 
                        key={template.id} 
                        template={template} 
                        onEdit={() => handleEdit(template)}
                        onUse={() => handleUse(template)}
                    />
                ))}
            </div>

            <TemplateEditorModal 
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                template={selectedTemplate}
                onSave={(t) => console.log('Saving template', t)}
            />
            <UseTemplateModal 
                isOpen={isUseModalOpen}
                onClose={() => setIsUseModalOpen(false)}
                template={selectedTemplate}
            />
        </div>
    );
};