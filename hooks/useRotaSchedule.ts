import { useState, useMemo } from 'react';
import { Employee, Shift } from '../types.ts';

const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};

export const useRotaSchedule = (allShifts: Shift[], allEmployees: Employee[]) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const weekDates = useMemo(() => {
        const startOfWeek = getStartOfWeek(currentDate);
        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            return date;
        });
    }, [currentDate]);

    const shiftsForWeek = useMemo(() => {
        const weekStart = weekDates[0];
        const weekEnd = new Date(weekDates[6]);
        weekEnd.setHours(23, 59, 59, 999);
        return allShifts.filter(shift => shift.startTime >= weekStart && shift.startTime <= weekEnd);
    }, [allShifts, weekDates]);

    const scheduleDataForWeek = useMemo(() => {
        const employeeIds = [...new Set(shiftsForWeek.map(s => s.employeeId).filter(id => id !== null))] as number[];
        
        return employeeIds.map(employeeId => {
            const employeeShifts = shiftsForWeek.filter(s => s.employeeId === employeeId);
            const shiftsByDay = weekDates.map(day => {
                const shiftsOnDay = employeeShifts.filter(s => s.startTime.toDateString() === day.toDateString());
                return shiftsOnDay.length > 0 ? shiftsOnDay : null;
            });
            return { employeeId, shiftsByDay };
        });
    }, [shiftsForWeek, weekDates]);
    
    const headerDateString = useMemo(() => {
        const start = weekDates[0];
        const end = weekDates[6];
        if (start.getMonth() === end.getMonth()) {
            return `${start.toLocaleDateString('en-GB', { day: 'numeric' })} - ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
        }
        return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }, [weekDates]);

    const goToToday = () => setCurrentDate(new Date());
    const nextWeek = () => setCurrentDate(d => {
        const newDate = new Date(d);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
    });
    const prevWeek = () => setCurrentDate(d => {
        const newDate = new Date(d);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
    });

    return {
        weekDates,
        shiftsForWeek,
        scheduleDataForWeek,
        headerDateString,
        goToToday,
        nextWeek,
        prevWeek,
    };
};
