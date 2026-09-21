import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Star, ShoppingCart, Zap, ShieldCheck, Truck,
  RotateCcw, Check, Package, Tag, ChevronRight, Sparkles,
  ThumbsUp, Award, Heart, Share2, Loader2,
} from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';
import { getFallbackImage } from '../utils/productImages';
import { fetchHybridRecommendations, getProductImage, type BackendRecommendedProduct } from '../services/api';
import { convertBackendProduct } from '../utils/productConverter';
import { getClientRecommendations } from '../utils/clientRecommend';

interface ProductDetailPageProps {
  product: Product;
  allProducts?: Product[]; // all products for client-side fallback recommendations
  onClose: () => void;
  onAddToCart: (product: Product, selectedCoupon?: boolean, quantity?: number) => void;
  onBuyNow: (product: Product, selectedCoupon?: boolean, quantity?: number) => void;
  onSelectProduct: (stockCode: string) => void;
  currency: CurrencyCode;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

interface RecProduct extends BackendRecommendedProduct {
  image: string;
}

const RATING_BARS = [
  { stars: 5, pct: 76 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

const SAMPLE_REVIEWS = [
  {
    author: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Sep 14, 2026',
    title: 'Stunning quality exceeded my expectations',
    comment: 'The finish and craftsmanship are exceptional. Beautiful addition to our home decor.',
    helpful: 48,
    verified: true,
  },
  {
    author: 'Arthur Pendleton',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Aug 29, 2026',
    title: 'Fast shipping and excellent packaging',
    comment: 'Very pleased. Arrived within two days and matches the description perfectly.',
    helpful: 31,
    verified: true,
  },
  {
    author: 'Samantha L.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80',
    rating: 4,
    date: 'Aug 14, 2026',
    title: 'Great product, highly recommend',
    comment: 'Very easy to set up and works exactly as described. Top notch quality.',
    helpful: 19,
    verified: true,
  },
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts = [],
  onClose,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  currency,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [recTab, setRecTab] = useState<'hybrid' | 'content' | 'collab'>('hybrid');
  const [recs, setRecs] = useState<RecProduct[]>([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const discountPct =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Cache refs — must be declared before effects that use them
  const cachedData = useRef<import('../services/api').HybridRecommendResponse | null>(null);
  const clientFallbackRecs = useRef<RecProduct[]>([]);

  useEffect(() => {
    setQuantity(1);
    setApplyCoupon(false);
    setAddedAnim(false);
    setImgError(false);
    setActiveTab('overview');
    setRecTab('hybrid');
    setRecs([]);
    clientFallbackRecs.current = []; // clear client cache on product change
    const el = document.getElementById('pdp-root');
    if (el) el.scrollTop = 0;
  }, [product.id]);


  // Fetch recommendations when the product changes (not on tab change)
  // Use both product.id and product.stockCode so effect fires on every product switch
  const effectiveStockCode = product.stockCode || product.id;
  useEffect(() => {
    if (!effectiveStockCode) return;
    setRecsLoading(true);
    setRecs([]);
    cachedData.current = null;
    fetchHybridRecommendations(effectiveStockCode, 16, 0.7).then((data) => {
      setRecsLoading(false);
      if (!data) {
        // Backend unreachable (e.g. on mobile/production) — use client-side fallback
        if (allProducts.length > 0) {
          const clientRecs = getClientRecommendations(product, allProducts, 16);
          const mapped = clientRecs.map((r) => ({
            ...r,
            image: getProductImage(r.description, r.stock_code),
          }));
          clientFallbackRecs.current = mapped; // cache so tab switches keep recs
          setRecs(mapped);
        }
        return;
      }
      cachedData.current = data;
      const src =
        recTab === 'collab'
          ? data.collab_recommendations
          : recTab === 'content'
          ? data.content_recommendations
          : data.hybrid_recommendations;
      setRecs(
        src.map((r) => ({
          ...r,
          image: getProductImage(r.description, r.stock_code),
        }))
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, product.stockCode]);

  // When the user switches tabs, re-filter from backend cache OR keep client-side recs
  useEffect(() => {
    const data = cachedData.current;
    if (!data) {
      // In client-side fallback mode: tab switching has no backend to filter from,
      // so just restore the cached client recs (they stay the same across tabs)
      if (clientFallbackRecs.current.length > 0) {
        setRecs(clientFallbackRecs.current);
      }
      return;
    }
    const src =
      recTab === 'collab'
        ? data.collab_recommendations
        : recTab === 'content'
        ? data.content_recommendations
        : data.hybrid_recommendations;
    setRecs(
      src.map((r) => ({
        ...r,
        image: getProductImage(r.description, r.stock_code),
      }))
    );
  }, [recTab]);

  const handleAdd = () => {
    onAddToCart(product, applyCoupon, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleToggleWishlist = () => {
    setWishlisted((w) => !w);
    onToggleWishlist?.(product);
  };

  const effectivePrice = applyCoupon ? product.price * 0.9 : product.price;

  return (
    <div
      id="pdp-root"
      className="fixed inset-0 z-[60] bg-[#f8fafc] overflow-y-auto overscroll-contain transition-all duration-300"
      style={{ animation: 'pdpSlideIn 0.28s cubic-bezier(0.25,0.46,0.45,0.94) both' }}
    >
      <style>{`
        @keyframes pdpSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rec-anim { animation: fadeInUp 0.35s ease both; }
      `}</style>

      {/* Sticky top navigation - Fully responsive for mobile/tablet/desktop */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-purple-600 transition group cursor-pointer flex-shrink-0"
            aria-label="Back to Products"
          >
            <span className="p-1.5 rounded-full bg-slate-100 group-hover:bg-purple-100 transition">
              <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-purple-600" />
            </span>
            <span className="hidden xs:inline">Back to Products</span>
            <span className="xs:hidden">Back</span>
          </button>

          <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium min-w-0 flex-1 max-w-xl mx-4 truncate">
            <span className="hover:text-purple-600 cursor-pointer transition flex-shrink-0" onClick={onClose}>
              Products
            </span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-slate-300" />
            <span className="hover:text-purple-600 cursor-pointer transition flex-shrink-0">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-slate-300" />
            <span className="text-slate-800 font-semibold truncate">{product.title}</span>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full border transition cursor-pointer ${
                wishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200'
              }`}
              title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.title, text: product.description, url: window.location.href }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Product link copied to clipboard!');
                }
              }}
              className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-purple-600 hover:border-purple-300 transition cursor-pointer"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main responsive container: auto adapts from mobile (<640px), tablet (640-1024px), desktop (1024-1536px), up to ultra-wide (2xl) */}
      <main className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-36 sm:pb-12 lg:pb-12">

        {/* Hero Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 mb-8 sm:mb-12">

          {/* Left: Product Image & Trust Badges (5 cols on lg, 6 on 2xl) */}
          <div className="lg:col-span-5 xl:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="relative w-full aspect-square max-h-[320px] sm:max-h-[460px] lg:max-h-[520px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-3 sm:p-6">
              <img
                src={imgError ? getFallbackImage(product.title) : product.image}
                alt={product.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 will-change-transform"
                loading="eager"
              />
              {discountPct > 0 && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-md">
                  -{discountPct}% OFF
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Award className="w-3 h-3" /> Best Seller
                </span>
              )}
            </div>

            {/* Responsive Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-slate-100 mt-4 sm:mt-6 text-center">
              <div className="flex flex-col items-center p-2 rounded-xl bg-purple-50/70">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mb-0.5 sm:mb-1" />
                <span className="text-[11px] sm:text-xs font-semibold text-slate-800">Free Delivery</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400">Over $50</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50/70">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mb-0.5 sm:mb-1" />
                <span className="text-[11px] sm:text-xs font-semibold text-slate-800">Authentic</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400">Guaranteed</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50/70">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mb-0.5 sm:mb-1" />
                <span className="text-[11px] sm:text-xs font-semibold text-slate-800">Easy Returns</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400">30-day window</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Purchase Controls (7 cols on lg, 6 on 2xl) */}
          <div className="lg:col-span-7 xl:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                {product.stockCode && (
                  <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                    SKU: {product.stockCode}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug sm:leading-tight mb-3">
                {product.title}
              </h1>

              {/* Rating & Stock Status */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-slate-500">({product.reviewCount} customer reviews)</span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> {product.inStock ? 'In Stock' : 'Low Stock'}
                </span>
              </div>

              {/* Dynamic Price Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/80 mb-5 sm:mb-6">
                <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3 mb-1">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                    {formatPrice(effectivePrice, currency)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm sm:text-base text-slate-400 line-through">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  {applyCoupon && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Extra {product.couponPercent || 10}% applied
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">Taxes included. Free delivery for registered members.</p>

                {/* Promo Code Toggle */}
                {product.hasCoupon && (
                  <label className="flex items-center gap-2.5 mt-3 pt-3 border-t border-slate-200/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={applyCoupon}
                      onChange={(e) => setApplyCoupon(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
                    />
                    <Tag className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-slate-700">
                      Apply promo code <strong className="text-purple-700 font-bold">SAVE{product.couponPercent || 10}</strong> ({product.couponPercent || 10}% off)
                    </span>
                  </label>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 sm:mb-6">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-inner">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition font-bold text-base sm:text-lg cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 sm:w-10 text-center font-bold text-xs sm:text-sm text-slate-900 bg-white py-1.5">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition font-bold text-base sm:text-lg cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">({product.stockCount} items available)</span>
              </div>
            </div>

            {/* Desktop / Tablet Action Buttons (Hidden on small mobile screen, handled by fixed bottom bar) */}
            <div className="hidden sm:block space-y-3 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                    addedAnim
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-2 border-purple-600 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  {addedAnim ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => onBuyNow(product, applyCoupon, quantity)}
                  className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Zap className="w-4 h-4" /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Info Section (Overview / Specs / Reviews) */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200/70 mb-8 sm:mb-12">
          <div className="flex border-b border-slate-200 gap-4 sm:gap-8 mb-6 overflow-x-auto no-scrollbar">
            {(['overview', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs sm:text-sm font-bold capitalize transition border-b-2 -mb-[2px] whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab === 'overview' && 'Product Overview'}
                {tab === 'specs' && 'Specifications'}
                {tab === 'reviews' && `Reviews (${product.reviewCount})`}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Tags</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {product.tags.map((t, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 flex justify-between text-xs sm:text-sm">
                <span className="text-slate-500">Catalogue / SKU</span>
                <span className="font-bold text-slate-800 font-mono">{product.stockCode || 'N/A'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 flex justify-between text-xs sm:text-sm">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-800">{product.category}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 flex justify-between text-xs sm:text-sm">
                <span className="text-slate-500">Stock Availability</span>
                <span className="font-bold text-emerald-600">{product.stockCount} units</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 flex justify-between text-xs sm:text-sm">
                <span className="text-slate-500">Condition</span>
                <span className="font-bold text-slate-800">Brand New / Authentic</span>
              </div>
              {product.specs && Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="p-3.5 rounded-xl bg-slate-50 flex justify-between text-xs sm:text-sm">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-bold text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Rating summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-slate-50 mb-6">
                <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-200 pb-4 sm:pb-0">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 mb-1">{product.rating.toFixed(1)}</span>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">Based on {product.reviewCount} ratings</span>
                </div>
                <div className="sm:col-span-2 flex flex-col justify-center space-y-1.5">
                  {RATING_BARS.map((b) => (
                    <div key={b.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-3 font-semibold text-slate-600">{b.stars}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${b.pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-slate-400">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-3 sm:space-y-4">
                {(product.reviews || SAMPLE_REVIEWS).map((r, i) => (
                  <div key={i} className="p-3.5 sm:p-4 rounded-xl border border-slate-100 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <img src={r.avatar} alt={r.author} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" />
                        <div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-xs font-bold text-slate-800">{r.author}</span>
                            {r.verified && (
                              <span className="text-[9px] sm:text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{r.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(Math.round(r.rating))].map((_, j) => (
                          <Star key={j} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900 mb-1">{r.title}</h5>
                    <p className="text-xs text-slate-600 mb-2 leading-relaxed">{r.comment}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <ThumbsUp className="w-3 h-3" /> Helpful (12)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* AI Recommendations Section - Responsive Grid */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200/70">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-md mb-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Engine
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900">
                {recs.length > 0
                  ? `More Like This${product.category ? ` · ${product.category}` : ''}`
                  : 'Similar Products You May Like'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Matched by category similarity, description keywords &amp; purchase patterns · {recs.length > 0 ? `${recs.length} related items found` : 'Calculating...'}
              </p>
            </div>

            {/* Model switcher tab */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 self-start md:self-auto overflow-x-auto max-w-full">
              {(['hybrid', 'content', 'collab'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setRecTab(mode)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold capitalize transition whitespace-nowrap cursor-pointer ${
                    recTab === mode
                      ? 'bg-white text-purple-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {mode === 'hybrid' ? '⚡ Hybrid ML' : mode === 'content' ? '🎯 Content-Based' : '👥 Collaborative'}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations Grid: 1 col on xs, 2 on sm, 3 on md, 4 on lg, 5 on xl, 6 on 2xl */}
          {recsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-3" />
              <span className="text-xs sm:text-sm font-semibold">Calculating similarity scores...</span>
            </div>
          ) : recs.length === 0 ? (
            <div className="text-center py-10 sm:py-12 text-slate-400">
              <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs sm:text-sm">No recommendations found for this item.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
              {recs.map((rec, idx) => {
                const matchPct = Math.round((rec.similarity_score || 0) * 100);
                const recProduct = convertBackendProduct(rec);
                return (
                  <div
                    key={rec.stock_code || idx}
                    className="rec-anim group bg-white rounded-xl sm:rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer"
                    onClick={() => onSelectProduct(rec.stock_code)}
                  >
                    <div>
                      {/* Image + Match % badge */}
                      <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-slate-50 mb-2 flex items-center justify-center">
                        <img
                          src={rec.image}
                          alt={rec.description}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = getFallbackImage(rec.description);
                          }}
                          loading="lazy"
                        />
                        <span className="absolute top-1.5 right-1.5 bg-purple-600/90 backdrop-blur text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow">
                          {matchPct > 0 ? `${matchPct}% Match` : 'Related'}
                        </span>
                      </div>

                      {/* Stock Code */}
                      <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block mb-0.5">
                        {rec.stock_code}
                      </span>

                      {/* Description */}
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-purple-600 transition leading-snug mb-2">
                        {rec.description}
                      </h4>
                    </div>

                    <div>
                      {/* Price & Add */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs sm:text-sm font-black text-slate-900">
                          {formatPrice(recProduct.price, currency)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(recProduct);
                          }}
                          className="p-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition cursor-pointer"
                          title="Add to Cart"
                          aria-label="Add recommendation to cart"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Mobile Sticky Bottom CTA Bar (visible on xs/mobile devices, hidden on sm+) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-2 shadow-lg">
        <div className="flex flex-col min-w-0 pr-1">
          <span className="text-xs text-slate-400 leading-tight">Total Price</span>
          <span className="text-base font-black text-slate-900 leading-tight truncate">
            {formatPrice(effectivePrice * quantity, currency)}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 max-w-[220px]">
          <button
            onClick={handleAdd}
            className={`flex-1 py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer shadow-sm ${
              addedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-white border-2 border-purple-600 text-purple-700'
            }`}
          >
            {addedAnim ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" />
            )}
            <span>{addedAnim ? 'Added' : 'Cart'}</span>
          </button>
          <button
            onClick={() => onBuyNow(product, applyCoupon, quantity)}
            className="flex-1 py-2.5 px-2 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 flex items-center justify-center gap-1 transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
