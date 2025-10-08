// types.ts

export type Page =
    | 'Rota'
    | 'Projects'
    | 'MyWork'
    | 'AllTasks'
    | 'People'
    | 'Locations'
    | 'Leave'
    | 'Timesheets'
    | 'Reports'
    | 'Automations'
    | 'Templates'
    | 'Notifications'
    | 'Integrations'
    | 'Settings'
    | 'Admin';

export type Role = 'Owner' | 'Admin' | 'Manager' | 'Member' | 'Head Chef' | 'QA Lead' | 'Contributor' | 'Viewer' | 'Maintainer';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface AvailabilityPeriod {
    startTime: string; // "HH:MM"
    endTime: string;   // "HH:MM"
    type: 'unavailable' | 'preferred';
}

export interface DailyAvailability {
    day: DayOfWeek;
    periods: AvailabilityPeriod[];
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatarUrl: string;
    role: Role;
    locationId: number;
    payType: 'hourly' | 'salary';
    hourlyRate?: number;
    annualSalary?: number;
    contractedHours: number;
    skills: string[];
    availability: DailyAvailability[];
}

export interface Shift {
    id: string;
    employeeId: number | null;
    locationId: number;
    role: string;
    startTime: Date;
    endTime: Date;
    unpaidBreakMinutes: number;
    color: string;
    notes?: string;
}

export interface Location {
    id: number;
    name: string;
    code: string;
    address: string;
    phone: string;
    holidayCalendar: 'UK' | 'ZA' | 'ZW';
    timezone: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
    regions: string[];
}

export interface LeaveRequest {
    id: string;
    employeeId: number;
    type: 'Annual' | 'Sick' | 'Unpaid';
    status: 'Pending' | 'Approved' | 'Declined';
    startDate: Date;
    endDate: Date;
    notes?: string;
}

export interface BlackoutDate {
    id: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    locationIds: number[];
}

export interface Timesheet {
    employeeId: number;
    employeeName: string;
    payPeriod: {
        start: Date;
        end: Date;
    };
    shifts: Shift[];
    totalHours: number;
    totalPay: number;
    status: 'Pending' | 'Approved' | 'Exported';
}

export interface TimeClockEntry {
    id: string;
    employeeId: number;
    locationId: number;
    clockIn: Date;
    clockOut?: Date;
    breaks: { start: Date; end: Date }[];
    photoUrl?: string;
    isVerified: boolean;
    gps?: { latitude: number; longitude: number };
    status: 'pending' | 'synced' | 'error';
    deviceFingerprint: string;
}

export interface Device {
    id: string;
    userId: number;
    deviceName: string;
    lastSeen: string;
    ipAddress: string;
}

export interface TenantAuditLogEntry {
    id: string;
    timestamp: Date;
    user: string;
    action: string;
    details: {
        ip: string;
        device: string;
        [key: string]: any;
    };
}

export interface Backup {
    id: string;
    timestamp: Date;
    status: 'Success' | 'Failed';
    type: 'Automatic' | 'Manual';
}

export interface Permission {
    id: string;
    description: string;
}

export interface RoleDefinition {
    name: Role;
    description: string;
    isDefault: boolean;
    permissions: string[];
}

export interface ApiToken {
    id: string;
    name: string;
    tokenPrefix: string;
    created: string;
    lastUsed: string | null;
    scopes: string[];
}

export interface Webhook {
    id: string;
    url: string;
    events: string[];
    status: 'active' | 'inactive';
}

export interface BillingPlan {
  id: 'free' | 'pro' | 'enterprise' | 'Trial';
  name: string;
  price: number;
  priceId: string;
  userLimit: number | 'unlimited';
  features: string[];
}

export interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Due' | 'Overdue';
    pdfUrl: string;
}

export interface Tenant {
    id: string;
    name: string;
    plan: BillingPlan['id'];
    activeUsers: number;
    status: 'Active' | 'Suspended' | 'Trial';
    health: 'OK' | 'Error';
}

export interface SystemAuditLogEntry extends TenantAuditLogEntry {
    tenantId: string;
}

export interface NotificationTemplate {
    id: string;
    name: string;
    description: string;
    event: string;
    channels: NotificationChannel[];
    subject?: string;
    message: string;
}

export type NotificationChannel = 'Email' | 'SMS' | 'In-App' | 'WhatsApp' | 'Custom';

export interface NotificationLog {
    id: string;
    timestamp: Date;
    recipientId: number;
    templateName: string;
    channel: NotificationChannel;
    status: 'Sent' | 'Delivered' | 'Failed';
    isRead: boolean;
}

export interface Workspace {
    id: string;
    name: string;
    description: string;
}

export interface Project {
    id: string;
    name: string;
    code: string;
    description: string;
    workspaceId: string;
    members: { userId: number; role: Role }[];
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
    status: 'Draft' | 'In Progress' | 'Done' | 'Archived';
    color: string;
    tags: string[];
    isArchived: boolean;
}

export interface Task {
    id: string;
    projectId: string;
    code: string; // e.g., ROT-123
    title: string;
    description: string;
    status: 'Draft' | 'In Progress' | 'Blocked' | 'In Review' | 'Done';
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    assigneeIds: number[];
    dueDate: string | null; // YYYY-MM-DD
    labels: string[];
    checklist: { item: string; completed: boolean }[];
    attachments: { name: string; url: string }[];
    dependencies: string[]; // array of task IDs
    createdAt: string;
    updatedAt: string;
    slaState: 'On Time' | 'At Risk' | 'Breached' | null;
    activity: { timestamp: string; user: string; action: string }[];
    isPublic?: boolean;
    sharedWith?: number[];
}

export interface TaskTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    tasks: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt' | 'code' | 'slaState' | 'activity'>[];
}

export interface TimeEntry {
    id: string;
    taskId: string;
    userId: number;
    startTime: string; // ISO String
    endTime: string; // ISO String
    notes?: string;
}

export interface AutomationTrigger {
    type: AutomationTriggerType;
    params: Record<string, any>;
}

export interface AutomationCondition {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains';
    value: any;
}

export interface AutomationAction {
    type: string;
    params: Record<string, any>;
}

export interface AutomationRule {
    id: string;
    name: string;
    description: string;
    trigger: AutomationTrigger;
    conditions: AutomationCondition[];
    actions: AutomationAction[];
    isEnabled: boolean;
    lastRun?: string;
    runCount: number;
}

export type AutomationTriggerType =
  | 'task.created'
  | 'task.status.changed'
  | 'task.approaching_due'
  | 'task.sla.at_risk'
  | 'form.submitted'
  | 'shift.published'
  | 'shift.missed_clock_in'
  | 'leave.approved'
  | 'incident.logged';


export interface ModalState {
    isAddShiftOpen: boolean;
    isMyShiftsOpen: boolean;
    isMyAvailabilityOpen: boolean;
    isInboxOpen: boolean;
    isHelpOpen: boolean;
    isQuickAddOpen: boolean;
// FIX: Added missing isRequestLeaveOpen property to the ModalState type.
    isRequestLeaveOpen: boolean;
}