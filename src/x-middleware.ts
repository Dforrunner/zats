import { NextRequest, NextResponse } from "next/server";

const allowedIps = [
    '71.10.209.243'
]
export default function middleware(req: NextRequest) {
    
    const unauthorizedPagePath = '/out';
    if(req.nextUrl.pathname === unauthorizedPagePath) {
        return;
    }
    if(req.ip && allowedIps.includes(req.ip)) {
        const response = NextResponse.next();
        response.cookies.set('reqData', JSON.stringify({
            ip: `${req.ip}`,
            geo: req.geo,
        }))
        return response;
    }
    console.log({
        ip: req.ip,
        geo: req.geo,
    })
    return NextResponse.redirect(new URL(unauthorizedPagePath, req.url));
}