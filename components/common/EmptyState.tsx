import React from 'react';
import { Button } from '../ui.tsx';
import { PlusIcon } from '../icons.tsx';

interface EmptyStateProps {
    icon: React.FC<any>;
    title: string;
    description: string;
    actionText?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, actionText, onAction }) => {
    return (
        <div className="text-center p-8">
            <Icon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            {actionText && onAction && (
                <div className="mt-6">
                    <Button onClick={onAction}>
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        {actionText}
                    </Button>
                </div>
            )}
        </div>
    );
};
