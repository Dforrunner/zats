import Link from "@/components/Link";
import { Typography } from "@mui/material";

export default function Page() {
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col g-8">
            <Typography variant='h4'>
                You are on an unauthorized network
            </Typography>

            <p className="text-gray-600 py-10">
                Please connect to an authorized network and click the button below or try contacting support
            </p>

            <Link type="button" href="/" className="bg-blue-500" variant='contained'>
                Authenticate Again
            </Link>
            
        </div>
    )
}