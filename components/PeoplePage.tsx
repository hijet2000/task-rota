import React, { useState } from 'react';
import { Employee } from '../types.ts';
import { useAppStore } from '../store/appStore.ts';
import { Button } from './ui.tsx';
import { EmployeeForm } from './EmployeeForm.tsx';
import { AvailabilityModal } from './AvailabilityModal.tsx';
import { EmptyState } from './common/EmptyState.tsx';
import { UsersIcon } from './icons.tsx';
import { Protected } from './common/Protected.tsx';

export const PeoplePage: React.FC = () => {
    const { employees, addEmployee, updateEmployee, deleteEmployee } = useAppStore();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const handleAdd = () => {
        setSelectedEmployee(null);
        setIsFormOpen(true);
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsFormOpen(true);
    };
    
    const handleDelete = (employeeId: number) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(employeeId);
        }
    };

    const handleSetAvailability = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsAvailabilityOpen(true);
    };

    const handleSave = (employeeToSave: Omit<Employee, 'id'> | Employee) => {
        if ('id' in employeeToSave) {
            updateEmployee(employeeToSave);
        } else {
            addEmployee(employeeToSave);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">People</h1>
                <Protected permission="manage_employees">
                    {employees.length > 0 && <Button onClick={handleAdd}>Add Person</Button>}
                </Protected>
            </div>
            
            {employees.length === 0 ? (
                 <EmptyState
                    icon={<UsersIcon className="w-12 h-12 text-gray-400" />}
                    title="No people added yet"
                    description="Get started by adding your first team member."
                    actionText="Add Person"
                    onAction={handleAdd}
                />
            ) : (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employees.map(employee => (
                                <tr key={employee.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full" src={employee.avatarUrl} alt={employee.name} />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                <div className="text-sm text-gray-500">{employee.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                        <Button variant="secondary" size="sm" onClick={() => handleSetAvailability(employee)}>Availability</Button>
                                        <Protected permission="manage_employees">
                                            <>
                                                <Button variant="secondary" size="sm" onClick={() => handleEdit(employee)}>Edit</Button>
                                                <Button variant="secondary" size="sm" className="text-red-500" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                            </>
                                        </Protected>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <EmployeeForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                employee={selectedEmployee}
            />

            <AvailabilityModal
                isOpen={isAvailabilityOpen}
                onClose={() => setIsAvailabilityOpen(false)}
                employee={selectedEmployee}
            />
        </div>
    );
};
