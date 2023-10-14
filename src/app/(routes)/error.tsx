'use client'

import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='h-[calc(100%-61px)] flex items-center justify-center gap-4 flex-wrap'>
      <div className='text-foreground'>
        <h2 className='text-2xl mb-2'><strong>Algo deu errado!</strong></h2>
        <Button
          onClick={
            () => reset()
          }
        >
          Tentar novamente
        </Button>
      </div>
      <Image priority alt='Space' src={'/space-error.svg'} width={350} height={350} />
    </div>
  )
}