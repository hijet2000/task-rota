
import React, { useState, useRef, useEffect } from 'react';
import { getPermissions } from '../lib/permissions.ts';
import { BriefcaseIcon, CalendarIcon, LogOutIcon } from './icons.tsx';

interface UserMenuProps {
    onMyShifts: () => void;
    onMyAvailability: () => void;
    onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onMyShifts, onMyAvailability, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = getPermissions();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!currentUser) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                        <div className="px-4 py-2 border-b">
                            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                            <p className="text-sm text-gray-500">{currentUser.email}</p>
                        </div>
                        <button onClick={onMyShifts} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           <BriefcaseIcon className="w-4 h-4 mr-2" /> My Shifts
                        </button>
                         <button onClick={onMyAvailability} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           <CalendarIcon className="w-4 h-4 mr-2" /> My Availability
                        </button>
                        <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                           <LogOutIcon className="w-4 h-4 mr-2" /> Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
