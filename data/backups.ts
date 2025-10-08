
// FIX: Added .ts extension to import path
import { Backup } from '../types.ts';

export const backups: Backup[] = [
    {
        id: 'bak1',
        timestamp: new Date(new Date().setHours(3, 0, 0, 0)),
        status: 'Success',
        type: 'Automatic',
    },
    {
        id: 'bak2',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
        status: 'Success',
        type: 'Automatic',
    },
    {
        id: 'bak3',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
        status: 'Success',
        type: 'Automatic',
    },
    {
        id: 'bak4',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
        status: 'Failed',
        type: 'Automatic',
    },
];
