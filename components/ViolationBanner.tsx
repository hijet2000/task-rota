
import React from 'react';

interface Violation {
    type: 'Compliance' | 'Availability' | 'Overtime';
    description: string;
}

interface ViolationBannerProps {
    violations: Violation[];
    onDismiss?: () => void;
}

const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);


export const ViolationBanner: React.FC<ViolationBannerProps> = ({ violations, onDismiss }) => {
    if (!violations || violations.length === 0) {
        return null;
    }

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        Scheduling conflict found:
                        <ul className="list-disc list-inside mt-1">
                            {violations.map((v, index) => (
                                <li key={index}>
                                    <strong>{v.type}:</strong> {v.description}
                                </li>
                            ))}
                        </ul>
                    </p>
                    {onDismiss && (
                         <div className="mt-2 text-sm">
                            <button onClick={onDismiss} className="font-medium text-yellow-700 hover:text-yellow-600">
                                Dismiss
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
