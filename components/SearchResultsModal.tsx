import React, { useState } from 'react';
import { Modal, Input } from './ui';

interface SearchResultsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Search"
        >
            <div className="space-y-4">
                <Input 
                    label=""
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search tasks, people, projects..."
                    autoFocus
                />
                 <div className="min-h-[300px] text-center flex items-center justify-center">
                    {query ? (
                        <p className="text-gray-500">Showing results for "{query}"...</p>
                    ) : (
                        <p className="text-gray-500">Start typing to search.</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};