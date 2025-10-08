

import React, { useState } from 'react';
// FIX: Added .ts extension to import path
import { employees, shifts } from '../data/mockData.ts';
// FIX: Corrected import to get Timesheet from types.ts
import { generateTimesheets } from '../lib/payroll.ts';
import { Timesheet } from '../types.ts';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { TimesheetDetailModal } from './TimesheetDetailModal.tsx';
// FIX: Added .tsx extension to import path
import { PayrollExportModal } from './PayrollExportModal.tsx';

export const TimesheetsPage: React.FC = () => {
    const [timesheets, setTimesheets] = useState<Timesheet[]>(generateTimesheets(employees, shifts));
    const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const handleViewDetails = (timesheet: Timesheet) => {
        setSelectedTimesheet(timesheet);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Timesheets</h1>
                <div className="space-x-2">
                    <Button variant="secondary">Approve All</Button>
                    <Button onClick={() => setIsExportModalOpen(true)}>Export for Payroll</Button>
                </div>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay Period</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Hours</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Pay</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {timesheets.map(ts => (
                            <tr key={ts.employeeId}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{ts.employeeName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ts.payPeriod.start.toLocaleDateString()} - {ts.payPeriod.end.toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{ts.totalHours.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">£{ts.totalPay.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{ts.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <Button variant="secondary" size="sm" onClick={() => handleViewDetails(ts)}>View</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <TimesheetDetailModal 
                isOpen={!!selectedTimesheet}
                onClose={() => setSelectedTimesheet(null)}
                timesheet={selectedTimesheet}
            />
            <PayrollExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                timesheets={timesheets.filter(t => t.status === 'Approved' || t.status === 'Pending')}
            />
        </div>
    );
};