


import React from 'react';
// FIX: Corrected relative import path for types.ts.
import { LeaveRequest, BlackoutDate } from '../types.ts';
// FIX: Corrected relative import path for mockData.ts.
import { employees } from '../data/mockData.ts';

interface TeamLeaveCalendarProps {
    requests: LeaveRequest[];
    blackoutDates: BlackoutDate[];
}

export const TeamLeaveCalendar: React.FC<TeamLeaveCalendarProps> = ({ requests, blackoutDates }) => {
    // This is a simplified placeholder view. A real implementation would use a calendar library.
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Team Leave Calendar</h2>
            <div className="space-y-2">
                 <h3 className="font-semibold text-gray-700">Upcoming Leave</h3>
                {requests.filter(r => r.status === 'Approved').map(req => {
                    const employee = employees.find(e => e.id === req.employeeId);
                    return (
                        <div key={req.id} className="text-sm p-2 bg-blue-50 rounded">
                            <span>{employee?.name}</span>: {req.startDate.toLocaleDateString()} - {req.endDate.toLocaleDateString()}
                        </div>
                    )
                })}
                <h3 className="font-semibold text-gray-700 mt-4">Blackout Dates</h3>
                 {blackoutDates.map(date => (
                    <div key={date.id} className="text-sm p-2 bg-red-50 rounded">
                        {date.startDate.toLocaleDateString()} - {date.endDate.toLocaleDateString()}: {date.reason}
                    </div>
                ))}
            </div>
        </div>
    );
};