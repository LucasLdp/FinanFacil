import type { ColumnDef } from '@tanstack/react-table'
import { Trash } from 'lucide-react'

export interface ITransactions {
  id: number
  title: string
  date: Date
  value: string
  type: 'Despesa' | 'Ganhos'
}

export const columns: ColumnDef<ITransactions>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    enableSorting: false,
  },
  {
    accessorKey: 'date',
    header: 'Data',
    enableSorting: true,
    cell: ({ getValue }) => new Date(getValue() as Date).toLocaleDateString(),
  },
  {
    accessorKey: 'value',
    header: 'Valor',
    enableSorting: true,
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    enableSorting: false,
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    enableSorting: false,
    size: 60,
    maxSize: 60,
    minSize: 60,
    cell: () => (
      <button className="cursor-pointer">
        <Trash className="text-red-400" />
      </button>
    ),
  },
]
