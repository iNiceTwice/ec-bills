import { NextResponse } from 'next/server';

export function middleware(request) {

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/analysis/bills', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
