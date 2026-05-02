import { treatsCafeGallery, treatsCafeUnsplash } from "./stock-images";

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
  /** Parsed for search only; not displayed in the menu UI */
  tags: string[];
  isVegetarian: boolean;
  isSpicy: boolean;
  /** Optional dish photo (`public` path). Defaults to `MENU_ITEM_PLACEHOLDER_IMAGE`. */
  image?: string;
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

/** Aquelia Rose main hotel visual: full-width WebP in `public/images/optimized/aquelia/`. */
function aqueliaOpt(file: string) {
  return `/images/optimized/aquelia/${file}`;
}

/** Neutral dish image for menu tiles until venue-specific photos are added (WebP). */
export const MENU_ITEM_PLACEHOLDER_IMAGE = "/images/optimized/menu-dish-placeholder.webp";

/** Brand casing for visible copy (`Flame` + capital `Z`). URLs and mailbox domains stay lowercase. */
export const BRAND_WORDMARK = "FlameZanzi";

export const company = {
  name: `${BRAND_WORDMARK} Restaurant Limited`,
  /** Primary mark: `public/images/optimized/logo-flamezanzi.webp` (source: `public/logos/flamezanzi/`) */
  logo: "/images/optimized/logo-flamezanzi.webp",
  founded: 2013,
  domain: "https://flamezanzi.com",
  /** Full company narrative (used on /about and anywhere we want the complete story). */
  description:
    `${BRAND_WORDMARK} Restaurant Limited is a dynamic hospitality group operating in Dar es Salaam and Zanzibar, known for blending culinary excellence with immersive guest experiences. From fine dining and artisanal bakeries to beachfront hotels, our ventures celebrate local flavors while delivering world-class service. As we continue to expand with new projects across both cities, ${BRAND_WORDMARK} is building a diverse portfolio that reflects our commitment to growth, innovation, and community.`,
  /** Short pitch for home hero, footer, etc. Full story is `description` on About. */
  elevatorPitch:
    "Premium hospitality across Dar es Salaam and Zanzibar: restaurants, cafe & bakery, and boutique stays under one portfolio.",
  mission:
    "To create memorable dining and hospitality experiences that honor local culture, delight our guests, and inspire lasting connections.",
  vision:
    "To be East Africa's most trusted and celebrated hospitality brand, continuously growing and expanding through innovation, authenticity, and exceptional guest care. We envision a future where our restaurants, bakeries, and hotels set new standards of excellence, creating lasting memories and inspiring communities across the region and beyond.",
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
    { label: "Team members (DSM & ZNZ)", value: "120+", numeric: 120 },
    { label: "Guests served annually (approx.)", value: "50K", numeric: 50000 },
    { label: "Years in operation", value: "8", numeric: 8 },
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
        `Excellent food, warm service, and a beautiful setup every time we visit. ${BRAND_WORDMARK} is now our family’s first choice for celebrations.`,
      author: "Neema S.",
      venture: "Flames Restaurant",
      rating: 5,
    },
    {
      quote:
        "From booking to dessert, everything felt smooth and premium. The team made our anniversary dinner genuinely memorable.",
      author: "Ahmed & Mariam",
      venture: "Flames Restaurant",
      rating: 5,
    },
    {
      quote:
        "Our go-to for coffee meetings and weekend brunch. Pastries are consistently fresh and the space feels polished without being stiff.",
      author: "Grace M.",
      venture: "Treats Cafe & Bakery",
      rating: 5,
    },
    {
      quote:
        "The rooftop at sunset was unforgettable. Curries packed with flavor and service that made us feel like regulars on our first visit.",
      author: "James & Priya",
      venture: "The Silk Route Restaurant",
      rating: 5,
    },
    {
      quote:
        "Quiet beach, thoughtful hosts, and breakfasts we still talk about. Exactly the reset we needed after a busy week in the city.",
      author: "Elena R.",
      venture: "Aquelia Rose Hotel",
      rating: 5,
    },
    {
      quote:
        "Loved the ambiance, portion sizes, and attention to detail. You can feel the consistency in quality across every visit.",
      author: "Brian K.",
      venture: "The Silk Route Restaurant",
      rating: 5,
    },
  ],
  contact: {
    hq: "Dar es Salaam, Tanzania",
    hqFull: "Plot 45, Mikocheni B, Dar es Salaam, Tanzania",
    phone: "+255 775 111 122",
    email: "hello@flamezanzi.com",
    whatsapp: "+255 775 111 122",
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
    hours: "12:00 to 23:00",
    contact: {
      phone: "+255 775 111 122",
      email: "hello@flamezanzi.com",
      whatsapp: "+255 775 111 122",
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
    tagline: "Flames Bakery: artisanal coffee and crafted pastries.",
    shortDescription:
      "Flames Bakery (also known as Treats) is a stylish cafe at Sea Cliff Village, Dar es Salaam, serving bakery classics, specialty coffee, and light dining. Street address and map pin will be confirmed with operations.",
    fullDescription:
      "Treats Cafe & Bakery welcomes guests into an approachable yet polished environment for meetings, relaxed brunches, and daily coffee rituals, supported by disciplined quality control behind the pastry counter and espresso bar. Full address, latitude/longitude, and official opening hours will be published once confirmed.",
    type: "cafe",
    country: "Tanzania",
    city: "Dar es Salaam",
    area: "Sea Cliff Village",
    coordinates: { lat: -6.7385, lng: 39.2622 },
    cuisine: ["Cafe", "Bakery", "Breakfast"],
    features: ["Takeaway", "Coffee Bar", "Dessert Counter"],
    hours: "07:00-22:00",
    contact: {
      phone: "+255 775 111 122",
      email: "hello@flamezanzi.com",
      whatsapp: "+255 775 111 122",
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
    tagline: "Legendary Spice Route flavors above Stone Town.",
    shortDescription:
      "The Silk Route Restaurant in Stone Town, Zanzibar, offers a fusion menu inspired by the legendary trade network that connected Asia, the Middle East, and the Mediterranean. Guests enjoy aromatic curries, sizzling kebabs, and diverse Indian spices, all served with breathtaking rooftop views over the historic town.",
    fullDescription:
      "Nestled in the heart of Stone Town, The Silk Route Restaurant celebrates the rich culinary heritage of the ancient Silk Road. Our menu blends Indian, Asian, and Mediterranean influences, reflecting centuries of cultural exchange and flavor. From fragrant curries and tandoori kebabs to refreshing seafood and occasional Italian-inspired dishes, every plate is crafted to delight. Guests can savor authentic tastes while overlooking panoramic rooftop views of Zanzibar's old town and the Indian Ocean. With warm hospitality and thoughtful amenities, The Silk Route is more than a restaurant. It's a journey through history and flavor.",
    type: "restaurant",
    country: "Tanzania",
    city: "Zanzibar",
    area: "Stone Town",
    coordinates: { lat: -6.164, lng: 39.1896 },
    cuisine: [
      "Indian (curries, biryanis, tandoori dishes)",
      "Swahili (Authentic)",
      "Occasional Italian dishes (pizzas, pastas)",
      "Rooftop dining experience",
      "Dine-in and group bookings",
    ],
    features: [
      "Rooftop terrace with panoramic views of Stone Town",
      "Lift access for physically challenged guests",
      "Authentic fusion menu inspired by the Silk Road",
      "Warm, attentive service and welcoming atmosphere",
      "Suitable for families, couples, and groups",
      "Central location in historic Stone Town",
    ],
    hours: "11:00 AM to 11:00 PM · daily",
    contact: {
      phone: "+255 674 111 122",
      email: "silkrouteznz@gmail.com",
      whatsapp: "+255 674 111 122",
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
      "Aquelia Rose Hotel is a boutique beachfront property located on the tranquil shores of Jambiani, Zanzibar. With only eight thoughtfully designed rooms, the hotel offers personalized service, stunning sea views, and authentic island experiences.",
    fullDescription:
      "At Aquelia Rose Hotel, we believe that every journey deserves a beautiful beginning. Nestled along the soft sands of Jambiani Beach, our boutique property offers guests an intimate escape where the ocean greets you each morning with breathtaking sunrises. We are more than just a hotel, we are a family of hosts dedicated to creating memorable experiences. From savoring authentic Swahili and continental flavors at our beachfront deck restaurant to exploring the vibrant culture and landscapes of Zanzibar, every moment at Aquelia Rose is designed to connect you with the spirit of the island. Guided by eco-conscious values and a commitment to community, we welcome couples, honeymooners, and solo travelers to share in the warmth of our hospitality. Whether you seek relaxation by the sea, adventure across the island, or simply a safe and welcoming environment to call home, Aquelia Rose Hotel is your boutique retreat in paradise.",
    type: "hotel",
    country: "Tanzania",
    city: "Zanzibar",
    area: "Jambiani",
    coordinates: { lat: -6.3218, lng: 39.5507 },
    cuisine: [
      "Swahili cuisine (local flavors, fresh seafood)",
      "Continental cuisine (international favorites)",
      "Bed & breakfast service (fresh daily breakfast included)",
      "Lunch and dinner at the beachfront restaurant",
      "Excursion planning across Zanzibar and Tanzania",
      "Laundry service (extra cost)",
      "Airport shuttle (extra cost)",
      "Swimming pool set up",
      "Romantic swimming pool breakfast",
    ],
    features: [
      "Eight boutique rooms (4 with stunning sea views, 4 overlooking the garden and pool)",
      "Direct access to Jambiani's white sandy beach",
      "Refreshing swimming pool for relaxation",
      "Deck restaurant serving Swahili and continental cuisine",
      "Beachfront dining with sunrise views",
      "Air-conditioned rooms for comfort",
      "Free Wi-Fi to stay connected",
      "Private bathrooms with complimentary toiletries",
      "In-room safe boxes for peace of mind",
      "Eco-conscious and community-supported hospitality",
      "Safe, welcoming environment for all guests",
      "Space for yoga sessions to rejuvenate body and mind",
    ],
    hours: "Hotel 24/7 · Restaurant 8:00 AM to 9:00 PM · daily",
    contact: {
      phone: "+255 678 111 122",
      email: "aqueliaroseznz@gmail.com",
      whatsapp: "+255 678 111 122",
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
      hero: aqueliaOpt("HNK08486.webp"),
      gallery: [
        aqueliaOpt("HNK08486.webp"),
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

export type SignatureDish = {
  /** Must match a `MenuItem.name` in `menus` so the cart references the same row. */
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  tags?: string[];
};

export type FlamesTestimonial = {
  author: string;
  location: string;
  rating: number;
  quote: string;
  date: string;
  source?: string;
};

export type EventHall = {
  slug: string;
  name: string;
  capacity: string;
  description: string;
  features: string[];
  occasions: string[];
  image: string;
  badge?: string;
};

/**
 * Flames Restaurant rich content (storytelling, signature dishes, halls, testimonials, etc.).
 * Kept here so the page is fully data-driven and stays editable without touching JSX.
 */
export const flamesContent = {
  /** SEO-friendly keyword cluster for the metadata + JSON-LD. */
  seoKeywords: [
    "Dar es Salaam fine dining",
    "Masaki seafood restaurant",
    "Flames Restaurant Dar es Salaam",
    "best restaurant in Masaki",
    "private event venue Dar es Salaam",
    "wedding venue Dar es Salaam",
    "rooftop dining Tanzania",
  ],
  shortMetaDescription:
    "Flames Restaurant: refined fine dining in Masaki, Dar es Salaam. Premium seafood, wood-fired grills, private event halls for weddings, birthdays, and corporate occasions.",
  /** Hero collage layered above the existing hero image (food / ambiance / staff). */
  heroCollage: [
    {
      src: "/images/optimized/flames/HNK08116(1).webp",
      label: "Ambiance",
    },
    {
      src: "/images/optimized/flames/HNK08008.webp",
      label: "Food",
    },
    {
      src: "/images/optimized/flames/HNK08025.webp",
      label: "Hospitality",
    },
    {
      src: "/images/optimized/flames/HNK08099.webp",
      label: "Atmosphere",
    },
  ],
  /** Storytelling: origins, chef philosophy, guest experience. */
  story: {
    eyebrow: "Our story",
    title: `A Masaki flagship born from ${BRAND_WORDMARK}’s Dar es Salaam roots`,
    imageStrip: [
      {
        src: "/images/optimized/flames/HNK08021.webp",
        alt: "Flames Restaurant: plated fine dining",
      },
      {
        src: "/images/optimized/flames/HNK07991-Pano.webp",
        alt: "Flames Restaurant: dining room and ambiance",
      },
      {
        src: "/images/optimized/flames/HNK08025.webp",
        alt: "Flames Restaurant: hospitality and service",
      },
    ],
    paragraphs: [
      `${BRAND_WORDMARK} Restaurant Limited grew from a simple belief: hospitality should feel both world-class and unmistakably East African. Since the group’s founding in Dar es Salaam, that idea has travelled across bakeries, rooftops in Stone Town, and beachfront escapes in Zanzibar, but Masaki remains where our fine-dining heart beats loudest.`,
      "When Flames Restaurant opened in 2015, we wanted a room worthy of milestones: boardroom-caliber lunches that still feel warm, Sundays that linger into dessert, and wedding receptions where every plate earns its place at the head table.",
      "Behind the menu is a chef-led philosophy grounded in restraint and heat in equal measure. Wood fire, charcoal, and disciplined technique frame Tanzanian seafood, regional spice, and produce from suppliers we trust by name, because fine dining, for us, is never decoration without substance.",
      "What guests carry home isn’t only flavor. It is the arc of an evening: lighting that flatters without fuss, pacing that listens to your table, and a team coached to elevate anniversaries, family reunions, and corporate hosts with the same steady attention.",
    ],
    pillars: [
      {
        title: "Chef-led kitchen",
        description:
          "Classical finesse paired with coastal East African swagger: menus that evolve with seasons, not slogans.",
      },
      {
        title: "Flavors with provenance",
        description:
          "Seafood landed with care, spice blends built in-house, and vegetables chosen for character, not color alone.",
      },
      {
        title: "Hospitality you feel",
        description:
          "From an intimate booth to a ballroom celebration, service that anticipates without hovering.",
      },
    ],
  },
  /** Signature dishes: interactive menu preview at the top of the page. */
  signatureDishes: [
    {
      name: "Spiced Lobster Tail",
      description: "Saffron rice, lemon herb butter, charcoal-kissed finish.",
      price: 82_000,
      image:
        "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?auto=format&fit=crop&w=1200&q=80",
      badge: "Chef's pick",
      tags: ["seafood", "signature"],
    },
    {
      name: "Flame House Steak",
      description: "300g cut, peppercorn jus, seasonal greens.",
      price: 68_000,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
      badge: "Most ordered",
      tags: ["grill", "premium"],
    },
    {
      name: "Charred Prawns",
      description: "Garlic butter, citrus glaze, herb crumbs.",
      price: 26_500,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80",
      tags: ["seafood", "starter"],
    },
    {
      name: "Herb-Crusted Lamb Rack",
      description: "Rosemary jus, fondant potato, seasonal vegetables.",
      price: 72_000,
      image:
        "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=1200&q=80",
      tags: ["grill", "signature"],
    },
    {
      name: "Hyderabadi Chicken Biryani",
      description: "Basmati, saffron, fried onion, raita on the side.",
      price: 34_000,
      image:
        "https://images.unsplash.com/photo-1633945274405-b6c8a5b78127?auto=format&fit=crop&w=1200&q=80",
      tags: ["indian", "biryani"],
    },
    {
      name: "Paneer Butter Masala",
      description: "Soft paneer in tomato-butter gravy, fenugreek, cream.",
      price: 28_500,
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80",
      tags: ["indian", "vegetarian"],
    },
  ] as SignatureDish[],
  /** Two private event halls available for weddings, birthdays, etc. */
  eventHalls: [
    {
      slug: "grand-hall",
      name: "The Grand Hall",
      capacity: "Up to 200 guests · Banquet style",
      description:
        "Our largest private hall, the home of weddings, large corporate galas, and milestone birthdays. A grand setting with custom lighting, a dedicated stage area, and full plated service.",
      features: [
        "Fully air-conditioned",
        "Stage & sound setup",
        "Custom mood lighting",
        "Bridal / VIP green room",
        "Plated and buffet menus",
        "Dedicated event manager",
      ],
      occasions: ["Weddings", "Corporate Galas", "Milestone Birthdays", "Engagement Ceremonies"],
      image: "/images/optimized/flames/HNK07991-Pano.webp",
      badge: "Up to 200 guests",
    },
    {
      slug: "intimate-hall",
      name: "The Intimate Hall",
      capacity: "Up to 60 guests · Private dining",
      description:
        "A more intimate private space for milestone dinners, baby showers, family gatherings, and executive functions. Curated menus and personalized service in a refined fine-dining setting.",
      features: [
        "Private entrance",
        "Customised plated menus",
        "Wine pairing on request",
        "AV-ready for presentations",
        "Florist & decor partnerships",
        "Birthday cake setup included",
      ],
      occasions: [
        "Birthdays",
        "Anniversaries",
        "Bridal Showers",
        "Baby Showers",
        "Corporate Dinners",
      ],
      image: "/images/optimized/flames/HNK08099.webp",
      badge: "Up to 60 guests",
    },
  ] as EventHall[],
  /** Verified guest reviews displayed with star ratings. Update with real reviews as they come in. */
  testimonials: [
    {
      author: "Amani Mushi",
      location: "Dar es Salaam",
      rating: 5,
      quote:
        "The lobster tail was the best I've had in Dar es Salaam. Service was world-class, felt like fine dining at its peak.",
      date: "March 2026",
      source: "Google Review",
    },
    {
      author: "Priya & Ravi Shah",
      location: "Wedding · Grand Hall",
      rating: 5,
      quote:
        "We hosted our wedding reception in the Grand Hall: 180 guests, three menus, zero stress. The Flames team is the reason our day was perfect.",
      date: "February 2026",
      source: "Direct guest review",
    },
    {
      author: "Daniel O.",
      location: "Masaki",
      rating: 5,
      quote:
        "Our go-to date night in Masaki. The steak is consistent, the wine list is solid, and the staff make every visit feel like a celebration.",
      date: "January 2026",
      source: "TripAdvisor",
    },
    {
      author: "Sarah Mwakatobe",
      location: "Birthday · Intimate Hall",
      rating: 5,
      quote:
        "Booked the Intimate Hall for my mother's 60th. Custom menu, beautiful decor, and the team handled every detail. Highly recommend.",
      date: "December 2025",
      source: "Direct guest review",
    },
  ] as FlamesTestimonial[],
  /** Quick info chips shown under the hero. */
  quickFacts: [
    { label: "Fine dining", value: "Since 2015" },
    { label: "Cuisine", value: "Grill · Seafood · International" },
    { label: "Private halls", value: "2 event spaces" },
    { label: "Reservations", value: "Walk-ins welcome" },
  ],
};

export type VentureStoryBlock = typeof flamesContent.story;

/** Rich narrative + pillars for non-Flames venture pages (same layout as `FlamesStorySection`). */
export const ventureStories = {
  "treats-cafe": {
    eyebrow: "Our story",
    title: "Sea Cliff Village's daily ritual for coffee, pastries, and light dining",
    imageStrip: [
      {
        src: treatsCafeUnsplash.interior,
        alt: "Treats Cafe & Bakery: bright cafe interior",
      },
      {
        src: treatsCafeUnsplash.coffee,
        alt: "Treats Cafe & Bakery: specialty coffee",
      },
      {
        src: treatsCafeUnsplash.pastry,
        alt: "Treats Cafe & Bakery: pastries and desserts",
      },
    ],
    paragraphs: [
      "Treats Cafe & Bakery (also known as Flames Bakery) is where the group's pastry discipline meets a relaxed Sea Cliff Village room. We built it for weekday meetings that deserve better than a paper cup, weekend brunches that do not rush the second coffee, and takeaway moments that still feel considered.",
      "Behind the counter is the same quality bar as our fine-dining kitchens: calibrated espresso, viennoiserie that earns its butter, and a team trained to keep the line moving without making anyone feel hurried.",
      "Whether you are grabbing a box for the office or settling in with friends, Treats is proof that hospitality can be warm, polished, and everyday all at once.",
    ],
    pillars: [
      {
        title: "Bakery-first mindset",
        description:
          "Croissants, tarts, and celebration cakes made with consistent recipes and daily freshness checks.",
      },
      {
        title: "Coffee with intent",
        description:
          "Espresso and filter drinks dialed for East African palates, served by baristas who know regulars by order.",
      },
      {
        title: "A room for every rhythm",
        description:
          "Quiet corners for laptop sessions, communal tables for catch-ups, and a takeaway counter when you are on the move.",
      },
    ],
  },
  "silk-route": {
    eyebrow: "Our story",
    title: "Stone Town rooftop dining along the spice routes",
    imageStrip: [
      {
        src: "/images/optimized/silk-route/HNK08758.webp",
        alt: "The Silk Route Restaurant: rooftop dining",
      },
      {
        src: "/images/optimized/silk-route/HNK08613.webp",
        alt: "The Silk Route Restaurant: curries and tandoor",
      },
      {
        src: "/images/optimized/silk-route/HNK08615.webp",
        alt: "The Silk Route Restaurant: ambiance",
      },
    ],
    paragraphs: [
      "The Silk Route Restaurant sits above Stone Town's limestone lanes, where centuries of trade left behind a vocabulary of spice, smoke, and shared tables. Our menu follows that map: Indian curries and tandoor dishes, Swahili coastal notes, and the occasional Italian plate when the moment calls for it.",
      "Sunset service on the rooftop is the heart of the experience: warm light over the old town, the ocean on the horizon, and a team that paces each course so you can linger without watching the clock.",
      "We designed the venue for travelers discovering Zanzibar for the first time, families marking milestones, and locals who want a special night out with honest flavor and lift access for every guest.",
    ],
    pillars: [
      {
        title: "Fusion with a point of view",
        description:
          "Menus shaped by the historic Silk Road, not random mashups: curries, kebabs, and coastal seafood with clear provenance.",
      },
      {
        title: "Rooftop as a stage",
        description:
          "Panoramic views of Stone Town and the Indian Ocean, with seating that works for couples, groups, and celebrations.",
      },
      {
        title: "Hospitality for every guest",
        description:
          "Lift access, attentive servers, and a welcoming tone for first-time visitors and returning regulars alike.",
      },
    ],
  },
  "aquelia-rose": {
    eyebrow: "Our story",
    title: "Eight rooms, one quiet stretch of Jambiani beach",
    imageStrip: [
      {
        src: aqueliaOpt("HNK08486.webp"),
        alt: "Aquelia Rose Hotel: beachfront exterior",
      },
      {
        src: aqueliaOpt("HNK08340.webp"),
        alt: "Aquelia Rose Hotel: pool and gardens",
      },
      {
        src: aqueliaOpt("HNK08342.webp"),
        alt: "Aquelia Rose Hotel: guest experience",
      },
    ],
    paragraphs: [
      "Aquelia Rose Hotel is our boutique answer to Zanzibar's slower east coast: eight rooms, personalized hosting, and mornings that start with sunrise over Jambiani's reef.",
      "We pair Swahili and continental cooking at the deck restaurant, plan excursions when you want movement, and protect quiet when you need stillness. Eco-conscious choices and community ties guide how we operate, from housekeeping rhythms to how we source seafood.",
      "Whether you are honeymooning, recovering from a busy Dar week, or exploring the island at your own pace, Aquelia Rose is built to feel like a small family-run retreat with the standards of a curated portfolio.",
    ],
    pillars: [
      {
        title: "Intimate scale",
        description:
          "Eight thoughtfully designed rooms, four facing the sea and four overlooking the garden and pool, so service stays personal.",
      },
      {
        title: "Beachfront living",
        description:
          "Direct access to white sand, a refreshing pool, and deck dining with sunrise views over the Indian Ocean.",
      },
      {
        title: "Island-ready hosting",
        description:
          "Breakfast included, excursion planning, airport shuttles on request, and a calm environment for couples and solo travelers.",
      },
    ],
  },
} as const satisfies Record<string, VentureStoryBlock>;

export type VentureRichSlug = keyof typeof ventureStories;

export const ventureQuickFacts: Record<VentureRichSlug, { label: string; value: string }[]> = {
  "treats-cafe": [
    { label: "Concept", value: "Cafe & bakery" },
    { label: "Best for", value: "Brunch · meetings · takeaway" },
    { label: "Location", value: "Sea Cliff Village, Dar es Salaam" },
    { label: "Hours", value: "07:00 to 22:00" },
  ],
  "silk-route": [
    { label: "Dining style", value: "Rooftop fusion restaurant" },
    { label: "Cuisine focus", value: "Indian · Swahili · Mediterranean touches" },
    { label: "Location", value: "Stone Town, Zanzibar" },
    { label: "Hours", value: "11:00 AM to 11:00 PM · daily" },
  ],
  "aquelia-rose": [
    { label: "Rooms", value: "8 boutique rooms" },
    { label: "Dining", value: "Deck restaurant · B&B included" },
    { label: "Location", value: "Jambiani Beach, Zanzibar" },
    { label: "House rhythm", value: "Check-in 14:00 · Check-out 11:00" },
  ],
};

export const ventureDetailTestimonials: Record<VentureRichSlug, FlamesTestimonial[]> = {
  "treats-cafe": [
    {
      author: "Grace M.",
      location: "Dar es Salaam",
      rating: 5,
      quote:
        "Our go-to for coffee meetings and weekend brunch. Pastries are consistently fresh and the space feels polished without being stiff.",
      date: "Recent guest",
      source: "Portfolio highlight",
    },
    {
      author: "Lilian A.",
      location: "Sea Cliff Village",
      rating: 5,
      quote:
        "The croissants rival anything I have had abroad. Staff remember my order after two visits.",
      date: "March 2026",
      source: "Google Review",
    },
    {
      author: "Tom & Sarah",
      location: "Dar es Salaam",
      rating: 5,
      quote:
        "Ordered a custom cake for a launch party. Looked stunning and the whole team raved about the flavor.",
      date: "February 2026",
      source: "Direct guest review",
    },
    {
      author: "David K.",
      location: "Masaki",
      rating: 5,
      quote:
        "Espresso is dialed in every time. Treats is my default when I need a professional backdrop for client coffees.",
      date: "January 2026",
      source: "TripAdvisor",
    },
  ],
  "silk-route": [
    {
      author: "James & Priya",
      location: "Stone Town",
      rating: 5,
      quote:
        "The rooftop at sunset was unforgettable. Curries packed with flavor and service that made us feel like regulars on our first visit.",
      date: "Recent guest",
      source: "Portfolio highlight",
    },
    {
      author: "Brian K.",
      location: "Zanzibar",
      rating: 5,
      quote:
        "Loved the ambiance, portion sizes, and attention to detail. You can feel the consistency in quality across every visit.",
      date: "March 2026",
      source: "Google Review",
    },
    {
      author: "Hannah R.",
      location: "London",
      rating: 5,
      quote:
        "Best meal of our island week. Tandoor dishes were smoky and tender, and the breeze on the roof was perfect.",
      date: "February 2026",
      source: "TripAdvisor",
    },
    {
      author: "Omar F.",
      location: "Dar es Salaam",
      rating: 5,
      quote:
        "Hosted colleagues after a conference in Stone Town. Kitchen paced the courses beautifully and the view sold itself.",
      date: "January 2026",
      source: "Direct guest review",
    },
  ],
  "aquelia-rose": [
    {
      author: "Elena R.",
      location: "Zanzibar",
      rating: 5,
      quote:
        "Quiet beach, thoughtful hosts, and breakfasts we still talk about. Exactly the reset we needed after a busy week in the city.",
      date: "Recent guest",
      source: "Portfolio highlight",
    },
    {
      author: "Marcus & Julie",
      location: "Germany",
      rating: 5,
      quote:
        "Small hotel done right. Pool, beach access, and staff who genuinely care if you slept well.",
      date: "March 2026",
      source: "Booking.com",
    },
    {
      author: "Amira T.",
      location: "Nairobi",
      rating: 5,
      quote:
        "We extended our stay twice. Rooms are spotless, air conditioning works great, and dinners on the deck were a highlight.",
      date: "February 2026",
      source: "Google Review",
    },
    {
      author: "Chris P.",
      location: "USA",
      rating: 5,
      quote:
        "Excursion planning was seamless and never pushy. Felt like staying with friends who happen to run a beautiful property.",
      date: "January 2026",
      source: "TripAdvisor",
    },
  ],
};

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
        description: "Curries, paneer, and house breads (illustrative menu, mock).",
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
            description: "Black tea, cardamom, ginger, milk, street-style (mock)",
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
