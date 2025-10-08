
import React from 'react';
// FIX: Added .ts extension to import path
import { tasks } from '../data/tasksData.ts';
// FIX: Added .ts extension to import path
import { employees } from '../data/mockData.ts';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { SendIcon } from './icons.tsx';

interface PublicTaskPageProps {
    taskId: string;
}

export const PublicTaskPage: React.FC<PublicTaskPageProps> = ({ taskId }) => {
    const task = tasks.find(t => t.id === taskId);

    if (!task || !task.isPublic) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold">Task Not Found</h1>
                    <p className="text-gray-600 mt-2">This task is either private or does not exist.</p>
                </div>
            </div>
        );
    }
    
    const assignees = employees.filter(e => task.assigneeIds.includes(e.id));
    
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="border-b pb-4 mb-4">
                    <p className="text-sm text-gray-500 font-mono">{task.code}</p>
                    <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span>Status: <span className="font-semibold">{task.status}</span></span>
                        <span>Priority: <span className="font-semibold">{task.priority}</span></span>
                        {task.dueDate && <span>Due: <span className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</span></span>}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
                        <p className="text-gray-600">{task.description}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Assignees</h3>
                        <div className="flex space-x-2">
                             {assignees.map(a => (
                                <div key={a.id} className="flex items-center space-x-2">
                                    <img src={a.avatarUrl} alt={a.name} className="w-8 h-8 rounded-full" />
                                    <span className="text-sm">{a.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Leave a Comment (as a guest)</h3>
                         <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">G</div>
                            <div className="flex-1 flex">
                                <textarea rows={2} placeholder="Add a comment..." className="w-full text-sm border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
                                <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"><SendIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};