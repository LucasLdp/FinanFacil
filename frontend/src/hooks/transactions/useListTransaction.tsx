import { api } from '@/service/api'
import { useQuery } from '@tanstack/react-query'
import { transactionKeys } from './transaction-keys'
import type { ITransaction } from '@/dtos/ITransaction'

interface IGetTransactionParams {
  page?: number
  limit?: number
}

interface IListTransactionResponse {
  sucess: boolean
  message: string
  result: {
    transactions: ITransaction[]
    page: number
    totalPages: number
    total: number
    limit: number
  }
}

export async function listTransaction(params?: IGetTransactionParams) {
  const response = await api.get<IListTransactionResponse>('/transactions', {
    params,
  })

  if (!response.status) {
    throw new Error('Ocorreu um erro ao buscar as transações.')
  }

  return response.data
}

export function useListTransaction() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: transactionKeys.list(),
    queryFn: () => listTransaction({ page: 1, limit: 20 }),
    staleTime: 1000 * 60 * 3, // 3 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
    retry: 2,
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
