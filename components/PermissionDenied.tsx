import React from 'react';
// FIX: Added .tsx extension to import path
import { AlertTriangleIcon } from './icons.tsx';

const PermissionDenied: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-100">
            <AlertTriangleIcon className="w-16 h-16 text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
            <p className="mt-2 text-gray-600">You do not have the required permissions to view this page.</p>
        </div>
    );
};

export default PermissionDenied;
