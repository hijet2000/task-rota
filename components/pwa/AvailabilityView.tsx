import React, { useState, useEffect } from 'react';
import { getPermissions } from '../../lib/permissions.ts';
import { DailyAvailability } from '../../types.ts';
import { AvailabilityEditor } from '../AvailabilityEditor.tsx';
import { Button } from '../ui.tsx';

export const AvailabilityView: React.FC = () => {
    const { currentUser } = getPermissions();
    const [availability, setAvailability] = useState<DailyAvailability[]>([]);

    useEffect(() => {
        if (currentUser) {
            setAvailability(currentUser.availability);
        }
    }, [currentUser]);

    if (!currentUser) return null;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Availability</h2>
            <AvailabilityEditor 
                availability={availability}
                onAvailabilityChange={setAvailability}
            />
            <div className="mt-4">
                <Button className="w-full">Save Changes</Button>
            </div>
        </div>
    );
};
