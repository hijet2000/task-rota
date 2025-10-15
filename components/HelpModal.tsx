import React from 'react';
import { Modal, Button, Input } from './ui';
import { HelpCircleIcon, BookOpenIcon } from './icons';

export const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Help & Support"
        >
            <div className="space-y-4">
                <Input label="" type="search" placeholder="Search knowledge base..." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <BookOpenIcon className="w-6 h-6 text-blue-600 mb-2" />
                        <h4 className="font-semibold">Knowledge Base</h4>
                        <p className="text-sm text-gray-600">Find articles and tutorials.</p>
                    </a>
                     <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <HelpCircleIcon className="w-6 h-6 text-blue-600 mb-2" />
                        <h4 className="font-semibold">Contact Support</h4>
                        <p className="text-sm text-gray-600">Get in touch with our team.</p>
                    </a>
                </div>
            </div>
        </Modal>
    );
};