


// FIX: Implemented the missing RotaStatsPanel component.
import React from 'react';
// FIX: Corrected relative import path for types.ts.
import { Shift, Employee } from '../types.ts';
// FIX: Corrected relative import path for icons.tsx.
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
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};