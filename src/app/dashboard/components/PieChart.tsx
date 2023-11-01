'use client';

import { RequestQueueStats } from '@/models/Stats';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartColors } from './ChartColors';
import { TimeUnit } from '@/models/TimeUnit';
import { capitalize } from '@/lip/helpers';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  queueStats: RequestQueueStats[];
  timeUnit: TimeUnit;
}
export default function PieChart({ queueStats, timeUnit }: Props) {
  const formattedData = {
    labels: queueStats.map((queue) => queue.Name),
    datasets: [
      {
        label: '# of Active Tickets',
        data: queueStats.map((queue) => queue.TotalTicketCount),
        backgroundColor: ChartColors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-3'>
      <h1 className='text-center w-full text-gray-600'>
        Request Distribution Over The Past {capitalize(timeUnit)}
      </h1>
      <Pie data={formattedData} />
    </div>
  );
}
