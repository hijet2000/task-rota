import React, { useState, useEffect } from 'react';
import { Employee, DailyAvailability } from '../types.ts';
import { Modal, Button } from './ui.tsx';
import { AvailabilityEditor } from './AvailabilityEditor.tsx';
import { getPermissions } from '../lib/permissions.ts';

interface MyAvailabilityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MyAvailabilityModal: React.FC<MyAvailabilityModalProps> = ({ isOpen, onClose }) => {
    const { currentUser } = getPermissions();
    const [editedAvailability, setEditedAvailability] = useState<DailyAvailability[]>([]);

    useEffect(() => {
        if (currentUser) {
            setEditedAvailability(JSON.parse(JSON.stringify(currentUser.availability)));
        }
    }, [currentUser]);

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
           <AvailabilityEditor 
                availability={editedAvailability}
                onAvailabilityChange={setEditedAvailability}
           />
        </Modal>
    );
};
