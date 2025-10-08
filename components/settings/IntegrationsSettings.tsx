
import React, { useState } from 'react';
// FIX: Added .tsx extension to import path
import { Card, Button, Input, ToggleSwitch } from '../ui.tsx';
// FIX: Added .tsx extension to import path
import { MailIcon, GoogleIcon, MicrosoftIcon, SageIcon } from '../icons.tsx';

export const IntegrationsSettings: React.FC = () => {
  const [useSsl, setUseSsl] = useState(true);

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
                    <Button variant="secondary">Connect</Button>
               </div>
               <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <MicrosoftIcon className="w-6 h-6" />
                        <span className="font-medium">Microsoft Outlook</span>
                    </div>
                    <Button variant="secondary">Connect</Button>
               </div>
           </div>
        </div>

        <div className="p-3 border rounded-lg bg-gray-50">
           <div className="flex justify-between items-center">
             <p className="font-medium">Email Ingest</p>
             <Button variant="secondary" size="sm">Regenerate</Button>
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
        footer={<Button>Save Messaging Settings</Button>}
      >
        <div className="p-3 border rounded-lg">
          <p className="font-medium">SMTP for Outbound Email</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Configure your own SMTP server for sending email notifications.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="SMTP Server Host" placeholder="smtp.example.com" />
            <Input label="SMTP Port" type="number" placeholder="587" />
            <Input label="SMTP Username" placeholder="your_username" />
            <Input label="SMTP Password" type="password" />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="From Address" type="email" placeholder="noreply@yourcompany.com" />
            <ToggleSwitch label="Use SSL/TLS" enabled={useSsl} setEnabled={setUseSsl} />
          </div>
          <div className="mt-4 text-right">
            <Button variant="secondary">Test Connection</Button>
          </div>
        </div>

        <div className="p-3 border rounded-lg mt-4">
          <p className="font-medium">WhatsApp Business API</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Connect your WhatsApp Business account to send notifications. Requires a Meta developer account.
          </p>
          <div className="space-y-4">
            <Input label="API Access Token" type="password" />
            <Input label="Phone Number ID" placeholder="15550987654" />
          </div>
          <div className="mt-4 text-right">
            <Button variant="secondary">Test Connection</Button>
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
                <Button variant="secondary">Connect</Button>
            </div>
        </div>
      </Card>

      <Card
        title="Developer API"
        description="Manage Personal Access Tokens (PATs) and webhooks for custom integrations."
      >
         <div className="flex justify-between items-center p-3 border rounded-lg">
            <p className="truncate">Personal Access Tokens (PATs)</p>
            <Button variant="secondary">Manage Tokens</Button>
        </div>
         <div className="flex justify-between items-center p-3 border rounded-lg">
            <p>Webhooks</p>
            <Button variant="secondary">Configure Webhooks</Button>
        </div>
        <p className="text-xs text-gray-500 pt-2">Webhooks can be linked to Rota/Timekeeping events for advanced automation.</p>
      </Card>
    </div>
  );
};
