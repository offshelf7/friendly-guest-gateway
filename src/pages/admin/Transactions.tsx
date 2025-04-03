
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { 
  Receipt, 
  Search, 
  Download, 
  Plus, 
  Eye, 
  FileText,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock transaction data for demonstration
const mockTransactions = [
  {
    id: '1',
    date: '2025-03-25T14:30:00',
    description: 'Room Booking - Deluxe Suite',
    amount: 450,
    type: 'income',
    status: 'completed',
    payment_method: 'credit_card',
    guest_name: 'John Smith',
    reference: 'INV-2025-001'
  },
  {
    id: '2',
    date: '2025-03-24T10:15:00',
    description: 'Restaurant Bill - Room 305',
    amount: 125.50,
    type: 'income',
    status: 'completed',
    payment_method: 'room_charge',
    guest_name: 'Emma Johnson',
    reference: 'F&B-2025-042'
  },
  {
    id: '3',
    date: '2025-03-23T16:45:00',
    description: 'Supplier Payment - Cleaning Supplies',
    amount: 350.75,
    type: 'expense',
    status: 'completed',
    payment_method: 'bank_transfer',
    guest_name: 'Clean Co Ltd',
    reference: 'EXP-2025-018'
  },
  {
    id: '4',
    date: '2025-03-22T12:00:00',
    description: 'Spa Services - Room 210',
    amount: 180,
    type: 'income',
    status: 'pending',
    payment_method: 'credit_card',
    guest_name: 'Sarah Williams',
    reference: 'SPA-2025-033'
  },
  {
    id: '5',
    date: '2025-03-21T09:30:00',
    description: 'Maintenance - Plumbing Repairs',
    amount: 275,
    type: 'expense',
    status: 'completed',
    payment_method: 'cash',
    guest_name: 'FixIt Services',
    reference: 'EXP-2025-019'
  }
];

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'cancelled';
  payment_method: string;
  guest_name: string;
  reference: string;
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [newTransactionOpen, setNewTransactionOpen] = useState(false);
  
  const { toast } = useToast();
  
  // In a real application, this would fetch from the database
  // For now, we'll use our mock data
  const { data: transactions = mockTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTransactions;
    }
  });
  
  // Filter transactions based on search term, type, and status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Calculate summary statistics
  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const netRevenue = totalIncome - totalExpenses;
  
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + (t.type === 'income' ? t.amount : 0), 0);
  
  // Handle viewing transaction details
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  };
  
  // Handle creating a new transaction
  const handleCreateTransaction = () => {
    toast({
      title: "Transaction Created",
      description: "The transaction has been recorded successfully",
    });
    
    setNewTransactionOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Financial Transactions</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setNewTransactionOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From completed transactions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From completed transactions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netRevenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Income - Expenses
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Income</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Guest/Vendor</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{format(new Date(transaction.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>{transaction.guest_name}</TableCell>
                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell className="capitalize">{transaction.payment_method.replace('_', ' ')}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'income' ? 'outline' : 'secondary'}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === 'completed'
                            ? 'default'
                            : transaction.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(transaction)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Transaction Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about this transaction.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Reference</div>
                <div className="text-sm font-medium">{selectedTransaction.reference}</div>
              </div>
              
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Date & Time</div>
                <div className="text-sm font-medium">
                  {format(new Date(selectedTransaction.date), 'MMM d, yyyy h:mm a')}
                </div>
              </div>
              
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Description</div>
                <div className="text-sm font-medium">{selectedTransaction.description}</div>
              </div>
              
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Guest/Vendor</div>
                <div className="text-sm font-medium">{selectedTransaction.guest_name}</div>
              </div>
              
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Type</div>
                <div className="text-sm font-medium">
                  <Badge variant={selectedTransaction.type === 'income' ? 'outline' : 'secondary'}>
                    {selectedTransaction.type === 'income' ? 'Income' : 'Expense'}
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Amount</div>
                <div className={`text-sm font-bold ${
                  selectedTransaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.type === 'income' ? '+' : '-'}${selectedTransaction.amount.toFixed(2)}
                </div>
              </div>
              
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Payment Method</div>
                <div className="text-sm font-medium capitalize">
                  {selectedTransaction.payment_method.replace('_', ' ')}
                </div>
              </div>
              
              <div className="flex justify-between py-1 border-b">
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div className="text-sm font-medium">
                  <Badge
                    variant={
                      selectedTransaction.status === 'completed'
                        ? 'default'
                        : selectedTransaction.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Print Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Transaction Dialog */}
      <Dialog open={newTransactionOpen} onOpenChange={setNewTransactionOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Record New Transaction</DialogTitle>
            <DialogDescription>
              Enter the details for the new financial transaction.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="transaction-date" className="text-sm font-medium">Date</label>
                <Input
                  id="transaction-date"
                  type="date"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="transaction-type" className="text-sm font-medium">Transaction Type</label>
                <Select defaultValue="income">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input
                id="description"
                placeholder="Enter transaction description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Amount ($)</label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="payment-method" className="text-sm font-medium">Payment Method</label>
                <Select defaultValue="credit_card">
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="room_charge">Room Charge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="guest-name" className="text-sm font-medium">Guest/Vendor Name</label>
                <Input
                  id="guest-name"
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="reference" className="text-sm font-medium">Reference Number</label>
                <Input
                  id="reference"
                  placeholder="Enter reference number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select defaultValue="completed">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTransactionOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTransaction}>Save Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
