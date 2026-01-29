import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { appConfig, routeMap } from './constants'


export function middleware(request: NextRequest){
    const token = request.cookies.get('access_token')?.value

    if(!token) {
        return NextResponse.redirect(new URL(routeMap.LOGIN, request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*"
    ]
}