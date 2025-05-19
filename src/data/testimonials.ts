export interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  trip: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 5,
    text: 'Wanderlust helped me plan the most amazing trip to Japan. The itinerary builder was super easy to use, and all the recommendations were spot on. I discovered places I would have never found on my own!',
    trip: 'Tokyo & Kyoto, 10 days'
  },
  {
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4,
    text: 'The budget calculator saved me so much stress! I was able to plan my entire European adventure without going over budget. The accommodation recommendations were particularly helpful for finding affordable stays.',
    trip: 'Paris & Barcelona, 14 days'
  },
  {
    name: 'Sophia Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 5,
    text: 'As a solo traveler, I was nervous about planning a trip to Southeast Asia. Wanderlust made it so simple with detailed safety information and great local experiences. I\'ll definitely use it for my next adventure!',
    trip: 'Thailand & Bali, 21 days'
  }
];