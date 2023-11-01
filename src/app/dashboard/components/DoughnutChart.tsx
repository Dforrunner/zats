'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartColorsToMatchStatus } from './ChartColors';
import { RequestQueueStats } from '@/models/Stats';
import { TicketStatus } from '@/models/Ticket';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  queueStats: RequestQueueStats[];
}
export default function DoughnutChart({ queueStats }: Props) {
  const data = (queue: RequestQueueStats) => {
    let queueData = [
      queue.OpenTicketCount,
      queue.AssignedTicketCount,
      queue.InProgressTicketCount,
    ];

    const emptyQueue = queueData.every((n) => n === 0);
    const emptyQueueColor = ['rgba(100,100,100,0.6'];
    if (emptyQueue) {
      queueData = [100];
    }

    return {
      datasets: [
        {
          label: `# of ${queue.Name} requests`,
          data: queueData,
          backgroundColor: emptyQueue
            ? emptyQueueColor
            : ChartColorsToMatchStatus,
          borderColor: emptyQueue ? emptyQueueColor : ChartColorsToMatchStatus,
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className='w-full h-full p-3 flex flex-col'>
      <div className='w-full'>
        <h1 className='text-center w-full text-gray-600'>
          Request Queues With Active Request Counts
        </h1>

        <div className='flex gap-3 justify-center pt-8 pb-2'>
          {[
            TicketStatus.Open,
            TicketStatus.Assigned,
            TicketStatus.InProgress,
          ].map((status, index) => (
            <div
              key={status + 'doughnut-chart'}
              className='flex gap-1 justify-center items-center'
            >
              <span
                style={{ backgroundColor: ChartColorsToMatchStatus[index] }}
                className='w-[25px] h-[10px] inline-block'
              ></span>
              <span className='text-sm text-gray-600'>{status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full flex items-start justify-center h-full flex-wrap '>
        {queueStats.map((queue, index) => {
          const chartData = data(queue);
          return (
            <div className='w-[200px]' key={queue.Name + index + 'donut'}>
              <div className='relative'>
                <div className='absolute w-full h-full z-10 flex justify-center items-center text-[40px] font-extrabold text-gray-600'>
                  {queue.ActiveTicketCount}
                </div>
                <Doughnut data={chartData} />
              </div>

              <div className='text-center'>{queue.Name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
