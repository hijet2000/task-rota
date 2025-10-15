


// FIX: Corrected relative import path for types.ts.
import { SystemAuditLogEntry } from '../types.ts';

export const systemAuditLog: SystemAuditLogEntry[] = [
    {
        id: 'log-001',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
        user: 'admin@grandcafe.com',
        tenantId: 'tenant-001',
        action: 'Updated Location',
        details: { ip: '8.8.8.8', device: 'Chrome on macOS' },
    },
    {
        id: 'log-002',
        timestamp: new Date(new Date().setHours(new Date().getHours() - 5)),
        user: 'super@rotaapp.com',
        tenantId: 'tenant-004',
        action: 'Suspended Tenant',
        details: { ip: '1.1.1.1', device: 'Chrome on Windows' },
    },
    {
        id: 'log-003',
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
        user: 'manager@dentalcare.com',
        tenantId: 'tenant-002',
        action: 'Published Rota',
        details: { ip: '123.123.123.123', device: 'Safari on iOS' },
    },
    {
        id: 'log-004',
        timestamp: new Date(),
        user: 'System',
        tenantId: 'tenant-003',
        action: 'Created Tenant',
        details: { ip: 'N/A', device: 'System' },
    }
];