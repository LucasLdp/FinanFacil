import { api } from '@/service/api'
import { useQuery } from '@tanstack/react-query'
import { transactionKeys } from './transaction-keys'
import type { ITransactionSummary } from '@/dtos/ITransaction'

interface ITransactionSummaryResponse {
  sucess: boolean
  message: string
  results: ITransactionSummary
}

export async function getTransactionSummary() {
  const response = await api.get<ITransactionSummaryResponse>(
    `/transactions/summary`,
  )

  if (!response.status) {
    throw new Error('Ocorreu um erro ao buscar o resumo das transações.')
  }

  return response.data
}

export function useGetTransactionSummary() {
  const { data, isLoading, isError } = useQuery({
    queryKey: transactionKeys.summary(),
    queryFn: getTransactionSummary,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
    retry: 2,
  })

  return { data, isLoading, isError }
}
