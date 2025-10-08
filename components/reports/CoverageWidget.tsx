import React from 'react';
import { Card } from '../ui.tsx';

export const CoverageWidget: React.FC = () => {
    return (
        <Card title="Coverage vs Demand" description="Compares scheduled staff hours against forecasted demand.">
             <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                <p className="text-gray-500">[Bar Chart Placeholder]</p>
            </div>
        </Card>
    );
};
