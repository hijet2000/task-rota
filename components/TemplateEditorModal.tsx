

import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, TagInput, ToggleSwitch, Select } from './ui.tsx';
// FIX: Corrected relative import path for types.ts.
import { NotificationTemplate, NotificationChannel } from '../types.ts';

interface TemplateEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (template: NotificationTemplate) => void;
    template: NotificationTemplate | null;
}

const allChannels: NotificationChannel[] = ['Email', 'SMS', 'In-App', 'WhatsApp', 'Custom'];

export const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({ isOpen, onClose, onSave, template }) => {
    const [formData, setFormData] = useState<Partial<NotificationTemplate>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(template || {
                name: '',
                description: '',
                event: '',
                channels: ['In-App'],
                subject: '',
                message: ''
            });
        }
    }, [isOpen, template]);

    const handleSave = () => {
        if (formData.name && formData.event && formData.message) {
            onSave(formData as NotificationTemplate);
        }
    };

    const handleChannelToggle = (channel: NotificationChannel) => {
        const currentChannels = formData.channels || [];
        const newChannels = currentChannels.includes(channel)
            ? currentChannels.filter(c => c !== channel)
            : [...currentChannels, channel];
        setFormData(f => ({ ...f, channels: newChannels }));
    };

    const handleChange = (field: keyof NotificationTemplate, value: any) => {
        setFormData(f => ({...f, [field]: value}));
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={template ? `Edit Template: ${template.name}` : 'Create New Template'}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Template</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Template Name" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} />
                <Input label="Description" value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} />
                <Input label="Event Trigger" value={formData.event || ''} onChange={e => handleChange('event', e.target.value)} helperText="e.g., shift.published, leave.approved" />
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channels</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                        {allChannels.map(channel => (
                            <label key={channel} className="flex items-center space-x-2">
                                <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={(formData.channels || []).includes(channel)}
                                onChange={() => handleChannelToggle(channel)}
                                />
                                <span className="text-sm text-gray-600">{channel}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {(formData.channels || []).includes('Email') && (
                     <Input label="Email Subject" value={formData.subject || ''} onChange={e => handleChange('subject', e.target.value)} />
                )}
               
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message Body</label>
                     <textarea 
                        rows={5}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={formData.message || ''}
                        onChange={e => handleChange('message', e.target.value)}
                    ></textarea>
                    <p className="mt-2 text-sm text-gray-500">
                        Use placeholders like `{'{{employee.name}}'}` or `{'{{shift.date}}'}`.
                    </p>
                </div>
            </div>
        </Modal>
    );
};