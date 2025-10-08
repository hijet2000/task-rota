
// FIX: Added .ts extension to import path
import { NotificationLog } from '../types.ts';

export const notificationLogs: NotificationLog[] = [
    {
        id: 'log_1',
        timestamp: new Date(Date.now() - 3600 * 1000 * 2), // 2 hours ago
        recipientId: 2, // Alice Johnson
        templateName: 'New Shift Published',
        channel: 'Email',
        status: 'Delivered',
        // FIX: Added missing isRead property.
        isRead: false,
    },
    {
        id: 'log_2',
        timestamp: new Date(Date.now() - 3600 * 1000 * 5), // 5 hours ago
        recipientId: 4, // Charlie Brown
        templateName: 'Leave Request Approved',
        channel: 'In-App',
        status: 'Sent',
        // FIX: Added missing isRead property.
        isRead: false,
    },
    {
        id: 'log_3',
        timestamp: new Date(Date.now() - 3600 * 1000 * 24), // 1 day ago
        recipientId: 7, // George Costanza
        templateName: 'Late Clock-in Alert',
        channel: 'SMS',
        status: 'Failed',
        // FIX: Added missing isRead property.
        isRead: true,
    },
    {
        id: 'log_4',
        timestamp: new Date(Date.now() - 3600 * 1000 * 25), // 25 hours ago
        recipientId: 3, // Bob Williams
        templateName: 'New Shift Published',
        channel: 'Email',
        status: 'Delivered',
        // FIX: Added missing isRead property.
        isRead: true,
    },
];
