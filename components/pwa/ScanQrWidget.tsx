
import React, { useState } from 'react';
// FIX: Added .tsx extension to import paths.
import { Button } from '../ui.tsx';
import { CameraIcon, CheckCircleIcon } from '../icons.tsx';

export const ScanQrWidget: React.FC = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);

    const startScan = () => {
        setIsScanning(true);
        setScanResult(null);
        // Simulate a scan after 2 seconds
        setTimeout(() => {
            setScanResult(`Task ROT-3 Scanned Successfully!`);
            setIsScanning(false);
        }, 2000);
    };

    const reset = () => {
        setIsScanning(false);
        setScanResult(null);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Scan QR Code</h3>
             {isScanning ? (
                <div className="text-center">
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
                    <p className="text-gray-500">Scanning for a task or location code...</p>
                </div>
            ) : scanResult ? (
                 <div className="text-center p-4 flex flex-col justify-center">
                    <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="font-semibold">{scanResult}</p>
                    <Button onClick={reset} variant="secondary" size="sm" className="mt-2 mx-auto">Scan Another</Button>
                </div>
            ) : (
                <div className="text-center">
                     <p className="text-sm text-gray-600 mb-4">Quickly open a task or clock-in at a location by scanning its QR code.</p>
                     <Button onClick={startScan}>
                        <CameraIcon className="w-5 h-5 mr-2" />
                        Open Scanner
                    </Button>
                </div>
            )}
        </div>
    );
};
