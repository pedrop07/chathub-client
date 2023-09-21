import { Dashboard } from "@/components/Dashboard"
import { Chat } from "@/interfaces/Chat"
import { FetchAuth } from "@/utils/fetchAuth"

export default async function Page() {
  const chats = await FetchAuth<Chat[]>('chats', 'GET')

  console.log(chats)

  return (
    <>
      <Dashboard chats={chats} />
    </>
  )
}