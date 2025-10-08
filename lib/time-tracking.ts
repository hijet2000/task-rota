// This file is a placeholder for time-tracking logic.
// A real implementation would handle time entry calculations, validation, etc.

// FIX: Corrected import path for types.
import { TimeEntry } from '../types.ts';

export const calculateDuration = (startTime: string, endTime: string): number => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    if (isNaN(start) || isNaN(end) || end < start) {
        return 0;
    }
    return (end - start) / 1000; // duration in seconds
};

export const formatDuration = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const groupEntriesByDay = (entries: TimeEntry[]): Record<string, TimeEntry[]> => {
    return entries.reduce((acc, entry) => {
        const day = new Date(entry.startTime).toISOString().split('T')[0];
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(entry);
        return acc;
    }, {} as Record<string, TimeEntry[]>);
};