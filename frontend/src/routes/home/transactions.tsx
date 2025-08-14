import { createFileRoute } from '@tanstack/react-router'
import { TransactionsTable } from './-components/TransactionsTable'
import { columns } from './-utils/transaction-columns'
import { useListTransaction } from '@/hooks/transactions/useListTransaction'

export const Route = createFileRoute('/home/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, isError } = useListTransaction()

  // Estado de loading
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="bg-white rounded-lg border">
              <div className="px-4 py-3 border-b">
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded w-20"></div>
                  ))}
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="px-4 py-3 border-b">
                  <div className="flex gap-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className="h-4 bg-gray-300 rounded w-20"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Estado de erro
  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-center h-64 bg-red-50 rounded-md border-2 border-red-200">
            <div className="text-center">
              <p className="text-red-600 font-medium mb-2">
                Erro ao carregar transações
              </p>
              <p className="text-sm text-gray-600">Tente recarregar a página</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-10">
        <div className="overflow-x-auto">
          <TransactionsTable
            columns={columns}
            data={data ? data.result.transactions : []}
          />
        </div>
      </div>
    </div>
  )
}
