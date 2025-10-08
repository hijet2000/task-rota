
// FIX: Added .ts extension to import path
import { Webhook } from '../types.ts';

export const webhooks: Webhook[] = [
    {
        id: 'wh1',
        url: 'https://api.example.com/webhooks/shifts',
        events: ['shift.published', 'shift.updated'],
        status: 'active',
    },
    {
        id: 'wh2',
        url: 'https://api.example.com/webhooks/employees',
        events: ['employee.created'],
        status: 'inactive',
    },
];
