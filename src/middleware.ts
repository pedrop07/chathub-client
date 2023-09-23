import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkIsPrivateRoute } from './utils/checkIsPrivateRoute'
import { checkIsPublicRoute } from './utils/checkIsPublicRoute';

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export async function middleware(
  request: NextRequest,
) {
  const pathName = request.nextUrl.pathname
  const cleanPathName = pathName.replace(/(\/[^/]+)\/[^/]+/, '$1');

  if (checkIsPrivateRoute(cleanPathName)) {
    const accessToken = request.cookies.get('chathub.access-token')?.value
    if (accessToken) {
      try {
        await fetch(`http://localhost:3000/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        return NextResponse.next()
      } catch (error) {
        console.log('MIDDLEWARE ERROR: [ACCESS TOKEN REQUEST]', error)
      }
    }

    const refreshToken = request.cookies.get('chathub.refresh-token')?.value
    if (refreshToken) {
      try {
        const refreshTokenResponse = await fetch(`http://localhost:3000/auth/refresh-token`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })

        if (refreshTokenResponse.ok) {
          const data = await refreshTokenResponse.json() as RefreshTokenResponse

          let response = NextResponse.redirect(request.url);
          response.cookies.set({
            name: "chathub.access-token",
            value: data.accessToken
          });
          response.cookies.set({
            name: "chathub.refresh-token",
            value: data.refreshToken
          });
          return response
        } else {
          return NextResponse.redirect(new URL('/sign-in', request.url))
        }
      } catch (error) {
        console.log('MIDDLEWARE ERROR: [REFRESH TOKEN REQUEST]', error)
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }
  }

  if (checkIsPublicRoute(cleanPathName)) {
    const accessToken = request.cookies.get('chathub.access-token')?.value
    if (accessToken) {
      try {
        const accessTokenResponse = await fetch(`http://localhost:3000/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        if (accessTokenResponse.ok) return NextResponse.redirect(new URL('/', request.url))
      } catch (error) {
        console.log('MIDDLEWARE ERROR: [ACCESS TOKEN REQUEST]', error)
      }
    }

    const refreshToken = request.cookies.get('chathub.refresh-token')?.value
    if (refreshToken) {
      try {
        const refreshTokenResponse = await fetch(`http://localhost:3000/auth/refresh-token`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })

        if (refreshTokenResponse.ok) {
          const data = await refreshTokenResponse.json() as RefreshTokenResponse

          let response = NextResponse.redirect(new URL('/', request.url));
          response.cookies.set({
            name: "chathub.access-token",
            value: data.accessToken
          });
          response.cookies.set({
            name: "chathub.refresh-token",
            value: data.refreshToken
          });
          return response
        }
      } catch (error) {
        console.log('MIDDLEWARE ERROR: [REFRESH TOKEN REQUEST]', error)
      }
    }
  }
}
