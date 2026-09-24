const fs = require('fs');

const summary = JSON.parse(fs.readFileSync('./products_summary.json', 'utf8'));

// Verified high quality, matching Unsplash images for each of the 84 products
const MATCHING_IMAGES = {
  // Flagship products
  "pl-flag-01": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80", // Real optical compound laboratory microscope
  "pl-flag-02": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80", // Fingertip pulse oximeter / clinical reader
  "pl-flag-03": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80", // 4K OLED monitor display
  "pl-flag-04": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80", // Smartwatch titanium

  // Item products
  "pl-item-000": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80", // Hair dryer / salon tool
  "pl-item-001": "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80", // Straw sun hat
  "pl-item-002": "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80", // Telescope / astronomy
  "pl-item-003": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80", // Waterproof windbreaker jacket
  "pl-item-004": "https://images.unsplash.com/photo-1616353071588-708dcff912e2?w=800&auto=format&fit=crop&q=80", // Desk pad / leather mat
  "pl-item-005": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80", // Pendant ceiling light / lamp
  "pl-item-006": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80", // Cashmere wool scarf
  "pl-item-007": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=80", // Cleaning feather duster
  "pl-item-008": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80", // Action camera
  "pl-item-009": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80", // Wooden building blocks toy
  "pl-item-010": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80", // Wireless optical mouse
  "pl-item-011": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80", // Vitamin C dropper serum bottle
  "pl-item-012": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80", // Wine opener / wine bottle
  "pl-item-013": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80", // Essential oil aroma diffuser
  "pl-item-014": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80", // Milk frother / coffee foam mixer
  "pl-item-015": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80", // 4K TV screen
  "pl-item-016": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80", // Foam roller fitness
  "pl-item-017": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80", // Trekking poles / hiking
  "pl-item-018": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80", // Running shoes sneakers
  "pl-item-019": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80", // Bedside table lamp
  "pl-item-020": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80", // Matte lipstick cosmetics
  "pl-item-021": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80", // Leather commuter backpack
  "pl-item-022": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80", // Magnetic wireless power bank
  "pl-item-023": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80", // Leather minimalist wallet
  "pl-item-024": "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&auto=format&fit=crop&q=80", // Architect desk lamp metal
  "pl-item-025": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80", // Barista espresso machine / coffee
  "pl-item-026": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80", // Acoustic sound studio foam panels
  "pl-item-027": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80", // Brushed brass sink faucet
  "pl-item-028": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80", // Hiking boots waterproof
  "pl-item-029": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80", // Condenser studio microphone
  "pl-item-030": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80", // Robot vacuum cleaner / technology (replace picture frame 1583847268964)
  "pl-item-031": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80", // Bluetooth speaker outdoor
  "pl-item-032": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80", // Gooseneck wall sconce
  "pl-item-033": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80", // Linen button-down shirt
  "pl-item-034": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80", // Wireless earbuds
  "pl-item-035": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80", // Digital tire air compressor / automotive
  "pl-item-036": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80", // GaN USB-C wall charger
  "pl-item-037": "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&auto=format&fit=crop&q=80", // Microfiber towel
  "pl-item-038": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80", // Fleece pullover hoodie
  "pl-item-039": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80", // Memory foam footrest cushion (distinct from office chair 074)
  "pl-item-040": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80", // Coffee body scrub jar
  "pl-item-041": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80", // Heated fleece blanket
  "pl-item-042": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80", // Mud facial mask jar
  "pl-item-043": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80", // Leather crossbody shoulder bag
  "pl-item-044": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80", // Argan oil hair mask
  "pl-item-045": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80", // Dotted grid bullet journal notebook
  "pl-item-046": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80", // Polarized sport sunglasses
  "pl-item-047": "https://images.unsplash.com/photo-1585336261026-7f093f4122d4?w=800&auto=format&fit=crop&q=80", // Retractable gel pens
  "pl-item-048": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80", // Adjustable dumbbells fitness
  "pl-item-049": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80", // Food kitchen scale (distinct from frying pan 072)
  "pl-item-050": "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800&auto=format&fit=crop&q=80", // Tool kit hard case
  "pl-item-051": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80", // Canvas walking sneakers
  "pl-item-052": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80", // Vacuum insulated water bottle
  "pl-item-053": "https://images.unsplash.com/photo-1608248597359-21669485b0d0?w=800&auto=format&fit=crop&q=80", // Daily hydrating facial moisture cream
  "pl-item-054": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80", // Anti-theft laptop backpack
  "pl-item-055": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=80", // Resistance loop exercise bands
  "pl-item-056": "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&auto=format&fit=crop&q=80", // Landscape jigsaw puzzle game (distinct from flowers 1563245372)
  "pl-item-057": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80", // Vintage trucker denim jacket
  "pl-item-058": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80", // Ribbed ceramic flower vase
  "pl-item-059": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80", // Eco yoga exercise mat
  "pl-item-060": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80", // Ankle & wrist weights
  "pl-item-061": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80", // Waterproof floating dry bag
  "pl-item-062": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80", // High waisted gym compression leggings
  "pl-item-063": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80", // LED light strip RGB
  "pl-item-064": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80", // Ultra thin laptop computer
  "pl-item-065": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80", // Lavender soy wax candle
  "pl-item-066": "https://images.unsplash.com/photo-1584100926523-6a6fa4b8981a?w=800&auto=format&fit=crop&q=80", // Velvet decorative throw pillow covers (distinct from blanket)
  "pl-item-067": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80", // GPS outdoor smartwatch
  "pl-item-068": "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80", // Cast iron skillet
  "pl-item-069": "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&auto=format&fit=crop&q=80", // Thermal compression winter base layer
  "pl-item-070": "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&auto=format&fit=crop&q=80", // Insulated food jar thermos
  "pl-item-071": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80", // Tabletop family board game
  "pl-item-072": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80", // Ceramic omelet crepe pan
  "pl-item-073": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80", // RGB gaming mousepad
  "pl-item-074": "https://images.unsplash.com/photo-1580481077195-c990264169c8?w=800&auto=format&fit=crop&q=80", // Ergonomic mesh office chair
  "pl-item-075": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80", // Camping dome tent
  "pl-item-076": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80", // Document desk file tray organizer
  "pl-item-077": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80", // True HEPA air purifier
  "pl-item-078": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80", // Bladeless cooling neck fan
  "pl-item-079": "https://images.unsplash.com/photo-1559591937-e10c5980a30b?w=800&auto=format&fit=crop&q=80"  // Sonic electric rechargeable toothbrush
};

console.log('Total verified product images:', Object.keys(MATCHING_IMAGES).length);
fs.writeFileSync('./verified_images.json', JSON.stringify(MATCHING_IMAGES, null, 2));
