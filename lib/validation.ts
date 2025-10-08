
// FIX: Add validation logic.
// FIX: Added .ts extension to import path.
import { Employee } from '../types.ts';

export interface ValidationError {
    field: keyof Employee;
    message: string;
}

export const validateEmployee = (employee: Partial<Employee>): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!employee.name) {
        errors.push({ field: 'name', message: 'Name is required' });
    }
    if (!employee.email) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
        errors.push({ field: 'email', message: 'Email is invalid' });
    }
    if (!employee.role) {
        errors.push({ field: 'role', message: 'Role is required' });
    }
    if (employee.payType === 'hourly' && (employee.hourlyRate === undefined || employee.hourlyRate < 0)) {
        errors.push({ field: 'hourlyRate', message: 'Hourly rate must be a positive number' });
    }
     if (employee.contractedHours === undefined || employee.contractedHours < 0) {
        errors.push({ field: 'contractedHours', message: 'Contracted hours must be a positive number' });
    }

    return errors;
};
