import React, { useState } from 'react';
import { automations } from '../data/automationsData';
import { AutomationRule } from '../types';
import { AutomationRuleCard } from './AutomationRuleCard';
import { AutomationBuilderModal } from './AutomationBuilderModal';
import { Button } from './ui';

export const AutomationsPage: React.FC = () => {
    const [rules, setRules] = useState(automations);
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);

    const handleEdit = (rule: AutomationRule) => {
        setSelectedRule(rule);
        setIsBuilderOpen(true);
    };

    const handleAdd = () => {
        setSelectedRule(null);
        setIsBuilderOpen(true);
    };
    
    const handleToggle = (ruleId: string) => {
        setRules(prev => prev.map(r => r.id === ruleId ? {...r, isEnabled: !r.isEnabled} : r));
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Automations</h1>
                <Button onClick={handleAdd}>Create Rule</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rules.map(rule => (
                    <AutomationRuleCard 
                        key={rule.id} 
                        rule={rule} 
                        onEdit={() => handleEdit(rule)}
                        onToggle={() => handleToggle(rule.id)}
                    />
                ))}
            </div>
            <AutomationBuilderModal 
                isOpen={isBuilderOpen}
                onClose={() => setIsBuilderOpen(false)}
                rule={selectedRule}
            />
        </div>
    );
};