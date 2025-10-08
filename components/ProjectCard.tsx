
import React from 'react';
// FIX: Added .ts extension to import path
import { Project, Employee } from '../types.ts';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { PencilIcon, TrashIcon } from './icons.tsx';
// FIX: Added .ts extension to import path
import { useAppStore } from '../store/appStore.ts';
// FIX: Added .ts extension to import path
import { getPermissions } from '../lib/permissions.ts';

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
}

const statusColors: Record<Project['status'], string> = {
    'Draft': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Done': 'bg-green-100 text-green-800',
    'Archived': 'bg-yellow-100 text-yellow-800',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
    const employees = useAppStore(state => state.employees);
    const { hasPermission } = getPermissions();
    const canManage = hasPermission('manage_settings'); // Simplified permission check for editing/deleting projects

    const projectMembers = project.members.map(member => 
        employees.find(e => e.id === member.userId)
    ).filter(Boolean) as Employee[];

    return (
        <div className="bg-white rounded-lg shadow-sm border flex flex-col group">
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: project.color }}></span>
                        <span>{project.name}</span>
                    </h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[project.status]}`}>
                        {project.status}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2 h-10 overflow-hidden">{project.description}</p>
            </div>

            <div className="px-4 pb-4 flex justify-between items-end">
                <div className="flex -space-x-2">
                    {projectMembers.slice(0, 3).map(member => (
                        <img 
                            key={member.id} 
                            src={member.avatarUrl} 
                            alt={member.name} 
                            title={member.name}
                            className="w-8 h-8 rounded-full ring-2 ring-white" 
                        />
                    ))}
                    {projectMembers.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-white">
                            +{projectMembers.length - 3}
                        </div>
                    )}
                </div>
                {canManage && (
                     <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="sm" onClick={() => onEdit(project)}><PencilIcon className="w-4 h-4" /></Button>
                        <Button variant="secondary" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => onDelete(project.id)}><TrashIcon className="w-4 h-4" /></Button>
                    </div>
                )}
            </div>
        </div>
    );
};
