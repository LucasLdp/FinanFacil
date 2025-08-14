import { CardInfo } from '@/routes/home/-components/CardInfo'
import { CardHistoryTable } from '@/routes/home/-components/CardHistoryTable'
import { createFileRoute } from '@tanstack/react-router'
import { ChartLine } from './-components/CharLine'
import { useGetTransactionSummary } from '@/hooks/transactions/useGetTransactionSummary'
import { useListTransaction } from '@/hooks/transactions/useListTransaction'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useGetTransactionSummary()
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useListTransaction()

  const isLoading = summaryLoading || transactionsLoading
  const hasError = summaryError || transactionsError

  // Estado de loading
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <section className="flex flex-col gap-6">
          <article className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Informações</h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-md bg-green-ment p-4 py-8 gap-3 justify-center animate-pulse"
                >
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </article>
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-md bg-green-ment p-4 h-64 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-full bg-gray-300 rounded"></div>
            </div>
            <div className="rounded-md bg-green-ment p-4 h-64 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </article>
        </section>
      </div>
    )
  }

  // Estado de erro
  if (hasError) {
    return (
      <div className="p-4 sm:p-6">
        <section className="flex flex-col gap-6">
          <article className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Informações</h1>
            <div className="flex items-center justify-center h-64 bg-red-50 rounded-md border-2 border-red-200">
              <div className="text-center">
                <p className="text-red-600 font-medium mb-2">
                  Erro ao carregar dados
                </p>
                <p className="text-sm text-gray-600">
                  Tente recarregar a página
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <section className="flex flex-col gap-6">
        <article className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Informações</h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardInfo
              title="Saldo Total"
              value={(data?.results.balance ?? 0).toFixed(2)}
            />
            <CardInfo
              title="Valores Gastos"
              value={(data?.results.expenses ?? 0).toFixed(2)}
            />
            <CardInfo
              title="Valores Ganhos"
              value={(data?.results.total ?? 0).toFixed(2)}
            />
          </div>
        </article>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartLine data={data?.results.monthlyAverage} />
          <CardHistoryTable
            title="Histórico de Transações"
            transactions={transactionsData?.result.transactions || []}
          />
        </article>
      </section>
    </div>
  )
}
