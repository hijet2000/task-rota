import React from 'react';
// FIX: Added .ts extension to import path
import { tasks as allTasks } from '../../data/tasksData.ts';
// FIX: Added .ts extension to import path
import { getPermissions } from '../../lib/permissions.ts';
// FIX: Added .ts extension to import path
import { employees } from '../../data/mockData.ts';
// FIX: Added .tsx extension to import path
import { Button } from '../ui.tsx';

export const ApprovalsView: React.FC = () => {
    const { currentUser, hasPermission } = getPermissions();

    // Show tasks in review if user is a manager or admin
    const canApprove = hasPermission('approve_timesheets');
    const approvalTasks = canApprove
        ? allTasks.filter(task => task.status === 'In Review')
        : [];
    
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Approvals</h2>
            {approvalTasks.length > 0 ? (
                <div className="space-y-3">
                    {approvalTasks.map(task => {
                        const assignees = employees.filter(e => task.assigneeIds.includes(e.id));
                        return (
                            <div key={task.id} className="bg-white p-3 rounded-lg shadow-sm">
                                <p className="font-bold">{task.title}</p>
                                <p className="text-xs text-gray-500 font-mono">{task.code}</p>
                                <p className="text-sm text-gray-600 mt-1">Submitted by: {assignees.map(a => a.name).join(', ')}</p>
                                <div className="mt-3 flex justify-end space-x-2">
                                    <Button variant="secondary" size="sm" className="bg-red-100 text-red-700">Reject</Button>
                                    <Button size="sm" className="bg-green-100 text-green-700">Approve</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">You have no pending approvals.</p>
                </div>
            )}
        </div>
    );
};