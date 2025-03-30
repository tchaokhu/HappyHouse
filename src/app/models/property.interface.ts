export interface Property {
  id: number;
  title: string;
  price: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'house' | 'apartment' | 'villa';
  location: string;
  imageUrl: string;
  amenities: string[];
} 