import { v4 as uuidv4 } from 'uuid';
import Link from '../Link';
import { getRequestAreas } from '@/lip/requests';

export const revalidate = 5;

export default async function AreaSelection() {
  const areas = await getRequestAreas();
  console.log('RAN');

  if (!areas.length)
    return <div className='text-center py-10'>Areas not found</div>;

  return (
    <div className='p-5 w-full flex flex-col gap-3 items-center'>
      {areas.map((area) => (
        <Link
          href={`/requester/${area.Id}`}
          type='button'
          variant='contained'
          key={uuidv4()}
          className={`bg-blue-500 w-full h-[60px] text-2xl`}
        >
          {area.Name} {area.Description && ' - ' + area.Description}
        </Link>
      ))}
    </div>
  );
}
