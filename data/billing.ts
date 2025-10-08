
// FIX: Added .ts extension to import path
import { BillingPlan, Invoice } from '../types.ts';

export const plans: BillingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: 'price_free',
    userLimit: 5,
    features: ['Up to 5 users', 'Basic scheduling', 'Time tracking', 'Community support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    priceId: 'price_pro_monthly',
    userLimit: 50,
    features: ['Up to 50 users', 'Advanced scheduling', 'Reporting & analytics', 'Priority email support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0, // Custom pricing
    priceId: 'price_enterprise',
    userLimit: 'unlimited',
    features: ['Unlimited users', 'Custom roles & permissions', 'SAML SSO', 'Dedicated account manager'],
  },
];

export const invoiceHistory: Invoice[] = [
  { id: 'inv_1', date: '2024-07-01', amount: 80.00, status: 'Paid', pdfUrl: '#' },
  { id: 'inv_2', date: '2024-06-01', amount: 80.00, status: 'Paid', pdfUrl: '#' },
  { id: 'inv_3', date: '2024-05-01', amount: 70.00, status: 'Paid', pdfUrl: '#' },
  { id: 'inv_4', date: '2024-04-01', amount: 70.00, status: 'Paid', pdfUrl: '#' },
];
