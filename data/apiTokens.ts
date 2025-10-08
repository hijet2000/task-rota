
// FIX: Added .ts extension to import path
import { ApiToken } from '../types.ts';

export const apiTokens: ApiToken[] = [
    {
        id: 'token1',
        name: 'Production Key',
        // FIX: Renamed 'token' to 'tokenPrefix' to match the ApiToken type.
        tokenPrefix: 'prod_sk_..._aBC1',
        created: '2023-01-15',
        lastUsed: '2024-07-20',
        scopes: ['read:shifts', 'write:shifts', 'read:employees'],
    },
    {
        id: 'token2',
        name: 'Reporting Integration Key',
        // FIX: Renamed 'token' to 'tokenPrefix' to match the ApiToken type.
        tokenPrefix: 'report_sk_..._dEF2',
        created: '2023-05-10',
        lastUsed: null,
        scopes: ['read:reports', 'read:timesheets'],
    },
];
