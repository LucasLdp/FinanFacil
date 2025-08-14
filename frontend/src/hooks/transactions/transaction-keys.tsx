export const transactionKeys = {
  all: ['transactions'],
  list: () => [...transactionKeys.all, 'list'],
  summary: () => [...transactionKeys.all, 'summary'],
  details: (id: string) => [...transactionKeys.all, 'details', id],
  create: () => [...transactionKeys.all, 'create'],
  update: (id: string) => [...transactionKeys.all, 'update', id],
  delete: (id: string) => [...transactionKeys.all, 'delete', id],
}
