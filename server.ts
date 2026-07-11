import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Mock/In-Memory Database
let bookings = [
  {
    id: "b1",
    clientName: "خالد العتيبي",
    clientPhone: "+966501234567",
    clientEmail: "khaled@example.com",
    type: "tourism",
    details: "برنامج سياحي 5 أيام في إسطنبول وسبانجا لعائلة من 4 أفراد مع سيارة VIP.",
    status: "Confirmed",
    date: "2026-07-15",
    createdAt: new Date().toISOString()
  },
  {
    id: "b2",
    clientName: "احمد بارزاني",
    clientPhone: "+9647501234567",
    clientEmail: "ahmed.barzani@example.com",
    type: "medical",
    details: "زراعة شعر مع خدمة الترجمة الطبية والمرافقة والاستقبال من المطار.",
    status: "Pending",
    date: "2026-07-20",
    createdAt: new Date().toISOString()
  },
  {
    id: "b3",
    clientName: "John Doe",
    clientPhone: "+12025550199",
    clientEmail: "john.doe@example.com",
    type: "hotel_flight",
    details: "Hotel comparison in Antalya and flight reservation from London.",
    status: "Pending",
    date: "2026-08-01",
    createdAt: new Date().toISOString()
  }
];

let drivers = [
  { id: "d1", name: "أحمد يلماز", carModel: "Mercedes-Benz Vito VIP (2025)", languages: ["العربية", "التركية"], status: "Available", phone: "+905391111111", lat: 41.0082, lng: 28.9784 },
  { id: "d2", name: "عمر الكردي", carModel: "Volkswagen Caravelle VIP", languages: ["العربية", "الكوردية", "التركية"], status: "On Trip", phone: "+905392222222", lat: 41.0370, lng: 28.9850 },
  { id: "d3", name: "مصطفى كايا", carModel: "Mercedes-Benz Sprinter VIP", languages: ["English", "Türkçe"], status: "Available", phone: "+905393333333", lat: 40.9902, lng: 29.1245 }
];

let hotels = [
  { id: "h1", name: "دنيز سراي بالاس - إسطنبول", city: "إسطنبول", stars: 5, pricePerNight: "$180", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60" },
  { id: "h2", name: "جراند تيرمال - بورصة", city: "بورصة", stars: 5, pricePerNight: "$150", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop&q=60" },
  { id: "h3", name: "سبانجا ليك ريزورت", city: "سبانجا", stars: 4, pricePerNight: "$120", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60" }
];

let hospitals = [
  { id: "m1", name: "مستشفى دنيز سراي التجميلي", specialty: ["تجميل", "زراعة شعر"], city: "إسطنبول", rating: 4.9 },
  { id: "m2", name: "مركز التميز لطب الأسنان", specialty: ["أسنان", "ابتسامة هوليود"], city: "إسطنبول", rating: 4.8 },
  { id: "m3", name: "مستشفى ميموريال العيون والسمنة", specialty: ["عيون", "علاج السمنة"], city: "إسطنبول", rating: 4.7 }
];

// Broadcast notifications log
let notifications: Array<{ id: string, content: string, sentAt: string }> = [];

// API Endpoints
app.get("/api/data", (req, res) => {
  // Simulate continuous movement for drivers by drifting their stored coordinates slightly
  drivers.forEach(d => {
    const deltaLat = (Math.random() - 0.5) * 0.0002;
    const deltaLng = (Math.random() - 0.5) * 0.0002;
    d.lat = Number((d.lat + deltaLat).toFixed(6));
    d.lng = Number((d.lng + deltaLng).toFixed(6));
  });
  res.json({ bookings, drivers, hotels, hospitals, notifications });
});

app.post("/api/bookings", (req, res) => {
  const { clientName, clientPhone, clientEmail, type, details, date } = req.body;
  if (!clientName || !clientPhone) {
    return res.status(400).json({ error: "Client name and phone are required" });
  }
  const newBooking = {
    id: "b" + (bookings.length + 1) + Math.floor(Math.random() * 1000),
    clientName,
    clientPhone,
    clientEmail,
    type,
    details,
    status: "Pending" as const,
    date: date || new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.put("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const { status, details, date } = req.body;
  const bookingIndex = bookings.findIndex(b => b.id === id);
  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }
  if (status) bookings[bookingIndex].status = status;
  if (details) bookings[bookingIndex].details = details;
  if (date) bookings[bookingIndex].date = date;
  res.json(bookings[bookingIndex]);
});

app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  bookings = bookings.filter(b => b.id !== id);
  res.json({ success: true });
});

// Manage Lists endpoints (for full CRUD simulation in the dashboard)
app.post("/api/drivers", (req, res) => {
  const { name, carModel, languages, status, phone } = req.body;
  const baseLat = 41.0082 + (Math.random() - 0.5) * 0.05;
  const baseLng = 28.9784 + (Math.random() - 0.5) * 0.08;
  const newDriver = {
    id: "d" + (drivers.length + 1),
    name,
    carModel,
    languages: Array.isArray(languages) ? languages : [languages],
    status: status || "Available",
    phone: phone || "+905390000000",
    lat: Number(baseLat.toFixed(6)),
    lng: Number(baseLng.toFixed(6))
  };
  drivers.push(newDriver);
  res.status(201).json(newDriver);
});

app.delete("/api/drivers/:id", (req, res) => {
  const { id } = req.params;
  drivers = drivers.filter(d => d.id !== id);
  res.json({ success: true });
});

app.post("/api/hotels", (req, res) => {
  const { name, city, stars, pricePerNight, image } = req.body;
  const newHotel = {
    id: "h" + (hotels.length + 1),
    name,
    city,
    stars: Number(stars) || 5,
    pricePerNight: pricePerNight || "$100",
    image: image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500"
  };
  hotels.push(newHotel);
  res.status(201).json(newHotel);
});

app.delete("/api/hotels/:id", (req, res) => {
  const { id } = req.params;
  hotels = hotels.filter(h => h.id !== id);
  res.json({ success: true });
});

app.post("/api/hospitals", (req, res) => {
  const { name, specialty, city, rating } = req.body;
  const newHospital = {
    id: "m" + (hospitals.length + 1),
    name,
    specialty: Array.isArray(specialty) ? specialty : [specialty],
    city,
    rating: Number(rating) || 5.0
  };
  hospitals.push(newHospital);
  res.status(201).json(newHospital);
});

app.delete("/api/hospitals/:id", (req, res) => {
  const { id } = req.params;
  hospitals = hospitals.filter(h => h.id !== id);
  res.json({ success: true });
});

// Broadcast notification endpoint
app.post("/api/notifications", (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });
  const newNotif = {
    id: "n" + (notifications.length + 1),
    content,
    sentAt: new Date().toISOString()
  };
  notifications.unshift(newNotif);
  res.status(201).json(newNotif);
});

// AI Travel Assistant endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  // Map the frontend messages to Gemini API contents format
  const contents = messages.map(msg => ({
    role: msg.role === "assistant" ? "model" as const : "user" as const,
    parts: [{ text: msg.content }]
  }));

  const systemInstruction = `
You are the Elite AI Travel Consultant of "Deniz Saray Travel" (دنيز سراي للسياحة).
You must behave exactly as an upscale, welcoming, elegant travel and medical consultant.
Your objective is to advise, answer questions, provide tailored travel itineraries, medical procedures packages, and ultimately direct the customer to contact the human team on WhatsApp (+90 538 050 77 77) to secure their bookings.

Features of Deniz Saray Travel you must highlight proudly:
1. Tourism: Tour programs in Istanbul, Bursa, Sapanca, Trabzon, Antalya, and custom daily/weekly itineraries with luxury VIP transport.
2. Transportation: VIP Mercedes Vito/Sprinter or VW Caravelle cars with drivers speaking Arabic, Kurdish, English, and Turkish. Airport pickups and intercity transfers.
3. Hotel & Flights: Hotel bookings, price comparison, flight reservation.
4. Medical Tourism (السياحة العلاجية): Accompanying the patient, hospital booking in top clinics, medical translation, pre-and-post-op follow-up. Specialties: Cosmetology (تجميل), Hair transplant (زراعة شعر), Dental aesthetics (أسنان/ابتسامة هوليود), Ophthalmology/LASIK (عيون), Obesity treatment/Gastric sleeve (علاج السمنة).

Special Request:
If the user asks you to generate "Snapchat story/content" (أو قصة سناب شات ترويجية) to increase sales, generate a high-converting, creative, and engaging social media story sequence with catchy headings, hooks, and emojis, finishing with a clear call-to-action to book with Deniz Saray Travel.

Languages:
Respond in the language the user speaks (Arabic, Kurdish Sorani, Turkish, or English). Keep your tone refined, welcoming, and reassuring. Always provide the WhatsApp contact link/number (+90 538 050 77 77) naturally at the end of itinerary suggestions or packages.
  `;

  let responseText = "";
  let success = false;
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting content generation using ${modelName}...`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      if (response && response.text) {
        responseText = response.text;
        success = true;
        break;
      }
    } catch (err: any) {
      console.warn(`Model ${modelName} failed:`, err.message || err);
    }
  }

  if (success) {
    return res.json({ response: responseText });
  }

  // Fallback beautiful responses if Gemini API is entirely experiencing high demand / offline
  console.log("Both Gemini models failed or experienced demand spikes. Generating a high-end luxury fallback response...");
  
  const lastUserMessage = messages[messages.length - 1]?.content || "";
  const combinedText = (lastUserMessage + " " + messages.map(m => m.content).join(" ")).toLowerCase();

  // Detect language
  let lang: "ar" | "ku" | "tr" | "en" = "ar";
  if (/(دبێژم|چەوان|دشێم|هەوە|بۆ|ئەڤرۆ|پلان|گەشتا|شاهانە|بەرنامەیێ|پزیشکی|دەنیز|سەرای|تراڤڵ|سناپچات|سناپچاتی|چیرۆک|شوفێر|حجز|بلیتا|فرینێ|هۆتێلێ|سڵاو|سوپاس|باشتر|خۆش)/i.test(combinedText)) {
    lang = "ku";
  } else if (/(merhaba|nasılsınız|teşekkür|turizm|transfer|istanbul|bursa|otel|uçak|rezervasyon|şoför|vito|premium)/i.test(combinedText)) {
    lang = "tr";
  } else if (/[a-zA-Z]/.test(lastUserMessage) && !/[\u0600-\u06FF]/.test(lastUserMessage)) {
    lang = "en";
  }

  // Check category
  const isSnapchat = /(snapchat|story|سناب|ترويج|چیرۆک|سناپ)/i.test(combinedText);
  const isMedical = /(medical|hospital|treatment|doctor|hair|transplant|dental|teeth|عيادة|طبي|علاج|مستشفى|نەخۆش|پزیشکی|چاندن|پرچێ|ددانان|جوانکاری)/i.test(combinedText);
  const isTransport = /(driver|car|vito|transfer|airport|pickup|سائق|سيارة|توصيل|شوفێر|ترومبێل|ڤیتۆ)/i.test(combinedText);
  const isHotelFlight = /(hotel|flight|booking|ticket|reservation|فندق|طيران|حجز|بلیتا|فرینێ|هۆتێلێ)/i.test(combinedText);

  if (lang === "ar") {
    if (isSnapchat) {
      responseText = `✨ **سيناريو قصة سناب شات ترويجية فاخرة - دنيز سراي ترافيل** ✨

📸 **اللقطة الأولى:** (صورة لسيارة مرسيدس فيتو VIP حديثة أمام مضيق البوسفور)
*النص الترويجي:* "هل تخطط لرحلة العمر في تركيا؟ 🇹🇷 عِش الفخامة والراحة المطلقة مع خدمات التوصيل الفاخرة وسيارات VIP مع سائق خاص يتحدث لغتك!"

📸 **اللقطة الثانية:** (فيديو قصير لإطلالة فندقية 5 نجوم ساحرة)
*النص الترويجي:* "نقارن لك أفضل الفنادق ونرتب لك الحجوزات بأقل الأسعار المنافسة! 🏨 دنيز سراي ترافيل بوابتك لراحة البال."

📸 **اللقطة الثالثة:** (صورة لمركز طبي حديث ومتطور)
*النص الترويجي:* "هل تبحث عن أفضل رعاية طبية وتجميلية؟ 🦷💇‍♂️ زراعة الشعر، تجميل الأسنان، وعلاجات السمنة مع مرافقة ومتابعة طبية متكاملة."

🚨 **دعوة للتفاعل (CTA):** "لا تنتظر! تواصل معنا مباشرة عبر الواتساب أو سناب شات واطلب برنامجك المخصص الآن ⬇️
🔗 [تواصل معنا مباشرة عبر الواتساب](https://wa.me/905380507777)
👻 سناب شات: [denizsaray3](https://www.snapchat.com/add/denizsaray3)
📞 الرقم المباشر: +90 538 050 77 77"`;
    } else if (isMedical) {
      responseText = `مرحباً بك في قسم السياحة العلاجية الفاخرة مع **دنيز سراي ترافيل** 🏥✨

نحن فخورون بتقديم رعاية طبية استثنائية بالتعاون مع أفضل المستشفيات والعيادات المعتمدة في تركيا. خدماتنا تشمل:
1. **زراعة الشعر بأحدث التقنيات** (FUE & DHI) مع كفالة مدى الحياة.
2. **تجميل الأسنان وابتسامة هوليود** الساحرة في وقت قياسي.
3. **عمليات التجميل وعلاجات السمنة** (كم تكميم المعدة وغيره) بإشراف كبار الجراحين.

🎁 **باقاتنا الطبية المتكاملة تشمل:**
- الاستقبال من المطار بسيارة VIP خاصة.
- الإقامة في أفخم فنادق إسطنبول.
- مترجم طبي يرافقك خطوة بخطوة أثناء المراجعات.
- متابعة طبية دورية بعد العملية لضمان أفضل النتائج.

💬 للحصول على استشارة مجانية وعرض سعر مخصص لحالتك، يسعدنا تواصلك مع فريقنا الطبي المباشر عبر الواتساب:
📞 **+90 538 050 77 77** (اضغط هنا للتواصل: [رابط الواتساب المباشر](https://wa.me/905380507777))`;
    } else if (isTransport) {
      responseText = `أهلاً بك في خدمة النقل الفاخر والـ VIP من **دنيز سراي ترافيل** 🚗💨

نحن نوفر لك أسطولاً من أحدث السيارات الفاخرة (Mercedes-Benz Vito VIP & Sprinter) لتضمن لك ولعائلتك رحلة مريحة وآمنة في تركيا.

🌟 **مميزات خدمات التوصيل لدينا:**
- سيارات حديثة ومجهزة بالكامل بسبل الراحة والرفاهية.
- سائقون محترفون يتحدثون لغتك (العربية، الكوردية، التركية، والإنجليزية).
- خدمة الاستقبال الفاخر من المطار والتنقلات البينية بين المدن التركية.
- مرونة كاملة في تخطيط جولاتك اليومية في إسطنبول، سبانجا، بورصة، وطرابزون.

📲 لحجز سيارة VIP وتأكيد السائق، يرجى إرسال تفاصيل رحلتك وتاريخ الوصول مباشرة عبر الواتساب:
📞 **+90 538 050 77 77** (رابط المراسلة المباشر: [اضغط هنا](https://wa.me/905380507777))`;
    } else if (isHotelFlight) {
      responseText = `مرحباً بك! يسعدنا مساعدتك في مقارنة وحجز أفضل الفنادق ورحلات الطيران في تركيا 🏨✈️

في **دنيز سراي ترافيل**، نتعاون مباشرة مع كبرى الفنادق فئة 5 نجوم و4 نجوم لنضمن لك أفضل الأسعار والخدمات الممتازة:
- **حجوزات فندقية فاخرة** بإطلالات بحرية ساحرة في إسطنبول, أنطاليا، وبورصة.
- **تذاكر طيران مرنة** بأفضل الأوقات المناسبة لجدول سفرك.
- **باقات سياحية متكاملة** تدمج الفندق، الطيران، والتنقلات اليومية بأسعار خاصة جداً.

💬 للحصول على أفضل عرض سعر مقارن للفنادق أو الطيران، يرجى تزويدنا بتواريخ السفر وعدد الأفراد عبر الواتساب لتأكيد الحجز:
📞 **+90 538 050 77 77** (تواصل مباشر عبر الواتساب: [اضغط هنا](https://wa.me/905380507777))`;
    } else {
      responseText = `مرحباً بك في **دنيز سراي ترافيل** (Deniz Saray Travel) 🌟
بوابتك لتجربة سياحية وعلاجية فاخرة في تركيا!

يسعدنا جداً خدمتك وتقديم الاستشارة الشاملة لك. نحن متخصصون في تقديم:
- 🗺️ **برامج سياحية متكاملة ومخصصة** في إسطنبول، سبانجا، بورصة، أنطاليا، وطرابزون.
- 🚗 **توصيلات VIP وسيارات فاخرة** مع سائقين يتحدثون العربية والكوردية.
- 🏥 **سياحة علاجية راقية** (زراعة الشعر، تجميل الأسنان، التجميل، والسمنة).
- 🏨 **حجز وتأمين الفنادق ورحلات الطيران** بأفضل الأسعار التنافسية.

نحن هنا لنجعل رحلتك خالية من المتاعب ومليئة بالرفاهية. 

💬 **لحجز برنامجك أو الاستفسار عن التفاصيل، يرجى التواصل مباشرة مع مستشارينا عبر الواتساب:**
📞 **+90 538 050 77 77** (للمراسلة الفورية اضغط هنا: [رابط الواتساب المباشر](https://wa.me/905380507777))`;
    }
  } else if (lang === "ku") {
    if (isSnapchat) {
      responseText = `✨ **چیرۆکەکا سناپچاتی یا ترویجی یا نایاب - دەنیز سەرای تراڤڵ** ✨

📸 **دیمەنێ ئێکێ:** (وێنەیەکێ ترومبێلا مرسیدس ڤیتۆ VIP یا نوی ل بەرامبەر دەریا بۆسفۆر)
*بابەتێ ترویجی:* "دێ گەشتا ژیانا خۆ کەی ل تورکیا؟ 🇹🇷 تژی خۆشی و راحەتیێ ببە دگەل خزمەتگوزاریێن مە یێن VIP و شوفێرێن تایبەت کو ب زمانێ تە دئاخڤن!"

📸 **دیمەنێ دووێ:** (ڤیدیۆیا دیمەنەکێ جوان یێ هۆتێلەکا ٥ ستێرک)
*بابەتێ ترویجی:* "ئەم بەراوردکرنا باشترین بهایێن هۆتێلان بۆ تە دکەین دگەل حجزکرن ب کێمترین نرخ! 🏨 دەنیز سەرای تراڤڵ بژاردەیا تە یا باشە."

📸 **دیمەنێ سێیێ:** (وێنەیەکێ سەنتەرەکێ پزیشکی یێ نوی)
*بابەتێ ترویجی:* "ل دویڤ باشترین چارەسەریا پزیشکی و جوانکاریێ دگەڕیی؟ 🦷💇‍♂️ چاندنا پرچێ، جوانکارییا ددانان، و چارەسەریا قەڵەویێ دگەل چاودێری و وەرگێڕانەکا تمام."

🚨 **CTA (داواکاریا پەیوەندیێ):** "چاوەڕێ نەکە! دگەل مە باخڤە ب رێکا واتسئاپێ یان سناپچاتی و بەرنامەیێ خۆ یێ گەشتێ دەستنیشان بکە ⬇️
🔗 [پەیوەندیێ ب رێکا واتسئاپێ بکە](https://wa.me/905380507777)
👻 سناپچات: [denizsaray3](https://www.snapchat.com/add/denizsaray3)
📞 ژمارا مە: +90 538 050 77 77"`;
    } else if (isMedical) {
      responseText = `بخێر بێی بۆ پشکا گەشتیاریا پزیشکی دگەل **دەنیز سەرای تراڤڵ** 🏥✨

ئەم شانازیێ ب پێشکێشکرنا خزمەتگوزاریێن پزیشکی یێن نایاب دکەین ب هەڤکاری دگەل باشترین نەخۆشخانە و کلینیکێن تۆمارکری ل تورکیا:
1. **چاندنا پرچێ ب نووترین تەکنەلۆژیا** (FUE & DHI) دگەل زەمانەتا تەمام.
2. **جوانکاری و چارەسەریا ددانان (ابتسامة هوليوود)** ب کوالیتییەکا بەرز.
3. **نەشتەرگەریا جوانکاریێ و چارەسەریا قەڵەویێ** دبن چاڤدێریا باشترین دکتۆران دا.

🎁 **پاکێجێن مە یێن پزیشکی یێن گشتی پێکدهێن ژ:**
- پێشوازیکرن ل فرۆکەخانەیێ ب ترومبێلا VIP.
- مانەوە د باشترین هۆتێلێن ئەستەنبوڵێ دا.
- وەرگێڕێ پزیشکی یێ تایبەت دگەل تە د تەمامیا سەرەدانان دا.
- دویڤچوونا بەردەوام پشتی چارەسەریێ بۆ پشتڕاستبوونا ئەنجامان.

💬 بۆ وەرگرتنا راوێژکارییا خۆڕایی و دەستنیشانکرنا بهایی، راستەوخۆ پەیوەندیێ ب مە کەن ب رێکا واتسئاپێ:
📞 **+90 538 050 77 77** (بۆ چاتکرنا دەستبەجێ ل ڤێرێ کلیک بکە: [رابط واتسئاپێ یێ راستەوخۆ](https://wa.me/905380507777))`;
    } else if (isTransport) {
      responseText = `بخێر بێی بۆ خزمەتگوزاریا ڤاست و نایاب یا گواستنەوەیا VIP ژ **دەنیز سەرای تراڤڵ** 🚗💨

ئەم باشترین و نووترین ترومبێلێن شاهانە (Mercedes-Benz Vito VIP & Sprinter) بۆ تە دابین دکەین داکو تو و عائلا تە گەشتەکا ئارام و پر خۆشی ل تورکیا ببەنەسەر.

🌟 **تایبەتمەندیێن خزمەتگوزاریێن مە:**
- ترومبێلێن نوی یێن شاهانە و تژی ئامرازێن راحەتیێ.
- شوفێرێن شارەزا کو ب زمانێن (کوردى، عەرەبى، تورکى، ئینگلیزى) دئاخڤن.
- پێشوازیکرن د فرۆکەخانەیێ دا و هاتنوچوونا د ناڤبەرا باژێران دا.
- ئازادییا تەمام د دانانا بەرنامەیێن رۆژانە دا ل ئەستەنبوڵ، سبانجا، بورصة و طرابزون.

📲 بۆ حجزکرنا ترومبێلەکا VIP و شوفێری، کات و رۆژا گەهشتنا خۆ بنێرە ب رێکا واتسئاپێ:
📞 **+90 538 050 77 77** (بۆ پەیوەندیا خێرا کلیک بکە: [ل ڤێرێ لێ بدە](https://wa.me/905380507777))`;
    } else if (isHotelFlight) {
      responseText = `بخێر بێی! خۆشحالین هاریکاریا تە بکەین د بەراوردکرن و حجزکرنا باشترین هۆتێل و بلیتان ل تورکیا 🏨✈️

ل **دەنیز سەرای تراڤڵ**، ئەم هەڤکاریێ دکەین دگەل باشترین هۆتێلێن ٥ ستێرک و ٤ ستێرک داکو بهایەکێ کێم و خزمەتگوزارییەکا بەرز بۆ تە مسۆگەر بکەین:
- **حجزکرنا هۆتێلێن نایاب** دگەل دیمەنێن سەرنجڕاکێش ل ئەستەنبوڵ، ئەنتالیا و بورصة.
- **بلیتێن فرینێ یێن گونجاو** ل دویڤ دەمێن گەشتێن تە.
- **پاکێجێن گەشتیاری یێن گشتی** (هۆتێل + فڕین + گواستنەوە) ب نرخێن تایبەت.

💬 بۆ وەرگرتنا باشترین پێشنیارێن بهایی، کاتێ گەشتێ و ژمارا کەسان بنێرە ب رێکا واتسئاپێ:
📞 **+90 538 050 77 77** (راستەوخۆ دگەل مە باخڤە: [ل ڤێرێ کلیک بکە](https://wa.me/905380507777))`;
    } else {
      responseText = `بۆ خێرهاتن بۆ دەنیز سەرای تراڤڵ (Deniz Saray Travel) 🌟
رێکا تە یا شاهانە بەرەڤ باشترین گەشت و چارەسەری ل تورکیا!

ئەم گەلەک خۆشحالین ب خزمەتکرنا تە. تایبەتمەندیێن مە پێکهاتینە ژ:
- 🗺️ **بەرنامەیێن گەشتیاری یێن رۆژانە و حەفتیانە** ل ئەستەنبوڵ، سبانجا، بورصة، ئەنتالیا، و طرابزون.
- 🚗 **ترومبێلێن VIP یێن گواستنەوەیێ** دگەل شوفێرێن زمانزان (کوردى و عەرەبى).
- 🏥 **گەشتیarیا پزیشکی یا بەرز** (چاندنا پرچێ، جوانکاریا ددانان، نەشتەرگەریا جوانکاریێ، و کێشێ).
- 🏨 **حجزکرنا باشترین هۆتێل و بلیتان** ب نرخێن گونجاو.

ئەم ل ڤێرێنە داکو گەشتا تە بکەینە خۆشترین بیرهاتن.

💬 **بۆ حجزکرنا بەرنامەیێ خۆ یێ گەشتێ یان هەر پرسیارەکێ، راستەوخۆ پەیوەندیێ ب مە بکە ب رێکا واتسئاپێ:**
📞 **+90 538 050 77 77** (بۆ نامەناردنا خێرا کلیک بکە: [چات بکە ل سەر واتسئاپێ](https://wa.me/905380507777))`;
    }
  } else if (lang === "tr") {
    if (isSnapchat) {
      responseText = `✨ **Deniz Saray Travel Snapchat Tanıtım Hikayesi Kurgusu** ✨

📸 **1. Kare:** (Boğaz manzarasında lüks bir Mercedes Vito VIP fotoğrafı)
*Yazı:* "Türkiye'de rüya gibi bir tatil mi planlıyorsunuz? 🇹🇷 Sizin dilinizi konuşan özel şoförlü VIP araçlarımızla konforu en üst düzeyde yaşayın!"

📸 **2. Kare:** (5 yıldızlı muhteşem bir otel odası manzarası)
*Yazı:* "En lüks otelleri karşılaştırıyor ve en uygun fiyatlarla rezervasyonunuzu yapıyoruz! 🏨 Güvenli ve konforlu tatilin adresi Deniz Saray."

📸 **3. Kare:** (Son teknoloji bir klinik görüntüsü)
*Yazı:* "Sağlık ve estelikte uzman çözümler! 🦷💇‍♂️ Saç ekimi, diş estetiği ve obezite tedavileri VIP karşılama ve refakat hizmetiyle sizlerle."

🚨 **CTA (Harekete Geçirici Mesaj):** "Beklemeyin! Hemen WhatsApp veya Snapchat üzerinden bizimle iletişime geçin ve size özel programı oluşturun ⬇️
🔗 [WhatsApp Üzerinden İletişime Geçin](https://wa.me/905380507777)
👻 Snapchat: [denizsaray3](https://www.snapchat.com/add/denizsaray3)
📞 Telefon: +90 538 050 77 77"`;
    } else if (isMedical) {
      responseText = `**Deniz Saray Travel** ile VIP Sağlık Turizmine Hoş Geldiniz! 🏥✨

Türkiye'nin en seçkin hastane ve klinikleriyle iş birliği yaparak sizlere birinci sınıf sağlık hizmeti sunuyoruz:
1. **En Son Teknoloji Saç Ekimi** (FUE & DHI yöntemleri).
2. **Göz Alıcı Diş Estetiği (Hollywood Gülüşü)** ve implant tedavileri.
3. **Obezite ve Estetik Cerrahi** uzman hekimler eşliğinde.

🎁 **Tıbbi Paketlerimizin İçeriği:**
- VIP Mercedes araçlar ile havalimanı transferleri.
- İstanbul'un en prestijli otellerinde lüks konaklama.
- Tedaviniz boyunca size eşlik edecek profesyonel medikal tercüman.
- Ameliyat sonrası periyodik takip ve kontrol süreci.

💬 Ücretsiz tıbbi ön değerlendirme ve fiyat teklifi almak için WhatsApp üzerinden medikal danışmanlarımıza ulaşabilirsiniz:
📞 **+90 538 050 77 77** (Doğrudan iletişim için tıklayın: [WhatsApp İletişim](https://wa.me/905380507777))`;
    } else if (isTransport) {
      responseText = `**Deniz Saray Travel** Lüks VIP Transfer ve Şoförlük Hizmetleri 🚗💨

Son model lüks araç filomuz (Mercedes-Benz Vito VIP & Sprinter) ile Türkiye genelinde konforlu ve güvenli yolculuklar sunuyoruz.

🌟 **Hizmet Ayrıcalıklarımız:**
- Tam donanımlı, konforlu VIP araçlar.
- Türkçe, Arapça, Kürtçe ve İngilizce bilen profesyonel şoförler.
- Havalimanı karşılama ve şehirler arası transfer hizmetleri.
- İstanbul, Sapanca, Bursa ve Trabzon turları için özel günlük planlama.

📲 VIP aracınızı rezerve etmek ve fiyat teklifi almak için seyahat detaylarınızı hemen bize yazın:
📞 **+90 538 050 77 77** (WhatsApp hızlı bağlantı: [Buraya Tıklayın](https://wa.me/905380507777))`;
    } else {
      responseText = `**Deniz Saray Travel**'a Hoş Geldiniz! 🌟
Türkiye'deki VIP Seyahat ve Sağlık Turizmi Kapınız.

Sizlere en kaliteli hizmeti sunmak için buradayız:
- 🗺️ İstanbul, Bursa, Sapanca ve Trabzon'da **Özel Tur Programları**.
- 🚗 Arapça, Kürtçe ve Türkçe bilen şoförlü **VIP Araç Kiralama**.
- 🏥 **Sağlık Turizmi Hizmetleri** (Saç Ekimi, Diş Estetiği, Plastik Cerrahi).
- 🏨 En uygun fiyatlarla **Otel ve Uçak Bileti Rezervasyonu**.

Tatilinizi ve seyahatinizi tamamen stressiz hale getirmek için bize ulaşın.

💬 **Detaylı bilgi ve rezervasyon için WhatsApp üzerinden seyahat danışmanlarımızla hemen görüşün:**
📞 **+90 538 050 77 77** (Doğrudan mesaj yazmak için: [WhatsApp'tan Bize Yazın](https://wa.me/905380507777))`;
    }
  } else {
    // English fallback
    if (isSnapchat) {
      responseText = `✨ **Deniz Saray Travel Snapchat Promotional Story Outline** ✨

📸 **Frame 1:** (Visual of a brand new Mercedes Vito VIP in front of the Bosphorus)
*On-screen text:* "Planning your dream trip to Turkey? 🇹🇷 Experience the ultimate luxury and comfort with our premium VIP transfers and private multilingual drivers!"

📸 **Frame 2:** (Visual of a gorgeous 5-star hotel sea view)
*On-screen text:* "We compare top 5-star hotels and secure your stay at the best competitive prices! 🏨 Travel in peace with Deniz Saray Travel."

📸 **Frame 3:** (Visual of a state-of-the-art medical clinic)
*On-screen text:* "Premium healthcare & aesthetics! 🦷💇‍♂️ Saç ekimi (Hair transplant), dental cosmetics, and obesity treatments with premium guidance."

🚨 **CTA (Call to Action):** "Do not wait! Chat with us directly on WhatsApp or add our Snapchat and build your custom itinerary today ⬇️
🔗 [Chat Directly on WhatsApp](https://wa.me/905380507777)
👻 Snapchat: [denizsaray3](https://www.snapchat.com/add/denizsaray3)
📞 Direct Contact: +90 538 050 77 77"`;
    } else if (isMedical) {
      responseText = `Welcome to the Premium Medical Tourism department of **Deniz Saray Travel** 🏥✨

We are proud to provide exceptional medical treatments in Turkey in collaboration with the country's certified clinics and top-rated surgeons:
1. **State-of-the-art Hair Transplantation** (FUE & DHI techniques) with lifetime guarantees.
2. **Cosmetic Dentistry & Hollywood Smile** treatments with high durability.
3. **Cosmetic Surgery & Weight Loss / Gastric Sleeve** operations.

🎁 **Our comprehensive medical packages include:**
- Airport VIP greeting and private luxury transfers.
- Luxurious stay in selected 5-star hotels.
- Dedicated medical interpreter accompanying you during appointments.
- Regular post-operative follow-ups to ensure perfect recovery.

💬 For a free consultation and customized quote, contact our direct medical team on WhatsApp:
📞 **+90 538 050 77 77** (Click to chat now: [Direct WhatsApp Connection](https://wa.me/905380507777))`;
    } else if (isTransport) {
      responseText = `Welcome to **Deniz Saray Travel** Luxury VIP Transfer & Chauffeur Services 🚗💨

We offer a prestigious fleet of brand new VIP vehicles (Mercedes-Benz Vito VIP & Sprinter) to ensure a safe, private, and extremely comfortable journey in Turkey.

🌟 **Why Choose Our Services:**
- Premium, fully equipped luxury cars with ambient lights and executive seats.
- Professional private drivers speaking English, Arabic, Kurdish, and Turkish.
- Luxury airport pickups, drop-offs, and intercity transfers.
- Full flexibility in daily tours around Istanbul, Sapanca, Bursa, and Trabzon.

📲 To book your VIP car and secure your personal chauffeur, share your flight details and travel dates directly on WhatsApp:
📞 **+90 538 050 77 77** (Direct WhatsApp chat link: [Click Here](https://wa.me/905380507777))`;
    } else {
      responseText = `Welcome to **Deniz Saray Travel** 🌟
Your premier gateway to luxury tourism and high-end healthcare in Turkey!

We are delighted to assist you with our custom premium services:
- 🗺️ **Bespoke Travel Itineraries** in Istanbul, Bursa, Sapanca, Antalya, and Trabzon.
- 🚗 **VIP Chauffeur Services** with private multilingual drivers.
- 🏥 **Premium Healthcare Packages** (Hair Transplant, Dental Cosmetics, Plastic Surgery).
- 🏨 **Hotel Comparisons & Flight Bookings** at the best rates.

Let us handle the details while you enjoy a flawless and memorable journey.

💬 **To book or consult with our travel specialists, feel free to send us a message on WhatsApp:**
📞 **+90 538 050 77 77** (Click to connect instantly: [Chat with Us on WhatsApp](https://wa.me/905380507777))`;
    }
  }

  res.json({ response: responseText });
});

// Vite Middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
