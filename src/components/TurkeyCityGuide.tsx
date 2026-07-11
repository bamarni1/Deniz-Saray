import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Phone, 
  ChevronRight, 
  X, 
  Globe, 
  Layers,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { turkishCities, allRemainingCities, CityGuide } from '../citiesData';
import { Language } from '../types';

interface TurkeyCityGuideProps {
  lang: Language;
  onBookCity: (cityId: string) => void;
}

export default function TurkeyCityGuide({ lang, onBookCity }: TurkeyCityGuideProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<CityGuide | null>(null);

  const isRtl = lang === 'ar' || lang === 'ku';

  // Region Translations helper
  const regionNames: Record<string, Record<Language, string>> = {
    'All': { ar: 'الكل', ku: 'هەموو', tr: 'Hepsi', en: 'All' },
    'Marmara': { ar: 'مرمرة', ku: 'مەرمەرە', tr: 'Marmara', en: 'Marmara' },
    'Ege': { ar: 'إيجة', ku: 'ئیجە', tr: 'Ege', en: 'Aegean' },
    'Akdeniz': { ar: 'البحر المتوسط', ku: 'دەریای ناوەڕاست', tr: 'Akdeniz', en: 'Mediterranean' },
    'Karadeniz': { ar: 'البحر الأسود', ku: 'دەریای ڕەش', tr: 'Karadeniz', en: 'Black Sea' },
    'İç Anadolu': { ar: 'وسط الأناضول', ku: 'ناوەڕاستی ئانادۆڵ', tr: 'İç Anadolu', en: 'Central Anatolia' },
    'Doğu Anadolu': { ar: 'شرق الأناضول', ku: 'ڕۆژهەڵاتی ئانادۆڵ', tr: 'Doğu Anadolu', en: 'Eastern Anatolia' },
    'Güneydoğu Anadolu': { ar: 'جنوب شرق الأناضول', ku: 'باشووری ڕۆژهەڵاتی ئانادۆڵ', tr: 'Güneydoğu Anadolu', en: 'Southeastern Anatolia' }
  };

  const t = useMemo(() => {
    return {
      searchPlaceholder: {
        ar: "ابحث عن أي مدينة أو معلم سياحي في تركيا (مثال: كابادوكيا، أولوداغ)...",
        ku: "بگەڕێ بۆ هەر شارێک یان شوێنەوارێکی گەشتیاری لە تورکیا...",
        tr: "Türkiye'deki herhangi bir şehri veya turistik yeri arayın...",
        en: "Search any Turkish city or tourist attraction (e.g., Cappadocia)..."
      }[lang],
      allRegions: regionNames['All'][lang],
      sectionTitle: {
        ar: "دليل المدن السياحي التركي المتكامل",
        ku: "رێبەری گەشتیاریی تێر و تەسەلی شارەکانی تورکیا",
        tr: "Kapsamlı Türkiye Şehirler Rehberi",
        en: "Comprehensive Turkish Cities Directory & Travel Guide"
      }[lang],
      sectionSubtitle: {
        ar: "استكشف دليلاً سياحياً مفصلاً لجميع الـ 81 ولاية تركية مع أفضل المعالم والمواسم المقترحة للزيارة وطلب رحلة فورية.",
        ku: "لێرەدا رێبەرێکی گەشتیاریی ورد ببینە بۆ هەموو ٨١ پارێزگاکانی تورکیا لەگەڵ باشترین کات و شوێنەوارەکان.",
        tr: "Türkiye'nin 81 ilinin tamamını keşfedin. Tarihi yerler, en iyi ziyaret zamanları, ideal süreler ve anında rezervasyon imkanı.",
        en: "Explore a rich travel guide for all 81 provinces of Turkey. Find top landmarks, best seasons, ideal stay durations, and book instantly."
      }[lang],
      bestSeason: {
        ar: "أفضل موسم",
        ku: "باشترین وەرز",
        tr: "En İyi Sezon",
        en: "Best Season"
      }[lang],
      duration: {
        ar: "المدة المقترحة",
        ku: "ماوەی پێشنیارکراو",
        tr: "Önerilen Süre",
        en: "Recommended Stay"
      }[lang],
      highlights: {
        ar: "أبرز المعالم والأنشطة",
        ku: "گرنگترین شوێنەوار و چالاکییەکان",
        tr: "Öne Çıkan Yerler & Aktiviteler",
        en: "Top Attractions & Activities"
      }[lang],
      bookNow: {
        ar: "طلب رحلة مخصصة",
        ku: "داواکردنی گەشتی تایبەت",
        tr: "Özel Tur Talep Et",
        en: "Request Custom Tour"
      }[lang],
      viewDetails: {
        ar: "عرض الدليل الكامل",
        ku: "پیشاندانی ڕێبەری تەواو",
        tr: "Detaylı Rehberi Göster",
        en: "View Full Guide"
      }[lang],
      close: {
        ar: "إغلاق",
        ku: "داخستن",
        tr: "Kapat",
        en: "Close"
      }[lang],
      primaryAttraction: {
        ar: "المعلم الرئيسي",
        ku: "سەرەکیترین شوێنەوار",
        tr: "Başlıca Cazibe Merkezi",
        en: "Primary Landmark"
      }[lang],
      matchingCount: {
        ar: "ولاية تم العثور عليها",
        ku: "پارێزگا دۆزرایەوە",
        tr: "il bulundu",
        en: "provinces found"
      }[lang]
    };
  }, [lang]);

  // Combine and normalize all 81 cities
  const normalizedAllCities = useMemo(() => {
    // 1. Create lookup for custom detailed cities
    const detailedMap = new Map(turkishCities.map(c => [c.id, c]));

    // 2. Map all 81 provinces
    // We combine the rich details we have, and generate high-quality standardized guides for any other province
    const results: CityGuide[] = [];

    // Add rich ones first
    turkishCities.forEach(c => results.push(c));

    // Add remaining 81 provinces
    allRemainingCities.forEach(rem => {
      // Avoid duplicate if already in rich list
      if (detailedMap.has(rem.id)) return;

      // Construct a high-quality generalized guide for the province
      const regKey = rem.region; // e.g. "Doğu Anadolu", "Ege"
      // Map region names to standard English values for matching
      let standardRegionName = regKey;
      if (regKey === "Marmara") standardRegionName = "Marmara";
      else if (regKey === "Ege") standardRegionName = "Ege";
      else if (regKey === "Akdeniz") standardRegionName = "Akdeniz";
      else if (regKey === "Karadeniz") standardRegionName = "Karadeniz";
      else if (regKey === "İç Anadolu") standardRegionName = "İç Anadolu";
      else if (regKey === "Doğu Anadolu") standardRegionName = "Doğu Anadolu";
      else if (regKey === "Güneydoğu Anadolu") standardRegionName = "Güneydoğu Anadolu";

      // Build translations for regions
      const regionTrans = {
        ar: regionNames[standardRegionName]?.ar || regKey,
        ku: regionNames[standardRegionName]?.ku || regKey,
        tr: regionNames[standardRegionName]?.tr || regKey,
        en: regionNames[standardRegionName]?.en || regKey,
      };

      // Construct localized attractions
      const attractionName = rem.attraction;
      const attractionAr = `زيارة واستكشاف ${attractionName}`;
      const attractionKu = `سەردانی شوێنەواری ${attractionName}`;
      const attractionTr = `${attractionName} ziyareti ve doğa gezisi`;
      const attractionEn = `Visit the magnificent ${attractionName}`;

      results.push({
        id: rem.id,
        names: {
          ar: rem.names.ar,
          ku: rem.names.ku,
          tr: rem.names.tr,
          en: rem.names.en
        },
        region: regionTrans,
        bestSeason: {
          ar: "الربيع والخريف",
          ku: "بەهار و پایز",
          tr: "İlkbahar ve Sonbahar",
          en: "Spring & Autumn"
        },
        duration: {
          ar: "1-2 يوم",
          ku: "١-٢ رۆژ",
          tr: "1-2 Gün",
          en: "1-2 Days"
        },
        highlights: {
          ar: [
            attractionAr,
            "استكشاف الطبيعة والأسواق المحلية العريقة",
            "تذوق الوجبات الشعبية وتجربة الضيافة التركية الأصيلة"
          ],
          ku: [
            attractionKu,
            "گەڕان لە سروشت و بازاڕە مێژووییەکان",
            "تامکردنی خواردنە باوەکانی ناوچەکە"
          ],
          tr: [
            attractionTr,
            "Tarihi yerleri ve yerel pazarları keşif",
            "Meşhur yöresel lezzetleri ve geleneksel esnaf lokantalarını deneyimleme"
          ],
          en: [
            attractionEn,
            "Explore historic sites and local authentic markets",
            "Taste the legendary local cuisine and enjoy Turkish hospitality"
          ]
        },
        desc: {
          ar: `اكتشف ولاية ${rem.names.ar} العريقة الواقعة في منطقة ${regionTrans.ar}، المشهورة بمعلمها البارز "${attractionName}" وثقافتها المحلية الأصيلة.`,
          ku: `پارێزگای ${rem.names.ku} لە ناوچەی ${regionTrans.ku} بناسە، کە بە شوێنەواری مێژوویی "${attractionName}" و کولتوورە دەوڵەمەندەکەی بەناوبانگە.`,
          tr: `${rem.names.tr} ili, ${regionTrans.tr} bölgesinde yer alan, başlıca cazibe merkezi "${attractionName}" olan ve eşsiz kültürel zenginlikleri barındıran güzide bir şehrimizdir.`,
          en: `Discover the beautiful province of ${rem.names.en} located in the ${regionTrans.en} region, highly regarded for its landmark "${attractionName}" and deep-rooted cultural heritage.`
        }
      });
    });

    return results;
  }, [lang]);

  // Filter cities by search query and region
  const filteredCities = useMemo(() => {
    return normalizedAllCities.filter(city => {
      // Region Match
      if (selectedRegion !== 'All') {
        // Map standard English region name or matched keys
        const matchMarmara = selectedRegion === 'Marmara' && city.region.en === 'Marmara';
        const matchEge = selectedRegion === 'Ege' && city.region.en === 'Aegean';
        const matchAkdeniz = selectedRegion === 'Akdeniz' && city.region.en === 'Mediterranean';
        const matchKaradeniz = selectedRegion === 'Karadeniz' && city.region.en === 'Black Sea';
        const matchIcAnadolu = selectedRegion === 'İç Anadolu' && city.region.en === 'Central Anatolia';
        const matchDoguAnadolu = selectedRegion === 'Doğu Anadolu' && city.region.en === 'Eastern Anatolia';
        const matchGuneyDoguAnadolu = selectedRegion === 'Güneydoğu Anadolu' && city.region.en === 'Southeastern Anatolia';

        if (!matchMarmara && !matchEge && !matchAkdeniz && !matchKaradeniz && !matchIcAnadolu && !matchDoguAnadolu && !matchGuneyDoguAnadolu) {
          return false;
        }
      }

      // Search Match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = (
          city.names.ar.toLowerCase().includes(query) ||
          city.names.ku.toLowerCase().includes(query) ||
          city.names.tr.toLowerCase().includes(query) ||
          city.names.en.toLowerCase().includes(query)
        );

        const highlightMatch = (
          city.highlights.ar.some(h => h.toLowerCase().includes(query)) ||
          city.highlights.ku.some(h => h.toLowerCase().includes(query)) ||
          city.highlights.tr.some(h => h.toLowerCase().includes(query)) ||
          city.highlights.en.some(h => h.toLowerCase().includes(query))
        );

        const descMatch = (
          city.desc.ar.toLowerCase().includes(query) ||
          city.desc.ku.toLowerCase().includes(query) ||
          city.desc.tr.toLowerCase().includes(query) ||
          city.desc.en.toLowerCase().includes(query)
        );

        return nameMatch || highlightMatch || descMatch;
      }

      return true;
    });
  }, [normalizedAllCities, selectedRegion, searchQuery]);

  return (
    <div id="turkey_city_guide_section" className="space-y-8 bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-100">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <Compass className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.sectionTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {t.sectionSubtitle}
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-black shadow-sm flex items-center gap-1.5 self-start md:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{filteredCities.length} {t.matchingCount}</span>
        </div>
      </div>

      {/* Search Bar & Region Badges */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region Filters (Horizontal Scrolling on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none whitespace-nowrap">
          <div className="text-slate-400 text-xs font-bold mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>المنطقة:</span>
          </div>
          {Object.entries(regionNames).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedRegion(key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm border ${
                selectedRegion === key
                  ? 'bg-emerald-600 border-emerald-600 text-white font-black'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {value[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Cities Grid with Framer Motion Stagger */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredCities.slice(0, 24).map((city) => {
            const isRich = turkishCities.some(tc => tc.id === city.id);
            return (
              <motion.div
                key={city.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`bg-white rounded-2xl border ${
                  isRich ? 'border-emerald-500/20 shadow-emerald-500/5 shadow-md' : 'border-slate-200'
                } p-5 flex flex-col justify-between hover:shadow-lg hover:border-emerald-500/40 transition duration-300 relative group overflow-hidden`}
              >
                {/* Visual Accent for deep rich cities */}
                {isRich && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-bl-full pointer-events-none" />
                )}

                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase">
                      {city.region[lang]}
                    </span>
                    {isRich && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-black rounded-lg flex items-center gap-0.5 border border-amber-200/50">
                        <Sparkles className="w-2.5 h-2.5" />
                        VIP GUIDE
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition">
                      {city.names[lang]}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {city.desc[lang]}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 border-t border-slate-50 pt-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{city.bestSeason[lang]}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{city.duration[lang]}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <button
                    onClick={() => setSelectedCity(city)}
                    className="text-slate-600 hover:text-emerald-700 text-xs font-black flex items-center gap-1 transition"
                  >
                    <span>{t.viewDetails}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    onClick={() => onBookCity(city.id)}
                    className="p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl transition duration-200"
                    title={t.bookNow}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Show pagination notice if more cities match */}
      {filteredCities.length > 24 && (
        <div className="text-center text-xs text-slate-400 py-2">
          {lang === 'ar' 
            ? "اكتب اسم المدينة في محرك البحث أعلاه لعرض باقي المدن الـ 81 بالتفصيل..." 
            : "Use the search bar above to instantly find more of Turkey's 81 beautiful provinces..."}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCity(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-xl w-full max-w-xl overflow-hidden relative z-10 border border-slate-100"
            >
              {/* Decorative top accent */}
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCity(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* City Title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg">
                      {selectedCity.region[lang]}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      Turkey
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    {selectedCity.names[lang]}
                  </h4>
                </div>

                {/* Main Description */}
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {selectedCity.desc[lang]}
                </p>

                {/* Travel stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">{t.bestSeason}</span>
                      <span className="text-xs font-bold text-slate-800">{selectedCity.bestSeason[lang]}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">{t.duration}</span>
                      <span className="text-xs font-bold text-slate-800">{selectedCity.duration[lang]}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {t.highlights}
                  </h5>
                  <ul className="space-y-2.5">
                    {selectedCity.highlights[lang].map((h, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 p-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking CTA Button */}
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => {
                      onBookCity(selectedCity.id);
                      setSelectedCity(null);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-emerald-600/10"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{t.bookNow}</span>
                  </button>

                  <a
                    href={`https://wa.me/905380507777?text=${encodeURIComponent(
                      lang === 'ar' 
                        ? `مرحباً، أريد الاستفسار وحجز برنامج سياحي في مدينة ${selectedCity.names.ar} التركية.` 
                        : `Hello, I would like to inquire about booking a tour in ${selectedCity.names.en}, Turkey.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-4 rounded-2xl flex items-center justify-center transition"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
