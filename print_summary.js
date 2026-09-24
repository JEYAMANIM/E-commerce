const fs = require('fs');
const summary = JSON.parse(fs.readFileSync('./products_summary.json', 'utf8'));

console.log('--- PRODUCTS LIST ---');
summary.forEach((p) => {
  console.log(`[${p.id}] "${p.title}" (${p.category}) -> ${p.image}`);
});
