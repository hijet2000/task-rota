

import React, { useState } from 'react';
import { SearchIcon, BellIcon, HelpCircleIcon, PlusIcon } from './icons';
import { UserMenu } from './UserMenu';
import { SearchResultsModal } from './SearchResultsModal';
import { HelpModal } from './HelpModal';
import { InboxModal } from './InboxModal';
import { Button } from './ui';

interface HeaderProps {
    title: string;
    onAddTaskClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onAddTaskClick }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isInboxOpen, setIsInboxOpen] = useState(false);

    return (
        <>
            <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                <div className="flex items-center space-x-4">
                    <Button onClick={onAddTaskClick}>
                        <PlusIcon className="w-4 h-4 mr-2"/>
                        Create Task
                    </Button>
                    <button aria-label="Search" onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <SearchIcon className="w-6 h-6" />
                    </button>
                    <button aria-label="Notifications" onClick={() => setIsInboxOpen(true)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 relative">
                        <BellIcon className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button aria-label="Help" onClick={() => setIsHelpOpen(true)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <HelpCircleIcon className="w-6 h-6" />
                    </button>
                    <UserMenu />
                </div>
            </header>
            <SearchResultsModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
            <InboxModal isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
        </>
    );
};
