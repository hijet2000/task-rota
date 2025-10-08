import React from 'react';
// FIX: Added .ts extension to import path
import { Task } from '../../types.ts';

interface CalendarViewProps {
    tasks: Task[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ tasks }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
            <div className="h-96 bg-gray-200 flex items-center justify-center rounded">
                <p className="text-gray-500">[Full Calendar Component Placeholder]</p>
            </div>
            <div>
                <p className="mt-4 font-semibold">Tasks with due dates:</p>
                <ul className="list-disc list-inside">
                    {tasks.filter(t => t.dueDate).map(task => (
                        <li key={task.id}>{task.title} - {task.dueDate}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
