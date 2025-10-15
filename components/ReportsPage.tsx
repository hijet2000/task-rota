import React from 'react';
import { LaborCostWidget } from './reports/LaborCostWidget';
import { CoverageWidget } from './reports/CoverageWidget';
import { KpiWidget } from './reports/KpiWidget';
import { LatenessHeatmapWidget } from './reports/LatenessHeatmapWidget';
import { FairnessWidget } from './reports/FairnessWidget';
import { ShiftTaskDashboardWidget } from './reports/ShiftTaskDashboardWidget';
import { ManagerAlertsWidget } from './reports/ManagerAlertsWidget';

export const ReportsPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <KpiWidget title="Total Hours Scheduled" value="1,240" change="+5%"/>
                <KpiWidget title="Estimated Labor Cost" value="£15,500" change="+7%" status="warning"/>
                <KpiWidget title="Avg. Lateness" value="3.2 mins" change="-10%" status="good"/>
                <KpiWidget title="Shift Task Completion" value="92%" change="+2%" status="good"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                 <LaborCostWidget />
                 <CoverageWidget />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <LatenessHeatmapWidget />
                <ManagerAlertsWidget />
                <div className="space-y-6">
                    <FairnessWidget />
                    <ShiftTaskDashboardWidget />
                </div>
            </div>
        </div>
    );
};