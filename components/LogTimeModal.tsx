import React from 'react';
import { Modal, Button, Input, Select } from './ui.tsx';
import { Task } from '../types.ts';
import { tasks } from '../data/tasksData.ts';

interface LogTimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task | null;
}

export const LogTimeModal: React.FC<LogTimeModalProps> = ({ isOpen, onClose, task }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Log Time"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button>Save Time Entry</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Select label="Task" defaultValue={task?.id}>
                    {tasks.map(t => <option key={t.id} value={t.id}>{t.code} - {t.title}</option>)}
                </Select>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    <Input label="Duration (HH:MM)" type="text" placeholder="e.g., 01:30" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                    <textarea rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
            </div>
        </Modal>
    );
};
