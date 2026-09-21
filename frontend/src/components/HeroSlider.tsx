import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  category: string;
  ctaText: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: 'Curated Home Accents',
    title: 'Artisan Hanging Hearts, Lanterns & Ambient Decor',
    subtitle: 'Transform your living spaces with authentic vintage craftsmanship and warm candlelight styling.',
    discount: 'Catalogue Collection · 3,939 Items',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&auto=format&fit=crop&q=80',
    category: 'Home Décor',
    ctaText: 'Explore Home Décor',
  },
  {
    id: 2,
    badge: 'Candles & Ambient Lighting',
    title: 'Warm T-Light Holders, Lanterns & Rustic Candlecraft',
    subtitle: 'Handcrafted glass, wrought iron and zinc tea-light holders designed for cozy evenings.',
    discount: 'Up to 30% Off Best Sellers',
    image: 'https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=1600&auto=format&fit=crop&q=80',
    category: 'Candles & Lighting',
    ctaText: 'Shop Candlecraft',
  },
  {
    id: 3,
    badge: 'Kitchen & Baking Heritage',
    title: 'Vintage Mugs, Decorative Tins & Tea Sets',
    subtitle: 'Charming ceramic mugs, recipe boxes, and classic British tea accessories.',
    discount: 'Free Next-Day Prime Delivery',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop&q=80',
    category: 'Kitchen & Dining',
    ctaText: 'Discover Kitchenware',
  },
  {
    id: 4,
    badge: 'Machine Learning Recommendations',
    title: 'AI-Powered Related Products & Co-Purchase Predictions',
    subtitle: 'Explore our hybrid recommendation matrix loaded live from 3,939 retail items.',
    discount: 'Cosine + Collaborative Filtering',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1600&auto=format&fit=crop&q=80',
    category: 'All Departments',
    ctaText: 'Explore Recommendations',
  },
];

interface HeroSliderProps {
  onSelectCategory: (category: string) => void;
  onOpenAiStudio: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectCategory, onOpenAiStudio }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[360px] sm:min-h-[440px] md:min-h-[480px]">
      {/* Background Image with Gradient Mask */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center opacity-40 transition-opacity duration-1000 scale-105"
        />
        {/* Amazon-style bottom fade to page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f3f4f6] via-[#0f172a]/60 to-[#0f172a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent max-w-3xl" />
      </div>

      {/* Slide Content */}
      <div className="relative max-w-[1550px] mx-auto px-4 sm:px-8 pt-8 sm:pt-16 pb-20 sm:pb-28 md:pb-36 z-10">
        <div className="max-w-2xl space-y-2.5 sm:space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-purple-600/40 border border-purple-400/50 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span className="truncate max-w-[140px] sm:max-w-none">{slide.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
            <span className="text-amber-300 font-bold truncate max-w-[160px] sm:max-w-none">{slide.discount}</span>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-snug sm:leading-tight text-white drop-shadow-sm">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-gray-300 line-clamp-2 max-w-xl">
            {slide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => onSelectCategory(slide.category)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-lg shadow-purple-600/30 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={onOpenAiStudio}
              className="bg-slate-800/80 hover:bg-slate-700/80 border border-purple-500/40 backdrop-blur-md text-purple-200 hover:text-white font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              <span>AI Tag Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-2.5 rounded-full border border-white/20 backdrop-blur-sm transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-2.5 rounded-full border border-white/20 backdrop-blur-sm transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-6 sm:w-8 bg-purple-500' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
