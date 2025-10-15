

import React, { useState } from 'react';
import { Card, Input, Select, Button, ToggleSwitch } from '../ui';

export const SchedulingSettings: React.FC = () => {
    const [openShifts, setOpenShifts] = useState(true);
    const [shiftSwapping, setShiftSwapping] = useState(true);
    const [autoApprove, setAutoApprove] = useState(false);

  return (
    <div className="space-y-6">
      <Card
        title="Scheduling Rules"
        description="Set general rules for how schedules are created and managed."
        footer={<Button>Save Changes</Button>}
      >
        <Input label="Default Shift Length (hours)" type="number" defaultValue="8" />
        <Input label="Default Unpaid Break (minutes)" type="number" defaultValue="30" />
        <Input label="Scheduling Notice Period (days)" type="number" defaultValue="14" helperText="The minimum number of days in advance a schedule should be published." />
      </Card>

      <Card
        title="Employee Interactions"
        description="Control how employees can interact with their schedules."
        footer={<Button>Save Changes</Button>}
      >
        <ToggleSwitch label="Enable Open Shifts" enabled={openShifts} setEnabled={setOpenShifts} description="Allow employees to claim unassigned shifts." />
        <ToggleSwitch label="Enable Shift Swapping" enabled={shiftSwapping} setEnabled={setShiftSwapping} description="Allow employees to request to swap shifts with colleagues." />
        <ToggleSwitch label="Auto-approve Shift Swaps" enabled={autoApprove} setEnabled={setAutoApprove} description="Automatically approve swap requests if they meet compliance rules." />
      </Card>

       <Card
        title="Schedule View"
        description="Customize how the rota is displayed to different roles."
        footer={<Button>Save Changes</Button>}
      >
        <Select label="Staff Rota View" defaultValue="personal">
          <option value="personal">View own shifts only</option>
          <option value="location">View all shifts at their location</option>
        </Select>
         <ToggleSwitch label="Show Pay Rates on Rota (Managers Only)" enabled={true} setEnabled={() => {}} description="Display estimated wage costs on the rota for managers." />
      </Card>
    </div>
  );
};
