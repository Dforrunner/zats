import { Typography } from "@mui/material";
import BackButton from "../BackButton";

export default function PageHeader({title}: {title: string}) {
    return (
      <div>
        <BackButton />
        <Typography className='pt-5' variant='h4'>
          {title}
        </Typography>
      </div>
    );
}