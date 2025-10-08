// FIX: Implemented Header component.
import React, { useState } from 'react';
// FIX: Added .tsx extension to import path
import { Button } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { UserMenu } from './UserMenu.tsx';
// FIX: Added .tsx extension to import path
import { SearchResultsModal } from './SearchResultsModal.tsx';
// FIX: Corrected import statement. The icons are now correctly imported from the central icons file.
import { BellIcon, PlusIcon, SearchIcon, HelpCircleIcon } from './icons.tsx';

interface HeaderProps {
    currentPage: string;
    onAddShift: () => void;
    onQuickAdd: () => void;
    onMyShifts: () => void;
    onMyAvailability: () => void;
    onInbox: () => void;
    onHelp: () => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    currentPage,
    onAddShift,
    onQuickAdd,
    onMyShifts,
    onMyAvailability,
    onInbox,
    onHelp,
    onLogout,
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <>
        <header className="bg-white p-4 border-b flex justify-between items-center flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">{currentPage}</h1>
            <div className="flex items-center space-x-4">
                 <button onClick={() => setIsSearchOpen(true)} className="text-gray-500 hover:text-gray-800">
                    <SearchIcon className="w-5 h-5" />
                </button>
                <button onClick={onInbox} className="text-gray-500 hover:text-gray-800 relative">
                    <BellIcon className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </button>
                 <button onClick={onHelp} className="text-gray-500 hover:text-gray-800">
                    <HelpCircleIcon className="w-5 h-5" />
                </button>
                <Button onClick={onQuickAdd} variant="secondary">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Quick Add
                </Button>
                {currentPage === 'Rota' && (
                    <Button onClick={onAddShift}>Add Shift</Button>
                )}
                <UserMenu onMyShifts={onMyShifts} onMyAvailability={onMyAvailability} onLogout={onLogout} />
            </div>
        </header>
        <SearchResultsModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};
