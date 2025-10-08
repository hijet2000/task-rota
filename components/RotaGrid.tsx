// FIX: Implemented the RotaGrid component.
import React from 'react';
// FIX: Added .ts extension to import path
import { Shift, Employee } from '../types.ts';
// FIX: Added .tsx extension to import path
import { ShiftCard } from './ShiftCard.tsx';
// FIX: Added .tsx extension to import path
import { PlusIcon } from './icons.tsx';

interface RotaGridProps {
    weekDates: Date[];
    shifts: Shift[];
    employees: Employee[];
}

export const RotaGrid: React.FC<RotaGridProps> = ({ weekDates, shifts, employees }) => {
    const shiftsByDay: { [key: string]: Shift[] } = {};
    weekDates.forEach(date => {
        const dateString = date.toDateString();
        shiftsByDay[dateString] = shifts.filter(s => s.startTime.toDateString() === dateString);
    });

    const getEmployeeForShift = (shift: Shift) => {
        return employees.find(e => e.id === shift.employeeId);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
            <div className="grid grid-cols-7">
                {weekDates.map(date => (
                    <div key={date.toISOString()} className="text-center p-2 border-b border-r">
                        <p className="text-xs text-gray-500">{date.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()}</p>
                        <p className="font-bold text-lg">{date.getDate()}</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 h-[60vh] overflow-y-auto">
                {weekDates.map(date => (
                    <div key={date.toISOString()} className="border-r p-2">
                        <div className="space-y-2">
                            {shiftsByDay[date.toDateString()].map(shift => (
                                <ShiftCard key={shift.id} shift={shift} employee={getEmployeeForShift(shift)} />
                            ))}
                        </div>
                        <button className="w-full mt-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-2 flex items-center justify-center">
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
