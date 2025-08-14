import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ITransaction } from '@/dtos/ITransaction'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ICardHistoryTableProps {
  title: string
  transactions: ITransaction[]
}

const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ getValue }) => {
      const description = getValue() as string
      return (
        <div className="max-w-[120px] truncate" title={description}>
          {description}
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ getValue, row }) => {
      const amount = getValue() as number
      const type = row.original.type
      return (
        <span
          className={`font-semibold ${
            type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {type === 'income' ? '+' : '-'}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Math.abs(amount))}
        </span>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Data',
    cell: ({ getValue }) => {
      const dateValue = getValue() as string
      try {
        return new Date(dateValue).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        })
      } catch {
        return 'Data inválida'
      }
    },
  },
]

export function CardHistoryTable({
  title,
  transactions,
}: ICardHistoryTableProps) {
  // Pegar apenas as 15 últimas transações com useMemo para evitar recalculos
  const last15Transactions = useMemo(() => {
    return transactions?.slice(-15).reverse() || []
  }, [transactions])

  const table = useReactTable({
    data: last15Transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <article className="flex flex-col rounded-md bg-green-ment p-3 sm:p-4 gap-3 h-[350px] sm:h-[400px]">
      <h4 className="font-bold text-lg sm:text-xl">{title}</h4>
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {last15Transactions.length > 0 ? (
          <Table className="text-xs sm:text-sm">
            <TableHeader className="sticky top-0 bg-green-ment z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-1 sm:px-2 py-2 text-xs font-semibold bg-green-ment"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-green-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-1 sm:px-2 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Nenhuma transação encontrada
          </div>
        )}
      </div>
    </article>
  )
}

// Manter o CardInfo original para compatibilidade
interface ICardInfoProps {
  title: string
  value: string
}

export function CardInfo({ title, value }: ICardInfoProps) {
  return (
    <article className="flex flex-col rounded-md bg-green-ment p-3 sm:p-4 py-6 sm:py-8 gap-3 justify-center">
      <h4 className="font-bold text-lg sm:text-xl">{title}</h4>
      <span className="text-xl sm:text-2xl font-bold ">R$ {value}</span>
    </article>
  )
}
