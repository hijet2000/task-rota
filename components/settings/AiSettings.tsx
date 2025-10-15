import React, { useState } from 'react';
import { Card, Button, ToggleSwitch } from '../ui.tsx';
import { TaskSuggestionModal } from './TaskSuggestionModal.tsx';
import { TaskSuggestionPreview } from './TaskSuggestionPreview.tsx';
import { suggestTasksForTemplate, SuggestedTask } from '../../lib/ai/taskSuggester.ts';

export const AiSettings: React.FC = () => {
    const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<SuggestedTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [templateName, setTemplateName] = useState('');

    const handleGenerate = async (name: string) => {
        setTemplateName(name);
        setIsSuggestModalOpen(false);
        setIsPreviewOpen(true);
        setIsLoading(true);
        try {
            const result = await suggestTasksForTemplate(name);
            setSuggestions(result);
        } catch (error) {
            console.error("Failed to get suggestions", error);
            alert("Sorry, we couldn't generate suggestions at this time.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <Card
                title="AI & Automation"
                description="Configure AI-powered features to enhance your workflow."
            >
                <div className="space-y-4">
                    <ToggleSwitch 
                        label="Enable AI Features"
                        enabled={true}
                        setEnabled={() => {}}
                        description="Allow the use of generative AI for suggestions and automation."
                    />
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">AI Task Suggester</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            Use AI to generate a list of common tasks when creating a new template.
                        </p>
                        <div className="mt-4">
                            <Button variant="secondary" onClick={() => setIsSuggestModalOpen(true)}>
                                Try Task Suggester
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <TaskSuggestionModal
                isOpen={isSuggestModalOpen}
                onClose={() => setIsSuggestModalOpen(false)}
                onGenerate={handleGenerate}
            />

            <TaskSuggestionPreview
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                suggestions={suggestions}
                isLoading={isLoading}
                templateName={templateName}
            />
        </>
    );
};
