import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  FilePlus, 
  Printer, 
  Send, 
  Download, 
  Search, 
  Pencil, 
  Trash2,
  Eye,
  FileText
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as z from "zod";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
}

// Mock data for demonstration
const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2023-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, Anytown, CA 12345'
    },
    date: '2023-11-01',
    dueDate: '2023-11-15',
    items: [
      {
        id: '1-1',
        description: 'Deluxe Room - 3 nights',
        quantity: 3,
        price: 250
      },
      {
        id: '1-2',
        description: 'Room Service',
        quantity: 2,
        price: 75
      }
    ],
    status: 'paid'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2023-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      address: '456 Oak St, Othertown, NY 54321'
    },
    date: '2023-11-05',
    dueDate: '2023-11-20',
    items: [
      {
        id: '2-1',
        description: 'Suite Room - 2 nights',
        quantity: 2,
        price: 350
      },
      {
        id: '2-2',
        description: 'Spa Treatment',
        quantity: 1,
        price: 120
      }
    ],
    status: 'sent'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2023-003',
    customer: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      address: '789 Pine St, Somewhere, TX 67890'
    },
    date: '2023-11-10',
    dueDate: '2023-11-25',
    items: [
      {
        id: '3-1',
        description: 'Standard Room - 5 nights',
        quantity: 5,
        price: 150
      }
    ],
    status: 'draft',
    notes: 'Pending confirmation from customer'
  }
];

const AdminInvoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Schema for invoice form
  const invoiceSchema = z.object({
    invoiceNumber: z.string().min(1, { message: "Invoice number is required" }),
    customerName: z.string().min(1, { message: "Customer name is required" }),
    customerEmail: z.string().email({ message: "Valid email is required" }),
    customerAddress: z.string().min(1, { message: "Address is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    dueDate: z.string().min(1, { message: "Due date is required" }),
    status: z.enum(['draft', 'sent', 'paid', 'overdue']),
    notes: z.string().optional()
  });

  // Schema for invoice item
  const invoiceItemSchema = z.object({
    description: z.string().min(1, { message: "Description is required" }),
    quantity: z.coerce.number().positive({ message: "Quantity must be positive" }),
    price: z.coerce.number().positive({ message: "Price must be positive" })
  });

  // Form for invoice
  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNumber: '',
      customerName: '',
      customerEmail: '',
      customerAddress: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'draft',
      notes: ''
    }
  });

  // Form for invoice item
  const itemForm = useForm<z.infer<typeof invoiceItemSchema>>({
    resolver: zodResolver(invoiceItemSchema),
    defaultValues: {
      description: '',
      quantity: 1,
      price: 0
    }
  });

  // Filter invoices by search term
  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Calculate total for an invoice
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Add new invoice
  const addInvoice = (data: z.infer<typeof invoiceSchema>) => {
    const newInvoice: Invoice = {
      id: `${Date.now()}`,
      invoiceNumber: data.invoiceNumber,
      customer: {
        name: data.customerName,
        email: data.customerEmail,
        address: data.customerAddress
      },
      date: data.date,
      dueDate: data.dueDate,
      items: [],
      status: data.status,
      notes: data.notes
    };

    setInvoices([newInvoice, ...invoices]);
    toast({
      title: 'Success',
      description: 'Invoice created successfully',
    });
    form.reset();
  };

  // Update existing invoice
  const updateInvoice = (data: z.infer<typeof invoiceSchema>) => {
    if (!selectedInvoice) return;

    const updatedInvoices = invoices.map(invoice => 
      invoice.id === selectedInvoice.id ? {
        ...invoice,
        invoiceNumber: data.invoiceNumber,
        customer: {
          name: data.customerName,
          email: data.customerEmail,
          address: data.customerAddress
        },
        date: data.date,
        dueDate: data.dueDate,
        status: data.status,
        notes: data.notes
      } : invoice
    );

    setInvoices(updatedInvoices);
    toast({
      title: 'Success',
      description: 'Invoice updated successfully',
    });
    setIsEditing(false);
    setSelectedInvoice(null);
  };

  // Delete invoice
  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    toast({
      title: 'Success',
      description: 'Invoice deleted successfully',
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Invoice Management</h1>
          <p className="text-muted-foreground">Create and manage customer invoices</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setIsEditing(false);
              form.reset({
                invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                customerName: '',
                customerEmail: '',
                customerAddress: '',
                date: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
                status: 'draft',
                notes: ''
              });
            }}>
              <FilePlus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? 'Update the invoice details below'
                  : 'Fill in the invoice details below'
                }
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(isEditing ? updateInvoice : addInvoice)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input placeholder="INV-2023-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Customer Information</h3>
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Customer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="customer@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Customer address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {isEditing ? 'Update Invoice' : 'Create Invoice'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-8 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>View and manage all customer invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.customer.name}</div>
                      <div className="text-sm text-muted-foreground">{invoice.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>{formatCurrency(calculateTotal(invoice.items))}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <div className="flex justify-between">
                              <DialogTitle>Invoice {invoice.invoiceNumber}</DialogTitle>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Printer className="h-4 w-4 mr-2" />
                                  Print
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                                {invoice.status !== 'sent' && invoice.status !== 'paid' && (
                                  <Button size="sm">
                                    <Send className="h-4 w-4 mr-2" />
                                    Send
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="flex justify-between mb-8">
                              <div>
                                <h3 className="text-lg font-bold mb-1">Invoice To:</h3>
                                <p className="font-medium">{invoice.customer.name}</p>
                                <p className="text-sm text-muted-foreground">{invoice.customer.email}</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.customer.address}</p>
                              </div>
                              <div className="text-right">
                                <h3 className="text-lg font-bold mb-1">Invoice Details:</h3>
                                <p><span className="text-muted-foreground">Invoice Number:</span> {invoice.invoiceNumber}</p>
                                <p><span className="text-muted-foreground">Date:</span> {formatDate(invoice.date)}</p>
                                <p><span className="text-muted-foreground">Due Date:</span> {formatDate(invoice.dueDate)}</p>
                                <p>
                                  <span className="text-muted-foreground">Status:</span> 
                                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                  </span>
                                </p>
                              </div>
                            </div>
                            
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[50%]">Description</TableHead>
                                  <TableHead>Qty</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {invoice.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{formatCurrency(item.price)}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.quantity * item.price)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            
                            <div className="mt-4 flex justify-end">
                              <div className="w-1/3">
                                <div className="flex justify-between py-2 font-medium">
                                  <span>Subtotal:</span>
                                  <span>{formatCurrency(calculateTotal(invoice.items))}</span>
                                </div>
                                <div className="flex justify-between py-2 font-medium border-t border-b">
                                  <span>Total:</span>
                                  <span className="text-lg">{formatCurrency(calculateTotal(invoice.items))}</span>
                                </div>
                              </div>
                            </div>
                            
                            {invoice.notes && (
                              <div className="mt-8">
                                <h3 className="font-medium mb-2">Notes:</h3>
                                <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsEditing(true);
                              setSelectedInvoice(invoice);
                              form.reset({
                                invoiceNumber: invoice.invoiceNumber,
                                customerName: invoice.customer.name,
                                customerEmail: invoice.customer.email,
                                customerAddress: invoice.customer.address,
                                date: invoice.date,
                                dueDate: invoice.dueDate,
                                status: invoice.status,
                                notes: invoice.notes || ''
                              });
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Invoice</DialogTitle>
                            <DialogDescription>
                              Update the invoice details below
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(updateInvoice)} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="invoiceNumber"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Invoice Number</FormLabel>
                                      <FormControl>
                                        <Input placeholder="INV-2023-001" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Status</FormLabel>
                                      <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="draft">Draft</SelectItem>
                                          <SelectItem value="sent">Sent</SelectItem>
                                          <SelectItem value="paid">Paid</SelectItem>
                                          <SelectItem value="overdue">Overdue</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="date"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Invoice Date</FormLabel>
                                      <FormControl>
                                        <Input type="date" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="dueDate"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Due Date</FormLabel>
                                      <FormControl>
                                        <Input type="date" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-medium">Customer Information</h3>
                                <FormField
                                  control={form.control}
                                  name="customerName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Customer name" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="customerEmail"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input placeholder="customer@example.com" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="customerAddress"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Address</FormLabel>
                                      <FormControl>
                                        <Textarea placeholder="Customer address" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                      <Textarea placeholder="Any additional notes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <DialogFooter>
                                <Button type="submit">
                                  Update Invoice
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteInvoice(invoice.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      
                      {invoice.status === 'draft' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedInvoices = invoices.map(inv => 
                              inv.id === invoice.id ? { ...inv, status: 'sent' } : inv
                            );
                            setInvoices(updatedInvoices);
                            toast({
                              title: 'Success',
                              description: 'Invoice sent successfully',
                            });
                          }}
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send</span>
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No invoices found. 
                    {searchTerm && (
                      <span className="text-muted-foreground ml-1">
                        Try clearing your search or create a new invoice.
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInvoice;
