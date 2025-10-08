// FIX: Implemented mock task data.
// FIX: Added .ts extension to import path
import { Task } from '../types.ts';

const today = new Date();
const getDate = (offset: number): string => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
};

export const tasks: Task[] = [
    {
        id: 'task-1',
        projectId: 'proj_1',
        code: 'ROT-1',
        title: 'Finalize August Rota',
        description: 'Review all shifts for August, check for clashes, and publish.',
        status: 'In Progress',
        priority: 'High',
        assigneeIds: [2], // Alice Johnson
        dueDate: getDate(3),
        labels: ['Admin', 'Scheduling'],
        checklist: [
            { item: 'Review Downtown shifts', completed: true },
            { item: 'Review Waterfront shifts', completed: false },
            { item: 'Check holiday overlaps', completed: false },
        ],
        attachments: [],
        dependencies: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slaState: 'At Risk',
        activity: [],
        isPublic: true,
        sharedWith: [8],
    },
    {
        id: 'task-2',
        projectId: 'proj_2',
        code: 'SML-5',
        title: 'Print New Summer Menus',
        description: 'Send the final PDF to the printer and arrange for delivery to both locations.',
        status: 'Done',
        priority: 'Medium',
        assigneeIds: [7], // George Costanza
        dueDate: getDate(-10),
        labels: ['Marketing', 'F&B'],
        checklist: [],
        attachments: [{ name: 'summer_menu_final.pdf', url: '#' }],
        dependencies: ['task-3'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slaState: null,
        activity: [],
    },
    {
        id: 'task-3',
        projectId: 'proj_2',
        code: 'SML-4',
        title: 'Approve final menu design',
        description: 'Final sign-off is needed from the management team.',
        status: 'In Review',
        priority: 'High',
        assigneeIds: [2], // Alice Johnson
        dueDate: getDate(-12),
        labels: ['Design', 'Approval'],
        checklist: [],
        attachments: [{ name: 'menu_draft_v3.pdf', url: '#' }],
        dependencies: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slaState: 'Breached',
        activity: [],
        sharedWith: [9],
    },
     {
        id: 'task-4',
        projectId: 'proj_1',
        code: 'ROT-2',
        title: 'Onboard new hire: Bob Williams',
        description: 'Complete all onboarding tasks for the new team member.',
        status: 'In Progress',
        priority: 'Medium',
        assigneeIds: [2, 3], // Alice and Bob
        dueDate: getDate(7),
        labels: ['HR', 'Onboarding'],
        checklist: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slaState: 'On Time',
        activity: [],
    },
    {
        id: 'task-5',
        projectId: 'proj_3',
        code: 'POS-1',
        title: 'Gather quotes for new POS hardware',
        description: 'Contact at least 3 vendors for quotes on terminals, printers, and card readers.',
        status: 'Draft',
        priority: 'High',
        assigneeIds: [9], // Arthur Admin
        dueDate: null,
        labels: ['IT', 'Procurement'],
        checklist: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slaState: null,
        activity: [],
    },
    {
        id: 'task-6',
        projectId: 'proj_1',
        code: 'ROT-3',
        title: 'Fix leaking coffee machine',
        description: 'The espresso machine at the Downtown location is leaking from the main group head.',
        status: 'Blocked',
        priority: 'Urgent',
        assigneeIds: [3], // Bob Williams
        dueDate: getDate(1),
        labels: ['Maintenance', 'FOH'],
        checklist: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slaState: 'At Risk',
        activity: [],
    },
];
