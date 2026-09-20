/**
 * Curated high-resolution Unsplash CDN images mapped by keyword patterns.
 * Every URL is a direct CDN asset that requires no API key and does not expire.
 * A deterministic hash on stockCode ensures the same item always gets the same image,
 * while items in the same category get diverse, visually rich photos.
 */

// Stable Unsplash CDN images grouped by retail product categories
const CATEGORY_IMAGES: Record<string, string[]> = {
  heart: [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80', // Hanging heart decor
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80', // Wooden heart
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80', // Love gift
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80', // Heart ornaments
    'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=80', // Valentine craft
  ],
  candle: [
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80', // Scented candle glass
    'https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=600&auto=format&fit=crop&q=80', // Lantern warm light
    'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80', // Candle holder
    'https://images.unsplash.com/photo-1572726729437-3732efed1144?w=600&auto=format&fit=crop&q=80', // T-light cozy
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80', // Glass candle holder
  ],
  mug: [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80', // Ceramic coffee mug
    'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80', // Vintage tea cup
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80', // Artisan mug
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80', // Tea mug with saucer
    'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80', // Colorful cups
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80', // Kitchenware & baking
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80', // Baking utensils
    'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80', // Kitchen storage tins
    'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80', // Vintage spoons cutlery
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80', // Ceramic bowls
  ],
  bag: [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80', // Canvas tote bag
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80', // Shopping bag
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', // Vintage backpack / bag
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80', // Tote shopper
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80', // Fabric purse
  ],
  box: [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80', // Vintage gift box
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80', // Wooden chest / storage
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80', // Decorative tin boxes
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=80', // Storage basket
  ],
  christmas: [
    'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?w=600&auto=format&fit=crop&q=80', // Christmas bauble
    'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80', // Xmas holiday decor
    'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&auto=format&fit=crop&q=80', // Christmas ornaments
    'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=600&auto=format&fit=crop&q=80', // Festive wreath
  ],
  frame: [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80', // Wooden picture frame
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80', // Wall decor frame
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80', // Antique frame
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=600&auto=format&fit=crop&q=80', // Picture frame on wall
  ],
  clock: [
    'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop&q=80', // Vintage alarm clock
    'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&auto=format&fit=crop&q=80', // Wall clock antique
  ],
  textile: [
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80', // Knitted blanket / wool
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80', // Cozy cushion / pillow
    'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=600&auto=format&fit=crop&q=80', // Knitted wool textures
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80', // Throw blanket
  ],
  flower: [
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=80', // Flowers bouquet
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80', // Potted plant / garden
    'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&auto=format&fit=crop&q=80', // Dried lavender
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80', // Rose botanical
  ],
  party: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80', // Party bunting balloons
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80', // Celebration bunting
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80', // Party garland
  ],
  stationery: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', // Vintage notebook journal
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop&q=80', // Notebook and pens
    'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80', // Kraft paper tags craft
  ],
  bird: [
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80', // Bird ornament
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80', // Animal figurine
  ],
  glass: [
    'https://images.unsplash.com/photo-1577741314755-048d8525d31e?w=600&auto=format&fit=crop&q=80', // Glass jar / bottle
    'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80', // Apothecary bottles
  ],
  general: [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80', // Home decor gift
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80', // Lifestyle artisan
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=80', // Cozy living space
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80', // Artisan crafts
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80', // Interior decor
  ],
};

// Keyword matcher: matches product description to category key
const KEYWORD_RULES: Array<{ regex: RegExp; key: string }> = [
  { regex: /heart|love|cupid|valentine/i, key: 'heart' },
  { regex: /lantern|candle|t-light|tealight|candlestick|light|holder/i, key: 'candle' },
  { regex: /mug|cup|coffee|teapot|saucer/i, key: 'mug' },
  { regex: /cake|baking|tin|kitchen|spoon|fork|plate|bowl|cutlery/i, key: 'kitchen' },
  { regex: /bag|shopper|tote|purse|pouch|wallet|cosmetic/i, key: 'bag' },
  { regex: /box|tin|basket|crate|chest|trunk|nesting/i, key: 'box' },
  { regex: /christmas|xmas|santa|noel|advent|reindeer|snow/i, key: 'christmas' },
  { regex: /frame|photo|picture|mirror|plaque|sign|chalkboard/i, key: 'frame' },
  { regex: /clock|alarm|timer/i, key: 'clock' },
  { regex: /knitted|wool|hottie|water bottle|cushion|pillow|blanket|throw/i, key: 'textile' },
  { regex: /flower|floral|rose|lavender|garden|plant|pot|vase/i, key: 'flower' },
  { regex: /bunting|garland|banner|flag|party|celebration/i, key: 'party' },
  { regex: /notebook|journal|pencil|pen|sticker|label|stationery|card/i, key: 'stationery' },
  { regex: /bird|owl|cat|dog|rabbit|duck|figurine|babushka/i, key: 'bird' },
  { regex: /glass|jar|bottle|decanter/i, key: 'glass' },
];

/**
 * Computes a deterministic positive numeric hash from any string (StockCode)
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Returns a high-res, beautifully matched Unsplash product image URL for a given item.
 * Deterministically picks an image from the matching category based on stockCode hash.
 */
export function getProductImage(description: string, stockCode: string): string {
  const desc = (description || '').toLowerCase();
  const sc = stockCode || 'item';
  const hash = hashString(sc);

  for (const { regex, key } of KEYWORD_RULES) {
    if (regex.test(desc)) {
      const images = CATEGORY_IMAGES[key];
      return images[hash % images.length];
    }
  }

  // Fallback to general home decor collection
  const generals = CATEGORY_IMAGES.general;
  return generals[hash % generals.length];
}

/**
 * Fallback image helper for `onError` handlers
 */
export function getFallbackImage(stockCode: string): string {
  const safeSeed = (stockCode || 'product').replace(/[^a-z0-9]/gi, '').toLowerCase();
  return `https://picsum.photos/seed/${safeSeed}/600/600`;
}
