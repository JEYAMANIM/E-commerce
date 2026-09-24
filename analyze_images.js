const fs = require('fs');
const summary = JSON.parse(fs.readFileSync('./products_summary.json', 'utf8'));

// Check for common image URL duplicates or obviously mismatched items
const urlCounts = {};
summary.forEach(p => {
  urlCounts[p.image] = (urlCounts[p.image] || 0) + 1;
});

console.log('Unique images:', Object.keys(urlCounts).length, 'Total products:', summary.length);
console.log('Duplicated image URLs:');
Object.entries(urlCounts).filter(([url, count]) => count > 1).forEach(([url, count]) => {
  const items = summary.filter(p => p.image === url).map(p => `[${p.id}] ${p.title}`);
  console.log(`\nCount ${count}: ${url}\n  Items:\n    ${items.join('\n    ')}`);
});
