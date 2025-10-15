import React, { useState } from 'react';
// FIX: Corrected relative import path for ui.tsx.
import { Card, Button, Input, ToggleSwitch } from '../ui.tsx';
// FIX: Corrected relative import path for icons.tsx.
import { MailIcon, GoogleIcon, MicrosoftIcon, SageIcon, LinkIcon } from '../icons.tsx';
import { useFeatures } from '../../lib/features.ts';

export const IntegrationsSettings: React.FC = () => {
  const [useSsl, setUseSsl] = useState(true);
  const { hasFeature } = useFeatures();
  const integrationsEnabled = hasFeature('integrations');


  return (
    <div className="space-y-6">
       <Card
        title="Calendar & Email"
        description="Integrate with calendars and enable task creation via email."
      >
        <div className="p-3 border rounded-lg">
           <p className="font-medium">Calendar Sync (per user)</p>
           <p className="text-sm text-gray-600 mt-1 mb-4">Sync task due dates and approvals to your personal calendar.</p>
           <div className="space-y-3">
               <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <GoogleIcon className="w-6 h-6" />
                        <span className="font-medium">Google Calendar</span>
                    </div>
                    <Button variant="secondary" disabled={!integrationsEnabled}>Connect</Button>
               </div>
               <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <MicrosoftIcon className="w-6 h-6" />
                        <span className="font-medium">Microsoft Outlook</span>
                    </div>
                    <Button variant="secondary" disabled={!integrationsEnabled}>Connect</Button>
               </div>
               <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <LinkIcon className="w-6 h-6 text-gray-500" />
                        <span className="font-medium">One.com Calendar</span>
                    </div>
                    <Button variant="secondary" disabled={!integrationsEnabled}>Connect</Button>
               </div>
           </div>
        </div>

        <div className="p-3 border rounded-lg bg-gray-50">
           <div className="flex justify-between items-center">
             <p className="font-medium">Email Ingest</p>
             <Button variant="secondary" size="sm" disabled={!integrationsEnabled}>Regenerate</Button>
           </div>
           <p className="text-sm text-gray-600 mt-1">Create tasks by sending an email to a unique address per project.</p>
           <div className="mt-2 text-sm font-mono bg-white p-2 rounded border truncate">
             project-alpha-abc123xyz@tasks.taskforge.app
           </div>
        </div>
      </Card>

      <Card
        title="Messaging Services"
        description="Configure SMTP for email and connect your WhatsApp Business account."
        footer={<Button disabled={!integrationsEnabled}>Save Messaging Settings</Button>}
      >
        <div className="p-3 border rounded-lg">
          <p className="font-medium">SMTP for Outbound Email</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Configure your own SMTP server for sending email notifications.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="SMTP Server Host" placeholder="smtp.example.com" disabled={!integrationsEnabled}/>
            <Input label="SMTP Port" type="number" placeholder="587" disabled={!integrationsEnabled}/>
            <Input label="SMTP Username" placeholder="your_username" disabled={!integrationsEnabled}/>
            <Input label="SMTP Password" type="password" disabled={!integrationsEnabled}/>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="From Address" type="email" placeholder="noreply@yourcompany.com" disabled={!integrationsEnabled}/>
            <ToggleSwitch label="Use SSL/TLS" enabled={useSsl} setEnabled={setUseSsl} disabled={!integrationsEnabled}/>
          </div>
          <div className="mt-4 text-right">
            <Button variant="secondary" disabled={!integrationsEnabled}>Test Connection</Button>
          </div>
        </div>

        <div className="p-3 border rounded-lg mt-4">
          <p className="font-medium">WhatsApp Business API</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Connect your WhatsApp Business account to send notifications. Requires a Meta developer account.
          </p>
          <div className="space-y-4">
            <Input label="API Access Token" type="password" disabled={!integrationsEnabled}/>
            <Input label="Phone Number ID" placeholder="15550987654" disabled={!integrationsEnabled}/>
          </div>
          <div className="mt-4 text-right">
            <Button variant="secondary" disabled={!integrationsEnabled}>Test Connection</Button>
          </div>
        </div>
      </Card>

      <Card
        title="Payroll Integrations"
        description="Connect to your payroll provider to streamline timesheet processing."
      >
        <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded-md bg-gray-50 border">
                <div className="flex items-center space-x-3">
                    <SageIcon className="w-6 h-6" />
                    <div>
                        <span className="font-medium">Sage</span>
                        <p className="text-xs text-gray-500">Sync approved timesheets directly to Sage Payroll.</p>
                    </div>
                </div>
                <Button variant="secondary" disabled={!integrationsEnabled}>Connect</Button>
            </div>
        </div>
      </Card>

      <Card
        title="Developer API"
        description="Manage Personal Access Tokens (PATs) and webhooks for custom integrations."
      >
         <div className="flex justify-between items-center p-3 border rounded-lg">
            <p className="truncate">Personal Access Tokens (PATs)</p>
            <Button variant="secondary" disabled={!integrationsEnabled}>Manage Tokens</Button>
        </div>
         <div className="flex justify-between items-center p-3 border rounded-lg">
            <p>Webhooks</p>
            <Button variant="secondary" disabled={!integrationsEnabled}>Configure Webhooks</Button>
        </div>
        <p className="text-xs text-gray-500 pt-2">Webhooks can be linked to Rota/Timekeeping events for advanced automation.</p>
      </Card>
    </div>
  );
};