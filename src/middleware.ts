import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set('x-url', request.url);
    return NextResponse.next({
        request: {
            headers: reqHeaders
        }
    })
}