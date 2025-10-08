import React, { useState, useMemo } from 'react';
import { Task, Project } from '../types.ts';
import { useAppStore } from '../store/appStore.ts';
import { Button, Input } from './ui.tsx';
import { KanbanBoard } from './KanbanBoard.tsx';
import { ListView } from './views/ListView.tsx';
import { CalendarView } from './views/CalendarView.tsx';
import { TaskDetailModal } from './TaskDetailModal.tsx';
import { BulkEditModal } from './BulkEditModal.tsx';

type ViewMode = 'Board' | 'List' | 'Calendar';

interface CurrentTasksPageProps {
    project?: Project | null;
    onBack?: () => void;
}

export const CurrentTasksPage: React.FC<CurrentTasksPageProps> = ({ project, onBack }) => {
    const tasks = useAppStore(state => state.tasks);
    const [viewMode, setViewMode] = useState<ViewMode>('List');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
    const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);

    const filteredTasks = useMemo(() => {
        return project ? tasks.filter(t => t.projectId === project.id) : tasks;
    }, [project, tasks]);
    
     const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const renderView = () => {
        switch (viewMode) {
            case 'Board':
                return <KanbanBoard tasks={filteredTasks} onTaskClick={handleTaskClick} />;
            case 'List':
                return <ListView tasks={filteredTasks} onTaskClick={handleTaskClick} />;
            case 'Calendar':
                return <CalendarView tasks={filteredTasks} />;
            default:
                return null;
        }
    };
    
    // Simple color coding for task status in list view
    const getStatusColor = (status: Task['status']) => {
        switch (status) {
            case 'Done': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Blocked': return 'bg-red-100 text-red-800';
            case 'In Review': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Tasks</h1>
            </div>
            
             <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTasks.map(task => {
                             const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
                            return (
                                <tr key={task.id} className={`${isOverdue ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                        <div className="text-sm text-gray-500">{task.code}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric'}) : 'N/A'}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <TaskDetailModal
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                task={selectedTask}
            />
        </div>
    );
};
