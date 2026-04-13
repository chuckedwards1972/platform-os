// middleware.ts — runs on every request before it reaches any route handler.
// Purpose: log all incoming requests so we can confirm whether the Railway
// health-check probe is reaching the Next.js process at all.
//
// This file must live at the project root (next to package.json) for
// Next.js 12+ to pick it up automatically.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { method, nextUrl, headers } = request;

  // Log every request that enters the Next.js server so we can see
  // whether the health-check probe is arriving.
  console.log('[middleware] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('[middleware] INCOMING REQUEST');
  console.log('[middleware]   method :', method);
  console.log('[middleware]   url    :', nextUrl.toString());
  console.log('[middleware]   path   :', nextUrl.pathname);
  console.log('[middleware]   host   :', headers.get('host'));
  console.log('[middleware]   x-forwarded-for:', headers.get('x-forwarded-for'));
  console.log('[middleware]   user-agent     :', headers.get('user-agent'));
  console.log('[middleware] <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

  // Pass the request through unchanged — this middleware is logging-only.
  return NextResponse.next();
}

// Match every route so nothing is missed.
export const config = {
  matcher: '/:path*',
};
