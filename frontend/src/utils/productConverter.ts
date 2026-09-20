import { Product, ProductReview } from '../types';
import { getProductImage } from './productImages';

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      if (word.length === 0) return '';
      // Keep abbreviations uppercase if recognized
      if (['t-light', 'uk', 'usa', 'diy', 'led'].includes(word)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const CATEGORY_MAP: Array<{ regex: RegExp; name: string }> = [
  { regex: /candle|lantern|t-light|tealight|candlestick|light/i, name: 'Candles & Lighting' },
  { regex: /heart|love|cupid|frame|mirror|clock|wall|hanging|plaque|sign/i, name: 'Home Décor' },
  { regex: /mug|cup|coffee|tea|baking|cake|kitchen|tin|spoon|plate|bowl/i, name: 'Kitchen & Dining' },
  { regex: /bag|tote|shopper|purse|wallet|pouch/i, name: 'Bags & Accessories' },
  { regex: /box|basket|crate|chest|storage|drawer|nesting/i, name: 'Storage & Organization' },
  { regex: /bunting|garland|banner|flag|party|celebration|balloon/i, name: 'Party & Celebrations' },
  { regex: /christmas|xmas|santa|noel|advent|reindeer|snow/i, name: 'Seasonal & Christmas' },
  { regex: /flower|floral|rose|lavender|garden|plant|pot|vase/i, name: 'Garden & Outdoors' },
  { regex: /notebook|journal|pencil|pen|sticker|label|stationery|card/i, name: 'Stationery & Craft' },
  { regex: /knitted|wool|hottie|water bottle|cushion|pillow|blanket/i, name: 'Textiles & Comfort' },
];

function deriveCategory(description: string): string {
  for (const item of CATEGORY_MAP) {
    if (item.regex.test(description)) {
      return item.name;
    }
  }
  return 'Home Décor';
}

function extractTags(description: string): string[] {
  const commonWords = new Set([
    'of', 'and', 'the', 'in', 'on', 'with', 'for', 'set', 'a', 'an', 'pack', 'small', 'large', 'medium', 'assorted',
  ]);
  const words = description
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !commonWords.has(w));

  const tags = Array.from(new Set(words)).slice(0, 4);
  if (!tags.includes('vintage')) tags.push('vintage');
  return tags;
}

export function convertBackendProduct(raw: { stock_code: string; description: string }): Product {
  const stockCode = raw.stock_code.trim();
  const rawDesc = raw.description.trim() || `Product ${stockCode}`;
  const title = toTitleCase(rawDesc);
  const hash = hashString(stockCode);

  // Price range: £4.99 to £49.99
  const baseCents = 499 + (hash % 4500);
  const price = Math.round(baseCents) / 100;
  const originalPrice = Math.round((price * 1.3) * 100) / 100;

  // Rating: 4.2 to 5.0
  const rating = 4.2 + (hash % 9) / 10;
  const reviewCount = 15 + (hash % 340);

  const category = deriveCategory(rawDesc);
  const tags = extractTags(rawDesc);
  const image = getProductImage(rawDesc, stockCode);

  const isBestSeller = (hash % 7) === 0;
  const isPathiChoice = (hash % 9) === 1;
  const isLimitedDeal = (hash % 6) === 2;
  const hasCoupon = (hash % 4) === 0;
  const couponPercent = hasCoupon ? ((hash % 3) + 1) * 5 : undefined;

  const sampleReviews: ProductReview[] = [
    {
      id: `rev-1-${stockCode}`,
      author: 'Eleanor Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      date: 'Sep 14, 2026',
      title: 'Stunning quality, looks even better in person',
      comment: `The finish and craftsmanship of this ${title.toLowerCase()} are exceptional. Beautiful addition to our home decor.`,
      verified: true,
    },
    {
      id: `rev-2-${stockCode}`,
      author: 'Arthur Pendelton',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      rating: 4,
      date: 'Aug 29, 2026',
      title: 'Fast shipping and well packaged',
      comment: 'Very pleased with this purchase. Arrived within two days and matches the description perfectly.',
      verified: true,
    },
  ];

  return {
    id: stockCode,
    stockCode,
    title,
    category,
    price,
    originalPrice,
    rating: Math.min(5.0, Number(rating.toFixed(1))),
    reviewCount,
    image,
    inStock: true,
    stockCount: 12 + (hash % 85),
    isBestSeller,
    isPathiChoice,
    isLimitedDeal,
    hasPrime: true,
    hasCoupon,
    couponPercent,
    tags,
    description: `Original British retail giftware: ${title}. Beautifully constructed with attention to vintage aesthetics and timeless charm. Ideal for home accent styling, seasonal gifting, and collectors.`,
    features: [
      'Authentic vintage-inspired British giftware design',
      'High-grade durable craftsmanship and premium finish',
      'Versatile aesthetic suitable for modern and rustic decors',
      'Backed by 30-day hassle-free money back guarantee',
    ],
    specs: {
      'Catalogue Code': stockCode,
      'Product Type': category,
      'Material': (hash % 2 === 0) ? 'Hand-finished Metal & Glass' : 'Natural Ceramic & Wood',
      'Country of Origin': 'United Kingdom',
      'Care Instructions': 'Wipe clean with a soft dry cloth',
    },
    reviews: sampleReviews,
  };
}
