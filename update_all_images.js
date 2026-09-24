/**
 * update_all_images.js
 * Updates the image field in products.ts for ALL 84 products using verified_images_v2.json
 */
const fs = require('fs');
const path = require('path');

const verifiedPath = path.join(__dirname, 'verified_images_v2.json');
const productsPath = path.join(__dirname, 'frontend/src/data/products.ts');

const verified = JSON.parse(fs.readFileSync(verifiedPath, 'utf8'));
let content = fs.readFileSync(productsPath, 'utf8');

let updatedCount = 0;
let unchangedCount = 0;
let notFoundCount = 0;

for (const [id, newUrl] of Object.entries(verified)) {
  const idPattern = `"id": "${id}"`;
  const idx = content.indexOf(idPattern);
  if (idx === -1) {
    console.warn(`  ⚠ id not found: ${id}`);
    notFoundCount++;
    continue;
  }

  // Find the next "image": "..." after this id (within 1000 chars)
  const imagePattern = /"image": "([^"]+)"/;
  const afterId = content.slice(idx);
  const searchWindow = afterId.slice(0, 1000);
  const match = imagePattern.exec(searchWindow);

  if (!match) {
    console.warn(`  ⚠ image field not found for: ${id}`);
    notFoundCount++;
    continue;
  }

  const oldUrl = match[1];
  if (oldUrl === newUrl) {
    unchangedCount++;
    continue;
  }

  const oldFull = `"image": "${oldUrl}"`;
  const newFull = `"image": "${newUrl}"`;
  const absolutePos = idx + match.index;
  content = content.slice(0, absolutePos) + newFull + content.slice(absolutePos + oldFull.length);

  console.log(`  ✅ ${id}: updated image`);
  updatedCount++;
}

fs.writeFileSync(productsPath, content, 'utf8');
console.log(`\n✨ Done!`);
console.log(`   Updated: ${updatedCount}`);
console.log(`   Unchanged (already correct): ${unchangedCount}`);
console.log(`   Not found: ${notFoundCount}`);
