import * as yup from 'yup'

export const createChatSchema = yup
  .object({
    title: yup
      .string()
      .min(3, 'Insira no mínimo 3 caracteres.')
      .max(50, 'Insira no máximo 50 caracteres.')
      .required('Nome do chat é obrigatório.'),
      description: yup
      .string()
      .min(50, 'Insira no mínimo 50 caracteres.')
      .max(250, 'Insira no máximo 250 caracteres.')
      .required('Descrição do chat é obrigatório.'),

  })
  .required()
