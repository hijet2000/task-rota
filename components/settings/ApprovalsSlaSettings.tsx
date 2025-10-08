import React, { useState } from 'react';
import { Card, Button, ToggleSwitch, Input, Select } from '../ui.tsx';

const initialSlas = [
    { priority: 'P1 (Urgent)', time: 4, unit: 'hours' },
    { priority: 'P2 (High)', time: 24, unit: 'hours' },
    { priority: 'P3 (Medium)', time: 3, unit: 'days' },
];

export const ApprovalsSlaSettings: React.FC = () => {
  const [slas, setSlas] = useState(initialSlas);
  const [useBusinessHours, setUseBusinessHours] = useState(true);

  return (
    <div className="space-y-6">
      <Card
        title="Approvals & SLAs"
        description="Configure approval workflows and Service Level Agreements for tasks."
        footer={<Button>Save Changes</Button>}
      >
        <Select label="Default Approver Role" defaultValue="Manager">
            <option value="Manager">Manager</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
        </Select>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SLA Definitions</label>
            <div className="space-y-2 p-4 border rounded-md">
                {slas.map((sla, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 items-center">
                        <span className="font-medium text-sm">{sla.priority}</span>
                        <Input label="" type="number" defaultValue={sla.time} />
                        <Select label="" defaultValue={sla.unit}>
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                        </Select>
                    </div>
                ))}
            </div>
        </div>

        <ToggleSwitch 
            label="Use Business-Hour Clock for SLAs" 
            enabled={useBusinessHours} 
            setEnabled={setUseBusinessHours}
            description="SLA timers will only run during the business hours defined in your Work Calendar."
        />
        <ToggleSwitch 
            label="Enable SLA Breach Alerts" 
            enabled={true} 
            setEnabled={() => {}}
            description="Notify approvers when a task is close to breaching its SLA."
        />
      </Card>
    </div>
  );
};
