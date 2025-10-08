import { useState, useMemo } from 'react';
import { Shift } from '../types.ts';

const getWeekDates = (offset: number): Date[] => {
    const today = new Date();
    // Adjust for week offset
    today.setDate(today.getDate() + offset * 7);
    const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1
    // Calculate the offset to get to the previous Monday
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today.setDate(today.getDate() + mondayOffset));

    // Create an array of 7 dates starting from Monday
    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(monday);
        d.setDate(d.getDate() + i);
        return d;
    });
};

// FIX: Accept shifts as an argument to make the hook reusable.
export const useRotaSchedule = (shifts: Shift[]) => {
    const [weekOffset, setWeekOffset] = useState(0);

    const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

    const shiftsForWeek = useMemo(() => {
        // FIX: Use the passed shifts array instead of mock data.
        return shifts.filter(shift => {
            const shiftDateStr = shift.startTime.toDateString();
            return weekDates.some(weekDate => weekDate.toDateString() === shiftDateStr);
        });
    // FIX: Add shifts to the dependency array.
    }, [weekDates, shifts]);
    
    const headerDateString = useMemo(() => {
        if (weekDates.length < 7) return '';
        const startDate = weekDates[0];
        const endDate = weekDates[6];

        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
        
        return `${startDate.toLocaleDateString('en-GB', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-GB', { ...options, year: 'numeric' })}`;

    }, [weekDates]);

    const goToToday = () => setWeekOffset(0);
    const nextWeek = () => setWeekOffset(prev => prev + 1);
    const prevWeek = () => setWeekOffset(prev => prev - 1);

    return {
        weekDates,
        shiftsForWeek,
        headerDateString,
        goToToday,
        nextWeek,
        prevWeek,
    };
};
