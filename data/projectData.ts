
// FIX: Added .ts extension to import path
import { Workspace, Project } from '../types.ts';

export const workspaces: Workspace[] = [
    {
        id: 'ws_1',
        name: 'Restaurant Operations',
        description: 'Projects related to the day-to-day running of the restaurants.'
    },
    {
        id: 'ws_2',
        name: 'Marketing & Events',
        description: 'Campaigns, promotions, and special events planning.'
    }
];

export const projects: Project[] = [
    {
        id: 'proj_1',
        name: 'Daily Rota Management',
        code: 'ROT',
        description: 'Scheduling and staff management for all locations.',
        workspaceId: 'ws_1',
        members: [
            { userId: 2, role: 'Owner' }, // Alice Johnson
            { userId: 3, role: 'Contributor' }, // Bob Williams
            { userId: 4, role: 'Contributor' }, // Charlie Brown
        ],
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'In Progress',
        color: '#3B82F6',
        tags: ['Operations', 'HR'],
        isArchived: false,
    },
    {
        id: 'proj_2',
        name: 'Summer Menu Launch',
        code: 'SML',
        description: 'Planning, training, and launch of the new summer menu.',
        workspaceId: 'ws_2',
        members: [
            { userId: 7, role: 'Owner' }, // George Costanza
            { userId: 6, role: 'Contributor' }, // Frank Castle
            { userId: 2, role: 'Viewer' }, // Alice Johnson
        ],
        startDate: '2024-05-01',
        endDate: '2024-08-31',
        status: 'Done',
        color: '#F59E0B',
        tags: ['Marketing', 'F&B'],
        isArchived: false,
    },
    {
        id: 'proj_3',
        name: 'New POS System Rollout',
        code: 'POS',
        description: 'Implementing a new point-of-sale system across all locations.',
        workspaceId: 'ws_1',
        members: [
            { userId: 9, role: 'Owner' }, // Arthur Admin
            { userId: 1, role: 'Maintainer' }, // Olivia Owner
        ],
        startDate: '2024-09-01',
        endDate: '2024-11-30',
        status: 'Draft',
        color: '#10B981',
        tags: ['IT', 'Operations', 'Training'],
        isArchived: false,
    }
];
