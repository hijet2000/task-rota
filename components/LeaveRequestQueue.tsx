

import React from 'react';
import { LeaveRequest } from '../types';
import { employees } from '../data/mockData';
import { Button } from './ui';

interface LeaveRequestQueueProps {
    requests: LeaveRequest[];
}

export const LeaveRequestQueue: React.FC<LeaveRequestQueueProps> = ({ requests }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Pending Leave Requests</h2>
            {requests.length === 0 ? (
                <p className="text-gray-500">No pending leave requests.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map(request => {
                        const employee = employees.find(e => e.id === request.employeeId);
                        return (
                            <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-semibold">{employee?.name}</p>
                                    <p className="text-sm text-gray-600">{request.startDate.toLocaleDateString()} - {request.endDate.toLocaleDateString()} ({request.type})</p>
                                    {request.notes && <p className="text-xs text-gray-500 mt-1"><em>Note: {request.notes}</em></p>}
                                </div>
                                <div className="space-x-2">
                                    <Button variant="secondary" size="sm" className="bg-red-100 text-red-700">Decline</Button>
                                    <Button size="sm" className="bg-green-100 text-green-700">Approve</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};