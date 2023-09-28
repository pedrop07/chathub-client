'use client'

import { useState } from "react"
import { Chat } from "../Chat"
import Link from "next/link"
import { Chat as ChatInterface } from "@/interfaces/Chat"

interface Props {
  chats: ChatInterface[];
}

export function Dashboard({ chats }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return (
      <>
        <div className="p-4 animate-pulse">
          <div className="bg-slate-600 h-48 rounded mb-4" />
        </div>
      </>
    )
  }

  console.log(chats)

  return (
    <div>
      <div className="p-4">
        
        <div className="bg-[url('/space.jpg')] bg-cover bg-center rounded">
          <div className="flex items-center justify-center backdrop-blur-sm h-48 mb-4 ">
            <h1 className="text-2xl text-white">Encontre a sua comunidade no ChatHub</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {
            chats?.map((chat) => {
              return (
                <Link key={chat.id} href={`/chat/${chat.id}`}>
                  <Chat title={chat.title} owner={chat.owner} description={chat.description} />
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
