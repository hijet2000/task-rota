
import React from 'react';
import { Button, Input, Select } from '../ui.tsx';

export const LeaveView: React.FC = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Request Leave</h2>
            <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                <Select label="Leave Type">
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Unpaid Leave</option>
                </Select>
                 <Input label="Start Date" type="date" />
                 <Input label="End Date" type="date" />
                 <Button className="w-full">Submit Request</Button>
            </div>
            
            <h2 className="text-xl font-bold mt-8 mb-4">My Requests</h2>
             <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p>Annual Leave: Sep 2, 2024 - Sep 6, 2024</p>
                    <p className="text-sm font-semibold text-green-600">Approved</p>
                </div>
                 <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p>Sick Leave: Aug 19, 2024</p>
                    <p className="text-sm font-semibold text-yellow-600">Pending</p>
                </div>
            </div>
        </div>
    );
};
