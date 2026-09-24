/**
 * apply_images.js
 * Reads verified_images.json and updates the image field for each product
 * in frontend/src/data/products.ts using a targeted string replacement.
 */
const fs = require('fs');
const path = require('path');

const verifiedPath = path.join(__dirname, 'verified_images.json');
const productsPath = path.join(__dirname, 'frontend/src/data/products.ts');

const verified = JSON.parse(fs.readFileSync(verifiedPath, 'utf8'));
let content = fs.readFileSync(productsPath, 'utf8');

// We'll iterate over each product id in verified_images and replace the image URL
// The pattern in the file is:
//   "id": "pl-item-000",
//   ...
//   "image": "https://...",
// We replace only the image URL that immediately follows the matching id block.

let replacedCount = 0;

for (const [id, newUrl] of Object.entries(verified)) {
  // Match the "id": "<id>", then capture up to the "image": "..." line within the same product object
  // Use a regex that finds the id field and then the next image field (non-greedy)
  const idPattern = `"id": "${id}"`;
  const idx = content.indexOf(idPattern);
  if (idx === -1) {
    console.warn(`  ⚠ id not found: ${id}`);
    continue;
  }

  // Find the next "image": "..." after this id
  const imagePattern = /"image": "([^"]+)"/;
  const afterId = content.slice(idx);
  
  // Find end of this product block (next opening brace at root level, or "},")
  // We look for "image" within the next ~800 chars
  const searchWindow = afterId.slice(0, 800);
  const match = imagePattern.exec(searchWindow);
  
  if (!match) {
    console.warn(`  ⚠ image field not found for: ${id}`);
    continue;
  }

  const oldUrl = match[1];
  if (oldUrl === newUrl) {
    console.log(`  ✓ unchanged: ${id}`);
    continue;
  }

  // Replace only this specific occurrence (the one right after the id)
  const oldFull = `"image": "${oldUrl}"`;
  const newFull = `"image": "${newUrl}"`;
  
  // Replace at the exact position
  const absolutePos = idx + match.index;
  content = content.slice(0, absolutePos) + newFull + content.slice(absolutePos + oldFull.length);
  
  console.log(`  ✅ updated: ${id}`);
  console.log(`     old: ${oldUrl.substring(0, 70)}...`);
  console.log(`     new: ${newUrl.substring(0, 70)}...`);
  replacedCount++;
}

fs.writeFileSync(productsPath, content, 'utf8');
console.log(`\n✨ Done! Updated ${replacedCount} product images in products.ts`);
