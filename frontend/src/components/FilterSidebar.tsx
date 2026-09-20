import React from 'react';
import { Star, Filter, RotateCcw, Sparkles, Check, Tag } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { FilterState, Product } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  availableTags: string[];
  allProducts: Product[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableTags,
  allProducts,
}) => {
  const toggleTag = (tag: string) => {
    const next = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter((t) => t !== tag)
      : [...filters.selectedTags, tag];
    onFilterChange({ selectedTags: next });
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All Departments') return allProducts.length;
    return allProducts.filter((p) => p.category === cat).length;
  };

  const popularTags = [
    'vintage', 'heart', 't-light', 'candle', 'lantern', 'mug',
    'baking', 'bag', 'christmas', 'flower', 'party', 'craft',
    'decor', 'retro', 'knitted', 'metal', 'glass', 'ceramic'
  ];

  const tagsToDisplay = availableTags.length > 0 
    ? Array.from(new Set([...availableTags, ...popularTags])).slice(0, 24)
    : popularTags;

  const priceTiers = [
    { label: 'Under $10', max: 10 },
    { label: '$10 to $20', max: 20 },
    { label: '$20 to $35', max: 35 },
    { label: '$35 to $50', max: 50 },
    { label: 'All Prices', max: 2000 },
  ];

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-6 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-1.5 font-bold text-gray-900">
          <Filter className="w-4 h-4 text-purple-600" />
          <span>Filter ({allProducts.length} Items)</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 font-semibold transition cursor-pointer"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category / Department with Item Counts */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
          Department
        </h4>
        <ul className="space-y-1">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat);
            return (
              <li key={cat}>
                <button
                  onClick={() => onFilterChange({ category: cat })}
                  className={`w-full flex items-center justify-between py-1.5 px-2 rounded-md text-xs transition cursor-pointer ${
                    filters.category === cat
                      ? 'bg-purple-100 text-purple-900 font-bold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filters.category === cat ? 'bg-purple-200 text-purple-800 font-bold' : 'text-gray-400 bg-gray-100'
                  }`}>
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price Tiers & Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">
            Price Range
          </h4>
          <span className="text-xs font-bold text-purple-700">
            Up to ${filters.maxPrice}
          </span>
        </div>

        {/* Quick Tiers */}
        <div className="grid grid-cols-2 gap-1.5 mb-2.5">
          {priceTiers.map((tier) => (
            <button
              key={tier.label}
              onClick={() => onFilterChange({ maxPrice: tier.max })}
              className={`py-1 px-2 rounded text-[11px] font-semibold border transition cursor-pointer ${
                filters.maxPrice === tier.max
                  ? 'border-purple-600 bg-purple-50 text-purple-800'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        <input
          type="range"
          min="20"
          max="2000"
          step="20"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-purple-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>$20</span>
          <span>$1,000</span>
          <span>$2,000+</span>
        </div>
      </div>

      {/* Customer Review Rating */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
          Customer Reviews
        </h4>
        <div className="space-y-1">
          {[4, 3].map((stars) => (
            <button
              key={stars}
              onClick={() => onFilterChange({ minRating: filters.minRating === stars ? 0 : stars })}
              className={`w-full flex items-center gap-1.5 py-1 px-2 rounded-md text-xs transition cursor-pointer ${
                filters.minRating === stars
                  ? 'bg-purple-50 text-purple-900 font-bold border border-purple-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-700">&amp; Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Delivery & Deals Toggles */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
          Deals &amp; Availability
        </h4>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.primeOnly}
              onChange={(e) => onFilterChange({ primeOnly: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
            <span className="font-bold text-purple-700 italic">
              pathi<span className="text-amber-500">prime</span> Free 1-Day
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.hasDiscountOnly}
              onChange={(e) => onFilterChange({ hasDiscountOnly: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
            <span className="text-gray-700 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-rose-500" />
              <span>Deals &amp; Discounts Only</span>
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
            <span className="text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>

      {/* AI Model Multi-Label Tags Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>AI Tags Filter</span>
          </h4>
          {filters.selectedTags.length > 0 && (
            <button
              onClick={() => onFilterChange({ selectedTags: [] })}
              className="text-[10px] text-purple-600 hover:underline font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-[11px] text-gray-400 mb-2">
          Filter by ML model predicted categories:
        </p>
        <div className="flex flex-wrap gap-1 max-h-56 overflow-y-auto pr-1">
          {tagsToDisplay.map((tag) => {
            const isSelected = filters.selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-[11px] px-2 py-0.5 rounded-full border transition flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5" />}
                <span>#{tag}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
