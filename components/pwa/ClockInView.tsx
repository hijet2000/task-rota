import React from 'react';
// FIX: Added .tsx extension to import path
import { Button } from '../ui.tsx';
// FIX: Added .tsx extension to import path
import { CameraIcon, MapPinIcon } from '../icons.tsx';
// FIX: Added .tsx extension to import path
import { PermissionGate } from './PermissionGate.tsx';
// FIX: Added .ts extension to import path
import { getPermissions } from '../../lib/permissions.ts';

// Mock state for demo
const mockClockInStatus = {
    isClockedIn: false,
    lastClockIn: null,
};

export const ClockInView: React.FC = () => {
    const [status, setStatus] = React.useState(mockClockInStatus);
    const [cameraPermission, setCameraPermission] = React.useState<'prompt' | 'granted' | 'denied'>('prompt');
    const [locationPermission, setLocationPermission] = React.useState<'prompt' | 'granted' | 'denied'>('prompt');
    const { currentUser } = getPermissions();

    const handleClockIn = () => {
        // In a real app, this would require camera/location and send data to a server.
        setStatus({ isClockedIn: true, lastClockIn: new Date().toLocaleTimeString() as any });
    };

    const handleClockOut = () => {
        setStatus({ isClockedIn: false, lastClockIn: status.lastClockIn });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-bold text-lg">Hi, {currentUser?.name}!</h3>
            {status.isClockedIn ? (
                <>
                    <p className="text-green-600 font-semibold my-2">You are clocked in.</p>
                    <p className="text-sm text-gray-500">Started at {status.lastClockIn}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                         <Button variant="secondary">Start Break</Button>
                         <Button onClick={handleClockOut} className="bg-red-500 hover:bg-red-600">Clock Out</Button>
                    </div>
                </>
            ) : (
                 <>
                    <p className="text-gray-600 my-2">You are currently clocked out.</p>
                     <div className="grid grid-cols-2 gap-2 my-4">
                        <PermissionGate 
                            permissionName="Camera"
                            status={cameraPermission}
                            onGrant={() => setCameraPermission('granted')}
                            icon={<CameraIcon className="w-8 h-8 mx-auto text-gray-400" />}
                            description="For photo verification."
                        />
                         <PermissionGate 
                            permissionName="Location"
                            status={locationPermission}
                            onGrant={() => setLocationPermission('granted')}
                            icon={<MapPinIcon className="w-8 h-8 mx-auto text-gray-400" />}
                            description="To verify your location."
                        />
                    </div>
                    <Button onClick={handleClockIn} className="w-full bg-green-500 hover:bg-green-600 text-lg py-3">Clock In</Button>
                </>
            )}
        </div>
    );
};
