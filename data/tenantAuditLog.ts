


// FIX: Corrected relative import path for types.ts.
import { TenantAuditLogEntry } from '../types.ts';

export const tenantAuditLog: TenantAuditLogEntry[] = [
    {
        id: 'log-t-001',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
        user: 'alice@example.com',
        action: 'Updated Location',
        details: { ip: '8.8.8.8', device: 'Chrome on macOS' },
    },
    {
        id: 'log-t-002',
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
        user: 'bob@example.com',
        action: 'Published Rota',
        details: { ip: '123.123.123.123', device: 'Safari on iOS' },
    },
    {
        id: 'log-t-003',
        timestamp: new Date(),
        user: 'System',
        action: 'Generated Payroll Report',
        details: { ip: 'N/A', device: 'System' },
    }
];