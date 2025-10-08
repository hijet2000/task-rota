import React from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button, Input, Select } from './ui.tsx';
// FIX: Added .ts extension to import path
import { AutomationRule, AutomationTriggerType } from '../types.ts';

interface AutomationBuilderModalProps {
    isOpen: boolean;
    onClose: () => void;
    rule: AutomationRule | null;
}

const triggerOptions: { label: string; value: AutomationTriggerType, group: string }[] = [
    { value: 'task.created', label: 'Task is created', group: 'Task Events' },
    { value: 'task.status.changed', label: 'Task status is changed', group: 'Task Events' },
    { value: 'task.approaching_due', label: 'Task is approaching due date', group: 'Task Events' },
    { value: 'task.sla.at_risk', label: 'Task SLA is at risk', group: 'Task Events' },
    { value: 'form.submitted', label: 'A form is submitted', group: 'Form Events' },
    { value: 'shift.published', label: 'A rota/schedule is published', group: 'Rota & Timekeeping' },
    { value: 'shift.missed_clock_in', label: 'A clock-in is missed', group: 'Rota & Timekeeping' },
    { value: 'leave.approved', label: 'A leave request is approved', group: 'Rota & Timekeeping' },
    { value: 'incident.logged', label: 'An incident is logged', group: 'Rota & Timekeeping' },
];

const actionOptions = [
    { value: 'notification.send', label: 'Send a notification' },
    { value: 'task.set_field', label: 'Set a task field' },
    { value: 'task.reassign', label: 'Reassign task' },
    { value: 'webhook.send', label: 'Call a webhook' },
];

export const AutomationBuilderModal: React.FC<AutomationBuilderModalProps> = ({ isOpen, onClose, rule }) => {
    const title = rule ? 'Edit Automation Rule' : 'Create New Automation Rule';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={
                <div className="flex justify-between w-full">
                    <Button variant="secondary">Test Rule</Button>
                    <div className="space-x-2">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button>Save Rule</Button>
                    </div>
                </div>
            }
        >
            <div className="space-y-6 p-2">
                <Input label="Rule Name" type="text" defaultValue={rule?.name} placeholder="e.g., Notify manager of urgent tasks" />
                <Input label="Description" type="text" defaultValue={rule?.description} placeholder="A brief explanation of what this rule does." />

                <div className="p-4 border rounded-lg bg-gray-50/50">
                    <h4 className="font-semibold mb-2 text-gray-700">When... (Trigger)</h4>
                    <Select label="This happens...">
                        {Object.entries(triggerOptions.reduce((acc, option) => {
                            (acc[option.group] = acc[option.group] || []).push(option);
                            return acc;
                        }, {} as Record<string, typeof triggerOptions>)).map(([group, options]) => (
                            <optgroup label={group} key={group}>
                                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </optgroup>
                        ))}
                    </Select>
                </div>

                <div className="text-center">
                    <span className="text-sm font-bold text-gray-500">+</span>
                </div>

                 <div className="p-4 border rounded-lg bg-gray-50/50">
                    <h4 className="font-semibold mb-2 text-gray-700">If... (Conditions)</h4>
                     <p className="text-sm text-gray-500 text-center py-4">Conditional logic coming soon.</p>
                </div>
                
                <div className="text-center">
                    <span className="text-sm font-bold text-gray-500">&darr;</span>
                </div>

                 <div className="p-4 border rounded-lg bg-gray-50/50">
                    <h4 className="font-semibold mb-2 text-gray-700">Then... (Actions)</h4>
                    <Select label="Do this...">
                        {actionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </Select>
                </div>
            </div>
        </Modal>
    );
};
