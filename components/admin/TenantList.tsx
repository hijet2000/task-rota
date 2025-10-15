import React from 'react';
// FIX: Corrected relative import path for ui.tsx.
import { Card, Button } from '../ui.tsx';
// FIX: Corrected relative import path for tenants.ts.
import { tenants } from '../../data/tenants.ts';
// FIX: Corrected relative import path for icons.tsx.
import { CheckCircleIcon, AlertCircleIcon } from '../icons.tsx';

export const TenantList: React.FC = () => {
    const statusColors: Record<string, string> = {
        Active: 'bg-green-100 text-green-800',
        Trial: 'bg-blue-100 text-blue-800',
        Suspended: 'bg-red-100 text-red-800',
    };

    const healthBadgeClasses: Record<string, string> = {
        OK: 'bg-green-100 text-green-800',
        Error: 'bg-red-100 text-red-800',
    };

    return (
        <Card
            title="Tenant Management"
            description="View and manage all customer tenants in the system."
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Users</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Health</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tenants.map(tenant => (
                            <tr key={tenant.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.name}</td>
                                {/* FIX: Changed tenant.plan to tenant.planId to match the Tenant type and added capitalize class for display. */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{tenant.planId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.activeUsers}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[tenant.status]}`}>
                                        {tenant.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                     <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${healthBadgeClasses[tenant.health]}`}>
                                        {tenant.health === 'OK' ? (
                                            <CheckCircleIcon className="w-4 h-4 mr-1.5" />
                                        ) : (
                                            <AlertCircleIcon className="w-4 h-4 mr-1.5" />
                                        )}
                                        {tenant.health}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button variant="secondary" size="sm">Manage</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};