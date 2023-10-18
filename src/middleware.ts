import { NextRequest, NextResponse } from "next/server";
import requestIp from 'request-ip';

export default function middleware(req: NextRequest ) {
    // const detectedIp = requestIp.getClientIp(req);
    //console.error(req)
    const response = NextResponse.next();
    console.log(req);
    response.cookies.set('reqData', JSON.stringify({
        ip: `${req.ip}`,
        geo: req.geo,
    }))
    // console.log(cookie)
    return response;
}