import React from 'react';
// FIX: Added .ts extension to import path
import { Task } from '../../types.ts';

interface TimelineViewProps {
    tasks: Task[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ tasks }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Timeline View (Gantt)</h3>
            <div className="h-96 bg-gray-200 flex items-center justify-center rounded">
                <p className="text-gray-500">[Timeline/Gantt Chart Placeholder]</p>
            </div>
        </div>
    );
};
