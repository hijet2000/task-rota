

import React from 'react';
// FIX: Added .tsx extension to import path
import { ClockInView } from './ClockInView.tsx';
// FIX: Added .tsx extension to import path
import { QuickAddWidget } from './QuickAddWidget.tsx';
// FIX: Added .tsx extension to import path
import { ScanQrWidget } from './ScanQrWidget.tsx';

export const HomeView: React.FC = () => {
    return (
        <div className="space-y-6">
            <ClockInView />
            <QuickAddWidget />
            <ScanQrWidget />
        </div>
    );
};