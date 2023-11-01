import { RequestQueueStats } from "@/models/Stats";
import { NumberOfLabels, TimeUnit } from "@/models/TimeUnit";
import dayjs from "dayjs";

export const getLabels = (queueStats: RequestQueueStats[], timeUnit: TimeUnit) => {
    const format = getFormat(timeUnit); //Get format we want to use for the chart labels

    //Get default labels. These are the key values of the GroupedTickets
    const dateLabels: string[] = [];
    queueStats.map((queue) => {
        const groupData = queue.GroupedTickets;
        const groups = Object.keys(groupData);
        dateLabels.push(...groups);
    });

    //Get only unique labels
    const uniqueLabels = Array.from(new Set(dateLabels));
    //These are dates which we want to sort
    const sortedLabels: string[] = uniqueLabels.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });

    const formattedDateLabels: string[] = sortedLabels.map((label) =>
        dayjs(label).format(format)
    );

    //BUILD EXPECTED X-AXIS LABELS
    //This is to avoid skipping x-axis values in the chart
    const expectedNumberOfLabels = timeUnit
        ? NumberOfLabels[timeUnit]
        : NumberOfLabels.day;

    const tempArr = Array(expectedNumberOfLabels).fill('');
    const chartLabels: string[] = tempArr.map((x, index) => {
        const subVal = tempArr.length - index;
        if (!timeUnit || timeUnit === TimeUnit.Day)
            return dayjs()
                .subtract(subVal - 1, 'hour')
                .format(format);
        if (timeUnit === TimeUnit.Week || timeUnit === TimeUnit.Month)
            return dayjs().subtract(subVal, 'day').format(format);
        if (timeUnit === TimeUnit.Year)
            return dayjs().subtract(subVal, 'month').format(format);
        return x;
    });

    return { sortedLabels, formattedDateLabels, chartLabels };
};

export const getFormat = (timeUnit: TimeUnit) => {
    const hourFormat = 'h A';
    const dayFormat = 'DD/MM/YY';

    if (!timeUnit) return hourFormat;

    const formatOptions = {
        day: hourFormat,
        week: dayFormat,
        month: dayFormat,
        year: 'MM/YY',
    };
    return formatOptions[timeUnit];
};
