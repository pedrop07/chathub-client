import clsx from 'clsx'
import './globals.css'
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { getTheme } from '../actions'
import { Toaster } from 'react-hot-toast'
import { User } from '@/types/User'
import { api } from '@/services/api'
import { cookies } from 'next/headers'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ChatHub',
  description:
    'Onde a comunicação se torna instantânea e as conexões se transformam em diálogos cativantes.',
  category: 'developer',
  creator: 'Pedro Parente'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let theme = await getTheme()

  if (theme !== 'light' && theme !== 'dark') {
    theme = 'light'
  }

  const accessToken = cookies().get('chathub.access-token')?.value

  let user = null

  try {
    const { data } = await api.get<User>('/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    user = data
  } catch (error) {
    console.error(error)
  }
  
  return (
    <html className={theme} lang="pt-BR">
      <body className={clsx(poppins.className, 'bg-background')}>
        <Header user={user} initialTheme={theme} />
        <main className='max-w-7xl w-full px-4 sm:px-8 mx-auto'>
          <Toaster position="top-right" />
          {children}
        </main>
      </body>
    </html>
  )
}
