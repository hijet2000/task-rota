

import React from 'react';
// FIX: Corrected relative import path for ApiTokensManager.tsx.
import { ApiTokensManager } from './integrations/ApiTokensManager.tsx';
// FIX: Corrected relative import path for WebhooksManager.tsx.
import { WebhooksManager } from './integrations/WebhooksManager.tsx';

export const IntegrationsPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Developer Integrations</h1>
            <p className="text-gray-600 mb-6">Manage API access and configure webhooks for custom integrations.</p>
            <div className="space-y-8">
                <ApiTokensManager />
                <WebhooksManager />
            </div>
        </div>
    );
};