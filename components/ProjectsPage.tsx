
import React, { useState, useMemo } from 'react';
import { Project } from '../types.ts';
import { ProjectCard } from './ProjectCard.tsx';
import { ProjectFormModal } from './ProjectFormModal.tsx';
import { Button } from './ui.tsx';
import { getPermissions } from '../lib/permissions.ts';
import { useAppStore } from '../store/appStore.ts';

export const ProjectsPage: React.FC = () => {
    const { hasPermission } = getPermissions();
    const { projects, workspaces } = useAppStore(state => ({
        projects: state.projects,
        workspaces: state.workspaces,
    }));
    
    // In a real app, mutations would go through the store.
    // For this demo, we use local state to show UI changes.
    const [localProjects, setLocalProjects] = useState(projects);
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
        if (window.confirm('Are you sure you want to delete this project?')) {
            setLocalProjects(localProjects.filter(p => p.id !== projectId));
        }
    };
    
    const handleSave = (project: Project) => {
        if (selectedProject) {
            setLocalProjects(localProjects.map(p => p.id === project.id ? project : p));
        } else {
            setLocalProjects([...localProjects, { ...project, id: `proj_${Date.now()}` }]);
        }
    };

    const projectsByWorkspace = useMemo(() => {
        return workspaces.map(ws => ({
            ...ws,
            projects: localProjects.filter(p => p.workspaceId === ws.id)
        }));
    }, [localProjects, workspaces]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                {hasPermission('manage_settings') && <Button onClick={handleAdd}>Create Project</Button>}
            </div>
            
            <div className="space-y-8">
                {projectsByWorkspace.map(ws => (
                    <div key={ws.id}>
                        <h2 className="text-lg font-semibold mb-3">{ws.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {ws.projects.map(project => (
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
            
            <ProjectFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                project={selectedProject}
                onSave={handleSave}
            />
        </div>
    );
};
