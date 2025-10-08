export interface Coordinates {
    latitude: number;
    longitude: number;
}

// Mock implementation of getting current position
export const getCurrentPosition = (): Promise<Coordinates> => {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    // Default to a location if permission is denied or fails
                    console.warn('Could not get geolocation, using default.', error.message);
                    resolve({ latitude: 51.5074, longitude: -0.1278 }); // London
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser, using default.');
            resolve({ latitude: 51.5074, longitude: -0.1278 }); // London
        }
    });
};

// Haversine formula to calculate distance between two points
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
    const R = 6371e3; // metres
    const φ1 = (coord1.latitude * Math.PI) / 180;
    const φ2 = (coord2.latitude * Math.PI) / 180;
    const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
};
