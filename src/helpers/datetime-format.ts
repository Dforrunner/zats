import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export const formatDate = (date: Date) =>
  dayjs(date).format('MM/DD/YY h:mm:ss A');

export const getTimeInSeconds = (start: Date, end: Date | null | undefined) => {
  const diffInSeconds = dayjs(end || new Date()).diff(start);
  return dayjs.duration(diffInSeconds).asMilliseconds();
};

export const formatTimeFromSeconds = (durInSeconds: number) => {
  return dayjs.utc(durInSeconds).format('HH:mm:ss');
};

export const timeDiff = (start: Date, end: Date | null | undefined) => {
  const diffInSeconds = dayjs(end || new Date()).diff(start);
  const durInSeconds = dayjs.duration(diffInSeconds).asMilliseconds();
  const formattedTimeDiff = dayjs.utc(durInSeconds).format('HH:mm:ss');
  return formattedTimeDiff;
};
