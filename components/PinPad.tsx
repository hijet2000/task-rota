


import React, { useState } from 'react';
// FIX: Corrected relative import path for ui.tsx.
import { Button } from './ui.tsx';
// FIX: Corrected relative import path for types.ts.
import { Employee } from '../types.ts';

interface PinPadProps {
    employee: Employee;
    onBack: () => void;
}

export const PinPad: React.FC<PinPadProps> = ({ employee, onBack }) => {
    const [pin, setPin] = useState('');
    const [feedback, setFeedback] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    const handlePinInput = (digit: string) => {
        if (pin.length < 4) {
            setPin(pin + digit);
        }
    };

    const handleClear = () => {
        setPin('');
    };
    
    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
    };

    const handleClockAction = (action: 'In' | 'Out') => {
        // In a real app, you'd verify the PIN against a backend value.
        // For this demo, any 4-digit PIN is "correct".
        if (pin.length === 4) {
            console.log(`Clocking ${action} for ${employee.name} (ID: ${employee.id})`);
            setFeedback({ message: `Successfully Clocked ${action}!`, type: 'success' });
            setTimeout(() => {
                onBack(); // Go back to the ID entry screen after success
            }, 1500);
        } else {
            setFeedback({ message: 'Invalid PIN. Must be 4 digits.', type: 'error' });
            setPin('');
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    if (feedback) {
         return (
             <div className="bg-white p-6 rounded-lg shadow-md text-center">
                 <p className={`text-xl font-semibold ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.message}
                 </p>
            </div>
         );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <button onClick={onBack} className="text-sm text-blue-600 hover:underline mb-4">&larr; Back to ID Entry</button>
            <h3 className="text-xl font-semibold">Welcome, {employee.name}</h3>
            <p className="text-gray-500">Enter your 4-digit PIN</p>
            <div className="my-6 h-12 flex items-center justify-center space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full border-2 ${i < pin.length ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}></div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                    <Button key={d} variant="secondary" className="text-2xl py-4" onClick={() => handlePinInput(d.toString())}>{d}</Button>
                ))}
                <Button variant="secondary" className="text-2xl py-4" onClick={handleClear}>C</Button>
                <Button variant="secondary" className="text-2xl py-4" onClick={() => handlePinInput('0')}>0</Button>
                <Button variant="secondary" className="text-2xl py-4" onClick={handleBackspace}>&larr;</Button>
            </div>
             <div className="mt-6 grid grid-cols-2 gap-4">
                 <Button className="bg-green-500 hover:bg-green-600 text-white text-lg py-4" onClick={() => handleClockAction('In')}>Clock In</Button>
                 <Button className="bg-red-500 hover:bg-red-600 text-white text-lg py-4" onClick={() => handleClockAction('Out')}>Clock Out</Button>
            </div>
        </div>
    );
};