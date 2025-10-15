import React from 'react';
import { Card, Button } from '../ui';
import { Plan } from '../../types';
import { billingDetails } from '../../data/billing';

interface CurrentPlanCardProps {
    plan: Plan;
    activeUsers: number;
}

export const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({ plan, activeUsers }) => {
    const nextBillDate = new Date(billingDetails.nextBillDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Card
            title="Current Plan"
            description="Manage your subscription and billing details."
        >
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                <div>
                    <h4 className="text-lg font-bold text-gray-800">{plan.name} Plan</h4>
                    <p className="text-gray-600">
                        <span className="font-semibold text-2xl">£{plan.price}</span> / user / month
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        {activeUsers} of {plan.userLimit === 'unlimited' ? 'unlimited' : plan.userLimit} users
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Next bill: {nextBillDate}</p>
                    <p className="text-lg font-semibold">£{(plan.price * activeUsers).toFixed(2)}</p>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <Button variant="secondary">Cancel Subscription</Button>
                <Button variant="secondary">Manage Payment Method</Button>
            </div>
        </Card>
    );
};