import React, { useState } from 'react';
import { Card, Button, ToggleSwitch } from '../ui.tsx';

export const FeatureGatesSettings: React.FC = () => {
    const [aiRota, setAiRota] = useState(false);
    const [newReports, setNewReports] = useState(true);
    const [pwaOffline, setPwaOffline] = useState(true);

    return (
        <Card
            title="Feature Previews"
            description="Enable or disable experimental features. These may change or be removed at any time."
            footer={<Button>Save Changes</Button>}
        >
            <div className="space-y-4">
                <ToggleSwitch
                    label="Beta: AI Rota Builder"
                    enabled={aiRota}
                    setEnabled={setAiRota}
                    description="Use AI to automatically generate schedules based on demand and staff availability."
                />
                <ToggleSwitch
                    label="New Reports Dashboard"
                    enabled={newReports}
                    setEnabled={setNewReports}
                    description="Try the new, more powerful reporting and analytics interface."
                />
                <ToggleSwitch
                    label="PWA Offline Mode"
                    enabled={pwaOffline}
                    setEnabled={setPwaOffline}
                    description="Enable offline capabilities for the Progressive Web App."
                />
            </div>
        </Card>
    );
};
