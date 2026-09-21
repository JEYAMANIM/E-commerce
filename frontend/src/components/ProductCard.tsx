import React, { useState } from 'react';
import { Star, Heart, Check, ShoppingCart, Eye, Sparkles, Zap, Scale } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';
import { DealCountdown } from './DealCountdown';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedCoupon?: boolean) => void;
  onQuickView: (product: Product) => void;
  onFilterByTag?: (tag: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  currency: CurrencyCode;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onFilterByTag,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  currency,
}) => {
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, applyCoupon);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="bg-white rounded-xl border border-gray-200 hover:border-purple-400/60 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between relative group cursor-pointer"
    >
      {/* Top Badges & Wishlist & Compare */}
      <div className="flex items-start justify-between gap-2 mb-2 z-10">
        <div className="flex flex-wrap gap-1 items-center">
          {product.isBestSeller && (
            <span className="bg-[#e67a00] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
              #1 Best Seller
            </span>
          )}
          {product.isPathiChoice && (
            <span className="bg-[#0f172a] text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-purple-500/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
              Pathi's <span className="text-white">Choice</span>
            </span>
          )}
          {product.isLimitedDeal && (
            <span className="bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-0.5 rounded">
              Limited Deal
            </span>
          )}
        </div>

        {/* Action icons (Wishlist + Compare) */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onToggleCompare(product)}
            className={`p-1.5 rounded-full transition ${
              isCompared
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-400 hover:text-purple-600 hover:bg-gray-100'
            }`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-1.5 rounded-full backdrop-blur-md transition ${
              isWishlisted
                ? 'text-rose-500 bg-rose-50'
                : 'text-gray-400 hover:text-rose-500 hover:bg-gray-100'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.fallback) {
              img.dataset.fallback = '1';
              const seed = (product.stockCode || product.id || 'item').replace(/[^a-z0-9]/gi, '').toLowerCase();
              img.src = `https://picsum.photos/seed/${seed}/600/600`;
            }
          }}
        />

        {/* Deal Countdown Floating Pill */}
        {product.isLimitedDeal && (
          <div className="absolute top-2 left-2 z-10 shadow-sm">
            <DealCountdown />
          </div>
        )}

        {/* Quick View Floating Button on Hover & Mobile Visible */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          aria-label={`View details and recommendations for ${product.title}`}
          className="absolute bottom-2 inset-x-2 sm:inset-x-4 bg-white/95 hover:bg-white text-purple-900 text-[11px] sm:text-xs font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg shadow-lg backdrop-blur-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition duration-200 flex items-center justify-center gap-1 sm:gap-1.5 border border-purple-100"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600 animate-pulse flex-shrink-0" />
          <span className="truncate">View Product</span>
        </button>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & StockCode */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block">
              {product.category}
            </span>
            {product.stockCode && (
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-bold">
                #{product.stockCode}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-purple-600 transition mb-1.5">
            {product.title}
          </h3>

          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700">{product.rating}</span>
            <span className="text-[11px] text-gray-400">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price Section */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-gray-900 leading-none">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Coupon Checkbox */}
            {product.hasCoupon && product.couponPercent && (
              <label 
                onClick={(e) => e.stopPropagation()}
                className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={applyCoupon}
                  onChange={(e) => setApplyCoupon(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5"
                />
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  Coupon
                </span>
                <span className="text-[11px]">
                  Apply {product.couponPercent}% savings
                </span>
              </label>
            )}
          </div>

          {/* Prime / Delivery info */}
          <div className="text-[11px] text-gray-600 space-y-0.5 mb-2.5">
            {product.hasPrime ? (
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-purple-700 text-xs italic tracking-tighter">
                  pathi<span className="text-amber-500 font-black">prime</span>
                </span>
                <span className="text-gray-500">FREE One-Day</span>
              </div>
            ) : (
              <span className="text-gray-500">Standard Delivery</span>
            )}
            <div className="text-gray-500 font-medium">
              Get it by <strong className="text-gray-800 font-semibold">Tomorrow, 2 PM</strong>
            </div>
            {product.stockCount < 20 && (
              <div className="text-rose-600 text-[10px] font-bold">
                Only {product.stockCount} left in stock - order soon.
              </div>
            )}
          </div>

          {/* Model Predicted AI Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="pt-2 border-t border-gray-100 mb-3">
              <div className="flex items-center gap-1 text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">
                <Zap className="w-2.5 h-2.5 text-purple-600" />
                <span>AI Predicted Tags</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 4).map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onFilterByTag) onFilterByTag(tag);
                    }}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/70 text-[10px] font-semibold px-2 py-0.5 rounded-full transition"
                    title={`Filter by tag #${tag}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          aria-label={`Add ${product.title} to cart`}
          className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/20 hover:shadow-md'
          }`}
        >
          {isAdded ? (
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
      </div>
    </div>
  );
};
