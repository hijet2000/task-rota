// FIX: Corrected relative import path for types.ts.
import { Location } from '../types.ts';

export const locations: Location[] = [
  {
    id: 1,
    name: 'The Grand Cafe - Downtown',
    code: 'DTN-001',
    address: '123 Main Street, Anytown, AT 12345',
    phone: '555-123-4567',
    holidayCalendar: 'UK',
    timezone: 'Europe/London',
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
    verificationType: 'GPS',
  },
  {
    id: 2,
    name: 'The Grand Cafe - Waterfront',
    code: 'WFT-002',
    address: '456 Waterfront Ave, Anytown, AT 12345',
    phone: '555-987-6543',
    holidayCalendar: 'UK',
    timezone: 'Europe/London',
    coordinates: { latitude: 51.505, longitude: -0.075 },
    verificationType: 'None',
  },
];