import React, { useState } from 'react';
import { Button, Input, Select, TagInput } from './ui';
import { useAppStore } from '../store/appStore';
import { usePermissions } from '../hooks/usePermissions';
import { Task } from '../types';
import { projects } from '../data/projectData';
import { employees } from '../data/mockData';

interface CreateTaskPageProps {
    onTaskCreated: (task: Task) => void;
    onCancel: () => void;
}

export const CreateTaskPage: React.FC<CreateTaskPageProps> = ({ onTaskCreated, onCancel }) => {
    const { addTask } = useAppStore();
    const { currentUser } = usePermissions();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState(projects[0]?.id || '');
    const [assigneeIds, setAssigneeIds] = useState<number[]>([]);
    const [priority, setPriority] = useState<Task['priority']>('Medium');
    const [dueDate, setDueDate] = useState('');
    const [labels, setLabels] = useState<string[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});
    const [isCreating, setIsCreating] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof Task, string>> = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required.';
        }
        if (!projectId) {
            newErrors.projectId = 'A project must be selected.';
        }
        if (!dueDate) {
            newErrors.dueDate = 'Due date is required.';
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to start of today for comparison
            
            // The input type="date" gives a string "YYYY-MM-DD" which is parsed as UTC midnight.
            // To avoid timezone issues, we construct the date from parts to get local midnight.
            const [year, month, day] = dueDate.split('-').map(Number);
            const selectedDate = new Date(year, month - 1, day);

            if (selectedDate < today) {
                newErrors.dueDate = 'Due date cannot be in the past.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTask = () => {
        if (!validateForm()) {
            return;
        }

        setIsCreating(true);

        const project = projects.find(p => p.id === projectId);
        const taskCountForProject = useAppStore.getState().tasks.filter(t => t.projectId === projectId).length;

        const newTask: Task = {
            id: `task_${Date.now()}`,
            code: `${project?.code || 'TSK'}-${taskCountForProject + 1}`,
            title: title.trim(),
            description: description.trim(),
            projectId,
            assigneeIds,
            priority,
            dueDate: dueDate || null,
            labels,
            status: 'Draft',
            reporterId: currentUser?.id || 0,
            createdAt: new Date().toISOString(),
            checklist: [],
            attachments: [],
            dependencies: [],
            slaState: 'On Time',
            isPublic: false,
            sharedWith: [],
            activity: [],
        };

        addTask(newTask);
        onTaskCreated(newTask);
    };

    // FIX: Explicitly typed the 'option' parameter in Array.from to resolve TypeScript error.
    const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIds = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => parseInt(option.value, 10));
        setAssigneeIds(selectedIds);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Create New Task</h1>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-3">
                        <Input
                            label="Task Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g., Finalize new cocktail recipes"
                            error={errors.title}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            rows={5}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Add more details about the task..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                     <Select
                        label="Project"
                        value={projectId}
                        onChange={e => setProjectId(e.target.value)}
                        error={errors.projectId}
                    >
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </Select>
                     <Select
                        label="Priority"
                        value={priority}
                        onChange={e => setPriority(e.target.value as Task['priority'])}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                    </Select>
                    <div className="md:col-span-2">
                         <Select label="Assignees" multiple size={5} value={assigneeIds.map(String)} onChange={handleAssigneeChange}>
                            {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                        </Select>
                    </div>
                    <Input
                        label="Due Date"
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        error={errors.dueDate}
                    />
                    <TagInput label="Labels" tags={labels} setTags={setLabels} />
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={onCancel} disabled={isCreating}>Cancel</Button>
                <Button onClick={handleCreateTask} disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Task'}
                </Button>
            </div>
        </div>
    );
};