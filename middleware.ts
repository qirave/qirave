import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'
  ]
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ''}`;
  console.debug({ url, searchParams, path });

  // Get hostname of request (e.g., subdomain.qirave.com)
  let hostname = req.headers.get('host')!.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Check if it's on Vercel preview URL
  if (hostname.includes('---') && hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)) {
    hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  // Extract the subdomain (e.g., 'subdomain' from subdomain.qirave.com)
  const subdomain = hostname.split('.')[0];
  console.debug({ hostname, subdomain, path });

  // Handle the root domain (qirave.com) and public page access
  if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    console.debug('Root domain detected', { hostname, subdomain, path });
    return NextResponse.next();  // Allow public access to the main website
  }

  if (hostname === `auth.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    console.debug('Auth domain detected', { hostname, subdomain, path });
    return NextResponse.next();  // Allow public access to the auth domain
  }

  // Handle subdomain-based dashboards: Check if user is authenticated
  const session = null;
  
  if (!session) {
    // If no session exists, redirect to login
    console.debug('No session detected', { hostname, subdomain, path });
    return NextResponse.redirect(new URL(`http://auth.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/signin`, req.url));
  }

  // // Ensure the user is authorized to access the specific subdomain
  // if (session?.user?.subdomain !== subdomain) {
  //   console.debug('Unauthorized access detected', { hostname, subdomain, path });
  //   // If session user tries to access a wrong subdomain, show 404
  // return NextResponse.rewrite(new URL('/404', req.url));
  // }

  // If session is valid and subdomain matches, rewrite to the subdomain's dashboard
  // return NextResponse.rewrite(new URL(`/dashboard${path === '/' ? '' : path}`, req.url));
  return NextResponse.next();
}
