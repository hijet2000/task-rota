import React from 'react';
import { Input, Select, Button } from './ui.tsx';
import { employees } from '../data/mockData.ts';
import { projects } from '../data/projectData.ts';
import { Task } from '../types.ts';

export interface Filters {
    searchTerm: string;
    assigneeIds: string[];
    projectIds: string[];
    priorities: Task['priority'][];
    statuses: Task['status'][];
    dueDate: string;
}

export interface Sort {
    by: string;
    direction: 'asc' | 'desc';
}

interface FilterBarProps {
    filters: Filters;
    onFilterChange: (filterName: keyof Filters, value: any) => void;
    sort: Sort;
    onSortChange: (sortBy: string) => void;
    onClearFilters: () => void;
}

const priorityOptions: Task['priority'][] = ['Low', 'Medium', 'High', 'Urgent'];
const statusOptions: Task['status'][] = ['Draft', 'In Progress', 'Blocked', 'In Review', 'Done'];

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, sort, onSortChange, onClearFilters }) => {

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, selectedOptions } = e.target;
        // FIX: Use `selectedOptions` and explicitly type `option` to resolve TypeScript errors and improve efficiency.
        const values = Array.from(selectedOptions, (option: HTMLOptionElement) => option.value);
        onFilterChange(name as keyof Filters, values);
    };
    
    const getSortIndicator = (key: string) => {
        if (sort.by !== key) return null;
        return sort.direction === 'asc' ? ' ▲' : ' ▼';
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start">
                <div className="xl:col-span-5">
                     <Input
                        label="Search Tasks"
                        placeholder="By title or code..."
                        value={filters.searchTerm}
                        onChange={(e) => onFilterChange('searchTerm', e.target.value)}
                    />
                </div>
                <div>
                    <Select
                        label="Assignees"
                        name="assigneeIds"
                        multiple
                        value={filters.assigneeIds}
                        onChange={handleMultiSelectChange}
                        className="h-24"
                    >
                        <option value="unassigned">Unassigned</option>
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </Select>
                </div>
                 <div>
                    <Select
                        label="Projects"
                        name="projectIds"
                        multiple
                        value={filters.projectIds}
                        onChange={handleMultiSelectChange}
                        className="h-24"
                    >
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </Select>
                 </div>
                 <div>
                    <Select
                        label="Priorities"
                        name="priorities"
                        multiple
                        value={filters.priorities}
                        onChange={handleMultiSelectChange}
                        className="h-24"
                    >
                        {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                 </div>
                 <div>
                    <Select
                        label="Statuses"
                        name="statuses"
                        multiple
                        value={filters.statuses}
                        onChange={handleMultiSelectChange}
                        className="h-24"
                    >
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                 </div>
                <div className="flex flex-col space-y-2">
                    <Select
                        label="Due Date"
                        name="dueDate"
                        value={filters.dueDate}
                        onChange={(e) => onFilterChange('dueDate', e.target.value)}
                    >
                        <option value="">Any Time</option>
                        <option value="overdue">Overdue</option>
                        <option value="today">Today</option>
                        <option value="this_week">This Week</option>
                        <option value="next_week">Next Week</option>
                        <option value="no_due_date">No Due Date</option>
                    </Select>
                     <Select
                        label="Sort By"
                        value={sort.by}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="dueDate">Due Date{getSortIndicator('dueDate')}</option>
                        <option value="priority">Priority{getSortIndicator('priority')}</option>
                        <option value="title">Title{getSortIndicator('title')}</option>
                    </Select>
                    <Button variant="secondary" onClick={onClearFilters}>Clear All</Button>
                </div>
            </div>
        </div>
    );
};