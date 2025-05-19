export interface Highlight {
  title: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  tags: string[];
  bestTimeToVisit: string;
  budget: string;
  recommendedStay: string;
  highlights: Highlight[];
  emergencyNumber: string;
}