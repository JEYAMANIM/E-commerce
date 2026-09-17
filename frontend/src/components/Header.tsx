import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  ChevronDown, 
  Sparkles,
  X,
  Heart,
  Scale
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CurrencyCode, CURRENCIES } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenLocation: () => void;
  onOpenAiStudio: () => void;
  currentZip: string;
  currentCity: string;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  cartCount,
  onOpenCart,
  onOpenOrders,
  onOpenLocation,
  onOpenAiStudio,
  currentZip,
  currentCity,
  currency,
  onCurrencyChange,
  wishlistCount,
  onOpenWishlist,
  compareCount,
  onOpenCompare,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const searchSuggestions = [
    '4K OLED Gaming Monitor',
    'Clinical Microscope',
    'ANC Wireless Headphones',
    'BioTrack Titanium Smartwatch',
    'Men Casual Cotton T-Shirt',
    'Hydrating Gentle Cleanser',
    'Micro-Centrifuge',
    'Action Camera 4K',
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a] text-white shadow-xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 px-4 py-1 text-center text-xs font-medium text-purple-200 flex items-center justify-center gap-3 border-b border-purple-800/40">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <strong className="text-white">Pathi Prime Festival:</strong> Next-Day Free Delivery on all 84+ Catalog Items with code <span className="bg-purple-600/60 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">PATHI20</span>
        </span>
        <button 
          onClick={onOpenAiStudio}
          className="hidden sm:inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white text-[11px] px-2.5 py-0.5 rounded-full font-semibold transition cursor-pointer"
        >
          Try AI Tag Studio &rarr;
        </button>
      </div>

      {/* Main Amazon-Style Header Navigation Bar */}
      <div className="max-w-[1550px] mx-auto px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-4">
        {/* Pathi Labs Brand Logo */}
        <div 
          onClick={() => {
            onCategoryChange('All Departments');
            onSearchChange('');
          }}
          className="flex items-center gap-2 group cursor-pointer py-1 px-2 rounded-md hover:outline hover:outline-1 hover:outline-white/40 transition"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-white/5 border border-purple-500/30 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/40 transition">
            <img 
              src="/logo.jpg" 
              alt="Pathi Labs Logo" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400">
              Pathi<span className="text-purple-400 font-black">Labs</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-purple-300/80 font-bold -mt-0.5">
              Marketplace
            </span>
          </div>
        </div>

        {/* Deliver To Selector */}
        <button 
          onClick={onOpenLocation}
          className="hidden md:flex items-center gap-1.5 py-1.5 px-2 rounded-md hover:outline hover:outline-1 hover:outline-white/40 text-left transition group cursor-pointer"
          title="Change delivery location"
        >
          <MapPin className="w-5 h-5 text-purple-400 group-hover:text-purple-300 mt-1 flex-shrink-0" />
          <div className="text-xs leading-tight">
            <span className="text-gray-400 block text-[11px]">Deliver to</span>
            <span className="font-bold text-white text-xs block truncate max-w-[110px]">
              {currentCity} {currentZip}
            </span>
          </div>
        </button>

        {/* Omnibar Search Box */}
        <div className="flex-1 relative">
          <div className={`flex items-center bg-white rounded-lg overflow-hidden transition-all duration-200 ${
            isSearchFocused ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0f172a]' : ''
          }`}>
            {/* Category Dropdown */}
            <div className="relative bg-gray-100 border-r border-gray-300 hover:bg-gray-200 transition">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none bg-transparent text-xs text-gray-700 py-2.5 pl-3 pr-7 font-medium cursor-pointer focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-3 pointer-events-none" />
            </div>

            {/* Input */}
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                placeholder="Search 84+ Pathi Labs products (4k, microscope, headphones, sneakers, serum, tools...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="p-1.5 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Button */}
            <button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 flex items-center justify-center transition cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && !searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 text-gray-800">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Trending Searches in 84+ Catalog
              </div>
              {searchSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSearchChange(item)}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Currency Selector Dropdown */}
        <div 
          className="relative py-1.5 px-2 rounded-md hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer transition"
          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
        >
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white">{currency}</span>
            <span className="text-xs text-purple-300 font-mono">({CURRENCIES[currency].symbol})</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          {showCurrencyDropdown && (
            <div 
              className="absolute right-0 top-full mt-1 w-36 bg-white text-gray-900 rounded-lg shadow-2xl border border-gray-200 py-1.5 z-50 animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onCurrencyChange(c);
                    setShowCurrencyDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition cursor-pointer ${
                    currency === c ? 'bg-purple-50 text-purple-700 font-bold' : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{c} ({CURRENCIES[c].symbol})</span>
                  {currency === c && <span className="text-purple-600 font-bold">&bull;</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Wishlist Button with Badge */}
        <button
          onClick={onOpenWishlist}
          className="hidden sm:flex items-center gap-1 py-1.5 px-2 rounded-md hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer transition relative"
          title="View Wishlist"
        >
          <Heart className="w-5 h-5 text-gray-300 hover:text-rose-400" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Compare Button with Badge */}
        {compareCount > 0 && (
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1 py-1.5 px-2 rounded-md bg-purple-600/40 hover:bg-purple-600 text-white cursor-pointer transition relative text-xs font-bold"
            title="Compare Products"
          >
            <Scale className="w-4 h-4" />
            <span>Compare ({compareCount})</span>
          </button>
        )}

        {/* Account & Lists */}
        <div 
          className="relative py-1.5 px-2 rounded-md hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer transition"
          onMouseEnter={() => setShowAccountDropdown(true)}
          onMouseLeave={() => setShowAccountDropdown(false)}
        >
          <div className="text-xs leading-tight">
            <span className="text-gray-300 block text-[11px]">Hello, Sign in</span>
            <span className="font-bold text-white text-xs flex items-center gap-1">
              Account &amp; Lists
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </span>
          </div>

          {/* Hover Menu */}
          {showAccountDropdown && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white text-gray-900 rounded-lg shadow-2xl border border-gray-200 p-4 z-50 animate-fadeIn">
              <div className="text-center pb-3 border-b border-gray-100">
                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-md text-xs shadow transition cursor-pointer">
                  Sign In
                </button>
                <p className="text-[11px] text-gray-500 mt-2">
                  New customer? <span className="text-purple-600 font-semibold hover:underline">Start here.</span>
                </p>
              </div>
              <div className="pt-3 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Your Lists</h4>
                  <ul className="space-y-1.5 text-gray-600 text-[11px]">
                    <li onClick={onOpenWishlist} className="hover:text-purple-600 cursor-pointer">Saved Wishlist ({wishlistCount})</li>
                    <li className="hover:text-purple-600 cursor-pointer">Lab Re-orders</li>
                    <li className="hover:text-purple-600 cursor-pointer">Gift Registry</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Your Account</h4>
                  <ul className="space-y-1.5 text-gray-600 text-[11px]">
                    <li onClick={onOpenOrders} className="hover:text-purple-600 cursor-pointer">Your Orders</li>
                    <li className="hover:text-purple-600 cursor-pointer">Pathi Prime</li>
                    <li className="hover:text-purple-600 cursor-pointer">Help Center</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <button 
          onClick={onOpenOrders}
          className="hidden sm:block py-1.5 px-2 rounded-md hover:outline hover:outline-1 hover:outline-white/40 text-left cursor-pointer transition"
        >
          <span className="text-gray-300 block text-[11px]">Returns</span>
          <span className="font-bold text-white text-xs block">&amp; Orders</span>
        </button>

        {/* Cart Button with Counter */}
        <button 
          onClick={onOpenCart}
          className="flex items-center gap-1 py-1 px-2.5 rounded-md hover:outline hover:outline-1 hover:outline-white/40 transition group relative cursor-pointer"
          aria-label="Shopping Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-8 h-8 text-white group-hover:text-purple-300 transition" />
            <span className="absolute -top-1.5 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-[11px] min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 shadow-md border-2 border-[#0f172a] transform group-hover:scale-110 transition">
              {cartCount}
            </span>
          </div>
          <span className="hidden md:inline font-bold text-sm text-white mt-2">
            Cart
          </span>
        </button>
      </div>
    </header>
  );
};
