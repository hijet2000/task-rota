import React from 'react';
import { Card, Button } from '../ui.tsx';
import { UploadCloudIcon } from '../icons.tsx';

export const TemplatePackImporter: React.FC = () => {
  return (
    <Card
      title="Template Pack Importer"
      description="Import pre-defined sets of task or notification templates from a JSON file."
    >
      <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
        <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Drag and drop a file to upload</h3>
        <p className="mt-1 text-sm text-gray-500">or</p>
        <div className="mt-4">
          <Button variant="secondary">Select File</Button>
        </div>
      </div>
    </Card>
  );
};
