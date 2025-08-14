export interface ITransaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  date: string
  createdAt: string
}

export interface IMonthlyAverage {
  month: string
  averageValue: number
  totalTransactions: number
}

export interface ITransactionSummary {
  total: number
  expenses: number
  balance: number
  history: ITransaction[]
  monthlyAverage: IMonthlyAverage[]
}

export interface ITransactionFinancialHealth {
  totalIncome: number
  totalExpenses: number
  percentage: number
  status: 'excellent' | 'good' | 'warning' | 'critical'
  message: string
}
