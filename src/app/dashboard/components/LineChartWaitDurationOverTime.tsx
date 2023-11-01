'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RequestQueueStats } from '@/models/Stats';
import { ChartColors } from './ChartColors';
import { TimeUnit } from '@/models/TimeUnit';
import { LineChartLabels } from '@/models/ChartLabels';
import { getLabels } from '@/lip/chartjs-line-chart-helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  queueStats: RequestQueueStats[];
  timeUnit: TimeUnit;
}
export function LineChartWaitDurationOverTime({ queueStats, timeUnit }: Props) {
  const graphTimeUnit = timeUnit === TimeUnit.Day ? 'Hour' : 'Day';
  const labels = getLabels(queueStats, timeUnit);

  const data = {
    labels: labels.chartLabels,
    datasets: queueStats.map((queue, index) => ({
      label: queue.Name,
      data: getDataSet(queue, labels),
      borderColor: ChartColors[index],
      backgroundColor: ChartColors[index],
    })),
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        ticks: {
          callback(val: string): string {
            return val + ' mins';
          },
        },
      },
    },
  } as any;

  return (
    <div className='w-full h-full flex justify-center items-center flex-col p-3'>
      <h1 className='text-center w-full text-gray-600'>
        Average Wait Duration Over The Past {graphTimeUnit}
      </h1>

      <Line data={data} options={options} />
    </div>
  );
}

/**
 * Gets dataset for chart. It assigns the values to the correct chartLabels
 * @param queue
 * @param labels
 * @returns
 */
const getDataSet = (queue: RequestQueueStats, labels: LineChartLabels) => {
  //Initializing dataset with labels and default value of 0
  const dataset: { [key: string]: number } = {};
  labels.chartLabels.forEach((label) => (dataset[label] = 0));

  //Looping though the sortedLabels
  labels.sortedLabels.forEach((label, index) => {
    //Get the corresponding formatted label
    const formattedLabel = labels.formattedDateLabels[index];

    //Update the dataset for the corresponding label
    if (queue.GroupedTickets[label]) {
      const ticketGroup = queue.GroupedTickets[label];
      dataset[formattedLabel] =
        ticketGroup.reduce(
          (acc, ticket) => (acc += ticket.WaitDuration / 60000),
          0
        ) / ticketGroup.length;
    }
  });

  return dataset;
};
