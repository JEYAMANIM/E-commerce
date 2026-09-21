import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Truck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderItem, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  onOrderPlaced: (order: OrderItem) => void;
  currentCity: string;
  currentZip: string;
  currency: CurrencyCode;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  onOrderPlaced,
  currentCity,
  currentZip,
  currency,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [name, setName] = useState('Alex Morgan');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState(currentCity || 'Seattle');
  const [zip, setZip] = useState(currentZip || '98101');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [completedOrder, setCompletedOrder] = useState<OrderItem | null>(null);

  const subtotal = items.reduce((sum, item) => {
    let itemPrice = item.product.price;
    if (item.selectedCoupon && item.product.couponPercent) {
      itemPrice = itemPrice * (1 - item.product.couponPercent / 100);
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = subtotal * (discountPercent / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: OrderItem = {
      id: `PL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: items.map((i) => ({
        title: i.product.title,
        quantity: i.quantity,
        price: i.product.price,
        image: i.product.image,
      })),
      total: total,
      status: 'Processing',
      estimatedDelivery: 'Tomorrow by 2:00 PM',
      trackingNumber: `TRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    };

    setCompletedOrder(newOrder);
    onOrderPlaced(newOrder);
    setStep('success');

    // Fire celebratory confetti!
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative border border-purple-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-purple-900/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 p-1 flex items-center justify-center">
              <img src="/logo.jpg" alt="Pathi Labs Logo" className="w-full h-full object-cover rounded" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">
                {step === 'details' ? 'Secure Express Checkout' : 'Order Confirmed!'}
              </h2>
              <span className="text-[11px] text-purple-300">
                {step === 'details' ? 'Pathi Labs 1-Click Fast Dispatch' : 'Thank you for shopping with Pathi Labs'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-5">
            {/* Delivery Address */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-purple-600" />
                <span>1. Shipping Address</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-name" className="text-[11px] font-semibold text-gray-600 block mb-1">Full Name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-600 focus:outline-none bg-white text-gray-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-address" className="text-[11px] font-semibold text-gray-600 block mb-1">Street Address</label>
                  <input
                    id="checkout-address"
                    type="text"
                    autoComplete="street-address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-600 focus:outline-none bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-city" className="text-[11px] font-semibold text-gray-600 block mb-1">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    autoComplete="address-level2"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-600 focus:outline-none bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-zip" className="text-[11px] font-semibold text-gray-600 block mb-1">Postal / Zip Code</label>
                  <input
                    id="checkout-zip"
                    type="text"
                    autoComplete="postal-code"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-600 focus:outline-none bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-3 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span>2. Payment Method</span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                  { id: 'upi', label: 'UPI / Instant Pay', icon: '⚡' },
                  { id: 'cod', label: 'Cash on Delivery', icon: '📦' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-center text-xs font-semibold transition cursor-pointer ${
                      paymentMethod === m.id
                        ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-lg block mb-1">{m.icon}</span>
                    <span className="text-[11px] block">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Items ({items.reduce((a, b) => a + b.quantity, 0)}):</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount ({discountPercent}%):</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping &amp; Handling:</span>
                <span className="text-emerald-600 font-bold">FREE 1-Day</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-purple-200">
                <span>Order Total:</span>
                <span className="text-purple-800 font-black">{formatPrice(total, currency)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Place Your Order ({formatPrice(total, currency)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Order Placed Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Order #{completedOrder?.id}
              </span>
              <h3 className="text-2xl font-black text-gray-900 mt-1">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                We've sent a confirmation email to your account. Your items are being packed in our automated fulfillment center.
              </p>
            </div>

            {/* Tracking Card */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking ID:</span>
                <span className="font-mono font-bold text-gray-800">{completedOrder?.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-bold text-purple-700">{completedOrder?.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address:</span>
                <span className="text-gray-800">{address}, {city} {zip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Paid:</span>
                <span className="font-bold text-gray-900">{formatPrice(completedOrder?.total || 0, currency)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow transition cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
