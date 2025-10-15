import React, { useState, useEffect } from 'react';
import { Shift, Employee, Location } from '../types.ts';
import { Modal, Button, Input, Select } from './ui.tsx';
import { employees } from '../data/mockData.ts';
import { locations } from '../data/locations.ts';

interface AddShiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (shift: Shift) => void;
    shift: Partial<Shift> | null;
    day: Date | null;
}

export const AddShiftModal: React.FC<AddShiftModalProps> = ({ isOpen, onClose, onSave, shift, day }) => {
    const [formData, setFormData] = useState<Partial<Shift>>({});

    useEffect(() => {
        if (isOpen) {
            const initialData: Partial<Shift> = shift || {
                employeeId: null,
                locationId: locations[0]?.id,
                startTime: day ? new Date(day.setHours(9, 0, 0, 0)) : new Date(),
                endTime: day ? new Date(day.setHours(17, 0, 0, 0)) : new Date(),
                role: 'Unassigned',
                unpaidBreakMinutes: 30,
                color: '#8B5CF6',
                isPublished: false,
            };
            setFormData(initialData);
        }
    }, [isOpen, shift, day]);

    const handleSave = () => {
        // Validation would go here
        onSave(formData as Shift);
        onClose();
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={shift?.id ? 'Edit Shift' : 'Add Shift'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Shift</Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select label="Employee (optional)" value={formData.employeeId || ''} onChange={e => setFormData(f => ({...f, employeeId: e.target.value ? parseInt(e.target.value) : null}))}>
                    <option value="">Unassigned</option>
                    {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </Select>
                 <Input label="Role / Area" value={formData.role || ''} onChange={e => setFormData(f => ({...f, role: e.target.value}))} />
                <Select label="Location" value={formData.locationId} onChange={e => setFormData(f => ({...f, locationId: parseInt(e.target.value)}))}>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </Select>
                <Input label="Date" type="date" value={formData.startTime ? formData.startTime.toISOString().split('T')[0] : ''} onChange={e => {
                    const date = e.target.valueAsDate;
                    if(date) {
                         setFormData(f => ({...f, startTime: new Date(date), endTime: new Date(date)}));
                    }
                }}/>
                <Input label="Start Time" type="time" value={formData.startTime ? formData.startTime.toTimeString().slice(0,5) : ''} onChange={e => {
                     if (formData.startTime) {
                        const [h, m] = e.target.value.split(':');
                        const newDate = new Date(formData.startTime);
                        newDate.setHours(parseInt(h), parseInt(m));
                        setFormData(f => ({...f, startTime: newDate}));
                     }
                }}/>
                <Input label="End Time" type="time" value={formData.endTime ? formData.endTime.toTimeString().slice(0,5) : ''} onChange={e => {
                    if (formData.endTime) {
                        const [h, m] = e.target.value.split(':');
                        const newDate = new Date(formData.endTime);
                        newDate.setHours(parseInt(h), parseInt(m));
                        setFormData(f => ({...f, endTime: newDate}));
                     }
                }}/>
                 <Input label="Unpaid Break (minutes)" type="number" value={formData.unpaidBreakMinutes || 0} onChange={e => setFormData(f => ({...f, unpaidBreakMinutes: parseInt(e.target.value)}))} />
                 <Input label="Shift Color" type="color" value={formData.color || '#8B5CF6'} onChange={e => setFormData(f => ({...f, color: e.target.value}))} />
            </div>
        </Modal>
    );
};
