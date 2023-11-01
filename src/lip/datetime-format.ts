import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc)

export const formatDate = (date: Date) =>
    dayjs(date).format('MM/DD/YY h:mm:ss A');

export const getTimeInMins = (date: number) => {
    return dayjs.duration(date).asMinutes();
}

export const timeDiffInMilliseconds = (start: Date, end: Date | null | undefined) => {
    const diffInSeconds = dayjs(end || new Date()).diff(start);
    return dayjs.duration(diffInSeconds).asMilliseconds();
}

export const formatTimeFromSeconds = (time: number) => {
    return dayjs.utc(time).format('HH:mm:ss')
}

export const timeDiffFormatted = (start: Date, end: Date | null | undefined) => {
    const durInSeconds = timeDiffInMilliseconds(start, end)
    return formatTimeFromSeconds(durInSeconds);
}