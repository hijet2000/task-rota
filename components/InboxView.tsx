import React from 'react';
import { notificationLogs } from '../data/notifications.ts';

export const InboxView: React.FC = () => {
    const messages = notificationLogs.slice(0, 5); // Show a few recent messages

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Inbox</h2>
            <div className="space-y-3">
                {messages.map(msg => (
                    <div key={msg.id} className={`p-3 rounded-lg shadow-sm bg-white ${!msg.isRead ? 'border-l-4 border-blue-500' : ''}`}>
                        <div className="flex justify-between text-xs text-gray-500">
                            <p className="font-semibold">{msg.channel}</p>
                            <p>{new Date(msg.timestamp).toLocaleDateString()}</p>
                        </div>
                        <p className="text-gray-800 font-medium">{msg.templateName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
