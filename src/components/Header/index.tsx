'use client'

import { useState } from "react"
import { setCookie } from "nookies"
import { Chats, Gear, House, Moon, PlusCircle, SignOut, Sun, UserCircle } from '@phosphor-icons/react'
import { useUserStore } from "@/store/UserStore"
import { logout } from "@/app/actions"
import { Theme } from "@/interfaces/Theme"
import { Dropdown, Modal } from "flowbite-react";
import { Button } from "../ui/Button"

interface Props {
  initialTheme: Theme;
}

function HeaderDropdownLabel() {
  return (
    <>
      <UserCircle
        className="text-blue-600 dark:text-slate-50"
        size={30}
        weight="light"
      />
    </>
  )
}

export function Header({ initialTheme }: Props) {
  const [theme, setTheme] = useState(initialTheme)
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { user } = useUserStore()

  const handleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setCookie(null, 'theme', newTheme, {
      path: '/',
    });

    setTheme(newTheme)

    const htmlTag = document.querySelector('html')

    if (newTheme === 'dark') {
      htmlTag?.classList.add('dark')
    } else {
      htmlTag?.classList.remove('dark')
    }
  }

  const handleOpenLogoutModal = () => {
    setOpenModal('dismissible')
  }

  const handleCloseLogoutModal = () => {
    setOpenModal(undefined)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <nav className="bg-white dark:bg-slate-800 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-end gap-4 mx-auto p-2">
          {
            user && (
              <>
                <Dropdown
                  inline
                  label={<HeaderDropdownLabel />}
                  arrowIcon={false}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {user.name}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item href="/" className="gap-1">
                    <House size={20} />Ínicio
                  </Dropdown.Item>
                  <Dropdown.Item className="gap-1">
                    <Chats size={20} /> Chats que você participa
                  </Dropdown.Item>
                  <Dropdown.Item className="gap-1">
                    <PlusCircle size={20} /> Criar novo chat
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="gap-1">
                    <Gear size={20} /> Configurações
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleOpenLogoutModal}>
                    Sair
                  </Dropdown.Item>
                </Dropdown>
              </>
            )
          }
          <button
            onClick={handleTheme}
            className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 dark:text-slate-50"
          >
            {theme === 'light' ? <Moon size={25} /> : <Sun size={25} />}
          </button>
        </div>
      </nav>

      <Modal dismissible show={openModal === 'dismissible'} onClose={handleCloseLogoutModal}>
        <Modal.Header>Tem certeza de que deseja sair?</Modal.Header>
        <Modal.Footer>
          <Button onClick={handleCloseLogoutModal}>Fechar</Button>
          <Button color="error" variant="outlined" onClick={handleLogout}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
