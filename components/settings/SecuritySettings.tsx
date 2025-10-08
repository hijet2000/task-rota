
import React, { useState } from 'react';
// FIX: Added .tsx extension to import path
import { Card, Input, Select, Button, ToggleSwitch } from '../ui.tsx';
// FIX: Added .tsx extension to import path
import { ShieldCheckIcon, SmartphoneIcon } from '../icons.tsx';
// FIX: Added .ts extension to import path
import { devices } from '../../data/devices.ts';
// FIX: Added .ts extension to import path
import { employees } from '../../data/mockData.ts';

export const SecuritySettings: React.FC = () => {
    const [twoFA, setTwoFA] = useState(true);
    const [restrictGuests, setRestrictGuests] = useState(false);
    const [restrictDownloads, setRestrictDownloads] = useState(true);

  return (
    <div className="space-y-6">
      <Card
        title="Authentication"
        description="Secure user accounts with stronger authentication policies."
        footer={<Button>Save Changes</Button>}
      >
        <ToggleSwitch 
            label="Enforce Two-Factor Authentication (2FA)" 
            enabled={twoFA} 
            setEnabled={setTwoFA} 
            description="All users will be required to set up 2FA on their next login."
        />
        <Select label="Password Policy" defaultValue="medium">
            <option value="simple">Simple (8+ characters)</option>
            <option value="medium">Medium (10+ characters, mixed case, number)</option>
            <option value="strong">Strong (12+ characters, mixed case, number, symbol)</option>
        </Select>
      </Card>
      
      <Card
        title="Access Control & Retention"
        description="Control guest access, session length, and how long audit logs are kept."
        footer={<Button>Save Changes</Button>}
      >
        <ToggleSwitch 
            label="Restrict External Guests" 
            enabled={restrictGuests} 
            setEnabled={setRestrictGuests} 
            description="Prevent members from inviting guests from outside the organization."
        />
        <ToggleSwitch 
            label="Restrict File Downloads for Guests" 
            enabled={restrictDownloads} 
            setEnabled={setRestrictDownloads} 
            description="Prevent guests from downloading file attachments."
        />
        <Select label="Session Timeout Policy" defaultValue="24h">
            <option value="1h">1 Hour</option>
            <option value="8h">8 Hours</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="never">Never</option>
        </Select>
        <Select label="Audit Log Retention" defaultValue="1y">
            <option value="90d">90 Days</option>
            <option value="1y">1 Year</option>
            <option value="3y">3 Years</option>
            <option value="forever">Forever</option>
        </Select>
        <div>
            <label htmlFor="admin-ip-allowlist" className="block text-sm font-medium text-gray-700">
                Admin IP Allowlist
            </label>
            <div className="mt-1">
                <textarea 
                    id="admin-ip-allowlist" 
                    rows={3} 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., 192.168.1.100"
                ></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">
                Restrict Admin/Owner access to specific IP addresses. Leave blank to allow all.
            </p>
        </div>
      </Card>

      <Card
        title="Device Management"
        description="View and manage devices that have accessed your account."
      >
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Seen</th>
                        <th className="relative px-4 py-2"><span className="sr-only">Revoke</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {devices.map(device => {
                        const user = employees.find(e => e.id === device.userId);
                        return (
                            <tr key={device.id}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{user?.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <SmartphoneIcon className="w-4 h-4 mr-2" />
                                    {device.deviceName}
                                  </div>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{new Date(device.lastSeen).toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm">
                                    <Button variant="secondary" size="sm">Revoke</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          </div>
      </Card>
    </div>
  );
};
