/**
 * Unsplash: https://unsplash.com/license (free use).
 * Placeholder cafe / coffee / bakery mood for Treats until venue shots are used.
 */
export const treatsCafeUnsplash = {
  interior:
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1920&q=80",
  coffee:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1600&q=80",
  pastry:
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1600&q=80",
} as const;

export const treatsCafeGallery: string[] = [
  treatsCafeUnsplash.interior,
  treatsCafeUnsplash.coffee,
  treatsCafeUnsplash.pastry,
];

/** Square-cropped professional portraits (Unsplash): illustrative placeholders, not the real quoted people. */
export const testimonialPlaceholderAvatars = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=384&h=384&q=82",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=384&h=384&q=82",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=384&h=384&q=82",
] as const;
