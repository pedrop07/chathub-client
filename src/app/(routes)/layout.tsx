import clsx from 'clsx'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { getTheme } from '../actions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatHub',
  description: 'Generated by create next app',
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

  return (
    <html className={theme} lang="en">
      <body className={clsx(inter.className, 'dark:bg-slate-900 bg-slate-100')}>
        <Header initialTheme={theme} />
        {children}
      </body>
    </html>
  )
}
