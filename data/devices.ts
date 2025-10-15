// FIX: Corrected relative import path for types.ts.
import { Device } from '../types.ts';

export const devices: Device[] = [
    {
        id: 'dev1',
        userId: 1, // Alice Johnson
        deviceName: 'Chrome on macOS',
        lastSeen: new Date().toISOString(),
        ipAddress: 'xxx.xxx.xxx.xxx', // SEC-FIX: Replaced with a non-sensitive placeholder.
    },
    {
        id: 'dev2',
        userId: 1, // Alice Johnson
        deviceName: 'Safari on iPhone',
        lastSeen: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        ipAddress: 'xxx.xxx.xxx.xxx', // SEC-FIX: Replaced with a non-sensitive placeholder.
    },
    {
        id: 'dev3',
        userId: 2, // Bob Williams
        deviceName: 'ShiftWise Kiosk',
        lastSeen: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
        ipAddress: '192.168.1.101', // Internal IP is acceptable for mock.
    },
    {
        id: 'dev4',
        userId: 7, // George Costanza
        deviceName: 'Chrome on Windows',
        lastSeen: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
        ipAddress: 'xxx.xxx.xxx.xxx', // SEC-FIX: Replaced with a non-sensitive placeholder.
    }
];
