import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SubNav } from './components/SubNav';
import { HeroSlider } from './components/HeroSlider';
import { FeatureGrid } from './components/FeatureGrid';
import { ProductCard } from './components/ProductCard';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AiTagStudioModal } from './components/AiTagStudioModal';
import { DeliverToModal } from './components/DeliverToModal';
import { OrdersModal } from './components/OrdersModal';
import { DepartmentDrawer } from './components/DepartmentDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CompareModal } from './components/CompareModal';
import { Footer } from './components/Footer';

import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, FilterState, OrderItem, CurrencyCode } from './types';
import { checkBackendHealth, fetchAllProducts } from './services/api';
import { convertBackendProduct } from './utils/productConverter';
import { SlidersHorizontal, ArrowUpDown, X, Tag, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  // State: Products & Cart
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'PL-849102',
      date: 'Sep 12, 2026',
      items: [
        {
          title: 'Pathi Labs 4K Digital Compound Microscope',
          quantity: 1,
          price: 649.99,
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        },
      ],
      total: 649.99,
      status: 'Out for Delivery',
      estimatedDelivery: 'Today by 5:00 PM',
      trackingNumber: 'TRK-PATHI-8921',
    },
  ]);

  // Delivery Location
  const [city, setCity] = useState('Seattle');
  const [zip, setZip] = useState('98101');

  // Backend Integration State
  const [backendOnline, setBackendOnline] = useState(false);
  const [totalTags, setTotalTags] = useState(0);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 32;

  // Promo Code State
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [isDeptDrawerOpen, setIsDeptDrawerOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All Departments',
    minPrice: 0,
    maxPrice: 2000,
    minRating: 0,
    primeOnly: false,
    inStockOnly: false,
    hasDiscountOnly: false,
    selectedTags: [],
    sortBy: 'featured',
  });

  // Check Backend Connection & Load 3,939 Products on Mount
  useEffect(() => {
    const initBackend = async () => {
      setLoadingProducts(true);
      try {
        const health = await checkBackendHealth();
        if (health && health.data_loaded) {
          setBackendOnline(true);
          setTotalTags(health.total_products);

          const rawProducts = await fetchAllProducts();
          if (rawProducts && rawProducts.length > 0) {
            const converted = rawProducts.map(convertBackendProduct);
            setProducts(converted);

            const tagsSet = new Set<string>();
            converted.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
            setAvailableTags(Array.from(tagsSet).slice(0, 40));
          }
        }
      } catch (err) {
        console.error('Error loading backend products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    initBackend();
  }, []);

  // Filter Updates
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    setFilters({
      searchQuery: '',
      category: 'All Departments',
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      primeOnly: false,
      inStockOnly: false,
      hasDiscountOnly: false,
      selectedTags: [],
      sortBy: 'featured',
    });
  };

  // Cart Management
  const handleAddToCart = (product: Product, selectedCoupon = false, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedCoupon: selectedCoupon || item.selectedCoupon }
            : item
        );
      }
      return [...prev, { product, quantity, selectedCoupon }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product, selectedCoupon = false, quantity = 1) => {
    handleAddToCart(product, selectedCoupon, quantity);
    setIsCheckoutOpen(true);
  };

  // Wishlist Management
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Compare Management
  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  // Promo Code
  const handleApplyPromoCode = (code: string): boolean => {
    if (code.toUpperCase() === 'PATHI20') {
      setAppliedPromoCode('PATHI20');
      setPromoDiscountPercent(20);
      return true;
    }
    if (code.toUpperCase() === 'LABS10') {
      setAppliedPromoCode('LABS10');
      setPromoDiscountPercent(10);
      return true;
    }
    return false;
  };

  // Add Product from AI Studio
  const handleAddNewProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (filters.category !== 'All Departments' && p.category !== filters.category) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTag && !matchesCat) {
          return false;
        }
      }

      // Price Range
      if (p.price > filters.maxPrice) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      // Prime only
      if (filters.primeOnly && !p.hasPrime) {
        return false;
      }

      // In Stock only
      if (filters.inStockOnly && !p.inStock) {
        return false;
      }

      // Deals only
      if (filters.hasDiscountOnly && !(p.isLimitedDeal || p.hasCoupon || p.originalPrice > p.price)) {
        return false;
      }

      // Selected Tags Filter
      if (filters.selectedTags.length > 0) {
        const hasAllSelected = filters.selectedTags.every((t) => p.tags.includes(t));
        if (!hasAllSelected) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const handleSelectStockCode = (stockCode: string) => {
    // Case-insensitive lookup first
    const scLower = stockCode.trim().toLowerCase();
    const found = products.find(
      (p) =>
        (p.stockCode || '').toLowerCase() === scLower ||
        p.id.toLowerCase() === scLower
    );
    if (found) {
      setQuickViewProduct(found);
    } else {
      // Not in local list — create a placeholder and try to enrich from backend
      const placeholder = convertBackendProduct({ stock_code: stockCode, description: stockCode });
      setQuickViewProduct(placeholder);
      // Try to look up real description from backend products already loaded
      const backendMatch = products.find(
        (p) => (p.stockCode || '').replace(/\s/g, '').toLowerCase() === scLower.replace(/\s/g, '')
      );
      if (backendMatch) {
        setQuickViewProduct(backendMatch);
      }
    }
    // Scroll the detail page back to top
    const pdp = document.getElementById('pdp-root');
    if (pdp) pdp.scrollTop = 0;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const elem = document.getElementById('product-grid-anchor');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
      {/* Top Header */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        selectedCategory={filters.category}
        onCategoryChange={(cat) => handleFilterChange({ category: cat })}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
        currentZip={zip}
        currentCity={city}
        currency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Sub Navbar */}
      <SubNav
        onOpenDepartments={() => setIsDeptDrawerOpen(true)}
        selectedCategory={filters.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
        backendOnline={backendOnline}
        totalTags={totalTags}
      />

      {/* Hero Slider & 4-Quadrant Feature Cards */}
      {filters.category === 'All Departments' && !filters.searchQuery && (
        <>
          <HeroSlider
            onSelectCategory={(cat) => handleFilterChange({ category: cat })}
            onOpenAiStudio={() => setIsAiStudioOpen(true)}
          />
          <FeatureGrid
            products={products}
            onSelectCategory={(cat) => handleFilterChange({ category: cat })}
            onSelectProduct={(prod) => setQuickViewProduct(prod)}
            onOpenAiStudio={() => setIsAiStudioOpen(true)}
          />
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto px-2 sm:px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden flex items-center justify-between bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 text-xs font-bold text-gray-800 bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-3.5 rounded-lg border border-purple-200 transition cursor-pointer"
              aria-label="Toggle Filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              <span>{isMobileFilterOpen ? 'Hide Filters' : 'Filter Products'}</span>
              {(filters.category !== 'All Departments' || filters.selectedTags.length > 0 || filters.primeOnly || filters.hasDiscountOnly) && (
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              )}
            </button>
            <span className="text-xs text-gray-500 font-medium">
              <strong className="text-purple-700">{filteredProducts.length}</strong> items found
            </span>
          </div>

          {/* Left Filter Sidebar (visible always on lg, conditionally toggled on mobile) */}
          <div className={`w-full lg:w-64 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              availableTags={availableTags}
              allProducts={products}
            />
          </div>

          {/* Right Product Grid & Controls */}
          <div className="flex-1 min-w-0">
            <div id="product-grid-anchor" />

            {/* Results Header Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm mb-4 space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">
                    Showing <strong className="text-gray-900">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredProducts.length)}</strong> of <strong className="text-purple-700">{filteredProducts.length}</strong> items {totalPages > 1 && <span className="text-gray-400 font-normal">· Page {currentPage} of {totalPages}</span>}
                  </span>
                  {filters.category !== 'All Departments' && (
                    <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                      {filters.category}
                    </span>
                  )}
                  {filters.searchQuery && (
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      "{filters.searchQuery}"
                    </span>
                  )}
                </div>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-by-select" className="text-gray-500 font-semibold flex items-center gap-1 cursor-pointer">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    <span>Sort by:</span>
                  </label>
                  <select
                    id="sort-by-select"
                    value={filters.sortBy}
                    aria-label="Sort products by"
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50 font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer text-xs"
                  >
                    <option value="featured">Featured Picks</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Chips */}
              {filters.selectedTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3 text-purple-600" />
                    <span>Filtered by Tags:</span>
                  </span>
                  {filters.selectedTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleFilterChange({
                        selectedTags: filters.selectedTags.filter((tag) => tag !== t),
                      })}
                      className="bg-purple-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-purple-700 transition cursor-pointer"
                    >
                      <span>#{t}</span>
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  <button
                    onClick={() => handleFilterChange({ selectedTags: [] })}
                    className="text-[10px] text-purple-700 hover:underline font-bold ml-1 cursor-pointer"
                  >
                    Clear tag filters
                  </button>
                </div>
              )}
            </div>

            {/* Product Cards Grid & Loading State */}
            {loadingProducts ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center space-y-4 shadow-sm">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto" />
                <h3 className="text-base font-bold text-gray-900">Loading Product Catalogue...</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Connecting to the FastAPI backend and loading 3,939 items from the recommendation models.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  No products match your current filters
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing some filter tags, adjusting the price slider, or searching for other items.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-5 rounded-lg text-xs transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {paginatedProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onAddToCart={handleAddToCart}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onFilterByTag={(tag) => {
                        if (!filters.selectedTags.includes(tag)) {
                          handleFilterChange({ selectedTags: [...filters.selectedTags, tag] });
                        }
                      }}
                      isWishlisted={wishlist.some((w) => w.id === prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                      isCompared={compareList.some((c) => c.id === prod.id)}
                      onToggleCompare={handleToggleCompare}
                      currency={currency}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-8 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-gray-500 font-medium">
                      Showing <strong className="text-gray-900">{(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredProducts.length)}</strong> of <strong className="text-gray-900">{filteredProducts.length}</strong> products
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        aria-label="Previous Page"
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Prev</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                          .reduce<(number | string)[]>((acc, p, idx, arr) => {
                            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) {
                              acc.push('...');
                            }
                            acc.push(p);
                            return acc;
                          }, [])
                          .map((item, idx) =>
                            item === '...' ? (
                              <span key={`dots-${idx}`} className="px-2 text-gray-400 text-xs font-bold">
                                …
                              </span>
                            ) : (
                              <button
                                key={`page-${item}`}
                                onClick={() => handlePageChange(item as number)}
                                aria-label={`Go to page ${item}`}
                                aria-current={currentPage === item ? 'page' : undefined}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                                  currentPage === item
                                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {item}
                              </button>
                            )
                          )}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        aria-label="Next Page"
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modals and Drawers */}
      {/* Full-screen Product Detail Page */}
      {quickViewProduct && (
        <ProductDetailPage
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onSelectProduct={handleSelectStockCode}
          currency={currency}
          isWishlisted={wishlist.some((w) => w.id === quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromoCode={appliedPromoCode}
        promoDiscountPercent={promoDiscountPercent}
        onApplyPromoCode={handleApplyPromoCode}
        currency={currency}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountPercent={promoDiscountPercent}
        onOrderPlaced={(order) => {
          setOrders((prev) => [order, ...prev]);
          setCart([]);
        }}
        currentCity={city}
        currentZip={zip}
        currency={currency}
      />

      <AiTagStudioModal
        isOpen={isAiStudioOpen}
        onClose={() => setIsAiStudioOpen(false)}
        onAddNewProduct={handleAddNewProduct}
      />

      <DeliverToModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentCity={city}
        currentZip={zip}
        onSaveLocation={(newCity, newZip) => {
          setCity(newCity);
          setZip(newZip);
        }}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      <DepartmentDrawer
        isOpen={isDeptDrawerOpen}
        onClose={() => setIsDeptDrawerOpen(false)}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={(p) => handleAddToCart(p)}
        currency={currency}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={compareList}
        onRemoveFromCompare={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p)}
        currency={currency}
      />

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
};

export default App;
