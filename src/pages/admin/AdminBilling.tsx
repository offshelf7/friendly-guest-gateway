import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Pencil, 
  Plus, 
  Trash2, 
  Download,
  DollarSign,
  BarChart4
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface BillingItem {
  id: string;
  guest_id: string;
  guest_name: string;
  room_id?: string;
  room_number?: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
}

// Mock data for demo purposes
const billingData: BillingItem[] = [
  {
    id: '1',
    guest_id: 'g123',
    guest_name: 'John Doe',
    room_id: 'r1',
    room_number: '101',
    amount: 250.00,
    description: 'Room charge - Deluxe Suite',
    status: 'paid',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: '2',
    guest_id: 'g456',
    guest_name: 'Jane Smith',
    room_id: 'r2',
    room_number: '205',
    amount: 120.00,
    description: 'Room service charges',
    status: 'pending',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    guest_id: 'g789',
    guest_name: 'Robert Johnson',
    room_id: 'r3',
    room_number: '310',
    amount: 45.00,
    description: 'Spa services',
    status: 'pending',
    created_at: new Date().toISOString()
  }
];

const AdminBilling = () => {
  const [billings, setBillings] = useState<BillingItem[]>(billingData);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<BillingItem | null>(null);
  const { toast } = useToast();

  // Form schema for billing
  const billingSchema = z.object({
    guest_name: z.string().min(1, { message: "Guest name is required" }),
    room_number: z.string().optional(),
    amount: z.coerce.number().positive({ message: "Amount must be positive" }),
    description: z.string().min(1, { message: "Description is required" }),
    status: z.enum(['pending', 'paid', 'cancelled'])
  });

  // Form for adding/editing billing
  const form = useForm<z.infer<typeof billingSchema>>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      guest_name: "",
      room_number: "",
      amount: 0,
      description: "",
      status: "pending"
    }
  });

  // Reset form when switching between add and edit modes
  useEffect(() => {
    if (isEditing && selectedBilling) {
      form.reset({
        guest_name: selectedBilling.guest_name,
        room_number: selectedBilling.room_number || "",
        amount: selectedBilling.amount,
        description: selectedBilling.description,
        status: selectedBilling.status
      });
    } else {
      form.reset({
        guest_name: "",
        room_number: "",
        amount: 0,
        description: "",
        status: "pending"
      });
    }
  }, [isEditing, selectedBilling, form]);

  // Function to add a new billing item
  const addBilling = (data: z.infer<typeof billingSchema>) => {
    const newBilling: BillingItem = {
      id: `${Date.now()}`, // Generate a temporary ID
      guest_id: `g${Date.now()}`, // Generate a temporary guest ID
      guest_name: data.guest_name,
      room_number: data.room_number,
      amount: data.amount,
      description: data.description,
      status: data.status,
      created_at: new Date().toISOString()
    };

    setBillings([newBilling, ...billings]);
    toast({
      title: 'Success',
      description: 'Billing item added successfully',
    });
    form.reset();
  };

  // Function to update an existing billing item
  const updateBilling = (data: z.infer<typeof billingSchema>) => {
    if (!selectedBilling) return;

    const updatedBillings = billings.map(billing => 
      billing.id === selectedBilling.id ? {
        ...billing,
        guest_name: data.guest_name,
        room_number: data.room_number,
        amount: data.amount,
        description: data.description,
        status: data.status
      } : billing
    );

    setBillings(updatedBillings);
    toast({
      title: 'Success',
      description: 'Billing item updated successfully',
    });
    setIsEditing(false);
    setSelectedBilling(null);
  };

  // Function to delete a billing item
  const deleteBilling = (id: string) => {
    setBillings(billings.filter(billing => billing.id !== id));
    toast({
      title: 'Success',
      description: 'Billing item deleted successfully',
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Billing Management</h1>
          <p className="text-muted-foreground">Manage guest billings and payments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setIsEditing(false)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Billing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Billing' : 'Add Billing'}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? 'Update the billing information below'
                  : 'Fill in the billing details below'
                }
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(isEditing ? updateBilling : addBilling)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="guest_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Guest name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="room_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Room number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
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
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {isEditing ? 'Update Billing' : 'Add Billing'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Billings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(billings.reduce((acc, curr) => acc + curr.amount, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              {billings.length} billing records
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(billings.filter(b => b.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              {billings.filter(b => b.status === 'pending').length} pending payments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue
            </CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(billings.filter(b => b.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              {billings.filter(b => b.status === 'paid').length} completed payments
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing Records</CardTitle>
          <CardDescription>View and manage all guest billings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billings.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell className="font-medium">{billing.guest_name}</TableCell>
                  <TableCell>{billing.room_number || 'N/A'}</TableCell>
                  <TableCell>{billing.description}</TableCell>
                  <TableCell>{formatCurrency(billing.amount)}</TableCell>
                  <TableCell>{formatDate(billing.created_at)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(billing.status)}`}>
                      {billing.status.charAt(0).toUpperCase() + billing.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsEditing(true);
                              setSelectedBilling(billing);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{isEditing ? 'Edit Billing' : 'Add Billing'}</DialogTitle>
                            <DialogDescription>
                              {isEditing 
                                ? 'Update the billing information below'
                                : 'Fill in the billing details below'
                              }
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(isEditing ? updateBilling : addBilling)} className="space-y-4">
                              <FormField
                                control={form.control}
                                name="guest_name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Guest Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Guest name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="room_number"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Room Number</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Room number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Description" {...field} />
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
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <DialogFooter>
                                <Button type="submit">
                                  {isEditing ? 'Update Billing' : 'Add Billing'}
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBilling(billing.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBilling;
