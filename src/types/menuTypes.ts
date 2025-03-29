
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: 'food' | 'drink';
  type: string; // subcategory like 'main', 'dessert', 'appetizer', 'cocktail', 'wine', etc.
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  processor: 'stripe' | 'chapa';
  icon: string;
}
