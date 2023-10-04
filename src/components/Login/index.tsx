'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { clientApi } from '@/services/clientApi'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './schema'
import { InferType } from 'yup'
import { toast } from 'react-hot-toast'
import { Card } from '../ui/Card'
import { errorMessageHandler } from '@/utils/errorMessageHandler'
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/app/actions'

type LoginSchemaType = InferType<typeof loginSchema>;

export function Login() {
  const { push } = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async ({ email, password }: LoginSchemaType) => {
    try {
      const { data } = await clientApi.post('/auth/login', {
        email,
        password
      })

      const accessToken = data?.accessToken
      const refreshToken = data?.refreshToken
      setAccessTokenCookie(accessToken)
      setRefreshTokenCookie(refreshToken)

      push('/')
    } catch (error) {
      toast.error(errorMessageHandler(error))
    }
  }

  return (
    <>
      <div className="w-11/12 sm:w-96">
        <Card>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-primary dark:text-white">
              Fazer login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              </div>

              <div>
                <Button
                  fullWidth
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  type='submit'
                >
                  Entrar
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-slate-50">
              Não possuí uma conta?{' '}
              <Link href='/sign-up' className="whitespace-nowrap font-semibold leading-6 text-primary hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 underline">
                cadastre-se
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}
