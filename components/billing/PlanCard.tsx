import React from 'react';
// FIX: Added .tsx extension to import path.
import { Button } from '../ui.tsx';
// FIX: Added .ts extension to import path.
import { BillingPlan } from '../../types.ts';
// FIX: Added .tsx extension to import path.
import { CheckCircleIcon } from '../icons.tsx';

interface PlanCardProps {
    plan: BillingPlan;
    isCurrent: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isCurrent }) => {
    return (
        <div className={`p-6 rounded-lg border-2 flex flex-col ${isCurrent ? 'border-blue-500' : 'border-gray-200'}`}>
            <h3 className="text-xl font-bold">{plan.name}</h3>
            {plan.price > 0 ? (
                <p className="mt-2 text-gray-600">
                    <span className="text-3xl font-bold">£{plan.price}</span> / user / month
                </p>
            ) : (
                <p className="mt-2 text-3xl font-bold">Custom</p>
            )}
            <ul className="mt-6 space-y-3 text-gray-600 flex-grow">
                {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-8">
                <Button className="w-full" disabled={isCurrent}>
                    {isCurrent ? 'Current Plan' : plan.price > 0 ? 'Upgrade' : 'Contact Sales'}
                </Button>
            </div>
        </div>
    );
};
