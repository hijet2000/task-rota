import React from 'react';
import { Modal, Button } from './ui.tsx';

const messages = [
    { id: 1, from: 'Alice Johnson (Manager)', subject: 'Rota for next week published', time: '2 hours ago', read: false },
    { id: 2, from: 'System', subject: 'Your leave request was approved', time: '1 day ago', read: true },
    { id: 3, from: 'System', subject: 'Upcoming shift reminder', time: '3 days ago', read: true },
];

interface MessagesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="My Messages"
            footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
        >
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {messages.map(msg => (
                    <div key={msg.id} className={`p-3 rounded-lg shadow-sm ${msg.read ? 'bg-white' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                        <div className="flex justify-between text-sm">
                            <p className="font-bold">{msg.from}</p>
                            <p className="text-gray-500">{msg.time}</p>
                        </div>
                        <p className="text-gray-700">{msg.subject}</p>
                    </div>
                ))}
            </div>
        </Modal>
    );
};