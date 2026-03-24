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

export const company = {
  name: "FlameZanzi Restaurant Ltd.",
  logo: "/logos/flamezanzi-logo.svg",
  founded: 2015,
  domain: "https://flamezanzi.com",
  description:
    "FlameZanzi Restaurant Ltd. is a premium hospitality group operating signature restaurants, a cafe, and a boutique hotel across Tanzania and Zanzibar.",
  mission:
    "To create memorable hospitality experiences through culinary quality, refined service, and thoughtful venue design.",
  vision:
    "To be East Africa's most trusted premium hospitality portfolio for guests, partners, and communities.",
  values: [
    {
      title: "Excellence",
      description: "We uphold high standards in food quality, service, and consistency.",
    },
    {
      title: "Warm Hospitality",
      description: "We combine professional operations with genuine care for every guest.",
    },
    {
      title: "Innovation",
      description: "We evolve experiences through modern concepts and smart systems.",
    },
    {
      title: "Integrity",
      description: "We lead transparently with trust, safety, and accountability.",
    },
  ],
  stats: [
    { label: "Ventures", value: "4" },
    { label: "Team Members", value: "248" },
    { label: "Annual Guests", value: "250K+" },
    { label: "Years in Hospitality", value: "10+" },
  ],
  milestones: [
    { year: "2015", title: "Group founded in Dar es Salaam" },
    { year: "2017", title: "Flames Restaurant expansion" },
    { year: "2019", title: "Treats Cafe & Bakery launched" },
    { year: "2022", title: "Silk Route opened in Zanzibar" },
    { year: "2024", title: "Aquelia Rose Hotel portfolio addition" },
  ],
  leadership: [
    {
      name: "Ben Sheridan",
      role: "Founder & CEO",
      bio: "Leads brand strategy, growth partnerships, and operational standards across ventures.",
      image: "/images/optimized/team-corporate.jpg",
    },
    {
      name: "Sophie Lana",
      role: "Director of Operations",
      bio: "Drives quality systems, training, and service excellence across all locations.",
      image: "/images/optimized/team-corporate.jpg",
    },
    {
      name: "James Hoult",
      role: "Hospitality Partnerships",
      bio: "Manages corporate relationships, events, and strategic guest experience programs.",
      image: "/images/optimized/team-corporate.jpg",
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
    phone: "+255 22 123 0000",
    email: "hello@flamezanzi.com",
    whatsapp: "+255221230000",
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
    logo: "/logos/flames-restaurant-logo.svg",
    images: {
      hero: "/images/optimized/venture-flames.jpg",
      gallery: [
        "/images/optimized/about-mission.jpg",
        "/images/optimized/hero-main.jpg",
        "/images/optimized/venture-flames.jpg",
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
    logo: "/logos/treats-cafe-logo.svg",
    images: {
      hero: "/images/optimized/venture-treats.jpg",
      gallery: [
        "/images/optimized/venture-treats.jpg",
        "/images/corporate-reference-2.png",
        "/images/optimized/about-mission.jpg",
      ],
    },
  },
  {
    id: 3,
    slug: "silk-route",
    name: "The Silk Route Restaurant",
    tagline: "Heritage-inspired culinary journey.",
    shortDescription:
      "A destination dining concept in Stone Town blending cultural depth with modern presentation.",
    fullDescription:
      "The Silk Route Restaurant delivers immersive hospitality inspired by heritage trade routes, balancing local authenticity with international hospitality expectations.",
    type: "restaurant",
    country: "Tanzania",
    city: "Zanzibar",
    area: "Stone Town",
    coordinates: { lat: -6.164, lng: 39.1896 },
    cuisine: ["Zanzibari", "Fusion", "Seafood"],
    features: ["Historic Ambience", "Curated Tasting", "Family Friendly"],
    hours: "12:30-23:30",
    contact: {
      phone: "+255 674 111 122",
      email: "silkroute@flamezanzi.com",
      whatsapp: "+255674111122",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    menuUrl: "/menus/silkroute-menu.pdf",
    color: "#E67E22",
    logo: "/logos/silk-route-logo.svg",
    images: {
      hero: "/images/optimized/venture-silk.jpg",
      gallery: [
        "/images/optimized/venture-silk.jpg",
        "/images/optimized/venture-hotel.jpg",
        "/images/corporate-reference-1.png",
      ],
    },
  },
  {
    id: 4,
    slug: "aquelia-rose",
    name: "Aquelia Rose Hotel",
    tagline: "Refined coastal comfort in Jambiani.",
    shortDescription:
      "A boutique hotel experience focused on comfort, calm design, and attentive service.",
    fullDescription:
      "Aquelia Rose Hotel complements the group's dining portfolio with premium accommodation, guest-centric service, and a refined coastal atmosphere in Zanzibar.",
    type: "hotel",
    country: "Tanzania",
    city: "Zanzibar",
    area: "Jambiani",
    coordinates: { lat: -6.3218, lng: 39.5507 },
    cuisine: ["Hotel Dining", "Breakfast", "International"],
    features: ["Ocean Access", "Family Suites", "Airport Transfer"],
    hours: "24h",
    contact: {
      phone: "+255 759 900 800",
      email: "aqueliarose@flamezanzi.com",
      whatsapp: "+255759900800",
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
    logo: "/logos/aquelia-rose-logo.svg",
    images: {
      hero: "/images/optimized/venture-hotel.jpg",
      gallery: [
        "/images/optimized/venture-hotel.jpg",
        "/images/optimized/venture-silk.jpg",
        "/images/corporate-reference-2.png",
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
