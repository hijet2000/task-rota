

import React, { useState } from 'react';
import { Location } from '../types';
import { LocationCard } from './LocationCard';
import { LocationForm } from './LocationForm';
import { LocationQrCodeModal } from './LocationQrCodeModal';
import { Button } from './ui';
import { usePermissions } from '../hooks/usePermissions';
import { useAppStore } from '../store/appStore';

export const LocationsPage: React.FC = () => {
    const { hasPermission } = usePermissions();
    const locations = useAppStore(state => state.locations);
    
    // For demo purposes, UI mutations are handled in local state.
    // A real app would dispatch actions to the store.
    const [localLocations, setLocalLocations] = useState<Location[]>(locations);
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
            setLocalLocations(localLocations.map(l => l.id === locationData.id ? locationData : l));
        } else {
            setLocalLocations([...localLocations, { ...locationData, id: Date.now() }]);
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
                {localLocations.map(location => (
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