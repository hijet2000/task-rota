import { ShiftTaskTemplate } from '../types.ts';

export const shiftTaskTemplates: ShiftTaskTemplate[] = [
    {
        id: 'stt-1',
        name: 'Opening Barista Checklist',
        description: 'Tasks to be completed by the opening barista at the start of their shift.',
        roleTags: ['Member'],
        locationIds: [1, 2],
        active: true,
        tasks: [
            { title: 'Dial in espresso machine', required: true, section: 'start', priority: 'High', frequency: 'per_shift', dueOffsetMin: 15, labels: ['coffee'] },
            { title: 'Check milk and syrup stock', required: true, section: 'start', priority: 'Medium', frequency: 'per_shift', dueOffsetMin: 15, labels: ['inventory'] },
            { title: 'Wipe down counters and machines', required: true, section: 'start', priority: 'Medium', frequency: 'per_shift', dueOffsetMin: 10, labels: ['cleaning'] },
            { title: 'Set up pastry display', required: false, section: 'start', priority: 'Low', frequency: 'per_shift', dueOffsetMin: 20, labels: ['FOH'] },
        ]
    },
    {
        id: 'stt-2',
        name: 'Closing Kitchen Checklist',
        description: 'End-of-day cleaning and prep tasks for the kitchen team.',
        roleTags: ['Member'],
        locationIds: [2],
        active: true,
        tasks: [
            { title: 'Deep clean grill station', required: true, section: 'end', priority: 'High', frequency: 'daily', dueOffsetMin: -30, labels: ['BOH', 'cleaning'] },
            { title: 'Filter and clean fryers', required: true, section: 'end', priority: 'High', frequency: 'daily', dueOffsetMin: -30, labels: ['BOH', 'cleaning'] },
            { title: 'Consolidate and label all items', required: true, section: 'end', priority: 'Medium', frequency: 'daily', dueOffsetMin: -15, labels: ['BOH', 'inventory'] },
            { title: 'Sweep and mop floors', required: true, section: 'end', priority: 'Medium', frequency: 'daily', dueOffsetMin: 0, labels: ['BOH', 'cleaning'] },
        ]
    },
];