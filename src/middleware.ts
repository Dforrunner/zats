export { default } from 'next-auth/middleware';

const negatedPaths = ['auth', 'unauthorized', 'public', 'favicon.ico'];
//`/((?!${negatedPaths.join('|')}).*)`
export const config = {
  matcher: ['/requester/:path*', '/fulfiller/:path*'],
};
