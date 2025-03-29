
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Form validation schema
const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter your address." })
});

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  // Get cart items from location state
  const { items, totalPrice, paymentMethod } = location.state || {};
  
  // Initialize form with user data if available
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: "",
      address: ""
    },
  });
  
  useEffect(() => {
    // Redirect to cart if no items
    if (!items || items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const handleCheckout = async (data: z.infer<typeof checkoutSchema>) => {
    if (!items || !paymentMethod) return;
    
    setLoading(true);
    
    try {
      // Process payment based on selected method
      if (paymentMethod === 'stripe') {
        const { data: sessionUrl, error } = await supabase.functions.invoke('create-stripe-checkout', {
          body: {
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              quantity: item.quantity
            })),
            customerEmail: data.email,
            customerName: data.name,
            customerPhone: data.phone,
            customerAddress: data.address,
            metadata: {
              type: 'food_order'
            }
          }
        });
        
        if (error) throw error;
        
        // Redirect to Stripe Checkout
        window.location.href = sessionUrl.url;
        
      } else if (paymentMethod === 'chapa') {
        const { data: chapaData, error } = await supabase.functions.invoke('create-chapa-checkout', {
          body: {
            items: items,
            amount: totalPrice,
            email: data.email,
            name: data.name,
            phone: data.phone,
            address: data.address
          }
        });
        
        if (error) throw error;
        
        // Redirect to Chapa Checkout
        window.location.href = chapaData.url;
      }
      
      // Clear cart on successful checkout initiation
      clearCart();
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!items || items.length === 0) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Please enter your details for delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, City, Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit"
                      className="w-full mt-6" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay ${paymentMethod === 'stripe' ? 'with Stripe' : 'with Chapa'}`
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <p>
                  You will be redirected to {paymentMethod === 'stripe' ? 'Stripe' : 'Chapa'} to complete your payment securely.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
