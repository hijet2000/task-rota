
import React, { useMemo, useState } from 'react';
import { Task, Project } from '../types.ts';
import { getPermissions } from '../lib/permissions.ts';
import { TaskCard } from './TaskCard.tsx';
import { TaskDetailView } from './TaskDetailView.tsx';
import { useAppStore } from '../store/appStore.ts';
import { Button } from './ui.tsx';
import { BulkEditModal } from './BulkEditModal.tsx';
import { FilterBar, Filters, Sort } from './FilterBar.tsx';
import { KanbanBoard } from './KanbanBoard.tsx';

type ViewMode = 'List' | 'Board';

const priorityOrder: Record<Task['priority'], number> = {
    'Urgent': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1,
};

const initialFilters: Filters = {
    searchTerm: '',
    assigneeIds: [],
    projectIds: [],
    priorities: [],
    statuses: [],
    dueDate: '',
};

const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    d.setDate(diff);
    return d;
};


export const MyWorkPage: React.FC = () => {
    const { currentUser } = getPermissions();
    const { tasks, projects, bulkUpdateTasks } = useAppStore(state => ({
        tasks: state.tasks,
        projects: state.projects,
        bulkUpdateTasks: state.bulkUpdateTasks,
    }));
    
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
    const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
    
    const [viewMode, setViewMode] = useState<ViewMode>('List');
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [sort, setSort] = useState<Sort>({ by: 'default', direction: 'asc' });

    const handleFilterChange = (filterName: keyof Filters, value: any) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const handleSortChange = (sortBy: string) => {
        setSort(prev => {
            if (prev.by === sortBy && sortBy !== 'priority') {
                return { by: sortBy, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { by: sortBy, direction: sortBy === 'priority' ? 'desc' : 'asc' };
        });
    };
    
    const handleClearFilters = () => {
        setFilters(initialFilters);
        setSort({ by: 'default', direction: 'asc' });
    };

    const filteredAndSortedTasks = useMemo(() => {
        if (!currentUser) return [];

        const myProjectIds = new Set(
            projects
                .filter(p => p.members.some(m => m.userId === currentUser.id))
                .map(p => p.id)
        );
        let visibleTasks = tasks.filter(task => 
            myProjectIds.has(task.projectId) || task.assigneeIds.includes(currentUser.id)
        );

        // Apply filters
        visibleTasks = visibleTasks.filter(task => {
            const term = filters.searchTerm.toLowerCase();
            if (term && !(task.title.toLowerCase().includes(term) || task.code.toLowerCase().includes(term))) return false;

            if (filters.assigneeIds.length > 0) {
                const hasUnassigned = filters.assigneeIds.includes('unassigned');
                const normalIds = filters.assigneeIds.filter(id => id !== 'unassigned').map(id => parseInt(id, 10));
                
                const isAssignedToSelected = task.assigneeIds.some(assigneeId => normalIds.includes(assigneeId));
                const isUnassignedAndSelected = hasUnassigned && task.assigneeIds.length === 0;

                if (!isAssignedToSelected && !isUnassignedAndSelected) return false;
            }

            if (filters.projectIds.length > 0 && !filters.projectIds.includes(task.projectId)) return false;
            if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) return false;
            if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) return false;

            if (filters.dueDate) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (filters.dueDate === 'no_due_date') {
                    if (task.dueDate) return false;
                } else if (!task.dueDate) {
                    return false;
                } else {
                    const dueDate = new Date(task.dueDate);
                    dueDate.setHours(0, 0, 0, 0);

                    if (filters.dueDate === 'overdue' && dueDate.getTime() >= today.getTime()) return false;
                    if (filters.dueDate === 'today' && dueDate.getTime() !== today.getTime()) return false;
                    if (filters.dueDate === 'this_week') {
                        const startOfWeek = getStartOfWeek(today);
                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 6);
                        if (dueDate < startOfWeek || dueDate > endOfWeek) return false;
                    }
                    if (filters.dueDate === 'next_week') {
                        const startOfNextWeek = getStartOfWeek(new Date(today.setDate(today.getDate() + 7)));
                        const endOfNextWeek = new Date(startOfNextWeek);
                        endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
                        if (dueDate < startOfNextWeek || dueDate > endOfNextWeek) return false;
                    }
                }
            }

            return true;
        });

        // Apply sorting
        if (sort.by !== 'default') {
            visibleTasks.sort((a, b) => {
                if (sort.by === 'dueDate') {
                    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : sort.direction === 'asc' ? Infinity : -Infinity;
                    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : sort.direction === 'asc' ? Infinity : -Infinity;
                    return sort.direction === 'asc' ? dateA - dateB : dateB - dateA;
                }
                if (sort.by === 'priority') return priorityOrder[b.priority] - priorityOrder[a.priority];
                if (sort.by === 'title') return a.title.localeCompare(b.title) * (sort.direction === 'asc' ? 1 : -1);
                return 0;
            });
        }

        return visibleTasks;
    }, [tasks, projects, currentUser, filters, sort]);
    
    const handleSelectToggle = (taskId: string) => {
        setSelectedTaskIds(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    const handleApplyBulkChanges = (changes: Partial<Task>) => {
        bulkUpdateTasks(selectedTaskIds, changes);
        setIsBulkEditOpen(false);
        setSelectedTaskIds([]);
    };

    if (!currentUser) {
        return <div className="p-8">Please select a user to see their work.</div>;
    }
    
    if (selectedTask) {
        return <TaskDetailView task={selectedTask} onClose={() => setSelectedTask(null)} />;
    }

    const renderListView = () => (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedTasks.map(task => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onClick={() => setSelectedTask(task)} 
                    isSelected={selectedTaskIds.includes(task.id)}
                    onSelectToggle={handleSelectToggle}
                />
            ))}
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6">My Work</h1>

            <FilterBar 
                filters={filters}
                onFilterChange={handleFilterChange}
                sort={sort}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
            />

             <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-md">
                    <Button variant={viewMode === 'List' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('List')}>List</Button>
                    <Button variant={viewMode === 'Board' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('Board')}>Board</Button>
                </div>
                {selectedTaskIds.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex items-center">
                        <span className="font-medium text-blue-800 text-sm mr-4">{selectedTaskIds.length} tasks selected</span>
                        <div>
                            <Button size="sm" onClick={() => setIsBulkEditOpen(true)}>Edit Tasks...</Button>
                            <Button variant="secondary" size="sm" className="ml-2" onClick={() => setSelectedTaskIds([])}>Clear</Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {filteredAndSortedTasks.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
                    </div>
                ) : (
                    viewMode === 'List' 
                        ? renderListView()
                        : <KanbanBoard tasks={filteredAndSortedTasks} onTaskClick={setSelectedTask} />
                )}
            </div>
             <BulkEditModal
                isOpen={isBulkEditOpen}
                onClose={() => setIsBulkEditOpen(false)}
                selectedTaskIds={selectedTaskIds}
                onApplyChanges={handleApplyBulkChanges}
            />
        </div>
    );
};