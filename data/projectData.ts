// FIX: Corrected relative import path for types.ts.
import { Project, Workspace } from '../types.ts';

export const workspaces: Workspace[] = [
    { id: 'ws-1', name: 'Restaurant Operations' },
    { id: 'ws-2', name: 'Marketing' },
    { id: 'ws-3', name: 'Internal' },
];

export const projects: Project[] = [
    {
        id: 'proj-1',
        name: 'Summer Menu Launch',
        code: 'SML',
        description: 'Planning and execution of the new summer menu.',
        workspaceId: 'ws-2',
        isArchived: false,
        defaultApproverId: 2, // Alice Johnson
        members: [
            { userId: 2, role: 'Maintainer'},
            { userId: 3, role: 'Contributor'},
            { userId: 6, role: 'Contributor'},
        ],
    },
    {
        id: 'proj-2',
        name: 'Daily Operations',
        code: 'OPS',
        description: 'Ongoing tasks for day-to-day restaurant management.',
        workspaceId: 'ws-1',
        isArchived: false,
        defaultApproverId: 2,
        members: [
            { userId: 2, role: 'Maintainer'},
            { userId: 3, role: 'Contributor'},
            { userId: 4, role: 'Contributor'},
            { userId: 5, role: 'Contributor'},
            { userId: 6, role: 'Contributor'},
        ],
    },
    {
        id: 'proj-3',
        name: 'Q3 Financial Reporting',
        code: 'FIN',
        description: 'Closing books and preparing reports for Q3.',
        workspaceId: 'ws-3',
        isArchived: false,
        defaultApproverId: 1, // Olivia Owner
        members: [
            { userId: 1, role: 'Owner' },
            { userId: 9, role: 'Contributor' },
        ],
    },
];