// FIX: Implemented automations mock data.
import { AutomationRule } from '../types.ts';

export const automations: AutomationRule[] = [
    {
        id: 'auto-1',
        name: 'Notify Manager of Urgent Tasks',
        description: 'When a task is created with "Urgent" priority, send an email to the project lead.',
        trigger: 'task.created',
        conditions: [{ field: 'priority', operator: 'equals', value: 'Urgent' }],
        actions: [{ type: 'notification.send', recipient: 'project.lead', channel: 'Email' }],
        isEnabled: true,
        runCount: 12,
        lastRun: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    },
    {
        id: 'auto-2',
        name: 'Archive Completed Tasks',
        description: 'When a task has been in "Done" for 7 days, archive it.',
        trigger: 'task.status.changed',
        conditions: [],
        actions: [],
        isEnabled: true,
        runCount: 153,
        lastRun: new Date(Date.now() - 3600 * 1000 * 1).toISOString(),
    },
    {
        id: 'auto-3',
        name: 'Request Update on Blocked Tasks',
        description: 'If a task is "Blocked" for more than 3 days, ping the assignee for an update.',
        trigger: 'task.status.changed',
        conditions: [],
        actions: [],
        isEnabled: false,
        runCount: 5,
        lastRun: new Date(Date.now() - 3600 * 1000 * 24 * 5).toISOString(),
    }
];
