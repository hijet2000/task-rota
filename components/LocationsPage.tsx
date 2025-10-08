import React, { useState } from 'react';
import { Location } from '../types.ts';
import { useAppStore } from '../store/appStore.ts';
import { LocationCard } from './LocationCard.tsx';
import { Button } from './ui.tsx';
import { LocationFormModal } from './LocationForm.tsx';
import { LocationQrCodeModal } from './LocationQrCodeModal.tsx';
import { EmptyState } from './common/EmptyState.tsx';
import { MapPinIcon } from './icons.tsx';

export const LocationsPage: React.FC = () => {
    const { locations, addLocation, updateLocation, deleteLocation } = useAppStore();
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

    const handleDelete = (locationId: number) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            deleteLocation(locationId);
        }
    };
    
    const handleShowQr = (location: Location) => {
        setSelectedLocation(location);
        setIsQrModalOpen(true);
    };

    const handleSave = (locationToSave: Omit<Location, 'id'> | Location) => {
        if ('id' in locationToSave) {
            updateLocation(locationToSave);
        } else {
            addLocation(locationToSave);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Locations</h1>
                {locations.length > 0 && <Button onClick={handleAdd}>Add Location</Button>}
            </div>

            {locations.length === 0 ? (
                <EmptyState
                    icon={<MapPinIcon className="w-12 h-12 text-gray-400" />}
                    title="No locations created"
                    description="Get started by adding your first work location or site."
                    actionText="Add Location"
                    onAction={handleAdd}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {locations.map(location => (
                        <LocationCard 
                            key={location.id} 
                            location={location} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete}
                            onShowQr={handleShowQr}
                        />
                    ))}
                </div>
            )}

            <LocationFormModal 
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
