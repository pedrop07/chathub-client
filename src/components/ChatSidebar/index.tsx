'use client'

import { useEffect, useState } from 'react';
import { House, List as MenuIcon, SignIn, SignOut, Trash, WarningCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { Chat } from '@/types/Chat';
import { useUserStore } from '@/store/UserStore';
import { Socket } from 'socket.io-client';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Modal } from 'flowbite-react';
import { Button } from '../ui/Button';

interface Props {
  chatData: Chat;
  socket: Socket;
}

export function ChatSidebar({ chatData, socket }: Props) {
  const loggedUser = useUserStore(store => store.loggedUser)
  const [showDrawer, setShowDrawer] = useState(false)
  const [members, setMembers] = useState(chatData.members)
  const [openDeleteChatModal, setOpenDeleteChatModal] = useState<string | undefined>();
  const { push } = useRouter()

  const loggedUserIsMember = members.some((member) => member?.id === loggedUser?.id)

  const userIsTheOwner = loggedUser?.id === chatData.owner.id

  function handleOpenDrawer() {
    setShowDrawer(!showDrawer)
  }

  function handleOpenDeleteChatModal() {
    setOpenDeleteChatModal('dismissible')
  }

  function handleCloseDeleteChatModal() {
    setOpenDeleteChatModal(undefined)
  }

  function addMember(newMember: User) {
    const updatedMembers = [...members, newMember]
    setMembers(updatedMembers)
  }

  function removeMember(memberToRemove: User) {
    const updatedMembers = members.filter(member => member?.id !== memberToRemove.id);
    setMembers(updatedMembers);
  }

  function handleAddMember() {
    const data = {
      chatId: chatData?.id,
      memberId: loggedUser?.id
    }

    socket?.emit('addMember', data)
  }

  function handleRemoveMember() {
    const data = {
      chatId: chatData?.id,
      memberId: loggedUser?.id
    }

    socket?.emit('removeMember', data)
  }

  function handleDeleteChat() {
    const data = {
      chatId: chatData?.id,
      memberId: loggedUser?.id
    }

    socket?.emit('deleteChat', data)
  }

  function ButtonActionView() {
    const views = {
      joinChatButton: (
        <button
          onClick={handleAddMember}
          className='flex items-center gap-1 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'
        >
          <SignIn size={25} /> Entrar no chat
        </button>
      ),
      leaveChatButton: (
        <button
          onClick={handleRemoveMember}
          className='flex items-center gap-1 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'
        >
          <SignOut size={25} /> Sair do chat
        </button>
      ),
      deleteChatButton: (
        <button
          onClick={handleOpenDeleteChatModal}
          className='flex items-center gap-1 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'
        >
          <Trash size={25} /> Excluir chat
        </button>
      ),
    }

    if (userIsTheOwner) return views.deleteChatButton

    if (loggedUserIsMember) return views.leaveChatButton

    return views.joinChatButton
  }

  socket?.on('addMember', (newMember: User) => {
    addMember(newMember)
  })

  socket?.on('removeMember', (memberToRemove: User) => {
    removeMember(memberToRemove)
  })

  useEffect(() => {
    socket?.on('deleteChat', (data) => {
      toast.error(`O chat ${chatData.title}, foi excluido pelo Dono(a)`, {
        icon: <WarningCircle weight='fill' color='#dfa200' size={27} />
      })
      push('/')
    })
  }, [socket])

  return (
    <>
      <button
        onClick={handleOpenDrawer}
        type="button"
        className="sticky top-2 z-30 bg-gray-300 dark:bg-gray-600 p-2 mb-2 text-primary dark:text-gray-200 rounded-lg md:hidden"
      >
        <MenuIcon size={25} weight='bold' />
      </button>

      <aside
        data-drawer={showDrawer}
        className="fixed top-0  flex flex-col px-5 py-4 bg-gray-100 dark:bg-slate-800 left-0 z-40 w-64 h-full transition-transform -translate-x-full md:translate-x-0 data-[drawer=true]:-translate-x-0"
        aria-label="Sidebar"
      >
        <div className='mb-4'>
          <h2 className='text-foreground font-semibold text-lg'>
            {chatData?.title}
          </h2>
          <h3 className='text-muted font-semibold text-sm'>
            Dono(a): {chatData?.owner.username}
          </h3>
        </div>

        <span className='block mb-2 text-muted text-center'>
          Membros
        </span>

        <ul className="font-medium h-full overflow-y-auto">
          {
            members.map((member) => {
              return (
                <Link key={member?.id} href={`/${member?.username}`}>
                  <li className='text-foreground p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'>
                    <span>{member?.username}</span>
                  </li>
                </Link>
              )
            })
          }
        </ul>
        <div className='flex flex-col gap-1 text-foreground text-sm'>
          <Link
            onClick={() => socket.disconnect()}
            href={'/'}
            className='flex items-center gap-1 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'
          >
            <House size={25} /> Início
          </Link>

          <ButtonActionView />
        </div>
      </aside>

      {
        showDrawer && (
          <div
            onClick={handleOpenDrawer}
            className='fixed left-0 top-0 z-30 h-full w-full bg-black dark:bg-white opacity-20'
          />
        )
      }

      <Modal dismissible show={openDeleteChatModal === 'dismissible'} onClose={handleCloseDeleteChatModal}>
        <Modal.Header>
          Tem certeza de que deseja excluir o chat <strong className='text-primary'>{chatData.title}</strong>
          {chatData.messages.length > 0 && ` e todas as ${chatData.messages.length} mensagens`} ?
        </Modal.Header>
        <Modal.Body>
          <Button color='muted' className="mr-3" onClick={handleCloseDeleteChatModal}>
            Cancelar
          </Button>
          <Button color="error" onClick={handleDeleteChat}>
            Sim, excluir
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
