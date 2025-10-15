// WARNING: This is a mock data service.
// In a production application, this file would be replaced with actual API calls
// to a secure backend server. It simulates network latency with a short delay.

import { employees, shifts } from '../data/mockData.ts';
import { tasks } from '../data/tasksData.ts';
import { projects, workspaces } from '../data/projectData.ts';
import { locations } from '../data/locations.ts';
import { initialRoleDefinitions } from '../data/roles.ts';
import { Employee, Shift, Task, Project, Location, RoleDefinition, Workspace } from '../types.ts';

// Simulate the raw data a backend might have access to.
const mockDatabase = {
    employees,
    shifts,
    tasks,
    projects,
    workspaces,
    locations,
    roles: initialRoleDefinitions,
};


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * --- MOCK API LAYER ---
 * This function simulates fetching all initial data from a backend API endpoint.
 * In a real application, this would be replaced with a `fetch` call:
 *
 *   const response = await fetch('/api/v1/all-data', {
 *     headers: { 'Authorization': `Bearer ${getAuthToken()}` }
 *   });
 *   if (!response.ok) {
 *     throw new Error('Failed to fetch data');
 *   }
 *   return response.json();
 *
 * The rest of the application (the Zustand store) does not need to know
 * whether the data comes from this mock or a real API call.
 */
export const fetchAllData = async (): Promise<{
    employees: Employee[];
    shifts: Shift[];
    tasks: Task[];
    projects: Project[];
    workspaces: Workspace[];
    locations: Location[];
    roles: RoleDefinition[];
}> => {
    await delay(800); // Simulate network latency
    console.log('[MockAPI Service] Responding to GET /api/v1/all-data');

    // Use structuredClone to create a deep copy of the mock data.
    // This correctly preserves complex types like Date objects, which JSON.stringify does not.
    // This fixes the root cause of the render loop error.
    const data = structuredClone(mockDatabase);
    
    return data;
};

/**
 * Simulates updating a single entity. In a real app:
 *   await fetch(`/api/v1/employees/${employee.id}`, { method: 'PUT', body: JSON.stringify(employee) });
 */
export const updateEmployee = async (employee: Employee): Promise<Employee> => {
    await delay(500);
    console.log(`[MockAPI Service] Responding to PUT /api/v1/employees/${employee.id}`);
    
    // Find and "update" the employee in our mock database
    const index = mockDatabase.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
        mockDatabase.employees[index] = employee;
    } else {
        // Or add if it's new, though PUT usually implies update
        mockDatabase.employees.push(employee);
    }
    
    // Use structuredClone to preserve Date objects on the returned data
    return structuredClone(employee);
};