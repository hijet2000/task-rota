import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from './ui.tsx';
import { Project, Workspace, Employee } from '../types.ts';
import { useAppStore } from '../store/appStore.ts';

interface ProjectFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

const getInitialFormData = (project: Project | null): Partial<Project> => ({
    name: project?.name || '',
    code: project?.code || '',
    description: project?.description || '',
    workspaceId: project?.workspaceId || '',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    color: project?.color || '#3B82F6',
    members: project?.members || [],
});

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, onClose, project }) => {
    const { workspaces, employees, addProject, updateProject } = useAppStore();
    const [formData, setFormData] = useState(getInitialFormData(project));
    
    useEffect(() => {
        if(isOpen) {
            const initialData = getInitialFormData(project);
            if (!initialData.workspaceId && workspaces.length > 0) {
                initialData.workspaceId = workspaces[0].id;
            }
            setFormData(initialData);
        }
    }, [isOpen, project, workspaces]);
    
    const handleSave = () => {
        if (!formData.name || !formData.code) {
            alert("Project Name and Code are required.");
            return;
        }
        
        if (project) {
            updateProject({ ...project, ...formData } as Project);
        } else {
            addProject({
                ...formData,
                status: 'Draft',
                tags: [],
                isArchived: false,
            } as Omit<Project, 'id'>);
        }
        
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={project ? `Edit Project: ${project.name}` : 'Create New Project'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Project</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Project Name" value={formData.name} onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))} />
                <Input label="Project Code" value={formData.code} onChange={(e) => setFormData(f => ({ ...f, code: e.target.value }))} helperText="A short, unique code (e.g., Q3-MARKETING)" />
                 <Select 
                    label="Workspace" 
                    value={formData.workspaceId} 
                    onChange={(e) => setFormData(f => ({ ...f, workspaceId: e.target.value }))}
                >
                    {workspaces.map(ws => <option key={ws.id} value={ws.id}>{ws.name}</option>)}
                </Select>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        rows={3} 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={formData.description}
                        onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData(f => ({ ...f, startDate: e.target.value }))} />
                    <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData(f => ({ ...f, endDate: e.target.value }))} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <Select label="Project Owner">
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </Select>
                    <Input label="Project Color" type="color" value={formData.color} onChange={(e) => setFormData(f => ({ ...f, color: e.target.value }))} />
                </div>
            </div>
        </Modal>
    );
};
