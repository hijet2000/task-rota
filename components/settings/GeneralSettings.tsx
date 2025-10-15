



import React, { useState, useRef } from 'react';
import { Card, Input, Button, Select } from '../ui';
import { UploadCloudIcon } from '../icons';

export const GeneralSettings: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>('https://i.pravatar.cc/150?u=org');
  const [faviconPreview, setFaviconPreview] = useState<string | null>('/icon-192x192.png');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        title="General Settings"
        description="Update your organization's display name, logo, favicon and other general details."
        footer={<Button>Save Changes</Button>}
      >
        <Input label="Tenant Name" type="text" defaultValue="The Grand Cafe" />
        
        <div>
            <label className="block text-sm font-medium text-gray-700">Brand Logo</label>
            <div className="mt-1 flex items-center space-x-4">
                <span className="inline-block h-12 w-12 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-gray-200">
                    {logoPreview ? (
                        <img src={logoPreview} alt="Brand Logo Preview" className="h-full w-full object-cover" />
                    ) : (
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </span>
                <input 
                  type="file" 
                  ref={logoInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={(e) => handleFileChange(e, setLogoPreview)} 
                />
                <Button variant="secondary" onClick={() => logoInputRef.current?.click()}>
                    <UploadCloudIcon className="w-4 h-4 mr-2"/>
                    Upload
                </Button>
                {logoPreview && <Button variant="secondary" onClick={() => setLogoPreview(null)}>Remove</Button>}
            </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700">Brand Favicon</label>
            <div className="mt-1 flex items-center space-x-4">
                <span className="inline-block h-8 w-8 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-gray-200">
                    {faviconPreview ? (
                        <img src={faviconPreview} alt="Favicon Preview" className="h-full w-full object-contain" />
                    ) : (
                         <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </span>
                <input 
                  type="file" 
                  ref={faviconInputRef} 
                  className="hidden" 
                  accept="image/png, image/x-icon, image/svg+xml"
                  onChange={(e) => handleFileChange(e, setFaviconPreview)} 
                />
                <Button variant="secondary" onClick={() => faviconInputRef.current?.click()}>
                    <UploadCloudIcon className="w-4 h-4 mr-2"/>
                    Upload
                </Button>
                {faviconPreview && <Button variant="secondary" onClick={() => setFaviconPreview(null)}>Remove</Button>}
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Primary Brand Color" type="color" defaultValue="#3B82F6" className="h-10 p-1" />
            <Input label="Secondary Brand Color" type="color" defaultValue="#10B981" className="h-10 p-1" />
        </div>
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
        <Select label="Default Project Template" defaultValue="default">
            <option value="default">Default Template</option>
            <option value="marketing">Marketing Campaign Template</option>
            <option value="dev">Software Development Template</option>
        </Select>
      </Card>
    </div>
  );
};
