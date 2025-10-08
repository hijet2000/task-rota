
import React from 'react';
import { Button } from '../ui.tsx';

interface PermissionGateProps {
    permissionName: 'Camera' | 'Location';
    status: 'prompt' | 'granted' | 'denied';
    onGrant: () => void;
    icon: React.ReactNode;
    description: string;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ permissionName, status, onGrant, icon, description }) => {
    
    const requestPermission = async () => {
        if (permissionName === 'Camera') {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                onGrant();
            } catch (err) {
                console.error("Camera permission denied by user.");
            }
        }
        if (permissionName === 'Location') {
            try {
                await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                onGrant();
            } catch (err) {
                 console.error("Location permission denied by user.");
            }
        }
    };
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
            {icon}
            <h3 className="text-lg font-bold mt-2">{permissionName} Access</h3>
            <p className="text-sm text-gray-600 my-2">{description}</p>
            {status === 'prompt' && <Button onClick={requestPermission}>Allow Access</Button>}
            {status === 'granted' && <p className="text-sm font-semibold text-green-600">Access Granted</p>}
            {status === 'denied' && <p className="text-sm font-semibold text-red-600">Access Denied. Please enable in browser settings.</p>}
        </div>
    );
};
