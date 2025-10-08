// FIX: Implemented the LocationFormModal component.
import React, { useState, useEffect } from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button, Input, Select } from './ui.tsx';
// FIX: Added .ts extension to import path
import { Location } from '../types.ts';

interface LocationFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (location: Location) => void;
    location: Location | null;
}

const getInitialFormData = (location: Location | null): Partial<Location> => {
    return {
        name: location?.name || '',
        code: location?.code || '',
        address: location?.address || '',
        phone: location?.phone || '',
        holidayCalendar: location?.holidayCalendar || 'UK',
        timezone: location?.timezone || 'Europe/London',
    };
};

export const LocationFormModal: React.FC<LocationFormModalProps> = ({ isOpen, onClose, onSave, location }) => {
    const [formData, setFormData] = useState<Partial<Location>>(getInitialFormData(location));

    useEffect(() => {
        setFormData(getInitialFormData(location));
    }, [location, isOpen]);

    const handleSave = () => {
        // Basic validation
        if (formData.name && formData.address) {
            onSave({ ...location, ...formData } as Location);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={location ? `Edit Location: ${location.name}` : 'Add New Location'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Location</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Location Name" value={formData.name} onChange={e => setFormData(f => ({...f, name: e.target.value}))} />
                <Input label="Location Code" value={formData.code} onChange={e => setFormData(f => ({...f, code: e.target.value}))} />
                <Input label="Address" value={formData.address} onChange={e => setFormData(f => ({...f, address: e.target.value}))} />
                <Input label="Phone Number" type="tel" value={formData.phone} onChange={e => setFormData(f => ({...f, phone: e.target.value}))} />
                <Select label="Holiday Calendar" value={formData.holidayCalendar} onChange={e => setFormData(f => ({...f, holidayCalendar: e.target.value as Location['holidayCalendar']}))}>
                    <option value="UK">United Kingdom</option>
                    <option value="ZA">South Africa</option>
                    <option value="ZW">Zimbabwe</option>
                </Select>
                <Select label="Timezone" value={formData.timezone} onChange={e => setFormData(f => ({...f, timezone: e.target.value}))}>
                    <option>Europe/London</option>
                    <option>Africa/Johannesburg</option>
                    <option>Africa/Harare</option>
                </Select>
            </div>
        </Modal>
    );
};
