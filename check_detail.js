const fs = require('fs');

const summary = JSON.parse(fs.readFileSync('./products_summary.json', 'utf8'));

// Check each product
summary.forEach((p, idx) => {
  console.log(`[${idx}] ${p.id} | ${p.title} | ${p.image}`);
});
