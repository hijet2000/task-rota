
import React, { useState } from 'react';
import { Employee } from '../types.ts';
import { employees as mockEmployees } from '../data/mockData.ts';
import { EmployeeForm } from './EmployeeForm.tsx';
import { AvailabilityModal } from './AvailabilityModal.tsx';
import { Button, Input } from './ui.tsx';
import { PlusIcon } from './icons.tsx';
import { getPermissions } from '../lib/permissions.ts';

export const PeoplePage: React.FC = () => {
    const { hasPermission } = getPermissions();
    const canManage = hasPermission('manage_employees');

    const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
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
    
    const handleSetAvailability = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsAvailabilityOpen(true);
    };

    const handleSave = (employeeData: Employee) => {
        if (selectedEmployee) {
            setEmployees(employees.map(e => e.id === employeeData.id ? employeeData : e));
        } else {
            setEmployees([...employees, { ...employeeData, id: Date.now() }]);
        }
    };
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">People</h1>
                {canManage && <Button onClick={handleAdd}><PlusIcon className="w-4 h-4 mr-2" />Add Person</Button>}
            </div>
            
             <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={employee.avatarUrl} alt="" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                            <div className="text-sm text-gray-500">{employee.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{employee.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contractedHours} hrs/week</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                     {canManage && (
                                        <>
                                            <Button variant="secondary" size="sm" onClick={() => handleSetAvailability(employee)}>Availability</Button>
                                            <Button variant="secondary" size="sm" onClick={() => handleEdit(employee)}>Edit</Button>
                                        </>
                                     )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
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
