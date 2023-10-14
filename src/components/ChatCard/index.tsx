'use client'

import { MONTHS } from "@/constants/months";
import { useUserStore } from "@/store/UserStore";
import { Chat } from "@/types/Chat";
import { CrownSimple } from "@phosphor-icons/react";
import Link from "next/link";
import { tv } from "tailwind-variants";

interface Props {
  data: Chat;
}

const cardStyle = tv({
  base: [
    'p-8 w-full h-max rounded-md',
    'bg-gradient-to-r from-white to-sky-50 dark:from-slate-900 dark:to-blue-950',
    'transition-shadow shadow-md',
  ],
  variants: {
    owner: {
      true: 'hover:shadow-[0_0_0_2px] hover:shadow-primary',
      false: 'hover:shadow-[0_0_0_2px] hover:shadow-primary',
    }
  }
})

export function ChatCard({ data }: Props) {
  const loggedUser = useUserStore((store) => store.loggedUser)

  const entryDate = new Date(data.created_at);

  const entryDay = entryDate.getDate();
  const entryMonth = MONTHS[entryDate.getUTCMonth()];
  const entryYear = entryDate.getUTCFullYear();

  return (
    <Link href={`/chat/${data.id}`}>
      <div className={cardStyle({ owner: loggedUser?.id === data.owner.id })}>
        <div className="mb-5">
          <h3 className="text-foreground text-sm font-medium mb-1 flex items-center gap-2">
            Dono(a): {data.owner.username}
            {loggedUser?.id === data.owner.id && <CrownSimple weight="fill" size={25} color="#fcd34d" />}
          </h3>
          <h4 className="text-sm text-muted">
            Membros: {data.members.length}
          </h4>
        </div>
        <div>
          <h2 className="text-foreground text-xl font-bold mb-3">
            {data.title}
          </h2>
          <p className="text-muted break-all">
            {data.description.length >= 120 ? `${data.description.substring(0, 120)}...` : data.description}
          </p>
        </div>
        <div className="text-secondary mt-4">
          Criado em: {entryDay} de {entryMonth} de {entryYear}
        </div>
      </div>
    </Link>
  )
}