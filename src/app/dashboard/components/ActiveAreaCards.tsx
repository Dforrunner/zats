import { Stats } from '@/models/Stats';
import AreaCard from './AreaCard';
import { formatTimeFromSeconds } from '@/lip/datetime-format';

interface Props {
  stats: Stats;
}
export default function ActiveAreaCards({ stats }: Props) {
  const numberOfActiveAreas = stats.AreaStats.reduce(
    (acc, area) => (area.ActiveTickets.length > 0 ? (acc += 1) : acc),
    0
  );

  return (
    <div className='flex flex-col w-full h-full overflow-auto'>
      <div className='flex justify-between'>
        <div className='flex justify-end'>
          <div className='text-sm text-gray-500 rounded-[10px] bg-gray-100 w-[240px] text-center'>
            Number of Areas on the board: {numberOfActiveAreas}
          </div>
        </div>

        <h1 className='text-center w-full text-gray-600'>
          Active Requests By Request Area
        </h1>

        <div className='flex justify-end'>
          <div className='text-sm text-gray-500 rounded-[10px] bg-gray-100 w-[230px] text-center'>
            Avg Plant Wait Duration:
            <span> {formatTimeFromSeconds(stats.AvgPlantWaitDuration)}</span>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 p-2 justify-center w-full'>
        {stats &&
          stats.AreaStats.length &&
          stats.AreaStats.sort((a, b) => a.Name.localeCompare(b.Name)).map(
            (area, index) =>
              area.ActiveTickets.length ? (
                <AreaCard area={area} key={area.Title + 'card'} />
              ) : (
                ''
              )
          )}
      </div>

      {numberOfActiveAreas === 0 ? (
        <div className='w-full text-center text-sm text-gray-500'>
          There are no active requests
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
