
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  CreditCard,
  Download,
  Edit,
  Filter,
  Plus,
  Search,
  Trash,
  User,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

interface BillingItem {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  amount: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  description: string;
  date: string;
  dueDate: string;
}

const formSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  amount: z.coerce.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["paid", "pending", "overdue", "cancelled"]),
});

const AdminBilling = () => {
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<BillingItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  // Setup the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      amount: 0,
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "pending",
    },
  });

  // Mock data loading
  useEffect(() => {
    setIsLoading(true);
    // In a real application, this would be a call to your backend
    setTimeout(() => {
      const mockData: BillingItem[] = Array.from({ length: 10 }, (_, i) => ({
        id: `bill-${i + 1}`,
        customer: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
        },
        amount: Math.floor(Math.random() * 1000) + 50,
        status: ["paid", "pending", "overdue", "cancelled"][
          Math.floor(Math.random() * 4)
        ] as BillingItem["status"],
        description: `Room service and accommodation for ${i + 1} days`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      }));
      
      setBillingItems(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Set form values when editing an item
  useEffect(() => {
    if (editingItem) {
      form.reset({
        customerName: editingItem.customer.name,
        customerEmail: editingItem.customer.email,
        amount: editingItem.amount,
        description: editingItem.description,
        dueDate: new Date(editingItem.dueDate).toISOString().split("T")[0],
        status: editingItem.status,
      });
      setIsDialogOpen(true);
    }
  }, [editingItem, form]);

  // Filter billing items based on search term and status filter
  const filteredItems = billingItems.filter((item) => {
    const matchesSearch =
      item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    return matchesSearch && item.status === filterStatus;
  });

  // Handle form submission for new/edit billing item
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (editingItem) {
      // Update existing item
      const updatedItems = billingItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              customer: {
                name: data.customerName,
                email: data.customerEmail,
              },
              amount: data.amount,
              description: data.description,
              dueDate: new Date(data.dueDate).toISOString(),
              status: data.status,
            }
          : item
      );
      
      setBillingItems(updatedItems);
      toast({
        title: "Billing item updated",
        description: "The billing item has been updated successfully.",
      });
    } else {
      // Add new item
      const newItem: BillingItem = {
        id: `bill-${Date.now()}`,
        customer: {
          name: data.customerName,
          email: data.customerEmail,
        },
        amount: data.amount,
        description: data.description,
        date: new Date().toISOString(),
        dueDate: new Date(data.dueDate).toISOString(),
        status: data.status,
      };
      
      setBillingItems([newItem, ...billingItems]);
      toast({
        title: "Billing item created",
        description: "The new billing item has been created successfully.",
      });
    }
    
    // Reset form and close dialog
    form.reset();
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  // Delete a billing item
  const deleteBillingItem = (id: string) => {
    setBillingItems(billingItems.filter((item) => item.id !== id));
    toast({
      title: "Billing item deleted",
      description: "The billing item has been deleted successfully.",
    });
  };

  // Get status badge variant based on status
  const getStatusBadge = (status: BillingItem["status"]) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">Cancelled</Badge>;
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
              <CardTitle>Billing Management</CardTitle>
              <CardDescription>
                Manage customer bills and payment status
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  form.reset();
                  setEditingItem(null);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Bill
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Edit Billing Item" : "Create New Billing Item"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingItem
                      ? "Update the billing information below"
                      : "Enter the billing details to create a new item"}
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Customer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Customer Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="customer@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                              />
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
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Room services, accommodation, etc."
                              {...field}
                            />
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

                    <DialogFooter>
                      <Button type="submit">
                        {editingItem ? "Update" : "Create"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name, email or description..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select
                value={filterStatus}
                onValueChange={setFilterStatus}
              >
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading billing items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-10">
              <CreditCard className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No billing items found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== "all"
                  ? "Try changing your search or filter criteria"
                  : "Create a new billing item to get started"}
              </p>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableCaption>List of billing items</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {item.customer.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.customer.email}
                        </div>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="font-medium">
                        ${item.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {format(new Date(item.date), "PP")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(item.dueDate), "PP")}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteBillingItem(item.id)}
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

export default AdminBilling;
