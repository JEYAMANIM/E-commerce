import React from 'react';
import { X, Star, Trash2, ShoppingCart, ArrowRight, Zap, Check } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveFromCompare: (id: string) => void;
  onAddToCart: (product: Product) => void;
  currency: CurrencyCode;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveFromCompare,
  onAddToCart,
  currency,
}) => {
  if (!isOpen) return null;

  // Extract all unique spec keys across the compared products
  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs || {})))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden border border-purple-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-purple-900/40">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">
              Product Comparison Matrix ({products.length} items)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto">
          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm font-semibold">No products selected for comparison.</p>
              <p className="text-xs text-gray-400 mt-1">Click the "Compare" checkbox on any product card to add it here.</p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              {/* Product Cards Row */}
              <div className="grid grid-cols-5 gap-3 border-b border-gray-200 pb-4">
                <div className="col-span-1 flex items-end pb-2 font-bold text-xs text-gray-400 uppercase tracking-wider">
                  Product Overview
                </div>
                {products.map((p) => (
                  <div key={p.id} className="col-span-1 flex flex-col justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 relative group">
                    <button
                      onClick={() => onRemoveFromCompare(p.id)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/80 hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-full h-24 rounded-lg overflow-hidden bg-white mb-2 border border-gray-100 flex items-center justify-center">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>

                    <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
                      {p.title}
                    </h4>

                    <div className="text-sm font-black text-purple-700 mb-2">
                      {formatPrice(p.price, currency)}
                    </div>

                    <button
                      onClick={() => onAddToCart(p)}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition shadow-sm"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100 text-xs mt-3">
                {/* Rating */}
                <div className="grid grid-cols-5 gap-3 py-2.5 items-center">
                  <span className="font-semibold text-gray-500">Customer Rating</span>
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-gray-800">{p.rating}</span>
                      <span className="text-[10px] text-gray-400">({p.reviewCount})</span>
                    </div>
                  ))}
                </div>

                {/* Category */}
                <div className="grid grid-cols-5 gap-3 py-2.5 items-center">
                  <span className="font-semibold text-gray-500">Department</span>
                  {products.map((p) => (
                    <span key={p.id} className="text-gray-700 font-medium">{p.category}</span>
                  ))}
                </div>

                {/* Prime Shipping */}
                <div className="grid grid-cols-5 gap-3 py-2.5 items-center">
                  <span className="font-semibold text-gray-500">Delivery Speed</span>
                  {products.map((p) => (
                    <span key={p.id} className="text-purple-700 font-bold">
                      {p.hasPrime ? 'FREE 1-Day Prime' : 'Standard (2-3 Days)'}
                    </span>
                  ))}
                </div>

                {/* AI Model Tags */}
                <div className="grid grid-cols-5 gap-3 py-2.5 items-start">
                  <span className="font-semibold text-gray-500">AI Predicted Tags</span>
                  {products.map((p) => (
                    <div key={p.id} className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="bg-purple-100 text-purple-800 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Dynamic Specs */}
                {allSpecKeys.map((key) => (
                  <div key={key} className="grid grid-cols-5 gap-3 py-2.5 items-center">
                    <span className="font-semibold text-gray-500">{key}</span>
                    {products.map((p) => (
                      <span key={p.id} className="text-gray-800">
                        {p.specs?.[key] || '—'}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
