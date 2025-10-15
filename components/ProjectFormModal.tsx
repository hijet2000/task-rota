import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from './ui.tsx';
import { Project } from '../types.ts';
import { workspaces } from '../data/projectData.ts';
import { employees } from '../data/mockData.ts';

interface ProjectFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (project: Project) => void;
    project: Project | null;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, onClose, onSave, project }) => {
    const [formData, setFormData] = useState<Partial<Project>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(project || { name: '', code: '', description: '', workspaceId: workspaces[0].id });
        }
    }, [isOpen, project]);

    const handleSave = () => {
        if (formData.name && formData.code) {
            onSave(formData as Project);
            onClose();
        } else {
            alert('Project Name and Code are required.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={project ? 'Edit Project' : 'Create Project'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Project</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Project Name" value={formData.name || ''} onChange={e => setFormData(f => ({...f, name: e.target.value}))} />
                <Input label="Project Code" value={formData.code || ''} onChange={e => setFormData(f => ({...f, code: e.target.value}))} helperText="A short, unique identifier (e.g., Q3MKT)." />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        rows={3} 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={formData.description || ''}
                        onChange={e => setFormData(f => ({...f, description: e.target.value}))}
                    />
                </div>
                <Select label="Workspace" value={formData.workspaceId} onChange={e => setFormData(f => ({...f, workspaceId: e.target.value}))}>
                    {workspaces.map(ws => <option key={ws.id} value={ws.id}>{ws.name}</option>)}
                </Select>
                 <Select label="Default Approver" value={formData.defaultApproverId || ''} onChange={e => setFormData(f => ({...f, defaultApproverId: parseInt(e.target.value) || null}))}>
                     <option value="">None</option>
                    {employees.filter(e => ['Manager', 'Owner', 'Admin'].includes(e.role)).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </Select>
            </div>
        </Modal>
    );
};
