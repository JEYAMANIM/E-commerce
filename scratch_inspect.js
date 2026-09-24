const fs = require('fs');
let content = fs.readFileSync('./frontend/src/data/products.ts', 'utf8').replace(/\r\n/g, '\n');

const start = content.indexOf('[\n  {\n    "id": "pl-flag-01"');
const end = content.indexOf('\n];\n\nexport const CATEGORIES');
const arrayStr = content.slice(start, end + 2).trim();

try {
  const products = JSON.parse(arrayStr);
  console.log('Total products loaded:', products.length);
  const summary = products.map((p, idx) => ({
    idx: idx + 1,
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image
  }));
  fs.writeFileSync('./products_summary.json', JSON.stringify(summary, null, 2));
  console.log('Saved products_summary.json successfully! Total:', summary.length);
} catch (e) {
  console.error('Parse error:', e.message);
  console.log('start index:', start, 'end index:', end);
}
