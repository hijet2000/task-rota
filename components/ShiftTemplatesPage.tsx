


import React, { useState } from 'react';
// FIX: Corrected relative import path for types.ts.
import { TaskTemplate } from '../types.ts';
// FIX: Corrected relative import path for templatesData.ts.
import { templates as mockTemplates } from '../data/templatesData.ts';
// FIX: Corrected relative import path for TemplateCard.tsx.
import { TemplateCard } from './ShiftTemplateCard.tsx';
// FIX: Corrected relative import path for TemplateEditorModal.tsx.
import { TemplateEditorModal } from './ShiftTemplateForm.tsx';
// FIX: Corrected relative import path for UseTemplateModal.tsx.
import { UseTemplateModal } from './UseTemplateModal.tsx';
// FIX: Corrected relative import path for ui.tsx.
import { Button } from './ui.tsx';

export const TemplatesPage: React.FC = () => {
    const [templates, setTemplates] = useState<TaskTemplate[]>(mockTemplates);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isUseModalOpen, setIsUseModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);

    const handleAdd = () => {
        setSelectedTemplate(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (template: TaskTemplate) => {
        setSelectedTemplate(template);
        setIsEditorOpen(true);
    };

    const handleUse = (template: TaskTemplate) => {
        setSelectedTemplate(template);
        setIsUseModalOpen(true);
    };
    
    const handleSave = (templateToSave: TaskTemplate) => {
        if (selectedTemplate) {
            setTemplates(templates.map(t => t.id === selectedTemplate.id ? templateToSave : t));
        } else {
            setTemplates([...templates, { ...templateToSave, id: `tpl_${Date.now()}` }]);
        }
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
                onSave={handleSave}
            />
            <UseTemplateModal 
                isOpen={isUseModalOpen}
                onClose={() => setIsUseModalOpen(false)}
                template={selectedTemplate}
            />
        </div>
    );
};