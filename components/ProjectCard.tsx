


import React from 'react';
import { Project } from '../types';
import { Button } from './ui';
import { employees } from '../data/mockData';
import { PencilIcon, TrashIcon } from './icons';
import { usePermissions } from '../hooks/usePermissions';

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
    const { hasPermission } = usePermissions();
    const canManage = hasPermission('manage_settings');
    const lead = employees.find(e => e.id === project.defaultApproverId);

    return (
        <div className="bg-white rounded-lg shadow-sm border flex flex-col group">
            <div className="p-4 flex-grow">
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{project.name} <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{project.code}</span></h3>
                <p className="text-sm text-gray-500 mt-1 h-10 overflow-hidden">{project.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold">LEAD</span>
                        {lead ? (
                            <div className="flex items-center">
                                <img src={lead.avatarUrl} alt={lead.name} className="w-6 h-6 rounded-full" />
                            </div>
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200" title="No lead assigned"></div>
                        )}
                    </div>
                </div>
            </div>
            {canManage && (
                <div className="bg-gray-50 px-4 py-2 border-t flex justify-end space-x-2">
                    <Button aria-label="Edit project" variant="secondary" size="sm" onClick={() => onEdit(project)}>
                        <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button aria-label="Delete project" variant="secondary" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => onDelete(project.id)}>
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};
