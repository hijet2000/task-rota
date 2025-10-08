
import React, { useState } from 'react';
// FIX: Added .tsx extension to import path.
import { Button, Input } from './ui.tsx';
// FIX: Added .tsx extension to import path.
import { PinPad } from './PinPad.tsx';
// FIX: Added .ts extension to import path.
import { employees } from '../data/mockData.ts';
// FIX: Added .ts extension to import path.
import { Employee } from '../types.ts';

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    React.useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="text-center mb-6">
            <p className="text-5xl font-bold text-gray-800">
                {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-gray-500">
                {time.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>
    );
};

export const ClockInPanel: React.FC = () => {
    const [view, setView] = useState<'id_entry' | 'pin_entry'>('id_entry');
    const [employeeIdInput, setEmployeeIdInput] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [error, setError] = useState('');

    const handleIdSubmit = () => {
        setError('');
        const employee = employees.find(e => e.id.toString() === employeeIdInput);
        if (employee) {
            setSelectedEmployee(employee);
            setView('pin_entry');
        } else {
            setError('Employee ID not found. Please try again.');
            setEmployeeIdInput('');
        }
    };

    const handlePinBack = () => {
        setView('id_entry');
        setEmployeeIdInput('');
        setSelectedEmployee(null);
        setError('');
    };

    if (view === 'pin_entry' && selectedEmployee) {
        return <PinPad employee={selectedEmployee} onBack={handlePinBack} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Time Clock</h2>
            <Clock />
            <div className="space-y-4">
                <Input 
                    label="Enter Your Employee ID"
                    type="number"
                    value={employeeIdInput}
                    onChange={(e) => setEmployeeIdInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleIdSubmit()}
                    placeholder="e.g., 3"
                    autoFocus
                />
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                <Button 
                    className="w-full justify-center text-lg py-3"
                    onClick={handleIdSubmit}
                    disabled={!employeeIdInput}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};