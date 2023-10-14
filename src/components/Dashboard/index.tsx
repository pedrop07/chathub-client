import Link from "next/link"
import { Chat as ChatInterface } from "@/types/Chat"
import { ChatCard } from "../ChatCard";

interface Props {
  chats: ChatInterface[];
}

export function Dashboard({ chats }: Props) {


  return (
    <div>
      <div className="bg-[url('/space.jpg')] bg-cover bg-center rounded">
        <div className="flex items-center justify-center backdrop-blur-sm h-48 mb-4 ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white">
            ChatHub
            <br />
            <span className="bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
              Explore & conecte
            </span>
          </h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {
          chats?.map((chat) => {
            return (
              <ChatCard key={chat.id} data={chat} />
            )
          })
        }
      </div>
    </div>
  )
}
