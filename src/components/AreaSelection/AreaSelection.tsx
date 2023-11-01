import Link from '../Link';
import { getRequestAreas } from '@/lip/requests';

export const revalidate = 5;

export default async function AreaSelection() {
  const areas = await getRequestAreas();

  if (!areas.length)
    return <div className='text-center py-10'>Areas not found</div>;

  return (
    <div className='p-5 pb-10 w-full h-full flex flex-col gap-3 items-center overflow-auto'>
      {areas.map((area) => (
        <Link
          href={`/requester/${area.Id}`}
          type='button'
          variant='contained'
          key={area.Title + 'Selection'}
          className={`bg-blue-500 w-full h-[60px] text-2xl`}
        >
          {area.Title}
        </Link>
      ))}
    </div>
  );
}
