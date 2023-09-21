import * as yup from 'yup'

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Insira no mínimo 3 caracteres.')
      .max(50, 'Insira no máximo 50 caracteres.')
      .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/, 'Insira apenas letras.')
      .matches(/^\S.*\S$/, 'Insira um nome válido.')
      .required('Nome é obrigatório.'),
    email: yup.string().email('Email inválido').required('Email é obrigatório.'),
    password: yup.string().required('Senha é obrigatório.'),
    confirm_password: yup
      .string()
      .required('Confirmação de senha é obrigatória.')
      .oneOf([yup.ref('password')], "As senhas digitadas não coincidem.")
  })
  .required()
