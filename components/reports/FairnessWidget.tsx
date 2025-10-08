import React from 'react';
import { Card } from '../ui.tsx';

export const FairnessWidget: React.FC = () => {
    return (
        <Card title="Fairness & Wellbeing" description="Metrics related to fair scheduling and employee wellbeing.">
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-sm">Weekend Shifts Distribution</span>
                    <span className="font-semibold">Even</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm">Clopening Shifts (Last 30 Days)</span>
                    <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm">Avg. Rest Between Shifts</span>
                    <span className="font-semibold">13.5 hours</span>
                </div>
            </div>
        </Card>
    );
};
