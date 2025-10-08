
import React from 'react';

export const ShiftTasksPopover: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-lg rounded-md border">
            <h3 className="font-semibold">Tasks for this Shift</h3>
            <ul className="list-disc list-inside text-sm mt-2">
                <li>Deep clean espresso machine</li>
                <li>Restock front counter</li>
            </ul>
        </div>
    );
};
