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
    badge: 'Pathi Labs Flagship',
    title: 'Precision Diagnostics & Clinical Lab Hardware',
    subtitle: 'Equip your medical & research facility with 4K AI Microscopes and Centrifuges.',
    discount: 'Up to 35% Off',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&auto=format&fit=crop&q=80',
    category: 'Lab & Medical',
    ctaText: 'Explore Lab Tech',
  },
  {
    id: 2,
    badge: 'Pro Creator & Gaming',
    title: '32" 4K OLED 144Hz High-Refresh Displays',
    subtitle: 'Experience true infinite contrast, 0.03ms response, and 90W USB-C studio docking.',
    discount: 'Special Launch Deal: $300 Off',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    ctaText: 'Shop Electronics',
  },
  {
    id: 3,
    badge: 'Biometric Wearables',
    title: 'Titanium BioTrack Smartwatches & Active Earbuds',
    subtitle: 'Clinical ECG, SpO2 monitoring, and 14-day battery life built for elite endurance.',
    discount: 'Save Extra 15% with Code PATHI20',
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=1600&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    ctaText: 'Discover Wearables',
  },
  {
    id: 4,
    badge: 'Skin Science & Wellness',
    title: 'Dermatologist Formulated Clinical Skincare',
    subtitle: 'Active Hyaluronic Acid cleansers and Vitamin C 20% antioxidant brightening serums.',
    discount: 'Buy 1 Get 1 at 50% Off',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80',
    category: 'Beauty & Skincare',
    ctaText: 'Shop Skincare',
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
      <div className="relative max-w-[1550px] mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-28 md:pb-36 z-10">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-600/40 border border-purple-400/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{slide.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-amber-300 font-bold">{slide.discount}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-300 line-clamp-2 max-w-xl">
            {slide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectCategory(slide.category)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg shadow-purple-600/30 flex items-center gap-2 text-sm transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAiStudio}
              className="bg-slate-800/80 hover:bg-slate-700/80 border border-purple-500/40 backdrop-blur-md text-purple-200 hover:text-white font-semibold px-4 py-3 rounded-lg text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span>AI Tag Predictor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full border border-white/20 backdrop-blur-sm transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full border border-white/20 backdrop-blur-sm transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-purple-500' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
