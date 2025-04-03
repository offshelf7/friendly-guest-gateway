
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Transaction, TransactionType } from '@/types/adminTypes';

// Function for casting transaction type that can be used in any function that handles transactions
const castTransactionType = (transaction: any) => {
  // Convert string type to TransactionType
  const typedType = transaction.type as TransactionType;
  return {
    ...transaction,
    type: typedType
  } as Transaction;
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;

        // Cast each transaction's type to the correct type
        const typedTransactions = data?.map(transaction => castTransactionType(transaction)) || [];
        setTransactions(typedTransactions);
      } catch (error: any) {
        console.error('Error fetching transactions:', error);
        toast({
          title: 'Error fetching transactions',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [toast]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Financial Transactions</h1>
      <p>This is the financial transactions page. Content to be added soon.</p>
      
      {loading ? (
        <div className="text-center py-8">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">No transactions found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg">{transaction.description}</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                <p>Amount: ${transaction.amount.toFixed(2)}</p>
                <p>Type: {transaction.type}</p>
                <p>Status: {transaction.status}</p>
                <p>Payment Method: {transaction.payment_method}</p>
                <p>Guest: {transaction.guest_name}</p>
                <p>Reference: {transaction.reference}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
