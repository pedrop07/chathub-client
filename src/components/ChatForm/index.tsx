'use client'

import { api } from "@/services/api"
import { axiosErrorMessageHandler } from "@/utils/axiosErrorMessageHandler"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import toast from "react-hot-toast"
import { createChatSchema } from "./schema"
import { InferType } from "yup"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { getAccessToken } from "@/app/actions"

type CreateChatSchemaType = InferType<typeof createChatSchema>;

interface Props {
  onFormSubmit?: () => void;
}

export function ChatForm({ onFormSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateChatSchemaType>({
    resolver: yupResolver(createChatSchema)
  })

  const onSubmit = async ({ title, description }: CreateChatSchemaType) => {
    try {
      const accessToken = await getAccessToken()
      await api.post('/chats', {
        title,
        description
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (onFormSubmit) onFormSubmit()
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error))
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="mt-2">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="name"
                      type="text"
                      label='nome'
                      error={!!errors.title}
                      helperText={errors.title?.message}
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
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="description"
                      label='descrição'
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      {...field}
                    />
                  </>
                )}
              />
            </div>
          </div>

          <div>
            <Button fullWidth type='submit'>
              Criar chat
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}