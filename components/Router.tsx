

import React from 'react';
// FIX: Added .ts extension to import path
import { Page } from '../types.ts';
// FIX: Added .ts extension to import path
import { getPermissions } from '../lib/permissions.ts';

// Import all page components
// FIX: Added .tsx extension to import paths
import { RotaPage } from './RotaPage.tsx';
import { ProjectsPage } from './ProjectsPage.tsx';
import { MyWorkPage } from './MyWorkPage.tsx';
import { CurrentTasksPage } from './CurrentTasksPage.tsx';
import { PeoplePage } from './PeoplePage.tsx';
import { LocationsPage } from './LocationsPage.tsx';
import { LeavePage } from './LeavePage.tsx';
import { TimesheetsPage } from './TimesheetsPage.tsx';
import { ReportsPage } from './ReportsPage.tsx';
import { AutomationsPage } from './AutomationsPage.tsx';
import { TemplatesPage } from './ShiftTemplatesPage.tsx';
import { NotificationsPage } from './NotificationsPage.tsx';
import { IntegrationsPage } from './IntegrationsPage.tsx';
import { SettingsPage } from './SettingsPage.tsx';
import { AdminPage } from './AdminPage.tsx';
import PermissionDenied from './PermissionDenied.tsx';

interface RouterProps {
    currentPage: Page;
    // FIX: Added prop to handle opening the leave request modal.
    onOpenRequestLeave: () => void;
}

const pagePermissions: Partial<Record<Page, string>> = {
    Reports: 'access_reports',
    Admin: 'manage_settings',
    Settings: 'manage_settings',
    People: 'manage_employees',
    Locations: 'manage_locations',
    Timesheets: 'approve_timesheets'
};

export const Router: React.FC<RouterProps> = ({ currentPage, onOpenRequestLeave }) => {
    const { hasPermission } = getPermissions();
    
    const requiredPermission = pagePermissions[currentPage];
    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <PermissionDenied />;
    }

    switch (currentPage) {
        case 'Rota': return <RotaPage />;
        case 'Projects': return <ProjectsPage />;
        case 'MyWork': return <MyWorkPage />;
        case 'AllTasks': return <CurrentTasksPage />;
        case 'People': return <PeoplePage />;
        case 'Locations': return <LocationsPage />;
        // FIX: Passed the onOpenRequestLeave prop to the LeavePage component.
        case 'Leave': return <LeavePage onOpenRequestLeave={onOpenRequestLeave} />;
        case 'Timesheets': return <TimesheetsPage />;
        case 'Reports': return <ReportsPage />;
        case 'Automations': return <AutomationsPage />;
        case 'Templates': return <TemplatesPage />;
        case 'Notifications': return <NotificationsPage />;
        case 'Integrations': return <IntegrationsPage />;
        case 'Settings': return <SettingsPage />;
        case 'Admin': return <AdminPage />;
        default: return <RotaPage />;
    }
};