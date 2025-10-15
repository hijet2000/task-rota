import React from 'react';
import { Modal, Button } from './ui.tsx';
import { shifts } from '../data/mockData.ts';
import { usePermissions } from '../hooks/usePermissions.ts';

interface MyShiftsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MyShiftsModal: React.FC<MyShiftsModalProps> = ({ isOpen, onClose }) => {
    const { currentUser } = usePermissions();
    const myShifts = currentUser ? shifts.filter(s => s.employeeId === currentUser.id && s.startTime > new Date()) : [];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="My Upcoming Shifts"
            footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
        >
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {myShifts.length > 0 ? (
                    myShifts.map(shift => (
                        <div key={shift.id} className="p-3 rounded-lg shadow-sm border">
                            <p className="font-semibold">{shift.role}</p>
                            <p className="text-sm text-gray-600">
                                {shift.startTime.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">You have no upcoming shifts.</p>
                )}
            </div>
        </Modal>
    );
};