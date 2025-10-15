

import React, { useState } from 'react';
import { leaveRequests } from '../data/leaveRequests';
import { blackoutDates } from '../data/blackoutDates';
import { LeaveRequestQueue } from './LeaveRequestQueue';
import { TeamLeaveCalendar } from './TeamLeaveCalendar';
import { RequestLeaveModal } from './RequestLeaveModal';
import { Button } from './ui';
import { usePermissions } from '../hooks/usePermissions';

export const LeavePage: React.FC = () => {
    const { hasPermission } = usePermissions();
    const canManageLeave = hasPermission('manage_leave');

    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    
    const pendingRequests = leaveRequests.filter(r => r.status === 'Pending');

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Leave Management</h1>
                <Button onClick={() => setIsRequestModalOpen(true)}>Request Time Off</Button>
            </div>
            <div className={`grid grid-cols-1 ${canManageLeave ? 'lg:grid-cols-3' : ''} gap-8`}>
                {canManageLeave && (
                    <div className="lg:col-span-1">
                        <LeaveRequestQueue requests={pendingRequests} />
                    </div>
                )}
                <div className={`${canManageLeave ? 'lg:col-span-2' : ''}`}>
                    <TeamLeaveCalendar requests={leaveRequests} blackoutDates={blackoutDates} />
                </div>
            </div>
            <RequestLeaveModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
            />
        </div>
    );
};