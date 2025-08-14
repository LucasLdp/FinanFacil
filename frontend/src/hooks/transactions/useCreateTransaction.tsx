import type { ICreateTransactionDTO } from '@/schemas/transaction.schema'
import { api } from '@/service/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { transactionKeys } from './transaction-keys'

export async function createTransaction(data: ICreateTransactionDTO) {
  const payload = {
    description: data.description,
    amount: data.amount,
    type: data.type,
    createdAt: data.createdAt,
  }

  const response = await api.post('/transactions', {
    ...payload,
  })

  if (!response.status) {
    throw new Error('Ocorreu um erro na criação da transação.')
  }

  return response.data
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success('Transação criada com sucesso!')
      // Invalidar múltiplas queries relacionadas
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      queryClient.invalidateQueries({ queryKey: transactionKeys.list() })
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary() })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao criar transação',
      )
    },
  })
}
