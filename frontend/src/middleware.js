import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export default async function middleware(request) {
    const logged = cookies().has('user');
    if (!logged) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: '/account/:path*',
}