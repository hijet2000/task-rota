
import React, { useState } from 'react';
// FIX: Corrected import path for UI components.
import { Card, Input, Button, ToggleSwitch, Select } from '../ui.tsx';
// FIX: Added .tsx extension to import path.
import { TemplateLibrary } from '../TemplateLibrary.tsx';

export const NotificationsSettings: React.FC = () => {
    const [email, setEmail] = useState(true);
    const [sms, setSms] = useState(false);
    const [whatsapp, setWhatsapp] = useState(false);
    const [inApp, setInApp] = useState(true);
    const [quietHours, setQuietHours] = useState(true);
    const [escalation, setEscalation] = useState(true);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  return (
    <>
    <div className="space-y-6">
      <Card
        title="Notification Channels"
        description="Enable and configure the channels used to send alerts and messages."
        footer={<Button>Save Changes</Button>}
      >
        <ToggleSwitch label="In-App Notifications" enabled={inApp} setEnabled={setInApp} />
        <ToggleSwitch label="Email Notifications" enabled={email} setEnabled={setEmail} />
        <ToggleSwitch label="SMS Notifications" enabled={sms} setEnabled={setSms} description="Requires integration. Additional costs may apply." />
        <ToggleSwitch label="WhatsApp Notifications" enabled={whatsapp} setEnabled={setWhatsapp} description="Requires integration. Additional costs may apply." />
        
        <div className="pt-4">
             <Button variant="secondary" onClick={() => setIsTemplateModalOpen(true)}>Manage Notification Templates</Button>
        </div>
      </Card>
      
      <Card
        title="Delivery Rules"
        description="Set policies for when and how notifications are delivered to avoid disturbing staff."
        footer={<Button>Save Changes</Button>}
      >
        <ToggleSwitch 
            label="Enable Quiet Hours" 
            enabled={quietHours} 
            setEnabled={setQuietHours} 
            description="Prevent non-urgent notifications from being sent during these times."
        />
        {quietHours && (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 border-l-2">
                <Input label="Quiet Hours Start" type="time" defaultValue="22:00" />
                <Input label="Quiet Hours End" type="time" defaultValue="07:00" />
             </div>
        )}
        <Input label="Task Reminder Cadence (minutes before due)" type="number" defaultValue="60" helperText="Send a reminder this many minutes before a task is due. Set to 0 to disable." />

        <ToggleSwitch 
            label="Enable Escalation Rules" 
            enabled={escalation} 
            setEnabled={setEscalation} 
            description="Notify a manager if a user does not act on a critical alert within a time limit."
        />
         {escalation && (
            <div className="pl-4 border-l-2">
              <Input label="Escalation Time (minutes)" type="number" defaultValue="30" />
            </div>
        )}
      </Card>
    </div>
    {isTemplateModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsTemplateModalOpen(false)}>
        <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white z-50 shadow-xl p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <TemplateLibrary isModal={true} closeModal={() => setIsTemplateModalOpen(false)} />
        </div>
      </div>
    )}
    </>
  );
};