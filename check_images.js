const fs = require('fs');

const summary = JSON.parse(fs.readFileSync('./products_summary.json', 'utf8'));

// Review each product title and its current image URL
summary.forEach((p) => {
  console.log(`${p.id.padEnd(12)} | ${p.category.padEnd(20)} | ${p.title.slice(0, 45).padEnd(45)} | ${p.image.slice(28, 55)}`);
});
