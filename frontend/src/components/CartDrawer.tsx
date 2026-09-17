import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromoCode: string;
  promoDiscountPercent: number;
  onApplyPromoCode: (code: string) => boolean;
  currency: CurrencyCode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromoCode,
  promoDiscountPercent,
  onApplyPromoCode,
  currency,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((sum, item) => {
    let itemPrice = item.product.price;
    if (item.selectedCoupon && item.product.couponPercent) {
      itemPrice = itemPrice * (1 - item.product.couponPercent / 100);
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = subtotal * (promoDiscountPercent / 100);
  const finalSubtotal = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 75;
  const isFreeShipping = finalSubtotal >= freeShippingThreshold;
  const progressPercent = Math.min(100, (finalSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const success = onApplyPromoCode(promoInput.trim());
    if (!success) {
      setPromoError('Invalid coupon code. Try PATHI20 for 20% off!');
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 bg-[#0f172a] text-white flex items-center justify-between border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              <h2 className="font-extrabold text-base tracking-wide">
                Your Shopping Cart
              </h2>
              <span className="bg-purple-600/80 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {items.reduce((c, i) => c + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="p-3 bg-purple-50 border-b border-purple-100 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>You've unlocked <strong>FREE 1-Day Express Shipping!</strong></span>
              </div>
            ) : (
              <div className="text-gray-700">
                Add <strong className="text-purple-700 font-bold">{formatPrice(freeShippingThreshold - finalSubtotal, currency)}</strong> more to get <strong>FREE 1-Day Delivery</strong>!
              </div>
            )}
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-emerald-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-1">
                  Your Cart is Empty
                </h3>
                <p className="text-xs text-gray-400 max-w-xs mb-4">
                  Browse over 84+ products in electronics, lab gear, fitness, fashion and beauty.
                </p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 px-6 rounded-lg shadow-md transition cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                let unitPrice = item.product.price;
                if (item.selectedCoupon && item.product.couponPercent) {
                  unitPrice = unitPrice * (1 - item.product.couponPercent / 100);
                }
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80 hover:border-purple-200 transition"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg bg-white border border-gray-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <span className="text-[11px] text-gray-400 block">
                          {item.product.category}
                        </span>

                        {item.selectedCoupon && (
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded mt-0.5">
                            {item.product.couponPercent}% coupon applied
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-200/60">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-gray-900">
                            {formatPrice(itemTotal, currency)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 text-gray-400 hover:text-rose-500 transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Promo Code (PATHI20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 text-xs uppercase rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-semibold">{promoError}</p>
                )}
                {appliedPromoCode && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Coupon {appliedPromoCode} applied ({promoDiscountPercent}% off)</span>
                  </p>
                )}
              </form>

              {/* Subtotal & Breakdown */}
              <div className="space-y-1 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-gray-800">{formatPrice(subtotal, currency)}</span>
                </div>
                {promoDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount ({promoDiscountPercent}%):</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-emerald-600">
                    {isFreeShipping ? 'FREE (1-Day Prime)' : formatPrice(5.99, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-1 border-t border-gray-200">
                  <span>Estimated Total:</span>
                  <span className="text-purple-700 font-black">
                    {formatPrice(finalSubtotal + (isFreeShipping ? 0 : 5.99), currency)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onProceedToCheckout();
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>256-Bit SSL Encrypted &amp; Verified Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
