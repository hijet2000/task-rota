
import React from 'react';
// FIX: Added .ts extension to import path
import { leaveRequests } from '../data/leaveRequests.ts';
// FIX: Added .ts extension to import path
import { blackoutDates } from '../data/blackoutDates.ts';
// FIX: Added .tsx extension to import path
import { LeaveRequestQueue } from './LeaveRequestQueue.tsx';
// FIX: Added .tsx extension to import path
import { TeamLeaveCalendar } from './TeamLeaveCalendar.tsx';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';
// FIX: Added .ts extension to import path
import { getPermissions } from '../lib/permissions.ts';

interface LeavePageProps {
    onOpenRequestLeave: () => void;
}

export const LeavePage: React.FC<LeavePageProps> = ({ onOpenRequestLeave }) => {
    const { hasPermission } = getPermissions();
    const pendingRequests = leaveRequests.filter(r => r.status === 'Pending');

    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Leave Management</h1>
                <Button onClick={onOpenRequestLeave}>Request Leave</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <TeamLeaveCalendar requests={leaveRequests} blackoutDates={blackoutDates} />
                </div>
                {hasPermission('manage_leave') && (
                    <div className="lg:col-span-1">
                        <LeaveRequestQueue requests={pendingRequests} />
                    </div>
                )}
            </div>
        </div>
    );
};