
// FIX: Added .ts extension to import path
import { TenantAuditLogEntry } from '../types.ts';

export const tenantAuditLog: TenantAuditLogEntry[] = [
    {
        id: 'tlog1',
        timestamp: new Date(),
        user: 'Alice Johnson',
        action: 'Updated Shift',
        details: { ip: '8.8.8.8', device: 'Chrome on macOS' },
    },
    {
        id: 'tlog2',
        timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
        user: 'Alice Johnson',
        action: 'Published Rota',
        details: { ip: '8.8.8.8', device: 'Chrome on macOS' },
    },
    {
        id: 'tlog3',
        timestamp: new Date(new Date().setHours(new Date().getHours() - 3)),
        user: 'System',
        action: 'Nightly Backup Succeeded',
        details: { ip: 'N/A', device: 'System' },
    },
    {
        id: 'tlog4',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
        user: 'Bob Williams',
        action: 'Clocked In',
        details: { ip: '192.168.1.101', device: 'ShiftWise Kiosk' },
    },
    {
        id: 'tlog5',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
        user: 'Alice Johnson',
        action: 'Updated Security Settings',
        details: { ip: '8.8.4.4', device: 'Safari on iPhone' },
    },
    {
        id: 'tlog6',
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 10)),
        user: 'Arthur Admin',
        action: 'Shared Task',
        details: { ip: '1.2.3.4', device: 'Chrome on Windows', taskId: 'task-3', sharedWith: 'user:8' },
    },
];
