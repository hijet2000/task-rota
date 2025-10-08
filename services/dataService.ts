// services/dataService.ts
import { employees, shifts } from '../data/mockData.ts';
import { projects, workspaces } from '../data/projectData.ts';
import { tasks } from '../data/tasksData.ts';
import { locations } from '../data/locations.ts';
import { notificationTemplates } from '../data/notificationTemplates.ts';
import { automations } from '../data/automationsData.ts';
import { tenants } from '../data/tenants.ts';
import { systemAuditLog } from '../data/systemAuditLog.ts';
import { timeEntries } from '../data/timeEntriesData.ts';
import { leaveRequests } from '../data/leaveRequests.ts';
import { templates } from '../data/templatesData.ts';

const MOCK_API_LATENCY = 500; // ms

const mockFetch = <T>(data: T): Promise<T> => 
    new Promise(resolve => setTimeout(() => resolve(data), MOCK_API_LATENCY));

// This service mimics a backend API.
export const dataService = {
    getAllData: async () => {
        // In a real app, this might be multiple API calls,
        // or a single GraphQL query.
        const [
            allEmployees, allShifts, allProjects, allWorkspaces, allTasks, allLocations,
            allNotificationTemplates, allAutomations, allTenants, allSystemAuditLogs,
            allTimeEntries, allLeaveRequests, allTaskTemplates
        ] = await Promise.all([
            mockFetch(employees),
            mockFetch(shifts),
            mockFetch(projects),
            mockFetch(workspaces),
            mockFetch(tasks),
            mockFetch(locations),
            mockFetch(notificationTemplates),
            mockFetch(automations),
            mockFetch(tenants),
            mockFetch(systemAuditLog),
            mockFetch(timeEntries),
            mockFetch(leaveRequests),
            mockFetch(templates),
        ]);

        return {
            employees: allEmployees,
            shifts: allShifts,
            projects: allProjects,
            workspaces: allWorkspaces,
            tasks: allTasks,
            locations: allLocations,
            notificationTemplates: allNotificationTemplates,
            automations: allAutomations,
            tenants: allTenants,
            systemAuditLog: allSystemAuditLogs,
            timeEntries: allTimeEntries,
            leaveRequests: allLeaveRequests,
            taskTemplates: allTaskTemplates,
        };
    }
};
