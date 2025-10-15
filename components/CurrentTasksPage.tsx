

import React, { useState, useMemo } from 'react';
import { Task, Project } from '../types';
import { useAppStore } from '../store/appStore';
import { Button } from './ui';
import { KanbanBoard } from './KanbanBoard';
import { ListView } from './views/ListView';
import { CalendarView } from './views/CalendarView';
import { TaskDetailView } from './TaskDetailView';

type ViewMode = 'Board' | 'List' | 'Calendar';

interface CurrentTasksPageProps {
    project?: Project | null;
    onBack?: () => void;
}

export const CurrentTasksPage: React.FC<CurrentTasksPageProps> = ({ project, onBack }) => {
    const { tasks } = useAppStore(state => ({ tasks: state.tasks }));
    const [viewMode, setViewMode] = useState<ViewMode>('List');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const filteredTasks = useMemo(() => {
        return project ? tasks.filter(t => t.projectId === project.id) : tasks;
    }, [project, tasks]);
    
    if (selectedTask) {
        return <TaskDetailView task={selectedTask} onClose={() => setSelectedTask(null)} />;
    }

    const renderView = () => {
        switch (viewMode) {
            case 'Board':
                return <KanbanBoard tasks={filteredTasks} onTaskClick={setSelectedTask} />;
            case 'List':
                return <ListView tasks={filteredTasks} onTaskClick={setSelectedTask} />;
            case 'Calendar':
                return <CalendarView tasks={filteredTasks} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{project ? `${project.name} Tasks` : 'All Tasks'}</h1>
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-md">
                    <Button variant={viewMode === 'List' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('List')}>List</Button>
                    <Button variant={viewMode === 'Board' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('Board')}>Board</Button>
                    <Button variant={viewMode === 'Calendar' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('Calendar')}>Calendar</Button>
                </div>
            </div>
            {renderView()}
        </div>
    );
};