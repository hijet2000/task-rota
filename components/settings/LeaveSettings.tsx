import React from 'react';
import { Card, Input, Button, ToggleSwitch } from '../ui.tsx';

export const LeaveSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card
        title="Leave Settings"
        description="Configure leave policies and accrual rules."
        footer={<Button>Save Changes</Button>}
      >
        <Input label="Default Annual Leave Entitlement (days)" type="number" defaultValue="28" />
        <ToggleSwitch label="Allow Negative Leave Balance" enabled={false} setEnabled={() => {}} description="Allow employees to request more leave than they have accrued." />
      </Card>
    </div>
  );
};
