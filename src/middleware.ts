import { NextRequest, NextResponse } from "next/server";
import requestIp from 'request-ip';

export default function Middleware(req: NextRequest ) {
    // const detectedIp = requestIp.getClientIp(req);
    console.error(req)
}