

import React from 'react';
import { Modal, Button, Input, TagInput } from '../ui';
import { Webhook } from '../../types';

interface WebhookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    webhook: Webhook | null;
}

const allEvents = ['shift.created', 'shift.updated', 'shift.deleted', 'shift.published', 'employee.created', 'employee.updated'];

export const WebhookFormModal: React.FC<WebhookFormModalProps> = ({ isOpen, onClose, webhook }) => {
    const title = webhook ? 'Edit Webhook' : 'Add New Webhook';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button>Save Webhook</Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Input label="Webhook URL" type="url" defaultValue={webhook?.url} placeholder="https://api.example.com/endpoint" />
                <TagInput label="Events to send" tags={webhook?.events || []} setTags={() => {}} helperText="Select from available events." />
                <div>
                    <p className="text-sm font-medium text-gray-700">Available Events</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {allEvents.map(event => (
                            <span key={event} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{event}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};