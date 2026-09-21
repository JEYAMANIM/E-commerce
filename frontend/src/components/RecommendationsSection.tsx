import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, ShoppingCart, Loader2 } from 'lucide-react';
import {
  fetchHybridRecommendations,
  getProductImage,
  getFallbackImage,
  type BackendRecommendedProduct,
  type HybridRecommendResponse,
} from '../services/api';
import { getClientRecommendations } from '../utils/clientRecommend';
import { type Product } from '../types';

interface RecommendationsSectionProps {
  /** The stock code to fetch recommendations for (from products_df.pkl index) */
  stockCode: string;
  /** The full Product object (for client-side fallback when backend is offline) */
  queryProduct?: Product;
  /** All products list (for client-side fallback) */
  allProducts?: Product[];
  /** Called when user clicks "Add" on a recommendation */
  onAddToCart?: (item: BackendRecommendedProduct & { image: string }) => void;
  /** Called when user clicks a recommendation card to view it */
  onSelectProduct?: (stockCode: string) => void;
  topN?: number;
}

interface RecProduct extends BackendRecommendedProduct {
  image: string;
  imgError: boolean;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  stockCode,
  queryProduct,
  allProducts = [],
  onAddToCart,
  onSelectProduct,
  topN = 8,
}) => {
  const [items, setItems] = useState<RecProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'hybrid' | 'content' | 'collab'>('hybrid');
  const cachedResponse = useRef<HybridRecommendResponse | null>(null);

  // Fetch when stockCode changes - cache the full response
  useEffect(() => {
    if (!stockCode) return;
    setLoading(true);
    setItems([]);
    cachedResponse.current = null;

    fetchHybridRecommendations(stockCode, topN, 0.5).then((data) => {
      setLoading(false);
      if (!data) {
        // Backend unreachable — use client-side fallback
        if (queryProduct && allProducts.length > 0) {
          const clientRecs = getClientRecommendations(queryProduct, allProducts, topN);
          setItems(
            clientRecs.map((r) => ({
              ...r,
              image: getProductImage(r.description, r.stock_code),
              imgError: false,
            }))
          );
        }
        return;
      }
      cachedResponse.current = data;

      const source =
        tab === 'collab'
          ? data.collab_recommendations
          : tab === 'content'
          ? data.content_recommendations
          : data.hybrid_recommendations;

      setItems(
        source.map((r) => ({
          ...r,
          image: getProductImage(r.description, r.stock_code),
          imgError: false,
        })),
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockCode, topN]);

  // When tab changes, re-filter from cache — no new HTTP call needed
  useEffect(() => {
    const data = cachedResponse.current;
    if (!data) return;
    const source =
      tab === 'collab'
        ? data.collab_recommendations
        : tab === 'content'
        ? data.content_recommendations
        : data.hybrid_recommendations;
    setItems(
      source.map((r) => ({
        ...r,
        image: getProductImage(r.description, r.stock_code),
        imgError: false,
      })),
    );
  }, [tab]);

  if (!stockCode) return null;

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Related Recommendations
          </span>
          <span className="text-[10px] text-gray-400 font-medium">· ML Matrix</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5 text-[10px] font-bold">
          {(['hybrid', 'content', 'collab'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-2 py-1 rounded-md transition capitalize cursor-pointer ${
                tab === t
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Rail */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-8 text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
          <span className="text-xs">Computing similarity scores…</span>
        </div>
      ) : items.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-6">
          No recommendations available for this product.
        </p>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {items.map((item) => (
            <div
              key={item.stock_code}
              className="flex-none w-36 snap-start group relative rounded-xl border border-gray-200 hover:border-purple-400 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Similarity badge */}
              <div className="absolute top-1.5 right-1.5 z-10 bg-purple-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm shadow">
                {Math.round(item.similarity_score * 100)}% match
              </div>

              {/* Product image */}
              <div
                onClick={() => onSelectProduct?.(item.stock_code)}
                className="w-full h-28 bg-gray-100 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = getFallbackImage(item.stock_code);
                    }
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] text-gray-400 font-mono mb-0.5">{item.stock_code}</p>
                  <p
                    onClick={() => onSelectProduct?.(item.stock_code)}
                    className="text-[11px] font-semibold text-gray-800 leading-tight line-clamp-2 mb-2 hover:text-purple-700 cursor-pointer"
                    title={item.description}
                  >
                    {item.description
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </p>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  {onSelectProduct && (
                    <button
                      onClick={() => onSelectProduct(item.stock_code)}
                      className="flex-1 text-[10px] font-semibold py-1 px-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer text-center"
                    >
                      View
                    </button>
                  )}
                  {onAddToCart && (
                    <button
                      onClick={() => onAddToCart(item)}
                      className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1 px-1.5 rounded-lg bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 hover:border-purple-600 transition-all duration-150 cursor-pointer"
                    >
                      <ShoppingCart className="w-2.5 h-2.5" />
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
