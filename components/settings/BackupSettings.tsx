
import React from 'react';
// FIX: Added .tsx extension to import path
import { Card, Select, Button } from '../ui.tsx';
// FIX: Imported icons from the central icon library instead of defining them locally.
// FIX: Added .tsx extension to import path
import { HardDriveIcon, ServerIcon, CheckCircleIcon, XCircleIcon } from '../icons.tsx';
// FIX: Added .ts extension to import path
import { backups } from '../../data/backups.ts';

export const BackupSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card
        title="Automated Backups"
        description="Your data is backed up automatically as daily snapshots."
        footer={<Button>Save Changes</Button>}
      >
        <Select label="Backup Retention Policy" defaultValue="90d">
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
            <option value="180d">180 Days</option>
            <option value="1y">1 Year</option>
        </Select>
         <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Backup History</h4>
            <div className="space-y-2 border rounded-lg p-3">
              {backups.map(backup => (
                <div key={backup.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {backup.status === 'Success' ? <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" /> : <XCircleIcon className="w-4 h-4 text-red-500 mr-2" />}
                    <span>{backup.timestamp.toLocaleString()}</span>
                    <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">{backup.type}</span>
                  </div>
                   <span className={`font-medium ${backup.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{backup.status}</span>
                </div>
              ))}
            </div>
        </div>
      </Card>

      <Card
        title="One-Click Tenant Export"
        description="Export a complete snapshot of your tenant data, including all projects, tasks, people, and settings."
      >
        <p className="text-sm text-gray-600">
            You can generate a new snapshot once every 24 hours. This is useful for migrating data or for your own internal compliance and archival needs.
        </p>
        <div className="text-center pt-4">
            <Button>
                <HardDriveIcon className="w-5 h-5 mr-2"/>
                Export Full Tenant Snapshot
            </Button>
        </div>
      </Card>
    </div>
  );
};
