import React from 'react';
import { Task } from '../types.ts';
// FIX: Alphabetized icon imports for consistency.
import { ShieldAlertIcon, ShieldCheckIcon, ShieldOffIcon } from './icons.tsx';

interface SlaBadgeProps {
    slaState: Task['slaState'];
    isCompact?: boolean;
}

export const SlaBadge: React.FC<SlaBadgeProps> = ({ slaState, isCompact = false }) => {
    if (!slaState) {
        return null;
    }

    const stateInfo: Record<Task['slaState'], { color: string; text: string; icon: React.FC<any> }> = {
        'On Time': { color: 'bg-green-100 text-green-800', text: 'On Time', icon: ShieldCheckIcon },
        'At Risk': { color: 'bg-yellow-100 text-yellow-800', text: 'At Risk', icon: ShieldAlertIcon },
        'Breached': { color: 'bg-red-100 text-red-800', text: 'Breached', icon: ShieldOffIcon },
    };
    
    const info = stateInfo[slaState];
    if (!info) return null;

    const Icon = info.icon;

    if (isCompact) {
         return (
            <span className={`p-1 rounded-full ${info.color}`} title={`SLA: ${info.text}`}>
                <Icon className="w-4 h-4" />
            </span>
        );
    }

    return (
        <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${info.color}`}>
            <Icon className="w-4 h-4 mr-1" />
            {info.text}
        </span>
    );
};