import React, { useState, useMemo } from 'react';
import { Task } from '../types.ts';
import { employees } from '../data/mockData.ts';
import { projects } from '../data/projectData.ts';
import { SlaBadge } from './SlaBadge.tsx';
import { Button, Select, Input, TagInput } from './ui.tsx';
import { Paperclip, MessageSquareIcon, Flag, CalendarIcon, UserIcon, FolderIcon, PlusIcon, CheckCircleIcon, XCircleIcon, TrashIcon } from './icons.tsx';
import { useAppStore } from '../store/appStore.ts';
import { AddRelatedTaskModal } from './AddRelatedTaskModal.tsx';
import { QuickAddTaskModal } from './QuickAddTaskModal.tsx';

interface TaskDetailViewProps {
    task: Task;
    onClose: () => void;
}

const ActivityItem: React.FC<{ user: string; avatar: string; action: string; time: string; children?: React.ReactNode }> = ({ user, avatar, action, time, children }) => (
    <div className="flex items-start space-x-3">
        <img src={avatar} alt={user} className="w-8 h-8 rounded-full" />
        <div className="flex-1">
            <p className="text-sm">
                <span className="font-semibold">{user}</span> {action}
                <span className="text-gray-500 ml-2">{time}</span>
            </p>
            {children && <div className="mt-2 text-sm text-gray-800 bg-gray-50 border rounded-lg p-3">{children}</div>}
        </div>
    </div>
);

const statusIcons: Record<Task['status'], React.FC<any>> = {
    'Done': (props) => <CheckCircleIcon {...props} className="text-green-500" />,
    'In Review': (props) => <CheckCircleIcon {...props} className="text-purple-500" />,
    'Blocked': (props) => <XCircleIcon {...props} className="text-red-500" />,
    'In Progress': (props) => <div {...props} className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white ring-1 ring-blue-500" />,
    'Draft': (props) => <div {...props} className="w-4 h-4 rounded-full bg-gray-300" />,
};

const Checklist: React.FC<{ task: Task }> = ({ task }) => {
    const { addChecklistItem, updateChecklistItem, deleteChecklistItem } = useAppStore();
    const [newItemText, setNewItemText] = useState('');

    const completedItems = task.checklist.filter(item => item.isCompleted).length;
    const totalItems = task.checklist.length;
    const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

    const handleAddItem = () => {
        if (newItemText.trim()) {
            addChecklistItem(task.id, newItemText.trim());
            setNewItemText('');
        }
    };

    const handleToggleItem = (itemId: string, isCompleted: boolean) => {
        updateChecklistItem(task.id, itemId, { isCompleted: !isCompleted });
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Checklist</h3>
            {totalItems > 0 && (
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}

            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {task.checklist.map(item => (
                    <div key={item.id} className="flex items-center group hover:bg-gray-50 p-1 rounded">
                        <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => handleToggleItem(item.id, item.isCompleted)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`ml-3 text-sm flex-1 ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {item.text}
                        </span>
                        <button onClick={() => deleteChecklistItem(task.id, item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-3 flex items-center">
                <Input
                    label=""
                    placeholder="Add an item"
                    value={newItemText}
                    onChange={e => setNewItemText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddItem()}
                    className="flex-1"
                />
                <Button onClick={handleAddItem} className="ml-2" size="sm">Add</Button>
            </div>
        </div>
    );
};


export const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onClose }) => {
    const { tasks: allTasks, addDependencies, addTask } = useAppStore(state => ({
        tasks: state.tasks,
        addDependencies: state.addDependencies,
        addTask: state.addTask,
    }));
    
    const [isAddRelatedOpen, setIsAddRelatedOpen] = useState(false);
    const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

    const project = projects.find(p => p.id === task.projectId);
    const reporter = employees.find(e => e.id === task.reporterId);
    
    const activity = [
        { user: reporter, action: 'created this task.', time: '2 days ago' },
        { user: employees.find(e=>e.id === 2), action: 'changed the status to In Progress.', time: '1 day ago' },
        { user: employees.find(e=>e.id === 5), action: 'commented.', time: '3 hours ago', comment: "The new recipes are almost ready, just waiting for the final tasting session." },
    ];
    
    const { dependsOnTasks, blockingTasks } = useMemo(() => {
        const dependsOn = (task.dependencies || []).map(id => allTasks.find(t => t.id === id)).filter(Boolean) as Task[];
        const blocking = allTasks.filter(t => (t.dependencies || []).includes(task.id));
        return { dependsOnTasks: dependsOn, blockingTasks: blocking };
    }, [task.dependencies, allTasks, task.id]);

    const handleLinkTasks = (dependencyIds: string[]) => {
        addDependencies(task.id, dependencyIds);
        setIsAddRelatedOpen(false);
    };

    const handleCreateAndLink = (newTaskData: Partial<Task>) => {
        const newTaskId = `task-${Date.now()}`;
        const fullTask: Task = {
            id: newTaskId,
            code: `${project?.code || 'T'}-${Math.floor(Math.random() * 100)}`,
            title: newTaskData.title || 'New Task',
            description: '',
            status: 'Draft',
            priority: 'Medium',
            projectId: task.projectId,
            assigneeIds: [],
            reporterId: reporter?.id || 1,
            dueDate: null,
            createdAt: new Date().toISOString(),
            labels: [],
            checklist: [],
            attachments: [],
            dependencies: [],
            slaState: 'On Time',
            isPublic: false,
            sharedWith: [],
            activity: [],
        };
        addTask(fullTask);
        addDependencies(task.id, [newTaskId]);
    };
    
    const DependencyList: React.FC<{title: string; tasks: Task[]; onAdd?: () => void}> = ({ title, tasks, onAdd }) => (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700">{title}</h4>
                {onAdd && <Button variant="secondary" size="sm" onClick={onAdd}><PlusIcon className="w-4 h-4 mr-1" /> Add</Button>}
            </div>
            <div className="space-y-2">
                {tasks.length > 0 ? tasks.map(relatedTask => {
                    const StatusIcon = statusIcons[relatedTask.status];
                    const assignee = employees.find(e => relatedTask.assigneeIds.includes(e.id));
                    const isMet = relatedTask.status === 'Done';
                    return (
                        <div key={relatedTask.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                            <div className="flex items-center space-x-2">
                                <StatusIcon className="w-5 h-5" />
                                <span className={`text-sm font-medium ${isMet ? 'line-through text-gray-400' : 'text-gray-600'}`}>{relatedTask.code}</span>
                                <span className={`text-sm ${isMet ? 'line-through text-gray-500' : 'text-gray-800'}`}>{relatedTask.title}</span>
                            </div>
                            {assignee && <img src={assignee.avatarUrl} alt={assignee.name} title={assignee.name} className="w-6 h-6 rounded-full" />}
                        </div>
                    )
                }) : <p className="text-sm text-gray-500 text-center py-2">None</p>}
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <Button variant="secondary" onClick={onClose}>&larr; Back to List</Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
                        <div>
                            <p className="text-sm text-gray-500">{task.code}</p>
                            <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
                        </div>
                        
                        <div className="prose max-w-none">
                            <p>{task.description}</p>
                        </div>
                        
                        <hr />
                        <Checklist task={task} />
                        <hr />

                        <div>
                            <h3 className="text-lg font-semibold mb-3">Dependencies</h3>
                            <div className="space-y-4">
                               <DependencyList title="Depends On" tasks={dependsOnTasks} onAdd={() => setIsAddRelatedOpen(true)} />
                               <DependencyList title="Blocking" tasks={blockingTasks} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                             <div className="p-6 bg-gray-50 border-2 border-dashed rounded-lg text-center text-gray-500">
                                 <Paperclip className="w-6 h-6 mx-auto mb-2" />
                                 <p>Drag & drop files here or click to upload.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Activity Feed */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold mb-3">Activity</h3>
                        <div className="space-y-6">
                            {activity.map((item, index) => item.user && (
                                 <ActivityItem key={index} user={item.user.name} avatar={item.user.avatarUrl} action={item.action} time={item.time}>
                                    {item.comment && <p>{item.comment}</p>}
                                </ActivityItem>
                            ))}
                            <div className="flex items-start space-x-3">
                                <img src={employees[0].avatarUrl} alt={employees[0].name} className="w-8 h-8 rounded-full" />
                                <div className="flex-1">
                                    <textarea className="w-full border-gray-300 rounded-md shadow-sm" rows={3} placeholder="Add a comment..."></textarea>
                                    <div className="text-right mt-2">
                                        <Button>Comment</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
                         <Select label="Status" defaultValue={task.status}>
                            <option>Draft</option>
                            <option>In Progress</option>
                            <option>Blocked</option>
                            <option>In Review</option>
                            <option>Done</option>
                        </Select>
                        <Select label="Assignees" multiple size={4} value={task.assigneeIds.map(String)}>
                            {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                        </Select>
                         <Select label="Priority" defaultValue={task.priority}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Urgent</option>
                        </Select>
                        <Input label="Due Date" type="date" defaultValue={task.dueDate ? task.dueDate.split('T')[0] : ''} />
                        <TagInput label="Labels" tags={task.labels} setTags={() => {}} />
                        <div>
                             <label className="text-sm font-medium text-gray-700">SLA Status</label>
                             <div className="mt-1"><SlaBadge slaState={task.slaState} /></div>
                        </div>
                        {reporter && <div>
                            <label className="text-sm font-medium text-gray-700">Reporter</label>
                            <div className="flex items-center space-x-2 mt-1">
                                <img src={reporter.avatarUrl} alt={reporter.name} className="w-6 h-6 rounded-full" />
                                <span className="text-sm">{reporter.name}</span>
                            </div>
                        </div>}
                         {project && <div>
                            <label className="text-sm font-medium text-gray-700">Project</label>
                            <p className="mt-1 text-sm">{project.name}</p>
                        </div>}
                    </div>
                </div>
            </div>

            <AddRelatedTaskModal
                isOpen={isAddRelatedOpen}
                onClose={() => setIsAddRelatedOpen(false)}
                currentTaskId={task.id}
                onLinkTasks={handleLinkTasks}
                onCreateAndLink={() => {
                    setIsAddRelatedOpen(false);
                    setIsQuickAddOpen(true);
                }}
            />

            <QuickAddTaskModal
                isOpen={isQuickAddOpen}
                onClose={() => setIsQuickAddOpen(false)}
                onSave={handleCreateAndLink}
            />
        </div>
    );
};