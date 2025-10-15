
import React, { useState, useMemo } from 'react';
import { RotaGrid } from './RotaGrid.tsx';
import { RotaStatsPanel } from './RotaStatsPanel.tsx';
import { useRotaSchedule } from '../hooks/useRotaSchedule.ts';
import { Button, Select } from './ui.tsx';
import { getPermissions } from '../lib/permissions.ts';
import { useAppStore } from '../store/appStore.ts';

export const RotaPage: React.FC = () => {
    const { employees, shifts, locations } = useAppStore(state => ({
        employees: state.employees,
        shifts: state.shifts,
        locations: state.locations,
    }));
    const { hasPermission } = getPermissions();
    const {
        weekDates,
        shiftsForWeek: allShiftsForWeek,
        headerDateString,
        goToToday,
        nextWeek,
        prevWeek,
    } = useRotaSchedule(shifts, employees);

    // State for filters
    const [locationFilter, setLocationFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Get unique roles for the filter dropdown
    const uniqueRoles = useMemo(() => ['all', ...Array.from(new Set(shifts.map(s => s.role)))], [shifts]);

    // Apply filters to the shifts for the current week
    const shiftsForWeek = useMemo(() => {
        return allShiftsForWeek.filter(shift => {
            const locationMatch = locationFilter === 'all' || shift.locationId === parseInt(locationFilter);
            const roleMatch = roleFilter === 'all' || shift.role === roleFilter;
            const statusMatch = statusFilter === 'all' || (statusFilter === 'published' && shift.isPublished) || (statusFilter === 'unpublished' && !shift.isPublished);
            return locationMatch && roleMatch && statusMatch;
        });
    }, [allShiftsForWeek, locationFilter, roleFilter, statusFilter]);

    // Recalculate schedule data based on filtered shifts
    const scheduleDataForWeek = useMemo(() => {
        // Find all unique employees in the filtered shifts
        const employeeIdsInView = [...new Set(shiftsForWeek.map(s => s.employeeId).filter(id => id !== null))] as number[];

        return employeeIdsInView.map(employeeId => {
            const employeeShifts = shiftsForWeek.filter(s => s.employeeId === employeeId);
            const shiftsByDay = weekDates.map(day => {
                const shiftsOnDay = employeeShifts.filter(s => s.startTime.toDateString() === day.toDateString());
                return shiftsOnDay.length > 0 ? shiftsOnDay : null;
            });
            return { employeeId, shiftsByDay };
        });
    }, [shiftsForWeek, weekDates]);

    const handleClearFilters = () => {
        setLocationFilter('all');
        setRoleFilter('all');
        setStatusFilter('all');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{headerDateString}</h2>
                <div className="flex items-center space-x-2">
                    {hasPermission('manage_employees') && <Button>Publish Rota</Button>}
                    <Button variant="secondary" onClick={prevWeek}>&larr; Prev</Button>
                    <Button variant="secondary" onClick={goToToday}>Today</Button>
                    <Button variant="secondary" onClick={nextWeek}>Next &rarr;</Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <Select label="Location" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                        <option value="all">All Locations</option>
                        {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                    </Select>
                    <Select label="Role" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                        {uniqueRoles.map(role => <option key={role} value={role} className="capitalize">{role === 'all' ? 'All Roles' : role}</option>)}
                    </Select>
                    <Select label="Status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="all">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </Select>
                    <Button variant="secondary" onClick={handleClearFilters}>Clear Filters</Button>
                </div>
            </div>

            <RotaStatsPanel shifts={shiftsForWeek} employees={employees} />
            <RotaGrid weekDates={weekDates} scheduleData={scheduleDataForWeek} employees={employees} />
        </div>
    );
};
