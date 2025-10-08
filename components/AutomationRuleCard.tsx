import React, { useState } from 'react';
// FIX: Added .ts extension to import path
import { AutomationRule } from '../types.ts';
// FIX: Added .tsx extension to import path
import { Button, ToggleSwitch } from './ui.tsx';
// FIX: Added .tsx extension to import path
import { ZapIcon, PlayIcon, InfoIcon } from './icons.tsx';
// FIX: Added .tsx extension to import path
import { AutomationLogsModal } from './AutomationLogsModal.tsx';

interface AutomationRuleCardProps {
    rule: AutomationRule;
    onEdit: () => void;
    onToggle: () => void;
}

export const AutomationRuleCard: React.FC<AutomationRuleCardProps> = ({ rule, onEdit, onToggle }) => {
    const [isLogsOpen, setIsLogsOpen] = useState(false);
    
    return (
        <>
        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{rule.name}</h3>
                    <ZapIcon className={`w-5 h-5 ${rule.isEnabled ? 'text-green-500' : 'text-gray-300'}`} />
                </div>
                <p className="text-sm text-gray-500 mt-1 h-10">{rule.description}</p>
                <div className="mt-4 text-xs text-gray-400">
                    <p>Runs: {rule.runCount}</p>
                    <p>Last run: {rule.lastRun ? new Date(rule.lastRun).toLocaleString() : 'Never'}</p>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
                <ToggleSwitch label="" enabled={rule.isEnabled} setEnabled={onToggle} />
                <div className="space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => setIsLogsOpen(true)}>Logs</Button>
                    <Button variant="secondary" size="sm" onClick={onEdit}>Edit</Button>
                </div>
            </div>
        </div>
        <AutomationLogsModal 
            isOpen={isLogsOpen}
            onClose={() => setIsLogsOpen(false)}
            ruleName={rule.name}
        />
        </>
    );
};
