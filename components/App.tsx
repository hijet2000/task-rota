import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore.ts';
import { LoginPage } from './LoginPage.tsx';
import { PwaShell } from './PwaShell.tsx';
import { Sidebar } from './Sidebar.tsx';
import { Header } from './Header.tsx';
import { Router } from './Router.tsx';

// Modal Components
import { AddShiftModal } from './AddShiftModal.tsx';
import { MyShiftsModal } from './MyShiftsModal.tsx';
import { MyAvailabilityModal } from './MyAvailabilityModal.tsx';
import { InboxModal } from './InboxModal.tsx';
import { HelpModal } from './HelpModal.tsx';
import { QuickAddTaskModal } from './QuickAddTaskModal.tsx';
import { RequestLeaveModal } from './RequestLeaveModal.tsx';

const App: React.FC = () => {
    const { 
      isLoggedIn, 
      isPwaMode, 
      modals, 
      hydrateStore,
      isLoading,
      currentPage,
      setCurrentPage,
      openModal,
      closeModal,
      logout,
    } = useAppStore();
    
    useEffect(() => {
        hydrateStore();
    }, [hydrateStore]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-gray-600">Loading TaskForge...</p>
                </div>
            </div>
        );
    }
    
    if (isPwaMode) {
        return <PwaShell />;
    }

    if (!isLoggedIn) {
        return <LoginPage />;
    }
    
    return (
        <div className="h-screen w-screen flex bg-gray-100 font-sans">
            {/* FIX: Wired up component props with state from the Zustand store. */}
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    currentPage={currentPage}
                    onAddShift={() => openModal('isAddShiftOpen')}
                    onQuickAdd={() => openModal('isQuickAddOpen')}
                    onMyShifts={() => openModal('isMyShiftsOpen')}
                    onMyAvailability={() => openModal('isMyAvailabilityOpen')}
                    onInbox={() => openModal('isInboxOpen')}
                    onHelp={() => openModal('isHelpOpen')}
                    onLogout={logout}
                />
                <main className="flex-1 overflow-y-auto">
                    <Router currentPage={currentPage} onOpenRequestLeave={() => openModal('isRequestLeaveOpen')} />
                </main>
            </div>
            
            {/* Global Modals managed by Zustand store */}
            <AddShiftModal isOpen={modals.isAddShiftOpen} onClose={() => closeModal('isAddShiftOpen')} />
            <MyShiftsModal isOpen={modals.isMyShiftsOpen} onClose={() => closeModal('isMyShiftsOpen')} />
            <MyAvailabilityModal isOpen={modals.isMyAvailabilityOpen} onClose={() => closeModal('isMyAvailabilityOpen')} />
            <InboxModal isOpen={modals.isInboxOpen} onClose={() => closeModal('isInboxOpen')} />
            <HelpModal isOpen={modals.isHelpOpen} onClose={() => closeModal('isHelpOpen')} />
            <QuickAddTaskModal isOpen={modals.isQuickAddOpen} onClose={() => closeModal('isQuickAddOpen')} />
            <RequestLeaveModal isOpen={modals.isRequestLeaveOpen} onClose={() => closeModal('isRequestLeaveOpen')} />
        </div>
    );
};

export default App;