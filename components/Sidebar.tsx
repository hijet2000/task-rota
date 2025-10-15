import React from 'react';
import { HomeIcon, BriefcaseIcon, UsersIcon, MapPinIcon, BellIcon, FileCheck2Icon, BarChart2Icon, SettingsIcon, ShieldIcon, ZapIcon, FolderIcon, MessageSquareIcon, ClockIcon } from './icons';
import { usePermissions } from '../hooks/usePermissions';
import { useFeatures } from '../lib/features';

// A mapping of page names to their icons and paths
const navItems = [
    { name: 'Rota', icon: BriefcaseIcon, path: 'Rota', permission: null, feature: 'rota' },
    { name: 'People', icon: UsersIcon, path: 'People', permission: 'manage_employees', feature: 'people' },
    { name: 'Locations', icon: MapPinIcon, path: 'Locations', permission: 'manage_locations', feature: 'locations' },
    { name: 'Leave', icon: ClockIcon, path: 'Leave', permission: 'manage_leave', feature: 'leave' },
    { name: 'Time Clock', icon: FileCheck2Icon, path: 'Time Clock', permission: null, feature: 'time_clock' },
    { name: 'Timesheets', icon: BarChart2Icon, path: 'Timesheets', permission: 'approve_timesheets', feature: 'timesheets' },
    { name: 'My Work', icon: FolderIcon, path: 'My Work', permission: null, feature: 'my_work' },
    { name: 'Projects', icon: ZapIcon, path: 'Projects', permission: null, feature: 'projects' },
    { name: 'Templates', icon: MessageSquareIcon, path: 'Templates', permission: null, feature: 'templates' },
    { name: 'Notifications', icon: BellIcon, path: 'Notifications', permission: 'manage_settings', feature: 'notifications' },
    { name: 'Reports', icon: BarChart2Icon, path: 'Reports', permission: 'access_reports', feature: 'reports' },
    { name: 'Automations', icon: ZapIcon, path: 'Automations', permission: 'manage_settings', feature: 'automations' },
    { name: 'Integrations', icon: ZapIcon, path: 'Integrations', permission: 'manage_settings', feature: 'integrations' },
    { name: 'Settings', icon: SettingsIcon, path: 'Settings', permission: 'manage_settings', feature: 'settings' },
    { name: 'Admin', icon: ShieldIcon, path: 'Admin', permission: 'is_super_admin', feature: 'admin' },
];

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
    const { hasPermission } = usePermissions();
    const { hasFeature } = useFeatures();
    
    return (
        <aside className="w-56 bg-white border-r flex flex-col">
            <div className="h-16 flex items-center px-4 border-b">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-2"></div>
                <span className="font-bold text-xl">RotaApp</span>
            </div>
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {navItems.map(item => {
                    if ((item.permission && !hasPermission(item.permission)) || (item.feature && !hasFeature(item.feature as any))) {
                        return null;
                    }
                    return (
                        <button
                            key={item.name}
                            onClick={() => setActivePage(item.path)}
                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                activePage === item.path
                                    ? 'bg-gray-200 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.name}</span>
                        </button>
                    )
                })}
            </nav>
        </aside>
    );
};