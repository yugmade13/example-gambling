import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { authPrefix, authRoutes, publicRoutes } from './routes';
import { NextResponse } from 'next/server';
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const auth = !!req.auth;
  const url = req.nextUrl;

  const isApiAuthRoutes = url.pathname.startsWith(authPrefix);
  const isAuthRoutes = authRoutes.includes(url.pathname);
  const isPublicRoutes = publicRoutes.includes(url.pathname);

  if (isApiAuthRoutes) {
    return NextResponse.redirect(new URL('/auth', url));
  }

  if (!auth && !isPublicRoutes) {
    return NextResponse.redirect(new URL('/auth', url));
  }

  if (auth && isAuthRoutes) {
    return NextResponse.redirect(new URL('/', url));
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
