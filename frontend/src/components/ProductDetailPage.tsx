import React, { useState, useEffect } from 'react';
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

interface ProductDetailPageProps {
  product: Product;
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

  useEffect(() => {
    setQuantity(1);
    setApplyCoupon(false);
    setAddedAnim(false);
    setImgError(false);
    setActiveTab('overview');
    setRecTab('hybrid');
    setRecs([]);
    const el = document.getElementById('pdp-root');
    if (el) el.scrollTop = 0;
  }, [product.id]);

  useEffect(() => {
    if (!product.stockCode) return;
    setRecsLoading(true);
    setRecs([]);
    fetchHybridRecommendations(product.stockCode, 10, 0.5).then((data) => {
      setRecsLoading(false);
      if (!data) return;
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
  }, [product.stockCode, recTab]);

  const handleAdd = () => {
    onAddToCart(product, applyCoupon, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleToggleWishlist = () => {
    setWishlisted((w) => !w);
    onToggleWishlist?.(product);
  };

  return (
    <div
      id="pdp-root"
      className="fixed inset-0 z-[60] bg-[#f3f4f6] overflow-y-auto"
      style={{ animation: 'pdpSlideIn 0.28s cubic-bezier(0.25,0.46,0.45,0.94) both' }}
    >
      <style>{`
        @keyframes pdpSlideIn {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rec-anim { animation: fadeInUp 0.35s ease both; }
      `}</style>

      {/* Sticky top navigation */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition group cursor-pointer"
          >
            <span className="p-1.5 rounded-full bg-gray-100 group-hover:bg-purple-100 transition">
              <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
            </span>
            <span>Back to Products</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 font-medium min-w-0">
            <span className="hover:text-purple-600 cursor-pointer transition" onClick={onClose}>
              All Products
            </span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-gray-700 font-semibold truncate max-w-[260px]">{product.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full border transition cursor-pointer ${
                wishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-purple-600 hover:border-purple-300 transition cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Left: Product Image */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src={imgError ? getFallbackImage(product.title) : product.image}
                alt={product.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
              />
              {discountPct > 0 && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  -{discountPct}% OFF
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Award className="w-3 h-3" /> Best Seller
                </span>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100 mt-6 text-center">
              <div className="flex flex-col items-center p-2 rounded-xl bg-purple-50/60">
                <Truck className="w-5 h-5 text-purple-600 mb-1" />
                <span className="text-xs font-semibold text-gray-800">Free Delivery</span>
                <span className="text-[10px] text-gray-400">Orders over $50</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50/60">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-xs font-semibold text-gray-800">Authentic</span>
                <span className="text-[10px] text-gray-400">100% Guaranteed</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50/60">
                <RotateCcw className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-semibold text-gray-800">Easy Returns</span>
                <span className="text-[10px] text-gray-400">30-day window</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Purchase */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                {product.stockCode && (
                  <span className="text-xs text-gray-400 font-mono">
                    SKU: {product.stockCode}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-400">({product.reviewCount} verified customer reviews)</span>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> {product.inStock ? 'In Stock' : 'Low Stock'}
                </span>
              </div>

              {/* Price block */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/70 border border-gray-200/60 mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-gray-900">
                    {formatPrice(applyCoupon ? product.price * 0.9 : product.price, currency)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  {applyCoupon && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Extra {product.couponPercent || 10}% applied
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Taxes included. Free shipping on eligible orders.</p>

                {/* Coupon check */}
                {product.hasCoupon && (
                  <label className="flex items-center gap-2.5 mt-3 pt-3 border-t border-gray-200/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={applyCoupon}
                      onChange={(e) => setApplyCoupon(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
                    />
                    <Tag className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-700">
                      Apply promo code <strong className="text-purple-700 font-bold">SAVE{product.couponPercent || 10}</strong> ({product.couponPercent || 10}% off)
                    </span>
                  </label>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition font-bold text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-900 bg-white py-1.5">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition font-bold text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-400">({product.stockCount} items available)</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
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
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Zap className="w-4 h-4" /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
          <div className="flex border-b border-gray-200 gap-8 mb-6">
            {(['overview', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold capitalize transition border-b-2 -mb-[2px] cursor-pointer ${
                  activeTab === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
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
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Highlights</h4>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((t, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-gray-50 flex justify-between text-sm">
                <span className="text-gray-500">SKU / Stock Code</span>
                <span className="font-bold text-gray-800 font-mono">{product.stockCode || 'N/A'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="font-bold text-gray-800">{product.category}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 flex justify-between text-sm">
                <span className="text-gray-500">Availability</span>
                <span className="font-bold text-emerald-600">{product.stockCount} units in stock</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 flex justify-between text-sm">
                <span className="text-gray-500">Condition</span>
                <span className="font-bold text-gray-800">Brand New / 100% Authentic</span>
              </div>
              {product.specs && Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="p-3.5 rounded-xl bg-gray-50 flex justify-between text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-bold text-gray-800">{v}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Rating summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-gray-50 mb-6">
                <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-200 pb-4 sm:pb-0">
                  <span className="text-5xl font-black text-gray-900 mb-1">{product.rating.toFixed(1)}</span>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Based on {product.reviewCount} ratings</span>
                </div>
                <div className="sm:col-span-2 flex flex-col justify-center space-y-1.5">
                  {RATING_BARS.map((b) => (
                    <div key={b.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-3 font-semibold text-gray-600">{b.stars}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${b.pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-gray-400">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-4">
                {(product.reviews || SAMPLE_REVIEWS).map((r, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-100 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={r.avatar} alt={r.author} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-800">{r.author}</span>
                            {r.verified && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400">{r.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(Math.round(r.rating))].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h5 className="text-xs font-bold text-gray-900 mb-1">{r.title}</h5>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">{r.comment}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <ThumbsUp className="w-3 h-3" /> Helpful (12)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-md mb-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Engine
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Customers Also Viewed & Bought
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                100% matched using collaborative purchase patterns & content feature vectors
              </p>
            </div>

            {/* Model switcher tab */}
            <div className="inline-flex p-1 rounded-xl bg-gray-100 self-start sm:self-auto">
              {(['hybrid', 'content', 'collab'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setRecTab(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                    recTab === mode
                      ? 'bg-white text-purple-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {mode === 'hybrid' ? '⚡ Hybrid ML' : mode === 'content' ? '🎯 Content-Based' : '👥 Collaborative'}
                </button>
              ))}
            </div>
          </div>

          {/* Recs Grid */}
          {recsLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-3" />
              <span className="text-sm font-semibold">Calculating similarity scores...</span>
            </div>
          ) : recs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No recommendations found for this item.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recs.map((rec, idx) => {
                const matchPct = Math.round((rec.similarity_score || 0) * 100);
                const recProduct = convertBackendProduct(rec);
                return (
                  <div
                    key={rec.stock_code || idx}
                    className="rec-anim group bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between cursor-pointer"
                    onClick={() => onSelectProduct(rec.stock_code)}
                  >
                    <div>
                      {/* Image + Match % */}
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2.5 flex items-center justify-center">
                        <img
                          src={rec.image}
                          alt={rec.description}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = getFallbackImage(rec.description);
                          }}
                        />
                        <span className="absolute top-1.5 right-1.5 bg-purple-600/90 backdrop-blur text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow">
                          {matchPct > 0 ? `${matchPct}% Match` : 'Related'}
                        </span>
                      </div>

                      {/* Stock Code */}
                      <span className="text-[10px] font-mono text-gray-400 block mb-0.5">
                        {rec.stock_code}
                      </span>

                      {/* Description */}
                      <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition leading-snug mb-2">
                        {rec.description}
                      </h4>
                    </div>

                    <div>
                      {/* Price & Add */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-sm font-black text-gray-900">
                          {formatPrice(recProduct.price, currency)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(recProduct);
                          }}
                          className="p-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition cursor-pointer"
                          title="Add to Cart"
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
        </div>
      </div>
    </div>
  );
};
