export enum TimeUnit {
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year'
}

export const NumberOfDays = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
} as { [key: string]: number };

export const NumberOfLabels = {
    day: 24,
    week: 7,
    month: 30,
    year: 12
} as { [key: string]: number };