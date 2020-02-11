// ==UserScript==
// @name         tsdm_image
// @namespace    https://github.com/cstary1221
// @version      0.1
// @description  TSDM一键上传图片&调整尺寸
// @author       cstary
// @include      /^https?://(www\.)?tsdm\.live/forum\.php\?mod=(post|viewthread|forumdisplay).*
// @include      /^https?://(www\.)?tsdm\.live/home\.php\?mod=space.*
// @grant        none
// ==/UserScript==


(function () {
    //默认使用路过图床，可替换为其他chevereto图床
    var pic_url = "https://imgchr.com/upload";
    var g = {
        defaultSettings: {
            url: pic_url,
            vendor: "auto",
            mode: "auto",
            lang: "auto",
            autoInsert: "bbcode-embed",
            palette: "default",
            init: "onload",
            containerClass: 1,
            buttonClass: 1,
            sibling: 0,
            siblingPos: "after",
            fitEditor: 0,
            observe: 0,
            observeCache: 1,
            html: '<div class="%cClass"><button %x class="%bClass"><span class="%iClass">%iconSvg</span><span class="%tClass">%text</span></button></div>',
            css: ".%cClass{display:inline-block;margin-top:5px;margin-bottom:5px}.%bClass{line-height:normal;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s;outline:0;color:%2;border:none;cursor:pointer;border:1px solid rgba(0,0,0,.15);background:%1;border-radius:.2em;padding:.5em 1em;font-size:12px;font-weight:700;text-shadow:none}.%bClass:hover{background:%3;color:%4;border-color:rgba(0,0,0,.1)}.%iClass,.%tClass{display:inline-block;vertical-align:middle}.%iClass svg{display:block;width:1em;height:1em;fill:currentColor}.%tClass{margin-left:.25em}"
        },
        ns: {
            plugin: "chevereto-pup"
        },
        palettes: {
            "default": ["#ececec", "#333", "#2980b9", "#fff"],
            clear: ["inherit", "inherit", "inherit", "#2980b9"],
            turquoise: ["#16a085", "#fff", "#1abc9c", "#fff"],
            green: ["#27ae60", "#fff", "#2ecc71", "#fff"],
            blue: ["#2980b9", "#fff", "#3498db", "#fff"],
            purple: ["#8e44ad", "#fff", "#9b59b6", "#fff"],
            darkblue: ["#2c3e50", "#fff", "#34495e", "#fff"],
            yellow: ["#f39c12", "#fff", "#f1c40f", "#fff"],
            orange: ["#d35400", "#fff", "#e67e22", "#fff"],
            red: ["#c0392b", "#fff", "#e74c3c", "#fff"],
            grey: ["#ececec", "#000", "#e0e0e0", "#000"],
            black: ["#333", "#fff", "#666", "#fff"],
            custom: ["none", "#8e44ad", "none", "#8e44ad"]
        },
        classProps: ["button", "container"],
        iconSvg: '<svg class="%iClass" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M76.7 87.5c12.8 0 23.3-13.3 23.3-29.4 0-13.6-5.2-25.7-15.4-27.5 0 0-3.5-0.7-5.6 1.7 0 0 0.6 9.4-2.9 12.6 0 0 8.7-32.4-23.7-32.4 -29.3 0-22.5 34.5-22.5 34.5 -5-6.4-0.6-19.6-0.6-19.6 -2.5-2.6-6.1-2.5-6.1-2.5C10.9 25 0 39.1 0 54.6c0 15.5 9.3 32.7 29.3 32.7 2 0 6.4 0 11.7 0V68.5h-13l22-22 22 22H59v18.8C68.6 87.4 76.7 87.5 76.7 87.5z"/></svg>',
        l10n: {
            ar: "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0635\u0648\u0631",
            cs: "Nahr\u00e1t obr\u00e1zky",
            da: "Upload billeder",
            de: "Bilder hochladen",
            es: "Subir im\u00e1genes",
            fi: "Lataa kuvia",
            fr: "Importer des images",
            id: "Unggah gambar",
            it: "Carica immagini",
            ja: "\u753b\u50cf\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9",
            nb: "Last opp bilder",
            nl: "Upload afbeeldingen",
            pl: "Wy\u015blij obrazy",
            pt_BR: "Enviar imagens",
            ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f",
            tr: "Resim Yukle",
            uk: "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f",
            zh_CN: "\u4e0a\u4f20\u56fe\u7247",
            zh_TW: "\u4e0a\u50b3\u5716\u7247"
        },
        vendors: {
            "default": {
                check: function () {
                    return 1
                },
                getEditor: function () {
                    var a = {
                        textarea: {
                            name: "recaptcha search recipients coppa ^comment_list username_list add".split(" ")
                        },
                        ce: {
                            dataset: ["gramm"]
                        }
                    },
                        b = ["~", "|", "^", "$", "*"],
                        c = {},
                        d;
                    for (d in a) {
                        c[d] = "";
                        var e = a[d],
                            f;
                        for (f in e)
                            for (var k = 0; k < e[f].length; k++) {
                                var g = "",
                                    l = e[f][k],
                                    h = l.charAt(0);
                                -1 < b.indexOf(h) && (g = h,
                                                      l = l.substring(1));
                                c[d] += ":not([" + ("dataset" == f ? "data-" + l : f + g + '="' + l + '"') + "])"
                            }
                    }
                    return document.querySelectorAll('[contenteditable=""]' + c.ce + ',[contenteditable="true"]' + c.ce + ",textarea:not([readonly])" + c.textarea)
                }
            },
            discuz: {
                settings: {
                    buttonClass: 1,
                    html: '<a %x title="%text" class="%bClass">%iconSvg</a>',
                    sibling: ".fclr,#e_attach",
                    css: "a.%bClass,.bar a.%bClass{box-sizing:border-box;cursor:pointer;background:%1;color:%2;text-indent:unset;position:relative}.b1r a.%bClass:hover,a.%bClass:hover{background:%3;color:%4}a.%bClass{font-size:14px}.b1r a.%bClass{font-size:20px;padding:0;height:44px}.%bClass svg{font-size:1em;width:1em;height:1em;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;left:50%;top:50%;fill:currentColor}",
                    palette: "custom"
                },
                palettes: {
                    "default": ["transparent", "#333", "#2980b9", "#fff"]
                },
                check: "DISCUZCODE",
                getEditor: function () {
                    return document.querySelector('.area textarea[name="message"]')
                }
            }
        },
        generateGuid: function () {
            var a = (new Date).getTime();
            "undefined" !== typeof performance && "function" === typeof performance.now && (a += performance.now());
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (b) {
                var c = (a + 16 * Math.random()) % 16 | 0;
                a = Math.floor(a / 16);
                return ("x" === b ? c : c & 3 | 8).toString(16)
            })
        },
        getNewValue: function (a, b) {
            var c = "string" !== typeof a.getAttribute("contenteditable") ? "value" : "innerHTML",
                d = "value" == c ? "\n" : "<br>",
                e = a[c];
            if (0 == e.length)
                return b;
            c = "";
            e = (e = e.match(/\n+$/g)) ? e[0].split("\n").length : 0;
            2 >= e && (c += d.repeat(0 == e ? 2 : 1));
            return c + b
        },
        insertTrigger: function () {
            var a = this.vendors[this.settings.vendor],
                b = this.settings.sibling ? document.querySelectorAll(this.settings.sibling + ":not([" + this.ns.dataPlugin + "])")[0] : 0;
            if ("auto" == this.settings.mode)
                var c = this.vendors[a.hasOwnProperty("getEditor") ? this.settings.vendor : "default"].getEditor();
            else {
                for (var d = document.querySelectorAll("[" + this.ns.dataPluginTrigger + "][data-target]:not([" + this.ns.dataPluginId + "])"), e = [], f = 0; f < d.length; f++)
                    e.push(d[f].dataset.target);
                0 < e.length && (c = document.querySelectorAll(e.join(",")))
            }
            if (c) {
                !document.getElementById(this.ns.pluginStyle) && this.settings.css && (f = document.createElement("style"),
                                                                                       d = this.settings.css,
                                                                                       d = this.appyTemplate(d),
                                                                                       f.type = "text/css",
                                                                                       f.innerHTML = d.replace(/%p/g, "." + this.ns.plugin),
                                                                                       f.setAttribute("id", this.ns.pluginStyle),
                                                                                       document.body.appendChild(f));
                c instanceof NodeList || (c = [c]);
                for (f = d = 0; f < c.length; f++)
                    c[f].getAttribute(this.ns.dataPluginTarget) || (e = b ? b : c[f],
                                                                    e.setAttribute(this.ns.dataPlugin, "sibling"),
                                                                    e.insertAdjacentHTML({
                        before: "beforebegin",
                        after: "afterend"
                    }
                                                                                         [this.settings.siblingPos], this.appyTemplate(this.settings.html)),
                                                                    e = e.parentElement.querySelector("[" + this.ns.dataPluginTrigger + "]"),
                                                                    this.setBoundId(e, c[f]),
                                                                    d++);
                this.triggerCounter = d;
                "function" == typeof a.callback && a.callback.call()
            }
        },
        appyTemplate: function (a) {
            if (!this.cacheTable) {
                var b = [{
                    "%iconSvg": this.iconSvg
                }, {
                    "%text": this.settings.langString
                }
                        ];
                if (this.palette) {
                    for (var c = /%(\d+)/g, d = c.exec(a), e = []; null !== d; )
                        -1 == e.indexOf(d[1]) && e.push(d[1]),
                            d = c.exec(a);
                    if (e)
                        for (e.sort(function (a, b) {
                            return b - a
                        }),
                             c = 0; c < e.length; c++) {
                            var f = e[c] - 1;
                            (d = this.palette[f] || "") || "default" === this.settings.vendor || "default" === this.settings.palette || (d = this.palette[f - 2]);
                            f = {};
                            f["%" + e[c]] = d;
                            b.push(f)
                        }
                }
                e = this.settings.buttonClass || this.ns.plugin + "-button";
                e = [{
                    "%cClass": this.settings.containerClass || this.ns.plugin + "-container"
                }, {
                    "%bClass": e
                }, {
                    "%iClass": e + "-icon"
                }, {
                    "%tClass": e + "-text"
                }, {
                    "%x": this.ns.dataPluginTrigger
                }, {
                    "%p": this.ns.plugin
                }
                    ];
                for (c = 0; c < e.length; c++)
                    b.push(e[c]);
                this.cacheTable = b
            }
            return this.strtr(a, this.cacheTable)
        },
        strtr: function (a, b) {
            a = a.toString();
            if (!a || "undefined" == typeof b)
                return a;
            for (var c = 0; c < b.length; c++) {
                var d = b[c],
                    e;
                for (e in d)
                    "undefined" !== typeof d[e] && (re = new RegExp(e, "g"),
                                                    a = a.replace(re, d[e]))
            }
            return a
        },
        setBoundId: function (a, b) {
            var c = this.generateGuid();
            a.setAttribute(this.ns.dataPluginId, c);
            b.setAttribute(this.ns.dataPluginTarget, c)
        },
        openPopup: function (a) {
            if ("string" === typeof a) {
                var b = this;
                "undefined" == typeof this.popups && (this.popups = {});
                if ("undefined" !== typeof this.popups[a])
                    this.popups[a].window.focus();
                else {
                    this.popups[a] = {};
                    var c = {
                        l: void 0 != window.screenLeft ? window.screenLeft : screen.left,
                        t: void 0 != window.screenTop ? window.screenTop : screen.top,
                        w: window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                        h: window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
                    },
                        d = {
                            w: 720,
                            h: 690
                        },
                        e = {
                            w: .5,
                            h: .85
                        },
                        f;
                    for (f in d)
                        d[f] / c[f] > e[f] && (d[f] = c[f] * e[f]);
                    this.popups[a].window = window.open(this.settings.url, a, "width=" + d.w + ",height=" + d.h + ",top=" + Math.trunc(c.h / 2 - d.h / 2 + c.t) + ",left=" + Math.trunc(c.w / 2 - d.w / 2 + c.l));
                    this.popups[a].timer = window.setInterval(function () {
                        b.popups[a].window && !1 === b.popups[a].window.closed || (window.clearInterval(b.popups[a].timer),
                                                                                   b.popups[a] = void 0)
                    }, 200)
                }
            }
        },
        postSettings: function (a) {
            this.popups[a].window.postMessage({
                id: a,
                settings: this.settings
            }, this.settings.url)
        },
        liveBind: function (a, b, c) {
            document.addEventListener(b, function (b) {
                var d = document.querySelectorAll(a);
                if (d) {
                    for (var f = b.target, k = -1; f && -1 === (k = Array.prototype.indexOf.call(d, f)); )
                        f = f.parentElement;
                    -1 < k && (b.preventDefault(),
                               c.call(b, f))
                }
            }, !0)
        },
        prepare: function () {
            var a = this;
            this.ns.dataPlugin = "data-" + this.ns.plugin;
            this.ns.dataPluginId = this.ns.dataPlugin + "-id";
            this.ns.dataPluginTrigger = this.ns.dataPlugin + "-trigger";
            this.ns.dataPluginTarget = this.ns.dataPlugin + "-target";
            this.ns.pluginStyle = this.ns.plugin + "-style";
            this.ns.selDataPluginTrigger = "[" + this.ns.dataPluginTrigger + "]";
            var b = document.currentScript || document.getElementById(this.ns.plugin + "-src");
            b ? b.dataset.buttonTemplate && (b.dataset.html = b.dataset.buttonTemplate) : b = {
                dataset: {}
            };
            var c = 0;
            settings = this.settings = {};
            for (var d in this.defaultSettings) {
                var e = b && b.dataset[d] ? b.dataset[d] : this.defaultSettings[d];
                if ("1" === e || "0" === e)
                    e = "true" == e;
                "string" == typeof e && -1 < this.classProps.indexOf(d.replace(/Class$/, "")) && (c = 1);
                settings[d] = e
            }
            if ("auto" == settings.vendor)
                for (d in settings.vendor = "default",
                     settings.fitEditor = 0,
                     this.vendors)
                    if ("default" != d && "undefined" !== typeof window[this.vendors[d].check]) {
                        settings.vendor = d;
                        break
                    }
            if ("default" == settings.vendor) {
                this.vendors["default"].settings = {};
                var f = ["lang", "url", "vendor", "target"];
                for (d in this.defaultSettings)
                    -1 == f.indexOf(d) && (this.vendors["default"].settings[d] = this.defaultSettings[d])
            }
            e = this.vendors[settings.vendor];
            if (e.settings)
                for (d in e.settings)
                    b && b.dataset.hasOwnProperty(d) || (settings[d] = e.settings[d]);
            if ("default" !== settings.vendor)
                if (e.settings.hasOwnProperty("fitEditor") || b.dataset.hasOwnProperty("fitEditor") || (settings.fitEditor = 1),
                    settings.fitEditor)
                    c = !e.settings.css;
                else
                    for (d in f = ["autoInsert", "observe", "observeCache"],
                         e.settings)
                        -1 != f.indexOf(d) || b.dataset.hasOwnProperty(d) || (settings[d] = this.defaultSettings[d]);
            c ? settings.css = "" : (settings.css = settings.css.replace("%defaultCSS", this.defaultSettings.css),
                                     e.settings.extracss && settings.css && (settings.css += e.settings.extracss),
                                     b = settings.palette.split(","),
                                     1 < b.length ? this.palette = b : this.palettes.hasOwnProperty(b) || (settings.palette = "default"),
                                     this.palette || (this.palette = (settings.fitEditor && e.palettes && e.palettes[settings.palette] ? e : this).palettes[settings.palette]));
            c = this.classProps;
            for (b = 0; b < c.length; b++)
                d = c[b] + "Class",
                    "string" !== typeof settings[d] && (settings[d] = this.ns.plugin + "-" + c[b],
                                                        settings.fitEditor && (settings[d] += "--" + settings.vendor));
            b = ("auto" == settings.lang ? navigator.language || navigator.userLanguage : settings.lang).replace("-", "_");
            settings.langString = "Upload images";
            if (b = b in this.l10n ? b : b.substring(0, 2)in this.l10n ? b.substring(0, 2) : null)
                settings.langString = this.l10n[b];
            b = document.createElement("a");
            b.href = settings.url;
            this.originUrlPattern = "^" + (b.protocol + "//" + b.hostname).replace(/\./g, "\\.").replace(/\//g, "\\/") + "$";
            c = document.querySelectorAll(this.ns.selDataPluginTrigger + "[data-target]");
            if (0 < c.length)
                for (b = 0; b < c.length; b++)
                    d = document.querySelector(c[b].dataset.target),
                        this.setBoundId(c[b], d);
            settings.observe && (b = settings.observe,
                                 settings.observeCache && (b += ":not([" + this.ns.dataPlugin + "])"),
                                 this.liveBind(b, "click", function (b) {
                b.setAttribute(a.ns.dataPlugin, 1);
                a.observe()
            }
                                               .bind(this)));
            settings.sibling && !settings.onDemand ? this.waitForSibling() : "onload" == settings.init ? "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", function (b) {
                a.init()
            }, !1) : this.init() : this.observe()
        },
        observe: function () {
            this.waitForSibling("observe")
        },
        waitForSibling: function (a) {
            var b = this.initialized ? "insertTrigger" : "init";
            if (this.settings.sibling)
                var c = document.querySelector(this.settings.sibling + ":not([" + this.ns.dataPlugin + "])");
            else if ("observe" == a && (this[b](),
                                        this.triggerCounter))
                return;
            if (c)
                this[b]();
            else
                "complete" === document.readyState && "observe" !== a || setTimeout(("observe" == a ? this.observe : this.waitForSibling).bind(this), 250)
        },
        init: function () {
            this.insertTrigger();
            var a = this,
                b = this.vendors[this.settings.vendor];
            this.liveBind(this.ns.selDataPluginTrigger, "click", function (b) {
                b = b.getAttribute(a.ns.dataPluginId);
                a.openPopup(b)
            });
            window.addEventListener("message",
                                    function (c) {
                if ((new RegExp(a.originUrlPattern, "i")).test(c.origin) || "undefined" != typeof c.data.id && "undefined" != typeof c.data.message) {
                    var d = c.data.id;
                    if (d && c.source === a.popups[d].window)
                        if (c.data.requestAction && a.hasOwnProperty(c.data.requestAction))
                            a[c.data.requestAction](d);
                        else {
                            var e;
                            if ("default" !== a.settings.vendor) {
                                if (b.hasOwnProperty("useCustomEditor") && b.useCustomEditor()) {
                                    b.editorValue(c.data.message, d);
                                    return
                                }
                                b.hasOwnProperty("getEditor") && (e = b.getEditor())
                            }
                            if (!e && (e = document.querySelector("[" + a.ns.dataPluginTarget + '="' + d + '"]'), !e)) {
                                alert("Target not found");
                                return
                            }
                            d = null === e.getAttribute("contenteditable") ? "value" : "innerHTML";
                            e[d] += a.getNewValue(e, c.data.message);
                            c = ["blur", "focus", "input", "change", "paste"];
                            for (d = 0; d < c.length; d++) {
                                var f = new Event(c[d]);
                                e.dispatchEvent(f)
                            }
                        }
                }
            },
                                    !1);
            this.initialized = 1
        }
    }
    var pic = {
        sizes:new Array(),
        pendingCount : 0,
        getSize:function() {
            var self = this;
            var bbcode = document.querySelector('.area textarea[name="message"]').value;
            var pattern = new RegExp('\\[img\\](.+?)\\[/img\\]', 'gi');
            bbcode = bbcode.replace(pattern, function (dummy, body) {
                if (self.sizes[body]) {
                    var s = self.sizes[body];
                    return "[img=" + s.width + "," + s.height + "]" + body + "[/img]";
                }
                var img = new Image();
                img.onload = function () {
                    self.sizes[body] = {
                        width: img.width,
                        height: img.height
                    };
                    self.pendingCount = self.pendingCount - 1;
                    self.getSize();
                }
                self.pendingCount = self.pendingCount + 1;
                img.src = body;
                return "[img]" + body + "[/img]";
            });
            document.querySelector('.area textarea[name="message"]').value = bbcode;
            self.adjust();
            if (self.pendingCount == 0) {
                window.alert('全部搞定');
            }
        },
        adjust:function() {
            var bbcode = document.querySelector('.area textarea[name="message"]').value;
            var maxWidth = Number(document.getElementById('widthThreshold').value);
            var pattern = new RegExp('\\[img=([0-9]+),([0-9]+)\\](.+?)\\[/img\\]', 'gi');
            bbcode = bbcode.replace(pattern, function (dummy, width, height, body) {
                var scale = width / maxWidth;
                if (scale > 1) {
                    width = Math.round(maxWidth);
                    height = Math.round(height / scale);
                }
                return "[img=" + width + "," + height + "]" + body + "[/img]";
            });
            document.querySelector('.area textarea[name="message"]').value = bbcode;
        },
        parseImage:function() {
            var bbcode = document.querySelector('.area textarea[name="message"]').value;
            var pattern = /(\[img\]\s*)?https?:\/\/\S+\.(?:bmp|jpg|jpeg|gif|png|tif|tiff|svg|webp)(\s*\[\/img\])?/gi;
            bbcode = bbcode.replace(pattern,
                                    function (all, start, end) {
                if (start == undefined && end == undefined) {
                    return "[img]" + all + "[/img]";
                }
                return all;
            });
            document.querySelector('.area textarea[name="message"]').value = bbcode;
        },
        fixSize:function(){
            var self = this;
            self.pendingCount=0;
            self.parseImage();
            self.getSize();
        }
    }
    var setElement=function(pos){
        var c = document.querySelector(pos+">#fixpic");
        var p = document.querySelector(pos);
        var b = document.querySelector(pos+">button");
        if(!c && b){
            var e_btn = document.createElement("button");
            e_btn.setAttribute("type","button");
            e_btn.setAttribute("id","fixpic");
            e_btn.setAttribute("class","pn");
            e_btn.onclick= function(){pic.fixSize()};
            var e_text = document.createElement("span");
            e_text.innerText = "调整图片尺寸"
            e_btn.appendChild(e_text)
            e_btn.setAttribute("style","display:inline-block;float:right")
            var e_input = document.createElement("input");
            e_input.setAttribute("type","text");
            e_input.setAttribute("id","widthThreshold");
            e_input.setAttribute("value",712);
            e_input.setAttribute("style","display:inline-block;float:right;width:60px");
            e_input.setAttribute("placeholder","最大宽度");
            p.insertBefore(e_btn,p.children[0]);
            p.insertBefore(e_input,p.children[1]);
        }
    }
    var checkQuickReply = function () {
        const interval = setInterval(function () {
            if (document.getElementById("floatlayout_reply")) {
                clearInterval(interval);
                setElement("#moreconf");
                g.prepare();
            }
        }, 1000);
        setTimeout(() => {
            clearInterval(interval)
        }, 30000);
    }
    var checkPm = function () {
        const interval = setInterval(function () {
            if (document.querySelector(".pmfm")) {
                clearInterval(interval);
                setElement(".mtn");
                g.prepare();
            }
        }, 1000);
        setTimeout(() => {
            clearInterval(interval)
        }, 30000);
    }


    setElement(".pnpost");
    setElement(".mtn");
    if(document.querySelector('.area textarea[name="message"]')){
        g.prepare()
    }
    if(document.getElementsByClassName('fastre')){
        for (let i = 0; i < document.getElementsByClassName('fastre').length; i++) {
            document.getElementsByClassName('fastre')[i].addEventListener('click', function () {
                checkQuickReply()
            },false);
        }
    }
    if(document.getElementsByClassName('pm2')){
        for (let i = 0; i < document.getElementsByClassName('pm2').length; i++) {
            document.getElementsByClassName('pm2')[i].children[0].addEventListener('click', function () {
                checkPm()
            },false);
        }
    }
    if(document.getElementsByClassName('ul_pm')){
        for (let i = 0; i < document.getElementsByClassName('ul_pm').length; i++) {
            document.getElementsByClassName('ul_pm')[i].children[0].addEventListener('click', function () {
                checkPm()
            },false);
        }
    }


})();
