



import React, { useState } from 'react';
import { Card, Button, ToggleSwitch, Input } from '../ui';
import { devices } from '../../data/devices';
import { Device } from '../../types';

export const SecuritySettings: React.FC = () => {
  const [mfa, setMfa] = useState(true);

  return (
    <div className="space-y-6">
      <Card
        title="Security Settings"
        description="Manage your account's security, like password and two-factor authentication."
        footer={<Button>Save Security Settings</Button>}
      >
        <Input label="Current Password" type="password" />
        <Input label="New Password" type="password" />
        <Input label="Confirm New Password" type="password" />
        <hr />
        <ToggleSwitch 
            label="Enable Two-Factor Authentication (2FA)" 
            enabled={mfa} 
            setEnabled={setMfa} 
            description="Add an extra layer of security to your account."
        />
      </Card>

      <Card
        title="Active Sessions"
        description="This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize."
      >
        <div className="space-y-3">
            {devices.map((device: Device) => (
                <div key={device.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                        <p className="font-medium">{device.deviceName}</p>
                        <p className="text-sm text-gray-500">
                            Last seen: {new Date(device.lastSeen).toLocaleString()} &bull; IP: {device.ipAddress}
                        </p>
                    </div>
                    <Button variant="secondary" size="sm">Revoke</Button>
                </div>
            ))}
        </div>
      </Card>
    </div>
  );
};
