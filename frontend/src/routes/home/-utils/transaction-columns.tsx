import type { ColumnDef } from '@tanstack/react-table'
import { DialogRemoveTransaction } from '../-components/dialogs/DialogRemoveTransaction'

export interface ITransactions {
  id: string
  description: string
  amount: number
  createdAt: string
  type: 'income' | 'expense'
}

export const columns: ColumnDef<ITransactions>[] = [
  {
    accessorKey: 'description',
    header: 'Descrição',
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: 'Data',
    enableSorting: true,
    cell: ({ getValue }) => {
      const dateValue = getValue() as string
      try {
        return new Date(dateValue).toLocaleDateString('pt-BR')
      } catch {
        return 'Data inválida'
      }
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    enableSorting: true,
    cell: ({ getValue }) => {
      const amount = getValue() as number
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    enableSorting: false,
    cell: ({ getValue }) => {
      const type = getValue() as 'income' | 'expense'
      return (
        <span
          className={`font-semibold ${
            type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {type === 'income' ? 'Ganho' : 'Despesa'}
        </span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    enableSorting: false,
    size: 60,
    maxSize: 60,
    minSize: 60,
    cell: ({ row }) => {
      const transaction = row.original
      return <DialogRemoveTransaction transactionId={transaction.id} />
    },
  },
]
