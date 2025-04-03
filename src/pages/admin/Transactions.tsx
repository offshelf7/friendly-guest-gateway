
// For the type casting in any function that handles transactions:
// Convert string type to TransactionType
const typedType = transaction.type as TransactionType;
const typedTransaction = {
  ...transaction,
  type: typedType
} as Transaction;
