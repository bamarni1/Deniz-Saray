import React from 'react';
import LogoImage from '../assets/images/deniz_saray_logo_1783724638580.jpg';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  lang?: string;
  isDark?: boolean;
}

export default function DenizSarayLogo({ className = "", size = 48, showText = false, lang = "ar", isDark = false }: LogoProps) {
  // Use language translations if showText is true
  const displayNames: Record<string, { main: string; sub: string }> = {
    ar: { main: "دنيز سراي", sub: "للسياحة والسفر" },
    ku: { main: "دەنیز سەرای", sub: "بۆ گەشت و سەیرانان" },
    tr: { main: "Deniz Saray", sub: "Tourism & Travel" },
    en: { main: "Deniz Saray", sub: "Tourism & Travel" }
  };

  const text = displayNames[lang] || displayNames['en'];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Exquisite Circular Emblem Logo matching the user's exact uploaded logo */}
      <div 
        className="shrink-0 rounded-full overflow-hidden border border-[#d1af66]/30 shadow-md hover:scale-105 transition-transform duration-300 bg-[#f7f3e8]"
        style={{ width: size, height: size }}
      >
        <img 
          src={LogoImage} 
          alt="Deniz Saray Tourism & Travel Logo" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-baseline gap-1">
            <span className={`font-serif text-xl sm:text-2xl font-black tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {text.main}
            </span>
            <span className="text-[9px] uppercase px-1 py-0.5 bg-amber-100 text-amber-800 font-extrabold rounded leading-none">
              VIP
            </span>
          </div>
          <span className={`text-[9px] sm:text-[10px] uppercase font-black tracking-widest mt-1 leading-none ${isDark ? 'text-emerald-400' : 'text-[#0f5963]'}`}>
            {text.sub}
          </span>
        </div>
      )}
    </div>
  );
}
