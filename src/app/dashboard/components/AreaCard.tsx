import { formatTimeFromSeconds } from '@/lip/datetime-format';
import { RequestAreaStats } from '@/models/Stats';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  area: RequestAreaStats;
}
export default function AreaCard({ area }: Props) {
  return (
    <div className='flex flex-col gap-2 items-center w-[250px] border border-1 border-gray-400 rounded p-2 bg-gray-100'>
      <div className='text-center'>{area.Title}</div>
      <div className='text-xs bg-gray-200 rounded-[10px] px-3 py-1'>
        Avg Wait Duration: {formatTimeFromSeconds(area.AvgWaitDuration)}
      </div>
      <div className='flex gap-1 flex-wrap justify-center'>
        {area.ActiveTickets?.sort(
          (a, b) => b.RequestQueue!.Name.length - a.RequestQueue!.Name.length
        ).map((ticket) => (
          <div
            className={`rounded-[10px] px-2 h-[35px] flex justify-center text-black font-bold text-[10px] flex-col items-center ${ticket.Status.replace(
              ' ',
              ''
            )}-bg`}
            key={uuidv4()}
          >
            <div>{ticket.RequestQueue?.Name}</div>
            <div>{formatTimeFromSeconds(ticket.WaitDuration)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
