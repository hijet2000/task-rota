
import React, { useState } from 'react';
// FIX: Added .tsx extension to import path.
import { Card, Button } from '../ui.tsx';
// FIX: Added .ts extension to import path
import { apiTokens } from '../../data/apiTokens.ts';
// FIX: Added .ts extension to import path
import { ApiToken } from '../../types.ts';
// FIX: Added .tsx extension to import path.
import { ApiTokenModal } from './ApiTokenModal.tsx';

export const ApiTokensManager: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Card
                title="API Tokens"
                description="Use API tokens to authenticate with the RotaApp API."
                footer={<Button onClick={() => setIsModalOpen(true)}>Generate New Token</Button>}
            >
                <div className="space-y-3">
                    {apiTokens.map(token => (
                        <div key={token.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p className="font-medium">{token.name}</p>
                                {/* FIX: Changed token.token to token.tokenPrefix to match the ApiToken type. */}
                                <p className="font-mono text-sm text-gray-500">{token.tokenPrefix}</p>
                                <p className="text-xs text-gray-400">
                                    Last used: {token.lastUsed || 'Never'}
                                </p>
                            </div>
                            <Button variant="secondary" size="sm">Revoke</Button>
                        </div>
                    ))}
                </div>
            </Card>
            <ApiTokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
