'use client'

import { House } from "@phosphor-icons/react";
import { useEffect } from "react";
import { cookies } from 'next/headers';
import io from 'socket.io-client'
import { getAccessToken } from "@/app/actions";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default function Page({ params }: Props) {
  useEffect(() => {
    async function connectSocket() {
      const accessToken = await getAccessToken()

      const socket = io('http://localhost:3000', {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      socket.on('connect', function () {
        console.log('Connected');

        socket.emit('events', { test: '12' });
        socket.emit('joinChat', { email: 'lucas@gmail.com' });
      });
      socket.on('events', function (data) {
        console.log('event', data);
      });
      socket.on('exception', function (data) {
        console.log('exception', data);
      });
      socket.on('disconnect', function () {
        console.log('Disconnected');
      });
    }

    connectSocket()
  }, [])

  return (
    <div className="flex justify-center items-center mt-20 text-slate-50">
      <div>teste</div>
    </div>
  )
}
