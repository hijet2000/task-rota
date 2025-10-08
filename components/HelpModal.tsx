
import React from 'react';
import { Modal, Button, Input } from './ui.tsx';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Help & Support"
            footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
        >
            <div className="space-y-4">
                <Input label="" type="search" placeholder="Search our knowledge base..." />
                <div>
                    <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                        <li><a href="#" className="text-blue-600 hover:underline">How do I add a new employee?</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">How does shift swapping work?</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Can I export my data?</a></li>
                    </ul>
                </div>
                <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Contact Support</h3>
                    <p className="text-sm text-gray-600">
                        Can't find what you're looking for? Email our support team at <a href="mailto:support@rotaapp.com" className="text-blue-600">support@rotaapp.com</a>.
                    </p>
                </div>
            </div>
        </Modal>
    );
};
