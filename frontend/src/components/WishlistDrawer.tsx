import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onMoveToCart: (product: Product) => void;
  currency: CurrencyCode;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 bg-[#0f172a] text-white flex items-center justify-between border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="font-extrabold text-base tracking-wide">
                Your Saved Wishlist
              </h2>
              <span className="bg-rose-600/80 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {wishlist.length}
              </span>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <Heart className="w-12 h-12 text-gray-300 mb-2" />
                <p className="font-bold text-gray-700 text-sm">Your Wishlist is empty</p>
                <p className="text-xs text-gray-400 mt-1">
                  Click the heart icon on any product card to save items you love.
                </p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg bg-white border border-gray-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 block">{item.category}</span>
                      <span className="text-xs font-black text-purple-700 mt-1 block">
                        {formatPrice(item.price, currency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-200/60">
                      <button
                        onClick={() => {
                          onMoveToCart(item);
                          onRemoveFromWishlist(item.id);
                        }}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold py-1 px-3 rounded-md flex items-center gap-1 transition"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(item.id)}
                        className="p-1 text-gray-400 hover:text-rose-500 transition"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <button
              onClick={onClose}
              className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
