// FIX: Implemented MessageLog component.
import React from 'react';
import { Card, Button, Input } from './ui.tsx';
import { notificationLogs } from '../data/notifications.ts';
import { employees } from '../data/mockData.ts';

export const MessageLog: React.FC = () => {
    const statusColors: Record<string, string> = {
        Sent: 'bg-blue-100 text-blue-800',
        Opened: 'bg-green-100 text-green-800',
        Failed: 'bg-red-100 text-red-800',
    };

    return (
        <Card
            title="Message Log"
            description="A log of all automated notifications sent from the system."
        >
             <div className="flex space-x-2 mb-4">
                <Input label="" placeholder="Filter by recipient or template..." className="w-full" />
                <Button variant="secondary">Filter</Button>
            </div>
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {notificationLogs.map(log => {
                            const recipient = employees.find(e => e.id === log.recipientId);
                            return (
                                <tr key={log.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{recipient?.name || `User ID: ${log.recipientId}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{log.templateName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{log.channel}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[log.status]}`}>{log.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp.toLocaleString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
