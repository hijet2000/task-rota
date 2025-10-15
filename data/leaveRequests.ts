// FIX: Implemented leave requests mock data.
import { LeaveRequest } from '../types.ts';

export const leaveRequests: LeaveRequest[] = [
    {
        id: 'lr1',
        employeeId: 3, // Bob Williams
        startDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 9),
        type: 'Annual',
        status: 'Pending',
        notes: 'Family vacation.'
    },
    {
        id: 'lr2',
        employeeId: 4, // Charlie Brown
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
        type: 'Sick',
        status: 'Approved',
        notes: 'Feeling unwell.'
    },
    {
        id: 'lr3',
        employeeId: 5, // Diana Prince
        startDate: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 1),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 1),
        type: 'Unpaid',
        status: 'Pending',
    }
];