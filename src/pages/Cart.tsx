
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TrashIcon, Plus, Minus, CreditCard, ArrowLeft } from "lucide-react";
import { PaymentMethod } from '@/types/menuTypes';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe',
      name: 'Credit Card (Stripe)',
      processor: 'stripe',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg'
    },
    {
      id: 'chapa',
      name: 'Chapa',
      processor: 'chapa',
      icon: 'https://chapa.co/assets/images/chapa-logo.svg'
    }
  ];
  
  const handleCheckout = () => {
    if (!selectedPaymentMethod) {
      return; // Handle no payment method selected
    }
    
    // Redirect to checkout page with the selected payment method
    navigate('/checkout', { 
      state: { 
        items: cartItems,
        totalPrice,
        paymentMethod: selectedPaymentMethod
      } 
    });
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            You haven't added any items to your cart yet. Browse our menu to find something you'll love.
          </p>
          <Button onClick={() => navigate('/food-and-drink')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button variant="outline" onClick={() => navigate('/food-and-drink')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                <CardDescription>Review your items before checkout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded overflow-hidden bg-slate-100 mr-4">
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="h-8 w-12 mx-2 text-center"
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <p className="font-medium whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-1">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Service Charge</span>
                  <span>Included</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Payment Method</h4>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        className={`border rounded-md p-3 cursor-pointer transition-colors ${
                          selectedPaymentMethod === method.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        <div className="flex items-center">
                          <div className="h-6 w-6 mr-2">
                            <img 
                              src={method.icon} 
                              alt={method.name} 
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span>{method.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={!selectedPaymentMethod || cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
