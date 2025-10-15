import React from 'react';
import { leaveRequests } from '../../data/leaveRequests.ts';
import { employees } from '../../data/mockData.ts';
import { Button } from '../ui.tsx';

export const ApprovalsView: React.FC = () => {
    const pendingRequests = leaveRequests.filter(r => r.status === 'Pending');

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Approvals</h2>
            <div className="space-y-3">
                {pendingRequests.map(req => {
                    const employee = employees.find(e => e.id === req.employeeId);
                    return (
                        <div key={req.id} className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="font-semibold">{employee?.name} - {req.type} Request</p>
                            <p className="text-sm text-gray-600">{req.startDate.toLocaleDateString()} - {req.endDate.toLocaleDateString()}</p>
                            <div className="mt-2 flex space-x-2">
                                <Button size="sm" variant="secondary" className="bg-red-50 text-red-700">Decline</Button>
                                <Button size="sm" variant="secondary" className="bg-green-50 text-green-700">Approve</Button>
                            </div>
                        </div>
                    );
                })}
                {pendingRequests.length === 0 && <p className="text-gray-500">No pending approvals.</p>}
            </div>
        </div>
    );
};
