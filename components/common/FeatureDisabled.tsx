import React from 'react';
import { ShieldAlertIcon } from '../icons';
import { Button } from '../ui';

interface FeatureDisabledProps {
    pageTitle?: string;
}

const FeatureDisabled: React.FC<FeatureDisabledProps> = ({ pageTitle }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50">
            <ShieldAlertIcon className="w-16 h-16 text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
                {pageTitle ? `The '${pageTitle}' feature is not included in your plan` : 'Feature Not Available'}
            </h2>
            <p className="mt-2 text-gray-600 max-w-md">
                To access this feature, you may need to upgrade your plan. Please contact your administrator or visit the subscription page for more details.
            </p>
            <div className="mt-6">
                <Button>View Upgrade Options</Button>
            </div>
        </div>
    );
};

export default FeatureDisabled;