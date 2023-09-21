'use server'

import { cookies } from "next/headers"

export async function FetchAuth<T>(endPoint: string, method: 'POST' | 'GET'): Promise<T> {
  const accessToken = cookies().get('chathub.access-token')?.value
  const response = await fetch(`http://localhost:3000/${endPoint}`, {
    method,
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })

  if (response.ok) {
    return response.json()
  }

  return response.json()
}
