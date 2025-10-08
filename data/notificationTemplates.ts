
// FIX: Added .ts extension to import path
import { NotificationTemplate } from '../types.ts';

export const notificationTemplates: NotificationTemplate[] = [
    {
        id: 'tpl_shift_published',
        name: 'New Shift Published',
        description: 'Notifies an employee when a new shift has been assigned to them.',
        event: 'shift.published',
        channels: ['In-App', 'Email'],
        subject: 'Your new shift is confirmed!',
        message: 'Hi {employee.name}, a new shift has been published for you on {shift.date} from {shift.start_time} to {shift.end_time} at {location.name}.'
    },
    {
        id: 'tpl_leave_approved',
        name: 'Leave Request Approved',
        description: 'Notifies an employee that their leave request has been approved.',
        event: 'leave.request.approved',
        channels: ['In-App', 'Email'],
        subject: 'Your time off request has been approved',
        message: 'Hi {employee.name}, your leave request for {leave.start_date} to {leave.end_date} has been approved.'
    },
    {
        id: 'tpl_late_clock_in',
        name: 'Late Clock-in Alert',
        description: 'Notifies a manager when one of their team members clocks in late.',
        event: 'timeclock.late',
        channels: ['Email', 'SMS'],
        subject: 'Alert: {employee.name} clocked in late',
        message: 'Hi {manager.name}, this is an automated alert to let you know that {employee.name} clocked in late for their shift at {location.name} at {clockin.time}.'
    },
];
