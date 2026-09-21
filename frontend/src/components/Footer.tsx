import React from 'react';
import { ChevronUp, Globe, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-white text-xs mt-16 border-t border-purple-900/30">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#1e293b] hover:bg-[#334155] text-gray-300 hover:text-white py-3 font-bold flex items-center justify-center gap-1 transition"
      >
        <ChevronUp className="w-4 h-4" />
        <span>Back to top</span>
      </button>

      {/* 4-Column Directory */}
      <div className="max-w-[1550px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-extrabold text-sm text-white mb-3 tracking-wide">
            Get to Know Us
          </h4>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li className="hover:text-white hover:underline cursor-pointer">About Pathi Labs</li>
            <li className="hover:text-white hover:underline cursor-pointer">Biotech &amp; AI Research</li>
            <li className="hover:text-white hover:underline cursor-pointer">Careers &amp; Innovation</li>
            <li className="hover:text-white hover:underline cursor-pointer">Press Center</li>
            <li className="hover:text-white hover:underline cursor-pointer">Pathi Labs Science Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-sm text-white mb-3 tracking-wide">
            Make Money with Us
          </h4>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li className="hover:text-white hover:underline cursor-pointer">Sell on Pathi Labs</li>
            <li className="hover:text-white hover:underline cursor-pointer">Supply Medical Hardware</li>
            <li className="hover:text-white hover:underline cursor-pointer">Become an Affiliate Partner</li>
            <li className="hover:text-white hover:underline cursor-pointer">Fulfillment by Pathi Labs</li>
            <li className="hover:text-white hover:underline cursor-pointer">Advertise Your Products</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-sm text-white mb-3 tracking-wide">
            Payment &amp; Protection
          </h4>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li className="hover:text-white hover:underline cursor-pointer">Pathi Labs Business Card</li>
            <li className="hover:text-white hover:underline cursor-pointer">Shop with Rewards Points</li>
            <li className="hover:text-white hover:underline cursor-pointer">Reload Your Balance</li>
            <li className="hover:text-white hover:underline cursor-pointer">Pathi Labs Currency Converter</li>
            <li className="hover:text-white hover:underline cursor-pointer">256-Bit SSL Protection</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-sm text-white mb-3 tracking-wide">
            Let Us Help You
          </h4>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li className="hover:text-white hover:underline cursor-pointer">Your Account &amp; Orders</li>
            <li className="hover:text-white hover:underline cursor-pointer">Shipping Rates &amp; Policies</li>
            <li className="hover:text-white hover:underline cursor-pointer">Returns &amp; Replacements</li>
            <li className="hover:text-white hover:underline cursor-pointer">Manage Your Devices</li>
            <li className="hover:text-white hover:underline cursor-pointer">Customer Service Desk</li>
          </ul>
        </div>
      </div>

      {/* Brand Bar */}
      <div className="border-t border-slate-800/80 py-6 bg-[#090d16]">
        <div className="max-w-[1550px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 p-0.5 border border-purple-500/30 flex-shrink-0">
              <img src="/logo.jpg" alt="Pathi Labs Logo" width="32" height="32" className="w-full h-full object-cover rounded" />
            </div>
            <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400">
              Pathi<span className="text-purple-400">Labs</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1 border border-slate-700 px-2.5 py-1 rounded">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>English</span>
            </span>
            <span className="border border-slate-700 px-2.5 py-1 rounded">
              $ USD - U.S. Dollar
            </span>
            <span className="border border-slate-700 px-2.5 py-1 rounded">
              United States
            </span>
          </div>
        </div>

        <div className="max-w-[1550px] mx-auto px-4 text-center text-slate-400 text-xs mt-4 pt-4 border-t border-slate-800/40">
          &copy; {new Date().getFullYear()} Pathi Labs, Inc. or its affiliates. All rights reserved. Powered by React, TailwindCSS &amp; FastAPI ML Tagging Engine.
        </div>
      </div>
    </footer>
  );
};
