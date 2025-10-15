

import React, { useState } from 'react';
import { Card, Button, ToggleSwitch, Input } from '../ui';

export const ComplianceSettings: React.FC = () => {
  const [wtd, setWtd] = useState(true);
  const [fair, setFair] = useState(true);

  return (
    <div className="space-y-6">
      <Card
        title="Working Time Directive (EU/UK)"
        description="Configure rules to help you comply with working time regulations."
        footer={<Button>Save Changes</Button>}
      >
        <ToggleSwitch 
            label="Enable Working Time Directive Warnings" 
            enabled={wtd} 
            setEnabled={setWtd} 
            description="Show warnings on the rota for potential breaches."
        />
        <Input 
            label="Maximum Weekly Hours" 
            type="number" 
            defaultValue="48" 
            helperText="Average hours an employee can work per week over the reference period." 
        />
        <Input 
            label="Minimum Rest Between Shifts (hours)" 
            type="number" 
            defaultValue="11" 
            helperText="The minimum daily rest period required between shifts." 
        />
      </Card>
      
      <Card
        title="Fair Scheduling & Predictive Pay"
        description="Set up rules for fair scheduling laws (e.g., in NYC, San Francisco)."
        footer={<Button>Save Changes</Button>}
      >
         <ToggleSwitch 
            label="Enable Fair Scheduling Warnings" 
            enabled={fair} 
            setEnabled={setFair} 
            description="Show warnings for last-minute changes or 'clopening' shifts."
        />
        <Input 
            label="Predictive Pay Notice Period (days)" 
            type="number" 
            defaultValue="14" 
            helperText="Minimum notice for schedules. Changes within this period may incur premium pay." 
        />
      </Card>
    </div>
  );
};
