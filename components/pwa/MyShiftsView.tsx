import React from 'react';
import { shifts } from '../../data/mockData';
import { usePermissions } from '../../hooks/usePermissions';
import { locations } from '../../data/locations';

export const MyShiftsView: React.FC = () => {
    const { currentUser } = usePermissions();
    const myShifts = currentUser ? shifts.filter(s => s.employeeId === currentUser.id) : [];

    const formatTime = (date: Date) => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Shifts</h2>
            <div className="space-y-3">
                {myShifts.map(shift => {
                    const location = locations.find(l => l.id === shift.locationId);
                    return (
                        <div key={shift.id} className="bg-white p-3 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${shift.color}`}}>
                            <p className="font-bold">{shift.role}</p>
                            <p className="text-sm font-semibold text-gray-700">{shift.startTime.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                            <p className="text-sm text-gray-600">{formatTime(shift.startTime)} - {formatTime(shift.endTime)}</p>
                            {location && <p className="text-xs text-gray-500 mt-1">{location.name}</p>}
                        </div>
                    );
                })}
                 {myShifts.length === 0 && <p className="text-gray-500">You have no shifts assigned.</p>}
            </div>
        </div>
    );
};