
// FIX: Added .ts extension to import path
import { LeaveRequest } from '../types.ts';

export const leaveRequests: LeaveRequest[] = [
    {
        id: 'lr1',
        employeeId: 2, // Bob Williams
        // FIX: Changed 'Annual Leave' to 'Annual' to match LeaveType.
        type: 'Annual',
        status: 'Approved',
        startDate: new Date('2024-09-02'),
        endDate: new Date('2024-09-06'),
        notes: 'Family vacation.',
    },
    {
        id: 'lr2',
        employeeId: 4, // Diana Prince
        // FIX: Changed 'Sick Leave' to 'Sick' to match LeaveType.
        type: 'Sick',
        status: 'Pending',
        startDate: new Date('2024-08-19'),
        endDate: new Date('2024-08-19'),
        notes: 'Feeling unwell.',
    },
     {
        id: 'lr3',
        employeeId: 3, // Charlie Brown
        // FIX: Changed 'Annual Leave' to 'Annual' to match LeaveType.
        type: 'Annual',
        status: 'Pending',
        startDate: new Date('2024-10-07'),
        endDate: new Date('2024-10-11'),
    },
];
