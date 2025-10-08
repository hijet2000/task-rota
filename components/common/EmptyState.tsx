import React from 'react';
import { Button } from '../ui.tsx';
import { PlusCircleIcon } from '../icons.tsx';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    actionText?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = <PlusCircleIcon className="w-12 h-12 text-gray-400" />,
    title,
    description,
    actionText,
    onAction,
}) => {
    return (
        <div className="text-center bg-white p-8 rounded-lg border-2 border-dashed">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
              {icon}
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            {actionText && onAction && (
                <div className="mt-6">
                    <Button onClick={onAction}>
                        {actionText}
                    </Button>
                </div>
            )}
        </div>
    );
};
