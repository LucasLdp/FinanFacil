import { api } from '@/service/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionKeys } from './transaction-keys'
import toast from 'react-hot-toast'

interface IDeleteTransactionParams {
  transactionId: string
  userId: string
}

export async function deleteTransaction(params: IDeleteTransactionParams) {
  const { transactionId, userId } = params

  const response = await api.delete(`/transactions/${transactionId}`, {
    data: { userId }, // ou params: { userId } dependendo de como o backend espera
  })

  if (!response.status) {
    throw new Error('Ocorreu um erro ao deletar a transação.')
  }

  return response.data
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success('Transação deletada com sucesso!')
      // Invalidar múltiplas queries relacionadas
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      queryClient.invalidateQueries({ queryKey: transactionKeys.list() })
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary() })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao deletar transação',
      )
    },
  })
}
