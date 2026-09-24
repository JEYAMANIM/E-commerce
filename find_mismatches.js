const fs = require('fs');

const summary = JSON.parse(fs.readFileSync('./products_summary.json', 'utf8'));

// Check for mismatches in products:
// Look at titles:
// pl-flag-01: Compound Microscope -> photo-1516321318423-f06f85e504b3 (this photo is a laptop code screen!) -> Microscope is NOT a laptop screen!
// Let's check what images are in products.ts!
summary.forEach((p, i) => {
  console.log(`${i}: ${p.id} | ${p.title}`);
});
