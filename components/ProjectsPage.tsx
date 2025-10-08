
import React, { useState, useMemo } from 'react';
// FIX: Added .ts extension to import path
import { useAppStore } from '../store/appStore.ts';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { ProjectCard } from './ProjectCard.tsx';
// FIX: Added .tsx extension to import path
import { ProjectFormModal } from './ProjectFormModal.tsx';
// FIX: Added .tsx extension to import path
import { EmptyState } from './common/EmptyState.tsx';
// FIX: Added .tsx extension to import path
import { BriefcaseIcon } from './icons.tsx';
// FIX: Added .ts extension to import path
import { Project, Workspace } from '../types.ts';

export const ProjectsPage: React.FC = () => {
    const { projects, workspaces } = useAppStore();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleAdd = () => {
        setSelectedProject(null);
        setIsFormOpen(true);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsFormOpen(true);
    };

    const handleDelete = (projectId: string) => {
        // A deleteProject function doesn't exist in the store, so we'll just log it for now.
        if (window.confirm(`Are you sure you want to delete this project? This action cannot be undone.`)) {
            console.log("ACTION: Delete project with ID:", projectId);
            // In a real app, you would call a store action like: deleteProject(projectId);
        }
    };

    const groupedProjects = useMemo(() => {
        const activeProjects = projects.filter(p => !p.isArchived);
        return workspaces.map(ws => ({
            ...ws,
            projects: activeProjects.filter(p => p.workspaceId === ws.id)
        })).filter(ws => ws.projects.length > 0);
    }, [projects, workspaces]);
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Button onClick={handleAdd}>Add Project</Button>
            </div>
            
            {projects.length === 0 ? (
                <EmptyState
                    icon={<BriefcaseIcon className="w-12 h-12 text-gray-400" />}
                    title="No projects created"
                    description="Get started by creating your first project."
                    actionText="Add Project"
                    onAction={handleAdd}
                />
            ) : (
                <div className="space-y-8">
                    {groupedProjects.map(workspace => (
                        <div key={workspace.id}>
                            <h2 className="text-xl font-semibold mb-3">{workspace.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {workspace.projects.map(project => (
                                    <ProjectCard 
                                        key={project.id} 
                                        project={project} 
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <ProjectFormModal 
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                project={selectedProject}
            />
        </div>
    );
};
