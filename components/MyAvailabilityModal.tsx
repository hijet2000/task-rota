import React, { useState, useEffect } from 'react';
// FIX: Added .ts extension to import path
import { DailyAvailability, DayOfWeek } from '../types.ts';
// FIX: Added .tsx extension to import path
import { Modal, Button } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { AvailabilityEditor } from './AvailabilityEditor.tsx';
// FIX: Added .ts extension to import path
import { getPermissions } from '../lib/permissions.ts';

interface MyAvailabilityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MyAvailabilityModal: React.FC<MyAvailabilityModalProps> = ({ isOpen, onClose }) => {
    const { currentUser } = getPermissions();
    const [editedAvailability, setEditedAvailability] = useState<DailyAvailability[]>([]);

    useEffect(() => {
        if (currentUser) {
            const initialAvailability = currentUser.availability && currentUser.availability.length === 7
                ? currentUser.availability
                : daysOfWeek.map(d => ({ day: d as any, periods: [] }));

            setEditedAvailability(JSON.parse(JSON.stringify(initialAvailability)));
        }
    }, [currentUser, isOpen]);

    if (!currentUser) return null;

    const handleSaveChanges = () => {
        console.log("Saving availability for", currentUser.name, editedAvailability);
        onClose();
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="My Availability"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
            }
        >
           <p className="text-sm text-gray-600 mb-4">Set times you are unavailable to work or prefer to work. Any time not covered by a period below is considered fully available.</p>
           <AvailabilityEditor 
                availability={editedAvailability}
                onAvailabilityChange={setEditedAvailability}
           />
        </Modal>
    );
};
