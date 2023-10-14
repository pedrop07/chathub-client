'use client'

import { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { getAccessToken } from "@/app/actions";
import { Chat } from "@/components/Chat";
import { ChatSidebar } from "@/components/ChatSidebar";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { Chat as ChatInterface } from "@/types/Chat";
import toast from "react-hot-toast";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default function ChatPage({ params }: Props) {
  const [socket, setSocket] = useState<Socket>()
  const [chat, setChat] = useState<ChatInterface>()

  async function fetchChat() {
    try {
      const { data } = await api.get(`/chats/${params.id}`)
      setChat(data)
      return data
    } catch (error: any) {
      if (error instanceof AxiosError) {
        throw new Error(error.message)
      }

      throw new Error(error.message)
    }
  }

  async function connectSocket(chat: ChatInterface) {
    const accessToken = await getAccessToken()

    const socket = io('http://localhost:3000', {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    setSocket(socket)

    socket.emit('joinChat', { chatId: chat.id });

    socket.on('connect', function () {
      console.log('Connected');
    });
    socket.on('exception', function (data) {
      console.log('exception', data);
    });
    socket.on('disconnect', function () {
      console.log('Disconnected');
    });
  }

  useEffect(() => {
    async function fetchData() {
      const chat = await fetchChat()
      connectSocket(chat)
    }

    fetchData()
  }, [])

  return (
    <>
      {
        chat && socket && (
          <>
            <ChatSidebar chatData={chat} socket={socket} />
            <Chat chatData={chat} socket={socket} />
          </>
        )
      }
    </>
  )
}
