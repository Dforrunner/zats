import { getStats } from '@/lip/requests';
import FilterButtons from './components/FilterButtons';
import ActiveAreaCards from './components/ActiveAreaCards';
import PieChart from './components/PieChart';
import { LineChart } from './components/LineChart';
import { TimeUnit } from '@/models/TimeUnit';
import DoughnutChart from './components/DoughnutChart';
import BackButton from '@/components/BackButton';
import RefreshTimer from '@/components/RefreshTimer';
import CardContainer from './components/CardContainer';
import ViewOptionButtons from './components/ViewOptionButtons';
import { LineChartWaitDurationOverTime } from './components/LineChartWaitDurationOverTime';
import { DatabaseError } from '@/lip/exceptions';
import CounterDownProgress from './components/CounterDownProgress';

interface Props {
  searchParams?: {
    timePeriod?: TimeUnit;
    board?: string;
  };
}
export default async function Page({ searchParams }: Props) {
  const stats = await getStats(searchParams);

  if (stats?.error) {
    throw new DatabaseError();
  }

  return (
    <main className='w-scree min-h-screen bg-gray-500'>
      <RefreshTimer />

      <div className='absolute w-full flex justify-center top-2 -z-0'>
        <h1 className='w-[400px] rounded-[10px] text-center text-gray-500 bg-gray-200 '>
          PLANT REQUEST STATISTICS FOR THE PAST{' '}
          {searchParams?.timePeriod?.toLocaleUpperCase() || 'DAY'}
        </h1>
      </div>

      <div className='h-[4vh] flex justify-between items-center relative'>
        <BackButton
          href='/'
          className='h-[28px] text-xs bg-gray-400 ml-3 w-[140px]'
        />
        <ViewOptionButtons />

        <FilterButtons />

        <div className='p-3'>
          <CounterDownProgress />
        </div>
      </div>

      {(!searchParams?.board || searchParams.board === '1') && (
        <div className='flex flex-wrap gap-2 p-2 justify-between m-auto w-full'>
          <CardContainer className='h-[47vh]'>
            <LineChart
              queueStats={stats.QueueStats}
              timeUnit={searchParams?.timePeriod || TimeUnit.Day}
            />
          </CardContainer>

          <CardContainer className='h-[47vh]'>
            <PieChart
              queueStats={stats.QueueStats}
              timeUnit={searchParams?.timePeriod || TimeUnit.Day}
            />
          </CardContainer>

          <CardContainer className='xl:h-[47vh]'>
            <DoughnutChart queueStats={stats.QueueStats} />
          </CardContainer>
        </div>
      )}

      {searchParams?.board && searchParams.board === '3' && (
        <>
          <div className='flex gap-2 p-2 justify-between m-auto w-full'>
            <CardContainer className='h-[46vh] w-1/2'>
              <LineChart
                queueStats={stats.QueueStats}
                timeUnit={searchParams?.timePeriod || TimeUnit.Day}
              />
            </CardContainer>

            <CardContainer className='h-[46vh] w-1/2'>
              <LineChartWaitDurationOverTime
                queueStats={stats.QueueStats}
                timeUnit={searchParams?.timePeriod || TimeUnit.Day}
              />
            </CardContainer>
          </div>

          <div className='flex flex-wrap gap-2 p-2 justify-between m-auto w-full'>
            <CardContainer className='h-[46vh]'>
              <PieChart
                queueStats={stats.QueueStats}
                timeUnit={searchParams?.timePeriod || TimeUnit.Day}
              />
            </CardContainer>

            <CardContainer className='xl:h-[46vh]'>
              <DoughnutChart queueStats={stats.QueueStats} />
            </CardContainer>
          </div>
        </>
      )}

      <div className='flex justify-center w-full px-2'>
        {(!searchParams?.board ||
          searchParams.board === '1' ||
          searchParams.board === '2') && (
          <CardContainer
            className={
              searchParams?.board === '2' ? ' min-h-[94vh]' : 'min-h-[45vh]'
            }
          >
            <ActiveAreaCards stats={stats} />
          </CardContainer>
        )}
      </div>
    </main>
  );
}
