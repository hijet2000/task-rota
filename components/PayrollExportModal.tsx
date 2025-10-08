
// FIX: Implemented the missing PayrollExportModal component.
import React from 'react';
// FIX: Added .tsx extension to import path.
import { Modal, Button, Select } from './ui.tsx';
// FIX: Corrected import path for Timesheet type.
import { Timesheet } from '../types.ts';
// FIX: Added .tsx extension to import path.
import { DownloadCloudIcon } from './icons.tsx';

interface PayrollExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    timesheets: Timesheet[];
}

export const PayrollExportModal: React.FC<PayrollExportModalProps> = ({ isOpen, onClose, timesheets }) => {
    
    const handleExport = () => {
        // In a real app, this would trigger a file download.
        console.log(`Exporting ${timesheets.length} timesheets...`);
        alert('Export started! Check your downloads folder (or the console).');
        onClose();
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Export for Payroll"
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleExport}>
                        <DownloadCloudIcon className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                <p>You are about to export timesheet data for <strong>{timesheets.length} employees</strong>.</p>
                <Select label="Select Payroll Provider / Format">
                    <option value="csv">Generic CSV</option>
                    <option value="sage">Sage</option>
                    <option value="xero">Xero</option>
                    <option value="quickbooks">QuickBooks</option>
                </Select>
                 <p className="text-sm text-gray-500">This will mark all selected timesheets as "Exported" and lock them from further editing.</p>
            </div>
        </Modal>
    );
};