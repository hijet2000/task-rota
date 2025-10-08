import React from 'react';
import { Card, Button, Input, Select } from '../ui.tsx';

export const GdprTools: React.FC = () => {
    return (
        <div className="space-y-8">
            <Card
                title="User Data Export"
                description="Export all data associated with a specific user ID in a machine-readable format."
                footer={<Button>Export User Data</Button>}
            >
                <Input label="User ID or Email" type="text" placeholder="e.g., user-123 or charlie@example.com" />
            </Card>

            <Card
                title="Right to be Forgotten"
                description="Anonymize all personally identifiable information (PII) for a specific user. This action is irreversible."
            >
                <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                    <p className="font-bold">Warning!</p>
                    <p className="text-sm">This will permanently delete and anonymize user data. Proceed with extreme caution.</p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                     <Input label="User ID or Email to Anonymize" type="text" />
                     <Button className="bg-red-600 hover:bg-red-700">Initiate Anonymization</Button>
                </div>
            </Card>

            <Card
                title="Data Retention Policies"
                description="Set global policies for how long different types of data are retained."
                footer={<Button>Save Retention Policies</Button>}
            >
                <Select label="Audit Log Retention" defaultValue="3y">
                    <option value="1y">1 Year</option>
                    <option value="3y">3 Years</option>
                    <option value="5y">5 Years</option>
                    <option value="forever">Forever</option>
                </Select>
                 <Select label="Inactive User Data Retention" defaultValue="2y">
                    <option value="1y">1 Year after inactivity</option>
                    <option value="2y">2 Years after inactivity</option>
                    <option value="5y">5 Years after inactivity</option>
                </Select>
            </Card>
        </div>
    );
};
