import React, { useState } from 'react';
import { X, Star, Check, ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw, ThumbsUp } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';
import { RecommendationsSection } from './RecommendationsSection';
import { getFallbackImage } from '../utils/productImages';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedCoupon?: boolean, quantity?: number) => void;
  onBuyNow: (product: Product, selectedCoupon?: boolean, quantity?: number) => void;
  onSelectStockCode?: (stockCode: string) => void;
  currency: CurrencyCode;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onSelectStockCode,
  currency,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    onAddToCart(product, applyCoupon, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const sampleReviews = [
    {
      author: 'Dr. Evelyn Reed',
      rating: 5,
      date: 'Sep 10, 2026',
      title: 'Exceeded all hospital and lab benchmarks',
      comment: 'Arrived the very next day in pristine packaging. Precision optical accuracy and seamless computer connectivity.',
      verified: true,
    },
    {
      author: 'Marcus K.',
      rating: 5,
      date: 'Aug 28, 2026',
      title: 'Top-tier build quality and performance',
      comment: 'I was blown away by the craftsmanship. Definitely worth every penny and the coupon was an extra bonus.',
      verified: true,
    },
    {
      author: 'Samantha L.',
      rating: 4,
      date: 'Aug 14, 2026',
      title: 'Great product, highly recommend',
      comment: 'Very easy to set up and works exactly as described. Battery life and durability have been top notch.',
      verified: true,
    },
  ];

  const ratingBars = [
    { stars: 5, pct: 76 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden relative border border-purple-100 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image & Badges */}
        <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col items-center justify-between relative border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-inner bg-white flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1';
                  img.src = getFallbackImage(product.stockCode || product.id);
                }
              }}
            />
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center text-[11px] text-gray-500">
            <div className="p-2 bg-white rounded-lg border border-gray-100">
              <Truck className="w-4 h-4 mx-auto text-purple-600 mb-1" />
              <span>Free 1-Day Ship</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-gray-100">
              <ShieldCheck className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
              <span>Pathi Certified</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-gray-100">
              <RotateCcw className="w-4 h-4 mx-auto text-blue-600 mb-1" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Tabs & Purchase Actions */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                {product.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-1 leading-snug">
                {product.title}
              </h2>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-400">
                  ({product.reviewCount.toLocaleString()} ratings)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">
                  {formatPrice(product.price, currency)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {product.hasCoupon && product.couponPercent && (
                <label className="mt-2 flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={applyCoupon}
                    onChange={(e) => setApplyCoupon(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                  />
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Coupon
                  </span>
                  <span className="font-semibold text-emerald-700">
                    Apply {product.couponPercent}% instant checkout discount
                  </span>
                </label>
              )}
            </div>

            {/* Nav Tabs (Overview, Specs, Reviews) */}
            <div className="flex border-b border-gray-200 text-xs font-bold gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 transition cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Overview &amp; Tags
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-3">
                {/* AI Model Predicted Tags */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-600" />
                    <span>Machine Learning Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-purple-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Features */}
                {product.features && (
                  <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Tab 2: Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 block text-[10px]">{key}</span>
                      <span className="font-semibold text-gray-800">{value}</span>
                    </div>
                  ))}
                  <div>
                    <span className="text-gray-400 block text-[10px]">Prime Shipping</span>
                    <span className="font-semibold text-emerald-600">Free Next-Day Delivery</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Return Policy</span>
                    <span className="font-semibold text-gray-800">30-Day Hassle-Free</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-3">
                {/* Rating Bar Distribution */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1 text-xs">
                  {ratingBars.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2">
                      <span className="w-8 text-gray-500 font-semibold">{r.stars} star</span>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-gray-400 font-mono text-[10px]">{r.pct}%</span>
                    </div>
                  ))}
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {sampleReviews.map((rev, i) => (
                    <div key={i} className="border-b border-gray-100 pb-2 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800">{rev.author}</span>
                        <span className="text-[10px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-400" />
                        ))}
                        <span className="text-[10px] text-emerald-600 font-bold ml-1">Verified Purchase</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-[11px]">{rev.title}</p>
                      <p className="text-gray-500 text-[11px]">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Backend Recommendations */}
          {product.stockCode && (
            <RecommendationsSection
              stockCode={product.stockCode}
              topN={8}
              onSelectProduct={onSelectStockCode}
              onAddToCart={(rec) => {
                // Convert backend recommendation to a minimal Product for the cart
                const recProduct: Product = {
                  id: rec.stock_code,
                  stockCode: rec.stock_code,
                  title: rec.description
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase()),
                  category: 'Home & Décor',
                  price: 9.99,
                  originalPrice: 12.99,
                  rating: 4.6,
                  reviewCount: 42,
                  image: rec.image,
                  inStock: true,
                  stockCount: 50,
                  hasPrime: true,
                  tags: ['recommended', 'vintage'],
                  description: rec.description,
                  features: ['UK retail catalogue authentic item', 'Customer favourite matching aesthetic'],
                  specs: { 'Catalogue Code': rec.stock_code },
                };
                onAddToCart(recProduct, false, 1);
              }}
            />
          )}

          {/* Quantity & Actions */}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-600 font-bold">
                In Stock ({product.stockCount} units available)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-100 text-purple-900 hover:bg-purple-200 border border-purple-300'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onBuyNow(product, applyCoupon, quantity);
                  onClose();
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
