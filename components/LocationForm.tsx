
import React, { useState, useEffect } from 'react';
import { Location } from '../types';
import { Modal, Button, Input, Select } from './ui';

interface LocationFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (location: Location) => void;
    location: Location | null;
}

export const LocationForm: React.FC<LocationFormProps> = ({ isOpen, onClose, onSave, location }) => {
    const [formData, setFormData] = useState<Partial<Location>>({});
    const [errors, setErrors] = useState<Partial<Record<keyof Location, string>>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(location || { name: '', code: '', address: '', phone: '', holidayCalendar: 'UK', timezone: 'Europe/London', verificationType: 'None' });
            setErrors({});
        }
    }, [isOpen, location]);

    const validate = () => {
        const newErrors: Partial<Record<keyof Location, string>> = {};
        if (!formData.name?.trim()) newErrors.name = 'Location name is required.';
        if (!formData.code?.trim()) newErrors.code = 'Location code is required.';
        if (!formData.address?.trim()) newErrors.address = 'Address is required.';
        if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSave = () => {
        if (validate()) {
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
                <Input label="Location Name" value={formData.name || ''} onChange={e => setFormData(f => ({...f, name: e.target.value}))} error={errors.name} />
                <Input label="Location Code" value={formData.code || ''} onChange={e => setFormData(f => ({...f, code: e.target.value}))} error={errors.code} />
                <Input label="Address" value={formData.address || ''} onChange={e => setFormData(f => ({...f, address: e.target.value}))} error={errors.address} />
                <Input label="Phone Number" value={formData.phone || ''} onChange={e => setFormData(f => ({...f, phone: e.target.value}))} error={errors.phone} />
                <Select label="Holiday Calendar" value={formData.holidayCalendar} onChange={e => setFormData(f => ({...f, holidayCalendar: e.target.value as Location['holidayCalendar']}))}>
                    <option value="UK">United Kingdom</option>
                    <option value="ZA">South Africa</option>
                    <option value="ZW">Zimbabwe</option>
                </Select>
            </div>
        </Modal>
    );
};
