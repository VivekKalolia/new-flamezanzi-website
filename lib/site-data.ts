export type VentureType = "restaurant" | "cafe" | "hotel";

export type Venture = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  type: VentureType;
  country: "Tanzania";
  city: string;
  area: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  cuisine: string[];
  features: string[];
  hours: string;
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  menuUrl: string;
  website?: string;
  checkIn?: string;
  checkOut?: string;
  airportDistance?: string;
  color: string;
  logo: string;
  images: {
    hero: string;
    gallery: string[];
  };
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  isVegetarian: boolean;
  isSpicy: boolean;
};

export type MenuCategory = {
  name: string;
  description: string;
  items: MenuItem[];
};

/** Brand marks in `public/logos/MAIN/` (filenames with spaces). */
function mainBrandLogo(filename: string) {
  return `/logos/MAIN/${encodeURIComponent(filename)}`;
}

/** Aquelia optimised WebP in `public/images/optimized/aquelia/`. */
function aqueliaOpt(file: string) {
  return `/images/optimized/aquelia/${file}`;
}

export const company = {
  name: "FlameZanzi Restaurant Ltd.",
  /** Primary mark: `public/logos/flamezanzi.png` */
  logo: "/logos/flamezanzi.png",
  founded: 2013,
  domain: "https://flamezanzi.com",
  description:
    "Flamezanzi Restaurant Limited is a dynamic hospitality group operating in Dar es Salaam and Zanzibar, known for blending culinary excellence with immersive guest experiences. From fine dining and artisanal bakeries to beachfront hotels, our ventures celebrate local flavors while delivering world-class service.",
  mission:
    "To create memorable dining and hospitality experiences that honor local culture, delight our guests, and inspire lasting connections.",
  vision:
    "To be East Africa's most trusted and celebrated hospitality brand, continuously growing and expanding through innovation, authenticity, and exceptional guest care.",
  values: [
    {
      title: "Authenticity",
      description: "We celebrate local heritage and flavors, ensuring every guest feels connected to the culture.",
    },
    {
      title: "Excellence",
      description: "We uphold the highest standards in food, service, and hospitality operations.",
    },
    {
      title: "Innovation",
      description: "We continuously evolve our menus, experiences, and systems to meet modern guest expectations.",
    },
    {
      title: "Community",
      description: "We support local producers, artisans, and staff, fostering sustainable growth.",
    },
    {
      title: "Integrity",
      description: "We build trust through transparency, respect, and consistency in everything we do.",
    },
  ],
  stats: [
    { label: "Ventures", value: "4", numeric: 4 },
    { label: "Team Members", value: "120+", numeric: 120 },
    { label: "Annual Guests", value: "50K+", numeric: 50000 },
    { label: "Years in Operation", value: "8+", numeric: 8 },
  ],
  milestones: [
    { year: "2013", title: "Group founded in Dar es Salaam" },
    { year: "2015", title: "Flames Restaurant established in Masaki" },
    { year: "2017", title: "Flames Bakery (Treats) launched" },
    { year: "2021", title: "The Silk Route Restaurant opened in Stone Town, Zanzibar" },
    { year: "2023", title: "Aquelia Rose Hotel portfolio addition in Jambiani" },
  ],
  leadership: [
    {
      name: "Ben Sheridan",
      role: "Founder & CEO",
      bio: "Leads brand strategy, growth partnerships, and operational standards across ventures.",
      image: "/images/optimized/team-corporate.webp",
    },
    {
      name: "Sophie Lana",
      role: "Director of Operations",
      bio: "Drives quality systems, training, and service excellence across all locations.",
      image: "/images/optimized/team-corporate.webp",
    },
    {
      name: "James Hoult",
      role: "Hospitality Partnerships",
      bio: "Manages corporate relationships, events, and strategic guest experience programs.",
      image: "/images/optimized/team-corporate.webp",
    },
  ],
  testimonials: [
    {
      quote:
        "FlameZanzi consistently delivers premium quality with disciplined operations and warm hospitality.",
      author: "Corporate Events Lead",
      company: "East Africa Business Council",
    },
    {
      quote:
        "From food quality to service delivery, every touchpoint reflects a high-caliber brand.",
      author: "Regional Travel Advisor",
      company: "Oceanline Travel Group",
    },
    {
      quote:
        "Their venues are elegant, dependable, and ideal for both executive and leisure experiences.",
      author: "Operations Director",
      company: "Global Haven Partners",
    },
  ],
  contact: {
    hq: "Dar es Salaam, Tanzania",
    hqFull: "Plot 45, Mikocheni B, Dar es Salaam, Tanzania",
    phone: "+255 775 111 122",
    email: "hello@flamezanzi.com",
    whatsapp: "+255775111122",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
};

export const ventures: Venture[] = [
  {
    id: 1,
    slug: "flames-restaurant",
    name: "Flames Restaurant",
    tagline: "Bold flavors, elegant atmosphere.",
    shortDescription:
      "A premium grill restaurant in Masaki known for refined service and contemporary cuisine.",
    fullDescription:
      "Flames Restaurant blends vibrant global flavors with modern hospitality standards. The venue is curated for executive dining, social celebrations, and quality-driven everyday service.",
    type: "restaurant",
    country: "Tanzania",
    city: "Dar es Salaam",
    area: "Masaki",
    coordinates: { lat: -6.7502, lng: 39.2746 },
    cuisine: ["Grill", "International", "Seafood"],
    features: ["Private Dining", "Corporate Events", "Outdoor Seating"],
    hours: "12:00-23:00",
    contact: {
      phone: "+255 756 352 637",
      email: "flames@flamezanzi.com",
      whatsapp: "+255756352637",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    menuUrl: "/menus/flames-menu.pdf",
    website: "https://flames.menu.tz",
    color: "#C41E3A",
    logo: mainBrandLogo("Flames Logo - Instagram.png"),
    images: {
      hero: "/images/optimized/venture-flames.webp",
      gallery: [
        "/images/optimized/flames/HNK08008.webp",
        "/images/optimized/flames/HNK08009.webp",
        "/images/optimized/flames/HNK08020.webp",
        "/images/optimized/flames/HNK08021.webp",
        "/images/optimized/flames/HNK08002.webp",
        "/images/optimized/flames/HNK08003.webp",
      ],
    },
  },
  {
    id: 2,
    slug: "treats-cafe",
    name: "Treats Cafe & Bakery",
    tagline: "Artisanal coffee and crafted pastries.",
    shortDescription:
      "A stylish cafe concept at Sea Cliff Village serving bakery classics, specialty coffee, and light dining.",
    fullDescription:
      "Treats Cafe & Bakery offers an approachable yet polished environment for meetings, relaxed brunches, and daily coffee rituals, supported by disciplined quality control.",
    type: "cafe",
    country: "Tanzania",
    city: "Dar es Salaam",
    area: "Sea Cliff Village",
    coordinates: { lat: -6.7385, lng: 39.2622 },
    cuisine: ["Cafe", "Bakery", "Breakfast"],
    features: ["Takeaway", "Coffee Bar", "Dessert Counter"],
    hours: "07:00-22:00",
    contact: {
      phone: "+255 22 234 5678",
      email: "treats@flamezanzi.com",
      whatsapp: "+255222345678",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    menuUrl: "/menus/treats-menu.pdf",
    color: "#D81B60",
    logo: mainBrandLogo("Treats Cafe & Bakery - Logo (WHITE BG).png"),
    images: {
      hero: "/images/optimized/treats/treats-cafe-bakery-hero.webp",
      gallery: [
        "/images/optimized/treats/treats-cafe-bakery-hero.webp",
        "/images/optimized/about-mission.webp",
        "/images/optimized/team-corporate.webp",
      ],
    },
  },
  {
    id: 3,
    slug: "silk-route",
    name: "The Silk Route Restaurant",
    tagline: "A rooftop culinary journey through the ancient Silk Road.",
    shortDescription:
      "The Silk Route Restaurant in Stone Town, Zanzibar, offers a fusion menu inspired by Indian, Asian, and Mediterranean traditions — with breathtaking rooftop views over the historic town.",
    fullDescription:
      "Nestled in the heart of Stone Town, The Silk Route Restaurant celebrates the rich culinary heritage of the ancient Silk Road. Our menu blends Indian, Asian, and Mediterranean influences, reflecting centuries of cultural exchange and flavor. From fragrant curries and tandoori kebabs to refreshing seafood and occasional Italian-inspired dishes, every plate is crafted to delight. Guests can savor authentic tastes while overlooking panoramic rooftop views of Zanzibar's old town and the Indian Ocean.",
    type: "restaurant",
    country: "Tanzania",
    city: "Zanzibar",
    area: "Stone Town",
    coordinates: { lat: -6.164, lng: 39.1896 },
    cuisine: ["Indian", "Swahili", "Mediterranean", "Fusion Seafood"],
    features: ["Rooftop Terrace", "Panoramic Views", "Lift Access", "Family Friendly", "Group Bookings"],
    hours: "11:00-23:00",
    contact: {
      phone: "+255 674 111 122",
      email: "silkrouteznz@gmail.com",
      whatsapp: "+255674111122",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    menuUrl: "/menus/silkroute-menu.pdf",
    color: "#E67E22",
    logo: mainBrandLogo("Silk Route Logo (Instagram).png"),
    images: {
      hero: "/images/optimized/venture-silk.webp",
      gallery: [
        "/images/optimized/silk-route/HNK08613.webp",
        "/images/optimized/silk-route/HNK08615.webp",
        "/images/optimized/silk-route/HNK08617.webp",
        "/images/optimized/silk-route/HNK08620.webp",
        "/images/optimized/silk-route/HNK08621.webp",
        "/images/optimized/silk-route/HNK08624.webp",
      ],
    },
  },
  {
    id: 4,
    slug: "aquelia-rose",
    name: "Aquelia Rose Hotel",
    tagline: "Your boutique beachfront retreat in Jambiani, Zanzibar.",
    shortDescription:
      "Aquelia Rose Hotel is a boutique beachfront property on the tranquil shores of Jambiani, Zanzibar — with only eight thoughtfully designed rooms, personalized service, and stunning sea views.",
    fullDescription:
      "At Aquelia Rose Hotel, we believe that every journey deserves a beautiful beginning. Nestled along the soft sands of Jambiani Beach, our boutique property offers guests an intimate escape where the ocean greets you each morning. From savoring authentic Swahili and continental flavors at our beachfront deck restaurant to exploring the vibrant culture of Zanzibar, every moment at Aquelia Rose is designed to connect you with the spirit of the island. Guided by eco-conscious values and a commitment to community, we welcome couples, honeymooners, and solo travelers to share in the warmth of our hospitality.",
    type: "hotel",
    country: "Tanzania",
    city: "Zanzibar",
    area: "Jambiani",
    coordinates: { lat: -6.3218, lng: 39.5507 },
    cuisine: ["Swahili Cuisine", "Continental", "Breakfast Included", "Beachfront Dining"],
    features: ["Beachfront Access", "Swimming Pool", "Air-Conditioned Rooms", "Free Wi-Fi", "Airport Shuttle", "Eco-Conscious", "Yoga Space", "Excursion Planning"],
    hours: "24h (Restaurant: 08:00–21:00)",
    contact: {
      phone: "+255 678 111 122",
      email: "aqueliaroseznz@gmail.com",
      whatsapp: "+255678111122",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    menuUrl: "/menus/aquelia-menu.pdf",
    checkIn: "14:00",
    checkOut: "11:00",
    airportDistance: "56 km",
    color: "#16A085",
    logo: mainBrandLogo("Aquelia Rose Hotel - Instagram Logo.png"),
    images: {
      hero: aqueliaOpt("HNK08340.webp"),
      gallery: [
        aqueliaOpt("HNK08342.webp"),
        aqueliaOpt("HNK08344.webp"),
        aqueliaOpt("HNK08346.webp"),
        aqueliaOpt("HNK08348.webp"),
        aqueliaOpt("HNK08352.webp"),
        aqueliaOpt("HNK08353.webp"),
        aqueliaOpt("HNK08354.webp"),
        aqueliaOpt("HNK08338.webp"),
        aqueliaOpt("HNK08339.webp"),
      ],
    },
  },
];

export const menus: Record<string, { categories: MenuCategory[] }> = {
  "flames-restaurant": {
    categories: [
      {
        name: "Starters",
        description: "Refined openings for the table.",
        items: [
          {
            name: "Charred Prawns",
            description: "Garlic butter, citrus glaze, herb crumbs",
            price: 18,
            tags: ["seafood"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Roasted Beet Carpaccio",
            description: "Goat cheese, walnuts, aged balsamic",
            price: 14,
            tags: ["signature"],
            isVegetarian: true,
            isSpicy: false,
          },
        ],
      },
      {
        name: "Mains",
        description: "Signature grill and premium plates.",
        items: [
          {
            name: "Flame House Steak",
            description: "300g cut, pepper sauce, seasonal greens",
            price: 34,
            tags: ["grill"],
            isVegetarian: false,
            isSpicy: false,
          },
          {
            name: "Spiced Lobster Tail",
            description: "Saffron rice, lemon herb butter",
            price: 39,
            tags: ["seafood"],
            isVegetarian: false,
            isSpicy: true,
          },
        ],
      },
    ],
  },
  "treats-cafe": {
    categories: [
      {
        name: "Coffee",
        description: "Specialty brews and classics.",
        items: [
          {
            name: "Single Origin Pour Over",
            description: "Seasonal roast, citrus notes",
            price: 5,
            tags: ["coffee"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Vanilla Latte",
            description: "Espresso, steamed milk, Madagascar vanilla",
            price: 6,
            tags: ["coffee"],
            isVegetarian: true,
            isSpicy: false,
          },
        ],
      },
      {
        name: "Bakery",
        description: "Freshly baked every morning.",
        items: [
          {
            name: "Almond Croissant",
            description: "Butter pastry, toasted almonds",
            price: 4,
            tags: ["pastry"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Savory Quiche",
            description: "Spinach, feta, caramelized onion",
            price: 8,
            tags: ["brunch"],
            isVegetarian: true,
            isSpicy: false,
          },
        ],
      },
    ],
  },
  "silk-route": {
    categories: [
      {
        name: "Small Plates",
        description: "Spice route inspirations.",
        items: [
          {
            name: "Zanzibar Samosa Trio",
            description: "Beef, lentil, and vegetable selection",
            price: 10,
            tags: ["local"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Coconut Lentil Soup",
            description: "Slow-cooked lentils, toasted coconut",
            price: 9,
            tags: ["soup"],
            isVegetarian: true,
            isSpicy: false,
          },
        ],
      },
      {
        name: "Signature Mains",
        description: "Curated regional flavors.",
        items: [
          {
            name: "Saffron Prawn Biryani",
            description: "Aromatic rice, prawns, caramelized onions",
            price: 23,
            tags: ["biryani"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Stone Town Grilled Fish",
            description: "Catch of day, tamarind glaze",
            price: 26,
            tags: ["seafood"],
            isVegetarian: false,
            isSpicy: false,
          },
        ],
      },
    ],
  },
  "aquelia-rose": {
    categories: [
      {
        name: "Breakfast",
        description: "Fresh and balanced morning options.",
        items: [
          {
            name: "Island Breakfast Bowl",
            description: "Tropical fruit, yogurt, granola",
            price: 11,
            tags: ["breakfast"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Coastal Omelette",
            description: "Herbs, tomatoes, local cheese",
            price: 12,
            tags: ["breakfast"],
            isVegetarian: true,
            isSpicy: false,
          },
        ],
      },
      {
        name: "All-Day Dining",
        description: "Hotel guest favorites.",
        items: [
          {
            name: "Grilled Chicken Wrap",
            description: "House sauce, greens, sweet potato fries",
            price: 14,
            tags: ["lunch"],
            isVegetarian: false,
            isSpicy: false,
          },
          {
            name: "Sea Breeze Pasta",
            description: "Prawns, garlic, basil, cherry tomato",
            price: 18,
            tags: ["dinner"],
            isVegetarian: false,
            isSpicy: true,
          },
        ],
      },
    ],
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/ventures", label: "Our Ventures" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function getVentureBySlug(slug: string) {
  return ventures.find((venture) => venture.slug === slug);
}
