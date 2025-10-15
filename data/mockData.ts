import { Employee, Shift, DailyAvailability } from '../types.ts';

const defaultAvailability: DailyAvailability[] = [
    { day: 'Monday', periods: [] }, { day: 'Tuesday', periods: [] }, { day: 'Wednesday', periods: [] },
    { day: 'Thursday', periods: [] }, { day: 'Friday', periods: [] }, { day: 'Saturday', periods: [] }, { day: 'Sunday', periods: [] },
];

export const employees: Employee[] = [
  {
    id: 1, name: 'Olivia Owner', email: 'olivia@example.com', phone: '555-0101', role: 'Owner',
    avatarUrl: 'https://i.pravatar.cc/150?u=1', locationId: 1, payType: 'salary', annualSalary: 80000,
    contractedHours: 40, skills: ['Management', 'Finance'], availability: defaultAvailability, score: 100,
  },
  {
    id: 2, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0102', role: 'Manager',
    avatarUrl: 'https://i.pravatar.cc/150?u=2', locationId: 1, payType: 'salary', annualSalary: 55000,
    contractedHours: 40, skills: ['Team Leading', 'Scheduling'], availability: defaultAvailability, score: 100,
  },
  {
    id: 3, name: 'Bob Williams', email: 'bob@example.com', phone: '555-0103', role: 'Member',
    avatarUrl: 'https://i.pravatar.cc/150?u=3', locationId: 1, payType: 'hourly', hourlyRate: 15.50,
    contractedHours: 30, skills: ['Barista', 'Customer Service'], availability: defaultAvailability, score: 100,
  },
  {
    id: 4, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0104', role: 'Member',
    avatarUrl: 'https://i.pravatar.cc/150?u=4', locationId: 2, payType: 'hourly', hourlyRate: 15.00,
    contractedHours: 35, skills: ['Cashier', 'Food Prep'], availability: defaultAvailability, score: 100,
  },
  {
    id: 5, name: 'Diana Prince', email: 'diana@example.com', phone: '555-0105', role: 'Member',
    avatarUrl: 'https://i.pravatar.cc/150?u=5', locationId: 1, payType: 'hourly', hourlyRate: 16.00,
    contractedHours: 25, skills: ['Barista', 'Latte Art'], availability: defaultAvailability, score: 100,
  },
  {
    id: 6, name: 'Frank Castle', email: 'frank@example.com', phone: '555-0106', role: 'Member',
    avatarUrl: 'https://i.pravatar.cc/150?u=6', locationId: 2, payType: 'hourly', hourlyRate: 14.75,
    contractedHours: 40, skills: ['Cook', 'Grill'], availability: defaultAvailability, score: 100,
  },
  {
    id: 7, name: 'George Costanza', email: 'george@example.com', phone: '555-0107', role: 'Member',
    avatarUrl: 'https://i.pravatar.cc/150?u=7', locationId: 1, payType: 'hourly', hourlyRate: 15.25,
    contractedHours: 20, skills: ['Customer Service'], availability: defaultAvailability, score: 100,
  },
   {
    id: 8, name: 'Jerry Seinfeld', email: 'jerry@example.com', phone: '555-0108', role: 'Admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=8', locationId: 1, payType: 'salary', annualSalary: 65000,
    contractedHours: 40, skills: ['System Admin'], availability: defaultAvailability, score: 100,
  },
   {
    id: 9, name: 'Elaine Benes', email: 'elaine@example.com', phone: '555-0109', role: 'Manager',
    avatarUrl: 'https://i.pravatar.cc/150?u=9', locationId: 2, payType: 'salary', annualSalary: 52000,
    contractedHours: 40, skills: ['Marketing'], availability: defaultAvailability, score: 100,
  },
];

const getShiftDate = (dayOffset: number, hour: number, minute: number = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, minute, 0, 0);
    return d;
};

export const shifts: Shift[] = [
  // Today
  { id: 's1', employeeId: 3, locationId: 1, startTime: getShiftDate(0, 8), endTime: getShiftDate(0, 16), role: 'Barista', unpaidBreakMinutes: 30, color: '#3B82F6', isPublished: true },
  { id: 's2', employeeId: 4, locationId: 2, startTime: getShiftDate(0, 9), endTime: getShiftDate(0, 17), role: 'Cashier', unpaidBreakMinutes: 30, color: '#10B981', isPublished: true },
  { id: 's3', employeeId: 5, locationId: 1, startTime: getShiftDate(0, 12), endTime: getShiftDate(0, 20), role: 'Barista', unpaidBreakMinutes: 30, color: '#3B82F6', isPublished: true },
  { id: 's4', employeeId: null, locationId: 1, startTime: getShiftDate(0, 10), endTime: getShiftDate(0, 15), role: 'Dishwasher', unpaidBreakMinutes: 0, color: '#8B5CF6', isPublished: false },
  // Tomorrow
  { id: 's5', employeeId: 3, locationId: 1, startTime: getShiftDate(1, 8), endTime: getShiftDate(1, 16), role: 'Barista', unpaidBreakMinutes: 30, color: '#3B82F6', isPublished: true },
  { id: 's6', employeeId: 6, locationId: 2, startTime: getShiftDate(1, 14), endTime: getShiftDate(1, 22), role: 'Cook', unpaidBreakMinutes: 30, color: '#EF4444', isPublished: true },
  // Yesterday
  { id: 's7', employeeId: 4, locationId: 2, startTime: getShiftDate(-1, 9), endTime: getShiftDate(-1, 17), role: 'Cashier', unpaidBreakMinutes: 30, color: '#10B981', isPublished: true },
];