// FIX: Implemented the Sidebar component.
import React from 'react';
// FIX: Added .ts extension to import path
import { Page } from '../types.ts';
// FIX: Added .tsx extension to import path
import {
    HomeIcon,
    BriefcaseIcon,
    ClipboardListIcon,
    FileCheck2Icon,
    UsersIcon,
    MapPinIcon,
    CalendarIcon,
    ClockIcon,
    BarChart2Icon,
    ZapIcon,
    FolderIcon,
    BellIcon,
    SettingsIcon,
    ShieldIcon,
} from './icons.tsx';
// FIX: Added .ts extension to import path
import { getPermissions } from '../lib/permissions.ts';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const navItems: { page: Page; icon: React.FC<any>; permission?: string }[] = [
    { page: 'Rota', icon: HomeIcon },
    { page: 'Projects', icon: BriefcaseIcon },
    { page: 'MyWork', icon: ClipboardListIcon },
    { page: 'AllTasks', icon: FileCheck2Icon },
    { page: 'People', icon: UsersIcon, permission: 'manage_employees' },
    { page: 'Locations', icon: MapPinIcon, permission: 'manage_locations' },
    { page: 'Leave', icon: CalendarIcon },
    { page: 'Timesheets', icon: ClockIcon, permission: 'approve_timesheets' },
    { page: 'Reports', icon: BarChart2Icon, permission: 'access_reports' },
];

const settingsNavItems: { page: Page; icon: React.FC<any>; permission?: string }[] = [
    { page: 'Automations', icon: ZapIcon },
    { page: 'Templates', icon: FolderIcon },
    { page: 'Notifications', icon: BellIcon },
    { page: 'Integrations', icon: ZapIcon },
    { page: 'Settings', icon: SettingsIcon, permission: 'manage_settings' },
    { page: 'Admin', icon: ShieldIcon, permission: 'manage_settings' }, // Typically super-admin
];


export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    const { hasPermission } = getPermissions();
    
    const NavLink: React.FC<{ page: Page; icon: React.FC<any> }> = ({ page, icon: Icon }) => {
        const isActive = currentPage === page;
        return (
            <button
                onClick={() => setCurrentPage(page)}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                <Icon className="w-5 h-5 mr-3" />
                <span>{page}</span>
            </button>
        );
    };

    return (
        <aside className="w-64 bg-white p-4 border-r flex flex-col flex-shrink-0">
            <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-2"></div>
                <span className="font-bold text-xl">RotaApp</span>
            </div>
            <nav className="flex-1 space-y-1">
                {navItems.map(item =>
                    (!item.permission || hasPermission(item.permission)) && <NavLink key={item.page} page={item.page} icon={item.icon} />
                )}
            </nav>
            <div className="mt-auto pt-4 border-t">
                <div className="space-y-1">
                    {settingsNavItems.map(item =>
                        (!item.permission || hasPermission(item.permission)) && <NavLink key={item.page} page={item.page} icon={item.icon} />
                    )}
                </div>
            </div>
        </aside>
    );
};
