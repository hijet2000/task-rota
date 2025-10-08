import React, { useState } from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button, Select, Input } from './ui.tsx';
// FIX: Added .ts extension to import path
import { Task } from '../types.ts';
// FIX: Added .ts extension to import path
import { employees } from '../data/mockData.ts';

interface BulkEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTaskIds: string[];
}

const statusOptions: Task['status'][] = ['Draft', 'In Progress', 'Blocked', 'In Review', 'Done'];
const priorityOptions: Task['priority'][] = ['Low', 'Medium', 'High', 'Urgent'];

export const BulkEditModal: React.FC<BulkEditModalProps> = ({ isOpen, onClose, selectedTaskIds }) => {
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleApplyChanges = () => {
        const changes: Partial<Task> = {};
        if (status) changes.status = status as Task['status'];
        if (priority) changes.priority = priority as Task['priority'];
        if (assigneeId) changes.assigneeIds = assigneeId === 'unassigned' ? [] : [parseInt(assigneeId, 10)];
        if (dueDate) changes.dueDate = dueDate;

        console.log(`Applying changes to ${selectedTaskIds.length} tasks:`, changes);
        // In a real app, you would dispatch an action to update these tasks.
        onClose();
    };

    if (!isOpen || selectedTaskIds.length === 0) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Bulk Edit ${selectedTaskIds.length} Tasks`}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleApplyChanges}>Apply Changes</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Set a value to update it across all selected tasks. Leave fields blank to keep their original values.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Change Status to" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">-- No Change --</option>
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    <Select label="Change Priority to" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="">-- No Change --</option>
                        {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                    <Select label="Change Assignee to" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
                        <option value="">-- No Change --</option>
                        <option value="unassigned">Unassigned</option>
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </Select>
                    <Input label="Change Due Date to" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
            </div>
        </Modal>
    );
};
