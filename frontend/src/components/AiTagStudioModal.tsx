import React, { useState } from 'react';
import { X, Sparkles, Zap, Cpu, Check, Plus, RefreshCw, Layers } from 'lucide-react';
import { predictProductTags } from '../services/api';
import { Product } from '../types';

interface AiTagStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewProduct: (newProduct: Product) => void;
}

export const AiTagStudioModal: React.FC<AiTagStudioModalProps> = ({
  isOpen,
  onClose,
  onAddNewProduct,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('129.99');
  const [predictedTags, setPredictedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [productAddedToast, setProductAddedToast] = useState(false);

  const samplePrompts = [
    {
      title: 'Sony Bravia 4K UHD 144Hz Smart TV with Dolby Atmos',
      desc: 'Next-gen living room entertainment display with deep contrast and low latency gaming mode.',
      cat: 'Electronics',
      p: '899.99',
    },
    {
      title: 'Pathi Clinical Centrifuge & High-Speed Blood Plasma Separator',
      desc: 'Benchtop biomedical lab centrifuge with brushless acoustic motor and digital timer.',
      cat: 'Lab & Medical',
      p: '450.00',
    },
    {
      title: 'Men Casual Breathable Cotton Round Neck T-Shirt',
      desc: 'Everyday casual summer streetwear crafted from 100% natural organic cotton.',
      cat: 'Fashion',
      p: '29.99',
    },
    {
      title: 'Dermatology Gentle Hydrating Facial Cleanser for Acne Skin',
      desc: 'Fragrance-free foam-free gentle face wash with essential ceramides and hyaluronic acid.',
      cat: 'Skincare',
      p: '22.50',
    },
  ];

  const handlePredict = async () => {
    if (!title && !description) return;
    setLoading(true);
    setPredictedTags([]);

    const res = await predictProductTags(undefined, title, description);
    setPredictedTags(res.tags);
    setLatencyMs(res.processing_time_ms);
    setLoading(false);
  };

  const handleSelectSample = (s: typeof samplePrompts[0]) => {
    setTitle(s.title);
    setDescription(s.desc);
    setCategory(s.cat);
    setPrice(s.p);
    setPredictedTags([]);
    setLatencyMs(null);
  };

  const handleAddProductToStore = () => {
    if (!title.trim()) return;

    const newProd: Product = {
      id: `pl-user-${Date.now()}`,
      title: title.trim(),
      category: category,
      price: parseFloat(price) || 49.99,
      originalPrice: (parseFloat(price) || 49.99) * 1.25,
      rating: 5.0,
      reviewCount: 1,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
      inStock: true,
      stockCount: 15,
      isPathiChoice: true,
      hasPrime: true,
      tags: predictedTags.length > 0 ? predictedTags : ['electronics', 'accessory'],
      description: description.trim() || 'Custom item created with Pathi Labs AI Tag Studio.',
      features: [
        'Classified in real-time by Pathi Labs Machine Learning model',
        'Eligible for 1-Day Prime Fast Dispatch',
      ],
      specs: {
        'AI Engine': 'TF-IDF + KNN Classifier',
        'Category': category,
        'Listed': 'Just now',
      },
    };

    onAddNewProduct(newProd);
    setProductAddedToast(true);
    setTimeout(() => {
      setProductAddedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden relative border border-purple-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/40 rounded-xl border border-purple-400/40">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-white">
                  Pathi Labs AI Tag Studio
                </h2>
                <span className="bg-purple-600/60 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30">
                  Live ML Engine
                </span>
              </div>
              <p className="text-xs text-purple-200/80">
                Connected to local FastAPI backend (1,500 TF-IDF features &bull; 439 multi-label classes)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Quick Preset Samples */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
              Try a Quick Preset:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {samplePrompts.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(s)}
                  className="text-left p-2.5 rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50/50 transition text-xs flex flex-col justify-between group cursor-pointer"
                >
                  <span className="font-bold text-gray-800 group-hover:text-purple-700 line-clamp-1">
                    {s.title}
                  </span>
                  <span className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                    {s.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Product Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Sony 4K OLED Gaming Monitor 144Hz HDR"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Product Description *
              </label>
              <textarea
                rows={2}
                placeholder="Describe features, specs, intended usage..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Department
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                >
                  <option>Electronics</option>
                  <option>Lab &amp; Medical</option>
                  <option>Wearables</option>
                  <option>Fashion</option>
                  <option>Skincare</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                />
              </div>
            </div>

            {/* Run Inference Button */}
            <div className="pt-2">
              <button
                onClick={handlePredict}
                disabled={loading || (!title && !description)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running Machine Learning Classifier...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Tags with ML Model</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Inference Results */}
          {predictedTags.length > 0 && (
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 animate-fadeIn space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-700" />
                  <h4 className="font-bold text-xs text-purple-900">
                    Predicted Tags ({predictedTags.length} detected)
                  </h4>
                </div>
                {latencyMs !== null && (
                  <span className="text-[11px] font-mono text-purple-700 bg-purple-200/60 px-2 py-0.5 rounded font-bold">
                    Inference: {latencyMs.toFixed(1)} ms
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {predictedTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-300 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Add to Store Button */}
              <div className="pt-2 border-t border-purple-200/60">
                <button
                  onClick={handleAddProductToStore}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish &amp; Add to Pathi Labs Store Catalog</span>
                </button>
              </div>
            </div>
          )}

          {productAddedToast && (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4" />
              <span>Product successfully added to the store with AI tags!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
