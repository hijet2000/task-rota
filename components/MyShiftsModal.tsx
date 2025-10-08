import React from 'react';
// FIX: Added .tsx extension to import path.
import { Modal, Button } from './ui.tsx';
// FIX: Added .ts extension to import path
import { Shift } from '../types.ts';
// FIX: Added .ts extension to import path.
import { shifts } from '../data/mockData.ts';
import { getPermissions } from '../lib/permissions.ts';

interface MyShiftsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MyShiftsModal: React.FC<MyShiftsModalProps> = ({ isOpen, onClose }) => {
    const { currentUser } = getPermissions();

    if (!currentUser) {
        return null;
    }

    const myShifts = shifts
        .filter(s => s.employeeId === currentUser.id && s.startTime > new Date())
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

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
                        <div key={shift.id} className="p-3 rounded-lg shadow-sm bg-gray-50 border-l-4" style={{ borderColor: shift.color || '#A5B4FC' }}>
                            <div className="flex justify-between text-sm">
                                <p className="font-bold">{shift.role}</p>
                                <p className="text-gray-500">{shift.startTime.toLocaleDateString()}</p>
                            </div>
                            <p className="text-gray-700">
                                {shift.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {shift.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">You have no upcoming shifts scheduled.</p>
                )}
            </div>
        </Modal>
    );
};
