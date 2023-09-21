import * as yup from 'yup'

export const loginSchema = yup
  .object({
    email: yup.string().email('Email inválido').required('Email é obrigatório.'),
    password: yup.string().required('Senha é obrigatório.'),
  })
  .required()
