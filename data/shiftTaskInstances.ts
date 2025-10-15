// FIX: Added .ts extension to import path
import { ShiftTaskInstance } from '../types.ts';
import { shiftTaskTemplates } from './shiftTaskTemplates.ts';

export const shiftTaskInstances: ShiftTaskInstance[] = [
    {
        id: 'sti-1',
        shiftId: 's1',
        shiftTaskTemplateId: 'stt-1',
        taskTemplate: shiftTaskTemplates[0].tasks[0],
        status: 'in_progress',
        progressEvents: [],
        startedAt: new Date().toISOString(),
    },
    {
        id: 'sti-2',
        shiftId: 's1',
        shiftTaskTemplateId: 'stt-1',
        taskTemplate: shiftTaskTemplates[0].tasks[1],
        status: 'pending',
        progressEvents: [],
    },
     {
        id: 'sti-3',
        shiftId: 's1',
        shiftTaskTemplateId: 'stt-1',
        taskTemplate: shiftTaskTemplates[0].tasks[2],
        status: 'pending',
        progressEvents: [],
    },
];