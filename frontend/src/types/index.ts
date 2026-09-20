export interface ProductReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  stockCode?: string;  // Real StockCode from backend (products_df.pkl index)
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isPathiChoice?: boolean;
  isLimitedDeal?: boolean;
  hasPrime: boolean;
  hasCoupon?: boolean;
  couponPercent?: number;
  tags: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCoupon?: boolean;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  INR: { code: 'INR', symbol: '₹', rate: 84.2 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36 },
};

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  primeOnly: boolean;
  inStockOnly: boolean;
  hasDiscountOnly: boolean;
  selectedTags: string[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface OrderItem {
  id: string;
  date: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
}

export interface TagPredictionResponse {
  input_text: string;
  tags: string[];
  tag_count: number;
  processing_time_ms: number;
}
