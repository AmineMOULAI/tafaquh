export interface LocalizedText {
  ar: string;
  en: string;
  fr: string;
}

export interface VocabularyItem {
  term: string;
  meaning: LocalizedText;
  etymology?: LocalizedText;
}

export interface SharhChapter {
  title: LocalizedText;
  content: LocalizedText;
  timestampSeconds?: number;
}

export interface KeyTakeaway {
  title: LocalizedText;
  points: LocalizedText[];
}

export interface QuizQuestion {
  question: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
}

export interface MajlisSession {
  id: string;
  slug: string;
  projectSlug: string;
  sessionNumber: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  date: string;
  duration: string;
  durationSeconds: number;
  audioUrl: string;
  posterImage?: string;
  isAvailable: boolean;
  telegramPostUrl: string;
  telegramVoiceNoteInfo: LocalizedText;
  theme: LocalizedText;
  matn: {
    arabic: string;
    translation: LocalizedText;
    source: LocalizedText;
    narrator?: LocalizedText;
  };
  vocabulary: VocabularyItem[];
  sharhChapters: SharhChapter[];
  fawaid: KeyTakeaway[];
  quizQuestions: QuizQuestion[];
  reflectionPrompt: LocalizedText;
}

export interface JalsaProject {
  id: string;
  slug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  scholarlySource: LocalizedText;
  category: string;
  iconName: string;
  posterImage: string;
  badge: LocalizedText;
  bannerGradient: string;
  accentColor: string;
  totalMajalis: number;
  completedMajalis: number;
  telegramChatUrl: string;
  telegramGroupName: string;
  majalis: MajlisSession[];
}


export const JALSA_PROJECTS: JalsaProject[] = [
  {
    "id": "sharh-40-nawawiya",
    "slug": "sharh-40-nawawiya",
    "title": {
      "ar": "شرح الأربعين النووية",
      "en": "Explanation of the 40 Hadiths of An-Nawawi",
      "fr": "Explication des 40 Hadiths Nawawi"
    },
    "subtitle": {
      "ar": "تأصيل قواعد الدين ومقاصد الشريعة بناءً على شرح الشيخ ابن عثيمين رحمه الله",
      "en": "Foundational principles of Islam based on the commentary of Shaykh Ibn al-Uthaymeen",
      "fr": "Fondements de l'Islam basés sur le commentaire de Cheikh Ibn al-Outhaymine"
    },
    "description": {
      "ar": "مدارسة علمية ومنهجية لأحاديث الأربعين النووية التي تدور عليها أصول الإسلام، مع بيان فقه الحديث ودقائق استنباطاته العقدية والعملية بالاعتماد على شرح الشيخ العلامة محمد بن صالح العثيمين، مصحوبة بمجالس صوتية في مجموعة تفقه على تيليجرام.",
      "en": "Methodical study circle exploring the forty foundational Hadiths of Islam according to Shaykh Muhammad ibn Salih al-Uthaymeen, accompanied by official voice recordings in the Tafaqquh Telegram group.",
      "fr": "Cercle d'étude méthodique explorant les quarante Hadiths fondamentaux de l'Islam selon l'explication de Cheikh Muhammad ibn Salih al-Outhaymine, accompagné des enregistrements audio officiels sur le groupe Telegram Tafaqquh."
    },
    "scholarlySource": {
      "ar": "شرح الشيخ محمد بن صالح العثيمين رحمه الله",
      "en": "Commentary by Shaykh Muhammad ibn Salih al-Uthaymeen (May Allah have mercy on him)",
      "fr": "Commentaire de Cheikh Muhammad ibn Salih al-Outhaymine (Qu'Allah lui fasse miséricorde)"
    },
    "category": "Hadith & Fiqh",
    "iconName": "scroll",
    "posterImage": "/images/40nawawiyah.jpg",
    "badge": {
      "ar": "مجلس مسجل ومتاح",
      "en": "Recorded Session Available",
      "fr": "Session Enregistrée Disponible"
    },
    "bannerGradient": "from-[#0B3B2C] via-[#14532D] to-[#0A261A]",
    "accentColor": "#D4AF37",
    "totalMajalis": 42,
    "completedMajalis": 1,
    "telegramChatUrl": "https://t.me/center_tafaqquh",
    "telegramGroupName": "@center_tafaqquh",
    "majalis": [
      {
        "id": "majlis-1-innama-al-aamal-bin-niyyat",
        "slug": "majlis-1-innama-al-aamal-bin-niyyat",
        "projectSlug": "sharh-40-nawawiya",
        "sessionNumber": 1,
        "title": {
          "ar": "المجلس الأول: حديث «إنما الأعمال بالنيات»",
          "en": "Majlis 1: The Hadith 'Actions are but by Intentions'",
          "fr": "Majlis 1 : Le Hadith « Les actions ne valent que par les intentions »"
        },
        "subtitle": {
          "ar": "منزلة النية، الفرق بين نية العمل ونية المعمول له، وحقيقة الهجرة",
          "en": "Significance of intention, distinguishing intent of action vs. intent for Allah, and the reality of Hijrah",
          "fr": "Statut de l'intention, distinction entre intention de l'acte et intention pour Qui on agit, et réalité de l'émigration"
        },
        "date": "2026",
        "duration": "43 دقيقة",
        "durationSeconds": 2594,
        "audioUrl": "/api/audio/hadith-1.mp3",
        "posterImage": "/images/40nawawiyah.jpg",
        "isAvailable": true,
        "telegramPostUrl": "https://t.me/center_tafaqquh",
        "telegramVoiceNoteInfo": {
          "ar": "تسجيل صوتي رسمي للمجلس في مجموعة تفقه على تيليجرام",
          "en": "Official audio recording available in the Tafaqquh Telegram group",
          "fr": "Enregistrement audio officiel disponible dans le groupe Telegram Tafaqquh"
        },
        "theme": {
          "ar": "الإخلاص، النية، الهجرة، ميزان الباطن",
          "en": "Sincerity, Intention, Hijrah, Inward Scale",
          "fr": "Sincérité, Intention, Hijrah, Balance Intérieure"
        },
        "matn": {
          "arabic": "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ، قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ:\n«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ».",
          "translation": {
            "ar": "رواه إماما المحدثين: أبو عبد الله محمد بن إسماعيل بن إبراهيم بن المغيرة بن بَرْدِزْبَهْ البخاري، وأبو الحسين مسلم بن الحجاج بن مسلم القشيري النيسابوري، في صحيحيهما اللذين هما أصح الكتب المصنفة.",
            "en": "On the authority of Amir al-Mu'minin, Abu Hafs Umar ibn al-Khattab (may Allah be pleased with him), who said: I heard the Messenger of Allah (peace and blessings of Allah be upon him) say: 'Actions are but by intentions, and every man shall have only that which he intended. Thus he whose migration was for Allah and His Messenger, his migration was for Allah and His Messenger, and he whose migration was for worldly gain or to marry a woman, his migration was for that which he migrated to.' [Sahih al-Bukhari & Sahih Muslim]",
            "fr": "D'après l'Émir des croyants, Abou Hafs 'Omar ibn al-Khattâb (qu'Allah l'agrée), j'ai entendu le Messager d'Allah (paix et bénédictions d'Allah sur lui) dire : « Les actions ne valent que par les intentions, et chacun ne recevra la rétribution que selon ce qu'il a eu l'intention d'accomplir. Celui dont l'émigration a été pour Allah et Son Messager, son émigration sera comptée pour Allah et Son Messager. Et celui dont l'émigration a été dans un but terrestre à acquérir ou pour épouser une femme, son émigration ne lui sera comptée que pour ce vers quoi il a émigré. » [Rapporté par al-Bukhari et Muslim]"
          },
          "source": {
            "ar": "صحيح البخاري (رقم 1) وصحيح مسلم (رقم 1907)",
            "en": "Sahih al-Bukhari (No. 1) & Sahih Muslim (No. 1907)",
            "fr": "Sahih al-Bukhari (n°1) et Sahih Muslim (n°1907)"
          },
          "narrator": {
            "ar": "عمر بن الخطاب رضي الله عنه (أمير المؤمنين، الفاروق)",
            "en": "Umar ibn al-Khattab (may Allah be pleased with him)",
            "fr": "'Omar ibn al-Khattâb (qu'Allah l'agrée)"
          }
        },
        "vocabulary": [
          {
            "term": "إِنَّمَا",
            "meaning": {
              "ar": "أداة حصر تفيد إثبات الحكم للمذكور ونفيه عما عداه، أي لا يعتد بعمل شرعاً إلا بنية.",
              "en": "A particle of restriction, signifying that an action is valid and rewarded only with intention.",
              "fr": "Particule de restriction indiquant que l'acte n'est valide et rétribué qu'avec une intention."
            },
            "etymology": {
              "ar": "مركبة من (إنّ) المشبهة بالفعل وحرف الكف (ما).",
              "en": "Compound of 'Inna' and restrictive 'Ma'.",
              "fr": "Composée de 'Inna' et du 'Ma' restrictif."
            }
          },
          {
            "term": "النِّيَّةُ",
            "meaning": {
              "ar": "لغةً: القصد والعزم على الشيء. واصطلاحاً: قصد الطاعة والتقرب إلى الله تعالى بفعل العبادة.",
              "en": "Linguistically: intention and resolve. Terminology: intent to obey Allah and seek His nearness through act of worship.",
              "fr": "Linguistiquement : la résolution et le dessein. En droit islamique : l'intention d'obéir à Allah et de se rapprocher de Lui."
            }
          },
          {
            "term": "امْرِئٍ",
            "meaning": {
              "ar": "الإنسان (ذكراً كان أو أنثى)، وتتغير حركة همزته تبعاً لموقعه الإعرابي (امرؤٌ، امرأً، امرئٍ).",
              "en": "The human being / person (male or female).",
              "fr": "La personne humaine (homme ou femme)."
            }
          },
          {
            "term": "الْهِجْرَةُ",
            "meaning": {
              "ar": "لغةً: الترك والمفارقة. وشرعاً: الانتقال من بلد الشرك إلى بلد الإسلام، أو هجر الذنوب والمعاصي.",
              "en": "Linguistically: abandonment. In Shariah: moving from land of disbelief to land of Islam, or abandoning sins.",
              "fr": "Linguistiquement : l'abandon. En religion : l'émigration de la terre de mécréance vers la terre d'Islam, ou l'abandon des péchés."
            }
          }
        ],
        "sharhChapters": [
          {
            "title": {
              "ar": "1. منزلة الحديث ومكانته في الإسلام",
              "en": "1. The High Status of the Hadith in Islamic Law",
              "fr": "1. Le statut éminent de ce Hadith en Islam"
            },
            "content": {
              "ar": "قرر الشيخ ابن عثيمين رحمه الله أن هذا الحديث أصل عظيم من أصول الشريعة، وهو ميزان الأعمال الباطنة، كما أن حديث «من أحدث في أمرنا هذا ما ليس منه فهو رد» هو ميزان الأعمال الظاهرة. وقال الأئمة كالشافعي وأحمد: يدخل هذا الحديث في سبعين باباً من أبواب الفقه، وهو ثلث العلم.",
              "en": "Shaykh Ibn al-Uthaymeen emphasized that this Hadith is a monumental pillar of Shariah representing the inward scale of deeds, while the Hadith 'Whoever innovates in this matter of ours...' is the outward scale. Scholars like Ash-Shafi'i and Ahmad noted it encompasses one-third of Islamic knowledge and applies to 70 chapters of Fiqh.",
              "fr": "Cheikh Ibn al-Outhaymine a souligné que ce Hadith est un pilier fondamental de la législation islamique, constituant la balance des actes intérieurs, tandis que le Hadith sur le rejet des innovations est la balance des actes extérieurs. Les imams Ach-Châfi'i et Ahmad ont affirmé qu'il entre dans plus de 70 chapitres de jurisprudence."
            },
            "timestampSeconds": 0
          },
          {
            "title": {
              "ar": "2. التحقيق في معنى «إنما الأعمال بالنيات» و«وإنما لكل امرئ ما نوى»",
              "en": "2. The Difference Between the Two Sentences in the Hadith",
              "fr": "2. La nuance profonde entre les deux premières phrases"
            },
            "content": {
              "ar": "بيّن الشيخ ابن عثيمين أن الجملة الأولى «إنما الأعمال بالنيات» بيان لسبب العمل وشرطه وصحته، فالعمل لا يوجد حقيقة ولا يُعتبر شرعاً إلا بنية. أما الجملة الثانية «وإنما لكل امرئ ما نوى» فهي بيان لجزاء العامل وثوابه، وأن المرء يُعطى على حسب ما قصده بقلبه من الإخلاص أو الرياء أو طلب الدنيا.",
              "en": "Shaykh al-Uthaymeen clarified that the first clause 'Actions are but by intentions' relates to the origin and validity of the act itself, whereas the second clause 'and every man shall have only that which he intended' establishes the outcome, reward, and judgment based on the individual's inner intent.",
              "fr": "Cheikh al-Outhaymine a clarifié que la première phrase 'Les actions ne valent que par les intentions' concerne la cause et la validité de l'action, tandis que la seconde 'et chacun ne recevra que ce qu'il a eu l'intention d'accomplir' fixe la rétribution et le jugement selon le degré de sincérité."
            },
            "timestampSeconds": 380
          },
          {
            "title": {
              "ar": "3. نية العمل مقابل نية المعمول له",
              "en": "3. Intention of the Action vs. Intention for Whom it is Done",
              "fr": "3. L'intention de l'acte contre l'intention pour Qui l'acte est voué"
            },
            "content": {
              "ar": "الفقهاء يبحثون في 'نية العمل' لتمييز العادات عن العبادات (كالغسل للتبرد مقابل غسل الجنابة)، ولتمييز مراتب العبادات (كصلاة الظهر عن صلاة العصر أو الفريضة عن النافلة). أما علماء السلوك والعقيدة فيبحثون في 'نية المعمول له' وهو الإخلاص لله وحده لا شريك له والبراءة من الرياء والسمعة.",
              "en": "Jurisprudents (Fuqaha) focus on the 'intention of the act' to distinguish customs from acts of worship (e.g. cooling bath vs. ritual Ghusl) and levels of worship (e.g. Dhuhr vs. Asr). Spiritual and theological scholars examine the 'intention of for Whom the deed is done', which is pure Ikhlas dedicated to Allah alone without ostentation.",
              "fr": "Les juristes examinent 'l'intention de l'acte' pour distinguer coutume et adoration (comme le bain de fraîcheur vs le Ghusl rituel) et distinguer les rangs d'adoration (prière obligatoire vs surérogatoire). Les savants de la spiritualité examinent 'l'intention pour Qui l'acte est voué', à savoir la sincérité absolue (Ikhlas) pour Allah seul."
            },
            "timestampSeconds": 820
          },
          {
            "title": {
              "ar": "4. أسرار بلاغة الهجرة وحذف الجواب في قصد الدنيا",
              "en": "4. Rhetorical Beauty in the Mention of Hijrah",
              "fr": "4. L'éloquence et les subtilités rhétoriques dans l'exemple de la Hijrah"
            },
            "content": {
              "ar": "أعاد النبي ﷺ ذكر الجزاء تشريفاً في حق من هاجر لله ورسوله فقال: «فهجرته إلى الله ورسوله»، بينما في جانب الدنيا أتى بالضمير المكتوم «فهجرته إلى ما هاجر إليه» تحقيراً لشأن الدنيا ودناءة المقصد مقارنة بعظمة رضوان الله تعالى.",
              "en": "The Prophet ﷺ repeated the noble destination in full honour for the one whose migration was for Allah and His Messenger ('his migration was for Allah and His Messenger'). Conversely, for worldly desires, he used the vague pronoun ('his migration was for that which he migrated to') expressing belittlement and disdain for mundane pursuits in comparison to Divine pleasure.",
              "fr": "Le Prophète ﷺ a répété explicitement la récompense suprême par honneur pour celui qui émigre pour Allah et Son Messager ('son émigration est pour Allah et Son Messager'). Tandis que pour les visées mondaines, il a formulé cela sous forme condensée ('son émigration ne sera que pour ce vers quoi il a émigré') marquant l'insignifiance des gains éphémères face à la satisfaction divine."
            },
            "timestampSeconds": 1400
          }
        ],
        "fawaid": [
          {
            "title": {
              "ar": "القواعد والفوائد الكبرى المستنبطة من الحديث",
              "en": "Major Core Principles and Lessons Derived",
              "fr": "Grands principes et leçons majeures tirées du Hadith"
            },
            "points": [
              {
                "ar": "النية شرط في صحة كل عمل شرعي وقبوله ومضاعفة أجره.",
                "en": "Intention is an indispensable condition for the validity, acceptance, and multiplication of deeds in Shariah.",
                "fr": "L'intention est une condition sine qua non pour la validité, l'acceptation et la multiplication de la récompense de tout acte."
              },
              {
                "ar": "تحويل العادات والمباحات إلى عبادات وقربات بحسن النية واستحضار مرضاة الله.",
                "en": "Permissible daily habits (eating, sleeping, work) can be transformed into rewarded worship through righteous intention.",
                "fr": "Transformation des habitudes et actes permis du quotidien en actes d'adoration récompensés grâce à la pureté d'intention."
              },
              {
                "ar": "التحذير البالغ من الرياء وإرادة الدنيا بعمل الآخرة.",
                "en": "A stern warning against showing off (Riya') and seeking worldly praise through deeds of the Hereafter.",
                "fr": "Mise en garde solennelle contre l'ostentation (Riya') et la recherche des louanges d'ici-bas à travers les œuvres de l'au-delà."
              },
              {
                "ar": "الهجرة باقية ومستمرة إلى قيام الساعة: هجرة المكان، وهجرة المعصية، وهجرة أهل الأهواء والبدع.",
                "en": "Hijrah remains until the Day of Judgment: migration of location, abandonment of sins, and shunning deviant paths.",
                "fr": "L'émigration (Hijrah) perdure jusqu'à la fin des temps : émigration physique, délaissement des péchés et rejet des égarements."
              }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": {
              "ar": "ما الفرق الأساسي بين 'نية العمل' و'نية المعمول له' في تقرير الشيخ ابن عثيمين؟",
              "en": "What is the primary difference between 'Intention of the Act' and 'Intention for Whom the deed is done' according to Shaykh Ibn al-Uthaymeen?",
              "fr": "Quelle est la différence fondamentale entre 'l'intention de l'acte' et 'l'intention pour Qui l'acte est accompli' selon Cheikh Ibn al-Outhaymine ?"
            },
            "options": [
              {
                "ar": "نية العمل تميز بين العبادات والعادات، ونية المعمول له تختص بالإخلاص لله والبراءة من الشرك والرياء.",
                "en": "Intention of the act distinguishes acts of worship from habits, while intention for Whom it is done concerns pure sincerity to Allah.",
                "fr": "L'intention de l'acte distingue les adorations des coutumes, tandis que l'intention pour Qui l'on agit concerne la sincérité pure envers Allah."
              },
              {
                "ar": "نية العمل خاصة بالصلاة فقط، ونية المعمول له خاصة بالزكاة والحج.",
                "en": "Intention of act is only for prayer, while intent for Whom is for Zakat and Hajj.",
                "fr": "L'intention de l'acte est réservée à la prière, et l'autre à la Zakat et au Hajj."
              },
              {
                "ar": "لا يوجد أي فرق بينهما، كلاهما مصطلح واحد بنفس المعنى التام.",
                "en": "There is no difference between them at all.",
                "fr": "Il n'y a aucune différence, ce sont deux termes rigoureusement identiques."
              }
            ],
            "correctIndex": 0,
            "explanation": {
              "ar": "نية العمل مدارها على فقه العمل وتمييز رتبته وصحته، ونية المعمول له مدارها على الإخلاص القلبي وتجريد التوحيد لله تعالى.",
              "en": "The intention of the deed governs validity and category in Fiqh, whereas the intention for Whom it is done governs acceptance and Tawheed in the heart.",
              "fr": "L'intention de l'acte régit la validité juridique en Fiqh, tandis que l'intention pour Qui on agit régit l'agrément et le Tawhid dans le cœur."
            }
          },
          {
            "question": {
              "ar": "لماذا قال النبي ﷺ في جانب الدنيا: «فهجرته إلى ما هاجر إليه» ولم يكرر ذكر الدنيا والمرأة؟",
              "en": "Why did the Prophet ﷺ say regarding worldly intent: 'his migration was for that which he migrated to' instead of repeating worldly gain?",
              "fr": "Pourquoi le Prophète ﷺ a-t-il dit pour le but mondain : « son émigration ne sera que pour ce vers quoi il a émigré » sans répéter le monde ou la femme ?"
            },
            "options": [
              {
                "ar": "تحقيراً لشأن الدنيا والأغراض الزائلة مقارنة بعظمة وشرف الهجرة لله ورسوله.",
                "en": "To express belittlement and the triviality of worldly aims compared to the supreme honour of Allah and His Messenger.",
                "fr": "Pour marquer l'insignifiance des vanités terrestres par rapport à l'immense honneur d'Allah et de Son Messager."
              },
              {
                "ar": "لأنه نسي ذكر تفاصيل المقاصد الدنيوية.",
                "en": "Because he forgot to mention details.",
                "fr": "Parce qu'il a oublié de détailler."
              },
              {
                "ar": "لأن الهجرة لأجل الدنيا محرمة بالإجماع في كل أحوالها.",
                "en": "Because migration for worldly matters is absolutely forbidden.",
                "fr": "Parce que l'émigration terrestre est interdite en tout état de cause."
              }
            ],
            "correctIndex": 0,
            "explanation": {
              "ar": "استخدم النبي ﷺ هذا الأسلوب البلاغي الرفيع للإشعار بدونية المقصد الدنيوي وزهده أمام عظمة الإخلاص لله ورسوله.",
              "en": "The Prophet ﷺ used this sublime rhetorical nuance to demonstrate how negligible worldly motives are when measured against sincere devotion to Allah.",
              "fr": "Le Prophète ﷺ a employé cette subtilité rhétorique pour illustrer la futilité des visées mondaines face à la noble dévotion vouée à Allah."
            }
          }
        ],
        "reflectionPrompt": {
          "ar": "تأمل في أعمالك اليومية المعتادة (نوم، طعام، عمل دنيوي، دراسة): كيف يمكنك تحويلها جميعاً إلى قربات تنال عليها عظيم الأجور باستحضار نية التقوي على طاعة الله ونفع المسلمين؟",
          "en": "Reflect upon your daily mundane habits (sleeping, eating, work, studies): how can you transform them into acts of rewarded worship simply by renewing your intention to strengthen yourself in Allah's obedience and benefit Muslims?",
          "fr": "Méditez sur vos actes quotidiens habituels (sommeil, repas, travail, études) : comment pouvez-vous tous les métamorphoser en actes d'adoration rétribués simplement en renouvelant votre intention pour obéir à Allah et être utile à la communauté ?"
        }
      },
      {
        "id": "majlis-2-hadith-jibril",
        "slug": "majlis-2-hadith-jibril",
        "projectSlug": "sharh-40-nawawiya",
        "sessionNumber": 2,
        "title": {
          "ar": "المجلس الثاني: حديث جبريل عليه السلام في مراتب الدين",
          "en": "Majlis 2: The Hadith of Jibril on the Ranks of Religion",
          "fr": "Majlis 2 : Le Hadith de Jibril sur les degrés de la Religion"
        },
        "subtitle": {
          "ar": "الإسلام والإيمان والإحسان وعلامات الساعة",
          "en": "Islam, Iman, Ihsan, and the Signs of the Hour",
          "fr": "L'Islam, la Foi (Iman), l'Excellence (Ihsan) et les Signes de l'Heure"
        },
        "date": "قريباً",
        "duration": "45 دقيقة",
        "durationSeconds": 2700,
        "audioUrl": "",
        "isAvailable": false,
        "telegramPostUrl": "https://t.me/center_tafaqquh",
        "telegramVoiceNoteInfo": {
          "ar": "المجلس القادم في البث الصوتي المباشر على تيليجرام",
          "en": "Upcoming session on Tafaqquh Telegram live voice stream",
          "fr": "Prochaine session en direct sur Telegram Tafaqquh"
        },
        "theme": {
          "ar": "أصول الدين، مراتب الإسلام، الإيمان، الإحسان",
          "en": "Pillars of Faith, Levels of Religion",
          "fr": "Piliers de la Foi, Degrés de la Religion"
        },
        "matn": {
          "arabic": "عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ أَيْضًا قَالَ: بَيْنَمَا نَحْنُ عِنْدَ رَسُولِ اللَّهِ ﷺ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوَادِ الشَّعَرِ، لَا يُرَى عَلَيْهِ أَثَرُ السَّفَرِ، وَلَا يَعْرِفُهُ مِنَّا أَحَدٌ...",
          "translation": {
            "ar": "حديث أم السنة وجامع مراتب الدين الثلاث: الإسلام، الإيمان، والإحسان.",
            "en": "The comprehensive Mother Hadith encompassing the three ranks of the Deen: Islam, Iman, and Ihsan.",
            "fr": "Le Hadith fondamental réunissant les trois degrés de la Religion : l'Islam, la Foi et l'Excellence."
          },
          "source": {
            "ar": "صحيح مسلم (رقم 8)",
            "en": "Sahih Muslim (No. 8)",
            "fr": "Sahih Muslim (n°8)"
          }
        },
        "vocabulary": [],
        "sharhChapters": [],
        "fawaid": [],
        "quizQuestions": [],
        "reflectionPrompt": {
          "ar": "كيف تستشعر مقام الإحسان في صلاتك وأعمالك بأن تعبد الله كأنك تراه؟",
          "en": "How do you cultivate Ihsan in your daily prayers—worshipping Allah as though you see Him?",
          "fr": "Comment cultivez-vous le degré de l'Ihsan dans votre prière en adorant Allah comme si vous Le voyiez ?"
        }
      }
    ]
  },
  {
    "id": "gharib-al-quran",
    "slug": "gharib-al-quran",
    "title": {
      "ar": "غريب القرآن ومفردات البيان",
      "en": "Gharib al-Qur'an & Vocabulary of Eloquence",
      "fr": "Gharib al-Coran & Vocabulaire de l'Éloquence"
    },
    "subtitle": {
      "ar": "مدارسة لغوية وتدبرية لأسرار المفردات القرآنية والفروق الدلالية في كتاب الله",
      "en": "Linguistic and contemplative study exploring subtle meanings and secrets of Quranic vocabulary",
      "fr": "Étude linguistique et méditative des subtilités sémantiques et des secrets du vocabulaire coranique"
    },
    "description": {
      "ar": "مشروع قرآني منهجي يغوص في ألفاظ التنزيل، مستكشفاً أسرار الاشتقاق، وبلاغة النظم القرآني، والفروق الدقيقة بين الكلمات المتقاربة (كالحمد والمدح والشكر)، بالرجوع إلى أمهات كتب المفردات وتفاسير المحققين، مع تسجيلات صوتية في مجموعة تفقه.",
      "en": "A methodical Quranic series diving into the precise vocabulary of Revelation, exploring etymology, rhetorical nuances, and subtle distinctions between related terms (such as Hamd, Madh, and Shukr), referenced from classical lexicons and tafsir masters, with dedicated voice sessions in Tafaqquh.",
      "fr": "Projet coranique méthodique plongeant dans les termes précis de la Révélation, explorant l'étymologie, la rhétorique et les distinctions subtiles entre termes proches (comme Hamd, Madh et Chukr), appuyé sur les dictionnaires classiques et les grands commentateurs, avec des sessions audio dédiées dans Tafaqquh."
    },
    "scholarlySource": {
      "ar": "المفردات للراغب الأصفهاني، وتفاسير الطبري وابن كثير والقرطبي",
      "en": "Al-Mufradat by Al-Raghib al-Isfahani, and Tafsirs of Al-Tabari, Ibn Kathir, and Al-Qurtubi",
      "fr": "Al-Moufradat d'Al-Raghib al-Isfahani, et les Tafsirs d'Al-Tabari, Ibn Kathir et Al-Qurtoubi"
    },
    "category": "Quranic Sciences & Arabic Eloquence",
    "iconName": "book",
    "posterImage": "/images/gharibalquran.jpg",
    "badge": {
      "ar": "مجلس مسجل ومتاح",
      "en": "Recorded Session Available",
      "fr": "Session Enregistrée Disponible"
    },
    "bannerGradient": "from-[#1F4D36] via-[#0B3B2C] to-[#172554]",
    "accentColor": "#F9E498",
    "totalMajalis": 30,
    "completedMajalis": 1,
    "telegramChatUrl": "https://t.me/center_tafaqquh",
    "telegramGroupName": "@center_tafaqquh",
    "majalis": [
      {
        "id": "majlis-1-lafz-al-hamd",
        "slug": "majlis-1-lafz-al-hamd",
        "projectSlug": "gharib-al-quran",
        "sessionNumber": 1,
        "title": {
          "ar": "المجلس الأول: لفظ «الْحَمْدُ» ودلالاته في القرآن",
          "en": "Majlis 1: The Word 'Al-Hamd' & Its Subtleties in the Qur'an",
          "fr": "Majlis 1 : Le terme « Al-Hamd » et ses subtilités dans le Coran"
        },
        "subtitle": {
          "ar": "جذر الكلمة، سر «الـ» الاستغراقية، الفروق الدقيقة بين الحمد والمدح والشكر، وعلل افتتاح السور الخمس",
          "en": "Etymology, the exhaustive definite article, subtle differences between Hamd, Madh & Shukr, and reasons for opening the 5 Surahs with Hamd",
          "fr": "Étymologie, l'article exhaustif, distinctions subtiles entre Hamd, Madh et Chukr, et raisons de l'ouverture des 5 Sourates par Al-Hamd"
        },
        "date": "2026",
        "duration": "32 دقيقة",
        "durationSeconds": 1920,
        "audioUrl": "/api/audio/majlis-1-hamd.mp3",
        "posterImage": "/images/gharibalquran.jpg",
        "isAvailable": true,
        "telegramPostUrl": "https://t.me/center_tafaqquh",
        "telegramVoiceNoteInfo": {
          "ar": "تسجيل صوتي رسمي لمدارسة لفظ الحمد في مجموعة تفقه على تيليجرام",
          "en": "Official voice recording of the Al-Hamd session in the Tafaqquh Telegram group",
          "fr": "Enregistrement audio officiel de la session Al-Hamd sur Telegram Tafaqquh"
        },
        "theme": {
          "ar": "البيان القرآني، دلالة الحمد، الفروق اللغوية، الاستفتاح في التنزيل",
          "en": "Quranic Eloquence, Significance of Hamd, Linguistic Nuances",
          "fr": "Éloquence coranique, Sémantique de Hamd, Nuances linguistiques"
        },
        "matn": {
          "arabic": "قَالَ اللَّهُ تَعَالَى:\n﴿الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ﴾ [الفاتحة: 2]\nوَقَالَ جَلَّ جَلَالُهُ:\n﴿الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالأَرْضَ وَجَعَلَ الظُّلُمَاتِ وَالنُّورَ﴾ [الأنعام: 1]\n﴿الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا﴾ [الكهف: 1]\n﴿الْحَمْدُ لِلَّهِ الَّذِي لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَلَهُ الْحَمْدُ فِي الْآخِرَةِ﴾ [سبأ: 1]\n﴿الْحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ جَاعِلِ الْمَلَائِكَةِ رُسُلًا﴾ [فاطر: 1]",
          "translation": {
            "ar": "استفتحت خمس سور في كتاب الله بلفظ «الْحَمْدُ لِلَّهِ»، لتشمل أصول النعم والكمالات: الفاتحة (كمال الدين والهداية)، والأنعام (كمال الخلق والنشأة)، والكهف (كمال النبوة والتشريع)، وسبأ (كمال الملك والجزاء)، وفاطر (كمال الإبداع والتدبير).",
            "en": "Five chapters of the Qur'an open with 'Al-Hamdu Lillah', encompassing the foundations of all bounties and perfections: Al-Fatihah (perfection of guidance), Al-An'am (perfection of creation), Al-Kahf (perfection of revelation), Saba (perfection of sovereignty & judgment), and Fatir (perfection of divine origination).",
            "fr": "Cinq sourates du Noble Coran s'ouvrent par « Al-Hamdu Lillah », englobant l'intégralité des bienfaits et perfections divines : Al-Fatiha (guidance suprême), Al-An'am (création cosmique), Al-Kahf (Révélation et prophétie), Saba (souveraineté et rétribution) et Fatir (origination céleste et gestion angélique)."
          },
          "source": {
            "ar": "القرآن الكريم (الفاتحة 2، الأنعام 1، الكهف 1، سبأ 1، فاطر 1)",
            "en": "The Holy Qur'an (Al-Fatihah 2, Al-An'am 1, Al-Kahf 1, Saba 1, Fatir 1)",
            "fr": "Le Saint Coran (Al-Fatiha 2, Al-An'am 1, Al-Kahf 1, Saba 1, Fatir 1)"
          }
        },
        "vocabulary": [
          {
            "term": "حَمَدَ (جذر ح-م-د)",
            "meaning": {
              "ar": "نقيض الذم، وهو الثناء بالجميل الاختياري على المحمود باللسان مع محبة وتعظيم وإجلال.",
              "en": "The opposite of censure; praise directed to a voluntary act of good with love, awe, and veneration.",
              "fr": "Le contraire du blâme ; louange formulée par la parole sur une action noble et volontaire, accompagnée d'amour et de vénération."
            },
            "etymology": {
              "ar": "يدل على الرضا واستحقاق الثناء الخالص من كل عيب.",
              "en": "Indicates complete satisfaction and absolute worthiness of faultless praise.",
              "fr": "Indique la satisfaction complète et le mérite d'une louange exempte de tout défaut."
            }
          },
          {
            "term": "«الـ» الاسْتِغْرَاقِيَّةُ",
            "meaning": {
              "ar": "حرف التعريف الذي يفيد استغراق وشمول جميع أفراد الجنس، أي: كل أنواع المحامد والكمالات لله وحده.",
              "en": "The definitive particle denoting exhaustion/comprehensiveness: all conceivable praises belong solely to Allah.",
              "fr": "L'article défini indiquant l'exhaustivité totale : toutes les formes imaginables de louanges appartiennent exclusivement à Allah."
            }
          },
          {
            "term": "الْمَدْحُ",
            "meaning": {
              "ar": "الثناء على الجميل مطلقاً، سواء كان اختيارياً أو اضطرارياً (كمدح اللؤلؤ لصفائه، أو الجمال الخَلقي).",
              "en": "Praising beauty or quality in general, whether voluntary or involuntary (such as praising a pearl for its luster).",
              "fr": "L'éloge de la beauté en général, qu'elle soit volontaire ou innée (comme louer la pureté d'une perle)."
            }
          },
          {
            "term": "الشُّكْرُ",
            "meaning": {
              "ar": "الثناء على المنعم في مقابلة نعمة وصلت إليك، ويكون باللسان والجنان والأركان.",
              "en": "Gratitude expressed specifically in response to a bestowed favor, performed by tongue, heart, and limbs.",
              "fr": "La gratitude exprimée en réponse directe à un bienfait accordé, manifestée par la langue, le cœur et les actes des membres."
            }
          }
        ],
        "sharhChapters": [
          {
            "title": {
              "ar": "1. حقيقة مادة (ح-م-د) وسر بلاغة التعبير الاسمي",
              "en": "1. The Linguistic Root and the Subtlety of the Nominal Sentence",
              "fr": "1. L'essence de la racine (H-M-D) et l'éloquence de la phrase nominale"
            },
            "content": {
              "ar": "عُدِل عن الجملة الفعلية (نحمد الله) إلى الجملة الاسمية ﴿الْحَمْدُ لِلَّهِ﴾ للدلالة على الثبوت والدوام والاستمرار والاستحقاق الأزلي لله تعالى؛ فالحمد لله ثابت له سبحانه قبل أن يخلق الحامدين وبعد فنائهم، ولا يتوقف ثبوته على فعل حامد بشري.",
              "en": "The Qur'an uses the nominal sentence 'Al-Hamdu Lillah' instead of the verbal sentence 'Nahmadu Allah' (We praise Allah) to denote eternal stability, constancy, and timeless worthiness. Praise belongs to Allah eternally before the creation of praisers and after their passing, independent of human action.",
              "fr": "Le Coran privilégie la forme nominale 'Al-Hamdou Lillah' plutôt que la forme verbale 'Nous louons Allah' pour exprimer la permanence, la pérennité et le droit divin immuable et éternel. La louange est acquise à Allah avant même la création des êtres et après leur disparition."
            },
            "timestampSeconds": 0
          },
          {
            "title": {
              "ar": "2. الفروق الدقيقة الثلاثة: بين الحمد والمدح والشكر",
              "en": "2. The Three Nuanced Distinctions: Hamd vs Madh vs Shukr",
              "fr": "2. Les trois distinctions fondamentales : Hamd vs Madh vs Chukr"
            },
            "content": {
              "ar": "1) الحمد أخص من المدح: لأن المدح يكون على الجميل الاضطراري (كمدح الجو أو الجبل)، بينما الحمد لا يكون إلا على صفة كمال اختيارية مقرونة بالمحبة والإجلال.\n2) الحمد والشكر بينهما عموم وخصوص وجهي: فالحمد أعم متعلقاً (يُحمد الله على أسمائه وصفاته الذاتية وإنعامه) وأخص وسيلة (باللسان والقلب). بينما الشكر أعم وسيلة (باللسان والجوارح: ﴿اعْمَلُوا آلَ دَاوُودَ شُكْرًا﴾) وأخص سبباً (لا يكون إلا في مقابلة نعمة).",
              "en": "1) Hamd is more specific than Madh: Madh can describe non-voluntary beauty (like praising weather or a jewel), while Hamd only applies to voluntary perfection accompanied by reverence.\n2) Hamd & Shukr have an intersecting relationship: Hamd is broader in reason (Allah is praised for His majestic attributes and His blessings) and narrower in medium (tongue & heart). Shukr is broader in medium (tongue, heart, and limbs) but narrower in reason (only in response to a received blessing).",
              "fr": "1) Le Hamd est plus spécifique que le Madh : le Madh peut viser une qualité non volontaire (comme vanter un paysage), alors que le Hamd n'est voué qu'à une perfection volontaire empreinte d'amour et de révérence.\n2) Le Hamd et le Chukr se complètent : le Hamd est plus vaste par son motif (on loue Allah pour Ses Noms, Attributs et Bienfaits) et plus restreint par ses canaux (langue et cœur). Le Chukr est plus vaste par ses canaux (langue, cœur et actes concrets : 'Œuvrez, ô famille de David, avec gratitude') mais restreint à la réponse d'un don reçu."
            },
            "timestampSeconds": 320
          },
          {
            "title": {
              "ar": "3. دلالة استغراق الألف واللام واللام في «لِلَّهِ»",
              "en": "3. The Exhaustive Prefix 'Al-' and the Preposition 'Li-' (Belonging to Allah)",
              "fr": "3. La portée exhaustive de l'article 'Al-' et de la préposition 'Li-'"
            },
            "content": {
              "ar": "«الـ» في الحمد استغراقية تشمل كل محامد الأولين والآخرين. واللام في «لِلَّهِ» تفيد الاستحقاق والاختصاص والملك؛ فكل نعمة في الكون مصدرها الله، وكل كمال يراه العبد في المخلوقات فهو أثر من آثار صفات الخالق، فالمستحق الحقيقي للحمد المطلق هو الله وحده.",
              "en": "The prefix 'Al-' indicates totality: every single praise uttered by creation from beginning to end is gathered. The preposition 'Li-' establishes exclusive entitlement and divine ownership; every blessing originates from Allah, and any beauty witnessed in creation is merely a reflection of the Creator's perfection.",
              "fr": "L'article 'Al-' englobe la totalité des louanges passées, présentes et futures. La préposition 'Li-' confère la propriété exclusive et l'absolu mérite à Allah Seul ; toute grâce provient de Lui, et toute noblesse observée chez la créature n'est qu'un pâle reflet de la Perfection du Créateur."
            },
            "timestampSeconds": 780
          },
          {
            "title": {
              "ar": "4. الأسرار البيانية في افتتاح السور الخمس بالحمد",
              "en": "4. Rhetorical Mysteries of the Five Quranic Surahs Opening with Hamd",
              "fr": "4. Les secrets d'éloquence des cinq sourates débutant par la louange"
            },
            "content": {
              "ar": "السور الخمس التي افتتحت بالحمد تمثل أركان الوجود والكمال الإلهي:\n• الفاتحة: حمد على هداية الدين وأم الكتاب.\n• الأنعام: حمد على خلق الأجرام الكونية ﴿خَلَقَ السَّمَاوَاتِ وَالأَرْضَ﴾.\n• الكهف: حمد على الرسالة والتشريع ﴿أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ﴾.\n• سبأ: حمد على دوام الملك الأخروي والدنيوي ﴿وَلَهُ الْحَمْدُ فِي الْآخِرَةِ﴾.\n• فاطر: حمد على بديع التدبير وتصريف الملائكة ﴿فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ﴾.",
              "en": "The five Surahs opening with Hamd encapsulate all pillars of existence and divine perfection:\n• Al-Fatihah: Praise for guidance and spiritual foundation.\n• Al-An'am: Praise for cosmic creation of heavens and earth.\n• Al-Kahf: Praise for revelation and prophetic scripture.\n• Saba: Praise for perpetual kingdom in the Hereafter and Dunya.\n• Fatir: Praise for masterful angelic order and origination.",
              "fr": "Les cinq sourates inaugurées par Al-Hamd synthétisent les fondements de la création et de la souveraineté divine :\n• Al-Fatiha : Louange pour la guidance spirituelle et le salut.\n• Al-An'am : Louange pour la création cosmique des cieux et de la terre.\n• Al-Kahf : Louange pour la Révélation et le Livre sans déviation.\n• Saba : Louange pour la souveraineté éternelle d'ici-bas et de l'au-delà.\n• Fatir : Louange pour l'origination majestueuse et l'ordre angélique."
            },
            "timestampSeconds": 1100
          }
        ],
        "fawaid": [
          {
            "title": {
              "ar": "الفوائد التدبرية واللغوية للفظ الحمد",
              "en": "Linguistic & Contemplative Pearls of 'Al-Hamd'",
              "fr": "Perles linguistiques et méditations profondes sur 'Al-Hamd'"
            },
            "points": [
              {
                "ar": "الحمد أوسع أبواب معرفة الله، لأنه يجمع بين إثبات صفات الجلال والجمال وبين محبة المنعم.",
                "en": "Al-Hamd is the most expansive gateway to knowing Allah, combining the affirmation of Divine Majesty and Love for the Bestower.",
                "fr": "Al-Hamd est la porte la plus vaste pour connaître Allah, alliant l'affirmation des Attributs de Majesté et l'amour sincère du Donateur."
              },
              {
                "ar": "قول «الحمد لله» يملأ الميزان كما صح في الحديث النبوي، لشمولها كل محامد الوجود.",
                "en": "Uttering 'Al-Hamdu Lillah' fills the scale on the Day of Judgment because it encompasses all perfections of existence.",
                "fr": "Prononcer 'Al-Hamdu Lillah' remplit la balance des bonnes actions car cela englobe la totalité des perfections existantes."
              },
              {
                "ar": "سر تكرار الحمد في كل ركعة من الصلاة: تجديد العهد مع استحقاق الله الكامل للثناء والعبودية.",
                "en": "The secret of repeating Hamd in every prayer unit: constantly renewing our pledge to Allah's absolute entitlement to adoration.",
                "fr": "Le secret de la répétition du Hamd à chaque unité de prière : renouveler sans cesse l'alliance avec la seigneurie et le culte exclusif d'Allah."
              }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": {
              "ar": "ما الفارق الدقيق بين 'الحمد' و'المدح' في لغة القرآن واللسان العربي؟",
              "en": "What is the precise difference between 'Hamd' and 'Madh' in the Quranic and Arabic lexicon?",
              "fr": "Quelle est la différence précise entre 'Hamd' et 'Madh' dans la langue arabe et le Coran ?"
            },
            "options": [
              {
                "ar": "الحمد لا يكون إلا على فعل اختياري ومقروناً بالمحبة والتعظيم، بينما المدح يصح على الجميل الاضطراري (كالجمال أو الطبيعة).",
                "en": "Hamd is only for voluntary acts accompanied by love and veneration, whereas Madh can praise involuntary natural beauty.",
                "fr": "Le Hamd ne s'adresse qu'à un acte volontaire empreint d'amour et de révérence, tandis que le Madh s'applique aussi à la beauté naturelle innée."
              },
              {
                "ar": "المدح خاص بالخالق وحده، والحمد يصح للمخلوق فقط.",
                "en": "Madh is exclusive to the Creator while Hamd is only for creatures.",
                "fr": "Le Madh est réservé au Créateur et le Hamd aux créatures."
              },
              {
                "ar": "الحمد يكون في الشدائد فقط، والمدح في الرخاء فقط.",
                "en": "Hamd is only in hardship, Madh only in ease.",
                "fr": "Le Hamd ne se dit que dans l'épreuve, et le Madh dans la prospérité."
              }
            ],
            "correctIndex": 0,
            "explanation": {
              "ar": "المدح أعم من الحمد؛ يمدح اللؤلؤ لصفائه (وهو أمر اضطراري)، لكن لا يحمد إلا الفاعل المختار على كماله وإحسانه مع الحب والتعظيم.",
              "en": "Madh is broader and can praise non-voluntary attributes (like a shiny gem), but Hamd is strictly for voluntary perfection with love and veneration.",
              "fr": "Le Madh est plus général et peut flatter un objet ou une qualité involontaire, alors que le Hamd exige une volonté suprême et un amour respectueux."
            }
          },
          {
            "question": {
              "ar": "كم سورة في القرآن الكريم افتتحت بلفظ ﴿الْحَمْدُ لِلَّهِ﴾؟",
              "en": "How many Surahs in the Holy Qur'an open directly with 'Al-Hamdu Lillah'?",
              "fr": "Combien de sourates dans le Saint Coran débutent directement par 'Al-Hamdu Lillah' ?"
            },
            "options": [
              {
                "ar": "خمس سور: (الفاتحة، الأنعام، الكهف، سبأ، فاطر).",
                "en": "Five Surahs: (Al-Fatihah, Al-An'am, Al-Kahf, Saba, Fatir).",
                "fr": "Cinq sourates : (Al-Fatiha, Al-An'am, Al-Kahf, Saba, Fatir)."
              },
              {
                "ar": "ثلاث سور فقط.",
                "en": "Three Surahs only.",
                "fr": "Trois sourates seulement."
              },
              {
                "ar": "عشر سور.",
                "en": "Ten Surahs.",
                "fr": "Dix sourates."
              }
            ],
            "correctIndex": 0,
            "explanation": {
              "ar": "استفتحت هذه السور الخمس بالحمد لما تضمنته كل سورة من ركن جامع من أركان الخلق والتشريع والهداية والملكوت.",
              "en": "These five chapters open with Hamd because each represents a monumental pillar of creation, revelation, guidance, and sovereignty.",
              "fr": "Ces cinq sourates s'ouvrent par la louange car chacune incarne un pilier universel de la création, de la loi révélée, de la guidance et de la royauté suprême."
            }
          }
        ],
        "reflectionPrompt": {
          "ar": "حين تقف في صلاتك وتقول ﴿الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ﴾: كيف تستشعر استغراق هذا اللفظ لكل نعمة أُسديت إليك وإلى الخلق أجمعين، فتتحول صلاتك من مجرد ترديد إلى فيض من الشكر والمحبة لله؟",
          "en": "When you stand in prayer and proclaim 'Al-Hamdu Lillahi Rabbil Alameen': how do you feel the vastness of this word embracing every blessing bestowed on you and all creation, turning your prayer from routine recitation into an overflowing spring of love and gratitude?",
          "fr": "Lorsque vous vous tenez en prière et récitez 'Al-Hamdu Lillahi Rabbil Alamin' : comment ressentez-vous la plénitude de cette parole qui embrasse chaque grâce accordée à vous et à l'univers entier, transformant votre prière d'une simple récitation en une source d'amour et de gratitude vibrante ?"
        }
      }
    ]
  }
];

export function getProjectBySlug(slug: string): JalsaProject | undefined {
  return JALSA_PROJECTS.find((p) => p.slug === slug);
}

export function getMajlisBySlug(projectSlug: string, majlisSlug: string): { project?: JalsaProject; majlis?: MajlisSession } {
  const project = getProjectBySlug(projectSlug);
  const majlis = project?.majalis.find((m) => m.slug === majlisSlug);
  return { project, majlis };
}
