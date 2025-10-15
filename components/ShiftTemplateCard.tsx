


import React from 'react';
// FIX: Corrected relative import path for types.ts.
import { TaskTemplate } from '../types.ts';
// FIX: Corrected relative import path for ui.tsx.
import { Button } from './ui.tsx';
// FIX: Corrected relative import path for icons.tsx.
import { FileCheck2Icon } from './icons.tsx';

interface TemplateCardProps {
    template: TaskTemplate;
    onEdit: () => void;
    onUse: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onEdit, onUse }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden group">
            <div className="p-4 flex-grow">
                 <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{template.name}</h3>
                     <FileCheck2Icon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-1 h-10 overflow-hidden">{template.description}</p>
            </div>
            <div className="bg-gray-50 px-4 py-2 grid grid-cols-2 gap-2 border-t">
                <Button variant="secondary" onClick={onEdit} size="sm">
                    Edit
                </Button>
                 <Button onClick={onUse} size="sm">
                    Use Template
                </Button>
            </div>
        </div>
    );
};