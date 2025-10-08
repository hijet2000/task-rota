
import React from 'react';
import { RotaGrid } from './RotaGrid.tsx';
import { employees, shifts } from '../data/mockData.ts';
import { RotaStatsPanel } from './RotaStatsPanel.tsx';
import { useRotaSchedule } from '../hooks/useRotaSchedule.ts';
import { Button } from './ui.tsx';

export const RotaPage: React.FC = () => {
    const {
        weekDates,
        shiftsForWeek,
        headerDateString,
        goToToday,
        nextWeek,
        prevWeek,
    } = useRotaSchedule(shifts);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{headerDateString}</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="secondary" onClick={prevWeek}>&larr; Prev</Button>
                    <Button variant="secondary" onClick={goToToday}>Today</Button>
                    <Button variant="secondary" onClick={nextWeek}>Next &rarr;</Button>
                </div>
            </div>
            <RotaStatsPanel shifts={shiftsForWeek} employees={employees} />
            <RotaGrid weekDates={weekDates} shifts={shiftsForWeek} employees={employees} />
        </div>
    );
};
