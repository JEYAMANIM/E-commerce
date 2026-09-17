import React from 'react';
import { X, ChevronRight, Sparkles, Activity, Cpu, HeartPulse, Shirt, Sparkle, HelpCircle, PhoneCall, Globe } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface DepartmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenAiStudio: () => void;
}

export const DepartmentDrawer: React.FC<DepartmentDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenAiStudio,
}) => {
  if (!isOpen) return null;

  const categoryIcons: Record<string, any> = {
    'Lab & Medical': Activity,
    'Electronics': Cpu,
    'Wearables': HeartPulse,
    'Fashion': Shirt,
    'Skincare': Sparkle,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 p-0.5">
                <img src="/logo.jpg" alt="Pathi Labs Logo" className="w-full h-full object-cover rounded" />
              </div>
              <span className="font-extrabold text-base tracking-wide">
                Pathi Labs Directory
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Directory Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
            {/* AI Special Section */}
            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-purple-700 text-[11px] mb-2">
                Pathi Labs Innovation
              </h4>
              <button
                onClick={() => {
                  onOpenAiStudio();
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl flex items-center justify-between font-bold shadow-md hover:shadow-purple-500/30 transition group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>AI Tag Studio &amp; Matcher</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* Shop by Department */}
            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-gray-400 text-[11px] mb-2">
                Shop by Department
              </h4>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const Icon = categoryIcons[cat];
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          onSelectCategory(cat);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-semibold transition"
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="w-4 h-4 text-purple-600" />}
                          <span>{cat}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Programs & Features */}
            <div className="pt-3 border-t border-gray-100">
              <h4 className="font-extrabold uppercase tracking-wider text-gray-400 text-[11px] mb-2">
                Programs &amp; Features
              </h4>
              <ul className="space-y-1.5 text-gray-600">
                <li className="hover:text-purple-600 cursor-pointer py-1 px-2 rounded hover:bg-gray-50">
                  Today's Lightning Deals
                </li>
                <li className="hover:text-purple-600 cursor-pointer py-1 px-2 rounded hover:bg-gray-50">
                  Pathi Prime 1-Day Delivery
                </li>
                <li className="hover:text-purple-600 cursor-pointer py-1 px-2 rounded hover:bg-gray-50">
                  Lab &amp; Diagnostic Bulk Re-orders
                </li>
                <li className="hover:text-purple-600 cursor-pointer py-1 px-2 rounded hover:bg-gray-50">
                  Gift Cards &amp; Registry
                </li>
              </ul>
            </div>

            {/* Help & Settings */}
            <div className="pt-3 border-t border-gray-100">
              <h4 className="font-extrabold uppercase tracking-wider text-gray-400 text-[11px] mb-2">
                Help &amp; Settings
              </h4>
              <ul className="space-y-1.5 text-gray-600">
                <li className="hover:text-purple-600 cursor-pointer py-1 px-2 rounded hover:bg-gray-50 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>English (US) - USD ($)</span>
                </li>
                <li className="hover:text-purple-600 cursor-pointer py-1 px-2 rounded hover:bg-gray-50 flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Customer Service &amp; Returns</span>
                </li>
                <li className="hover:text-purple-600 cursor-pointer py-1 px-2 rounded hover:bg-gray-50 flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Contact Pathi Labs Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
