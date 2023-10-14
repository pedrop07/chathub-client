'use server'

import { Theme } from "@/types/Theme"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signOut() {
  cookies().delete('chathub.refresh-token')
  cookies().delete('chathub.access-token')
  redirect('sign-in')
}

export async function setAccessTokenCookie(accessToken: string) {
  cookies().set('chathub.access-token', accessToken)
}

export async function setRefreshTokenCookie(refreshToken: string) {
  cookies().set('chathub.refresh-token', refreshToken)
}

export async function getAccessToken() {
  const accessToken = cookies().get('chathub.access-token')?.value
  return accessToken
}

export async function getTheme() {
  const theme = cookies().get('theme')?.value as Theme
  return theme
}
