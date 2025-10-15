
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { RotaPage } from './components/RotaPage.tsx';
import { PeoplePage } from './components/PeoplePage.tsx';
import { LocationsPage } from './components/LocationsPage.tsx';
import { SettingsPage } from './components/SettingsPage.tsx';
import { AdminPage } from './components/AdminPage.tsx';
import { TimeClockPage } from './components/TimeClockPage.tsx';
import { TimesheetsPage } from './components/TimesheetsPage.tsx';
import { LeavePage } from './components/LeavePage.tsx';
import { ReportsPage } from './components/ReportsPage.tsx';
import { IntegrationsPage } from './components/IntegrationsPage.tsx';
import { NotificationsPage } from './components/NotificationsPage.tsx';
import { AutomationsPage } from './components/AutomationsPage.tsx';
import { ProjectsPage } from './components/ProjectsPage.tsx';
import { MyWorkPage } from './components/MyWorkPage.tsx';
import { TemplatesPage } from './components/ShiftTemplatesPage.tsx';
import { ProtectedPage } from './components/common/ProtectedPage.tsx';
import { useViewport } from './hooks/useViewport.ts';
import { PwaShell } from './components/PwaShell.tsx';
import { CreateTaskPage } from './components/CreateTaskPage.tsx';

const App: React.FC = () => {
  const { isMobile } = useViewport();
  const [activePage, setActivePage] = useState('Rota');
  const [previousPage, setPreviousPage] = useState('Rota');

  const navigateTo = (page: string) => {
    // Only update previous page if it's not the create task page itself
    // to avoid a loop if the user cancels and then creates again.
    if (activePage !== 'Create Task') {
      setPreviousPage(activePage);
    }
    setActivePage(page);
  };

  if (isMobile) {
    return <PwaShell />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Rota': return <ProtectedPage permission={null} feature="rota" pageTitle="Rota"><RotaPage /></ProtectedPage>;
      case 'People': return <ProtectedPage permission="manage_employees" feature="people" pageTitle="People"><PeoplePage /></ProtectedPage>;
      case 'Locations': return <ProtectedPage permission="manage_locations" feature="locations" pageTitle="Locations"><LocationsPage /></ProtectedPage>;
      case 'Leave': return <ProtectedPage permission={null} feature="leave" pageTitle="Leave"><LeavePage /></ProtectedPage>;
      case 'Time Clock': return <ProtectedPage permission={null} feature="time_clock" pageTitle="Time Clock"><TimeClockPage /></ProtectedPage>;
      case 'Timesheets': return <ProtectedPage permission="approve_timesheets" feature="timesheets" pageTitle="Timesheets"><TimesheetsPage /></ProtectedPage>;
      case 'My Work': return <ProtectedPage permission={null} feature="my_work" pageTitle="My Work"><MyWorkPage /></ProtectedPage>;
      case 'Projects': return <ProtectedPage permission={null} feature="projects" pageTitle="Projects"><ProjectsPage /></ProtectedPage>;
      case 'Templates': return <ProtectedPage permission={null} feature="templates" pageTitle="Templates"><TemplatesPage /></ProtectedPage>;
      case 'Notifications': return <ProtectedPage permission="manage_settings" feature="notifications" pageTitle="Notifications"><NotificationsPage /></ProtectedPage>;
      case 'Reports': return <ProtectedPage permission="access_reports" feature="reports" pageTitle="Reports"><ReportsPage /></ProtectedPage>;
      case 'Automations': return <ProtectedPage permission="manage_settings" feature="automations" pageTitle="Automations"><AutomationsPage /></ProtectedPage>;
      case 'Integrations': return <ProtectedPage permission="manage_settings" feature="integrations" pageTitle="Integrations"><IntegrationsPage /></ProtectedPage>;
      case 'Settings': return <ProtectedPage permission="manage_settings" feature="settings" pageTitle="Settings"><SettingsPage /></ProtectedPage>;
      case 'Admin': return <ProtectedPage permission="is_super_admin" feature="admin" pageTitle="Admin"><AdminPage /></ProtectedPage>;
      case 'Create Task': return <CreateTaskPage onTaskCreated={() => navigateTo('My Work')} onCancel={() => navigateTo(previousPage)} />;
      default: return <ProtectedPage permission={null} feature="rota" pageTitle="Rota"><RotaPage /></ProtectedPage>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={navigateTo} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={activePage} onAddTaskClick={() => navigateTo('Create Task')} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;