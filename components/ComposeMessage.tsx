
import React from 'react';
// FIX: Added .tsx extension to import path
import { Button, Input, Select } from './ui.tsx';

export const ComposeMessage: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Compose Message</h3>
            <div className="space-y-4">
                <Select label="To">
                    <option>All Staff</option>
                    <option>Managers</option>
                    <option>Location: The Grand Cafe - Downtown</option>
                </Select>
                <Input label="Subject" />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea rows={5} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <div className="text-right">
                    <Button>Send Message</Button>
                </div>
            </div>
        </div>
    );
};
