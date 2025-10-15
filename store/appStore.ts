import { create } from 'zustand';
import { tasks as mockTasks } from '../data/tasksData.ts';
import { projects as mockProjects } from '../data/projectData.ts';
import { Task, Project, ChecklistItem } from '../types.ts';

interface AppState {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  bulkUpdateTasks: (taskIds: string[], updates: Partial<Task>) => void;
  addDependencies: (taskId: string, dependencyIds: string[]) => void;
  addChecklistItem: (taskId: string, text: string) => void;
  updateChecklistItem: (taskId: string, itemId: string, updates: Partial<ChecklistItem>) => void;
  deleteChecklistItem: (taskId: string, itemId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  tasks: mockTasks,
  projects: mockProjects,
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  bulkUpdateTasks: (taskIds, updates) => set((state) => {
    const idSet = new Set(taskIds);
    return {
        tasks: state.tasks.map((task) => {
            if (idSet.has(task.id)) {
                // Create a new object with the updates applied
                const updatedTask = { ...task, ...updates };
                // Special handling for assigneeIds if it's in updates to ensure replacement
                if (updates.assigneeIds) {
                    updatedTask.assigneeIds = updates.assigneeIds;
                }
                return updatedTask;
            }
            return task;
        }),
    };
  }),
  addDependencies: (taskId, dependencyIds) => set((state) => ({
    tasks: state.tasks.map((task) => {
      if (task.id === taskId) {
        const newDeps = new Set([...(task.dependencies || []), ...dependencyIds]);
        return { ...task, dependencies: Array.from(newDeps) };
      }
      return task;
    }),
  })),
  addChecklistItem: (taskId, text) => set((state) => ({
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
  })),
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