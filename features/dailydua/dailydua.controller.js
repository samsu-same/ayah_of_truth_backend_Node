const duaService = require("./dailydua.service");

exports.createDua = async (req, res) => {
  try {
    const dua = await duaService.createDua(req.body);

    return res.status(201).json({
      success: true,
      data: dua
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ─── Dua Data ─────────────────────────────────────────────────────────────────
// const duas = [
//   {
//     id: 1,
//     category: "morning",
//     title: "Morning Awakening",
//     arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
//     transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
//     translation: "All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.",
//     reference: "Sahih al-Bukhari 6312",
//     when: "Upon waking up",
//   },
//   {
//     id: 2,
//     category: "morning",
//     title: "Morning Protection",
//     arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
//     transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur",
//     translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
//     reference: "Sunan Abu Dawud 5068",
//     when: "In the morning",
//   },
//   {
//     id: 3,
//     category: "evening",
//     title: "Evening Supplication",
//     arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
//     transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir",
//     translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.",
//     reference: "Sunan Abu Dawud 5068",
//     when: "In the evening",
//   },
//   {
//     id: 4,
//     category: "evening",
//     title: "Evening Protection",
//     arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
//     transliteration: "Amsayna wa amsal-mulku lillahi walhamdu lillah",
//     translation: "We have entered the evening and the whole kingdom of Allah has entered the evening. Praise be to Allah.",
//     reference: "Sahih Muslim 2723",
//     when: "In the evening",
//   },
//   {
//     id: 5,
//     category: "food",
//     title: "Before Eating",
//     arabic: "بِسْمِ اللَّهِ",
//     transliteration: "Bismillah",
//     translation: "In the name of Allah.",
//     reference: "Sahih al-Bukhari 5376",
//     when: "Before eating",
//   },
//   {
//     id: 6,
//     category: "food",
//     title: "After Eating",
//     arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
//     transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
//     translation: "All praise is for Allah who fed me this and provided it for me without any power or might from myself.",
//     reference: "Sunan Abu Dawud 4023",
//     when: "After eating",
//   },
//   {
//     id: 7,
//     category: "travel",
//     title: "Dua for Travel",
//     arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
//     transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun",
//     translation: "Glory be to Him who has subjected this to us, and we were not able to do it ourselves. And verily, to our Lord we will return.",
//     reference: "Sunan Abu Dawud 2602",
//     when: "When riding a vehicle",
//   },
//   {
//     id: 8,
//     category: "travel",
//     title: "Entering a New Place",
//     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ أَهْلِهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا",
//     transliteration: "Allahumma inni as'aluka khayrahaa wa khayra ahliha, wa a'udhu bika min sharriha wa sharri ahliha",
//     translation: "O Allah, I ask You for the good of it and the good of its people, and I seek refuge in You from its evil and the evil of its people.",
//     reference: "Sahih al-Bukhari",
//     when: "When entering a new town or place",
//   },
//   {
//     id: 9,
//     category: "distress",
//     title: "Dua in Hardship",
//     arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ",
//     transliteration: "La ilaha illallahul-'Azimul-Halim, la ilaha illallahu Rabbul-'Arshil-'Azim",
//     translation: "There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Mighty Throne.",
//     reference: "Sahih al-Bukhari 6346",
//     when: "During times of distress",
//   },
//   {
//     id: 10,
//     category: "distress",
//     title: "Dua for Anxiety",
//     arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ",
//     transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal",
//     translation: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness.",
//     reference: "Sahih al-Bukhari 6369",
//     when: "When feeling anxious or worried",
//   },
//   {
//     id: 11,
//     category: "forgiveness",
//     title: "Master Dua of Forgiveness",
//     arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
//     transliteration: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana 'abduk",
//     translation: "O Allah, You are my Lord. There is no god but You. You created me and I am Your servant.",
//     reference: "Sahih al-Bukhari 6306",
//     when: "Morning and evening",
//   },
//   {
//     id: 12,
//     category: "forgiveness",
//     title: "Seeking Forgiveness",
//     arabic: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
//     transliteration: "Astaghfirullahil-ladhi la ilaha illa huwal-Hayyul-Qayyumu wa atubu ilaih",
//     translation: "I seek forgiveness from Allah, there is no god but Him, the Ever-Living, the Self-Sustaining, and I repent to Him.",
//     reference: "Sunan Abu Dawud 1517",
//     when: "Any time",
//   },
//   {
//     id: 13,
//     category: "sleep",
//     title: "Before Sleeping",
//     arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
//     transliteration: "Bismika Allahumma amutu wa ahya",
//     translation: "In Your name, O Allah, I die and I live.",
//     reference: "Sahih al-Bukhari 6324",
//     when: "Before going to sleep",
//   },
//   {
//     id: 14,
//     category: "sleep",
//     title: "Protection During Sleep",
//     arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
//     transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
//     translation: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
//     reference: "Sunan Abu Dawud 5045",
//     when: "Before sleeping",
//   },
//   {
//     id: 15,
//     category: "gratitude",
//     title: "Dua of Gratitude",
//     arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
//     transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
//     translation: "O Allah, help me to remember You, to give thanks to You, and to worship You well.",
//     reference: "Sunan Abu Dawud 1522",
//     when: "After every prayer",
//   },
// ];

// // ─── Helper ───────────────────────────────────────────────────────────────────
// const getDailyDua = () => {
//   const dayOfYear = Math.floor(
//     (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
//   );
//   return duas[dayOfYear % duas.length];
// };

// const getCategories = () => [...new Set(duas.map((d) => d.category))];

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/dua/daily  – deterministic dua of the day
// app.get("/api/dua/daily", (req, res) => {
//   res.json({ success: true, data: getDailyDua() });
// });

// // GET /api/dua/random  – random dua
// app.get("/api/dua/random", (req, res) => {
//   const dua = duas[Math.floor(Math.random() * duas.length)];
//   res.json({ success: true, data: dua });
// });

// // GET /api/dua/categories  – list all categories
// app.get("/api/dua/categories", (req, res) => {
//   const categories = getCategories().map((cat) => ({
//     id: cat,
//     label: cat.charAt(0).toUpperCase() + cat.slice(1),
//     count: duas.filter((d) => d.category === cat).length,
//   }));
//   res.json({ success: true, data: categories });
// });

// // GET /api/dua/category/:category  – duas by category
// app.get("/api/dua/category/:category", (req, res) => {
//   const { category } = req.params;
//   const filtered = duas.filter((d) => d.category === category.toLowerCase());
//   if (!filtered.length) {
//     return res.status(404).json({ success: false, message: "Category not found" });
//   }
//   res.json({ success: true, data: filtered, total: filtered.length });
// });

// // GET /api/dua/:id  – single dua by id
// app.get("/api/dua/:id", (req, res) => {
//   const dua = duas.find((d) => d.id === parseInt(req.params.id));
//   if (!dua) return res.status(404).json({ success: false, message: "Dua not found" });
//   res.json({ success: true, data: dua });
// });

// // GET /api/dua  – all duas (optional ?category= filter)
// app.get("/api/dua", (req, res) => {
//   const { category } = req.query;
//   const data = category
//     ? duas.filter((d) => d.category === category.toLowerCase())
//     : duas;
//   res.json({ success: true, data, total: data.length });
// });


