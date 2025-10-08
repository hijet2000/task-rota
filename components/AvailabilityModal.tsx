import React, { useState, useEffect } from 'react';
// FIX: Added .ts extension to import path.
import { Employee, DailyAvailability } from '../types.ts';
// FIX: Added .tsx extension to import path.
import { Modal, Button } from './ui.tsx';
// FIX: Added .tsx extension to import path.
import { AvailabilityEditor } from './AvailabilityEditor.tsx';

interface AvailabilityModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
}

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({ isOpen, onClose, employee }) => {
    const [editedAvailability, setEditedAvailability] = useState<DailyAvailability[]>([]);

    useEffect(() => {
        if (employee) {
            // Deep copy to prevent mutating original data
            setEditedAvailability(JSON.parse(JSON.stringify(employee.availability)));
        }
    }, [employee]);

    if (!employee) return null;

    const handleSaveChanges = () => {
        // Here you would typically save the data to a backend.
        // For now, we'll just log it and close the modal.
        console.log("Saving availability for", employee.name, editedAvailability);
        onClose();
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Set Availability for ${employee.name}`}
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
