'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType } from 'yup'
import { registerSchema } from './schema'
import { Card } from '../ui/Card'
import { clientApi } from '@/services/clientApi'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { errorMessageHandler } from '@/utils/errorMessageHandler'

type RegisterSchemaType = InferType<typeof registerSchema>;

export function Register() {
  const { push } = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async ({ name, email, password }: RegisterSchemaType) => {
    try {
      await clientApi.post('/register', {
        name,
        email,
        password
      })

      push('/sign-in')
    } catch (error) {
      toast.error(errorMessageHandler(error))
    }
  }

  return (
    <>
      <div className="w-11/12 sm:w-96">
        <Card>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-600 dark:text-slate-50">
              Criar conta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className="mt-2">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          id="name"
                          type="text"
                          label='nome'
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          {...field}
                        />
                      </>
                    )}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          id="email"
                          type="email"
                          label='email'
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          {...field}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          id="password"
                          type="password"
                          label='senha'
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          {...field}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mt-2">
                  <Controller
                    name="confirm_password"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          id="confirm_password"
                          type="password"
                          label='confirmar senha'
                          error={!!errors.confirm_password}
                          helperText={errors.confirm_password?.message}
                          {...field}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div>
                <Button fullWidth type='submit'>
                  Entrar
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-slate-50">
              Já possuí uma conta?{' '}
              <Link href='/sign-in' className="font-semibold leading-6 text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 underline">
                faça o login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}
