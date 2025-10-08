import React from 'react';

// FIX: Added props to accept the onClose handler from App.tsx.
interface OnboardingWizardProps {
    onClose: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h1 className="text-2xl font-bold">Onboarding Wizard</h1>
                <p className="mt-2 text-gray-600">This is a placeholder for the onboarding wizard.</p>
                <div className="mt-6 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Close Wizard
                    </button>
                </div>
            </div>
        </div>
    );
};