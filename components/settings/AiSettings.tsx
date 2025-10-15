import React, { useState } from 'react';
import { Card, Button, ToggleSwitch } from '../ui.tsx';
import { TaskSuggestionModal } from './TaskSuggestionModal.tsx';
import { TaskSuggestionPreview } from './TaskSuggestionPreview.tsx';
import { suggestTasksForTemplate, SuggestedTask, ApiError } from '../../lib/ai/taskSuggester.ts';
import { AlertTriangleIcon } from '../icons.tsx';

export const AiSettings: React.FC = () => {
    const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<SuggestedTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [aiError, setAiError] = useState<string | null>(null);

    const handleGenerate = async (name: string) => {
        setTemplateName(name);
        setIsSuggestModalOpen(false);
        setIsPreviewOpen(true);
        setIsLoading(true);
        setAiError(null); // Clear previous errors

        try {
            // In a real scenario, this would call the AI service.
            // The provided mock is designed to throw an error to test the error handling path.
            // If it were to succeed, it would populate the suggestions.
            const result = await suggestTasksForTemplate(name);
            setSuggestions(result);
        } catch (error) {
            console.error("Failed to get suggestions", error);
            if (error instanceof ApiError) {
                setAiError(error.message);
            } else {
                setAiError("An unexpected error occurred while generating suggestions.");
            }
            // Close the preview modal on error as there's nothing to show
            setIsPreviewOpen(false); 
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
                {aiError && (
                    <div className="p-3 mb-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertTriangleIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm">{aiError}</p>
                            </div>
                        </div>
                    </div>
                )}
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
