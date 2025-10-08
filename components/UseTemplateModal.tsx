
import React from 'react';
import { Modal, Button, Input, Select } from './ui.tsx';
import { TaskTemplate } from '../types.ts';
import { projects } from '../data/projectData.ts';

interface UseTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: TaskTemplate | null;
}

export const UseTemplateModal: React.FC<UseTemplateModalProps> = ({ isOpen, onClose, template }) => {
    if (!template) return null;

    const handleApply = () => {
        console.log(`Applying template "${template.name}"...`);
        // In a real app, this would create the tasks from the template
        // within the selected project.
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Use Template: ${template.name}`}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleApply}>Apply Template</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">This will create {template.tasks.length} new tasks. Please select a project to add them to.</p>
                <Select label="Project">
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>
                 <Input label="Start Date" type="date" helperText="Due dates for tasks in the template will be calculated relative to this date." />
            </div>
        </Modal>
    );
};
