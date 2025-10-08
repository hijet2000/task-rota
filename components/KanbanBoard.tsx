import React from 'react';
// FIX: Added .ts extension to import path.
import { Project, Task } from '../types.ts';
// FIX: Added .tsx extension to import path.
import { TaskCard } from './TaskCard.tsx';

interface KanbanBoardProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

const columns: Task['status'][] = ['Draft', 'In Progress', 'Blocked', 'In Review', 'Done'];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskClick }) => {
    return (
        <div className="flex space-x-4 overflow-x-auto pb-4">
            {columns.map(status => {
                const tasksInColumn = tasks.filter(t => t.status === status);
                return (
                    <div key={status} className="w-72 bg-gray-100 rounded-lg p-3 flex-shrink-0">
                        <h3 className="font-semibold mb-3 px-1">{status} ({tasksInColumn.length})</h3>
                        <div className="space-y-3 h-full overflow-y-auto">
                            {tasksInColumn.map(task => (
                                <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
