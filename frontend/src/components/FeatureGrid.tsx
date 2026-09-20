import React from 'react';
import { Sparkles, ArrowRight, Activity, Zap, Cpu, HeartPulse } from 'lucide-react';
import { Product } from '../types';

interface FeatureGridProps {
  products: Product[];
  onSelectCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenAiStudio: () => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  products,
  onSelectCategory,
  onSelectProduct,
  onOpenAiStudio,
}) => {
  const homeProducts = products.filter((p) => p.category === 'Home Décor').slice(0, 4);
  const candleProducts = products.filter((p) => p.category === 'Candles & Lighting').slice(0, 4);
  const kitchenProducts = products.filter((p) => p.category === 'Kitchen & Dining').slice(0, 4);

  return (
    <div className="relative -mt-20 sm:-mt-28 md:-mt-32 z-20 max-w-[1550px] mx-auto px-2 sm:px-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Home Décor */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-4 flex flex-col justify-between transition group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                Home &amp; Hanging Décor
              </h3>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {(homeProducts.length > 0 ? homeProducts : products.slice(0, 4)).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="cursor-pointer group/item flex flex-col items-center text-center p-1.5 rounded-lg hover:bg-purple-50/60 transition"
                >
                  <div className="w-full h-24 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center mb-1.5 border border-gray-100">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 line-clamp-1 leading-snug">
                    {prod.title}
                  </span>
                  <span className="text-xs font-bold text-purple-700">
                    ${prod.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('Home Décor')}
            className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 pt-2 border-t border-gray-100 transition cursor-pointer"
          >
            <span>Explore Home Décor</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Card 2: Candles & Lighting */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-4 flex flex-col justify-between transition group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                Candles &amp; Lighting
              </h3>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {(candleProducts.length > 0 ? candleProducts : products.slice(4, 8)).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="cursor-pointer group/item flex flex-col items-center text-center p-1.5 rounded-lg hover:bg-indigo-50/60 transition"
                >
                  <div className="w-full h-24 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center mb-1.5 border border-gray-100">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 line-clamp-1 leading-snug">
                    {prod.title}
                  </span>
                  <span className="text-xs font-bold text-indigo-700">
                    ${prod.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('Candles & Lighting')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-2 border-t border-gray-100 transition cursor-pointer"
          >
            <span>Explore Candles &amp; Lanterns</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Card 3: Kitchen & Dining */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-4 flex flex-col justify-between transition group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                Kitchen, Mugs &amp; Baking
              </h3>
              <Activity className="w-4 h-4 text-rose-500" />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {(kitchenProducts.length > 0 ? kitchenProducts : products.slice(8, 12)).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="cursor-pointer group/item flex flex-col items-center text-center p-1.5 rounded-lg hover:bg-rose-50/60 transition"
                >
                  <div className="w-full h-24 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center mb-1.5 border border-gray-100">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 line-clamp-1 leading-snug">
                    {prod.title}
                  </span>
                  <span className="text-xs font-bold text-rose-600">
                    ${prod.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('Kitchen & Dining')}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 pt-2 border-t border-gray-100 transition cursor-pointer"
          >
            <span>Shop Kitchen &amp; Dining</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Card 4: Machine Learning Recommendation Engine */}
        <div className="bg-gradient-to-br from-[#1e1b4b] via-[#1e293b] to-[#0f172a] text-white rounded-xl shadow-md hover:shadow-xl border border-purple-500/30 p-4 flex flex-col justify-between transition group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-600/40 border border-purple-400/40 p-1.5 rounded-lg text-purple-300">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              </span>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 block">
                  ML Recommender
                </span>
                <h3 className="font-bold text-white text-base leading-tight">
                  Hybrid Engine Live
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-300 mt-2 mb-3 leading-relaxed">
              Serving real-time recommendations powered by cosine content similarity and collaborative customer co-purchase patterns across <strong>3,939 UK retail products</strong>.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 mb-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Total Products:</span>
                <span className="font-mono text-purple-300 font-bold">3,939 items</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Content Matrix:</span>
                <span className="font-mono text-emerald-300 font-bold">3,939 × 3,939 (TF-IDF)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Collab Matrix:</span>
                <span className="font-mono text-amber-300 font-bold">3,939 × 3,939 (Cosine)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (products.length > 0) onSelectProduct(products[0]);
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2.5 px-3 rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Test Recommendation Engine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
