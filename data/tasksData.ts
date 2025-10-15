import { Task } from '../types.ts';

const twoDaysFromNow = new Date();
twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const threeHoursAgo = new Date();
threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);


export const tasks: Task[] = [
    {
        id: 'task-1', code: 'SML-1', title: 'Finalize new cocktail recipes',
        description: 'Work with the bar team to finalize the recipes for the 5 new summer cocktails.',
        status: 'Done', priority: 'High', projectId: 'proj-1',
        assigneeIds: [5], reporterId: 2, dueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), labels: ['Menu', 'Beverages'],
        checklist: [
            { id: 'ci-5', text: 'Source ingredients', isCompleted: true },
            { id: 'ci-6', text: 'Cost out new recipes', isCompleted: true },
        ],
        attachments: [], dependencies: [], 
        relatedTaskIds: ['task-2'],
        slaState: 'On Time', isPublic: false, sharedWith: [], 
        activity: [
             { type: 'system', id: 'act-1-3', userId: 5, timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), action: 'changed the status to "Done".' },
             { type: 'comment', id: 'act-1-2', userId: 5, timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), text: "All recipes are costed and ready for the menu launch!" },
             { type: 'system', id: 'act-1-1', userId: 2, timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), action: 'created this task.' },
        ],
    },
    {
        id: 'task-2', code: 'SML-2', title: 'Photoshoot for new menu items',
        description: 'Organize a photoshoot for all new summer menu items for marketing materials.',
        status: 'In Progress', priority: 'High', projectId: 'proj-1',
        assigneeIds: [9], reporterId: 2, dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
        createdAt: new Date().toISOString(), labels: ['Marketing'],
        checklist: [
            { id: 'ci-1', text: 'Book photographer', isCompleted: true },
            { id: 'ci-2', text: 'Scout location', isCompleted: true },
            { id: 'ci-3', text: 'Prepare food items for shoot', isCompleted: false },
            { id: 'ci-4', text: 'Review and select final photos', isCompleted: false },
        ],
        attachments: [], dependencies: ['task-1'], 
        relatedTaskIds: ['task-1'],
        slaState: 'On Time', isPublic: false, sharedWith: [], 
        activity: [
             { type: 'system', id: 'act-2-2', userId: 2, timestamp: yesterday.toISOString(), action: 'changed the status to "In Progress".' },
             { type: 'system', id: 'act-2-1', userId: 2, timestamp: new Date().toISOString(), action: 'created this task.' },
        ],
    },
    {
        id: 'task-3', code: 'OPS-1', title: 'Weekly stock take',
        description: 'Complete the weekly stock take for both bar and kitchen.',
        status: 'In Progress', priority: 'Medium', projectId: 'proj-2',
        assigneeIds: [3, 6], reporterId: 2, dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        createdAt: new Date().toISOString(), labels: ['Inventory'], checklist: [], attachments: [], dependencies: [], 
        slaState: 'At Risk', isPublic: false, sharedWith: [], 
        activity: [
            { type: 'system', id: 'act-3-1', userId: 2, timestamp: new Date().toISOString(), action: 'created this task.' },
        ],
    },
    {
        id: 'task-4', code: 'OPS-2', title: 'Repair leaking sink in staff bathroom',
        description: 'The sink in the staff bathroom has a slow leak. Call a plumber to get it fixed.',
        status: 'Blocked', priority: 'Urgent', projectId: 'proj-2',
        assigneeIds: [1], reporterId: 3, dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        createdAt: new Date().toISOString(), labels: ['Maintenance'], checklist: [], attachments: [], dependencies: [], 
        slaState: 'Breached', isPublic: false, sharedWith: [], 
        activity: [
            { type: 'comment', id: 'act-4-2', userId: 1, timestamp: threeHoursAgo.toISOString(), text: "Plumber can't come until Friday, so this is blocked." },
            { type: 'system', id: 'act-4-1', userId: 3, timestamp: new Date().toISOString(), action: 'created this task.' },
        ],
    },
    {
        id: 'task-5', code: 'FIN-1', title: 'Collate supplier invoices for Q3',
        description: 'Gather all supplier invoices for the third quarter and organize them for the accountant.',
        status: 'In Review', priority: 'Medium', projectId: 'proj-3',
        assigneeIds: [9], reporterId: 1, dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
        createdAt: new Date().toISOString(), labels: ['Finance', 'Reporting'], checklist: [], attachments: [], dependencies: ['task-3'], 
        slaState: 'On Time', isPublic: false, sharedWith: [], 
        activity: [
            { type: 'system', id: 'act-5-1', userId: 1, timestamp: new Date().toISOString(), action: 'created this task.' },
        ],
    },
    {
        id: 'task-6',
        code: 'OPS-3',
        title: 'Clean coffee machine',
        description: "Perform the weekly deep clean of the coffee machine as per the manufacturer's instructions.",
        status: 'Draft',
        priority: 'Medium',
        projectId: 'proj-2',
        assigneeIds: [3],
        reporterId: 2,
        dueDate: twoDaysFromNow.toISOString(),
        createdAt: new Date().toISOString(),
        labels: ['Cleaning', 'Maintenance'],
        checklist: [],
        attachments: [],
        dependencies: [],
        slaState: 'On Time',
        isPublic: false,
        sharedWith: [],
        activity: [
            { type: 'system', id: 'act-6-1', userId: 2, timestamp: new Date().toISOString(), action: 'created this task.' },
        ],
    },
];