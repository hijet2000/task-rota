import React from 'react';
import { Card } from '../ui.tsx';

export const LatenessHeatmapWidget: React.FC = () => {
    return (
        <Card title="Lateness Heatmap" description="Identifies patterns in late clock-ins by day and time.">
            <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                <p className="text-gray-500">[Heatmap Chart Placeholder]</p>
            </div>
        </Card>
    );
};
