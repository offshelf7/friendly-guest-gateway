
export interface Facility {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: 'dining' | 'wellness' | 'services';
  // Extended information for the dialog
  fullDescription?: string;
  images?: string[];
  features?: string[];
  priceInfo?: string;
  openingHours?: string;
  location?: string;
  bookingRequired?: boolean;
}
