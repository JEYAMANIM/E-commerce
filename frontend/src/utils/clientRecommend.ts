import { Product } from '../types';
import { BackendRecommendedProduct } from '../services/api';

/**
 * Semantic groups / taxonomy clusters.
 * When two items share matching semantic group keywords, they get a heavy similarity boost.
 * This guarantees items like phones/accessories, smartwatches, bags, shoes, audio gear, etc.
 * recommend tightly related items first.
 */
const SEMANTIC_CLUSTERS: Array<{ name: string; terms: RegExp[] }> = [
  {
    name: 'mobile_tech',
    terms: [
      /\bphone\b/i,
      /\bsmartphone\b/i,
      /\bmagsafe\b/i,
      /\bpower\s*bank\b/i,
      /\bcharger\b/i,
      /\bwireless\s*charger\b/i,
      /\bmobile\b/i,
      /\busb-c\b/i,
      /\bgan\b/i,
    ],
  },
  {
    name: 'wearables_smartwatch',
    terms: [
      /\bsmartwatch\b/i,
      /\bwatch\b/i,
      /\btracker\b/i,
      /\bfitness\b/i,
      /\bwearable\b/i,
      /\becg\b/i,
      /\bgps\b/i,
      /\bheart\s*rate\b/i,
    ],
  },
  {
    name: 'audio_headphones',
    terms: [
      /\bearbuds\b/i,
      /\bheadphones\b/i,
      /\bspeaker\b/i,
      /\bmicrophone\b/i,
      /\baudio\b/i,
      /\bbluetooth\b/i,
      /\bsound\b/i,
      /\bmic\b/i,
      /\bacoustic\b/i,
    ],
  },
  {
    name: 'computers_displays',
    terms: [
      /\blaptop\b/i,
      /\bmonitor\b/i,
      /\bdisplay\b/i,
      /\bmouse\b/i,
      /\bkeyboard\b/i,
      /\bmousepad\b/i,
      /\bdesk\s*mat\b/i,
      /\boled\b/i,
      /\b4k\b/i,
      /\bpc\b/i,
    ],
  },
  {
    name: 'bags_luggage',
    terms: [
      /\bbackpack\b/i,
      /\bbag\b/i,
      /\bhandbag\b/i,
      /\bwallet\b/i,
      /\btote\b/i,
      /\bcommuter\b/i,
      /\btravel\b/i,
      /\bpouch\b/i,
      /\bluggage\b/i,
    ],
  },
  {
    name: 'footwear',
    terms: [
      /\bsneaker\b/i,
      /\bsneakers\b/i,
      /\bshoes\b/i,
      /\bboots\b/i,
      /\brunning\b/i,
      /\bfootwear\b/i,
      /\bwalking\b/i,
      /\bathletic\b/i,
    ],
  },
  {
    name: 'apparel_clothing',
    terms: [
      /\bjacket\b/i,
      /\bhoodie\b/i,
      /\bshirt\b/i,
      /\bscarf\b/i,
      /\bhat\b/i,
      /\bleggings\b/i,
      /\bapparel\b/i,
      /\bclothing\b/i,
      /\bdenim\b/i,
      /\bcoat\b/i,
      /\bwear\b/i,
    ],
  },
  {
    name: 'skincare_beauty',
    terms: [
      /\bserum\b/i,
      /\bcream\b/i,
      /\bcleanser\b/i,
      /\bmask\b/i,
      /\blipstick\b/i,
      /\bmoisturizer\b/i,
      /\bskincare\b/i,
      /\bscrub\b/i,
      /\bcosmetics\b/i,
      /\bhair\b/i,
    ],
  },
  {
    name: 'kitchen_cooking',
    terms: [
      /\bespresso\b/i,
      /\bcoffee\b/i,
      /\bfrother\b/i,
      /\bskillet\b/i,
      /\bpan\b/i,
      /\bscale\b/i,
      /\bwine\b/i,
      /\bthermos\b/i,
      /\bkitchen\b/i,
      /\bbottle\b/i,
    ],
  },
  {
    name: 'fitness_exercise',
    terms: [
      /\bdumbbell\b/i,
      /\byoga\b/i,
      /\bmat\b/i,
      /\bbands\b/i,
      /\broller\b/i,
      /\bweights\b/i,
      /\btrekking\b/i,
      /\bexercise\b/i,
      /\bgym\b/i,
      /\bworkout\b/i,
    ],
  },
  {
    name: 'home_lighting_decor',
    terms: [
      /\blamp\b/i,
      /\blight\b/i,
      /\bsconce\b/i,
      /\bled\b/i,
      /\bdiffuser\b/i,
      /\bcandle\b/i,
      /\bvase\b/i,
      /\bpillow\b/i,
      /\bcushion\b/i,
      /\bblanket\b/i,
      /\bpurifier\b/i,
    ],
  },
];

/** Extract semantic clusters present in a product */
function getClusters(p: Product): Set<string> {
  const text = `${p.title ?? ''} ${p.category ?? ''} ${(p.tags ?? []).join(' ')} ${p.description ?? ''}`.toLowerCase();
  const clusters = new Set<string>();
  for (const cluster of SEMANTIC_CLUSTERS) {
    for (const term of cluster.terms) {
      if (term.test(text)) {
        clusters.add(cluster.name);
        break;
      }
    }
  }
  return clusters;
}

/** Score similarity between a query product and a candidate */
function scoreProduct(
  query: Product,
  candidate: Product,
  queryClusters: Set<string>,
): number {
  if (candidate.id === query.id) return -1; // exclude self

  let score = 0;

  // 1. Same exact category match (+80 points)
  const queryCat = (query.category || '').toLowerCase().trim();
  const candidateCat = (candidate.category || '').toLowerCase().trim();
  const isSameCategory = Boolean(queryCat && candidateCat && queryCat === candidateCat);
  if (isSameCategory) {
    score += 80;
  }

  // 2. Semantic cluster match (+120 points for each shared sub-category cluster)
  const candidateClusters = getClusters(candidate);
  let sharedClustersCount = 0;
  for (const c of queryClusters) {
    if (candidateClusters.has(c)) {
      sharedClustersCount++;
    }
  }
  if (sharedClustersCount > 0) {
    score += sharedClustersCount * 120;
  }

  // 3. Tag overlap (+25 points per matching tag)
  const queryTags = new Set((query.tags ?? []).map((t) => t.toLowerCase()));
  for (const tag of candidate.tags ?? []) {
    if (queryTags.has(tag.toLowerCase())) {
      score += 25;
    }
  }

  // 4. Title keyword overlap (+15 points per meaningful keyword)
  const stopWords = new Set([
    'and', 'the', 'for', 'with', 'from', 'to', 'in', 'of', 'a', 'an', 'pro',
    'pathi', 'ultra', 'set', 'pack', 'high', 'dual', 'heavy', 'duty',
  ]);
  const queryWords = new Set(
    (query.title ?? '')
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length >= 3 && !stopWords.has(w)),
  );
  for (const word of (candidate.title ?? '').toLowerCase().split(/\W+/)) {
    if (word.length >= 3 && !stopWords.has(word) && queryWords.has(word)) {
      score += 15;
    }
  }

  return score;
}

/**
 * Returns up to `topN` products most similar to `queryProduct` from `allProducts`.
 * Results are shaped as `BackendRecommendedProduct` so they drop in as a backend replacement.
 */
export function getClientRecommendations(
  queryProduct: Product,
  allProducts: Product[],
  topN = 16,
): BackendRecommendedProduct[] {
  const MAX_SCORE = 320; // ceiling for normalization (produces nice 30% - 95% matches)
  const queryClusters = getClusters(queryProduct);

  const scored = allProducts
    .map((p) => ({ p, score: scoreProduct(queryProduct, p, queryClusters) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  // If we have enough scored matches, take topN
  let results = scored.slice(0, topN);

  // Fallback: If fewer than 6 items matched (rare), fill with same-category or popular items
  if (results.length < Math.min(topN, 6)) {
    const existingIds = new Set(results.map((r) => r.p.id));
    existingIds.add(queryProduct.id);

    const sameCategoryFallback = allProducts.filter(
      (p) =>
        !existingIds.has(p.id) &&
        p.category &&
        queryProduct.category &&
        p.category.toLowerCase() === queryProduct.category.toLowerCase()
    );

    for (const p of sameCategoryFallback) {
      if (results.length >= topN) break;
      results.push({ p, score: 70 });
      existingIds.add(p.id);
    }

    if (results.length < topN) {
      const anyFallback = allProducts.filter((p) => !existingIds.has(p.id));
      for (const p of anyFallback) {
        if (results.length >= topN) break;
        results.push({ p, score: 40 });
        existingIds.add(p.id);
      }
    }
  }

  return results.map(({ p, score }) => ({
    stock_code: p.stockCode || p.id,
    description: p.title,
    similarity_score: Math.min(Math.max(score / MAX_SCORE, 0.25), 0.98),
  }));
}

