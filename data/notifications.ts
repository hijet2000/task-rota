// FIX: Implemented notificationLogs mock data.
import { NotificationLog } from '../types.ts';

export const notificationLogs: NotificationLog[] = [
    {
        id: 'notif_1',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        recipientId: 3, // Bob Williams
        channel: 'In-App',
        templateName: 'New Shift Published',
        status: 'Sent',
        isRead: false
    },
    {
        id: 'notif_2',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        recipientId: 3, // Bob Williams
        channel: 'Email',
        templateName: 'Leave Request Approved',
        status: 'Opened',
        isRead: true
    },
    {
        id: 'notif_3',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        recipientId: 3, // Bob Williams
        channel: 'In-App',
        templateName: 'Upcoming shift reminder',
        status: 'Sent',
        isRead: true
    },
    {
        id: 'notif_4',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        recipientId: 2, // Alice Johnson
        channel: 'SMS',
        templateName: 'Late Clock-in Alert',
        status: 'Sent',
        isRead: false
    }
];