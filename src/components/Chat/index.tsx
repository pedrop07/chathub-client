'use client'

import { useUserStore } from "@/store/UserStore";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Chat } from "@/types/Chat";
import { Message } from "@/types/Message";
import { tv } from "tailwind-variants";

interface Props {
  socket: Socket;
  chatData: Chat;
}

export const messageStyle = tv({
  base: [
    'max-w-[250px] w-full mt-3 p-3 rounded-md',
    'text-white',
  ],
  variants: {
    sender: {
      true: 'self-end bg-blue-500 dark:bg-blue-800',
      false: 'bg-neutral-500 dark:bg-gray-700',
    },
  },
})

export function Chat({ socket, chatData }: Props) {
  const loggedUser = useUserStore((store) => store.loggedUser)
  const [messages, setMessages] = useState(chatData.messages)
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  function addMessage(newMessage: Message) {
    setMessages((prevState) => [...prevState, newMessage])
  }

  function handleAddMessage(event: FormEvent) {
    event.preventDefault()
    setText('')

    const data = {
      chatId: chatData?.id,
      memberId: loggedUser?.id,
      text: text
    }

    socket?.emit('addMessage', data)
  }

  function scrollDown() {
    bottomRef.current?.scrollIntoView()
  }

  useEffect(() => {
    socket?.on('addMessage', (newMessage) => {
      console.log(newMessage)
      addMessage(newMessage)
    })

  }, [socket])
  
  useEffect(() => {
    scrollDown()
  }, [messages])

  return (
    <div className="md:ml-64 flex flex-col">
      <div className="overflow-y-auto flex flex-col h-[73vh] md:h-[79vh] pr-3">
        {
          messages.map((message) => {
            return (
              <div
                key={message.id}
                className={messageStyle({ sender: loggedUser?.id === message.user.id })}
              >
                <div className="mb-2"><strong>{message.user.username}</strong></div>
                <div className="block break-words">{message.text}</div>
              </div>
            )
          })
        }
        <div ref={bottomRef} />
      </div>

      <div className="py-4 md:pr-4 sticky bottom-0">
        <form onSubmit={handleAddMessage} className="w-full h-full relative">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Envie uma mensagem"
            className="w-full resize-none h-14 p-3 pr-11 border-none rounded-md dark:bg-slate-800 text-foreground placeholder:text-gray-400"
          />
          <button type="submit" className="absolute top-[50%] -translate-y-1/2 right-2 p-1 transition-colors rounded-md hover:bg-blue-100 dark:hover:bg-primary text-primary dark:text-white">
            <PaperPlaneRight size={22} />
          </button>
        </form>
      </div>
    </div>
  )
}
