import { testimonialPlaceholderAvatars, treatsCafeGallery, treatsCafeUnsplash } from "./stock-images";

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
  /** Primary mark: `public/images/optimized/logo-flamezanzi.webp` (source: `public/logos/flamezanzi/`) */
  logo: "/images/optimized/logo-flamezanzi.webp",
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
      name: "Jiten Chandarana",
      role: "Owner",
      bio: "Sets strategic direction for the group and champions long-term growth across Dar es Salaam and Zanzibar.",
      image: "/images/optimized/team-corporate.webp",
    },
    {
      name: "Mai Mohamed",
      role: "General Manager",
      bio: "Oversees day-to-day operations, guest experience standards, and cross-venue coordination.",
      image: "/images/optimized/team-corporate.webp",
    },
    {
      name: "Mahesh Chilla",
      role: "Finance Manager",
      bio: "Leads financial planning, reporting, and sustainable investment across the portfolio.",
      image: "/images/optimized/team-corporate.webp",
    },
  ],
  testimonials: [
    {
      quote:
        "FlameZanzi consistently delivers premium quality with disciplined operations and warm hospitality.",
      author: "Corporate Events Lead",
      company: "East Africa Business Council",
      avatar: testimonialPlaceholderAvatars[0],
    },
    {
      quote:
        "From food quality to service delivery, every touchpoint reflects a high-caliber brand.",
      author: "Regional Travel Advisor",
      company: "Oceanline Travel Group",
      avatar: testimonialPlaceholderAvatars[1],
    },
    {
      quote:
        "Their venues are elegant, dependable, and ideal for both executive and leisure experiences.",
      author: "Operations Director",
      company: "Global Haven Partners",
      avatar: testimonialPlaceholderAvatars[2],
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
      hero: "/images/optimized/flames/HNK08116(1).webp",
      gallery: [
        "/images/optimized/flames/HNK08116(1).webp",
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
      hero: treatsCafeUnsplash.interior,
      gallery: [...treatsCafeGallery],
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
      hero: "/images/optimized/silk-route/HNK08758.webp",
      gallery: [
        "/images/optimized/silk-route/HNK08758.webp",
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
        aqueliaOpt("HNK08340.webp"),
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

/** Menu `price` values are whole TZS (Tanzanian shillings), e.g. 18500 → TZS 18,500 */
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
            price: 26_500,
            tags: ["seafood"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Roasted Beet Carpaccio",
            description: "Goat cheese, walnuts, aged balsamic",
            price: 18_500,
            tags: ["signature"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Paneer Tikka",
            description: "Charred cottage cheese, peppers, kasoori methi, mint chutney (mock)",
            price: 22_000,
            tags: ["indian", "veg"],
            isVegetarian: true,
            isSpicy: true,
          },
          {
            name: "Chicken Tikka Starter",
            description: "Yogurt-marinated bites, lemon, chaat masala (mock)",
            price: 24_000,
            tags: ["indian", "grill"],
            isVegetarian: false,
            isSpicy: true,
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
            price: 68_000,
            tags: ["grill"],
            isVegetarian: false,
            isSpicy: false,
          },
          {
            name: "Spiced Lobster Tail",
            description: "Saffron rice, lemon herb butter",
            price: 82_000,
            tags: ["seafood"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Herb-Crusted Lamb Rack",
            description: "Rosemary jus, fondant potato, seasonal veg",
            price: 72_000,
            tags: ["grill"],
            isVegetarian: false,
            isSpicy: false,
          },
        ],
      },
      {
        name: "Indian classics",
        description: "Curries, paneer, and house breads — illustrative menu (mock).",
        items: [
          {
            name: "Paneer Butter Masala",
            description: "Soft paneer in tomato-butter gravy, kasuri methi, cream (mock)",
            price: 28_500,
            tags: ["indian", "curry"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Palak Paneer",
            description: "Spinach gravy, fresh paneer, ginger-garlic tempering (mock)",
            price: 27_500,
            tags: ["indian", "curry"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Dal Makhani",
            description: "Slow-cooked black lentils, butter, cream (mock)",
            price: 19_500,
            tags: ["indian", "veg"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Chana Masala",
            description: "Chickpeas in onion-tomato masala, amchur (mock)",
            price: 18_000,
            tags: ["indian", "veg"],
            isVegetarian: true,
            isSpicy: true,
          },
          {
            name: "Butter Chicken",
            description: "Tandoori chicken morsels, makhani sauce, fenugreek (mock)",
            price: 32_000,
            tags: ["indian", "curry"],
            isVegetarian: false,
            isSpicy: false,
          },
          {
            name: "Lamb Rogan Josh",
            description: "Kashmiri-style yogurt gravy, aromatic spices (mock)",
            price: 38_000,
            tags: ["indian", "curry"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Hyderabadi Chicken Biryani",
            description: "Basmati, saffron, fried onion, raita side (mock)",
            price: 34_000,
            tags: ["indian", "biryani"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Garlic Naan (2 pcs)",
            description: "Tandoor bread, butter, coriander (mock)",
            price: 6500,
            tags: ["indian", "bread"],
            isVegetarian: true,
            isSpicy: false,
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
            price: 8500,
            tags: ["coffee"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Vanilla Latte",
            description: "Espresso, steamed milk, Madagascar vanilla",
            price: 9500,
            tags: ["coffee"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Masala Chai",
            description: "Black tea, cardamom, ginger, milk — street-style (mock)",
            price: 5500,
            tags: ["indian", "tea"],
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
            price: 6500,
            tags: ["pastry"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Savory Quiche",
            description: "Spinach, feta, caramelized onion",
            price: 12_500,
            tags: ["brunch"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Paneer & Spinach Puff",
            description: "Flaky pastry, spiced filling (mock)",
            price: 7500,
            tags: ["indian", "snack"],
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
            price: 14_500,
            tags: ["local"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Coconut Lentil Soup",
            description: "Slow-cooked lentils, toasted coconut",
            price: 12_000,
            tags: ["soup"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Papdi Chaat",
            description: "Crisp wafers, yogurt, tamarind, chutneys (mock)",
            price: 11_500,
            tags: ["indian", "street"],
            isVegetarian: true,
            isSpicy: true,
          },
          {
            name: "Hara Bhara Kebab",
            description: "Spinach-potato patties, green chutney (mock)",
            price: 13_500,
            tags: ["indian", "veg"],
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
            price: 42_000,
            tags: ["biryani"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Stone Town Grilled Fish",
            description: "Catch of day, tamarind glaze",
            price: 38_500,
            tags: ["seafood"],
            isVegetarian: false,
            isSpicy: false,
          },
          {
            name: "Malai Kofta",
            description: "Paneer-potato dumplings, cashew-onion gravy (mock)",
            price: 26_000,
            tags: ["indian", "curry"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Paneer Lababdar",
            description: "Grated paneer in rich tomato-cream masala (mock)",
            price: 25_500,
            tags: ["indian", "curry"],
            isVegetarian: true,
            isSpicy: true,
          },
          {
            name: "Goan Prawn Curry",
            description: "Coconut milk, kokum, curry leaves (mock)",
            price: 39_000,
            tags: ["indian", "seafood"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Vegetable Dum Biryani",
            description: "Sealed pot, seasonal vegetables, raita (mock)",
            price: 22_000,
            tags: ["indian", "biryani"],
            isVegetarian: true,
            isSpicy: true,
          },
        ],
      },
      {
        name: "Breads & rice",
        description: "Sides to share.",
        items: [
          {
            name: "Butter Naan",
            description: "Tandoor naan, brushed with butter (mock)",
            price: 4500,
            tags: ["indian", "bread"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Jeera Rice",
            description: "Basmati tempered with cumin (mock)",
            price: 7000,
            tags: ["indian", "rice"],
            isVegetarian: true,
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
            price: 22_000,
            tags: ["breakfast"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Coastal Omelette",
            description: "Herbs, tomatoes, local cheese",
            price: 18_500,
            tags: ["breakfast"],
            isVegetarian: true,
            isSpicy: false,
          },
          {
            name: "Masala Dosa (mock)",
            description: "Crisp rice-lentil crepe, potato masala, sambar & chutney",
            price: 16_500,
            tags: ["indian", "breakfast"],
            isVegetarian: true,
            isSpicy: true,
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
            price: 24_000,
            tags: ["lunch"],
            isVegetarian: false,
            isSpicy: false,
          },
          {
            name: "Sea Breeze Pasta",
            description: "Prawns, garlic, basil, cherry tomato",
            price: 28_500,
            tags: ["dinner"],
            isVegetarian: false,
            isSpicy: true,
          },
          {
            name: "Paneer Kathi Roll",
            description: "Roomali wrap, mint chutney, pickled onion (mock)",
            price: 19_500,
            tags: ["indian", "lunch"],
            isVegetarian: true,
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
