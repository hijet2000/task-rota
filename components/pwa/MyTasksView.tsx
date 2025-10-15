import React from 'react';
import { tasks } from '../../data/tasksData.ts';
import { usePermissions } from '../../hooks/usePermissions.ts';

export const MyTasksView: React.FC = () => {
    const { currentUser } = usePermissions();
    const myTasks = currentUser ? tasks.filter(t => t.assigneeIds.includes(currentUser.id)) : [];
    
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Tasks</h2>
            <div className="space-y-3">
                {myTasks.map(task => (
                    <div key={task.id} className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="font-bold">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.code} - {task.priority}</p>
                    </div>
                ))}
                {myTasks.length === 0 && <p className="text-gray-500">You have no tasks assigned.</p>}
            </div>
        </div>
    );
};