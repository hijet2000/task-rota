// FIX: Implemented the TaskDetailModal component.
import React, { useState } from 'react';
// FIX: Added .tsx extension to import path
import { Modal, Button, Select, Input } from './ui.tsx';
// FIX: Added .ts extension to import path
import { Task } from '../types.ts';
// FIX: Added .ts extension to import path
import { employees } from '../data/mockData.ts';
// FIX: Added .ts extension to import path
import { projects } from '../data/projectData.ts';
// FIX: Added .tsx extension to import path
import { Flag, Paperclip, LinkIcon, CalendarIcon, PlusCircleIcon, Share2Icon, QrCodeIcon, MessageSquareIcon } from './icons.tsx';
// FIX: Added .tsx extension to import path
import { SlaBadge } from './SlaBadge.tsx';
// FIX: Added .tsx extension to import path
import { ShareTaskModal } from './ShareTaskModal.tsx';
// FIX: Added .tsx extension to import path
import { TaskQrCodeModal } from './TaskQrCodeModal.tsx';


interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, onClose, task }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    if (!task) return null;

    const project = projects.find(p => p.id === task.projectId);
    const assignees = employees.filter(e => task.assigneeIds.includes(e.id));
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={`${task.code}: ${task.title}`}
                footer={
                    <div className="flex justify-between w-full">
                        <div className="space-x-2">
                           <Button variant="secondary" onClick={() => setIsShareModalOpen(true)}><Share2Icon className="w-4 h-4 mr-2" /> Share</Button>
                           <Button variant="secondary" onClick={() => setIsQrModalOpen(true)}><QrCodeIcon className="w-4 h-4 mr-2" /> QR Code</Button>
                        </div>
                        <Button variant="secondary" onClick={onClose}>Close</Button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                            <p className="text-gray-700">{task.description || 'No description provided.'}</p>
                        </div>
                         {task.checklist.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Checklist</h3>
                                <div className="space-y-2">
                                    {task.checklist.map((item, index) => (
                                        <label key={index} className="flex items-center space-x-2">
                                            <input type="checkbox" defaultChecked={item.completed} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                                            <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Attachments and Dependencies would go here */}
                    </div>
                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-4">
                        <Select label="Status" defaultValue={task.status}>
                             {['Draft', 'In Progress', 'Blocked', 'In Review', 'Done'].map(s => <option key={s} value={s}>{s}</option>)}
                        </Select>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Assignees</h3>
                            {assignees.map(a => (
                                <div key={a.id} className="flex items-center space-x-2 mb-1">
                                    <img src={a.avatarUrl} alt={a.name} className="w-6 h-6 rounded-full" />
                                    <span className="text-sm">{a.name}</span>
                                </div>
                            ))}
                             <Button variant="secondary" size="sm" className="w-full mt-1"><PlusCircleIcon className="w-4 h-4 mr-1" /> Add Assignee</Button>
                        </div>
                        <Input label="Due Date" type="date" defaultValue={task.dueDate || ''} />
                        {/* Other fields like Priority, Project, SLA */}
                    </div>
                </div>
                <div className="border-t pt-4 mt-4">
                     <h3 className="text-sm font-medium text-gray-500 mb-2">Activity</h3>
                     <div className="flex items-start space-x-2">
                         <img src={employees[0].avatarUrl} className="w-8 h-8 rounded-full" />
                         <div className="flex-1">
                            <textarea rows={1} placeholder="Add a comment..." className="w-full text-sm border-gray-300 rounded-md shadow-sm" />
                         </div>
                     </div>
                </div>
            </Modal>
            <ShareTaskModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} task={task} />
            <TaskQrCodeModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} task={task} />
        </>
    );
};
