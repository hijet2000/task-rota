// FIX: Implemented the missing RotaStatsPanel component.
import React from 'react';
// FIX: Added .ts extension to import path
import { Shift, Employee } from '../types.ts';
// FIX: Added .tsx extension to import path
import { BarChart2Icon } from './icons.tsx';

interface RotaStatsPanelProps {
    shifts: Shift[];
    employees: Employee[];
}

export const RotaStatsPanel: React.FC<RotaStatsPanelProps> = ({ shifts, employees }) => {
    const totalHours = shifts.reduce((acc, shift) => {
        const duration = (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60 * 60);
        const paidHours = duration - (shift.unpaidBreakMinutes / 60);
        return acc + paidHours;
    }, 0);

    const totalCost = shifts.reduce((acc, shift) => {
        const employee = employees.find(e => e.id === shift.employeeId);
        if (!employee) return acc;

        const duration = (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60 * 60);
        const paidHours = duration - (shift.unpaidBreakMinutes / 60);
        
        if (employee.payType === 'hourly' && employee.hourlyRate) {
            return acc + (paidHours * employee.hourlyRate);
        }
        // Simplified salary calculation
        if (employee.payType === 'salary' && employee.annualSalary) {
            const hourlyEquiv = employee.annualSalary / 52 / (employee.contractedHours || 40);
            return acc + (paidHours * hourlyEquiv);
        }
        return acc;
    }, 0);

    const unassignedShifts = shifts.filter(s => !s.employeeId).length;
    const totalShifts = shifts.length;
    
    const stats = [
        { label: 'Total Hours', value: totalHours.toFixed(1) },
        { label: 'Estimated Cost', value: `£${totalCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
        { label: 'Total Shifts', value: totalShifts },
        { label: 'Unassigned Shifts', value: unassignedShifts },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(stat => (
                <div key={stat.label} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <BarChart2Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
            ))}
        </div>
    );
};
