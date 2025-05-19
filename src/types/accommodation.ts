export interface Accommodation {
  id: string;
  destinationId: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  type: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
}