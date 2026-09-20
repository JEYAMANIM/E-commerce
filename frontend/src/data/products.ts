import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "pl-flag-01",
    "title": "Pathi Labs 4K Digital Compound Microscope with AI Cellular Imaging",
    "category": "Lab & Medical",
    "price": 649.99,
    "originalPrice": 899.99,
    "rating": 4.9,
    "reviewCount": 428,
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 14,
    "isBestSeller": true,
    "isPathiChoice": true,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 10,
    "tags": [
      "4k",
      "electronics",
      "medical",
      "display"
    ],
    "description": "Professional grade laboratory trinocular microscope with 4K UHD real-time optical sensor, automated cell morphology tagging, and high-speed USB-C interface.",
    "features": [
      "True 4K UHD sensor with real-time video capture",
      "Magnification from 40X to 2500X with oil immersion lens",
      "Dual LED illumination with continuous rheostat control",
      "Compatible with Windows, Mac, and Linux lab workstations"
    ],
    "specs": {
      "Magnification": "40X - 2500X",
      "Sensor": "Sony 4K IMX Optical Sensor",
      "Illumination": "Adjustable K\u00f6hler Halogen & LED",
      "Connectivity": "USB 3.2 Gen 2, HDMI 2.1"
    }
  },
  {
    "id": "pl-flag-02",
    "title": "Pathi Labs BioPulse Pro Clinical Oximeter & Multi-Vital Continuous Scanner",
    "category": "Lab & Medical",
    "price": 89.5,
    "originalPrice": 129.0,
    "rating": 4.8,
    "reviewCount": 1250,
    "image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 88,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "medical",
      "bluetooth",
      "accessories",
      "health"
    ],
    "description": "Hospital-grade fingertip multi-vital reader measuring SpO2 oxygen saturation, pulse rate index, and vascular stiffness with Bluetooth data sync.",
    "features": [
      "OLED multi-color rotating display",
      "Instant continuous readings with 0.1% margin of error",
      "Audible alarm threshold customizer",
      "Up to 40 hours battery life with rechargeable lithium cell"
    ],
    "specs": {
      "Display": "1.5-inch Dual-Color OLED",
      "Battery": "Rechargeable Li-ion via Type-C",
      "Accuracy": "\u00b11% SpO2 (70-100%)"
    }
  },
  {
    "id": "pl-flag-03",
    "title": "Pathi Vision 32-inch 4K OLED HDR 144Hz Gaming & Pro Creator Monitor",
    "category": "Electronics",
    "price": 799.99,
    "originalPrice": 1099.99,
    "rating": 4.9,
    "reviewCount": 890,
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 22,
    "isBestSeller": true,
    "isPathiChoice": true,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "4k",
      "144hz",
      "oled",
      "display",
      "gaming",
      "electronics"
    ],
    "description": "Stunning 4K quantum OLED panel featuring 0.03ms response time, 144Hz refresh rate, 99.5% DCI-P3 color gamut, and 90W USB-C single cable docking.",
    "features": [
      "Pure blacks and infinite contrast with self-lit OLED pixels",
      "144Hz refresh rate with AMD FreeSync Premium Pro & G-Sync compatible",
      "Built-in KVM switch to control two PCs with one keyboard and mouse"
    ],
    "specs": {
      "Resolution": "3840 x 2160 (4K UHD)",
      "Panel": "Quantum OLED Anti-Glare",
      "Refresh Rate": "144Hz"
    }
  },
  {
    "id": "pl-flag-04",
    "title": "Pathi BioTrack Elite Smartwatch with Medical ECG & Titanium Frame",
    "category": "Sports & Fitness",
    "price": 249.99,
    "originalPrice": 329.99,
    "rating": 4.8,
    "reviewCount": 1890,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 42,
    "isBestSeller": true,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 12,
    "tags": [
      "smartwatch",
      "watch",
      "fitness",
      "waterproof",
      "activewear",
      "bluetooth"
    ],
    "description": "Next-generation biometric smartwatch with aerospace-grade titanium bezel, sapphire crystal screen, ECG heartbeat analysis, and 50m water resistance.",
    "features": [
      "Clinical-grade single lead ECG & optical SpO2 tracking",
      "Continuous body temperature sensor and stress score index",
      "14-day battery life on standard mode with magnetic fast charge"
    ],
    "specs": {
      "Case": "Grade 5 Titanium Bezel with Sapphire Glass",
      "Water Resistance": "5 ATM / 50 meters",
      "Battery": "Up to 14 days normal usage"
    }
  },
  {
    "id": "pl-item-000",
    "title": "Pathi Pro Ionic Salon Hair Dryer with Diffuser & Concentrator Nozzle",
    "category": "Beauty & Skincare",
    "price": 18.99,
    "originalPrice": 24.69,
    "rating": 4.2,
    "reviewCount": 120,
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 8,
    "isBestSeller": true,
    "isPathiChoice": true,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "beauty",
      "hair-care",
      "hair-dryer",
      "ionic",
      "salon-quality",
      "styling",
      "tools"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring eliminate frizz frizz includes frizz fast drying drying salon drying. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for beauty performance with premium materials",
      "Key engineering points: eliminate frizz and frizz includes",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "beauty, hair-care, hair-dryer",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-001",
    "title": "Pathi Summer Woven Straw Sun Hat - Wide Brim UV Protection",
    "category": "Fashion & Apparel",
    "price": 33.99,
    "originalPrice": 44.19,
    "rating": 4.3,
    "reviewCount": 193,
    "image": "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 19,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "accessories",
      "beach",
      "fashion",
      "hat",
      "summer",
      "sun-protection",
      "womenswear"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring sun hat straw beach face neck foldable woven. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for accessories performance with premium materials",
      "Key engineering points: sun and hat",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "accessories, beach, fashion",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-002",
    "title": "Vintage Brass Nautical Telescope with Adjustable Wooden Tripod",
    "category": "Home & Kitchen",
    "price": 32.99,
    "originalPrice": 42.89,
    "rating": 4.4,
    "reviewCount": 266,
    "image": "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 30,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "antique",
      "brass",
      "centerpiece",
      "home-decor",
      "nautical",
      "telescope",
      "vintage"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring tripod telescope brass excellent centerpiece excellent decorative classic. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for antique performance with premium materials",
      "Key engineering points: tripod and telescope",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "antique, brass, centerpiece",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-003",
    "title": "Men's Waterproof Packable Windbreaker Jacket with Taped Seams",
    "category": "Fashion & Apparel",
    "price": 41.99,
    "originalPrice": 54.59,
    "rating": 4.5,
    "reviewCount": 339,
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 41,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "fashion",
      "menswear",
      "outdoor",
      "outerwear",
      "waterproof",
      "windbreaker"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring jacket breathable zippered hand constructed sealed breathable windbreaker breathable mesh. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for fashion performance with premium materials",
      "Key engineering points: jacket and breathable",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "fashion, menswear, outdoor",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-004",
    "title": "Dual-Sided Eco Leather Desk Mat & Large Gaming Mousepad",
    "category": "Office & Tech",
    "price": 42.99,
    "originalPrice": 55.89,
    "rating": 4.6,
    "reviewCount": 412,
    "image": "https://images.unsplash.com/photo-1616353071588-708dcff912e2?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 52,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "desk-accessories",
      "desk-mat",
      "home-office",
      "mousepad",
      "office-supplies",
      "workspace"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring desk leather desk pad leather functions smoothly dual sided. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for desk-accessories performance with premium materials",
      "Key engineering points: desk and leather desk",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "desk-accessories, desk-mat, home-office",
      "Category": "Office & Tech",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-005",
    "title": "Industrial Brass Pendant Ceiling Light Fixture with E26 Base",
    "category": "Home & Kitchen",
    "price": 47.99,
    "originalPrice": 62.39,
    "rating": 4.7,
    "reviewCount": 485,
    "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 63,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "brass",
      "home-decor",
      "interior-design",
      "kitchen",
      "lighting",
      "pendant-light",
      "vintage"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring brass elegance e26 featuring adjustable finish featuring fixture add. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for brass performance with premium materials",
      "Key engineering points: brass and elegance",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "brass, home-decor, interior-design",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-006",
    "title": "100% Pure Mongolian Cashmere Ribbed Winter Scarf",
    "category": "Fashion & Apparel",
    "price": 53.99,
    "originalPrice": 70.19,
    "rating": 4.8,
    "reviewCount": 558,
    "image": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 74,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "accessories",
      "cashmere",
      "luxury",
      "scarf",
      "soft",
      "warm",
      "winter-fashion"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring scarf cashmere ribbed exceptional insulation 100 cashmere exceptional. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for accessories performance with premium materials",
      "Key engineering points: scarf and cashmere",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "accessories, cashmere, luxury",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-007",
    "title": "Microfiber Feather Duster with 100-Inch Telescoping Extension Pole",
    "category": "Home & Kitchen",
    "price": 57.99,
    "originalPrice": 75.39,
    "rating": 4.9,
    "reviewCount": 631,
    "image": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 85,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "cleaning",
      "deep-cleaning",
      "duster",
      "home-care",
      "household",
      "microfiber"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring microfiber extension pole extension fans blinds furniture scratching furniture. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for cleaning performance with premium materials",
      "Key engineering points: microfiber and extension pole",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "cleaning, deep-cleaning, duster",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-008",
    "title": "Ultra 4K Dual-Screen Waterproof Action Camera with EIS Stabilization",
    "category": "Electronics",
    "price": 105.99,
    "originalPrice": 137.79,
    "rating": 4.2,
    "reviewCount": 704,
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 96,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "4k",
      "action-cam",
      "camera",
      "photography",
      "sports",
      "travel",
      "video",
      "waterproof"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring action 4k fi video electronic image electronic footage 4k. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for 4k performance with premium materials",
      "Key engineering points: action and 4k",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "4k, action-cam, camera",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-009",
    "title": "Classic Solid Wood Building Blocks Educational Toy Set (100-Piece)",
    "category": "Toys & Hobbies",
    "price": 67.99,
    "originalPrice": 88.39,
    "rating": 4.3,
    "reviewCount": 777,
    "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 12,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "building-blocks",
      "educational",
      "kids",
      "learning",
      "play",
      "toys",
      "wooden-toys"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring blocks wooden educational wooden encourages creativity encourages educational. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for building-blocks performance with premium materials",
      "Key engineering points: blocks and wooden",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "building-blocks, educational, kids",
      "Category": "Toys & Hobbies",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-010",
    "title": "Ergonomic Dual-Mode Wireless Optical Mouse with Silent Clicks",
    "category": "Electronics",
    "price": 119.99,
    "originalPrice": 155.99,
    "rating": 4.4,
    "reviewCount": 850,
    "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 23,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "computer-accessories",
      "ergonomic",
      "mouse",
      "office",
      "productivity",
      "wireless"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring wireless features adjustable ergonomic optical dual 4ghz dpi levels dpi. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for computer-accessories performance with premium materials",
      "Key engineering points: wireless and features adjustable",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "computer-accessories, ergonomic, mouse",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-011",
    "title": "Pure Vitamin C 20% + Ferulic Acid Anti-Aging Brightening Serum",
    "category": "Beauty & Skincare",
    "price": 73.99,
    "originalPrice": 96.19,
    "rating": 4.5,
    "reviewCount": 923,
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 34,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "anti-aging",
      "beauty",
      "facial-serum",
      "glow",
      "hydrating",
      "skincare",
      "vitamin-c"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring serum vitamin acid ferulic enhanced formulated brighten. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for anti-aging performance with premium materials",
      "Key engineering points: serum and vitamin",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "anti-aging, beauty, facial-serum",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-012",
    "title": "Rechargeable Cordless Electric Wine Opener with Foil Cutter",
    "category": "Home & Kitchen",
    "price": 82.99,
    "originalPrice": 107.89,
    "rating": 4.6,
    "reviewCount": 996,
    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 45,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "barware",
      "electric",
      "entertaining",
      "gift",
      "kitchen",
      "kitchen-gadgets",
      "wine-opener"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring wine foil bottles single electric wine charge charge soft. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for barware performance with premium materials",
      "Key engineering points: wine and foil",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "barware, electric, entertaining",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-013",
    "title": "Ultrasonic Ceramic Essential Oil Diffuser with Ambient LED Glow",
    "category": "Home & Kitchen",
    "price": 87.99,
    "originalPrice": 114.39,
    "rating": 4.7,
    "reviewCount": 1069,
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 56,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "aromatherapy",
      "diffuser",
      "essential-oils",
      "home-decor",
      "relaxation",
      "wellness"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring diffuser ceramic essential oil diffuser hand diffuser 200ml crafted ceramic. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for aromatherapy performance with premium materials",
      "Key engineering points: diffuser and ceramic",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "aromatherapy, diffuser, essential-oils",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-014",
    "title": "Handheld High-Torque Electric Milk Frother & Coffee Drink Mixer",
    "category": "Home & Kitchen",
    "price": 92.99,
    "originalPrice": 120.89,
    "rating": 4.8,
    "reviewCount": 1142,
    "image": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 67,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "coffee",
      "coffee-accessories",
      "drink-mixer",
      "foam",
      "kitchen",
      "milk-frother"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring frother drink foam maker electric milk drink mixer drink chocolate protein. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for coffee performance with premium materials",
      "Key engineering points: frother drink and foam maker",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "coffee, coffee-accessories, drink-mixer",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-015",
    "title": "4K Ultra HD Smart TV Streaming Hub with Voice Remote & Dolby Vision",
    "category": "Electronics",
    "price": 154.99,
    "originalPrice": 201.49,
    "rating": 4.9,
    "reviewCount": 1215,
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 78,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "4k",
      "home-entertainment",
      "media-player",
      "smart-tv",
      "streaming",
      "tv",
      "voice-control"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring dolby remote entertainment hub entertainment dolby vision dolby atmos. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for 4k performance with premium materials",
      "Key engineering points: dolby and remote",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "4k, home-entertainment, media-player",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-016",
    "title": "High-Density EVA Muscle Foam Roller for Physical Therapy & Yoga",
    "category": "Sports & Fitness",
    "price": 120.99,
    "originalPrice": 157.29,
    "rating": 4.2,
    "reviewCount": 1288,
    "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 89,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "fitness",
      "foam-roller",
      "massage",
      "muscle-relief",
      "recovery",
      "workout",
      "yoga"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring foam roller roller muscle foam flexibility engineered relieve. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for fitness performance with premium materials",
      "Key engineering points: foam roller and roller",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "fitness, foam-roller, massage",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-017",
    "title": "Ultralight Carbon Fiber Shock-Absorbing Trekking Poles (Pair)",
    "category": "Sports & Fitness",
    "price": 126.99,
    "originalPrice": 165.09,
    "rating": 4.3,
    "reviewCount": 1361,
    "image": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 100,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "carbon-fiber",
      "hiking",
      "mountaineering",
      "outdoor",
      "trail",
      "trekking-poles"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring fiber carbon fiber carbon poles fiber shock fiber pair. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for carbon-fiber performance with premium materials",
      "Key engineering points: fiber and carbon fiber",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "carbon-fiber, hiking, mountaineering",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-018",
    "title": "Breathable Mesh Cushion Athletic Road Running Sneakers",
    "category": "Sports & Fitness",
    "price": 132.99,
    "originalPrice": 172.89,
    "rating": 4.4,
    "reviewCount": 1434,
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 16,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "athletic",
      "fitness",
      "footwear",
      "running-shoes",
      "shoes",
      "sneakers",
      "sports"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring engineered mesh foam cushioning durable rubber delivers optimal cushioning absorbs cushion running. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for athletic performance with premium materials",
      "Key engineering points: engineered mesh and foam cushioning",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "athletic, fitness, footwear",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-019",
    "title": "Modern Brass Pedestal Bedside Table Lamp with Textured Linen Shade",
    "category": "Home & Kitchen",
    "price": 117.99,
    "originalPrice": 153.39,
    "rating": 4.5,
    "reviewCount": 1507,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 27,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "bedroom-decor",
      "brass",
      "lighting",
      "living-room",
      "minimalist",
      "modern",
      "table-lamp"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring linen warm shade modern brass featuring sleek. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for bedroom-decor performance with premium materials",
      "Key engineering points: linen and warm",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "bedroom-decor, brass, lighting",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-020",
    "title": "Velvet Matte Long-Wear Liquid Lipstick Cosmetics Gift Kit (6-Pack)",
    "category": "Beauty & Skincare",
    "price": 58.99,
    "originalPrice": 76.69,
    "rating": 4.6,
    "reviewCount": 1580,
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 38,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "beauty",
      "cosmetics",
      "gift-set",
      "lip-kit",
      "lipstick",
      "makeup",
      "matte"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring liquid lipstick liquid lipstick matte finish stays delivering rich. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for beauty performance with premium materials",
      "Key engineering points: liquid and lipstick",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "beauty, cosmetics, gift-set",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-021",
    "title": "Full-Grain Leather Executive Travel & Laptop Commuter Backpack",
    "category": "Fashion & Apparel",
    "price": 113.99,
    "originalPrice": 148.19,
    "rating": 4.7,
    "reviewCount": 1653,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 49,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "accessories",
      "backpack",
      "bags",
      "laptop-bag",
      "leather",
      "travel",
      "work"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring backpack laptop leather featuring padded compartment multiple breathable padding. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for accessories performance with premium materials",
      "Key engineering points: backpack and laptop",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "accessories, backpack, bags",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-022",
    "title": "MagSafe Compatible Magnetic Wireless Power Bank 10,000mAh",
    "category": "Electronics",
    "price": 203.99,
    "originalPrice": 265.19,
    "rating": 4.8,
    "reviewCount": 1726,
    "image": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 60,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "magnetic",
      "mobile-accessories",
      "portable",
      "power-bank",
      "travel",
      "wireless-charger"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring charging power wireless delivery wired delivery compatible smartphones. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for magnetic performance with premium materials",
      "Key engineering points: charging and power",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "magnetic, mobile-accessories, portable",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-023",
    "title": "Slim Minimalist Genuine Leather Wallet with RFID-Blocking Shield",
    "category": "Fashion & Apparel",
    "price": 121.99,
    "originalPrice": 158.59,
    "rating": 4.9,
    "reviewCount": 1799,
    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 71,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "accessories",
      "leather",
      "menswear",
      "minimalist",
      "rfid-blocking",
      "wallet"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring rfid blocking rfid wallet blocking card leather. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for accessories performance with premium materials",
      "Key engineering points: rfid blocking and rfid",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "accessories, leather, menswear",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-024",
    "title": "Architect LED Desk Lamp with Heavy-Duty Metal Clamp & Dimmer",
    "category": "Office & Tech",
    "price": 142.99,
    "originalPrice": 185.89,
    "rating": 4.2,
    "reviewCount": 1872,
    "image": "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 82,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "adjustable",
      "clamp-light",
      "desk-lamp",
      "led",
      "lighting",
      "office",
      "study"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring drafting lamp flexible long 10 brightness drafting tables drafting lamp. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for adjustable performance with premium materials",
      "Key engineering points: drafting and lamp",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "adjustable, clamp-light, desk-lamp",
      "Category": "Office & Tech",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-025",
    "title": "Italian Barista Pump Espresso Machine with Steam Milk Wand",
    "category": "Home & Kitchen",
    "price": 147.99,
    "originalPrice": 192.39,
    "rating": 4.3,
    "reviewCount": 1945,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 93,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "barista",
      "coffee",
      "coffee-maker",
      "espresso-machine",
      "home-appliances",
      "kitchen"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring espresso espresso cappuccinos foam double frother brew espresso machine features powerful. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for barista performance with premium materials",
      "Key engineering points: espresso and espresso cappuccinos",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "barista, coffee, coffee-maker",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-026",
    "title": "High-Density Acoustic Soundproofing Foam Studio Wedge Panels (12-Pack)",
    "category": "Electronics",
    "price": 231.99,
    "originalPrice": 301.59,
    "rating": 4.4,
    "reviewCount": 2018,
    "image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 9,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "acoustics",
      "audio",
      "foam-panels",
      "home-theater",
      "music",
      "soundproofing",
      "studio"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring panels acoustic foam echoes reverberation echoes foam soundproofing. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for acoustics performance with premium materials",
      "Key engineering points: panels and acoustic",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "acoustics, audio, foam-panels",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-027",
    "title": "Brushed Gold Solid Brass Bathroom Sink Faucet with Pop-Up Drain",
    "category": "Home & Kitchen",
    "price": 27.99,
    "originalPrice": 36.39,
    "rating": 4.5,
    "reviewCount": 2091,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 20,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "bathroom",
      "brass",
      "faucet",
      "fixtures",
      "hardware",
      "home-improvement"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring faucet solid brass solid brass faucet single faucet forged. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for bathroom performance with premium materials",
      "Key engineering points: faucet and solid brass",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "bathroom, brass, faucet",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-028",
    "title": "All-Terrain Waterproof Hiking Boots with Vibram Grip Outsole",
    "category": "Sports & Fitness",
    "price": 42.99,
    "originalPrice": 55.89,
    "rating": 4.6,
    "reviewCount": 2164,
    "image": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 31,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "footwear",
      "hiking-boots",
      "outdoor",
      "sports",
      "trail",
      "waterproof"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring leather rubber waterproof eva midsole cap protection cap. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for footwear performance with premium materials",
      "Key engineering points: leather and rubber",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "footwear, hiking-boots, outdoor",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-029",
    "title": "Cardioid Condenser USB Studio Microphone with Boom Arm & Pop Filter",
    "category": "Electronics",
    "price": 252.99,
    "originalPrice": 328.89,
    "rating": 4.7,
    "reviewCount": 2237,
    "image": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 42,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "audio",
      "microphone",
      "podcasting",
      "recording",
      "streaming",
      "studio",
      "usb-mic"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring duty boom filter shock crisp voiceovers crisp condenser microphone condenser. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for audio performance with premium materials",
      "Key engineering points: duty boom and filter shock",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "audio, microphone, podcasting",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-030",
    "title": "Smart Laser-Navigation Robot Vacuum & Mop Combo with Auto-Empty",
    "category": "Home & Kitchen",
    "price": 42.99,
    "originalPrice": 55.89,
    "rating": 4.8,
    "reviewCount": 2310,
    "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 53,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "automation",
      "cleaning",
      "home-appliances",
      "robot-vacuum",
      "smart-home",
      "vacuum"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring efficient efficient cleaning floorplan efficient floorplan detection customizable detection. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for automation performance with premium materials",
      "Key engineering points: efficient and efficient cleaning",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "automation, cleaning, home-appliances",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-031",
    "title": "Rugged IPX7 Waterproof Outdoor Bluetooth Speaker with Deep Bass",
    "category": "Electronics",
    "price": 266.99,
    "originalPrice": 347.09,
    "rating": 4.9,
    "reviewCount": 2383,
    "image": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 64,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "audio",
      "bluetooth",
      "outdoor",
      "portable",
      "sound",
      "speaker",
      "waterproof"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring bass deliver rich deliver deep bass continuous music compact portable. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for audio performance with premium materials",
      "Key engineering points: bass and deliver rich",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "audio, bluetooth, outdoor",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-032",
    "title": "Vintage Industrial Brass Gooseneck Wall Sconce Light Fixture",
    "category": "Home & Kitchen",
    "price": 52.99,
    "originalPrice": 68.89,
    "rating": 4.2,
    "reviewCount": 2456,
    "image": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 75,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "brass",
      "fixture",
      "industrial",
      "lighting",
      "rustic",
      "wall-light",
      "wall-sconce"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring brass fittings duty solid fittings clear designed versatile constructed heavy. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for brass performance with premium materials",
      "Key engineering points: brass and fittings",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "brass, fixture, industrial",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-033",
    "title": "Men's 100% Pure Breathable Linen Casual Button-Down Summer Shirt",
    "category": "Fashion & Apparel",
    "price": 51.99,
    "originalPrice": 67.59,
    "rating": 4.3,
    "reviewCount": 129,
    "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 86,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "button-down",
      "casual",
      "lightweight",
      "linen",
      "menswear",
      "shirt",
      "summer-fashion"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring shirt linen features relaxed fit spread 100 linen curved hem. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for button-down performance with premium materials",
      "Key engineering points: shirt and linen",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "button-down, casual, lightweight",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-034",
    "title": "Ultra-Low Latency Wireless Gaming Earbuds with Dual Microphones",
    "category": "Electronics",
    "price": 287.99,
    "originalPrice": 374.39,
    "rating": 4.4,
    "reviewCount": 202,
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 97,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "audio",
      "bluetooth",
      "earbuds",
      "gaming",
      "low-latency",
      "sports",
      "true-wireless"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring earbuds earbuds low calls features calls enjoy immersive features intuitive. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for audio performance with premium materials",
      "Key engineering points: earbuds and earbuds low",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "audio, bluetooth, earbuds",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-035",
    "title": "Rechargeable Digital Tire Inflator & 150 PSI Cordless Air Compressor",
    "category": "Auto & Hardware",
    "price": 67.99,
    "originalPrice": 88.39,
    "rating": 4.5,
    "reviewCount": 275,
    "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 13,
    "isBestSeller": true,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "air-pump",
      "auto-accessories",
      "car-care",
      "emergency",
      "tire-inflator",
      "tools"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring tire emergency function lcd emergency light display rechargeable digital cordless. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for air-pump performance with premium materials",
      "Key engineering points: tire and emergency",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "air-pump, auto-accessories, car-care",
      "Category": "Auto & Hardware",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-036",
    "title": "65W GaN III Fast Multi-Port USB-C Wall Charger with Foldable Plug",
    "category": "Electronics",
    "price": 301.99,
    "originalPrice": 392.59,
    "rating": 4.6,
    "reviewCount": 348,
    "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 24,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "charger",
      "fast-charging",
      "gan",
      "power",
      "tech-accessories",
      "travel",
      "usb-c"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring usb charger wall fast gan technology gan. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for charger performance with premium materials",
      "Key engineering points: usb and charger",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "charger, fast-charging, gan",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-037",
    "title": "Oversized Quick-Dry Microfiber Beach, Gym & Camping Travel Towel",
    "category": "Sports & Fitness",
    "price": 96.99,
    "originalPrice": 126.09,
    "rating": 4.7,
    "reviewCount": 421,
    "image": "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 35,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "beach",
      "camping",
      "microfiber",
      "outdoor",
      "sports",
      "towel",
      "travel"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring towel faster free travel faster standard dry beach dries 3x. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for beach performance with premium materials",
      "Key engineering points: towel and faster",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "beach, camping, microfiber",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-038",
    "title": "Ultra-Soft Heavyweight Fleece Pullover Hoodie with Kangaroo Pocket",
    "category": "Fashion & Apparel",
    "price": 71.99,
    "originalPrice": 93.59,
    "rating": 4.8,
    "reviewCount": 494,
    "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 46,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "apparel",
      "casual",
      "fleece",
      "hoodie",
      "loungewear",
      "pullover",
      "streetwear"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring hoodie fleece fleece hoodie fleece pullover double lined cuffs reinforced. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for apparel performance with premium materials",
      "Key engineering points: hoodie and fleece",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "apparel, casual, fleece",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-039",
    "title": "Ergonomic Memory Foam Under-Desk Footrest with Non-Slip Base",
    "category": "Office & Tech",
    "price": 87.99,
    "originalPrice": 114.39,
    "rating": 4.9,
    "reviewCount": 567,
    "image": "https://images.unsplash.com/photo-1580481077195-c990264169c8?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 57,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "desk-accessories",
      "ergonomic",
      "footrest",
      "home-office",
      "office",
      "posture"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring cushion desk foam foot foam footrest foam foot. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for desk-accessories performance with premium materials",
      "Key engineering points: cushion and desk",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "desk-accessories, ergonomic, footrest",
      "Category": "Office & Tech",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-040",
    "title": "Organic Arabica Coffee & Coconut Oil Exfoliating Body Scrub",
    "category": "Beauty & Skincare",
    "price": 38.99,
    "originalPrice": 50.69,
    "rating": 4.2,
    "reviewCount": 640,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 68,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "body-care",
      "coconut-oil",
      "coffee-scrub",
      "exfoliant",
      "natural",
      "scrub",
      "skincare"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring scrub coconut oil coconut body scrub body coffee. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for body-care performance with premium materials",
      "Key engineering points: scrub and coconut oil",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "body-care, coconut-oil, coffee-scrub",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-041",
    "title": "Plush Micro-Fleece Heated Electric Blanket with 10 Heat Settings",
    "category": "Home & Kitchen",
    "price": 97.99,
    "originalPrice": 127.39,
    "rating": 4.3,
    "reviewCount": 713,
    "image": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 79,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "bedding",
      "cozy",
      "electric-blanket",
      "heating",
      "home",
      "throw",
      "winter"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring blanket electric 10 hour electric blanket electric throw fleece electric. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for bedding performance with premium materials",
      "Key engineering points: blanket and electric",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "bedding, cozy, electric-blanket",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-042",
    "title": "Dead Sea Mineral Purifying Mud Facial Mask for Pore Deep Cleansing",
    "category": "Beauty & Skincare",
    "price": 48.99,
    "originalPrice": 63.69,
    "rating": 4.4,
    "reviewCount": 786,
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 90,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "acne",
      "deep-cleansing",
      "face-mask",
      "mud-mask",
      "natural",
      "pore-care",
      "skincare"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring mud mask mud mask dead facial clogged. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for acne performance with premium materials",
      "Key engineering points: mud mask and mud",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "acne, deep-cleansing, face-mask",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-043",
    "title": "Designer Genuine Pebbled Leather Crossbody Shoulder Handbag",
    "category": "Fashion & Apparel",
    "price": 91.99,
    "originalPrice": 119.59,
    "rating": 4.5,
    "reviewCount": 859,
    "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 101,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "accessories",
      "crossbody",
      "fashion",
      "handbag",
      "leather",
      "womenswear"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring leather zippered compartment crossbody shoulder crossbody compartment inner compact structured. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for accessories performance with premium materials",
      "Key engineering points: leather and zippered compartment",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "accessories, crossbody, fashion",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-044",
    "title": "Moroccan Argan Oil Intensive Repair Deep Conditioning Hair Mask",
    "category": "Beauty & Skincare",
    "price": 58.99,
    "originalPrice": 76.69,
    "rating": 4.6,
    "reviewCount": 932,
    "image": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 17,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "argan-oil",
      "beauty",
      "deep-conditioner",
      "hair-mask",
      "haircare",
      "organic",
      "repair"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring argan oil argan hair oil ends ends leaves. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for argan-oil performance with premium materials",
      "Key engineering points: argan oil and argan",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "argan-oil, beauty, deep-conditioner",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-045",
    "title": "Hardcover Dotted Grid Bullet Journal Notebook with 160 GSM Thick Paper",
    "category": "Office & Tech",
    "price": 117.99,
    "originalPrice": 153.39,
    "rating": 4.7,
    "reviewCount": 1005,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 28,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "bullet-journal",
      "journal",
      "notebook",
      "office-supplies",
      "paper",
      "stationery",
      "writing"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring notebook gsm 160 gsm 160 elastic closure expandable pocket. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for bullet-journal performance with premium materials",
      "Key engineering points: notebook and gsm",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "bullet-journal, journal, notebook",
      "Category": "Office & Tech",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-046",
    "title": "UV400 Polarized Sport Cycling & Running Wrap Sunglasses",
    "category": "Sports & Fitness",
    "price": 150.99,
    "originalPrice": 196.29,
    "rating": 4.8,
    "reviewCount": 1078,
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 39,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "cycling",
      "eyewear",
      "outdoor",
      "polarized",
      "running",
      "sports-gear",
      "sunglasses"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring cycling field frame providing ergonomic frame field vision cycling sunglasses. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for cycling performance with premium materials",
      "Key engineering points: cycling and field",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "cycling, eyewear, outdoor",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-047",
    "title": "Quick-Drying Fine Point 0.5mm Retractable Black Gel Pens (Pack of 12)",
    "category": "Office & Tech",
    "price": 127.99,
    "originalPrice": 166.39,
    "rating": 4.9,
    "reviewCount": 1151,
    "image": "https://images.unsplash.com/photo-1585336261026-7f093f4122d4?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 50,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "desk",
      "gel-pens",
      "office",
      "pens",
      "school-supplies",
      "stationery",
      "writing"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring writing gel zero smudging zero ensures comfortable ensures. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for desk performance with premium materials",
      "Key engineering points: writing and gel",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "desk, gel-pens, office",
      "Category": "Office & Tech",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-048",
    "title": "Quick-Select Adjustable Dial Dumbbell Set (5 to 52.5 lbs Single)",
    "category": "Sports & Fitness",
    "price": 162.99,
    "originalPrice": 211.89,
    "rating": 4.2,
    "reviewCount": 1224,
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 61,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "dumbbells",
      "exercise",
      "fitness",
      "home-gym",
      "strength",
      "weights",
      "workout"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring adjustable easily adjusts easily dumbbell 52 dumbbell dial mechanism. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for dumbbells performance with premium materials",
      "Key engineering points: adjustable and easily adjusts",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "dumbbells, exercise, fitness",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-049",
    "title": "High-Precision Digital Kitchen Food Scale with Stainless Platform",
    "category": "Home & Kitchen",
    "price": 137.99,
    "originalPrice": 179.39,
    "rating": 4.3,
    "reviewCount": 1297,
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 72,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "baking",
      "digital",
      "food-scale",
      "kitchen",
      "meal-prep",
      "scale",
      "weight"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring scale food scale food digital function cooking digital kitchen. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for baking performance with premium materials",
      "Key engineering points: scale and food scale",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "baking, digital, food-scale",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-050",
    "title": "108-Piece Home Repair & Maintenance Hand Tool Kit with Hard Case",
    "category": "Auto & Hardware",
    "price": 142.99,
    "originalPrice": 185.89,
    "rating": 4.4,
    "reviewCount": 1370,
    "image": "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 83,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "diy",
      "hand-tools",
      "hardware",
      "home-repair",
      "maintenance",
      "tool-set",
      "tools"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring tool set forged high comprehensive general comprehensive claw hammer. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for diy performance with premium materials",
      "Key engineering points: tool and set",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "diy, hand-tools, hardware",
      "Category": "Auto & Hardware",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-051",
    "title": "Unisex Classic Low-Top Vulcanized Canvas Daily Walking Sneakers",
    "category": "Fashion & Apparel",
    "price": 123.99,
    "originalPrice": 161.19,
    "rating": 4.5,
    "reviewCount": 1443,
    "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 94,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "canvas",
      "casual",
      "daily-wear",
      "footwear",
      "shoes",
      "sneakers",
      "street-style"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring sneakers canvas feel feel day flexible vulcanized day long. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for canvas performance with premium materials",
      "Key engineering points: sneakers and canvas",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "canvas, casual, daily-wear",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-052",
    "title": "Double-Wall Vacuum Insulated Stainless Steel Water Bottle 32oz",
    "category": "Sports & Fitness",
    "price": 36.99,
    "originalPrice": 48.09,
    "rating": 4.6,
    "reviewCount": 1516,
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 10,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "gym",
      "hydration",
      "insulated",
      "outdoor",
      "sports",
      "stainless-steel",
      "water-bottle"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring hours bottle 32 coat coat finish cold 24 features leak. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for gym performance with premium materials",
      "Key engineering points: hours and bottle 32",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "gym, hydration, insulated",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-053",
    "title": "Triple Biomimetic Ceramides Daily Hydrating Facial Moisture Cream",
    "category": "Beauty & Skincare",
    "price": 43.99,
    "originalPrice": 57.19,
    "rating": 4.7,
    "reviewCount": 1589,
    "image": "https://images.unsplash.com/photo-1608248597359-21669485b0d0?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 21,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "ceramides",
      "daily-routine",
      "face-cream",
      "hydrating",
      "moisturizer",
      "skincare"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring gel skin fragrance free fragrance fast absorbing free safe. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for ceramides performance with premium materials",
      "Key engineering points: gel and skin",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "ceramides, daily-routine, face-cream",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-054",
    "title": "Anti-Theft TSA-Approved Business Laptop Travel Backpack with USB Port",
    "category": "Fashion & Apparel",
    "price": 135.99,
    "originalPrice": 176.79,
    "rating": 4.8,
    "reviewCount": 1662,
    "image": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 32,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "accessories",
      "anti-theft",
      "backpack",
      "bags",
      "laptop-bag",
      "tech",
      "travel"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring usb charging charging port port travel usb charging. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for accessories performance with premium materials",
      "Key engineering points: usb charging and charging port",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "accessories, anti-theft, backpack",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-055",
    "title": "Heavy-Duty Resistance Loop & Tube Exercise Bands with Door Anchor",
    "category": "Sports & Fitness",
    "price": 54.99,
    "originalPrice": 71.49,
    "rating": 4.9,
    "reviewCount": 1735,
    "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 43,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "exercise",
      "fitness",
      "home-gym",
      "resistance-bands",
      "strength-training",
      "workout"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring resistance bands bands resistance set duty resistance door anchor. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for exercise performance with premium materials",
      "Key engineering points: resistance bands and bands",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "exercise, fitness, home-gym",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-056",
    "title": "1000-Piece Panoramic Landscape Nature Jigsaw Puzzle for Adults",
    "category": "Toys & Hobbies",
    "price": 42.99,
    "originalPrice": 55.89,
    "rating": 4.2,
    "reviewCount": 1808,
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 54,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "1000-piece",
      "family",
      "games",
      "hobbies",
      "mind-games",
      "puzzles",
      "relaxation"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring puzzle free printing fit vibrant color reference cardboard puzzle cardboard. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for 1000-piece performance with premium materials",
      "Key engineering points: puzzle and free printing",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "1000-piece, family, games",
      "Category": "Toys & Hobbies",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-057",
    "title": "Classic Vintage Trucker Denim Jean Jacket with Metal Shank Buttons",
    "category": "Fashion & Apparel",
    "price": 37.99,
    "originalPrice": 49.39,
    "rating": 4.3,
    "reviewCount": 1881,
    "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 65,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "casual",
      "denim",
      "fashion",
      "jacket",
      "menswear",
      "outerwear",
      "style"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring denim pockets flap 100 cotton fit denim flap pockets. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for casual performance with premium materials",
      "Key engineering points: denim and pockets",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "casual, denim, fashion",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-058",
    "title": "Handcrafted Modern Geometric Ribbed Ceramic Flower Vase",
    "category": "Home & Kitchen",
    "price": 52.99,
    "originalPrice": 68.89,
    "rating": 4.4,
    "reviewCount": 1954,
    "image": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 76,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "ceramic",
      "floral",
      "home-decor",
      "home-styling",
      "interior-design",
      "vase"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring ceramic flowers geometric ceramic geometric flower vase flower. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for ceramic performance with premium materials",
      "Key engineering points: ceramic and flowers",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "ceramic, floral, home-decor",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-059",
    "title": "High-Density TPE Eco-Friendly Non-Slip Exercise Yoga Mat (6mm)",
    "category": "Sports & Fitness",
    "price": 78.99,
    "originalPrice": 102.69,
    "rating": 4.5,
    "reviewCount": 2027,
    "image": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 87,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "eco-friendly",
      "exercise",
      "fitness",
      "non-slip",
      "pilates",
      "yoga",
      "yoga-mat"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring yoga non slip slip non eco yoga extra non. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for eco-friendly performance with premium materials",
      "Key engineering points: yoga and non slip",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "eco-friendly, exercise, fitness",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-060",
    "title": "Adjustable Silicone Ankle & Wrist Weights for Cardio & Pilates",
    "category": "Sports & Fitness",
    "price": 84.99,
    "originalPrice": 110.49,
    "rating": 4.6,
    "reviewCount": 2100,
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 98,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "ankle-weights",
      "cardio",
      "exercise",
      "fitness",
      "home-workout",
      "resistance"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring weights ankle wrist adjustable comfy neoprene comfy. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for ankle-weights performance with premium materials",
      "Key engineering points: weights and ankle",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "ankle-weights, cardio, exercise",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-061",
    "title": "Heavy-Duty 500D PVC Waterproof Floating Dry Bag with Phone Pouch",
    "category": "Sports & Fitness",
    "price": 90.99,
    "originalPrice": 118.29,
    "rating": 4.7,
    "reviewCount": 2173,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 14,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "camping",
      "dry-bag",
      "gear",
      "kayaking",
      "outdoor",
      "rafting",
      "waterproof"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring dry floating engineered roll fishing boating fishing floating dry. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for camping performance with premium materials",
      "Key engineering points: dry and floating",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "camping, dry-bag, gear",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-062",
    "title": "High-Waisted Squat-Proof Tummy Control Gym Compression Leggings",
    "category": "Fashion & Apparel",
    "price": 57.99,
    "originalPrice": 75.39,
    "rating": 4.8,
    "reviewCount": 2246,
    "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 25,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "activewear",
      "compression",
      "fitness",
      "gym",
      "leggings",
      "womenswear",
      "yoga"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring high gentle compression gentle fabric offers designed way coverage high. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for activewear performance with premium materials",
      "Key engineering points: high and gentle compression",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "activewear, compression, fitness",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-063",
    "title": "Smart WiFi RGB Color-Changing LED Light Strip (32.8ft) Alexa Compatible",
    "category": "Home & Kitchen",
    "price": 77.99,
    "originalPrice": 101.39,
    "rating": 4.9,
    "reviewCount": 2319,
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 36,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "ambient-lighting",
      "home-decor",
      "led-strip",
      "lighting",
      "rgb",
      "smart-lighting"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring control led control color control alexa compatibility color changing. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for ambient-lighting performance with premium materials",
      "Key engineering points: control and led",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "ambient-lighting, home-decor, led-strip",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-064",
    "title": "14-inch OLED Ultra-Thin Laptop Computer - 16GB RAM, 512GB SSD",
    "category": "Electronics",
    "price": 147.99,
    "originalPrice": 192.39,
    "rating": 4.2,
    "reviewCount": 2392,
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 47,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "computers",
      "electronics",
      "laptop",
      "oled",
      "portable",
      "student",
      "ultrabook",
      "work"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring inch laptop 14 inch 14 laptop inch engineered high. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for computers performance with premium materials",
      "Key engineering points: inch laptop and 14 inch",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "computers, electronics, laptop",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-065",
    "title": "Aromatherapeutic French Lavender & Vanilla Natural Soy Wax Candle",
    "category": "Home & Kitchen",
    "price": 87.99,
    "originalPrice": 114.39,
    "rating": 4.3,
    "reviewCount": 2465,
    "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 58,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "aromatherapy",
      "candle",
      "gift",
      "home-fragrance",
      "lavender",
      "relaxation",
      "soy-wax"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring soy wax soy wax candle free cotton essential oils. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for aromatherapy performance with premium materials",
      "Key engineering points: soy and wax",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "aromatherapy, candle, gift",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-066",
    "title": "Luxury Soft Velvet Decorative Throw Pillow Cushion Covers (Set of 2)",
    "category": "Home & Kitchen",
    "price": 92.99,
    "originalPrice": 120.89,
    "rating": 4.4,
    "reviewCount": 138,
    "image": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 69,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "bedding",
      "cushion-covers",
      "home-decor",
      "living-room",
      "throw-pillows",
      "velvet"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring velvet covers decorative throw cushion covers covers set covers featuring. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for bedding performance with premium materials",
      "Key engineering points: velvet and covers",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "bedding, cushion-covers, home-decor",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-067",
    "title": "All-Weather GPS Smartwatch with Heart Rate & Blood Oxygen Sensor",
    "category": "Sports & Fitness",
    "price": 126.99,
    "originalPrice": 165.09,
    "rating": 4.5,
    "reviewCount": 211,
    "image": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 80,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "fitness",
      "health",
      "heart-rate",
      "outdoor",
      "smartwatch",
      "tracker",
      "waterproof",
      "wearables"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring heart rate heart fitness rate fitness goals fitness smartwatch. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for fitness performance with premium materials",
      "Key engineering points: heart rate and heart",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "fitness, health, heart-rate",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-068",
    "title": "Pre-Seasoned 10.25-inch Cast Iron Skillet with Silicone Handle Holder",
    "category": "Home & Kitchen",
    "price": 102.99,
    "originalPrice": 133.89,
    "rating": 4.6,
    "reviewCount": 284,
    "image": "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 91,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "cast-iron",
      "cooking",
      "cookware",
      "heavy-duty",
      "kitchen",
      "pan",
      "skillet"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring essential heavy fires 10 25 duty cookware frying grilling frying. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for cast-iron performance with premium materials",
      "Key engineering points: essential heavy and fires",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "cast-iron, cooking, cookware",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-069",
    "title": "Thermal Fleece Lined Winter Compression Base Layer Top & Bottoms",
    "category": "Fashion & Apparel",
    "price": 85.99,
    "originalPrice": 111.79,
    "rating": 4.7,
    "reviewCount": 357,
    "image": "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 102,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "activewear",
      "base-layer",
      "compression",
      "menswear",
      "thermal",
      "winter-sports"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring fleece lining compression base cold weather brushed fleece body heat lining. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for activewear performance with premium materials",
      "Key engineering points: fleece lining and compression base",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "activewear, base-layer, compression",
      "Category": "Fashion & Apparel",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-070",
    "title": "Double-Wall Insulated Stainless Steel Food Jar Thermos with Spoon",
    "category": "Home & Kitchen",
    "price": 112.99,
    "originalPrice": 146.89,
    "rating": 4.8,
    "reviewCount": 430,
    "image": "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 18,
    "isBestSeller": true,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "food-flask",
      "insulated",
      "kitchen",
      "lunch-box",
      "stainless-steel",
      "travel"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring food hot food flask folding spoon flask food jar. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for food-flask performance with premium materials",
      "Key engineering points: food and hot",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "food-flask, insulated, kitchen",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-071",
    "title": "Civilization Strategy & Empire Building Tabletop Family Board Game",
    "category": "Toys & Hobbies",
    "price": 117.99,
    "originalPrice": 153.39,
    "rating": 4.9,
    "reviewCount": 503,
    "image": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 29,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "board-games",
      "entertainment",
      "family-game",
      "hobbies",
      "party-games",
      "strategy",
      "tabletop"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring game board game board engaging tabletop engaging empire building. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for board-games performance with premium materials",
      "Key engineering points: game and board game",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "board-games, entertainment, family-game",
      "Category": "Toys & Hobbies",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-072",
    "title": "10-inch Non-Stick Granite Ceramic Crepe, Omelet & Flatbread Pan",
    "category": "Home & Kitchen",
    "price": 122.99,
    "originalPrice": 159.89,
    "rating": 4.2,
    "reviewCount": 576,
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 40,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "breakfast",
      "ceramic",
      "cookware",
      "kitchen",
      "non-stick",
      "pancake-pan",
      "skillet"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring pan gas stovetops gas flipping crepes flipping flatbreads tortillas. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for breakfast performance with premium materials",
      "Key engineering points: pan and gas stovetops",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "breakfast, ceramic, cookware",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-073",
    "title": "Extended RGB Gaming Mousepad Desk Mat with Fast 10W Wireless Charger",
    "category": "Electronics",
    "price": 210.99,
    "originalPrice": 274.29,
    "rating": 4.3,
    "reviewCount": 649,
    "image": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 51,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "desk-accessories",
      "gaming",
      "mousepad",
      "rgb",
      "tech",
      "wireless-charging"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring desk mat pad wireless charging mat rgb desk. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for desk-accessories performance with premium materials",
      "Key engineering points: desk mat and pad",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "desk-accessories, gaming, mousepad",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-074",
    "title": "Ergonomic High-Back Breathable Mesh Office Chair with Dynamic Lumbar",
    "category": "Office & Tech",
    "price": 132.99,
    "originalPrice": 172.89,
    "rating": 4.4,
    "reviewCount": 722,
    "image": "https://images.unsplash.com/photo-1580481077195-c990264169c8?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 62,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "ergonomic",
      "furniture",
      "home-office",
      "office-chair",
      "seating",
      "study",
      "workplace"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring lumbar support lumbar support mesh ergonomic mesh dynamic lumbar. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for ergonomic performance with premium materials",
      "Key engineering points: lumbar support and lumbar",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "ergonomic, furniture, home-office",
      "Category": "Office & Tech",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-075",
    "title": "3-4 Person Instant Pop-Up Waterproof Windproof Camping Dome Tent",
    "category": "Sports & Fitness",
    "price": 24.99,
    "originalPrice": 32.49,
    "rating": 4.5,
    "reviewCount": 795,
    "image": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 73,
    "isBestSeller": false,
    "isPathiChoice": true,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "backpacking",
      "camping",
      "hiking",
      "outdoor",
      "tent",
      "travel",
      "waterproof"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring tent easy easy setup engineered weather fabric fully fully taped. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for backpacking performance with premium materials",
      "Key engineering points: tent and easy",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "backpacking, camping, hiking",
      "Category": "Sports & Fitness",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-076",
    "title": "Multi-Tier Metal Mesh Document Desk File Tray Organizer with Drawer",
    "category": "Office & Tech",
    "price": 142.99,
    "originalPrice": 185.89,
    "rating": 4.6,
    "reviewCount": 868,
    "image": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 84,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": true,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "desk-organizer",
      "file-sorter",
      "office",
      "office-supplies",
      "storage",
      "workspace"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring mesh file document file folders notebooks folders files folders. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for desk-organizer performance with premium materials",
      "Key engineering points: mesh and file document",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "desk-organizer, file-sorter, office",
      "Category": "Office & Tech",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-077",
    "title": "Smart True HEPA Air Purifier for Large Rooms with Air Quality Sensor",
    "category": "Home & Kitchen",
    "price": 147.99,
    "originalPrice": 192.39,
    "rating": 4.7,
    "reviewCount": 941,
    "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 95,
    "isBestSeller": true,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "air-purifier",
      "hepa",
      "home-appliances",
      "indoor-air",
      "smart-home",
      "wellness"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring air filters features real filter large filters 99 dust pollen. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for air-purifier performance with premium materials",
      "Key engineering points: air and filters",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "air-purifier, hepa, home-appliances",
      "Category": "Home & Kitchen",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-078",
    "title": "Hands-Free 360\u00b0 Bladeless Wearable Rechargeable Cooling Neck Fan",
    "category": "Electronics",
    "price": 245.99,
    "originalPrice": 319.79,
    "rating": 4.8,
    "reviewCount": 1014,
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 11,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": true,
    "couponPercent": 15,
    "tags": [
      "cooling",
      "gadgets",
      "neck-fan",
      "personal-care",
      "portable",
      "summer",
      "travel"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring neck fan fan neck fan equipped free bladeless equipped 78. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for cooling performance with premium materials",
      "Key engineering points: neck fan and fan",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "cooling, gadgets, neck-fan",
      "Category": "Electronics",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  },
  {
    "id": "pl-item-079",
    "title": "Sonic Electric Rechargeable Toothbrush with 40,000 VPM & 8 Brush Heads",
    "category": "Beauty & Skincare",
    "price": 53.99,
    "originalPrice": 70.19,
    "rating": 4.9,
    "reviewCount": 1087,
    "image": "https://images.unsplash.com/photo-1559591937-e10c5980a30b?w=800&auto=format&fit=crop&q=80",
    "inStock": true,
    "stockCount": 22,
    "isBestSeller": false,
    "isPathiChoice": false,
    "isLimitedDeal": false,
    "hasPrime": true,
    "hasCoupon": false,
    "couponPercent": 0,
    "tags": [
      "dental-hygiene",
      "electric-toothbrush",
      "health",
      "personal-care",
      "sonic",
      "wellness"
    ],
    "description": "Engineered for high performance and everyday reliability. Featuring sonic electric toothbrush delivers 40 brushing modes brushing minute. Formulated and certified under Pathi Labs standard testing.",
    "features": [
      "Verified for dental-hygiene performance with premium materials",
      "Key engineering points: sonic and electric toothbrush",
      "Backed by 30-day money-back guarantee and Pathi Labs 1-year product warranty"
    ],
    "specs": {
      "Classification": "dental-hygiene, electric-toothbrush, health",
      "Category": "Beauty & Skincare",
      "Warranty": "1-Year Comprehensive",
      "Fast Shipping": "Eligible for Prime Free 1-Day Delivery"
    }
  }
];

export const CATEGORIES = [
  "All Departments",
  "Home Décor",
  "Candles & Lighting",
  "Kitchen & Dining",
  "Bags & Accessories",
  "Storage & Organization",
  "Party & Celebrations",
  "Seasonal & Christmas",
  "Garden & Outdoors",
  "Stationery & Craft",
  "Textiles & Comfort"
];
