


// FIX: Corrected relative import path for types.ts.
import { BlackoutDate } from '../types.ts';

export const blackoutDates: BlackoutDate[] = [
    {
        id: 'b1',
        startDate: new Date('2024-12-20'),
        endDate: new Date('2024-12-31'),
        reason: 'Christmas Period Freeze',
        locationIds: [1, 2],
    },
     {
        id: 'b2',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-31'),
        reason: 'Summer Festival Season',
        locationIds: [1],
    },
];