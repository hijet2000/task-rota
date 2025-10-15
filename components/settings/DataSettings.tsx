



import React from 'react';
import { Card, Button } from '../ui';
import { DownloadCloudIcon, UploadCloudIcon } from '../icons';

export const ImportExportSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card
        title="Data Import"
        description="Bulk-add or update projects, tasks, and people using our CSV templates."
      >
        <div className="space-y-3">
             <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                    <p className="font-medium">Projects & Tasks</p>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Download Template</a>
                </div>
                <Button variant="secondary"><UploadCloudIcon className="w-4 h-4 mr-2" /> Upload CSV</Button>
            </div>
             <div className="flex justify-between items-center p-3 border rounded-lg">
                 <div>
                    <p className="font-medium">People</p>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Download Template</a>
                </div>
                <Button variant="secondary"><UploadCloudIcon className="w-4 h-4 mr-2" /> Upload CSV</Button>
            </div>
        </div>
      </Card>
      
      <Card
        title="Data Export"
        description="Export your data in various formats for reporting and archival."
      >
         <div className="space-y-3">
             <div className="flex justify-between items-center p-3 border rounded-lg">
                <p className="font-medium">Project Board</p>
                <div className="space-x-2">
                    <Button variant="secondary" size="sm"><DownloadCloudIcon className="w-4 h-4 mr-2" /> CSV</Button>
                    <Button variant="secondary" size="sm"><DownloadCloudIcon className="w-4 h-4 mr-2" /> PDF</Button>
                </div>
            </div>
             <div className="flex justify-between items-center p-3 border rounded-lg">
                <p className="font-medium">Project Timeline/Gantt</p>
                <div className="space-x-2">
                    <Button variant="secondary" size="sm"><DownloadCloudIcon className="w-4 h-4 mr-2" /> CSV</Button>
                    <Button variant="secondary" size="sm"><DownloadCloudIcon className="w-4 h-4 mr-2" /> PDF</Button>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
};
