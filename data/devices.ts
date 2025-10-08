
// FIX: Added .ts extension to import path
import { Device } from '../types.ts';

export const devices: Device[] = [
    {
        id: 'dev1',
        userId: 1, // Alice Johnson
        deviceName: 'Chrome on macOS',
        lastSeen: new Date().toISOString(),
        ipAddress: '8.8.8.8',
    },
    {
        id: 'dev2',
        userId: 1, // Alice Johnson
        deviceName: 'Safari on iPhone',
        lastSeen: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        ipAddress: '8.8.4.4',
    },
    {
        id: 'dev3',
        userId: 2, // Bob Williams
        deviceName: 'ShiftWise Kiosk',
        lastSeen: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
        ipAddress: '192.168.1.101',
    },
    {
        id: 'dev4',
        userId: 7, // George Costanza
        deviceName: 'Chrome on Windows',
        lastSeen: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
        ipAddress: '123.123.123.123',
    }
];
