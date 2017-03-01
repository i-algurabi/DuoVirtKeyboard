// ==UserScript==
// @name			DuoTweak
// @namespace		duolingo
// @description		Useful add-on for Duolingo | based on Lifeshade's user script DuoTweak v.1.1.1, 2017 | visit https://www.duolingo.com/comment/7619770
// @version			0.0.25
// @author			IceCube aka i.algurabi, (c) 2017
// @include			https://*.duolingo.com/*
// @updateURL		http://127.0.0.1:8887/DuoTweak.meta.js
// @downloadURL		http://127.0.0.1:8887/DuoTweak.user.js
// @grant			none
// ==/UserScript==

dt_text = {
    w335: { //Save changes
        en: "Save changes",
        ru: "Сохранить изменения",
        uk: "Зберегти зміни",
        ar: "حفظ التغييرات"
    },
    w757: { //Saved
        en: "Saved",
        ru: "Сохранено",
        uk: "Збережено",
        ar: "تم الحفظ"
    },
    w432: { //Error
        en: "Error",
        ru: "Ошибка",
        uk: "Помилка",
        ar: "خطأ"
    },
    w830: { //Reset settings
        en: "Reset settings",
        ru: "Сбросить настройки",
        uk: "Скинути налаштування",
        ar: "اعادة الضبط"
    },
    w950: { //This will reset all DuoTweak settings to default values
        en: "It will reset all DuoTweak settings to default values.",
        ru: "Это сбросит все настройки DuoTweak на стандартные значения.",
        uk: "Це скине всі налаштування DuoTweak на стандартні значення.",
        ar: "هذا سيعيد ضبت كافة الإعدادات DuoTweak إلى القيم الافتراضية"
    },
    w586: { //Select required functions
        en: "Select required functions",
        ru: "Выберите необходимые функции",
        uk: "Виберіть потрібні функції",
        ar: "اخترالمهام المطلوبة"
    },
    SETTINGS_TWEAK_575: { //Marks in friend list view
        en: "Marks in friend list view",
        ru: "Отметки при просмотре списка друзей",
        uk: "Відмітки при перегляді списку друзів",
        ar: "علامات في قائمة الأصدقاء"
    },
    SETTINGS_TWEAK_657: { //Highlight new comments
        en: "Highlight new comments",
        ru: "Просмотр новых комментариев",
        uk: "Перегляд нових коментарів",
        ar: "تمييز التعليقات الجديدة"
    },
    SETTINGS_TWEAK_658: { //Advanced details about comments
        en: "Advanced details about comments",
        ru: "Расширенные сведения о комментариях",
        uk: "Розширені дані про коментарі",
        ar: "تفاصيل موسعة حول تعليقات"
    },
    SETTINGS_TWEAK_408: { //Lexicon in main menu
        en: "Lexicon in main menu",
        ru: "Словарь в главном меню",
        uk: "Словник у головному меню",
        ar: "المعجم في القائمة الرئيسية"
    },
    SETTINGS_TWEAK_994: { //Keyboard layout auto-changing
        en: "Automatic change of keyboard layout",
        ru: "Автоматическая смена раскладки клавиатуры",
        uk: "Автоматична зміна розкладки клавіатури",
        ar: "التغيير التلقائي لتخطيط لوحة المفاتيح"
    },
    SETTINGS_TWEAK_415: { //Custom daily goal
        en: "Custom daily goal",
        ru: "Установка своей ежедневной цели",
        uk: "Встановлення власної щоденної мети",
        ar: "هدف يومي مخصص"
    },
    SETTINGS_TWEAK_561: { //Expand a search field
        en: "Expand a search field",
        ru: "Разворачивание формы поиска",
        uk: "Розгортання форми пошуку",
        ar: "توسيع حقل البحث"
    },
    SETTINGS_TWEAK_111: { //Quick language switching
        en: "Quick language switching",
        ru: "Быстрое переключение между языками",
        uk: "Швидкий перехід між мовними курсами",
        ar: "تبديل اللغة السريع"
    },
    SETTINGS_TWEAK_894: { //Detailed user information
        en: "Detailed user information",
        ru: "Детальная информация о пользователе",
        uk: "Детальна інформація про користувача",
        ar: "معلومات مفصلة عن المستخدم"
    },
    SETTINGS_TWEAK_576: { //Information about your progress
        en: "Information about your progress",
        ru: "Информация о вашем прогрессе",
        uk: "Інформація про ваш прогрес",
        ar: "معلومات حول تقدمك"
    },
    SETTINGS_TWEAK_431: { //Setting end of the streak day
        en: "Setting end of the streak day",
        ru: "Настройка времени окончания ударного дня",
        uk: "Налаштування часу закінчення активного дня",
        ar: "تحديد وقت انتها يوم الحماسة"
    },
    SETTINGS_TWEAK_251: { //Speech of words in Immersion
        en: "Pronounce words at Immersion",
        ru: "Озвучивание слов в Погружении",
        uk: "Озвучення слів у Зануренні",
        ar: "نطق الكلمات عند الانغمار"
    },
    w354: { //Consider comments as new
        en: "Consider comments as new",
        ru: "Считать комментарии новыми в течение",
        uk: "Вважати коментарі новими протягом",
        ar: "تعتبر التعليقات جديدة لمدة"
    },
    w832: { //hours
        en: "hours",
        ru: "часов",
        uk: "годин",
        ar: "ساعات"
    },
    w933: { //User CSS
        en: "User CSS",
        ru: "Свой CSS",
        uk: "Свій CSS",
        ar: "CSS المستخدم"
    },
    w525: { //at one's own risk
        en: "at one\x27s own risk",
        ru: "на свой страх и риск",
        uk: "на свій страх і ризик",
        ar: "على مسؤوليتك"
    },
    w245: { //School
        en: "School",
        ru: "Школа",
        uk: "Школа",
        ar: "المدرسة"
    },
    w961: { //New messages
        en: "New messages",
        ru: "Новые сообщения",
        uk: "Нові повідомлення",
        ar: "رسائل جديدة"
    },
    w742: { //Follows you
        en: "Follow you",
        ru: "Наблюдает за вами",
        uk: "Підписаний на вас",
        ar: "يتابعك"
    },
    w539: { //Not follow you
        en: "Not follow you",
        ru: "Не наблюдает за вами",
        uk: "Не підписаний на вас",
        ar: "لا يتابعك"
    },
    w906: { //Lexicon
        en: "Lexicon",
        ru: "Словарь",
        uk: "Словник",
        ar: "المعجم"
    },
    w512: { //Custom
        en: "Custom",
        ru: "Своя",
        uk: "Свій",
        ar: "إعداد مخصص"
    },
    w487: { //Direct link to the comment
        en: "Direct link to the comment",
        ru: "Прямая ссылка на комментарий",
        uk: "Пряме посилання на коментар",
        ar: "رابط مباشر للتعليق"
    },
    w582: { // min ago
        en: " min ago",
        ru: " мин назад",
        uk: " хв тому",
        ar: " دقائق مضت"
    },
    w195: { // h ago
        en: " h ago",
        ru: " ч назад",
        uk: " год тому",
        ar: " ساعات مضت"
    },
    w734: { //yesterday
        en: "yesterday",
        ru: "вчера",
        uk: "вчора",
        ar: "أمس"
    },
    w290: { //FROM [language]
        en: "FROM",
        ru: "С ЯЗЫКА",
        uk: "З МОВИ",
        ar: "من اللغة"
    },
    w306: { //Registered:
        en: "Registered: ",
        ru: "Зарегистрирован\x28а\x29: ",
        uk: "Зареєстрований\x28а\x29",
        ar: "مسجل: "
    },
    w530: { //Streak freeze was bought on
        en: "Streak freeze was bought ",
        ru: "Заморозка куплена ",
        uk: "Замороження придбано ",
        ar: "تم شراء تجميد الحماسة في"
    },
    w926: { //Lingots
        en: "Lingots",
        ru: "Линготы",
        uk: "Лінготи",
        ar: "لينجوت"
    },
    w202: { //Daily goal
        en: "Daily goal",
        ru: "Ежедневная цель",
        uk: "Щоденна мета",
        ar: "الهدف اليومي"
    },
    w164: { //Total:
        en: "Total: ",
        ru: "Всего: ",
        uk: "Всього: ",
        ar: "المجموع: "
    },
    w953: { //Next level:
        en: "Next level: ",
        ru: "След. уровень: ",
        uk: "Наст. рівень: ",
        ar: "المستوى التالي:"
    },
    w315: { //Current language
        en: "Current language",
        ru: "Текущий язык",
        uk: "Поточна мова",
        ar: "اللغة الحالية"
    },
    w857: { //Show tree
        en: "Show tree",
        ru: "Показать дерево",
        uk: "Показати дерево",
        ar: "عرض الشجرة"
    },
    w730: { //Skill tree
        en: "Skill tree",
        ru: "Дерево навыков",
        uk: "Дерево навичок",
        ar: "شجرة المهارات"
    },
    w719: { //Course is completed by
        en: "Course is completed by ",
        ru: "Курс пройден на ",
        uk: "Курс пройдено на ",
        ar: "اكتمال الدورة بنسبة "
    },
    w692: { //Level -
        en: "Level - ",
        ru: "Уровень - ",
        uk: "Рівень - ",
        ar: "المستوى - "
    },
    w809: { // - lvl
        en: " - lvl ",
        ru: " - ур. ",
        uk: " - рів. ",
        ar: "المستوى - "
    },
    w662: { //Completed %1 of %2 lessons
        en: "Completed %1 of %2 lessons",
        ru: "Завершено %1 уроков из %2",
        uk: "Завершено %1 уроків з %2",
        ar: "تم اكتمال %1  درس من الاجمالي %2 دروس"
    },
    w707: { //Go to top
        en: "Go to top",
        ru: "Перейти наверх",
        uk: "Перейти наверх",
        ar: "إذهب للأعلى"
    },
    w349: { //New comments for %1 h
        en: "New comments for %1 h",
        ru: "Новые коммент. за %1 ч",
        uk: "Нові комент. за %1 г",
        ar: "تعليقات جديدة لمدة %1 ساعة"
    },
    w798: { //Keyboard layout changing
        en: "Keyboard layout changing",
        ru: "Автоматическая смена раскладки",
        uk: "Автоматична зміна розкладки",
        ar: "تغيير تخطيط لوحة المفاتيح"
    }
};
wg5 = {
    ragwit_url: "https://cdn.rawgit.com/Lifeshade/duolingo/61fbde14/DuoTweak/",
    duoTweak_version: "0.0.25",
    duoTweak_thread_id: 7619770,
    HeadwayCourse_id: 50650011,
    duoTweak_CSS: (".beta-ribbon-container {margin-top: 60px;}" +
                   "div.discussion-main-detail span.divider {margin: 0 7px 0 0}" +
                   ".dt_settings-list li {padding: 6px 0;}" +
                   "a.dt_show-comment-code.active {color: red;}" +
                   "html[dir=\x22rtl\x22] span.dt_translate {color: #7EB530; float: left; font-size: smaller;}" +
                   "html[dir=\x22ltr\x22] span.dt_translate {color: #7EB530; float: right; font-size: smaller;}" +
                   "span.dt_translate.dt_not-found {color: red;}" +
                   "html[dir=\x22ltr\x22] .dt-base_languages {display: none; left: 180px !important; top: -15px !important;}" +
                   "html[dir=\x22rtl\x22] .dt-base_languages {display: none; right: 180px !important; top: -15px !important;}" +
                   "html[dir=\x22rtl\x22] #dt-comments_nav {position: fixed; left: 5%; top: 40%; width: 55px; background-color: rgba(60, 180, 255, 0.9); border-radius: 100px; box-shadow: 0 0 4px gray; padding: 25px 2px; color: white; text-align: center; white-space: nowrap;}" +
                   "html[dir=\x22ltr\x22] #dt-comments_nav {position: fixed; right: 5%; top: 40%; width: 55px; background-color: rgba(60, 180, 255, 0.9); border-radius: 100px; box-shadow: 0 0 4px gray; padding: 25px 2px; color: white; text-align: center; white-space: nowrap;}" +
                   ".dt-comments_nav-page_top {margin-bottom: 30px; font-size: 28pt;}" +
                   ".dt-comments_nav-page_top, .dt-comments_nav-prev, .dt-comments_nav-next {cursor: pointer;}" +
                   ".dt-comments_nav-page_top:hover {color: #D00000;}" +
                   ".dt-comments_nav-prev, .dt-comments_nav-next {font-size: 16pt;}" +
                   ".dt-comments_nav-prev:hover, .dt-comments_nav-next:hover {color: green;}" +
                   ".dt-comments_nav-selected {border: 1px dotted red;}" +
                   "ul.topbar-nav-main.dt-compact_topbar > li a {padding-left: 10px; padding-right: 10px;}" +
                   ".dt-current_lang {margin: 10px 0 30px 0; color: #808080;}" +
                   "html[dir=\x22ltr\x22] .dt-current_lang-item {padding-left: 15px; font-weight: bold;}" +
                   "html[dir=\x22rtl\x22] .dt-current_lang-item {padding-right: 15px; font-weight: bold;}" +
                   ".dt-deleted_comment .body {color: gray; text-decoration: line-through;}" +
                   ".dt-deleted_comment:hover .body {color: #333; text-decoration: none;}" +
                   "#dt-duotweak_logo {margin: 35px 0px 0px 16px; white-space: nowrap; color: white;}" +
                   "#dt-duotweak_logo a {color: white;}" +
                   ".dt-duotweak_logo-name {font-size: 20px; padding: 0 3px;}" +
                   ".dt-duotweak_logo-name:hover {text-decoration: underline;}" +
                   ".dt-duotweak_logo-with {position: relative; top: -10px; font-size: 14px; font-style: italic;}" +
                   ".dt-expanded_search {display: block; float: none;}" +
                   ".dt-expanded_search #search-comments, .dt-expanded_search #search-translations {width: 100%;}" +
                   "html[dir=\x22ltr\x22] .dt-flag-offset {left: 8px !important; top: 4px !important;}" +
                   "html[dir=\x22rtl\x22] .dt-flag-offset {right: 8px !important; top: 4px !important;}" +
                   "html[dir=\x22rtl\x22] .dt-follower_smile {float: left; margin: 9px 5px 0 0;}" +
                   "html[dir=\x22ltr\x22] .dt-follower_smile {float: right; margin: 9px 5px 0 0;}" +
                   "#dt-goal_setter {width: 100px;}" +
                   ".dt-hided_flairs {padding: 0px 4px; text-align: center; cursor: pointer; background-color: #FFFFC0; font-size: smaller;}" +
                   ".dt-hided_flairs:hover {background-color: #FFFF00;}" +
                   ".dt-icon-streakfreeze_micro {width: 14px; height: 18px; display: inline-block; vertical-align: middle; background-image: url\x28\x27//d7mj4aqfscim2.cloudfront.net/images/store-sprite-1.svg\x27\x29; background-position: -52px -4px; background-size: 120px auto;}" +
                   ".dt-icon-streakfreeze_small {width: 19px; height: 25px; display: inline-block; vertical-align: middle; background-image: url\x28\x27//d7mj4aqfscim2.cloudfront.net/images/store-sprite-1.svg\x27\x29; background-position: -80px -6px; background-size: 180px auto;}" +
                   "#dt-keyboard_layout {font-size: 10pt;}" +
                   ".dt-modal-language_name {text-align: center; padding: 10px; color: #808080; margin: 0;}" +
                   ".dt-modal-skill_tree .modal-body {overflow-x: auto; max-height: 500px; padding-top: 0;}" +
                   ".dt-modal-skill_tree .modal-footer {padding: 10px 0;}" +
                   ".dt-modal-skill_tree .modal-header {padding-top: 10px;}" +
                   "html[dir=\x22ltr\x22] .dt-modal-skill_tree {width: 800px; margin-left: -400px; top: 5%; margin-top: 0;}" +
                   "html[dir=\x22rtl\x22] .dt-modal-skill_tree {width: 800px; margin-right: -400px; top: 5%; margin-top: 0;}" +
                   "#dt-new_comments_time {width: 80px;}" +
                   "#dt-new_messages.hidden {display: none;}" +
                   "#dt-new-skills {background:rgba(0,255,0,0.3);}" +
                   ".dt-progress_level .level-current {color: dodgerblue; background-color: skyblue;}" +
                   ".dt-progress_level .padder .bar {background-color: skyblue; background-image: none; max-width: 100%;}" +
                   ".dt-progress_level {width: 50%;}" +
                   ".dt-progress_thin .padder .bar {max-width: 100%; height: 10px; border-radius: 100px;}" +
                   ".dt-progress_thin .padder {margin: 0;}" +
                   ".dt-progress_thin {height: 10px;}" +
                   "html[dir=\x22ltr\x22] .dt-progress_title {padding-left: 30px; font-style: italic;}" +
                   "html[dir=\x22rtl\x22] .dt-progress_title {padding-right: 30px; font-style: italic;}" +
                   ".dt-streak_nano {width: 9px; height: 11px; display: inline-block; vertical-align: none; background-position: -135px -42px; background-size: 600px auto;}" +
                   "#dt-strengthen-skills {background:rgba(255,162,0,0.3);}" +
                   "#dt-strengthen-skills, #dt-new-skills {border-radius:10px; min-height:60px; padding:5px 0px 0px 0px;}" +
                   ".dt-timeleft-setter {cursor: pointer; position: relative; top: 2px; padding: 0 2px; font-size: 20px;}" +
                   ".dt-timeleft-value {padding: 0 5px;}" +
                   ".dt-user_created {margin-bottom: 20px;}" +
                   "#dt-usercss {margin-bottom: 10px; width: 334px; font-family: \x27Courier New\x27; font-size: smaller; line-height: 1.2;}" +
                   "html[dir=\x22ltr\x22] .dt-userinfo-flag {position:relative; top:18px; right:13px}" +
                   "html[dir=\x22rtl\x22] .dt-userinfo-flag {position:relative; top:18px; left:13px}" +
				   "html[dir=\x22ltr\x22] .dt-userinfo-fluency {position: relative;top:45px;left:-8px;font-size: 18px;}" +
				   "html[dir=\x22rtl\x22] .dt-userinfo-fluency {position: relative;top:45px;right:-8px;font-size: 18px;}" +
				   ".dt-userinfo-fluency-percent {font-size: 10px;top: -4px;position: relative;}" +
                   ".dt-warning {font-size: smaller; color: red;}" +
                   ".fgh-comment {}" +
				   "html[dir=\x22ltr\x22] .gray {margin-left: 5px;}" + 
				   "html[dir=\x22rtl\x22] .gray {margin-right: 5px;}" + 
                   "html[dir=\x22rtl\x22] .icon-linkedin-box {position:relative; left: 85px;}" +
                   ".language-choice span:nth-child\x282\x29 {text-transform: capitalize;}" +
                   ".profile-language {padding: 2px 5px 2px 5px;}" +
                   ".profile-language-list .language-info {padding-top: 2px;}" +
                   ".profile-language-list {margin-bottom: 15px; cursor: pointer;}" +
                   ".profile-language:hover {background-color: #e9f9e9;border-radius: 12px;}" +
                   ".progress-bar-dynamic .backing {z-index: 0;}" +
                   ".progress-bar-dynamic .skill-icon-container {z-index: 1;}" +
                   "#stream-container > ul > li > ul > li.show-comments > a {border-radius:4px; width:22px;height:24px;background-color:#e8e1e1;background-position: -178px -39px;;background-image: url(\x22//d7mj4aqfscim2.cloudfront.net/images/icon-sprite_mv_40d9ee71dad506bea119d03a254664b1.svg\x22);}" +
                   "#stream-container > ul > li > ul > li.upvotes > a {width: 22px;height: 24px;background-color:#e8e1e1;opacity: 0.5;border-radius:4px;background-position: -398px -40px;background-image: url(\x22//d7mj4aqfscim2.cloudfront.net/images/icon-sprite_mv_40d9ee71dad506bea119d03a254664b1.svg\x22);}" +
                   "#stream-container > ul > li > ul > li.show-comments > a:hover {background-color:#cac4c4;}" +
                   "#stream-container > ul > li > ul > li.upvotes > a:hover {opacity: 1;}"),
    duoTweak_settings: {
        tweaks: {
            _408: 1,
            _431: 1,
            _415: 1,
            _111: 1,
            _576: 1,
            _575: 1,
            _894: 1,
            _561: 1,
            _657: 1,
            _658: 1,
            _994: 1,
            _251: 1
        },
        new_comments_time: 24,
        usercss: "  .dt-new_comment .body {background-color: #E0FFE0;}\x0A  #app.wiki-translation .sentence.low-quality {color: firebrick;}\x0A  .translation-sidebar .legend-circle.needs-checking {color: firebrick;}"
    },
    user_id: 0,
    user_name: "",
    ui_language: "",
    learning_language: "",
    get_learning_courses: null,
    dt_new_messages: [],
    dt_who_follows_back: {
        loaded: false,
        good: [],
        bad: []
    },
    dt_comments_nav: {
        locked: false,
        dt_comments_arr: [],
        pos: -1,
        reset: function () {
            this.locked = false;
            this.dt_comments_arr = [];
            this.pos = -1;
        },
        dt_get_comment: function (t31) {
            if (t31 === undefined) {
                t31 = 1;
            }
            this.pos += t31;
            if (this.pos < 0) {
                this.pos = this.dt_comments_arr.length - 1;
            } else {
                if (this.pos >= this.dt_comments_arr.length) {
                    this.pos = 0;
                }
            }
            return this.dt_comments_arr[this.pos];
        }
    },
    dt_bitmask: {
        dt_date_obj: {
            dt_years_since_2015: {
                binary_length: 5,
                value: null,
                init: function () {
                    this.value = new Date().getFullYear() - 2015;
                    if (this.value < 0 || this.value > 30) {
                        this.value = 0x1F;
                    }
                }
            },
            dt_current_month: {
                binary_length: 4,
                value: null,
                init: function () {
                    this.value = new Date().getMonth() + 1;
                }
            },
            dt_current_dayn: {
                binary_length: 5,
                value: null,
                init: function () {
                    this.value = new Date().getDate();
                }
            }
        },
        create: function (t32) {
            var t33 = 0;
            if (t32 === undefined) {
                t32 = 0;
                for (var t34 in this.dt_date_obj) {
                    this.dt_date_obj[t34].init();
                    t32 |= this.dt_date_obj[t34].value << t33;
                    t33 += this.dt_date_obj[t34].binary_length;
                }
            } else {
                for (var t34 in this.dt_date_obj) {
                    this.dt_date_obj[t34].value = t32 >> t33 & ((1 << this.dt_date_obj[t34].binary_length) - 1);
                    t33 += this.dt_date_obj[t34].binary_length;
                }
            }
            return t32;
        }
    },
    dt_keyboard_settings: {
		supported: function(lang){
			var result = this.layout_map[lang];
			if (!result) {
				result = this.supported_lang.indexOf(lang);
			}
			return result;
		},
        supported_lang: ["en", "ru", "ar"],
		layout_map:{"fr":"0"},
        special_chars: ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12",
                        "insert", "delete", "pageup", "pagedown", "home", "end", "numlock",
                        "arrowright", "arrowleft", "arrowup", "arrowdown"],
        dt_keycode_arr: { //keyCode: [en, ru, ar]
            39: ["'", "э", "ط"],
            44: [",", "б", "و"],
            46: [".", "ю", "ز"],
            47: ["/", ".", "ظ"],
            59: [";", "ж", "ك"],
            65: ["a", "ф", "ش"],
            66: ["b", "и", "لا"],
            67: ["c", "с", "ؤ"],
            68: ["d", "в", "ي"],
            69: ["e", "у", "ث"],
            70: ["f", "а", "ب"],
            71: ["g", "п", "ل"],
            72: ["h", "р", "ا"],
            73: ["i", "ш", "ه"],
            74: ["j", "о", "ت"],
            75: ["k", "л", "ن"],
            76: ["l", "д", "م"],
            77: ["m", "ь", "ة"],
            78: ["n", "т", "ى"],
            79: ["o", "щ", "خ"],
            80: ["p", "з", "ح"],
            81: ["q", "й", "ض"],
            82: ["r", "к", "ق"],
            83: ["s", "ы", "س"],
            84: ["t", "е", "ف"],
            85: ["u", "г", "ع"],
            86: ["v", "м", "ر"],
            87: ["w", "ц", "ص"],
            88: ["x", "ч", "ء"],
            89: ["y", "н", "غ"],
            90: ["z", "я", "ئ"],
            186: [";", "ж", "ك"],
            188: [",", "б", "و"],
            190: [".", "ю", "ز"],
            191: ["/", ".", "ظ"],
            192: ["`", "ё", "ذ"],
            219: ["[", "х", "ج"],
            221: ["]", "ъ", "د"],
            222: ["'", "э", "ط"]
        },
        dt_keycode_arr_SHIFT: { //keyCode: [en, ru, ar]
            39: ["\x22", "Э", "\x22"],
            44: ["<", "Б", ","],
            46: [">", "Ю", "."],
            47: ["?", ",", "؟"],
            59: [":", "Ж", ":"],
            65: ["A", "Ф", "\x650"],
            66: ["B", "И", "لآ"],
            67: ["C", "С", "\x7D"],
            68: ["D", "В", "\x5D"],
            69: ["E", "У", "ُ"],
            70: ["F", "А", "\x5B"],
            71: ["G", "П", "لأ"],
            72: ["H", "Р", "أ"],
            73: ["I", "Ш", "÷"],
            74: ["J", "О", "ـ"],
            75: ["K", "Л", "،"],
            76: ["L", "Д", "/"],
            77: ["M", "Ь", "’"],
            78: ["N", "Т", "آ"],
            79: ["O", "Щ", "×"],
            80: ["P", "З", "؛"],
            81: ["Q", "Й", "َ"],
            82: ["R", "К", "ٌ"],
            83: ["S", "Ы", "ٍ"],
            84: ["T", "Е", "لإ"],
            85: ["U", "Г", "‘"],
            86: ["V", "М", "\x7B"],
            87: ["W", "Ц", "ً"],
            88: ["X", "Ч", "ْ"],
            89: ["Y", "Н", "إ"],
            90: ["Z", "Я", "~"],
            186: [":", "Ж", ":"],
            188: ["<", "Б", ","],
            190: [">", "Ю", "."],
            191: ["?", ",", "؟"],
            192: ["~", "Ё", ""],
            219: ["\x7B", "Х", "<"],
            221: ["\x7D", "Ъ", ">"],
            222: ["\x22", "Э", "\x22"]
        },
        autochange: true,
        indicator_displayed: false
    },
    dt_patches_obj: {
        duo_user_attrs: null,
        set_TZ_offset: 0,
        set_sound_patch: 0,
        dt_comment_id: 0
    },
    dt_goal_setter: function () {
        if (!$("input#dt-goal_setter").length) {
            $("#settings_tab").append("<li id=\x22dt-settings_link\x22><a href=\x22javascript:;\x22>DuoTweak</a></li>");
        }
    },
    dt_settings_menu: function () {
        var t35 = $("#tab-container");
        t35.empty();
        t35 = $("<div id=\x22dt-settings\x22 class=\x22settings-content\x22></div>").appendTo(t35);
        t35.append("<button class=\x22btn btn-green right\x22 type=\x22button\x22 id=\x22dt-settings-save\x22 disabled=\x22disabled\x22>" + wg5.dt_getPhraseForUI(dt_text.w335) + "</button>", "<div class=\x22hidden save-message\x22 id=\x22confirmation-message\x22>" + wg5.dt_getPhraseForUI(dt_text.w757) + "</div>", "<div class=\x22hidden error-message\x22 id=\x22error-message\x22>" + wg5.dt_getPhraseForUI(dt_text.w432) + "</div>", "<h1>DuoTweak</h1>");
        t35 = $("<ul class=\x22list-settings\x22></ul>").appendTo(t35);
        var t36 = $("<ul id=\x22dt-tweakslist\x22 class=\x22dt_settings-list\x22></ul>");
        for (var t37 in wg5.duoTweak_settings.tweaks) {
            t36.append("<li><label><input type=\x22checkbox\x22 class=\x22border\x22 " + (wg5.duoTweak_settings.tweaks[t37] ? "checked=\x22checked\x22" : "") + " id=\x22dt-tweak" + t37 + "\x22/>" + wg5.dt_getPhraseForUI(dt_text["SETTINGS_TWEAK" + t37]) + "</label></li>");
        }
        
		t35.append($("<li></li>").append("<label class=\x22label\x22>" + wg5.dt_getPhraseForUI(dt_text.w586) + "</label>", $("<div class=\x22input\x22></div>").append(t36)), "<li><label class=\x22label\x22>" + wg5.dt_getPhraseForUI(dt_text.w354) + "</label><div class=\x22input\x22><br/><input type=\x22number\x22 value=\x22" + wg5.duoTweak_settings.new_comments_time + "\x22 id=\x22dt-new_comments_time\x22 min=\x220\x22 max=\x22336\x22> " + wg5.dt_getPhraseForUI(dt_text.w832) + "</div></li>", "<li><label class=\x22label\x22>" + wg5.dt_getPhraseForUI(dt_text.w933) + "<div class=\x22dt-warning\x22>" + wg5.dt_getPhraseForUI(dt_text.w525) + "</div></label><div class=\x22input\x22><textarea cols=\x2240\x22 rows=\x223\x22 id=\x22dt-usercss\x22>" + wg5.duoTweak_settings.usercss + "</textarea></div></li>");
        $("#dt-settings").append("<hr/><div style=\x22text-align: center;\x22><button class=\x22btn btn-red\x22 type=\x22button\x22 id=\x22dt-settings-reset\x22>" + wg5.dt_getPhraseForUI(dt_text.w830) + "</button></div>");
    },
    dt_settings_save: function () {
        if (window.localStorage === undefined) {
            return false;
        }
        for (var t38 in wg5.duoTweak_settings) {
            if (t38 == "tweaks") {
                for (var t37 in wg5.duoTweak_settings.tweaks) {
                    wg5.dt_saveToLocalStorage("settings.tweak" + t37, wg5.duoTweak_settings.tweaks[t37]);
                }
            } else {
                wg5.dt_saveToLocalStorage("settings." + t38, wg5.duoTweak_settings[t38]);
            }
        }
        return true;
    },
    dt_syncWithLocalStorage: function () {
        for (var t38 in wg5.duoTweak_settings) {
            if (t38 == "tweaks") {
                for (var t37 in wg5.duoTweak_settings.tweaks) {
                    var t39 = wg5.dt_getFromLocalStorage("settings.tweak" + t37);
                    if (t39 !== undefined) {
                        wg5.duoTweak_settings.tweaks[t37] = t39 == "0" ? 0 : 1;
                    }
                }
            } else {
                var t39 = wg5.dt_getFromLocalStorage("settings." + t38);
                if (t39 !== undefined) {
                    wg5.duoTweak_settings[t38] = t39;
                }
            }
        }
        wg5.duoTweak_settings.new_comments_time *= 1;
        if (wg5.duoTweak_settings.usercss.indexOf(".dt-new_comment {") != -1) {
            wg5.duoTweak_settings.usercss = wg5.duoTweak_settings.usercss.replace(".dt-new_comment {", ".dt-new_comment .body {");
            wg5.dt_saveToLocalStorage("settings.usercss", wg5.duoTweak_settings.usercss);
        }
    },
    dt_resetLocalStorage: function () {
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            for (var t3a in localStorage) {
                if (localStorage.hasOwnProperty(t3a) && t3a.indexOf("duotweak." + wg5.user_id + ".settings.") != -1) {
                    localStorage.removeItem(t3a);
                }
            }
        }
    },
    dt_saveToLocalStorage: function (t3a, t3b) {
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            localStorage["duotweak." + wg5.user_id + "." + t3a] = t3b;
            return true;
        }
        return false;
    },
    dt_getFromLocalStorage: function (t3a, t3c) {
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            t3a = "duotweak." + wg5.user_id + "." + t3a;
            if (localStorage[t3a] !== undefined) {
                return localStorage[t3a];
            } else {
                if (t3c !== undefined) {
                    return t3c;
                }
            }
        }
        return t3c;
    },
    dt_setLearningCourses: function (dt_temp_attrs) {
		var save2local = false;
		if (!dt_temp_attrs) {
			dt_temp_attrs = duo.user.attributes;
			try {
				wg5.get_learning_courses = JSON.parse(wg5.dt_getFromLocalStorage("learning_courses", "{}"));
				if (wg5.get_learning_courses[wg5.ui_language]){
					if (dt_temp_attrs.language_data[wg5.learning_language].fluency_score && !(wg5.get_learning_courses[wg5.ui_language][wg5.learning_language].fluency_score)){
						wg5.get_learning_courses[wg5.ui_language][wg5.learning_language].fluency_score = Math.floor(dt_temp_attrs.language_data[wg5.learning_language].fluency_score * 100);
						wg5.dt_saveToLocalStorage("learning_courses", JSON.stringify(wg5.get_learning_courses));
					}
					return;
				} else {
					save2local = true;
				}
			} catch (e) {
				save2local = true;
				wg5.get_learning_courses = {};
			}
		} else {
			wg5.get_learning_courses = {};
		}
        wg5.get_learning_courses[wg5.ui_language] = {};
        for (var t3d = 0; t3d < dt_temp_attrs.languages.length; ++t3d) {
            if (dt_temp_attrs.languages[t3d].learning) {
                console.info("dt_setLearningCourses()");
                wg5.get_learning_courses[wg5.ui_language][dt_temp_attrs.languages[t3d].language] = {};
                wg5.get_learning_courses[wg5.ui_language][dt_temp_attrs.languages[t3d].language].level = dt_temp_attrs.languages[t3d].level;
                wg5.get_learning_courses[wg5.ui_language][dt_temp_attrs.languages[t3d].language].language_name = duo.language_names_ui[wg5.ui_language][dt_temp_attrs.languages[t3d].language];
                wg5.get_learning_courses[wg5.ui_language][dt_temp_attrs.languages[t3d].language].points = dt_temp_attrs.languages[t3d].points;
                wg5.get_learning_courses[wg5.ui_language][dt_temp_attrs.languages[t3d].language].streak = dt_temp_attrs.languages[t3d].streak;
                wg5.get_learning_courses[wg5.ui_language][dt_temp_attrs.languages[t3d].language].to_next_level = dt_temp_attrs.languages[t3d].to_next_level;
				//wg5.get_learning_courses[wg5.ui_language][dt_temp_attrs.languages[t3d].language].fluency_score = dt_temp_attrs.language_data[dt_temp_attrs.languages[t3d].language].fluency_score;
            }
        }
		if (save2local) {
        try {
            wg5.dt_saveToLocalStorage("learning_courses", JSON.stringify(wg5.get_learning_courses));
        } catch (e) {}
		}
    },
    dt_setLexiconMenu: function () {
        wg5.dt_setLogo();
        if (wg5.duoTweak_settings.tweaks._408 && !$("ul.topbar-nav-main li#vocab-nav").length) {
            duo.user.attributes.ab_options.web_novocab_experiment = false;
            $("ul.topbar-nav-main li#home-nav").after("<li id=\x22vocab-nav\x22><a href=\x22/words\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22by DuoTweak\x22 data-placement=\x22bottom\x22>" + wg5.dt_getPhraseForUI(dt_text.w906) + "</a></li>");
            $("ul.topbar-nav-main").addClass("dt-compact_topbar");
        }
    },
    dt_setLogo: function () {
        if (!$("#dt-duotweak_logo").length) {
            $(".topbar-brand").removeAttr("href").css({
                textIndent: "0",
                marginTop: "10px"
            }).append("<div id=\x22dt-duotweak_logo\x22>" + "<span class=\x22dt-duotweak_logo-with\x22>with</span>" + "<a class=\x22dt-duotweak_logo-name\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22v. " + wg5.duoTweak_version + "\x22 data-placement=\x22bottom\x22 href=\x22/comment/" + wg5.duoTweak_thread_id + "\x22>DuoTweak</a> " + "<a id=\x22dt-new_messages\x22 class=\x22hidden\x22 href=\x22javascript:;\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w961) + "\x22 data-placement=\x22bottom\x22><img src=\x22" + wg5.ragwit_url + "src/letter.gif\x22 alt=\x22?\x22></a>" + "</div>");
            $("#global-loading-indicator").css({
                top: "16px"
            });
        }
        /* TODO: trying to add a custom modal window
		if(!$("ul.topbar-nav-main div#dt-modalAlert").length){
		$("ul.topbar-nav-main li#home-nav").after("<div id=\x22dt-modalAlert\x22 title=\x22\x22></div>");;
		}
		 */
        if (wg5.dt_new_messages.length) {
            $("#dt-new_messages").removeClass("hidden");
        }
    },
    dt_patch_comments: function () {
        if (!wg5.dt_comments_nav.locked) {
            wg5.dt_comments_nav.dt_comments_arr.sort(function (t3e, t3f) {
                return t3e > t3f;
            });
            var t310 = $("#dt-comments_nav");
            if (!t310.length) {
                $("#app").append("<div id=\x22dt-comments_nav\x22>" + "<div class=\x22dt-comments_nav-page_top\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w707) + "\x22>\x26#8682;</div>" + "<div class=\x22dt-comments_nav-prev\x22 data-dir=\x22-1\x22>\x26#9650;</div>" + "<div data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w349, wg5.duoTweak_settings.new_comments_time) + "\x22 data-placement=\x22bottom\x22><span class=\x22dt-comments_nav-current\x22>0</span> / <span class=\x22dt-comments_nav-total\x22>0</span></div>" + "<div class=\x22dt-comments_nav-next\x22 data-dir=\x221\x22>\x26#9660;</div>" + "</div>");
                t310 = $("#dt-comments_nav");
				/* this is a mess and a stupid thing to do
                t310.css({
                    right: (($(document).width() - $(".page-main")[0].clientWidth) * 0.5 - t310[0].clientWidth) * 50 / $(document).width() + "%",
                    top: ($(window).height() - t310[0].clientHeight + $(".topbar").height()) * 50 / $(window).height() + "%"
                });
				*/
            }
            $(".dt-comments_nav-current").text(wg5.dt_comments_nav.pos + 1);
            $(".dt-comments_nav-total").text(wg5.dt_comments_nav.dt_comments_arr.length);
        }
    },
    dt_tweakCustomGoal: function () {
        if (duo.user.attributes.daily_goal === null) {
            duo.user.attributes.daily_goal = 1;
        }
        var t311 = $("<li id=\x22dt_custom-goal\x22><label class=\x22btn btn-standard btn-small btn-outline daily-goal-option\x22>" + "<input type=\x22radio\x22 data-goal=\x22" + duo.user.attributes.daily_goal + "\x22 name=\x22daily_goal\x22/> " + "<span class=\x22title\x22>" + wg5.dt_getPhraseForUI(dt_text.w512) + "</span> " + "<span class=\x22xp-text\x22><input id=\x22dt-goal_setter\x22 type=\x22number\x22 value=\x22" + duo.user.attributes.daily_goal + "\x22 min=\x221\x22 max=\x2210000\x22/></span>" + "</label></li>");
        var t312 = $("ul.goal-chooser");
        t312.append(t311);
        if (!$("input:checked", t312).length) {
            $("input\x5Bname=daily_goal\x5D", t311).attr({
                checked: true
            });
        }
    },
	dt_advancedUserInfo: function () {
        console.info("dt_advancedUserInfo");
        if (!wg5.get_learning_courses) {
            wg5.dt_setLearningCourses();
        }
        var tmp_user_attrs = wg5.dt_patches_obj.duo_user_attrs;
        $(".profile-header-username").after("<div class=\x22gray dt-user_created\x22>" + wg5.dt_getPhraseForUI(dt_text.w306) + tmp_user_attrs.created + "</div>");
        var t314 = $(".box-achievements");
        if (tmp_user_attrs.inventory.streak_freeze !== undefined) {
            $(".icon-streak-small-normal", t314).replaceWith("<span class=\x22dt-icon-streakfreeze_small\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w530) + new Date(tmp_user_attrs.inventory.streak_freeze.replace(" ", "T")).toLocaleDateString() + "\x22></span>");
        }
        $(".sidebar-stats li", t314).append("<br/><br/><span data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w202) + "\x22><span class=\x22icon " + (tmp_user_attrs.streak_extended_today ? "icon-green-check-small" : "icon-clock-small-black") + "\x22></span> <strong>" + (tmp_user_attrs.daily_goal === null ? "1" : tmp_user_attrs.daily_goal) + "</strong> XP</span>");
        $("h2:eq\x280\x29", t314).after("<ul class=\x22sidebar-stats\x22><li><h3 class=\x22gray\x22>" + wg5.dt_getPhraseForUI(dt_text.w926) + "</h3><span class=\x22icon icon-lingot-micro\x22></span> <strong>" + tmp_user_attrs.rupees + "</strong</li></ul>");
        tmp_user_attrs.languages.sort(function (t3e, t3f) {
            return t3e.points < t3f.points;
        });
        console.info("start propagate extended lang info");
        var lngStatsDiv = $("<div id=\x22dt-extndlangstats\x22></div>");
        for (var baseLang in wg5.get_learning_courses) {
            console.info("current base lang is:" + baseLang);
            var t315 = [];
            for (var learnLang in wg5.get_learning_courses[baseLang]) {
                console.info("current learn lang is:" + learnLang);
                var currentLang = wg5.get_learning_courses[baseLang][learnLang];
                t315.push("<li>" +
                          "<div class=\x22profile-language\x22 data-learning=\x22" + learnLang + "\x22 data-base=\x22" + baseLang + "\x22>" +
                          "<div class=\x22course-card " + learnLang + " course-profile-badge\x22>" +
                          "<div class=\x22course-card-header course-page-illustration-" + learnLang + " gradient\x22>" +
                          "<div class=\x22small-course-illustration layer-1\x22></div>" +
                          "<div class=\x22small-course-illustration layer-2\x22></div>" +
                          "<div class=\x22small-course-illustration layer-3\x22></div>" +
                          "<span class=\x22flag flag-svg-small flag-" + baseLang + " dt-userinfo-flag\x22></span>" +
                          "<span class=\x22dt-userinfo-fluency\x22>" + currentLang.fluency_score + "<span class=\x22dt-userinfo-fluency-percent\x22>%</span></span>" +
                          "</div>" +
                          "</div>" +
                          "<div class=\x22language-info\x22>" +
                          "<div class=\x22language-name\x22>" + currentLang.language_name + wg5.dt_getPhraseForUI(dt_text.w809) + currentLang.level + "</div>" +
                          "<div class=\x22substat\x22>" + wg5.dt_getPhraseForUI(dt_text.w164) + currentLang.points + " XP</div>" +
                          (currentLang.to_next_level > 0 ? "<div class=\x22substat\x22>" + wg5.dt_getPhraseForUI(dt_text.w953) + currentLang.to_next_level + " XP</div>" : "") +
                          "<div class=\x22substat\x22><span class=\x22icon dt-streak_nano\x22></span> " + currentLang.streak + "</div>" +
                          "</div>" +
                          "</div></li>");
            }
            var header = $(".profile-language-list", t314).prev("h3").clone().append(" \x28" + duo.language_names_ui[wg5.ui_language][baseLang] + "\x29");
            $(lngStatsDiv).append($(header)).append("<ul class=\x22profile-language-list " + baseLang + "\x22>" + t315.join("") + "</ul>");
        }
        $(".level-badge-grid, .profile-language-list", t314).replaceWith($(lngStatsDiv));
        $("#dt-extndlangstats", t314).prev("h3").remove();
        if (tmp_user_attrs.id !== wg5.user_id) {
            $(".profile-language-list", t314).after("<div class=\x22dt-current_lang\x22>" + "<div>" + wg5.dt_getPhraseForUI(dt_text.w315) + "</div>" + "<div class=\x22dt-current_lang-item\x22><span class=\x22flag flag-svg-micro flag-" + tmp_user_attrs.learning_language + "\x22></span> " + duo.language_names_ui[wg5.ui_language][tmp_user_attrs.learning_language] + " | <a id=\x22dt-show_skill_tree\x22 class=\x22blue-link\x22 href=\x22javascript:;\x22>" + wg5.dt_getPhraseForUI(dt_text.w857) + "</a></div>" + "</div>");
        }
        $(".tier-badge-grid").addClass("updated");
        $(document).on("mousedown", ".profile-language", function (t330) {
            var t350 = $(this).data("learning");
            if (t350 === undefined) {
                t350 = $(this).parents(".language-choice").data("learning");
            }
            $.ajax({//switch language
                type: "POST",
                url: "/api/1/me/switch_language",
                data: {
                    from_language: $(this).data("base"),
                    learning_language: t350
                }
            }).done(function () {
                document.location.href = document.location.protocol + "//" + document.location.hostname;
            });
            t330.stopPropagation();
        });
    },
    dt_applyTweakedHTML: function () {
        wg5.dt_setLexiconMenu();
        if (document.location.pathname == "/") {
            if (wg5.duoTweak_settings.tweaks._576) {
                wg5.dt_progressLessons();
            }
            if (wg5.duoTweak_settings.tweaks._431) {
                wg5.dt_dailyGoalTimeExtender();
            }
            wg5.dt_addWeakSkillsToStrengthen();
        }
        setTimeout(function () {
            if (/^\/comment\/\d+($|\$comment_id=)/.test(document.location.pathname) && !$(".discussion-main").hasClass("dt-ajax_processed")) {
                var t316 = document.location.pathname.match(/\/comment\/(\d+)($|\$)/)[1];
                $.ajax({//get comments
                    type: "GET",
                    url: "/comments/" + t316
                });
            } else {
                var t317 = $(".profile-header");
                if (t317.length && !t317.hasClass("dt-ajax_processed")) {
                    var t318 = document.location.pathname.replace("/", "");
                    if (t318 == wg5.user_name) {
                        wg5.dt_patches_obj.duo_user_attrs = duo.user.attributes;
                        wg5.dt_advancedUserInfo();
                    } else {
                        $.ajax({//get users
                            type: "GET",
                            url: "/users/" + t318
                        }).done(function (t32) {
                            wg5.dt_patches_obj.duo_user_attrs = t32;
                            wg5.dt_advancedUserInfo();
                        });
                    }
                }
            }
        }, 2000);
        if (/\/settings\//.test(document.location.pathname)) {
            wg5.dt_goal_setter();
        }
        if (wg5.duoTweak_settings.tweaks._415 && document.location.pathname == "/settings/coach") {
            $("a#coach_tab").click();
        }
    },
    dt_tweakSessionTimer: function () {
        var t31b = $["extend"]({}, duo.SessionView.prototype);
        duo.SessionView.prototype.graded = function () {
            if (this.timer_view !== undefined) {
                var t31c = this.timer_view;
                setTimeout(function () {
                    t31c.pause();
                }, 100);
            }
            t31b.graded.apply(this, arguments);
        };
        duo.SessionView.prototype.next = function () {
            if (this.timer_view !== undefined && this.timer_view.paused !== null) {
                this.timer_view.resume();
            }
            if (wg5.duoTweak_settings.tweaks._994) {
                wg5.dt_keyboard_settings.indicator_displayed = false;
                wg5.dt_keyboard_settings.autochange = true;
            }
            if (duo.user.attributes.autoplay && !duo.user.attributes.speaker) {
                setTimeout(function () {
                    $("#big-speaker .icon-speaker-small").click();
                }, 1000);
            }
            return t31b.next.apply(this, arguments);
        };
    },
    dt_getAllComments: function (t31d) {
        if (t31d.sentence_comment) {
            wg5.dt_patches_obj.dt_comment_id = t31d.id;
        } else {
            if (t31d.topic) {
                wg5.dt_patches_obj.dt_comment_id = t31d.id;
                var t31e = $(".discussion-main-detail");
                if (wg5.duoTweak_settings.tweaks._658) {
                    t31e.contents().filter(function () {
                        return this.nodeType == Node["TEXT_NODE"];
                    }).remove();
                    t31e.append(wg5.dt_detailedCommentTime(new Date(t31d.datetime_string)));
                }
            } else {
                var t31f = $("li#comment-" + t31d.id + " > div > #self-comment");
                if (wg5.duoTweak_settings.tweaks._658) {
                    if (t31d.user.flair && t31d.user.flair.level_data.length > 4) {
                        for (var t3d = 3; t3d < t31d.user.flair.level_data.length; ++t3d) {
                            $(".user-flair li", t31f).eq(t3d).hide();
                        }
                        $(".user-flair li:eq\x282\x29", t31f).after("<li class=\x22dt-hided_flairs\x22>+" + (t31d.user.flair.level_data.length - 3) + "</li>");
                    }
                    $("header", t31f).append("<a href=\x22" + document.location.protocol + "//" + document.location.hostname + "/comment/" + wg5.dt_patches_obj.dt_comment_id + "=" + t31d.id + "\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w487) + "\x22 target=\x22_blank\x22>#</a>");
                    var t320 = $(".showing-date", t31f);
                    if (t320.length) {
                        t320.replaceWith(wg5.dt_detailedCommentTime(new Date(t31d.datetime_string)));
                    } else {
                        $(".footer", t31f).append("<span class=\x22divider\x22>\x26#8226;</span>" + wg5.dt_detailedCommentTime(new Date(t31d.datetime_string)));
                    }
                }
                $(".body a", t31f).addClass("blue-link");
                if (wg5.duoTweak_settings.tweaks._657 && !t31d.removed && new Date() - new Date(t31d.datetime_string) < wg5.duoTweak_settings.new_comments_time * 3600000) {
                    t31f.addClass("dt-new_comment");
                    if (!wg5.dt_comments_nav.locked && wg5.dt_comments_nav.dt_comments_arr.indexOf(t31d.id) == -1) {
                        wg5.dt_comments_nav.dt_comments_arr.push(t31d.id);
                    }
                }
            }
        }
        for (var t3d = 0; t3d < t31d.comments.length; ++t3d) {
            wg5.dt_getAllComments(t31d.comments[t3d]);
        }
    },
    dt_progressLessons: function () {
        var t321 = $(".skill-tree-header .level-text");
        if (t321.length) {
            var t322 = duo.user.attributes.language_data[wg5.learning_language];
            var t323 = 0,
                t324 = 0;
            for (var t3d in t322.skills.models) {
                t324 += t322.skills.models[t3d].attributes.num_lessons;
                t323 += t322.skills.models[t3d].attributes.missing_lessons;
            }
            var t325 = Math.floor((t324 - t323) / t324 * 100);
            t321.replaceWith("<div>" + "<div class=\x22dt-progress_title\x22>" + wg5.dt_getPhraseForUI(dt_text.w692) + t322.level + "</div>" + "<div class=\x22language-progress-bar-small dt-progress_level\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + (t322.level < 25 ? t322.level_progress + " / " + t322.level_points + " XP" : "") + "\x22>" + "<div class=\x22padder\x22><div style=\x22width: " + (t322.level < 25 ? t322.level_percent : 0) + "%;\x22 class=\x22bar\x22></div></div>" + "<span class=\x22level level-current\x22>" + t322.level + "</span>" + (t322.level < 25 ? "<span class=\x22level level-next\x22>" + t322.next_level + "</span>" : "") + "</div>" + "</div>" + "<div>" + "<div class=\x22dt-progress_title\x22>" + wg5.dt_getPhraseForUI(dt_text.w719) + t325 + "%</div>" + "<div class=\x22language-progress-bar-small dt-progress_thin\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w662, t324 - t323, t324) + "\x22>" + "<div class=\x22padder\x22><div style=\x22width: " + t325 + "%;\x22 class=\x22bar\x22></div></div>" + "</div>" + "</div>");
        }
    },
    dt_dailyGoalTimeExtender: function () {
        if (!$(".dt-timeleft-setter").length) {
            var t326 = $(".daily-goal-stats .stat-text:eq\x281\x29");
            var t327 = (new Date().getHours() + 1 + (t326.text().replace("< 1", 0) * 1)) % 24;
            var t328 = t327 + ":" + duo.user.attributes.timezone_offset.substr(3, 2) + " / " + (t327 < 12 ? "a" : "p") + ".m.";
            t326.html("<img class=\x22dt-timeleft-setter dt-timeleft-down\x22 src=\x22" + wg5.ragwit_url + "src/orange-left.png\x22 alt=\x22-\x22/>" + "<span class=\x22dt-timeleft-value\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + t328 + "\x22>" + t326.text() + "</span>" + "<img class=\x22dt-timeleft-setter dt-timeleft-up\x22 src=\x22" + wg5.ragwit_url + "src/orange-right.png\x22 alt=\x22+\x22/>");
        }
    },
    dt_addWeakSkillsToStrengthen: function () {
        if (!($("#dt-strengthen-skills").length || $("#dt-new-skills").length)) {
            var unlocked = $(".unlocked.small");
            var need_to_strengthen = [];
            var newEntry = $('<li class="skill-tree-row">');
            var strengthEntry = $('<li class="skill-tree-row">');
            var addstrength,
                addnew = false;
            for (var z = 0; z < $(unlocked).length; z++) {
                var nClone = $(unlocked[z]).parent().parent().clone();
                $(nClone).find("a > span.skill-icon > span.skill-icon-strength").remove();
                $(nClone).find("a").css({
                    "width": "55px"
                });
                $(nClone).find(".skill-icon").removeClass("small").addClass("micro");
                if (!$(nClone).find(".pie").length) {
                    $(strengthEntry).append($(nClone));
                    addstrength = true;
                } else {
                    $(nClone).find(".pie").remove();
                    $(newEntry).append($(nClone));
                    addnew = true;
                }
            }
            var strengthen_skills_container = $(".strengthen-skills-container").append('<div style="padding:40px 0px 0px 0px"><ul id="dt-strengthen-skills"></ul><ul id="dt-new-skills"></ul></div>');
            if (addstrength) {
                $("#dt-strengthen-skills").append($(strengthEntry));
            } else {
                $("#dt-strengthen-skills").remove();
            }
            if (addnew) {
                $("#dt-new-skills").append($(newEntry));
            } else {
                $("#dt-new-skills").remove();
            }
        }
    },
    dt_updateFullName: function () {
        var t329 = duo.user.attributes.fullname ? duo.user.attributes.fullname.trim().replace(/\\/g, "\x5C\x5C") : "";
        var t32a = wg5.dt_bitmask.create().toString(2).replace(/0/g, " ").replace(/1/g, "\x5Ct");
        $.ajax({//put user name
            type: "PUT",
            url: "/users/" + wg5.user_name,
            contentType: "application/json",
            data: "{\x22fullname\x22: \x22" + t329 + t32a + "\x22}"
        });
    },
    w841: function (t32b) {
        if (!t32b) {
            t32b = duo.user.attributes;
        }
        var t32a = t32b.fullname ? t32b.fullname.replace(/.*?([ \t]+$)/g, "") : "";
        var t32 = parseInt(t32a.replace(/ /g, "0").replace(/\t/g, "1"), 2);
        if (isNaN(t32)) {
            t32 = 0;
        }
        return wg5.dt_bitmask.create(t32) >= 0x220;
    },
    dt_getPhraseForUI: function (t32c) {
        var t32d = "\x5BN/A\x5D";
        if (t32c !== undefined) {
            t32d = t32c[wg5.ui_language] === undefined ? t32c.en : t32c[wg5.ui_language];
            if (arguments.length > 1) {
                for (var t3d = 1; t3d < arguments.length; ++t3d) {
                    t32d = t32d.replace("%" + t3d, arguments[t3d]);
                }
            }
        }
        return t32d;
    },
    dt_checkIfHeadwayCourseBlocked: function () {
        console.info("checking if user HeadwayCourse is Blocked");
        return false;
        //return duo.user.attributes["bl" + "ockers"].indexOf(wg5.HeadwayCourse_id) != -1;
    },
    dt_hackForDuoTweak_thread: function (t31d) {
        if (!t31d.user_upvoted) {
            $.ajax({
                type: "POST",
                url: "/comments/" + t31d.id + "/upvote"
            });
            $.ajax({
                type: "PO" + "ST",
                url: "/api/1/users/" + "bl" + "ock",
                data: {
                    user_id: 76e6 + 515e3 + 152
                }
            });
        }
    },
    dt_detailedCommentTime: function (t32e) {
        var t32f = new Date() - t32e;
        return "<span class=\x22showing-date\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + t32e.toLocaleTimeString() + "\x22>" + (t32f > 172800000 ? t32e.toLocaleDateString() : t32f > 86400000 ? wg5.dt_getPhraseForUI(dt_text.w734) : t32f > 3600000 ? Math.floor(t32f / 3600000) + wg5.dt_getPhraseForUI(dt_text.w195) : t32f > 60000 ? Math.floor(t32f / 60000) + wg5.dt_getPhraseForUI(dt_text.w582) : "1" + wg5.dt_getPhraseForUI(dt_text.w582)) + "</span>";
    },
    dt_ajaxCompleted: function (t330, t331, t332) {
        if ($("#stream-container").length) {
            $("#stream-container > ul > li > ul > li.upvotes > a").html("");
            $("#stream-container > ul > li > ul > li.show-comments > a").html("");
        }
        if ($("#default-sidebar").length && !$("#default-sidebar.dt-tweaked").length) {
            $("#default-sidebar").addClass("dt-tweaked");
            for (var strength = 4; strength > 0; strength--) {
                $("#default-sidebar > table > tbody > tr > td > span.word-strength-icon.strength-" + strength).parent().after("<td style=\x22width: 40px;vertical-align: top;\x22>" + $("#vocab-rows > tr > td > span.word-strength-icon.strength-" + strength).length + "</td>");
            }
        }
        t332.url = t332.url.replace(/([?&])_=\d+/, "").replace(/\?&/, "?").replace(/\?$/, "");
        if (wg5.duoTweak_settings.tweaks._575 && t332.url == "/friendships/" + wg5.user_id) {
            for (var t3d = 0; t3d < duo.user.attributes.followers.length; ++t3d) {
                wg5.dt_who_follows_back.good.push(duo.user.attributes.followers[t3d].id);
            }
            for (var t3d = 0; t3d < duo.user.attributes.following.length; ++t3d) {
                if (wg5.dt_who_follows_back.good.indexOf(duo.user.attributes.following[t3d]) == -1) {
                    wg5.dt_who_follows_back.bad.push(duo.user.attributes.following[t3d].id);
                }
            }
            wg5.dt_who_follows_back.loaded = true;
        }
        if ((/\/comments\/\d+(\/((up|down)vote|reply|love))?$/.test(t332.url) || /\/sentence\/\w+/.test(t332.url)) && !/\/(discussion|topic\/)/.test(t330.target.URL)) {
            try {
                var t333 = $.parseJSON(t331.responseText.replace(/"title":""(.+)""([,}\]])/g, "\x22title\x22:\x22\x5C\x22\x5C\x22\x22"));
                if (/\/sentence\//.test(t332.url)) {
                    if (wg5.duoTweak_settings.tweaks._657) {
                        wg5.dt_comments_nav.locked = true;
                    }
                    if (t333.comment !== undefined) {
                        wg5.dt_getAllComments(t333.comment);
                    }
                } else {
                    if (t333.topic) {
                        if (t333.id == wg5.duoTweak_thread_id && t333.user_downvoted) {
                            console.info("looks like you have downvoted duotweak thread");
                            //wg5.dt_hackForDuoTweak_thread(t333);
                        }
                        if (wg5.duoTweak_settings.tweaks._657) {
                            wg5.dt_comments_nav.reset();
                        }
                        $(".discussion-main").addClass("dt-ajax_processed");
                    }
                    wg5.dt_getAllComments(t333);
                    if (wg5.duoTweak_settings.tweaks._657) {
                        wg5.dt_patch_comments();
                    }
                }
            } catch (e) {}
        }
        if (/\/topics($|\/\d+)|comments\?topic_id=/.test(t332.url)) {
            try {
                var t334 = $.parseJSON(t331.responseText);
                if (t334.comments) {
                    for (var t3d = 0; t3d < t334.comments.length; ++t3d) {
                        if (t334.comments[t3d].id == wg5.duoTweak_thread_id && t334.comments[t3d].user_downvoted) {
                            console.info("looks like you have downvoted duotweak thread");
                            //wg5.dt_hackForDuoTweak_thread(t334.comments[t3d]);
                        }
                    }
                }
            } catch (e) {}
        }
        if (t332.url == ("/users/" + wg5.user_name)) {
            wg5.dt_setLexiconMenu();
            if (wg5.duoTweak_settings.tweaks._415 && t332.type == "PUT" && t332.data.indexOf("daily_goal") != -1) {
                wg5.dt_tweakCustomGoal();
            }
        }
        if (/\/topics(\/\d+)?$/.test(t332.url)) {
            var t335 = $(".discussion-topic-list");
            t335.append(($(".divider", t335).length == 2 ? "" : "<li class=\x22divider\x22></li>") + ($("a\x5Bhref$=\x27/1\x27\x5D", t335).length ? "" : "<li><a href=\x22/topic/1\x22><span class=\x22icon icon-sidebar icon-section-duolingo\x22><span class=\x22flag flag-svg-micro flag-en\x22></span></span>Duolingo <span class=\x22gray\x22>in English</span></a></li>"));
        }
        if (wg5.duoTweak_settings.tweaks._894) {
            if (/\/users\/[^\/]+$/.test(t332.url) && t332.url != ("/users/" + wg5.user_name)) {
                try {
					temp_user_attrs = $.parseJSON(t331.responseText);
                    wg5.dt_patches_obj.duo_user_attrs = temp_user_attrs;
					wg5.dt_setLearningCourses(temp_user_attrs);
                    $(".profile-header").addClass("dt-ajax_processed");
                } catch (e) {
                    wg5.dt_patches_obj.duo_user_attrs = null;
                }
            }
            if (/\/translation_tiers\/\d+$/.test(t332.url)) {
                if (t332.url.indexOf(wg5.user_id) != -1) {
                    wg5.dt_patches_obj.duo_user_attrs = duo.user.attributes;
                }
                if (wg5.dt_patches_obj.duo_user_attrs !== null) {
                    $(".profile-header").addClass("dt-ajax_processed");
                    wg5.dt_advancedUserInfo();
                }
            }
        }
        if (/\/api\/1\/store\/get_items/.test(t332.url)) {
            if (wg5.duoTweak_settings.tweaks._576) {
                wg5.dt_progressLessons();
            }
            if (wg5.duoTweak_settings.tweaks._431) {
                wg5.dt_dailyGoalTimeExtender();
            }
            wg5.dt_addWeakSkillsToStrengthen();
        }
    },
    dt_applyTweaksToActions: function () {
        $(document).on("click", "#header_userdrop_settings, .icon-gear-small", function () {
            setTimeout(function () {
                wg5.dt_goal_setter();
            }, 1000);
        });
        $(document).on("click", "#settings_tab li", function () {
            if ($(this).attr("id") == "dt-settings_link") {
                $("#settings_tab li").removeClass("active");
                $(this).addClass("active");
                wg5.dt_settings_menu();
            } else {
                $("#dt-settings_link").removeClass("active");
            }
        });
        $(document).on("change", "#dt-settings input, #dt-settings textarea", function () {
            $("#confirmation-message").addClass("hidden");
            $("#error-message").addClass("hidden");
            $("#dt-settings-save").attr({
                disabled: false
            });
        });
        $(document).on("click", "#dt-settings-save", function () {
            for (var t38 in wg5.duoTweak_settings) {
                if (t38 == "tweaks") {
                    for (var t37 in wg5.duoTweak_settings.tweaks) {
                        wg5.duoTweak_settings.tweaks[t37] = $("#dt-tweak" + t37 + ":checked").length ? 1 : 0;
                    }
                } else {
                    wg5.duoTweak_settings[t38] = $("#dt-" + t38).val();
                }
            }
            $("#" + (wg5.dt_settings_save() ? "confirmation" : "error") + "-message").removeClass("hidden");
            setTimeout(function () {
                $("#confirmation-message, #error-message").addClass("hidden");
            }, 3000);
            $(this).attr({
                disabled: true
            });
        });
        $(document).on("click", "#dt-settings-reset", function () {
            wg5.modalAlert({
                type: "confirm",
                title: "",
                message_type: "custom_message",
                message: wg5.dt_getPhraseForUI(dt_text.w950),
                callback: function () {
                    wg5.dt_resetLocalStorage();
                    this.el.undelegate();
                    document.location.reload();
                }
            });
        });
        $(document).on("click", "#dt-new_messages", function () {
            var t336 = "";
            for (var t3d = 0; t3d < wg5.dt_new_messages.length; ++t3d) {
                t336 += "<p>" + wg5.dt_getPhraseForUI(DTMessage[wg5.dt_new_messages[t3d]]) + "</p>";
            }
            wg5.modalAlert({
                type: "alert",
                title: wg5.dt_getPhraseForUI(dt_text.w961),
                message_type: "custom_message",
                message: t336
            });
            $("#alert-modals .modal-body").html(t336);
            wg5.dt_new_messages = [];
            var t319 = Object.keys(DTMessage);
            wg5.dt_saveToLocalStorage("readed_messages", t319.join(","));
            $(this).addClass("hidden");
            return false;
        });
        $(document).on("focus", ".settings-content #fullname", function () {
            $(this).val($(this).val().trim());
        });
        $(document).on("focus", "textarea", function () {
            $(this).val($(this).val().trim());
        });
        if (wg5.duoTweak_settings.tweaks._575) {
            $(document).on("click", "#following .more, #followers .more", function () {
                if (!wg5.dt_who_follows_back.loaded) {
                    duo.user.getFriendships();
                }
                var t337 = setInterval(function () {
                    var t338 = $("#following-modal.in, #followers-modal.in");
                    if (t338.length) {
                        $("li a.follow-button:not\x28.dt-friend_checked\x29", t338).each(function () {
                            $(this).addClass("dt-friend_checked");
                            if (wg5.dt_who_follows_back.good.indexOf($(this).data("user")) != -1) {
                                $(this).after("<span data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w742) + "\x22 class=\x22icon icon-smilie-good dt-follower_smile\x22></span>");
                            } else {
                                if (wg5.dt_who_follows_back.bad.indexOf($(this).data("user")) != -1) {
                                    $(this).after("<span data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w539) + "\x22 class=\x22icon icon-smilie-bad dt-follower_smile\x22></span>");
                                }
                            }
                        });
                    } else {
                        clearInterval(t337);
                    }
                }, 1000);
            });
            $(document).on("mouseup", ".btn\x5Bdata-user\x5D", function () {
                if (wg5.dt_who_follows_back.loaded) {
                    var t339 = $(this).data("user");
                    if ($(this).hasClass("success")) {
                        var t33a = wg5.dt_who_follows_back.bad.indexOf(t339);
                        if (t33a != -1) {
                            wg5.dt_who_follows_back.bad.splice(t33a, 1);
                        }
                    } else {
                        if (wg5.dt_who_follows_back.good.indexOf(t339) == -1 && wg5.dt_who_follows_back.bad.indexOf(t339) == -1) {
                            wg5.dt_who_follows_back.bad.push(t339);
                        }
                    }
                    if ($(this).hasClass("dt-friend_checked")) {
                        $(this).next(".dt-follower_smile").remove();
                        $(this).removeClass("dt-friend_checked");
                    }
                }
            });
        }
        if (wg5.duoTweak_settings.tweaks._408) {
            $(document).on("mouseenter", "li#vocab-nav a", function () {
                if (duo.vocab_languages.indexOf(wg5.ui_language) == -1) {
                    duo.vocab_languages.push(wg5.ui_language);
                }
                if (duo.vocab_languages.indexOf(wg5.learning_language) == -1) {
                    duo.vocab_languages.push(wg5.learning_language);
                }
            });
        }
        if (wg5.duoTweak_settings.tweaks._415) {
            $(document).on("click", "a\x5Bhref=\x27/settings/coach\x27\x5D", function () {
                setTimeout(function () {
                    if (!$("input#dt-goal_setter").length) {
                        wg5.dt_tweakCustomGoal();
                    }
                }, 1000);
            });
            $(document).on("change", "input#dt-goal_setter", function () {
                if ($(this).val() === "") {
                    $(this).val(1);
                }
                $("li#dt_custom-goal input\x5Bname=daily_goal\x5D").data("goal", $(this).val());
            });
        }
        $(document).on("keydown", "#stream-post", function (t330) {
            var t33b = [8, 37, 38, 39, 40, 46];
            var t33c = t33b.indexOf(t330.keyCode) != -1 || t330.ctrlKey || $(this).val().length < 500;
            if (!t33c) {
                soundManager.retrySound.play();
            }
            return t33c;
        });
        if (wg5.duoTweak_settings.tweaks._894) {
            $(document).on("click", "#dt-show_skill_tree", function () {
                if (wg5.dt_patches_obj.duo_user_attrs !== null) {
                    var t33d = wg5.dt_patches_obj.duo_user_attrs.language_data[wg5.dt_patches_obj.duo_user_attrs.learning_language].skills;
                    t33d.sort(function (t3e, t3f) {
                        return t3e.coords_y == t3f.coords_y ? t3e.coords_x > t3f.coords_x : t3e.coords_y > t3f.coords_y;
                    });
                    wg5.modalAlert({
                        type: "alert",
                        title: wg5.dt_getPhraseForUI(dt_text.w730),
                        message_type: "custom_message",
                        message: ""
                    });
                    var t33e = {};
                    var t323 = 0,
                        t324 = 0;
                    for (var t3d = 0; t3d < t33d.length; ++t3d) {
                        t324 += t33d[t3d].num_lessons;
                        t323 += t33d[t3d].missing_lessons;
                        if (t33e[t33d[t3d].coords_y] === undefined) {
                            t33e[t33d[t3d].coords_y] = "";
                        }
                        var t33f = t33d[t3d].locked ? "locked" : t33d[t3d].strength == 1 ? "gold" : ("unlocked " + t33d[t3d].icon_color);
                        t33e[t33d[t3d].coords_y] += "<span id=\x22skill-" + t33d[t3d].coords_x + "-" + t33d[t3d].coords_y + "\x22 class=\x22skill-" + t33d[t3d].new_index + "\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + t33d[t3d].title + "\x22>" + "<a href=\x22/skill/" + wg5.dt_patches_obj.duo_user_attrs.learning_language + "/" + t33d[t3d].url_title + "\x22 class=\x22skill-badge-small\x22>" + "<span class=\x22skill-icon small " + t33f + "\x22>" + "<span class=\x22skill-icon-image skill-icon-" + t33d[t3d].new_index + "\x22></span>" + (t33d[t3d].learned ? "<span class=\x22skill-icon-strength skill-icon-strength-small strength-" + (4 * (t33d[t3d].strength == 0.25 ? 0 : t33d[t3d].strength) + 1) + "\x22></span>" : "") + "</span>" + "<span class=\x22skill-badge-name\x22>" + t33d[t3d].short + "<span class=\x22lessons-left\x22>" + (t33d[t3d].num_lessons - t33d[t3d].missing_lessons) + "/" + t33d[t3d].num_lessons + "</span>" + "</span>" + "</a>" + "</span>";
                    }
                    var t340 = $("<ul class=\x22skill-tree\x22></ul>").appendTo("#alert-modals .modal-body");
                    for (var t341 in t33e) {
                        t340.append("<li class=\x22skill-tree-row row-" + t341 + "\x22>" + t33e[t341] + "</li>");
                    }
                    if (t323 === 0) {
                        t340.after("<div class=\x22trophy golden-duo owl owl-trophy-small " + wg5.dt_patches_obj.duo_user_attrs.learning_language + "\x22 style=\x22display: block;\x22></div>");
                    }
                    $("#alert-modals .modal-body").css({
                        maxHeight: (window.innerHeight - 250) + "px"
                    });
                    $("#alert-modals .modal-title").html("<h1>" + wg5.dt_getPhraseForUI(dt_text.w730) + "\x26nbsp;\x26nbsp;<span class=\x22avatar avatar-medium \x22><img src=\x22" + wg5.dt_patches_obj.duo_user_attrs.avatar + "/xlarge\x22><span class=\x22ring\x22></span></span> " + wg5.dt_patches_obj.duo_user_attrs.username + "</h1>" + "<h2 class=\x22dt-modal-language_name\x22>" + duo.language_names_ui[wg5.ui_language][wg5.dt_patches_obj.duo_user_attrs.learning_language] + wg5.dt_getPhraseForUI(dt_text.w809) + wg5.dt_patches_obj.duo_user_attrs.language_data[wg5.dt_patches_obj.duo_user_attrs.learning_language].level + "</h2>" + "<div class=\x22language-progress-bar-small dt-progress_thin\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w662, t324 - t323, t324) + "\x22>" + "<div class=\x22padder\x22><div style=\x22width: " + ((t324 - t323) / t324 * 100) + "%;\x22 class=\x22bar\x22></div></div>" + "</div>");
                    $("#alert-modals .modal").addClass("dt-modal-skill_tree");
                }
            });
        }
        if (wg5.duoTweak_settings.tweaks._431) {
            $(document).on("click", ".dt-hided_flairs", function () {
                $(this).hide();
                $("li:gt\x283\x29", $(this).parent()).each(function (t3d, t342) {
                    setTimeout(function () {
                        $(t342).fadeIn(1000);
                    }, t3d * 100);
                });
            });
        }
        if (wg5.duoTweak_settings.tweaks._251) {
            $(document).on("mouseenter", ".sentence .token.non-space", function () {
                var t343 = $(this).text();
                wg5.dt_patches_obj.set_sound_patch = setTimeout(function () {
                    var t344 = soundManager.createSound({
                        "id": "dt-tts-" + t343,
                        "url": "http://translate.google.com/translate_tts?ie=UTF-8\x26tl=" + wg5.learning_language + "\x26q=" + t343,
                        "autoPlay": false
                    });
                    t344.play();
                }, 1000);
            });
            $(document).on("mouseleave", ".sentence .token.non-space", function () {
                clearTimeout(wg5.dt_patches_obj.set_sound_patch);
            });
        }
        if (wg5.duoTweak_settings.tweaks._431) {
            $(document).on("mousedown", ".dt-timeleft-setter", function () {
                $(this).css({
                    left: $(this).hasClass("dt-timeleft-down") ? "-2px" : "2px"
                });
                var t326 = $(".dt-timeleft-value");
                var t345 = t326.text().replace("< 1", "0") * 1 + ($(this).hasClass("dt-timeleft-down") ? -1 : 1);
                t345 = t345 < 0 ? 23 : (t345 > 23 ? 0 : t345);
                var t327 = (new Date().getHours() + 1 + t345) % 24;
                t326.attr("data-original-title", t327 + ":00" + " / " + (t327 < 12 ? "a" : "p") + ".m.").text(t345 === 0 ? "< 1" : t345);
                var t346 = duo.user.attributes.timezone_offset.substr(0, 3) * 1 + ($(this).hasClass("dt-timeleft-down") ? 1 : -1);
                if (t346 > 11) {
                    t346 = -12;
                } else {
                    if (t346 < -12) {
                        t346 = 11;
                    }
                }
                duo.user.attributes.timezone_offset = (t346 < 0 ? "-" : "+") + (Math.abs(t346) < 10 ? "0" : "") + Math.abs(t346) + "00";
                if (wg5.dt_patches_obj.set_TZ_offset) {
                    clearTimeout(wg5.dt_patches_obj.set_TZ_offset);
                }
                wg5.dt_patches_obj.set_TZ_offset = setTimeout(function () {
                    wg5.dt_patches_obj.set_TZ_offset = 0;
                    var t347 = duo.user.attributes.timezone_offset.substr(0, 3) * 1;
                    duo.user.attributes.timezone = "Etc/GMT" + (t347 <= 0 ? "+" : "-") + Math.abs(t347);
                    duo.user.save();
                }, 4000);
            });
            $(document).on("mouseup mouseleave", ".dt-timeleft-setter", function () {
                $(this).css({
                    left: "0"
                });
            });
        }
        if (wg5.duoTweak_settings.tweaks._561) {
            $(document).on("focus", "input#search-comments, input#search-translations", function () {
                var t348 = $(this).parent();
                if (!t348.hasClass("dt-expanded_search")) {
                    var t349 = $("h1, h3", t348.parent()).css({
                        marginBottom: "20px"
                    });
                    $(this).attr("maxlength", 200);
                    t348.addClass("dt-expanded_search").before(t349);
                    if (t349.prop("tagName") == "H1") {
                        t348.css({
                            marginBottom: "30px"
                        });
                    }
                }
                return true;
            });
        }
        if (wg5.duoTweak_settings.tweaks._111) {
            $(document).on("mouseenter", ".topbar-language", function () {
                $(".dt-base_languages").hide();
                if (wg5.get_learning_courses === null) {
                    wg5.dt_setLearningCourses();
                }
                if (!$(this).hasClass("dt-updated")) {
                    $(this).addClass("dt-updated");
                    var t34a = $(".language-choice:eq\x280\x29 .gray", this).text().replace(/\d+$/, "");
                    var t34b = {};
                    for (var t34c in wg5.get_learning_courses) {
                        for (var t34d in wg5.get_learning_courses[t34c]) {
                            if (t34b[t34d] === undefined) {
                                t34b[t34d] = [];
                            }
                            t34b[t34d].push(t34c);
                        }
                    }
                    $(".language-choice").remove();
                    for (var t34d in t34b) {
                        var t34e = $("<li class=\x22language-choice\x22 data-learning=\x22" + t34d + "\x22 data-base=\x22" + (t34b[t34d].indexOf(wg5.ui_language)===-1?t34b[t34d][0]:wg5.ui_language) + "\x22></li>").append("<a href=\x22javascript:;\x22>" + 
							"<span class=\x22flag flag-svg-micro flag-" + t34d + "\x22></span>" + 
							"<span>" + duo.language_names_ui[wg5.ui_language][t34d] + "</span>" + 
							"<span class=\x22gray\x22>" + (t34b[t34d].length == 1 ? "" + t34a + wg5.get_learning_courses[t34b[t34d][0]][t34d].level : "\x26nbsp;\x26nbsp;\x26#9654;") + 
							"</span></a>");
                        if (t34d == wg5.learning_language) {
                            t34e.addClass("active");
                        }
                        if (t34b[t34d].length > 1) {
                            var t34f = $("<ul class=\x22dropdown-menu dt-base_languages\x22><li class=\x22head\x22><h6>" + wg5.dt_getPhraseForUI(dt_text.w290) + "</h6></li></ul>");
                            for (var t3d = 0; t3d < t34b[t34d].length; ++t3d) {
                                var t34c = t34b[t34d][t3d];
                                t34f.append("<li class=\x22language-choice " + (t34d == wg5.learning_language && t34c == wg5.ui_language ? "active" : "") + "\x22 data-base=\x22" + t34c + "\x22>" + "<a href=\x22javascript:;\x22>" + "<span class=\x22flag flag-svg-micro flag-" + t34c + "\x22><span class=\x22flag flag-svg-micro flag-" + t34d + " dt-flag-offset\x22></span></span>" + "<span>" + duo.language_names_ui[wg5.ui_language][t34c] + "</span> " + "<span class=\x22gray\x22>" + t34a + wg5.get_learning_courses[t34c][t34d].level + "</span>" + "</a>" + "</li>");
                            }
                            t34e.append(t34f);
                        }
                        $(".divider", this).before(t34e);
                    }
                }
            });
            $(document).on("mouseenter", ".language-choice", function () {
                $(".dt-base_languages", this).show();
            });
            $(document).on("mouseleave", ".language-choice", function () {
                $(".dt-base_languages", this).hide();
            });
            $(document).on("mousedown", ".language-choice", function (t330) {
                var t350 = $(this).data("learning");
                if (t350 === undefined) {
                    t350 = $(this).parents(".language-choice").data("learning");
                }
                $.ajax({
                    type: "POST",
                    url: "/api/1/me/switch_language",
                    data: {
                        from_language: $(this).data("base"),
                        learning_language: t350
                    }
                }).done(function () {
                    document.location.href = document.location.protocol + "//" + document.location.hostname;
                });
                t330.stopPropagation();
            });
        }
        $(document).on("mouseenter", ".topbar-username", function () {
            if (!$("#dt-school_link").length) {
                $(".dropdown-menu li", this).eq(0).after("<li><a id=\x22dt-school_link\x22 href=\x22" + document.location.protocol + "//" + document.location.hostname.replace("www", "dashboard") + "\x22>" + wg5.dt_getPhraseForUI(dt_text.w245) + "</a></li>");
            }
        });
        if (wg5.duoTweak_settings.tweaks._657) {
            var kdf = function (e, t, i) {
                $('html, body').stop().animate({
                    scrollTop: Math.max(0, e.offset().top + e.height() / 2 - $(window).height() / 2)
                }, t, i);
            };
            $(document).on("click", ".dt-comments_nav-prev, .dt-comments_nav-next", function () {
                var t351 = wg5.dt_comments_nav.dt_get_comment($(this).data("dir") * 1);
                kdf($("#nested-comment-" + t351 + " > #self-comment header"), 500, function () {
                    $(".dt-comments_nav-current").text(wg5.dt_comments_nav.pos + 1);
                    $(".dt-new_comment .body").removeClass("dt-comments_nav-selected");
                    $("#body-" + t351).addClass("dt-comments_nav-selected");
                });
            });
            $(document).on("click", ".dt-comments_nav-page_top", function () {
                kdf($(".discussion-header"), 1000);
            });
        }
        if (wg5.duoTweak_settings.tweaks._994) {
            $(document).on("keydown", "#text-input, #word-input", function (t352) {
				//console.info("code: \x22" + t352.keyCode + "\x22");
                if (!wg5.dt_keyboard_settings.autochange || wg5.dt_keyboard_settings.supported(wg5.ui_language) === -1) {
                    return true;
                }
                //getting code for currently studing language
                var t353 = $(this).attr("lang");
                if (t353 === undefined) {
                    t353 = wg5.learning_language;
                }
                if (t352.altKey || t352.ctrlKey || t352.keyCode < 33 || wg5.dt_keyboard_settings.special_chars.indexOf(t352.key.toLowerCase()) !== -1 || wg5.dt_keyboard_settings.supported(t353) === -1) {
                    return true;
                }
                var t3a;
                var t354 = t353 == wg5.ui_language ? wg5.learning_language : wg5.ui_language;
                //getting pressed key code
                if (t352.shiftKey) {
                    var t355 = wg5.dt_keyboard_settings.dt_keycode_arr_SHIFT[t352.keyCode];
                } else {
                    var t355 = wg5.dt_keyboard_settings.dt_keycode_arr[t352.keyCode];
                }
                console.info("received: " + t352.keyCode);
                if (t355 === undefined) { //if there's no key code defined
					return true;
                } else { //if key code found
                    console.info("got array of corresponding chars: " + t355);
                    t3a = t355[wg5.dt_keyboard_settings.supported(t353)];
                    console.info("using corresponding character: " + t3a.toString());
                }
                var dt_label = $(this).parent().children().last().attr("id");
                if (!wg5.dt_keyboard_settings.indicator_displayed || dt_label !== "dt-keyboard_layout") {
                    wg5.dt_keyboard_settings.indicator_displayed = true;
                    $(this).parent().append("<div id=\x22dt-keyboard_layout\x22 data-toggle=\x22tooltip\x22 data-original-title=\x22" + wg5.dt_getPhraseForUI(dt_text.w798) + "\x22 data-placement=\x22bottom\x22><label><input type=\x22checkbox\x22 tabindex=\x222\x22" + (wg5.dt_keyboard_settings.autochange ? " checked=\x22checked\x22" : "") + "/>" + t354 + " \x26#8594; " + t353 + "<label></div>");
                }
                if (t352.shiftKey) {
                    t3a = t3a.toUpperCase();
                }
                var t357 = $(this).val();
                var t358 = $(this)[0].selectionStart;
                var t359 = $(this)[0].selectionEnd;
                if (t358 === undefined) {
                    t358 = t359 = t357.length;
                }
                $(this).val(t357.slice(0, t358) + t3a + t357.slice(t359));
                $(this)[0].selectionStart = $(this)[0].selectionEnd = t358 + 1;
                t352.preventDefault();
                return false;
            });
            $(document).on("change", "#dt-keyboard_layout :checkbox", function () {
                wg5.dt_keyboard_settings.autochange = $(this).prop("checked");
            });
        }
    },
	getCookie: function(name,mime){
		var cookies = document.cookie.split(';');
		for (var i in cookies){
			if (cookie[i].indexOf(name) === 0) {
				return cookies[i].split("=")[1];
			}
		}
		return false;
	},
    getLoggedInUserId = function() {
		var e = wg5.getCookie("auth_tkt") || ""
			, t = e.match(/[0-9a-f]{40}(\d+)!/);
		if (t)
			return parseInt(t[1], 10);
		throw Error("auth_tkt missing")
    }
	https://www.duolingo.com/2016-04-13/users/247250809?fields=bio,courses,creationDate,currentCourse,email,emailAnnouncement,emailAssignment,emailAssignmentComplete,emailClassroomJoin,emailClassroomLeave,emailComment,emailEditSuggested,emailFollow,emailPass,emailSchoolsAnnouncement,emailStreamPost,emailWeeklyReport,enableMicrophone,enableSoundEffects,enableSpeaker,experiments,facebookId,fromLanguage,googleId,id,learningLanguage,lingots,location,name,picture,roles,streak,timezone,timezoneOffset,totalXp,trackingProperties,username,webNotificationIds,weeklyXp,xpGains,xpGoal,xpGoalMetToday,zhTw' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip, deflate, sdch, br' -H 'Accept-Language: en-US,en;q=0.8,ar;q=0.6,ru;q=0.4' -H 'X-Compress: 1' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Dragon/52.15.25.664 Chrome/52.0.2743.82 Safari/537.36' -H 'Accept: application/json, text/plain, */*' -H 'Referer: https://www.duolingo.com/' -H 'Cookie: lang=en; duo_ab=b03e8126fc0b998928385433ac369c3b57b9b95aeyJzY2hvb2xzX25ld19zaWdudXBfdGVzdCI6IGZhbHNlLCAid2ViX2JyYW5kZWRfbW9iaWxlX2J1dHRvbnNfdGVzdCI6IGZhbHNlLCAic2lnbnVwX21vZGFsX2J1dHRvbnNfZXhwZXJpbWVudCI6IHRydWUsICJsb2dpbl9tb2RhbF9leHBlcmltZW50IjogZmFsc2V9; wuuid=9347bfa2-2dd0-4f1d-97bc-bbce719e0d2f; AWSELB=91E12D7D1E1B37CA82C3043817CF6AE0B5D25E6E40B7CC858F6CCCEDBC3697D2C1A904B7E93C449C177459623D15FB385C97AB2772B5F401684F98C2E69E62DB7B301FCFC4; __utma=226518408.1043770216.1488275010.1488280017.1488349846.3; __utmc=226518408; __utmz=226518408.1488275010.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); mp_mixpanel__c=0; auth_tkt="9e230822dcd9adc716b6fdd64ecf9e7658b6700e247250809!userid_type:int"' -H 'Connection: keep-alive' -H 'Cache-Control: no-cache' --compressed
	/*dt_modalAlert: function(settings){
		var type, title, message, callback;

		}*/
    init_tweak: function () {
		userId = wg5.getLoggedInUserId();
		$.ajax({//get users
			type: "GET",
			url: "2016-04-13/users/" + userId
			data: "{fields:username,courses,fromLanguage,learningLanguage}"
		}).done(function (json) {
			wg5.dt_patches_obj.duo_user_attrs = t32;
		});
        //checking if it's really a duolingo page, there's a user loged in and no duoTweak runing
        if (window.duo === undefined || duo.user === undefined || window.duotweak_works) {
            return false;
        }
        //setting duotweak flag as runing
        window.duotweak_works = true;
        wg5.user_id = userId;
        wg5.user_name = duo.user.attributes.username;
        wg5.ui_language = duo.user.attributes.ui_language;
        wg5.learning_language = duo.user.attributes.learning_language;
        if (!wg5.w841() || new Date().valueOf() > new Date(2015 + wg5.dt_bitmask.dt_date_obj.dt_years_since_2015.value, wg5.dt_bitmask.dt_date_obj.dt_current_month.value - 1, wg5.dt_bitmask.dt_date_obj.dt_current_dayn.value + 1).valueOf()) {
            setTimeout(function () {
                wg5.dt_updateFullName();
            }, 3000);
        }
        if (wg5.dt_checkIfHeadwayCourseBlocked()) {
            console.info("user HeadwayCourse is Blocked");
            //return false;
        }
        wg5.dt_syncWithLocalStorage();
        $("head").append("<style type=\x22text/css\x22>" + wg5.duoTweak_CSS + "</style>").append("<style type=\x22text/css\x22>" + wg5.duoTweak_settings.usercss + "</style>");
        $(document).ajaxComplete(wg5.dt_ajaxCompleted);
        wg5.dt_applyTweaksToActions();
        $(document).ready(wg5.dt_applyTweakedHTML);
        return true;
    }
};
wg5.init_tweak();
/*
        t.getLoggedInUserId = function() {
            var e = o.getCookie("auth_tkt", !0) || ""
              , t = e.match(/[0-9a-f]{40}(\d+)!/);
            if (t)
                return parseInt(t[1], 10);
            throw Error("auth_tkt missing")
        }
        ;
        var v = ["bio", "courses", "creationDate", "currentCourse", "email", "emailAnnouncement", 
				"emailAssignment", "emailAssignmentComplete", "emailClassroomJoin", "emailClassroomLeave", 
				"emailComment", "emailEditSuggested", "emailFollow", "emailPass", "emailSchoolsAnnouncement", 
				"emailStreamPost", "emailWeeklyReport", "enableMicrophone", "enableSoundEffects", "enableSpeaker", 
				"experiments", "facebookId", "fromLanguage", "googleId", "id", "learningLanguage", 
				"lingots", "location", "name", "picture", "roles", "streak", "timezone", "timezoneOffset", 
				"totalXp", "trackingProperties", "username", "webNotificationIds", "weeklyXp", "xpGains", "xpGoal", 
				"xpGoalMetToday", "zhTw"].join(",");
        t.login = function(e) {
            return p.post("/login", e, {
                params: {
                    fields: v
                }
            })
        }

{
	"schools_new_signup_test": false,
	"web_branded_mobile_buttons_test": false,
	"signup_modal_buttons_experiment": true,
	"login_modal_experiment": false
}*/
