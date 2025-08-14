import type { ICreateUserDTO } from '@/schemas/user.schema'
import { api } from '@/service/api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export async function createUser(data: ICreateUserDTO) {
  const response = await api.post('/users', data)

  if (!response.status) {
    throw new Error('Ocorreu um erro na criação do usuário.')
  }

  return response.data
}

export function useCreateUser() {
  const navigator = useNavigate()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('Usuário criado com sucesso!')
      navigator({ to: '/' })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao criar usuário',
      )
    },
  })
}
