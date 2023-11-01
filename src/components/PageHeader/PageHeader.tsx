import { Typography } from '@mui/material';
import BackButton from '../BackButton';

interface Props {
  title: string;
  href: string;
}
export default function PageHeader({ title, href }: Props) {
  return (
    <div className='grid grid-cols-3'>
      <div className='p-3'>
        <BackButton href={href} />
      </div>

      <Typography className='pt-5 text-center' variant='h4'>
        {title}
      </Typography>
    </div>
  );
}
