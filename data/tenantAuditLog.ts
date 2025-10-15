// FIX: Corrected relative import path for types.ts.
import { TenantAuditLogEntry } from '../types.ts';

export const tenantAuditLog: TenantAuditLogEntry[] = [
    {
        id: 'log-t-001',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
        user: 'alice@example.com',
        action: 'Updated Location',
        details: { ip: 'xxx.xxx.xxx.xxx', device: 'Chrome on macOS' }, // SEC-FIX: Replaced with a non-sensitive placeholder.
    },
    {
        id: 'log-t-002',
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
        user: 'bob@example.com',
        action: 'Published Rota',
        details: { ip: 'xxx.xxx.xxx.xxx', device: 'Safari on iOS' }, // SEC-FIX: Replaced with a non-sensitive placeholder.
    },
    {
        id: 'log-t-003',
        timestamp: new Date(),
        user: 'System',
        action: 'Generated Payroll Report',
        details: { ip: 'N/A', device: 'System' },
    }
];
