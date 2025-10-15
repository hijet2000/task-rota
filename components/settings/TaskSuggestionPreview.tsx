import React from 'react';
import { Modal, Button } from '../ui.tsx';
import { SuggestedTask } from '../../lib/ai/taskSuggester.ts';
import { Flag, PlusCircleIcon } from '../icons.tsx';

interface TaskSuggestionPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    suggestions: SuggestedTask[];
    isLoading: boolean;
    templateName: string;
}

export const TaskSuggestionPreview: React.FC<TaskSuggestionPreviewProps> = ({ isOpen, onClose, suggestions, isLoading, templateName }) => {
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Suggested Tasks for "${templateName}"`}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button>Add Selected Tasks</Button>
                </div>
            }
        >
            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center p-8">
                        <p className="text-gray-600">Generating suggestions...</p>
                    </div>
                ) : (
                    suggestions.map((task, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                            <div className="flex-1">
                                <p className="font-semibold">{task.title}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center"><Flag className="w-3 h-3 mr-1" /> {task.priority}</span>
                                    <span>Labels: {task.labels.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                 <Button variant="secondary" className="w-full">
                    <PlusCircleIcon className="w-4 h-4 mr-2" />
                    Add Custom Task
                </Button>
            </div>
        </Modal>
    );
};
