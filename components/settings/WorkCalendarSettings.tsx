
import React, { useState } from 'react';
import { Card, Select, Button, Input } from '../ui.tsx';
import { getSettings, updateSettings } from '../../lib/settings.ts';
// FIX: Added .ts extension to import path
import { Location, DayOfWeek } from '../../types.ts';

type HolidayCalendar = Location['holidayCalendar'];

const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const WorkCalendarSettings: React.FC = () => {
  const [holidayCalendar, setHolidayCalendar] = useState<HolidayCalendar>(getSettings().holidayCalendar);
  const [businessHours, setBusinessHours] = useState(
     daysOfWeek.map(day => ({ day, isOpen: !['Saturday', 'Sunday'].includes(day), openTime: '09:00', closeTime: '17:00' }))
  );

  const handleTimeChange = (day: DayOfWeek, field: 'openTime' | 'closeTime', time: string) => {
    setBusinessHours(prev => prev.map(d => d.day === day ? { ...d, [field]: time } : d));
  };

  const handleToggle = (day: DayOfWeek) => {
    setBusinessHours(prev => prev.map(d => d.day === day ? { ...d, isOpen: !d.isOpen } : d));
  };


  const handleSave = () => {
    updateSettings({ holidayCalendar });
    // In a real app, save business hours too
    alert('Settings saved!');
  };
  
  return (
    <div className="space-y-6">
       <Card
        title="Work Calendar & Holidays"
        description="Set your organization's default working hours and public holiday calendar."
        footer={<Button onClick={handleSave}>Save Changes</Button>}
      >
        <Select label="Public Holiday Calendar" value={holidayCalendar} onChange={(e) => setHolidayCalendar(e.target.value as HolidayCalendar)}>
          <option value="UK">United Kingdom</option>
          <option value="ZA">South Africa</option>
          <option value="ZW">Zimbabwe</option>
        </Select>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Business Hours</label>
            <div className="space-y-2 p-4 border rounded-md">
                {businessHours.map(day => (
                     <div key={day.day} className="grid grid-cols-4 items-center gap-2">
                        <div className="col-span-1">
                            <label className="flex items-center">
                                <input type="checkbox" checked={day.isOpen} onChange={() => handleToggle(day.day)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-sm font-medium text-gray-700">{day.day}</span>
                            </label>
                        </div>
                        <div className="col-span-3 grid grid-cols-2 gap-2">
                            <Input label="" type="time" value={day.openTime} disabled={!day.isOpen} onChange={(e) => handleTimeChange(day.day, 'openTime', e.target.value)} />
                            <Input label="" type="time" value={day.closeTime} disabled={!day.isOpen} onChange={(e) => handleTimeChange(day.day, 'closeTime', e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Card>
    </div>
  );
};
