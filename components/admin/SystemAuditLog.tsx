import React from 'react';
// FIX: Added .ts extension to import path
import { systemAuditLog } from '../../data/systemAuditLog.ts';
// FIX: Added .tsx extension to import path
import { Card, Button, Input } from '../ui.tsx';

export const SystemAuditLog: React.FC = () => {
    return (
        <Card
            title="System Audit Log"
            description="A chronological log of all significant activities across all tenants."
        >
             <div className="flex space-x-2 mb-4">
                <Input label="" placeholder="Filter by user or action..." className="w-full" />
                <Button variant="secondary">Filter</Button>
                <Button variant="secondary">Export Log</Button>
            </div>
            <div className="overflow-x-auto">
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
                        {systemAuditLog.map(log => (
                            <tr key={log.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">
                                    <p>Tenant: {log.tenantId}</p>
                                    <p>IP: {log.details.ip}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
