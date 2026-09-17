import React from 'react';
import { X, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { OrderItem } from '../types';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-purple-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-purple-900/40">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base">Your Orders &amp; Dispatch Tracking</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No recent orders found</p>
              <p className="text-xs text-gray-400 mt-1">Orders you place will appear here with live tracking.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-3"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-200/60">
                  <div>
                    <span className="text-gray-400 block text-[10px]">ORDER PLACED</span>
                    <span className="font-bold text-gray-800">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">TOTAL</span>
                    <span className="font-bold text-gray-800">${order.total.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">ORDER #</span>
                    <span className="font-mono font-bold text-purple-700">{order.id}</span>
                  </div>
                </div>

                {/* Tracking Progress */}
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-purple-600" />
                      <span>Status: <strong className="text-purple-700">{order.status}</strong></span>
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      Expected: <strong className="text-gray-800">{order.estimatedDelivery}</strong>
                    </span>
                  </div>

                  {/* Visual Tracker */}
                  <div className="relative flex items-center justify-between text-[10px] text-gray-500 mt-3 pt-2">
                    <div className="absolute top-1 left-0 right-0 h-1 bg-gray-200 -z-0">
                      <div className="bg-purple-600 h-full w-1/3 rounded-full" />
                    </div>
                    <div className="flex flex-col items-center bg-white px-1 z-10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                      <span className="font-bold text-purple-700">Ordered</span>
                    </div>
                    <div className="flex flex-col items-center bg-white px-1 z-10">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span className="font-semibold text-gray-700">Shipped</span>
                    </div>
                    <div className="flex flex-col items-center bg-white px-1 z-10">
                      <Truck className="w-3.5 h-3.5 text-gray-400" />
                      <span>Out for Delivery</span>
                    </div>
                    <div className="flex flex-col items-center bg-white px-1 z-10">
                      <Package className="w-3.5 h-3.5 text-gray-400" />
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-2">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-12 h-12 object-cover rounded bg-white border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-gray-800 line-clamp-1 block">
                          {it.title}
                        </span>
                        <span className="text-gray-500 text-[11px]">
                          Qty: {it.quantity} &bull; ${it.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
