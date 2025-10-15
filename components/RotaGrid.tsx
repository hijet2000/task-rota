import React from 'react';
import { Employee, Shift } from '../types';
import { ShiftCard } from './ShiftCard';

interface RotaGridProps {
    weekDates: Date[];
    scheduleData: { employeeId: number; shiftsByDay: (Shift[] | null)[] }[];
    employees: Employee[];
}

export const RotaGrid: React.FC<RotaGridProps> = ({ weekDates, scheduleData, employees }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 z-10 w-48">
                            Employee
                        </th>
                        {weekDates.map(date => (
                            <th key={date.toISOString()} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-56">
                                {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {scheduleData.map(({ employeeId, shiftsByDay }) => {
                        const employee = employees.find(e => e.id === employeeId);
                        if (!employee) return null;
                        return (
                            <tr key={employeeId}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 w-48">
                                    {employee.name}
                                </td>
                                {shiftsByDay.map((shiftsOnDay, dayIndex) => (
                                    <td key={dayIndex} className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 align-top w-56">
                                        <div className="space-y-2">
                                            {shiftsOnDay?.map(shift => (
                                                <ShiftCard key={shift.id} shift={shift} employee={employee} />
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};