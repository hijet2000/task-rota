import React, { useState } from 'react';
import { Modal, Button, Input } from '../ui.tsx';

interface TaskSuggestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (templateName: string) => void;
}

export const TaskSuggestionModal: React.FC<TaskSuggestionModalProps> = ({ isOpen, onClose, onGenerate }) => {
    const [templateName, setTemplateName] = useState('');

    const handleGenerate = () => {
        if (templateName.trim()) {
            onGenerate(templateName.trim());
        }
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Generate Task Suggestions with AI"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleGenerate} disabled={!templateName.trim()}>Generate</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Describe the template you want to create, and we'll suggest some tasks to get you started.
                </p>
                <Input 
                    label="What is this template for?"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="e.g., 'Restaurant Opening Checklist' or 'New Employee Onboarding'"
                    autoFocus
                />
            </div>
        </Modal>
    );
};
