// FIX: Implemented the EmployeeForm component.
import React, { useState, useEffect } from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button, Input, Select, TagInput } from './ui.tsx';
// FIX: Added .ts extension to import path
import { Employee, Role } from '../types.ts';
// FIX: Added .ts extension to import path
import { locations } from '../data/locations.ts';
// FIX: Added .ts extension to import path
import { getAvailableRoles } from '../lib/permissions.ts';
// FIX: Added .ts extension to import path
import { validateEmployee, ValidationError } from '../lib/validation.ts';

interface EmployeeFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (employee: Employee) => void;
    employee: Employee | null;
}

const getInitialFormData = (employee: Employee | null): Partial<Employee> => {
    return {
        name: employee?.name || '',
        email: employee?.email || '',
        phone: employee?.phone || '',
        avatarUrl: employee?.avatarUrl || `https://i.pravatar.cc/150?u=${Date.now()}`,
        role: employee?.role || 'Member',
        locationId: employee?.locationId || 1,
        payType: employee?.payType || 'hourly',
        hourlyRate: employee?.hourlyRate || undefined,
        annualSalary: employee?.annualSalary || undefined,
        contractedHours: employee?.contractedHours || 0,
        skills: employee?.skills || [],
    };
};

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ isOpen, onClose, onSave, employee }) => {
    const [formData, setFormData] = useState<Partial<Employee>>(getInitialFormData(employee));
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const availableRoles = getAvailableRoles();

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialFormData(employee));
            setErrors([]);
        }
    }, [employee, isOpen]);

    const handleChange = (field: keyof Employee, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const validationErrors = validateEmployee(formData);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        // In a real app, `id` would be handled by the backend
        const employeeToSave = {
            ...employee,
            ...formData,
            id: employee?.id || Date.now(),
        } as Employee;
        
        onSave(employeeToSave);
    };
    
    const getError = (field: keyof Employee) => errors.find(e => e.field === field)?.message;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={employee ? `Edit Employee: ${employee.name}` : 'Add New Employee'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} helperText={getError('name')} />
                <Input label="Email Address" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} helperText={getError('email')} />
                <Input label="Phone Number" type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                <Select label="Role" value={formData.role} onChange={e => handleChange('role', e.target.value as Role)}>
                    {availableRoles.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </Select>
                <Select label="Primary Location" value={formData.locationId} onChange={e => handleChange('locationId', parseInt(e.target.value))}>
                    {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                </Select>
                <Input label="Contracted Hours" type="number" value={formData.contractedHours} onChange={e => handleChange('contractedHours', parseFloat(e.target.value))} helperText={getError('contractedHours')} />
                <Select label="Pay Type" value={formData.payType} onChange={e => handleChange('payType', e.target.value as 'hourly' | 'salary')}>
                    <option value="hourly">Hourly</option>
                    <option value="salary">Salary</option>
                </Select>
                {formData.payType === 'hourly' ? (
                    <Input label="Hourly Rate (£)" type="number" value={formData.hourlyRate} onChange={e => handleChange('hourlyRate', parseFloat(e.target.value))} helperText={getError('hourlyRate')} />
                ) : (
                    <Input label="Annual Salary (£)" type="number" value={formData.annualSalary} onChange={e => handleChange('annualSalary', parseFloat(e.target.value))} />
                )}
                <div className="md:col-span-2">
                    <TagInput label="Skills" tags={formData.skills || []} setTags={tags => handleChange('skills', tags)} />
                </div>
            </div>
        </Modal>
    );
};
