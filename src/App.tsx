import React, { useState, useEffect, useRef } from 'react';
import { 
  Palmtree, 
  Car, 
  Hotel, 
  Plane, 
  Activity, 
  MessageSquare, 
  Sliders, 
  MapPin, 
  Calendar, 
  Users, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Trash2, 
  Send, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  Globe, 
  Share2, 
  Grid, 
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { translations } from './translations';
import { Language, Booking, DriverData, HotelData, HospitalData } from './types';
import TurkeyCityGuide from './components/TurkeyCityGuide';
import { turkishCities, allRemainingCities } from './citiesData';
import DenizSarayLogo from './components/DenizSarayLogo';
import ChauffeurMapTracker from './components/ChauffeurMapTracker';

// Import Firebase
import { db, initAuth } from './lib/firebase';
import { collection, addDoc, onSnapshot, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Custom elegant Snapchat Icon SVG (since lucide-react doesn't export it)
function SnapchatIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M11.962 2.5c-.702 0-1.547.078-2.428.324-.764.213-1.428.534-1.928.966-.5.431-.77 1.011-.77 1.68v.02c0 .121-.007.242-.02.36-.025.215-.091.42-.19.605-.094.175-.224.32-.38.423-.131.087-.279.13-.43.125h-.065c-.71 0-1.353.488-1.524 1.18-.171.691.171 1.41.815 1.71l.058.026c.205.093.376.25.49.444.113.193.16.42.13.645-.062.463-.199 1.066-.39 1.68a.932.932 0 0 0-.012.56c.053.2.179.37.354.48.175.11.385.14.58.08a4.96 4.96 0 0 1 1.218-.198c.197-.005.39.04.56.13.17.09.303.23.38.4.887 1.94 2.215 2.925 3.945 2.925 1.73 0 3.058-.985 3.945-2.925.077-.17.21-.31.38-.4.17-.09.363-.135.56-.13 1.34 0 .43.2.12-.08.195-.11.4-.28.48-.48.081-.2.077-.422.01-.62-.191-.614-.328-1.217-.39-1.68a1.272 1.272 0 0 1 .13-.645 1.134 1.134 0 0 1 .49-.444l.058-.026c.644-.3 1.058-.951.815-1.71-.243-.759-.815-1.18-1.524-1.18h-.065c-.151.005-.299-.038-.43-.125a1.182 1.182 0 0 1-.38-.423 1.157 1.157 0 0 1-.19-.605c-.013-.118-.02-.239-.02-.36v-.02c0-.669-.27-1.249-.77-1.68-.5-.432-1.164-.753-1.928-.966-.88-.246-1.726-.324-2.428-.324z" 
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  // Localization
  const [lang, setLang] = useState<Language>('ar');
  const t = translations[lang];
  const isRtl = lang === 'ar' || lang === 'ku';

  // Tabs
  const [activeTab, setActiveTab] = useState<'tourism' | 'transport' | 'hotel_flight' | 'medical' | 'ai' | 'admin'>('tourism');

  // Server Data State
  const [bookings, setBookings] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [notifications, setNotifications] = useState<Array<{ id: string; content: string; sentAt: string }>>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Firebase Auth and Real-time States
  const [clientId, setClientId] = useState<string>('');
  
  // Client Booking Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingModalData, setBookingModalData] = useState<{
    type: 'tourism' | 'transport' | 'hotel_flight' | 'medical';
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    details: string;
    date: string;
  } | null>(null);

  // Unified Extra Booking Modal Fields
  const [modalWhatsapp, setModalWhatsapp] = useState<string>('');
  const [modalWhatsappSameAsPhone, setModalWhatsappSameAsPhone] = useState<boolean>(true);
  const [modalNationality, setModalNationality] = useState<string>('');
  const [modalPeopleCount, setModalPeopleCount] = useState<number>(1);
  const [modalTravelDate, setModalTravelDate] = useState<string>('');
  const [modalNotes, setModalNotes] = useState<string>('');
  const [submittingBooking, setSubmittingBooking] = useState<boolean>(false);

  // Live Support Chat States
  const [activeChatView, setActiveChatView] = useState<'ai' | 'human'>('ai');
  const [humanMessages, setHumanMessages] = useState<any[]>([]);
  const [humanChatInput, setHumanChatInput] = useState<string>('');
  const [sendingHumanChat, setSendingHumanChat] = useState<boolean>(false);

  // Admin Live Chat States
  const [adminSelectedClientId, setAdminSelectedClientId] = useState<string | null>(null);
  const [adminSelectedClientName, setAdminSelectedClientName] = useState<string | null>(null);
  const [adminChatMessages, setAdminChatMessages] = useState<any[]>([]);
  const [adminChatInput, setAdminChatInput] = useState<string>('');

  // Admin Booking Filtering & Sorting
  const [adminSearchQuery, setAdminSearchQuery] = useState<string>('');
  const [adminFilterService, setAdminFilterService] = useState<string>('all');
  const [adminFilterStatus, setAdminFilterStatus] = useState<string>('all');
  const [adminFilterDate, setAdminFilterDate] = useState<string>('');

  // Form Success Modals/Alerts
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Tourism Form States
  const [selectedCity, setSelectedCity] = useState<string>('Istanbul');
  const [daysCount, setDaysCount] = useState<number>(5);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [selectedItinerary, setSelectedItinerary] = useState<{ type: 'preset' | 'city'; id: string } | null>(null);
  const [isNotesEdited, setIsNotesEdited] = useState<boolean>(false);
  const [tourismName, setTourismName] = useState<string>('');
  const [tourismPhone, setTourismPhone] = useState<string>('');
  const [tourismEmail, setTourismEmail] = useState<string>('');

  // Transport Form States
  const [transportType, setTransportType] = useState<'airport' | 'vip' | 'intercity'>('vip');
  const [pickupLoc, setPickupLoc] = useState<string>('');
  const [dropoffLoc, setDropoffLoc] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(4);
  const [selectedCarClass, setSelectedCarClass] = useState<string>('Mercedes Vito VIP Premium');
  const [transportName, setTransportName] = useState<string>('');
  const [transportPhone, setTransportPhone] = useState<string>('');

  // Hotels & Flights Form States
  const [bookingMode, setBookingMode] = useState<'hotel' | 'flight'>('hotel');
  const [destCity, setDestCity] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('Suite');
  const [fromAirport, setFromAirport] = useState<string>('');
  const [toAirport, setToAirport] = useState<string>('');
  const [flightDate, setFlightDate] = useState<string>('');
  const [flightClass, setFlightClass] = useState<string>('Business');
  const [hfName, setHfName] = useState<string>('');
  const [hfPhone, setHfPhone] = useState<string>('');

  // Medical Tourism Form States
  const [selectedTreatment, setSelectedTreatment] = useState<string>('hairTransplant');
  const [translationNeeded, setTranslationNeeded] = useState<boolean>(true);
  const [accompanimentNeeded, setAccompanimentNeeded] = useState<boolean>(true);
  const [followUpNeeded, setFollowUpNeeded] = useState<boolean>(true);
  const [medNotes, setMedNotes] = useState<string>('');
  const [medName, setMedName] = useState<string>('');
  const [medPhone, setMedPhone] = useState<string>('');

  // AI Assistant Chat States
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: lang === 'ar' 
        ? "مرحباً بك في دنيز سراي ترافيل! أنا مستشارك الذكي المخصص لخدمتكم. كيف يمكنني مساعدتك اليوم في التخطيط لرحلتك الفاخرة أو برنامجك العلاجي في تركيا؟" 
        : lang === 'ku'
        ? "بخێر بێی بۆ دەنیز سەرای تراڤڵ! ئەز راوێژکارێ تە یێ زیرەکم بۆ خزمەتکرنا هەوە. ئەز چەوان دشێم ئەڤرۆ هاریکاریا تە بکەم د دانانا پروگرامێ گەشتا تە یێ شاهانە یان پروگرامێ تە یێ ساخلەمیێ ل تورکیا؟"
        : lang === 'tr'
        ? "Deniz Saray Travel'a hoş geldiniz! Ben sizin için özel olarak tasarlanmış Akıllı Yapay Zeka Seyahat Danışmanınızım. Bugün Türkiye'deki lüks seyahatinizi veya tıbbi tedavi programınızı planlamanıza nasıl yardımcı olabilirim?"
        : "Welcome to Deniz Saray Travel! I am your dedicated AI Luxury Travel & Medical Consultant. How may I assist you today in planning your premium journey or customized healthcare package in Turkey?"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [sendingChat, setSendingChat] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Admin Controls state
  const [logoClicks, setLogoClicks] = useState<number>(0);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('deniz_admin_unlocked') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [broadcastInput, setBroadcastInput] = useState<string>('');
  
  // Custom Add Forms in Admin Panel
  const [newDriverName, setNewDriverName] = useState<string>('');
  const [newDriverCar, setNewDriverCar] = useState<string>('');
  const [newDriverLang, setNewDriverLang] = useState<string>('');
  const [newDriverPhone, setNewDriverPhone] = useState<string>('');
  
  const [newHotelName, setNewHotelName] = useState<string>('');
  const [newHotelCity, setNewHotelCity] = useState<string>('');
  const [newHotelStars, setNewHotelStars] = useState<number>(5);
  const [newHotelPrice, setNewHotelPrice] = useState<string>('');

  const [newHospitalName, setNewHospitalName] = useState<string>('');
  const [newHospitalSpecialties, setNewHospitalSpecialties] = useState<string>('');
  const [newHospitalCity, setNewHospitalCity] = useState<string>('');

  const [isFetchingTelemetry, setIsFetchingTelemetry] = useState<boolean>(false);

  // Fetch initial data from server
  const fetchServerData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
        setDrivers(data.drivers || []);
        setHotels(data.hotels || []);
        setHospitals(data.hospitals || []);
        setNotifications(data.notifications || []);
      }
    } catch (e) {
      console.error("Failed to load server data:", e);
    } finally {
      setLoadingData(false);
    }
  };

  const handleRefreshTelemetry = async () => {
    setIsFetchingTelemetry(true);
    await fetchServerData();
    setIsFetchingTelemetry(false);
  };

  // Telemetry auto-update interval when Admin Dashboard is actively unlocked
  useEffect(() => {
    if (!isAdminAuthenticated) return;
    const interval = setInterval(() => {
      fetchServerData();
    }, 8000); // refresh every 8 seconds for real-time simulation
    return () => clearInterval(interval);
  }, [isAdminAuthenticated]);

  // Helper to play notification chime
  const playChime = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-200.wav');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Sound autoplay prevented:", e));
    } catch (e) {
      console.warn("Chime error:", e);
    }
  };

  // Initialize Firebase anonymous auth
  useEffect(() => {
    initAuth((uid) => {
      setClientId(uid);
      console.log("Authenticated as anonymous user:", uid);
    });
  }, []);

  // Real-time Firestore synchronizer for Bookings (for both Client and Admin)
  useEffect(() => {
    if (!clientId) return;

    let q;
    if (isAdminAuthenticated) {
      // Admin sees ALL bookings
      q = query(collection(db, 'bookings'));
    } else {
      // Client sees only their own bookings
      q = query(collection(db, 'bookings'), where('clientId', '==', clientId));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      let newlyAdded = false;

      snapshot.docChanges().forEach((change) => {
        // Only trigger chime on additions when not initial load
        if (change.type === 'added' && !loadingData) {
          newlyAdded = true;
        }
      });

      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      // Sort by creation date descending client-side (prevents missing index crashes)
      list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

      setBookings(list);
      setLoadingData(false);

      if (newlyAdded && isAdminAuthenticated) {
        playChime();
        setSuccessMsg(
          lang === 'ar' ? "🔔 وصل طلب حجز جديد إلى لوحة التحكم!" :
          lang === 'ku' ? "🔔 داخوازیا حجزکرنێ یا نوو گەهشت!" :
          lang === 'tr' ? "🔔 Yeni bir rezervasyon talebi geldi!" :
          "🔔 A new booking request was received!"
        );
      }
    }, (err) => {
      console.error("Firestore booking snapshot error:", err);
      setLoadingData(false);
    });

    return () => unsubscribe();
  }, [clientId, isAdminAuthenticated, lang]);

  // Real-time Firestore synchronizer for Client's own chat messages
  useEffect(() => {
    if (!clientId) return;

    const q = query(collection(db, 'chat_messages'), where('clientId', '==', clientId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      let incomingMsgFromAdmin = false;

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' && !loadingData) {
          const d = change.doc.data();
          if (d.sender === 'admin') {
            incomingMsgFromAdmin = true;
          }
        }
      });

      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      // Sort by timestamp ascending
      list.sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime());
      setHumanMessages(list);

      if (incomingMsgFromAdmin) {
        playChime();
        // Show in-app banner alert if not active in AI tab
        if (activeTab !== 'ai') {
          setSuccessMsg(
            lang === 'ar' ? "💬 رسالة جديدة من إدارة دنيز سراي ترافيل!" :
            lang === 'ku' ? "💬 پەیامەکا نوو ژ دەنيز سەرای تراڤڵ!" :
            lang === 'tr' ? "💬 Deniz Saray Travel'dan yeni mesaj!" :
            "💬 New message from Deniz Saray Travel!"
          );
        }
      }
    }, (err) => {
      console.error("Firestore client chat snapshot error:", err);
    });

    return () => unsubscribe();
  }, [clientId, activeTab, lang]);

  // Real-time Firestore synchronizer for Admin's selected chat messages
  useEffect(() => {
    if (!adminSelectedClientId) return;

    const q = query(collection(db, 'chat_messages'), where('clientId', '==', adminSelectedClientId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      let incomingMsgFromClient = false;

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const d = change.doc.data();
          if (d.sender === 'client') {
            incomingMsgFromClient = true;
          }
        }
      });

      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      list.sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime());
      setAdminChatMessages(list);

      if (incomingMsgFromClient) {
        playChime();
      }
    });

    return () => unsubscribe();
  }, [adminSelectedClientId]);

  useEffect(() => {
    fetchServerData();
  }, []);

  // Sync initial message language when user changes UI language
  useEffect(() => {
    setChatMessages([
      {
        role: 'assistant',
        content: lang === 'ar' 
          ? "مرحباً بك في دنيز سراي ترافيل! أنا مستشارك الذكي المخصص لخدمتكم. كيف يمكنني مساعدتك اليوم في التخطيط لرحلتك الفاخرة أو برنامجك العلاجي في تركيا؟" 
          : lang === 'ku'
          ? "بخێر بێی بۆ دەنیز سەرای تراڤڵ! ئەز راوێژکارێ تە یێ زیرەکم بۆ خزمەتکرنا هەوە. ئەز چەوان دشێم ئەڤرۆ هاریکاریا تە بکەم د دانانا پروگرامێ گەشتا تە یێ شاهانە یان پروگرامێ تە یێ ساخلەمیێ ل تورکیا؟"
          : lang === 'tr'
          ? "Deniz Saray Travel'a hoş geldiniz! Ben sizin için özel olarak tasarlanmış Akıllı Yapay Zeka Seyahat Danışmanınızım. Bugün Türkiye'deki lüks seyahatinizi veya tıbbi tedavi programınızı planlamanıza nasıl yardımcı olabilirim?"
          : "Welcome to Deniz Saray Travel! I am your dedicated AI Luxury Travel & Medical Consultant. How may I assist you today in planning your premium journey or customized healthcare package in Turkey?"
      }
    ]);
  }, [lang]);

  // Reset admin authentication state when navigating away from the admin tab
  useEffect(() => {
    if (activeTab !== 'admin') {
      setIsAdminAuthenticated(false);
    }
  }, [activeTab]);

  // Helper to dynamically get translated name of any city
  const getCityDisplayName = (cityKey: string): string => {
    const allCities = [...turkishCities, ...allRemainingCities];
    const found = allCities.find(c => 
      c.names.en.toLowerCase() === cityKey.toLowerCase() || 
      c.id.toLowerCase() === cityKey.toLowerCase()
    );
    if (found) {
      return found.names[lang];
    }
    const tKey = cityKey.toLowerCase();
    if (tKey === 'istanbul') return t.istanbul;
    if (tKey === 'bursa') return t.bursa;
    if (tKey === 'sapanca') return t.sapanca;
    if (tKey === 'trabzon') return t.trabzon;
    if (tKey === 'antalya') return t.antalya;
    return cityKey;
  };

  // Sync custom notes text on language change
  useEffect(() => {
    if (!selectedItinerary || isNotesEdited) return;

    if (selectedItinerary.type === 'preset') {
      const routeId = selectedItinerary.id;
      let routeTitle = "";
      if (routeId === 'istanbul_route') {
        routeTitle = lang === 'ar' ? "برنامج إسطنبول التاريخي والساحلي" : lang === 'ku' ? "بەرنامەی مێژوویی ئەستەنبوڵ" : lang === 'tr' ? "Tarihi ve Sahil İstanbul Rotası" : "Historical & Coastal Istanbul Route";
      } else if (routeId === 'bursa_route') {
        routeTitle = lang === 'ar' ? "رحلة الطبيعة والجبل الأخضر في بورصة" : lang === 'ku' ? "گەشتی سروشت و چیای سەوز لە بورسا" : lang === 'tr' ? "Doğa ve Yeşil Bursa Turu" : "Nature & Green Bursa Escapade";
      } else if (routeId === 'sapanca_route') {
        routeTitle = lang === 'ar' ? "رحلة الهدوء والاسترخاء في سبانجا ومعشوقية" : lang === 'ku' ? "گەشتی هێمنی و ئارامی لە سەپانجا" : lang === 'tr' ? "Huzur Dolu Sapanca ve Maşukiye" : "Serene Sapanca & Maşukiye Day-Trip";
      }

      const prefix = {
        ar: "طلب الحجز لبرنامج: ",
        ku: "داواکاریا حجزکرنا پروگرامێ: ",
        tr: "Şu program için rezervasyon talebi: ",
        en: "Booking request for program: "
      }[lang];

      setCustomNotes(`${prefix}${routeTitle}`);
    } else if (selectedItinerary.type === 'city') {
      const cityId = selectedItinerary.id;
      const allCities = [...turkishCities, ...allRemainingCities];
      const foundCity = allCities.find(c => c.id === cityId);
      if (foundCity) {
        const prefix = {
          ar: "تخطيط برنامج سياحي لـ: ",
          ku: "پلانکرنا پروگرامێ گەشتێ بۆ: ",
          tr: "Şu şehir için seyahat programı planlama: ",
          en: "Planning travel program for: "
        }[lang];
        const description = 'desc' in foundCity 
          ? foundCity.desc[lang] 
          : ('attraction' in foundCity ? foundCity.attraction : '');
        setCustomNotes(`${prefix}${foundCity.names[lang]}${description ? ` - ${description}` : ''}`);
      }
    }
  }, [lang, selectedItinerary, isNotesEdited]);

  // Scroll to chat bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Calculate estimated price for Transport dynamically
  const calculateEstimatePrice = () => {
    let base = 80; // Standard Vito
    if (transportType === 'airport') base = 50;
    if (transportType === 'intercity') base = 150;
    
    if (selectedCarClass.includes('Premium') || selectedCarClass.includes('VIP')) {
      base += 40;
    }
    if (passengers > 4) {
      base += (passengers - 4) * 10;
    }
    return `$${base}`;
  };

  // Generic request submission
  const handleBookingSubmit = async (type: Booking['type'], clientName: string, clientPhone: string, clientEmail: string, details: string, date: string) => {
    if (!clientName || !clientPhone) {
      alert(lang === 'ar' ? "يرجى ملء الاسم ورقم الهاتف للاتصال" : "Please provide name and phone number");
      return;
    }

    setBookingModalData({
      type,
      clientName,
      clientPhone,
      clientEmail: clientEmail || '',
      details,
      date
    });

    // Preset default fields inside the modal
    setModalWhatsapp(clientPhone);
    setModalWhatsappSameAsPhone(true);
    setModalNationality('');
    setModalPeopleCount(type === 'transport' ? passengers : 1);
    setModalTravelDate(date || new Date().toISOString().split('T')[0]);
    setModalNotes('');

    setIsBookingModalOpen(true);
  };

  const handleModalBookingConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalData || !clientId) return;

    setSubmittingBooking(true);
    try {
      const finalWhatsapp = modalWhatsappSameAsPhone ? bookingModalData.clientPhone : modalWhatsapp;
      const docRef = await addDoc(collection(db, 'bookings'), {
        clientId,
        clientName: bookingModalData.clientName,
        clientPhone: bookingModalData.clientPhone,
        clientEmail: bookingModalData.clientEmail || '',
        clientWhatsapp: finalWhatsapp || '',
        nationality: modalNationality || '',
        peopleCount: Number(modalPeopleCount) || 1,
        travelDate: modalTravelDate || bookingModalData.date,
        type: bookingModalData.type,
        details: bookingModalData.details,
        notes: modalNotes || '',
        status: 'new', // Matches requested statuses: new | reviewing | contacted | booked | completed | cancelled
        createdAt: new Date().toISOString()
      });

      // Send automated message to chat
      await addDoc(collection(db, 'chat_messages'), {
        clientId,
        sender: 'client',
        senderName: bookingModalData.clientName,
        content: `🆕 ${lang === 'ar' ? 'طلب جديد مخصص لخدمة:' : 'New inquiry submitted for:'} ${bookingModalData.type.toUpperCase()}.\n${bookingModalData.details}\n${lang === 'ar' ? 'بانتظار تواصل الإدارة.' : 'Awaiting admin response.'}`,
        timestamp: new Date().toISOString()
      });

      // Clear main form inputs
      setTourismName(''); setTourismPhone(''); setTourismEmail(''); setCustomNotes('');
      setTransportName(''); setTransportPhone(''); setPickupLoc(''); setDropoffLoc('');
      setHfName(''); setHfPhone(''); setDestCity('');
      setMedName(''); setMedPhone(''); setMedNotes('');

      // Close modal
      setIsBookingModalOpen(false);
      setBookingModalData(null);

      // Show success modal
      setSuccessMsg(
        lang === 'ar' ? "✨ تم تسجيل طلبك بنجاح في دنيز سراي ترافيل! ستتواصل معك الإدارة فوراً عبر الواتساب أو الهاتف." :
        lang === 'ku' ? "✨ داخوازيا تە ب سەرکەفتن هاتە تۆمارکرن! دێ کارگێڕى د نێزیکترین دەم دا پەیوەندیێ ب تە کەت." :
        lang === 'tr' ? "✨ Talebiniz başarıyla kaydedildi! Müşteri temsilcimiz sizinle en kısa sürede iletişime geçecektir." :
        "✨ Your inquiry was submitted successfully! Our representative will contact you shortly via WhatsApp or Phone."
      );

      // Play sound
      playChime();
    } catch (err) {
      console.error("Failed to save booking:", err);
      alert("Error saving your booking. Please contact us on WhatsApp +90 538 050 77 77 directly.");
    } finally {
      setSubmittingBooking(false);
    }
  };

  // Submit tourism booking
  const submitTourism = (e: React.FormEvent) => {
    e.preventDefault();
    const details = `المدينة المستهدفة: ${selectedCity} | المدة: ${daysCount} أيام | ملاحظات وتخصيص: ${customNotes || "برنامج افتراضي جاهز"}`;
    handleBookingSubmit('tourism', tourismName, tourismPhone, tourismEmail, details, new Date().toISOString().split('T')[0]);
  };

  // Submit VIP Transport booking
  const submitTransport = (e: React.FormEvent) => {
    e.preventDefault();
    const details = `النوع: ${transportType} | الاستلام: ${pickupLoc} | التوصيل: ${dropoffLoc} | السيارة: ${selectedCarClass} | الركاب: ${passengers} | السعر التقديري: ${calculateEstimatePrice()}`;
    handleBookingSubmit('transport', transportName, transportPhone, '', details, pickupDate || new Date().toISOString().split('T')[0]);
  };

  // Submit Hotels/Flights booking
  const submitHotelsFlights = (e: React.FormEvent) => {
    e.preventDefault();
    const details = bookingMode === 'hotel' 
      ? `حجز فندق في ${destCity} | الدخول: ${checkIn} | الخروج: ${checkOut} | الغرفة: ${roomType}`
      : `حجز طيران | من: ${fromAirport} | إلى: ${toAirport} | التاريخ: ${flightDate} | الدرجة: ${flightClass}`;
    handleBookingSubmit('hotel_flight', hfName, hfPhone, '', details, bookingMode === 'hotel' ? checkIn : flightDate);
  };

  // Submit Medical booking
  const submitMedical = (e: React.FormEvent) => {
    e.preventDefault();
    const treatmentText = t[selectedTreatment as keyof typeof t] || selectedTreatment;
    const details = `العلاج: ${treatmentText} | ترجمة طبية: ${translationNeeded ? "نعم" : "لا"} | مرافقة مريض: ${accompanimentNeeded ? "نعم" : "لا"} | متابعة: ${followUpNeeded ? "نعم" : "لا"} | الحالة: ${medNotes}`;
    handleBookingSubmit('medical', medName, medPhone, '', details, new Date().toISOString().split('T')[0]);
  };

  // Chat with AI assistant
  const handleSendChat = async (e?: React.FormEvent, directMessage?: string) => {
    if (e) e.preventDefault();
    const msgText = directMessage || chatInput;
    if (!msgText.trim()) return;

    const userMessage = { role: 'user' as const, content: msgText };
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setChatInput('');
    setSendingChat(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages([...updatedMessages, { role: 'assistant', content: data.response }]);
      } else {
        setChatMessages([...updatedMessages, { role: 'assistant', content: "An error occurred with the assistant. Please message us on WhatsApp +90 538 050 77 77 for immediate bookings!" }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages([...updatedMessages, { role: 'assistant', content: "Network error. Please click the WhatsApp button to chat with our staff immediately." }]);
    } finally {
      setSendingChat(false);
    }
  };

  // Chat with live human support team in real-time
  const handleSendHumanChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!humanChatInput.trim() || !clientId) return;

    const text = humanChatInput;
    setHumanChatInput('');
    setSendingHumanChat(true);

    try {
      await addDoc(collection(db, 'chat_messages'), {
        clientId,
        sender: 'client',
        senderName: bookings[0]?.clientName || 'Deniz Saray Client',
        content: text,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error("Failed to send human message to Firestore:", err);
    } finally {
      setSendingHumanChat(false);
    }
  };

  // Generate Snapchat Story via AI helper
  const handleSnapchatGeneration = () => {
    const promptText = lang === 'ar' 
      ? "أنشئ لي قصة سناب شات ترويجية ممتازة لخدمات دنيز سراي ترافيل (السياحة، النقل VIP، الفنادق، أو السياحة العلاجية) لزيادة المبيعات."
      : lang === 'ku'
      ? "چیرۆکەکا سناپچاتی دروست بکە بۆ ریکلامکرنا دەنیز سەرای تراڤڵ دگەل بابەتێن سەرنجراکێش بۆ زێدەکرنا فرۆشتنان."
      : "Generate a captivating Snapchat promotional story outline with catchy titles, bullet points, and high-impact sales copy to boost Deniz Saray Travel bookings.";
    handleSendChat(undefined, promptText);
  };

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        const newValue = !isAdminUnlocked;
        setIsAdminUnlocked(newValue);
        localStorage.setItem('deniz_admin_unlocked', String(newValue));
        if (!newValue && activeTab === 'admin') {
          setActiveTab('tourism');
        }
        // Custom elegant notification popup or alert
        setSuccessMsg(
          lang === 'ar'
            ? (newValue ? "🔒 تم تفعيل بوابة الإدارة بنجاح. يرجى مراجعة الخيارات في الشريط العلوي." : "🔓 تم إخفاء بوابة الإدارة بنجاح.")
            : lang === 'ku'
            ? (newValue ? "🔒 دەربازگەها کارگێڕیێ ب سەرکەفتن هاتە چالاککرن. هیڤیە تەماشەی بارا سەرى بکە." : "🔓 دەربازگەها کارگێڕیێ هاتە ڤەشارتن.")
            : lang === 'tr'
            ? (newValue ? "🔒 Yönetim portalı başarıyla aktif edildi. Lütfen üst menüyü kontrol edin." : "🔓 Yönetim portalı başarıyla gizlendi.")
            : (newValue ? "🔒 Admin gateway enabled successfully. Please check the top navigation." : "🔓 Admin gateway hidden successfully.")
        );
        return 0;
      }
      return next;
    });
  };

  // Admin authentication
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'idrisb') {
      setIsAdminAuthenticated(true);
      setAdminPassword('');
    } else {
      alert(
        lang === 'ar' ? "رمز المرور غير صحيح!" : 
        lang === 'ku' ? "کلیلا دەربازبوونێ خەلەتە!" : 
        lang === 'tr' ? "Geçersiz şifre!" : 
        "Incorrect administrator password!"
      );
    }
  };

  // Update Booking Status
  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
      
      const bookingObj = bookings.find(b => b.id === id);
      if (bookingObj && bookingObj.clientId) {
        const statusNamesAr: Record<string, string> = {
          new: 'جديد',
          reviewing: 'قيد المراجعة',
          contacted: 'تم التواصل',
          booked: 'تم الحجز بنجاح',
          completed: 'تم بنجاح',
          cancelled: 'ملغي'
        };
        const statusNamesEn: Record<string, string> = {
          new: 'New',
          reviewing: 'Under Review',
          contacted: 'Contacted',
          booked: 'Booked Successfully',
          completed: 'Completed',
          cancelled: 'Cancelled'
        };
        
        const statusAr = statusNamesAr[status] || status;
        const statusEn = statusNamesEn[status] || status;

        await addDoc(collection(db, 'chat_messages'), {
          clientId: bookingObj.clientId,
          sender: 'admin',
          senderName: 'Deniz Saray System',
          content: `⚙️ تم تحديث حالة طلبك لخدمة (${bookingObj.type.toUpperCase()}) إلى: [${statusAr}]\n⚙️ Your request status was updated to: [${statusEn}]`,
          timestamp: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error("Failed to update status in Firestore:", e);
    }
  };

  // Delete Booking
  const deleteBooking = async (id: string) => {
    if (!confirm(lang === 'ar' ? "هل أنت متأكد من حذف هذا الحجز؟" : "Are you sure you want to delete this booking?")) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (e) {
      console.error("Failed to delete booking in Firestore:", e);
    }
  };

  // Send message from Admin to a client in live chat
  const handleSendAdminChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminChatInput.trim() || !adminSelectedClientId) return;

    const text = adminChatInput;
    setAdminChatInput('');

    try {
      await addDoc(collection(db, 'chat_messages'), {
        clientId: adminSelectedClientId,
        sender: 'admin',
        senderName: 'Deniz Saray Operations',
        content: text,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error("Failed to send admin chat reply:", err);
    }
  };

  // Add Driver
  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriverName) return;
    try {
      const res = await fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDriverName,
          carModel: newDriverCar || "Mercedes Vito VIP",
          languages: newDriverLang ? newDriverLang.split(',') : ["العربية", "التركية"],
          phone: newDriverPhone || "+90 538 050 77 77"
        })
      });
      if (res.ok) {
        setNewDriverName(''); setNewDriverCar(''); setNewDriverLang(''); setNewDriverPhone('');
        fetchServerData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Driver
  const handleDeleteDriver = async (id: string) => {
    try {
      await fetch(`/api/drivers/${id}`, { method: 'DELETE' });
      fetchServerData();
    } catch (e) {
      console.error(e);
    }
  };

  // Add Hotel
  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName) return;
    try {
      const res = await fetch('/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newHotelName,
          city: newHotelCity || "إسطنبول",
          stars: newHotelStars,
          pricePerNight: newHotelPrice || "$150"
        })
      });
      if (res.ok) {
        setNewHotelName(''); setNewHotelCity(''); setNewHotelPrice('');
        fetchServerData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Hotel
  const handleDeleteHotel = async (id: string) => {
    try {
      await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
      fetchServerData();
    } catch (e) {
      console.error(e);
    }
  };

  // Add Hospital
  const handleAddHospital = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospitalName) return;
    try {
      const res = await fetch('/api/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newHospitalName,
          specialty: newHospitalSpecialties ? newHospitalSpecialties.split(',') : ["تجميل", "أسنان"],
          city: newHospitalCity || "إسطنبول",
          rating: 4.8
        })
      });
      if (res.ok) {
        setNewHospitalName(''); setNewHospitalSpecialties(''); setNewHospitalCity('');
        fetchServerData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Hospital
  const handleDeleteHospital = async (id: string) => {
    try {
      await fetch(`/api/hospitals/${id}`, { method: 'DELETE' });
      fetchServerData();
    } catch (e) {
      console.error(e);
    }
  };

  // Send Broadcast Notification
  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastInput.trim()) return;
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: broadcastInput })
      });
      if (res.ok) {
        setBroadcastInput('');
        fetchServerData();
        alert(t.notifSuccess);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookCity = (cityId: string) => {
    const allCities = [...turkishCities, ...allRemainingCities];
    const foundCity = allCities.find(c => c.id === cityId);
    if (foundCity) {
      setSelectedCity(foundCity.names.en);
      setSelectedItinerary({ type: 'city', id: cityId });
      setIsNotesEdited(false);
      document.getElementById('tourism_form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Preset ready itineraries for client info
  const readyItineraries = [
    {
      id: "istanbul_route",
      city: "Istanbul",
      title: lang === 'ar' ? "برنامج إسطنبول التاريخي والساحلي" : lang === 'ku' ? "بەرنامەی مێژوویی ئەستەنبوڵ" : lang === 'tr' ? "Tarihi ve Sahil İstanbul Rotası" : "Historical & Coastal Istanbul Route",
      duration: "5 Days",
      highlights: lang === 'ar' 
        ? ["رحلة مضيق البوسفور بيخت خاص", "زيارة آيا صوفيا والسلطان أحمد", "يوم للتسوق في الغراند بازار ومول زورلو", "تلة العرائس وغابات بلغراد"]
        : lang === 'ku'
        ? ["گه‌شتی بۆسفۆر بە یەختی تایبەت", "سەردانی ئایا سۆفیا و سوڵتان ئەحمەد", "بازاڕکردن لە گراند بازار و مۆڵی زۆرلو", "تەپۆڵکەی بوکێ و دارستانی بەلگراد"]
        : lang === 'tr'
        ? ["Özel yat ile İstanbul Boğazı turu", "Ayasofya ve Sultanahmet Camii ziyareti", "Kapalıçarşı ve Zorlu Center'da alışveriş günü", "Çamlıca Tepesi ve Belgrad Ormanı gezisi"]
        : ["Private yacht tour along the Bosphorus Strait", "Visit Hagia Sophia and the Blue Mosque", "Shopping day at the Grand Bazaar and Zorlu Mall", "Camlica Hill and Belgrade Forest excursion"]
    },
    {
      id: "bursa_route",
      city: "Bursa",
      title: lang === 'ar' ? "رحلة الطبيعة والجبل الأخضر في بورصة" : lang === 'ku' ? "گەشتی سروشت و چیای سەوز لە بورسا" : lang === 'tr' ? "Doğa ve Yeşil Bursa Turu" : "Nature & Green Bursa Escapade",
      duration: "2 Days",
      highlights: lang === 'ar'
        ? ["ركوب التلفريك الأطول عالمياً لجبل أولوداغ", "زيارة الشجرة المعمرة التاريخية", "شلالات بورصة وتناول المشويات التركية"]
        : lang === 'ku'
        ? ["سەرکەوتن بە تەلەفریکی ئۆلوداغ", "بینینی دارە بەتەمەنە مێژووییەکە", "تاڤگەکانی بورسا و نانی ئێوارەی تورکی"]
        : lang === 'tr'
        ? ["Dünyanın en uzun teleferiği ile Uludağ'a çıkış", "Tarihi İnkaya Çınarı ziyareti", "Bursa şelaleleri gezisi ve geleneksel Türk mangalı"]
        : ["Ride the world's longest cable car to Mount Uludağ", "Visit the historical ancient Inkaya plane tree", "Explore Bursa waterfalls and enjoy authentic Turkish BBQ"]
    },
    {
      city: t.sapanca,
      title: lang === 'ar' ? "رحلة الهدوء والاسترخاء في سبانجا ومعشوقية" : lang === 'ku' ? "گەشتی هێمنی و ئارامی لە سەپانجا" : lang === 'tr' ? "Huzur Dolu Sapanca ve Maşukiye" : "Serene Sapanca & Maşukiye Day-Trip",
      duration: "1 Day",
      highlights: lang === 'ar'
        ? ["جولة حول بحيرة سبانجا الساحرة", "ألعاب المغامرات والـ ATV في معشوقية", "الغداء فوق جداول المياه الشلالية"]
        : lang === 'ku'
        ? ["گەشت بە دەوری دەریاچەی سەپانجا", "یاری ئەی تی ڤی و سەرکێشی لە مەعشووقیە", "نانی نیوەڕۆ لەسەر ئاوی تاڤگەکان"]
        : lang === 'tr'
        ? ["Büyüleyici Sapanca Gölü etrafında gezi", "Maşukiye'de ATV sürüşü ve macera aktiviteleri", "Şelale dereleri üzerinde harika bir öğle yemeği"]
        : ["Scenic tour around the beautiful Lake Sapanca", "ATV riding and outdoor adventure activities in Masukiye", "Lunch directly above cascading waterfall streams"]
    }
  ];

  return (
    <div id="app_root" dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#f8fafc] selection:bg-brand-500 selection:text-white">
      
      {/* Upper Status / Marketing Info Rail (Upscale Elegance, No Telemetry AI-Slop) */}
      <div id="top_promo_bar" className="bg-[#0b1329] text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center border-b border-gray-800">
        <div id="promo_contact" className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span dir="ltr">+90 538 050 77 77</span>
          </span>
          <span className="text-gray-400">|</span>
          <a href="https://www.snapchat.com/add/denizsaray3" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-amber-300 transition text-[#FFFC00]">
            <SnapchatIcon className="w-3.5 h-3.5" />
            <span className="font-bold">denizsaray3</span>
          </a>
          <span className="hidden md:inline-block text-gray-400">|</span>
          <span className="hidden md:inline-block text-emerald-400 font-medium">VIP Services Turkey & Europe</span>
        </div>
        <div id="promo_languages" className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-gray-400" />
          <button id="lang_ar" onClick={() => setLang('ar')} className={`px-2 py-0.5 rounded transition ${lang === 'ar' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>العربية</button>
          <button id="lang_ku" onClick={() => setLang('ku')} className={`px-2 py-0.5 rounded transition ${lang === 'ku' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>کوردی</button>
          <button id="lang_tr" onClick={() => setLang('tr')} className={`px-2 py-0.5 rounded transition ${lang === 'tr' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>Türkçe</button>
          <button id="lang_en" onClick={() => setLang('en')} className={`px-2 py-0.5 rounded transition ${lang === 'en' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>English</button>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header id="app_header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div id="logo_container" onClick={handleLogoClick} className="cursor-pointer select-none active:scale-95 transition" title={lang === 'ar' ? "لوحة التحكم السرية" : "Admin Secret Click"}>
            <DenizSarayLogo lang={lang} showText={true} size={50} />
          </div>

          {/* Large Navigation Tabs */}
          <nav id="main_navigation" className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button id="tab_tourism" onClick={() => setActiveTab('tourism')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${activeTab === 'tourism' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              <Palmtree className="w-4 h-4 text-emerald-500" />
              {t.tourism}
            </button>
            <button id="tab_transport" onClick={() => setActiveTab('transport')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${activeTab === 'transport' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              <Car className="w-4 h-4 text-emerald-500" />
              {t.transport}
            </button>
            <button id="tab_hotels_flights" onClick={() => setActiveTab('hotel_flight')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${activeTab === 'hotel_flight' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              <Hotel className="w-4 h-4 text-emerald-500" />
              {t.hotelsFlights}
            </button>
            <button id="tab_medical" onClick={() => setActiveTab('medical')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${activeTab === 'medical' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              <Activity className="w-4 h-4 text-emerald-500" />
              {t.medical}
            </button>
            <button id="tab_ai" onClick={() => setActiveTab('ai')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 relative ${activeTab === 'ai' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              <Sparkle className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
              {t.aiAssistant}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>
          </nav>

          {/* Quick WhatsApp & Snapchat & Admin Access */}
          <div id="header_right_actions" className="flex items-center gap-2 sm:gap-3">
            <a id="btn_quick_snapchat" href="https://www.snapchat.com/add/denizsaray3" target="_blank" rel="noreferrer" className="bg-[#FFFC00] hover:bg-[#fffa6b] text-slate-900 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow-sm hover:shadow transition flex items-center gap-1.5 border border-amber-300">
              <SnapchatIcon className="w-4 h-4 text-slate-900 fill-slate-900" />
              <span className="hidden md:inline">Snapchat</span>
            </a>
            <a id="btn_quick_whatsapp" href="https://wa.me/905380507777" target="_blank" rel="noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow transition flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t.whatsappButton}</span>
            </a>
            {isAdminUnlocked && (
              <button id="btn_toggle_admin" onClick={() => setActiveTab(activeTab === 'admin' ? 'tourism' : 'admin')} className={`p-2 rounded-xl border transition ${activeTab === 'admin' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`} title={t.adminDashboard}>
                <Sliders className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div id="mobile_navigation" className="lg:hidden bg-slate-50 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none py-2 px-4 flex gap-1">
          <button id="m_tab_tourism" onClick={() => setActiveTab('tourism')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'tourism' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            <Palmtree className="w-3.5 h-3.5" />
            {t.tourism}
          </button>
          <button id="m_tab_transport" onClick={() => setActiveTab('transport')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'transport' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            <Car className="w-3.5 h-3.5" />
            {t.transport}
          </button>
          <button id="m_tab_hotels" onClick={() => setActiveTab('hotel_flight')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'hotel_flight' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            <Hotel className="w-3.5 h-3.5" />
            {t.hotelsFlights}
          </button>
          <button id="m_tab_medical" onClick={() => setActiveTab('medical')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'medical' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            <Activity className="w-3.5 h-3.5" />
            {t.medical}
          </button>
          <button id="m_tab_ai" onClick={() => setActiveTab('ai')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'ai' ? 'bg-amber-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            <Sparkle className="w-3.5 h-3.5" />
            {t.aiAssistant}
          </button>
          {isAdminUnlocked && (
            <button id="m_tab_admin" onClick={() => setActiveTab('admin')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'admin' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
              <Sliders className="w-3.5 h-3.5" />
              {t.adminDashboard}
            </button>
          )}
        </div>
      </header>

      {/* Broadcast Ticker (Simulated Live News Broadcaster) */}
      {notifications.length > 0 && (
        <div id="live_notifications_banner" className="bg-amber-50 border-y border-amber-200/60 py-2.5 px-4 overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider whitespace-nowrap bg-amber-200 px-1.5 py-0.5 rounded">
              LIVE BROADCAST:
            </span>
            <div className="text-xs text-amber-900 font-semibold truncate animate-pulse">
              {notifications[0].content}
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <section id="hero_section" className="bg-[#0f172a] text-white relative overflow-hidden py-16 sm:py-24">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 border border-emerald-500/20">
            <Award className="w-4 h-4" />
            <span>Deniz Saray Travel VIP Luxury Services</span>
          </div>
          
          <h2 id="hero_heading" className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
            {t.heroTitle}
          </h2>
          <p id="hero_desc" className="mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Rapid Feature Highlights */}
          <div id="hero_badges" className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center">
              <Palmtree className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-xs font-bold">{t.tourism}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center">
              <Car className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-xs font-bold">{t.transport}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center">
              <Hotel className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-xs font-bold">{t.hotelsFlights}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center">
              <Activity className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-xs font-bold">{t.medical}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main id="main_content" className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Success Banner */}
        {successMsg && (
          <div id="global_success_banner" className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-grow">
              <h4 className="font-extrabold text-emerald-900 text-lg">
                {lang === 'ar' ? 'تم استلام طلبك بنجاح' : 'Request Submitted Successfully'}
              </h4>
              <p className="text-sm text-emerald-700 mt-1">{successMsg}</p>
              <div className="mt-4 flex gap-3">
                <a href="https://wa.me/905380507777" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {t.whatsappButton}
                </a>
                <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900 text-xs font-bold underline">
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: TOURISM ----------------- */}
        {activeTab === 'tourism' && (
          <div id="tab_content_tourism" className="space-y-12 animate-fade-in">
            
            {/* Header Description */}
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.tourismTitle}</h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2">{t.tourismSubtitle}</p>
            </div>

            {/* Popular Itineraries Cards */}
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                {t.dailyPrograms}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {readyItineraries.map((route, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-500/20 transition duration-300 flex flex-col justify-between">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full">
                          {route.city}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-500" />
                          {route.duration}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-900 mb-4">{route.title}</h5>
                      <ul className="space-y-2.5">
                        {route.highlights.map((h, k) => (
                          <li key={k} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <span className="text-xs text-slate-500">Premium Package VIP</span>
                      <button 
                        onClick={() => {
                          setSelectedCity(route.city);
                          setSelectedItinerary({ type: 'preset', id: route.id });
                          setIsNotesEdited(false);
                          document.getElementById('tourism_form')?.scrollIntoView({ behavior: 'smooth' });
                        }} 
                        className="text-emerald-600 hover:text-emerald-800 text-xs font-bold flex items-center gap-1"
                      >
                        <span>{t.bookTrip}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Interactive Turkey Cities Travel Guide */}
            <TurkeyCityGuide lang={lang} onBookCity={handleBookCity} />

            {/* Design & Booking Form */}
            <div id="tourism_form" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 bg-[#0f172a] text-white p-8 sm:p-12 flex flex-col justify-between relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl" />
                
                <div className="relative z-10 space-y-6">
                  <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider">{t.customItinerary}</span>
                  <h4 className="text-2xl font-extrabold">{lang === 'ar' ? "صمم برنامجك السياحي الخاص بدقائق" : "Custom Luxury Itinerary Generator"}</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {lang === 'ar' 
                      ? "هل ترغب بجدول مخصص لرحلتك العائلية أو شهر العسل؟ املأ البيانات وسيقوم خبراؤنا بتجهيز جدول مفصل مجاناً وتقديمه لك عبر واتساب."
                      : "We specialize in VIP family vacations and honeymoons. Let us configure a premium bespoke itinerary detailing luxurious Mercedes transports, boutique stays, and spectacular day trips."}
                  </p>
                  
                  <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>{lang === 'ar' ? "تأكيد فوري وتنسيق عبر الواتساب" : "Instant confirmations via WhatsApp"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>{lang === 'ar' ? "سيارات VIP حديثة مع سائقين خلوقين" : "Latest VIP Mercedes vehicles & polite drivers"}</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-12 text-xs text-slate-400">
                  © Deniz Saray Travel Co. Turkey
                </div>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-12">
                <form onSubmit={submitTourism} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.selectCity}</label>
                      <select 
                        value={selectedCity} 
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      >
                        <option value="Istanbul">{t.istanbul}</option>
                        <option value="Bursa">{t.bursa}</option>
                        <option value="Sapanca">{t.sapanca}</option>
                        <option value="Trabzon">{t.trabzon}</option>
                        <option value="Antalya">{t.antalya}</option>
                        {!['Istanbul', 'Bursa', 'Sapanca', 'Trabzon', 'Antalya'].includes(selectedCity) && (
                          <option value={selectedCity}>{getCityDisplayName(selectedCity)}</option>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.daysCount}</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="30" 
                        value={daysCount}
                        onChange={(e) => setDaysCount(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.customItinerary}</label>
                    <textarea 
                      rows={3}
                      value={customNotes}
                      onChange={(e) => {
                        setCustomNotes(e.target.value);
                        setIsNotesEdited(true);
                      }}
                      placeholder={t.itineraryPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                    />
                  </div>

                  <hr className="border-slate-100" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.name} *</label>
                      <input 
                        type="text" 
                        required
                        value={tourismName}
                        onChange={(e) => setTourismName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.phone} *</label>
                      <input 
                        type="tel" 
                        required
                        value={tourismPhone}
                        onChange={(e) => setTourismPhone(e.target.value)}
                        placeholder="+966..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.email}</label>
                    <input 
                      type="email" 
                      value={tourismEmail}
                      onChange={(e) => setTourismEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                    />
                  </div>

                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-xl transition shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>{t.bookTrip}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: TRANSPORT ----------------- */}
        {activeTab === 'transport' && (
          <div id="tab_content_transport" className="space-y-12 animate-fade-in">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.transportTitle}</h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2">{t.transportSubtitle}</p>
            </div>

            {/* Transport Services selector and Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Calculator / Settings */}
              <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Grid className="w-4 h-4 text-emerald-600" />
                    {lang === 'ar' ? 'خيارات وتكلفة تقديرية' : 'Pricing & Configurations'}
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    <button 
                      onClick={() => setTransportType('airport')}
                      className={`p-3.5 rounded-xl border text-left text-xs font-bold transition flex justify-between items-center ${transportType === 'airport' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    >
                      <span>{t.airportPickup}</span>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-800">From $50</span>
                    </button>
                    <button 
                      onClick={() => setTransportType('vip')}
                      className={`p-3.5 rounded-xl border text-left text-xs font-bold transition flex justify-between items-center ${transportType === 'vip' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    >
                      <span>{t.vipCar}</span>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-800">From $80/Day</span>
                    </button>
                    <button 
                      onClick={() => setTransportType('intercity')}
                      className={`p-3.5 rounded-xl border text-left text-xs font-bold transition flex justify-between items-center ${transportType === 'intercity' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    >
                      <span>{t.interCityTransfer}</span>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-800">From $150</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.carType}</label>
                  <select 
                    value={selectedCarClass} 
                    onChange={(e) => setSelectedCarClass(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 transition font-semibold text-slate-700"
                  >
                    <option value="Mercedes Vito VIP Premium">Mercedes Vito VIP Premium (7 Seats)</option>
                    <option value="Volkswagen Caravelle Luxury">Volkswagen Caravelle Luxury (8 Seats)</option>
                    <option value="Mercedes Sprinter Ultra VIP">Mercedes Sprinter Ultra VIP (14 Seats)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.passengerCount}</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    value={passengers} 
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs font-extrabold text-slate-500 mt-2">
                    <span>1 Passenger</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{passengers} {t.passengerCount}</span>
                    <span>15 Max</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 bg-slate-50/70 p-4 rounded-2xl flex flex-col items-center">
                  <span className="text-xs text-slate-500 font-semibold">{t.estimatePrice}</span>
                  <span className="text-3xl font-extrabold text-slate-950 mt-1">{calculateEstimatePrice()}</span>
                  <span className="text-[10px] text-slate-400 mt-2 text-center">
                    {lang === 'ar' ? 'السعر يشمل الوقود والسائق والضرائب الطرقية' : 'Includes fuel, dedicated driver & high-way taxes'}
                  </span>
                </div>
              </div>

              {/* Right Column: Reservation Form */}
              <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
                <form onSubmit={submitTransport} className="space-y-6">
                  <h4 className="text-lg font-bold text-slate-950">{lang === 'ar' ? "تفاصيل رحلة النقل VIP" : "VIP Transport Itinerary Details"}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.pickupLocation} *</label>
                      <input 
                        type="text" 
                        required
                        placeholder={lang === 'ar' ? "مثال: مطار إسطنبول الدولي" : "E.g. Istanbul New Airport"}
                        value={pickupLoc}
                        onChange={(e) => setPickupLoc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.dropoffLocation} *</label>
                      <input 
                        type="text" 
                        required
                        placeholder={lang === 'ar' ? "مثال: فندق الشيراتون تقسيم" : "E.g. Sheraton Hotel Taksim"}
                        value={dropoffLoc}
                        onChange={(e) => setDropoffLoc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.pickupDate} *</label>
                      <input 
                        type="datetime-local" 
                        required
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">WhatsApp Contact *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+966..."
                        value={transportPhone}
                        onChange={(e) => setTransportPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.name} *</label>
                    <input 
                      type="text" 
                      required
                      value={transportName}
                      onChange={(e) => setTransportName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                    />
                  </div>

                  <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                    <Car className="w-4 h-4 text-emerald-400" />
                    <span>{t.bookTransport} ({calculateEstimatePrice()})</span>
                  </button>
                </form>
              </div>
            </div>

            {/* List of Registered VIP Drivers on Server */}
            {drivers.length > 0 && (
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  {lang === 'ar' ? 'سائقونا المعتمدون في تركيا' : 'Our Professional Multilingual Drivers'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {drivers.map((drv) => (
                    <div key={drv.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-extrabold text-slate-900">{drv.name}</h5>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${drv.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {drv.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 font-medium">{drv.carModel}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {drv.languages.map((l, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-medium text-slate-600">
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-50 text-xs flex justify-between items-center">
                        <span className="text-slate-400">Premium Driver ID: {drv.id}</span>
                        <a href={`https://wa.me/905380507777?text=طلب السائق ${drv.name}`} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline">
                          {lang === 'ar' ? 'طلب فوري' : 'Request Now'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB: HOTELS & FLIGHTS ----------------- */}
        {activeTab === 'hotel_flight' && (
          <div id="tab_content_hotels" className="space-y-12 animate-fade-in">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.hotelsFlightsTitle}</h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2">{t.hotelsFlightsSubtitle}</p>
            </div>

            {/* Selector: Hotel booking vs Flight booking */}
            <div className="flex justify-center">
              <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex gap-1">
                <button 
                  onClick={() => setBookingMode('hotel')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${bookingMode === 'hotel' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Hotel className="w-4 h-4" />
                  {t.hotelBooking}
                </button>
                <button 
                  onClick={() => setBookingMode('flight')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${bookingMode === 'flight' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Plane className="w-4 h-4" />
                  {t.flightBooking}
                </button>
              </div>
            </div>

            {/* Live Search Form & Comparator */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
              <form onSubmit={submitHotelsFlights} className="space-y-6">
                
                {bookingMode === 'hotel' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.destinationCity} *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="E.g. Istanbul, Antalya"
                          value={destCity}
                          onChange={(e) => setDestCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.checkInDate} *</label>
                        <input 
                          type="date" 
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.checkOutDate} *</label>
                        <input 
                          type="date" 
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.roomType}</label>
                        <select 
                          value={roomType} 
                          onChange={(e) => setRoomType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium text-slate-700"
                        >
                          <option value="Suite">VIP Luxury Suite</option>
                          <option value="Deluxe Double">Deluxe Double Room</option>
                          <option value="Family Connected">Family Connected Suite</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.fromAirport} *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="E.g. Riyadh (RUH)"
                          value={fromAirport}
                          onChange={(e) => setFromAirport(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.toAirport} *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="E.g. Istanbul (IST)"
                          value={toAirport}
                          onChange={(e) => setToAirport(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.flightDate} *</label>
                        <input 
                          type="date" 
                          required
                          value={flightDate}
                          onChange={(e) => setFlightDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.classType}</label>
                        <select 
                          value={flightClass} 
                          onChange={(e) => setFlightClass(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium text-slate-700"
                        >
                          <option value="First Class">First Class</option>
                          <option value="Business">Business Class</option>
                          <option value="Premium Economy">Premium Economy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <hr className="border-slate-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.name} *</label>
                    <input 
                      type="text" 
                      required
                      value={hfName}
                      onChange={(e) => setHfName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.phone} *</label>
                    <input 
                      type="tel" 
                      required
                      value={hfPhone}
                      onChange={(e) => setHfPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.bookNow}</span>
                </button>
              </form>
            </div>

            {/* List of Registered Premium Hotels on Server */}
            {hotels.length > 0 && (
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-emerald-600" />
                  {lang === 'ar' ? 'أفخم الفنادق والمنتجعات الشريكة' : 'Our Partner Hotels & Luxury Resorts'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hotels.map((htl) => (
                    <div key={htl.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow transition">
                      <img src={htl.image} alt={htl.name} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-500 font-extrabold bg-slate-100 px-2 py-0.5 rounded">
                            {htl.city}
                          </span>
                          <span className="text-amber-500 font-extrabold text-xs">
                            {"★".repeat(htl.stars)}
                          </span>
                        </div>
                        <h5 className="font-extrabold text-slate-900 mb-4 text-sm sm:text-base">{htl.name}</h5>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-bold">EST. PRICE</span>
                            <span className="text-base font-extrabold text-emerald-700">{htl.pricePerNight} <span className="text-xs text-slate-400 font-normal">/ Night</span></span>
                          </div>
                          <button 
                            onClick={() => {
                              setBookingMode('hotel');
                              setDestCity(htl.city);
                              setRoomType('Suite');
                              document.getElementById('main_content')?.scrollIntoView({ behavior: 'smooth' });
                            }} 
                            className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition"
                          >
                            {lang === 'ar' ? 'طلب عرض' : 'Get Offer'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB: MEDICAL TOURISM ----------------- */}
        {activeTab === 'medical' && (
          <div id="tab_content_medical" className="space-y-12 animate-fade-in">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
                {lang === 'ar' ? 'السياحة الطبية والتجميلية' : 'Premium Medical Care'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">{t.medicalTitle}</h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2">{t.medicalSubtitle}</p>
            </div>

            {/* Specialties & Features Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { key: 'hairTransplant', icon: Sparkles, desc: "FUE & DHI Micro-Surgical" },
                { key: 'cosmetics', icon: Award, desc: "Facial & Body Contouring" },
                { key: 'dental', icon: ShieldCheck, desc: "Hollywood Smile & Implants" },
                { key: 'eyes', icon: Activity, desc: "Lasik, Cataract & Premium Lenses" },
                { key: 'obesity', icon: TrendingUp, desc: "Gastric Bypass & Sleeve" }
              ].map((spec) => (
                <button 
                  key={spec.key} 
                  onClick={() => setSelectedTreatment(spec.key)}
                  className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-between h-40 ${selectedTreatment === spec.key ? 'bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-50/50' : 'bg-white border-slate-200/80'}`}
                >
                  <spec.icon className={`w-8 h-8 ${selectedTreatment === spec.key ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm mt-3">{t[spec.key as keyof typeof t]}</h5>
                    <span className="text-[10px] text-slate-400 block mt-1 font-medium">{spec.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Medical Booking / Appointment Request Grid */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Extra Included Services Checklist */}
              <div className="lg:col-span-5 space-y-6 bg-slate-50 p-6 rounded-2xl">
                <h4 className="text-base font-bold text-slate-900">{lang === 'ar' ? "الخدمات المجانية والمرافقة المشمولة" : "Included Premium Care Assistance"}</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-slate-100 flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="translation" 
                      checked={translationNeeded}
                      onChange={(e) => setTranslationNeeded(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 mt-0.5" 
                    />
                    <div>
                      <label htmlFor="translation" className="text-xs font-bold block text-slate-900 cursor-pointer">{t.medicalTranslation}</label>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Professional translators inside clinics & hospitals.</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-100 flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="accompaniment" 
                      checked={accompanimentNeeded}
                      onChange={(e) => setAccompanimentNeeded(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 mt-0.5" 
                    />
                    <div>
                      <label htmlFor="accompaniment" className="text-xs font-bold block text-slate-900 cursor-pointer">{t.patientAccompaniment}</label>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Dedicated private companion escorting you through Istanbul.</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-100 flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="followup" 
                      checked={followUpNeeded}
                      onChange={(e) => setFollowUpNeeded(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 mt-0.5" 
                    />
                    <div>
                      <label htmlFor="followup" className="text-xs font-bold block text-slate-900 cursor-pointer">{t.followUp}</label>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Follow-up with elite medical board post surgeries for 1 year.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {lang === 'ar' 
                      ? "جميع مستشفياتنا الشريكة مرخصة ومعتمدة من وزارة الصحة التركية ومطابقة لأرقى المواصفات الطبية العالمية."
                      : "All clinical treatments are held in Joint Commission International (JCI) certified luxury multi-specialty hospitals with complete guarantees."}
                  </p>
                </div>
              </div>

              {/* Patient Form */}
              <div className="lg:col-span-7">
                <form onSubmit={submitMedical} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.treatmentType}</label>
                    <input 
                      type="text" 
                      readOnly
                      value={t[selectedTreatment as keyof typeof t] || selectedTreatment}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.medicalNotes}</label>
                    <textarea 
                      rows={3}
                      value={medNotes}
                      onChange={(e) => setMedNotes(e.target.value)}
                      placeholder={lang === 'ar' ? "مثال: أريد الاستفسار عن زراعة الشعر بالاقتطاف مع حجز فندق وسائق VIP..." : "Example: I need a dental cosmetic consult and hotel stay for 4 days..."}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.name} *</label>
                      <input 
                        type="text" 
                        required
                        value={medName}
                        onChange={(e) => setMedName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.phone} *</label>
                      <input 
                        type="tel" 
                        required
                        value={medPhone}
                        onChange={(e) => setMedPhone(e.target.value)}
                        placeholder="+966..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4 text-red-400" />
                    <span>{t.requestAppointment}</span>
                  </button>
                </form>
              </div>
            </div>

            {/* List of Affiliated Hospitals on Server */}
            {hospitals.length > 0 && (
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  {lang === 'ar' ? 'المستشفيات والمراكز المعتمدة' : 'Partner Clinics & Hospital Networks'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hospitals.map((hosp) => (
                    <div key={hosp.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-extrabold text-slate-900">{hosp.name}</h5>
                          <span className="text-amber-500 text-xs font-extrabold bg-amber-50 px-2 py-0.5 rounded">
                            {hosp.rating} ★
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-bold mb-2 uppercase">{hosp.city}</p>
                        <div className="flex flex-wrap gap-1 mt-4">
                          {hosp.specialty.map((spec, index) => (
                            <span key={index} className="text-[10px] bg-red-50 text-red-800 font-extrabold px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                        <span className="text-slate-400">JCI Accredited</span>
                        <button 
                          onClick={() => {
                            setSelectedTreatment(hosp.specialty[0] === 'تجميل' || hosp.specialty[0] === 'زراعة شعر' ? 'hairTransplant' : 'dental');
                            setMedNotes(`مستفسر عن حجز في: ${hosp.name}`);
                            document.getElementById('main_content')?.scrollIntoView({ behavior: 'smooth' });
                          }} 
                          className="text-emerald-600 font-bold hover:underline"
                        >
                          {lang === 'ar' ? 'احجز استشارة' : 'Book Consult'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB: AI TRAVEL ASSISTANT ----------------- */}
        {activeTab === 'ai' && (
          <div id="tab_content_ai" className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            
            {/* Header info */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold mb-3">
                <Sparkle className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span>Powered by Gemini 3.5 Flash Elite Model</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.aiTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.aiSubtitle}</p>
            </div>

            {/* Segmented Chat Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-md mx-auto">
              <button 
                onClick={() => setActiveChatView('ai')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${activeChatView === 'ai' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'مستشار السفر الذكي' : 'AI Travel Advisor'}</span>
              </button>
              <button 
                onClick={() => setActiveChatView('human')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${activeChatView === 'human' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span className="relative">
                  {lang === 'ar' ? 'المحادثة المباشرة' : 'Live Chat Support'}
                  {humanMessages.length > 0 && humanMessages[humanMessages.length - 1]?.sender === 'admin' && activeChatView !== 'human' && (
                    <span className="absolute -top-1 -right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  )}
                </span>
              </button>
            </div>

            {activeChatView === 'ai' ? (
              /* Main Chat Interface: AI Travel Advisor */
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-md overflow-hidden flex flex-col h-[550px]">
                
                {/* Chat Header */}
                <div className="bg-[#0f172a] text-white p-4 sm:p-5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold">Deniz Saray AI Advisor</h5>
                      <span className="text-[10px] text-emerald-400 font-medium">● Online • Ready to assist</span>
                    </div>
                  </div>
                  
                  {/* Instant WhatsApp Quick Connect */}
                  <a href="https://wa.me/905380507777" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t.whatsappConnect}</span>
                  </a>
                </div>

                {/* Chat Message Scroll */}
                <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-slate-50 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-slate-900 text-white' 
                            : 'bg-white text-slate-800 shadow-sm border border-slate-100'
                        }`}
                      >
                        {/* Formatted Text rendering with simple line breaks */}
                        <p className="whitespace-pre-line font-medium">{msg.content}</p>
                        
                        {msg.role === 'assistant' && index > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                            <a 
                              href="https://wa.me/905380507777" 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1"
                            >
                              <span>{t.whatsappButton}</span>
                              <ChevronRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {sendingChat && (
                    <div className="flex justify-start">
                      <div className="bg-white text-slate-500 rounded-2xl p-4 text-xs sm:text-sm shadow-sm border border-slate-100 flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="font-semibold text-xs ml-2">{t.loading}</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat suggestions and snapchat tool */}
                <div className="p-3 bg-white border-t border-slate-100 flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => handleSendChat(undefined, lang === 'ar' ? "اقترح لي برنامج سياحي مميز 3 أيام في إسطنبول" : "Suggest a luxury 3-day program in Istanbul")}
                    className="text-[10px] bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 transition font-extrabold"
                  >
                    📍 {lang === 'ar' ? 'برنامج إسطنبول' : 'Istanbul program'}
                  </button>
                  <button 
                    onClick={() => handleSendChat(undefined, lang === 'ar' ? "ما هي خيارات زراعة الشعر وتكلفتها لديكم؟" : "What are hair transplant options & pricing?")}
                    className="text-[10px] bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 transition font-extrabold"
                  >
                    💇 {lang === 'ar' ? 'زراعة الشعر' : 'Hair transplant'}
                  </button>
                  <button 
                    onClick={() => handleSendChat(undefined, lang === 'ar' ? "كم تكلفة سيارة مرسيدس فيتو VIP مع سائق؟" : "How much is Mercedes Vito VIP with driver?")}
                    className="text-[10px] bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 transition font-extrabold"
                  >
                    🚘 {lang === 'ar' ? 'سيارات VIP مع سائق' : 'VIP Vito rate'}
                  </button>
                  <button 
                    onClick={handleSnapchatGeneration}
                    className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-200 transition font-extrabold flex items-center gap-1 animate-pulse"
                  >
                    👻 {t.snapchatBtn}
                  </button>
                </div>

                {/* Chat Input form */}
                <form onSubmit={handleSendChat} className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={t.chatPlaceholder}
                    className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                  />
                  <button type="submit" disabled={sendingChat} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition flex items-center gap-2">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Main Chat Interface: Direct Human Live Chat */
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-md overflow-hidden flex flex-col h-[550px]">
                
                {/* Chat Header */}
                <div className="bg-[#1e293b] text-white p-4 sm:p-5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold">{lang === 'ar' ? 'فريق خدمة عملاء دنيز سراي' : 'Deniz Saray Travel Support'}</h5>
                      <span className="text-[10px] text-emerald-400 font-medium">● {lang === 'ar' ? 'نشط الآن • دردشة مشفرة مباشرة' : 'Active now • Secure direct sync'}</span>
                    </div>
                  </div>
                  
                  {/* Emergency Instant Support */}
                  <a href="tel:+905380507777" className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'ar' ? 'اتصال مباشر' : 'Direct Call'}</span>
                  </a>
                </div>

                {/* Chat Message Scroll */}
                <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-slate-50 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Welcome message */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed bg-white text-slate-800 shadow-sm border border-slate-100">
                        <p className="font-semibold text-slate-900 mb-1">🛎️ {lang === 'ar' ? 'مرحباً بك في المحادثة الفورية!' : 'Welcome to Live Chat!'}</p>
                        <p className="font-medium text-slate-600">
                          {lang === 'ar' 
                            ? 'أنت الآن متصل مباشرة بقسم إدارة الحجوزات والدعم السياحي في دنيز سراي. يمكنك كتابة استفسارك وسيجيبك أحد موظفينا فوراً باللغة العربية أو لغتك المفضلة.' 
                            : 'You are now connected directly to Deniz Saray Travel operations and bookings department. Send any query and our consultants will assist you immediately.'}
                        </p>
                      </div>
                    </div>

                    {/* Firestore Messages */}
                    {humanMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                            msg.sender === 'client' 
                              ? 'bg-slate-900 text-white' 
                              : 'bg-emerald-50 border border-emerald-100 text-emerald-950'
                          }`}
                        >
                          {msg.sender !== 'client' && (
                            <span className="text-[9px] font-extrabold text-emerald-800 block mb-1 uppercase tracking-wider">
                              {msg.senderName || 'Operations Manager'}
                            </span>
                          )}
                          <p className="whitespace-pre-line font-medium">{msg.content}</p>
                          <span className="text-[8px] text-slate-400 block mt-1.5 text-right font-mono" dir="ltr">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions inside Live support */}
                <div className="p-3 bg-white border-t border-slate-100 flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => {
                      setHumanChatInput(lang === 'ar' ? "أريد تعديل موعد حجز السيارة الـ VIP الخاصة بي." : "I need to modify my VIP car booking details.");
                    }}
                    className="text-[10px] bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 transition font-extrabold"
                  >
                    🗓️ {lang === 'ar' ? 'تعديل موعد رحلة' : 'Reschedule ride'}
                  </button>
                  <button 
                    onClick={() => {
                      setHumanChatInput(lang === 'ar' ? "هل يمكنني إلغاء الحجز الحالي أو تأجيله؟" : "Can I cancel or postpone my current booking?");
                    }}
                    className="text-[10px] bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 transition font-extrabold"
                  >
                    ⚠️ {lang === 'ar' ? 'إلغاء أو تأجيل حجز' : 'Cancel / Delay'}
                  </button>
                  <a 
                    href="https://wa.me/905380507777" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-200 transition font-extrabold flex items-center gap-1"
                  >
                    💬 WhatsApp Redirect
                  </a>
                </div>

                {/* Chat Input form */}
                <form onSubmit={handleSendHumanChat} className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                  <input 
                    type="text" 
                    value={humanChatInput}
                    onChange={(e) => setHumanChatInput(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتب رسالتك للإدارة هنا...' : 'Type your message for operations support...'}
                    className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition font-medium"
                  />
                  <button type="submit" disabled={sendingHumanChat} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition flex items-center gap-2">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}


        {/* ----------------- TAB: ADMIN DASHBOARD ----------------- */}
        {activeTab === 'admin' && (
          <div id="tab_content_admin" className="space-y-8 animate-fade-in">
            
            {/* Header info */}
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.adminTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.adminSubtitle}</p>
            </div>

            {!isAdminAuthenticated ? (
              /* Auth Form */
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <form onSubmit={handleAdminAuth} className="space-y-6">
                  <div className="text-center">
                    <Sliders className="w-12 h-12 text-slate-900 mx-auto" />
                    <h4 className="text-lg font-bold text-slate-900 mt-4">
                      {lang === 'ar' ? "مطلوب التحقق الأمني للوصول" :
                       lang === 'ku' ? "پشتڕاستکرنا ئەمنی پێدڤی یە" :
                       lang === 'tr' ? "Güvenlik Doğrulaması Gerekli" :
                       "Security Verification Required"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {lang === 'ar' ? "هذه الصفحة مخصصة لمالك التطبيق ومشرفي دنيز سراي ترافيل فقط. يرجى إدخال رمز المرور الآمن للمتابعة." :
                       lang === 'ku' ? "ئەڤ پەیجە تایبەتە ب خودانێ بەرنامەی و رێڤەبەرێن دەنيز سەرای تراڤڵ بتنێ. کلیلا دەربازبوونێ بنڤیسە." :
                       lang === 'tr' ? "Bu sayfa yalnızca uygulama sahibi ve Deniz Saray Travel yöneticileri içindir. Devam etmek için şifrenizi giriniz." :
                       "This area is restricted to the application owner and Deniz Saray Travel administrators. Please enter your secure passkey to proceed."}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                      {lang === 'ar' ? "رمز المرور الآمن" :
                       lang === 'ku' ? "کلیلا دەربازبوونێ" :
                       lang === 'tr' ? "Güvenli Giriş Şifresi" :
                       "Secure Access Key"}
                    </label>
                    <input 
                      type="password" 
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-900 transition font-medium text-center"
                    />
                  </div>

                  <button type="submit" className="w-full bg-slate-950 hover:bg-slate-900 text-white font-extrabold py-3.5 px-6 rounded-xl transition shadow">
                    {lang === 'ar' ? "تأكيد الهوية والوصول" :
                     lang === 'ku' ? "پشتڕاستکرن و چوونەژوور" :
                     lang === 'tr' ? "Erişimi Doğrula" :
                     "Verify & Authenticate"}
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Admin View */
              <div className="space-y-12">
                
                {/* Stats board */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.totalBookings}</span>
                    <span className="text-3xl font-extrabold text-slate-950 block mt-1">{bookings.length}</span>
                    <span className="text-xs text-emerald-600 font-semibold block mt-1">✓ Live Active Inquiries</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.pendingActions}</span>
                    <span className="text-3xl font-extrabold text-amber-600 block mt-1">
                      {bookings.filter(b => b.status === 'Pending').length}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold block mt-1">Needs review</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.activeDrivers}</span>
                    <span className="text-3xl font-extrabold text-emerald-600 block mt-1">
                      {drivers.filter(d => d.status === 'Available').length} / {drivers.length}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold block mt-1">VIP Chauffeurs</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.activeHospitals}</span>
                    <span className="text-3xl font-extrabold text-red-600 block mt-1">{hospitals.length}</span>
                    <span className="text-xs text-slate-400 font-semibold block mt-1">JCI Partner clinics</span>
                  </div>
                </div>

                {/* Live News Broadcast Panel */}
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8">
                  <h4 className="text-base font-extrabold text-amber-900 mb-2 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-amber-700" />
                    {t.notifications}
                  </h4>
                  <p className="text-xs text-amber-800 mb-4">
                    Send a broadcast notification that appears instantly at the top of the app interface for all visitors and drivers.
                  </p>
                  <form onSubmit={handleBroadcast} className="flex gap-3">
                    <input 
                      type="text" 
                      required
                      value={broadcastInput}
                      onChange={(e) => setBroadcastInput(e.target.value)}
                      placeholder={t.notificationContent}
                      className="flex-grow bg-white border border-amber-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition font-medium"
                    />
                    <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-bold text-xs transition">
                      {t.sendNotificationBtn}
                    </button>
                  </form>
                </div>

                {/* Filters, Search & Booking Management Suite */}
                <div className="space-y-6">
                  
                  {/* Search and Filters Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-600" />
                      {lang === 'ar' ? 'البحث المتقدم وتصفية الطلبات والتقارير الفورية' : 'Advanced Booking Filters & Instant Reports'}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {/* Search Bar */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'بحث عن عميل / رقم' : 'Search'}</label>
                        <input 
                          type="text"
                          value={adminSearchQuery}
                          onChange={(e) => setAdminSearchQuery(e.target.value)}
                          placeholder={lang === 'ar' ? "الاسم، الهاتف، الجنسية، الملاحظات..." : "Name, phone, nationality, notes..."}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition font-medium"
                        />
                      </div>

                      {/* Service Type Filter */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'نوع الخدمة' : 'Service Type'}</label>
                        <select
                          value={adminFilterService}
                          onChange={(e) => setAdminFilterService(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition font-bold text-slate-700"
                        >
                          <option value="all">{lang === 'ar' ? 'الكل' : 'All'}</option>
                          <option value="tourism">{lang === 'ar' ? 'رحلة سياحية' : 'Tour'}</option>
                          <option value="transport">{lang === 'ar' ? 'نقل VIP' : 'VIP Transport'}</option>
                          <option value="hotel">{lang === 'ar' ? 'حجز فندق' : 'Hotel'}</option>
                          <option value="flight">{lang === 'ar' ? 'تذكرة طيران' : 'Flight'}</option>
                          <option value="medical">{lang === 'ar' ? 'موعد علاج' : 'Medical'}</option>
                        </select>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'حالة الطلب' : 'Status'}</label>
                        <select
                          value={adminFilterStatus}
                          onChange={(e) => setAdminFilterStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition font-bold text-slate-700"
                        >
                          <option value="all">{lang === 'ar' ? 'الكل' : 'All'}</option>
                          <option value="Pending">{lang === 'ar' ? 'جديد (Pending)' : 'Pending'}</option>
                          <option value="reviewing">{lang === 'ar' ? 'قيد المراجعة' : 'Reviewing'}</option>
                          <option value="contacted">{lang === 'ar' ? 'تم التواصل' : 'Contacted'}</option>
                          <option value="Confirmed">{lang === 'ar' ? 'تم الحجز (Confirmed)' : 'Confirmed'}</option>
                          <option value="Completed">{lang === 'ar' ? 'مكتمل (Completed)' : 'Completed'}</option>
                          <option value="Cancelled">{lang === 'ar' ? 'ملغي (Cancelled)' : 'Cancelled'}</option>
                        </select>
                      </div>

                      {/* Travel Date Filter */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'تاريخ الرحلة' : 'Travel Date'}</label>
                        <input 
                          type="date"
                          value={adminFilterDate}
                          onChange={(e) => setAdminFilterDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Management Table Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <div>
                          <h4 className="font-extrabold text-sm">{t.bookings}</h4>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {lang === 'ar' ? `يعرض ${bookings.filter(b => {
                              if (adminSearchQuery.trim()) {
                                const qL = adminSearchQuery.toLowerCase();
                                return b.clientName?.toLowerCase().includes(qL) || b.clientPhone?.toLowerCase().includes(qL);
                              }
                              return true;
                            }).length} من أصل ${bookings.length} حجز` : `Showing filtered list of client inquiries`}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 font-extrabold px-2.5 py-1 rounded">
                        SECURE FIRESTORE ENGINE
                      </span>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase">
                            <th className="p-4">Customer Details</th>
                            <th className="p-4">Nationality / Guests</th>
                            <th className="p-4">Service Type</th>
                            <th className="p-4">Details & Custom Notes</th>
                            <th className="p-4">Travel Date</th>
                            <th className="p-4">Inquiry Status</th>
                            <th className="p-4 text-center">Instant Communication</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {bookings.filter((booking) => {
                            // Apply filters
                            if (adminSearchQuery.trim()) {
                              const qL = adminSearchQuery.toLowerCase();
                              const nameMatch = booking.clientName?.toLowerCase().includes(qL);
                              const phoneMatch = booking.clientPhone?.toLowerCase().includes(qL);
                              const whatsappMatch = booking.clientWhatsapp?.toLowerCase().includes(qL);
                              const detailMatch = booking.details?.toLowerCase().includes(qL);
                              const notesMatch = booking.notes?.toLowerCase().includes(qL);
                              const nationalityMatch = booking.nationality?.toLowerCase().includes(qL);
                              if (!nameMatch && !phoneMatch && !whatsappMatch && !detailMatch && !notesMatch && !nationalityMatch) return false;
                            }
                            if (adminFilterService !== 'all' && booking.type !== adminFilterService) return false;
                            if (adminFilterStatus !== 'all') {
                              if (booking.status?.toLowerCase() !== adminFilterStatus.toLowerCase()) return false;
                            }
                            if (adminFilterDate && booking.date !== adminFilterDate) return false;
                            return true;
                          }).map((booking) => (
                            <tr key={booking.id} className="hover:bg-slate-50/50 transition">
                              <td className="p-4">
                                <div className="font-extrabold text-slate-900 text-sm">{booking.clientName}</div>
                                <div className="text-slate-500 font-mono text-[11px] mt-0.5" dir="ltr">📞 {booking.clientPhone}</div>
                                {booking.clientEmail && <div className="text-[10px] text-slate-400 mt-0.5">✉ {booking.clientEmail}</div>}
                              </td>
                              <td className="p-4">
                                <div className="font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-md px-2 py-1 inline-flex items-center gap-1.5">
                                  <span>🌍</span>
                                  <span>{booking.nationality || (lang === 'ar' ? 'غير محدد' : 'Not specified')}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 font-extrabold mt-1">
                                  👥 {booking.guestsCount || 1} {lang === 'ar' ? 'أشخاص' : 'Guest(s)'}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full uppercase font-extrabold text-[9px] ${
                                  booking.type === 'tourism' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                                  booking.type === 'transport' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                                  booking.type === 'medical' ? 'bg-red-100 text-red-900 border border-red-200' :
                                  'bg-blue-100 text-blue-900 border border-blue-200'
                                }`}>
                                  {booking.type}
                                </span>
                              </td>
                              <td className="p-4 text-slate-600 max-w-xs">
                                <div className="line-clamp-2 leading-relaxed" title={booking.details}>{booking.details}</div>
                                {booking.notes && (
                                  <div className="mt-1.5 p-2 bg-amber-50/70 border border-amber-100 rounded-lg text-[10px] text-amber-900 italic font-medium">
                                    <strong>Notes:</strong> {booking.notes}
                                  </div>
                                )}
                              </td>
                              <td className="p-4 text-slate-500 font-semibold">{booking.date}</td>
                              <td className="p-4">
                                <select 
                                  value={booking.status || 'Pending'} 
                                  onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold border focus:outline-none focus:ring-1 transition ${
                                    booking.status === 'Confirmed' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
                                    booking.status === 'Completed' ? 'bg-blue-50 border-blue-300 text-blue-800' :
                                    booking.status === 'Cancelled' ? 'bg-red-50 border-red-300 text-red-800' :
                                    booking.status === 'reviewing' ? 'bg-indigo-50 border-indigo-300 text-indigo-800' :
                                    booking.status === 'contacted' ? 'bg-purple-50 border-purple-300 text-purple-800' :
                                    'bg-amber-50 border-amber-300 text-amber-800'
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="reviewing">Reviewing</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center justify-center gap-2">
                                  {/* Direct Call Button */}
                                  <a 
                                    href={`tel:${booking.clientPhone}`} 
                                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition" 
                                    title="Call client directly"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                  
                                  {/* WhatsApp Direct Link */}
                                  <a 
                                    href={`https://wa.me/${(booking.clientWhatsapp || booking.clientPhone).replace(/\D/g, '')}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition" 
                                    title="WhatsApp Chat"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                  </a>

                                  {/* Live In-App Chat Action */}
                                  <button 
                                    onClick={() => {
                                      setAdminSelectedClientId(booking.clientId);
                                      setAdminSelectedClientName(booking.clientName);
                                    }}
                                    className={`p-2 rounded-lg transition font-bold flex items-center gap-1 ${
                                      adminSelectedClientId === booking.clientId 
                                        ? 'bg-slate-900 text-white' 
                                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-50'
                                    }`}
                                    title="Open Client-Admin Live chat inside app"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                    <span className="text-[10px]">Chat</span>
                                  </button>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <button 
                                  onClick={() => deleteBooking(booking.id)} 
                                  className="p-2 hover:bg-red-50 text-red-600 hover:text-red-800 rounded-lg transition"
                                  title="Delete Inquiry permanently"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {bookings.length === 0 && (
                            <tr>
                              <td colSpan={8} className="p-10 text-center text-slate-400 font-bold">
                                No active customer bookings found in the secure Firestore system.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Real-Time Live Chat Workspace with selected customer */}
                  {adminSelectedClientId && (
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-md overflow-hidden flex flex-col h-[500px] animate-fade-in">
                      
                      {/* Chat Header */}
                      <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-extrabold text-sm">
                            {(adminSelectedClientName || 'C')[0]}
                          </div>
                          <div>
                            <h5 className="font-extrabold text-sm">
                              {lang === 'ar' ? `المحادثة الفورية مع: ${adminSelectedClientName}` : `Live Sync with: ${adminSelectedClientName}`}
                            </h5>
                            <span className="text-[9px] text-emerald-400 block mt-0.5">● CLIENT ONLINE VIA ANONYMOUS AUTH</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setAdminSelectedClientId(null);
                            setAdminSelectedClientName(null);
                          }}
                          className="text-xs text-slate-400 hover:text-white font-bold transition"
                        >
                          {lang === 'ar' ? 'إغلاق المحادثة ✕' : 'Close Workspace ✕'}
                        </button>
                      </div>

                      {/* Chat Messages */}
                      <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-4">
                        {adminChatMessages.length === 0 && (
                          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                            <Sparkles className="w-8 h-8 text-slate-300 animate-spin" />
                            <p className="font-bold text-xs">{lang === 'ar' ? 'لا توجد رسائل سابقة. أرسل رسالة ترحيبية للعميل!' : 'No previous chat messages. Say hello to get started!'}</p>
                          </div>
                        )}
                        
                        {adminChatMessages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                                msg.sender === 'admin' 
                                  ? 'bg-slate-900 text-white shadow-sm' 
                                  : 'bg-white text-slate-800 shadow-sm border border-slate-100'
                              }`}
                            >
                              <p className="whitespace-pre-line font-semibold">{msg.content}</p>
                              <span className="text-[8px] text-slate-400 block mt-1.5 text-right font-mono" dir="ltr">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Sender Form */}
                      <form onSubmit={handleSendAdminChatMessage} className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                        <input 
                          type="text" 
                          value={adminChatInput}
                          onChange={(e) => setAdminChatInput(e.target.value)}
                          placeholder={lang === 'ar' ? 'اكتب ردك للعميل هنا وسوف يظهر على هاتفه فوراً...' : 'Type your reply. It will sync instantly on customer screen...'}
                          className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 transition font-medium shadow-inner"
                        />
                        <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold text-xs transition">
                          {lang === 'ar' ? 'إرسال الرد الفوري' : 'Send Sync'}
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {/* Real-time Chauffeur GPS Fleet Tracking */}
                <div className="mb-8">
                  <ChauffeurMapTracker 
                    drivers={drivers}
                    lang={lang}
                    onRefreshTelemetry={handleRefreshTelemetry}
                    isFetching={isFetchingTelemetry}
                  />
                </div>

                {/* Driver / Fleet management list & Create Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Drivers Fleet management */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Car className="w-5 h-5 text-emerald-600" />
                      {t.drivers}
                    </h4>

                    <form onSubmit={handleAddDriver} className="bg-slate-50 p-4 rounded-2xl space-y-4">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Add Premium Chauffeur</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          required
                          placeholder="Driver Name"
                          value={newDriverName}
                          onChange={(e) => setNewDriverName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Mercedes Vito VIP (2025)"
                          value={newDriverCar}
                          onChange={(e) => setNewDriverCar(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="العربية, التركية, English"
                          value={newDriverLang}
                          onChange={(e) => setNewDriverLang(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="+90539111..."
                          value={newDriverPhone}
                          onChange={(e) => setNewDriverPhone(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 text-white font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add Chauffeur
                      </button>
                    </form>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {drivers.map((drv) => (
                        <div key={drv.id} className="p-3 bg-white border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <span className="font-extrabold text-slate-900 block">{drv.name}</span>
                            <span className="text-[10px] text-slate-400">{drv.carModel} • {drv.phone}</span>
                          </div>
                          <button onClick={() => handleDeleteDriver(drv.id)} className="p-1 hover:bg-red-50 text-red-500 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hotel Management */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-emerald-600" />
                      {t.hotels}
                    </h4>

                    <form onSubmit={handleAddHotel} className="bg-slate-50 p-4 rounded-2xl space-y-4">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Add Premium Hotel Partner</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          required
                          placeholder="Hotel/Resort Name"
                          value={newHotelName}
                          onChange={(e) => setNewHotelName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="City (e.g. Antalya)"
                          value={newHotelCity}
                          onChange={(e) => setNewHotelCity(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="number" 
                          min="1" 
                          max="5"
                          placeholder="Stars (5)"
                          value={newHotelStars}
                          onChange={(e) => setNewHotelStars(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Price per night (e.g. $120)"
                          value={newHotelPrice}
                          onChange={(e) => setNewHotelPrice(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 text-white font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add Hotel
                      </button>
                    </form>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {hotels.map((h) => (
                        <div key={h.id} className="p-3 bg-white border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <span className="font-extrabold text-slate-900 block">{h.name}</span>
                            <span className="text-[10px] text-slate-400">{h.city} • {h.stars}★ • {h.pricePerNight}</span>
                          </div>
                          <button onClick={() => handleDeleteHotel(h.id)} className="p-1 hover:bg-red-50 text-red-500 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Affiliate Hospitals CRUD list */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-600" />
                    {t.hospitals}
                  </h4>

                  <form onSubmit={handleAddHospital} className="bg-slate-50 p-4 rounded-2xl space-y-4 max-w-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Register JCI Medical Affiliate Clinic</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        required
                        placeholder="Clinic Name"
                        value={newHospitalName}
                        onChange={(e) => setNewHospitalName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Specialties (تجميل, عيون)"
                        value={newHospitalSpecialties}
                        onChange={(e) => setNewHospitalSpecialties(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="City"
                        value={newHospitalCity}
                        onChange={(e) => setNewHospitalCity(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="bg-slate-900 hover:bg-emerald-600 text-white font-extrabold py-2 px-6 rounded-xl text-xs flex items-center justify-center gap-1">
                      <Plus className="w-3.5 h-3.5 text-emerald-400" /> Add Clinic Network
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {hospitals.map((hosp) => (
                      <div key={hosp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-extrabold text-slate-900 block">{hosp.name}</span>
                          <span className="text-[10px] text-slate-400">{hosp.city} • {hosp.specialty.join(', ')}</span>
                        </div>
                        <button onClick={() => handleDeleteHospital(hosp.id)} className="p-1 hover:bg-red-50 text-red-500 rounded">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer Branding & Elegant Contact Form (No Tech-Larping System Data) */}
      <footer id="app_footer" className="bg-[#0b1329] text-white py-12 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div onClick={handleLogoClick} className="cursor-pointer select-none active:scale-95 transition inline-block" title={lang === 'ar' ? "لوحة التحكم السرية" : "Admin Secret Click"}>
              <DenizSarayLogo lang={lang} showText={true} size={46} isDark={true} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium concierge travel platform in Turkey. Bespoke itineraries, VIP logistics, and world-class medical tourism coordination.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <span className="block">Email: booking@denizsaraytravel.com</span>
              <span className="block">Licence: TURSAB Group A #12345</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Our Destinations</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Istanbul Tourism & VIP Transfers</li>
              <li>Bursa Green Thermal Escapes</li>
              <li>Sapanca Lake Luxury Day Programs</li>
              <li>Trabzon & Antalya Beach Resorts</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Medical Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Hair Transplant (DHI & FUE)</li>
              <li>Cosmetics Surgery</li>
              <li>Dental Aesthetics (Hollywood Smile)</li>
              <li>Weight loss & Obesity treatment</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Fast Contact Connect</h4>
            <p className="text-xs text-slate-400">
              Message us on WhatsApp or follow us on Snapchat to see our latest VIP travels. Open 24/7.
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/905380507777" target="_blank" rel="noreferrer" className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition items-center gap-2 w-fit">
                <Phone className="w-3.5 h-3.5" />
                <span>+90 538 050 77 77</span>
              </a>
              <a href="https://www.snapchat.com/add/denizsaray3" target="_blank" rel="noreferrer" className="inline-flex bg-[#FFFC00] hover:bg-[#fffa6b] text-slate-900 text-xs font-black px-4 py-2.5 rounded-xl transition items-center gap-2 w-fit">
                <SnapchatIcon className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
                <span>Snapchat: denizsaray3</span>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          Deniz Saray Travel VIP & Health Tourism. Turkey All rights reserved © 2026.
        </div>
      </footer>

    </div>
  );
}
