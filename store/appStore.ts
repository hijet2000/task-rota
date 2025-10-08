// store/appStore.ts
import { create } from 'zustand';
import { produce } from 'immer';
import {
    Employee, Shift, Project, Task, Location, ModalState, Page, Workspace, NotificationTemplate, TaskTemplate, TimeEntry, LeaveRequest
} from '../types.ts';
// FIX: Removed non-existent 'initializePermissions' from import.
import { login as loginUser, logout as logoutUser, getPermissions } from '../lib/permissions.ts';
import { dataService } from '../services/dataService.ts';


const APP_STORAGE_KEY = 'taskforge-app-state';

interface AppData {
    employees: Employee[];
    shifts: Shift[];
    projects: Project[];
    tasks: Task[];
    locations: Location[];
    workspaces: Workspace[];
    notificationTemplates: NotificationTemplate[];
    taskTemplates: TaskTemplate[];
    timeEntries: TimeEntry[];
    leaveRequests: LeaveRequest[];
}

interface AppState extends AppData {
    // UI State
    currentPage: Page;
    modals: ModalState;
    isLoggedIn: boolean;
    currentUser: Employee | null;
    isPwaMode: boolean;
    isLoading: boolean;
    selectedProject: Project | null;
    showConfetti: boolean;

    // Actions
    hydrateStore: () => Promise<void>;
    setCurrentPage: (page: Page) => void;
    openModal: (modal: keyof ModalState) => void;
    closeModal: (modal: keyof ModalState) => void;
    setSelectedProject: (project: Project | null) => void;

    // Auth Actions
    login: (email: string) => boolean;
    logout: () => void;
    
    // Data Mutation Actions
    addShift: (shiftData: Omit<Shift, 'id'>) => void;
    updateShift: (updatedShift: Shift) => void;
    addEmployee: (employeeData: Omit<Employee, 'id'>) => void;
    updateEmployee: (updatedEmployee: Employee) => void;
    deleteEmployee: (employeeId: number) => void;
    addLocation: (locationData: Omit<Location, 'id' | 'coordinates'>) => void;
    updateLocation: (updatedLocation: Location) => void;
    deleteLocation: (locationId: number) => void;
    addProject: (projectData: Omit<Project, 'id'>) => void;
    updateProject: (updatedProject: Project) => void;
    addTask: (taskData: Omit<Task, 'id' | 'code' | 'createdAt' | 'updatedAt' | 'activity' | 'slaState'>) => void;
    updateTask: (updatedTask: Task) => void;
    completeTask: (task: Task) => void;
    addNotificationTemplate: (templateData: Omit<NotificationTemplate, 'id'>) => void;
    updateNotificationTemplate: (updatedTemplate: NotificationTemplate) => void;
    deleteNotificationTemplate: (templateId: string) => void;
}

const useAppStore = create<AppState>((set, get) => {
    const setStateAndPersist = (updater: (state: AppState) => void) => {
        set(produce(updater));
        const { currentUser, isLoggedIn, isLoading, currentPage, modals, selectedProject, showConfetti, ...dataToPersist } = get();
        
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(dataToPersist));
    };

    return {
        // Initial State
        employees: [],
        shifts: [],
        projects: [],
        tasks: [],
        locations: [],
        workspaces: [],
        notificationTemplates: [],
        taskTemplates: [],
        timeEntries: [],
        leaveRequests: [],

        currentPage: 'Rota',
        // FIX: Added 'isRequestLeaveOpen' to modal state for consistency with its usage.
        modals: { isAddShiftOpen: false, isMyShiftsOpen: false, isMyAvailabilityOpen: false, isInboxOpen: false, isHelpOpen: false, isQuickAddOpen: false, isRequestLeaveOpen: false },
        isLoggedIn: false,
        currentUser: null,
        isPwaMode: window.matchMedia('(display-mode: standalone)').matches,
        isLoading: true,
        selectedProject: null,
        showConfetti: false,

        // Actions
        hydrateStore: async () => {
            set({ isLoading: true });
            const storedData = localStorage.getItem(APP_STORAGE_KEY);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                // Dates need to be re-hydrated from strings
                const shiftsWithDates = parsedData.shifts.map((s: any) => ({ ...s, startTime: new Date(s.startTime), endTime: new Date(s.endTime) }));
                set({ ...parsedData, shifts: shiftsWithDates, isLoading: false });
            } else {
                // First time load, fetch from data service
                const initialData = await dataService.getAllData();
                set({ ...initialData, isLoading: false });
            }
        },
        setCurrentPage: (page) => set({ currentPage: page }),
        openModal: (modal) => set(produce(state => { state.modals[modal] = true; })),
        closeModal: (modal) => set(produce(state => { state.modals[modal] = false; })),
        setSelectedProject: (project) => set({ selectedProject: project }),

        // Auth Actions
        login: (email) => {
            const user = get().employees.find(e => e.email.toLowerCase() === email.toLowerCase());
            if (user) {
                loginUser(user);
                set({ isLoggedIn: true, currentUser: user });
                return true;
            }
            return false;
        },
        logout: () => {
            logoutUser();
            set({ isLoggedIn: false, currentUser: null, currentPage: 'Rota', selectedProject: null });
        },
        
        // Data Mutation Actions
        addShift: (shiftData) => setStateAndPersist(state => {
            const newShift: Shift = { ...shiftData, id: `shift_${Date.now()}` };
            state.shifts.push(newShift);
        }),
        updateShift: (updatedShift) => setStateAndPersist(state => {
            const index = state.shifts.findIndex(s => s.id === updatedShift.id);
            if (index !== -1) state.shifts[index] = updatedShift;
        }),
        addEmployee: (employeeData) => setStateAndPersist(state => {
            const newEmployee: Employee = { ...employeeData, id: Date.now(), availability: [] };
            state.employees.push(newEmployee);
        }),
        updateEmployee: (updatedEmployee) => setStateAndPersist(state => {
            const index = state.employees.findIndex(e => e.id === updatedEmployee.id);
            if (index !== -1) state.employees[index] = updatedEmployee;
        }),
        deleteEmployee: (employeeId) => setStateAndPersist(state => {
            state.employees = state.employees.filter(e => e.id !== employeeId);
        }),
        addLocation: (locationData) => setStateAndPersist(state => {
            const newLocation: Location = { ...locationData, id: Date.now(), coordinates: { latitude: 0, longitude: 0 } };
            state.locations.push(newLocation);
        }),
        updateLocation: (updatedLocation) => setStateAndPersist(state => {
            const index = state.locations.findIndex(l => l.id === updatedLocation.id);
            if (index !== -1) state.locations[index] = updatedLocation;
        }),
        deleteLocation: (locationId) => setStateAndPersist(state => {
            state.locations = state.locations.filter(l => l.id !== locationId);
        }),
        addProject: (projectData) => setStateAndPersist(state => {
            const newProject: Project = { ...projectData, id: `proj_${Date.now()}` };
            state.projects.push(newProject);
        }),
        updateProject: (updatedProject) => setStateAndPersist(state => {
            const index = state.projects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) state.projects[index] = updatedProject;
        }),
        addTask: (taskData) => setStateAndPersist(state => {
            const projectCode = state.projects.find(p => p.id === taskData.projectId)?.code || 'TSK';
            const projectTaskCount = state.tasks.filter(t => t.projectId === taskData.projectId).length;
            const newTask: Task = {
                ...taskData,
                id: `task_${Date.now()}`,
                code: `${projectCode}-${projectTaskCount + 1}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                activity: [],
                slaState: 'On Time',
            };
            state.tasks.push(newTask);
        }),
        updateTask: (updatedTask) => setStateAndPersist(state => {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) state.tasks[index] = updatedTask;
        }),
        completeTask: (task) => setStateAndPersist(state => {
            const taskIndex = state.tasks.findIndex(t => t.id === task.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].status = 'Done';
            }
            set({ showConfetti: true });
            setTimeout(() => set({ showConfetti: false }), 4000);
        }),
        addNotificationTemplate: (templateData) => setStateAndPersist(state => {
            const newTemplate: NotificationTemplate = { ...templateData, id: `tpl_${Date.now()}` };
            state.notificationTemplates.push(newTemplate);
        }),
        updateNotificationTemplate: (updatedTemplate) => setStateAndPersist(state => {
            const index = state.notificationTemplates.findIndex(t => t.id === updatedTemplate.id);
            if (index !== -1) state.notificationTemplates[index] = updatedTemplate;
        }),
        deleteNotificationTemplate: (templateId) => setStateAndPersist(state => {
            state.notificationTemplates = state.notificationTemplates.filter(t => t.id !== templateId);
        }),
    };
});

// Initialize permissions with the store's user data
useAppStore.subscribe(
  (state) => state.currentUser,
  (currentUser) => {
    const { hasPermission } = getPermissions();
    if (!currentUser && hasPermission('view_rota')) {
      // If user is logged out but permissions haven't cleared, force logout
      logoutUser();
    } else if (currentUser) {
      loginUser(currentUser);
    }
  }
);


export { useAppStore };