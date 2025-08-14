import z from 'zod'

export const CreateTransactionSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  type: z.enum(['income', 'expense'], 'Tipo inválido'),
  createdAt: z.string().refine(
    (date) => {
      const parsedDate = new Date(date)
      return !isNaN(parsedDate.getTime())
    },
    {
      message: 'Data inválida',
    },
  ),
})

export type ICreateTransactionDTO = z.infer<typeof CreateTransactionSchema>
