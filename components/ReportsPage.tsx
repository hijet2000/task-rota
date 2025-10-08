import React from 'react';
import { KpiWidget } from './reports/KpiWidget.tsx';
import { LaborCostWidget } from './reports/LaborCostWidget.tsx';
import { CoverageWidget } from './reports/CoverageWidget.tsx';
import { LatenessHeatmapWidget } from './reports/LatenessHeatmapWidget.tsx';
import { FairnessWidget } from './reports/FairnessWidget.tsx';

export const ReportsPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold">Reports Dashboard</h1>
            <p className="text-gray-600">Key metrics and insights into your team's performance.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <KpiWidget title="Total Hours Scheduled" value="482.5" change="+5%"/>
                <KpiWidget title="Estimated Labor Cost" value="£6,755" change="+7%" status="warning" />
                <KpiWidget title="Average Shift Length" value="7.8h" change="-0.2h" />
                <KpiWidget title="Sick Days This Month" value="3" status="good" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <LaborCostWidget />
                <CoverageWidget />
                <LatenessHeatmapWidget />
                <FairnessWidget />
            </div>
        </div>
    );
};
