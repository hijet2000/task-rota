import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from './ui.tsx';
import { Employee, Shift, Location } from '../types.ts';
import { useAppStore } from '../store/appStore.ts';

interface AddShiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    shiftToEdit?: Shift | null;
}

const getInitialState = (shift?: Shift | null) => ({
    employeeId: shift?.employeeId ?? null,
    locationId: shift?.locationId ?? 1,
    role: shift?.role ?? '',
    date: shift ? new Date(shift.startTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    startTime: shift ? new Date(shift.startTime).toTimeString().substring(0,5) : '09:00',
    endTime: shift ? new Date(shift.endTime).toTimeString().substring(0,5) : '17:00',
    unpaidBreakMinutes: shift?.unpaidBreakMinutes ?? 30,
    color: shift?.color ?? '#3B82F6',
    notes: shift?.notes ?? '',
});

export const AddShiftModal: React.FC<AddShiftModalProps> = ({ isOpen, onClose, shiftToEdit }) => {
    const { employees, locations, addShift, updateShift } = useAppStore();
    const [formData, setFormData] = useState(getInitialState(shiftToEdit));

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialState(shiftToEdit));
        }
    }, [isOpen, shiftToEdit]);

    const handleSave = () => {
        if (!formData.role) {
            alert('Role is required.');
            return;
        }

        const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
        const endDateTime = new Date(`${formData.date}T${formData.endTime}`);
        
        const shiftData = {
            ...formData,
            employeeId: formData.employeeId ? Number(formData.employeeId) : null,
            startTime: startDateTime,
            endTime: endDateTime,
        };
        
        if (shiftToEdit) {
            updateShift({ ...shiftToEdit, ...shiftData });
        } else {
            addShift(shiftData);
        }
        
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={shiftToEdit ? "Edit Shift" : "Add Shift"}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Shift</Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select 
                    label="Location" 
                    value={formData.locationId} 
                    onChange={e => setFormData(f => ({ ...f, locationId: Number(e.target.value) }))}
                >
                    {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                </Select>
                <Select 
                    label="Employee (optional)" 
                    value={formData.employeeId ?? ''} 
                    onChange={e => setFormData(f => ({ ...f, employeeId: e.target.value ? Number(e.target.value) : null }))}
                >
                    <option value="">Unassigned</option>
                    {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </Select>
                <Input 
                    label="Role" 
                    type="text" 
                    placeholder="e.g., Barista" 
                    value={formData.role} 
                    onChange={e => setFormData(f => ({ ...f, role: e.target.value }))}
                />
                <Input 
                    label="Date" 
                    type="date" 
                    value={formData.date} 
                    onChange={e => setFormData(f => ({ ...f, date: e.target.value }))}
                />
                <Input 
                    label="Start Time" 
                    type="time" 
                    value={formData.startTime} 
                    onChange={e => setFormData(f => ({ ...f, startTime: e.target.value }))}
                />
                <Input 
                    label="End Time" 
                    type="time" 
                    value={formData.endTime} 
                    onChange={e => setFormData(f => ({ ...f, endTime: e.target.value }))}
                />
                <Input 
                    label="Unpaid Break (minutes)" 
                    type="number" 
                    value={formData.unpaidBreakMinutes} 
                    onChange={e => setFormData(f => ({ ...f, unpaidBreakMinutes: Number(e.target.value) }))}
                />
                <Input 
                    label="Color" 
                    type="color" 
                    value={formData.color} 
                    onChange={e => setFormData(f => ({ ...f, color: e.target.value }))}
                />
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                    <textarea 
                        rows={3} 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={formData.notes} 
                        onChange={e => setFormData(f => ({ ...f, notes: e.target.value }))}
                    />
                </div>
            </div>
        </Modal>
    );
};
