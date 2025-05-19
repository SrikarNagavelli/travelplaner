import { Destination } from '../types/destination';

export const featuredDestinations: Destination[] = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Known as the Island of the Gods, Bali appeals through its sheer natural beauty of looming volcanoes and lush terraced rice fields that exude peace and serenity. It is also famous for surfers\' paradise.',
    imageUrl: 'https://images.pexels.com/photos/1822458/pexels-photo-1822458.jpeg',
    tags: ['Beach', 'Cultural', 'Relaxation'],
    bestTimeToVisit: 'April to October',
    budget: '$50-100 per day',
    recommendedStay: '7-10 days',
    highlights: [
      { title: 'Ubud Monkey Forest', description: 'Sacred sanctuary with over 700 monkeys' },
      { title: 'Tegallalang Rice Terraces', description: 'Stunning stepped rice paddies' },
      { title: 'Uluwatu Temple', description: 'Ancient sea temple with spectacular views' },
      { title: 'Seminyak Beach', description: 'Trendy beach area with upscale resorts' }
    ],
    emergencyNumber: '112'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Paris, the City of Light, is renowned for its stunning architecture, art museums, historical monuments, and romantic ambiance. From the iconic Eiffel Tower to the bustling Avenue des Champs-Élysées, Paris is a feast for the senses.',
    imageUrl: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
    tags: ['Urban', 'Cultural', 'Historical', 'Food'],
    bestTimeToVisit: 'April to June, September to October',
    budget: '$150-200 per day',
    recommendedStay: '4-7 days',
    highlights: [
      { title: 'Eiffel Tower', description: 'Iconic iron lattice tower' },
      { title: 'Louvre Museum', description: 'World\'s largest art museum' },
      { title: 'Notre-Dame Cathedral', description: 'Medieval Catholic cathedral' },
      { title: 'Montmartre', description: 'Artistic neighborhood with stunning views' }
    ],
    emergencyNumber: '112'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Kyoto, once the capital of Japan, is famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses. It\'s also known for formal traditions such as kaiseki dining and geisha entertainment.',
    imageUrl: 'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg',
    tags: ['Cultural', 'Historical', 'Food'],
    bestTimeToVisit: 'March to May, October to November',
    budget: '$120-180 per day',
    recommendedStay: '3-5 days',
    highlights: [
      { title: 'Fushimi Inari Shrine', description: 'Famous for thousands of vermilion torii gates' },
      { title: 'Arashiyama Bamboo Grove', description: 'Stunning path through towering bamboo' },
      { title: 'Kinkaku-ji (Golden Pavilion)', description: 'Zen Buddhist temple covered in gold leaf' },
      { title: 'Gion District', description: 'Famous geisha district with preserved traditional architecture' }
    ],
    emergencyNumber: '119'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its two principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater).',
    imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    tags: ['Beach', 'Relaxation', 'Cultural'],
    bestTimeToVisit: 'April to November',
    budget: '$150-250 per day',
    recommendedStay: '4-6 days',
    highlights: [
      { title: 'Oia Sunset', description: 'Famous sunset views from the cliffside village' },
      { title: 'Red Beach', description: 'Unique beach with red volcanic sand' },
      { title: 'Ancient Thera', description: 'Archaeological site from the 9th century BC' },
      { title: 'Caldera Cruise', description: 'Boat trip to volcanic islands and hot springs' }
    ],
    emergencyNumber: '112'
  },
  {
    id: 'newyork',
    name: 'New York City',
    country: 'United States',
    description: 'The Big Apple is one of the world\'s most iconic cities, known for its skyscrapers, Broadway shows, and cultural diversity. From the bustling Times Square to the serene Central Park, New York offers something for every type of traveler.',
    imageUrl: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
    tags: ['Urban', 'Cultural', 'Food'],
    bestTimeToVisit: 'April to June, September to November',
    budget: '$200-300 per day',
    recommendedStay: '5-7 days',
    highlights: [
      { title: 'Central Park', description: 'Massive urban park in the city center' },
      { title: 'Empire State Building', description: 'Iconic 102-story skyscraper' },
      { title: 'Metropolitan Museum of Art', description: 'One of the world\'s largest art museums' },
      { title: 'Brooklyn Bridge', description: 'Historic bridge with stunning Manhattan views' }
    ],
    emergencyNumber: '911'
  },
  {
    id: 'capetown',
    name: 'Cape Town',
    country: 'South Africa',
    description: 'Nestled beneath the iconic Table Mountain, Cape Town is a vibrant city that offers a blend of natural beauty, rich history, and diverse culture. From pristine beaches to world-class vineyards, the city has something for everyone.',
    imageUrl: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg',
    tags: ['Beach', 'Adventure', 'Cultural'],
    bestTimeToVisit: 'October to April',
    budget: '$100-150 per day',
    recommendedStay: '5-7 days',
    highlights: [
      { title: 'Table Mountain', description: 'Iconic flat-topped mountain with panoramic views' },
      { title: 'Robben Island', description: 'Historic prison where Nelson Mandela was held' },
      { title: 'Boulders Beach', description: 'Home to a colony of African penguins' },
      { title: 'Cape of Good Hope', description: 'Scenic point where the Atlantic and Indian Oceans meet' }
    ],
    emergencyNumber: '10111'
  }
];

export const allDestinations: Destination[] = [
  ...featuredDestinations,
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Barcelona, the cosmopolitan capital of Spain\'s Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city.',
    imageUrl: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    tags: ['Urban', 'Beach', 'Cultural', 'Food'],
    bestTimeToVisit: 'May to June, September to October',
    budget: '$120-200 per day',
    recommendedStay: '4-6 days',
    highlights: [
      { title: 'Sagrada Família', description: 'Iconic unfinished church designed by Gaudí' },
      { title: 'Park Güell', description: 'Whimsical park with architectural elements by Gaudí' },
      { title: 'La Rambla', description: 'Famous tree-lined pedestrian street' },
      { title: 'Gothic Quarter', description: 'Historic neighborhood with medieval buildings' }
    ],
    emergencyNumber: '112'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Tokyo, Japan\'s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods.',
    imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    tags: ['Urban', 'Cultural', 'Food', 'Shopping'],
    bestTimeToVisit: 'March to May, September to November',
    budget: '$150-250 per day',
    recommendedStay: '5-7 days',
    highlights: [
      { title: 'Shinjuku Gyoen National Garden', description: 'Beautiful garden with cherry blossoms in spring' },
      { title: 'Shibuya Crossing', description: 'Famous busy intersection known as "The Scramble"' },
      { title: 'Senso-ji Temple', description: 'Ancient Buddhist temple with five-story pagoda' },
      { title: 'Tokyo Skytree', description: 'Tallest tower in Japan with observation decks' }
    ],
    emergencyNumber: '119'
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    description: 'Bangkok, Thailand\'s capital, is a large city known for ornate shrines and vibrant street life. The boat-filled Chao Phraya River feeds its network of canals, flowing past the Rattanakosin royal district.',
    imageUrl: 'https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg',
    tags: ['Urban', 'Cultural', 'Food', 'Shopping'],
    bestTimeToVisit: 'November to February',
    budget: '$50-100 per day',
    recommendedStay: '3-5 days',
    highlights: [
      { title: 'Grand Palace', description: 'Complex of buildings at the heart of Bangkok' },
      { title: 'Wat Arun', description: 'Temple of Dawn along the Chao Phraya River' },
      { title: 'Chatuchak Weekend Market', description: 'One of the world\'s largest weekend markets' },
      { title: 'Khao San Road', description: 'Famous backpacker street with bustling nightlife' }
    ],
    emergencyNumber: '191'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    description: 'Rome, Italy\'s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire.',
    imageUrl: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
    tags: ['Urban', 'Historical', 'Cultural', 'Food'],
    bestTimeToVisit: 'April to May, September to October',
    budget: '$150-200 per day',
    recommendedStay: '3-5 days',
    highlights: [
      { title: 'Colosseum', description: 'Iconic ancient Roman amphitheater' },
      { title: 'Vatican Museums', description: 'Vast collection of art and artifacts' },
      { title: 'Trevi Fountain', description: 'Baroque fountain from the 18th century' },
      { title: 'Roman Forum', description: 'Ruins of important government buildings' }
    ],
    emergencyNumber: '112'
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    description: 'Rio de Janeiro is a huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches, 38m Christ the Redeemer statue atop Mount Corcovado and for Sugarloaf Mountain, a granite peak with cable cars to its summit.',
    imageUrl: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg',
    tags: ['Beach', 'Cultural', 'Adventure'],
    bestTimeToVisit: 'December to March',
    budget: '$80-150 per day',
    recommendedStay: '5-7 days',
    highlights: [
      { title: 'Christ the Redeemer', description: 'Iconic statue overlooking the city' },
      { title: 'Copacabana Beach', description: 'Famous beach with a distinctive sidewalk pattern' },
      { title: 'Sugarloaf Mountain', description: 'Peak reached by cable car with panoramic views' },
      { title: 'Tijuca National Park', description: 'Urban forest with hiking trails and waterfalls' }
    ],
    emergencyNumber: '190'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    description: 'Sydney, capital of New South Wales and one of Australia\'s largest cities, is best known for its harbourfront Sydney Opera House, with a distinctive sail-like design. Massive Darling Harbour and the smaller Circular Quay port are hubs of waterside life.',
    imageUrl: 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg',
    tags: ['Urban', 'Beach', 'Cultural'],
    bestTimeToVisit: 'September to November, March to May',
    budget: '$150-250 per day',
    recommendedStay: '4-6 days',
    highlights: [
      { title: 'Sydney Opera House', description: 'Iconic performing arts venue' },
      { title: 'Sydney Harbour Bridge', description: 'Steel arch bridge across the harbor' },
      { title: 'Bondi Beach', description: 'Popular beach with golden sand' },
      { title: 'Royal Botanic Garden', description: 'Expansive garden with native and exotic plants' }
    ],
    emergencyNumber: '000'
  }
];