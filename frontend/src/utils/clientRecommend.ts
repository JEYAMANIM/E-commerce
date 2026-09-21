/**
 * Client-side recommendation engine.
 * Used as a fallback when the backend API (localhost:8000) is unreachable
 * (e.g., on mobile / production where the local server isn't running).
 *
 * Scoring algorithm:
 *  - +50 points : same category (exact match)
 *  - +20 points : shared tags (per tag)
 *  - +10 points : shared title keyword (3+ chars)
 *  - Sorted descending, self excluded
 */

import { Product } from '../types';
import { BackendRecommendedProduct } from '../services/api';

/** Score similarity between a query product and a candidate */
function scoreProduct(query: Product, candidate: Product): number {
  if (candidate.id === query.id) return -1; // exclude self

  let score = 0;

  // Category match
  if (
    candidate.category &&
    query.category &&
    candidate.category.toLowerCase() === query.category.toLowerCase()
  ) {
    score += 50;
  }

  // Tag overlap
  const queryTags = new Set((query.tags ?? []).map((t) => t.toLowerCase()));
  for (const tag of candidate.tags ?? []) {
    if (queryTags.has(tag.toLowerCase())) score += 20;
  }

  // Title keyword overlap (simple tokenization)
  const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'to', 'in', 'of', 'a', 'an']);
  const queryWords = new Set(
    (query.title ?? '')
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length >= 3 && !stopWords.has(w)),
  );
  for (const word of (candidate.title ?? '').toLowerCase().split(/\W+/)) {
    if (word.length >= 3 && !stopWords.has(word) && queryWords.has(word)) score += 10;
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
  topN = 12,
): BackendRecommendedProduct[] {
  const MAX_SCORE = 300; // practical ceiling for normalisation

  const scored = allProducts
    .map((p) => ({ p, score: scoreProduct(queryProduct, p) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scored.map(({ p, score }) => ({
    stock_code: p.stockCode || p.id,
    description: p.title,
    similarity_score: Math.min(score / MAX_SCORE, 1),
  }));
}
