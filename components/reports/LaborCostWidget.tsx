import React from 'react';
import { Card } from '../ui.tsx';

export const LaborCostWidget: React.FC = () => {
    return (
        <Card title="Labor Cost vs Budget" description="Weekly labor cost compared to your set budget.">
            <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                <p className="text-gray-500">[Line Chart Placeholder]</p>
            </div>
        </Card>
    );
};
