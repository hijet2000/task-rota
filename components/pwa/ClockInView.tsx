import React, { useState, useEffect } from 'react';
import { Button } from '../ui';
import { CameraIcon, MapPinIcon } from '../icons';
import { PermissionGate } from './PermissionGate';

export const ClockInView: React.FC = () => {
    const [status, setStatus] = useState<'clocked_out' | 'clocked_in'>('clocked_out');
    const [time, setTime] = useState(new Date());
    const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
    const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClockAction = () => {
        setStatus(prev => prev === 'clocked_in' ? 'clocked_out' : 'clocked_in');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-center mb-4">
                <p className="text-4xl font-bold">{time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-gray-500">{time.toLocaleDateString('en-GB', { weekday: 'long' })}</p>
            </div>
            <Button 
                onClick={handleClockAction}
                className={`w-full text-lg py-3 ${status === 'clocked_in' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
                {status === 'clocked_in' ? 'Clock Out' : 'Clock In'}
            </Button>
            <div className="grid grid-cols-2 gap-2 mt-2">
                 <PermissionGate 
                    permissionName="Camera"
                    status={cameraPermission}
                    onGrant={() => setCameraPermission('granted')}
                    icon={<CameraIcon className="w-8 h-8 mx-auto text-gray-400" />}
                    description="For clock-in photo verification."
                />
                 <PermissionGate 
                    permissionName="Location"
                    status={locationPermission}
                    onGrant={() => setLocationPermission('granted')}
                    icon={<MapPinIcon className="w-8 h-8 mx-auto text-gray-400" />}
                    description="For GPS location verification."
                />
            </div>
        </div>
    );
};