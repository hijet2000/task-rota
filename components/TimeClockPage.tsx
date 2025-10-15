

import React from 'react';
import { ClockInPanel } from './ClockInPanel';
import { PhotoReviewQueue } from './PhotoReviewQueue';
import { QrClockIn } from './QrClockIn';
import { timeClockEntries } from '../data/timeClockEntries';
import { usePermissions } from '../hooks/usePermissions';

export const TimeClockPage: React.FC = () => {
    const { hasPermission } = usePermissions();
    const canReviewPhotos = hasPermission('approve_timesheets');
    const photosToReview = timeClockEntries.filter(e => e.photoUrl && !e.isVerified);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-full">
            <h1 className="text-2xl font-bold mb-6">Time Clock & Kiosk</h1>
            <div className={`grid grid-cols-1 ${canReviewPhotos ? 'lg:grid-cols-3' : 'lg:grid-cols-1 justify-center'} gap-8`}>
                <div className={`${!canReviewPhotos ? 'max-w-md mx-auto w-full' : 'lg:col-span-1'} space-y-8`}>
                    <ClockInPanel />
                    <QrClockIn />
                </div>
                {canReviewPhotos && (
                    <div className="lg:col-span-2">
                        <PhotoReviewQueue photos={photosToReview} />
                    </div>
                )}
            </div>
        </div>
    );
};