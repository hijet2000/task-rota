// FIX: Implemented mock data for employees and shifts.
// FIX: Added .ts extension to import path.
import { Employee, Shift, DailyAvailability, DayOfWeek } from '../types.ts';

const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const defaultAvailability: DailyAvailability[] = daysOfWeek.map(day => ({
  day,
  periods: [],
}));

const eveningUnavailable: DailyAvailability[] = daysOfWeek.map(day => ({
  day,
  periods: day === 'Wednesday' || day === 'Friday' ? [{ startTime: '18:00', endTime: '23:59', type: 'unavailable' }] : []
}));


export const employees: Employee[] = [
    { id: 1, name: 'Olivia Owner', email: 'olivia@example.com', phone: '111-111-1111', avatarUrl: 'https://i.pravatar.cc/150?u=1', role: 'Owner', locationId: 1, payType: 'salary', annualSalary: 60000, contractedHours: 40, skills: ['Management', 'Finance'], availability: defaultAvailability },
    { id: 2, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', avatarUrl: 'https://i.pravatar.cc/150?u=2', role: 'Manager', locationId: 1, payType: 'salary', annualSalary: 45000, contractedHours: 40, skills: ['FOH', 'Management', 'First Aid'], availability: defaultAvailability },
    { id: 3, name: 'Bob Williams', email: 'bob@example.com', phone: '234-567-8901', avatarUrl: 'https://i.pravatar.cc/150?u=3', role: 'Member', locationId: 1, payType: 'hourly', hourlyRate: 12.50, contractedHours: 30, skills: ['FOH', 'Barista'], availability: eveningUnavailable },
    { id: 4, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012', avatarUrl: 'https://i.pravatar.cc/150?u=4', role: 'Member', locationId: 1, payType: 'hourly', hourlyRate: 12.50, contractedHours: 20, skills: ['FOH'], availability: defaultAvailability },
    { id: 5, name: 'Diana Prince', email: 'diana@example.com', phone: '456-789-0123', avatarUrl: 'https://i.pravatar.cc/150?u=5', role: 'Member', locationId: 2, payType: 'hourly', hourlyRate: 13.00, contractedHours: 40, skills: ['BOH', 'Chef'], availability: defaultAvailability },
    { id: 6, name: 'Frank Castle', email: 'frank@example.com', phone: '567-890-1234', avatarUrl: 'https://i.pravatar.cc/150?u=6', role: 'Member', locationId: 2, payType: 'hourly', hourlyRate: 12.75, contractedHours: 40, skills: ['BOH', 'Grill'], availability: defaultAvailability },
    { id: 7, name: 'George Costanza', email: 'george@example.com', phone: '678-901-2345', avatarUrl: 'https://i.pravatar.cc/150?u=7', role: 'Head Chef', locationId: 2, payType: 'salary', annualSalary: 50000, contractedHours: 45, skills: ['BOH', 'Management', 'Menu Planning'], availability: defaultAvailability },
    { id: 8, name: 'Michael Scott', email: 'michael@example.com', phone: '789-012-3456', avatarUrl: 'https://i.pravatar.cc/150?u=8', role: 'Manager', locationId: 2, payType: 'salary', annualSalary: 45000, contractedHours: 40, skills: ['FOH', 'Management'], availability: defaultAvailability },
    { id: 9, name: 'Arthur Admin', email: 'arthur@example.com', phone: '890-123-4567', avatarUrl: 'https://i.pravatar.cc/150?u=9', role: 'Admin', locationId: 1, payType: 'salary', annualSalary: 55000, contractedHours: 40, skills: ['IT', 'Admin'], availability: defaultAvailability },
];

const today = new Date();
const getShiftDate = (dayOffset: number, hour: number, minute: number = 0) => {
    const d = new Date(today);
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, minute, 0, 0);
    return d;
};

export const shifts: Shift[] = [
    { id: 's1', employeeId: 3, locationId: 1, role: 'Barista', startTime: getShiftDate(0, 8), endTime: getShiftDate(0, 16), unpaidBreakMinutes: 30, color: '#3B82F6' },
    { id: 's2', employeeId: 4, locationId: 1, role: 'Waiter', startTime: getShiftDate(0, 9), endTime: getShiftDate(0, 17), unpaidBreakMinutes: 30, color: '#10B981' },
    { id: 's3', employeeId: null, locationId: 1, role: 'Host', startTime: getShiftDate(0, 17), endTime: getShiftDate(0, 22), unpaidBreakMinutes: 30, color: '#F59E0B' },
    { id: 's4', employeeId: 5, locationId: 2, role: 'Chef', startTime: getShiftDate(0, 14), endTime: getShiftDate(0, 22), unpaidBreakMinutes: 45, color: '#EF4444' },
    { id: 's5', employeeId: 6, locationId: 2, role: 'Grill', startTime: getShiftDate(0, 15), endTime: getShiftDate(0, 23), unpaidBreakMinutes: 45, color: '#8B5CF6' },

    { id: 's6', employeeId: 3, locationId: 1, role: 'Barista', startTime: getShiftDate(1, 8), endTime: getShiftDate(1, 16), unpaidBreakMinutes: 30, color: '#3B82F6' },
    { id: 's7', employeeId: 4, locationId: 1, role: 'Waiter', startTime: getShiftDate(1, 12), endTime: getShiftDate(1, 20), unpaidBreakMinutes: 30, color: '#10B981' },
    { id: 's8', employeeId: 5, locationId: 2, role: 'Chef', startTime: getShiftDate(1, 14), endTime: getShiftDate(1, 22), unpaidBreakMinutes: 45, color: '#EF4444' },

    { id: 's9', employeeId: 2, locationId: 1, role: 'Manager', startTime: getShiftDate(-1, 9), endTime: getShiftDate(-1, 17), unpaidBreakMinutes: 60, color: '#6366F1' },
];
