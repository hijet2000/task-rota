import React from 'react';
import { CurrentPlanCard } from './billing/CurrentPlanCard.tsx';
import { PlanCard } from './billing/PlanCard.tsx';
import { BillingHistoryTable } from './billing/BillingHistoryTable.tsx';
import { plans } from '../data/billing.ts';

export const SubscriptionPage: React.FC = () => {
    // Assuming the user is on the "Pro" plan for this demo
    const currentPlan = plans.find(p => p.id === 'pro')!;

    return (
        <div className="space-y-8">
            <CurrentPlanCard plan={currentPlan} activeUsers={8} />
            
            <div>
                <h2 className="text-xl font-bold mb-4">Upgrade your plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {plans.filter(p => p.id !== 'free' && p.id !== currentPlan.id).map(plan => (
                        <PlanCard key={plan.id} plan={plan} isCurrent={false} />
                    ))}
                </div>
            </div>

            <BillingHistoryTable />
        </div>
    );
};
