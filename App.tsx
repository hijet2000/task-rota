
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useViewport } from './hooks/useViewport';
import { PwaShell } from './components/PwaShell';
import { useAppStore } from './store/appStore';
import { AlertTriangleIcon } from './components/icons';

// Lazy load pages for code splitting and better performance
const RotaPage = lazy(() => import('./components/RotaPage').then(module => ({ default: module.RotaPage })));
const PeoplePage = lazy(() => import('./components/PeoplePage').then(module => ({ default: module.PeoplePage })));
const LocationsPage = lazy(() => import('./components/LocationsPage').then(module => ({ default: module.LocationsPage })));
const SettingsPage = lazy(() => import('./components/SettingsPage').then(module => ({ default: module.SettingsPage })));
const AdminPage = lazy(() => import('./components/AdminPage').then(module => ({ default: module.AdminPage })));
const TimeClockPage = lazy(() => import('./components/TimeClockPage').then(module => ({ default: module.TimeClockPage })));
const TimesheetsPage = lazy(() => import('./components/TimesheetsPage').then(module => ({ default: module.TimesheetsPage })));
const LeavePage = lazy(() => import('./components/LeavePage').then(module => ({ default: module.LeavePage })));
const ReportsPage = lazy(() => import('./components/ReportsPage').then(module => ({ default: module.ReportsPage })));
const IntegrationsPage = lazy(() => import('./components/IntegrationsPage').then(module => ({ default: module.IntegrationsPage })));
const NotificationsPage = lazy(() => import('./components/NotificationsPage').then(module => ({ default: module.NotificationsPage })));
const AutomationsPage = lazy(() => import('./components/AutomationsPage').then(module => ({ default: module.AutomationsPage })));
const ProjectsPage = lazy(() => import('./components/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const MyWorkPage = lazy(() => import('./components/MyWorkPage').then(module => ({ default: module.MyWorkPage })));
const TemplatesPage = lazy(() => import('./components/ShiftTemplatesPage').then(module => ({ default: module.TemplatesPage })));
const CreateTaskPage = lazy(() => import('./components/CreateTaskPage').then(module => ({ default: module.CreateTaskPage })));
const ProtectedPage = lazy(() => import('./components/common/ProtectedPage').then(module => ({ default: module.ProtectedPage })));

const PageLoader: React.FC = () => (
  <div className="flex h-full w-full items-center justify-center p-8">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);


const App: React.FC = () => {
  const { isMobile } = useViewport();
  const [activePage, setActivePage] = useState('Rota');
  const [previousPage, setPreviousPage] = useState('Rota');
  
  // Select state and actions separately for stable references to prevent re-renders
  const isLoading = useAppStore(state => state.isLoading);
  const error = useAppStore(state => state.error);
  const fetchInitialData = useAppStore(state => state.fetchInitialData);

  useEffect(() => {
    fetchInitialData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const navigateTo = (page: string) => {
    if (activePage !== 'Create Task') {
      setPreviousPage(activePage);
    }
    setActivePage(page);
  };

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
          <AlertTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600">Failed to Load Application</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading Application Data...</p>
        </div>
      </div>
    );
  }

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
          <Suspense fallback={<PageLoader />}>
            {renderPage()}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
