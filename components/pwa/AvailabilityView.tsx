import React, { useState } from 'react';
// FIX: Added .tsx extension to import path
import { Button } from '../ui.tsx';
import { getPermissions } from '../../lib/permissions.ts';
// FIX: Added .ts extension to import path
import { DayOfWeek } from '../../types.ts';
// FIX: Added .tsx extension to import path
import { AvailabilityEditor } from '../AvailabilityEditor.tsx';

const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const AvailabilityView: React.FC = () => {
    const { currentUser } = getPermissions();
    
    // Ensure currentUser and availability exist, providing a default structure if not.
    const initialAvailability = currentUser?.availability && currentUser.availability.length === 7
        ? currentUser.availability
        : daysOfWeek.map(d => ({ day: d, periods: [] }));

    const [availability, setAvailability] = useState(initialAvailability);

    const handleSaveChanges = () => {
        // In a real app, this would save to a backend.
        alert('Availability saved!');
    };

    if (!currentUser) {
        return <p>Please log in to set availability.</p>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Set My Availability</h2>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
             <p className="text-sm text-gray-600 mb-4">Set times you are unavailable to work or prefer to work. Any time not covered by a period below is considered fully available.</p>
            <AvailabilityEditor 
                availability={availability}
                onAvailabilityChange={setAvailability}
            />
        </div>
    );
};
