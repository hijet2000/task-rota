
export interface DemandDataPoint {
    hour: number; // 0-23
    demand: number; // e.g., number of covers, transactions, etc.
}

// Mock demand data for a typical day
export const mockDemandData: DemandDataPoint[] = [
    { hour: 7, demand: 10 },
    { hour: 8, demand: 25 },
    { hour: 9, demand: 40 },
    { hour: 10, demand: 35 },
    { hour: 11, demand: 30 },
    { hour: 12, demand: 60 },
    { hour: 13, demand: 75 },
    { hour: 14, demand: 55 },
    { hour: 15, demand: 40 },
    { hour: 16, demand: 45 },
    { hour: 17, demand: 60 },
    { hour: 18, demand: 80 },
    { hour: 19, demand: 90 },
    { hour: 20, demand: 85 },
    { hour: 21, demand: 60 },
    { hour: 22, demand: 40 },
];
