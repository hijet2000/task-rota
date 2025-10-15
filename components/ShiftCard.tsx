import React from 'react';
import { Shift, Employee } from '../types';
import { ClockIcon, UserIcon } from './icons';

interface ShiftCardProps {
    shift: Shift;
    employee?: Employee | null;
}

// Helper to ensure value is a Date object, preventing crashes if a date string is passed.
const ensureDate = (value: Date | string): Date => {
    if (value instanceof Date) return value;
    return new Date(value);
};

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift, employee }) => {
    const formatTime = (date: Date) => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const startTime = ensureDate(shift.startTime);
    const endTime = ensureDate(shift.endTime);

    return (
        <div 
            className="p-2 rounded-lg text-xs" 
            style={{ backgroundColor: `${shift.color}20`, border: `1px solid ${shift.color}` }}
        >
            <p className="font-bold" style={{ color: shift.color }}>{shift.role}</p>
            <div className="flex items-center my-1 text-gray-700">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>{formatTime(startTime)} - {formatTime(endTime)}</span>
            </div>
            {employee ? (
                 <div className="flex items-center text-gray-600">
                    <img src={employee.avatarUrl} className="w-4 h-4 rounded-full mr-1" />
                    <span>{employee.name}</span>
                </div>
            ) : (
                <div className="flex items-center text-gray-500">
                    <UserIcon className="w-3 h-3 mr-1" />
                    <span>Unassigned</span>
                </div>
            )}
        </div>
    );
};