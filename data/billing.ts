import { Plan } from '../types.ts';

export interface BillingDetails {
    paymentMethod: {
        type: 'Visa' | 'Mastercard';
        last4: string;
        expiry: string;
    };
    nextBillDate: string; // ISO Date string
    billingEmail: string;
}

export const billingDetails: BillingDetails = {
    paymentMethod: {
        type: 'Visa',
        last4: '4242',
        expiry: '12/26',
    },
    nextBillDate: '2024-07-31',
    billingEmail: 'billing@grandcafe.com',
};
