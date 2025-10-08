import React from 'react';
// FIX: Added .ts extension to import path
import { Task } from '../types.ts';
// FIX: Added .ts extension to import path
import { employees } from '../data/mockData.ts';
// FIX: Added .tsx extension to import path
import { Flag, Paperclip, LinkIcon } from './icons.tsx';
// FIX: Added .tsx extension to import path
import { SlaBadge } from './SlaBadge.tsx';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const assignees = employees.filter(e => task.assigneeIds.includes(e.id));

  const priorityColors: Record<Task['priority'], string> = {
    Low: 'text-gray-500',
    Medium: 'text-blue-500',
    High: 'text-yellow-500',
    Urgent: 'text-red-600',
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-md shadow-sm p-3 border border-gray-200 hover:shadow-md hover:border-blue-500 transition-all group"
    >
      <div className="flex justify-between items-start mb-2">
        <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600">{task.title}</p>
        <SlaBadge slaState={task.slaState} />
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.labels.map(label => (
          <span key={label} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{label}</span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 text-gray-500">
            <span title={`Priority: ${task.priority}`}>
                <Flag className={`w-4 h-4 ${priorityColors[task.priority]}`} />
            </span>
            {task.dueDate && (
                <span className={`text-xs font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                    {new Date(task.dueDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                </span>
            )}
            {task.attachments.length > 0 && (
                <span className="flex items-center text-xs" title={`${task.attachments.length} attachments`}>
                    <Paperclip className="w-4 h-4" /> 
                    {task.attachments.length}
                </span>
            )}
             {task.dependencies.length > 0 && (
                <span className="flex items-center text-xs" title={`${task.dependencies.length} dependencies`}>
                    <LinkIcon className="w-4 h-4" /> 
                    {task.dependencies.length}
                </span>
            )}
        </div>

        <div className="flex -space-x-2">
            {assignees.map(a => (
                <img 
                    key={a.id}
                    src={a.avatarUrl} 
                    alt={a.name} 
                    title={`Assignee: ${a.name}`}
                    className="w-6 h-6 rounded-full ring-2 ring-white"
                />
            ))}
             {assignees.length === 0 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-dashed" title="Unassigned"></div>
            )}
        </div>
      </div>
    </button>
  );
};
