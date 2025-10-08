
import React from 'react';

interface KpiWidgetProps {
    title: string;
    value: string;
    change?: string;
    status?: 'normal' | 'warning' | 'good';
}

export const KpiWidget: React.FC<KpiWidgetProps> = ({ title, value, change, status = 'normal' }) => {
    const changeColor = change?.startsWith('+') ? 'text-green-600' : 'text-red-600';
    const statusColor = status === 'warning' ? 'text-orange-600' : status === 'good' ? 'text-green-600' : 'text-gray-900';

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <p className={`text-3xl font-semibold ${statusColor}`}>{value}</p>
            {change && <p className={`text-sm ${changeColor}`}>{change} vs previous period</p>}
        </div>
    );
};
