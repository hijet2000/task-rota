import React, { useState } from 'react';
import { GeneralSettings } from './settings/GeneralSettings.tsx';
import { SchedulingSettings } from './settings/SchedulingSettings.tsx';
import { RolesPermissionsSettings } from './settings/RolesPermissionsSettings.tsx';
import { LeaveSettings } from './settings/LeaveSettings.tsx';
import { ComplianceSettings } from './settings/ComplianceSettings.tsx';
import { AttendanceSettings } from './settings/AttendanceSettings.tsx';
import { NotificationsSettings } from './settings/NotificationsSettings.tsx';
import { IntegrationsSettings } from './settings/IntegrationsSettings.tsx';
import { ImportExportSettings } from './settings/DataSettings.tsx';
import { SecuritySettings } from './settings/SecuritySettings.tsx';
import { BackupSettings } from './settings/BackupSettings.tsx';
import { AuditLogSettings } from './settings/AuditLogSettings.tsx';
import { SubscriptionPage } from './SubscriptionPage.tsx';
import { FeatureGatesSettings } from './settings/FeatureGatesSettings.tsx';
import { WorkCalendarSettings } from './settings/WorkCalendarSettings.tsx';
import { TaskPoliciesSettings } from './settings/TaskPoliciesSettings.tsx';
import { ApprovalsSlaSettings } from './settings/ApprovalsSlaSettings.tsx';
import { getPermissions } from '../lib/permissions.ts';

type SettingsTab = 'General' | 'Scheduling' | 'Roles' | 'Attendance' | 'Work Calendar' | 'Tasks' | 'Approvals' | 'Compliance' | 'Notifications' | 'Integrations' | 'Security' | 'Data' | 'Backups' | 'Audit Log' | 'Billing' | 'Features';

export const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('General');
    const { hasPermission } = getPermissions();

    const tabs: { name: SettingsTab, component: React.ReactNode, condition: boolean }[] = [
        { name: 'General', component: <GeneralSettings />, condition: true },
        { name: 'Scheduling', component: <SchedulingSettings />, condition: true },
        { name: 'Work Calendar', component: <WorkCalendarSettings />, condition: true },
        { name: 'Tasks', component: <TaskPoliciesSettings />, condition: true },
        { name: 'Approvals', component: <ApprovalsSlaSettings />, condition: true },
        { name: 'Attendance', component: <AttendanceSettings />, condition: true },
        { name: 'Compliance', component: <ComplianceSettings />, condition: true },
        { name: 'Notifications', component: <NotificationsSettings />, condition: true },
        { name: 'Roles', component: <RolesPermissionsSettings />, condition: hasPermission('manage_roles') },
        { name: 'Security', component: <SecuritySettings />, condition: hasPermission('manage_settings') },
        { name: 'Integrations', component: <IntegrationsSettings />, condition: hasPermission('manage_settings') },
        { name: 'Data', component: <ImportExportSettings />, condition: hasPermission('manage_settings') },
        { name: 'Backups', component: <BackupSettings />, condition: hasPermission('manage_settings') },
        { name: 'Audit Log', component: <AuditLogSettings />, condition: hasPermission('manage_settings') },
        { name: 'Billing', component: <SubscriptionPage />, condition: hasPermission('manage_billing') },
        { name: 'Features', component: <FeatureGatesSettings />, condition: hasPermission('manage_settings') },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <nav className="flex flex-col space-y-1">
                    {tabs.filter(t => t.condition).map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`px-3 py-2 text-left text-sm font-medium rounded-md ${
                                activeTab === tab.name ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-1 mt-6 md:mt-0">
                {tabs.find(t => t.name === activeTab)?.component}
            </div>
        </div>
    );
};
