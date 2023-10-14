'use client'

import { useEffect, useState } from "react"
import { setCookie } from "nookies"
import { House, Moon, Sun, User as UserIcon, UserCircle } from '@phosphor-icons/react'
import { signOut } from "@/app/actions"
import { Theme } from "@/types/Theme"
import { Dropdown, Modal } from "flowbite-react";
import { Button } from "../ui/Button"
import { User } from "@/types/User"
import { useUserStore } from "@/store/UserStore"

interface Props {
  initialTheme: Theme;
  user: User | null;
}

function HeaderDropdownLabel() {
  return (
    <>
      <UserCircle
        className="text-primary dark:text-slate-50"
        size={30}
        weight="light"
      />
    </>
  )
}

export function Header({ initialTheme, user }: Props) {
  const setLoggedUser = useUserStore(store => store.setLoggedUser)
  const loggedUser = useUserStore(store => store.loggedUser)
  const [theme, setTheme] = useState(initialTheme)
  const [openSignOutModal, setOpenSignOutModal] = useState<string | undefined>();

  console.log(loggedUser)

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

  const handleOpenSignOutModal = () => {
    setOpenSignOutModal('dismissible')
  }

  const handleCloseSignOutModal = () => {
    setOpenSignOutModal(undefined)
  }

  const handleSignOut = () => {
    signOut()
  }

  useEffect(() => {
    if (user) {
      setLoggedUser(user)
    }
  }, [])

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <div className="max-w-7xl h-[60px] flex flex-wrap items-center justify-end gap-4 mx-auto px-4">
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
                      {user.username}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item href="/" className="gap-2">
                    <House size={20} /> Início
                  </Dropdown.Item>
                  <Dropdown.Item href={`/${user.username}`} className="gap-2">
                    <UserIcon size={20} /> Perfil
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleOpenSignOutModal}>
                    Sair
                  </Dropdown.Item>
                </Dropdown>
              </>
            )
          }
          <button
            onClick={handleTheme}
            className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-primary dark:text-slate-50"
          >
            {theme === 'light' ? <Moon size={25} /> : <Sun size={25} />}
          </button>
        </div>
      </header>

      <Modal dismissible show={openSignOutModal === 'dismissible'} onClose={handleCloseSignOutModal}>
        <Modal.Header>Tem certeza de que deseja sair?</Modal.Header>
        <Modal.Body>
          <Button className="mr-3" onClick={handleCloseSignOutModal}>
            Fechar
          </Button>
          <Button color="error" variant="outlined" onClick={handleSignOut}>
            Sair
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
