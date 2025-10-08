

import React from 'react';
// FIX: Imported 'tasks' instead of non-existent 'shifts'.
// FIX: Added .ts extension to import path
import { shifts, employees } from '../../data/mockData.ts';
// FIX: Added .ts extension to import path
import { locations } from '../../data/locations.ts';

// For demo, assume current user is employee ID 3
const currentUserId = 3; 

export const MyShiftsView: React.FC = () => {
    const myShifts = shifts
        .filter(s => s.employeeId === currentUserId && s.startTime > new Date())
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    
    const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Upcoming Shifts</h2>
            {myShifts.length > 0 ? (
                <div className="space-y-4">
                    {myShifts.map(shift => {
                        const location = locations.find(l => l.id === shift.locationId);
                        return (
                             <div key={shift.id} className="bg-white p-4 rounded-lg shadow-md border-l-4" style={{borderColor: shift.color}}>
                                <p className="font-bold text-lg">{shift.role}</p>
                                <p className="font-semibold text-gray-700">{formatDate(shift.startTime)}</p>
                                <p className="text-gray-600">{formatTime(shift.startTime)} - {formatTime(shift.endTime)}</p>
                                <p className="text-sm text-gray-500 mt-1">{location?.name}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">You have no upcoming shifts.</p>
                </div>
            )}
        </div>
    );
}