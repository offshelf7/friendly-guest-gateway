
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  Edit,
  FileText,
  Plus,
  Printer,
  Search,
  Trash,
  User,
  X,
} from "lucide-react";

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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Invoice, InvoiceItem, InvoiceStatus } from "@/types/adminTypes";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema for the invoice
const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerAddress: z.string().min(1, "Address is required"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["draft", "sent", "paid", "overdue"]),
  notes: z.string().optional(),
});

// Form schema for invoice items
const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0.01, "Price must be greater than 0"),
});

const AdminInvoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Form for invoice details
  const invoiceForm = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: "",
      customerName: "",
      customerEmail: "",
      customerAddress: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      status: "draft",
      notes: "",
    },
  });
  
  // Form for invoice items
  const itemForm = useForm<z.infer<typeof invoiceItemSchema>>({
    resolver: zodResolver(invoiceItemSchema),
    defaultValues: {
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  });

  // Load mock invoices
  useEffect(() => {
    setIsLoading(true);
    
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockInvoices: Invoice[] = Array.from({ length: 8 }, (_, i) => ({
        id: `inv-${i + 1000}`,
        invoiceNumber: `INV-${2023 + i}-${1000 + i}`,
        customer: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          address: `${123 + i} Main St, City ${i + 1}, State, Zip`,
        },
        date: new Date(Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        dueDate: new Date(Date.now() + (Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
          id: `item-${i}-${j}`,
          description: ["Room booking", "Room service", "Restaurant charges", "Spa services"][Math.floor(Math.random() * 4)],
          quantity: Math.floor(Math.random() * 5) + 1,
          unitPrice: Math.floor(Math.random() * 100) + 50,
        })),
        status: ["draft", "sent", "paid", "overdue"][Math.floor(Math.random() * 4)] as InvoiceStatus,
        notes: Math.random() > 0.5 ? "Thank you for your business." : undefined,
      }));
      
      setInvoices(mockInvoices);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Reset form when editing an invoice
  useEffect(() => {
    if (selectedInvoice) {
      invoiceForm.reset({
        invoiceNumber: selectedInvoice.invoiceNumber,
        customerName: selectedInvoice.customer.name,
        customerEmail: selectedInvoice.customer.email,
        customerAddress: selectedInvoice.customer.address,
        date: new Date(selectedInvoice.date).toISOString().split("T")[0],
        dueDate: new Date(selectedInvoice.dueDate).toISOString().split("T")[0],
        status: selectedInvoice.status,
        notes: selectedInvoice.notes || "",
      });
      
      setInvoiceItems([...selectedInvoice.items]);
    } else {
      // For new invoices, generate a new invoice number
      const newInvoiceNumber = `INV-${new Date().getFullYear()}-${1000 + invoices.length}`;
      invoiceForm.reset({
        invoiceNumber: newInvoiceNumber,
        customerName: "",
        customerEmail: "",
        customerAddress: "",
        date: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "draft",
        notes: "",
      });
      
      setInvoiceItems([]);
    }
  }, [selectedInvoice, invoiceForm, invoices.length]);

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals for an invoice
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  // Handle saving the invoice
  const handleSaveInvoice = (data: z.infer<typeof invoiceFormSchema>) => {
    if (invoiceItems.length === 0) {
      toast({
        title: "Cannot save invoice",
        description: "Please add at least one item to the invoice",
        variant: "destructive",
      });
      return;
    }
    
    const invoiceData: Invoice = {
      id: selectedInvoice ? selectedInvoice.id : `inv-${Date.now()}`,
      invoiceNumber: data.invoiceNumber,
      customer: {
        name: data.customerName,
        email: data.customerEmail,
        address: data.customerAddress,
      },
      date: new Date(data.date).toISOString(),
      dueDate: new Date(data.dueDate).toISOString(),
      items: invoiceItems,
      status: data.status as InvoiceStatus,
      notes: data.notes,
    };
    
    if (selectedInvoice) {
      // Update existing invoice
      setInvoices(
        invoices.map((inv) => (inv.id === invoiceData.id ? invoiceData : inv))
      );
      toast({
        title: "Invoice updated",
        description: `Invoice ${data.invoiceNumber} has been updated successfully.`,
      });
    } else {
      // Create new invoice
      setInvoices([invoiceData, ...invoices]);
      toast({
        title: "Invoice created",
        description: `Invoice ${data.invoiceNumber} has been created successfully.`,
      });
    }
    
    setIsFormDialogOpen(false);
    setSelectedInvoice(null);
  };

  // Add or update an invoice item
  const handleSaveItem = (data: z.infer<typeof invoiceItemSchema>) => {
    const newItem: InvoiceItem = {
      id: isEditingItem || `item-${Date.now()}`,
      description: data.description,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
    };
    
    if (isEditingItem) {
      // Update existing item
      setInvoiceItems(
        invoiceItems.map((item) =>
          item.id === isEditingItem ? newItem : item
        )
      );
    } else {
      // Add new item
      setInvoiceItems([...invoiceItems, newItem]);
    }
    
    itemForm.reset({
      description: "",
      quantity: 1,
      unitPrice: 0,
    });
    
    setIsAddingItem(false);
    setIsEditingItem(null);
  };

  // Delete an invoice item
  const handleDeleteItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  // Delete an invoice
  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
    toast({
      title: "Invoice deleted",
      description: "The invoice has been deleted successfully.",
    });
  };

  // Edit an invoice item
  const handleEditItem = (item: InvoiceItem) => {
    itemForm.reset({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    });
    
    setIsEditingItem(item.id);
    setIsAddingItem(true);
  };

  // Get status badge based on invoice status
  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case "sent":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Sent</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">Draft</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>
                Create, view and manage customer invoices
              </CardDescription>
            </div>
            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedInvoice(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {selectedInvoice ? "Edit Invoice" : "Create New Invoice"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedInvoice
                      ? "Update the invoice details"
                      : "Enter invoice details to create a new invoice"}
                  </DialogDescription>
                </DialogHeader>

                <Form {...invoiceForm}>
                  <form
                    onSubmit={invoiceForm.handleSubmit(handleSaveInvoice)}
                    className="space-y-4 mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={invoiceForm.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Invoice Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={invoiceForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
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
                        control={invoiceForm.control}
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
                        control={invoiceForm.control}
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

                    <div className="border p-4 rounded-md bg-muted/30">
                      <h3 className="font-medium mb-2">Customer Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={invoiceForm.control}
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
                          control={invoiceForm.control}
                          name="customerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-4">
                        <FormField
                          control={invoiceForm.control}
                          name="customerAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Customer address"
                                  rows={2}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border p-4 rounded-md bg-muted/30">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Invoice Items</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            itemForm.reset({
                              description: "",
                              quantity: 1,
                              unitPrice: 0,
                            });
                            setIsEditingItem(null);
                            setIsAddingItem(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>

                      {invoiceItems.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">
                          No items added yet
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Unit Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {invoiceItems.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.description}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">
                                    ${item.unitPrice.toFixed(2)}
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    ${(item.quantity * item.unitPrice).toFixed(2)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEditItem(item)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteItem(item.id)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="flex justify-end mt-4">
                            <div className="text-right">
                              <div className="font-medium text-lg">
                                Total: ${calculateTotal(invoiceItems).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isAddingItem && (
                        <div className="mt-4 border p-3 rounded-md bg-background">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium">
                              {isEditingItem ? "Edit Item" : "Add New Item"}
                            </h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setIsAddingItem(false);
                                setIsEditingItem(null);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <Form {...itemForm}>
                            <form
                              onSubmit={itemForm.handleSubmit(handleSaveItem)}
                              className="space-y-3"
                            >
                              <FormField
                                control={itemForm.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Item description"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={itemForm.control}
                                  name="quantity"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Quantity</FormLabel>
                                      <FormControl>
                                        <Input type="number" min={1} {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={itemForm.control}
                                  name="unitPrice"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Unit Price</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min={0.01}
                                          step={0.01}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="flex justify-end">
                                <Button type="submit" size="sm">
                                  {isEditingItem ? "Update Item" : "Add Item"}
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </div>
                      )}
                    </div>

                    <FormField
                      control={invoiceForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Additional notes for the invoice"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="submit">
                        {selectedInvoice ? "Update Invoice" : "Create Invoice"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by invoice number or customer details..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading invoices...</p>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No invoices found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Try changing your search criteria"
                  : "Create a new invoice to get started"}
              </p>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableCaption>List of invoices</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
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
                        <div className="font-medium">
                          {invoice.customer.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.customer.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.date), "PP")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.dueDate), "PP")}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${calculateTotal(invoice.items).toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setIsFormDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInvoice;
