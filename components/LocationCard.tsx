
import React from 'react';
import { Location } from '../types.ts';
import { MapPinIcon, PhoneIcon, QrCodeIcon, PencilIcon } from './icons.tsx';
import { Button } from './ui.tsx';
import { getPermissions } from '../lib/permissions.ts';

interface LocationCardProps {
    location: Location;
    onEdit: () => void;
    onShowQr: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onEdit, onShowQr }) => {
    const { hasPermission } = getPermissions();

    return (
        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
            <div className="p-4 flex-grow">
                <h3 className="font-bold text-gray-800">{location.name}</h3>
                <p className="text-sm text-gray-500">{location.code}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                        <MapPinIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{location.address}</span>
                    </div>
                    <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <span>{location.phone}</span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-2 border-t flex justify-end space-x-2">
                <Button variant="secondary" size="sm" onClick={onShowQr}>
                    <QrCodeIcon className="w-4 h-4 mr-1" />
                    QR Code
                </Button>
                {hasPermission('manage_locations') && (
                    <Button variant="secondary" size="sm" onClick={onEdit}>
                        <PencilIcon className="w-4 h-4 mr-1" />
                        Edit
                    </Button>
                )}
            </div>
        </div>
    );
};
