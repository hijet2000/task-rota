import React, { useState } from 'react';
import {
    HomeIcon,
    BriefcaseIcon,
    ClipboardListIcon,
    CalendarIcon,
    MailIcon,
} from './icons.tsx';
import { HomeView } from './pwa/HomeView.tsx';
import { MyShiftsView } from './pwa/MyShiftsView.tsx';
import { MyTasksView } from './pwa/MyTasksView.tsx';
import { AvailabilityView } from './pwa/AvailabilityView.tsx';
import { InboxView } from './pwa/MessagesView.tsx';

type PwaView = 'Home' | 'Shifts' | 'Tasks' | 'Availability' | 'Inbox';

const navItems: { view: PwaView, icon: React.FC<any> }[] = [
    { view: 'Home', icon: HomeIcon },
    { view: 'Shifts', icon: BriefcaseIcon },
    { view: 'Tasks', icon: ClipboardListIcon },
    { view: 'Availability', icon: CalendarIcon },
    { view: 'Inbox', icon: MailIcon },
];

export const PwaShell: React.FC = () => {
    const [activeView, setActiveView] = useState<PwaView>('Home');

    const renderView = () => {
        switch (activeView) {
            case 'Home': return <HomeView />;
            case 'Shifts': return <MyShiftsView />;
            case 'Tasks': return <MyTasksView />;
            case 'Availability': return <AvailabilityView />;
            case 'Inbox': return <InboxView />;
            default: return <HomeView />;
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-100 font-sans">
            <header className="bg-white p-4 border-b flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-800">{activeView}</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
                {renderView()}
            </main>

            <footer className="bg-white border-t p-2 flex-shrink-0">
                <nav className="flex justify-around">
                    {navItems.map(item => (
                        <button
                            key={item.view}
                            onClick={() => setActiveView(item.view)}
                            className={`flex flex-col items-center justify-center w-full p-2 rounded-lg ${
                                activeView === item.view ? 'text-blue-600' : 'text-gray-500'
                            }`}
                        >
                            <item.icon className="w-6 h-6" />
                            <span className="text-xs mt-1">{item.view}</span>
                        </button>
                    ))}
                </nav>
            </footer>
        </div>
    );
};
