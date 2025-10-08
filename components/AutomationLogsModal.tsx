
import React from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button } from './ui.tsx';

interface AutomationLogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    ruleName: string;
}

// Mock data for display
const mockLogs = [
    { id: 1, timestamp: new Date().toISOString(), status: 'Success', details: 'Sent email to manager@example.com' },
    { id: 2, timestamp: new Date(Date.now() - 60000 * 5).toISOString(), status: 'Success', details: 'Sent email to manager@example.com' },
    { id: 3, timestamp: new Date(Date.now() - 60000 * 20).toISOString(), status: 'Failed', details: 'Recipient email address was invalid.' },
];

export const AutomationLogsModal: React.FC<AutomationLogsModalProps> = ({ isOpen, onClose, ruleName }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Logs for: ${ruleName}`}
            footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
        >
            <div className="max-h-[60vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockLogs.map(log => (
                            <tr key={log.id}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{log.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
};
