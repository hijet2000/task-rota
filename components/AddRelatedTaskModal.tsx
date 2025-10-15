import React, { useState, useMemo } from 'react';
import { Modal, Button, Input } from './ui.tsx';
import { useAppStore } from '../store/appStore.ts';
import { Task } from '../types.ts';

interface AddRelatedTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTaskId: string;
    onLinkTasks: (taskIds: string[]) => void;
    onCreateAndLink: () => void;
}

export const AddRelatedTaskModal: React.FC<AddRelatedTaskModalProps> = ({ isOpen, onClose, currentTaskId, onLinkTasks, onCreateAndLink }) => {
    const allTasks = useAppStore(state => state.tasks);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const availableTasks = useMemo(() => {
        const currentTask = allTasks.find(t => t.id === currentTaskId);
        const existingDependencyIds = new Set(currentTask?.dependencies || []);
        
        return allTasks.filter(task => {
            // Exclude the current task and already linked tasks
            if (task.id === currentTaskId || existingDependencyIds.has(task.id)) {
                return false;
            }
            // Filter by search term
            if (searchTerm) {
                const lowerSearch = searchTerm.toLowerCase();
                return task.title.toLowerCase().includes(lowerSearch) || task.code.toLowerCase().includes(lowerSearch);
            }
            return true;
        });
    }, [allTasks, currentTaskId, searchTerm]);

    const handleToggleSelection = (taskId: string) => {
        const newSelection = new Set(selectedIds);
        if (newSelection.has(taskId)) {
            newSelection.delete(taskId);
        } else {
            newSelection.add(taskId);
        }
        setSelectedIds(newSelection);
    };

    const handleLink = () => {
        onLinkTasks(Array.from(selectedIds));
        setSelectedIds(new Set());
        setSearchTerm('');
    };
    
    // Reset state on close
    const handleClose = () => {
        setSelectedIds(new Set());
        setSearchTerm('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Add Dependency"
            footer={
                <div className="flex justify-between w-full">
                    <Button variant="secondary" onClick={onCreateAndLink}>
                        Create and link new task
                    </Button>
                    <div className="space-x-2">
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleLink} disabled={selectedIds.size === 0}>
                            Link {selectedIds.size > 0 ? selectedIds.size : ''} Tasks
                        </Button>
                    </div>
                </div>
            }
        >
            <div className="space-y-4">
                <Input 
                    label=""
                    type="search"
                    placeholder="Search for tasks by title or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-80 overflow-y-auto space-y-2 border rounded-md p-2">
                    {availableTasks.length > 0 ? (
                        availableTasks.map(task => (
                            <label key={task.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.has(task.id)}
                                    onChange={() => handleToggleSelection(task.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <div>
                                    <p className="font-medium text-gray-800">{task.title}</p>
                                    <p className="text-sm text-gray-500">{task.code}</p>
                                </div>
                            </label>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No tasks found.</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};