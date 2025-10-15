

import React, { useState } from 'react';
import { TenantList } from './admin/TenantList';
import { SystemAuditLog } from './admin/SystemAuditLog';
import { GdprTools } from './admin/GdprTools';

type AdminTab = 'Tenants' | 'Audit Log' | 'GDPR Tools';

export const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('Tenants');

    const renderContent = () => {
        switch (activeTab) {
            case 'Tenants':
                return <TenantList />;
            case 'Audit Log':
                return <SystemAuditLog />;
            case 'GDPR Tools':
                return <GdprTools />;
            default:
                return <TenantList />;
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold">Super Admin</h1>
            <div className="border-b border-gray-200 mt-4">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {(['Tenants', 'Audit Log', 'GDPR Tools'] as AdminTab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-6">
                {renderContent()}
            </div>
        </div>
    );
};