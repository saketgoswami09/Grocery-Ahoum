/* ===== Enums ===== */

export enum ProductCategory {
  FRESH_FRUITS = 'fresh_fruits',
  FRESH_VEGETABLES = 'fresh_vegetables',
  COOKING_OIL = 'cooking_oil',
  MEAT_FISH = 'meat_fish',
  BAKERY = 'bakery',
  DAIRY_EGGS = 'dairy_eggs',
  BEVERAGES = 'beverages',
  SNACKS = 'snacks',
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

/* ===== Interfaces ===== */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  unit: string;
  quantity: number;
  rating: number;
  reviewCount: number;
  isOrganic?: boolean;
  nutritionFacts?: NutritionFact[];
  details?: string;
}

export interface NutritionFact {
  label: string;
  value: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: Address;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Category {
  id: ProductCategory;
  name: string;
  image: string;
  color: string;
  borderColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  address: Address;
}

export interface FilterState {
  categories: ProductCategory[];
  brands: string[];
  priceRange: [number, number];
  isOrganic: boolean;
  sortBy: 'popular' | 'price_low' | 'price_high' | 'rating';
}

export interface LocationOption {
  id: string;
  zone: string;
  area: string;
  city: string;
}
