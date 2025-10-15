import React, { useState } from 'react';
import { Card, Button } from '../ui.tsx';
import { shiftTaskTemplates as mockTemplates } from '../../data/shiftTaskTemplates.ts';
import { ShiftTaskTemplate } from '../../types.ts';
import { PencilIcon, TrashIcon } from '../icons.tsx';
import { ShiftTemplateEditorModal } from './ShiftTemplateEditorModal.tsx';

export const ShiftTasksSettings: React.FC = () => {
    const [templates, setTemplates] = useState<ShiftTaskTemplate[]>(mockTemplates);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<ShiftTaskTemplate | null>(null);

    const handleAdd = () => {
        setSelectedTemplate(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (template: ShiftTaskTemplate) => {
        setSelectedTemplate(template);
        setIsEditorOpen(true);
    };

    return (
        <>
            <Card
                title="Shift Task Templates"
                description="Create and manage reusable checklists for tasks that need to be completed during a shift."
                footer={<Button onClick={handleAdd}>Create New Template</Button>}
            >
                <div className="space-y-4">
                    {templates.map((template) => (
                        <div key={template.id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="text-md font-semibold text-gray-800">{template.name}</h4>
                                <p className="text-sm text-gray-500">{template.description}</p>
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
            </Card>
            <ShiftTemplateEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                template={selectedTemplate}
            />
        </>
    );
};
