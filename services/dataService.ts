// This is a mock data service to simulate API calls.
import { employees } from '../data/mockData.ts';
import { Employee } from '../types.ts';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchEmployees = async (): Promise<Employee[]> => {
    await delay(500);
    return employees;
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
    await delay(500);
    // In a real app, you'd send this to the server.
    console.log('Updating employee:', employee);
    return employee;
};
