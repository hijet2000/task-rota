import React from 'react';
import { CurrentPlanCard } from './billing/CurrentPlanCard.tsx';
import { PlanCard } from './billing/PlanCard.tsx';
import { BillingHistoryTable } from './billing/BillingHistoryTable.tsx';
import { plans as allPlans } from '../data/plans.ts';
import { useFeatures } from '../lib/features.ts';

export const SubscriptionPage: React.FC = () => {
    const { planId } = useFeatures();
    const billingPlans = allPlans; // In a real app, this might come from a different source than feature plans
    const currentPlan = billingPlans.find(p => p.id === planId)!;

    return (
        <div className="space-y-8">
            <CurrentPlanCard plan={currentPlan} activeUsers={8} />
            
            <div>
                <h2 className="text-xl font-bold mb-4">Upgrade your plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {billingPlans.filter(p => p.id !== 'basic' && p.id !== currentPlan.id).map(plan => (
                        <PlanCard key={plan.id} plan={plan} isCurrent={false} />
                    ))}
                </div>
            </div>

            <BillingHistoryTable />
        </div>
    );
};