import React, { useState } from 'react';
import { getPermissions } from '../lib/permissions.ts';
import { HomeView } from './pwa/HomeView.tsx';
import { MyShiftsView } from './pwa/MyShiftsView.tsx';
import { MyTasksView } from './pwa/MyTasksView.tsx';
import { AvailabilityView } from './pwa/AvailabilityView.tsx';
import { InboxView } from './pwa/MessagesView.tsx';
import { ApprovalsView } from './pwa/ApprovalsView.tsx';
import { LeaveView } from './pwa/LeaveView.tsx';
import { HomeIcon, BriefcaseIcon, FileCheck2Icon, CalendarIcon, BellIcon, ShieldCheckIcon, ClockIcon } from './icons.tsx';

type PwaView = 'Home' | 'MyShifts' | 'MyTasks' | 'Availability' | 'Leave' | 'Approvals' | 'Inbox';

const NavItem: React.FC<{
    view: PwaView;
    label: string;
    icon: React.FC<any>;
    activeView: PwaView;
    setActiveView: (view: PwaView) => void;
}> = ({ view, label, icon: Icon, activeView, setActiveView }) => {
    const isActive = activeView === view;
    return (
        <button
            onClick={() => setActiveView(view)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
        >
            <Icon className="w-6 h-6 mb-1" />
            <span>{label}</span>
        </button>
    );
};

export const PwaShell: React.FC = () => {
    const { currentUser, hasPermission } = getPermissions();
    const [activeView, setActiveView] = useState<PwaView>('Home');

    const renderContent = () => {
        switch (activeView) {
            case 'Home': return <HomeView />;
            case 'MyShifts': return <MyShiftsView />;
            case 'MyTasks': return <MyTasksView />;
            case 'Availability': return <AvailabilityView />;
            case 'Leave': return <LeaveView />;
            case 'Approvals': return <ApprovalsView />;
            case 'Inbox': return <InboxView />;
            default: return <HomeView />;
        }
    };
    
    if (!currentUser) {
        return <div className="p-8 text-center">Please log in to the main application first.</div>;
    }

    const navItems = [
        { view: 'Home', label: 'Home', icon: HomeIcon, show: true },
        { view: 'MyShifts', label: 'Shifts', icon: BriefcaseIcon, show: true },
        { view: 'MyTasks', label: 'Tasks', icon: FileCheck2Icon, show: true },
        { view: 'Availability', label: 'Availability', icon: CalendarIcon, show: true },
        { view: 'Leave', label: 'Leave', icon: ClockIcon, show: true },
        { view: 'Approvals', label: 'Approvals', icon: ShieldCheckIcon, show: hasPermission('approve_timesheets') },
        { view: 'Inbox', label: 'Inbox', icon: BellIcon, show: true },
    ].filter(item => item.show);

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col font-sans">
            <header className="bg-white p-4 shadow-sm flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-2"></div>
                <span className="font-bold text-xl">RotaApp</span>
                 <div className="ml-auto flex items-center space-x-2">
                    <span className="text-sm">{currentUser.name}</span>
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                {renderContent()}
            </main>
            <footer className="bg-white shadow-top grid grid-cols-7 border-t">
                 {navItems.map(item => (
                    <NavItem 
                        key={item.view}
                        view={item.view as PwaView} 
                        label={item.label} 
                        icon={item.icon} 
                        activeView={activeView} 
                        setActiveView={setActiveView as any}
                    />
                ))}
            </footer>
             <style>{`.shadow-top { box-shadow: 0 -2px 4px rgba(0,0,0,0.05); }`}</style>
        </div>
    );
};
