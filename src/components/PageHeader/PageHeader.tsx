import { Typography } from "@mui/material";
import BackButton from "../BackButton";

interface Props {
  title: string,
  href: string
}
export default function PageHeader({ title, href }: Props) {
  return (
    <div className='flex justify-center'>
      <BackButton href={href} />
      <Typography className='pt-5' variant='h4'>
        {title}
      </Typography>
    </div>
  );
}