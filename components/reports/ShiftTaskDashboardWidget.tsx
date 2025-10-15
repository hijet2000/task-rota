import React from 'react';
import { Card } from '../ui.tsx';

export const ShiftTaskDashboardWidget: React.FC = () => {
    return (
        <Card title="Shift Task Completion" description="Tracks the completion rate of required tasks during shifts.">
            <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                <p className="text-gray-500">[Bar Chart showing completion rate by template/role]</p>
            </div>
        </Card>
    );
};
