import React, { useState } from 'react';
import { GeneralSettings } from './settings/GeneralSettings.tsx';
import { SecuritySettings } from './settings/SecuritySettings.tsx';
import { NotificationsSettings } from './settings/NotificationsSettings.tsx';
import { IntegrationsSettings } from './settings/IntegrationsSettings.tsx';
import { TimeLocaleSettings } from './settings/TimeLocaleSettings.tsx';
import { ComplianceSettings } from './settings/ComplianceSettings.tsx';
import { AttendanceSettings } from './settings/AttendanceSettings.tsx';
import { SchedulingSettings } from './settings/SchedulingSettings.tsx';
import { LeaveSettings } from './settings/LeaveSettings.tsx';
import { BackupSettings } from './settings/BackupSettings.tsx';
import { ImportExportSettings } from './settings/DataSettings.tsx';
import { RolesPermissionsSettings } from './settings/RolesPermissionsSettings.tsx';
import { AuditLogSettings } from './settings/AuditLogSettings.tsx';
import { SubscriptionPage } from './SubscriptionPage.tsx';
import { FeatureGatesSettings } from './settings/FeatureGatesSettings.tsx';
import { WorkCalendarSettings } from './settings/WorkCalendarSettings.tsx';
import { TaskPoliciesSettings } from './settings/TaskPoliciesSettings.tsx';
import { ApprovalsSlaSettings } from './settings/ApprovalsSlaSettings.tsx';
import { AiSettings } from './settings/AiSettings.tsx';

type SettingsSection = 'General' | 'Security' | 'Notifications' | 'Integrations' | 'Time & Locale' | 'Compliance' | 'Attendance' | 'Scheduling' | 'Leave' | 'Data' | 'Backups' | 'Roles & Permissions' | 'Audit Log' | 'Subscription' | 'Feature Previews' | 'Work Calendar' | 'Task Policies' | 'Approvals & SLAs' | 'AI';

const sections: SettingsSection[] = ['General', 'Security', 'Notifications', 'Integrations', 'Time & Locale', 'Compliance', 'Attendance', 'Scheduling', 'Leave', 'Data', 'Backups', 'Roles & Permissions', 'Audit Log', 'Subscription', 'Feature Previews', 'Work Calendar', 'Task Policies', 'Approvals & SLAs', 'AI'];

export const SettingsPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('General');
    
    const renderSection = () => {
        switch (activeSection) {
            case 'General': return <GeneralSettings />;
            case 'Security': return <SecuritySettings />;
            case 'Notifications': return <NotificationsSettings />;
            case 'Integrations': return <IntegrationsSettings />;
            case 'Time & Locale': return <TimeLocaleSettings />;
            case 'Compliance': return <ComplianceSettings />;
            case 'Attendance': return <AttendanceSettings />;
            case 'Scheduling': return <SchedulingSettings />;
            case 'Leave': return <LeaveSettings />;
            case 'Data': return <ImportExportSettings />;
            case 'Backups': return <BackupSettings />;
            case 'Roles & Permissions': return <RolesPermissionsSettings />;
            case 'Audit Log': return <AuditLogSettings />;
            case 'Subscription': return <SubscriptionPage />;
            case 'Feature Previews': return <FeatureGatesSettings />;
            case 'Work Calendar': return <WorkCalendarSettings />;
            case 'Task Policies': return <TaskPoliciesSettings />;
            case 'Approvals & SLAs': return <ApprovalsSlaSettings />;
            case 'AI': return <AiSettings />;
            default: return <GeneralSettings />;
        }
    };
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                    <nav className="space-y-1">
                        {sections.map(section => (
                             <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                                    activeSection === section
                                    ? 'bg-gray-200 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {section}
                            </button>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};
