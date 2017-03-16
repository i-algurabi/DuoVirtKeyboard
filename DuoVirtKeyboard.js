// ==UserScript==
// @name		DuoVirtKeyboard
// @namespace		duolingo
// @description		A virtual keyboard for Duolingo with auto layout switching
// @version		0.0.13
// @author		IceCube aka i.algurabi, (c) 2017
// @include		https://*.duolingo.com/*
// @updateURL		https://rawgit.com/i-algurabi/DuoVirtKeyboard/master/DuoVirtKeyboard.meta
// @downloadURL		https://rawgit.com/i-algurabi/DuoVirtKeyboard/master/DuoVirtKeyboard.js
// @grant		none
// ==/UserScript==

userInfo = {
    duoState: null,
    getLangs: function(){
        this.duoState = this.refresh();
        var result = {};
        for (var course in this.duoState.courses){
            result[this.duoState.courses[course].fromLanguage]=1;
            result[this.duoState.courses[course].learningLanguage]=1;
        }
        return result;
    },
    refresh: function(){
        return JSON.parse(localStorage["duo.state"]);			
    },
    getWeakendSkills: function(fromLanguage,learningLanguage){
        this.duoState = this.refresh();
        var result = {};
        for (var skill in this.duoState.skills){
            if (!fromLanguage) fromLanguage=this.duoState.skills[skill].fromLanguage;
            if (!learningLanguage) learningLanguage=this.duoState.skills[skill].learningLanguage;
            var willreturn = (fromLanguage===this.duoState.skills[skill].fromLanguage) && (learningLanguage===this.duoState.skills[skill].learningLanguage) && (this.duoState.skills[skill].finishedLessons===this.duoState.skills[skill].lessons);
            if (willreturn && this.duoState.skills[skill].strength && this.duoState.skills[skill].strength<1){
                if (!result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage]) {
                    result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage]={};
                }
                this.duoState.skills[skill].URI="/skill/"+this.duoState.skills[skill].learningLanguage+"/"+this.duoState.skills[skill].urlName;
                result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage][this.duoState.skills[skill].name]=this.duoState.skills[skill];
            }
        }
        return result;
    },
    getNewSkills: function(fromLanguage, learningLanguage){
        this.duoState = this.refresh();
        var result = {};
        for (var skill in this.duoState.skills){
            if (!fromLanguage) fromLanguage=this.duoState.skills[skill].fromLanguage;
            if (!learningLanguage) learningLanguage=this.duoState.skills[skill].learningLanguage;
            var willreturn = (fromLanguage===this.duoState.skills[skill].fromLanguage) && (learningLanguage===this.duoState.skills[skill].learningLanguage);
            if (willreturn && this.duoState.skills[skill].accessible && this.duoState.skills[skill].finishedLessons<this.duoState.skills[skill].lessons){
                if (!result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage]) {
                    result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage]={};
                }
                this.duoState.skills[skill].URI="/skill/"+this.duoState.skills[skill].learningLanguage+"/"+this.duoState.skills[skill].urlName;
                result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage][this.duoState.skills[skill].name]=this.duoState.skills[skill];
            }
        }
        return result;
    },
    switchLanguage: function(fromLanguage,learningLanguage){
        $.ajax({//switch language
            type: "POST",
            url: "/api/1/me/switch_language",
            data: {
                from_language: fromLanguage,
                learning_language: learningLanguage
            }
        }).done(function () {
            document.location.href = document.location.protocol + "//" + document.location.hostname;
        });
    },
    dict: {
        "circle": "_3hKMG",
        "circle-hoverable": "_1z_vo _3hKMG",
        "blue": "_2VAWl",
        "gray": "_39kLK",
        "green": "_1na3J",
        "purple": "_2wyKI",
        "red": "_3E0y_",
        "gold": "ewiWc",
        "logo": "NJXKT _1nAJB cCL9P",
        "flag": "_3viv6",
        "flag-cell": "_3I51r _3HsQj _2OF7V",
        "practice-button": "_6Hq2p _1AthD _1lig4 _3IS_q _2cWmF",
        "fr": "_2KQN3",
        "es": "u5W-o",
        "de": "oboa9",
        "pt": "pmGwL",
        "it": "_1PruQ",
        "en": "_2cR-E",
        "ga": "_1vhNM",
        "hu": "_1S3hi",
        "ru": "_1eqxJ",
        "pl": "_3uusw",
        "ro": "_12U6e",
        "nl-NL": "_1fajz",
        "tr": "_1tJJ2",
        "id": "_107sn",
        "ja": "_2N-Uj",
        "uk": "_1zZsN",
        "zh": "xi6jQ",
        "el": "_2tQo9",
        "bn": "_2TXAL",
        "ar": "_1ARRD",
        "hi": "OgUIe",
        "he": "_PDrK",
        "ko": "_2lkzc",
        "vi": "_1KtzC",
        "sv": "_2DMfV",
        "zs": "_2gNgd",
        "cs": "_1uPQW",
        "th": "_2oTcA",
        "un": "t-XH-",
        "eo": "pWj0w",
        "kl": "_6mRM",
        "da": "_1h0xh",
        "dk": "_3AA1F",
        "sn": "q_PD-",
        "no-BO": "_200jU",
        "ca": "mc4rg",
        "cy": "_1jO8h",
        "gn": "_24xu4",
        "sw": "_3T1km",
        "tl": "_1q_MQ",
        "_circle-flag": "_2XSZu",
        "medium-circle-flag": "_1ct7y _2XSZu",
        "micro-circle-flag": "_3i5IF _2XSZu",
        "small-circle-flag": "_3PU7E _2XSZu"
    }
};
basekeys = {
    "supported_lang": [],
    "layout_map": {},
    "base": {
        "raw": {
            "0": [{
                "type": "keylabel",
                "code": "192"
            }, {
                "type": "keylabel",
                "code": "49"
            }, {
                "type": "keylabel",
                "code": "50"
            }, {
                "type": "keylabel",
                "code": "51"
            }, {
                "type": "keylabel",
                "code": "52"
            }, {
                "type": "keylabel",
                "code": "53"
            }, {
                "type": "keylabel",
                "code": "54"
            }, {
                "type": "keylabel",
                "code": "55"
            }, {
                "type": "keylabel",
                "code": "56"
            }, {
                "type": "keylabel",
                "code": "57"
            }, {
                "type": "keylabel",
                "code": "48"
            }, {
                "type": "keylabel",
                "code": "189"
            }, {
                "type": "keylabel",
                "code": "187"
            }, {
                "type": "backspace",
                "code": "8",
                "name": "Backspace"
            }
                 ],
            "1": [{
                "type": "tab special disabled",
                "code": "9",
                "name": "Tab"
            }, {
                "type": "keylabel",
                "code": "81"
            }, {
                "type": "keylabel",
                "code": "87"
            }, {
                "type": "keylabel",
                "code": "69"
            }, {
                "type": "keylabel",
                "code": "82"
            }, {
                "type": "keylabel",
                "code": "84"
            }, {
                "type": "keylabel",
                "code": "89"
            }, {
                "type": "keylabel",
                "code": "85"
            }, {
                "type": "keylabel",
                "code": "73"
            }, {
                "type": "keylabel",
                "code": "79"
            }, {
                "type": "keylabel",
                "code": "80"
            }, {
                "type": "keylabel",
                "code": "219"
            }, {
                "type": "keylabel",
                "code": "221"
            }, {
                "type": "slash",
                "code": "220"
            }
                 ],
            "2": [{
                "type": "caps special switch",
                "code": "20",
                "name": "CapsLock"
            }, {
                "type": "keylabel",
                "code": "65"
            }, {
                "type": "keylabel",
                "code": "83"
            }, {
                "type": "keylabel",
                "code": "68"
            }, {
                "type": "keylabel",
                "code": "70"
            }, {
                "type": "keylabel",
                "code": "71"
            }, {
                "type": "keylabel",
                "code": "72"
            }, {
                "type": "keylabel",
                "code": "74"
            }, {
                "type": "keylabel",
                "code": "75"
            }, {
                "type": "keylabel",
                "code": "76"
            }, {
                "type": "keylabel",
                "code": "186"
            }, {
                "type": "keylabel",
                "code": "222"
            }, {
                "type": "enter special disabled",
                "code": "13",
                "name": "Enter"
            }
                 ],
            "3": [{
                "type": "shift left special switch",
                "code": "16",
                "name": "Shift"
            }, {
                "type": "keylabel",
                "code": "90"
            }, {
                "type": "keylabel",
                "code": "88"
            }, {
                "type": "keylabel",
                "code": "67"
            }, {
                "type": "keylabel",
                "code": "86"
            }, {
                "type": "keylabel",
                "code": "66"
            }, {
                "type": "keylabel",
                "code": "78"
            }, {
                "type": "keylabel",
                "code": "77"
            }, {
                "type": "keylabel",
                "code": "188"
            }, {
                "type": "keylabel",
                "code": "190"
            }, {
                "type": "keylabel",
                "code": "191"
            }, {
                "type": "shift right special disabled",
                "code": "16",
                "name": "Shift"
            }
                 ],
            "4": [{
                "type": "ctrl special disabled",
                "code": "17",
                "name": "Control"
            }, {
                "type": "home special",
                "code": "91",
                "name": "Meta"
            }, {
                "type": "alt special disabled",
                "code": "18",
                "name": "Alt"
            }, {
                "type": "space",
                "code": "32",
                "name": " "
            }, {
                "type": "alt special disabled",
                "code": "18",
                "name": "Alt"
            }, {
                "type": "menu special",
                "code": "93",
                "name": "ContextMenu"
            }, {
                "type": "ctrl right special disabled",
                "code": "17",
                "name": "Control"
            }
                 ]
        }
    },
    "language_names_ui": {
        "el": {
            "gu": "Gujarati",
            "ga": "Ιρλανδικά",
            "gn": "Γουαρανί (Υοπαρά)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Τουρκικά",
            "lv": "Latvian",
            "tl": "Ταγκάλογκ",
            "th": "Ταϊλανδέζικα",
            "te": "Τελούγκου",
            "ta": "Ταμίλ",
            "yi": "Γίντις",
            "dk": "Ντοθράκι",
            "de": "Γερμανικά",
            "db": "Dutch (Belgium)",
            "ko": "Κορεατικά",
            "da": "Δανέζικα",
            "uz": "Uzbek",
            "el": "Ελληνικά",
            "eo": "Εσπεράντο",
            "en": "Αγγλικά",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Ισπανικά",
            "zs": "Κινέζικα",
            "ru": "Ρωσικά",
            "ro": "Ρουμανικά",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Μπενγκάλι",
            "ja": "Ιαπωνικά",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Καταλανικά",
            "xz": "Zombie",
            "cy": "Ουαλικά",
            "cs": "Τσέχικα",
            "pt": "Πορτογαλικά",
            "lt": "Lithuanian",
            "pa": "Παντζαπικά (Γκουρμούκι)",
            "pl": "Πολωνικά",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Υψηλά Βαλυριανά",
            "ht": "Κρεόλ Αϊτής",
            "hu": "Ουγγρικά",
            "hi": "Ινδικά",
            "he": "Εβραϊκά",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Ουκρανικά",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Ολλανδικά",
            "af": "Afrikaans",
            "vi": "Βιετναμέζικα",
            "is": "Icelandic",
            "it": "Ιταλικά",
            "kn": "Kannada",
            "zt": "Κινέζικα (Παραδοσιακά)",
            "as": "Assamese",
            "ar": "Αραβικά",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Ινδονησιακά",
            "nn": "Norwegian (Nynorsk)",
            "no": "Νορβηγικά",
            "nb": "Νορβηγικά (Bokmål)",
            "ne": "Nepali",
            "fr": "Γαλλικά",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Σουαχίλι",
            "sv": "Σουηδικά",
            "km": "Khmer",
            "kl": "Κλίνγκον",
            "sk": "Slovak",
            "sn": "Σίνταριν",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "en": {
            "gu": "Gujarati",
            "ga": "Irish",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Turkish",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Thai",
            "te": "Telugu",
            "ta": "Tamil",
            "yi": "Yiddish",
            "dk": "Dothraki",
            "de": "German",
            "db": "Dutch (Belgium)",
            "ko": "Korean",
            "da": "Danish",
            "uz": "Uzbek",
            "el": "Greek",
            "eo": "Esperanto",
            "en": "English",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Spanish",
            "zs": "Chinese",
            "ru": "Russian",
            "ro": "Romanian",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengali",
            "ja": "Japanese",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Catalan",
            "xz": "Zombie",
            "cy": "Welsh",
            "cs": "Czech",
            "pt": "Portuguese",
            "lt": "Lithuanian",
            "pa": "Punjabi (Gurmukhi)",
            "pl": "Polish",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "High Valyrian",
            "ht": "Haitian Creole",
            "hu": "Hungarian",
            "hi": "Hindi",
            "he": "Hebrew",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Ukrainian",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Dutch",
            "af": "Afrikaans",
            "vi": "Vietnamese",
            "is": "Icelandic",
            "it": "Italian",
            "kn": "Kannada",
            "zt": "Chinese (Traditional)",
            "as": "Assamese",
            "ar": "Arabic",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Indonesian",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norwegian",
            "nb": "Norwegian (Bokmål)",
            "ne": "Nepali",
            "fr": "French",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "Swedish",
            "km": "Khmer",
            "kl": "Klingon",
            "sk": "Slovak",
            "sn": "Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "vi": {
            "gu": "Gujarati",
            "ga": "Tiếng Ai-len",
            "gn": "Tiếng Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Tiếng Thổ Nhĩ Kỳ",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Tiếng Thái",
            "te": "Telugu",
            "ta": "Tamil",
            "yi": "Tiếng Yiddish",
            "dk": "Tiếng Dothraki",
            "de": "Tiếng Đức",
            "db": "Dutch (Belgium)",
            "ko": "Tiếng Hàn Quốc",
            "da": "Tiếng Đan Mạch",
            "uz": "Uzbek",
            "el": "Tiếng Hy Lạp",
            "eo": "Tiếng Esperanto",
            "en": "Tiếng Anh",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Tiếng Tây Ban Nha",
            "zs": "Tiếng Trung Quốc",
            "ru": "Tiếng Nga",
            "ro": "Tiếng Rumani",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Tiếng Bengal",
            "ja": "Tiếng Nhật",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Catalan",
            "xz": "Zombie",
            "cy": "Tiếng Wales",
            "cs": "Tiếng Séc",
            "pt": "Tiếng Bồ Đào Nha",
            "lt": "Lithuanian",
            "pa": "Tiếng Punjab (Gurmukhi)",
            "pl": "Tiếng Ba Lan",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Tiếng High Valyrian",
            "ht": "Thổ ngữ Pháp ở Haiti",
            "hu": "Tiếng Hungary",
            "hi": "Tiếng Hindi",
            "he": "Tiếng Do Thái",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Tiếng Ukraina",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Tiếng Hà Lan",
            "af": "Afrikaans",
            "vi": "Tiếng Việt",
            "is": "Icelandic",
            "it": "Tiếng Ý",
            "kn": "Kannada",
            "zt": "Tiếng Trung Quốc (phồn thể)",
            "as": "Assamese",
            "ar": "Tiếng A-rập",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Tiếng Bahasa Indonesia",
            "nn": "Norwegian (Nynorsk)",
            "no": "Na-uy",
            "nb": "Tiếng Na-uy",
            "ne": "Nepali",
            "fr": "Tiếng Pháp",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "Tiếng Thụy Điển",
            "km": "Khmer",
            "kl": "Tiếng Klingon",
            "sk": "Slovak",
            "sn": "Tiếng Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "it": {
            "gu": "Gujarati",
            "ga": "irlandese",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "turco",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "tailandese",
            "te": "telugu",
            "ta": "tamil",
            "yi": "yiddish",
            "dk": "dothraki",
            "de": "tedesco",
            "db": "Dutch (Belgium)",
            "ko": "coreano",
            "da": "danese",
            "uz": "Uzbek",
            "el": "greco",
            "eo": "esperanto",
            "en": "inglese",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "spagnolo",
            "zs": "cinese",
            "ru": "russo",
            "ro": "rumeno",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "bengali",
            "ja": "giapponese",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Catalano",
            "xz": "Zombie",
            "cy": "Gallese",
            "cs": "ceco",
            "pt": "portoghese",
            "lt": "Lithuanian",
            "pa": "punjabi (gurmukhi)",
            "pl": "polacco",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Alto Valiriano",
            "ht": "creolo haitiano",
            "hu": "ungherese",
            "hi": "hindi",
            "he": "ebraico",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "ucraino",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "olandese",
            "af": "Afrikaans",
            "vi": "vietnamita",
            "is": "Icelandic",
            "it": "italiano",
            "kn": "Kannada",
            "zt": "cinese (tradizionale)",
            "as": "Assamese",
            "ar": "arabo",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "indonesiano",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norvegese",
            "nb": "norvegese (Bokmål)",
            "ne": "Nepali",
            "fr": "francese",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "svedese",
            "km": "Khmer",
            "kl": "klingon",
            "sk": "Slovak",
            "sn": "Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "ar": {
            "gu": "Gujarati",
            "ga": "الإيرلندية",
            "gn": "الجوارانية (اليوبارا)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "التركية",
            "lv": "Latvian",
            "tl": "التاغلوغية",
            "th": "التايلنديّة",
            "te": "تيلوجو",
            "ta": "تاميل",
            "yi": "الييدية",
            "dk": "الدوثراكية",
            "de": "الألمانية",
            "db": "Dutch (Belgium)",
            "ko": "الكوريّة",
            "da": "الدنماركية",
            "uz": "Uzbek",
            "el": "اليونانية",
            "eo": "الإسبرانتو",
            "en": "الإنجليزية",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "الإسبانية",
            "zs": "الصينية",
            "ru": "الروسية",
            "ro": "الرومانية",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "البنغالي",
            "ja": "اليابانية",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "الكتالانية",
            "xz": "Zombie",
            "cy": "الويلزية",
            "cs": "التشيكية",
            "pt": "البرتغالية",
            "lt": "Lithuanian",
            "pa": "البنجابية",
            "pl": "البولندية",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "الفاليرية العُليا",
            "ht": "الكريولية الهايتية",
            "hu": "المجرية",
            "hi": "الهندية",
            "he": "العبرية",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "الأوكرانية",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "الهولندية",
            "af": "Afrikaans",
            "vi": "الفييتنامية",
            "is": "Icelandic",
            "it": "الإيطالية",
            "kn": "Kannada",
            "zt": "الصينية (التقليدية)",
            "as": "Assamese",
            "ar": "العربية",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "الإندونيسية",
            "nn": "Norwegian (Nynorsk)",
            "no": "النرويجية",
            "nb": "النرويجية",
            "ne": "Nepali",
            "fr": "الفرنسية",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "السواحيلية",
            "sv": "السويدية",
            "km": "Khmer",
            "kl": "الكلينجون",
            "sk": "Slovak",
            "sn": "السِّندَرين",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "cs": {
            "gu": "Gujarati",
            "ga": "Irština",
            "gn": "Guaranština (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Turečtina",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Thajština",
            "te": "Telugština",
            "ta": "Tamilština",
            "yi": "Jidiš",
            "dk": "Dothračtina",
            "de": "Němčina",
            "db": "Dutch (Belgium)",
            "ko": "Korejština",
            "da": "Dánština",
            "uz": "Uzbek",
            "el": "Řečtina",
            "eo": "Esperanto",
            "en": "Angličtina",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Španělština",
            "zs": "Čínština",
            "ru": "Ruština",
            "ro": "Rumunština",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengálština",
            "ja": "Japonština",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Katalánština",
            "xz": "Zombie",
            "cy": "Velština",
            "cs": "Čeština",
            "pt": "Portugalština",
            "lt": "Lithuanian",
            "pa": "Paňdžábština (gurmukhi)",
            "pl": "Polština",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Vznešená valyrijština",
            "ht": "Haitská kreolština",
            "hu": "Maďarština",
            "hi": "Hindština",
            "he": "Hebrejština",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Ukrajinština",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Holandština",
            "af": "Afrikaans",
            "vi": "Vietnamština",
            "is": "Icelandic",
            "it": "Italština",
            "kn": "Kannada",
            "zt": "Čínština (tradiční)",
            "as": "Assamese",
            "ar": "Arabština",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Indonéština",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norština",
            "nb": "Norština (Bokmål)",
            "ne": "Nepali",
            "fr": "Francouzština",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Svahilština",
            "sv": "Švédština",
            "km": "Khmer",
            "kl": "Klingonština",
            "sk": "Slovak",
            "sn": "Sindarština",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "id": {
            "gu": "Gujarati",
            "ga": "Bahasa Irlandia",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Bahasa Turki",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Bahasa Thai",
            "te": "Telugu",
            "ta": "Tamil",
            "yi": "Bahasa Yiddi",
            "dk": "Bahasa Dothraki",
            "de": "Bahasa Jerman",
            "db": "Dutch (Belgium)",
            "ko": "Bahasa Korea",
            "da": "Bahasa Denmark",
            "uz": "Uzbek",
            "el": "Bahasa Yunani",
            "eo": "Bahasa Esperanto",
            "en": "Bahasa Inggris",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Bahasa Spanyol",
            "zs": "Bahasa Tionghoa",
            "ru": "Bahasa Rusia",
            "ro": "Bahasa Rumania",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bahasa Bengali",
            "ja": "Bahasa Jepang",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Bahasa Katala",
            "xz": "Zombie",
            "cy": "Wales",
            "cs": "Bahasa Ceska",
            "pt": "Bahasa Portugis",
            "lt": "Lithuanian",
            "pa": "Punjabi (Gurmukhi)",
            "pl": "Bahasa Polandia",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Bahasa Valyria Tingkat Tinggi",
            "ht": "Bahasa Kreole Haiti",
            "hu": "Bahasa Hungaria",
            "hi": "Bahasa Hindi",
            "he": "Bahasa Ibrani",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Bahasa Ukraina",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Bahasa Belanda",
            "af": "Afrikaans",
            "vi": "Bahasa Vietnam",
            "is": "Icelandic",
            "it": "Bahasa Italia",
            "kn": "Kannada",
            "zt": "Cina (Tradisional)",
            "as": "Assamese",
            "ar": "Bahasa Arab",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Bahasa Indonesia",
            "nn": "Norwegian (Nynorsk)",
            "no": "Bahasa Norwegia",
            "nb": "Bahasa Norwegia (Bokmål)",
            "ne": "Nepali",
            "fr": "Bahasa Perancis",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "Bahasa Swedia",
            "km": "Khmer",
            "kl": "Bahasa Klingon",
            "sk": "Slovak",
            "sn": "Bahasa Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "es": {
            "gu": "Gujarati",
            "ga": "irlandés",
            "gn": "Guaraní (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "turco",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "tailandés",
            "te": "Télugu",
            "ta": "Tamil",
            "yi": "Yidis",
            "dk": "dothraki",
            "de": "alemán",
            "db": "Dutch (Belgium)",
            "ko": "coreano",
            "da": "danés",
            "uz": "Uzbek",
            "el": "griego",
            "eo": "esperanto",
            "en": "inglés",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "español",
            "zs": "chino",
            "ru": "ruso",
            "ro": "rumano",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "bengalí",
            "ja": "japonés",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "catalán",
            "xz": "Zombie",
            "cy": "Galés",
            "cs": "checo",
            "pt": "portugués",
            "lt": "Lithuanian",
            "pa": "Panyabí (Gurmukhi)",
            "pl": "polaco",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Alto Valyrio",
            "ht": "Criollo haitiano",
            "hu": "húngaro",
            "hi": "hindi",
            "he": "hebreo",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "ucraniano",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "neerlandés",
            "af": "Afrikaans",
            "vi": "vietnamita",
            "is": "Icelandic",
            "it": "italiano",
            "kn": "Kannada",
            "zt": "chino (tradicional)",
            "as": "Assamese",
            "ar": "árabe",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "indonesio",
            "nn": "Norwegian (Nynorsk)",
            "no": "Noruego",
            "nb": "noruego (bokmål)",
            "ne": "Nepali",
            "fr": "francés",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "sueco",
            "km": "Khmer",
            "kl": "klingon",
            "sk": "Slovak",
            "sn": "sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "zs": {
            "gu": "Gujarati",
            "ga": "爱尔兰语",
            "gn": "瓜拉尼语（何帕拉语）",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "土耳其语",
            "lv": "Latvian",
            "tl": "塔加拉族语",
            "th": "泰语",
            "te": "泰卢固语",
            "ta": "泰米尔语",
            "yi": "意第绪语",
            "dk": "多斯拉克语",
            "de": "德语",
            "db": "Dutch (Belgium)",
            "ko": "韩语",
            "da": "丹麦语",
            "uz": "Uzbek",
            "el": "希腊语",
            "eo": "世界语",
            "en": "英语",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "西班牙语",
            "zs": "中文",
            "ru": "俄语",
            "ro": "罗马尼亚语",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "孟加拉语",
            "ja": "日语",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "加泰罗尼亚语",
            "xz": "Zombie",
            "cy": "威尔士语",
            "cs": "捷克语",
            "pt": "葡萄牙语",
            "lt": "Lithuanian",
            "pa": "旁遮普语（果鲁穆奇语）",
            "pl": "波兰语",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "高等瓦雷利亚语",
            "ht": "海地人讲的法语",
            "hu": "匈牙利语",
            "hi": "印地语",
            "he": "希伯来语",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "乌克兰语",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "荷兰语",
            "af": "Afrikaans",
            "vi": "越南语",
            "is": "Icelandic",
            "it": "意大利语",
            "kn": "Kannada",
            "zt": "中文",
            "as": "Assamese",
            "ar": "阿拉伯语",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "印尼语",
            "nn": "Norwegian (Nynorsk)",
            "no": "挪威语",
            "nb": "挪威语（书面语）",
            "ne": "Nepali",
            "fr": "法语",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "斯瓦希里语",
            "sv": "瑞典语",
            "km": "Khmer",
            "kl": "克林贡语",
            "sk": "Slovak",
            "sn": "辛达林语",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "ru": {
            "gu": "Gujarati",
            "ga": "ирландский",
            "gn": "гуарани (дёпара)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "турецкий",
            "lv": "Latvian",
            "tl": "Тагалог",
            "th": "тайский",
            "te": "телугу",
            "ta": "тамильский",
            "yi": "идиш",
            "dk": "дотракийский",
            "de": "немецкий",
            "db": "Dutch (Belgium)",
            "ko": "корейский",
            "da": "датский",
            "uz": "Uzbek",
            "el": "греческий",
            "eo": "эсперанто",
            "en": "английский",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "испанский",
            "zs": "китайский",
            "ru": "русский",
            "ro": "румынский",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "бенгальский",
            "ja": "японский",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "каталанский",
            "xz": "Zombie",
            "cy": "валлийский",
            "cs": "чешский",
            "pt": "португальский",
            "lt": "Lithuanian",
            "pa": "Панджаби (Гурмукхи)",
            "pl": "польский",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "высокий валирийский",
            "ht": "гаитянский креольский",
            "hu": "венгерский",
            "hi": "хинди",
            "he": "иврит",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "украинский",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "голландский",
            "af": "Afrikaans",
            "vi": "вьетнамский",
            "is": "Icelandic",
            "it": "итальянский",
            "kn": "Kannada",
            "zt": "китайский (традиционный)",
            "as": "Assamese",
            "ar": "арабский",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "индонезийский",
            "nn": "Norwegian (Nynorsk)",
            "no": "норвежский",
            "nb": "норвежский (букмол)",
            "ne": "Nepali",
            "fr": "французский",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "суахили",
            "sv": "шведский",
            "km": "Khmer",
            "kl": "клингонский",
            "sk": "Slovak",
            "sn": "синдарин",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "pt": {
            "gu": "Gujarati",
            "ga": "Irlandês",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Turco",
            "lv": "Latvian",
            "tl": "Tagalo",
            "th": "Tailandês",
            "te": "Telugu",
            "ta": "Tâmil",
            "yi": "Ídiche",
            "dk": "Dothraki",
            "de": "Alemão",
            "db": "Dutch (Belgium)",
            "ko": "Coreano",
            "da": "Dinamarquês",
            "uz": "Uzbek",
            "el": "Grego",
            "eo": "Esperanto",
            "en": "Inglês",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Espanhol",
            "zs": "Chinês",
            "ru": "Russo",
            "ro": "Romeno",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengali",
            "ja": "Japonês",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Catalão",
            "xz": "Zombie",
            "cy": "Galês",
            "cs": "Tcheco",
            "pt": "Português",
            "lt": "Lithuanian",
            "pa": "panjabi (gurmukhi)",
            "pl": "Polonês",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Alto Valiriano",
            "ht": "Crioulo haitiano",
            "hu": "Húngaro",
            "hi": "Híndi",
            "he": "Hebraico",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Ucraniano",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Holandês",
            "af": "Afrikaans",
            "vi": "Vietnamita",
            "is": "Icelandic",
            "it": "Italiano",
            "kn": "Kannada",
            "zt": "Chinês (Tradicional)",
            "as": "Assamese",
            "ar": "Árabe",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Indonésio",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norueguês",
            "nb": "Norueguês (Bokmål)",
            "ne": "Nepali",
            "fr": "Francês",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Suaíli",
            "sv": "Sueco",
            "km": "Khmer",
            "kl": "Klingon",
            "sk": "Slovak",
            "sn": "Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "tr": {
            "gu": "Gujarati",
            "ga": "İrlandaca",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Türkçe",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Tayca",
            "te": "Telugu Dili",
            "ta": "Tamil Dili",
            "yi": "Yidiş",
            "dk": "Dothraki",
            "de": "Almanca",
            "db": "Dutch (Belgium)",
            "ko": "Korece",
            "da": "Danca",
            "uz": "Uzbek",
            "el": "Yunanca",
            "eo": "Esperanto",
            "en": "İngilizce",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "İspanyolca",
            "zs": "Çince",
            "ru": "Rusça",
            "ro": "Rumence",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengalce",
            "ja": "Japonca",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Katalanca",
            "xz": "Zombie",
            "cy": "Galce",
            "cs": "Çekçe",
            "pt": "Portekizce",
            "lt": "Lithuanian",
            "pa": "Pencap Dili (Gurmukhi)",
            "pl": "Lehçe",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Yüksek Valyria Dili",
            "ht": "Haiti Kreyolu",
            "hu": "Macarca",
            "hi": "Hintçe",
            "he": "İbranice",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Ukraynaca",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Flemenkçe",
            "af": "Afrikaans",
            "vi": "Vietnamca",
            "is": "Icelandic",
            "it": "İtalyanca",
            "kn": "Kannada",
            "zt": "Çince (Geleneksel)",
            "as": "Assamese",
            "ar": "Arapça",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Endonezce",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norveççe",
            "nb": "Norveççe (Bokmål)",
            "ne": "Nepali",
            "fr": "Fransızca",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Svahili",
            "sv": "İsveççe",
            "km": "Khmer",
            "kl": "Klingon",
            "sk": "Slovak",
            "sn": "Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "ro": {
            "gu": "Gujarati",
            "ga": "Irlandeză",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Turcă",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Thailandeză",
            "te": "Telugu",
            "ta": "Tamilă",
            "yi": "Idiș",
            "dk": "Dothraki",
            "de": "Germană",
            "db": "Dutch (Belgium)",
            "ko": "Coreeană",
            "da": "Daneză",
            "uz": "Uzbek",
            "el": "Greacă",
            "eo": "Esperanto",
            "en": "Engleză",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Spaniolă",
            "zs": "Chineză",
            "ru": "Rusă",
            "ro": "Română",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengaleză",
            "ja": "Japoneză",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Catalană",
            "xz": "Zombie",
            "cy": "Galeză",
            "cs": "Cehă",
            "pt": "Portugheză",
            "lt": "Lithuanian",
            "pa": "Punjabi (Gurmukhi)",
            "pl": "Poloneză",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Valyriană înaltă",
            "ht": "Creolă haitiană",
            "hu": "Maghiară",
            "hi": "Hindi",
            "he": "Ebraică",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Ucraineană",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Neerlandeză",
            "af": "Afrikaans",
            "vi": "Vietnameză",
            "is": "Icelandic",
            "it": "Italiană",
            "kn": "Kannada",
            "zt": "Chineză (tradițională)",
            "as": "Assamese",
            "ar": "Arabă",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Indoneziană",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norvegiană",
            "nb": "Norvegiană (Bokmål)",
            "ne": "Nepali",
            "fr": "Franceză",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "Suedeză",
            "km": "Khmer",
            "kl": "Klingon",
            "sk": "Slovak",
            "sn": "Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "pl": {
            "gu": "Gujarati",
            "ga": "Irlandzki",
            "gn": "guarani (jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Turecki",
            "lv": "Latvian",
            "tl": "tagalog",
            "th": "Tajski",
            "te": "telugu",
            "ta": "tamilski",
            "yi": "Jidysz",
            "dk": "Dothraki",
            "de": "Niemiecki",
            "db": "Dutch (Belgium)",
            "ko": "Koreański",
            "da": "Duński",
            "uz": "Uzbek",
            "el": "Grecki",
            "eo": "Esperanto",
            "en": "Angielski",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Hiszpański",
            "zs": "Chiński",
            "ru": "Rosyjski",
            "ro": "Rumuński",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengalski",
            "ja": "Japoński",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Kataloński",
            "xz": "Zombie",
            "cy": "Walijski",
            "cs": "Czeski",
            "pt": "Portugalski",
            "lt": "Lithuanian",
            "pa": "pendżabski (gurmukhi)",
            "pl": "Polski",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Wysoki valyriański",
            "ht": "Kreolski haitański",
            "hu": "Węgierski",
            "hi": "Hindi",
            "he": "Hebrajski",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Ukraiński",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Holenderski",
            "af": "Afrikaans",
            "vi": "Wietnamski",
            "is": "Icelandic",
            "it": "Włoski",
            "kn": "Kannada",
            "zt": "Chiński (Tradycyjny)",
            "as": "Assamese",
            "ar": "Arabski",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Indonezyjski",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norweski",
            "nb": "Norweski (Bokmål)",
            "ne": "Nepali",
            "fr": "Francuski",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Suahili",
            "sv": "Szwedzki",
            "km": "Khmer",
            "kl": "klingońskiego",
            "sk": "Slovak",
            "sn": "Sindariński",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "dn": {
            "gu": "Gujarati",
            "ga": "Iers",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Turks",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Thai",
            "te": "Telugu",
            "ta": "Tamil",
            "yi": "Jiddisch",
            "dk": "Dothraki",
            "de": "Duits",
            "db": "Dutch (Belgium)",
            "ko": "Koreaans",
            "da": "Deens",
            "uz": "Uzbek",
            "el": "Grieks",
            "eo": "Esperanto",
            "en": "Engels",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Spaans",
            "zs": "Chinees",
            "ru": "Russisch",
            "ro": "Roemeens",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengaals",
            "ja": "Japans",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Catalaans",
            "xz": "Zombie",
            "cy": "Welsh",
            "cs": "Tsjechisch",
            "pt": "Portugees",
            "lt": "Lithuanian",
            "pa": "Punjabi (Gurmukhi)",
            "pl": "Pools",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Hoog-Valyrisch",
            "ht": "Haïtiaans-Creools",
            "hu": "Hongaars",
            "hi": "Hindi",
            "he": "Hebreeuws",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Oekraïens",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Nederlands",
            "af": "Afrikaans",
            "vi": "Vietnamees",
            "is": "Icelandic",
            "it": "Italiaans",
            "kn": "Kannada",
            "zt": "Chinese (Traditioneel)",
            "as": "Assamese",
            "ar": "Arabisch",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Indonesisch",
            "nn": "Norwegian (Nynorsk)",
            "no": "Noors",
            "nb": "Noors (Bokmål)",
            "ne": "Nepali",
            "fr": "Frans",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "Zweeds",
            "km": "Khmer",
            "kl": "Klingon",
            "sk": "Slovak",
            "sn": "Sindarijns",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "fr": {
            "gu": "Gujarati",
            "ga": "irlandais",
            "gn": "guarani (jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "turc",
            "lv": "Latvian",
            "tl": "tagalog",
            "th": "Thaïlandais",
            "te": "Télougou",
            "ta": "Tamoul",
            "yi": "Yiddish",
            "dk": "dothraki",
            "de": "allemand",
            "db": "Dutch (Belgium)",
            "ko": "coréen",
            "da": "Danois",
            "uz": "Uzbek",
            "el": "grec",
            "eo": "Esperanto",
            "en": "anglais",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "espagnol",
            "zs": "Chinois",
            "ru": "russe",
            "ro": "roumain",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "bengali",
            "ja": "japonais",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "catalan",
            "xz": "Zombie",
            "cy": "gallois",
            "cs": "Tchèque",
            "pt": "portugais",
            "lt": "Lithuanian",
            "pa": "panjabi (gurmukhi)",
            "pl": "polonais",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "haut valyrien",
            "ht": "créole haïtien",
            "hu": "hongrois",
            "hi": "hindi",
            "he": "hébreu",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "ukrainien",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "néerlandais",
            "af": "Afrikaans",
            "vi": "Vietnamien",
            "is": "Icelandic",
            "it": "italien",
            "kn": "Kannada",
            "zt": "Chinois (Traditionnel)",
            "as": "Assamese",
            "ar": "Arabe",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "indonésien",
            "nn": "Norwegian (Nynorsk)",
            "no": "norvégien",
            "nb": "Norvégien (Bokmål)",
            "ne": "Nepali",
            "fr": "français",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "swahili",
            "sv": "suédois",
            "km": "Khmer",
            "kl": "klingon",
            "sk": "Slovak",
            "sn": "sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "de": {
            "gu": "Gujarati",
            "ga": "Irisch",
            "gn": "Guarani (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Türkisch",
            "lv": "Latvian",
            "tl": "Tagalog",
            "th": "Thai",
            "te": "Telugu",
            "ta": "Tamil",
            "yi": "Jiddisch",
            "dk": "Dothraki",
            "de": "Deutsch",
            "db": "Dutch (Belgium)",
            "ko": "Koreanisch",
            "da": "Dänisch",
            "uz": "Uzbek",
            "el": "Griechisch",
            "eo": "Esperanto",
            "en": "Englisch",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Spanisch",
            "zs": "Chinesisch",
            "ru": "Russisch",
            "ro": "Rumänisch",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Bengalisch",
            "ja": "Japanisch",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Katalanisch",
            "xz": "Zombie",
            "cy": "Walisisch",
            "cs": "Tschechisch",
            "pt": "Portugiesisch",
            "lt": "Lithuanian",
            "pa": "Pandschabi (Gurmukhi)",
            "pl": "Polnisch",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Hochvalyrisch",
            "ht": "Haitianisches Creole",
            "hu": "Ungarisch",
            "hi": "Hindi",
            "he": "Hebräisch",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "ukrainisch",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Niederländisch",
            "af": "Afrikaans",
            "vi": "Vietnamesisch",
            "is": "Icelandic",
            "it": "Italienisch",
            "kn": "Kannada",
            "zt": "Chinesisch (traditionell)",
            "as": "Assamese",
            "ar": "Arabisch",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Indonesisch",
            "nn": "Norwegian (Nynorsk)",
            "no": "Norwegisch",
            "nb": "Norwegisch (Bokmål)",
            "ne": "Nepali",
            "fr": "Französisch",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "Swahili",
            "sv": "Schwedisch",
            "km": "Khmer",
            "kl": "Klingonisch",
            "sk": "Slovak",
            "sn": "Sindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "hu": {
            "gu": "Gujarati",
            "ga": "ír",
            "gn": "(jopará) guaraní",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "török",
            "lv": "Latvian",
            "tl": "tagalog",
            "th": "thai",
            "te": "telugu",
            "ta": "tamil",
            "yi": "jiddis",
            "dk": "dothraki",
            "de": "német",
            "db": "Dutch (Belgium)",
            "ko": "koreai",
            "da": "dán",
            "uz": "Uzbek",
            "el": "görög",
            "eo": "eszperantó",
            "en": "angol",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "spanyol",
            "zs": "kínai",
            "ru": "orosz",
            "ro": "román",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "bengáli",
            "ja": "japán",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "katalán",
            "xz": "Zombie",
            "cy": "walesi",
            "cs": "cseh",
            "pt": "portugál",
            "lt": "Lithuanian",
            "pa": "(gurmuki) pandzsábi",
            "pl": "lengyel",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "nemes valyr",
            "ht": "haiti kreol",
            "hu": "magyar",
            "hi": "hindi",
            "he": "héber",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "ukrán",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "holland",
            "af": "Afrikaans",
            "vi": "vietnami",
            "is": "Icelandic",
            "it": "olasz",
            "kn": "Kannada",
            "zt": "kínai (hagyományos)",
            "as": "Assamese",
            "ar": "arab",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "indonéz",
            "nn": "Norwegian (Nynorsk)",
            "no": "norvég",
            "nb": "(bokmål) norvég",
            "ne": "Nepali",
            "fr": "francia",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "szuahéli",
            "sv": "svéd",
            "km": "Khmer",
            "kl": "klingon",
            "sk": "Slovak",
            "sn": "szindarin",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "hi": {
            "gu": "Gujarati",
            "ga": "आयरिश भाषा",
            "gn": "गूरानी (Jopará)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "तुर्कीयाई",
            "lv": "Latvian",
            "tl": "टेगालॉग",
            "th": "थाई",
            "te": "तेलुगु",
            "ta": "तमिल",
            "yi": "Yiddish",
            "dk": "डोथ्राकी",
            "de": "जर्मन",
            "db": "Dutch (Belgium)",
            "ko": "कोरियाई",
            "da": "डेनिश",
            "uz": "Uzbek",
            "el": "यूनानी",
            "eo": "एस्पेरांतो",
            "en": "अंग्रेज़ी",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "स्पेनी",
            "zs": "चीनी",
            "ru": "रूसी",
            "ro": "रोमानियाई",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "बंगाली",
            "ja": "जापानी",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "कैटलन",
            "xz": "Zombie",
            "cy": "वेल्श",
            "cs": "चेक",
            "pt": "पुर्तगाली",
            "lt": "Lithuanian",
            "pa": "पंजाबी (गुरुमुखी)",
            "pl": "पोलिश भाषा",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "हाई वैलिरियन",
            "ht": "हाईटियन क्रियोल",
            "hu": "हंगेरियाई",
            "hi": "हिन्दी",
            "he": "यहूदी",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "यूक्रेनी",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "डच",
            "af": "Afrikaans",
            "vi": "वियतनामी",
            "is": "Icelandic",
            "it": "इतालवी",
            "kn": "Kannada",
            "zt": "चीनी (पारंपरिक)",
            "as": "Assamese",
            "ar": "अरबी",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "इंडोनेशियाई",
            "nn": "Norwegian (Nynorsk)",
            "no": "नार्वेजियन",
            "nb": "नॉर्वेजियाई (बूकमॉल)",
            "ne": "Nepali",
            "fr": "फ़्रांसीसी",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "स्वाहिली",
            "sv": "स्वीडिश",
            "km": "Khmer",
            "kl": "क्लिंगऑन",
            "sk": "Slovak",
            "sn": "सिंदारिन",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "ja": {
            "gu": "Gujarati",
            "ga": "アイルランド語",
            "gn": "グアラニ（ジョパラ）",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "トルコ語",
            "lv": "Latvian",
            "tl": "タガログ語",
            "th": "タイ語",
            "te": "テルグ語",
            "ta": "タミル語",
            "yi": "イディッシュ語",
            "dk": "ドスラク語",
            "de": "ドイツ語",
            "db": "Dutch (Belgium)",
            "ko": "韓国語",
            "da": "デンマーク語",
            "uz": "Uzbek",
            "el": "ギリシャ語",
            "eo": "エスペラント語",
            "en": "英語",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "スペイン語",
            "zs": "中国語",
            "ru": "ロシア語",
            "ro": "ルーマニア語",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "ベンガル語",
            "ja": "日本語",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "カタルーニャ語",
            "xz": "Zombie",
            "cy": "ウェールズ語",
            "cs": "チェコ語",
            "pt": "ポルトガル語",
            "lt": "Lithuanian",
            "pa": "パンジャブ語 (グルムキー)",
            "pl": "ポーランド語",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "ハイ・ヴァリリアン",
            "ht": "ハイチクレオール",
            "hu": "ハンガリー語",
            "hi": "ヒンディー語",
            "he": "ヘブライ語",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "ウクライナ語",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "オランダ語",
            "af": "Afrikaans",
            "vi": "ベトナム語",
            "is": "Icelandic",
            "it": "イタリア語",
            "kn": "Kannada",
            "zt": "中国語 (繁体)",
            "as": "Assamese",
            "ar": "アラビア語",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "インドネシア語",
            "nn": "Norwegian (Nynorsk)",
            "no": "ノルウェー語",
            "nb": "ノルウェー語 (ブークモール)",
            "ne": "Nepali",
            "fr": "フランス語",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "スワヒリ語",
            "sv": "スウェーデン語",
            "km": "Khmer",
            "kl": "クリンゴン語",
            "sk": "Slovak",
            "sn": "シンダール語",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "ko": {
            "gu": "Gujarati",
            "ga": "아일랜드어",
            "gn": "과라니어 (조파라)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "터키어",
            "lv": "Latvian",
            "tl": "필리핀어",
            "th": "태국어",
            "te": "텔루구어",
            "ta": "타밀어",
            "yi": "이디시어",
            "dk": "도뜨라키어",
            "de": "독일어",
            "db": "Dutch (Belgium)",
            "ko": "한국어",
            "da": "덴마크어",
            "uz": "Uzbek",
            "el": "그리스어",
            "eo": "에스페란토어",
            "en": "영어",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "스페인어",
            "zs": "중국어",
            "ru": "러시아어",
            "ro": "루마니아어",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "벵골어",
            "ja": "일본어",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "카탈루냐어",
            "xz": "Zombie",
            "cy": "웨일스어",
            "cs": "체코어",
            "pt": "포르투갈어",
            "lt": "Lithuanian",
            "pa": "펀자브어 (구르무키)",
            "pl": "폴란드어",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "고지 발라리아어",
            "ht": "아이티어",
            "hu": "헝가리어",
            "hi": "힌두어",
            "he": "히브리어",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "우크라이나어",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "네덜란드어",
            "af": "Afrikaans",
            "vi": "베트남어",
            "is": "Icelandic",
            "it": "이탈리아어",
            "kn": "Kannada",
            "zt": "중국어 (정체)",
            "as": "Assamese",
            "ar": "아랍어",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "인도네시아어",
            "nn": "Norwegian (Nynorsk)",
            "no": "노르웨이어",
            "nb": "노르웨이어 (보크몰)",
            "ne": "Nepali",
            "fr": "프랑스어",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "스와힐리어",
            "sv": "스웨덴어",
            "km": "Khmer",
            "kl": "클링온어",
            "sk": "Slovak",
            "sn": "신다린어",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        },
        "uk": {
            "gu": "Gujarati",
            "ga": "Ірландська",
            "gn": "Гуарані (йопара)",
            "gl": "Galician",
            "la": "Latin",
            "tt": "Tatar",
            "tr": "Турецька",
            "lv": "Latvian",
            "tl": "Тагальська мова",
            "th": "Тайська",
            "te": "Телугу",
            "ta": "Таміл",
            "yi": "Ідиш",
            "dk": "Дотракійська",
            "de": "Німецька",
            "db": "Dutch (Belgium)",
            "ko": "Корейська",
            "da": "Данська",
            "uz": "Uzbek",
            "el": "Грецька",
            "eo": "Есперанто",
            "en": "Англійська",
            "zc": "Chinese (Cantonese)",
            "eu": "Basque",
            "et": "Estonian",
            "ep": "English (Pirate)",
            "es": "Іспанська",
            "zs": "Китайська",
            "ru": "Російська",
            "ro": "Румунська",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "ms": "Malay",
            "bn": "Бенгальська",
            "ja": "Японська",
            "or": "Oriya",
            "xl": "Lolcat",
            "ca": "Каталонська",
            "xz": "Zombie",
            "cy": "валлійська",
            "cs": "Чеська",
            "pt": "Португальська",
            "lt": "Lithuanian",
            "pa": "Панджабі (гурмукхі)",
            "pl": "Польська",
            "hy": "Armenian",
            "hr": "Croatian",
            "hv": "Валірійська",
            "ht": "Гаїтянська креольська мова",
            "hu": "Угорська",
            "hi": "Гінді",
            "he": "Іврит",
            "mb": "Malay (Brunei)",
            "mm": "Malay (Malaysia)",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mk": "Macedonian",
            "ur": "Urdu",
            "kk": "Kazakh",
            "uk": "Українська",
            "mr": "Marathi",
            "my": "Burmese",
            "dn": "Голандська",
            "af": "Afrikaans",
            "vi": "В’єтнамська",
            "is": "Icelandic",
            "it": "Італійська",
            "kn": "Kannada",
            "zt": "Китайська (традиційна)",
            "as": "Assamese",
            "ar": "Арабська",
            "zu": "Zulu",
            "az": "Azeri",
            "id": "Індонезійська",
            "nn": "Norwegian (Nynorsk)",
            "no": "Норвезька",
            "nb": "Норвезька (Букмол)",
            "ne": "Nepali",
            "fr": "Французька",
            "fa": "Farsi",
            "fi": "Finnish",
            "fo": "Faroese",
            "ka": "Georgian",
            "ss": "Swedish (Sweden)",
            "sq": "Albanian",
            "sw": "суахілі",
            "sv": "Шведська",
            "km": "Khmer",
            "kl": "Клінгонська",
            "sk": "Slovak",
            "sn": "Синдарин",
            "sl": "Slovenian",
            "ky": "Kyrgyz",
            "sf": "Swedish (Finland)"
        }
    },
    "supported": function(lang){
        if (this.supported_lang.indexOf(lang)!==-1){return lang;}
        if (this.layout_map[lang]) {return this.supported_lang[this.layout_map[lang]];}
        return -1;
    }
};
virtKeyboard = {
    version: "0.0.13",
	/* production link *
	rawgit: "https://cdn.rawgit.com/i-algurabi/DuoVirtKeyboard/60f6714af55c5b9da53c09b776edbe58ea6f74b8/",
	* production link */
	/* test link */
	rawgit: "https://rawgit.com/i-algurabi/DuoVirtKeyboard/master/",
	/* test link */
    show: true,
    apply: true,
    shift: false,
    caps: false,
    newcodepage: false,
    newlang: "",
    mainlang: "",
    secondlang: "",
    body: "<div id='virt-keyboard' class='vrt-hidden'><header class='vrt-topbar'><div class='vrt-toggledropdown vrt-main'><span class='vrt-langspan vrt-main'>English</span><ul class='vrt-dropdown vrt-arrow-top vrt-main' id='vrt-mainlang' data-language='en'></ul></div><div class='vrt-keycodesetting vrt-normal-key vrt-hidden'><input id='vrt-normal-key' placeholder='Regular character' /></div><div class='v-logo v-big'><ul class='vrt-download vrt-arrow-top'></ul></div><div class='vrt-keycodesetting vrt-shift-key vrt-hidden'><input id='vrt-shift-key' placeholder='Shift character' /></div><div class='vrt-toggledropdown vrt-secondary'><span class='vrt-langspan vrt-secondary'>English</span><ul class='vrt-dropdown vrt-arrow-top vrt-secondary' id='vrt-secondarylang' data-language='en'></ul></div><div class='v-close'><span class='v-close'></span></div></header><div class='vrt-section'></div></div>",
    saveToLocalStorage: function (parameter, value) {
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            localStorage["keyboard." + parameter] = JSON.stringify(value);
            return true;
        }
        return false;
    },
    getFromLocalStorage: function (parameter) {
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            var param = localStorage["keyboard." + parameter];
            if (param) return JSON.parse(param);
        }
        return false;
    },
    fillKeyboard: function(lang0,lang1){
        if (!lang0) lang0 = virtKeyboard.mainlang;
        if (!lang1) lang1 = lang0===virtKeyboard.secondlang?virtKeyboard.mainlang:virtKeyboard.secondlang;
        if (!(lang0 && lang1)) {
            console.error("Language keycodes not provided.");
            return false;
        }
        for (var keycode in basekeys[lang0]){
            var mainlabel = basekeys[lang0][keycode];
            var secondarylabel={};
            var mainclass = "l4";
            var updatekey = "." + keycode;
            $(updatekey).html("");
            var span0 = $("<span>");
            if (lang1 && lang1!==lang0 && basekeys[lang1]) {
                secondarylabel = basekeys[lang1][keycode];
                var span2 = $("<span>");
                if (secondarylabel.normal !== mainlabel.normal){
                    mainclass = "l0";
                    span2.addClass("l8");
                    span2[0].textContent = secondarylabel.normal.toUpperCase();
                    $(updatekey).append(span2);
                }
                if (secondarylabel.shift !== mainlabel.shift && secondarylabel.shift.toLowerCase() !== secondarylabel.normal){
                    mainclass = "l0";
                    var span3 = $("<span>");
                    span3.addClass("l2");
                    span3[0].textContent = secondarylabel.shift;
                    $(updatekey).append(span3);
                }
            }
            if (mainlabel.normal === mainlabel.shift.toLowerCase()){//if this is a letter
                span0.addClass(mainclass);
                span0[0].textContent = mainlabel.shift;
                $(updatekey).append(span0);
            } 
            else {//some other symbol
                var span1 = $("<span>");
                span0.addClass("l0");
                span0[0].textContent = mainlabel.shift;
                span1.addClass("l6");
                span1[0].textContent = mainlabel.normal;
                $(updatekey).append(span0);
                $(updatekey).append(span1);
            }
        }
    },
    typecustomchar: function(inputf,charcode,input_lang, key){
        var inputtext = $(inputf).val();
        var selStart = $(inputf)[0].selectionStart;
        var selEnd = $(inputf)[0].selectionEnd;
        if (selStart === undefined) {
            selStart = selEnd = inputtext.length;
        }
        var inputs = "";
        if (basekeys[input_lang][charcode]) {
            var changecase="";
            if (virtKeyboard.shift){
                if(!$(".shift.left").hasClass("hover")) {$(".shift.left").addClass("hover");}
                inputs = basekeys[input_lang][charcode].shift;
                changecase = "toLowerCase";
            } 
            else {
                if($(".shift.left").hasClass("hover")) {$(".shift.left").removeClass("hover");}
                inputs = basekeys[input_lang][charcode].normal;
                changecase = "toUpperCase";
            }
            if (virtKeyboard.caps){
                try{//try to change case
                    inputs=inputs[changecase]();
                }
                catch(e){/*do nothing*/}
                if(!$(".caps").hasClass("hover")) {$(".caps").addClass("hover");}
            } 
            else {
                if($(".caps").hasClass("hover")) {$(".caps").removeClass("hover");}
            }
        }
        else{
            if (charcode===8) {
                selStart = inputtext.length-1;
            }
            if (charcode===32) {
                inputs = " ";
            }
        }
        var z = inputtext.slice(0, selStart) + inputs + inputtext.slice(selEnd);
        $(inputf).focus();
        $(inputf).val(z);
        $(inputf).attr("value", z);
        $(inputf)[0].selectionStart = $(inputf)[0].selectionEnd = selStart + inputs.length;
        var restore = !$("#virt-keyboard").hasClass("vrt-keep");
        if (restore) $("#virt-keyboard").addClass("vrt-keep");
        $(inputf).blur();
        if (restore) $("#virt-keyboard").removeClass("vrt-keep");
        $(inputf).focus();
    },
    updatesecondary: function(){
        var divider = $("<li>");
        divider.addClass("vrt-divider vrt-new");
        $(".vrt-dropdown.vrt-secondary").addClass("vrt-settings");
        $(".vrt-dropdown.vrt-secondary").append(divider);
        for (var langcode in basekeys.language_names_ui[virtKeyboard.mainlang]){
            if (basekeys.supported_lang.indexOf(langcode) === -1){
                var langname = basekeys.language_names_ui[virtKeyboard.mainlang][langcode];
                var newentry = $("<li>");
                newentry.addClass("vrt-data-choice vrt-new");
                newentry.data("language",langcode);
                newentry[0].textContent = langname;
                $(".vrt-dropdown.vrt-secondary").append(newentry);
            }
        }
    },
    updatecodepages: function(newlangcode, update){
        console.debug("Configure language: [" + newlangcode + "] " + basekeys.language_names_ui[virtKeyboard.mainlang][newlangcode]);
        if(!basekeys[newlangcode]||update){
            virtKeyboard.newcodepage = true;
            virtKeyboard.newlang = newlangcode;
            $(".vrt-keycodesetting").show();
        }
    },
    getlanguagename: function(langcode, ui_main){
        if (!ui_main) ui_main = virtKeyboard.mainlang;
        var ui_langs = basekeys.language_names_ui[ui_main];
        var langname = ui_langs[langcode].split("");
        langname[0] = langname[0].toUpperCase();
        return langname.join("");
    },
    updatesupportedlangs: function(isDL){
        var ddclass = isDL?".vrt-download":".vrt-dropdown";
        var dchclass = isDL?"vrt-dl-choice":"vrt-data-choice";
        isDL?$(ddclass + " > a").remove():$(ddclass + " > li").remove();
        var lang0 = $("textarea").attr("lang");
        var namednodes={
            main:{
                name:virtKeyboard.getlanguagename(virtKeyboard.mainlang),
                node:$("#vrt-mainlang >." + dchclass)[0],
                code:virtKeyboard.mainlang
            },
            secondary:{
                name:virtKeyboard.getlanguagename(virtKeyboard.secondlang),
                node:$("#vrt-secondarylang >." + dchclass)[0],
                code:virtKeyboard.secondlang
            }
        };
        var ui_langs = (basekeys.language_names_ui[virtKeyboard.mainlang]?basekeys.language_names_ui[virtKeyboard.mainlang]:basekeys.language_names_ui.en);
        for (var i in basekeys.supported_lang){
            var langcode = basekeys.supported_lang[i];
            var newentry = $("<li>");
            newentry.addClass(dchclass);
            newentry.data("language",langcode);
            newentry[0].textContent = virtKeyboard.getlanguagename(langcode);
            if (isDL) {
                var a_link = $("<a>");
                var temp = {
                    "lang": langcode,
                    "keysmap": basekeys[langcode]
                };
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(temp));
                a_link.attr("href",dataStr);
                a_link.attr("download", "keyboard." + langcode + ".json");
                a_link.append(newentry.append($("<i class=\x22material-icons\x22>save</i>")));
                $(ddclass).append(a_link);
            }
            else {
                $(ddclass).append(newentry);
            }
            var node = undefined;
            if(virtKeyboard.mainlang === langcode) {
                node = $("#vrt-mainlang >." + dchclass)[$("#vrt-mainlang >." + dchclass).length-1];
                namednodes.main.name = virtKeyboard.getlanguagename(langcode);
                namednodes.main.node = node;
                namednodes.main.code = langcode;
            }
            if(virtKeyboard.secondlang === langcode) {
                node = $("#vrt-secondarylang >." + dchclass)[$("#vrt-mainlang >." + dchclass).length-1];
                namednodes.secondary.name = virtKeyboard.getlanguagename(langcode);
                namednodes.secondary.node = node;
                namednodes.secondary.code = langcode;
            }
        }
        if (!isDL){
            for (var nodetype in namednodes) {
                var tnode = namednodes[nodetype].node||$("#vrt-"+nodetype+"lang >." + dchclass)[0];
                $(tnode).addClass("vrt-active").siblings().removeClass("vrt-active");
                $("#vrt-" + nodetype + "lang").data("language",namednodes[nodetype].code);
                $("span.vrt-langspan.vrt-" + nodetype)[0].textContent = namednodes[nodetype].name;
            }
        }
    },
    drawKeyboard: function(){
        $(".vrt-section").html("");
        var baseraws = basekeys.base.raw;
        for (var i in baseraws){
            var virtkeyraw = baseraws[i];
            var ul = $("<ul>");
            ul.addClass("row");
            ul.addClass(i);
            for (var n in virtkeyraw){
                var li = $("<li class=\x22key\x22>");
                var keyhtml= $("<div data-keycode=\x22" + virtkeyraw[n].code + "\x22 class=\x22keylabel " + virtkeyraw[n].code + "\x22>");
                if (virtkeyraw[n].name) {keyhtml.data("name",virtkeyraw[n].name);}
                if(virtkeyraw[n].type !== "keylabel") {
                    li.addClass(virtkeyraw[n].type);
                    li.data("type",virtkeyraw[n].type);
                }
                ul.append(li.append(keyhtml));
            }
            $(".vrt-section").append(ul);
        }
    },
    updateBase: function(jsonObj){
        for (var subobj in jsonObj) {
            basekeys[subobj] = jsonObj[subobj];
        }
    },
    updateLangs: function(update){
        if (!update) {update={};}
        for (var lcode in update) {
            if (basekeys.supported_lang.indexOf(lcode)!==-1) {
                $.ajax({//get language layout
                    type: "get",
                    url: virtKeyboard.rawgit + "duo/keyboard." + lcode + ".json"
                }).done(function (json) {
                    basekeys[json.lang] = json.keysmap;
                    if (basekeys[$("#vrt-mainlang").data("language")] && basekeys[$("#vrt-secondarylang").data("language")]) {
                        virtKeyboard.fillKeyboard($("#vrt-mainlang").data("language"), $("#vrt-secondarylang").data("language"));
                    }
                    virtKeyboard.saveToLocalStorage("keys", basekeys);
                });
            }
        }
        virtKeyboard.fillKeyboard($("#vrt-mainlang").data("language"), $("#vrt-secondarylang").data("language"));
        virtKeyboard.virtKeyOnClick();
    },
    virtKeyOnClick: function() {
        $.fn.draggable = function(){
            var $this = this,
                ns = 'draggable_'+(Math.random()+'').replace('.',''),
                mm = 'mousemove.'+ns,
                mu = 'mouseup.'+ns,
                $w = $(window),
                isFixed = ($this.css('position') === 'fixed'),
                adjX = 0, adjY = 0;
            $this.mousedown(function(ev){
                var pos = $this.position();
                if (isFixed) {
                    adjX = $w.scrollLeft(); adjY = $w.scrollTop();
                }
                var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
                $this.data(ns,{ x : ox, y: oy });
                $w.on(mm, function(ev){
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (isFixed) {
                        adjX = $w.scrollLeft(); adjY = $w.scrollTop();
                    }
                    var offset = $this.data(ns);
                    $this.css({left: ev.pageX - adjX - offset.x, top: ev.pageY - adjY - offset.y});
                });
                $w.on(mu, function(){
                    $w.off(mm + ' ' + mu).removeData(ns);
                });
            });
            return this;
        },
            $("#virt-keyboard").on("click", ".key", function (){
            var inputfield = $("textarea");
            var keycode = $(this).find("div").data("keycode");
            var keyname = $(this).find("div").data("name");
            if($(this).hasClass("home")){
                if (!$(".home").hasClass("switch")) {
                    $(".home").addClass("switch");
                }
                if(!$(".vrt-dropdown.vrt-secondary").hasClass("vrt-settings")){
                    virtKeyboard.updatesecondary();
                }
                else {
                    virtKeyboard.newcodepage = false;
                    $(".vrt-keycodesetting").hide();
                    $(".vrt-dropdown.vrt-secondary").removeClass("vrt-settings");
                    $(".vrt-dropdown.vrt-secondary").removeClass("vrt-update");
                    $(".vrt-dropdown.vrt-secondary > li.vrt-new").remove();
                    virtKeyboard.saveToLocalStorage("keys", basekeys);
                    virtKeyboard.updatesupportedlangs();
                }
            }
            if($(this).hasClass("menu")){
                if (!$(".menu").hasClass("switch")) {
                    $(".menu").addClass("switch");
                }
                if(!$(".vrt-dropdown.vrt-secondary").hasClass("vrt-settings")){
                    $(".vrt-dropdown.vrt-secondary").addClass("vrt-update");
                    virtKeyboard.updatesecondary();
                }
                else {
                    virtKeyboard.newcodepage = false;
                    $(".vrt-keycodesetting").hide();
                    $(".vrt-dropdown.vrt-secondary").removeClass("vrt-settings");
                    $(".vrt-dropdown.vrt-secondary").removeClass("vrt-update");
                    $(".vrt-dropdown.vrt-secondary > li.vrt-new").remove();
                    virtKeyboard.saveToLocalStorage("keys", basekeys);
                    virtKeyboard.updatesupportedlangs();
                }
            }
            if($(this).hasClass("special")){
                $(this).toggleClass("hover");
                if ($(this).hasClass("shift") && $(this).hasClass("left")){
                    virtKeyboard.shift = virtKeyboard.shift?false:true;
                }
                if ($(this).hasClass("caps")){
                    virtKeyboard.caps = virtKeyboard.caps?false:true;
                }
                var keypressed = jQuery.Event({ "type":"keypress", "keyCode":keycode, "which":keycode, "shiftKey":virtKeyboard.shift, "key":keyname});
                $(inputfield).trigger(keypressed);
                $(inputfield).focus();
                return true;
            }
            if (!virtKeyboard.newcodepage) {//propogate pressed key
                var input_lang = basekeys.supported(inputfield.attr("lang"));
                if (input_lang === -1) {
                    input_lang = virtKeyboard.mainlang;
                }
                if (inputfield) {
                    virtKeyboard.typecustomchar(inputfield, keycode, input_lang);
                    //$(inputfield).focus();
                }
            }
            else {//set up new values for pressed key
                var nfield = $("#vrt-normal-key");
                var sfield = $("#vrt-shift-key");
                if (basekeys.supported_lang.indexOf(virtKeyboard.newlang) === -1) {basekeys.supported_lang.push(virtKeyboard.newlang);}
                if (!basekeys[virtKeyboard.newlang]){basekeys[virtKeyboard.newlang] = JSON.parse(JSON.stringify(basekeys[$("#vrt-mainlang").data("language")]));}
                if (nfield.val()!==""){
                    basekeys[virtKeyboard.newlang][keycode].normal = nfield.val();
                }
                if (sfield.val()!==""){
                    basekeys[virtKeyboard.newlang][keycode].shift = sfield.val();
                }
                virtKeyboard.fillKeyboard($("#vrt-mainlang").data("language"), virtKeyboard.newlang);
            }
        });
        $("#virt-keyboard").on("click", ".vrt-data-choice", function(){
            if(!$(this).hasClass("vrt-active") && !$(this).hasClass("vrt-new")) {
                $(this).addClass("vrt-active").siblings().removeClass("vrt-active");
            }
            $(this).parent().data("language", $(this).data("language"));
            $(this).parent().parent().find("span.vrt-langspan")[0].textContent = $(this)[0].textContent;
            if ($(".vrt-dropdown.vrt-secondary").hasClass("vrt-settings")) {
                virtKeyboard.updatecodepages($(this).data("language"),$(this).parent().hasClass("vrt-update"));
            }
            virtKeyboard.fillKeyboard($("#vrt-mainlang").data("language"), $("#vrt-secondarylang").data("language"));
            $(this).parent().off("mouseleave");
            $(this).parent().slideUp("medium");
        });
        $(".vrt-toggledropdown").on("click", function (){
            var dropdownmenu = $(this).find("ul.vrt-dropdown");
            if (dropdownmenu.is(":visible")) {
                dropdownmenu.slideUp("medium");
                $(".vrt-toggledropdown").off("mouseleave");
            }
            else {
                $(".vrt-toggledropdown").on("mouseleave", function () {
                    dropdownmenu.slideUp("medium");
                });
                dropdownmenu.slideDown("medium");
            }
            dropdownmenu.off("mouseleave");
            dropdownmenu.on("mouseleave", function () {
                $(".vrt-toggledropdown").off("mouseleave");
                dropdownmenu.slideUp("medium");
            });
        });
        $(".vrt-logo").on("click", function (){
            virtKeyboard.updatesupportedlangs(true);
            var dropdownmenu = $(this).find("ul.vrt-download");
            if (dropdownmenu.is(":visible")) {
                dropdownmenu.slideUp("medium");
            }
            else {
                dropdownmenu.slideDown("medium");
            }
            dropdownmenu.off("mouseleave");
            dropdownmenu.on("mouseleave", function () {
                dropdownmenu.slideUp("medium");
            });
        });
        $(document).on("keydown", "textarea", function (keypressed) {
            if (virtKeyboard.apply) {
                //getting code for input language
                var virtkey = $("." + keypressed.keyCode).parent();
                virtkey.addClass("virthover");
                setTimeout(function() {
                    virtkey.removeClass("virthover");
                }, 600);
                var input_lang = basekeys.supported($(this).attr("lang"));
                if (input_lang === -1) {
                    input_lang = virtKeyboard.mainlang;
                }
                virtKeyboard.shift = keypressed.shiftKey;
                virtKeyboard.caps = ((virtKeyboard.caps && keypressed.keyCode===20) ||
                                     ((keypressed.keyCode > 57 || virtKeyboard.caps) &&
                                      (virtKeyboard.shift !== (keypressed.key === String.fromCharCode(keypressed.keyCode)) && keypressed.key.length === String.fromCharCode(keypressed.keyCode).length)));
                if (!(keypressed.keyCode === 8 || keypressed.keyCode === 32) && !(basekeys[input_lang]) || !basekeys[input_lang][keypressed.keyCode] || keypressed.altKey || keypressed.ctrlKey || keypressed.keyCode < 32) {
                    return true;
                }
                virtKeyboard.typecustomchar(this, keypressed.keyCode, input_lang, keypressed.key);
                keypressed.preventDefault();
                //return false;
            }
        });
    },
    getCookie: function(name,mime){
        var cookies = document.cookie.split(';');
        for (var i in cookies){
            if (cookies[i].indexOf(name) === 1) {
                return cookies[i].split("=")[1];
            }
        }
        return false;
    },
    getLoggedInUserId: function() {
        var e = virtKeyboard.getCookie("auth_tkt") || "";
        var t = e.match(/[0-9a-f]{40}(\d+)!/);
        if (t)
            return parseInt(t[1], 10);
        //throw Error("auth_tkt missing");
    },
    completeInit: function(){
        virtKeyboard.drawKeyboard();
        virtKeyboard.updatesupportedlangs();
        virtKeyboard.updateLangs(userInfo.getLangs());
    },
    init: function(){
        $("body").append(virtKeyboard.body);
        $("#virt-keyboard").hover(function(){
            $("#virt-keyboard").addClass("vrt-keep");
        },function(){
            $("#virt-keyboard").removeClass("vrt-keep");
        });
        $(document).on("click", ".v-logo", function(){
            virtKeyboard.show=virtKeyboard.show?false:true;
            virtKeyboard.apply=true;
            $(".v-logo").removeClass("v-disabled");
            $(this).toggleClass("v-show");
        });
        $(document).on("click", ".v-close", function(){
            virtKeyboard.show=false;
            $(".v-logo").removeClass("v-show");
            $(".v-logo").addClass("v-disabled");
            virtKeyboard.apply=false;
            $("#virt-keyboard").hide();
        });
        $(document).on("focus", "textarea", function(){
            $(this).val($(this).attr("value"));
            $(this)[0].innerText = $(this).attr("value");
            var visible = $("#virt-keyboard:visible").length>0;
            if (virtKeyboard.show && !visible) {
                virtKeyboard.updatesupportedlangs();
                virtKeyboard.fillKeyboard($(this).attr("lang"));
                $("#virt-keyboard").show("slow");
            }
        });
        $(document).on("focusout", "textarea", function(){
            $(this).val($(this).attr("value"));
            $(this)[0].innerText = $(this).attr("value");
            if (!$("#virt-keyboard").hasClass("vrt-keep")){
                $("#virt-keyboard").hide();
            }
        });
        var oldkeys = virtKeyboard.getFromLocalStorage("keys");
        if (!oldkeys) {
            $.ajax({//get base keyboard layout
                type: "get",
                url: virtKeyboard.rawgit + "duo/keyboard.base.json"
            }).done(function (json) {
                virtKeyboard.updateBase(json);
                virtKeyboard.completeInit();
            });
        }
        else {
            virtKeyboard.updateBase(oldkeys);
            virtKeyboard.completeInit();
        }
        $("#virt-keyboard").draggable();
    },
    preinit: function(){
        $.ajax({//get base keyboard layout
            type: "get",
            url: virtKeyboard.rawgit + "duo/keyboard.base.json"
        }).done(function (json) {
            var v_update = false;
            for (var sl in basekeys.supported_lang){
                if (basekeys.supported_lang[sl]!==json.supported_lang[sl]) {v_update=true;}
            }
            if (v_update) {
                console.info("Updateing VirtKeyboard language pack");
                virtKeyboard.updateBase(json);
                virtKeyboard.updateLangs(userInfo.getLangs());
            }
        });
        if (duo.version) {
            if ($(".v-logo").length===0){
                var vKeyboardLogo = $("<span>");
                vKeyboardLogo.addClass("v-logo v-show");
                if ($("." + userInfo.dict.logo.split(" ").join(".")).next("div").after(vKeyboardLogo).length===0) $($("a[href='/'")[0]).next("div").after(vKeyboardLogo);
            }
            console.info("VirtKeyboard: v." + virtKeyboard.version);
            userInfo.duoState = userInfo.refresh();
            virtKeyboard.mainlang = userInfo.duoState.user.fromLanguage||"en";
            virtKeyboard.secondlang = userInfo.duoState.user.learningLanguage||"en";
            virtKeyboard.init();
        }
    }
};
sidepanel = {
    version: "0.0.4",
    html: "<div class='sidepanel'>",
    init: function(){
        console.info("sidepanel: v." + sidepanel.version);
        $("body").append(this.html);
        $(".sidepanel").hover(
            function(){
                $(this).animate({'left': '-10px'}, 100);
            },
            function(){
                $(this).animate({'left': '-484px'}, 100);
            }
        );
        /*
		$(document).on("mouseout",".sidepanel", function(){
			$(".sidepanel").removeClass("expand");
		});
*/
        userInfo.duoState = userInfo.refresh();
        var courseslist = $("<ul class='courses'>");
        for (var course in userInfo.duoState.courses) {
            var li = $("<li class='course'>");
            var span1 = $("<span>");
            var span2 = $("<span>");
            span1.addClass(userInfo.dict.flag + " from");
            span2.addClass(userInfo.dict.flag + " to");
            var fromLanguage = userInfo.duoState.courses[course].fromLanguage;
            var learningLanguage = userInfo.duoState.courses[course].learningLanguage;
            li.data("fromLanguage",fromLanguage);
            li.data("learningLanguage",learningLanguage);
            span1.addClass(userInfo.dict[fromLanguage]);
            span2.addClass(userInfo.dict[learningLanguage]);
            var weakspan = $("<div class='skill weak'>");
            var newspan = $("<div class='skill new'>");
            var weakSkills = userInfo.getWeakendSkills(fromLanguage,learningLanguage)[learningLanguage + "<" + fromLanguage];
            var newSkills = userInfo.getNewSkills(fromLanguage,learningLanguage)[learningLanguage + "<" + fromLanguage];
            if (learningLanguage === userInfo.duoState.user.learningLanguage &&
                fromLanguage === userInfo.duoState.user.fromLanguage) {
                var prevWeak = $(virtKeyboard.getFromLocalStorage("weakspan").html)||$("");
                var prevNew = $(virtKeyboard.getFromLocalStorage("newspan").html)||$("");
                li.addClass("active");
                for (var skill in weakSkills){
                    var a_href = "a[href='" + weakSkills[skill].URI + "']";
                    var oClone = prevWeak.filter(a_href).clone();
                    var nClone = oClone.length>0?oClone:$(a_href).clone();
                    nClone.addClass("micro");
                    weakspan.append(nClone);
                }
                for (var skill in newSkills){
                    var a_href = "a[href='" + newSkills[skill].URI + "']";
                    var oClone = prevNew.filter(a_href).clone();
                    var nClone = oClone.length>0?oClone:$(a_href).clone();
                    nClone.addClass("micro");
                    newspan.append(nClone);
                }
                virtKeyboard.saveToLocalStorage("weakspan",{"html":weakspan.html()});
                virtKeyboard.saveToLocalStorage("newspan",{"html":newspan.html()});
            }
            else {
                var color = ["red","blue","green"];
                var i = 0;
                for (var skill in weakSkills){
                    i++;
                    var nClone = $("<span class='skills'>");
                    nClone.addClass(userInfo.dict[color[i%3]]);
                    weakspan.append(nClone);
                }
                for (var skill in newSkills){
                    i++;
                    var nClone = $("<span class='skills'>");
                    nClone.addClass(userInfo.dict[color[i%3]]);
                    newspan.append(nClone);
                }
            }
            li.append(span1);
            li.append(span2);
            if (weakspan.find("span").length>0) li.append(weakspan);
            if (newspan.find("span").length>0) li.append(newspan);
            courseslist.append(li);
        }
        $(".sidepanel").append(courseslist);
        $("li.course").on("click", function(){
            userInfo.switchLanguage($(this).data("fromLanguage"),$(this).data("learningLanguage"));
        });
    }
};

script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
vrtcss = document.createElement('link');
vrtcss.rel = "stylesheet";
vrtcss.href = virtKeyboard.rawgit + "css/style.css";
//vrtcss.href = "https://rawgit.com/i-algurabi/46909ac8f7ebb51642b11748977c51ec/raw/305183b7ec12477eba267c89aa9ef6fb98b404d3/style.css";
document.getElementsByTagName('head')[0].appendChild(script);
document.getElementsByTagName('head')[0].appendChild(vrtcss);
setTimeout(function () {
    virtKeyboard.preinit();
    sidepanel.init();
}, 4000);
