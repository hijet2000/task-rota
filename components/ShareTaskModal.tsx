import React, { useState } from 'react';
import { Modal, Button, Select, ToggleSwitch } from './ui.tsx';
import { Task } from '../types.ts';
import { employees } from '../data/mockData.ts';
import { LinkIcon } from './icons.tsx';

interface ShareTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

export const ShareTaskModal: React.FC<ShareTaskModalProps> = ({ isOpen, onClose, task }) => {
    const [isPublic, setIsPublic] = useState(task?.isPublic || false);
    
    if (!task) return null;

    const publicLink = `${window.location.origin}/share/task/${task.id}`;
    
    const copyLink = () => {
        navigator.clipboard.writeText(publicLink);
        alert('Link copied to clipboard!');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Share "${task.title}"`}
            footer={
                <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Done</Button>
                </div>
            }
        >
            <div className="space-y-4">
                 <div>
                    <label className="text-sm font-medium text-gray-700">Invite people</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-grow">
                            <Select label="">
                                <option>Select a person to invite...</option>
                                {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                            </Select>
                        </div>
                        <Button>Invite</Button>
                    </div>
                </div>

                <div>
                    {(task.sharedWith || []).length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Shared with:</p>
                             {task.sharedWith?.map(userId => {
                                 const user = employees.find(e => e.id === userId);
                                 if (!user) return null;
                                 return (
                                     <div key={userId} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                        <div className="flex items-center space-x-2">
                                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                                            <span>{user.name}</span>
                                        </div>
                                         <Button variant="secondary" size="sm">Remove</Button>
                                    </div>
                                 )
                             })}
                        </div>
                    )}
                </div>

                <div className="border-t pt-4">
                    <ToggleSwitch 
                        label="Enable Public Link"
                        enabled={isPublic}
                        setEnabled={setIsPublic}
                        description="Anyone with the link can view and comment on this task."
                    />
                    {isPublic && (
                        <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                            <label className="text-xs font-medium text-gray-500">Comment-only link</label>
                            <div className="flex items-center space-x-2 mt-1">
                                <input 
                                    type="text"
                                    readOnly
                                    value={publicLink}
                                    className="w-full text-sm font-mono bg-white border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <Button onClick={copyLink}>
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                    Copy
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};