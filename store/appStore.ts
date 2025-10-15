// --- WARNING: MOCK DATA STORE ---
// This file uses Zustand to create a client-side data store that mimics
// how a real application would manage state fetched from a backend.
//
// IN A PRODUCTION APP:
// - The initial state would be empty.
// - `fetchInitialData` would make authenticated API calls to a secure backend.
// - Actions like `addTask`, `updateTask` would send `POST`, `PUT`, etc., requests
//   to the backend API and update the state upon a successful response.
// - Data is not persisted in localStorage and is not shared between users.

import { create } from 'zustand';
import { Task, Project, ChecklistItem, Employee, Shift, Location, RoleDefinition, Workspace, CommentLog } from '../types.ts';
import { fetchAllData } from '../services/dataService.ts';
import { getPermissions } from '../lib/permissions.ts';

interface AppState {
  // State
  isLoading: boolean;
  tasks: Task[];
  projects: Project[];
  workspaces: Workspace[];
  employees: Employee[];
  shifts: Shift[];
  locations: Location[];
  roles: RoleDefinition[];

  // Actions
  fetchInitialData: () => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  bulkUpdateTasks: (taskIds: string[], updates: Partial<Task>) => void;
  addComment: (taskId: string, text: string) => void;
  addDependencies: (taskId: string, dependencyIds: string[]) => void;
  addChecklistItem: (taskId: string, text: string) => void;
  updateChecklistItem: (taskId: string, itemId: string, updates: Partial<ChecklistItem>) => void;
  deleteChecklistItem: (taskId: string, itemId: string) => void;
}

// FIX: Added `get` to the create callback parameters to fix "Cannot find name 'get'" error.
export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  isLoading: true,
  tasks: [],
  projects: [],
  workspaces: [],
  employees: [],
  shifts: [],
  locations: [],
  roles: [],
  
  // Actions
  fetchInitialData: async () => {
    if (!get().isLoading && get().tasks.length > 0) return; // Prevent re-fetching
    set({ isLoading: true });
    try {
        const data = await fetchAllData();
        set({
            tasks: data.tasks,
            projects: data.projects,
            workspaces: data.workspaces,
            employees: data.employees,
            shifts: data.shifts,
            locations: data.locations,
            roles: data.roles,
            isLoading: false
        });
    } catch (error) {
        console.error("Failed to fetch initial data", error);
        set({ isLoading: false });
    }
  },

  addTask: (task) => {
    console.log('[MockAPI] Adding task:', task);
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  updateTask: (task) => {
    console.log('[MockAPI] Updating task:', task);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
  },
  bulkUpdateTasks: (taskIds, updates) => {
    console.log(`[MockAPI] Bulk updating ${taskIds.length} tasks with:`, updates);
    set((state) => {
      const idSet = new Set(taskIds);
      return {
          tasks: state.tasks.map((task) => {
              if (idSet.has(task.id)) {
                  const updatedTask = { ...task, ...updates };
                  if (updates.assigneeIds) {
                      updatedTask.assigneeIds = updates.assigneeIds;
                  }
                  return updatedTask;
              }
              return task;
          }),
      };
    });
  },
  addComment: (taskId, text) => {
    const { currentUser } = getPermissions();
    if (!currentUser) return;

    const newComment: CommentLog = {
      type: 'comment',
      id: `act_${Date.now()}`,
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
      text,
    };
    
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            activity: [newComment, ...task.activity],
          };
        }
        return task;
      }),
    }));
  },
  // FIX: Added commas between method definitions and removed extra parentheses to fix syntax errors.
  addDependencies: (taskId, dependencyIds) => {
    console.log(`[MockAPI] Adding dependencies to ${taskId}:`, dependencyIds);
    set((state) => ({
    tasks: state.tasks.map((task) => {
      if (task.id === taskId) {
        const newDeps = new Set([...(task.dependencies || []), ...dependencyIds]);
        return { ...task, dependencies: Array.from(newDeps) };
      }
      return task;
    }),
  }));
  },
  addChecklistItem: (taskId, text) => {
    console.log(`[MockAPI] Adding checklist item to ${taskId}`);
    set((state) => ({
    tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
            const newItem: ChecklistItem = {
                id: `ci-${Date.now()}`,
                text,
                isCompleted: false,
            };
            return { ...task, checklist: [...task.checklist, newItem] };
        }
        return task;
    }),
  }));
  },
  updateChecklistItem: (taskId, itemId, updates) => set((state) => ({
      tasks: state.tasks.map((task) => {
          if (task.id === taskId) {
              return {
                  ...task,
                  checklist: task.checklist.map((item) =>
                      item.id === itemId ? { ...item, ...updates } : item
                  ),
              };
          }
          return task;
      }),
  })),
  deleteChecklistItem: (taskId, itemId) => set((state) => ({
      tasks: state.tasks.map((task) => {
          if (task.id === taskId) {
              return {
                  ...task,
                  checklist: task.checklist.filter((item) => item.id !== itemId),
              };
          }
          return task;
      }),
  })),
}));