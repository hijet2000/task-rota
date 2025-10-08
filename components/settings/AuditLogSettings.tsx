import React from 'react';
import { Card, Button, Input } from '../ui.tsx';
import { tenantAuditLog } from '../../data/tenantAuditLog.ts';

export const AuditLogSettings: React.FC = () => {
    return (
        <Card
            title="Tenant Audit Log"
            description="A chronological log of all significant activities within your account."
        >
             <div className="flex space-x-2 mb-4">
                <Input label="" placeholder="Filter by user or action..." className="w-full" />
                <Button variant="secondary">Filter</Button>
                <Button variant="secondary">Export Log</Button>
            </div>
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tenantAuditLog.map(log => (
                            <tr key={log.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">
                                    <p>IP: {log.details.ip}</p>
                                    <p>Device: {log.details.device}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
