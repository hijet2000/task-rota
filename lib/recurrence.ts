// This file contains placeholder content for recurrence logic.
// A real implementation would use a library like rrule.js.

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceRule {
    frequency: Frequency;
    interval: number;
    // ... other properties like until, count, byday, etc.
}

export const ruleToString = (rule: RecurrenceRule): string => {
    return `Repeats every ${rule.interval} ${rule.frequency.slice(0, -2)}${rule.interval > 1 ? 's' : ''}`;
};
