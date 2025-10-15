


// FIX: Implemented missing payroll logic file.
// FIX: Corrected relative import path for types.ts.
import { Employee, Shift, Timesheet } from '../types.ts';

// This is a mock function to generate timesheets.
// In a real app, this would be more complex, handling pay periods, overtime, etc.
export const generateTimesheets = (employees: Employee[], shifts: Shift[]): Timesheet[] => {
    const timesheets: Timesheet[] = [];
    const today = new Date();
    const payPeriodStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const payPeriodEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    employees.forEach(employee => {
        const employeeShifts = shifts.filter(s => s.employeeId === employee.id);
        if (employeeShifts.length > 0) {
            let totalHours = 0;
            let totalPay = 0;

            employeeShifts.forEach(shift => {
                const durationMs = shift.endTime.getTime() - shift.startTime.getTime();
                const durationHours = durationMs / (1000 * 60 * 60);
                const paidHours = durationHours - (shift.unpaidBreakMinutes / 60);
                totalHours += paidHours;

                if (employee.payType === 'hourly' && employee.hourlyRate) {
                    totalPay += paidHours * employee.hourlyRate;
                }
            });
            
            // For salaried employees, we could calculate an effective hourly rate for reporting
            if (employee.payType === 'salary' && employee.annualSalary) {
                // Simplified calculation for demo purposes
                const weeklySalary = employee.annualSalary / 52;
                totalPay = weeklySalary; // Assume this is a weekly timesheet for simplicity
            }

            timesheets.push({
                employeeId: employee.id,
                employeeName: employee.name,
                payPeriod: { start: payPeriodStart, end: payPeriodEnd },
                shifts: employeeShifts,
                totalHours,
                totalPay,
                status: 'Pending',
            });
        }
    });

    return timesheets;
};