import type { ITransactionFinancialHealth } from '@/dtos/ITransaction'
import { api } from '@/service/api'
import { useQuery } from '@tanstack/react-query'
import { transactionKeys } from './transaction-keys'

interface IHealthTransactionResponse {
  success: boolean
  message: string
  results: ITransactionFinancialHealth
}

async function HealthTransaction() {
  const response = await api.get<IHealthTransactionResponse>(
    '/transactions/financial-health',
  )

  if (!response.status) {
    throw new Error('sOcorreu um erro ao verificar a saúde financeira.')
  }

  return response.data
}

export function useHealthTransaction() {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: transactionKeys.summary(), // Mudança: usar função correta
    queryFn: HealthTransaction,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
    retry: 2,
  })

  return {
    data,
    refetch,
    isLoading,
    isError,
    error,
  }
}
