



import React, { useState } from 'react';
import { Card, Input, Select, Button, ToggleSwitch } from '../ui';
import { getSettings, updateSettings, AttendanceSettingsData } from '../../lib/settings';

export const AttendanceSettings: React.FC = () => {
    const [attendanceSettings, setAttendanceSettings] = useState<AttendanceSettingsData>(getSettings().attendance);

    const handleToggle = (key: keyof AttendanceSettingsData) => {
        setAttendanceSettings(prev => ({...prev, [key]: !prev[key]}));
    };

    const handleSave = () => {
        updateSettings({ attendance: attendanceSettings });
        alert('Settings saved!');
    };

  return (
    <div className="space-y-6">
      <Card
        title="Clock-in Methods"
        description="Select the methods your employees can use to clock in and out."
        footer={<Button onClick={handleSave}>Save Changes</Button>}
      >
        <ToggleSwitch label="Mobile App (with GPS)" enabled={attendanceSettings.allowMobile} setEnabled={() => handleToggle('allowMobile')}/>
        <ToggleSwitch label="Web Browser" enabled={attendanceSettings.allowBrowser} setEnabled={() => handleToggle('allowBrowser')} />
        <ToggleSwitch label="Shared Kiosk" enabled={attendanceSettings.allowKiosk} setEnabled={() => handleToggle('allowKiosk')}/>
        <ToggleSwitch label="QR Code Scanning" enabled={attendanceSettings.allowQrCode} setEnabled={() => handleToggle('allowQrCode')}/>
        <div className="p-3 bg-gray-50 rounded-md border text-sm text-gray-600">
            <p className="font-medium">Coming Soon</p>
            <ul className="list-disc list-inside mt-1 text-gray-500">
                <li>RFID/NFC Tags</li>
                <li>Biometric Scanners</li>
            </ul>
        </div>
      </Card>
      
      <Card
        title="Verification & Alerts"
        description="Configure policies for verifying attendance and detecting issues."
        footer={<Button>Save Changes</Button>}
      >
        <ToggleSwitch 
            label="Require Selfie on Clock-in" 
            enabled={attendanceSettings.requireSelfie} 
            setEnabled={() => handleToggle('requireSelfie')} 
            description="Captures a photo of the employee for verification."
        />
        <ToggleSwitch 
            label="Detect Duplicate Clock-ins" 
            enabled={attendanceSettings.detectDuplicates} 
            setEnabled={() => handleToggle('detectDuplicates')} 
            description="Flag instances where an employee is already clocked in."
        />
        <Input label="Late Clock-in Threshold (minutes)" type="number" defaultValue="5" helperText="Flag clock-ins that occur after this many minutes past the shift start." />
        <Input label="Early Clock-out Threshold (minutes)" type="number" defaultValue="10" helperText="Flag clock-outs that occur more than this many minutes before the shift end." />
      </Card>
    </div>
  );
};
