// FIX: Implemented apiTokens mock data.
import { ApiToken } from '../types.ts';

export const apiTokens: ApiToken[] = [
    {
        id: 'tok_1',
        name: 'My Custom Reporting App',
        tokenPrefix: 'sk_...xxxx', // SEC-FIX: Replaced with a non-sensitive placeholder.
        scopes: ['read:shifts', 'read:employees', 'read:reports'],
        lastUsed: new Date().toISOString(),
        createdAt: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
    },
    {
        id: 'tok_2',
        name: 'Legacy Integration',
        tokenPrefix: 'sk_...yyyy', // SEC-FIX: Replaced with a non-sensitive placeholder.
        scopes: ['read:timesheets'],
        lastUsed: null,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
    }
];
