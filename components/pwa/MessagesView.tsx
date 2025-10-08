import React from 'react';
import { notificationLogs } from '../../data/notifications.ts';
import { getPermissions } from '../../lib/permissions.ts';

export const InboxView: React.FC = () => {
    const { currentUser } = getPermissions();

    const myNotifications = currentUser 
        ? notificationLogs.filter(n => n.recipientId === currentUser.id)
        : [];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Inbox</h2>
            {myNotifications.length > 0 ? (
                <div className="space-y-3">
                    {myNotifications.map(notification => (
                        <div key={notification.id} className={`p-3 rounded-lg shadow-sm ${!notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-white'}`}>
                            <p className="font-semibold">{notification.templateName}</p>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{notification.channel}</span>
                                <span>{notification.timestamp.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">You have no new notifications.</p>
                </div>
            )}
        </div>
    );
};
