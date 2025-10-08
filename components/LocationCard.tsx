import React from 'react';
// FIX: Added .ts extension to import path
import { Location } from '../types.ts';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { MapPinIcon, PhoneIcon, QrCodeIcon, PencilIcon, TrashIcon } from './icons.tsx';
// FIX: Added .ts extension to import path
import { getPermissions } from '../lib/permissions.ts';

interface LocationCardProps {
    location: Location;
    onEdit: (location: Location) => void;
    onDelete: (locationId: number) => void;
    onShowQr: (location: Location) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onEdit, onDelete, onShowQr }) => {
    const { hasPermission } = getPermissions();
    const canManageLocations = hasPermission('manage_locations');

    return (
        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
            <div className="p-4 flex-grow">
                <h3 className="font-bold text-gray-800">{location.name}</h3>
                <p className="text-sm text-gray-500 font-mono bg-gray-100 inline-block px-2 py-0.5 rounded">{location.code}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                        <MapPinIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{location.address}</span>
                    </div>
                    <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{location.phone}</span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-2 border-t flex justify-end space-x-2">
                <Button variant="secondary" size="sm" onClick={() => onShowQr(location)}>
                    <QrCodeIcon className="w-4 h-4" />
                </Button>
                {canManageLocations && (
                    <>
                        <Button variant="secondary" size="sm" onClick={() => onEdit(location)}>
                            <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="secondary" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => onDelete(location.id)}>
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
