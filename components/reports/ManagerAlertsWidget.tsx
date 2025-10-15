import React from 'react';
import { Card } from '../ui.tsx';
import { AlertTriangleIcon } from '../icons.tsx';

const alerts = [
    { id: 1, text: 'Bob Williams missed his clock-in today.', type: 'critical' },
    { id: 2, text: '3 shifts have potential WTD compliance issues this week.', type: 'warning' },
    { id: 3, text: 'Timesheets for last week are due for approval.', type: 'info' },
];

export const ManagerAlertsWidget: React.FC = () => {
    return (
        <Card title="Manager Alerts" description="Active issues that may require your attention.">
            <div className="space-y-3">
                {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start">
                        <AlertTriangleIcon className={`w-5 h-5 mr-3 mt-0.5 ${alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'}`} />
                        <p className="text-sm text-gray-700">{alert.text}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};
