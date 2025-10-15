
import React, { useState } from 'react';
import { Location } from '../types.ts';
import { locations as mockLocations } from '../data/locations.ts';
import { LocationCard } from './LocationCard.tsx';
import { LocationForm } from './LocationForm.tsx';
import { LocationQrCodeModal } from './LocationQrCodeModal.tsx';
import { Button } from './ui.tsx';
import { getPermissions } from '../lib/permissions.ts';

export const LocationsPage: React.FC = () => {
    const { hasPermission } = getPermissions();
    const [locations, setLocations] = useState<Location[]>(mockLocations);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const handleAdd = () => {
        setSelectedLocation(null);
        setIsFormOpen(true);
    };

    const handleEdit = (location: Location) => {
        setSelectedLocation(location);
        setIsFormOpen(true);
    };

    const handleShowQr = (location: Location) => {
        setSelectedLocation(location);
        setIsQrModalOpen(true);
    };

    const handleSave = (locationData: Location) => {
        if (selectedLocation) {
            setLocations(locations.map(l => l.id === locationData.id ? locationData : l));
        } else {
            setLocations([...locations, { ...locationData, id: Date.now() }]);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Locations</h1>
                {hasPermission('manage_locations') && <Button onClick={handleAdd}>Add Location</Button>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map(location => (
                    <LocationCard 
                        key={location.id} 
                        location={location} 
                        onEdit={() => handleEdit(location)}
                        onShowQr={() => handleShowQr(location)}
                    />
                ))}
            </div>
            <LocationForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                location={selectedLocation}
            />
            <LocationQrCodeModal
                isOpen={isQrModalOpen}
                onClose={() => setIsQrModalOpen(false)}
                location={selectedLocation}
            />
        </div>
    );
};
