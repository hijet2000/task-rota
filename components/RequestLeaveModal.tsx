import React from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button, Input, Select } from './ui.tsx';
// FIX: Added .ts extension to import path
import { employees } from '../data/mockData.ts';

interface RequestLeaveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RequestLeaveModal: React.FC<RequestLeaveModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Request Time Off"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button>Submit Request</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Select label="Employee">
                    {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </Select>
                <Select label="Leave Type">
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Unpaid Leave</option>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Start Date" type="date" />
                    <Input label="End Date" type="date" />
                </div>
                <Input label="Reason (optional)" type="text" />
            </div>
        </Modal>
    );
};