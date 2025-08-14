import z from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type ICreateUserDTO = z.infer<typeof CreateUserSchema>

export const LoginUserSchema = z.object({
  email: z.email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type ILoginUserDTO = z.infer<typeof LoginUserSchema>
