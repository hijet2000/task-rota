import React from 'react';
import { useAppStore } from '../store/appStore.ts';
import { TaskCard } from './TaskCard.tsx';
import { Button } from './ui.tsx';
import { EmptyState } from './common/EmptyState.tsx';
import { ClipboardListIcon } from './icons.tsx';

export const MyWorkPage: React.FC = () => {
    const { currentUser, tasks, openModal } = useAppStore();
    
    if (!currentUser) {
        return null;
    }

    const myTasks = tasks.filter(task => task.assigneeIds.includes(currentUser.id) && task.status !== 'Done');
    const myApprovals = tasks.filter(task => task.status === 'In Review');

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6">My Work</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold">My Tasks ({myTasks.length})</h2>
                    {myTasks.length > 0 ? (
                        <div className="space-y-3">
                            {myTasks.map(task => <TaskCard key={task.id} task={task} />)}
                        </div>
                    ) : (
                       <EmptyState
                            icon={<ClipboardListIcon className="w-12 h-12 text-gray-400" />}
                            title="You're all caught up!"
                            description="You have no outstanding tasks assigned to you."
                        />
                    )}
                </div>

                <div className="lg:col-span-1 space-y-8">
                     <div>
                        <h2 className="text-xl font-semibold mb-4">My Approvals ({myApprovals.length})</h2>
                         {myApprovals.length > 0 ? (
                            <div className="space-y-3">
                            {myApprovals.map(task => (
                                <div key={task.id} className="p-3 bg-white rounded-lg shadow-sm border">
                                    <p className="font-semibold">{task.title}</p>
                                    <p className="text-xs text-gray-500">{task.code}</p>
                                    <div className="mt-2 text-right">
                                        <Button size="sm">Review</Button>
                                    </div>
                                </div>
                            ))}
                            </div>
                         ) : (
                            <p className="text-sm text-gray-500 bg-white p-4 rounded-lg border">You have no items awaiting your approval.</p>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};
