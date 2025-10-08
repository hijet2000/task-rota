import React from 'react';
// FIX: Added .ts extension to import path
import { Task } from '../../types.ts';
// FIX: Added .ts extension to import path
import { employees } from '../../data/mockData.ts';
// FIX: Added .ts extension to import path
import { projects } from '../../data/projectData.ts';
// FIX: Added .tsx extension to import path
import { SlaBadge } from '../SlaBadge.tsx';

interface ListViewProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

export const ListView: React.FC<ListViewProps> = ({ tasks, onTaskClick }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignees</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SLA</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map(task => {
                        const project = projects.find(p => p.id === task.projectId);
                        const assignees = employees.filter(e => task.assigneeIds.includes(e.id));
                        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

                        return (
                            <tr key={task.id} onClick={() => onTaskClick(task)} className="hover:bg-gray-50 cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                    <div className="text-sm text-gray-500">{task.code}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project?.name}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric'}) : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.priority}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex -space-x-2">
                                        {assignees.map(a => (
                                            <img
                                                key={a.id}
                                                src={a.avatarUrl}
                                                alt={a.name}
                                                title={a.name}
                                                className="w-6 h-6 rounded-full ring-2 ring-white"
                                            />
                                        ))}
                                         {assignees.length === 0 && (
                                            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-dashed" title="Unassigned"></div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <SlaBadge slaState={task.slaState} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
