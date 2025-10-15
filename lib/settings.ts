

// FIX: Corrected relative import path for types.ts.
import { Location } from '../types.ts';

type HolidayCalendar = Location['holidayCalendar'];

export interface AttendanceSettingsData {
    allowMobile: boolean;
    allowBrowser: boolean;
    allowKiosk: boolean;
    allowQrCode: boolean;
    requireSelfie: boolean;
    detectDuplicates: boolean;
}

export interface AppSettings {
    holidayCalendar: HolidayCalendar;
    attendance: AttendanceSettingsData;
}

// Default settings
let settings: AppSettings = {
    holidayCalendar: 'UK',
    attendance: {
        allowMobile: true,
        allowBrowser: true,
        allowKiosk: true,
        allowQrCode: true,
        requireSelfie: true,
        detectDuplicates: true,
    },
};

type Listener = (newSettings: AppSettings) => void;
const listeners: Set<Listener> = new Set();

export const subscribeToSettings = (listener: Listener): (() => void) => {
    listeners.add(listener);
    // Return an unsubscribe function
    return () => {
        listeners.delete(listener);
    };
};

const notifyListeners = () => {
    listeners.forEach(listener => listener(settings));
};


export const getSettings = (): AppSettings => {
    // In a real app, this would read from localStorage or a server
    return settings;
};

export const updateSettings = (newSettings: Partial<AppSettings>) => {
    settings = { 
        ...settings, 
        ...newSettings,
        attendance: {
            ...settings.attendance,
            ...newSettings.attendance,
        }
    };
    // In a real app, this would save to localStorage or a server
    console.log('Settings updated:', settings);
    notifyListeners();
};