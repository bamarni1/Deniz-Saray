import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { DriverData, Language } from '../types';
import { Car, Phone, Navigation, RefreshCw } from 'lucide-react';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function DriverMarker({ driver, lang }: { driver: DriverData; lang: Language; key?: string }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  if (!driver.lat || !driver.lng) return null;

  const position = { lat: driver.lat, lng: driver.lng };
  const markerColor = driver.status === 'Available' ? '#10B981' : '#F59E0B'; // emerald vs amber

  // Translate status
  const getStatusText = (status: string) => {
    if (status === 'Available') {
      if (lang === 'ar') return 'متاح';
      if (lang === 'ku') return 'بەردەستە';
      if (lang === 'tr') return 'Müsait';
      return 'Available';
    }
    if (status === 'On Trip') {
      if (lang === 'ar') return 'في رحلة';
      if (lang === 'ku') return 'د گەشتێ دا';
      if (lang === 'tr') return 'Seferde';
      return 'On Trip';
    }
    if (lang === 'ar') return 'غير متصل';
    if (lang === 'ku') return 'نەهێڵە';
    if (lang === 'tr') return 'Çevrimdışı';
    return 'Offline';
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={() => setInfoOpen(true)}
        title={driver.name}
      >
        <div className="relative group cursor-pointer">
          <div 
            className="flex items-center justify-center rounded-full border-2 border-white shadow-lg text-white font-bold transition-transform hover:scale-110"
            style={{ 
              backgroundColor: markerColor, 
              width: '40px', 
              height: '40px' 
            }}
          >
            <Car className="w-5 h-5" />
          </div>
          {/* Label tooltip */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-90 group-hover:opacity-100 transition z-50">
            {driver.name}
          </div>
        </div>
      </AdvancedMarker>

      {infoOpen && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
          <div className="p-2 min-w-[200px] text-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-2.5 h-2.5 rounded-full animate-pulse" 
                style={{ backgroundColor: markerColor }}
              />
              <span className="font-extrabold text-xs text-slate-900">{driver.name}</span>
              <span className="text-[9px] font-bold text-slate-400 ml-auto uppercase">{getStatusText(driver.status)}</span>
            </div>
            
            <p className="text-xs text-slate-600 font-semibold mb-1">
              🚘 {driver.carModel}
            </p>
            <p className="text-[11px] text-slate-500 font-semibold mb-2">
              🗣️ {driver.languages.join(' • ')}
            </p>
            
            <div className="flex gap-2 mt-3 pt-2 border-t border-slate-100">
              <a 
                href={`tel:${driver.phone}`} 
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-[10px] font-extrabold transition"
              >
                <Phone className="w-3 h-3" />
                {lang === 'ar' ? 'اتصال' : lang === 'ku' ? 'تەلەفۆن' : lang === 'tr' ? 'Ara' : 'Call'}
              </a>
              <a 
                href={`https://wa.me/${driver.phone.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-md text-[10px] font-extrabold transition ml-auto"
              >
                {lang === 'ar' ? 'واتساب' : lang === 'ku' ? 'واتسئاپ' : lang === 'tr' ? 'WhatsApp' : 'WhatsApp'}
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

interface ChauffeurMapTrackerProps {
  drivers: DriverData[];
  lang: Language;
  onRefreshTelemetry: () => void;
  isFetching: boolean;
}

export default function ChauffeurMapTracker({ drivers, lang, onRefreshTelemetry, isFetching }: ChauffeurMapTrackerProps) {
  if (!hasValidKey) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-center items-center text-center h-[450px]">
        <div className="max-w-md space-y-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Navigation className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">
            {lang === 'ar' ? 'مطلوب مفتاح واجهة برمجة خرائط جوجل (Google Maps API Key)' :
             lang === 'ku' ? 'کلیلا نەخشەیێ Google Maps پێدڤی یە' :
             lang === 'tr' ? 'Google Maps API Anahtarı Gerekli' :
             'Google Maps API Key Required'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            {lang === 'ar' ? 'يرجى تهيئة مفتاح الترخيص لعرض الخريطة التفاعلية وتتبع تحركات السائقين بشكل حي.' :
             lang === 'ku' ? 'هیڤیە کلیلەکێ چێبکەن دا کو بشێن نەخشەیێ کارلێکەر و لڤینێن شوفێران ببینن.' :
             lang === 'tr' ? 'Canlı VIP sürücü takibi ve interaktif haritayı etkinleştirmek için lütfen API anahtarınızı tanımlayın.' :
             'Please configure the API Key to unlock real-time location streaming and driver tracking on Google Maps.'}
          </p>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
            <p className="font-extrabold text-slate-800">
              {lang === 'ar' ? 'خطوات التفعيل:' :
               lang === 'ku' ? 'گاڤێن چالاککرنێ:' :
               lang === 'tr' ? 'Etkinleştirme Adımları:' :
               'Setup Guide:'}
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-1 font-medium">
              <li>
                <a 
                  href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
                  target="_blank" 
                  rel="noopener"
                  className="text-emerald-600 hover:underline font-bold inline-flex items-center gap-0.5"
                >
                  {lang === 'ar' ? 'اضغط هنا للحصول على مفتاح مجاني' :
                   lang === 'ku' ? 'ل ڤێرێ کلیک بکە بۆ بدەستڤەئینانا کلیلەکا خۆڕایی' :
                   lang === 'tr' ? 'Ücretsiz bir API anahtarı almak için buraya tıklayın' :
                   'Get an API Key'}
                </a>
              </li>
              <li>
                {lang === 'ar' ? 'افتح الإعدادات (أيقونة الترس ⚙️ في الزاوية العلوية اليمنى)' :
                 lang === 'ku' ? 'ڕێکخستنان ڤەکە (نیشانا چەرخێ ⚙️ ل گۆشەیا ڕاستێ یا سەرى)' :
                 lang === 'tr' ? 'Ayarlar panelini açın (sağ üst köşedeki ⚙️ dişli simgesi)' :
                 'Open Settings (⚙️ gear icon, top-right corner)'}
              </li>
              <li>
                {lang === 'ar' ? 'اختر الأسرار (Secrets) وأدخل الاسم: GOOGLE_MAPS_PLATFORM_KEY' :
                 lang === 'ku' ? 'پشكا (Secrets) هەلبژێرە و ناڤی بنووسە: GOOGLE_MAPS_PLATFORM_KEY' :
                 lang === 'tr' ? 'Secrets (Sırlar) sekmesini seçin ve şu adı girin: GOOGLE_MAPS_PLATFORM_KEY' :
                 'Select Secrets and enter name: GOOGLE_MAPS_PLATFORM_KEY'}
              </li>
              <li>
                {lang === 'ar' ? 'ألصق المفتاح كقيمة واضغط Enter. سيعيد التطبيق البناء تلقائياً.' :
                 lang === 'ku' ? 'کلیلێ ل ڤێرێ بچسبینە و دوگمەیا Enter کلیک بکە.' :
                 lang === 'tr' ? 'API anahtarınızı yapıştırıp Enter tuşuna basın. Uygulama otomatik olarak yeniden derlenecektir.' :
                 'Paste your API key and press Enter. The app will rebuild automatically.'}
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Istanbul coordinates baseline
  const defaultCenter = { lat: 41.015, lng: 28.98 };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col h-[520px] space-y-4 relative">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            {lang === 'ar' ? 'نظام التتبع الجغرافي الخارجي للسائقين' :
             lang === 'ku' ? 'سیستەما شوێنکەفتنا جوگرافی یا شوفێران' :
             lang === 'tr' ? 'Harici GPS Sürücü Takip Sistemi' :
             'External GPS Driver Tracker'}
          </h4>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
            {lang === 'ar' ? 'مواقع تقريبية فورية من خلال واجهات برمجة تطبيقات الـ GPS لسائقي Deniz Saray.' :
             lang === 'ku' ? 'جهێن نێزیکی یێن دەمێ ڕاستەقینە ب ڕێیا برۆگرامێن GPS بۆ شوفێرێن دنيز سراي.' :
             lang === 'tr' ? 'Deniz Saray VIP şoförlerinin canlı GPS konumları.' :
             'Real-time approximate VIP driver coordinates updated continuously.'}
          </p>
        </div>
        
        <button
          onClick={onRefreshTelemetry}
          disabled={isFetching}
          className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition duration-150 flex items-center gap-1.5 text-xs font-bold disabled:opacity-50"
          title="Refresh real-time GPS coordinates"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          <span>{lang === 'ar' ? 'تحديث الإشارة' :
                lang === 'ku' ? 'نووکرنا نیشانێ' :
                lang === 'tr' ? 'Sinyal Güncelle' :
                'Ping GPS'}</span>
        </button>
      </div>

      <div className="flex-grow rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={11}
            mapId="DEMO_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            {drivers.map((drv) => (
              <DriverMarker key={drv.id} driver={drv} lang={lang} />
            ))}
          </Map>
        </APIProvider>
        
        {/* Real-time Indicator Layer */}
        <div className="absolute top-4 left-4 bg-slate-900/90 text-white px-3 py-1.5 rounded-full text-[9px] font-extrabold flex items-center gap-2 shadow-lg backdrop-blur-sm tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>
            {lang === 'ar' ? 'اتصال مباشر بالأقمار الصناعية' :
             lang === 'ku' ? 'پەیوەندی ڕاستەوخۆ ب دەمێ ڕاستەقینە' :
             lang === 'tr' ? 'CANLI UYDU BAĞLANTISI' :
             'LIVE SATELLITE CONNECTION'}
          </span>
        </div>
      </div>
    </div>
  );
}
