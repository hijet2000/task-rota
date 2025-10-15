


import React from 'react';
import { Card, Select, Button } from '../ui';

export const TimeLocaleSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card
        title="Time & Locale Settings"
        description="Set formats for time, date, and numbers."
        footer={<Button>Save Changes</Button>}
      >
        <Select label="Timezone" defaultValue="Europe/London">
          <option>Europe/London</option>
          <option>Africa/Johannesburg</option>
          <option>Africa/Harare</option>
          <option>America/New_York</option>
        </Select>
        <Select label="Week Starts On" defaultValue="Monday">
          <option>Sunday</option>
          <option>Monday</option>
        </Select>
      </Card>
    </div>
  );
};
