
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from './ui';
import { Project } from '../types';
import { workspaces } from '../data/projectData';
import { employees } from '../data/mockData';

interface ProjectFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (project: Project) => void;
    project: Project | null;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, onClose, onSave, project }) => {
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(project || { name: '', code: '', description: '', workspaceId: workspaces[0].id });
            setErrors({});
        }
    }, [isOpen, project]);

    const validate = () => {
        const newErrors: Partial<Record<keyof Project, string>> = {};
        if (!formData.name?.trim()) newErrors.name = 'Project name is required.';
        if (!formData.code?.trim()) newErrors.code = 'Project code is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            onSave(formData as Project);
            onClose();
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
                <Input label="Project Name" value={formData.name || ''} onChange={e => setFormData(f => ({...f, name: e.target.value}))} error={errors.name} />
                <Input label="Project Code" value={formData.code || ''} onChange={e => setFormData(f => ({...f, code: e.target.value}))} helperText="A short, unique identifier (e.g., Q3MKT)." error={errors.code} />
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
