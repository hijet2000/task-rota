
import React from 'react';
// FIX: Added .tsx extension to import path
import { MessageLog } from './MessageLog.tsx';
// FIX: Added .tsx extension to import path
import { TemplateLibrary } from './TemplateLibrary.tsx';

export const NotificationsPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6">Notifications</h1>
            <div className="space-y-8">
                <MessageLog />
                <TemplateLibrary />
            </div>
        </div>
    );
};
