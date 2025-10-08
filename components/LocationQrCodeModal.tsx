import React from 'react';
// FIX: Added .ts extension to import path.
import { Location } from '../types.ts';
// FIX: Added .tsx extension to import path.
import { Modal, Button } from './ui.tsx';
import { PrintIcon } from './icons.tsx';

interface LocationQrCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    location: Location | null;
}

export const LocationQrCodeModal: React.FC<LocationQrCodeModalProps> = ({ isOpen, onClose, location }) => {
    if (!location) return null;

    const qrData = JSON.stringify({
        locationId: location.id,
        locationName: location.name,
    });

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=250x250&qzone=1`;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Clock-In QR Code: ${location.name}</title>
                        <style>
                            @media print {
                                body { font-family: sans-serif; text-align: center; margin-top: 50px; }
                                h1 { font-size: 24px; }
                                h2 { font-size: 20px; font-weight: normal; color: #333; }
                                p { font-size: 14px; color: #555; }
                                img { max-width: 100%; height: auto; margin-top: 20px; }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Clock-In/Out QR Code</h1>
                        <h2>${location.name}</h2>
                        <img src="${qrCodeUrl}" alt="QR Code for ${location.name}" />
                        <p>Scan this code to clock in or out at this location.</p>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            // Give image time to load before printing
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`QR Code for ${location.name}`}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button onClick={handlePrint}>
                        <PrintIcon className="w-4 h-4 mr-2" />
                        Print
                    </Button>
                </div>
            }
        >
            <div className="text-center p-4">
                <p className="text-gray-600 mb-4">Display this code for employees to scan with their mobile device to clock in or out at this location.</p>
                <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
                    <img src={qrCodeUrl} alt={`QR Code for ${location.name}`} width="250" height="250" />
                </div>
            </div>
        </Modal>
    );
};