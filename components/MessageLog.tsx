import React from 'react';
// FIX: Added .tsx extension to import path
import { Card, Button, Input } from './ui.tsx';
// FIX: Added .ts extension to import path
import { notificationLogs } from '../data/notifications.ts';
// FIX: Added .ts extension to import path
import { employees } from '../data/mockData.ts';
// FIX: Added .tsx extension to import path
import { BellIcon, MailIcon, MessageSquareIcon, SmartphoneIcon, ZapIcon } from './icons.tsx';
// FIX: Added .ts extension to import path
// FIX: Added NotificationLog to import to fix type error.
import { NotificationChannel, NotificationLog } from '../types.ts';

const channelIcons: Record<NotificationChannel, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'Email': MailIcon,
    'SMS': MessageSquareIcon,
    'In-App': SmartphoneIcon,
    'WhatsApp': MessageSquareIcon, // Placeholder
    'Custom': ZapIcon,
};

const statusColors: Record<NotificationLog['status'], string> = {
    'Delivered': 'bg-green-100 text-green-800',
    'Sent': 'bg-blue-100 text-blue-800',
    'Failed': 'bg-red-100 text-red-800',
};

export const MessageLog: React.FC = () => {
    return (
        <Card
            title="Message Log"
            description="A record of all notifications sent from the system."
        >
            <div className="flex space-x-2 mb-4">
                <Input label="" placeholder="Filter by employee or message type..." className="w-full" />
                <Button variant="secondary">Filter</Button>
            </div>
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {notificationLogs.map(log => {
                            const recipient = employees.find(e => e.id === log.recipientId);
                            const Icon = channelIcons[log.channel];
                            return (
                                <tr key={log.id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{recipient?.name || `User ${log.recipientId}`}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{log.templateName}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            {Icon && <Icon className="w-4 h-4 mr-2" />}
                                            {log.channel}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{log.timestamp.toLocaleString()}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[log.status]}`}>{log.status}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
