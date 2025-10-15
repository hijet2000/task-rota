import React from 'react';
// FIX: Corrected relative import path for types.ts.
import { DailyAvailability, AvailabilityPeriod, DayOfWeek } from '../types.ts';
// FIX: Corrected relative import path for ui.tsx.
import { Button, Input, Select } from './ui.tsx';
// FIX: Corrected relative import path for icons.tsx.
import { TrashIcon } from './icons.tsx';

interface AvailabilityEditorProps {
    availability: DailyAvailability[];
    onAvailabilityChange: (newAvailability: DailyAvailability[]) => void;
}

const periodColors: Record<AvailabilityPeriod['type'], string> = {
    preferred: 'border-green-500 bg-green-50',
    unavailable: 'border-red-500 bg-red-50',
};

export const AvailabilityEditor: React.FC<AvailabilityEditorProps> = ({ availability, onAvailabilityChange }) => {

    const handleAddPeriod = (dayIndex: number) => {
        const newAvailability = JSON.parse(JSON.stringify(availability));
        newAvailability[dayIndex].periods.push({ startTime: '09:00', endTime: '17:00', type: 'unavailable' });
        onAvailabilityChange(newAvailability);
    };

    const handleRemovePeriod = (dayIndex: number, periodIndex: number) => {
        const newAvailability = JSON.parse(JSON.stringify(availability));
        newAvailability[dayIndex].periods.splice(periodIndex, 1);
        onAvailabilityChange(newAvailability);
    };

    const handleUpdatePeriod = (dayIndex: number, periodIndex: number, field: keyof AvailabilityPeriod, value: string) => {
        const newAvailability = JSON.parse(JSON.stringify(availability));
        newAvailability[dayIndex].periods[periodIndex][field] = value;
        onAvailabilityChange(newAvailability);
    };

    return (
        <div className="space-y-4">
            {availability.map((daily, dayIndex) => (
                <div key={daily.day} className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-gray-800">{daily.day}</h4>
                        <Button variant="secondary" size="sm" onClick={() => handleAddPeriod(dayIndex)}>
                            + Add Period
                        </Button>
                    </div>
                    {daily.periods.length > 0 ? (
                        <div className="space-y-3">
                            {daily.periods.map((period, periodIndex) => (
                                <div key={periodIndex} className={`p-3 rounded-md border-l-4 ${periodColors[period.type]}`}>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input 
                                                label="From" 
                                                type="time" 
                                                value={period.startTime} 
                                                onChange={e => handleUpdatePeriod(dayIndex, periodIndex, 'startTime', e.target.value)}
                                            />
                                            <Input 
                                                label="To" 
                                                type="time" 
                                                value={period.endTime} 
                                                onChange={e => handleUpdatePeriod(dayIndex, periodIndex, 'endTime', e.target.value)}
                                            />
                                        </div>
                                        <Select 
                                            label="Type" 
                                            value={period.type}
                                            onChange={e => handleUpdatePeriod(dayIndex, periodIndex, 'type', e.target.value as AvailabilityPeriod['type'])}
                                        >
                                            <option value="unavailable">Unavailable</option>
                                            <option value="preferred">Preferred</option>
                                        </Select>
                                        <div className="flex justify-end">
                                            <Button variant="secondary" size="sm" onClick={() => handleRemovePeriod(dayIndex, periodIndex)}>
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-2">Fully Available</p>
                    )}
                </div>
            ))}
        </div>
    );
};