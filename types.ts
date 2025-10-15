// This file contains type definitions for the entire application.

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface AvailabilityPeriod {
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
    type: 'preferred' | 'unavailable';
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
    role: string;
    avatarUrl: string;
    locationId: number;
    payType: 'salary' | 'hourly';
    annualSalary?: number;
    hourlyRate?: number;
    contractedHours: number;
    skills: string[];
    availability: DailyAvailability[];
    score: number;
}

export interface Shift {
    id: string;
    employeeId: number | null;
    locationId: number;
    startTime: Date;
    endTime: Date;
    role: string;
    unpaidBreakMinutes: number;
    color: string;
    isPublished: boolean;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface Location {
    id: number;
    name: string;
    code: string;
    address: string;
    phone: string;
    holidayCalendar: 'UK' | 'ZA' | 'ZW';
    timezone: string;
    coordinates: Coordinates;
    verificationType: 'GPS' | 'None';
}

export interface Permission {
    id: string;
    description: string;
    category: string;
}
export interface RoleDefinition {
    name: string;
    description: string;
    isDefault: boolean;
    permissions: string[];
}

export interface ChecklistItem {
    id: string;
    text: string;
    isCompleted: boolean;
}

export interface ActivityLog {
    type: 'system';
    id: string;
    userId: number;
    timestamp: string;
    action: string; // e.g., 'created this task', 'changed the status to "In Progress"'
}

export interface CommentLog {
    type: 'comment';
    id: string;
    userId: number;
    timestamp: string;
    text: string;
}

export interface Task {
    id: string;
    code: string;
    title: string;
    description: string;
    status: 'Draft' | 'In Progress' | 'Blocked' | 'In Review' | 'Done';
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    projectId: string;
    assigneeIds: number[];
    reporterId: number;
    dueDate: string | null;
    createdAt: string;
    labels: string[];
    checklist: ChecklistItem[];
    attachments: any[];
    dependencies: string[];
    relatedTaskIds?: string[];
    slaState: 'On Time' | 'At Risk' | 'Breached';
    isPublic: boolean;
    sharedWith: any[];
    activity: (ActivityLog | CommentLog)[];
}

export interface Workspace {
    id: string;
    name: string;
}

export interface ProjectMember {
    userId: number;
    role: 'Owner' | 'Maintainer' | 'Contributor';
}

export interface Project {
    id: string;
    name: string;
    code: string;
    description: string;
    workspaceId: string;
    isArchived: boolean;
    defaultApproverId: number | null;
    members: ProjectMember[];
}


export type FeatureId =
  | 'rota'
  | 'people'
  | 'locations'
  | 'leave'
  | 'time_clock'
  | 'timesheets'
  | 'my_work'
  | 'projects'
  | 'templates'
  | 'notifications'
  | 'reports'
  | 'automations'
  | 'integrations'
  | 'settings'
  | 'admin';

export interface Plan {
    id: 'basic' | 'pro' | 'enterprise';
    name: string;
    price: number;
    userLimit: number | 'unlimited';
    features: FeatureId[];
}

export interface TaskTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    tasks: Partial<Task>[];
}

export interface Timesheet {
    employeeId: number;
    employeeName: string;
    payPeriod: { start: Date; end: Date };
    shifts: Shift[];
    totalHours: number;
    totalPay: number;
    status: 'Pending' | 'Approved' | 'Exported';
}

export interface ApiToken {
    id: string;
    name: string;
    tokenPrefix: string;
    scopes: string[];
    lastUsed: string | null;
    createdAt: string;
}

export interface Webhook {
    id: string;
    url: string;
    events: string[];
    status: 'active' | 'inactive';
}

export interface BillingPlan {
  id: string;
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
    planId: Plan['id'];
    activeUsers: number;
    status: 'Active' | 'Trial' | 'Suspended';
    health: 'OK' | 'Error';
}

export interface SystemAuditLogEntry {
    id: string;
    timestamp: Date;
    user: string;
    tenantId: string;
    action: string;
    details: { ip: string; device: string; };
}

export interface TenantAuditLogEntry {
    id: string;
    timestamp: Date;
    user: string;
    action: string;
    details: { ip: string; device: string; };
}

export interface Device {
    id: string;
    userId: number;
    deviceName: string;
    lastSeen: string;
    ipAddress: string;
}

export interface Backup {
    id: string;
    timestamp: Date;
    status: 'Success' | 'Failed';
    type: 'Automatic' | 'Manual';
}

export interface LeaveRequest {
    id: string;
    employeeId: number;
    startDate: Date;
    endDate: Date;
    type: 'Annual' | 'Sick' | 'Unpaid';
    status: 'Pending' | 'Approved' | 'Declined';
    notes?: string;
}

export interface BlackoutDate {
    id: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    locationIds: number[];
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
    gps: Coordinates;
    status: 'pending' | 'synced' | 'error';
    deviceFingerprint: string;
}

export type NotificationChannel = 'Email' | 'SMS' | 'In-App' | 'WhatsApp' | 'Custom';
export interface NotificationTemplate {
    id: string;
    name: string;
    description: string;
    event: string;
    channels: NotificationChannel[];
    subject: string;
    message: string;
}

export interface NotificationLog {
    id: string;
    timestamp: Date;
    recipientId: number;
    channel: NotificationChannel;
    templateName: string;
    status: 'Sent' | 'Opened' | 'Failed';
    isRead: boolean;
}

export interface TimeEntry {
    id: string;
    userId: number;
    taskId: string;
    startTime: string; // ISO string
    endTime: string; // ISO string
    duration: number; // seconds
    notes?: string;
}

export type AutomationTriggerType = 'task.created' | 'task.status.changed' | 'task.approaching_due' | 'task.sla.at_risk' | 'form.submitted' | 'shift.published' | 'shift.missed_clock_in' | 'leave.approved' | 'incident.logged';
export interface AutomationCondition {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains';
    value: any;
}
export interface AutomationAction {
    type: 'notification.send' | 'task.set_field' | 'task.reassign' | 'webhook.send';
    [key: string]: any;
}

export interface AutomationRule {
    id: string;
    name: string;
    description: string;
    trigger: AutomationTriggerType;
    conditions: AutomationCondition[];
    actions: AutomationAction[];
    isEnabled: boolean;
    runCount: number;
    lastRun: string | null;
}

export interface ShiftTask {
    title: string;
    required: boolean;
    section: 'start' | 'middle' | 'end';
    priority: 'Low' | 'Medium' | 'High';
    frequency: 'per_shift' | 'daily' | 'weekly';
    dueOffsetMin: number;
    labels: string[];
}
export interface ShiftTaskTemplate {
    id: string;
    name: string;
    description: string;
    roleTags: string[];
    locationIds: number[];
    active: boolean;
    tasks: ShiftTask[];
}

export interface ShiftTaskInstance {
    id: string;
    shiftId: string;
    shiftTaskTemplateId: string;
    taskTemplate: ShiftTask;
    status: 'pending' | 'in_progress' | 'completed' | 'waived';
    progressEvents: any[];
    startedAt?: string;
    completedAt?: string;
    waivedReason?: string;
}