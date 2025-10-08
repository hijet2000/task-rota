
// FIX: Added .ts extension to import path
import { TimeClockEntry } from '../types.ts';

// FIX: Updated data to match the TimeClockEntry interface in types.ts.
export const timeClockEntries: TimeClockEntry[] = [
    {
        id: 'tc1',
        employeeId: 2,
        locationId: 1,
        clockIn: new Date(new Date().setDate(new Date().getDate() - 1)),
        breaks: [],
        photoUrl: 'https://i.pravatar.cc/150?u=2',
        isVerified: true,
        gps: { latitude: 51.509865, longitude: -0.118092 }, 
        status: 'synced', 
        deviceFingerprint: 'fingerprint1'
    },
    {
        id: 'tc2',
        employeeId: 3,
        locationId: 1,
        clockIn: new Date(),
        breaks: [],
        photoUrl: 'https://i.pravatar.cc/150?u=3',
        isVerified: false,
        gps: { latitude: 51.509865, longitude: -0.118092 }, 
        status: 'pending', 
        deviceFingerprint: 'fingerprint2'
    },
     {
        id: 'tc3',
        employeeId: 4,
        locationId: 1,
        clockIn: new Date(),
        breaks: [],
        photoUrl: 'https://i.pravatar.cc/150?u=4',
        isVerified: false,
        gps: { latitude: 51.509865, longitude: -0.118092 }, 
        status: 'pending', 
        deviceFingerprint: 'fingerprint3'
    },
];
