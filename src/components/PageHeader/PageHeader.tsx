import { Typography } from "@mui/material";
import BackButton from "../BackButton";

export default function PageHeader({title}: {title: string}) {
    return (
      <div className='flex justify-center pb-10'>
        <BackButton />
        <Typography className='pt-5' variant='h4'>
          {title}
        </Typography>
      </div>
    );
}