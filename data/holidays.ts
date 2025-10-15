// FIX: Implemented mock holiday data.
export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
}

export interface HolidayCalendar {
    [regionCode: string]: Holiday[];
}

export const holidays: HolidayCalendar = {
    UK: [
        { date: '2024-01-01', name: "New Year's Day" },
        { date: '2024-03-29', name: 'Good Friday' },
        { date: '2024-04-01', name: 'Easter Monday' },
        { date: '2024-05-06', name: 'Early May bank holiday' },
        { date: '2024-05-27', name: 'Spring bank holiday' },
        { date: '2024-08-26', name: 'Summer bank holiday' },
        { date: '2024-12-25', name: 'Christmas Day' },
        { date: '2024-12-26', name: 'Boxing Day' },
    ],
    ZA: [
        { date: '2024-01-01', name: "New Year's Day" },
        { date: '2024-03-21', name: 'Human Rights Day' },
    ],
    ZW: [
        { date: '2024-01-01', name: "New Year's Day" },
        { date: '2024-02-21', name: 'Robert Gabriel Mugabe National Youth Day' },
    ]
};
