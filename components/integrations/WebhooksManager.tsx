

import React, { useState } from 'react';
// FIX: Added .tsx extension to import path.
import { Card, Button } from '../ui.tsx';
// FIX: Added .ts extension to import path
import { webhooks } from '../../data/webhooks.ts';
// FIX: Added .ts extension to import path
import { Webhook } from '../../types.ts';
// FIX: Added .tsx extension to import path.
import { WebhookFormModal } from './WebhookFormModal.tsx';

export const WebhooksManager: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);

    const handleAdd = () => {
        setSelectedWebhook(null);
        setIsModalOpen(true);
    };

    const handleEdit = (webhook: Webhook) => {
        setSelectedWebhook(webhook);
        setIsModalOpen(true);
    };

    return (
        <>
            <Card
                title="Webhooks"
                description="Send real-time notifications to your own services when events happen in RotaApp."
                footer={<Button onClick={handleAdd}>Add Webhook</Button>}
            >
                <div className="space-y-3">
                    {webhooks.map(webhook => (
                        <div key={webhook.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p className="font-mono text-sm">{webhook.url}</p>
                                <p className="text-xs text-gray-500">{webhook.events.join(', ')}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {webhook.status}
                                </span>
                                <Button variant="secondary" size="sm" onClick={() => handleEdit(webhook)}>Edit</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <WebhookFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                webhook={selectedWebhook}
            />
        </>
    );
};
