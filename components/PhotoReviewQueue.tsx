// FIX: Implemented PhotoReviewQueue component
import React from 'react';
import { Button } from './ui.tsx';
import { TimeClockEntry } from '../types.ts';
import { employees } from '../data/mockData.ts';
import { CheckCircleIcon, XCircleIcon } from './icons.tsx';

interface PhotoReviewQueueProps {
    photos: TimeClockEntry[];
}

export const PhotoReviewQueue: React.FC<PhotoReviewQueueProps> = ({ photos }) => {
    if (photos.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">All Clear!</h2>
                <p className="text-gray-500">There are no clock-in photos to review right now.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Photo Review Queue ({photos.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map(entry => {
                    const employee = employees.find(e => e.id === entry.employeeId);
                    return (
                        <div key={entry.id} className="border rounded-lg overflow-hidden">
                            <img src={entry.photoUrl} alt={`Clock-in for ${employee?.name}`} className="w-full h-48 object-cover" />
                            <div className="p-3">
                                <p className="font-semibold">{employee?.name}</p>
                                <p className="text-xs text-gray-500">{entry.clockIn.toLocaleString()}</p>
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    <Button size="sm" variant="secondary" className="bg-red-50 hover:bg-red-100 text-red-700">
                                        <XCircleIcon className="w-4 h-4 mr-1" /> Reject
                                    </Button>
                                     <Button size="sm" variant="secondary" className="bg-green-50 hover:bg-green-100 text-green-700">
                                        <CheckCircleIcon className="w-4 h-4 mr-1" /> Approve
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
