import { Dashboard } from "@/components/Dashboard"
import { Chat } from "@/types/Chat"
import { api } from "@/services/api"
import { cookies } from "next/headers"

export default async function Page() {
  const accessToken = cookies().get('chathub.access-token')?.value

  const { data: chats } = await api.get<Chat[]>('/chats', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return (
    <>
      <Dashboard chats={chats ?? []} />
    </>
  )
}
