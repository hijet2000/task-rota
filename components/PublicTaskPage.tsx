
import React from 'react';

// This is a placeholder for a public-facing task page.
// In a real app, it would fetch task data based on an ID from the URL.

export const PublicTaskPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-bold text-gray-900">Task: SML-1</h1>
                <h2 className="text-xl text-gray-700 mt-1">Finalize new cocktail recipes</h2>
                <p className="mt-4 text-gray-600">
                    This is a public, read-only view of the task.
                </p>
                 <div className="mt-6 p-4 bg-gray-50 rounded-md border">
                    <p><strong>Status:</strong> Done</p>
                    <p><strong>Priority:</strong> High</p>
                </div>
            </div>
        </div>
    );
};
