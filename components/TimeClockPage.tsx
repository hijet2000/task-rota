
import React from 'react';
// FIX: Added .tsx extension to import path
import { ClockInPanel } from './ClockInPanel.tsx';
// FIX: Added .tsx extension to import path
import { PhotoReviewQueue } from './PhotoReviewQueue.tsx';
// FIX: Added .tsx extension to import path
import { QrClockIn } from './QrClockIn.tsx';
// FIX: Added .ts extension to import path
import { timeClockEntries } from '../data/timeClockEntries.ts';

export const TimeClockPage: React.FC = () => {
    const photosToReview = timeClockEntries.filter(e => e.photoUrl && !e.isVerified);
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-full">
            <h1 className="text-2xl font-bold mb-6">Time Clock & Kiosk</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <ClockInPanel />
                    <QrClockIn />
                </div>
                <div className="lg:col-span-2">
                    <PhotoReviewQueue photos={photosToReview} />
                </div>
            </div>
        </div>
    );
};