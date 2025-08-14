import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDeleteTransaction } from '@/hooks/transactions/useDeleteTransaction'
import { useAuth } from '@/context/AuthContext'
import { Trash } from 'lucide-react'
import { useState } from 'react'

interface DialogRemoveTransactionProps {
  transactionId: string
}

export function DialogRemoveTransaction({
  transactionId,
}: DialogRemoveTransactionProps) {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const deleteTransaction = useDeleteTransaction()

  const handleDelete = async () => {
    if (!user?.id) {
      console.error('Usuário não encontrado')
      return
    }

    try {
      await deleteTransaction.mutateAsync({
        transactionId,
        userId: user.id,
      })
      setOpen(false)
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash className="text-red-400 cursor-pointer hover:text-red-600 transition-colors" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar esta transação? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
            disabled={deleteTransaction.isPending}
          >
            {deleteTransaction.isPending ? 'Deletando...' : 'Deletar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
