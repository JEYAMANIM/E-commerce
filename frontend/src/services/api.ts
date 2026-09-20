const API_BASE_URL = 'http://127.0.0.1:8000';

// ── Types ──────────────────────────────────────────────────────────────────

export interface HealthStatus {
  status: string;
  data_loaded: boolean;
  total_products: number;
  error?: string | null;
}

export interface BackendProduct {
  stock_code: string;
  description: string;
}

export interface BackendRecommendedProduct {
  stock_code: string;
  description: string;
  similarity_score: number;
}

export interface RecommendResponse {
  query_stock_code: string;
  query_description: string;
  method: string;
  recommendations: BackendRecommendedProduct[];
  processing_time_ms: number;
}

export interface HybridRecommendResponse {
  query_stock_code: string;
  query_description: string;
  content_recommendations: BackendRecommendedProduct[];
  collab_recommendations: BackendRecommendedProduct[];
  hybrid_recommendations: BackendRecommendedProduct[];
  processing_time_ms: number;
}

export interface TagPredictionResponse {
  input_text: string;
  tags: string[];
  tag_count: number;
  processing_time_ms: number;
}

export interface BackendProductsPage {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  products: BackendProduct[];
}

export { getProductImage, getFallbackImage } from '../utils/productImages';

// ── API helpers ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, timeoutMs = 5000): Promise<T | null> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(`${API_BASE_URL}${path}`, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ── Exported API functions ──────────────────────────────────────────────────

export const checkBackendHealth = async (): Promise<HealthStatus | null> =>
  apiFetch<HealthStatus>('/health', 3000);

export const fetchAllProducts = async (): Promise<BackendProduct[]> => {
  const res = await apiFetch<{ total: number; products: BackendProduct[] }>('/products/all', 15000);
  return res?.products ?? [];
};

export const fetchAllModelTags = async (): Promise<string[]> => {
  // Backend no longer has /tags — return empty; kept for backward compat
  return [];
};

export const fetchProducts = async (
  page = 1,
  pageSize = 50,
): Promise<BackendProductsPage | null> =>
  apiFetch<BackendProductsPage>(`/products?page=${page}&page_size=${pageSize}`);

export const searchProducts = async (
  q: string,
  limit = 20,
): Promise<BackendProduct[]> => {
  const res = await apiFetch<BackendProduct[]>(
    `/products/search?q=${encodeURIComponent(q)}&limit=${limit}`,
  );
  return res ?? [];
};

export const fetchContentRecommendations = async (
  stockCode: string,
  topN = 8,
): Promise<RecommendResponse | null> =>
  apiFetch<RecommendResponse>(
    `/recommend/content/${encodeURIComponent(stockCode)}?top_n=${topN}`,
  );

export const fetchCollabRecommendations = async (
  stockCode: string,
  topN = 8,
): Promise<RecommendResponse | null> =>
  apiFetch<RecommendResponse>(
    `/recommend/collab/${encodeURIComponent(stockCode)}?top_n=${topN}`,
  );

export const fetchHybridRecommendations = async (
  stockCode: string,
  topN = 8,
  contentWeight = 0.5,
): Promise<HybridRecommendResponse | null> =>
  apiFetch<HybridRecommendResponse>(
    `/recommend/hybrid/${encodeURIComponent(stockCode)}?top_n=${topN}&content_weight=${contentWeight}`,
  );

// Legacy – kept so AiTagStudioModal still compiles
export const predictProductTags = async (
  text?: string,
  title?: string,
  description?: string,
): Promise<TagPredictionResponse> => {
  const combined = `${text ?? ''} ${title ?? ''} ${description ?? ''}`.toLowerCase();
  const fallbackTags: string[] = [];
  if (/4k|tv|hdr/.test(combined)) fallbackTags.push('4k', 'display');
  if (/shirt|cotton|casual/.test(combined)) fallbackTags.push('casual', 'menswear');
  if (/skin|cleanser|acne/.test(combined)) fallbackTags.push('skincare', 'hydrating');
  if (/shoe|sneaker|running/.test(combined)) fallbackTags.push('footwear', 'sneakers');
  if (/audio|headphone|earbud/.test(combined)) fallbackTags.push('audio', 'headphones');
  if (/watch|smartwatch/.test(combined)) fallbackTags.push('smartwatch');
  return {
    input_text: text ?? `${title ?? ''} ${description ?? ''}`,
    tags: fallbackTags.length > 0 ? fallbackTags : ['decoration', 'gift'],
    tag_count: fallbackTags.length || 2,
    processing_time_ms: 0,
  };
};
