
import { GroupedTickets } from "@/models/Stats";
import { TimeUnit } from "@/models/TimeUnit";
import dayjs from "dayjs";

export const groupByDate = (data: any[], dateProperty: string, timeUnit: TimeUnit): GroupedTickets => {

    const format = getDateFormat(timeUnit);
    const groupedData = data.reduce((acc, ticket) => {
        const key = dayjs(ticket[dateProperty]).format(format);
        if (!acc[key]) acc[key] = []

        acc[key].push(ticket);
        return acc;
    }, {})

    return groupedData;
}

export const getDateFormat = (timeUnit: TimeUnit) => {
    const hourFormat = 'YYYY-MM-DD HH:00:00';
    const dayFormat = 'YYYY-MM-DD';
    const monthFormat = 'YYYY-MM';

    const format = !timeUnit
        ? hourFormat
        : {
            day: hourFormat,
            week: dayFormat,
            month: dayFormat,
            year: monthFormat
        }[timeUnit]

    return format;
}