// ==UserScript==
// @name        DuoVirtKeyboard
// @namespace        duolingo
// @description        This userscript allows you to use a virtual onscreen keyboard with customizable layouts. Adding automatic keyboard layout switching to both virtual and physical keyboards
// @version        0.0.35
// @author        IceCube aka i.algurabi, (c) 2017
// @include        https://*.duolingo.com/*
// @updateURL        https://rawgit.com/i-algurabi/DuoVirtKeyboard/master/DuoVirtKeyboard.meta
// @downloadURL        https://rawgit.com/i-algurabi/DuoVirtKeyboard/master/DuoVirtKeyboard.user.js
// @grant        none
// ==/UserScript==
userInfo = {
    "documentdir":"",
    "duoState": null,
    "firstrefresh": true,
    "needrefresh": false,
    "getLangs": function () {
        this.duoState = this.refresh();
        var result = {};
        try {
            for (var course in this.duoState.courses) {
                result[this.duoState.courses[course].fromLanguage] = (basekeys[this.duoState.courses[course].fromLanguage] === undefined);
                result[this.duoState.courses[course].learningLanguage] = (basekeys[this.duoState.courses[course].learningLanguage] === undefined);
            }
        }
        catch (e) {
        }
        return result;
    },
    "refresh": function () {
        var duoStateSTR = localStorage["duo.state"];
        if (duoStateSTR) {
            userInfo.firstrefresh = false;
            return JSON.parse(localStorage["duo.state"]);
        } else {
            userInfo.enrichUser();
        }
    },
    "enrichUser": function (params) {
        userInfo.needrefresh = false;
        if (!params)
            params = "courses,currentCourse,fromLanguage,learningLanguage";
        $.ajax({
            type: "get",
            url: "//www.duolingo.com/2016-04-13/users/" + userInfo.getLoggedInUserId(),
            data: {"fields": params}
        }).done(function (json) {
            var jsonDuoState = {};
            if (!userInfo.firstrefresh) {
                jsonDuoState = JSON.parse(localStorage["duo.state"]);
            }
            if (json.fromLanguage) {
                jsonDuoState.user = {"fromLanguage": json.fromLanguage};
                jsonDuoState.user.learningLanguage = json.learningLanguage;
            }
            if (json.courses) {
                if (!jsonDuoState.courses)
                    jsonDuoState.courses = {};
                for (var course in json.courses) {
                    if (!jsonDuoState.courses[json.courses[course].learningLanguage + "<" + json.courses[course].fromLanguage])
                        jsonDuoState.courses[json.courses[course].learningLanguage + "<" + json.courses[course].fromLanguage] = {};
                    for (var p in json.courses[course]) {
                        jsonDuoState.courses[json.courses[course].learningLanguage + "<" + json.courses[course].fromLanguage][p] = json.courses[course][p];
                    }
                }
            }
            if (json.currentCourse) {
                if (!jsonDuoState.courses)
                    jsonDuoState.courses = {};
                jsonDuoState.courses[json.currentCourse.learningLanguage + "<" + json.currentCourse.fromLanguage] = json.currentCourse;
                if (!jsonDuoState.skills)
                    jsonDuoState.skills = {};
                for (var s in json.currentCourse.skills) {
                    for (var k in json.currentCourse.skills[s]) {
                        jsonDuoState.skills[json.currentCourse.skills[s][k].id] = json.currentCourse.skills[s][k];
                    }
                }
            }
            localStorage["duo.state"] = JSON.stringify(jsonDuoState);
            userInfo.firstrefresh = false;
            return jsonDuoState;
        });
    },
    "getCookie": function (name) {
        var cookies = document.cookie.split(';');
        for (var i in cookies) {
            if (cookies[i].indexOf(name) === 1) {
                return cookies[i].split("=")[1];
            }
        }
        return "";
    },
    "getLoggedInUserId": function () {
        var e = userInfo.getCookie("auth_tkt") || "";
        var t = e.match(/[0-9a-f]{40}(\d+)!/);
        if (t)
            return parseInt(t[1], 10);
    },
    "getWeakendSkills": function (fromLanguage, learningLanguage) {
        this.duoState = this.refresh();
        var result = {};
        for (var skill in this.duoState.skills) {
            if (!fromLanguage)
                fromLanguage = this.duoState.skills[skill].fromLanguage;
            if (!learningLanguage)
                learningLanguage = this.duoState.skills[skill].learningLanguage;
            var willreturn = (fromLanguage === this.duoState.skills[skill].fromLanguage) && (learningLanguage === this.duoState.skills[skill].learningLanguage) && (this.duoState.skills[skill].finishedLessons === this.duoState.skills[skill].lessons);
            if (willreturn && this.duoState.skills[skill].strength && this.duoState.skills[skill].strength < 1) {
                if (!result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage]) {
                    result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage] = {};
                }
                this.duoState.skills[skill].URI = "/skill/" + this.duoState.skills[skill].learningLanguage + "/" + this.duoState.skills[skill].urlName;
                result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage][this.duoState.skills[skill].name] = this.duoState.skills[skill];
            }
        }
        return result;
    },
    "getNewSkills": function (fromLanguage, learningLanguage) {
        this.duoState = this.refresh();
        var result = {};
        for (var skill in this.duoState.skills) {
            if (!fromLanguage)
                fromLanguage = this.duoState.skills[skill].fromLanguage;
            if (!learningLanguage)
                learningLanguage = this.duoState.skills[skill].learningLanguage;
            var willreturn = (fromLanguage === this.duoState.skills[skill].fromLanguage) && (learningLanguage === this.duoState.skills[skill].learningLanguage);
            if (willreturn && this.duoState.skills[skill].accessible && this.duoState.skills[skill].finishedLessons < this.duoState.skills[skill].lessons) {
                if (!result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage]) {
                    result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage] = {};
                }
                this.duoState.skills[skill].URI = "/skill/" + this.duoState.skills[skill].learningLanguage + "/" + this.duoState.skills[skill].urlName;
                result[this.duoState.skills[skill].learningLanguage + "<" + this.duoState.skills[skill].fromLanguage][this.duoState.skills[skill].name] = this.duoState.skills[skill];
            }
        }
        return result;
    },
    "switchLanguage": function (fromLanguage, learningLanguage) {
        userInfo.needrefresh = (userInfo.duoState && userInfo.duoState.courses && (!userInfo.duoState.courses[learningLanguage + "<" + fromLanguage] || !userInfo.duoState.courses[learningLanguage + "<" + fromLanguage].fluency));
        $.ajax({
            type: "POST",
            url: "/api/1/me/switch_language",
            data: {from_language: fromLanguage, learning_language: learningLanguage}
        }).done(function () {
            if (userInfo.needrefresh && !duo.version)
                userInfo.enrichUser();
            document.location.href = document.location.protocol + "//" + document.location.hostname;
        });
    },
    "fixcss": function(documentdir){
        console.info("fixcss("+documentdir+")");
        if (documentdir===userInfo.documentdir){return;}
        userInfo.documentdir = documentdir;
        for (var i in csslist) {
            console.info("duo: "+duo);
            console.info("(!duo.version && csslist[i].dir.indexOf(new) !== -1): "+(!duo.version && csslist[i].dir.indexOf("new") !== -1));
            console.info("(csslist[i].dir.indexOf(new) === -1): "+(csslist[i].dir.indexOf("new") === -1));
            console.info("csslist[i].dir.indexOf(documentdir) !== -1: "+csslist[i].dir.indexOf(documentdir) !== -1);
            var isApply = (duo && (
                (!duo.version && csslist[i].dir.indexOf("new") !== -1) ||
                 (csslist[i].dir.indexOf("new") === -1)
            ) && csslist[i].dir.indexOf(documentdir) !== -1);
            console.info("isApply: "+isApply+"\thref:" + csslist[i].href);
            if (isApply) {
                var vrtcss = document.createElement('link');
                vrtcss.rel = "stylesheet";
                vrtcss.href = csslist[i].href;
                document.getElementsByTagName('head')[0].appendChild(vrtcss);
            }
        }
    },
    "dict": {
        "circle": "_3hKMG",
        "circle-hoverable": "_1z_vo _3hKMG",
        "blue": "_2VAWl",
        "gray": "_39kLK",
        "green": "_1na3J",
        "purple": "_2wyKI",
        "red": "_3E0y_",
        "gold": "ewiWc",
        "topbar-brand": "NJXKT _1nAJB cCL9P",
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
            "0": [{"type": "keylabel", "code": "192"}, {"type": "keylabel", "code": "49"}, {
                "type": "keylabel",
                "code": "50"
            }, {"type": "keylabel", "code": "51"}, {"type": "keylabel", "code": "52"}, {
                "type": "keylabel",
                "code": "53"
            }, {"type": "keylabel", "code": "54"}, {"type": "keylabel", "code": "55"}, {
                "type": "keylabel",
                "code": "56"
            }, {"type": "keylabel", "code": "57"}, {"type": "keylabel", "code": "48"}, {
                "type": "keylabel",
                "code": "189"
            }, {"type": "keylabel", "code": "187"}, {"type": "backspace", "code": "8", "name": "Backspace"}],
            "1": [{"type": "tab special disabled", "code": "9", "name": "Tab"}, {
                "type": "keylabel",
                "code": "81"
            }, {"type": "keylabel", "code": "87"}, {"type": "keylabel", "code": "69"}, {
                "type": "keylabel",
                "code": "82"
            }, {"type": "keylabel", "code": "84"}, {"type": "keylabel", "code": "89"}, {
                "type": "keylabel",
                "code": "85"
            }, {"type": "keylabel", "code": "73"}, {"type": "keylabel", "code": "79"}, {
                "type": "keylabel",
                "code": "80"
            }, {"type": "keylabel", "code": "219"}, {"type": "keylabel", "code": "221"}, {
                "type": "slash",
                "code": "220"
            }],
            "2": [{"type": "caps special switch", "code": "20", "name": "CapsLock"}, {
                "type": "keylabel",
                "code": "65"
            }, {"type": "keylabel", "code": "83"}, {"type": "keylabel", "code": "68"}, {
                "type": "keylabel",
                "code": "70"
            }, {"type": "keylabel", "code": "71"}, {"type": "keylabel", "code": "72"}, {
                "type": "keylabel",
                "code": "74"
            }, {"type": "keylabel", "code": "75"}, {"type": "keylabel", "code": "76"}, {
                "type": "keylabel",
                "code": "186"
            }, {"type": "keylabel", "code": "222"}, {"type": "enter special disabled", "code": "13", "name": "Enter"}],
            "3": [{"type": "shift left special switch", "code": "16", "name": "Shift"}, {
                "type": "keylabel",
                "code": "90"
            }, {"type": "keylabel", "code": "88"}, {"type": "keylabel", "code": "67"}, {
                "type": "keylabel",
                "code": "86"
            }, {"type": "keylabel", "code": "66"}, {"type": "keylabel", "code": "78"}, {
                "type": "keylabel",
                "code": "77"
            }, {"type": "keylabel", "code": "188"}, {"type": "keylabel", "code": "190"}, {
                "type": "keylabel",
                "code": "191"
            }, {"type": "shift right special disabled", "code": "16", "name": "Shift"}],
            "4": [{"type": "ctrl special disabled", "code": "17", "name": "Control"}, {
                "type": "home special",
                "code": "91",
                "name": "Meta"
            }, {"type": "alt special disabled", "code": "18", "name": "Alt"}, {
                "type": "space",
                "code": "32",
                "name": " "
            }, {"type": "alt special disabled", "code": "18", "name": "Alt"}, {
                "type": "menu special",
                "code": "93",
                "name": "ContextMenu"
            }, {"type": "ctrl right special disabled", "code": "17", "name": "Control"}]
        }
    },
    "dublicate": {
        "Semicolon": "186",
        "Comma": "188",
        "Period": "190",
        "Slash": "191",
        "Backquote": "192",
        "BracketLeft": "219",
        "Backslash": "220",
        "BracketRight": "221",
        "Quote": "222"
    },
    "language_names_ui": {
        "el": {
            "level": "επίπεδο",
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
            "level": "level",
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
            "level": "trình độ",
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
            "level": "livello",
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
            "level": "مستوى",
            "gu": "الغوجاراتية",
            "ga": "الإيرلندية",
            "gn": "الجوارانية (اليوبارا)",
            "gl": "الجاليكية",
            "la": "لاتينية",
            "tt": "التتار",
            "tr": "التركية",
            "lv": "اللاتفية",
            "tl": "التاغلوغية",
            "th": "التايلنديّة",
            "te": "تيلوجو",
            "ta": "تاميل",
            "yi": "الييدية",
            "dk": "الدوثراكية",
            "de": "الألمانية",
            "db": "الهولندية (بلجيكا)",
            "ko": "الكوريّة",
            "da": "الدنماركية",
            "uz": "الأوزبكي",
            "el": "اليونانية",
            "eo": "الإسبرانتو",
            "en": "الإنجليزية",
            "zc": "الصينية (الكانتونية)",
            "eu": "الباسكي",
            "et": "الإستونية",
            "ep": "الإنجليزية (القراصنة)",
            "es": "الإسبانية",
            "zs": "الصينية",
            "ru": "الروسية",
            "ro": "الرومانية",
            "be": "البيلاروسية",
            "bg": "البلغارية",
            "ms": "لغة الملايو",
            "bn": "البنغالي",
            "ja": "اليابانية",
            "or": "الأوريا",
            "xl": "Lolcat",
            "ca": "الكتالانية",
            "xz": "Zombie",
            "cy": "الويلزية",
            "cs": "التشيكية",
            "pt": "البرتغالية",
            "lt": "اللتوانية",
            "pa": "البنجابية",
            "pl": "البولندية",
            "hy": "الأرميني",
            "hr": "الكرواتية",
            "hv": "الفاليرية العُليا",
            "ht": "الكريولية الهايتية",
            "hu": "المجرية",
            "hi": "الهندية",
            "he": "العبرية",
            "mb": "الماليزية (بروناي)",
            "mm": "الملايو (ماليزيا)",
            "ml": "المالايالامية",
            "mn": "المنغولية",
            "mk": "المقدونية",
            "ur": "الأردية",
            "kk": "الكازاخية",
            "uk": "الأوكرانية",
            "mr": "المهاراتية",
            "my": "البورمية",
            "dn": "الهولندية",
            "af": "الأفريكانية",
            "vi": "الفييتنامية",
            "is": "أيسلندي",
            "it": "الإيطالية",
            "kn": "الكانادا",
            "zt": "الصينية (التقليدية)",
            "as": "الأسامية",
            "ar": "العربية",
            "zu": "الزولو",
            "az": "اذربيجان",
            "id": "الإندونيسية",
            "nn": "النرويجية (نينورسك)",
            "no": "النرويجية",
            "nb": "النرويجية",
            "ne": "النيبالية",
            "fr": "الفرنسية",
            "fa": "الفارسية",
            "fi": "اللغة الفنلندية",
            "fo": "جزر فارو",
            "ka": "الجورجية",
            "ss": "السويدية (السويد)",
            "sq": "الألبانية",
            "sw": "السواحيلية",
            "sv": "السويدية",
            "km": "الخمير",
            "kl": "الكلينجون",
            "sk": "السلوفاكية",
            "sn": "السِّندَرين",
            "sl": "سلوفيني",
            "ky": "قيرغيزستان",
            "sf": "السويدية (فنلندا)"
        },
        "cs": {
            "level": "hladina",
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
            "level": "tingkat",
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
            "level": "nivel",
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
            "level": "水平",
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
            "level": "уровень",
            "gu": "гуджарати",
            "ga": "ирландский",
            "gn": "гуарани (дёпара)",
            "gl": "Галицкая",
            "la": "латинский",
            "tt": "татарский",
            "tr": "турецкий",
            "lv": "Латышский",
            "tl": "Тагалог",
            "th": "тайский",
            "te": "телугу",
            "ta": "тамильский",
            "yi": "идиш",
            "dk": "дотракийский",
            "de": "немецкий",
            "db": "Голландский (Бельгия)",
            "ko": "корейский",
            "da": "датский",
            "uz": "узбекский ",
            "el": "греческий",
            "eo": "эсперанто",
            "en": "английский",
            "zc": "Китайский (кантонский)",
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
            "level": "nível",
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
            "level": "Seviye",
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
            "level": "nivel",
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
            "level": "poziom",
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
            "level": "niveau",
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
            "level": "niveau",
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
            "level": "Ebene",
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
            "level": "szint",
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
            "level": "स्तर",
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
            "level": "レベル",
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
            "level": "수평",
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
            "level": "рівень",
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
    "supported": function (lang) {
        var result = lang;
        try {
            result = result || userInfo.duoState.user.learningLanguage;
            if (this.layout_map[result]) {
                result = this.supported_lang[this.layout_map[result]];
            }
        } catch (e) {
            result = -1;
        }
        return result;
    }
};
virtKeyboard = {
    "version": "0.0.35",
    "rawgit": "https://cdn.rawgit.com/i-algurabi/DuoVirtKeyboard/493bfef4a9eda423cfe65a03af9dd753f94f405b/",
    "show": true,
    "apply": true,
    "checklocation": function(){
        return (/^\/skill/.test(location.pathname) ||
            /^\/bigtest/.test(location.pathname) ||
            /^\/practice/.test(location.pathname) ||
            /^\/DuoVirtKeyboard/.test(location.pathname)
        )
    },
    "shift": false,
    "caps": false,
    "newcodepage": false,
    "newlang": "",
    "mainlang": "",
    "secondlang": "",
    "body": "<div id='virt-keyboard' class='vrt-hidden'><header class='vrt-topbar'><div class='vrt-toggledropdown vrt-main'><span class='vrt-langspan vrt-main'>English</span><ul class='vrt-dropdown vrt-arrow-top vrt-main' id='vrt-mainlang' data-language='en'></ul></div><div class='vrt-keycodesetting vrt-normal-key vrt-hidden'><input id='vrt-normal-key' placeholder='Regular character' /></div><div class='v-logo v-big'><ul class='vrt-download vrt-arrow-top'></ul></div><div class='vrt-keycodesetting vrt-shift-key vrt-hidden'><input id='vrt-shift-key' placeholder='Shift character' /></div><div class='vrt-toggledropdown vrt-secondary'><span class='vrt-langspan vrt-secondary'>English</span><ul class='vrt-dropdown vrt-arrow-top vrt-secondary' id='vrt-secondarylang' data-language='en'></ul></div><div class='v-close'><span class='v-close'></span></div></header><div class='vrt-section'></div></div>",
    "saveToLocalStorage": function (parameter, value) {
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            localStorage["keyboard." + parameter] = JSON.stringify(value);
            return true;
        }
        return false;
    },
    "clearLocalStorage": function(parameter){
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            localStorage.removeItem("keyboard." + parameter);
            return true;
        }
        return false;
    },
    "getFromLocalStorage": function (parameter) {
        if (window.localStorage !== undefined) {
            var localStorage = window.localStorage;
            var param = localStorage["keyboard." + parameter];
            if (param)
                return JSON.parse(param);
        }
        return false;
    },
    "fillKeyboard": function (lang0, lang1) {
        if (!lang0)
            lang0 = virtKeyboard.mainlang;
        if (!lang1)
            lang1 = lang0 === virtKeyboard.secondlang ? virtKeyboard.mainlang : virtKeyboard.secondlang;
        if (!(lang0 && lang1)) {
            console.error("Language keycodes not provided.");
            return false;
        }
        virtKeyboard.mainlang = lang0;
        virtKeyboard.secondlang = lang1;
        for (var keycode in basekeys[lang0]) {
            var mainlabel = basekeys[lang0][keycode];
            var secondarylabel = {};
            var mainclass = "l4";
            var updatekey = "." + keycode;
            $(updatekey).html("");
            var span0 = $("<span>");
            if (lang1 && lang1 !== lang0 && basekeys[lang1] && basekeys[lang1][keycode]) {
                secondarylabel = basekeys[lang1][keycode];
                var span2 = $("<span>");
                if (secondarylabel.normal !== mainlabel.normal) {
                    mainclass = "l0";
                    span2.addClass("l8");
                    span2[0].textContent = secondarylabel.normal.toUpperCase();
                    $(updatekey).append(span2);
                }
                if (secondarylabel.shift !== mainlabel.shift && secondarylabel.shift.toLowerCase() !== secondarylabel.normal) {
                    mainclass = "l0";
                    var span3 = $("<span>");
                    span3.addClass("l2");
                    span3[0].textContent = secondarylabel.shift;
                    $(updatekey).append(span3);
                }
            }
            if (mainlabel.normal === mainlabel.shift.toLowerCase()) {
                span0.addClass(mainclass);
                span0[0].textContent = mainlabel.shift;
                $(updatekey).append(span0);
            } else {
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
    "typecustomchar": function (inputf, charcode, key) {
        console.info("typecustomchar: inputf {" + inputf + "}\n\t charcode {" + charcode + "}\n\tkey {" + key + "}");
        var jq_inputf = $(inputf);
        var input_lang = basekeys.supported(jq_inputf.attr("lang"));
        if (input_lang === -1) {
            input_lang = userInfo.duoState.user.learningLanguage;
        }
        if (basekeys.dublicate && key && key.originalEvent) {
            charcode = basekeys.dublicate[key.originalEvent.code] || charcode;
        }
        if (charcode === 0) {
            console.error("Couldn't assosiate a key. [keyboard.originalEvent.code: " + key.originalEvent.code + "]");
            return false;
        }
        if ((charcode !== 8 && charcode !== 32) && (!(basekeys[input_lang]) || (charcode !== 32 && !basekeys[input_lang][charcode]) || key && (key.altKey || key.ctrlKey))) {
            return false;
        }
        var inputtext = jq_inputf.val();
        var selStart = jq_inputf[0].selectionStart;
        var selEnd = jq_inputf[0].selectionEnd;
        if (selStart === undefined) {
            selStart = selEnd = inputtext.length;
        }
        var inputs = "";
        if (basekeys[input_lang][charcode]) {
            var changecase = "";
            var shift_left = $(".shift.left");
            if (virtKeyboard.shift) {
                if (!shift_left.hasClass("hover")) {
                    shift_left.addClass("hover");
                }
                inputs = basekeys[input_lang][charcode].shift;
                changecase = "toLowerCase";
            } else {
                if (shift_left.hasClass("hover")) {
                    shift_left.removeClass("hover");
                }
                inputs = basekeys[input_lang][charcode].normal;
                changecase = "toUpperCase";
            }
            var jq_caps = $(".caps");
            if (virtKeyboard.caps) {
                try {
                    inputs = inputs[changecase]();
                } catch (e) {
                }
                if (!jq_caps.hasClass("hover")) {
                    jq_caps.addClass("hover");
                }
            } else {
                if (jq_caps.hasClass("hover")) {
                    jq_caps.removeClass("hover");
                }
            }
        } else {
            if (charcode === 8) {
                selStart = selStart > 0 ? selStart - 1 : 0;
            }
            if (charcode === 32) {
                inputs = " ";
            }
        }
        var z = inputtext.slice(0, selStart) + inputs + inputtext.slice(selEnd);
        jq_inputf.focus();
        jq_inputf.val(z);
        jq_inputf.attr("value", z);
        jq_inputf[0].selectionStart = jq_inputf[0].selectionEnd = selStart + inputs.length;
        var virt_keyboard = $("#virt-keyboard");
        var restore = !virt_keyboard.hasClass("vrt-keep");
        if (restore)
            virt_keyboard.addClass("vrt-keep");
        jq_inputf.blur();
        if (restore)
            virt_keyboard.removeClass("vrt-keep");
        jq_inputf.focus();
        return true;
    },
    "updatesecondary": function () {
        var divider = $("<li>");
        divider.addClass("vrt-divider vrt-new");
        var jq_dd_sec = $(".vrt-dropdown.vrt-secondary");
        jq_dd_sec.addClass("vrt-settings");
        jq_dd_sec.append(divider);
        for (var langcode in basekeys.language_names_ui[virtKeyboard.mainlang]) {
            if (langcode !== "level" && basekeys.supported_lang.indexOf(langcode) === -1) {
                var langname = basekeys.language_names_ui[virtKeyboard.mainlang][langcode];
                var newentry = $("<li>");
                newentry.addClass("vrt-data-choice vrt-new");
                newentry.data("language", langcode);
                newentry[0].textContent = langname;
                jq_dd_sec.append(newentry);
            }
        }
    },
    "updatecodepages": function (newlangcode, update) {
        if (!basekeys[newlangcode] || update) {
            virtKeyboard.newcodepage = true;
            virtKeyboard.newlang = newlangcode;
            $(".vrt-keycodesetting").show();
        }
    },
    "getlanguagename": function (langcode, ui_main) {
        if (!ui_main)
            ui_main = virtKeyboard.mainlang;
        var ui_langs = basekeys.language_names_ui[ui_main];
        var langname = ui_langs[langcode].split("");
        langname[0] = langname[0].toUpperCase();
        return langname.join("");
    },
    "updatesupportedlangs": function (isDL) {
        var ddclass = isDL ? ".vrt-download" : ".vrt-dropdown";
        var dchclass = isDL ? "vrt-dl-choice" : "vrt-data-choice";
        if (isDL) {
            $(ddclass + " > a").remove();
        } else {
            $(ddclass + " > li").remove();
        }
        //var lang0 = $("textarea").attr("lang");
        //var ui_langs = (basekeys.language_names_ui[virtKeyboard.mainlang] ? basekeys.language_names_ui[virtKeyboard.mainlang] : basekeys.language_names_ui.en);
        var namednodes = {
            main: {
                name: virtKeyboard.getlanguagename(virtKeyboard.mainlang),
                node: $("#vrt-mainlang >." + dchclass)[0],
                code: virtKeyboard.mainlang
            },
            secondary: {
                name: virtKeyboard.getlanguagename(virtKeyboard.secondlang),
                node: $("#vrt-secondarylang >." + dchclass)[0],
                code: virtKeyboard.secondlang
            }
        };
        for (var i in basekeys.supported_lang) {
            var langcode = basekeys.supported_lang[i];
            var newentry = $("<li>");
            newentry.addClass(dchclass);
            newentry.data("language", langcode);
            newentry[0].textContent = virtKeyboard.getlanguagename(langcode);
            if (isDL) {
                var a_link = $("<a>");
                var temp = {"lang": langcode, "keysmap": basekeys[langcode]};
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(temp));
                a_link.attr("href", dataStr);
                a_link.attr("download", "keyboard." + langcode + ".json");
                a_link.append(newentry.append($("<i class=\x22material-icons\x22>save</i>")));
                $(ddclass).append(a_link);
            } else {
                $(ddclass).append(newentry);
            }
            var node = undefined;
            if (virtKeyboard.mainlang === langcode) {
                node = $("#vrt-mainlang >." + dchclass)[$("#vrt-mainlang >." + dchclass).length - 1];
                namednodes.main.name = virtKeyboard.getlanguagename(langcode);
                namednodes.main.node = node;
                namednodes.main.code = langcode;
            }
            if (virtKeyboard.secondlang === langcode) {
                node = $("#vrt-secondarylang >." + dchclass)[$("#vrt-mainlang >." + dchclass).length - 1];
                namednodes.secondary.name = virtKeyboard.getlanguagename(langcode);
                namednodes.secondary.node = node;
                namednodes.secondary.code = langcode;
            }
        }
        if (!isDL) {
            for (var nodetype in namednodes) {
                var tnode = namednodes[nodetype].node || $("#vrt-" + nodetype + "lang >." + dchclass)[0];
                $(tnode).addClass("vrt-active").siblings().removeClass("vrt-active");
                $("#vrt-" + nodetype + "lang").data("language", namednodes[nodetype].code);
                $("span.vrt-langspan.vrt-" + nodetype)[0].textContent = namednodes[nodetype].name;
            }
        }
    },
    "drawKeyboard": function () {
        var jq_vrt_section = $(".vrt-section");
        jq_vrt_section.html("");
        var baseraws = basekeys.base.raw;
        for (var i in baseraws) {
            var virtkeyraw = baseraws[i];
            var ul = $("<ul>");
            ul.addClass("row");
            ul.addClass(i);
            for (var n in virtkeyraw) {
                var li = $("<li class=\x22key\x22>");
                var keyhtml = $("<div data-keycode=\x22" + virtkeyraw[n].code + "\x22 class=\x22keylabel " + virtkeyraw[n].code + "\x22>");
                if (virtkeyraw[n].name) {
                    keyhtml.data("name", virtkeyraw[n].name);
                }
                if (virtkeyraw[n].type !== "keylabel") {
                    li.addClass(virtkeyraw[n].type);
                    li.data("type", virtkeyraw[n].type);
                }
                ul.append(li.append(keyhtml));
            }
            jq_vrt_section.append(ul);
        }
    },
    "updateBase": function (lObject, jsonObj) {
        for (var subobj in jsonObj) {
            if (typeof jsonObj[subobj] === 'object' && typeof lObject[subobj] === 'object') {
                this.updateBase(lObject[subobj], jsonObj[subobj]);
            } else {
                lObject[subobj] = jsonObj[subobj];
            }
        }
    },
    "updateLangs": function (update) {
        if (!update) {
            update = {};
        }
        var jq_ml = $("#vrt-mainlang").data("language");
        var jq_sl = $("#vrt-secondarylang").data("language");
        for (var lcode in update) {
            if (basekeys.supported_lang.indexOf(lcode) !== -1) {
                $.ajax({
                    type: "get",
                    url: virtKeyboard.rawgit + "duo/keyboard." + lcode + ".json"
                }).done(function (json) {
                    basekeys[json.lang] = json.keysmap;
                    if (basekeys[jq_ml] && basekeys[jq_sl]) {
                        virtKeyboard.fillKeyboard(jq_ml, jq_sl);
                    }
                    virtKeyboard.saveToLocalStorage("keys", basekeys);
                });
            }
        }
        virtKeyboard.fillKeyboard(jq_ml, jq_sl);
        virtKeyboard.virtKeyOnClick();
    },
    "virtKeyOnClick": function () {
        var virt_keyboard = $("#virt-keyboard");
        var virt_tdd = $(".vrt-toggledropdown");
        virt_keyboard.on("click", ".key", function () {
            var inputfield = $("textarea");
            var keycode = $(this).find("div").data("keycode");
            var keyname = $(this).find("div").data("name");
            if ($(this).hasClass("home")) {
                var jq_home = $(".home");
                if (!jq_home.hasClass("switch")) {
                    jq_home.addClass("switch");
                }
                var jq_dd_sec = $(".vrt-dropdown.vrt-secondary");
                if (!jq_dd_sec.hasClass("vrt-settings")) {
                    virtKeyboard.updatesecondary();
                } else {
                    var jq_ks = $(".vrt-keycodesetting");
                    var jq_dd_sec_new = $(".vrt-dropdown.vrt-secondary > li.vrt-new");
                    virtKeyboard.newcodepage = false;
                    jq_ks.hide();
                    jq_dd_sec.removeClass("vrt-settings");
                    jq_dd_sec.removeClass("vrt-update");
                    jq_dd_sec_new.remove();
                    virtKeyboard.saveToLocalStorage("keys", basekeys);
                    virtKeyboard.updatesupportedlangs();
                }
            }
            if ($(this).hasClass("menu")) {
                var jq_menu = $(".menu");
                if (!jq_menu.hasClass("switch")) {
                    jq_menu.addClass("switch");
                }
                if (!jq_dd_sec.hasClass("vrt-settings")) {
                    jq_dd_sec.addClass("vrt-update");
                    virtKeyboard.updatesecondary();
                } else {
                    virtKeyboard.newcodepage = false;
                    jq_ks.hide();
                    jq_dd_sec.removeClass("vrt-settings");
                    jq_dd_sec.removeClass("vrt-update");
                    jq_dd_sec_new.remove();
                    virtKeyboard.saveToLocalStorage("keys", basekeys);
                    virtKeyboard.updatesupportedlangs();
                }
            }
            if ($(this).hasClass("special")) {
                $(this).toggleClass("hover");
                if ($(this).hasClass("shift") && $(this).hasClass("left")) {
                    virtKeyboard.shift = !virtKeyboard.shift;
                }
                if ($(this).hasClass("caps")) {
                    virtKeyboard.caps = !virtKeyboard.caps;
                }
                var keypressed = jQuery.Event({
                    "type": "keypress",
                    "keyCode": keycode,
                    "which": keycode,
                    "shiftKey": virtKeyboard.shift,
                    "key": keyname
                });
                var jq_if = $(inputfield);
                jq_if.trigger(keypressed);
                jq_if.focus();
                return true;
            }
            if (!virtKeyboard.newcodepage) {
                if (inputfield) {
                    virtKeyboard.typecustomchar(inputfield, keycode);
                }
            } else {
                var jq_ml = $("#vrt-mainlang").data("language");
                var nfield = $("#vrt-normal-key");
                var sfield = $("#vrt-shift-key");
                if (basekeys.supported_lang.indexOf(virtKeyboard.newlang) === -1) {
                    basekeys.supported_lang.push(virtKeyboard.newlang);
                }
                if (!basekeys[virtKeyboard.newlang]) {
                    basekeys[virtKeyboard.newlang] = JSON.parse(JSON.stringify(basekeys[jq_ml]));
                }
                if (nfield.val() !== "") {
                    basekeys[virtKeyboard.newlang][keycode].normal = nfield.val();
                }
                if (sfield.val() !== "") {
                    basekeys[virtKeyboard.newlang][keycode].shift = sfield.val();
                }
                virtKeyboard.fillKeyboard(jq_ml, virtKeyboard.newlang);
            }
        });
        virt_keyboard.on("click", ".vrt-data-choice", function () {
            if (!$(this).hasClass("vrt-active") && !$(this).hasClass("vrt-new")) {
                $(this).addClass("vrt-active").siblings().removeClass("vrt-active");
            }
            $(this).parent().data("language", $(this).data("language"));
            $(this).parent().parent().find("span.vrt-langspan")[0].textContent = $(this)[0].textContent;
            var jq_dd_sec = $(".vrt-dropdown.vrt-secondary");
            if (jq_dd_sec.hasClass("vrt-settings")) {
                virtKeyboard.updatecodepages($(this).data("language"), $(this).parent().hasClass("vrt-update"));
            }
            var jq_ml = $("#vrt-mainlang").data("language");
            var jq_sl = $("#vrt-secondarylang").data("language");
            virtKeyboard.fillKeyboard(jq_ml, jq_sl);
            $(this).parent().off("mouseleave");
            $(this).parent().slideUp("medium");
        });
        virt_tdd.on("click", function () {
            var dropdownmenu = $(this).find("ul.vrt-dropdown");
            if (dropdownmenu.is(":visible")) {
                dropdownmenu.slideUp("medium");
                virt_tdd.off("mouseleave");
            } else {
                virt_tdd.on("mouseleave", function () {
                    dropdownmenu.slideUp("medium");
                });
                dropdownmenu.slideDown("medium");
            }
            dropdownmenu.off("mouseleave");
            dropdownmenu.on("mouseleave", function () {
                virt_tdd.off("mouseleave");
                dropdownmenu.slideUp("medium");
            });
        });
        $(".v-big").on("click", function () {
            virtKeyboard.updatesupportedlangs(true);
            var dropdownmenu = $(this).find("ul.vrt-download");
            if (dropdownmenu.is(":visible")) {
                dropdownmenu.slideUp("medium");
            } else {
                dropdownmenu.slideDown("medium");
            }
            dropdownmenu.off("mouseleave");
            dropdownmenu.on("mouseleave", function () {
                dropdownmenu.slideUp("medium");
            });
        });
        $(document).on("keydown", "textarea, input", function (keypressed) {
            userInfo.fixcss(document.dir);
            if (virtKeyboard.apply && virtKeyboard.checklocation()) {
                var virtkey = $("." + keypressed.keyCode).parent();
                virtkey.addClass("virthover");
                setTimeout(function () {
                    virtkey.removeClass("virthover");
                }, 600);
                virtKeyboard.shift = keypressed.shiftKey;
                if (virtKeyboard.typecustomchar(this, keypressed.keyCode, keypressed))
                    keypressed.preventDefault();
            }
        });
    },
    "completeInit": function () {
        if (Object.keys(userInfo.getLangs()).length === 0 || basekeys.supported_lang.length === 0) {
            setTimeout(function () {
                virtKeyboard.completeInit();
            }, 300);
            return;
        }
        virtKeyboard.updateLangs(userInfo.getLangs());
        virtKeyboard.drawKeyboard();
        virtKeyboard.updatesupportedlangs();
    },
    "init": function () {
        if (userInfo.firstrefresh) {
            setTimeout(function () {
                virtKeyboard.init();
            }, 300);
            return;
        }
        virtKeyboard.mainlang = userInfo.duoState.user.learningLanguage || "en";
        virtKeyboard.secondlang = userInfo.duoState.user.fromLanguage || "en";
        $("body").append(virtKeyboard.body);
        $("#virt-keyboard").hover(function () {
            $("#virt-keyboard").addClass("vrt-keep");
        }, function () {
            $("#virt-keyboard").removeClass("vrt-keep");
        });
        $(document).on("click", ".v-logo", function () {
            var jq_logo = $(".v-logo");
            virtKeyboard.show = !virtKeyboard.show;
            virtKeyboard.apply = true;
            jq_logo.removeClass("v-disabled");
            if (virtKeyboard.show) {
                if (!$(this).hasClass("v-show"))
                    $(this).addClass("v-show");
            } else {
                if ($(this).hasClass("v-show"))
                    $(this).removeClass("v-show");
            }
            virtKeyboard.saveToLocalStorage("settings", virtKeyboard);
        });
        $(document).on("click", ".v-close", function () {
            var jq_logo = $(".v-logo");
            virtKeyboard.show = false;
            jq_logo.removeClass("v-show");
            jq_logo.addClass("v-disabled");
            virtKeyboard.apply = false;
            $("#virt-keyboard").hide();
            virtKeyboard.saveToLocalStorage("settings", virtKeyboard);
        });
        $(document).on("focus", "textarea, input[type='text']", function () {
            if (virtKeyboard.checklocation()) {
                $(this).val($(this).attr("value"));
                try {
                    $(this)[0].innerText = $(this).attr("value");
                } catch (e) {
                }
                var visible = $("#virt-keyboard:visible").length > 0;
                if (virtKeyboard.show && !visible) {
                    var jq_vkbd = $("#virt-keyboard");
                    virtKeyboard.updatesupportedlangs();
                    virtKeyboard.fillKeyboard($(this).attr("lang"));
                    jq_vkbd.show("slow");
                }
            }
        });
        $(document).on("focusout", "textarea, input[type='text']", function () {
            if (virtKeyboard.checklocation()) {
                $(this).val($(this).attr("value"));
                try {
                    $(this)[0].innerText = $(this).attr("value");
                } catch (e) {
                }
                var jq_vkbd = $("#virt-keyboard");
                if (!jq_vkbd.hasClass("vrt-keep")) {
                    jq_vkbd.hide();
                }
            }
        });
        virtKeyboard.completeInit();
        $("#virt-keyboard").draggable();
    },
    "preinit": function () {
        if (!window.jQuery) {
            setTimeout(function () {
                virtKeyboard.preinit();
            }, 300);
            return;
        }
        var settings = virtKeyboard.getFromLocalStorage("settings");
        if (settings) {
            console.info("Local version is:" + settings.version);
            console.info("Remote version is:" + virtKeyboard.version);
            if (settings.version !== virtKeyboard.version){
                virtKeyboard.clearLocalStorage("keys");
                virtKeyboard.clearLocalStorage("weakspan");
                virtKeyboard.clearLocalStorage("newspan");
                //virtKeyboard.clearLocalStorage("courseLevel");
            }
            settings.version = virtKeyboard.version;
            settings.rawgit = virtKeyboard.rawgit;
            virtKeyboard.updateBase(virtKeyboard, settings);
        }
        $.fn.draggable = function () {
            var $this = this, ns = 'draggable_' + (Math.random() + '').replace('.', ''), mm = 'mousemove.' + ns,
                mu = 'mouseup.' + ns, $w = $(window), rtl = $("html").attr("dir") === "rtl",
                isFixed = ($this.css('position') === 'fixed'), adjX = 0, adjY = 0;
            $this.mousedown(function (ev) {
                var pos = $this.position();
                if (isFixed) {
                    adjX = ($w.scrollLeft());
                    adjY = $w.scrollTop();
                }
                var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
                $this.data(ns, {x: ox, y: oy});
                $w.on(mm, function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (isFixed) {
                        adjX = ($w.scrollLeft());
                        adjY = $w.scrollTop();
                    }
                    var offset = $this.data(ns);
                    $this.css({left: (ev.pageX - adjX - offset.x), top: (ev.pageY - adjY - offset.y)});
                });
                $w.on(mu, function () {
                    $w.off(mm + ' ' + mu).removeData(ns);
                });
            });
            return this;
        };
        userInfo.duoState = userInfo.refresh();
        var oldkeys = virtKeyboard.getFromLocalStorage("keys");
        if (!oldkeys || oldkeys.supported_lang.length === 0) {
            $.ajax({type: "get", url: virtKeyboard.rawgit + "duo/keyboard.base.json"}).done(function (json) {
                virtKeyboard.updateBase(basekeys, json);
                virtKeyboard.saveToLocalStorage("keys", basekeys);
            });
        } else {
            virtKeyboard.updateBase(basekeys, oldkeys);
        }
        if ($(".v-logo").length === 0) {
            var vKeyboardLogo = $("<span>");
            vKeyboardLogo.addClass("v-logo");
            if (virtKeyboard.show) {
                vKeyboardLogo.addClass("v-show");
            }
            if (!virtKeyboard.apply) {
                vKeyboardLogo.addClass("v-disabled");
            }
            var topbar = $("." + userInfo.dict["topbar-brand"].split(" ").join(".")).length > 0 ? $("." + userInfo.dict["topbar-brand"].split(" ").join(".")) : $(".topbar-brand");
            if (topbar.next("div").after(vKeyboardLogo).length === 0) {
                var str_href = "a[href='/'";
                $($(str_href)[0]).next("div").after(vKeyboardLogo);
            }
        }
        console.info("VirtKeyboard: v." + virtKeyboard.version);
        virtKeyboard.saveToLocalStorage("settings", virtKeyboard);
        virtKeyboard.init();
    }
};
sidepanel = {
    "version": "0.0.13",
    "html": "<div class='sidepanel'><div class='panel panel-upper panel-border'></div><div class='panel panel-inner'></div><div class='panel panel-lower panel-border'></div></div>",
    "hidden": true,
    "init": function () {
        if (!window.jQuery) {
            setTimeout(function () {
                sidepanel.init();
            }, 300);
            return;
        }
        console.info("sidepanel: v." + sidepanel.version);
        $("body").append(this.html);
        userInfo.duoState = userInfo.refresh();
        sidepanel.refresh(".panel-inner");
    },
    "refresh": function (activeElelment) {
        $(activeElelment).html("");
        var courseslist = $("<ul class='courses'>");
        if (!userInfo.duoState) {
            userInfo.duoState = {
                courses:{},
                user:{
                    "learningLanguage":"",
                    "fromLanguage":""
                }
            };
            userInfo.refresh();
        }
        for (var course in userInfo.duoState.courses) {
            var courseLevel = virtKeyboard.getFromLocalStorage("courseLevel") || {};
            var li = $("<li class='course'>");
            var span1 = $("<span>");
            var span2 = $("<span>");
            span1.addClass(userInfo.dict.flag + " from flag");
            span2.addClass(userInfo.dict.flag + " to flag");
            var fromLanguage = userInfo.duoState.courses[course].fromLanguage;
            var learningLanguage = userInfo.duoState.courses[course].learningLanguage;
            li.data("fromLanguage", fromLanguage);
            li.data("learningLanguage", learningLanguage);
            span1.addClass(userInfo.dict[fromLanguage] + " flag-svg-small flag-" + fromLanguage);
            span2.addClass(userInfo.dict[learningLanguage] + " flag-svg-small flag-" + learningLanguage);
            var weakspan = $("<div class='skill weak'>");
            var newspan = $("<div class='skill new'>");
            var weakSkills = userInfo.getWeakendSkills(fromLanguage, learningLanguage)[learningLanguage + "<" + fromLanguage];
            var newSkills = userInfo.getNewSkills(fromLanguage, learningLanguage)[learningLanguage + "<" + fromLanguage];
            var skill, nClone;
            if (learningLanguage === userInfo.duoState.user.learningLanguage && fromLanguage === userInfo.duoState.user.fromLanguage) {
                var prevWeak = $(virtKeyboard.getFromLocalStorage("weakspan").html) || $("");
                var prevNew = $(virtKeyboard.getFromLocalStorage("newspan").html) || $("");
                li.addClass("active");
                for (skill in weakSkills) {
                    weakspan.append(sidepanel.activeSkillsEl(weakSkills[skill].URI, prevWeak));
                }
                for (skill in newSkills) {
                    newspan.append(sidepanel.activeSkillsEl(newSkills[skill].URI, prevNew));
                }
                //Add general practice button to weakspan
                var practiceArr = $("a[href='/practice']");
                //for (bigtest in practiceArr){
                    if(practiceArr[0] && practiceArr[0].attributes)
                        weakspan.append(sidepanel.activeSkillsEl(practiceArr[0].attributes.href.value, prevWeak, "practice"));
                //}
                //Add shortcuts to bigtest section to newspan
                practiceArr = $("a[href*='/bigtest']");
                for (var bigtest in practiceArr){
                    if(practiceArr[bigtest] && practiceArr[bigtest].attributes)
                        newspan.append(sidepanel.activeSkillsEl(practiceArr[bigtest].attributes.href.value, prevNew, "practice"));
                }

                virtKeyboard.saveToLocalStorage("weakspan", {"html": weakspan.html()});
                virtKeyboard.saveToLocalStorage("newspan", {"html": newspan.html()});
                courseLevel[course] = userInfo.duoState.user.trackingProperties.level;
                virtKeyboard.saveToLocalStorage("courseLevel", courseLevel);
            } else {
                var color = ["red", "blue", "green"];
                var i = 0;
                for (skill in weakSkills) {
                    i++;
                    nClone = $("<span class='skills'>");
                    nClone.addClass(userInfo.dict[color[i % 3]] + " bg-" + color[i % 3]);
                    weakspan.append(nClone);
                }
                for (skill in newSkills) {
                    i++;
                    nClone = $("<span class='skills'>");
                    nClone.addClass(userInfo.dict[color[i % 3]] + " bg-" + color[i % 3]);
                    newspan.append(nClone);
                }
            }
            li.append(span1);
            var levelString = (basekeys.language_names_ui[fromLanguage].level || "LEVEL").toUpperCase() + " " + (courseLevel[course] || "[ ]");
            li.append($("<span class='sp-level'>" + levelString + "</span>"));
            li.append(span2);
            if (weakspan.find("span").length > 0)
                li.append(weakspan);
            if (newspan.find("span").length > 0)
                li.append(newspan);
            courseslist.append(li);
        }
        $(activeElelment).append(courseslist);
        $("li.course").on("click", function () {
            if ($(this).data("learningLanguage") !== userInfo.duoState.user.learningLanguage || $(this).data("fromLanguage") !== userInfo.duoState.user.fromLanguage) {
                userInfo.switchLanguage($(this).data("fromLanguage"), $(this).data("learningLanguage"));
            }
        });
        $(".sidepanel").hover(function () {
            if (sidepanel.hidden) {
                sidepanel.refresh(".panel-inner");
                $(this).addClass("show");
                sidepanel.hidden = false;
            }
        }, function () {
            if (!sidepanel.hidden) {
                $(this).removeClass("show");
                sidepanel.hidden = true;
            }
        });
    },
    "activeSkillsEl": function (skillURI, prevSkills, class2add) {
        if (!class2add) class2add="micro";
        var color = ["red", "blue", "green"];
        var a_href = "a[href='" + skillURI + "']";
        var zClone = $(a_href).clone();
        var oClone = prevSkills.filter(a_href).clone();
        var nClone = $("<span class='skills'>");
        var i = (skillURI.length + prevSkills.length);
        nClone.addClass(userInfo.dict[color[i % 3]] + " bg-" + color[i % 3]);
        if ((zClone.length + oClone.length) > 0) {
            nClone = zClone.length > 0 ? zClone : oClone;
            for (var nclass in userInfo.dict) {
                var zzz = nClone.filter("." + userInfo.dict[nclass]);
                if (zzz.length > 0) {
                    zzz.addClass(nclass);
                }
            }
            nClone.find("._2TMjc").addClass("lightbg");
            nClone.addClass(class2add);
        }
        return nClone;
    }
};
!function (s) {
    function r(t) {
        if (n[t])
            return n[t].exports;
        var e = n[t] = {exports: {}, id: t, loaded: !1};
        return s[t].call(e.exports, e, e.exports, r), e.loaded = !0, e.exports;
    }

    var t = window.webpackJsonp;
    window.webpackJsonp = function (i, a) {
        for (var c, f, d = 0, g = []; d < i.length; d++)
            f = i[d], e[f] && g.push.apply(g, e[f]), e[f] = 0;
        for (c in a)
            s[c] = a[c];
        for (t && t(i, a); g.length;)
            g.shift().call(null, r);
        if (a[0])
            return n[0] = 0, r(0);
    };
    var n = {}, e = {0: 0};
    r.e = function (s, t) {
        if (0 === e[s])
            return t.call(null, r);
        if (void 0 !== e[s])
            e[s].push(t); else {
            e[s] = [t];
            var n = document.getElementsByTagName("head")[0], i = document.createElement("script");
            i.type = "text/javascript", i.charset = "utf-8", i.async = !0, i.src = r.p + "" + ({
                    1: "js/vendor",
                    2: "js/app",
                    3: "strings/zh-TW",
                    4: "strings/zh-CN",
                    5: "strings/vi",
                    6: "strings/uk",
                    7: "strings/tr",
                    8: "strings/ru",
                    9: "strings/ro",
                    10: "strings/pt",
                    11: "strings/pl",
                    12: "strings/nl-NL",
                    13: "strings/ko",
                    14: "strings/ja",
                    15: "strings/it",
                    16: "strings/id",
                    17: "strings/hu",
                    18: "strings/hi",
                    19: "strings/fr",
                    20: "strings/es",
                    21: "strings/en",
                    22: "strings/el",
                    23: "strings/de",
                    24: "strings/cs",
                    25: "strings/ar"
                }, [s] || s) + "-" + {
                    1: "dc221740",
                    2: "bd21b823",
                    3: "1496ee5d",
                    4: "3bd0e77f",
                    5: "f4bf9b65",
                    6: "a2b896ec",
                    7: "a57279d4",
                    8: "7358872c",
                    9: "a72b1a76",
                    10: "d31c8206",
                    11: "cd94eafc",
                    12: "b7995df2",
                    13: "688e6d65",
                    14: "8561a8d7",
                    15: "7b389202",
                    16: "cba322e8",
                    17: "f30670c9",
                    18: "3cfba715",
                    19: "60fd521f",
                    20: "59f590f4",
                    21: "830e44b4",
                    22: "0cccc05f",
                    23: "a011bfdb",
                    24: "b0a7ffee",
                    25: "5293014a"
                };
            [s] + ".js", n.appendChild(i);
        }
    }, r.m = s, r.c = n, r.p = "/";
}([]);

var chrome = chrome || {"extension": false};
duo = window.duo || {};

if (chrome) {
    if (!chrome.extension) {
        script = document.createElement('script');
        script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    else {
        for (var normalScript in document.scripts) {
            var patternDuo = new RegExp("window\.duo");
            if (patternDuo.test(document.scripts[normalScript].text)) {
                var splitted = document.scripts[normalScript].text.split("=");
                var jprs1 = JSON.parse(splitted[1]);
                if (/version/.test(splitted[0])) {
                    duo.version = jprs1;
                } else {
                    virtKeyboard.updateBase(duo, jprs1);
                }
            }
        }
    }
}

var csslist = [{
    "href": virtKeyboard.rawgit + "css/newduo.css",
    "dir": ["ltr", "rtl", "new"]
}, {
    "href": virtKeyboard.rawgit + "css/rtl-newduo.css",
    "dir": ["rtl", "new"]
}, {
    "href": "//fonts.googleapis.com/icon?family=Material+Icons",
    "dir": ["ltr", "rtl"]
}, {
    "href": virtKeyboard.rawgit + "css/style.css", 
    "dir": ["ltr", "rtl"]
}];

var documentdir = document.dir?document.dir:"ltr";
userInfo.fixcss(documentdir);
virtKeyboard.preinit();
sidepanel.init();