import React from 'react';
import { Menu, Sparkles, Activity, ShieldCheck, Flame, Tag } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface SubNavProps {
  onOpenDepartments: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenAiStudio: () => void;
  backendOnline: boolean;
  totalTags: number;
}

export const SubNav: React.FC<SubNavProps> = ({
  onOpenDepartments,
  selectedCategory,
  onSelectCategory,
  onOpenAiStudio,
  backendOnline,
  totalTags,
}) => {
  return (
    <div className="bg-[#1e293b] text-white text-xs border-b border-slate-700/50">
      <div className="max-w-[1550px] mx-auto px-2 sm:px-4 flex items-center justify-between overflow-x-auto no-scrollbar">
        {/* Left Side: Department & Quick Links */}
        <div className="flex items-center gap-1 sm:gap-2 py-1 flex-shrink-0">
          {/* Hamburger All */}
          <button
            onClick={onOpenDepartments}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded hover:outline hover:outline-1 hover:outline-white/40 font-bold transition flex-shrink-0"
          >
            <Menu className="w-4 h-4 text-purple-400" />
            <span>All Departments</span>
          </button>

          {/* Quick Categories */}
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`py-1 px-2.5 rounded font-medium whitespace-nowrap transition flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-600/30 text-purple-300 font-bold outline outline-1 outline-purple-500/50'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {cat === 'All Departments' ? 'All Products' : cat}
            </button>
          ))}

          {/* Deals */}
          <button
            onClick={() => onSelectCategory('All Departments')}
            className="hidden md:flex items-center gap-1 py-1 px-2 rounded text-amber-300 hover:text-amber-200 hover:bg-slate-700/50 font-bold whitespace-nowrap transition"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Today's Deals</span>
          </button>
        </div>

        {/* Right Side: AI Tag Studio Trigger & Backend Health */}
        <div className="flex items-center gap-2 py-1 pl-4 flex-shrink-0">
          {/* AI Tag Studio Badge */}
          <button
            onClick={onOpenAiStudio}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-1 px-3 rounded-md shadow-sm text-xs transition transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI Tag Studio</span>
          </button>

          {/* Backend Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
              }`}
            />
            <span className="text-gray-300">
              {backendOnline ? (
                <>
                  API Online <strong className="text-purple-300">({totalTags || 439} Tags)</strong>
                </>
              ) : (
                'Local Fallback Mode'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
