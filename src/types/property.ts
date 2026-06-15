export type PropertyType = 'apartment' | 'house' | 'land' | 'commercial';
export type PropertyCategory = 'launch' | 'third_party';
export type PropertyStatus = 'available' | 'sold' | 'reserved';

export interface PropertyAddress {
  street?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  category: PropertyCategory;
  status: PropertyStatus;
  price: number;
  area: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  address: PropertyAddress;
  images: string[];
  description: string;
  features: string[];
  highlighted: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface PropertyFilter {
  type?: PropertyType;
  city?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  status?: PropertyStatus;
  category?: PropertyCategory;
  search?: string;
}

export type SortOption = 'price_asc' | 'price_desc' | 'area_desc' | 'newest';
