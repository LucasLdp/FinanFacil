import { createFileRoute } from '@tanstack/react-router'
import { TransactionsTable } from './-components/TransactionsTable'
import { columns, type ITransactions } from './-utils/transaction-columns'

export const Route = createFileRoute('/home/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  const mockData: ITransactions[] = [
    {
      id: 1,
      title: 'Compra de supermercado',
      date: new Date('2023-10-01'),
      value: 'R$ 150,00',
      type: 'Despesa',
    },
    {
      id: 2,
      title: 'Salário',
      date: new Date('2023-10-05'),
      value: 'R$ 3.000,00',
      type: 'Ganhos',
    },
    {
      id: 3,
      title: 'Conta de luz',
      date: new Date('2023-10-10'),
      value: 'R$ 200,00',
      type: 'Despesa',
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          <TransactionsTable columns={columns} data={mockData} />
        </div>
      </div>
    </>
  )
}
