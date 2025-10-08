import React from 'react';
// FIX: Added .ts extension to import path
import { tasks as allTasks } from '../../data/tasksData.ts';
// FIX: Added .ts extension to import path
import { getPermissions } from '../../lib/permissions.ts';
// FIX: Added .ts extension to import path
import { Task } from '../../types.ts';
// FIX: Added .tsx extension to import path
import { SlaBadge } from '../SlaBadge.tsx';

export const MyTasksView: React.FC = () => {
    const { currentUser } = getPermissions();

    const myTasks = currentUser 
        ? allTasks.filter(task => task.assigneeIds.includes(currentUser.id))
        : [];

    const groupedTasks = myTasks.reduce((acc, task) => {
        const status = task.status;
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(task);
        return acc;
    }, {} as Record<Task['status'], Task[]>);

    const statusOrder: Task['status'][] = ['In Progress', 'In Review', 'Blocked', 'Draft', 'Done'];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Tasks</h2>
            {myTasks.length > 0 ? (
                <div className="space-y-6">
                    {statusOrder.map(status => {
                        const tasks = groupedTasks[status];
                        if (!tasks || tasks.length === 0) return null;

                        return (
                            <div key={status}>
                                <h3 className="font-semibold text-gray-600 mb-2">{status} ({tasks.length})</h3>
                                <div className="space-y-3">
                                    {tasks.map(task => (
                                        <div key={task.id} className="bg-white p-3 rounded-lg shadow-sm border-l-4" style={{ borderColor: task.priority === 'High' ? '#F59E0B' : task.priority === 'Urgent' ? '#EF4444' : '#6B7280' }}>
                                            <div className="flex justify-between items-start">
                                                <p className="font-bold">{task.title}</p>
                                                <SlaBadge slaState={task.slaState} isCompact={true} />
                                            </div>
                                            <p className="text-xs text-gray-500 font-mono">{task.code}</p>
                                            {task.dueDate && <p className="text-xs text-gray-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">You have no tasks assigned to you.</p>
                </div>
            )}
        </div>
    );
};