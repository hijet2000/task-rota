

import React from 'react';
// FIX: Corrected relative import path for ui.tsx.
import { Button } from '../ui.tsx';
// FIX: Corrected relative import path for types.ts.
import { Plan } from '../../types.ts';
// FIX: Corrected relative import path for icons.tsx.
import { CheckCircleIcon } from '../icons.tsx';

interface PlanCardProps {
    plan: Plan;
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
                {/* Features for display would be different from feature flags, this is a placeholder */}
                <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" /><span>Up to {plan.userLimit} users</span></li>
                <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" /><span>Basic scheduling</span></li>
                <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" /><span>Time tracking</span></li>
            </ul>
            <div className="mt-8">
                <Button className="w-full" disabled={isCurrent}>
                    {isCurrent ? 'Current Plan' : plan.price > 0 ? 'Upgrade' : 'Contact Sales'}
                </Button>
            </div>
        </div>
    );
};