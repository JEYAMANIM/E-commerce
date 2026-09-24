/**
 * Curated high-resolution Unsplash CDN images.
 * Every URL is a direct CDN asset that requires no API key and does not expire.
 *
 * Priority: ID-based exact match → keyword category → general fallback.
 */

/**
 * Verified product-specific images keyed by product ID.
 * These are hand-curated to match each product's actual description.
 */
const PRODUCT_ID_IMAGES: Record<string, string> = {
  // --- Lab & Medical ---
  'pl-flag-01': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80', // Compound microscope
  'pl-flag-02': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80', // Pulse oximeter / medical device

  // --- Electronics ---
  'pl-flag-03': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80', // OLED monitor
  'pl-item-008': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80', // Action camera
  'pl-item-010': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80', // Wireless mouse
  'pl-item-015': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80', // 4K Smart TV
  'pl-item-022': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80', // Magnetic power bank
  'pl-item-026': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80', // Acoustic foam panels
  'pl-item-029': 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80', // USB studio microphone
  'pl-item-031': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80', // Bluetooth speaker
  'pl-item-034': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', // Wireless gaming earbuds
  'pl-item-036': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', // GaN USB-C wall charger
  'pl-item-063': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80', // RGB LED light strip
  'pl-item-064': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80', // Thin laptop computer
  'pl-item-073': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80', // RGB gaming mousepad
  'pl-item-078': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80', // Wearable neck fan

  // --- Sports & Fitness ---
  'pl-flag-04': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', // Titanium smartwatch
  'pl-item-016': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80', // EVA foam roller / yoga
  'pl-item-017': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80', // Carbon fiber trekking poles
  'pl-item-018': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', // Mesh athletic running shoes
  'pl-item-028': 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80', // Waterproof hiking boots
  'pl-item-037': 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&auto=format&fit=crop&q=80', // Microfiber beach towel
  'pl-item-046': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80', // UV400 sport sunglasses
  'pl-item-048': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80', // Adjustable dumbbell
  'pl-item-052': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80', // Insulated water bottle
  'pl-item-055': 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=80', // Resistance bands
  'pl-item-059': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80', // Yoga mat
  'pl-item-060': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', // Ankle & wrist weights
  'pl-item-061': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80', // PVC waterproof dry bag
  'pl-item-067': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80', // GPS sports smartwatch
  'pl-item-075': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80', // Pop-up camping dome tent

  // --- Fashion & Apparel ---
  'pl-item-001': 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80', // Woven straw sun hat
  'pl-item-003': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80', // Packable windbreaker jacket
  'pl-item-006': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80', // Cashmere winter scarf
  'pl-item-021': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', // Leather laptop backpack
  'pl-item-023': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80', // Slim RFID leather wallet
  'pl-item-033': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80', // Linen button-down shirt
  'pl-item-038': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80', // Fleece pullover hoodie
  'pl-item-043': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80', // Leather crossbody handbag
  'pl-item-051': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80', // Canvas vulcanized sneakers
  'pl-item-054': 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80', // Anti-theft travel backpack
  'pl-item-057': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80', // Vintage denim jean jacket
  'pl-item-062': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80', // Gym compression leggings
  'pl-item-069': 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&auto=format&fit=crop&q=80', // Thermal base layer

  // --- Beauty & Skincare ---
  'pl-item-000': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', // Ionic salon hair dryer
  'pl-item-011': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80', // Vitamin C brightening serum
  'pl-item-020': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80', // Velvet liquid lipstick kit
  'pl-item-040': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80', // Coffee body scrub
  'pl-item-042': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80', // Dead Sea mud facial mask
  'pl-item-044': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80', // Argan oil hair mask
  'pl-item-053': 'https://images.unsplash.com/photo-1608248597359-21669485b0d0?w=800&auto=format&fit=crop&q=80', // Ceramides facial moisturizer
  'pl-item-079': 'https://images.unsplash.com/photo-1559591937-e10c5980a30b?w=800&auto=format&fit=crop&q=80', // Sonic electric toothbrush

  // --- Home & Kitchen ---
  'pl-item-002': 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80', // Brass nautical telescope
  'pl-item-005': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', // Industrial pendant light
  'pl-item-007': 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=80', // Telescoping feather duster
  'pl-item-012': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80', // Electric wine opener / wine
  'pl-item-013': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80', // Ceramic essential oil diffuser
  'pl-item-014': 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80', // Handheld milk frother / coffee
  'pl-item-019': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', // Brass pedestal table lamp
  'pl-item-025': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', // Pump espresso machine
  'pl-item-027': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80', // Brushed gold bathroom faucet
  'pl-item-030': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80', // Robot vacuum & mop
  'pl-item-032': 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80', // Industrial wall sconce
  'pl-item-039': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80', // Memory foam footrest
  'pl-item-041': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80', // Heated electric blanket
  'pl-item-049': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80', // Digital kitchen scale
  'pl-item-058': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80', // Geometric ceramic flower vase
  'pl-item-065': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80', // Lavender soy wax candle
  'pl-item-066': 'https://images.unsplash.com/photo-1584100926523-6a6fa4b8981a?w=800&auto=format&fit=crop&q=80', // Velvet decorative throw pillow
  'pl-item-068': 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80', // Cast iron skillet pan
  'pl-item-070': 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&auto=format&fit=crop&q=80', // Insulated stainless food thermos
  'pl-item-072': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80', // Non-stick granite ceramic pan
  'pl-item-077': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80', // Smart HEPA air purifier

  // --- Office & Tech ---
  'pl-item-004': 'https://images.unsplash.com/photo-1616353071588-708dcff912e2?w=800&auto=format&fit=crop&q=80', // Eco leather desk mat
  'pl-item-024': 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&auto=format&fit=crop&q=80', // Architect LED clamp desk lamp
  'pl-item-045': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', // Dotted grid bullet journal
  'pl-item-047': 'https://images.unsplash.com/photo-1585336261026-7f093f4122d4?w=800&auto=format&fit=crop&q=80', // Fine point 0.5mm gel pens
  'pl-item-074': 'https://images.unsplash.com/photo-1580481077195-c990264169c8?w=800&auto=format&fit=crop&q=80', // Ergonomic mesh office chair
  'pl-item-076': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80', // Metal mesh desk file tray

  // --- Auto & Hardware ---
  'pl-item-035': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80', // Cordless air compressor / tire inflator
  'pl-item-050': 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800&auto=format&fit=crop&q=80', // Home repair tool kit

  // --- Toys & Hobbies ---
  'pl-item-009': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80', // Solid wood building blocks
  'pl-item-056': 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&auto=format&fit=crop&q=80', // Landscape jigsaw puzzle
  'pl-item-071': 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80', // Strategy board game
};

// Stable Unsplash CDN images grouped by retail product categories (fallback)
const CATEGORY_IMAGES: Record<string, string[]> = {
  heart: [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=80',
  ],
  candle: [
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1572726729437-3732efed1144?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
  ],
  mug: [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80',
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
  ],
  bag: [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80',
  ],
  box: [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=80',
  ],
  christmas: [
    'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=600&auto=format&fit=crop&q=80',
  ],
  frame: [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=600&auto=format&fit=crop&q=80',
  ],
  clock: [
    'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&auto=format&fit=crop&q=80',
  ],
  textile: [
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80',
  ],
  flower: [
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
  ],
  party: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
  ],
  stationery: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80',
  ],
  bird: [
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
  ],
  glass: [
    'https://images.unsplash.com/photo-1577741314755-048d8525d31e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80',
  ],
  general: [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80',
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
 * First checks the verified ID-based map, then falls back to keyword category matching.
 */
export function getProductImage(description: string, stockCode: string): string {
  const sc = stockCode || 'item';

  // 1. Try verified product ID map first (exact match)
  if (sc in PRODUCT_ID_IMAGES) {
    return PRODUCT_ID_IMAGES[sc];
  }

  // 2. Fall back to keyword-based category matching
  const desc = (description || '').toLowerCase();
  const hash = hashString(sc);

  for (const { regex, key } of KEYWORD_RULES) {
    if (regex.test(desc)) {
      const images = CATEGORY_IMAGES[key];
      return images[hash % images.length];
    }
  }

  // 3. Fallback to general home decor collection
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
