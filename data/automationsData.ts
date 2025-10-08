
// FIX: Added .ts extension to import path
import { AutomationRule } from '../types.ts';

export const automations: AutomationRule[] = [
    {
        id: 'auto-1',
        name: 'Assign QA task on Review',
        description: 'When a task is moved to "In Review", assign it to the QA team lead for approval.',
        trigger: {
            type: 'task.status.changed',
            params: { from: 'In Progress', to: 'In Review' }
        },
        // FIX: Added missing 'conditions' property.
        conditions: [],
        actions: [
            {
                type: 'task.reassign',
                params: {
                    assigneeId: 9 // Arthur Admin
                }
            }
        ],
        isEnabled: true,
        lastRun: new Date().toISOString(),
        runCount: 5,
    },
    {
        id: 'auto-2',
        name: 'Notify Manager of Missed Clock-In',
        description: 'If a shift starts and the employee has not clocked in, send an alert to their manager.',
        trigger: {
            type: 'shift.missed_clock_in',
            params: {}
        },
        // FIX: Added missing 'conditions' property.
        conditions: [],
        actions: [
            {
                type: 'notification.send',
                params: {
                    recipient: 'manager',
                    channel: 'Email',
                    template: 'late_clock_in' // Re-using this template for demo
                }
            }
        ],
        isEnabled: true,
        lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        runCount: 1,
    },
    {
        id: 'auto-3',
        name: 'Create Task for Leave Cover',
        description: 'When a leave request is approved, create a task to find cover for the scheduled shifts.',
        trigger: {
            type: 'leave.approved',
            params: {}
        },
        // FIX: Added missing 'conditions' property.
        conditions: [],
        actions: [
            {
                type: 'task.add_subtask', // A more specific action would be better
                params: {
                    title: 'Arrange cover for approved leave',
                    assigneeId: 2 // Alice Johnson (Manager)
                }
            }
        ],
        isEnabled: true,
        lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        runCount: 2,
    },
    {
        id: 'auto-4',
        name: 'Archive Completed Projects',
        description: 'When a project is moved to "Done", automatically archive it after 30 days of inactivity.',
        trigger: {
            type: 'task.status.changed', // Placeholder, would be a project event
            params: { from: 'In Progress', to: 'Done' }
        },
        // FIX: Added missing 'conditions' property.
        conditions: [],
        actions: [
            {
                type: 'task.set_field', // Placeholder, would be a project action
                params: {
                    status: 'Archived',
                    delay: '30d'
                }
            }
        ],
        isEnabled: false,
        runCount: 0,
    }
];
