export interface CityGuide {
  id: string;
  names: {
    ar: string;
    ku: string;
    tr: string;
    en: string;
  };
  region: {
    ar: string;
    ku: string;
    tr: string;
    en: string;
  };
  bestSeason: {
    ar: string;
    ku: string;
    tr: string;
    en: string;
  };
  duration: {
    ar: string;
    ku: string;
    tr: string;
    en: string;
  };
  highlights: {
    ar: string[];
    ku: string[];
    tr: string[];
    en: string[];
  };
  desc: {
    ar: string;
    ku: string;
    tr: string;
    en: string;
  };
}

export const turkishCities: CityGuide[] = [
  {
    id: "istanbul",
    names: { ar: "إسطنبول", ku: "ئەستەنبوڵ", tr: "İstanbul", en: "Istanbul" },
    region: { ar: "مرمرة", ku: "مەرمەرە", tr: "Marmara", en: "Marmara" },
    bestSeason: { ar: "طوال العام", ku: "هەموو وەرزەکان", tr: "Her Mevsim", en: "All Year" },
    duration: { ar: "5-7 أيام", ku: "٥-٧ رۆژ", tr: "5-7 Gün", en: "5-7 Days" },
    highlights: {
      ar: ["مضيق البوسفور والرحلات البحرية", "آيا صوفيا والجامع الأزرق", "قصر توپكاپي (الباب العالي)", "غراند بازار وشارع الاستقلال"],
      ku: ["گەرووی بۆسفۆر و گەشتە دەریاییەکان", "ئایا سۆفیا و مزگەوتی شین", "کۆشکی تۆپکاپی", "گراند بازار و شەقامی ئیستقلال"],
      tr: ["Boğaz Turu ve Kız Kulesi", "Ayasofya ve Sultanahmet", "Topkapı Sarayı", "Kapalıçarşı ve İstiklal Caddesi"],
      en: ["Bosphorus Cruise & Maiden's Tower", "Hagia Sophia & Blue Mosque", "Topkapi Palace", "Grand Bazaar & Istiklal Street"]
    },
    desc: {
      ar: "العاصمة التاريخية للإمبراطوريات، تجمع بين قارتي آسيا وأوروبا وتقدم مزيجاً فريداً من الثقافة والجمال والترفيه الفاخر.",
      ku: "پایتەختی مێژوویی ئیمپراتۆریەتەکان، هەر دوو کیشوەری ئاسیا و ئەوروپا بەیەکەوە گرێدەدات و تێکەڵەیەکی بێوێنە لە کولتوور پێشکەش دەکات.",
      tr: "Asya ve Avrupa'yı birleştiren, imparatorluklara başkentlik yapmış, tarih, kültür ve modern lüksün harmanlandığı eşsiz metropol.",
      en: "The historic meeting point of Europe and Asia, bridging cultures with stunning architecture, bustling bazaars, and luxury Bosphorus experiences."
    }
  },
  {
    id: "bursa",
    names: { ar: "بورصة", ku: "بورسا", tr: "Bursa", en: "Bursa" },
    region: { ar: "مرمرة", ku: "مەرمەرە", tr: "Marmara", en: "Marmara" },
    bestSeason: { ar: "الشتاء والربيع", ku: "زستان و بەهار", tr: "Kış ve İlkbahar", en: "Winter & Spring" },
    duration: { ar: "2-3 أيام", ku: "٢-٣ رۆژ", tr: "2-3 Gün", en: "2-3 Days" },
    highlights: {
      ar: ["جبل أولوداغ والتلفريك", "الشجرة المعمرة التاريخية", "الجامع الكبير (أولو جامع)", "الينابيع الحرارية الطبيعية"],
      ku: ["چیای ئۆلوداغ و تەلەفریک", "دارە بەتەمەنە مێژووییەکە", "مزگەوتی گەورە (ئولو جامع)", "کانییە گەرمە سروشتییەکان"],
      tr: ["Uludağ Kayak Merkezi ve Teleferik", "Tarihi Çınar Ağacı", "Ulu Cami ve Kozahan", "Termal Kaplıcalar"],
      en: ["Uludağ Ski Resort & Cable Car", "The Inkaya Ancient Tree", "Grand Mosque & Koza Han", "Natural Thermal Baths"]
    },
    desc: {
      ar: "العاصمة الأولى للدولة العثمانية وتُعرف بـ 'بورصة الخضراء' نظراً لطبيعتها الخلابة وجبلها الشهير وينابيعها العلاجية.",
      ku: "یەکەم پایتەختی دەوڵەتی عوسمانی، بە 'بورسای سەوز' ناسراوە بەهۆی سروشتە سەرنجڕاکێشەکەی و چیای ئۆلوداغ.",
      tr: "Osmanlı'nın ilk başkenti, 'Yeşil Bursa' olarak anılan, doğası, kaplıcaları ve meşhur iskender kebabı ile ünlü tarihi şehir.",
      en: "The first capital of the Ottoman Empire, known as 'Green Bursa' for its luxury gardens, thermal springs, and the famous Uludağ mountain."
    }
  },
  {
    id: "sapanca",
    names: { ar: "سبانجا", ku: "سەپانجا", tr: "Sapanca", en: "Sapanca" },
    region: { ar: "مرمرة", ku: "مەرمەرە", tr: "Marmara", en: "Marmara" },
    bestSeason: { ar: "الربيع والصيف", ku: "بەهار و هاوین", tr: "İlkbahar ve Yaz", en: "Spring & Summer" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["بحيرة سبانجا الشهيرة", "شلالات معشوقية الطبيعية", "منتزه كارتيبي الثلجي", "الأكواخ الزجاجية الفاخرة"],
      ku: ["دەریاچەی ناوداری سەپانجا", "تاڤگەکانی مەعشووقیە", "ناوچەی بەفرینی کارتیپی", "کوخە شووشەییە لۆکسەکان"],
      tr: ["Sapanca Gölü", "Maşukiye Şelaleleri", "Kartepe Kayak Merkezi", "Lüks Bungalovlar"],
      en: ["Lake Sapanca", "Masukiye Waterfalls", "Kartepe Mountain Resort", "Luxury Glass Bungalows"]
    },
    desc: {
      ar: "واحة الهدوء الطبيعي القريبة من إسطنبول، مثالية للاسترخاء في أحضان الطبيعة والسكن في الأكواخ الفاخرة بجانب البحيرة.",
      ku: "ناوچەیەکی هێمن و سروشتی نزیک لە ئەستەنبوڵ، گونجاوە بۆ حەسانەوە و مانەوە لە کوخە لۆکسەکانی تەنیشت دەریاچەکە.",
      tr: "İstanbul'a yakın, göl kenarında huzurlu bir kaçamak noktası. Doğası ve lüks bungalov konaklamaları ile popülerdir.",
      en: "An oasis of tranquility near Istanbul, famous for its magnificent lake, waterfalls, and private boutique bungalows."
    }
  },
  {
    id: "trabzon",
    names: { ar: "طرابزون", ku: "ترابزۆن", tr: "Trabzon", en: "Trabzon" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الصيف والربيع", ku: "هاوین و بەهار", tr: "Yaz ve Sonbahar", en: "Summer & Autumn" },
    duration: { ar: "4-5 أيام", ku: "٤-٥ رۆژ", tr: "4-5 Gün", en: "4-5 Days" },
    highlights: {
      ar: ["بحيرة أوزنجول الساحرة", "دير سوميلا التاريخي في الجبل", "مرتفعات حيدر نبي", "قصر أتاتورك الجميل"],
      ku: ["دەریاچەی ئۆزۆنگۆلی ئەفسوناوی", "دێری سۆمێلای مێژوویی", "بەرزاییەکانی حەیدەر نەبی", "کۆشکی ئەتاتورک"],
      tr: ["Uzungöl", "Sümela Manastırı", "Hıdırnebi Yaylası", "Atatürk Köşkü"],
      en: ["Uzungol Lake", "Sumela Monastery", "Hidirnebi Plateau", "Ataturk Pavilion"]
    },
    desc: {
      ar: "لؤلؤة البحر الأسود، تشتهر بغاباتها الكثيفة الخضراء وبحيراتها الخلابة وجبالها التي يعانقها الضباب ومطبخها اللذيذ.",
      ku: "پێنجی دەریای ڕەش، بە دارستانە چڕ و سەوزەکانی، دەریاچە ئەفسوناوییەکانی و چیا تەمومژاوییەکانی ناسراوە.",
      tr: "Karadeniz'in incisi, yeşilin her tonunu barındıran yaylaları, gölleri ve tarihi Sümela Manastırı ile doğa harikası bir şehir.",
      en: "The jewel of the Black Sea coast, legendary for its emerald forests, high-altitude plateaus, and historic cliffside Sumela Monastery."
    }
  },
  {
    id: "rize",
    names: { ar: "ريزا", ku: "ریزە", tr: "Rize", en: "Rize" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الصيف", ku: "هاوین", tr: "Yaz", en: "Summer" },
    duration: { ar: "2-3 أيام", ku: "٢-٣ رۆژ", tr: "2-3 Gün", en: "2-3 Days" },
    highlights: {
      ar: ["مرتفعات آيدر الخلابة", "وادي فرتينة والتجديف المائي", "قلعة زيل التاريخية", "مزارع الشاي الخضراء المدرجة"],
      ku: ["بەرزاییەکانی ئایدەر", "دۆڵی فێرتینا و یاری رافتینگ", "قەڵای زێل", "کێڵگەکانی چای شین"],
      tr: ["Ayder Yaylası", "Fırtına Deresi", "Zil Kale", "Çay Bahçeleri"],
      en: ["Ayder Plateau", "Firtina Valley Rafting", "Zilkale Castle", "Lush Tea Gardens"]
    },
    desc: {
      ar: "عاصمة الشاي التركي وموطن الطبيعة البكر، بمرتفعاتها الخضراء الشاهقة وجداولها المائية المندفعة وجسورها الحجرية العثمانية.",
      ku: "پایتەختی چای تورکی و نیشتمانی سروشتی پاک، بە بەرزاییە سەوزە بەرزەکانی و پردە مێژووییەکانی عوسمانی.",
      tr: "Türkiye'nin çay başkenti. Dik yamaçları, gür dereleri, kemer köprüleri ve bulutların üzerindeki yaylaları ile eşsiz bir doğaya sahiptir.",
      en: "The capital of Turkish tea, offering dramatic green valleys, cascading rivers, stone bridges, and hot springs in Ayder."
    }
  },
  {
    id: "antalya",
    names: { ar: "أنطاليا", ku: "ئەنتالیا", tr: "Antalya", en: "Antalya" },
    region: { ar: "البحر الأبيض المتوسط", ku: "دەريای ناوەڕاست", tr: "Akdeniz", en: "Mediterranean" },
    bestSeason: { ar: "الصيف والربيع", ku: "هاوین و بەهار", tr: "Yaz", en: "Summer" },
    duration: { ar: "4-5 أيام", ku: "٤-٥ رۆژ", tr: "4-5 Gün", en: "4-5 Days" },
    highlights: {
      ar: ["المدينة القديمة (كالييتشي)", "شلالات دودين ولارا", "منتجع أرض الأساطير (The Land of Legends)", "شواطئ كونيالتي ولارا الرملية"],
      ku: ["شارۆچکەی کۆن (کالێیچی)", "تاڤگەکانی دودەن و لارا", "پەرستگەی ئەفسانەکان (لاند ئۆف لێجێندز)", "کەناراوەکانی کۆنیالتی و لارا"],
      tr: ["Kaleiçi Tarihi Semt", "Düden Şelaleleri", "The Land of Legends", "Konyaaltı ve Lara Plajları"],
      en: ["Kaleiçi Old Town", "Duden Waterfalls", "The Land of Legends Theme Park", "Konyaalti & Lara Sandy Beaches"]
    },
    desc: {
      ar: "عاصمة السياحة الساحلية التركية، تمتاز بشواطئها الذهبية الممتدة، ومنتجعاتها العالمية الفاخرة، والآثار الرومانية العريقة.",
      ku: "پایتەختی گەشتیاریی کەناراوی تورکیا، بە کەناراوە زێڕینییەکانی، هاوینەهوارە لۆکسە جیهانییەکانی و شوێنەوارە ڕۆمانییەکان ناسراوە.",
      tr: "Türkiye'nin turizm başkenti, turkuaz denizi, lüks resort otelleri, şelaleleri ve antik kentleriyle dünya çapında popüler bir tatil cenneti.",
      en: "Turkey's premier resort city, boasting turquoise Mediterranean waters, world-class luxury resorts, and remarkable Roman ruins."
    }
  },
  {
    id: "nevsehir",
    names: { ar: "كابادوكيا (نوشهر)", ku: "کاپادۆکیا (نۆشەهر)", tr: "Kapadokya (Nevşehir)", en: "Cappadocia (Nevsehir)" },
    region: { ar: "وسط الأناضول", ku: "ناوەڕاستی ئانادۆڵ", tr: "İç Anadolu", en: "Central Anatolia" },
    bestSeason: { ar: "الربيع والخريف", ku: "بەهار و پایز", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "2-3 أيام", ku: "٢-٣ رۆژ", tr: "2-3 Gün", en: "2-3 Days" },
    highlights: {
      ar: ["رحلة المناطيد الهوائية عند الشروق", "مداخن الجنيات الصخرية", "المدن الأرضية الأثرية (ديرينكويو)", "الفنادق الكهفية الفاخرة"],
      ku: ["گەشتی باڵۆنە فڕیوەکان لە کاتی ڕۆژهەڵاتن", "دووکەڵکێشەکانی پەرییەکان", "شارە ژێر زەوییە مێژووییەکان", "هۆتێلە ئەشکەوتییە لۆکسەکان"],
      tr: ["Balon Turu", "Peri Bacaları", "Derinkuyu Yeraltı Şehri", "Lüks Mağara Otelleri"],
      en: ["Hot Air Balloon Flight at Sunrise", "Fairy Chimneys Rock Formations", "Derinkuyu Underground City", "Luxury Cave Hotels"]
    },
    desc: {
      ar: "أرض العجائب الجيولوجية والتاريخية، تشتهر بمناطيدها الملونة التي تملأ السماء وفنادق الكهوف المحفورة في الصخر.",
      ku: "خاکی سەرسوڕهێنەری زەویناسی و مێژوویی، بە باڵۆنە ڕەنگاوڕەنگەکانی ئاسمانی و هۆتێلە ئەشکەوتییە کۆنەکانی ناسراوە.",
      tr: "Eşsiz peri bacaları, büyüleyici sıcak hava balonları, yeraltı şehirleri ve kaya oyma mağara otelleri ile masalsı bir turizm bölgesi.",
      en: "A fairytale landscape of rock 'fairy chimneys', ancient underground cities, and magical sunrise hot air balloon rides."
    }
  },
  {
    id: "mugla",
    names: { ar: "موغلا (بودروم وفيتيه)", ku: "موغلا (بۆدروم و فەتحییە)", tr: "Muğla (Bodrum & Fethiye)", en: "Mugla (Bodrum & Fethiye)" },
    region: { ar: "بحر إيجة", ku: "دەريای ئیجە", tr: "Ege", en: "Aegean" },
    bestSeason: { ar: "الصيف والربيع", ku: "هاوین و بەهار", tr: "Yaz", en: "Summer" },
    duration: { ar: "3-5 أيام", ku: "٣-٥ رۆژ", tr: "3-5 Gün", en: "3-5 Days" },
    highlights: {
      ar: ["خليج أولودينيز (البحر الميت) في فيتيه", "القفز المظلي من جبل باباداغ", "قلعة بودروم ومرفأ اليخوت", "وادي الفراشات الساحر"],
      ku: ["کەنداوی ئۆڵودێنیز لە فەتحییە", "پەرەشوتەوانی لە چیای باباداغ", "قەڵای بۆدروم و بەندەری یەختەکان", "دۆڵی پەپوولەکان"],
      tr: ["Ölüdeniz Plajı", "Babadağ Yamaç Paraşütü", "Bodrum Kalesi", "Kelebekler Vadisi"],
      en: ["Oludeniz Blue Lagoon (Fethiye)", "Paragliding from Babadağ Mountain", "Bodrum Castle", "Butterfly Valley"]
    },
    desc: {
      ar: "ولاية الشواطئ النخبوية واليخوت الفاخرة، تحتضن أجمل مدن الصيف التركية مثل بودروم الراقية وفيتيه المليئة بالمغامرات.",
      ku: "پارێزگای کەناراوە نایابەکان و یەختە لۆکسەکان، جوانترین شارۆچکەکانی هاوین لەخۆ دەگرێت وەک بۆدروم و فەتحییە.",
      tr: "Bodrum, Fethiye, Marmaris, Göcek ve Datça gibi dünyaca ünlü tatil beldelerine ev sahipliği yapan, mavi turların çıkış noktası.",
      en: "Home to high-end resorts like Bodrum and natural adventure spots like Fethiye, boasting Turkey's most beautiful coastal bays."
    }
  },
  {
    id: "izmir",
    names: { ar: "إزمير", ku: "ئیزمیر", tr: "İzmir", en: "Izmir" },
    region: { ar: "بحر إيجة", ku: "دەريای ئیجە", tr: "Ege", en: "Aegean" },
    bestSeason: { ar: "الربيع والخريف والصيف", ku: "بەهار، پایز و هاوین", tr: "İlkbahar, Yaz, Sonbahar", en: "Spring, Summer & Autumn" },
    duration: { ar: "2-3 أيام", ku: "٢-٣ رۆژ", tr: "2-3 Gün", en: "2-3 Days" },
    highlights: {
      ar: ["المدينة الأثرية إفسوس", "مدينة ألاتشاتي الرومانسية", "كورنيش كوردون وساحة الساعة", "قلعة كاديفيكالي التاريخية"],
      ku: ["شاری مێژوویی ئێفێسۆس", "شارۆچکەی ئاڵاچاتی", "کۆنیشی کۆردۆن و کاتژمێری ناوەڕاست", "قەڵای کادیفیکالی"],
      tr: ["Efes Antik Kenti", "Alaçatı Taş Evleri", "Kordon Boyu ve Saat Kulesi", "Tarihi Asansör"],
      en: ["Ancient Ephesus Ruins", "Alacati Stone Houses", "Kordon Promenade & Clock Tower", "The Historical Elevator"]
    },
    desc: {
      ar: "عروس بحر إيجة، مدينة عصرية منفتحة وتاريخية غنية، بأسواقها الكلاسيكية وقربها من أعظم الآثار الإغريقية والرومانية.",
      ku: "بووکی دەریای ئیجە، شارێکی هاوچەرخ و مێژوویی دەوڵەمەند، لە نزیک کۆنترین شوێنەوارە یۆنانی و ڕۆمانییەکان.",
      tr: "Ege'nin incisi. Modern caddeleri, tarihi Efes Antik Kenti, Şirince köyü, Çeşme plajları ve lezzetli Ege mutfağı ile büyüleyici.",
      en: "The pearl of the Aegean, combining a cosmopolitan coastal vibe with close proximity to the magnificent ruins of ancient Ephesus."
    }
  },
  {
    id: "denizli",
    names: { ar: "دنيزلي (باموق قلعة)", ku: "دەنیزلی (پامۆق قەڵا)", tr: "Denizli (Pamukkale)", en: "Denizli (Pamukkale)" },
    region: { ar: "بحر إيجة", ku: "دەريای ئیجە", tr: "Ege", en: "Aegean" },
    bestSeason: { ar: "الربيع والخريف", ku: "بەهار و پایز", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["مدرجات الحجر الجيري الأبيض (قلعة القطن)", "مدينة هيرابوليس الرومانية القديمة", "مسبح كليوباترا الأثري الساخن", "تلفريك دنيزلي الشهير"],
      ku: ["پێپلیکانە سپییەکانی پامۆق قەڵا", "شاری ڕۆمانی کۆنی هێراپۆلیس", "حەوزی مێژوویی کلیۆپatرا", "تەلەفریکی دەنیزلی"],
      tr: ["Pamukkale Travertenleri", "Hierapolis Antik Kenti", "Kleopatra Antik Havuz", "Denizli Teleferik"],
      en: ["Cotton Castle Travertine Terraces", "Hierapolis Ancient Roman City", "Cleopatra Antique Thermal Pool", "Denizli Cable Car"]
    },
    desc: {
      ar: "موطن ينابيع 'باموق قلعة' العلاجية الدافئة العجيبة، التي تنساب فوق مدرجات بيضاء ناصعة كالثلج شكلتها المياه المعدنية عبر آلاف السنين.",
      ku: "نیشتمانی کانییە گەرمەکانی پامۆق قەڵا، کە بەسەر پێپلیکانە سپییە بەفرییەکان دەڕژێن کە ئاوی کانزایی دروستی کردوون.",
      tr: "Kar beyazı travertenleri, şifalı termal suları ve Hierapolis antik kenti ile UNESCO Dünya Mirası listesindeki doğa ve tarih şehri.",
      en: "Famed for Pamukkale's 'Cotton Castle' thermal travertines and the ancient spa city of Hierapolis with Cleopatra’s thermal pool."
    }
  },
  {
    id: "sanliurfa",
    names: { ar: "شانلي أورفا", ku: "شەنلی ئورفا", tr: "Şanlıurfa", en: "Sanliurfa" },
    region: { ar: "جنوب شرق الأناضول", ku: "باشووری ڕۆژهەڵاتی ئانادۆڵ", tr: "Güneydoğu Anadolu", en: "Southeastern Anatolia" },
    bestSeason: { ar: "الربيع والخريف", ku: "بەهار و پایز", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "2 يوم", ku: "٢ رۆژ", tr: "2 Gün", en: "2 Days" },
    highlights: {
      ar: ["بحيرة الأسماك المقدسة (بركة إبراهيم)", "موقع غوبكلي تبه (أقدم معبد في التاريخ)", "سوق أورفا الشعبي القديم", "منازل حران الطينية المخروطية"],
      ku: ["دەریاچەی ماسییەکان (گۆلی حەزرەتی ئیبراهیم)", "شوێنەواری گۆبەکلی تێپە", "بازاڕی کۆنی ئورفا", "خانووە قوڕییەکانی حەڕان"],
      tr: ["Balıklıgöl", "Göbeklitepe Tapınağı", "Tarihi Şanlıurfa Çarşısı", "Harran Kümbet Evleri"],
      en: ["Pool of Sacred Fish (Balikligol)", "Gobeklitepe Temple", "Tarihi Urfa Bazaar", "Harran Beehive Clay Houses"]
    },
    desc: {
      ar: "مدينة الأنبياء ومهد الحضارات، تحتوي على غوبكلي تبه أقدم معبد من صنع الإنسان في العالم، وبحيرة الأسماك التاريخية.",
      ku: "شاری پێغەمبەران و بێشکی شارستانیەت، کۆنترین پەرستگەی مێژووی مرۆڤایەتی 'گۆبەکلی تێپە' لێرەیە.",
      tr: "Peygamberler şehri olarak bilinen, dünyanın bilinen en eski tapınağı Göbeklitepe'ye ve tarihi Balıklıgöl'e ev sahipliği yapan manevi kent.",
      en: "Known as the 'City of Prophets', hosting Gobeklitepe, the oldest known temple in human history, and biblical historical sights."
    }
  },
  {
    id: "mardin",
    names: { ar: "ماردين", ku: "ماردین", tr: "Mardin", en: "Mardin" },
    region: { ar: "جنوب شرق الأناضول", ku: "باشووری ڕۆژهەڵاتی ئانادۆڵ", tr: "Güneydoğu Anadolu", en: "Southeastern Anatolia" },
    bestSeason: { ar: "الربيع والخريف", ku: "بەهار و پایز", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "2 يوم", ku: "٢ رۆژ", tr: "2 Gün", en: "2 Days" },
    highlights: {
      ar: ["بيوت ماردين الحجرية القديمة", "دير الزعفران التاريخي للسريان", "مدرسة القاسمية الأثرية", "مدينة دارا الأثرية المحفورة بالصخر"],
      ku: ["خانووە بەردینە مێژووییەکانی ماردین", "دێری زەعفەران یێ سریانی", "قوتابخانەیا قاسمیە", "شاری مێژوویی دارا د ناڤ بەردان دا"],
      tr: ["Tarihi Taş Evler", "Deyrulzafaran Manastırı", "Kasımiye Medresesi", "Dara Antik Kenti"],
      en: ["Stone Houses of Old Mardin", "Deyrulzafaran Syriac Monastery", "Kasimiye Medrese", "Dara Ancient Rock-Cut City"]
    },
    desc: {
      ar: "لوحة معمارية مفتوحة فوق تلال بلاد الرافدين، تشتهر ببيوتها الحجرية الصفراء المنحوتة وتنوعها الثقافي والروحي العميق.",
      ku: "تابلۆیەکی نایابی بیناسازی لەسەر گردەکانی میسۆپۆتامیا، بە خانوو بەردینە زەردە نەخشێنراوەکانی ناسراوە.",
      tr: "Mezopotamya ovasına bakan sarı kalker taşından masalsı evleri, manastırları ve dar sokaklarıyla tarihi dokusunu koruyan kültür mozaiği.",
      en: "An open-air museum overlooking the Mesopotamian plains, with unique golden stone houses, narrow alleys, and rich multi-faith history."
    }
  },
  {
    id: "gaziantep",
    names: { ar: "غازي عنتاب", ku: "گازی عەنتاب", tr: "Gaziantep", en: "Gaziantep" },
    region: { ar: "جنوب شرق الأناضول", ku: "باشووری ڕۆژهەڵاتی ئانادۆڵ", tr: "Güneydoğu Anadolu", en: "Southeastern Anatolia" },
    bestSeason: { ar: "الخريف والربيع", ku: "پایز و بەهار", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "2 يوم", ku: "٢ رۆژ", tr: "2 Gün", en: "2 Days" },
    highlights: {
      ar: ["متحف زيوغما للفسيفساء الأكبر عالمياً", "سوق النحاسين القديم", "قلعة غازي عنتاب التاريخية", "تذوق الفستق والبقلاوة العنتابية"],
      ku: ["مۆزەخانەی زێوگما بۆ مۆزایک", "بازاڕی مسگەرێن کۆن", "قەڵای گازی عەنتاب", "خواردنی باقلاوەی ناوداری عەنتابی"],
      tr: ["Zeugma Mozaik Müzesi", "Tarihi Bakırcılar Çarşısı", "Gaziantep Kalesi", "Gaziantep Baklavası"],
      en: ["Zeugma Mosaic Museum", "Historical Coppersmiths Bazaar", "Gaziantep Castle", "Authentic Culinary & Baklava Experience"]
    },
    desc: {
      ar: "عاصمة المطبخ التركي وعضو شبكة المدن المبدعة في اليونسكو، تشتهر بألذ الأكلات والحلويات ومتاحف الفسيفساء الرومانية المذهلة.",
      ku: "پایتەختی چێشتخانەی تورکی و ئەندامی یونسکۆ، بە باقلاوە خۆشەکەی و مۆزەخانە دەوڵەمەندەکانی مۆزایک ناسراوە.",
      tr: "UNESCO tescilli zengin gastronomi kültürü, dünyanın en büyük mozaik müzelerinden Zeugma ve eşsiz fıstıklı baklavası ile ünlü şehir.",
      en: "Turkey's undisputed culinary capital (UNESCO Creative City), famous for rich kebabs, world-renowned baklava, and Roman mosaics."
    }
  },
  {
    id: "ankara",
    names: { ar: "أنقرة", ku: "ئەنقەرە", tr: "Ankara", en: "Ankara" },
    region: { ar: "وسط الأناضول", ku: "ناوەڕاستی ئانادۆڵ", tr: "İç Anadolu", en: "Central Anatolia" },
    bestSeason: { ar: "الربيع والخريف", ku: "بەهار و پایز", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["ضريح أتاتورك (Anıtkabir)", "متحف حضارات الأناضول العريق", "قلعة أنقرة التاريخية", "منطقة هامامونو القديمة"],
      ku: ["مەزارگەی ئەتاتورک (ئانیتکابیر)", "مۆزەخانەی شارستانیەتەکانی ئانادۆڵ", "قەڵای ئەنقەرە", "گەڕەکی هامامۆنۆ مێژوویی"],
      tr: ["Anıtkabir", "Anadolu Medeniyetleri Müzesi", "Ankara Kalesi", "Hamamönü"],
      en: ["Anitkabir (Ataturk Mausoleum)", "Museum of Anatolian Civilizations", "Ankara Castle", "Hamamonu Restored Old District"]
    },
    desc: {
      ar: "العاصمة السياسية للجمهورية التركية، تضم متاحف وطنية عظيمة ومواقع مذهلة تروي قصة قيام تركيا الحديثة وحضارات الأناضول العريقة.",
      ku: "پایتەختی سیاسیی کۆماري تورکیا، مۆزەخانە نیشتمانییە گەورەکان و قەڵای مێژوویی لێرەن.",
      tr: "Türkiye Cumhuriyeti'nin başkenti. Modern yapısı, köklü devlet müzeleri, Anıtkabir ve Anadolu tarihini aydınlatan mekanlarıyla önemli merkez.",
      en: "The modern capital of Turkey, hosting governmental monuments, historic Ankara Castle, and world-class archeological museums."
    }
  },
  {
    id: "bolu",
    names: { ar: "بولو", ku: "بۆلو", tr: "Bolu", en: "Bolu" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "طوال العام", ku: "هەموو وەرزەکان", tr: "Her Mevsim", en: "All Year" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["بحيرة أبانت الخلابة وغاباتها", "منتجع غولجوك الطبيعي الرومانسي", "منتزه البحيرات السبع الوطني (Yedigöller)", "منحدرات كارتال كايا للتزلج"],
      ku: ["دەریاچەی ئابانت", "هاوینەهواری گۆڵجوک", "پارکی نیشتمانی یەدیگۆلەر", "ناوچەی بەفرینی کارتاڵ کایا"],
      tr: ["Abant Gölü", "Gölcük Tabiat Parkı", "Yedigöller Milli Parkı", "Kartalkaya Kayak Merkezi"],
      en: ["Lake Abant", "Golcuk Nature Park", "Yedigoller National Park", "Kartalkaya Ski Resort"]
    },
    desc: {
      ar: "جنة الغابات والبحيرات الهادئة، وجهة مفضلة لعشاق الطبيعة والتصوير والهدوء والرياضات الشتوية بوسط تركيا.",
      ku: "بەهەشتی دارستان و دەریاچە هێمنەکان، گونجاوترین جهـ بۆ حەسانەوە و وەرزشێن زستانی ل باکوورێ تورکیا.",
      tr: "Doğa harikası gölleri (Abant, Gölcük, Yedigöller) ve çam ormanlarıyla her mevsim ayrı bir kartpostallık güzellik sunan huzur şehri.",
      en: "A picture-perfect mountain province famous for scenic lakes, beautiful forest views, and prime skiing at Kartalkaya."
    }
  },
  {
    id: "yalova",
    names: { ar: "يالوفا", ku: "یاڵۆڤا", tr: "Yalova", en: "Yalova" },
    region: { ar: "مرمرة", ku: "مەرمەرە", tr: "Marmara", en: "Marmara" },
    bestSeason: { ar: "الخريف والشتاء", ku: "زستان و پایز", tr: "Kış ve Sonbahar", en: "Autumn & Winter" },
    duration: { ar: "1 يوم", ku: "١ رۆژ", tr: "1 Gün", en: "1 Day" },
    highlights: {
      ar: ["حمامات تيرمال الكبريتية الحارة", "شلال صودوشان الطبيعي", "المشتل الشجري والحدائق النباتية", "كورنيش يالوفا البحري"],
      ku: ["کانییە گەرمەکانی تێرمال", "تاڤگەی سودوشان", "باخچەی گشتی یاڵۆڤا", "کۆرنیشی دەريایی یێ یاڵۆڤا"],
      tr: ["Yalova Termal Kaplıcaları", "Sudüşen Şelalesi", "Karaca Arboretumu", "Yalova Sahili"],
      en: ["Yalova Thermal Hot Springs", "Sudusen Waterfall", "Karaca Arboretum", "Yalova Seaside Promenade"]
    },
    desc: {
      ar: "بوابتك إلى الاسترخاء والينابيع الساخنة الطبيعية، تتميز بقربها الشديد من إسطنبول وشلالاتها الجميلة المحاطة بالغابات الغنّاء.",
      ku: "دەروازەی تە بۆ حەسانەوە و کانییە گەرمە سروشتییەکان، زۆر نزیکە لە ئەستەنبوڵ و سروشتێکی جوانی هەیە.",
      tr: "Şifalı termal suları, Sudüşen şelalesi ve İstanbul'a deniz yoluyla çok yakın olması sebebiyle tercih edilen huzurlu kıyı şehri.",
      en: "Famed for mineral-rich, healing thermal baths, beautiful green waterfalls, and beautiful coastal walks very close to Istanbul."
    }
  },
  {
    id: "adana",
    names: { ar: "أضنة", ku: "ئادانا", tr: "Adana", en: "Adana" },
    region: { ar: "البحر الأبيض المتوسط", ku: "دەريای ناوەڕاست", tr: "Akdeniz", en: "Mediterranean" },
    bestSeason: { ar: "الخريف والربيع", ku: "پایز و بەهار", tr: "Sonbahar ve İlkbahar", en: "Autumn & Spring" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["جسر تاش كوبري الروماني الأثري", "مسجد صابانجي المركزي الضخم", "نهر سيحان والمتنزهات المحيطة به", "تذوق كباب أضنة الأصيل الحار"],
      ku: ["پردێ تاش کۆپری یێ ڕۆمانی", "مزگەوتا مەزنا سابانجی", "ڕووبارێ سەیهان", "خوارنا کبابێ ناڤدارێ ئادانایێ"],
      tr: ["Tarihi Taşköprü", "Sabancı Merkez Camii", "Seyhan Nehri", "Adana Kebabı"],
      en: ["Stone Bridge (Taskopru)", "Sabanci Central Mosque", "Seyhan River & Parks", "Authentic Spicy Adana Kebab"]
    },
    desc: {
      ar: "تشتهر بمطبخها الغني وخاصة كباب أضنة الحار، وتحتضن جسراً أثرياً رومانياً يعد من أقدم الجسور المستخدمة في العالم.",
      ku: "ب خارنا خوە یا کبابێ ناسراوە و پردەکا مێژوویی یا ڕۆمانی ل ڤێرەیە.",
      tr: "Zengin mutfak kültürü, meşhur acılı kebabı, tarihi Taşköprü ve Seyhan Nehri kenarındaki muhteşem parklarıyla Akdeniz'in gastronomi kenti.",
      en: "Famed for its rich, spicy culinary heritage (especially Adana Kebab), and the Roman-era Stone Bridge."
    }
  },
  {
    id: "izmir_cesme",
    names: { ar: "تشيشمي", ku: "چێشمێ", tr: "Çeşme", en: "Cesme" },
    region: { ar: "بحر إيجة", ku: "دەريای ئیجە", tr: "Ege", en: "Aegean" },
    bestSeason: { ar: "الصيف", ku: "هاوین", tr: "Yaz", en: "Summer" },
    duration: { ar: "2 يوم", ku: "٢ رۆژ", tr: "2 Gün", en: "2 Days" },
    highlights: {
      ar: ["قلعة تشيشمي الأثرية ومتحفها", "شواطئ إليكا ذات الينابيع الساخنة داحل البحر", "بلدة ألاتشاتي الحجرية وأسواقها", "مرفأ اليخوت والرياضات المائية"],
      ku: ["قەڵایا مێژوویی یا چێشمێ", "کەناراوێن ئیلیجا دگەل ئاڤا گەرم", "تەلارسازیا بەردین یا ئاڵاچاتی", "بەندەرێ یەختان"],
      tr: ["Çeşme Kalesi", "Ilıca Plajı", "Alaçatı Taş Evleri", "Çeşme Marinası"],
      en: ["Cesme Historic Castle", "Ilica Hot Spring Beach", "Alacati Stone Windmill Village", "Cesme Yacht Marina"]
    },
    desc: {
      ar: "شبه جزيرة ساحرة على بحر إيجة، تشتهر بشواطئها الفيروزية ومياهها الكبريتية الدافئة وبلدتها الحجرية 'ألاتشاتي'.",
      ku: "نیمچە دوورگەکا جوان ل سەر دەریایێ ئیجە، ب کەناراوێن خوە و ئاڤا گەرم یا کبرتی یا دەریایی یا ناسراوە.",
      tr: "Eşsiz Ilıca plajı, tarihi kalesi, rüzgar sörfüne elverişli Alaçatı beldesi ve taş evleri ile Ege'nin en gözde tatil rotası.",
      en: "A beautiful Aegean peninsula famous for Ilica's warm therapeutic sea-water springs and Alacati's windmills."
    }
  },
  {
    id: "aydin_kusadasi",
    names: { ar: "كوشاداسي", ku: "کۆشاداسی", tr: "Kuşadası", en: "Kusadasi" },
    region: { ar: "بحر إيجة", ku: "دەريای ئیجە", tr: "Ege", en: "Aegean" },
    bestSeason: { ar: "الصيف والربيع", ku: "هاوین و بەهار", tr: "Yaz ve İlkbahar", en: "Summer & Spring" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["جزيرة الحمام والقلعة البيزنطية", "الحدائق الوطنية في شبه جزيرة ديلك", "شاطئ السيدات الشهير (Ladies Beach)", "القرب من أطلال إفسوس الأثرية"],
      ku: ["دوورگەیا کەبوتران و قەڵایا بیزەنتی", "پارکا نیشتمانی یا دێلەک", "کەناراوێ ناڤدار یێ ژنان", "نێزیکی ژ شوێنەوارێن ئێفێسۆس"],
      tr: ["Güvercinada Kalesi", "Dilek Yarımadası Milli Parkı", "Kadınlar Denizi Plajı", "Efes'e Yakınlık"],
      en: ["Pigeon Island & Byzantine Castle", "Dilek Peninsula National Park", "Ladies Beach Resort", "Proximity to Ephesus Ruins"]
    },
    desc: {
      ar: "مدينة ساحلية ومرسى شهير للسفن السياحية الكبرى، تقع بمقربة من مدينة إفسوس الأثرية وتتميز بشواطئها وحديقتها الوطنية.",
      ku: "باژێڕەکێ کەنار دەریایی یێ ناڤدار و پێشوازی ل کەشتیێن گەشتیاری یێن مەزن دکەت.",
      tr: "Kruvaziyer gemilerinin yanaştığı popüler limanı, Güvercinada kalesi, plajları ve Efes antik kentine yakınlığı ile hareketli tatil şehri.",
      en: "A popular resort town and key cruise port, famous for sandy beaches and historic castles."
    }
  },
  {
    id: "denizli_hierapolis",
    names: { ar: "هيرابوليس (دنيزلي)", ku: "هێراپۆلیس (دەنیزلی)", tr: "Hierapolis (Denizli)", en: "Hierapolis (Denizli)" },
    region: { ar: "بحر إيجة", ku: "دەريای ئیجە", tr: "Ege", en: "Aegean" },
    bestSeason: { ar: "الربيع والخريف", ku: "بەهار و پایز", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "1 يوم", ku: "١ رۆژ", tr: "1 Gün", en: "1 Day" },
    highlights: {
      ar: ["المسرح الروماني الأثري الضخم", "المقبرة الأثرية الكبرى (Necropolis)", "مسبح كليوباترا الدافئ المحاط بالأعمدة الأثرية", "معبد أبولون الأثري"],
      ku: ["شانۆیا مێژوویی یا ڕۆمانی یا مەزن", "گۆڕستانا مێژوویی یا نەکرۆپۆلیس", "حەوزا گەرم یا کلیۆپاترا دگەل ستوونێن بەردین", "پەرستگەها ئاپۆلۆن"],
      tr: ["Hierapolis Antik Tiyatrosu", "Antik Nekropol", "Kleopatra Antik Havuzu", "Apollon Tapınağı"],
      en: ["Ancient Hierapolis Theater", "Grand Ancient Necropolis", "Cleopatra Antique Pool with Sunken Columns", "Apollo Temple"]
    },
    desc: {
      ar: "مدينة سبا رومانية قديمة تأسست فوق الينابيع الحارة في باموق قلعة، وتضم أحد أروع المسارح والمقابر الأثرية في الأناضول.",
      ku: "باژێڕەکێ ڕۆمانی یێ مێژوویی ل سەر کانیێن ئاڤا گەرم هاتییە ئاڤاکرن.",
      tr: "Pamukkale travertenlerinin hemen üzerinde yer alan, şifalı suları sebebiyle antik çağda bir sağlık merkezi olan köklü arkeolojik kent.",
      en: "An ancient Greco-Roman spa city atop Pamukkale's white terraces, featuring a magnificent theater and historical hot springs."
    }
  },
  {
    id: "giresun",
    names: { ar: "غيرسون", ku: "گیرەسۆن", tr: "Giresun", en: "Giresun" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الصيف", ku: "هاوین", tr: "Yaz", en: "Summer" },
    duration: { ar: "1 يوم", ku: "١ رۆژ", tr: "1 Gün", en: "1 Day" },
    highlights: {
      ar: ["جزيرة غيرسون الأثرية في البحر", "قلعة غيرسون المطلة على المدينة", "مرتفعات كنباد الطبيعية الخلابة", "تذوق البندق غيرسوني الفاخر عالمياً"],
      ku: ["دوورگەیا گیرەسۆنێ یا مێژوویی", "قەڵایا گیرەسۆنێ", "بەرزاییێن کەنباد یێن سروشتی", "بندەقا گیرەسۆنێ یا بناڤدەنگ"],
      tr: ["Giresun Adası", "Giresun Kalesi", "Kümbet Yaylası", "Meşhur Giresun Fındığı"],
      en: ["Giresun Island", "Giresun Castle", "Kumbet Plateau", "Premium Hazelnut Orchards"]
    },
    desc: {
      ar: "موطن أجود أنواع البندق في العالم وواحدة من ولايات البحر الأسود الخضراء الساحرة التي تحتضن جزيرة تاريخية فريدة في البحر.",
      ku: "نیشتمانا باشترین جۆرێ بندەقێ ل جیهانێ و دارستانێن سەوز یێن کەنارێ دەریایێ ڕەش.",
      tr: "Dünyanın en kaliteli fındıklarının yetiştiği, Karadeniz'in tek yaşanabilir adasına (Giresun Adası) sahip, yeşil ve mavi tonlu sahil kenti.",
      en: "Famed for producing the world's best hazelnuts, offering scenic high-altitude plateaus and a legendary island."
    }
  },
  {
    id: "ordu",
    names: { ar: "أوردو", ku: "ئۆردۆ", tr: "Ordu", en: "Ordu" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الصيف والربيع", ku: "هاوین و بەهار", tr: "Yaz ve İlkbahar", en: "Summer & Spring" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["تلفريك أوردو إلى مرتفع بوزتبه", "مطل بوزتبه البانورامي الساحر على البحر", "شلالات أوردو الخفية في الغابات", "شاطئ أوردو الهادئ الطويل"],
      ku: ["تەلەفریکا ئۆردۆ بۆ بوزتەپە", "دیمەنێ پانۆراما یێ بوزتەپە ل سەر دەریایێ", "تاڤگەیێن ئۆردۆ یێن ڤەشارتی", "کەناراوێ ئۆردۆ"],
      tr: ["Boztepe Teleferik", "Boztepe Seyir Terası", "Yason Burnu", "Ordu Sahili"],
      en: ["Ordu Cable Car to Boztepe", "Boztepe Panoramic Sea Lookout", "Yason Cape & Church", "Long Sandy Promenade"]
    },
    desc: {
      ar: "تلقب بـ 'أكسجين البحر الأسود'، تشتهر بتلفريكها الرائع المؤدي إلى قمة بوزتبه التي تكشف لك جمال البحر والمدينة معاً.",
      ku: "نازناڤێ 'ئۆکسجینا دەریایێ ڕەش' وەرگرتییە ب سروشتێ خوە یێ پاقژ و تەلەفریکا ناڤدار بۆ سەرێ بوزتەپە.",
      tr: "Karadeniz'in oksijen deposu, teleferikle çıkılan Boztepe'den izlenen muhteşem şehir ve deniz manzarası ile fındık bahçeleriyle ünlü sahil şehri.",
      en: "Nicknamed the 'Oxygen City', famous for its dramatic cable car ride to Boztepe Hill for a breathtaking sea view."
    }
  },
  {
    id: "amastris",
    names: { ar: "أماسرا (بارتين)", ku: "ئاماسرا (بارتین)", tr: "Amasra (Bartın)", en: "Amasra (Bartin)" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الصيف والربيع", ku: "هاوین و بەهار", tr: "Yaz ve İlkbahar", en: "Summer & Spring" },
    duration: { ar: "1 يوم", ku: "١ رۆژ", tr: "1 Gün", en: "1 Day" },
    highlights: {
      ar: ["جسر كيميريد الأثري التاريخي", "قلعة أماسرا البيزنطية الجبلية", "متحف أماسرا العريق", "تناول سلطة أماسرا الشهيرة والمأكولات البحرية"],
      ku: ["پردێ مێژوویی یێ کیمێرید", "قەڵایا ئاماسرا", "مۆزەخانەیا ئاماسرا", "خوارنا زەڵاتا ناڤدارا ئاماسرا"],
      tr: ["Tarihi Kemere Köprüsü", "Amasra Kalesi", "Amasra Müzesi", "Meşhur Amasra Salatası"],
      en: ["Kemere Historic Stone Bridge", "Amasra Castle", "Amasra Archeological Museum", "Traditional Amasra Seafood & Multi-Ingredient Salad"]
    },
    desc: {
      ar: "شبه جزيرة صغيرة رومانسية وهادئة على البحر الأسود، تمتاز بخليجين طبيعيين وهدوء لامتناهي وتاريخ عريق يمتد للعهد الروماني.",
      ku: "نیمچە دوورگەکا بچووک و ڕۆمانسی ل سەر دەریایێ ڕەش، ب دیمەنێ خوە یێ کەنار دەریایی و کەونارا خوە دهێتە نیاسین.",
      tr: "Karadeniz'in en şirin, tarihi Ceneviz kalesi, Kemere köprüsü, balık lokantaları ve ünlü salatasıyla ünlü, yeşil ile mavinin birleştiği huzurlu liman kasabası.",
      en: "A beautiful, romantic peninsula town on the Black Sea coast with ancient fortifications and legendary local seafood."
    }
  },
  {
    id: "safranbolu",
    names: { ar: "سافرانبولو (كارابوك)", ku: "سافرانبۆلۆ (کارابوک)", tr: "Safranbolu (Karabük)", en: "Safranbolu (Karabuk)" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الربيع والخريف", ku: "بەهار و پایز", tr: "İlkbahar ve Sonbahar", en: "Spring & Autumn" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["البيوت العثمانية الخشبية التاريخية", "تذوق الحلقوم الزعفراني الأصيل", "مطل الكريستال الزجاجي فوق الوادي الكانيوني", "سوق اليمنيين والحرفيين التقليديين"],
      ku: ["خانوویێن دارین یێن مێژوویی یێن عوسمانی", "تامکرنا لوقما زعفرانێ", "تەلارێ شووشەیی یێ کریستال", "بازاڕێ یەمەنیێ کۆن"],
      tr: ["Tarihi Safranbolu Evleri", "Kristal Teras", "Safranbolu Yemeniciler Arastası", "Safran Lokumu"],
      en: ["UNESCO Ottoman Timber Mansions", "Crystal Glass Terrace over Canyon", "Arasta Bazaar of Artisans", "Authentic Saffron Turkish Delight"]
    },
    desc: {
      ar: "مدينة عثمانية حية ومدرجة في اليونسكو، تشتهر ببيوتها التاريخية الرائعة المصنوعة من الخشب والحجر، وتجارة الزعفران الفاخر.",
      ku: "باژێڕەکێ مێژوویی یێ عوسمانی یێ زیندی ل سەر لیستا یونسکۆ، کو ب تەلارسازیا خوە یا عوسمانی یا خوەشک بناڤدەنگە.",
      tr: "UNESCO Dünya Mirası listesinde yer alan, geleneksel ahşap Osmanlı evleri, tarihi arastası ve safranlı lokumu ile ünlü yaşayan müze kent.",
      en: "A remarkably preserved UNESCO Ottoman town, globally famous for its red-roofed timber mansions and high-quality saffron harvests."
    }
  },
  {
    id: "sinop",
    names: { ar: "سينوب", ku: "سینۆپ", tr: "Sinop", en: "Sinop" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الصيف", ku: "هاوین", tr: "Yaz", en: "Summer" },
    duration: { ar: "1 يوم", ku: "١ رۆژ", tr: "1 Gün", en: "1 Day" },
    highlights: {
      ar: ["سجن سينوب التاريخي الأثري", "مضيق هامسيلوس البحري الطبيعي الفريد (Fjord)", "منارة سينوب الأثرية في أقصى الشمال", "تذوق مانتي سينوب اللذيذ بالليمون والجوز"],
      ku: ["گرتیگەها کۆن و مێژوویی یا سینۆپێ", "کەنداوی سروشتی یێ هامسیلۆس", "فانۆسا سینۆپێ یا باکوور", "خوارنا مانتییا ناڤدارا سینۆپێ"],
      tr: ["Tarihi Sinop Cezaevi", "Hamsilos Koyu", "Sinop Kalesi", "Meşhur Sinop Mantısı"],
      en: ["Sinop Fortress & Historic Closed Prison", "Hamsilos Fjord-Like Bay", "Northernmost Lighthouse of Turkey", "Authentic Sinop Walnut Mantisi (Dumplings)"]
    },
    desc: {
      ar: "تقع في أقصى شمال تركيا على شبه جزيرة برية داخل البحر الأسود، تشتهر بمضيقها الطبيعي الشبيه بالفيورد وسجنها التاريخي الأثري الشهير.",
      ku: "ل باکوورترین خالا تورکیا هەڵکەفتییە، ب کەنالێ خوە یێ دەریایی یێ جوان دهێتە نیاسین.",
      tr: "Türkiye'nin en kuzey noktası (İnceburun), fiyort benzeri Hamsilos koyu, tarihi Sinop Cezaevi ve mantısıyla ünlü sakin sahil şehri.",
      en: "The northernmost city in Turkey, featuring a beautiful fjord-like coastline, a famous historic fortress-prison, and delicious dumplings."
    }
  },
  {
    id: "samsun",
    names: { ar: "سامسون", ku: "سامسۆن", tr: "Samsun", en: "Samsun" },
    region: { ar: "البحر الأسود", ku: "دەريای ڕەش", tr: "Karadeniz", en: "Black Sea" },
    bestSeason: { ar: "الربيع والصيف", ku: "بەهار و هاوین", tr: "İlkbahar ve Yaz", en: "Spring & Summer" },
    duration: { ar: "1-2 يوم", ku: "١-٢ رۆژ", tr: "1-2 Gün", en: "1-2 Days" },
    highlights: {
      ar: ["سفينة بانديرما التاريخية ومتحفها", "تلفريك سامسون وحديقة أمازون الشهيرة", "كورنيش سامسون البحري الطويل", "سهول قزل إرماك الخصبة ومحمية الطيور"],
      ku: ["کەشتیا باندرما یا مێژوویی", "تەلەفریکا سامسۆنێ و پارکا ئەمازۆن", "کۆرنیشێ دەریایی", "بیابان و دەشتێن قزل إرماک"],
      tr: ["Bandırma Vapuru Müzesi", "Samsun Teleferik ve Amisos Tepesi", "Amazon Köyü", "Kızılırmak Deltası Kuş Cenneti"],
      en: ["Bandirma Historic Ship Museum", "Amisos Cable Car & Amazon Village", "Long Coastal Bicycle Way", "Kizilirmak Delta Bird Sanctuary"]
    },
    desc: {
      ar: "أكبر مدن البحر الأسود وبوابته التجارية والتاريخية، حيث بدأت حرب الاستقلال التركية، وتضم حدائق واسعة وتلفريك مميز.",
      ku: "مەزنترین باژێڕ ل دەریایێ ڕەش، کو ب گۆڕەپانا دیرۆکی یا سەرکەفتنا دەوڵەتا کۆماری دهێتە نیاسين.",
      tr: "Milli mücadelenin başladığı yer, Bandırma Vapuru, Amisos tepesi teleferiği ve geniş sahiliyle Karadeniz'in en gelişmiş büyükşehri.",
      en: "The largest metropolis on the Black Sea coast, key historical site of Turkey's independence movement, with rich wildlife deltas."
    }
  },
  {
    id: "kocaeli_kartepe",
    names: { ar: "كارتيبي", ku: "کارتیپی", tr: "Kartepe", en: "Kartepe" },
    region: { ar: "مرمرة", ku: "مەرمەرە", tr: "Marmara", en: "Marmara" },
    bestSeason: { ar: "الشتاء", ku: "زستان", tr: "Kış", en: "Winter" },
    duration: { ar: "1 يوم", ku: "١ رۆژ", tr: "1 Gün", en: "1 Day" },
    highlights: {
      ar: ["قمة كارتيبي الثلجية والتزلج", "تلفريك كارتيبي المطل على بحيرة سبانجا", "الأنشطة الترفيهية الشتوية وأكواخ الجبل", "ركوب الدراجات الجبلية والـ ATV صيفاً"],
      ku: ["لووتکەیا کارتیپی یا بەفرین", "تەلەفریکا کارتیپی یا جوان", "یاریێن زستانی", "یاری ئەی تی ڤی ل وەرزێ گەرم"],
      tr: ["Kartepe Kayak pistleri", "Kartepe Teleferik", "Kar Aktiviteleri", "ATV ve Doğa turları"],
      en: ["Kartepe Ski Slopes", "Kartepe Mountain Cable Car", "Snow Mobiles & Mountain Lodges", "Summer Mountain Biking & ATVs"]
    },
    desc: {
      ar: "أقرب منتجع تزلج شتوي إلى إسطنبول، يقع فوق قمة جبلية شاهقة تطل مباشرة على بحيرة سبانجا، ويقدم ترفيهاً شتوياً وصيفياً فاخراً.",
      ku: "نزیکترین هاوینەهوارا بەفرین و تزلجێ ل ئەستەنبوڵێ، کو دیمەنەکێ جوان ل سەر دەریاچەیا سەپانجا ددەت.",
      tr: "Marmara bölgesinin en popüler kayak merkezi. Kışın bembeyaz kar örtüsü, yazın ise serin doğası ile doğaseverleri ağırlar.",
      en: "The closest ski resort to Istanbul, positioned on a panoramic mountain peak directly overlooking beautiful Lake Sapanca."
    }
  },
  {
    id: "yalova_termal",
    names: { ar: "تيرمال (يالوفا)", ku: "تێرمال (یاڵۆڤا)", tr: "Termal (Yalova)", en: "Termal (Yalova)" },
    region: { ar: "مرمرة", ku: "مەرمەرە", tr: "Marmara", en: "Marmara" },
    bestSeason: { ar: "الشتاء والخريف", ku: "زستان و پایز", tr: "Sonbahar ve Kış", en: "Winter & Autumn" },
    duration: { ar: "1 يوم", ku: "١ رۆژ", tr: "1 Gün", en: "1 Day" },
    highlights: {
      ar: ["الينابيع الكبريتية الحارة التاريخية", "فندق قصر ترمال الأثري", "الغابات الكثيفة ومسارات المشي الصحي", "مسابح السبا والجاكوزي المعدني الطبيعي"],
      ku: ["کانیێن ئاڤا گەرم یێن کبرتی یێن مێژوویی", "کۆشک و هۆتێلا مێژوویی یا تێرمال", "ڕێڕەوێن مەشیا پاقژ یێن ناڤ دارستانان", "حەوزێن مەعدەنی یێن ساخلەمیێ"],
      tr: ["Termal Kaplıcaları", "Atatürk Köşkü", "Doğa Yürüyüş Parkurları", "Şifalı Banyolar"],
      en: ["Ancient Sulphur Thermal Baths", "Termal Historic Palace Hotel", "Lush Forest Hiking Trails", "Private Mineral Spa & Jaccuzis"]
    },
    desc: {
      ar: "منطقة سياحية وتاريخية شهيرة منذ العهد الروماني بفضل مياهها المعدنية الكبريتية الحارة التي تفيد في علاج العديد من الأمراض.",
      ku: "دەڤەرەکا گەشتیاری و ساخلەمیێ یا مێژوویی د سەردەمێ ڕۆمانی دا بناڤوبانگ بوو ب ئاڤا خوە یا کانیێن گەرم.",
      tr: "Osmanlı'dan beri şifa arayanların adresi olan, çam ormanlarıyla kaplı vadide yer alan ünlü termal kaplıcalar bölgesi.",
      en: "A historic therapeutic spa valley utilized since Roman times, famous for clean sulphur pools and healing wellness waters."
    }
  }
];

export const allRemainingCities = [
  { id: "adadiyaman", names: { ar: "أديامان", ku: "سەمسوور", tr: "Adıyaman", en: "Adiyaman" }, region: "Doğu Anadolu", attraction: "Nemrut Dağı" },
  { id: "afyon", names: { ar: "أفيون قره حصار", ku: "ئافیۆن", tr: "Afyonkarahisar", en: "Afyonkarahisar" }, region: "Ege", attraction: "Termal Oteller & Sucuk" },
  { id: "agri", names: { ar: "أغري", ku: "ئاگری", tr: "Ağrı", en: "Agri" }, region: "Doğu Anadolu", attraction: "Ağrı Dağı (Ararat) & İshak Paşa Sarayı" },
  { id: "amasya", names: { ar: "أماسيا", ku: "ئاماسیا", tr: "Amasya", en: "Amasya" }, region: "Karadeniz", attraction: "Kral Kaya Mezarları" },
  { id: "artvin", names: { ar: "أرتوين", ku: "ئارتڤین", tr: "Artvin", en: "Artvin" }, region: "Karadeniz", attraction: "Karagöl (Borçka)" },
  { id: "balikesir", names: { ar: "باليكسير", ku: "بالیکەسیر", tr: "Balıkesir", en: "Balikesir" }, region: "Ege", attraction: "Cunda Adası & Kazdağları" },
  { id: "bilecik", names: { ar: "بيله جك", ku: "بیله‌جک", tr: "Bilecik", en: "Bilecik" }, region: "Marmara", attraction: "Şeyh Edebali Türbesi" },
  { id: "bingol", names: { ar: "بينغول", ku: "چەولیگ", tr: "Bingöl", en: "Bingol" }, region: "Doğu Anadolu", attraction: "Yüzen Adalar" },
  { id: "bitlis", names: { ar: "بتليس", ku: "بەدلیس", tr: "Bitlis", en: "Bitlis" }, region: "Doğu Anadolu", attraction: "Nemrut Krater Gölü" },
  { id: "burdur", names: { ar: "بوردور", ku: "بۆردور", tr: "Burdur", en: "Burdur" }, region: "Akdeniz", attraction: "Salda Gölü (Türkiye'nin Maldivleri)" },
  { id: "cankiri", names: { ar: "تشانكيري", ku: "چانقڕی", tr: "Çankırı", en: "Cankiri" }, region: "İç Anadolu", attraction: "Tuz Mağarası" },
  { id: "corum", names: { ar: "تشوروم", ku: "چۆروم", tr: "Çorum", en: "Corum" }, region: "Karadeniz", attraction: "Hattuşaş (Hitit Başkenti)" },
  { id: "diyarbakir", names: { ar: "ديار بكر", ku: "ئامەد", tr: "Diyarbakır", en: "Diyarbakir" }, region: "Güneydoğu Anadolu", attraction: "Tarihi Sur Duvarları & Hasan Paşa Hanı" },
  { id: "elazig", names: { ar: "إلازيغ", ku: "خارپێت", tr: "Elazığ", en: "Elazig" }, region: "Doğu Anadolu", attraction: "Harput Kalesi" },
  { id: "erzincan", names: { ar: "أرزنجان", ku: "ئەرزنگان", tr: "Erzincan", en: "Erzincan" }, region: "Doğu Anadolu", attraction: "Karanlık Kanyon (Kemaliye)" },
  { id: "erzurum", names: { ar: "أرزروم", ku: "ئەرزڕۆم", tr: "Erzurum", en: "Erzurum" }, region: "Doğu Anadolu", attraction: "Palandöken Kayak Merkezi & Çifte Minareli Medrese" },
  { id: "eskisehir", names: { ar: "أسكي شهر", ku: "ئەسکی‌شەهیر", tr: "Eskişehir", en: "Eskisehir" }, region: "İç Anadolu", attraction: "Odunpazarı Tarihi Evleri & Porsuk Çayı" },
  { id: "gumushane", names: { ar: "غوموش خانة", ku: "گوموشخانە", tr: "Gümüşhane", en: "Gumushane" }, region: "Karadeniz", attraction: "Karaca Mağarası" },
  { id: "hakkari", names: { ar: "هكاري", ku: "جۆلەمێرگ", tr: "Hakkari", en: "Hakkari" }, region: "Doğu Anadolu", attraction: "Cilo Buzulları & Sat Gölleri" },
  { id: "hatay", names: { ar: "هاتاي (أنطاكيا)", ku: "هاتای", tr: "Hatay", en: "Hatay" }, region: "Akdeniz", attraction: "Saint Pierre Kilisesi & Antakya Mutfağı" },
  { id: "isparta_general", names: { ar: "إسبرطة العامة", ku: "ئیسپارتای گشتی", tr: "Isparta", en: "Isparta" }, region: "Akdeniz", attraction: "Eğirdir Gölü & Lavanta tarlaları" },
  { id: "kahramanmaras", names: { ar: "قهرمان مرعش", ku: "مەرەش", tr: "Kahramanmaraş", en: "Kahramanmaras" }, region: "Akdeniz", attraction: "Maraş Dondurması" },
  { id: "karaman", names: { ar: "كارامان", ku: "کارامان", tr: "Karaman", en: "Karaman" }, region: "İç Anadolu", attraction: "Karaman Kalesi" },
  { id: "kastamonu", names: { ar: "كاستامونو", ku: "کاستامۆنو", tr: "Kastamonu", en: "Kastamonu" }, region: "Karadeniz", attraction: "Valla Kanyonu" },
  { id: "kayseri", names: { ar: "قيصري", ku: "قەیسەری", tr: "Kayseri", en: "Kayseri" }, region: "İç Anadolu", attraction: "Erciyes Dağı Kayak Merkezi & Mantı" },
  { id: "kirklareli", names: { ar: "قرقلر إيلي", ku: "کرکلارەلی", tr: "Kırklareli", en: "Kirklareli" }, region: "Marmara", attraction: "Dupnisa Mağarası" },
  { id: "kirsehir", names: { ar: "قرشهر", ku: "کرشەهیر", tr: "Kırşehir", en: "Kirsehir" }, region: "İç Anadolu", attraction: "Cacabey Medresesi" },
  { id: "kilis", names: { ar: "كيليس", ku: "کلیس", tr: "Kilis", en: "Kilis" }, region: "Güneydoğu Anadolu", attraction: "Kilis Tava & Tarihi Sabunhaneler" },
  { id: "konya", names: { ar: "قونية", ku: "کۆنیا", tr: "Konya", en: "Konya" }, region: "İç Anadolu", attraction: "Mevlana Müzesi (Şems & Rumi) & Etliekmek" },
  { id: "kutahya", names: { ar: "كوتاهيا", ku: "کوتاهیا", tr: "Kütahya", en: "Kutahya" }, region: "Ege", attraction: "Tarihi Çini Atölyeleri & Aizanoi Antik Kenti" },
  { id: "malatya", names: { ar: "ملطية", ku: "مەلاتیە", tr: "Malatya", en: "Malatya" }, region: "Doğu Anadolu", attraction: "Arslantepe Höyüğü & Malatya Kayısıları" },
  { id: "manisa", names: { ar: "مانيسا", ku: "مانیسا", tr: "Manisa", en: "Manisa" }, region: "Ege", attraction: "Spil Dağı Milli Parkı" },
  { id: "mersin", names: { ar: "مرسين", ku: "مێرسین", tr: "Mersin", en: "Mersin" }, region: "Akdeniz", attraction: "Cennet ve Cehennem Obrukları & Tantuni" },
  { id: "mus", names: { ar: "موش", ku: "مووش", tr: "Muş", en: "Mus" }, region: "Doğu Anadolu", attraction: "Muş Ovası (Lale bahçeleri)" },
  { id: "nigde", names: { ar: "نيغدة", ku: "نیغدە", tr: "Niğde", en: "Nigde" }, region: "İç Anadolu", attraction: "Gümüşler Manastırı" },
  { id: "sakarya", names: { ar: "ساكاريا", ku: "ساکاریا", tr: "Sakarya", en: "Sakarya" }, region: "Marmara", attraction: "Acarlar Longozu & Sapanca" },
  { id: "siirt", names: { ar: "سيرت", ku: "سێرت", tr: "Siirt", en: "Siirt" }, region: "Güneydoğu Anadolu", attraction: "Veysel Karani Türbesi & Büryan Kebabı" },
  { id: "sivas", names: { ar: "سيواس", ku: "سێواس", tr: "Sivas", en: "Sivas" }, region: "İç Anadolu", attraction: "Divriği Ulu Camii (UNESCO)" },
  { id: "tekirdag", names: { ar: "تكيرداغ", ku: "تەکیرداغ", tr: "Tekirdağ", en: "Tekirdag" }, region: "Marmara", attraction: "Uçmakdere Yamaç Paraşütü & Tekirdağ Köftesi" },
  { id: "tokat", names: { ar: "توكات", ku: "تۆکات", tr: "Tokat", en: "Tokat" }, region: "Karadeniz", attraction: "Ballıca Mağarası" },
  { id: "tunceli", names: { ar: "تونجلي", ku: "دێرسیم", tr: "Tunceli", en: "Tunceli" }, region: "Doğu Anadolu", attraction: "Munzur Vadisi Milli Parkı" },
  { id: "usak", names: { ar: "عشاق", ku: "ئوشاک", tr: "Uşak", en: "Usak" }, region: "Ege", attraction: "Ulubey Kanyonu (Dünyanın 2. En Uzun Kanyonu)" },
  { id: "yozgat", names: { ar: "يوزغات", ku: "یۆزگات", tr: "Yozgat", en: "Yozgat" }, region: "İç Anadolu", attraction: "Yozgat Çamlığı Milli Parkı" },
  { id: "zonguldak", names: { ar: "زونغولداق", ku: "زۆنگولداک", tr: "Zonguldak", en: "Zonguldak" }, region: "Karadeniz", attraction: "Gökgöl Mağarası" },
  { id: "aksaray", names: { ar: "أق سراي", ku: "ئاقسەرای", tr: "Aksaray", en: "Aksaray" }, region: "İç Anadolu", attraction: "Ihlara Vadisi" },
  { id: "bayburt", names: { ar: "بايبورت", ku: "بایبورت", tr: "Bayburt", en: "Bayburt" }, region: "Karadeniz", attraction: "Baksı Müzesi" },
  { id: "karabuk", names: { ar: "كارابوك", ku: "کارابوک", tr: "Karabük", en: "Karabuk" }, region: "Karadeniz", attraction: "Safranbolu Evleri" },
  { id: "kirikkale", names: { ar: "قيريق قلعة", ku: "کرکقەڵا", tr: "Kırıkkale", en: "Kirikkale" }, region: "İç Anadolu", attraction: "Silah Sanayi Müzesi" },
  { id: "batman", names: { ar: "باتمان", ku: "ئێلح", tr: "Batman", en: "Batman" }, region: "Güneydoğu Anadolu", attraction: "Hasankeyf Tarihi Mağaraları" },
  { id: "sirnak", names: { ar: "شرناق", ku: "شرنەخ", tr: "Şırnak", en: "Sirnak" }, region: "Güneydoğu Anadolu", attraction: "Nuh Peygamber Türbesi & Cudi Dağı" },
  { id: "bartin", names: { ar: "بارتين", ku: "بارتین", tr: "Bartın", en: "Bartin" }, region: "Karadeniz", attraction: "Amasra Sahili" },
  { id: "ardahan", names: { ar: "أرداهان", ku: "ئەردەهان", tr: "Ardahan", en: "Ardahan" }, region: "Doğu Anadolu", attraction: "Çıldır Gölü & Şeytan Kalesi" },
  { id: "igdir", names: { ar: "إغدير", ku: "ئیدر", tr: "Iğdır", en: "Igdir" }, region: "Doğu Anadolu", attraction: "Ağrı Dağı Doğu Yamaçları" },
  { id: "osmaniye", names: { ar: "عثمانية", ku: "عوسمانیە", tr: "Osmaniye", en: "Osmaniye" }, region: "Akdeniz", attraction: "Kastabala Antik Kenti" },
  { id: "duzce", names: { ar: "دوزجة", ku: "دوزجە", tr: "Düzce", en: "Duzce" }, region: "Karadeniz", attraction: "Güzeldere Şelalesi" }
];
