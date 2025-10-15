import React, { useState, useEffect } from 'react';
import { Location } from '../types.ts';
import { Modal, Button, Input, Select } from './ui.tsx';

interface LocationFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (location: Location) => void;
    location: Location | null;
}

export const LocationForm: React.FC<LocationFormProps> = ({ isOpen, onClose, onSave, location }) => {
    const [formData, setFormData] = useState<Partial<Location>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(location || { name: '', code: '', address: '', phone: '', holidayCalendar: 'UK', timezone: 'Europe/London', verificationType: 'None' });
        }
    }, [isOpen, location]);
    
    const handleSave = () => {
        // Add validation here in a real app
        if (formData.name) {
            onSave(formData as Location);
        }
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={location ? 'Edit Location' : 'Add Location'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Location Name" value={formData.name || ''} onChange={e => setFormData(f => ({...f, name: e.target.value}))} />
                <Input label="Location Code" value={formData.code || ''} onChange={e => setFormData(f => ({...f, code: e.target.value}))} />
                <Input label="Address" value={formData.address || ''} onChange={e => setFormData(f => ({...f, address: e.target.value}))} />
                <Input label="Phone Number" value={formData.phone || ''} onChange={e => setFormData(f => ({...f, phone: e.target.value}))} />
                <Select label="Holiday Calendar" value={formData.holidayCalendar} onChange={e => setFormData(f => ({...f, holidayCalendar: e.target.value as Location['holidayCalendar']}))}>
                    <option value="UK">United Kingdom</option>
                    <option value="ZA">South Africa</option>
                    <option value="ZW">Zimbabwe</option>
                </Select>
            </div>
        </Modal>
    );
};
