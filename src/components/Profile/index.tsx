'use client'

import { User } from "@/types/User";
import { Calendar, Chats, Link, PlusCircle, SignIn } from "@phosphor-icons/react";
import { ChatCard } from "../ChatCard";
import { MONTHS } from "@/constants/months";
import { useUserStore } from "@/store/UserStore";
import { Button } from "../ui/Button";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { ChatForm } from "../ChatForm";
import Image from "next/image";

interface Props {
  user: User;
  refetchUser?: () => void;
}

export function Profile({ user, refetchUser }: Props) {
  const loggedUser = useUserStore(store => store.loggedUser)
  const [openCreateChatModal, setOpenCreateChatModal] = useState<string | undefined>();

  const entryDate = new Date(user.created_at);

  const entryMonth = MONTHS[entryDate.getUTCMonth()];
  const entryYear = entryDate.getUTCFullYear();


  const handleOpenCreateChatModal = () => {
    setOpenCreateChatModal('dismissible')
  }

  const handleCloseCreateChatModal = () => {
    setOpenCreateChatModal(undefined)
  }

  const onFormSubmit = () => {
    handleCloseCreateChatModal()
    // refetchUser()
  }

  function ContentView() {
    if (user.chats.length === 0) {

      if (user.id === loggedUser?.id) {
        return (
          <div className="flex justify-center items-center flex-col mt-28">
            <h1 className="text-foreground font-bold text-2xl md:text-3xl mb-5">
              Você não participa de nenhum chat
            </h1>

            <a href="/">
              <Button>
                <SignIn size={25} />
                Entre em um agora
              </Button>
            </a>
          </div>
        )
      }

      return (
        <div className="flex justify-center items-center flex-col mt-28">
          <h1 className="text-foreground font-bold text-2xl md:text-3xl mb-5">
            Esse usuário não participa de nenhum chat
          </h1>

          <Image priority alt='Space' src={'/space-error.svg'} width={350} height={350} />
        </div>
      )
    }

    return user.chats.map((chat) => (
      <div key={chat.id} className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ChatCard data={chat} />
      </div>
    ))
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div>
          <h1 className="text-2xl text-foreground font-semibold mb-3">
            {user.username}
          </h1>
          <div className="flex flex-col gap-1 text-muted">
            <span className="flex items-center gap-1">
              <Chats weight="light" size={26} /> Participa de {user.chats.length} chats
            </span>
            <span className="flex items-center gap-1">
              <Calendar weight="light" size={26} /> Ingressou em {entryMonth} de {entryYear}
            </span>
          </div>
        </div>

        {
          loggedUser?.id === user.id && (
            <Button onClick={handleOpenCreateChatModal} className="h-full flex items-center justify-center">
              Criar novo chat
              <PlusCircle size={23} />
            </Button>
          )
        }
      </div>
      <div className="mt-6">
        <h2 className="text-foreground text-3xl font-bold mb-4">
          Chats que participa:
        </h2>

        <ContentView />
      </div>

      <Modal dismissible show={openCreateChatModal === 'dismissible'} onClose={handleCloseCreateChatModal}>
        <Modal.Header>Crie o seu chat</Modal.Header>
        <Modal.Body>
          <ChatForm onFormSubmit={onFormSubmit} />
        </Modal.Body>
      </Modal>
    </>
  )
}
