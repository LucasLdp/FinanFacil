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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NumericFormat } from 'react-number-format'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useForm } from 'react-hook-form'
import { DatePicker } from '../DatePicker'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateTransactionSchema,
  type ICreateTransactionDTO,
} from '@/schemas/transaction.schema'
import { useCreateTransaction } from '@/hooks/transactions/useCreateTransaction'
import { useState } from 'react'

export function DialogAddTransaction() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      description: '',
      amount: 0,
      type: 'expense' as 'income' | 'expense',
      createdAt: new Date().toISOString(),
    },
  })
  const createTransaction = useCreateTransaction()
  const { control } = form

  async function onSubmit(data: ICreateTransactionDTO) {
    try {
      await createTransaction.mutateAsync(data)
      form.reset()
      setOpen(false)
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 font-bold hover:bg-green-400 cursor-pointer shrink-0">
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da transação realizada para ser adiconada a
            lista.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-rows-2 gap-8">
              <div>
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Descrição</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Insira a descrição do que foi ganho/gasto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <FormField
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Valor</FormLabel>
                      <FormControl>
                        <NumericFormat
                          customInput={Input}
                          value={field.value}
                          onValueChange={(values) => {
                            // Converte o valor para número (float)
                            const numericValue = values.floatValue || 0
                            field.onChange(numericValue)
                          }}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="R$ "
                          placeholder="R$ 0,00"
                          allowNegative={false}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Tipo de transação
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              'w-full font-bold',
                              field.value === 'income'
                                ? 'text-green-600'
                                : 'text-red-600',
                            )}
                          >
                            <SelectValue placeholder="Despesa/Ganho" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            className="text-red-600 bg-none"
                            value="expense"
                          >
                            Despesa
                          </SelectItem>
                          <SelectItem
                            className="text-green-600 bg-none"
                            value="income"
                          >
                            Ganhos
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="createdAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Data</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={(date) => {
                            // Converte a data para string no formato ISO datetime
                            if (date) {
                              // Mantém a data selecionada mas usa a hora atual
                              const selectedDate = new Date(date)
                              const now = new Date()
                              selectedDate.setHours(
                                now.getHours(),
                                now.getMinutes(),
                                now.getSeconds(),
                                now.getMilliseconds(),
                              )
                              const isoString = selectedDate.toISOString()
                              field.onChange(isoString)
                            } else {
                              field.onChange('')
                            }
                          }}
                          placeholder="Selecione a data"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button className="bg-green-600" type="submit">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
