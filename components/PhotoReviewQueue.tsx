
import React from 'react';
// FIX: Added .tsx extension to import paths.
import { Button } from './ui.tsx';
// FIX: Added .ts extension to import paths.
import { TimeClockEntry } from '../types.ts';
import { employees } from '../data/mockData.ts';

interface PhotoReviewQueueProps {
    photos: TimeClockEntry[];
}

export const PhotoReviewQueue: React.FC<PhotoReviewQueueProps> = ({ photos }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Photo Verification Queue</h2>
            {photos.length === 0 ? (
                <p className="text-gray-500">No photos to review.</p>
            ) : (
                <div className="space-y-4">
                    {photos.map(entry => {
                        const employee = employees.find(e => e.id === entry.employeeId);
                        return (
                            <div key={entry.id} className="flex items-center p-3 border rounded-lg">
                                <img src={entry.photoUrl} alt="Clock-in" className="w-16 h-16 rounded-md object-cover" />
                                <div className="ml-4 flex-grow">
                                    <p className="font-semibold">{employee?.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {/* FIX: Changed from entry.timestamp to entry.clockIn to match the updated type. */}
                                        Clocked in at {entry.clockIn.toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <Button variant="secondary" size="sm" className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">Reject</Button>
                                    <Button size="sm" className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">Approve</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};
