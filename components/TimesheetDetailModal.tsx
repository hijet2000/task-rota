


import React from 'react';
// FIX: Corrected relative import path for ui.tsx.
import { Modal, Button } from './ui.tsx';
// FIX: Corrected relative import path for types.ts.
import { Timesheet } from '../types.ts';

interface TimesheetDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    timesheet: Timesheet | null;
}

export const TimesheetDetailModal: React.FC<TimesheetDetailModalProps> = ({ isOpen, onClose, timesheet }) => {
    if (!timesheet) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Timesheet for ${timesheet.employeeName}`}
            footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
        >
            <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                    <p><strong>Pay Period:</strong> {timesheet.payPeriod.start.toLocaleDateString()} - {timesheet.payPeriod.end.toLocaleDateString()}</p>
                    <p className="text-sm"><strong>Total Pay:</strong> £{timesheet.totalPay.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {timesheet.shifts.map(shift => {
                                const duration = (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60 * 60);
                                const paidHours = duration - (shift.unpaidBreakMinutes / 60);
                                return (
                                <tr key={shift.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{shift.startTime.toLocaleDateString()}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{shift.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {shift.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{shift.role}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{paidHours.toFixed(2)}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right font-bold text-gray-700">Total Hours</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900">{timesheet.totalHours.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Modal>
    );
};