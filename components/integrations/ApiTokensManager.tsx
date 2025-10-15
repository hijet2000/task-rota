// FIX: Implemented ApiTokensManager component.
import React, { useState } from 'react';
import { Card, Button } from '../ui';
import { apiTokens } from '../../data/apiTokens';
import { ApiToken } from '../../types';
import { ApiTokenModal } from './ApiTokenModal';

export const ApiTokensManager: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Card
                title="Personal Access Tokens (PATs)"
                description="Use these tokens to authenticate with the RotaApp API."
                footer={<Button onClick={() => setIsModalOpen(true)}>Generate New Token</Button>}
            >
                <div className="space-y-3">
                    {apiTokens.map(token => (
                        <div key={token.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p className="font-semibold">{token.name}</p>
                                <p className="font-mono text-sm text-gray-500">{token.tokenPrefix}</p>
                                <p className="text-xs text-gray-500">Last used: {token.lastUsed ? new Date(token.lastUsed).toLocaleDateString() : 'Never'}</p>
                            </div>
                            <Button variant="secondary" size="sm" className="text-red-600 hover:bg-red-50">Revoke</Button>
                        </div>
                    ))}
                </div>
            </Card>
            <ApiTokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};