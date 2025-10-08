import React, { useState } from 'react';
// FIX: Added .tsx extension to import path.
import { Button } from './ui.tsx';
// FIX: Added .tsx extension to import path.
import { CameraIcon, CheckCircleIcon } from './icons.tsx';
// FIX: Added .ts extension to import path.
import { locations } from '../data/locations.ts';

export const QrClockIn: React.FC = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);

    const startScan = () => {
        setIsScanning(true);
        setScanResult(null);
        // Simulate a scan after 2 seconds
        setTimeout(() => {
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            setScanResult(`Clock-in successful at ${randomLocation.name}!`);
            setIsScanning(false);
        }, 2000);
    };

    const reset = () => {
        setIsScanning(false);
        setScanResult(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">QR Code Clock-In</h2>
            {isScanning ? (
                <div>
                    <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                        <CameraIcon className="w-16 h-16 text-gray-500" />
                        <div className="absolute top-0 left-0 w-full h-full animate-scan-line bg-green-400"></div>
                        <style>{`
                            @keyframes scan-line-anim {
                                0% { top: -10%; }
                                100% { top: 100%; }
                            }
                            .animate-scan-line {
                                height: 3px;
                                box-shadow: 0 0 10px 1px #00ff00;
                                animation: scan-line-anim 2s infinite ease-in-out;
                            }
                        `}</style>
                    </div>
                    <p className="text-gray-500">Scanning...</p>
                </div>
            ) : scanResult ? (
                <div className="text-center p-4 min-h-[280px] flex flex-col justify-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="font-semibold text-lg">{scanResult}</p>
                    <Button onClick={reset} variant="secondary" className="mt-4">Scan Again</Button>
                </div>
            ) : (
                <div className="text-center min-h-[280px] flex flex-col justify-center">
                    <p className="text-gray-500 mb-6">Scan your personal or a location-based QR code to clock in or out.</p>
                    <Button onClick={startScan} size="lg">
                        <CameraIcon className="w-5 h-5 mr-2" />
                        Start Scanning
                    </Button>
                </div>
            )}
        </div>
    );
};