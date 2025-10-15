import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import { Modal, Button, Input, Select, TagInput } from './ui';
import { validateEmployee, ValidationError } from '../lib/validation';
import { useAppStore } from '../store/appStore';

interface EmployeeFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (employee: Employee) => void;
    employee: Employee | null;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ isOpen, onClose, onSave, employee }) => {
    const { locations, roles } = useAppStore(state => ({
        locations: state.locations,
        roles: state.roles,
    }));
    const [formData, setFormData] = useState<Partial<Employee>>({});
    const [errors, setErrors] = useState<ValidationError[]>([]);

    useEffect(() => {
        if (isOpen) {
            setFormData(employee || {
                name: '', email: '', phone: '', role: 'Member', payType: 'hourly',
                contractedHours: 0, locationId: locations[0]?.id, skills: [],
            });
            setErrors([]);
        }
    }, [isOpen, employee, locations]);
    
    const handleSave = () => {
        const validationErrors = validateEmployee(formData);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSave(formData as Employee);
        onClose();
    };

    const getError = (field: keyof Employee) => errors.find(e => e.field === field)?.message;
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={employee ? 'Edit Employee' : 'Add New Person'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" value={formData.name || ''} onChange={e => setFormData(f => ({...f, name: e.target.value}))} helperText={getError('name')} />
                <Input label="Email Address" type="email" value={formData.email || ''} onChange={e => setFormData(f => ({...f, email: e.target.value}))} helperText={getError('email')} />
                <Input label="Phone Number" value={formData.phone || ''} onChange={e => setFormData(f => ({...f, phone: e.target.value}))} />
                <Select label="Role" value={formData.role} onChange={e => setFormData(f => ({...f, role: e.target.value}))} helperText={getError('role')}>
                    {roles.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </Select>
                 <Select label="Primary Location" value={formData.locationId} onChange={e => setFormData(f => ({...f, locationId: parseInt(e.target.value)}))}>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </Select>
                <Input label="Contracted Hours per Week" type="number" value={formData.contractedHours || ''} onChange={e => setFormData(f => ({...f, contractedHours: parseInt(e.target.value)}))} helperText={getError('contractedHours')} />
                
                <div className="col-span-1 md:col-span-2">
                    <Select label="Pay Type" value={formData.payType} onChange={e => setFormData(f => ({...f, payType: e.target.value as Employee['payType']}))}>
                        <option value="hourly">Hourly</option>
                        <option value="salary">Salary</option>
                    </Select>
                </div>
                {formData.payType === 'hourly' && <Input label="Hourly Rate (£)" type="number" value={formData.hourlyRate || ''} onChange={e => setFormData(f => ({...f, hourlyRate: parseFloat(e.target.value)}))} helperText={getError('hourlyRate')}/>}
                {formData.payType === 'salary' && <Input label="Annual Salary (£)" type="number" value={formData.annualSalary || ''} onChange={e => setFormData(f => ({...f, annualSalary: parseFloat(e.target.value)}))} />}
                
                <div className="col-span-1 md:col-span-2">
                    <TagInput label="Skills" tags={formData.skills || []} setTags={tags => setFormData(f => ({...f, skills: tags}))} />
                </div>
            </div>
        </Modal>
    );
};