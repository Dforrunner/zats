import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Props {
    onClick?: Function
}
export default function BackButton({onClick}: Props) {
    const router = useRouter();
    
    return (
        <Button className='absolute top-4 left-5 bg-gray-400' onClick={() => onClick ? onClick() : router.back()} variant='contained' startIcon={<ArrowBackIosIcon />}>Back</Button>
    )
}