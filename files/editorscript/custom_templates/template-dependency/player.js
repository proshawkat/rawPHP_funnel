/* VimeoPlayer - v2.53.8 - 2017-03-08 - https://player.vimeo.com/NOTICE.txt */
var VimeoPlayer = function() {
    "use strict";

    function e(e, t) {
        return t = {
            exports: {}
        }, e(t, t.exports), t.exports
    }

    function t(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document.styleSheets[0];
        try {
            n.insertRule ? n.insertRule(e + "{" + t + "}", (n.cssRules || n.rules).length) : n.addRule(e, t)
        } catch (e) {}
    }

    function n(e) {
        if (e && e.detail > 0) try {
            document.activeElement.blur()
        } catch (e) {}
    }

    function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.activeElement,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        try {
            e.blur()
        } catch (e) {
            t && t(e)
        }
    }

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.activeElement,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        try {
            e.focus()
        } catch (e) {
            t && t(e)
        }
    }

    function o(e) {
        var t = e.getBoundingClientRect();
        return document.msFullscreenElement && window.parent !== window && (t = {
            bottom: 100 * t.bottom,
            left: 100 * t.left,
            top: 100 * t.top,
            right: 100 * t.right,
            width: 100 * t.width,
            height: 100 * t.height
        }), t
    }

    function a(e) {
        try {
            return new URL(e).origin
        } catch (e) {}
        var t = document.createElement("a");
        return t.href = e, t.origin ? t.origin : t.protocol.replace(":", "") + "://" + t.host
    }

    function s(e) {
        var t = e.width,
            n = e.height,
            i = e.elementWidth,
            r = e.elementHeight,
            o = e.threshold,
            a = void 0 === o ? 10 : o,
            s = 1,
            c = t / n,
            u = i - r * c,
            d = r - i / c;
        if (u > 0 && u < a || d > 0 && d < a) {
            var l = i / (i - u),
                f = r / (r - d);
            s = Math.max(l, f)
        }
        return {
            extraWidth: u,
            extraHeight: d,
            scaleFactor: s
        }
    }

    function c(e, t, n) {
        return e > n ? n : t > e ? t : e
    }

    function u(e) {
        if (e === !0) return ut.resolve(null);
        var t = !1;
        return new ut(function(n, i) {
            var r = function() {
                t || ! function() {
                    t = !0;
                    var i = (new Date).getTime() - e.startTime;
                    setTimeout(function() {
                        return n(i)
                    }, 100)
                }()
            };
            e.link.addEventListener("load", r, !1)
        })
    }

    function d(e, t, n) {
        var i = n.width,
            r = n.height,
            o = n.scrollbars,
            a = void 0 === o ? "yes" : o,
            s = n.resizable,
            c = void 0 === s ? "yes" : s,
            u = n.toolbar,
            d = void 0 === u ? "no" : u,
            l = (window.screenY || window.screenTop || 0) + window.outerHeight / 2 - r / 2,
            f = (window.screenX || window.screenLeft || 0) + window.outerWidth / 2 - i / 2;
        window.chrome && window.navigator.userAgent.toLowerCase().indexOf("mac os x") !== -1 && (r += 27), window.safari && (r += 47);
        var h = "scrollbars=" + a + ",resizable=" + c + ",toolbar=" + d;
        return window.open(e, t, "width=" + i + ",height=" + r + ",left=" + f + ",top=" + l + "," + h)
    }

    function l(e) {
        if (!e) return {};
        if (Number.isInteger(parseInt(e, 10))) return {
            id: parseInt(e, 10),
            params: {}
        };
        if ("string" == typeof e) return 0 !== e.indexOf("https://") ? {} : {
            url: e,
            params: {}
        };
        var t = ["portrait", "title", "byline", "color", "autoplay", "loop"],
            n = Object.keys(e).filter(function(e) {
                return t.indexOf(e) !== -1
            }).reduce(function(t, n) {
                return t[n] = e[n], t
            }, {});
        return "url" in e ? 0 !== e.url.indexOf("https://") ? {} : {
            url: e.url,
            params: n
        } : "id" in e && Number.isInteger(parseInt(e.id, 10)) ? {
            id: parseInt(e.id, 10),
            params: n
        } : {}
    }

    function f(e) {
        var t = e.match(/\ba?t=([0-9hms:]+)/);
        null !== t && (e = t[1]);
        var n = !1,
            i = 0,
            r = 0,
            o = 0;
        if (t = e.match(/^([0-9]+)$/), t && t.length && (n = !0, o = t[1]), n === !1 && (t = e.match(/^(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s)?/), null !== t && "" !== t[0])) {
            n = !0;
            var a = t,
                s = bt(a, 4),
                c = s[1];
            i = void 0 === c ? 0 : c;
            var u = s[2];
            r = void 0 === u ? 0 : u;
            var d = s[3];
            o = void 0 === d ? 0 : d
        }
        if (n === !1 && (t = e.match(/^([0-9:]+)/), null !== t)) {
            n = !0;
            var l = e.split(":").reverse(),
                f = bt(l, 3);
            o = f[0];
            var h = f[1];
            r = void 0 === h ? 0 : h;
            var v = f[2];
            i = void 0 === v ? 0 : v
        }
        return n ? 60 * parseInt(i, 10) * 60 + 60 * parseInt(r, 10) + parseInt(o, 10) : null
    }

    function h(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.method,
            i = void 0 === n ? "GET" : n,
            r = t.withCredentials,
            o = void 0 === r || r,
            a = t.allowErrorStatuses,
            s = void 0 !== a && a;
        return new ut(function(t, n) {
            var r = new XMLHttpRequest;
            r.open(i, e, !0), o && (r.withCredentials = !0), r.onload = function() {
                if (r.status >= 400 && !s) {
                    var e = {
                        403: "Forbidden",
                        404: "Not Found",
                        500: "Internal Server Error"
                    };
                    return e[r.status] ? void n(new Error(e[r.status])) : void n(new Error("Request returned non-200 status code: " + r.status))
                }
                t(r.responseText)
            }, r.onerror = function() {
                return n(new Error("The request failed."))
            }, r.send()
        })
    }

    function v(e) {
        for (var t, n, i = (e || document).querySelectorAll("[tabindex]"), r = [], o = 0, a = 0, s = i.length; a < s; a++) t = i[a], n = window.getComputedStyle(t, ""), t.tabIndex > 0 && "none" !== n.display && n.opacity > 0 && "hidden" !== n.visibility && (r[o++] = t);
        var c = r.shift();
        c && (c.focus(), c.blur())
    }

    function p(e, t) {
        if (e = parseFloat(e), isNaN(e)) return 0;
        var n = Math.pow(10, t || 3);
        return Math.round(e * n) / n
    }

    function m(e, t) {
        var n, i, r, o, a = 0,
            s = function() {
                a = new Date, r = null, o = e.apply(n, i)
            };
        return function() {
            var c = new Date,
                u = t - (c - a);
            return n = this, i = arguments, u <= 0 ? (clearTimeout(r), r = null, a = c, o = e.apply(n, i)) : r || (r = setTimeout(s, u)), o
        }
    }

    function g() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(e) {
            return (e ^ 16 * Math.random() >> e / 4).toString(16)
        })
    }

    function y(e) {
        var t = "normal",
            n = window.getComputedStyle(e, ":after");
        if (n) try {
            var i = n.getPropertyValue("content").replace(/["'\s]*/g, "");
            ["tiny", "mini", "normal"].indexOf(i) !== -1 && (t = i)
        } catch (e) {
            return t
        }
        return t
    }

    function _(e, t, n, i) {
        var r = i[t];
        return r = k(e, r), r = b(r, n, i.prices), i.expires_in_duration_str && (r = r.replace("{TIME}", i.expires_in_duration_str)), i.available_on_formatted && (r = r.replace("{DATE}", i.available_on_formatted)), r
    }

    function b(e, t, n) {
        var i = n.USD;
        return t in n && (i = n[t]), e.indexOf("${price}") !== -1 ? e.replace("${price}", i) : e.indexOf("{PRICE}") !== -1 ? e.replace("{PRICE}", i) : e
    }

    function w(e, t) {
        return !e || 0 === e.length || e.indexOf(t) !== -1
    }

    function k(e, t) {
        return "undefined" != typeof e && "undefined" != typeof e[t] ? e[t] : t
    }

    function S(e, t, n, i) {
        return !i.relatedTarget || (!n || e === t) && (t !== i.relatedTarget && !t.contains(i.relatedTarget))
    }

    function x(e, t, n, i) {
        var r = !1;
        i = "function" == typeof t ? n : i, n = "function" == typeof t ? t : n, t = "function" == typeof t ? null : t;
        var o = function(e) {
                var t = !0;
                if (e.changedTouches) {
                    var o = e.changedTouches[0].pageX - window.pageXOffset,
                        a = e.changedTouches[0].pageY - window.pageYOffset,
                        s = document.elementFromPoint(o, a);
                    null !== s && this.contains(s) && (t = n.call(this, e))
                }
                return "function" == typeof i && i.call(this, e), r = !0, t
            },
            a = function(e) {
                return r ? void(r = !1) : n.call(this, e)
            };
        return t ? void kt(e).on("click", t, a).on("touchend", t, o) : void kt(e).on("click", a).on("touchend", o)
    }

    function T(e) {
        return new RegExp(e.toLowerCase()).test(Mt)
    }

    function E(e) {
        var t = document.createElement("div"),
            n = e.charAt(0).toUpperCase() + e.slice(1),
            i = (e + " " + ["Webkit", "Moz", "O", "ms"].join(n + " ") + n).split(" ");
        for (var r in i) {
            var o = i[r];
            if (void 0 !== t.style[o]) return o
        }
        return e
    }

    function L() {
        var e = navigator,
            t = !1,
            n = [0, 0, 0],
            i = null,
            r = "Shockwave Flash",
            o = "application/x-shockwave-flash",
            a = "ShockwaveFlash.ShockwaveFlash";
        if ("undefined" != typeof e.plugins && "object" === gt(e.plugins[r])) i = e.plugins[r].description, !i || "undefined" != typeof e.mimeTypes && e.mimeTypes[o] && !e.mimeTypes[o].enabledPlugin || (t = !0, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), n[0] = parseInt(i.replace(/^(.*)\..*$/, "$1"), 10), n[1] = parseInt(i.replace(/^.*\.(.*)\s.*$/, "$1"), 10), n[2] = /[a-zA-Z]/.test(i) ? parseInt(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
        else if ("undefined" != typeof window.ActiveXObject) try {
            var s = new ActiveXObject(a);
            s && (i = s.GetVariable("$version"), i && (t = !0, i = i.split(" ")[1].split(","), n = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]))
        } catch (e) {}
        return {
            installed: t,
            version: n.join("."),
            major: n[0],
            minor: n[1],
            revision: n[2]
        }
    }

    function P(e, t) {
        var n = e,
            i = t;
        return n % 320 !== 0 && (n = 100 * Math.ceil(e / 100), i = Math.round(n / e * t)), {
            width: n,
            height: i
        }
    }

    function C(e) {
        var t = e.width,
            n = e.height,
            i = e.baseUrl,
            r = e.webpSupport,
            o = void 0 !== r && r,
            a = i + (o ? ".webp" : ".jpg");
        return a += "?mw=" + t, 0 !== n && (a += "&mh=" + n), Nt.devicePixelRatio > 1 && (a += "&q=70"), a
    }

    function A(e) {
        return new ut(function(t, n) {
            var i = new Image;
            i.src = e, i.onload = function() {
                return t(i)
            }, i.onerror = function() {
                return n(new Error("Failed to load image."))
            }
        })
    }

    function O(e) {
        return Nt.iOS && "onpagehide" in window ? void window.addEventListener("pagehide", e, !1) : void window.addEventListener("beforeunload", e, !1)
    }

    function M() {
        return "undefined" == typeof document || "undefined" == typeof document.location ? "" : document.location.href
    }

    function F(e) {
        this.name = "RavenConfigError", this.message = e
    }

    function I() {
        return +new Date
    }

    function q() {
        this._hasJSON = !("object" != typeof JSON || !JSON.stringify), this._hasDocument = !R(an), this._lastCapturedException = null, this._lastEventId = null, this._globalServer = null, this._globalKey = null, this._globalProject = null, this._globalContext = {}, this._globalOptions = {
            logger: "javascript",
            ignoreErrors: [],
            ignoreUrls: [],
            whitelistUrls: [],
            includePaths: [],
            crossOrigin: "anonymous",
            collectWindowErrors: !0,
            maxMessageLength: 0,
            stackTraceLimit: 50,
            autoBreadcrumbs: !0
        }, this._ignoreOnError = 0, this._isRavenInstalled = !1, this._originalErrorStackTraceLimit = Error.stackTraceLimit, this._originalConsole = on.console || {}, this._originalConsoleMethods = {}, this._plugins = [], this._startTime = I(), this._wrappedBuiltIns = [], this._breadcrumbs = [], this._lastCapturedEvent = null, this._keypressTimeout, this._location = on.location, this._lastHref = this._location && this._location.href;
        for (var e in this._originalConsole) this._originalConsoleMethods[e] = this._originalConsole[e]
    }

    function R(e) {
        return void 0 === e
    }

    function B(e) {
        return "function" == typeof e
    }

    function D(e) {
        return "[object String]" === sn.toString.call(e)
    }

    function N(e) {
        return "object" == typeof e && null !== e
    }

    function j(e) {
        for (var t in e) return !1;
        return !0
    }

    function V(e) {
        var t = sn.toString.call(e);
        return N(e) && "[object Error]" === t || "[object Exception]" === t || e instanceof Error
    }

    function H(e, t) {
        var n, i;
        if (R(e.length))
            for (n in e) W(e, n) && t.call(null, n, e[n]);
        else if (i = e.length)
            for (n = 0; n < i; n++) t.call(null, n, e[n])
    }

    function U(e, t) {
        return t ? (H(t, function(t, n) {
            e[t] = n
        }), e) : e
    }

    function z(e, t) {
        return !t || e.length <= t ? e : e.substr(0, t) + "…"
    }

    function W(e, t) {
        return sn.hasOwnProperty.call(e, t)
    }

    function X(e) {
        for (var t, n = [], i = 0, r = e.length; i < r; i++) t = e[i], D(t) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
        return new RegExp(n.join("|"), "i")
    }

    function K(e) {
        var t = [];
        return H(e, function(e, n) {
            t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
        }), t.join("&")
    }

    function $(e) {
        var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!t) return {};
        var n = t[6] || "",
            i = t[8] || "";
        return {
            protocol: t[2],
            host: t[4],
            path: t[5],
            relative: t[5] + n + i
        }
    }

    function Y() {
        var e = on.crypto || on.msCrypto;
        if (!R(e) && e.getRandomValues) {
            var t = new Uint16Array(8);
            e.getRandomValues(t), t[3] = 4095 & t[3] | 16384, t[4] = 16383 & t[4] | 32768;
            var n = function(e) {
                for (var t = e.toString(16); t.length < 4;) t = "0" + t;
                return t
            };
            return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
        }
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0,
                n = "x" === e ? t : 3 & t | 8;
            return n.toString(16)
        })
    }

    function G(e) {
        for (var t, n = 5, i = 80, r = [], o = 0, a = 0, s = " > ", c = s.length; e && o++ < n && (t = Q(e), !("html" === t || o > 1 && a + r.length * c + t.length >= i));) r.push(t), a += t.length, e = e.parentNode;
        return r.reverse().join(s)
    }

    function Q(e) {
        var t, n, i, r, o, a = [];
        if (!e || !e.tagName) return "";
        if (a.push(e.tagName.toLowerCase()), e.id && a.push("#" + e.id), t = e.className, t && D(t))
            for (n = t.split(" "), o = 0; o < n.length; o++) a.push("." + n[o]);
        var s = ["type", "name", "title", "alt"];
        for (o = 0; o < s.length; o++) i = s[o], r = e.getAttribute(i), r && a.push("[" + i + '="' + r + '"]');
        return a.join("")
    }

    function J(e, t, n, i) {
        var r = e[t];
        e[t] = n(r), i && i.push([e, t, r])
    }

    function Z(e) {
        e = e || {};
        var t = {};
        return e.on = function(n, i) {
            n = [].concat(n);
            for (var r = 0, o = n.length; r < o; r++) {
                var a = n[r];
                if (!a) throw new Error("Tried to listen for an undefined event.");
                t[a] || (t[a] = []), t[a].push(i)
            }
            return e
        }, e.once = function(t, n) {
            function i() {
                n.apply(e.off(t, i), arguments)
            }
            return i.handler = n, e.on(t, i)
        }, e.off = function(n, i) {
            n = [].concat(n);
            for (var r = 0, o = n.length; r < o; r++) {
                var a = n[r];
                if (!a) throw new Error("Tried to remove an undefined event.");
                if (a in t) {
                    var s = t[a].indexOf(i);
                    if (s === -1) {
                        for (var c = 0, u = t[a].length; c < u; c++)
                            if (t[a][c].handler === i) {
                                s = r;
                                break
                            }
                        if (s === -1) return e
                    }
                    t[a].splice(s, 1)
                }
            }
            return e
        }, e.fire = function(n) {
            if (!n) throw new Error("Tried to fire an undefined event.");
            if (n in t)
                for (var i = t[n].slice(0), r = 0, o = i.length; r < o; r++) i[r].apply(e, i.slice.call(arguments, 1));
            return e
        }, e
    }

    function ee(e) {
        function t() {
            var t = e.telecine && e.telecine.currentScanner;
            switch (t) {
                case "HTMLScanner":
                    return "HTML5";
                case "SWFScanner":
                    return "Flideo";
                case "moogaloop":
                    return "Moogaloop";
                default:
                    return "Player"
            }
        }

        function n(t, n) {
            window._gaq && window._gaq.push(["player._trackSocial", t, n, e.config.video.share_url])
        }

        function i(e, n, i) {
            var r = (new Date).getTime() - n;
            window._gaq && window._gaq.push(["player._trackTiming", t(), e, r, i])
        }

        function r() {
            e.doNotTrackEnabled || (e.events.on(mt.facebookButtonPressed, function() {
                n("Facebook", "share")
            }), e.events.on(mt.twitterButtonPressed, function() {
                n("Twitter", "tweet")
            }), e.events.on(mt.tumblrButtonPressed, function() {
                n("Tumblr", "share")
            }), e.events.on(mt.emailButtonPressed, function() {
                n("Email", "email")
            }))
        }

        function o() {
            var t;
            e.events.on([mt.bufferStarted, mt.scrubbingStarted], function(e) {
                t || (t = e || (new Date).getTime())
            }), e.events.on(mt.bufferEnded, function() {
                if (t > 0) {
                    var n = e.telecine.currentFile.metadata.quality,
                        r = "Buffer Time";
                    d && (d = !1, r = "Start Time"), i(r, t, n), t = null
                }
            })
        }

        function a() {
            function t() {
                o = document.createElement("script"), o.id = "player-comscore", o.async = !0, o.src = e.config.request.urls.comscore_js;
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(o, t)
            }

            function n() {
                try {
                    r = new ns_.StreamingTag({
                        customerC2: e.config.request.comscore_id
                    }), a && (i(), a = !1)
                } catch (e) {}
            }

            function i() {
                try {
                    r.playContentPart({
                        ns_st_ci: e.config.video.id
                    })
                } catch (e) {}
            }
            if (!e.doNotTrackEnabled && e.playLoggingEnabled) {
                var r, o = document.getElementById("player-comscore"),
                    a = !1;
                e.events.on(mt.played, function() {
                    if (!r) {
                        if ("undefined" == typeof ns_) return o || t(), o.addEventListener("load", n, !1), void(a = !0);
                        n()
                    }
                    i()
                }), e.events.on(mt.paused, function() {
                    try {
                        r && r.stop()
                    } catch (e) {}
                })
            }
        }

        function s() {
            "tracking_pixel" in e.config.video && (e.doNotTrackEnabled || e.playLoggingEnabled && e.events.on(mt.playInitiated, function() {
                try {
                    (new Image).src = e.config.video.tracking_pixel
                } catch (e) {}
            }))
        }

        function c() {
            e.events.on(mt.configChanged, function() {
                u !== e.config.request.session && (window._gaq && window._gaq.push(["player._trackPageview", "/video/" + e.config.video.id]), d = !0)
            })
        }
        var u = e.config.request.session,
            d = !0;
        return r(), o(), a(), s(), c(), e.events.fire(mt.analyticsModuleReady), {}
    }

    function te(e) {
        return e = e.replace("#", ""), "string" == typeof e && (3 === e.length || 6 === e.length) && !isNaN(parseInt(e, 16))
    }

    function ne(e) {
        var t = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*([\d\.]+))?\)/.exec(e);
        if (!t) throw new Error("Invalid rgb value");
        return {
            red: parseInt(t[1], 10),
            green: parseInt(t[2], 10),
            blue: parseInt(t[3], 10),
            alpha: parseFloat(t[5]) || 1
        }
    }

    function ie() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        if (1 === t.length && t[0] instanceof ie) {
            var i = t[0];
            return this.red = i.red, this.green = i.green, this.blue = i.blue, this.alpha = i.alpha, this.hue = i.hue, this.saturation = i.saturation, this.lightness = i.lightness, this
        }
        if (1 === t.length) {
            if ("string" == typeof t[0] && t[0].indexOf("rgb") >= 0) return this.rgba = ne(t[0]), this;
            if (!te("" + t[0])) throw new Error("Invalid hex value");
            return this.hex = t[0], this
        }
        if (3 === t.length || 4 === t.length) {
            for (var r = 0; r < 3; r++)
                if (isNaN(parseInt(t[r], 10)) || parseInt(t[r], 10) < 0 || parseInt(t[r], 10) > 255) throw new Error("Invalid rgb value");
            if (t[3] && parseFloat(t[3]) < 0 || parseFloat(t[3]) > 1) throw new Error("Invalid alpha value");
            return this.rgba = {
                red: t[0],
                green: t[1],
                blue: t[2],
                alpha: parseFloat(t[3]) || 1
            }, this
        }
        throw new Error("Invalid color")
    }

    function re(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if (!e || "null" === e || 0 === t.length) return {
            track: null
        };
        var n = e.split("."),
            i = bt(n, 2),
            r = i[0],
            o = i[1],
            a = r.split(/[-_]/),
            s = bt(a, 1),
            c = s[0],
            u = r !== c,
            d = t.filter(function(e) {
                return u ? e.language === r || e.language === c : e.language === c
            }).sort(function(e, t) {
                var n = 2 * (e.language === c && e.kind === o) + 2 * (e.language === r) + 1 * (e.kind === o),
                    i = 2 * (t.language === c && t.kind === o) + 2 * (t.language === r) + 1 * (t.kind === o);
                return i - n
            });
        return d.length > 0 ? {
            track: d[0],
            exactMatch: d[0].language === r && d[0].kind === o
        } : {
            track: null
        }
    }

    function oe(e) {
        function t(e, t, n) {
            this.message = e, this.name = t, this.source = n
        }

        function n(n) {
            switch (e.config.view) {
                case dt.privateLocked:
                    throw new t("The video is private.", "PrivacyError", n);
                case dt.privatePassword:
                    throw new t("The video is password-protected. The viewer must enter the password first.", "PasswordError", n);
                case dt.error:
                    throw new t(e.config.message, "NotFoundError", n)
            }
        }

        function i() {
            var e = [];
            for (var t in D)
                if (D.hasOwnProperty(t) && 0 !== t.indexOf("_")) {
                    if ("function" == typeof D[t]) {
                        e.push(t);
                        continue
                    }
                    "function" == typeof D[t].get && e.push("get" + t.charAt(0).toUpperCase() + t.slice(1)), "function" == typeof D[t].set && e.push("set" + t.charAt(0).toUpperCase() + t.slice(1))
                }
            return e.sort()
        }

        function r() {
            M || (d({
                event: "loaded",
                data: {
                    id: e.config.video.id
                }
            }), M = !0)
        }

        function o(e) {
            if (!e || "" === e) return {};
            if ("object" === ("undefined" == typeof e ? "undefined" : gt(e))) return e;
            try {
                return L = 2, JSON.parse(e)
            } catch (n) {
                var t = {};
                return e.split("&").forEach(function(e) {
                    try {
                        var n = e.split("="),
                            i = decodeURIComponent(n[0]),
                            r = decodeURIComponent(n[1]);
                        if ("id" === i) return;
                        "params" === i && (i = "value"), r = r.split(",")[0], t[i] = r
                    } catch (e) {}
                }), L = 1, t
            }
        }

        function a(e) {
            if (!e || "_" === e.substr(0, 1)) return null;
            switch (1 === L && (e = e.replace("api_", "")), e) {
                case "changeColor":
                    return D.color.set;
                case "paused":
                    return D.paused.get;
                case "seekTo":
                    return D.currentTime.set
            }
            if ("function" == typeof D[e]) return D[e];
            var t = e.substr(0, 3),
                n = e.substr(3, 1).toLowerCase() + e.substr(4);
            return D[n] && D[n][t] ? D[n][t] : null
        }

        function s(n) {
            if (n.source === window.parent) {
                var r = o(n.data),
                    s = r.method,
                    c = r.value;
                if (void 0 !== s) try {
                    var u = a(s);
                    if (!u) throw new t("“" + s + "” is not a valid method. Valid methods are: " + i().join(", ") + ".", "TypeError", s);
                    e.addBreadcrumb("API message received", r, "api");
                    var l = [c];
                    u === D.addCuePoint && "object" === ("undefined" == typeof c ? "undefined" : gt(c)) ? l = [c.time, c.data] : u === D.enableTextTrack && "object" === ("undefined" == typeof c ? "undefined" : gt(c)) && (l = [c.language, c.kind]);
                    var h = u.apply(n, l),
                        v = 0 !== s.indexOf("get") && "paused" !== s;
                    if (h === w || v && L < 3) return;
                    d({
                        method: s,
                        value: void 0 !== h && "" !== h ? h : c
                    })
                } catch (e) {
                    f(e)
                }
            }
        }

        function c(e) {
            var t = e.event;
            if (1 === L)
                for (var n in R)
                    if (R[n] === e.event) {
                        t = n;
                        break
                    }
            switch (t) {
                case "onSeek":
                case "onProgress":
                    delete e.data.percent, delete e.data.duration;
                    break;
                case "onLoading":
                    delete e.data.seconds, delete e.data.duration
            }
            var i = "method=" + encodeURIComponent(t || e.method);
            i += "&params=";
            var r = [];
            if (void 0 !== e.value) r.push(encodeURIComponent(e.value));
            else if ("object" === gt(e.data))
                for (var o in e.data) r.push(encodeURIComponent(e.data[o]));
            else void 0 !== e.data && r.push(encodeURIComponent(e.data));
            return e.player_id && r.push(e.player_id), i += r.join(",")
        }

        function u(e) {
            if (e.event) {
                for (var t in B)
                    if (B[t] === e.event) {
                        e.event = t;
                        break
                    }
                "cuechange" === e.event && (e.data.text = e.data.cues[0].text, e.data.html = e.data.cues[0].html, delete e.data.cues)
            }
            return JSON.stringify(e)
        }

        function d(t) {
            if ((!t.event || (S.fire(t.event, t.data), k[t.event])) && x) {
                e.config.embed && e.config.embed.player_id && (t.player_id = e.config.embed.player_id);
                try {
                    1 === L ? t = c(t) : 2 === L && (t = u(t)), "object" !== ("undefined" == typeof t ? "undefined" : gt(t)) || "ready" !== t.event && T || (t = JSON.stringify(t))
                } catch (e) {}
                if (window.parent != window) try {
                    window.parent.postMessage(t, _ && "null" !== _ ? _ : "*")
                } catch (e) {}
            }
        }

        function f(e) {
            var n = {
                event: "error",
                data: {
                    message: "An error occurred.",
                    name: "Error",
                    method: e.source
                }
            };
            e instanceof t && (n = {
                event: "error",
                data: {
                    message: e.message,
                    name: e.name,
                    method: e.source
                }
            }), d(n)
        }

        function h() {
            if (P && A) {
                try {
                    switch (A) {
                        case "not-supported":
                            throw new t("This video is not supported in this browser.", "NotSupportedError");
                        case "no-files":
                            throw new t("There was an error loading the files for this video.", "FileError");
                        default:
                            throw new t("An error occurred during playback.", "PlaybackError")
                    }
                } catch (e) {
                    f(e)
                }
                A = null
            }
        }

        function v() {
            "embed" in e.config && e.config.embed.on_site || (window.addEventListener ? window.addEventListener("message", s, !1) : window.attachEvent("onmessage", s))
        }

        function m() {
            e.events.on(mt.played, function(t) {
                C || (C = !0, d({
                    event: "play",
                    data: {
                        seconds: p(t),
                        percent: p(t / e.config.video.duration),
                        duration: p(e.config.video.duration)
                    }
                }))
            }), e.events.on(mt.paused, function(t) {
                C = !1, d({
                    event: "pause",
                    data: {
                        seconds: p(t),
                        percent: p(t / e.config.video.duration),
                        duration: p(e.config.video.duration)
                    }
                })
            }), e.events.on(mt.ended, function() {
                C = !1, d({
                    event: "ended",
                    data: {
                        seconds: p(e.config.video.duration),
                        percent: 1,
                        duration: p(e.config.video.duration)
                    }
                })
            }), e.events.on(mt.playProgress, function(e, t, n) {
                d({
                    event: "timeupdate",
                    data: {
                        seconds: p(e),
                        percent: p(n),
                        duration: p(t)
                    }
                })
            }), e.events.on(mt.loadProgress, function(e, t, n) {
                var i = {
                    event: "progress",
                    data: {
                        percent: p(n),
                        duration: p(t),
                        seconds: p(e)
                    }
                };
                L < 3 && (i.data.bytesLoaded = -1, i.data.bytesTotal = -1), d(i)
            }), e.events.on(mt.seeked, function(e, t, n) {
                d({
                    event: "seeked",
                    data: {
                        seconds: p(e),
                        percent: p(n),
                        duration: p(t)
                    }
                })
            }), e.events.on(mt.volumeChanged, function(e) {
                d({
                    event: "volumechange",
                    data: {
                        volume: p(e)
                    }
                })
            }), e.events.on(mt.error, function(e) {
                A = e, h()
            }), e.events.on(mt.apiError, function(e) {
                f(new t(e.message, e.name, e.method))
            }), e.events.on(mt.cueChanged, function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                    n = e || {},
                    i = n.language,
                    r = void 0 === i ? null : i,
                    o = n.label,
                    a = void 0 === o ? null : o,
                    s = n.kind,
                    c = void 0 === s ? null : s;
                d({
                    event: "cuechange",
                    data: {
                        label: a,
                        language: r,
                        kind: c,
                        cues: t
                    }
                })
            }), e.events.on(mt.captionsChanged, function(e) {
                F = e;
                var t = e || {},
                    n = t.language,
                    i = void 0 === n ? null : n,
                    r = t.label,
                    o = void 0 === r ? null : r,
                    a = t.kind,
                    s = void 0 === a ? null : a;
                d({
                    event: "texttrackchange",
                    data: {
                        label: o,
                        language: i,
                        kind: s
                    }
                })
            }), e.doNotTrackEnabled || e.events.on(mt.emailCaptureSuccess, function() {
                d({
                    event: "emailcapture"
                })
            }), e.events.on(mt.cuepoint, function(e) {
                d({
                    event: "cuepoint",
                    data: {
                        time: e.time,
                        data: e.data,
                        id: e.id
                    }
                })
            }), e.events.on(mt.spatialMotionStart, function() {
                d({
                    event: "motionstart",
                    data: {}
                })
            }), e.events.on(mt.spatialMotionEnd, function() {
                d({
                    event: "motionend",
                    data: {}
                })
            })
        }

        function g() {
            e.events.on(pt.reset, function() {
                A = null, O = !1, M = !1
            })
        }

        function y() {
            e.events.on(mt.configChanged, function(t) {
                E && setTimeout(function() {
                    var t = !0;
                    e.events.fire(pt.changeVolume, E, t)
                }, 0), t && r()
            })
        }
        var _ = document.referrer || e.config.request.referrer;
        try {
            _ = decodeURIComponent(_)
        } catch (e) {
            _ = unescape(_)
        }
        var b, w = "_ASYNC_",
            k = {
                ready: !0
            },
            S = Z(),
            x = !(!window.postMessage || !window.parent.postMessage),
            T = !(Nt.browser.ie >= 8 && Nt.browser.ie < 10),
            E = null,
            L = e.config.embed.api,
            P = !1,
            C = !1,
            A = null,
            O = !1,
            M = !1,
            F = null,
            I = ["play", "pause", "ended", "timeupdate", "progress", "seeked", "error", "texttrackchange", "cuechange", "volumechange", "loaded", "emailcapture", "cuepoint", "motionstart", "motionend"],
            q = I.filter(function(e) {
                return "emailcapture" !== e
            }),
            R = {
                onFinish: "ended",
                onLoading: "progress",
                onLoad: "ready",
                onProgress: "timeupdate",
                onPlay: "play",
                onPause: "pause",
                onSeek: "seeked"
            },
            B = {
                playProgress: "timeupdate",
                loadProgress: "progress",
                finish: "ended",
                seek: "seeked"
            };
        t.prototype = new Error;
        var D = {
            _setEmbedSetting: function(t, n) {
                e.config.embed.on_site && (n = "object" === ("undefined" == typeof n ? "undefined" : gt(n)) ? n : Number(n), "badge" === t && (n ? n = b : b = e.config.embed.settings.badge), e.config.embed.settings[t] = n, e.events.fire(mt.embedSettingChanged, t, n), e.events.fire(pt.reset), e.events.fire(mt.configChanged, !1))
            },
            _showOverlay: function(t, n) {
                e.events.fire(pt.showOverlay, t, n)
            },
            _toggleDebugHud: function() {
                e.events.fire(mt.debugButtonPressed)
            },
            _fieldOfView: {
                get: function() {
                    var n = e.telecine.getEffectByName("ThreeSixtyEffect");
                    if (e.telecine && !n) throw new t("Field of view is not available in the current player.", "UnsupportedError", "getFieldOfView");
                    return n.fieldOfView
                },
                set: function(n) {
                    var i = e.telecine.getEffectByName("ThreeSixtyEffect");
                    if (e.telecine && !i) throw new t("Field of view is not available in the current player.", "UnsupportedError", "setFieldOfView");
                    e.telecine.getEffectByName("ThreeSixtyEffect").fieldOfView = n
                }
            },
            _coordinates: {
                get: function() {
                    var n = e.telecine.getEffectByName("ThreeSixtyEffect");
                    if (e.telecine && !n) throw new t("Coordinates are not available in the current player.", "UnsupportedError", "getCoordinates");
                    return n.currentCoordinates
                },
                set: function(n) {
                    var i = e.telecine.getEffectByName("ThreeSixtyEffect");
                    if (e.telecine && !i) throw new t("Coordinates are not available in the current player.", "UnsupportedError", "setCoordinates");
                    try {
                        e.telecine.getEffectByName("ThreeSixtyEffect").currentCoordinates = n
                    } catch (e) {
                        throw new t(e.message, "RangeError", "setCoordinates")
                    }
                }
            },
            addEventListener: function(n, i) {
                if (n in R && (n = R[n]), n in B && (n = B[n]), I.indexOf(n) < 0) throw new t("“" + n + "” is not a valid event. Valid events are: " + q.join(", ") + ".", "TypeError", "addEventListener");
                i ? S.on(n, i) : k[n] = !0, ("loaded" === n && e.config.view === dt.main || e.config.view === dt.privateUnlocked) && r()
            },
            removeEventListener: function(e, t) {
                t ? S.off(e, t) : k[e] = !1
            },
            play: function() {
                n("play");
                var i = "[object MessageEvent]" === Object.prototype.toString.call(this),
                    r = "undefined" != typeof Nt && Nt.iOS && Nt.iOS < 10;
                if (i && r && !O) throw new t("The viewer must initiate playback first.", "Error", "play");
                e.events.fire(mt.playButtonPressed)
            },
            pause: function() {
                n("pause"), e.events.fire(mt.pauseButtonPressed)
            },
            loadVideo: function(i) {
                var r = l(i),
                    o = r.id,
                    a = r.url,
                    s = r.params;
                if (!o && !a) throw new t("The video id must be an integer.", "TypeError", "loadVideo");
                if (a && a.match(null === new RegExp("^https?://" + e.config.player_url + "/video/([0-9]+)/config"))) throw new t("The config url must be a valid Vimeo url.", "TypeError", "loadVideo");
                return e.loadVideo(a || o, s).then(function() {
                    return L > 2 && d({
                        method: "loadVideo",
                        value: i
                    }), i
                }).catch(function() {
                    try {
                        n("loadVideo")
                    } catch (e) {
                        if (e instanceof t) return void f(e);
                        f(new t("An error occurred loading the video.", "Error", "loadVideo"))
                    }
                }), w
            },
            unload: function() {
                e.config.view !== dt.main && e.config.view !== dt.privateUnlocked || e.events.fire(pt.reset)
            },
            enableTextTrack: function(n) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    r = ("text_tracks" in e.config.request ? e.config.request.text_tracks : []).map(function(e) {
                        return e.language = e.lang, e
                    }),
                    o = r.some(function(e) {
                        return e.language.toLowerCase() === n.toLowerCase()
                    });
                if (!o) throw new t("There are no tracks for “" + n.toUpperCase() + "”.", "InvalidTrackLanguageError", "enableTextTrack");
                var a = i ? n + "." + i : n,
                    s = re(a, r),
                    c = s.track;
                if (!c || i && c.kind !== i) throw new t("There are no " + i + " tracks for “" + n.toUpperCase() + "”.", "InvalidTrackError", "enableTextTrack");
                return e.events.fire(pt.turnCaptionsOn, c.id, !0), L > 2 && e.events.once(mt.captionsChanged, function(e, t) {
                    d({
                        method: "enableTextTrack",
                        value: {
                            label: e.label,
                            language: e.language,
                            kind: e.kind
                        }
                    })
                }), w
            },
            disableTextTrack: function() {
                e.events.fire(pt.turnCaptionsOff)
            },
            ping: function() {
                return e.config.video.id
            },
            addCuePoint: function(n, i) {
                if (e.telecine && "moogaloop" === e.telecine.currentScanner) throw new t("Cue points are not supported in the current player.", "UnsupportedError", "addCuePoint");
                if (n = parseFloat(n), isNaN(n) || n < 0 || n > e.config.video.duration) throw new t("Cue point time must be positive number less than the duration of the video (" + p(e.config.video.duration) + ").", "RangeError", "addCuePoint");
                try {
                    var r = function() {
                        var t = e.telecine.addCuePoint(n, i);
                        return setTimeout(function() {
                            e.events.fire(mt.cuePointAdded, t)
                        }, 0), {
                            v: t.id
                        }
                    }();
                    if ("object" === ("undefined" == typeof r ? "undefined" : gt(r))) return r.v
                } catch (e) {
                    if ("CuePointsNotSupported" === e.name) throw new t("Cue points are not supported in the current player.", "UnsupportedError", "addCuePoint");
                    throw new t("Unable to add cue point", "InvalidCuePoint", "addCuePoint")
                }
            },
            removeCuePoint: function(n) {
                if (e.telecine && "moogaloop" === e.telecine.currentScanner) throw new t("Cue points are not supported in the current player.", "UnsupportedError", "removeCuePoint");
                var i = e.telecine.cuePoints.filter(function(e) {
                    return e.id === n
                })[0];
                if (!i) throw new t("Cue point “" + n + "” was not found.", "InvalidCuePoint", "removeCuePoint");
                e.telecine.removeCuePoint(i), setTimeout(function() {
                    e.events.fire(mt.cuePointRemoved, i)
                }, 0)
            },
            autopause: {
                get: function() {
                    if (e.telecine && "moogaloop" === e.telecine.currentScanner) throw new t("Autopause is not supported in the current player.", "UnsupportedError", "getAutopause");
                    return !!e.config.embed.autopause
                },
                set: function(n) {
                    if (e.telecine && "moogaloop" === e.telecine.currentScanner) throw new t("Autopause is not supported in the current player.", "UnsupportedError", "setAutopause");
                    e.config.embed.autopause = !!n
                }
            },
            color: {
                get: function() {
                    return e.config.embed.color.replace("#", "")
                },
                set: function(n) {
                    if ("moogaloop" === e.telecine.currentScanner) return void e.events.fire(pt.changeColor, n);
                    if (e.config.embed.settings.color && !e.config.embed.on_site) throw new t("The creator of the video has chosen to always use " + new ie(e.config.embed.color).hex + ".", "EmbedSettingsError", "setColor");
                    try {
                        var i = new ie(n);
                        e.events.fire(pt.changeColor, i.hex)
                    } catch (e) {
                        throw new t("The color should be 3- or 6-digit hex value.", "TypeError", "setColor")
                    }
                    var r = new ie(23, 35, 34, .75),
                        o = r.contrast(i).ratio;
                    if (o < 3) {
                        var a = i.clone().lighten(5, 3, r);
                        throw new t(i.hex + " does not meet minimum contrast ratio. We recommend using brighter colors. (You could try " + a.hex + " instead.) See WCAG 2.0 guidelines: http://www.w3.org/TR/WCAG/#visual-audio-contrast", "ContrastError", "setColor")
                    }
                }
            },
            cuePoints: {
                get: function() {
                    if (e.telecine && "moogaloop" === e.telecine.currentScanner) throw new t("Cue points are not supported in the current player.", "UnsupportedError", "getCuePoints");
                    return e.telecine.cuePoints.map(function(e) {
                        return {
                            time: e.time,
                            data: e.data,
                            id: e.id
                        }
                    })
                }
            },
            currentTime: {
                get: function() {
                    return e.telecine && e.telecine.currentTime > .1 ? p(e.telecine.currentTime) : 0
                },
                set: function(n) {
                    if (n = parseFloat(n), isNaN(n) || n < 0 || n > e.config.video.duration) throw new t("Seconds must be a positive number less than the duration of the video (" + p(e.config.video.duration) + ").", "RangeError", "setCurrentTime");
                    var i = "[object MessageEvent]" === Object.prototype.toString.call(this);
                    if (i && "undefined" != typeof Nt && (Nt.iPhone || Nt.iPad || Nt.iPod) && !O) throw new t("The viewer must initiate playback first.", "Error", "setCurrentTime");
                    return e.events.fire(pt.seek, null, n), e.events.fire(mt.mousedOver), L > 2 && e.events.once(mt.seeked, function(e, t, n) {
                        d({
                            method: "setCurrentTime",
                            value: e
                        })
                    }), w
                }
            },
            duration: {
                get: function() {
                    return p(e.config.video.duration)
                }
            },
            ended: {
                get: function() {
                    return !!e.telecine.ended
                }
            },
            loop: {
                get: function() {
                    return !!e.config.embed.loop
                },
                set: function(t) {
                    e.events.fire(pt.changeLoop, t)
                }
            },
            paused: {
                get: function() {
                    return !(e.telecine && "paused" in e.telecine) || !!e.telecine.paused
                }
            },
            textTracks: {
                get: function() {
                    var t = e.telecine ? e.telecine.video.textTracks : [];
                    return t.map(function(e) {
                        return {
                            label: e.label,
                            language: e.language,
                            kind: e.kind,
                            mode: e === F ? "showing" : "disabled"
                        }
                    })
                }
            },
            videoEmbedCode: {
                get: function() {
                    return e.config.video.embed_code
                }
            },
            videoHeight: {
                get: function() {
                    return e.telecine.videoHeight || e.config.video.height
                }
            },
            videoId: {
                get: function() {
                    return e.config.video.id
                }
            },
            videoTitle: {
                get: function() {
                    return e.config.video.title
                }
            },
            videoWidth: {
                get: function() {
                    return e.telecine.videoWidth || e.config.video.width
                }
            },
            videoUrl: {
                get: function() {
                    if (!e.config.video.url) throw new t("The URL is not available because of the video’s privacy settings.", "PrivacyError", "getVideoUrl");
                    return e.config.video.url
                }
            },
            volume: {
                get: function() {
                    var t = p(e.config.request.cookie.volume);
                    return 1 === L ? Math.round(100 * t) : t
                },
                set: function(n) {
                    if (n = parseFloat(n), 1 === L && (n /= 100), isNaN(n) || n < 0 || n > 1) throw new t("Volume should be a number between 0 and 1.", "RangeError", "setVolume");
                    E = n;
                    var i = !0;
                    e.events.fire(pt.changeVolume, n, i)
                }
            },
            _like: {
                get: function() {
                    return !!e.config.user.liked
                },
                set: function(t) {
                    if (e.config.embed.on_site) {
                        if (e.config.user.liked === t) return;
                        e.events.fire(mt.likeButtonPressed, t)
                    }
                }
            },
            _watchLater: {
                get: function() {
                    return !!e.config.user.watch_later
                },
                set: function(t) {
                    if (e.config.embed.on_site) {
                        if (e.config.user.watch_later === t) return;
                        e.events.fire(mt.watchLaterButtonPressed, t)
                    }
                }
            }
        };
        return e.events.on(mt.playInitiated, function() {
            O = !0
        }), m(), g(), y(), e.events.fire(mt.apiModuleReady), e.events.once(mt.ready, function() {
            P = !0, v(), d({
                event: "ready"
            }), h()
        }), D
    }

    function ae(e, t) {
        function n() {
            return Math.max(10, Math.round(.045 * e.element.clientHeight)) + "px"
        }

        function i() {
            t.style.fontSize = n()
        }

        function r() {
            t.classList.add("hidden"), t.setAttribute("hidden", "")
        }

        function o() {
            "picture-in-picture" !== e.telecine.presentationMode && (t.classList.remove("hidden"), t.removeAttribute("hidden"))
        }

        function a(e) {
            var t = e.text.replace("\n", "<br>").split(/<br ?\/?>/),
                n = t.reduce(function(e, t) {
                    return Math.max(e, t.replace(/<\/?\w>/g, "").length)
                }, 0),
                i = "+" + Array(n + 3).join("-") + "+";
            return t = t.map(function(e) {
                var t = n - e.replace(/<\/?\w>/g, "").length,
                    i = Math.floor(t / 2),
                    r = Math.ceil(t / 2);
                return '<span class="bar">|</span>&nbsp;' + Array(i + 1).join("&nbsp;") + e + Array(r + 1).join("&nbsp;") + '&nbsp;<span class="bar">|</span>';
            }), i + "<br>" + t.join("<br>") + "<br>" + i
        }

        function s() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []; t.firstChild;) t.removeChild(t.firstChild);
            if (e.length) {
                var n = document.createDocumentFragment();
                e.forEach(function(e) {
                    var t = document.createElement("span"),
                        i = e.html;
                    p && (i = a(e)), t.innerHTML = i, n.appendChild(t)
                }), t.appendChild(n)
            }
        }

        function c() {
            e.events.on(mt.cueChanged, function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return m = t, s(t), t.length ? h ? void o() : void(v = !0) : void r()
            }).on(mt.captionsChanged, function(e) {
                return e ? (t.setAttribute("lang", e.language), void t.setAttribute("dir", e.rtl ? "rtl" : "ltr")) : (t.removeAttribute("dir"), void t.removeAttribute("lang"))
            }).on(mt.playInitiated, function() {
                h = !0, v && (v = !1, o())
            }).on(mt.pictureInPictureActivated, function() {
                r()
            }).on(mt.pictureInPictureDeactivated, function() {
                o()
            }).on(pt.reset, function() {
                h = !1, r()
            }).on(pt.setEffect, function(e) {
                p = "ascii" === e, s(m)
            })
        }

        function u() {
            i(), window.addEventListener("resize", i, !1), e.events.on([mt.enteredTinyMode, mt.enteredMiniMode, mt.enteredNormalMode], i)
        }

        function d() {
            e.events.on(mt.controlBarVisibilityChanged, function(e) {
                return e ? void t.classList.add("with-controls") : void t.classList.remove("with-controls")
            })
        }

        function l() {
            e.events.on(mt.overlayOpened, function() {
                t.classList.add("invisible")
            }).on(mt.overlayClosed, function() {
                t.classList.remove("invisible")
            })
        }

        function f() {
            e.events.on(mt.ended, function() {
                "nothing" !== e.config.embed.outro && t.classList.add("invisible")
            }).on([mt.played, mt.scrubbingStarted], function() {
                t.classList.remove("invisible")
            })
        }
        var h = !1,
            v = !1,
            p = !1,
            m = [];
        return c(), u(), d(), l(), f(), {}
    }

    function se(e) {
        function t() {
            return s && s - vn <= (new Date).getTime()
        }

        function n(e) {
            var t = (new Date).getTime() + 1e3 * e,
                n = 1e3 * e - vn - 5e3;
            return d = setTimeout(function() {
                "onLine" in navigator && !navigator.onLine || (u = r(a.video.id))
            }, n), t
        }

        function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            clearTimeout(d);
            var i = a;
            if (isNaN(e) && "string" != typeof e) return a = e, s = n(a.request.expires), ut.resolve({
                old: i,
                loaded: a
            });
            var r = (new Date).getTime(),
                o = a && a.video && a.video.id,
                c = a && a.request && a.request.session,
                u = a && a.request && a.request.referrer,
                l = a && a.embed && a.embed.player_id,
                f = a && a.embed && a.embed.on_site,
                v = a && a.embed && a.embed.context,
                p = e;
            return isNaN(e) || ! function() {
                var n = a && a.player_url ? "https://" + a.player_url : "",
                    i = window.location.search.replace("?", "").split("&").reduce(function(e, t) {
                        if (t.length > 0) {
                            var n = t.split("="),
                                i = bt(n, 2),
                                r = i[0],
                                o = i[1];
                            e[r] = decodeURIComponent(o)
                        }
                        return e
                    }, {}),
                    r = Object.keys(t).reduce(function(e, n) {
                        return e[n] = t[n], e
                    }, i),
                    o = Object.keys(r).map(function(e) {
                        return e + "=" + encodeURIComponent(r[e])
                    }).join("&");
                p = n + "/video/" + e + "/config" + (o.length > 0 ? "?" : "") + o
            }(), u && (p += (p.indexOf("?") === -1 ? "?" : "&") + "referrer=" + encodeURIComponent(u)), h(p, {
                allowErrorStatuses: !0
            }).then(function(e) {
                a = JSON.parse(e), a.view !== dt.error && (s = n(a.request.expires), c && a.video.id === o && (a.request.session = c), u && (a.request.referrer = u), l && (a.embed.player_id = l), f && (a.embed.on_site = 1, a.embed.context = v));
                (new Date).getTime() - r;
                return {
                    old: i,
                    loaded: a
                }
            })
        }

        function r() {
            clearTimeout(d);
            var e = (new Date).getTime(),
                t = a && a.request.referrer,
                i = a.request,
                r = i.signature,
                c = i.session,
                l = i.timestamp,
                f = i.expires,
                v = "https://" + a.player_url + "/video/" + a.video.id + "/config/request?session=" + c + "&signature=" + r + "&time=" + l + "&expires=" + f;
            return h(v).then(function(i) {
                a.request = JSON.parse(i), t && (a.request.referrer = t), s = n(a.request.expires);
                (new Date).getTime() - e;
                return u = null, o.fire(mt.requestConfigReloaded), a.request
            })
        }
        var o = e.events,
            a = null,
            s = null,
            c = null,
            u = null,
            d = null;
        return window.addEventListener("online", function() {
            t() && (u = r(a.video.id))
        }), {
            get isExpired() {
                return t()
            },
            load: function(e, t) {
                return i(e, t)
            },
            reload: function() {
                return a && a.video.id ? i(a.video.id) : ut.reject(new Error("No config loaded."))
            },
            toJSON: function() {
                return a
            },
            get config() {
                return a
            },
            set config(e) {
                a = e
            },
            verify: function() {
                return t() ? (u || (u = r()), u) : ut.resolve(a.request)
            },
            get _video() {
                return c
            },
            set _video(e) {
                c = e
            }
        }
    }

    function ce(e) {
        return function(t) {
            return ft[t.mime] === e
        }
    }

    function ue(e) {
        var t = e.fps;
        return "metadata" in e && (t = e.metadata.fps), t > 30
    }

    function de(e) {
        return e.quality || e.metadata.quality
    }

    function le(e) {
        return "string" != typeof e && (e = de(e)), parseInt(e, 10)
    }

    function fe(e) {
        return le(e) >= 720
    }

    function he(e) {
        var t = wn(e).filter(ue).map(de);
        return function(e) {
            return !(t.indexOf(de(e)) !== -1 && !ue(e))
        }
    }

    function ve(e) {
        return "fps" in e ? e.fps : "metadata" in e && "fps" in e.metadata ? e.metadata.fps : 0
    }

    function pe() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "desc";
        return function(t, n) {
            var i = le(t),
                r = ve(t),
                o = le(n),
                a = ve(n);
            return "asc" === e ? i - o || r - a : o - i || a - r
        }
    }

    function me(e, t) {
        var n = de(e);
        return n = n.replace("1440p", "2K").replace("2160p", "4K"), fe(e) && t && (n += t), n
    }

    function ge(e) {
        var t = e.files,
            n = void 0 === t ? [] : t,
            i = e.preference,
            r = void 0 === i ? "360p" : i,
            o = e.priorityOffset,
            a = void 0 === o ? 0 : o;
        n = wn(n), n.sort(pe());
        var s = n.map(de);
        if (r) {
            s.indexOf(r) === -1 && (s.push(r), s.sort(function(e, t) {
                return le(t) - le(e)
            }));
            var c = s.indexOf(r),
                u = s.splice(0, c);
            u.reverse(), s.push.apply(s, u)
        }
        return n.map(function(e) {
            return {
                id: e.id,
                src: e.url,
                mime: e.mime,
                priority: s.indexOf(e.quality) + 1 + a,
                metadata: {
                    profile: e.profile,
                    cdn: e.cdn,
                    origin: e.origin,
                    quality: e.quality,
                    fps: e.fps
                }
            }
        })
    }

    function ye(e) {
        function t() {
            C = !1, A = !1, F = !1, I = !1, q = !1, R = !1, H = null, U = null, B = null, z = null, W = !1, X = 0, K = 0, $ = e.config.embed.autoplay, V = u(), T = n(), E = e.config.request.urls.blurr, N = "auto"
        }

        function n() {
            return parseInt(Date.now() / 1e3, 10)
        }

        function i() {
            return Date.now ? Date.now() : (new Date).getTime()
        }

        function r(e) {
            return i() - e
        }

        function o(e) {
            return n() - e
        }

        function a() {
            var t = document.createElement("a");
            return t.href = e.config.request.referrer, t.origin || t.protocol.replace(":", "") + "://" + t.host
        }

        function s() {
            P = !0, setTimeout(c, L)
        }

        function c(t) {
            var n = !0;
            if (t) {
                if (n = !1, y && A && l("video-buffered", {
                        time: r(b) / 1e3,
                        video_time: k
                    }), _ && (A && !R && l("video-stopped-during-playback", {
                        time: r(w) / 1e3,
                        video_time: S
                    }), M += r(w) / 1e3), C && !A) {
                    var i = r(g);
                    i >= 1e3 && !e.telecine.paused && l("video-exit-before-start", {
                        time: i / 1e3
                    })
                }
                A && !e.config.embed.loop && l("video-playback-session", p(V))
            }
            var o = x;
            if (x = [], 0 === o.length) return void s();
            var a = JSON.stringify(o);
            if (navigator.sendBeacon && navigator.sendBeacon(E, a)) return void s();
            var c = new XMLHttpRequest;
            c.open("POST", E, n), c.setRequestHeader("Content-Type", "text/plain"), c.onload = function() {}, c.send(a), s()
        }

        function u() {
            return {
                account_type: e.config.video.owner ? e.config.video.owner.account_type : null,
                referrer: e.config.request.referrer,
                video_duration: e.config.video.duration,
                device_pixel_ratio: window.devicePixelRatio || 1,
                startup_time: 0,
                video_start_position: 0,
                video_end_position: 0,
                ended: 0,
                starting_profile: 0,
                abandoned_during_buffer: 0,
                forced_embed_quality: "none",
                dropped_frame_percent: 0,
                _fullscreen: [],
                number_of_down_switches: 0,
                number_of_up_switches: 0,
                number_of_buffers: 0,
                stayed_on_auto: 1,
                alert_displayed: 0,
                telecine_file_switched: 0,
                telecine_scanner_switched: 0,
                alert_dismissed: "none",
                _speeds: [],
                _playedProfiles: {},
                _targetProfiles: {},
                _embed_size: {},
                _target_profile_id: {},
                _profiles: {},
                session_playback_duration: 0
            }
        }

        function d() {
            var t = e.telecine.video.currentFile || {},
                n = t.id,
                i = void 0 === n ? 0 : n,
                r = t.mime,
                o = void 0 === r ? ht.h264 : r,
                a = t.metadata;
            a = void 0 === a ? {} : a;
            var s = a.profile,
                c = void 0 === s ? -1 : s,
                u = !1,
                d = !1;
            switch (o) {
                case ht.dash:
                    0 === t.restrictedStreamIndexes.length && (u = !0), e.config.request.files.dash.separate_av && (d = !0);
                    var l = j,
                        f = l.id;
                    i = void 0 === f ? 0 : f;
                    var h = l.profile;
                    c = void 0 === h ? -1 : h;
                    break;
                case ht.hls:
                    u = !0
            }
            var v = {
                session_id: e.config.request.session,
                clip_id: e.config.video.id,
                video_file_id: Number.isInteger(Number(i)) ? parseInt(i, 10) : 0,
                delivery: ft[o],
                profile_id: c,
                auto: Number(u),
                player_type: "html",
                version: e.config.request.build.js,
                autoplay: $,
                cdn: t.metadata.cdn || "akamai",
                origin: t.metadata.origin,
                secure: t.src && 0 === t.src.indexOf("https"),
                vod: e.config.video.vod ? 1 : 0,
                embed: !e.config.embed.on_site,
                context: e.config.embed.context,
                separate_av: d ? 1 : 0,
                is_spatial: Nt.spatialPlayback && e.config.video.spatial ? 1 : 0,
                is_stereo: Nt.spatialPlayback && e.config.video.stereo_mode && "mono" !== e.config.video.stereo_mode ? 1 : 0,
                drm: e.config.request.drm ? 1 : 0
            };
            if (e.config.request.ab_tests)
                for (var p in e.config.request.ab_tests) v[p + "_test"] = 1, v[p + "_group"] = e.config.request.ab_tests[p].group;
            return v
        }

        function l(t, n) {
            var i = d();
            for (var r in n) n.hasOwnProperty(r) && (i[r] = n[r]);
            i.name = t, i.event_time = e.config.request.timestamp + o(T), x.push(i), P || s()
        }

        function f() {
            var t = e.config.video.duration;
            e.config.request.flags.blurr && E && (e.events.on(mt.playInitiated, function() {
                C || e.performDelegateAction(lt.playLog, function(n) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    $ = r.continuous ? 2 : e.config.embed.autoplay, l("video-start-attempt"), C = !0, g = i();
                    var o = e.config.user.progress,
                        a = e.config.video.duration;
                    !o || e.config.embed.autoplay || e.config.embed.time || setTimeout(function() {
                        var e = o / a * 100,
                            n = t < o ? "seeked_back" : "resume";
                        n = 0 === t ? "beginning" : n, l("video-start-attempt-from-resume", {
                            state: n,
                            duration: a,
                            percent: e,
                            playback_time: t,
                            resume_time: o
                        })
                    }, 1e4)
                })
            }), e.events.on(mt.playProgress, function(e) {
                if (t = Math.min(e, t), !A) {
                    A = !0;
                    var n = r(g) / 1e3;
                    l("video-start-time", {
                        time: n
                    }), V.startup_time = n, V.video_start_position = e
                }
            }), e.events.on(mt.bufferStarted, function() {
                b || (k = e.telecine.currentTime, b = i()), y = !0
            }), e.events.on(mt.bufferEnded, function() {
                return y = !1, A ? (l("video-buffered", {
                    time: r(b) / 1e3,
                    video_time: k
                }), void(b = null)) : void(b = null)
            }), e.events.on(mt.ranIntoBuffer, function(t) {
                w || (S = e.telecine.currentTime, w = i()), _ = !0, t && (D = !0)
            }), e.events.on(mt.playbackResumed, function() {
                return !A || R ? void(w = null) : (M += r(w) / 1e3, R = !0, l("video-stopped-during-playback", {
                    time: r(w) / 1e3,
                    video_time: S
                }), w = null, void(_ = !1))
            }), e.events.on(mt.error, function(e) {
                arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    final: !0
                };
                return "scanner-error" === e ? void(V.telecine_scanner_switched = 1) : "telecine-file-error" === e ? void(V.telecine_file_switched = 1) : void 0
            }), e.events.on(mt.error, function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    final: !0
                };
                if (n.final !== !1) {
                    var i = ["not-supported", "decode", "network", "unknown", "drm-failure", "telecine-download-error"],
                        r = i.indexOf(t) !== -1;
                    return A ? void(r && l("video-playback-error", {
                        type: t,
                        video_time: e.telecine.currentTime
                    })) : C ? void(r && l("video-start-failure", {
                        type: t
                    })) : void(r && l("video-load-failure", {
                        type: t
                    }))
                }
            }), e.events.on(mt.didEnterFullscreen, function(e, t) {
                F || (l("video-enter-fullscreen", {
                    fullPlayer: e,
                    requested: t,
                    referrer: a()
                }), F = !0)
            }), e.events.on(mt.droppedFrames, function(e) {
                V.dropped_frame_percent = e.dropped / e.total * 100
            }), O(c))
        }

        function h() {
            e.events.on(pt.changeQuality, function(t) {
                e.telecine.video.currentFile.mime === ht.dash && ("auto" === t || I ? "auto" === t && I && !q && (l("video-switch-back-to-auto", {
                    quality: N,
                    auto: 1
                }), q = !0) : (l("video-switch-from-auto", {
                    quality: t,
                    auto: 0
                }), I = !0), N = t)
            }), e.events.on(mt.streamChanged, function(e) {
                j = e
            })
        }

        function v() {
            function t(e, t) {
                return e + ":" + t
            }

            function n(e) {
                V._embed_size[e] = V._embed_size[e] || 0, z = e
            }
            e.events.on(mt.playInitiated, function() {
                z = t(e.config.video.video_width, e.config.video.video_height), n(z)
            }), e.events.on(mt.playProgress, function(e) {
                V._embed_size[z] += 1, W || (W = !0, X = e), K = e, V.video_end_position = e
            }), e.events.on(pt.seek, function() {
                W = !1, V.session_playback_duration += K - X
            }), e.events.on(mt.seeked, function(e) {
                X = e
            }), e.events.on(mt.ended, function(t) {
                W && (W = !1), V.session_playback_duration += e.config.video.duration - X, V.video_end_position = e.config.video.duration, V.ended = 1, t && t.simulated && (V.ended = 2)
            }), e.events.on(mt.didEnterFullscreen, function(e, t) {
                V._fullscreen.push({
                    start: i()
                })
            }), e.events.on(mt.didExitFullscreen, function(e, t) {
                var n = V._fullscreen.length - 1;
                V._fullscreen[n].end = i()
            }), e.events.on(mt.adaptiveBandwidth, function(e) {
                var t = e.speed;
                V._speeds.push(t)
            }), e.events.on(mt.streamChanged, function(e, t, n) {
                var r = e.profile,
                    o = i(),
                    a = n[t].bitrate;
                if (V._profiles[r] = V._profiles[r] || [], V.starting_profile || (V.starting_profile = r), H) {
                    var s = V._profiles[H].length - 1;
                    V._profiles[H][s] && (V._profiles[H][s].end = o)
                }
                B && (a > B ? V.number_of_up_switches += 1 : V.number_of_down_switches += 1), V._profiles[r].push({
                    start: o
                }), V._playedProfiles[r] = {
                    bitrate: a,
                    width: n[t].width,
                    height: n[t].height
                }, H = r, B = a
            }), e.events.on(mt.ranIntoBuffer, function(e) {
                V.number_of_buffers += 1, V.abandoned_during_buffer = 1
            }), e.events.on(pt.changeQuality, function(e) {
                "auto" !== e && (V.stayed_on_auto = 0)
            }), e.events.on(mt.playbackResumed, function() {
                V.abandoned_during_buffer = 0
            }), e.events.on(mt.resize, function(e) {
                var i = e.width,
                    r = e.height;
                if (i && r) {
                    var o = t(i, r);
                    n(o)
                }
            }), e.events.on(mt.streamTargetChange, function(e, t, n) {
                var r = e.profile,
                    o = n[t].bitrate,
                    a = i();
                if (V._target_profile_id[r] = V._target_profile_id[r] || [], U) {
                    var s = V._target_profile_id[U].length - 1;
                    V._target_profile_id[U][s] && (V._target_profile_id[U][s].end = a)
                }
                V._target_profile_id[r].push({
                    start: a
                }), V._targetProfiles[r] = {
                    bitrate: o,
                    width: n[t].width,
                    height: n[t].height
                }, U = r
            }), e.events.on(mt.forcedQuality, function(e) {
                V.forced_embed_quality = e
            }), e.events.on(mt.alertVisibilityChanged, function(e, t) {
                return e ? void(V.alert_displayed = 1) : void(V.alert_dismissed = t)
            })
        }

        function p(t) {
            var n = {},
                r = i(),
                o = pe("asc"),
                a = "MediaSourceScanner" === e.telecine.currentScanner,
                s = "HTMLScanner" === e.telecine.currentScanner,
                c = [];
            s && (c = e.config.request.files.progressive), a && (c = e.config.request.files.dash.streams);
            var u = wn(c).sort(o).map(function(e) {
                return e.profile
            });
            for (var d in t) t.hasOwnProperty(d) && (n[d] = t[d]);
            n.seconds_in_fullscreen = n._fullscreen.reduce(function(e, t) {
                var n = t.end || r;
                return (n - t.start) / 1e3 + e
            }, 0), n.session_playback_duration += K - X;
            var l = null;
            if (Object.keys(n._embed_size).forEach(function(e) {
                    var t = n._embed_size[e];
                    t > l && (l = e)
                }), l) {
                var f = l.split(":"),
                    h = bt(f, 2),
                    v = h[0],
                    p = h[1];
                n.embed_width = parseInt(v, 10), n.embed_height = parseInt(p, 10)
            }
            var m = -1,
                g = 0,
                y = null;
            if (Object.keys(n._profiles).forEach(function(e) {
                    var t = u.indexOf(parseInt(e, 10));
                    t > m && (m = t);
                    var i = n._profiles[e].reduce(function(e, t) {
                        var n = t.end || r;
                        return (n - t.start) / 1e3 + e
                    }, 0);
                    i > g && (g = i, y = e)
                }), n.highest_profile = u[m], n.highest_available_profile = u[u.length - 1], n.most_used_profile = parseInt(y, 10), n.percent_watched = n.session_playback_duration / e.config.video.duration, a && ! function() {
                    n.max_speed = Math.round(Math.max.apply(Math, n._speeds)) / 1e3, n.min_speed = Math.round(Math.min.apply(Math, n._speeds)) / 1e3;
                    var e = n._speeds.reduce(function(e, t) {
                        return e + t
                    }, 0);
                    n.average_speed = Math.round(e / n._speeds.length) / 1e3;
                    var t = 0,
                        i = null;
                    Object.keys(n._target_profile_id).forEach(function(e) {
                        var o = n._target_profile_id[e].reduce(function(e, t) {
                            var n = t.end || r;
                            return (n - t.start) / 1e3 + e
                        }, 0);
                        o > t && (t = o, i = e)
                    }), n.target_profile = parseInt(i, 10);
                    var o = [];
                    Object.keys(n._playedProfiles).forEach(function(e) {
                        var t = n._playedProfiles[e],
                            i = t.width,
                            r = t.height,
                            a = parseInt(i, 10) * parseInt(r, 10);
                        o.push(a)
                    });
                    var a = o.reduce(function(e, t) {
                            return e + t
                        }, 0) / o.length,
                        s = [];
                    Object.keys(n._targetProfiles).forEach(function(e) {
                        s.push(n._targetProfiles[e].bitrate)
                    });
                    var c = s.reduce(function(e, t) {
                            return e / 1e3 + t / 1e3
                        }, 0) / s.length,
                        u = [];
                    Object.keys(n._targetProfiles).forEach(function(e) {
                        var t = n._targetProfiles[e],
                            i = t.width * t.height;
                        u.push(i)
                    });
                    var d = u.reduce(function(e, t) {
                            return e + t
                        }, 0) / u.length,
                        l = n._playedProfiles[n.most_used_profile],
                        f = l.width,
                        h = l.height,
                        v = f * h,
                        p = Math.min(v, d),
                        m = a * c / (p * Math.min(n.average_speed, c));
                    n.appdex = m, n.rPlayed = a, n.bMax = c, n.rMax = p, n.bufferedWithLowerProfileAvailable = D, n.number_of_switches = n.number_of_up_switches + n.number_of_down_switches
                }(), "undefined" != typeof window.performance && "function" == typeof window.performance.getEntriesByType) {
                var _ = performance.getEntriesByType("resource").filter(function(e) {
                    return ".m4s" === e.name.split("?")[0].substr(-4)
                });
                n.ttfb = _.map(function(e) {
                    return e.responseStart - e.connectStart
                }).reduce(function(e, t) {
                    return e + t
                }, 0) / (_.length || 1)
            }
            return n.buffer_duration = M, n.buffer_ratio = M / (M + n.session_playback_duration) * 100, Object.keys(n).forEach(function(e) {
                "_" === e.charAt(0) && delete n[e]
            }), n
        }

        function m() {
            e.events.on(mt.configChanged, function() {
                t()
            })
        }
        var g, y, _, b, w, k, S, x = [],
            T = n(),
            E = e.config.request.urls.blurr,
            L = 3e4,
            P = !1,
            C = !1,
            A = !1,
            M = 0,
            F = !1,
            I = !1,
            q = !1,
            R = !1,
            B = null,
            D = !1,
            N = "auto",
            j = {},
            V = u(),
            H = null,
            U = null,
            z = null,
            W = !1,
            X = 0,
            K = 0,
            $ = e.config.embed.autoplay;
        return f(), h(), v(), m(), {}
    }

    function _e(e) {
        function t() {
            return Date.now ? Date.now() : (new Date).getTime()
        }

        function n() {
            return e.config.video.spatial ? "mono" !== e.config.video.spatial.stereo_mode ? 2 : 1 : 0
        }

        function i() {
            var t = e.telecine.getEffectByName("ThreeSixtyEffect");
            return Nt.spatialPlayback ? t && t.isStereo() ? 2 : 1 : 0
        }

        function r() {
            h = !1, v = e.telecine ? e.telecine.currentTime : 0, m = 0, g = 0, y = 0, _ = !1
        }

        function o(t, n, i, r) {
            e.verifyConfig().then(function() {
                var a = n;
                a.signature = e.config.request.signature, a.session = e.config.request.session, a.time = e.config.request.timestamp, a.expires = e.config.request.expires;
                var s = JSON.stringify(a),
                    c = "https://" + e.config.player_url + t;
                if (navigator.sendBeacon && navigator.sendBeacon(c, s)) return !0;
                var u = new XMLHttpRequest;
                return u.open("POST", c, !i), u.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), u.withCredentials = !0, u.onload = function() {
                    200 !== u.status && r < 2 && setTimeout(function() {
                        o(t, n, i, r + 1)
                    }, 1e3)
                }, u.send(s), u
            }).catch(function(e) {})
        }

        function a(t, r, a) {
            var s = e.telecine.currentFile || {},
                c = s.id,
                u = void 0 === c ? 0 : c,
                d = s.mime,
                l = void 0 === d ? ht.h264 : d,
                f = s.metadata;
            f = void 0 === f ? {} : f;
            var h = f.profile,
                v = void 0 === h ? -1 : h;
            if (l === ht.dash) {
                var g = S,
                    y = g.id;
                u = void 0 === y ? 0 : y;
                var _ = g.profile;
                v = void 0 === _ ? -1 : _
            }
            e.performDelegateAction(lt.playLog, function(c) {
                var d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                o(t, {
                    referrer: e.config.request.referrer,
                    embed: !e.config.embed.on_site,
                    context: e.config.embed.context,
                    autoplay: d.continuous ? 2 : e.config.embed.autoplay,
                    loop: e.config.embed.loop ? 1 : 0,
                    id: e.config.video.id,
                    vodId: e.config.video.vod && e.config.video.vod.id ? e.config.video.vod.id : null,
                    vodSaleId: e.config.video.vod && e.config.video.vod.sale_id ? e.config.video.vod.sale_id : null,
                    sessionTime: p(m),
                    videoShape: n(),
                    spatialPlayback: i(),
                    userId: e.config.user.id,
                    userAccountType: e.config.user.account_type,
                    userIsMod: e.config.user.mod ? 1 : 0,
                    ownerId: e.config.video.owner.id,
                    ownerAccountType: e.config.video.owner.account_type,
                    privacy: e.config.video.privacy,
                    rating: e.config.video.rating ? e.config.video.rating.id : null,
                    type: vt[e.telecine.currentScanner],
                    videoFileId: Number.isInteger(Number(u)) ? u : 0,
                    delivery: ft[l],
                    profileId: v,
                    quality: s.metadata.quality,
                    duration: p(e.config.video.duration),
                    seconds: p(r)
                }, a)
            })
        }

        function s() {
            !_ && e.playLoggingEnabled && (_ = !0, a("/log/play", 0))
        }

        function c() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            if (e.playLoggingEnabled) {
                var o = t();
                r && g + k > o || (g = o, r && !e.config.request.flags.partials || h || a("/log/partial", n, i))
            }
        }

        function u(t, n) {
            if (!e.doNotTrackEnabled) {
                n = n || {};
                var i = {
                    referrer: e.config.request.referrer,
                    embed: !e.config.embed.on_site,
                    context: e.config.embed.context,
                    id: e.config.video.id,
                    vodId: e.config.video.vod && e.config.video.vod.id ? e.config.video.vod.id : null,
                    vodSaleId: e.config.video.vod && e.config.video.vod.sale_id ? e.config.video.vod.sale_id : null,
                    userId: e.config.user.id,
                    userAccountType: e.config.user.account_type,
                    ownerId: e.config.video.owner ? e.config.video.owner.id : 0,
                    duration: p(e.config.video.duration),
                    seconds: p(e.telecine.currentTime)
                };
                for (var r in n) n.hasOwnProperty(r) && (i[r] = n[r]);
                o("/log/" + t, i)
            }
        }

        function d() {
            function n() {
                var t = e.telecine.getEffectByName("ThreeSixtyEffect").currentCoordinates,
                    i = 100,
                    o = Math.round(t.lat * i) / i,
                    s = Math.round(t.long * i) / i,
                    c = {
                        sessionTime: m,
                        videoTime: e.telecine.currentTime,
                        coordinates: {
                            lat: o,
                            lon: s
                        }
                    };
                r.push(c), setTimeout(function() {
                    a && n()
                }, u)
            }

            function i() {
                r.length && e.performDelegateAction(lt.playLog, function(t) {
                    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    o("/log/spatial", {
                        embed: !e.config.embed.on_site,
                        id: e.config.video.id,
                        context: e.config.embed.context,
                        ownerId: e.config.video.owner ? e.config.video.owner.id : 0,
                        referrer: e.config.request.referrer,
                        vodId: e.config.video.vod && e.config.video.vod.id ? e.config.video.vod.id : null,
                        vodSaleId: e.config.video.vod && e.config.video.vod.sale_id ? e.config.video.vod.sale_id : null,
                        motionLog: JSON.stringify(r)
                    }, !1)
                })
            }
            e.events.on(mt.playProgress, function(e, n, i) {
                var r = Math.floor(e);
                !h && y + k < t() && (e > v && (m += e - v), v = e), r % b === 0 && c(e)
            }), e.events.on(mt.playInitiated, function() {
                s()
            }), e.events.on(mt.paused, function(t) {
                e.telecine.ended || c(t)
            }), e.events.on(mt.seeked, function(e, t, n) {
                w = e, h || c(w)
            }), e.events.on(mt.scrubbingStarted, function() {
                y = t(), h = !0
            }), e.events.on(mt.scrubbingEnded, function() {
                v = e.telecine.currentTime, h = !1, c(w)
            }), e.events.on(mt.hdButtonPressed, function() {
                c(e.telecine.currentTime)
            }), e.events.on(mt.ended, function() {
                m += e.config.video.duration - v;
                var t = !1,
                    n = !1;
                c(e.config.video.duration, t, n)
            }), e.events.on(mt.streamChanged, function(e) {
                S = e
            });
            var r = [],
                a = !1,
                u = 1e3;
            e.events.on(mt.spatialMotionStart, function() {
                a = !0, n()
            }), e.events.on(mt.spatialMotionEnd, function() {
                a = !1, i()
            }), e.events.on(mt.loadVideo, function() {
                i(), r = []
            }), O(function() {
                if (e.telecine && e.telecine.currentTime > 0) {
                    var t = !0,
                        n = !1;
                    c(e.telecine.currentTime, t, n), i()
                }
            })
        }

        function l() {
            function t(e) {
                return function() {
                    u(e)
                }
            }
            if (!e.doNotTrackEnabled) {
                var n = [{
                    type: "share_press",
                    event: mt.shareButtonPressed
                }, {
                    type: "facebook_press",
                    event: mt.facebookButtonPressed
                }, {
                    type: "twitter_press",
                    event: mt.twitterButtonPressed
                }, {
                    type: "tumblr_press",
                    event: mt.tumblrButtonPressed
                }, {
                    type: "email_press",
                    event: mt.emailButtonPressed
                }, {
                    type: "embed_press",
                    event: mt.embedButtonPressed
                }, {
                    type: "login_success",
                    event: mt.userLoggedIn
                }, {
                    type: "airplay",
                    event: mt.airPlayActivated
                }, {
                    type: "vod_press",
                    event: mt.vodButtonPressed
                }, {
                    type: "collection_press",
                    event: mt.collectionsButtonPressed
                }, {
                    type: "email_capture_submitted",
                    event: mt.emailCaptureSubmitted
                }];
                n.forEach(function(n) {
                    e.events.on(n.event, t(n.type))
                }), e.events.on(mt.outroDisplayed, function(t) {
                    var n = {
                        outroType: e.config.embed.outro,
                        ownerAccountType: e.config.video.owner.account_type,
                        playerWidth: e.element.clientWidth,
                        playerHeight: e.element.clientHeight
                    };
                    t.length && (n.outroVideos = t.join(",")), u("outro_displayed", n)
                }).on(mt.outroVideoPressed, function(t) {
                    u("outro_video_press", {
                        ownerAccountType: e.config.video.owner.account_type,
                        videoId: t
                    })
                }).on(mt.outroLinkPressed, function(t) {
                    u("outro_link_press", {
                        ownerAccountType: e.config.video.owner.account_type,
                        link: t
                    })
                }).on(mt.likeButtonPressed, function() {
                    u("like_press", {
                        add: !e.config.user.liked
                    })
                }).on(mt.watchLaterButtonPressed, function() {
                    u("watch_later_press", {
                        add: !e.config.user.watch_later
                    })
                }).on(mt.popupOpened, function(e) {
                    0 === e.indexOf("login-") && u("login_attempt")
                }).on(mt.captionsChanged, function(e, t) {
                    if (!t) return e ? void u("text_track_change", {
                        textTrackLanguage: e.language,
                        textTrackKind: e.kind
                    }) : void u("text_track_change")
                }).on(mt.badgePressed, function(e) {
                    1 !== e && 12 !== e || u("badge_press", {
                        badgeId: e
                    })
                }).on(mt.overlayOpened, function(e) {
                    "email-capture" === e && u("email_capture_displayed")
                }).on(mt.overlayClosed, function(e) {
                    "email-capture" === e && u("email_capture_dismissed")
                })
            }
        }

        function f() {
            e.events.on(mt.configChanged, function(e) {
                e && r()
            })
        }
        var h, v, m, g, y, _, b = 30,
            w = 0,
            k = 1e3,
            S = {};
        return r(), d(), l(), f(), e.events.fire(mt.statsModuleReady), {}
    }

    function be(e) {
        return e === !0 || e === !1 ? Number(e) : "null" === e ? null : e
    }

    function we(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.cookie;
        try {
            if (t && "" !== t) return t.split(";").reduce(function(t, n) {
                return n = n.trim(), 0 === n.indexOf(e + "=") ? decodeURIComponent(n.substr(e.length + 1)) : t
            }, null)
        } catch (e) {}
        return null
    }

    function ke(e, t, n) {
        var i = new Date;
        i.setFullYear(i.getFullYear() + 1), i = i.toGMTString(), t = be(t);
        var r = e + "=" + t + ";";
        r += "expires=" + i + ";", r += "path=/;", r += "domain=" + n + ";";
        try {
            return document.cookie = r, !0
        } catch (e) {
            return !1
        }
    }

    function Se(e) {
        function t(t) {
            return new ut(function(n, i) {
                var r = document.createElement("a");
                r.href = e.config.request.urls.proxy;
                var o = document.createElement("iframe");
                o.src = t, o.setAttribute("title", "Vimeo LocalStorage Proxy"), o.setAttribute("aria-hidden", "true"), o.setAttribute("hidden", ""), o.onload = function(t) {
                    var n = a(e.config.request.urls.proxy);
                    o.contentWindow.postMessage({
                        method: "ping"
                    }, n)
                }, o.onerror = function(e) {
                    i(e)
                };
                var s = setTimeout(function() {
                        i()
                    }, 1e4),
                    c = function e(i) {
                        0 !== t.indexOf(i.origin) || "ready" !== i.data && "ping" !== i.data || (window.removeEventListener("message", e, !1), clearTimeout(s), n(o))
                    };
                window.addEventListener("message", c, !1), document.body.appendChild(o)
            })
        }

        function n() {
            _ && !Sn && (Sn = t(e.config.request.urls.proxy))
        }

        function i(t) {
            return Sn.then(function(n) {
                var i = a(e.config.request.urls.proxy);
                return n.contentWindow.postMessage(t, i), n
            }).catch(function(t) {
                e.reportError(t, {
                    extra: {
                        proxyUrl: e.config.request.urls.proxy
                    }
                })
            })
        }

        function r(t) {
            e.config.embed.on_site && window.postMessage(t, window.location.origin)
        }

        function o(t, n) {
            if (Sn) {
                var o = {
                    method: "set",
                    key: "sync_" + t,
                    val: n,
                    session: e.config.request.session
                };
                return i(o), void r(o)
            }
            try {
                window.localStorage.setItem("sync_" + t, JSON.stringify(n))
            } catch (e) {}
        }

        function s(t, n) {
            kn.indexOf(t) >= 0 && (e.config.request.cookie[t] = n);
            var i = [];
            kn.indexOf(t) >= 0 && null !== n && i.push(t + "=" + n);
            var r = c(kn);
            for (var o in r) o in r && null !== r[o] && o !== t && i.push(o + "=" + r[o]);
            ke("player", '"' + i.join("&") + '"', e.config.request.cookie_domain)
        }

        function c(e) {
            var t = null;
            try {
                t = we("player")
            } catch (e) {}
            if (!t) return null;
            t = t.substring(1, t.length - 1);
            var n = {};
            t.split("&").forEach(function(e) {
                e = e.split("="), n[e[0]] = be(decodeURIComponent(e[1] || ""))
            });
            var i = [].concat(e),
                r = i.reduce(function(e, t) {
                    if (t in n) {
                        var i = parseFloat(n[t]);
                        return e[t] = isNaN(i) || "quality" === t ? n[t] : i, e
                    }
                    return e[t] = null, e
                }, {});
            return 1 === i.length ? r[e] : r
        }

        function u(e, t) {
            t = be(t), o(e, t), s(e, t)
        }

        function d(t, n) {
            var i = !0;
            switch (t) {
                case "sync_quality":
                    e.events.fire(pt.changeQuality, n, i);
                    break;
                case "sync_volume":
                    e.events.fire(pt.changeVolume, n, i);
                    break;
                case "sync_captions":
                    if (null === n) {
                        e.events.fire(pt.turnCaptionsOff, i);
                        break
                    }
                    e.events.fire(pt.turnCaptionsOn, n, i);
                    break;
                case "sync_login":
                    l(n);
                    break;
                case "sync_active":
                    null !== n && n !== e.config.request.session && e.config.embed.autopause && e.events.fire(mt.becameInactive)
            }
        }

        function l(t) {
            b > 4 || (b++, t && !e.config.user.logged_in ? e.events.fire(mt.userLogIn) : !t && e.config.user.logged_in && e.events.fire(mt.userLoggedOut))
        }

        function f() {
            u("login", !!e.config.user.logged_in)
        }

        function h() {
            e.events.on(mt.qualityChanged, function(e, t) {
                t || u("quality", e)
            })
        }

        function v() {
            e.events.on(mt.volumeChanged, function(t, n) {
                e.config.request.cookie.volume = be(t), n || u("volume", t)
            })
        }

        function p() {
            e.events.on(mt.captionsChanged, function(t, n) {
                if (t) {
                    var i = t.language + "." + t.kind;
                    return e.config.request.cookie.captions = be(i), void(n || u("captions", i))
                }
                e.config.request.cookie.captions = null, n || u("captions", null)
            })
        }

        function m() {
            e.events.on(mt.playButtonPressed, function() {
                e.config.embed.settings.background || (u("active", e.config.request.session), e.events.fire(mt.becameActive))
            }), e.events.on([mt.pauseButtonPressed, mt.ended], function() {
                c("active") === e.config.request.session && u("active", null)
            })
        }

        function g() {
            e.events.on(mt.userLoggedIn, function() {
                u("login", !0)
            })
        }

        function y() {
            return _ ? void window.addEventListener("message", function(t) {
                var n = a(e.config.request.urls.proxy);
                t.origin === n && "object" === gt(t.data) && "key" in t.data && "newValue" in t.data ? d(t.data.key, t.data.newValue) : t.origin === window.location.origin && t.data.session !== e.config.request.session && d(t.data.key, t.data.val)
            }, !1) : void window.addEventListener("storage", function(t) {
                if (0 === t.key.indexOf("sync_") && t.oldValue !== t.newValue && window.localStorage.getItem(t.key) === t.newValue) try {
                    d(t.key, JSON.parse(t.newValue))
                } catch (n) {
                    e.reportError(n, {
                        extra: {
                            key: t.key,
                            oldValue: t.oldValue,
                            newValue: t.newValue
                        }
                    })
                }
            }, !1)
        }
        var _ = 0 !== e.config.request.urls.proxy.indexOf(window.location.origin),
            b = 0;
        return h(), v(), p(), m(), g(), n(), y(), {
            reset: f
        }
    }

    function xe(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = {
                feature: t,
                $deeplink_path: Tn + e,
                $always_deeplink: !0,
                ref: "player",
                context: "player"
            },
            i = "",
            r = [];
        for (var o in n) r.push(encodeURIComponent(o) + "=" + encodeURIComponent(n[o]));
        return i = r.join("&"), "https://bnc.lt/a/" + En + "?" + i
    }

    function Te(e, t) {
        return xe("videos/" + e, t)
    }

    function Ee(e) {
        e = e || {};
        var t = {};
        return e.on = function(n, i) {
            n = [].concat(n);
            for (var r = 0, o = n.length; r < o; r++) {
                var a = n[r];
                if (!a) throw new Error("Tried to listen for an undefined event.");
                t[a] || (t[a] = []), t[a].push(i)
            }
            return e
        }, e.once = function(t, n) {
            function i() {
                n.apply(e.off(t, i), arguments)
            }
            return i.handler = n, e.on(t, i)
        }, e.off = function(n, i) {
            n = [].concat(n);
            for (var r = 0, o = n.length; r < o; r++) {
                var a = n[r];
                if (!a) throw new Error("Tried to remove an undefined event.");
                if (a in t) {
                    var s = t[a].indexOf(i);
                    if (s === -1) {
                        for (var c = 0, u = t[a].length; c < u; c++)
                            if (t[a][c].handler === i) {
                                s = r;
                                break
                            }
                        if (s === -1) return e
                    }
                    t[a].splice(s, 1)
                }
            }
            return e
        }, e.fire = function(n) {
            if (!n) throw new Error("Tried to fire an undefined event.");
            if (n in t)
                for (var i = t[n].slice(0), r = 0, o = i.length; r < o; r++) i[r].apply(e, i.slice.call(arguments, 1));
            return e
        }, e
    }

    function Le(e, t, n) {
        var i = void 0;
        try {
            document.removeChild({})
        } catch (r) {
            i = Object.create(Object.getPrototypeOf(r), {
                name: {
                    value: t,
                    configurable: !0,
                    writable: !0
                },
                code: {
                    value: e,
                    configurable: !0,
                    writable: !0
                },
                message: {
                    value: n,
                    configurable: !0,
                    writable: !0
                },
                toString: {
                    value: function() {
                        return t + ": DOM Exception " + e
                    },
                    configurable: !0,
                    writable: !0
                }
            })
        }
        return Object.freeze(i)
    }

    function Pe(e, t) {
        var n, i = 0;
        return n = {}, vi(n, ui.iterator, function() {
            return this
        }), vi(n, "next", function() {
            if (i < e.length) {
                var n = t ? [e[i], t[i++]] : e[i++];
                return {
                    done: !1,
                    value: n
                }
            }
            return {
                done: !0
            }
        }), n
    }

    function Ce() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return e.getFileById = Li, e
    }

    function Ae() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return e.item = function(e) {
            return this[e]
        }, e.getTrackById = Li, e
    }

    function Oe(e, t) {
        for (var n = e, i = Array.isArray(n), r = 0, n = i ? n : n[ui.iterator]();;) {
            var o;
            if (i) {
                if (r >= n.length) break;
                o = n[r++]
            } else {
                if (r = n.next(), r.done) break;
                o = r.value
            }
            var a = o,
                s = _i(a, 2),
                c = s[0],
                u = s[1];
            if (c <= t && u >= t) return [c, u]
        }
        return []
    }

    function Me() {
        return "undefined" != typeof window.performance && "function" == typeof window.performance.now ? window.performance.now() : Date.now()
    }

    function Fe() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(e) {
            return (e ^ (16 * Math.random() >> e) / 4).toString(16)
        })
    }

    function Ie(e) {
        for (var t = window.atob(e), n = t.length, i = new Uint8Array(n), r = 0; r < n; r++) i[r] = t.charCodeAt(r);
        return i
    }

    function qe(e) {
        return Ie(e).buffer
    }

    function Re(e) {
        for (var t = new ArrayBuffer(2 * e.length), n = new Uint16Array(t), i = 0, r = e.length; i < r; i++) n[i] = e.charCodeAt(i);
        return n
    }

    function Be(e) {
        return setTimeout(e, 0)
    }

    function De(e, t, n, i) {
        var r = 0,
            o = 0,
            a = 0,
            s = 0,
            c = e,
            u = t,
            d = n / i,
            l = c / u;
        return l >= d ? (o = u, r = (d * u).toFixed(2)) : (r = c, o = (c / d).toFixed(2)), a = Math.max((c - r) / 2, 0), s = Math.max((u - o) / 2, 0), {
            width: r,
            height: o,
            left: a,
            top: s
        }
    }

    function Ne() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return Object.freeze(vi({
            get length() {
                return e.length
            },
            start: function(t) {
                return Pi(e, t)
            },
            end: function(e) {
                return Pi(t, e)
            }
        }, ui.iterator, function() {
            return Pe(e, t)
        }))
    }

    function je(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if (0 === e.length) return 0;
        for (var n = 0, i = 0, r = 0; r < e.length; r++) {
            var o = t[r] || 1;
            i += o, n += e[r] * o
        }
        return n / i
    }

    function Ve(e, t) {
        if (e.sort(), 0 === e.length) return 0;
        if (t <= 0) return e[0];
        if (t >= 1) return e[e.length - 1];
        var n = e.length * t,
            i = Math.floor(n),
            r = i + 1,
            o = n % 1;
        return r >= e.length ? e[i] : e[i] * (1 - o) + e[r] * o
    }

    function He(e) {
        e.sort(function(e, t) {
            return e - t
        });
        var t = Math.floor(e.length / 2);
        return e.length % 2 ? e[t] : (e[t - 1] + e[t]) / 2
    }

    function Ue(e) {
        e = e || {};
        var t = {};
        return e.on = function(n, i) {
            n = [].concat(n);
            for (var r = 0, o = n.length; r < o; r++) {
                var a = n[r];
                if (!a) throw new Error("Tried to listen for an undefined event.");
                t[a] || (t[a] = []), t[a].push(i)
            }
            return e
        }, e.once = function(t, n) {
            function i() {
                n.apply(e.off(t, i), arguments)
            }
            return i.handler = n, e.on(t, i)
        }, e.off = function(n, i) {
            n = [].concat(n);
            for (var r = 0, o = n.length; r < o; r++) {
                var a = n[r];
                if (!a) throw new Error("Tried to remove an undefined event.");
                if (a in t) {
                    var s = t[a].indexOf(i);
                    if (s === -1) {
                        for (var c = 0, u = t[a].length; c < u; c++)
                            if (t[a][c].handler === i) {
                                s = r;
                                break
                            }
                        if (s === -1) return e
                    }
                    t[a].splice(s, 1)
                }
            }
            return e
        }, e.fire = function(n) {
            if (!n) throw new Error("Tried to fire an undefined event.");
            if (n in t)
                for (var i = t[n].slice(0), r = 0, o = i.length; r < o; r++) i[r].apply(e, i.slice.call(arguments, 1));
            return e
        }, e
    }

    function ze(e, t) {
        function n() {
            e.events.fire(mt.bufferStarted, {
                initial: !0
            }), le = !0, ue = !0
        }

        function i() {
            ue && (e.events.fire(mt.bufferEnded), le = !1, ue = !1)
        }

        function r(t) {
            $.classList.remove("invisible"),
                K.style.backgroundImage = "none", e.events.fire(mt.playInitiated), n()
        }

        function a() {
            var t = "disable" !== e.config.video.privacy && e.config.video.spatial && Nt.iOS && !Oe;
            if (t || $.classList.remove("invisible"), ke) return e.events.fire(mt.error, ke), void l();
            if (te = !0, ne = !0, Y.off("play", r), !oe) {
                if (e.config.video.spatial && Nt.iOS && !Oe) return Oe = !0, e.events.fire(pt.showOverlay, "app-redirect", {
                    redirectUrl: e.doNotTrackEnabled ? "https://itunes.apple.com/us/app/apple-store/id425194759?mt=8" : Te(e.config.video.id, "player-spatial-redirect"),
                    title: null,
                    buttonText: "Watch in the Vimeo app",
                    ignoreText: null,
                    bottomText: "360 not supported in this browser",
                    newWindow: !e.config.embed.on_site
                }), void Y.once("play", r);
                e.events.fire(mt.playInitiated), n(), oe = !0, Y.play(), !e.config.user.progress || J || !e.config.embed.settings.playbar || e.config.embed.autoplay || e.config.embed.time || (Y.currentTime = e.config.user.progress, e.config.user.progress = 0)
            }
            "android_inline" in e.config.request.flags && Nt.mobileAndroid && (Z = !e.config.request.flags.android_inline), Z && (xe = !0, e.events.fire(pt.forceFullscreen)), be && s()
        }

        function s() {
            ye || Se || (le = !1, _e = !1, ne && Y.paused && (X && (Y.currentTime = X, X = null), Y.play()))
        }

        function u(e, t) {
            var n = e.length - 1;
            if (e.length > 1)
                for (var i = 0, r = e.length; i < r; i++)
                    if (e.start(i) <= t && e.end(i) >= t) {
                        n = i;
                        break
                    }
            return n
        }

        function d(t) {
            if (!we && Y.buffered && Y.buffered.length > 0) {
                t = t || Y.currentTime;
                var n = u(Y.buffered, t),
                    i = Y.buffered.end(n),
                    r = i / Y.duration;
                if (e.events.fire(mt.loadProgress, i, Y.duration, r), ue && ne && i === Y.duration) return void s()
            }
        }

        function l() {
            K.style.backgroundImage = "url(" + K.getAttribute("data-thumb") + ")"
        }

        function f(t) {
            for (var n = t.target, i = n.activeCues, r = [], o = void 0, a = 0, s = i.length; a < s; a++) "" !== i[a].text.replace(/^\s+|\s+$/gm, "") && (o = document.createElement("span"), o.appendChild(i[a].getCueAsHTML()), r.push({
                html: o.innerHTML.replace("\n", "<br>"),
                text: i[a].text
            }));
            e.events.fire(mt.cueChanged, n, r)
        }

        function h() {
            var t = void 0;
            e.config.request.ab_tests && e.config.request.ab_tests.preload_segment && (t = e.config.request.ab_tests.preload_segment.data.max_preload_stream_index);
            var n = [pr, $i, yr];
            Y = new Pr($, n, {
                externalDisplays: [AirPlayExternalDisplay],
                swfScanner: {
                    swfUrl: e.config.request.urls.flideo
                },
                mediaSourceScanner: {
                    maxPreloadStreamIndex: t
                },
                tests: e.config.request.ab_tests
            }), Ai.forEach(function(t) {
                "timeupdate" !== t && "progress" !== t && "suspend" !== t && "error" !== t && Y.on(t, function() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.addBreadcrumb(t, n, "video event")
                })
            }), Y.on("scannerchange", function() {
                v(), setTimeout(function() {
                    e.events.fire(Y.supportsSettingVolume ? pt.enableVolume : pt.disableVolume), e.events.fire(Y.supportsTextTracks ? pt.enableCaptions : pt.disableCaptions)
                }, 0), e.addBreadcrumb("Scanner changed to " + Y.currentScanner, {}, "video")
            }), Y.on("currentfilechange", function(t) {
                e.addBreadcrumb("Current file changed", {
                    id: t.id,
                    mime: t.mime,
                    src: t.src,
                    metadata: t.metadata
                }, "video"), t.mime === ht.hls && e.events.fire(pt.disableHd);
                var n = t.metadata.quality;
                if (t.mime === ht.dash) {
                    var i = e.config.request.files.dash.streams.map(function(e) {
                        return e.quality
                    });
                    n = C(e.config.embed.quality, i) || "auto", A(n)
                }
                e.events.fire(mt.qualityChanged, n, !0)
            }), Y.on("streamchange", function(t) {
                var n = t.index,
                    i = t.streams,
                    r = e.config.request.files.dash.streams[n];
                e.addBreadcrumb("Stream changed", r, "video"), e.events.fire(mt.streamChanged, r, n, i)
            }), Y.on("streambufferstart", function(t) {
                var n = t.hasLowerStreamIndex;
                e.addBreadcrumb("Started buffering", {
                    hasLowerStreamIndex: n
                }, "video"), e.events.fire(mt.ranIntoBuffer, n)
            }), Y.on("streambufferend", function() {
                e.addBreadcrumb("Stopped buffering", {}, "video"), e.events.fire(mt.playbackResumed)
            }), Y.on("bandwidth", function(t) {
                e.events.fire(mt.adaptiveBandwidth, t)
            }), Y.on("alert", function(t) {
                var n = void 0;
                switch (t) {
                    case "streamstudder":
                        if (Ce) return;
                        n = At.render("stream_studder")
                }
                Q.message = n, Q.show(), e.addBreadcrumb("Alert shown", {
                    message: n
                }, "video")
            }), Y.on("cuepoint", function(t) {
                e.events.fire(mt.cuepoint, t)
            }), Y.on("motionstart", function() {
                e.events.fire(mt.spatialMotionStart)
            }), Y.on("motionend", function() {
                e.events.fire(mt.spatialMotionEnd)
            }), Y.on("droppedframes", function(t) {
                e.events.fire(mt.droppedFrames, t)
            })
        }

        function v() {
            var t = "none";
            ("metadata" === e.config.request.flags.preload_video || Z || Nt.iOS >= 8) && (t = "metadata"), "auto" === e.config.request.flags.preload_video && (t = "metadata", "MediaSourceScanner" === Y.currentScanner && (t = "auto")), Y.preload = t, e.events.on(mt.mousedOver, function() {
                "metadata_on_hover" !== e.config.request.flags.preload_video || oe || e.verifyConfig().then(function() {
                    return Y.preload = "metadata", !0
                }).catch(function(e) {})
            })
        }

        function p() {
            Y.on("loadedmetadata", function(t) {
                be = !0;
                var n = Y.duration;
                isFinite(n) && n > 0 && (e.config.video.duration = n), e.config.video.video_width = Y.videoWidth, e.config.video.video_height = Y.videoHeight
            }), Y.on("loadeddata", function() {
                0 === Y.currentTime && Y.paused && i()
            }), Y.on("durationchange", function(t) {
                var n = Y.duration;
                isFinite(n) && (e.config.video.duration > 0 && (n < e.config.video.duration - 1 || n > e.config.video.duration + 1) || (e.config.video.duration = n))
            }), Y.on("waiting", function() {
                me || n()
            }), Y.on("canplay", function() {
                se = !0, i(), (e.config.embed.autoplay || ne || te && !oe && ae) && s()
            }), Y.on("canplaythrough", function() {
                ce = !0, i(), !te || oe || ae || s(), (le || ne && Y.paused) && s()
            }), Y.on("progress", function(e) {
                d()
            })
        }

        function m() {
            e.events.on(mt.playInitiated, function() {
                t.classList.remove("invisible")
            }).on(mt.playButtonPressed, a).on(mt.pauseButtonPressed, function() {
                ne = !1, Y.pause()
            }).on(mt.becameInactive, function() {
                window.location.search.indexOf("autopause=0") < 0 && !Y.paused && !e.config.embed.settings.background && (ne = !1, e.events.fire(mt.pauseButtonPressed))
            }), Y.on("play", function(t) {
                return we = !1, oe || (!ae || se) && (ae || ce) ? ($.classList.remove("invisible"), void e.events.fire(mt.played, Y.currentTime)) : (e.events.fire(mt.playInitiated), oe = !0, te = !0, void(ne = !0))
            }), Y.on("pause", function(t) {
                !oe || le || ye || _e || e.events.fire(mt.paused, Y.currentTime, Y.ended)
            }), Y.on("playing", function(t) {
                oe || (e.events.fire(mt.playInitiated), oe = !0), d(), ve = !0
            }), Y.on("timeupdate", function(t) {
                var r = Y.currentTime;
                if (ve && ue && r > 0 && (ve = !1, i()), Y.buffered.length > 0 && !ue) {
                    var o = u(Y.buffered, r),
                        a = Y.buffered.end(o);
                    if (!xe && r > 0 && r < Y.duration && a === r) return void n()
                }
                if (!we) {
                    var s = Y.duration,
                        c = r / s;
                    e.events.fire(mt.playProgress, r, s, c), X && r > X && (X = null)
                }
                G && (G.classList.add("hidden"), G = null)
            }), Y.on("ended", function(t) {
                ye || (e.config.embed.loop ? Y.play() : (xe && e.events.fire(mt.fullscreenButtonPressed), e.events.fire(mt.ended, t), ne = !1, te = !1))
            }), Y.on("drmauthsuccess", function(e) {
                ie = !0
            }), e.events.on(mt.playInitiated, function() {
                Y.once("timeupdate", function() {
                    return e.events.fire(mt.firstTimeUpdate)
                })
            })
        }

        function g() {
            Q = new xn(t.parentElement), Q.on("show", function(t) {
                e.events.fire(mt.alertVisibilityChanged, !0, t)
            }), Q.on("hide", function(t) {
                var n = t.target,
                    i = n && "function" == typeof n.getAttribute;
                if (i) switch (n.getAttribute("data-context")) {
                    case "suggestion":
                        e.events.fire(pt.changeQuality, "auto"), t = "suggestion";
                        break;
                    default:
                        t = "close"
                }(i || "qualitymenuauto" === t) && (Ce = !0), e.events.fire(mt.alertVisibilityChanged, !1, t)
            })
        }

        function y() {
            var t = !1;
            O(function() {
                t = !0
            }), Y.on("error", function(n) {
                if (!t) switch (e.addBreadcrumb(n.name, {
                    message: n.message
                }, "telecine error", "error"), n.name) {
                    case "BrowserNotSupported":
                        e.events.fire(mt.error, "not-supported"), ke = "not-supported";
                        break;
                    case "DRMFailure":
                        e.events.fire(mt.error, "drm-failure", function(t) {
                            var n = "Unable to play video.",
                                i = "Please try again.",
                                r = e.config.request.dynamic_drm_translation_map,
                                o = t.message.code;
                            return r && o && r[o] && (n = r[o].title, i = r[o].msg), e.addBreadcrumb("DRM failure", t, "video"), {
                                title: n,
                                message: i
                            }
                        }(n));
                        break;
                    case "FilesNotPlayable":
                        e.events.fire(mt.error, "not-supported"), ke = "not-supported";
                        break;
                    case "TextTracksNotSupported":
                        e.events.fire(pt.disableCaptions);
                        break;
                    case "MediaSrcNotSupportedError":
                        e.events.fire(mt.error, "not-supported", {
                            final: !1
                        });
                        break;
                    case "MediaDecodeError":
                        e.events.fire(mt.error, "decode", {
                            final: !1
                        });
                        break;
                    case "MediaNetworkError":
                        e.events.fire(mt.error, "network");
                        break;
                    case "MediaUnknownError":
                        e.events.fire(mt.error, "unknown");
                        break;
                    case "FileError":
                        e.events.fire(mt.error, "telecine-file-error", {
                            final: !1
                        });
                        break;
                    case "DownloadError":
                        e.events.fire(mt.error, "telecine-download-error", {
                            final: !1
                        });
                        break;
                    case "ScannerError":
                        e.events.fire(mt.error, "scanner-error", {
                            final: !1
                        })
                }
            })
        }

        function _() {
            e.events.on(pt.changeLoop, function(t) {
                e.config.embed.loop = !!t, Y.loop = !!t
            }), e.events.fire(pt.changeLoop, e.config.embed.loop)
        }

        function b() {
            e.events.on(mt.scrubbingStarted, function() {
                n(), ne = !Y.paused, ye = !0, Y.pause()
            }), e.events.on(mt.scrubbingEnded, function(e) {
                ye = !1, e || s()
            }), e.events.on(pt.seek, function(t, n) {
                n || (n = (Y.duration || e.config.video.duration) * c(t, 0, 1)), n = c(n, 0, Y.duration || e.config.video.duration), oe || (e.events.fire(mt.playButtonPressed), oe = !0, te = !0, ne = !0), Y.currentTime = n
            }), Y.on("seeking", function() {
                me = !0
            }, !1), Y.on("seeked", function() {
                d();
                var t = Y.currentTime,
                    n = Y.duration;
                e.events.fire(mt.seeked, t, n, t / n), me = !1
            }, !1)
        }

        function w() {
            e.events.on(pt.changeVolume, function(t, n, i) {
                i && (t += Y.volume), Y.volume = c(t, 0, 1), e.events.fire(mt.volumeChanged, c(t, 0, 1), n)
            });
            var t = e.config.request.cookie.volume;
            e.config.embed.mute && (t = 0), e.events.fire(pt.changeVolume, t, !0)
        }

        function k() {
            e.events.on(pt.changeQuality, function(t, n) {
                if (Y.video.currentFile.mime === ht.dash) n = !0, A(t);
                else {
                    var i = wn(e.telecine.video.files).filter(function(e) {
                        return parseInt(e.metadata.quality, 10) <= parseInt(t, 10)
                    });
                    i.sort(pe()), i.length > 0 && (we = !0, Y.video.currentFile = i[0])
                }
                "auto" === t && Q.hide("qualitymenuauto"), e.events.fire(mt.qualityChanged, t, n)
            })
        }

        function S() {
            e.events.on(mt.overlayOpened, function() {
                Se = !0, oe && !Le && (ne = !Y.paused, Y.pause(), e.events.fire(mt.paused, Y.currentTime))
            }), e.events.on(mt.overlayClosed, function() {
                Se = !1, ne && !Le && (xe || Ee || !Z || e.events.fire(pt.forceFullscreen), s())
            })
        }

        function x() {
            e.events.on(mt.popupOpened, function(e) {
                oe && !Le && (ne = !Y.paused, Y.pause())
            }), e.events.on(mt.popupClosed, function(e) {
                Le || s()
            })
        }

        function T() {
            e.events.on(mt.didEnterFullscreen, function(t, n) {
                $.classList.remove("hide-webkit-controls"), t && (Ee = !0), t || (oe || Nt.browser.safari || (Y.poster = K.getAttribute("data-thumb")), xe = !0, setTimeout(function() {
                    Y.video.textTracks.forEach(function(e) {
                        "hidden" === e.mode && (e.mode = "showing")
                    })
                }, 500)), n || !Nt.windowsPhone || Nt.browser.edge || e.events.fire(pt.toggleNativeControls, !0)
            }), e.events.on(mt.didExitFullscreen, function(e) {
                Y.poster = "", e || Y.pause(), oe || $.classList.add("invisible"), xe = !1, Ee = !1, ee && $.classList.add("hide-webkit-controls"), Y.video.textTracks.forEach(function(e) {
                    "showing" === e.mode && (e.mode = "hidden")
                })
            }), e.events.on(mt.playInitiated, function() {
                Y.poster = ""
            })
        }

        function E() {
            e.events.on(pt.toggleNativeControls, function(e) {
                return e ? (Y.controls = !0, void t.classList.add("native-controls")) : (Y.controls = !1, void t.classList.remove("native-controls"))
            })
        }

        function L() {
            e.events.on(mt.signatureExpired, function() {
                X = Y.currentTime
            }), e.events.on(mt.requestConfigReloaded, function(e) {
                q()
            }), e.events.on(mt.configChanged, function(e) {
                q(), V()
            })
        }

        function P() {
            kt($).on("transitionend", function(e) {
                "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && $.classList.remove("transition")
            }, !1), e.events.on(pt.reset, function(t) {
                we = !0, Y.paused || (Y.pause(), e.events.fire(mt.paused, Y.currentTime)), l(), $.classList.add("transition"), $.classList.add("invisible"), t && (be = !1), oe = !1, ne = !1, ke = null, setTimeout(function() {
                    Y.currentTime = 0
                }, 300)
            })
        }

        function C(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return e.config.embed.on_site || Nt.android || Nt.iOS || Nt.windowsPhone || e.config.video.vod || !t ? null : n.length && n.indexOf(t) === -1 ? null : (e.events.fire(mt.forcedQuality, t), t)
        }

        function A(t) {
            if ("auto" === t) return Y.video.currentFile.restrictedStreamIndexes = [], void(Ae = !1);
            var n = e.config.request.files.dash.streams.map(function(e) {
                return e.quality
            }).indexOf(t);
            n !== -1 && (e.addBreadcrumb("Switched to " + t, {}, "video"), Y.video.currentFile.restrictedStreamIndexes = [n], Ae = n)
        }

        function M() {
            var t = e.config.request.files,
                n = wn(t.progressive).filter(he(t.progressive)),
                i = n.some(fe);
            Nt.mobileAndroid && (i = !1);
            var r = "720p";
            if (i) {
                var o = wn(n).map(de);
                o.indexOf("1080p") !== -1 && o.indexOf("720p") === -1 && (r = "1080p")
            }
            var a = e.config.request.cookie.hd || e.config.video.default_to_hd ? r : "360p",
                s = n.map(function(e) {
                    return e.quality
                }),
                c = C(e.config.embed.quality, s),
                u = e.config.request.cookie.quality || c || a,
                d = ge({
                    files: t.progressive,
                    preference: u,
                    priorityOffset: 2
                }),
                l = e.config.request.drm && Nt.browser.safari;
            if (t.hls && (Nt.iPhone || Nt.iPad) || l) {
                var f = t.hls.default_cdn,
                    h = t.hls.cdns[f].url;
                d.push({
                    id: "hls-" + f + "-" + e.config.video.id,
                    src: h,
                    mime: ht.hls,
                    priority: 2,
                    metadata: {
                        cdn: f,
                        origin: t.hls.cdns[f].origin,
                        quality: "sd"
                    }
                })
            }
            var v = !1;
            if (t.dash && !l) {
                for (var p in t.dash.cdns) d.push({
                    id: "dash-" + p + "-" + e.config.video.id,
                    src: t.dash.cdns[p].url,
                    mime: ht.dash,
                    priority: p === t.dash.default_cdn ? 1 : 2,
                    metadata: {
                        cdn: p,
                        origin: t.dash.cdns[p].origin,
                        quality: "sd"
                    }
                });
                v = t.dash.streams.some(fe)
            }
            return i || v || e.events.fire(pt.disableHd), d
        }

        function F() {
            return "text_tracks" in e.config.request ? e.config.request.text_tracks.map(function(e) {
                return {
                    id: e.id,
                    src: e.url,
                    kind: e.kind,
                    label: e.label,
                    language: e.lang
                }
            }) : []
        }

        function I() {
            var t = e.config.request.files,
                n = t.hls.default_cdn;
            if (t.hls) {
                var i = t.hls.cdns[n].url;
                return t.hls.cdns[n].captions && (i = t.hls.cdns[n].captions), {
                    src: i,
                    mime: ht.hls,
                    metadata: {
                        cdn: e.config.request.files.hls.cdn,
                        origin: e.config.request.files.hls.origin,
                        quality: "sd"
                    }
                }
            }
            return null
        }

        function q() {
            Oe = !1;
            var t = M(),
                n = F();
            if (Y.video && Y.video.id === "" + e.config.video.id) return t.forEach(function(e) {
                var t = Y.video.files.getFileById(e.id);
                t && (t.src = e.src)
            }), void n.forEach(function(e) {
                var t = Y.video.textTracks.getTrackById(e.id);
                t && (t.src = e.src)
            });
            var i = o(K);
            if (Y.video = {
                    id: e.config.video.id,
                    title: e.config.video.title,
                    subtitle: "from " + e.config.video.owner.name,
                    files: t,
                    textTracks: n,
                    externalDisplayFiles: {
                        AirPlay: I()
                    },
                    metadata: {
                        thumbnail: e.config.video.thumbs[640],
                        useHls: e.config.request.drm && Nt.browser.safari,
                        drm: e.config.request.drm,
                        percentShown: qr.frustumSurfaceArea(e.config.video.spatial.fov, i.width, i.height)
                    }
                }, 0 === n.length) {
                var r = !0;
                return void e.events.fire(pt.turnCaptionsOff, r)
            }
            if (Y.video.textTracks.forEach(function(t) {
                    t.on("cuechange", f), t.on("modechange", function(n) {
                        xe && "showing" === t.mode && e.events.fire(mt.captionsChanged, t)
                    })
                }), null !== e.config.request.cookie.captions && "null" !== e.config.request.cookie.captions) {
                var a = !0;
                return void e.events.fire(pt.turnCaptionsOn, e.config.request.cookie.captions, a)
            }
            if (e.config.video.lang) {
                var s = e.config.request.lang.split(/[-_]/),
                    c = bt(s, 1),
                    u = c[0],
                    d = e.config.video.lang.split(/[-_]/),
                    l = bt(d, 1),
                    h = l[0];
                if (u !== h) {
                    var v = e.config.request.lang + ".subtitles",
                        p = re(v, Y.video.textTracks),
                        m = p.track;
                    if (m) {
                        var g = !0;
                        return void e.events.fire(pt.turnCaptionsOn, v, g)
                    }
                }
            }
            e.events.fire(pt.turnCaptionsOff)
        }

        function R(e, t, n, i) {
            if (ie) {
                var r = new XMLHttpRequest;
                r.open("DELETE", e + "/plays/" + t + "/" + n + "?token=" + i, !1), r.send(), ie = !1
            }
        }

        function B() {
            e.config.embed.time > 0 && (Y.currentTime = e.config.embed.time, e.config.embed.time = 0)
        }

        function D() {
            e.events.on(pt.turnCaptionsOn, function(t, n) {
                if (!Pe || Pe.id !== t) {
                    var i = Y.video.textTracks.getTrackById(t),
                        r = !0;
                    if (!i) {
                        var o = re(t, Y.video.textTracks);
                        i = o.track, r = o.exactMatch
                    }
                    i !== Pe && setTimeout(function() {
                        Y.video.textTracks.forEach(function(e) {
                            e.mode = e === i ? "hidden" : "disabled"
                        }), e.events.fire(mt.captionsChanged, i, n || !r), Pe = i
                    }, 0)
                }
            }).on(pt.turnCaptionsOff, function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                setTimeout(function() {
                    Y.video.textTracks.forEach(function(e) {
                        e.mode = "disabled"
                    }), e.events.fire(mt.cueChanged), Pe && (Pe = null, e.events.fire(mt.captionsChanged, null, t))
                }, 0)
            })
        }

        function N() {
            Y.on("externaldisplayavailable", function(t) {
                var n = t.type;
                if (!e.config.request.drm) switch (n) {
                    case "AirPlay":
                        e.events.fire(mt.airPlayAvailable)
                }
            }), Y.on("externaldisplayunavailable", function(t) {
                var n = t.type;
                if (!e.config.request.drm) switch (n) {
                    case "AirPlay":
                        e.events.fire(mt.airPlayNotAvailable)
                }
            }), Y.on("externaldisplayactivated", function(t) {
                var n = t.type;
                switch (Le = !0, n) {
                    case "AirPlay":
                        e.events.fire(mt.airPlayActivated)
                }
            }), Y.on("externaldisplaydeactivated", function(t) {
                var n = t.type;
                switch (Le = !1, n) {
                    case "AirPlay":
                        e.events.fire(mt.airPlayDeactivated)
                }
            }), e.events.on(mt.airPlayButtonPressed, function() {
                Y.showExternalDisplayPicker("AirPlay")
            })
        }

        function j() {
            function t() {
                return Y.supportsPresentationMode("picture-in-picture") ? void e.events.fire(mt.pictureInPictureAvailable) : void e.events.fire(mt.pictureInPictureNotAvailable)
            }
            var n = Y.presentationMode;
            Y.on("play", function() {
                return be ? void t() : void Y.once("loadedmetadata", t)
            }), Y.on("presentationmodechange", function(t) {
                "inline" === n && "picture-in-picture" === t && e.events.fire(mt.pictureInPictureActivated), "picture-in-picture" === n && "inline" === t && e.events.fire(mt.pictureInPictureDeactivated), n = t, Y.video.textTracks.forEach(function(e) {
                    "picture-in-picture" === t && "hidden" === e.mode && (e.mode = "showing"), "inline" === t && "showing" === e.mode && (e.mode = "hidden")
                })
            }), e.events.on(pt.activatePictureInPicture, function() {
                Y.supportsPresentationMode("picture-in-picture") && (Y.presentationMode = "picture-in-picture")
            }), e.events.on(pt.deactivatePictureInPicture, function() {
                Y.supportsPresentationMode("picture-in-picture") && (Y.presentationMode = "inline")
            })
        }

        function V() {
            e.config.embed.autoplay && (te = !0, e.events.fire(mt.playButtonPressed))
        }

        function H() {
            e.events.on(mt.enteredTinyMode, function() {
                J = !0
            }).on([mt.enteredMiniMode, mt.enteredNormalMode], function() {
                J = !1
            })
        }

        function U() {
            var t = 0,
                n = null,
                i = function() {
                    n || (n = e.config.embed.color), e.events.fire(pt.changeColor, "#46d439")
                },
                r = function() {
                    n && (e.events.fire(pt.changeColor, n), n = null)
                };
            e.events.on(pt.setEffect, function(n) {
                if (Y.deactivateEffects(), "ascii" === n || "ascii-color" === n) {
                    if (Y.supportsEffect(mr)) {
                        Y.activateEffect(mr, {
                            color: "ascii-color" === n,
                            fps: t || Y.video.currentFile.metadata.fps
                        });
                        try {
                            var o = e.config.request.files.dash.streams;
                            o.sort(pe("asc"));
                            var a = e.config.request.files.dash.streams.indexOf(o[0]);
                            Y.video.currentFile.restrictedStreamIndexes = [a]
                        } catch (e) {}
                        return e.element.setAttribute("data-filter", n), "ascii" === n ? void i() : void r()
                    }
                    return void e.events.fire(pt.setEffect, "none")
                }
                if ("ascii" !== n && "ascii-color" !== n) {
                    var s = [];
                    Ae !== !1 && s.push(Ae), Y.video.currentFile.restrictedStreamIndexes = s
                }
                r(), e.element.setAttribute("data-filter", n)
            }).on(mt.streamChanged, function(e, n, i) {
                t = e.fps
            })
        }

        function z() {
            O(function() {
                var t = e.config.request.drm;
                t && R(t.hoover_url, t.user, t.asset, t.hoover_token)
            }), e.events.on(mt.loadVideo, function() {
                var t = e.config.request.drm;
                t && R(t.hoover_url, t.user, t.asset, t.hoover_token)
            })
        }

        function W() {
            var t = function() {
                    Se || (Q.message = At.render("warning_alert", {
                        strings: {
                            text: 'See a <a href="https://help.vimeo.com/hc/en-us/articles/115001878167#browsers" target="_blank">list of browsers</a> that support 360 viewing.'
                        }
                    }), Q.show())
                },
                n = function() {
                    Se || (Q.message = At.render("warning_alert", {
                        strings: {
                            text: 'Looking to watch a 360 video? See <a href="https://help.vimeo.com/hc/en-us/articles/115001878167#browsers" target="_blank">supported browsers and settings.</a>'
                        }
                    }), Q.show())
                };
            if (!Nt.spatialPlayback) return void e.events.once(mt.firstTimeUpdate, function() {
                e.config.video.spatial && t()
            });
            var i = null,
                r = function() {
                    i && (Y.deactivateEffect(qr), i = null, e.events.fire(pt.toggleSpatialPlayback, i)), e.config.video.spatial && (e.config.request.drm || Y.supportsEffect(qr) && (i = Y.activateEffect(qr, {
                        threeUrl: e.config.request.urls.three_js,
                        fps: e.config.video.fps,
                        fieldOfView: e.config.video.spatial.fov,
                        directorTimeline: e.config.video.spatial.director_timeline,
                        projection: e.config.video.spatial.projection,
                        stereoMode: e.config.video.spatial.stereo_mode,
                        initialView: e.config.video.spatial.initial_view,
                        isMobile: Nt.android,
                        dimensions: e.config.embed.on_site ? {
                            width: 1080,
                            height: 540
                        } : {
                            width: 640,
                            height: 360
                        }
                    }), e.events.fire(pt.toggleSpatialPlayback, i)))
                };
            e.events.fire(pt.attachSpatialPlaybackEvents), r(), e.events.on(mt.configChanged, r), Y.on("seeked", function() {
                return e.events.fire(pt.revealSpatialControls)
            }), Y.on("play", function() {
                return e.events.fire(pt.revealSpatialControls)
            }), Y.on("cameraupdate", function(t) {
                return e.events.fire(mt.cameraUpdate, t)
            }), Y.on("spatialunsupported", function() {
                return i && (Y.deactivateEffect(qr), i = null, e.events.fire(pt.toggleSpatialPlayback, i)), oe ? void n() : void e.events.once(mt.firstTimeUpdate, function() {
                    n()
                })
            })
        }
        var X, K = t.querySelector(".video"),
            $ = t.querySelector(".telecine"),
            Y = null,
            G = null,
            Q = null,
            J = !1,
            Z = Nt.android && !Nt.browser.chrome && !Nt.browser.firefox && !Nt.browser.opera || Nt.windowsPhone || Nt.iOS >= 8 && !Nt.iPad,
            ee = Nt.iOS >= 8 && !Nt.iPad,
            te = !1,
            ne = !1,
            ie = !1,
            oe = !1,
            ae = !0,
            se = !1,
            ce = !1,
            ue = !1,
            le = !1,
            ve = !1,
            me = !1,
            ye = !1,
            _e = !1,
            be = !1,
            we = !0,
            ke = null,
            Se = !1,
            xe = !1,
            Ee = !1,
            Le = !1,
            Pe = null,
            Ce = !1,
            Ae = !1,
            Oe = !1;
        return $.classList.add("invisible"), ee && $.classList.add("hide-webkit-controls"), h(), v(), p(), m(), g(), y(), _(), b(), w(), k(), S(), x(), T(), E(), L(), P(), D(), B(), N(), j(), H(), U(), q(), W(), z(), e.ready().then(function() {
            return setTimeout(function() {
                return V()
            }, 0), null
        }).catch(function(e) {}), e.events.fire(mt.videoModuleReady), {
            telecine: Y
        }
    }

    function We(e) {
        function t() {
            var e = P(m.clientWidth * Nt.devicePixelRatio, m.clientHeight * Nt.devicePixelRatio),
                t = e.width,
                n = e.height,
                i = T.getAttribute("data-thumb-width");
            if (t <= parseInt(i, 10) || 0 === t) return ut.resolve();
            var r = C({
                width: t,
                height: n,
                baseUrl: S.config.video.thumbs.base,
                webpSupport: S.config.request.flags.webp
            });
            if (T.setAttribute("data-thumb", r), T.setAttribute("data-thumb-width", t), S.config.embed.autoplay && "beginning" !== S.config.embed.outro) return ut.resolve();
            var o = A(r).then(function(e) {
                "none" !== T.style.backgroundImage && (T.style.backgroundImage = "url(" + e.src + ")");
                var t = S.config.video.width / S.config.video.height,
                    n = e.width / e.height;
                return (n <= .95 * t || n >= 1.05 * t) && T.classList.remove("cover"), e
            }).catch(function(e) {
                hn.captureException(e, {
                    extra: {
                        thumbnailUrl: r
                    }
                })
            });
            return ut.race([o, new ut(function(e) {
                return setTimeout(e, 2e3)
            })])
        }

        function n() {
            var e = s({
                    width: S.config.video.width,
                    height: S.config.video.height,
                    elementWidth: m.clientWidth,
                    elementHeight: m.clientHeight
                }),
                t = (e.extraWidth, e.extraHeight, e.scaleFactor);
            t > 1 ? (T.classList.add("cover"), E.style.webkitTransform = "scale(" + t + ")", E.style.transform = "scale(" + t + ")") : (T.classList.remove("cover"), E.style.webkitTransform = "", E.style.transform = "")
        }

        function i(e) {
            var t = e.old,
                n = e.loaded;
            if (!t);
            if (window.parent !== window) {
                var i = "Private Video on Vimeo";
                n.view !== dt.main && n.view !== dt.privateUnlocked || (i = n.video.title + " from " + n.video.owner.name + " on Vimeo"), document.title = i, history && history.replaceState && n.video && t && history.replaceState({
                    id: n.video.id
                }, "", "/video/" + n.video.id)
            }
            if (n.view !== dt.main && n.view !== dt.privateUnlocked) throw new Error("Config not authorized: " + n.view);
            t && t.embed && t.embed.color !== n.embed.color && k.fire(pt.changeColor, n.embed.color), N && N.reset(), (Nt.mobileAndroid || Nt.iPhone || Nt.windowsPhone || Nt.browser.bb10 || Nt.iPad || Nt.android) && (n.embed.autoplay = 0);
            var r = !t || !t.video || t.video.id !== n.video.id;
            return r && T.removeAttribute("data-thumb-width"), F = null, k.fire(pt.reset), k.fire(mt.configChanged, r), e
        }

        function r() {
            window.requestAnimationFrame(function() {
                m.classList.remove("loading"), j()
            })
        }

        function o(e) {
            return w.then(function() {
                if (v(e), T.setAttribute("data-thumb", ""), T.setAttribute("data-thumb-width", ""), T.style.backgroundImage = "", "function" != typeof B.authorizationHandler) throw new Error("Config was not authorized.");
                return B.authorizationHandler(r)
            }).then(function(e) {
                S.config = e;
                var t = !0;
                return F = null, k.fire(pt.reset), k.fire(mt.configChanged, t), e
            })
        }

        function a() {
            var e = document.location.hash,
                t = f(e);
            null !== t && (S.config.embed.time = c(t, 0, S.config.video.duration), Nt.touch || (S.config.embed.autoplay = 1), e.indexOf("at=") !== -1 && history && history.replaceState && history.replaceState("", "", window.location.pathname + window.location.search))
        }

        function u() {
            k.on(mt.userLogIn, function(e) {
                S.reload().then(function(t) {
                    if (!S.config.user.logged_in) return k.fire(mt.loginFailure), t;
                    switch (k.fire(mt.userLoggedIn, e), e) {
                        case "like":
                            S.config.user.liked && k.fire(mt.liked);
                            break;
                        case "watch-later":
                            S.config.user.watch_later && k.fire(mt.addedToWatchLater);
                            break;
                        case "private":
                            k.fire(mt.privateUnlocked)
                    }
                    return t
                }).catch(function(e) {
                    hn.captureException(e)
                })
            }), k.on(mt.userLoggedOut, function() {
                S.reload().catch(function(e) {
                    hn.captureException(e)
                })
            })
        }

        function d() {
            q = t(), k.on([mt.playInitiated, mt.playButtonPressed], function() {
                Nt.iOS && S.config.video.spatial || (T.style.backgroundImage = "none")
            }), k.on(mt.didEnterFullscreen, function() {
                "none" === T.style.backgroundImage && "beginning" !== S.config.embed.outro || (q = t())
            });
            var e = null;
            window.addEventListener("resize", function() {
                clearTimeout(e), e = setTimeout(function() {
                    q = q.then(function() {
                        return t()
                    }).catch(function(e) {})
                }, 250), n()
            }, !1)
        }

        function l() {
            if (S.config.request.sentry) try {
                ! function() {
                    var e = "dev" === S.config.request.build.js ? "dev" : "production",
                        t = {
                            locale: S.config.request.lang,
                            git_commit: S.config.request.build.player,
                            debug_intent: S.config.request.sentry.debug_intent ? 1 : 0
                        };
                    S.config.request.ab_tests && ! function() {
                        var e = S.config.request.ab_tests;
                        Object.keys(e).forEach(function(n) {
                            var i = e[n].data;
                            Object.keys(i).forEach(function(e) {
                                t[e] = i[e]
                            })
                        })
                    }(), hn.config(S.config.request.sentry.url, {
                        logger: "player-raven",
                        release: S.config.request.build.js,
                        environment: e,
                        tags: t,
                        autoBreadcrumbs: {
                            console: !1
                        },
                        includePaths: [/https?:\/\/.*vimeo\.com/],
                        ignoreErrors: ["Permission denied to access property 'toString'", 'Permission denied to access property "toString"', "The play() request was interrupted by a call to pause().", "Permission denied to access property 'href'", 'Permission denied to access property "href"', "docs-homescreen-gb-container", "Failed to load image.", 'Объект не поддерживает свойство или метод "endsWith"'],
                        shouldSendCallback: function(e) {
                            return !!S.config.request.sentry.enabled || !(!S.config.request.sentry.debug_enabled || "Debug info copied" !== e.message)
                        }
                    }).install(), window.addEventListener("unhandledrejection", function(e) {
                        e.reason && hn.captureException(e.reason)
                    }), S.config.request.sentry.debug_intent && O(function() {
                        hn.captureMessage("Session debug", {
                            level: "info"
                        })
                    })
                }()
            } catch (e) {}
        }

        function h(e) {
            n(), a(), u(), d(), p(e)
        }

        function v(e) {
            D || (D = new oe(e), Object.keys(D).forEach(function(e) {
                if ("function" == typeof D[e]) return void Object.defineProperty(H, e, {
                    enumerable: !0,
                    value: D[e]
                });
                var t = {
                    enumerable: !0,
                    get: D[e].get
                };
                D[e].set && (t.set = D[e].set), Object.defineProperty(H, e, t)
            }))
        }

        function p(e) {
            var t = S.config.embed.settings.background && (Nt.iOS || Nt.android);
            if (!t) {
                var n = new ze(e, m.querySelector(".video-wrapper"));
                M = n.telecine
            }
            void new ee(e), void new ae(e, m.querySelector(".captions")), void new ye(e), void new _e(e), N = new Se(e), v(e)
        }
        var m = e.element,
            y = e.delegate,
            _ = void 0 === y ? {} : y,
            b = e.cssLoadedPromise,
            w = void 0 === b ? ut.resolve(null) : b,
            k = (e.name, Z()),
            S = new se({
                events: k
            }),
            x = g();
        m.classList.add("player-" + x), m.classList.add("loading"), m.id || (m.id = "player" + x), m.innerHTML = At.render("outer", {
            strings: {
                back: "Back",
                close: "Close overlay"
            }
        });
        var T = m.querySelector(".video"),
            E = m.querySelector(".telecine");
        if (Nt.iOS) {
            var L = document.createElement("video");
            E.appendChild(L);
            try {
                L.play(), L.pause()
            } catch (e) {
                hn.captureException(e)
            }
        }
        var M = null,
            F = null,
            I = null,
            q = null,
            R = null,
            B = {},
            D = null,
            N = null,
            j = void 0,
            V = new ut(function(e, t) {
                j = e
            }).then(function() {
                return k.fire(mt.ready), null
            }),
            H = {
                get config() {
                    return S.config
                },
                set config(e) {
                    S.config = e
                },
                get delegate() {
                    return _
                },
                set delegate(e) {
                    _ = e
                },
                ready: function(e) {
                    return e ? void V.then(function() {
                        return e()
                    }).catch(function(e) {
                        hn.captureException(e)
                    }) : V
                },
                get sessionId() {
                    return S.config.request.session
                }
            },
            U = {
                get config() {
                    return S.config
                },
                get element() {
                    return m
                },
                get events() {
                    return k
                },
                get uuid() {
                    return x
                },
                get externalApi() {
                    return H
                },
                get telecine() {
                    return M
                },
                get doNotTrackEnabled() {
                    return S.config.embed.dnt || S.config.request.flags.dnt
                },
                get playLoggingEnabled() {
                    return S.config.embed.log_plays && S.config.request.flags.plays
                },
                init: function(e, t) {
                    return I ? I : (B = t, I = S.load(e).then(i).catch(function(e) {
                        return o(U)
                    }).then(function() {
                        return l(), null
                    }).then(function() {
                        return "function" == typeof B.initializationHandler ? ut.resolve(t.initializationHandler()) : null
                    }).then(function() {
                        return h(U), "function" == typeof B.postInitializationHandler ? ut.resolve(t.postInitializationHandler()) : null
                    }).then(function() {
                        return ut.all([q, w])
                    }).then(r).catch(function(e) {
                        hn.captureException(e)
                    }))
                },
                loadVideo: function(e, n) {
                    return R === e && F ? F : (k.fire(mt.loadVideo), R = e, m.classList.add("loading"), F = S.load(e).then(i).catch(function(e) {
                        return hn.captureException(e), o(U)
                    }).then(function(e) {
                        return q = t(), ut.resolve(q)
                    }).then(r))
                },
                performDelegateAction: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                        i = void 0;
                    if (_ && _[e.will]) {
                        var r;
                        if (i = (r = _)[e.will].apply(r, [S.config.video.id].concat(n)), i === !1) return
                    }
                    t.apply(void 0, [S.config.video.id].concat(n, [i])), _ && _[e.did] && _[e.did]()
                },
                ready: function() {
                    return V
                },
                verifyConfig: function() {
                    return S.verify()
                },
                reportError: function(e, t) {
                    return hn.captureException(e, t), hn.lastEventId()
                },
                reportMessage: function(e, t) {
                    return hn.captureMessage(e, t), hn.lastEventId()
                },
                addBreadcrumb: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "player",
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "info";
                    hn.captureBreadcrumb({
                        message: e,
                        data: t,
                        category: n,
                        level: i
                    })
                }
            };
        return U
    }

    function Xe(e, n, i, r) {
        function a() {
            k.style.left = "-999999px";
            var e = o(n),
                r = o(i),
                a = o(k),
                s = e.left + e.width / 2 - a.width / 2 - r.left,
                c = r.height,
                u = r.left + s + a.width,
                d = i.classList.contains("play-bar") ? r.right : r.width - parseInt(window.getComputedStyle(i).paddingRight, 10);
            if (u > d) {
                var l = u - d;
                s -= l;
                var f = e.left - (r.left + s) + e.width / 2;
                f !== b && (t(".player .menu::after", "left:" + f + "px", document.styleSheets[document.styleSheets.length - 1]), b = f)
            }
            k.style.left = s + "px", k.style.bottom = c + "px"
        }

        function s() {
            k.style.height = "auto";
            var e = o(r.element),
                t = o(k),
                n = e.bottom - t.bottom,
                i = 0,
                a = r.element.querySelector(".title");
            if (a) {
                var s = o(a);
                i = Math.max(10, s.height)
            }
            var c = e.height - n - i,
                u = e.height / 2,
                d = Math.max(c, u),
                l = k.querySelector(".scrollable-items"),
                f = l.children,
                h = 0;
            if (f && f.length) {
                var v = f[0],
                    p = getComputedStyle(v),
                    m = v.clientHeight + parseInt(p.marginTop, 10) + parseInt(p.marginBottom, 10);
                h = m / 2
            }
            t.height > d && (k.style.height = Math.min(d - h, t.height) + "px")
        }

        function c(e) {
            var t = document.createElement("ul");
            t.classList.add("menu"), t.classList.add("rounded-box"), t.classList.add("hidden"), t.classList.add("invisible"), t.setAttribute("hidden", ""), t.setAttribute("id", E), t.setAttribute("role", "menu"), A = document.createElement("div"), A.classList.add("item-container");
            var n = document.createDocumentFragment();
            e.forEach(function(e) {
                var t = document.createElement("li");
                t.setAttribute("tabindex", "0"), t.setAttribute("role", "menuitemradio"), t.setAttribute("aria-checked", "false"), t.setAttribute("data-id", e.id), t.innerHTML = "<span>" + e.label + "</span>", e.active && (t.classList.add("active"), t.setAttribute("aria-checked", "true"), S = t), n.appendChild(t)
            }), C = document.createElement("div"), C.classList.add("scrollable-items");
            var i = document.createElement("div");
            i.classList.add("sticky-items"), i.appendChild(n.lastChild), C.appendChild(n);
            var o = document.createElement("div");
            return o.classList.add("top-shadow"), A.appendChild(C), A.appendChild(i), A.appendChild(o), t.appendChild(A), O = C.firstChild, M = C.lastChild, C.addEventListener("mousewheel", u), C.addEventListener("scroll", u), C.addEventListener("focusin", d), r.events.on(mt.menuVisibilityChanged, function(e) {
                setTimeout(u, 10)
            }), r.events.on([mt.enteredTinyMode, mt.enteredMiniMode, mt.enteredNormalMode], function(e) {
                u(), a(), T && r.events.fire(mt.menuVisibilityChanged, T, _)
            }), t
        }

        function u(e) {
            var t = C,
                n = t.scrollHeight,
                i = t.scrollTop,
                r = t.clientHeight,
                o = n - r,
                a = e || {},
                s = a.deltaY,
                c = void 0 === s ? 0 : s;
            return A.classList.remove("scroll-off"), n - r <= 1 ? void A.classList.add("scroll-off") : (i >= o ? (L = !0, A.classList.add("scroll-end")) : L && (L = !1, A.classList.remove("scroll-end")), i <= 0 ? (P = !0, A.classList.add("scroll-start")) : P && (P = !1, A.classList.remove("scroll-start")), void((L && c > 0 || P && c < 0) && e.preventDefault()))
        }

        function d(e) {
            var t = e.target,
                n = O.contains(t),
                i = M.contains(t);
            n ? C.scrollTop = 0 : i && (C.scrollTop = C.scrollHeight)
        }

        function l(e) {
            T || (e = e || n.contains(document.activeElement), k.classList.remove("hidden"), k.removeAttribute("hidden"), a(), a(), s(), n.setAttribute("aria-expanded", "true"), T = !0, r.events.fire(mt.menuVisibilityChanged, T, _), window.requestAnimationFrame(function() {
                k.classList.remove("invisible"),
                    k.classList.add("open"), u(), e && (S || m()[0]).focus()
            }))
        }

        function f() {
            T && (n.setAttribute("aria-expanded", "false"), T = !1, r.events.fire(mt.menuVisibilityChanged, T, _), k.classList.add("invisible"))
        }

        function h(e) {
            return T ? (f(), !1) : (l(e), !0)
        }

        function v(e) {
            S && (S.classList.remove("active"), S.setAttribute("aria-checked", "false"));
            var t = k.querySelector('[data-id="' + e + '"]');
            t && (S = t, S.classList.add("active"), S.setAttribute("aria-checked", "true"))
        }

        function p() {
            k.parentElement.removeChild(k)
        }

        function m() {
            var e = wn(k.querySelectorAll('[tabindex="0"]'));
            return e
        }

        function g() {
            k = c(e), n.setAttribute("aria-controls", E), n.setAttribute("aria-expanded", "false"), n.setAttribute("aria-haspopup", "true"), x(k, ["li", "span"], function() {
                var e = "SPAN" === this.tagName ? this.parentElement : this;
                w.fire("selected", e.getAttribute("data-id"))
            }), x(n, function() {
                h()
            }), kt(window).on("focus", function(e) {
                var t = document.activeElement,
                    i = k.contains(t),
                    r = n.contains(t);
                i || r || f()
            });
            var t = function(e) {
                if (("keypress" === e.type && 13 === e.which || "keydown" === e.type && 32 === e.which) && k.contains(document.activeElement)) return w.fire("selected", document.activeElement.getAttribute("data-id")), f(), !1
            };
            kt(k).on("keydown", t), kt(k).on("keypress", t), window.addEventListener("resize", a), i.insertBefore(k, n.nextSibling)
        }

        function y() {
            kt(document).on("click", function(e) {
                T && !n.contains(e.target) && f()
            }), kt(k).on("transitionend", function(e) {
                this === k && "opacity" === e.propertyName && k.classList.contains("invisible") && (k.classList.add("hidden"), k.setAttribute("hidden", ""), k.classList.remove("open"))
            }), window.addEventListener("blur", f, !1), r.events.on(mt.didExitFullscreen, f).on(mt.controlBarVisibilityChanged, function(e) {
                e || f()
            })
        }
        var _, b, w = Z(),
            k = null,
            S = null,
            T = !1,
            E = "menu-" + Math.round(1e3 * Math.random() + (new Date).getTime()),
            L = !1,
            P = !1,
            C = void 0,
            A = void 0,
            O = void 0,
            M = void 0;
        return g(), y(), _ = {
            show: l,
            hide: f,
            toggle: h,
            setActiveItem: v,
            on: w.on,
            off: w.off,
            destroy: p,
            button: n,
            element: k,
            get focusableItems() {
                return m()
            }
        }
    }

    function Ke(e, t, n) {
        return e = String(e), new Array(t - e.length + 1).join(n || "0") + e
    }

    function $e(e, t) {
        var n = Math.floor(e / 3600 % 60),
            i = Math.floor(e / 60 % 60);
        if (e = Math.floor(e % 60), t) {
            var r = e + " second" + (1 === e ? "" : "s");
            return i > 0 && (r = i + " minute" + (1 === i ? "" : "s") + ", " + r), n > 0 && (r = n + " hour" + (1 === n ? "" : "s") + ", " + r), r
        }
        return (n > 0 ? n + ":" : "") + Ke(i, 2) + ":" + Ke(e, 2)
    }

    function Ye(e, t) {
        function n() {
            De = null, Ne = null
        }

        function i() {
            if (!Ne) {
                var e = Z.getBoundingClientRect().left;
                Z.offsetWidth < Z.clientWidth && (e *= 100);
                var t = parseInt(window.getComputedStyle(Z, "").borderLeftWidth, 10);
                Ne = e + t
            }
            return Ne
        }

        function r() {
            if (!De) {
                var e = Z.getBoundingClientRect().right;
                Z.offsetWidth < Z.clientWidth && (e *= 100);
                var t = parseInt(window.getComputedStyle(Z, "").borderRightWidth, 10);
                De = e - t
            }
            return De
        }

        function o(t) {
            var n = i(),
                o = r(),
                a = o - n,
                s = t - n;
            if (e.config.user.progress && s <= 10 && !Te) return 0;
            var u = s / a;
            return c(u, 0, 1)
        }

        function a(t) {
            for (var n = je, i = Array.isArray(n), r = 0, n = i ? n : n[Symbol.iterator]();;) {
                var a;
                if (i) {
                    if (r >= n.length) break;
                    a = n[r++]
                } else {
                    if (r = n.next(), r.done) break;
                    a = r.value
                }
                var s = a,
                    c = s.getBoundingClientRect(),
                    u = c.left,
                    d = c.right;
                if (t >= u && t <= d) {
                    var l = parseFloat(s.getAttribute("data-time"));
                    return l / e.config.video.duration
                }
            }
            return o(t)
        }

        function s(t, n) {
            Te && !Ie && (n = n || e.config.video.duration * t || 0, window.requestAnimationFrame(function() {
                u(t, n), d(t, n)
            }))
        }

        function u(e, t) {
            re.style.left = Math.min(p(100 * e), 100) + "%", oe.innerHTML = $e(t)
        }

        function d(e, t) {
            var n = Math.min(p(100 * e), 100);
            ne.style.width = n + "%", ne.setAttribute("aria-valuenow", p(t)), ne.setAttribute("aria-valuetext", $e(Math.round(t), !0) + " played"), Q.setAttribute("width", n + "%")
        }

        function l(e, t) {
            var n = Math.min(p(100 * e), 100);
            te.style.width = n + "%", te.setAttribute("aria-valuenow", p(t)), te.setAttribute("aria-valuetext", $e(t, !0) + " loaded"), G.setAttribute("width", n + "%")
        }

        function f() {
            return Te = !0, Be && (qe = !1, t.classList.add("invisible"), S(), g()), $.classList.contains("state-playing") ? (e.events.fire(mt.pauseButtonPressed), h()) : (e.events.fire(mt.playButtonPressed), v()), !Nt.android
        }

        function h() {
            Re = !1, $.classList.remove("state-playing"), $.classList.add("state-paused");
            var e = $.getAttribute("data-title-play");
            $.setAttribute("title", e), $.setAttribute("aria-label", e)
        }

        function v() {
            Re = !0, Be && S(), $.classList.add("state-playing"), $.classList.remove("state-paused");
            var e = $.getAttribute("data-title-pause");
            $.setAttribute("title", e), $.setAttribute("aria-label", e)
        }

        function m() {
            qe && (xe || (Te && Fe || Le || Ye) && (Ee || (!We && !Ke || Le) && (Le && e.config.view === dt.privateUnlocked || Ae || Pe || (qe = !1, e.events.fire(mt.controlBarVisibilityChanged, qe), t.classList.add("invisible")))))
        }

        function g() {
            qe || Le || (t.classList.remove("hidden"), t.removeAttribute("hidden"), setTimeout(function() {
                qe = !0, e.events.fire(mt.controlBarVisibilityChanged, qe), t.classList.remove("invisible")
            }, 0))
        }

        function y(t, n) {
            var i = [];
            "text_tracks" in e.config.request && (e.config.request.text_tracks.forEach(function(e) {
                var t = "CC" === e.label.substring(e.label.length - 2),
                    n = "captions" !== e.kind || t ? "" : " CC";
                i.push({
                    label: e.label + n,
                    id: e.id,
                    active: Ue === "" + e.id
                })
            }), i.push({
                label: "None",
                id: "off",
                active: null === Ue
            }));
            var r = new Xe(i, t, n, e);
            return r.on("selected", function(t) {
                return "off" === t ? void e.events.fire(pt.turnCaptionsOff) : void e.events.fire(pt.turnCaptionsOn, t)
            }), r
        }

        function _() {
            window.requestAnimationFrame(function() {
                u(0, e.config.video.duration), d(0, 0), l(0, 0)
            })
        }

        function b() {
            Te = !1, Ee = !1, Pe = !1, Oe = !1, Ie = !1, xe = !1, Fe = !1, He = !0, _e && (_e.destroy(), _e = null), Ve && (Ve.destroy(), Ve = null)
        }

        function w() {
            if (!e.config.embed.settings.custom_logo) return null;
            var t = e.config.embed.settings.custom_logo,
                n = t.img;
            return Nt.devicePixelRatio >= 2 && (n = n.replace(/(mw|mh)=(\d+)/g, function(e, t, n) {
                return t + "=" + 2 * parseInt(n, 10)
            })), {
                showLink: null !== t.url,
                url: t.url,
                img: n,
                sticky: t.sticky,
                width: t.width,
                height: t.height
            }
        }

        function k() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            if (fe) {
                var t, n = 1 / ve.length,
                    i = e / n,
                    r = Math.ceil(i),
                    o = i % 1;
                o <= .33 && (t = "fill1"), o > .33 && o <= .66 && (t = "fill2"), ve.forEach(function(e, n) {
                    return e.classList.remove("fill0"), e.classList.remove("fill1"), e.classList.remove("fill2"), n === r - 1 && o && o <= .66 ? void e.classList.add(t) : void(n > r - 1 && e.classList.add("fill0"))
                }), fe.setAttribute("aria-valuenow", e.toFixed(3)), fe.setAttribute("aria-valuetext", Math.round(100 * e) + "%")
            }
        }

        function S() {
            if (e.config.view === dt.main || e.config.view === dt.privateUnlocked) {
                var n = e.config.embed.settings,
                    i = {
                        show: n.logo,
                        showLink: !!e.config.video.url,
                        url: e.config.video.url
                    },
                    r = w();
                if (e.config.embed.settings.watch_trailer && !Te && !Re && !e.config.embed.autoplay && e.config.embed.on_site) return void T(i, r);
                var o = !e.telecine || e.telecine.supportsSettingVolume,
                    a = !e.telecine || e.telecine.supportsTextTracks,
                    s = "text_tracks" in e.config.request && e.config.request.text_tracks.length,
                    c = {
                        targetBlank: 0 === e.config.embed.on_site,
                        playState: Re ? "playing" : "paused",
                        volume: o && n.volume,
                        ccButton: a && s,
                        ccOn: null !== Ue,
                        hdButton: He && e.config.video.hd,
                        airplayButton: Nt.airPlay,
                        stereoscopicButton: "disable" !== e.config.video.privacy && Nt.stereoscopic && e.config.video.spatial,
                        fullscreenButton: n.fullscreen,
                        vimeoLogo: i,
                        duration: $e(e.config.video.duration),
                        rawDuration: e.config.video.duration,
                        strings: {
                            play: "Play",
                            pause: "Pause",
                            loadedBar: "loaded",
                            playedBar: "played",
                            volume: "Volume (use arrow keys to change)",
                            captions: "Choose captions",
                            hd: "Select video quality",
                            effect: "Choose an effect to apply to the video",
                            airPlay: "Choose an AirPlay device",
                            airPlayOff: "Turn off AirPlay",
                            pipEnter: "Enter Picture-in-Picture",
                            pipReturn: "Exit Picture-in-Picture",
                            fullscreen: "Fullscreen",
                            enterFullscreen: "Enter full screen",
                            exitFullscreen: "Exit full screen",
                            watchOnVimeo: "Watch on vimeo.com",
                            stereoscopic: "Enable stereoscopic playback",
                            stereoscopicOff: "Disable stereoscopic playback"
                        }
                    };
                r && (c.customLogo = r), t.classList.remove("trailer"), Be = !1, t.innerHTML = At.render("controlbar", c), $ = t.querySelector(".play"), Y = $.querySelector(".buffer"), G = $.querySelector(".loaded"), Q = $.querySelector(".played"), J = t.querySelector(".play-bar"), Z = t.querySelector(".progress"), ee = J.querySelector(".buffer"), te = J.querySelector(".loaded"), ne = J.querySelector(".played"), ie = J.querySelector(".cuepoints"), re = t.querySelector(".timecode"), oe = re.querySelector(".box"), ae = t.querySelector(".ghost-timecode"), se = ae.querySelector(".box"), ue = t.querySelector(".thumb-preview"), le = t.querySelector(".thumb"), fe = t.querySelector(".volume"), fe && (ve = wn(fe.querySelectorAll("div")), k(e.config.request.cookie.volume)), ge = t.querySelector(".hd"), ye = t.querySelector(".play-bar .cc"), ze = t.querySelector(".effect"), be = t.querySelector(".pip"), Nt.airPlay && (we = t.querySelector(".airplay")), Nt.stereoscopic && e.config.video.spatial && (ke = t.querySelector(".stereoscopic")), Se = t.querySelector(".fullscreen"), Ee = !1, Te || z(), qe && e.events.fire(mt.controlBarVisibilityChanged, qe), Ye && m()
            }
        }

        function T(n, i) {
            t.classList.add("trailer");
            var r = {
                vimeoLogo: n,
                text: e.config.video.vod.button_text || "Watch Trailer",
                strings: {
                    playTrailer: "Play Trailer",
                    watchOnVimeo: "Watch on vimeo.com"
                }
            };
            i && (r.customLogo = i), t.innerHTML = At.render("controlbar_trailer", r), $ = t.querySelector(".play"), Be = !0
        }

        function E() {
            x(t, ".play", f), e.events.on([mt.playInitiated, mt.playButtonPressed], v), e.events.on([mt.pauseButtonPressed, mt.paused, mt.error], h), e.events.on(mt.played, function() {
                v()
            }), e.events.on(mt.ended, function() {
                Ie = !1, h(), s(1)
            }), e.events.on(mt.overlayOpened, function(e) {
                "notsupported" === e && h()
            })
        }

        function L() {
            e.events.on(mt.loadProgress, function(e, t, n) {
                xe || window.requestAnimationFrame(function() {
                    l(n, e)
                })
            })
        }

        function P() {
            e.events.on(mt.bufferStarted, function(e) {
                e.initial;
                ee.classList.remove("hidden"), te.classList.add("hidden"), Y.setAttribute("class", Y.getAttribute("class").replace(/\s+hidden/, "")), Ae = !0, Ye || g()
            }), e.events.on(mt.bufferEnded, function() {
                ee.classList.add("hidden"), te.classList.remove("hidden"), Y.setAttribute("class", Y.getAttribute("class") + " hidden"), Ae = !1
            })
        }

        function C() {
            function n(n) {
                if (!n.button || 2 !== n.button) {
                    e.element.classList.add("scrubbing"), e.events.fire(mt.scrubbingStarted);
                    var c = n.type;
                    if ("pointerdown" === c || "MSPointerDown" === c) {
                        o = n.pointerId;
                        try {
                            n.target.msSetPointerCapture ? n.target.msSetPointerCapture(o) : n.target.setPointerCapture(o)
                        } catch (e) {}
                        kt(t).on("pointermove", ".progress", i).on("pointerup", ".progress", r)
                    } else "touchstart" === c ? kt(t).on("touchmove", i).on("touchend", r) : kt(document).on("mousemove", i).on("mouseup", r);
                    var l = n.clientX;
                    n.targetTouches && n.targetTouches.length > 0 && (l = n.targetTouches[0].clientX, n.preventDefault());
                    var f = a(l),
                        h = null;
                    if (Te) s(f);
                    else {
                        var v = e.config.video.duration * f;
                        u(f, v), d(f, v), Ie = !0
                    }
                    return e.events.fire(pt.seek, f, h), !1
                }
            }

            function i(t) {
                if (Ie = !1, o === t.pointerId && t.isPrimary !== !1) {
                    var n = t.clientX;
                    t.targetTouches && t.targetTouches.length > 0 && (n = t.targetTouches[0].clientX, t.preventDefault());
                    var i = a(n);
                    s(i), e.events.fire(pt.seek, i)
                }
            }

            function r(n) {
                var o = n.type;
                "pointerup" === o || "MSPointerUp" === o ? kt(t).off("pointermove", ".progress", i).off("pointerup", ".progress", r) : "touchend" === n.type ? kt(t).off("touchmove", i).off("touchend", r) : kt(document).off("mousemove", i).off("mouseup", r), e.events.fire(mt.scrubbingEnded), e.element.classList.remove("scrubbing")
            }
            e.events.on(mt.playProgress, function(t, n, i) {
                Ie && (0 === e.config.embed.time || e.config.embed.time > 0 && t >= e.config.embed.time) && (Ie = !1), Pe || s(i, t)
            }), e.events.on(mt.scrubbingStarted, function(e) {
                Pe = !0, Ce = e
            }), e.events.on(mt.scrubbingEnded, function() {
                Pe = !1, Ce = !1
            });
            var o;
            e.events.on(mt.seeked, function(e, t, n) {
                Ce && s(n)
            }), kt(t).on(Nt.pointerEvents ? "pointerdown" : ["touchstart", "mousedown"], ".progress", n)
        }

        function O() {
            function n() {
                return m || (m = e.verifyConfig().then(function(e) {
                    return A(e.thumb_preview.url)
                })), m.then(function(t) {
                    var n = e.config.request.thumb_preview;
                    return le.style.backgroundImage || (le.style.width = n.frame_width / 2 + "px", le.style.height = n.frame_height / 2 + "px", le.style.backgroundImage = "url(" + n.url + ")", le.style.backgroundSize = n.width / 2 + "px " + n.height / 2 + "px"), t
                })
            }

            function a(t) {
                if (t.target === J) {
                    var n = o(t.clientX);
                    s(n), e.events.fire(pt.seek, n)
                }
            }

            function c(e) {
                return ae.classList.contains("hidden") ? e : (ue.classList.remove("hidden"), window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        ue.classList.remove("invisible")
                    })
                }), e)
            }

            function u(t) {
                Me || Oe || (ae.classList.remove("hidden"), Me = !0, f(t), window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        ae.classList.remove("invisible")
                    })
                }), e.config.request.thumb_preview && g && n().then(c).catch(function() {}), kt(J).on("click", a))
            }

            function d(t) {
                var n = e.config.video.duration / e.config.request.thumb_preview.frames,
                    i = Math.min(e.config.request.thumb_preview.frames - 1, Math.ceil(t / n)),
                    r = i % e.config.request.thumb_preview.columns,
                    o = Math.floor(i / e.config.request.thumb_preview.columns),
                    a = -(r * e.config.request.thumb_preview.frame_width / 2),
                    s = -(o * e.config.request.thumb_preview.frame_height / 2);
                return [a, s]
            }

            function l(e) {
                for (var t = je, n = Array.isArray(t), i = 0, t = n ? t : t[Symbol.iterator]();;) {
                    var r;
                    if (n) {
                        if (i >= t.length) break;
                        r = t[i++]
                    } else {
                        if (i = t.next(), i.done) break;
                        r = i.value
                    }
                    var o = r,
                        a = o.getBoundingClientRect(),
                        s = a.left,
                        c = a.right,
                        u = a.width;
                    if (e >= s && e <= c) return {
                        clientX: s + u / 2,
                        snappedTo: o
                    }
                }
                return {
                    clientX: e,
                    snappedTo: null
                }
            }

            function f(t) {
                if (e.config.request.thumb_preview && null === g) {
                    var i = Z.getBoundingClientRect().width,
                        a = document.querySelector(".player").clientHeight,
                        s = 215,
                        u = 185;
                    if (g = a >= s && i >= u, !g) return void ue.classList.add("hidden");
                    n().then(c).catch(function() {})
                }
                Me && ! function() {
                    var i = l(t.clientX, je),
                        a = i.clientX,
                        s = i.snappedTo,
                        c = o(a),
                        u = e.config.video.duration * c;
                    je.forEach(function(e) {
                        return e.classList.toggle("active", e === s)
                    }), e.config.request.thumb_preview && g && n().then(function(e) {
                        var t = d(u),
                            n = bt(t, 2),
                            i = n[0],
                            r = n[1];
                        return window.requestAnimationFrame(function() {
                            le.style.backgroundPosition = i + "px " + r + "px"
                        }), e
                    }).catch(function() {}), window.requestAnimationFrame(function() {
                        se.innerHTML = $e(u);
                        var e = (100 * c).toFixed(3);
                        ae.style.left = e + "%", v(c), t.clientX > r() + 10 && !ue.contains(document.elementFromPoint(t.clientX, t.clientY)) && p()
                    })
                }()
            }

            function h() {
                var e = $.getBoundingClientRect().left,
                    t = J.getBoundingClientRect().right,
                    n = ue.getBoundingClientRect().width,
                    o = e + Math.ceil(n / 2),
                    a = t - Math.ceil(n / 2),
                    s = i(),
                    c = r(),
                    u = c - s,
                    d = (o - s) / u,
                    l = (a - s) / u;
                return [d, l]
            }

            function v(e) {
                var t = h(),
                    n = bt(t, 2),
                    i = n[0],
                    r = n[1],
                    o = Math.max(i, Math.min(r, e)),
                    a = (100 * o).toFixed(3);
                ue.style.left = a + "%"
            }

            function p() {
                ae && (ae.classList.add("invisible"), ue.classList.add("invisible")), Me = !1, kt(J).off("click", a)
            }
            var m = void 0,
                g = null;
            e.events.on(mt.resize, function() {
                g = null
            }), kt(t).on("mouseenter", ".progress", u).on("mousemove", ".play-bar", f).on("mouseleave", ".play-bar", p), kt(t).on("transitionend", ".ghost-timecode", function(e) {
                "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && (ae.classList.add("hidden"), ue.classList.add("hidden"))
            }, !1), e.events.on(mt.mousedOut, p), e.events.on(mt.configChanged, function() {
                m = null
            })
        }

        function M() {
            function n(e) {
                Ue = e, _e && (_e.setActiveItem(e), setTimeout(function() {
                    _e.hide()
                }, 100)), ye && (ye.classList.add("on"), ye.classList.remove("off"))
            }

            function i() {
                Ue = null, _e && (_e.setActiveItem("off"), setTimeout(function() {
                    _e.hide()
                }, 100)), ye && (ye.classList.add("off"), ye.classList.remove("on"))
            }
            x(t, ".cc", function() {
                e.events.fire(mt.ccButtonPressed)
            }), e.events.on(mt.ccButtonPressed, function(e) {
                _e ? e && _e.toggle(e) : (_e = y(ye, J), _e.show(e))
            }), e.events.on(mt.captionsChanged, function(e) {
                return e ? void n(e.id) : void i()
            }).on(mt.controlBarVisibilityChanged, function(e) {
                e || _e && _e.hide()
            }).on([pt.enableCaptions, pt.disableCaptions], function() {
                S()
            })
        }

        function F() {
            function n() {
                var t = At.render("icon_hd");
                if (e.telecine.video.currentFile.mime === ht.dash) {
                    var n = e.config.request.files.dash.streams,
                        i = wn(n).sort(pe()).filter(he(n)).map(function(e) {
                            var n = de(e);
                            return {
                                id: n,
                                label: me(e, t),
                                active: r === n
                            }
                        });
                    return i.push({
                        id: "auto",
                        label: "Auto",
                        active: !r || "auto" === r
                    }), i
                }
                var o = e.telecine.video.files;
                return wn(o).filter(ce("progressive")).filter(he(o)).sort(pe()).map(function(e) {
                    return {
                        label: me(e, t),
                        id: de(e),
                        active: r === e.metadata.quality
                    }
                })
            }

            function i() {
                var t = n(),
                    i = new Xe(t, ge, J, e);
                return i.on("selected", function(t) {
                    e.events.fire(pt.changeQuality, t)
                }), i
            }
            var r = null;
            x(t, ".hd", function() {
                e.events.fire(mt.hdButtonPressed)
            }), e.events.on(mt.hdButtonPressed, function(e) {
                return Ve ? void(e && Ve.toggle(e)) : (Ve = i(), void Ve.show(e))
            }), e.events.on(mt.qualityChanged, function(e) {
                r = e, Ve && Ve.setActiveItem(e)
            }), e.events.on(pt.disableHd, function() {
                He = !1, S()
            })
        }

        function I() {
            var n = document.createElement("a");
            if (n.style.cssText = "-moz-filter:blur(2px);-webkit-filter:blur(2px);filter:blur(2px);", !(n.style.length < 1)) {
                var i = null,
                    r = function() {
                        var t = [{
                                label: "Soporific",
                                id: "aden"
                            }, {
                                label: "Escutcheon",
                                id: "earlybird"
                            }, {
                                label: "Pluvious",
                                id: "hudson"
                            }, {
                                label: "Moribund",
                                id: "inkwell"
                            }, {
                                label: "Fecundity",
                                id: "mayfair"
                            }, {
                                label: "Jejune",
                                id: "toaster"
                            }, {
                                label: "None",
                                id: "none",
                                active: !0
                            }],
                            n = Nt.browser.safari,
                            i = e.telecine.supportsEffect(mr),
                            r = ft[e.telecine.video.currentFile.mime],
                            o = "dash" === r;
                        return !n && o && i && t.unshift({
                            label: "ASCII",
                            id: "ascii"
                        }), t
                    };
                x(t, ".effect", function() {
                    return e.events.fire(mt.effectButtonPressed)
                }), e.events.on(mt.effectButtonPressed, function(t) {
                    return ze.classList.remove("hidden"), i ? void(t && i.toggle(t)) : (i = new Xe(r(), ze, J, e), i.on("selected", function(t) {
                        return e.events.fire(pt.setEffect, t)
                    }), void i.show(t))
                }), e.events.on(pt.setEffect, function(e) {
                    return i.setActiveItem(e), "none" === e ? (ze.classList.add("off"), void ze.classList.remove("on")) : (ze.classList.add("on"), void ze.classList.remove("off"))
                }), e.events.on(mt.ready, function() {
                    e.telecine.on("scannerchange", function() {
                        i && (i.destroy(), i = null)
                    })
                })
            }
        }

        function q() {
            x(t, ".pip", function() {
                return "picture-in-picture" === e.telecine.presentationMode ? void e.events.fire(pt.deactivatePictureInPicture) : void e.events.fire(pt.activatePictureInPicture)
            }), e.events.on(mt.pictureInPictureAvailable, function() {
                be && (be.classList.remove("hidden"), be.hidden = !1, n())
            }).on(mt.pictureInPictureNotAvailable, function() {
                be && (be.classList.add("hidden"), be.hidden = !0, n())
            }).on(mt.pictureInPictureActivated, function() {
                Ke = !0, be && (be.classList.add("return"), be.classList.remove("enter"), be.setAttribute("title", be.getAttribute("data-title-return")))
            }).on(mt.pictureInPictureDeactivated, function() {
                Ke = !1, be && (be.classList.add("enter"), be.classList.remove("return"), be.setAttribute("title", be.getAttribute("data-title-enter")))
            })
        }

        function R() {
            Nt.airPlay && (x(t, ".airplay", function() {
                e.events.fire(mt.airPlayButtonPressed)
            }), e.events.on(mt.airPlayAvailable, function() {
                we && (we.classList.remove("hidden"), we.hidden = !1, n())
            }).on(mt.airPlayNotAvailable, function() {
                we && (we.classList.add("hidden"), we.hidden = !0, n())
            }).on(mt.airPlayActivated, function() {
                We = !0, we && (we.classList.remove("off"), we.classList.add("on"), we.setAttribute("title", we.getAttribute("data-title-on"))), g()
            }).on(mt.airPlayDeactivated, function() {
                We = !1, we && (we.classList.remove("on"), we.classList.add("off"), we.setAttribute("title", we.getAttribute("data-title-off")))
            }))
        }

        function B() {
            x(t, ".fullscreen", function() {
                e.events.fire(mt.fullscreenButtonPressed)
            }), e.events.on(mt.didEnterFullscreen, function() {
                t.classList.remove("tiny"), Se && Se.setAttribute("title", Se.getAttribute("data-title-unfullscreen"))
            }), e.events.on(mt.didExitFullscreen, function(e) {
                Se && Se.setAttribute("title", Se.getAttribute("data-title-fullscreen")), e || (xe = !0), K && t.classList.add("tiny")
            })
        }

        function D() {
            e.events.on([mt.mousedOver, mt.scrubbingStarted, pt.changeVolume], g).on([mt.mousedOut, mt.mouseTimeout], m).on(mt.willEnterFullscreen, function() {
                Ee = !1, m()
            }).on(mt.willExitFullscreen, function() {
                Ee = !1
            }).on(mt.targetTimeReached, function() {
                Fe = !0, m()
            }).on(pt.changeVolume, function(e, t) {
                t || g()
            });
            var n = [".play", ".play-bar", ".custom-logo", ".menu"];
            kt(t).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], n, function(e) {
                return "pointerType" in e ? void("mouse" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_MOUSE || (Ee = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(Nt.touch || (Ee = "mouseover" === e.type))
            }), kt(t).on("transitionend", function(e) {
                this === t && "opacity" === e.propertyName && t.classList.contains("invisible") && (t.classList.add("hidden"), t.setAttribute("hidden", ""))
            })
        }

        function N() {
            function n(n) {
                if (1 === n.which) {
                    fe.setAttribute("data-tabindex", fe.getAttribute("tabindex")), fe.removeAttribute("tabindex"), Oe = !0, e.element.classList.add("scrubbing"), e.events.fire(mt.volumeScrubbingStarted);
                    var s = n.type;
                    if ("pointerdown" === s || "MSPointerDown" === s) {
                        a = n.pointerId;
                        try {
                            n.target.msSetPointerCapture ? n.target.msSetPointerCapture(a) : n.target.setPointerCapture(a)
                        } catch (e) {}
                        kt(t).on("pointermove", ".volume", i).on("pointerup", ".volume", r)
                    } else "touchstart" === s ? kt(document).on("touchmove", i).on("touchend", r) : kt(document).on("mousemove", i).on("mouseup", r);
                    var c = n.clientX;
                    n.targetTouches && (c = n.targetTouches[0].clientX);
                    var u = o(c);
                    e.events.fire(pt.changeVolume, u), k(u)
                }
            }

            function i(t) {
                var n = t.clientX;
                t.targetTouches && (n = t.targetTouches[0].clientX, t.preventDefault());
                var i = o(n);
                e.events.fire(pt.changeVolume, i), k(i)
            }

            function r(n) {
                Oe = !1, e.events.fire(mt.volumeScrubbingEnded), e.element.classList.remove("scrubbing");
                var o = n.type;
                "pointerup" === o || "MSPointerUp" === o ? kt(t).off("pointermove", ".volume", i).off("pointerup", ".volume", r) : "touchend" === n.type ? kt(document).off("touchmove", i).off("touchend", r) : kt(document).off("mousemove", i).off("mouseup", r), fe.setAttribute("tabindex", fe.getAttribute("data-tabindex")), fe.removeAttribute("data-tabindex")
            }

            function o(e) {
                var t = fe.getBoundingClientRect().left,
                    n = fe.getBoundingClientRect().right,
                    i = n - t,
                    r = e - t,
                    o = r / i;
                return c(o, 0, 1)
            }
            kt(t).on("mousemove", ".volume", function(e) {
                var t = e.srcElement;
                if (ve.indexOf(t) === -1) {
                    var n = fe.getBoundingClientRect(),
                        i = e.clientX,
                        r = n.bottom - 2;
                    if (t = document.elementFromPoint(i, r), ve.indexOf(t) === -1) return
                }
                t.classList.add("hover"), window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        t.classList.remove("hover"), t.classList.add("animate")
                    })
                })
            }), kt(t).on("transitionend", ".volume div", function(e) {
                "height" === e.propertyName && this.classList.remove("animate")
            }), kt(document).on("contextmenu", ".volume", function() {
                this.blur()
            });
            var a;
            kt(t).on(Nt.pointerEvents ? "pointerdown" : ["touchstart", "mousedown"], ".volume", n), e.events.on(mt.volumeChanged, function(e) {
                !Oe && ve && k(e)
            }).on([pt.enableVolume, pt.disableVolume], function() {
                S()
            })
        }

        function j() {
            e.events.on(mt.overlayOpened, function(e) {
                if ("notsupported" !== e && "private-unlocked" !== e && "help" !== e) Le = !0, m();
                else
                    for (var n = t.querySelectorAll("a, button, input, [tabindex]"), i = 0, r = n.length; i < r; i++) {
                        var o = n[i].getAttribute("tabindex");
                        o && n[i].setAttribute("data-tabindex", o), n[i].setAttribute("tabindex", "-1")
                    }
            }).on(mt.overlayClosed, function() {
                Le = !1, g();
                for (var e = t.querySelectorAll("[tabindex]"), n = 0, i = e.length; n < i; n++) {
                    var r = e[n].getAttribute("data-tabindex");
                    r && "null" !== r ? e[n].setAttribute("tabindex", r) : e[n].removeAttribute("tabindex"), e[n].removeAttribute("data-tabindex")
                }
            })
        }

        function V() {
            e.events.on(mt.configChanged, function() {
                S(), e.config.view === dt.privateUnlocked && g(), n(), He = !0
            })
        }

        function H() {
            e.events.on(pt.reset, function() {
                _(), g(), b()
            }), kt(window).on("resize", function() {
                n()
            })
        }

        function U() {
            e.events.on(mt.enteredTinyMode, function() {
                K = !0, t.classList.add("tiny")
            }).on(mt.enteredMiniMode, function() {
                K = !1, t.classList.remove("tiny")
            }).on(mt.enteredNormalMode, function() {
                K = !1, t.classList.remove("tiny")
            })
        }

        function z() {
            var t = e.config.user.progress,
                n = t / e.config.video.duration;
            !t || e.config.embed.autoplay || e.config.embed.time || Be || (u(n, t), d(n, t), Ie = !0)
        }

        function W() {
            if (e.config.embed.on_site) {
                var n = new di;
                e.events.on(mt.cuePointAdded, function(i) {
                    if (i.data.visible) {
                        var r = document.createElement("div");
                        r.setAttribute("id", "cuepoint-" + i.id), r.setAttribute("data-time", i.time), r.classList.add("cuepoint"), r.classList.add("out"), r.appendChild(document.createElement("div"));
                        var o = i.time / e.config.video.duration * 100;
                        r.style.left = o + "%", n.set(i, r), ie.appendChild(r), je = wn(t.querySelectorAll(".cuepoint")), window.requestAnimationFrame(function() {
                            return r.classList.remove("out")
                        })
                    }
                }), e.events.on(mt.cuePointRemoved, function(e) {
                    var t = n.get(e);
                    t && (n.delete(e), t.classList.add("out"))
                }), kt(t).on("transitionend", ".cuepoint", function(e) {
                    this.classList.contains("out") && (ie.removeChild(this), je = wn(t.querySelectorAll(".cuepoint")))
                })
            }
        }

        function X() {
            ke && (x(t, ".stereoscopic", function() {
                e.events.fire(mt.stereoscopicButtonPressed)
            }), ke.classList.remove("hidden"), ke.hidden = !1)
        }
        var K, $, Y, G, Q, J, Z, ee, te, ne, ie, re, oe, ae, se, ue, le, fe, ve, ge, ye, _e, be, we, ke, Se, xe = !1,
            Te = !1,
            Ee = !1,
            Le = !1,
            Pe = !1,
            Ce = !1,
            Ae = !1,
            Oe = !1,
            Me = !1,
            Fe = !1,
            Ie = !1,
            qe = !0,
            Re = !1,
            Be = !1,
            De = null,
            Ne = null,
            je = [],
            Ve = null,
            He = !0,
            Ue = null,
            ze = null,
            We = !1,
            Ke = !1,
            Ye = e.config.embed.autoplay && e.config.request.flags.autohide_controls;
        return S(), E(), C(), P(), O(), N(), M(), F(), I(), q(), R(), B(), D(), j(), V(), H(), z(), U(), W(), X(), e.events.on(mt.playInitiated, function() {
            L(), Te = !0;
            var t = e.config.embed.time || e.telecine.currentTime;
            s(t / e.config.video.duration, t), Ie = !0
        }), e.events.fire(mt.controlBarModuleReady), {}
    }

    function Ge(e, t) {
        function n() {
            clearTimeout(L), L = null
        }

        function i() {
            V && (clearTimeout(L), L = setTimeout(s, P))
        }

        function r() {
            Ot.element && Ot.element.classList.contains("js-player-fullscreen") && (O || (t.classList.add("player-cursor-hide"), A = !0, O = !0))
        }

        function a() {
            O && (t.classList.remove("player-cursor-hide"), O = !1)
        }

        function s(t) {
            if ((N || D) && (n(), !document.activeElement || !document.body.classList.contains("showfocus") || !z.contains(document.activeElement) && !W.contains(document.activeElement))) {
                e.events.fire(t ? mt.mousedOut : mt.mouseTimeout), A = !0;
                var i = Nt.spatialPlayback && e.config.video.spatial;
                i || (U.classList.add("hidden"), U.setAttribute("hidden", "")), C = !0, r()
            }
        }

        function c() {
            N && D || (e.events.fire(mt.mousedOver), U.classList.remove("hidden"), U.removeAttribute("hidden")), i()
        }

        function u() {
            N || D ? t.removeAttribute("tabindex") : N || D || j || t.setAttribute("tabindex", "0")
        }

        function d() {
            function u() {
                c()
            }

            function d(t) {
                if (P = T, A) return void(A = !1);
                if (a(), 0 !== t.screenX && t.screenX !== screen.width - 1 && 0 !== t.screenY && t.screenY !== screen.height - 1) {
                    if (g = !0, Nt.spatialPlayback && e.config.video.spatial) {
                        var u = o(e.element),
                            d = t.clientX - u.left,
                            l = t.clientY - u.top,
                            f = 4 * Dr,
                            h = l > e.element.clientHeight - Br,
                            v = d > e.element.clientWidth - Dr && l < f;
                        if (q || !h && !v) return
                    }
                    C && c(), i()
                } else if (n(), r(), g) {
                    var p = !0;
                    s(p), g = !1
                }
            }

            function l() {
                P = E, i()
            }

            function f() {
                var e = !0;
                s(e)
            }

            function h(e) {
                var t = W.contains(e.target) || z.contains(e.target),
                    n = M && M.getWrapper().contains(e.target);
                if (N && D || n) {
                    if (!t && (N || D)) {
                        var i = !0;
                        s(i)
                    }
                } else c()
            }

            function v(e) {
                return "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE ? (P = T, u(e)) : (P = E, void h(e))
            }

            function p(e) {
                if ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE) return d(e)
            }

            function m(e) {
                if ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE) return f(e)
            }
            var g = !0;
            return Nt.pointerEvents ? void kt(t).on("pointerenter", v).on("pointermove", p).on("pointerleave", m) : void kt(t).on("touchmove", l).on("touchend", h).on("mouseenter", u).on("mousemove", d).on("mouseleave", f)
        }

        function l() {
            e.events.on(mt.played, function(e) {
                $ || 0 === e || c()
            }).on([mt.ended, mt.paused], c).on([mt.bufferEnded, mt.scrubbingEnded, mt.volumeChanged], i).on(mt.playInitiated, function() {
                V = !0
            }), e.events.on(mt.overlayOpened, u).on(mt.controlBarVisibilityChanged, function(e) {
                D = e, u()
            }).on(mt.sidedockVisibilityChanged, function(e) {
                N = e, u()
            })
        }

        function f() {
            function n(e) {
                return (e.classList.contains("title") || e.classList.contains("target") || X.contains(e.parentNode) && "HEADER" === e.parentNode.tagName || K.contains(e)) && !z.contains(e)
            }

            function i(t) {
                if (!o && 2 !== t.button && t.target.classList && n(t.target)) {
                    var i = ("pointerup" === t.type || "MSPointerUp" === t.type) && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE,
                        r = V && Nt.spatialPlayback && e.config.video.spatial && F;
                    if (Nt.touch || i) {
                        var s = e.telecine.supportedPresentationModes.indexOf("inline") !== -1 && !Nt.mobileAndroid;
                        if (!r) {
                            if (V && s) return;
                            return void e.events.fire(mt.playButtonPressed)
                        }
                    }
                    a++, 1 === a && setTimeout(function() {
                        if (r) {
                            var n = B && B.x === t.clientX && B.y === t.clientY;
                            return 1 === a && n && !Nt.mobileAndroid && e.events.fire(e.telecine.paused ? mt.playButtonPressed : mt.pauseButtonPressed), 1 !== a && e.telecine.getEffectByName("ThreeSixtyEffect").snapToCenter(), void(a = 0)
                        }
                        1 === a ? e.events.fire(e.telecine.paused ? mt.playButtonPressed : mt.pauseButtonPressed) : e.events.fire(mt.fullscreenButtonPressed), a = 0
                    }, 200)
                }
            }
            var r = !1,
                o = !1,
                a = 0;
            e.events.on(mt.menuVisibilityChanged, function(e) {
                o = e
            }), kt(t).on(Nt.pointerEvents ? "pointerup" : "click", i), kt(t).on("mousedown", ".video-wrapper", function(e) {
                if (!r) {
                    if (U.classList.remove("hidden"), U.removeAttribute("hidden"), 2 !== e.button) {
                        var t;
                        document.createEvent && (t = document.createEvent("MouseEvents"), t.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), U.dispatchEvent(t))
                    }
                    return !1
                }
            }).on("contextmenu", ".video", function(e) {
                return U.classList.remove("hidden"), U.removeAttribute("hidden"), !1
            }), e.events.on(pt.toggleNativeControls, function(e) {
                return e ? (r = !0, void U.classList.add("hidden")) : (r = !1, void U.classList.remove("hidden"))
            })
        }

        function h() {
            if (!Nt.touch) {
                var n, i;
                kt(t).on("focus", "a, button, input, [tabindex]", function() {
                    i = this, clearTimeout(n), n = null, document.activeElement === this && c()
                }), kt(t).on("blur", "a, button, input, [tabindex]", function() {
                    document.activeElement === this && (n = setTimeout(s, 50))
                }), t.addEventListener("focus", function(e) {
                    c(), i && i.focus()
                }, !1), e.events.on(mt.overlayOpened, function() {
                    j = !0, t.removeAttribute("tabindex")
                }), e.events.on(mt.overlayClosed, function() {
                    j = !1
                })
            }
        }

        function v() {
            e.events.on(mt.didEnterFullscreen, r).on(mt.didExitFullscreen, function(e) {
                return C = !0, e ? void s() : (c(), void n())
            })
        }

        function p() {
            e.events.on([mt.playProgress, mt.seeked], function t(n) {
                n >= H && null === L && (e.events.fire(mt.targetTimeReached), e.events.off([mt.playProgress, mt.seeked], t))
            })
        }

        function m() {
            e.events.on(pt.reset, function() {
                C = !0, A = !0, D = !0, N = !1, V = !1, p(), n()
            })
        }

        function g() {
            e.events.on(pt.attachSpatialPlaybackEvents, _), e.events.on(pt.toggleSpatialPlayback, function(e) {
                y(), F = e, w()
            })
        }

        function y() {
            K.classList.remove("threesixty-video"), e.element.classList.remove("grabbable"), e.element.classList.remove("grabbing"), M && M.hide()
        }

        function _() {
            var t = function(e) {
                return function() {
                    F && e.apply(void 0, arguments)
                }
            };
            e.events.on(pt.revealSpatialControls, t(function() {
                e.element.classList.add("grabbable"), M && M.updatePosition(e.element), !M || M.visible || F.isStereo() || M.reveal()
            })), e.events.on(mt.ended, t(function() {
                y()
            })), e.events.on(mt.cameraUpdate, t(function(e) {
                M && M.setAngle(e.lat, e.lon)
            })), e.events.on(mt.playInitiated, t(function() {
                e.config.video.spatial && b()
            })), e.events.on(mt.stereoscopicButtonPressed, t(function() {
                w()
            }));
            var n = null,
                i = t(function(t) {
                    q || (q = !0, t.preventDefault(), e.element.classList.add("grabbing"), B = {
                        x: t.clientX,
                        y: t.clientY
                    }, F.makeContact(B))
                }),
                r = t(function(e) {
                    q && (w(), F.move({
                        x: e.clientX,
                        y: e.clientY
                    }))
                }),
                o = t(function(t) {
                    q && (e.element.classList.remove("grabbing"), F.releaseContact(!1), q = !1)
                }),
                a = t(function(t) {
                    t.preventDefault(), F.isUserInteracting || (F.isUserInteracting = !0), null !== n && clearTimeout(n), w(), n = setTimeout(function() {
                        e.element.classList.remove("player-cursor-hide"), e.element.classList.add("grabbable"), F.isUserInteracting = !1
                    }, 500), e.element.classList.add("player-cursor-hide"), e.element.classList.remove("grabbable"), F.moveWheel({
                        x: t.deltaX,
                        y: t.deltaY
                    })
                }),
                s = t(function(e) {
                    q || (q = !0, F.makeContact({
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY
                    }))
                }),
                c = t(function(e) {
                    q && (e.preventDefault(), w(), F.move({
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY
                    }))
                }),
                u = t(function(e) {
                    F.releaseContact(!0), q = !1
                }),
                d = t(function(e) {
                    q || w(), F.moveDevice(e.alpha, e.beta, e.gamma, e.orientation)
                }),
                l = t(function(t) {
                    q = !1, e.element.classList.remove("grabbing"), F.abandonMotion()
                }),
                f = function() {
                    M.updatePosition(e.element), F.adjustRenderSize(), q = !1
                },
                h = t(f),
                v = t(function() {
                    f();
                    var t = 3,
                        n = 0,
                        i = 100,
                        r = setInterval(function() {
                            if (n++, n > t) return void clearInterval(r);
                            var i = F.getRendererSize(),
                                o = e.element.clientHeight,
                                a = e.element.clientWidth;
                            return a !== i.width || o !== i.height ? void F.adjustRenderSize() : void clearInterval(r)
                        }, i)
                });
            e.events.once(mt.playInitiated, function() {
                window.addEventListener("resize", h), window.addEventListener("orientationchange", h), e.events.on([mt.enteredTinyMode, mt.enteredMiniMode, mt.enteredNormalMode], h), e.events.on(mt.didEnterFullscreen, v), e.events.on(mt.didExitFullscreen, v), Nt.android && window.addEventListener("deviceorientation", d, !1), Nt.pointerEvents ? (kt(U).on("pointerdown", i), window.addEventListener("pointermove", r), window.addEventListener("pointerup", o), window.addEventListener("pointerleave", l)) : (kt(U).on("touchstart", s).on("mousedown", i).on("wheel", a),
                    window.addEventListener("touchmove", c), window.addEventListener("mousemove", r), window.addEventListener("mouseup", o), window.addEventListener("touchend", u), window.addEventListener("mouseleave", l))
            })
        }

        function b() {
            function n() {
                var e = t;
                if (!R) {
                    var n = R = document.createElement("div");
                    n.classList.add("cloaked"), n.classList.add("player-alert-round"), n.classList.add("player-alert-round--top"), e.appendChild(n)
                }
            }

            function i(e) {
                R && (R.innerHTML = At.render("threesixty_reminder", e))
            }

            function r() {
                i({
                    showArrows: !1,
                    text: Nt.android ? "Look around" : "Click and drag to look around"
                })
            }

            function o() {
                i({
                    showArrows: !0,
                    text: Nt.android ? "Look around" : "Use arrow keys to see more"
                })
            }
            var a = e.telecine.getEffectByName("ThreeSixtyEffect"),
                s = 7e3,
                c = 14e3,
                u = 3e3,
                d = e.config.embed.settings.spatial_compass;
            d ? (M || (M = new Rr(e.element.querySelector(".controls-wrapper"), function() {
                a.snapToCenter()
            })), M.updatePosition(e.element), M.reveal()) : M && M.hide(), e.events.once(mt.firstTimeUpdate, function() {
                I.push(setTimeout(function() {
                    r(), x(R), k(R), setTimeout(function() {
                        return S(R)
                    }, u)
                }, s)), Nt.android || I.push(setTimeout(function() {
                    o(), x(R), k(R), setTimeout(function() {
                        return S(R)
                    }, u)
                }, c))
            }), n()
        }

        function w() {
            I.forEach(function(e) {
                return clearTimeout(e)
            }), I = []
        }

        function k(e) {
            e && (e.classList.remove("cloaked"), window.requestAnimationFrame(function() {
                e.classList.add("in")
            }))
        }

        function S(e) {
            e && (e.classList.add("leaving"), window.requestAnimationFrame(function() {
                kt(e).on("transitionend", function t(n) {
                    "opacity" === n.propertyName && (e.classList.remove("in"), e.classList.remove("leaving"), e.classList.add("cloaked"), kt(e).off("transitionend", t))
                })
            }))
        }

        function x(e) {
            var t = o(z);
            return t.width > 60 ? void e.classList.add("player-alert-bumpdown") : void e.classList.remove("player-alert-bumpdown")
        }
        var T = 2e3,
            E = 4500,
            L = null,
            P = Nt.touch ? E : T,
            C = !0,
            A = !0,
            O = !1,
            M = null,
            F = null,
            I = [],
            q = !1,
            R = null,
            B = null,
            D = !0,
            N = !1,
            j = !1,
            V = !1,
            H = 1.75,
            U = t.querySelector(".target"),
            z = t.querySelector(".sidedock"),
            W = t.querySelector(".controls"),
            X = t.querySelector(".title"),
            K = t.querySelector(".video"),
            $ = e.config.embed.autoplay && e.config.request.flags.autohide_controls;
        return d(), l(), f(), h(), v(), p(), m(), g(), {}
    }

    function Qe(e, t) {
        function n() {
            return t.classList.contains("overflow") ? void t.classList.remove("overflow") : void(t.clientHeight < t.clientHeight && t.classList.add("overflow"))
        }

        function i(e) {
            if (!e) return {};
            var t = window.getComputedStyle(e);
            if (!t) return {};
            var n = t.width,
                i = t.height;
            return {
                width: n,
                height: i
            }
        }

        function r(e, t) {
            return e && t ? parseInt(e, 10) + "×" + parseInt(t, 10) + " " + p() : ""
        }

        function o() {
            t.classList.add("hidden"), t.setAttribute("hidden", ""), t.setAttribute("aria-hidden", "true")
        }

        function a() {
            t.classList.remove("hidden"), t.removeAttribute("hidden"), t.setAttribute("aria-hidden", "false"), n()
        }

        function s() {
            return Object.keys(e.config.request.ab_tests).map(function(t) {
                return t + ": " + e.config.request.ab_tests[t].group
            }).join(", ")
        }

        function c(t) {
            return new ut(function(n, i) {
                var r = JSON.stringify(t);
                if (window.btoa) {
                    var o = window.btoa(unescape(encodeURIComponent(r)));
                    return void n("https://" + e.config.player_url + "/debug?v=" + o)
                }
                var a = new XMLHttpRequest;
                a.open("POST", "https://" + e.config.player_url + "/debug", !0), a.onload = function() {
                    var e = JSON.parse(a.responseText);
                    n(e)
                }, a.onerror = function() {
                    i(new Error("XHR error"))
                }, a.send(r)
            })
        }

        function u(e) {
            return e.graphEvents.length > 1 || (e.graphSpeeds.length > 0 && e.graphSpeeds[0].length > 0 || e.graphLines.length > 0 && e.graphLines[0].length > 0)
        }

        function d() {
            var t = {
                sessionId: e.config.request.session,
                clipId: D.textContent,
                playing: j.textContent,
                dimensions: V.textContent,
                cdn: H.textContent,
                ua: navigator.userAgent,
                referrer: e.config.request.referrer,
                country: e.config.request.country,
                graphEvents: E,
                graphLines: T,
                graphSpeeds: S.map(function(e) {
                    return e.map(function(e) {
                        return {
                            speed: Math.round(e.speed) / 1e3,
                            time: Math.round(100 * e.time) / 100
                        }
                    })
                }),
                duration: e.telecine.duration
            };
            e.config.request.ab_tests && (t.testGroup = s()), N && (t.profileId = N.textContent), K && (t.droppedFrames = K.textContent), z && (t.bandwidth = {
                avg: z.textContent,
                min: W.textContent,
                max: X.textContent
            }), c(t).then(function(n) {
                $.value = n, Y.href = n;
                var i = u(t);
                try {
                    delete t.ua, delete t.graphEvents, delete t.graphLines, delete t.graphSpeeds
                } catch (e) {}
                t.debugLink = n;
                var r = "";
                if (i) {
                    var o = e.reportMessage("Debug info copied", {
                        level: "info",
                        extra: t
                    });
                    r += "&sentryId=" + o
                }
                return window.open("" + n + r), n
            }).catch(function(e) {
                f(Y, "Error!"), clearTimeout(G), G = setTimeout(function() {
                    f(Y, "Open link")
                }, 2e3)
            })
        }

        function l() {
            var n = e.telecine.currentFile;
            if (n) {
                var a = n.metadata,
                    c = e.telecine.currentScanner,
                    u = "MediaSourceScanner" === c;
                Q = t.parentElement.querySelector("video");
                var l = i(Q),
                    f = l.width,
                    h = l.height;
                L = r(f, h);
                var v = {
                    clipId: e.config.video.id,
                    scanner: c,
                    cdn: a.cdn,
                    delivery: ft[e.telecine.video.currentFile.mime],
                    resolution: "" + a.quality + (a.fps ? "@" + a.fps : ""),
                    dimensions: L,
                    displayProfile: u,
                    displayBandwidth: u,
                    displayDroppedFrames: u,
                    displayAudioVideoStream: u
                };
                v.displayAudioVideoStream && (v.separateAudioVideo = e.config.request.files.dash.separate_av), e.config.request.ab_tests && (v.testGroup = s()), t.innerHTML = At.render("stats_debug", v), D = t.querySelector(".stats-debug-clip-id"), N = t.querySelector(".stats-debug-profile-id"), j = t.querySelector(".stats-debug-resolution"), V = t.querySelector(".stats-debug-dimensions"), H = t.querySelector(".stats-debug-cdn"), U = t.querySelector(".stats-debug-time-series"), z = t.querySelector(".stats-debug-bandwidth"), W = t.querySelector(".stats-debug-bandwidth-min"), X = t.querySelector(".stats-debug-bandwidth-max"), K = t.querySelector(".stats-debug-dropped-frames"), Y = t.querySelector(".stats-debug-copy"), $ = t.querySelector(".stats-debug-code"), x(t, ".stats-debug-close", o), x(t, ".stats-debug-copy", function() {
                    return d(), !1
                }), B = !0
            }
        }

        function f(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "textContent";
            if (e && e.parentElement) {
                var i = e.parentElement;
                window.requestAnimationFrame(function() {
                    return "undefined" == typeof t ? void(i.style.display = "none") : (i.style.display = "block", void(e[n] = t))
                })
            }
        }

        function h(e, t, n) {
            return Math.min(Math.max(e, t), n)
        }

        function v(t, n) {
            var o = 200,
                a = 14;
            if (t !== ee) {
                ee = t, t > J && (J = t, f(X, Math.floor(t / 1e3).toLocaleString() + " Kbps")), t < Z && (Z = t, f(W, Math.floor(t / 1e3).toLocaleString() + " Kbps"));
                var s = e.telecine.currentTime;
                S[q].push({
                    speed: t,
                    time: s
                })
            }
            var c = '<svg width="' + o + '" height="' + a + '" viewBox="0 0 ' + o + " " + a + '">',
                u = S[q].map(function(t) {
                    var n = t.time / e.telecine.duration * o,
                        i = a - a * t.speed / J;
                    return isNaN(i) && (i = 0), n + "," + h(i, 0, a)
                });
            if (ne) {
                var d = {
                    time: e.telecine.currentTime,
                    color: ne,
                    type: ie[ne]
                };
                switch (d.type) {
                    case "resize":
                        var l = i(Q),
                            v = r(l.width, l.height);
                        L = v, d.title = "Resized from " + L + " to " + v;
                        break;
                    case "downswitch":
                    case "upswitch":
                        d.title = "Switched from " + P + " to " + C;
                        break;
                    case "currentfilechange":
                        d.title = "CDN to " + O + "/" + F, A && (d.title = "CDN from " + A + "/" + M + " to " + O + "/" + F);
                        break;
                    case "scannerchange":
                        d.title = "Scanner change to " + I;
                        break;
                    default:
                        d.title = ie[ne]
                }
                T[q].push(d), ne = !1
            }
            return T[q].forEach(function(t) {
                var n = t.time,
                    i = t.color,
                    r = t.title,
                    s = n / e.telecine.duration * o,
                    u = "<g>";
                u += "<title>" + r + "</title>", u += '<line x1="' + s + '" y1="0" x2="' + s + '" y2="' + a + '" stroke-width="1" stroke="' + i + '" />', u += "</g>", c += u
            }), c += "<g>", c += '<polyline stroke="white" fill="none" points="', c += u.join(" "), c += '"></polyline>', c += "</g></svg></span></span>"
        }

        function p() {
            return window.devicePixelRatio && window.devicePixelRatio > 1 ? "@" + window.devicePixelRatio + "x" : ""
        }

        function m(e, t) {
            q += 1, S.push([]), T.push([]), E.push([{
                title: e,
                time: Math.round(100 * t) / 100
            }])
        }

        function g(n, o) {
            var a;
            R[n] || (R[n] = []), R[n].length === k && R[n].pop(), B || l(), R[n].unshift(o);
            var s = void 0;
            switch (n) {
                case "resize":
                    return ne = re.resize, s = i(Q), e.events.fire(mt.resize, s), void f(V, "" + r(s.width, s.height));
                case "streamchange":
                    var c = o.index,
                        u = o.streams,
                        d = u[c],
                        h = e.config.request.files.dash.cdn,
                        p = e.config.request.files.dash.streams[c].profile;
                    return te !== d.bitrate && (null !== te && (ne = re.upswitch, d.bitrate < te && (ne = re.downswitch)), te = d.bitrate), P !== C && (P = C), Q || (Q = t.querySelector("video")), C = d.width + "×" + d.height + "@" + Math.round(d.framerate) + " " + Math.round(d.bitrate / 1e3).toLocaleString() + " Kbps", f(j, C), s = i(Q), f(V, "" + r(s.width, s.height)), f(H, h), void f(N, p);
                case "scannerchange":
                    return ne = re.scannerchange, I = e.telecine.currentScanner, void l();
                case "streamtargetchange":
                    var g = e.config.request.files.dash.streams[o.index],
                        y = [g, o.index, o.streams];
                    return void(a = e.events).fire.apply(a, [mt.streamTargetChange].concat(y));
                case "bandwidth":
                    var _ = o.speed,
                        b = o.bitrate;
                    f(z, Math.floor(_ / 1e3).toLocaleString() + " Kbps");
                    var w = v(_, b);
                    return void f(U, w, "innerHTML");
                case "droppedframes":
                    var S = o.dropped,
                        x = o.total;
                    return void f(K, S.toLocaleString() + " / " + x.toLocaleString());
                case "seeked":
                case "ended":
                    return void m(n, e.telecine.currentTime);
                case "currentfilechange":
                    return ne = re.currentfilechange, A !== O && (A = O), M !== F && (M = F), O = e.telecine.currentFile.metadata.cdn, void(F = ft[e.telecine.video.currentFile.mime])
            }
        }

        function y() {
            e.events.on(mt.debugButtonPressed, function() {
                return t.classList.contains("hidden") ? void a() : void o()
            })
        }

        function _() {
            e.events.on(mt.configChanged, function(e) {
                window.requestAnimationFrame(l)
            })
        }

        function b() {
            ["streamchange", "droppedframes", "bandwidth", "scannerchange", "streamtargetchange", "seeked", "ended", "currentfilechange"].forEach(function(t) {
                e.telecine.on(t, function(e) {
                    return g(t, e)
                })
            })
        }

        function w() {
            kt(window).on("resize", function() {
                g("resize"), n()
            })
        }
        var k = 100,
            S = [
                []
            ],
            T = [
                []
            ],
            E = [],
            L = void 0,
            P = void 0,
            C = void 0,
            A = void 0,
            O = void 0,
            M = void 0,
            F = void 0,
            I = void 0,
            q = 0,
            R = {},
            B = !1,
            D = void 0,
            N = void 0,
            j = void 0,
            V = void 0,
            H = void 0,
            U = void 0,
            z = void 0,
            W = void 0,
            X = void 0,
            K = void 0,
            $ = void 0,
            Y = void 0,
            G = void 0,
            Q = void 0,
            J = Number.NEGATIVE_INFINITY,
            Z = Number.POSITIVE_INFINITY,
            ee = -1,
            te = null,
            ne = !1,
            ie = {
                "#FB5454": "downswitch",
                "#54FB54": "upswitch",
                "#F9FF4B": "resize",
                "#42d1f4": "currentfilechange",
                "#ff0000": "scannerchange"
            },
            re = {
                downswitch: "#FB5454",
                upswitch: "#54FB54",
                resize: "#F9FF4B",
                currentfilechange: "#42d1f4",
                scannerchange: "#ff0000"
            };
        l(), y(), _(), b(), w()
    }

    function Je(e, t) {
        function n() {
            return !C && (e.config.view === dt.main || e.config.view === dt.privateUnlocked)
        }

        function r() {
            O && "help" === P && e.events.fire(mt.overlayCloseButtonPressed)
        }

        function o(e) {
            return "number" != typeof e.which && (e.which = e.keyCode), e
        }

        function a(e) {
            if ("keypress" === e.type) {
                var t = String.fromCharCode(e.which);
                return e.shiftKey || (t = t.toLowerCase()), t
            }
            return e.which in jr ? jr[e.which] : String.fromCharCode(e.which).toLowerCase()
        }

        function s(e) {
            return !(e.ctrlKey || e.metaKey || e.altKey) && (e.which in jr ? "keydown" === e.type : "keypress" === e.type)
        }

        function c(e) {
            var t = e.target || e.srcElement;
            return "INPUT" === t.tagName || "SELECT" === t.tagName || "TEXTAREA" === t.tagName || t.isContentEditable
        }

        function u(t) {
            if (t = Array.isArray(t) ? t : [t], O && "help" === P) {
                if (e.events.fire(mt.overlayCloseButtonPressed), t[0] === pt.showOverlay && "help" === t[1]) return !1;
                if (t[0] !== pt.openVimeo) return setTimeout(function() {
                    e.events.fire.apply(null, t)
                }, 250), !1
            }
            return e.events.fire.apply(null, t), !1
        }

        function d(t, n) {
            if (!D) {
                n && !e.telecine.paused && e.events.fire(mt.pauseButtonPressed);
                var i = !0;
                e.events.fire(mt.scrubbingStarted, i), D = !0
            }
            h(B), B++, 1 === B && (R = e.config.video.fps);
            var r = n ? 1 : R,
                o = "right" === t ? r : -r,
                a = Math["right" === t ? "ceil" : "floor"](e.telecine.currentTime * e.config.video.fps);
            l(a + o)
        }

        function l(t) {
            var n = null,
                i = t / e.config.video.fps;
            e.events.fire(pt.seek, n, i)
        }

        function f(t) {
            R = F, B = 0;
            var n = t.shiftKey;
            e.events.fire(mt.scrubbingEnded, n), D = !1
        }

        function h(e) {
            var t = e,
                n = Math.ceil(F),
                i = Math.ceil(I - F),
                r = q;
            R = v(t, n, i, r)
        }

        function v(e, t, n, i) {
            return e /= i, e--, n * (e * e * e + 1) + t
        }

        function p(e) {
            var t = M.focusableItems,
                n = t.indexOf(document.activeElement),
                i = "up" === e ? n - 1 : n + 1,
                r = null;
            return r = i >= t.length ? t[0] : i < 0 ? t[t.length - 1] : t[i], !r || (r.focus(), !1)
        }

        function g() {
            return !!M || (document.activeElement && document.activeElement !== document.body ? void 0 : (e.events.fire(mt[e.telecine.paused ? "playButtonPressed" : "pauseButtonPressed"]), r(), !1))
        }

        function y() {
            return M ? (M.element.contains(document.activeElement) && M.button.focus(), M.hide(), !1) : document.activeElement && t.contains(document.activeElement) ? (i(), !0) : O ? (e.events.fire(mt.overlayCloseButtonPressed), !1) : void 0
        }

        function _() {
            if (M) return !M.element.contains(document.activeElement) || p("up");
            if (Nt.spatialPlayback && e.config.video.spatial) return e.telecine.getEffectByName("ThreeSixtyEffect").keyPress("up"), !1;
            if (e.config.embed.on_site && document.activeElement && !t.contains(document.activeElement)) return !0;
            r();
            var n = !1,
                i = !0;
            return e.events.fire(pt.changeVolume, Nr, n, i), !1
        }

        function b() {
            if (M) return !M.element.contains(document.activeElement) || p("down");
            if (Nt.spatialPlayback && e.config.video.spatial) return e.telecine.getEffectByName("ThreeSixtyEffect").keyPress("down"), !1;
            if (e.config.embed.on_site && document.activeElement && !t.contains(document.activeElement)) return !0;
            r();
            var n = !1,
                i = !0;
            return e.events.fire(pt.changeVolume, -Nr, n, i), !1
        }

        function w(t, n) {
            if (M) return !M.element.contains(document.activeElement) || p("left" === n ? "up" : "down");
            if (r(), Nt.spatialPlayback && e.config.video.spatial) return e.telecine.getEffectByName("ThreeSixtyEffect").keyPress(n), !1;
            if (document.activeElement && document.activeElement === A) {
                var i = !1,
                    o = !0,
                    a = "left" === n ? -Nr : Nr;
                return e.events.fire(pt.changeVolume, a, i, o), !1
            }
            return t.shiftKey || 0 === B ? void d(n, t.shiftKey) : void N(n, t.shiftKey)
        }

        function k() {
            e.events.on(mt.overlayOpened, function(e) {
                O = !0, P = e, "notsupported" === e && (C = !0)
            }), e.events.on(mt.overlayClosed, function() {
                O = !1, P = null
            })
        }

        function S() {
            e.events.on(mt.menuVisibilityChanged, function(e, t) {
                M = !!e && t
            })
        }

        function x() {
            e.events.on(mt.configChanged, function(e) {
                e && (C = !1)
            })
        }

        function T() {
            function t(e) {
                if (o(e), s(e) && !c(e) && n()) {
                    var t = a(e);
                    if (t in r) {
                        if ("function" == typeof r[t]) return void(r[t](e, t) === !1 && (e.preventDefault(), e.stopPropagation()));
                        u(r[t]) === !1 && (e.preventDefault(), e.stopPropagation())
                    }
                }
            }

            function i(t) {
                if (o(t), !c(t) && n()) {
                    var i = a(t);
                    return Nt.spatialPlayback && e.config.video.spatial && ("left" === i || "right" === i || "up" === i || "down" === i) ? void e.telecine.getEffectByName("ThreeSixtyEffect").keyUp(i) : void("left" !== i && "right" !== i || f(t))
                }
            }
            var r = {
                l: mt.likeButtonPressed,
                w: mt.watchLaterButtonPressed,
                s: mt.shareButtonPressed,
                c: [mt.ccButtonPressed, !0],
                h: [mt.hdButtonPressed, !0],
                f: mt.fullscreenButtonPressed,
                x: [mt.effectButtonPressed, !0],
                e: [mt.effectButtonPressed, !0],
                d: mt.debugButtonPressed,
                space: g,
                up: _,
                down: b,
                left: w,
                right: w,
                esc: y,
                "?": [pt.showOverlay, "help"]
            };
            e.config.embed.on_site || (r.v = pt.openVimeo), document.addEventListener("keydown", t, !1), document.addEventListener("keypress", t, !1), document.addEventListener("keyup", i, !1)
        }

        function E() {
            e.events.on(mt.becameActive, function() {
                C = !1
            }).on(mt.becameInactive, function() {
                C = !0
            }), e.config.embed.on_site && document.querySelector(".player") === t && (C = !1)
        }

        function L() {
            var e = void 0,
                t = !1;
            document.body.addEventListener("keydown", function(n) {
                9 !== n.which || document.body.classList.contains("showfocus") ? 27 === n.which ? document.body.classList.remove("showfocus") : 32 !== n.which && 13 !== n.which || (t = !0, clearTimeout(e), e = setTimeout(function() {
                    t = !1
                }, 200)) : document.body.classList.add("showfocus")
            }), document.body.addEventListener("click", function(e) {
                t || document.body.classList.remove("showfocus")
            })
        }
        var P, C = !!e.config.embed.on_site,
            A = t.querySelector(".volume"),
            O = !1,
            M = !1,
            F = e.config.video.fps / 5,
            I = Math.max(F, .618 * e.config.video.duration),
            q = 100,
            R = F,
            B = 0,
            D = !1,
            N = m(d, 80);
        return k(), S(), x(), T(), E(), L(), {
            pause: function() {
                C = !0
            },
            unpause: function() {
                C = !1
            }
        }
    }

    function Ze(e, t) {
        function n(e) {
            var n = "watchlater" === e || "unwatchlater" === e ? .5 : .4,
                i = t.clientHeight;
            return t.clientHeight > t.clientWidth && (i = t.clientWidth), {
                height: Math.round(i * n),
                width: Math.round(i * n * 1.6)
            }
        }

        function i(e, t) {
            var n = e.querySelector(".hour-hand"),
                i = e.querySelector(".minute-hand");
            if (n && i) {
                var r = t ? 1 : -1,
                    o = new Date,
                    a = Math.abs(o.getHours() - 12),
                    s = o.getMinutes(),
                    c = s / 60 * 360 - 135,
                    u = a / 12 * 360 + s / 60 * 5,
                    d = 1.5,
                    l = u + 30 * d * r,
                    f = c + 360 * d * r;
                if (Nt.browser.firefox || Nt.browser.opera) {
                    var h = "10 10";
                    n.setAttribute("transform", "rotate(" + u + "," + h + ")"), i.setAttribute("transform", "rotate(" + c + "," + h + ")");
                    var v = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
                    v.setAttribute("attributeName", "transform"), v.setAttribute("type", "rotate"), v.setAttribute("begin", "0.1s"), v.setAttribute("repeatCount", "indefinite");
                    var p = v.cloneNode(!1);
                    p.setAttribute("from", u + " " + h), p.setAttribute("to", u + 360 * r + " " + h), p.setAttribute("dur", "0.8s"), n.appendChild(p);
                    var m = v.cloneNode(!1);
                    m.setAttribute("from", c + " " + h), m.setAttribute("to", c + 360 * r + " " + h), m.setAttribute("dur", "9.6s"), i.appendChild(m)
                } else n.style[Nt.transformProperty + "Origin"] = "46% 81.5%", i.style[Nt.transformProperty + "Origin"] = "25.5% 26.5%", n.style[Nt.transformProperty] = "rotate(" + u + "deg)", i.style[Nt.transformProperty] = "rotate(" + c + "deg)";
                window.requestAnimationFrame(function() {
                    e.classList.add("animate"), Nt.browser.firefox || Nt.browser.opera || window.requestAnimationFrame(function() {
                        n.style[Nt.transformProperty] = "rotate(" + l + "deg)", i.style[Nt.transformProperty] = "rotate(" + f + "deg)"
                    })
                })
            }
        }

        function r(e, r) {
            if (null !== t.parentElement.offsetParent) {
                t.classList.remove("hidden"), t.removeAttribute("hidden"), t.setAttribute("data-name", e);
                var a = n(e),
                    s = "width:" + a.width + "px;height:" + a.height + "px";
                l.style.cssText = s, l.innerHTML = r, "watchlater" !== e && "unwatchlater" !== e || i(l, "watchlater" === e), clearTimeout(d), t.classList.remove("animate"), window.requestAnimationFrame(function() {
                    t.classList.remove("invisible"), d = setTimeout(o, 750)
                })
            }
        }

        function o() {
            t.classList.add("animate"), t.classList.add("invisible")
        }

        function a() {
            t.classList.remove("animate"), t.classList.remove("invisible"), t.classList.add("hidden"), t.setAttribute("hidden", ""), t.removeAttribute("data-name"), l.innerHTML = "", l.classList.remove("filled"), l.classList.remove("animate"), e.events.fire(mt.notificationHidden)
        }

        function s() {
            e.events.on(mt.liked, function(e) {
                e || r("like", At.render("icon_heart"))
            }), e.events.on(mt.unliked, function(e) {
                e || r("unlike", At.render("icon_broken_heart"))
            })
        }

        function c() {
            e.events.on(mt.addedToWatchLater, function(e) {
                e || r("watchlater", At.render("icon_clock"))
            }), e.events.on(mt.removedFromWatchLater, function(e) {
                e || r("unwatchlater", At.render("icon_clock"))
            })
        }

        function u() {
            kt(t).on("transitionend", function(e) {
                l.contains(e.target) && "height" === e.propertyName ? setTimeout(o, 100) : e.target === t && "opacity" === e.propertyName && window.requestAnimationFrame(a)
            })
        }
        var d, l = t.querySelector(".notification");
        return u(), s(), c(), e.events.fire(mt.notificationModuleReady), {}
    }

    function et(e, t) {
        function n(t) {
            if ("vod" === e.config.embed.outro) {
                var n = "undefined" != typeof e.config.video.vod.is_preorder ? e.config.video.vod.is_preorder : !!e.config.video.vod.date_available,
                    i = e.config.video.vod.is_coming_soon,
                    o = e.config.video.vod.date_available_formatted_datetime || e.config.video.vod.date_available,
                    s = "Coming soon to Vimeo On Demand.";
                return i && o && (s = "Coming soon to Vimeo On Demand on " + o + "."), n && (s = "Pre-order now. Watch on " + o + "."), y = {
                    purchased: e.config.user.purchased,
                    title: e.config.video.vod.feature_title,
                    url: e.config.video.vod.url,
                    currency: e.config.request.currency,
                    countries: e.config.video.vod.countries,
                    country: e.config.request.country,
                    buttons: e.config.video.vod.purchase_options,
                    translationMap: e.config.request.dynamic_translation_map,
                    isPreorder: n,
                    isComingSoon: i,
                    releaseDate: o,
                    strings: {
                        watch: n ? "Watch on " + o : "Watch Now",
                        preRelease: s
                    }
                }, void(w === !0 && a())
            }
            S = !0;
            var c = new XMLHttpRequest;
            c.open("GET", "https://" + e.config.player_url + "/video/" + e.config.video.id + "/outro?on_site=" + e.config.embed.on_site + "&type=" + e.config.embed.outro, !0), c.withCredentials = !0, c.onload = function() {
                try {
                    var n = JSON.parse(c.response);
                    y = n.data, "videos" !== n.type && "promoted" !== n.type || (y = {
                        contexts: Array.isArray(y) ? y : [y],
                        owner: e.config.video.owner.id
                    }, r()), "function" == typeof t && t()
                } catch (e) {}
            }, c.send()
        }

        function i(e) {
            for (var t = e.innerHTML; e.scrollHeight > e.clientHeight;) t = t.substring(0, t.length - 1), e.innerHTML = t + "&hellip;"
        }

        function r() {
            for (var e = 0, t = y.contexts.length; e < t; e++)
                for (var n = 0, i = y.contexts[e].videos.length; n < i; n++) {
                    var r = new Image;
                    r.src = y.contexts[e].videos[n].thumbnail
                }
        }

        function o() {
            var e = window.getComputedStyle(g.querySelector("header h1"), null),
                t = e.getPropertyValue("-webkit-line-clamp"),
                n = e.textOverflow;
            if (!t)
                for (var r = g.querySelectorAll("header h1"), o = 0, a = r.length; o < a; o++) "clip" === n ? i(r[o]) : r[o].style.display = "inherit"
        }

        function a() {
            if ("beginning" === e.config.embed.outro) return void e.events.fire(pt.reset);
            if (null === y && !S) return void n(a);
            if (y) {
                if ("videos" === e.config.embed.outro || "promoted" === e.config.embed.outro) {
                    var i = y.contexts.reduce(function(e, t) {
                        return e + t.videos.length
                    }, 0);
                    if (0 === i) return
                }
                y.target = !e.config.embed.on_site, g.innerHTML = At.render("outro_" + ("promoted" === e.config.embed.outro ? "videos" : e.config.embed.outro), y), g.setAttribute("data-type", e.config.embed.outro), t.classList.remove("hidden"), t.removeAttribute("hidden"), _ = !0, "videos" === e.config.embed.outro && o(), window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        t.classList.add("in"), c()
                    })
                })
            }
        }

        function s() {
            _ && (b = !1, _ = !1, window.requestAnimationFrame(function() {
                t.classList.remove("in"), e.events.fire(mt.outroHidden), v()
            }))
        }

        function c() {
            if (!b && t.clientWidth) {
                window.removeEventListener("resize", T), b = !0;
                var n = [];
                if (y.contexts)
                    for (var i = 0; i < y.contexts.length; i++)
                        for (var r = 0; r < y.contexts[i].videos.length; r++) {
                            var o = y.contexts[i].videos[r].id,
                                a = g.querySelector('[data-video-id="' + o + '"]');
                            a && a.clientWidth > 0 && n.push(o)
                        }
                e.events.fire(mt.outroDisplayed, n)
            }
        }

        function u() {
            e.events.on(mt.playProgress, function(e, t, i) {
                w = !1, !S && null === y && e >= t - k && n()
            })
        }

        function d() {
            e.events.on(mt.playInitiated, function() {
                "nothing" !== e.config.embed.outro && "beginning" !== e.config.embed.outro || (y = !1)
            }), e.events.on(mt.ended, function() {
                return e.config.embed.email && 1 === e.config.embed.email.time ? (e.events.fire(pt.showOverlay, "email-capture"), void e.events.once(mt.overlayClosed, function() {
                    return e.events.fire(pt.showOutro)
                })) : void(p = setTimeout(function() {
                    e.events.fire(pt.showOutro)
                }, E))
            }), e.events.on(mt.loadVideo, function() {
                clearTimeout(p)
            }), e.events.on(pt.showOutro, function() {
                e.performDelegateAction(lt.showOutro, function() {
                    w = !0, a()
                })
            }), e.events.on(pt.hideOutro, function() {
                s()
            }), kt(t).on("click", ".videos a", function(t) {
                e.events.fire(mt.outroVideoPressed, parseInt(this.getAttribute("data-video-id"), 10))
            }), kt(t).on("click", '.outro[data-type="link"] h1 > a', function(t) {
                e.events.fire(mt.outroLinkPressed, this.href)
            }), kt(t).on("transitionend", function(e) {
                t.classList.contains("in") || (t.classList.add("hidden"), t.setAttribute("hidden", ""))
            }, !1), e.events.on([mt.played, mt.seeked, mt.scrubbingStarted], s)
        }

        function l() {
            e.events.on(pt.showOverlay, function() {
                setTimeout(function() {
                    t.classList.add("hidden")
                }, 150)
            }), e.events.on(mt.overlayClosed, function() {
                t.classList.contains("in") && t.classList.remove("hidden")
            })
        }

        function f() {
            e.events.on(pt.reset, function() {
                y = null, S = !1
            })
        }

        function h() {
            x(t, ".vod-button", function() {
                var t = this.getAttribute("data-product-id");
                return e.events.fire(mt.vodButtonPressed, t), !1
            }), x(t, ".vod-watch-button", function() {
                if (!("date_available" in e.config.video.vod)) return s(), e.events.fire(mt.vodButtonPressed), !1
            })
        }

        function v() {
            window.removeEventListener("resize", T), window.addEventListener("resize", T)
        }
        var p, g = t.querySelector(".outro"),
            y = null,
            _ = !1,
            b = !1,
            w = !1,
            k = 10,
            S = !1,
            T = m(c, 250),
            E = 250;
        return u(), d(), l(), f(), h(), v(), {}
    }

    function tt() {
        return Vr[Math.floor(Math.random() * Vr.length)]
    }

    function nt(e, t) {
        function n() {
            var e = t.getBoundingClientRect(),
                n = ne.getBoundingClientRect(),
                i = oe.getBoundingClientRect(),
                r = n.bottom + (e.height - n.bottom) / 2;
            return e.height - r - i.height / 2 + "px"
        }

        function o() {
            var e = t.getBoundingClientRect(),
                n = ne.getBoundingClientRect(),
                i = ie.getBoundingClientRect(),
                r = e.height / 2,
                o = n.bottom + (e.height - n.bottom) / 2;
            return {
                top: r - i.height / 2 + "px",
                transform: "translateY(" + (o - r) + "px)"
            }
        }

        function a(r, a) {
            t.setAttribute("data-name", r), ne.innerHTML = a.template, ee = document.activeElement, i(ee), a.modal && l(), a.preventBackgroundClose && t.setAttribute("data-background-close", "false"), a.wrapperClass && t.classList.add(a.wrapperClass), a.icon.type && (a.logo && (oe.classList.remove("hidden"), ie.classList.add("cloaked"), window.requestAnimationFrame(function() {
                oe.innerHTML = At.render("logo"), oe.style.bottom = n()
            })), ie.classList.remove("hidden"), re.innerHTML = a.icon.html, window.requestAnimationFrame(function() {
                var e = o();
                ie.style.top = e.top, ie.style[Nt.transformProperty] = e.transform
            }), t.setAttribute("data-icon", a.icon.type), ie.setAttribute("data-icon", a.icon.type), re.setAttribute("data-icon", a.icon.type), "private-unlocked" === r && re.classList.add("open")), t.classList.add("invisible"), t.classList.remove("hidden"), t.removeAttribute("hidden"), t.classList.add("in"), ce = a, se = r, ae = !0, e.events.fire(mt.overlayOpened, r), ["share", "hd-not-allowed"].indexOf(r) > -1 && v(t), window.requestAnimationFrame(function() {
                t.classList.remove("invisible"), window.requestAnimationFrame(function() {
                    ne.classList.add("in"), te.classList.add("in")
                })
            })
        }

        function s() {
            ne.classList.remove("in"), ne.classList.add("out")
        }

        function c(n) {
            if (!h() && ae) {
                t.removeAttribute("data-background-close"), te.classList.remove("in"), te.classList.add("out"), s(), t.classList.remove("in"), t.classList.add("out"), clearTimeout(J), J = setTimeout(u, 200), n && n.preventDefault && n.preventDefault();
                var i = t.querySelector(".back");
                i && i.classList.add("cloaked"), e.events.fire(mt.overlayClosed, se), ae = !1, se = null, ce = null, window.requestAnimationFrame(function() {
                    ee && (r(ee), ee = null)
                })
            }
        }

        function u() {
            t.setAttribute("hidden", ""), t.removeAttribute("data-name"), t.removeAttribute("data-icon"), t.classList.add("hidden"), t.classList.remove("out"), t.classList.remove("embed-active"), t.classList.remove("modal"), t.classList.remove("embed-only"), te.classList.remove("out"), te.classList.remove("in"), ie.removeAttribute("data-icon"), ie.classList.add("hidden"), ie.classList.remove("animate"), re.removeAttribute("data-icon"), re.innerHTML = "", oe.classList.add("hidden"), ne.classList.remove("out"), ne.innerHTML = "", e.events.fire(mt.overlayCleared)
        }

        function l() {
            t.classList.add("modal"), t.setAttribute("data-modal", "true")
        }

        function f() {
            t.setAttribute("data-modal", "false")
        }

        function h() {
            return "true" === t.getAttribute("data-modal")
        }

        function p(e) {
            if ("yes" === e.form.getAttribute("data-bubble")) {
                e.form.setAttribute("data-bubble", "no");
                var n = t.querySelector(".validation-bubble"),
                    i = n.querySelector(".validation-bubble-message");
                i.innerHTML = e.validationMessage || "There is an error with this input.";
                var r = e.getBoundingClientRect(),
                    o = e.form.getBoundingClientRect();
                n.style.left = r.left - o.left + "px", n.style.top = r.height + 1 + "px", n.classList.remove("hidden"), e.focus(), window.requestAnimationFrame(function() {
                    n.classList.add("animate")
                }), m()
            }
        }

        function m(e) {
            var n = t.querySelector(".validation-bubble");
            if (n) {
                if (e) return clearTimeout(Z), void n.classList.remove("animate");
                clearTimeout(Z), Z = setTimeout(function() {
                    n.classList.remove("animate")
                }, 5e3)
            }
        }

        function g(e) {
            var n = t.querySelector("input[type=password]");
            return n.form.classList.contains("submitted") ? (n.setAttribute("aria-invalid", "false"), n.setCustomValidity(""), n.checkValidity && !n.checkValidity() ? (n.setAttribute("aria-invalid", "true"), n.validity.valueMissing && n.setCustomValidity("Please enter the password."), e || p(n), !1) : (m(!0), !0)) : null
        }

        function y() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = e.showBubble,
                i = void 0 === n || n,
                r = t.querySelector("input[type=email]");
            return r.setAttribute("aria-invalid", "false"), r.setCustomValidity(""), r.checkValidity && !r.checkValidity() ? (r.setAttribute("aria-invalid", "true"), r.validity.valueMissing && r.setCustomValidity("Please enter your email."), r.validity.typeMismatch && r.setCustomValidity("Please enter a valid email."), i && p(r), !1) : (m(!0), !0)
        }

        function _(e, n, i) {
            v(t);
            var r = wn(e.querySelectorAll("input")),
                o = r.map(function(e) {
                    return e.name ? encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) : encodeURIComponent(e.value)
                }).join("&"),
                a = new XMLHttpRequest;
            a.open(e.method, e.action + window.location.search, !0), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.withCredentials = !0, a.timeout = 3e3, a.onload = function() {
                var e;
                try {
                    e = JSON.parse(a.responseText)
                } catch (e) {}
                n(e, a)
            }, a.onerror = function(e) {
                i(e)
            }, a.send(o)
        }

        function b() {
            w(), S(), f(), s()
        }

        function w() {
            oe.classList.add("animate")
        }

        function k() {
            oe.classList.add("hidden"), oe.classList.remove("animate")
        }

        function S() {
            ie.classList.remove("cloaked"), ie.classList.add("animate"), window.requestAnimationFrame(function() {
                ie.style[Nt.transformProperty] = "translateY(-10px)"
            })
        }

        function T() {
            ie.classList.add("centered"), ie.style[Nt.transformProperty] = ""
        }

        function E() {
            re.classList.add("open")
        }

        function L() {
            re.classList.add("pulled-back")
        }

        function P() {
            re.classList.add("out"), re.classList.remove("pulled-back")
        }

        function C() {
            kt(t).on("transitionend", ".overlay-logo", function(e) {
                "opacity" === e.propertyName && this.classList.contains("animate") && k()
            }), kt(t).on("transitionend", ".overlay-icon-wrapper", function(e) {
                e.propertyName.indexOf("transform") > -1 && ("" === this.style[Nt.transformProperty] ? (this.classList.remove("centered"), "lock" !== this.getAttribute("data-icon") || re.classList.contains("open") || re.querySelector("canvas") ? L() : setTimeout(E, 100)) : "translateY(-10px)" === this.style[Nt.transformProperty] && T())
            }), kt(t).on("transitionend", ".overlay-icon", function(e) {
                e.propertyName.indexOf("transform") > -1 && (this.classList.contains("out") ? (f(), c()) : this.classList.contains("pulled-back") ? P() : this.classList.contains("open") && L())
            })
        }

        function A() {
            return {
                modal: !1,
                template: null,
                logo: !1,
                icon: {
                    type: null,
                    html: null
                }
            }
        }

        function O(t, n) {
            var i = e.config.video.title,
                r = e.config.video.owner.name,
                o = e.config.video.share_url;
            return t.template = At.render("share", {
                url: e.config.video.url,
                shareUrl: o,
                playerShareUrl: "https://" + e.config.player_url + "/video/" + e.config.video.id + "/share",
                title: i,
                owner: r,
                embed: "public" === e.config.video.embed_permission && e.config.embed.settings.embed,
                embedOnly: e.config.embed.settings.share && e.config.embed.settings.share.embed_only,
                embedCode: e.config.video.embed_code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                copyButton: ue || Nt.flash.installed,
                customizeEmbed: !!e.config.video.url,
                readOnly: !Nt.touch,
                strings: {
                    share: "Share",
                    facebook: "Share on Facebook",
                    twitter: "Share on Twitter",
                    tumblr: "Share on Tumblr",
                    email: "Share via Email",
                    emailSubject: "Check out “" + i + "” from " + r + " on Vimeo",
                    emailBody: "Check out “" + i + "” from " + r + " on Vimeo.\n\nThe video is available for your viewing pleasure at " + o + "\n\nIf you like this video, make sure you share it, too!\n\nVimeo is filled with lots of amazing videos. See more at https://vimeo.com.",
                    embedCode: "Get embed code",
                    embedTitle: "Embed",
                    embedSubtitle: "Add this video to your site with the embed code below.",
                    copy: "Copy",
                    copySuccess: "Copied!",
                    customize: '<a href="' + e.config.video.url + '#embed" target="_blank">Customize this embed</a> on Vimeo'
                }
            }), e.config.embed.settings.share && e.config.embed.settings.share.embed_only && (t.wrapperClass = "embed-only"), t
        }

        function M(t) {
            return t.icon = {
                type: "lock",
                html: At.render("icon_lock")
            }, t.modal = !0, t.logo = !0, t.template = At.render("private_locked", {
                action: "https://" + e.config.vimeo_url + "/log_in",
                strings: {
                    title: "Private Video",
                    subtitle: "Log in to watch (if you have permission)",
                    logIn: "Log in",
                    logInLabel: "Log in (opens in a new window)"
                }
            }), t
        }

        function F(t) {
            return t.icon = {
                type: "lock",
                html: At.render("icon_lock")
            }, t.template = At.render("password", {
                action: "https://" + e.config.player_url + "/video/" + e.config.video.id + "/check-password?referrer=" + e.config.request.referrer,
                strings: {
                    title: "Password Required",
                    subtitle: "If you’ve got it, enter it below.",
                    password: "Password",
                    watch: "Watch Video"
                }
            }), t.modal = !0, t.logo = !!e.config.embed.settings.branding, t
        }

        function I(e) {
            return e.icon = {
                type: "lock",
                html: At.render("icon_lock")
            }, e.template = At.render("private_unlocked", {
                strings: {
                    title: "Private Video",
                    subtitle: "You are logged in and have permission to watch (congrats).",
                    watch: "Watch Video"
                }
            }), e
        }

        function q(e) {
            return e.template = At.render("content_rating", {
                logo: At.render("logo"),
                strings: {
                    title: "Hold up!",
                    subtitle: "This video is hidden because it may contain mature content including: nudity, strong language, and violence.",
                    update: 'You can <a href="">update your mature content filter</a> at any time.',
                    watch: "I still want to watch this video"
                }
            }), e.modal = !0, e
        }

        function R(e, t) {
            return e.template = At.render("error", {
                title: t.title,
                message: t.message
            }), e.modal = !!t.modal, e.logo = !!t.logo, t.icon && "lock" === t.icon && (e.icon = {
                type: "lock",
                html: At.render("icon_lock")
            }), e
        }

        function B(t) {
            return t.template = At.render("help", {
                onSite: e.config.embed.on_site,
                strings: {
                    title: "Keyboard Shortcuts",
                    volumeUp: "Volume up",
                    volumeDown: "Volume down",
                    scrubForward: "Scrub forward",
                    scrubBackwards: "Scrub backwards",
                    like: "Like",
                    share: "Share",
                    watchLater: "Watch Later",
                    captions: "Toggle Captions",
                    hd: "Toggle HD menu",
                    fullscreen: "Toggle fullscreen",
                    viewOnVimeo: "View on Vimeo"
                }
            }), t
        }

        function D(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return t.template = At.render("overlay_email_capture", {
                text: n.text || e.config.embed.email.text,
                subtitle: n.subtitle || "Share your email address with " + e.config.video.owner.name + ".",
                action: "https://" + e.config.player_url + "/video/" + e.config.video.id + "/submit-email",
                confirmation: n.confirmation || e.config.embed.email.confirmation,
                referrer: e.config.request.referrer,
                strings: {
                    email: "Email address",
                    fullName: "Full name (optional)",
                    submit: "Submit"
                }
            }), t.modal = !1, t.logo = !1, t.preventBackgroundClose = !0, t
        }

        function N(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.redirectUrl,
                i = t.title,
                r = t.buttonText,
                o = t.ignoreText,
                a = t.bottomText,
                s = t.newWindow;
            return e.template = At.render("overlay_app_redirect", {
                redirectUrl: n,
                newWindow: s,
                strings: {
                    title: i,
                    buttonText: r,
                    ignoreText: o,
                    bottomText: a
                }
            }), e.modal = !1, e.logo = !1, e.preventBackgroundClose = !0, e
        }

        function j(e) {
            var t = window.getComputedStyle(e),
                n = document.createElement("button");
            n.style.visibility = "hidden", n.style.padding = 0, e.parentElement.appendChild(n), n.innerText = "Copy";
            var i = n.clientWidth;
            n.innerText = "Copied!";
            var r = n.clientWidth,
                o = parseFloat(t.fontSize),
                a = parseFloat(t.paddingLeft),
                s = parseFloat(t.paddingRight),
                c = a + Math.max(i, r) + s;
            return e.parentElement.removeChild(n), (c + 2) / o + "em"
        }

        function V() {
            e.events.on(pt.showOverlay, function(n, i) {
                ue = document.queryCommandSupported && document.queryCommandSupported("copy");
                var r = function() {
                    var e = A();
                    switch (n) {
                        case "share":
                            a(n, O(e, i));
                            var r = t.querySelector(".embed-copy");
                            return void(r && (r.style.width = j(r)));
                        case "private-locked":
                            return void a(n, M(e));
                        case "password":
                            return void a(n, F(e));
                        case "private-unlocked":
                            return void a(n, I(e));
                        case "error":
                            return void a(n, R(e, i));
                        case "help":
                            return void a(n, B(e));
                        case "content-rating":
                            return void a(n, q(e));
                        case "email-capture":
                            return void a(n, D(e, i));
                        case "app-redirect":
                            return void a(n, N(e, i))
                    }
                };
                return ae ? "share" !== se && "help" !== se && "hd-not-allowed" !== se || se !== n ? (e.events.once(mt.overlayCleared, r), f(), void c()) : void c() : void r()
            }), kt(t).on("input", "input", function() {
                this.form.classList.add("interacted")
            }).on(["focus", "blur"], "input", function() {
                m(!0)
            }).on("transitionend", ".validation-bubble", function(e) {
                "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && this.classList.add("hidden")
            }), e.events.on([mt.overlayCloseButtonPressed, mt.played], c), e.events.on(mt.privateUnlocked, function() {
                "private-locked" === se && (f(), c())
            }), e.events.on(mt.configChanged, function() {
                "share" === se && (ce = O(A(), e.config.embed.settings.share.embed_only), ne.innerHTML = ce.template)
            }), kt(window).on("resize", function() {
                if (ae) {
                    oe.style.bottom = n();
                    var e = o();
                    ie.style.top = e.top, ie.style[Nt.transformProperty] = e.transform
                }
            })
        }

        function H() {
            function n() {
                e.events.fire(mt.embedCodeCopied);
                var t = document.querySelector(".embed-copy");
                t.innerHTML = t.getAttribute("data-success-label"), clearTimeout(r), r = setTimeout(function() {
                    t.innerHTML = t.getAttribute("data-label")
                }, 2e3)
            }
            var r;
            kt(t).on("transitionend", ".share-screen", function(e) {
                "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && this.classList.add("cloaked")
            }).on("transitionend", ".embed-screen", function(e) {
                "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && (t.querySelector(".back").classList.add("cloaked"), this.classList.add("cloaked"), v(t))
            }).on("copy", "input[name=embed_code]", function() {
                e.events.fire(mt.embedCodeCopied)
            }), x(t, ".back", function() {
                return t.querySelector(".share-screen").classList.remove("cloaked"), t.classList.remove("embed-active"), !1
            }), x(t, ".facebook", function() {
                return e.events.fire(mt.facebookButtonPressed, this.href), i(), !1
            }), x(t, ".twitter", function() {
                return e.events.fire(mt.twitterButtonPressed, this.href), i(), !1
            }), x(t, ".tumblr", function() {
                return e.events.fire(mt.tumblrButtonPressed, this.href), i(), !1
            }), x(t, ".email", function() {
                return e.events.fire(mt.emailButtonPressed), window.location = this.href, i(), !1
            }), x(t, ".embed", function() {
                return e.events.fire(mt.embedButtonPressed), i(), !1
            }), x(t, ".embed-copy", function() {
                if (ue) {
                    var e = document.querySelector("input[name=embed_code]");
                    e.select();
                    try {
                        document.execCommand("copy") && n()
                    } catch (e) {}
                    return document.activeElement.blur(), !1
                }
            }), Nt.touch ? kt(ne).on("focus", "input[name=embed_code]", function() {
                var e = this;
                setTimeout(function() {
                    e.setSelectionRange(0, 9999), e.setAttribute("readonly", "readonly")
                }, 0)
            }).on("blur", "input", function() {
                this.removeAttribute("readonly")
            }) : kt(ne).on("click", "input[name=embed_code]", function() {
                this.setSelectionRange(0, 9999)
            }), e.events.on(mt.facebookButtonPressed, function(e) {
                d(e, "facebook", {
                    width: 580,
                    height: 400
                })
            }).on(mt.twitterButtonPressed, function(e) {
                d(e, "twitter", {
                    width: 550,
                    height: 420
                })
            }).on(mt.tumblrButtonPressed, function(e) {
                d(e, "tumblr", {
                    width: 540,
                    height: 600
                })
            }).on(mt.embedButtonPressed, function() {
                function i() {
                    var t = document.querySelector(".embed-copy"),
                        i = new ZeroClipboard(t, {
                            moviePath: e.config.request.urls.zeroclip_swf,
                            trustedDomains: ["*"],
                            allowScriptAccess: "always"
                        });
                    i.on("complete", n)
                }
                if (e.config.embed.settings.share.embed_only || (t.querySelector(".back").classList.remove("cloaked"), t.querySelector(".embed-screen").classList.remove("cloaked"), t.classList.add("embed-active")), !ue && Nt.flash.installed) {
                    var r = "zc_script_loaded";
                    if (!document.getElementById(r)) {
                        var o, a = document.createElement("script");
                        return a.setAttribute("id", r), a.setAttribute("src", e.config.request.urls.zeroclip_js), a.onreadystatechange = a.onload = function() {
                            o || i(), o = !0
                        }, void document.getElementsByTagName("head")[0].appendChild(a)
                    }
                    i()
                }
            })
        }

        function U() {
            kt(ne).on("click", ".popup", function() {
                return e.events.fire(pt.openPopup, "login-private-locked"), !1
            })
        }

        function z() {
            function t(t) {
                function n(t, n) {
                    return t === !1 ? void i(n.status, n) : (e.events.fire(mt.passwordUnlocked, t), "icon-hidden" === window.getComputedStyle(te, ":after").content ? (f(), void c()) : void b())
                }

                function i(e) {
                    a.classList.remove("loading"), o.setCustomValidity("Uh oh. There was a problem. Please try again."), o.setAttribute("aria-invalid", "true"), p(o)
                }
                var r = g();
                if (!r) return !1;
                var o = t.querySelector("input[type=password]"),
                    a = t.querySelector("input[type=submit]");
                a.classList.add("loading"), _(t, n, i)
            }
            kt(ne).on("click", ".password input[type=submit]", function() {
                this.form.classList.add("submitted"), this.form.setAttribute("data-bubble", "yes"), g(!0)
            }).on("submit", ".password form", function() {
                return t(this), !1
            }).on(["focus", "input"], [".password input[type=email]", ".password input[type=password]"], function() {
                g()
            })
        }

        function W() {
            x(ne, ".unlocked button", function() {
                b(), Nt.iPad || Nt.iPhone || e.events.once(mt.overlayCleared, function() {
                    e.events.fire(mt.playButtonPressed)
                })
            })
        }

        function X() {
            x(ne, ".content-rating button", function() {
                f(), c()
            })
        }

        function K() {
            function t() {
                var e = ne.querySelector(".email-capture-form"),
                    t = ne.querySelector(".email-capture-confirm");
                e.classList.add("invisible"), t.classList.remove("hidden"), window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        t.classList.add("in"), setTimeout(c, 2750)
                    })
                })
            }

            function n(n) {
                function i(n, i) {
                    return n === !1 ? void r(i.status, i) : (e.events.fire(mt.emailCaptureSuccess), void t())
                }

                function r(e) {
                    a.classList.remove("loading"), o.setCustomValidity("Uh oh. There was a problem. Please try again."), o.setAttribute("aria-invalid", "true"), p(o)
                }
                if (!y()) return !1;
                var o = n.querySelector("input[type=email]"),
                    a = n.querySelector("input[type=submit]"),
                    s = {
                        signature: "signature",
                        time: "timestamp",
                        expires: "expires"
                    };
                Object.keys(s).forEach(function(t) {
                    var i = n.querySelector("input[name=" + t + "]");
                    i.value = e.config.request[s[t]]
                }), a.classList.add("loading"), _(n, i, r)
            }
            kt(ne).on("click", ".email-capture input[type=submit]", function() {
                this.form.classList.add("submitted"), this.form.setAttribute("data-bubble", "yes"), y()
            }).on("submit", ".email-capture form", function() {
                return e.events.fire(mt.emailCaptureSubmitted), n(this), !1
            }).on(["focus", "input"], ".email-capture input[type=email]", function() {
                y({
                    showBubble: !1
                })
            })
        }

        function $() {
            e.events.on(mt.stereoscopicButtonPressed, function() {
                e.events.fire(pt.showOverlay, "app-redirect", {
                    redirectUrl: e.doNotTrackEnabled ? "https://play.google.com/store/apps/details?id=com.vimeo.android.videoapp&hl=en" : Te(e.config.video.id, "player-spatial-redirect"),
                    title: "Headset viewing isn’t currently supported in mobile browsers.",
                    buttonText: "Watch in the Vimeo app",
                    ignoreText: null,
                    bottomText: null,
                    newWindow: !e.config.embed.on_site
                })
            }), kt(ne).on("click", ".app-redirect-ignore", function() {
                c()
            }), kt(ne).on("click", "[data-new-window]", function(e) {
                return window.open(document.querySelector(".app-redirect-button").getAttribute("href")), !1
            })
        }

        function Y() {
            var t = function(e, t, n) {
                var i = window.location.search.indexOf("partypooper=1") > -1 || window.location.search.indexOf("fun=0") > -1;
                switch (e) {
                    case "not-supported":
                        return {
                            name: "notsupported",
                            title: i ? "Sorry" : tt(),
                            message: n > .5 ? "There was an issue playing this video." : "This video can’t be played with your current setup."
                        };
                    default:
                        return {
                            name: e,
                            title: t && t.title || "Sorry",
                            message: t && t.message || "There was an issue with playback."
                        }
                }
            };
            e.events.on(mt.error, function(n) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    modal: !0,
                    final: !0
                };
                if (i.final !== !1) {
                    var r = e.telecine ? e.telecine.currentTime : 0,
                        o = t(n, i, r),
                        s = o.name,
                        u = o.title,
                        d = o.message,
                        l = A();
                    return l.modal = i.modal, l.template = At.render("error", {
                        title: u,
                        message: d
                    }), ae ? (c(), void e.events.once(mt.overlayClosed, function() {
                        return a(s, l)
                    })) : void a(s, l)
                }
            })
        }

        function G() {
            e.events.on(mt.configChanged, function() {
                window.requestAnimationFrame(function() {
                    f(), c()
                })
            })
        }

        function Q() {
            x(t, ".close", function() {
                e.events.fire(mt.overlayCloseButtonPressed)
            }), kt(t).on(["click", "touchend"], [".window-wrapper", ".share-wrapper", ".overlay-logo"], function(e) {
                e.stopPropagation()
            }).on(["click", "touchend"], [".overlay-cell", "nav"], function() {
                return "false" === t.getAttribute("data-background-close") || (e.events.fire(mt.overlayCloseButtonPressed), !1)
            })
        }
        var J, Z, ee, te = t.querySelector(".overlay-cell"),
            ne = t.querySelector(".overlay"),
            ie = t.querySelector(".overlay-icon-wrapper"),
            re = ie.querySelector(".overlay-icon"),
            oe = t.querySelector(".overlay-logo"),
            ae = !1,
            se = null,
            ce = null,
            ue = !1;
        return V(), C(), H(), $(), U(), z(), W(), X(), K(), Y(), G(), Q(), e.events.fire(mt.overlayModuleReady), {}
    }

    function it(e, n) {
        function i(e, t) {
            var n = ".player-" + u + " ",
                i = n + e.join("," + n);
            if (t) {
                var r = d + " ";
                i += "," + r + e.join("," + r)
            }
            return l && (i = i.replace(/:hover/g, ":active")), i = i.replace(/ &/g, "")
        }

        function r() {
            var e = document.createElement("style");
            return e.setAttribute("data-player", u), document.querySelector("head").appendChild(e), f = e.sheet
        }

        function o() {
            for (; f.cssRules.length > 0;) f.deleteRule(0)
        }

        function a() {
            f ? o() : r()
        }

        function s(e) {
            a();
            var n = e.complement,
                r = new ie(23, 35, 34, .75),
                o = new ie(0, 0, 0, .15),
                s = o.overlayOn(e);
            r.contrast(n).ratio < 3 && n.lighten(5, 3, r);
            var c, u = e.lightness < 40 ? e.clone().lighten(15, 3, e) : e.clone().darken(15, 3, e);
            return t(i(Hr, !0), "color:" + e.hex + " !important", f), t(i(Ur, !0), "color:" + n.hex + " !important", f), t(i(zr), "color:" + e.hex, f), t(i(Kr), "fill:" + e.hex, f), t(i(Yr), "stroke:" + e.hex, f), t(i(Qr), "background-color:" + e.hex, f), t(i(Jr), "border-color:" + e.hex, f), t(i(Wr), "color:" + n.hex, f), t(i(Xr), "fill:" + n.hex, f), t(i($r), "fill:" + u.hex, f), t(i(Gr), "stroke:" + u.hex, f), t(i(oo), "border-color:" + s.hex, f), t(i(ao), "background-color:" + s.hex, f), e.luminance > .95 && (n = e.clone().darken(15, 3, e), t(i(Zr), "color:" + n.hex, f), t(i(eo), "fill:" + n.hex, f), t(i(to), "stroke:" + n.hex, f), u = n.clone().darken(15, 3, n), t(i($r), "fill:" + u.hex, f), t(i(Gr), "stroke:" + u.hex, f)), e.yiq > 175 && e.luminance < .95 && (c = u.clone().darken(15, 3, u), t(i($r), "fill:" + c.hex, f), t(i(Gr), "stroke:" + c.hex, f), t(i(no), "color:" + u.hex, f), t(i(io), "fill:" + u.hex, f), t(i(ro), "stroke:" + u.hex, f)), {
                main: e.hex,
                selected: u.hex,
                sidedockHover: c ? u.hex : e.luminance > .95 ? n.hex : ie.white.hex,
                sidedockSelected: e.luminance > .95 ? n.hex : e.hex,
                sidedockSelectedHover: c ? c.hex : u.hex
            }
        }

        function c() {
            e.events.on(pt.changeColor, function(t) {
                var n;
                try {
                    n = new ie(t)
                } catch (e) {
                    n = new ie("00adef")
                }
                var i = s(n);
                e.config._colors = i, e.config.embed.color = i.main.replace("#", ""), e.events.fire(mt.colorChanged, e.config.embed.color)
            }), e.events.fire(pt.changeColor, e.config.embed.color)
        }
        var u = n.uuid,
            d = n.id,
            l = n.isMobileDevice,
            f = null;
        return c(), {}
    }

    function rt(e) {
        function t() {
            e.events.on(pt.openPopup, function(t, n) {
                var i = "https://" + e.config.player_url,
                    o = i + "/video/" + e.config.video.id,
                    a = 670,
                    s = 545;
                switch (t) {
                    case "login-like":
                        r = d(o + "/login/like", "login", {
                            width: a,
                            height: s
                        }), e.events.fire(mt.popupOpened, t);
                        break;
                    case "login-watch-later":
                        r = d(o + "/login/watch-later", "login", {
                            width: a,
                            height: s
                        }), e.events.fire(mt.popupOpened, t);
                        break;
                    case "login-private-locked":
                        r = d(o + "/login/private", "login", {
                            width: a,
                            height: s
                        }), e.events.fire(mt.popupOpened, t);
                        break;
                    case "purchase":
                        var c = i + "/video/" + (e.config.video.vod.feature_id || e.config.video.id) + "/purchase/vod";
                        n && n.productId && (c += "/" + n.productId), c += "?referrer=" + encodeURIComponent(e.config.request.referrer), r = d(c, "purchase", {
                            width: 790,
                            height: 670
                        }), e.events.fire(mt.popupOpened, t)
                }
            }), window.closePopup = function(t) {
                if (r) {
                    try {
                        r.close(), e.events.fire(mt.popupClosed, t)
                    } catch (e) {}
                    r = null
                }
            }
        }

        function n() {
            e.config.embed.on_site || (window.confirmPurchase = function(t, n, i) {
                return n ? void e.loadVideo(t) : void(i && e.events.fire(mt.playButtonPressed))
            })
        }

        function i() {
            e.config.embed.on_site || (window.confirmLoginAction = function(t, n) {
                e.events.fire(mt.userLogIn, n)
            })
        }
        var r = null;
        return t(), n(), i(), {}
    }

    function ot(e, t) {
        function n() {
            D && (Y || (N && $ || V || z || Q) && (j || (!H && !U || V || z) && (D = !1, e.events.fire(mt.sidedockVisibilityChanged, D), (G || t).classList.add("invisible"))))
        }

        function i() {
            if (!D && !z && !V) {
                var n = G || t;
                n.classList.add("invisible"), n.classList.remove("hidden"), n.removeAttribute("hidden"), t.classList.remove("hidden"), t.removeAttribute("hidden"), t.classList.contains("vod") && t.classList.remove("vod"), setTimeout(function() {
                    D = !0, e.events.fire(mt.sidedockVisibilityChanged, D), n.classList.remove("invisible")
                }, 0)
            }
        }

        function r() {
            N = !1, j = !1, Y = !1
        }

        function o(t, n, i) {
            var r = "data-label-" + i,
                o = "add" !== i || e.config.user.logged_in ? r : "data-label-add-logged-out";
            t.setAttribute("aria-label", t.getAttribute(o)), n.classList.add("hidden"), n.setAttribute("hidden", ""), n.firstChild.innerHTML = t.getAttribute(r)
        }

        function a() {
            var e = W.indexOf(this);
            X.forEach(function(t, n) {
                n !== e && t && t.classList.add("invisible")
            }), e >= 0 && X[e] && (X[e].classList.add("invisible"), X[e].classList.remove("hidden"), X[e].removeAttribute("hidden", ""), K = window.requestAnimationFrame(function() {
                K = window.requestAnimationFrame(function() {
                    X[e].classList.remove("invisible"), X[e].classList.add("visible")
                })
            }))
        }

        function s() {
            var e = "BUTTON" === this.tagName ? this : this.querySelector("button"),
                t = W.indexOf(e);
            t >= 0 && X[t] && (K && (window.cancelAnimationFrame(K), K = null), X[t].classList.add("invisible"))
        }

        function c() {
            if (C) {
                var e = C.parentElement;
                G.insertBefore(e, G.firstChild)
            }
        }

        function u() {
            if (C) {
                var e = C.parentElement;
                t.insertBefore(e, G)
            }
        }

        function d() {
            if (e.config.view === dt.main || e.config.view === dt.privateUnlocked) {
                var n = e.config.embed.settings,
                    i = e.config.video.vod && "purchase_options" in e.config.video.vod && e.config.video.vod.purchase_options.length,
                    r = i && e.config.video.vod.is_coming_soon,
                    o = "ondemand.main" === e.config.embed.context,
                    a = e.config.video.vod && e.config.user.purchased ? 1 : 0,
                    s = i && n.vod && w(e.config.video.vod.countries, e.config.request.country);
                s && r && o && (s = !1);
                var u = i && e.config.video.vod.purchase_options[0],
                    d = null;
                u && (d = _(e.config.request.dynamic_translation_map, "label_string", e.config.request.currency, u)), t.innerHTML = At.render("sidedock", {
                    loggedIn: !!e.config.user.logged_in,
                    vodButton: s,
                    purchased: a,
                    vodPurchaseInfo: u,
                    vodDisplayLabel: d,
                    likeButton: n.like,
                    liked: e.config.user.liked,
                    watchLaterButton: n.watch_later,
                    addedToWatchLater: e.config.user.watch_later,
                    collectionsButton: n.collections,
                    shareButton: n.share,
                    strings: {
                        like: "Like",
                        likeLoggedOut: "Like (opens in a new window)",
                        unlike: "Unlike",
                        watchLaterAdd: "Add to Watch Later",
                        watchLaterAddLoggedOut: "Add to Watch Later (opens in a new window)",
                        watchLaterRemove: "Remove from Watch Later",
                        collections: "Add to collections",
                        share: n.share && n.share.embed_only ? "Embed" : "Share"
                    }
                }), C = t.querySelector(".vod-button"), s && (G = t.querySelector(".sidedock-inner"), a && c());
                var l = G || t;
                i && s && !e.config.embed.settings.instant_sidedock ? t.classList.add("vod") : Nt.touch && (D = !0, e.events.fire(mt.sidedockVisibilityChanged, D), l.classList.remove("hidden"), l.removeAttribute("hidden"), l.classList.remove("invisible")), A = t.querySelector(".like-button"), O = t.querySelector(".like-label"), M = t.querySelector(".watch-later-button"), F = t.querySelector(".watch-later-label"), I = t.querySelector(".collections-button"), q = t.querySelector(".collections-label"), R = t.querySelector(".share-button"), B = t.querySelector(".share-label"), W = [C, A, M, R, I], X = [null, O, F, B, q]
            }
        }

        function l() {
            var t = e.config.embed.settings.instant_sidedock,
                n = e.config.video.vod,
                r = n && "purchase_options" in n && n.purchase_options.length,
                o = n && w(e.config.video.vod.countries, e.config.request.country);
            (t || r && o) && (Q || i())
        }

        function f() {
            x(t, ".vod-button", function() {
                var t = C.getAttribute("data-product-id");
                e.events.fire(mt.vodButtonPressed, t)
            }, s), e.events.on(mt.outroDisplayed, function() {
                c()
            }), e.events.on(mt.outroHidden, function() {
                u()
            })
        }

        function h() {
            x(t, ".like-button", function() {
                e.events.fire(mt.likeButtonPressed)
            }, s), e.events.on(mt.liked, function() {
                A && (A.classList.add("on"), o(A, O, "remove"))
            }), e.events.on(mt.unliked, function() {
                A && (A.classList.remove("on"), o(A, O, "add"))
            })
        }

        function v() {
            x(t, ".watch-later-button", function() {
                e.events.fire(mt.watchLaterButtonPressed)
            }, s), e.events.on(mt.addedToWatchLater, function() {
                M && (M.classList.add("on"), o(M, F, "remove"))
            }), e.events.on(mt.removedFromWatchLater, function() {
                M && (M.classList.remove("on"), o(M, F, "add"))
            })
        }

        function p() {
            x(t, ".collections-button", function() {
                e.events.fire(mt.collectionsButtonPressed)
            }, s)
        }

        function m() {
            x(t, ".share-button", function() {
                return e.events.fire(e.config.embed.settings.share.embed_only ? mt.embedButtonPressed : mt.shareButtonPressed), !1
            }, s)
        }

        function g() {
            var e = function(e) {
                "opacity" === e.propertyName && e.target.classList.contains("invisible") && (e.target.classList.add("hidden"), e.target.setAttribute("hidden", ""), e.target.classList.remove("visible"))
            };
            kt(t).on("blur", "button", s).on("mouseleave", ".box", s).on(["focus", "pointerdown", "touchstart", "mouseenter"], "button", a).on("transitionend", "label", e), x(t, "label", function() {
                var e = X.indexOf(this);
                e >= 0 && W[e].click()
            })
        }

        function y() {
            e.events.on([mt.mousedOut, mt.mouseTimeout], n).on(mt.mousedOver, i).on(mt.targetTimeReached, function() {
                $ = !0, n()
            }).on(mt.played, function() {
                N = !0
            }), kt(t).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], function(e) {
                return "pointerType" in e ? void("mouse" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_MOUSE || (j = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(j = "mouseover" === e.type)
            }), kt(t).on("transitionend", function(e) {
                var n = G || t;
                "opacity" === e.propertyName && n.classList.contains("invisible") && (n.classList.add("hidden"), n.setAttribute("hidden", ""), C && n.contains(C) && (t.classList.add("hidden"), t.setAttribute("hidden", "")))
            })
        }

        function b() {
            e.events.on(mt.willEnterFullscreen, function() {
                j = !1, n()
            }).on(mt.didExitFullscreen, function(e) {
                e || (Y = !0)
            })
        }

        function k() {
            e.events.on([mt.airPlayActivated], function() {
                H = !0, i()
            }).on([mt.airPlayDeactivated], function() {
                H = !1
            })
        }

        function S() {
            e.events.on(mt.pictureInPictureActivated, function() {
                U = !0, i()
            }).on(mt.pictureInPictureDeactivated, function() {
                U = !1
            })
        }

        function T() {
            e.events.on(mt.overlayOpened, function() {
                V = !0, j = !1, n()
            }).on(mt.overlayClosed, function() {
                V = !1, i()
            })
        }

        function E() {
            e.events.on(mt.alertVisibilityChanged, function(e) {
                z = e, e && n()
            })
        }

        function L() {
            e.events.on(mt.configChanged, function() {
                d()
            })
        }

        function P() {
            e.events.on(pt.reset, function() {
                j = !1, $ = !1, n(), r()
            })
        }
        var C, A, O, M, F, I, q, R, B, D = !1,
            N = !1,
            j = !1,
            V = !1,
            H = !1,
            U = !1,
            z = !1,
            W = [],
            X = [],
            K = null,
            $ = !1,
            Y = !1,
            G = null,
            Q = e.config.embed.autoplay && e.config.request.flags.autohide_controls;
        return d(), l(), f(), h(), v(), p(), m(), g(), y(), b(), k(), S(), T(), E(), L(), P(), e.events.fire(mt.sidedockModuleReady), {}
    }

    function at(e, t) {
        function n() {
            v = !1, t.classList.add("invisible")
        }

        function i() {
            t.classList.remove("hidden"), t.removeAttribute("hidden"), setTimeout(function() {
                v = !0, t.classList.remove("invisible")
            }, 0)
        }

        function r() {
            if (v) {
                if (m) return void n();
                if (b) return void n();
                if (!g && y) return _ && p ? void 0 : void n()
            }
        }

        function o() {
            if (!v) {
                if (g && !m) return void i();
                if (_ && !w && !b) return y || m ? e.config.embed.settings.info_on_pause && _ && !m ? void i() : void 0 : void i()
            }
        }

        function a() {
            if (e.config.view === dt.main || e.config.view === dt.privateUnlocked) {
                var n = !!e.config.embed.settings.byline,
                    i = null !== e.config.video.owner.url,
                    r = e.config.video.owner.url,
                    o = 0 === e.config.embed.on_site,
                    a = e.config.embed.settings.spatial_label,
                    s = {
                        linkToOwner: i,
                        ownerLink: r,
                        targetBlank: o,
                        showPortrait: !!e.config.embed.settings.portrait,
                        portraitImg: e.config.video.owner[Nt.devicePixelRatio > 1 ? "img_2x" : "img"],
                        showByline: n,
                        showTitle: !!e.config.embed.settings.title,
                        showTitleLink: null !== e.config.video.url,
                        titleLink: e.config.video.url,
                        title: e.config.video.title,
                        is360: e.config.video.spatial && a,
                        strings: {}
                    };
                if (e.config.embed.settings.byline) {
                    var c = e.config.embed.settings.byline_badge,
                        u = "";
                    c && c.type && (u = At.render("title_byline_badge", {
                        targetBlank: o,
                        cssClass: c.type,
                        link: c.url || !1
                    })), s.strings.byline = "from " + At.render("title_owner_byline", {
                        linkToOwner: i,
                        ownerLink: r,
                        targetBlank: o,
                        owner: e.config.video.owner.name
                    }) + u
                }
                var d = e.config.embed.settings.badge;
                if (d) {
                    var l = Nt.devicePixelRatio > 1 ? "img_2x" : "img";
                    Nt.svg && d.svg && (l = "svg"), s.showPortrait = !1, s.badge = {
                        link: d.link,
                        img: d[l],
                        offset: d.offset || !1,
                        width: d.width,
                        height: d.height,
                        name: d.name,
                        shadow: d.shadow || !1
                    }
                }
                e.config.embed.autoplay && (t.classList.add("hidden"), t.setAttribute("hidden", "")), t.innerHTML = At.render("title", s)
            }
        }

        function s() {
            e.events.on([mt.mousedOut, mt.mouseTimeout], r).on(mt.mousedOver, o).on(mt.playInitiated, function() {
                y = !0, _ = !1, r()
            }).on([mt.playButtonPressed, mt.played], function() {
                _ = !1, w = !1, r()
            }).on(mt.paused, function(e, t) {
                t || (_ = !0, o())
            }).on(mt.ended, function() {
                b = !0, r()
            }).on(mt.scrubbingStarted, function() {
                k = _, w = !0
            }).on(mt.scrubbingEnded, function() {
                k && (w = !1)
            }).on(mt.willEnterFullscreen, function() {
                r()
            }).on(mt.didExitFullscreen, function(e) {
                e || o()
            }), kt(t).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], function(e) {
                return "pointerType" in e ? void("mouse" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_MOUSE || (p = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(p = "mouseover" === e.type)
            }), kt(t).on("transitionend", function(e) {
                "opacity" === e.propertyName && t.classList.contains("invisible") && (t.classList.add("hidden"), t.setAttribute("hidden", ""))
            }, !1)
        }

        function c() {
            e.events.on(mt.ended, function(e) {
                r()
            })
        }

        function u() {
            e.events.on([mt.airPlayActivated], function() {
                g = !0, o()
            }).on([mt.airPlayDeactivated], function() {
                g = !1, r()
            })
        }

        function d() {
            e.events.on(mt.overlayOpened, function(e) {
                "notsupported" !== e && "private-unlocked" !== e && "help" !== e && (m = !0, p = !1, r())
            }).on(mt.overlayClosed, function() {
                m = !1, p = !1, setTimeout(o, 0)
            })
        }

        function l() {
            x(t, ".badge", function() {
                e.events.fire(mt.badgePressed, e.config.embed.settings.badge.id)
            })
        }

        function f() {
            e.events.on(mt.configChanged, function() {
                a(), e.config.view === dt.privateUnlocked && o()
            })
        }

        function h() {
            e.events.on(pt.reset, function() {
                y = !1, _ = !0, b = !1, w = !1, o()
            })
        }
        var v = !0,
            p = !1,
            m = !1,
            g = !1,
            y = !1,
            _ = !0,
            b = !1,
            w = !1,
            k = !1;
        return a(), s(), c(), u(), d(), l(), f(), h(), e.events.fire(mt.titleModuleReady), {}
    }

    function st(e, t, i, r) {
        function a() {
            var t = R;
            R = y(e), R && t !== R && "undefined" != typeof B[R] && E.events.fire(B[R])
        }

        function s() {
            var t = (E.config.view === dt.main || E.config.view === dt.privateUnlocked) && E.config.embed.settings && !E.config.embed.settings.playbar;
            e.classList.toggle("no-playbar", t), e.classList.toggle("with-fullscreen", !!E.config.embed.settings.fullscreen);
            var n = E.config.embed.settings.custom_logo;
            e.classList.toggle("with-custom-logo", !!n), e.classList.toggle("with-sticky-custom-logo", n && n.sticky), e.classList.toggle("background-mode", !!E.config.embed.settings.background), e.classList.toggle("touch-support", Nt.touch)
        }

        function c(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : E.config.video.url;
            if (!(!t || e && e.metaKey)) return t.indexOf("#") === -1 && E.telecine.currentTime > 0 && E.telecine.currentTime < E.config.video.duration - 30 && !E.telecine.paused && (t += "#at=" + Math.floor(E.telecine.currentTime)), E.config.embed.on_site ? void(window.location = t) : (window.open(t), n(e), E.events.fire(mt.pauseButtonPressed), !1)
        }

        function d() {
            s(), E.events.on(mt.configChanged, s)
        }

        function l() {
            O = new ut(function(e, t) {
                var n = function() {
                        return window.innerWidth > 0 && window.innerHeight > 0
                    },
                    i = null,
                    r = function t() {
                        return clearTimeout(i), n() ? void e() : void(i = setTimeout(t, 250))
                    };
                E.events.once(mt.ready, r), E.events.once(mt.error, r)
            })
        }

        function f() {
            var e = function(e, t) {
                return E.verifyConfig().then(function() {
                    var n = E.config.request,
                        i = n.signature,
                        r = n.session,
                        o = n.timestamp,
                        a = n.expires,
                        s = "https://" + E.config.player_url + "/video/" + E.config.video.id + "/" + e + "?signature=" + i + "&session=" + r + "&time=" + o + "&expires=" + a;
                    return h(s, {
                        method: t
                    })
                }).catch(function(n) {
                    E.reportError(n, {
                        extra: {
                            action: e,
                            method: t
                        }
                    })
                })
            };
            E.events.on(mt.vodButtonPressed, function(e) {
                if (E.config.user.purchased) {
                    if (!E.config.video.vod.is_feature && E.config.video.vod.feature_id) return void E.loadVideo(E.config.video.vod.feature_id).then(function() {
                        return E.events.fire(mt.playButtonPressed), E.config.video.vod.feature_id
                    }).catch(function(e) {
                        E.reportError(e), E.events.fire(pt.showOverlay, "error", {
                            title: "Sorry",
                            message: "There was a problem. Please try again."
                        })
                    });
                    if (E.config.video.vod && E.config.video.vod.is_coming_soon) return;
                    return void E.events.fire(mt.playButtonPressed)
                }
                E.performDelegateAction(lt.purchase, function() {
                    E.events.fire(pt.openPopup, "purchase", {
                        productId: e
                    })
                }, e)
            }), E.events.on(mt.likeButtonPressed, function() {
                return E.config.user.logged_in ? void(E.config.user.id !== E.config.video.owner.id && (E.config.user.liked ? E.performDelegateAction(lt.unlike, function() {
                    e("like", "DELETE"), E.config.user.liked = !1, E.events.fire(mt.unliked)
                }) : E.performDelegateAction(lt.like, function() {
                    e("like", "PUT"), E.config.user.liked = !0, E.events.fire(mt.liked)
                }))) : void E.performDelegateAction(lt.loginForm, function() {
                    E.events.fire(pt.openPopup, "login-like")
                }, "like")
            }), E.events.on(mt.watchLaterButtonPressed, function() {
                if (E.config.video.url || "unlisted" === E.config.video.privacy) return E.config.user.logged_in ? E.config.user.watch_later ? void E.performDelegateAction(lt.removeFromWatchLater, function() {
                    e("watch-later", "DELETE"), E.config.user.watch_later = !1, E.events.fire(mt.removedFromWatchLater)
                }) : void E.performDelegateAction(lt.addToWatchLater, function() {
                    e("watch-later", "PUT"), E.config.user.watch_later = !0, E.events.fire(mt.addedToWatchLater)
                }) : void E.performDelegateAction(lt.loginForm, function() {
                    E.events.fire(pt.openPopup, "login-watch-later")
                }, "watch-later")
            }), E.events.on(mt.collectionsButtonPressed, function() {
                E.performDelegateAction(lt.collectionsOverlay, function() {
                    return E.config.video.vod && E.config.video.vod.url ? void c(null, E.config.video.vod.url + "#collections") : E.config.video.url ? void c(null, E.config.video.url + "#collections") : void 0
                })
            }), E.events.on(mt.shareButtonPressed, function() {
                var e = E.config.embed.settings.share && E.config.embed.settings.share.embed_only,
                    t = function() {
                        E.events.fire(pt.showOverlay, "share", e)
                    };
                return Ot.element ? void t() : void E.performDelegateAction(lt.shareOverlay, t)
            }), E.events.on(mt.embedButtonPressed, function() {
                E.config.embed.settings.share.embed_only && E.performDelegateAction(lt.shareOverlay, function() {
                    E.events.fire(pt.showOverlay, "share", !0)
                })
            })
        }

        function v() {
            function t() {
                var t = o(e),
                    n = t.width,
                    i = "10px",
                    r = 450,
                    a = 1024;
                return n < r ? i = "12px" : n <= a && (i = "11px"), i
            }

            function n() {
                O.then(function() {
                    var e = t();
                    return M.style.fontSize = e, F.style.fontSize = e, I.style.fontSize = e, !0
                }).catch(function() {})
            }
            E.events.on(mt.didEnterFullscreen, n), E.events.on(mt.didExitFullscreen, n), window.addEventListener("orientationchange", n), q && (e.classList.add("mobile"), n())
        }

        function p() {
            if (kt(window).on("resize", a), "undefined" != typeof MutationObserver) {
                var t = new MutationObserver(a);
                t.observe(e, {
                    attributes: !0,
                    attributeFilter: ["class"]
                })
            }
        }

        function m() {
            function t() {
                var t = e;
                if (r && r.getFullscreenElement && "function" == typeof r.getFullscreenElement) {
                    var n = r.getFullscreenElement();
                    n && n instanceof HTMLElement && n.contains(e) && n.classList.contains("js-player-fullscreen") && (t = n)
                }
                return t
            }

            function n(e, n) {
                return s ? void(s = !1) : void(o || (o = !0, E.events.fire(mt.didEnterFullscreen, t() === e, a)))
            }

            function i(e) {
                return s ? void(s = !1) : void(o && (o = !1, E.events.fire(mt.didExitFullscreen, a), a || E.events.fire(pt.toggleNativeControls, !1), a = !1))
            }
            E.config.embed.fullscreen = !0, Nt.iPad && e.classList.add("no-fullscreen-api-support"), Ot.enabled && !Nt.browser.bb10 || Nt.iPad || (e.classList.add("no-fullscreen-support"), Nt.iOS || (E.config.embed.fullscreen = !1));
            var o = !1,
                a = !1,
                s = !1;
            E.events.on([mt.pictureInPictureActivated, mt.pictureInPictureDeactivated], function() {
                s = !0
            }), E.events.on(pt.forceFullscreen, function() {
                return Ot.enabled || Ot.videoEnabled(e) ? (E.events.fire(mt.willEnterFullscreen), a = !1, void Ot.request(t())) : void E.events.fire(pt.toggleNativeControls, !0)
            }), E.events.on(mt.fullscreenButtonPressed, function() {
                "picture-in-picture" === E.telecine.presentationMode && E.events.fire(pt.deactivatePictureInPicture), Ot.element ? (E.events.fire(mt.willExitFullscreen), Ot.exit()) : (E.events.fire(mt.willEnterFullscreen), a = !0, Ot.request(t()))
            });
            var c = Ot.onenter,
                u = Ot.onexit;
            if (Ot.onenter = function(e) {
                    if (!o) return t().contains(e) ? void n(e, !0) : void("function" == typeof c && c(e))
                }, Ot.onexit = function() {
                    return o ? void i(!0) : void("function" == typeof u && u())
                }, kt(e).on("click", "a", function(e) {
                    Ot.element === t() && Ot.exit()
                }), kt(e).on("gestureend", function(e) {
                    e.scale > 1 && E.events.fire(mt.fullscreenButtonPressed)
                }), "undefined" != typeof MSGesture) {
                var d = 1,
                    l = new MSGesture;
                l.target = e, kt(e).on("pointerdown", function(e) {
                    l.addPointer(e.pointerId)
                }).on(["MSGestureChange"], function(e) {
                    d *= e.scale
                }).on(["MSGestureEnd"], function() {
                    (!o && d >= 2 || o && d < 1) && E.events.fire(mt.fullscreenButtonPressed), d = 1
                })
            }
        }

        function g() {
            x(e, "a[data-clip-link]", c), E.events.on(pt.openVimeo, c)
        }

        function _() {
            d(), l(), f(), v(), p(), m(), g()
        }

        function b() {
            P || (P = new nt(E, e.querySelector(".overlay-wrapper")))
        }

        function w() {
            C || (C = new it(E, {
                uuid: E.uuid,
                id: e.id,
                isMobileDevice: !1
            }))
        }

        function k() {
            A || (A = new rt(E))
        }

        function S() {
            b(), w(), k(), void new Ye(E, M), void new Ge(E, e);
            var t = new Je(E, e);
            void new Ze(E, e.querySelector(".notification-wrapper")), void new et(E, e.querySelector(".outro-wrapper")), void new ot(E, F), void new at(E, I), Object.defineProperties(L, {
                pauseKeyboard: {
                    enumerable: !0,
                    value: t.pause
                },
                unpauseKeyboard: {
                    enumerable: !0,
                    value: t.unpause
                }
            })
        }
        At.helpers = wt;
        var T = u(i),
            E = new We({
                element: e,
                delegate: r,
                cssLoadedPromise: T
            });
        e.classList.add("js-player-fullscreen");
        var L = E.externalApi,
            P = null,
            C = null,
            A = null,
            O = null,
            M = e.querySelector(".controls"),
            F = e.querySelector(".sidedock"),
            I = e.querySelector(".title"),
            q = Nt.mobileAndroid || Nt.iPhone || Nt.windowsPhone || Nt.browser.bb10,
            R = "normal",
            B = {
                tiny: mt.enteredTinyMode,
                mini: mt.enteredMiniMode,
                normal: mt.enteredNormalMode,
                none: mt.enteredNormalMode
            },
            D = {
                initializationHandler: function() {
                    return S(), _(), ut.resolve()
                },
                postInitializationHandler: function() {
                    return E.telecine && void new Qe(E, e.querySelector(".stats-debug")), ut.resolve()
                },
                authorizationHandler: function(e) {
                    e(), b(), w();
                    var t = "Error",
                        n = "Unhandled video privacy";
                    switch (E.config.view) {
                        case dt.privatePassword:
                            return new ut(function(e, t) {
                                E.events.fire(pt.showOverlay, "password"), E.events.once(mt.passwordUnlocked, function(t) {
                                    e(t)
                                })
                            });
                        case dt.privateLocked:
                            k();
                            var i = "private-locked",
                                r = null;
                            return E.config.user.logged_in && (i = "error", r = {
                                title: "Private Video",
                                message: "Sorry, you don’t have permission to watch.",
                                modal: !0,
                                logo: !!E.config.embed.settings.branding,
                                icon: "lock"
                            }), E.events.fire(pt.showOverlay, i, r), ut.reject();
                        case dt.error:
                            t = E.config.title, n = E.config.message
                    }
                    return E.events.fire(pt.showOverlay, "error", {
                        title: t,
                        message: n,
                        modal: !0
                    }), ut.reject()
                }
            };
        return E.init(t, D).then(function() {
            return E.config.view !== dt.privateUnlocked || E.config.embed.autoplay || E.events.fire(pt.showOverlay, "private-unlocked"), !0
        }).catch(function(t) {
            E.reportError(t), b(), w(), e.classList.remove("loading"), E.events.fire(mt.error, "error", {
                message: "There was an error loading this video.",
                modal: !0,
                final: !0
            })
        }), L
    }
    var ct = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        ut = e(function(e) {
            ! function(t, n, i) {
                n[t] = n[t] || i(), e.exports && (e.exports = n[t])
            }("Promise", "undefined" != typeof ct ? ct : ct, function() {
                function e(e, t) {
                    f.add(e, t), l || (l = v(f.drain))
                }

                function t(e) {
                    var t, n = typeof e;
                    return null == e || "object" != n && "function" != n || (t = e.then), "function" == typeof t && t
                }

                function n() {
                    for (var e = 0; e < this.chain.length; e++) i(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
                    this.chain.length = 0
                }

                function i(e, n, i) {
                    var r, o;
                    try {
                        n === !1 ? i.reject(e.msg) : (r = n === !0 ? e.msg : n.call(void 0, e.msg), r === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (o = t(r)) ? o.call(r, i.resolve, i.reject) : i.resolve(r))
                    } catch (e) {
                        i.reject(e)
                    }
                }

                function r(i) {
                    var a, c = this;
                    if (!c.triggered) {
                        c.triggered = !0, c.def && (c = c.def);
                        try {
                            (a = t(i)) ? e(function() {
                                var e = new s(c);
                                try {
                                    a.call(i, function() {
                                        r.apply(e, arguments)
                                    }, function() {
                                        o.apply(e, arguments)
                                    })
                                } catch (t) {
                                    o.call(e, t)
                                }
                            }): (c.msg = i, c.state = 1, c.chain.length > 0 && e(n, c))
                        } catch (e) {
                            o.call(new s(c), e)
                        }
                    }
                }

                function o(t) {
                    var i = this;
                    i.triggered || (i.triggered = !0, i.def && (i = i.def), i.msg = t, i.state = 2, i.chain.length > 0 && e(n, i))
                }

                function a(e, t, n, i) {
                    for (var r = 0; r < t.length; r++) ! function(r) {
                        e.resolve(t[r]).then(function(e) {
                            n(r, e)
                        }, i)
                    }(r)
                }

                function s(e) {
                    this.def = e, this.triggered = !1
                }

                function c(e) {
                    this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                }

                function u(t) {
                    if ("function" != typeof t) throw TypeError("Not a function");
                    if (0 !== this.__NPO__) throw TypeError("Not a promise");
                    this.__NPO__ = 1;
                    var i = new c(this);
                    this.then = function(t, r) {
                        var o = {
                            success: "function" != typeof t || t,
                            failure: "function" == typeof r && r
                        };
                        return o.promise = new this.constructor(function(e, t) {
                            if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                            o.resolve = e, o.reject = t
                        }), i.chain.push(o), 0 !== i.state && e(n, i), o.promise
                    }, this.catch = function(e) {
                        return this.then(void 0, e)
                    };
                    try {
                        t.call(void 0, function(e) {
                            r.call(i, e)
                        }, function(e) {
                            o.call(i, e)
                        })
                    } catch (e) {
                        o.call(i, e)
                    }
                }
                var d, l, f, h = Object.prototype.toString,
                    v = "undefined" != typeof setImmediate ? function(e) {
                        return setImmediate(e)
                    } : setTimeout;
                try {
                    Object.defineProperty({}, "x", {}), d = function(e, t, n, i) {
                        return Object.defineProperty(e, t, {
                            value: n,
                            writable: !0,
                            configurable: i !== !1
                        })
                    }
                } catch (e) {
                    d = function(e, t, n) {
                        return e[t] = n, e
                    }
                }
                f = function() {
                    function e(e, t) {
                        this.fn = e, this.self = t, this.next = void 0
                    }
                    var t, n, i;
                    return {
                        add: function(r, o) {
                            i = new e(r, o), n ? n.next = i : t = i, n = i, i = void 0
                        },
                        drain: function() {
                            var e = t;
                            for (t = n = l = void 0; e;) e.fn.call(e.self), e = e.next
                        }
                    }
                }();
                var p = d({}, "constructor", u, !1);
                return u.prototype = p, d(p, "__NPO__", 0, !1), d(u, "resolve", function(e) {
                    var t = this;
                    return e && "object" == typeof e && 1 === e.__NPO__ ? e : new t(function(t, n) {
                        if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                        t(e)
                    })
                }), d(u, "reject", function(e) {
                    return new this(function(t, n) {
                        if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                        n(e)
                    })
                }), d(u, "all", function(e) {
                    var t = this;
                    return "[object Array]" != h.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function(n, i) {
                        if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
                        var r = e.length,
                            o = Array(r),
                            s = 0;
                        a(t, e, function(e, t) {
                            o[e] = t, ++s === r && n(o)
                        }, i)
                    })
                }), d(u, "race", function(e) {
                    var t = this;
                    return "[object Array]" != h.call(e) ? t.reject(TypeError("Not an array")) : new t(function(n, i) {
                        if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
                        a(t, e, function(e, t) {
                            n(t)
                        }, i)
                    })
                }), u
            })
        }),
        dt = {
            main: 1,
            privateLocked: 2,
            privateUnlocked: 3,
            privatePassword: 4,
            error: 7,
            contentRating: 9
        },
        lt = {
            like: {
                will: "willLikeVideo",
                did: "didLikeVideo"
            },
            unlike: {
                will: "willUnlikeVideo",
                did: "didUnlikeVideo"
            },
            addToWatchLater: {
                will: "willAddToWatchLater",
                did: "didAddToWatchLater"
            },
            removeFromWatchLater: {
                will: "willRemoveFromWatchLater",
                did: "didRemoveFromWatchLater"
            },
            purchase: {
                will: "willOpenVodPurchaseForm",
                did: "didOpenVodPurchaseForm"
            },
            shareOverlay: {
                will: "willOpenShareOverlay",
                did: "didOpenShareOverlay"
            },
            loginForm: {
                will: "willOpenLoginForm",
                did: "didOpenLoginForm"
            },
            collectionsOverlay: {
                will: "willOpenCollectionsOverlay",
                did: "didOpenCollectionsOverlay"
            },
            showOutro: {
                will: "willShowOutro",
                did: "didShowOutro"
            },
            playLog: {
                will: "willSendPlayLog",
                did: "didSendPlayLog"
            }
        },
        ft = {
            "application/vnd.apple.mpegurl": "hls",
            "application/vnd.vimeo.dash+json": "dash",
            "video/mp4": "progressive",
            "video/webm": "progressive",
            "video/x-flv": "progressive"
        },
        ht = {
            h264: "video/mp4",
            hls: "application/vnd.apple.mpegurl",
            dash: "application/vnd.vimeo.dash+json",
            vp6: "video/x-flv",
            vp8: "video/webm",
            webm: "video/webm",
            hds: "application/f4m"
        },
        vt = {
            HTMLScanner: "html",
            MediaSourceScanner: "html",
            SWFScanner: "flash"
        },
        pt = {
            seek: 1,
            changeVolume: 3,
            showOverlay: 5,
            openPopup: 6,
            reset: 7,
            changeLoop: 8,
            changeQuality: 9,
            openVimeo: 10,
            changeColor: 11,
            disableHd: 14,
            disableVolume: 15,
            enableVolume: 16,
            disableCaptions: 17,
            enableCaptions: 18,
            forceFullscreen: 19,
            turnCaptionsOn: 20,
            turnCaptionsOff: 21,
            toggleNativeControls: 22,
            showOutro: 23,
            hideOutro: 24,
            setEffect: 25,
            activatePictureInPicture: 26,
            deactivatePictureInPicture: 27,
            attachSpatialPlaybackEvents: 28,
            toggleSpatialPlayback: 29,
            revealSpatialControls: 30
        },
        mt = {
            apiError: 48,
            error: 49,
            playInitiated: 50,
            paused: 51,
            played: 52,
            loadProgress: 53,
            playProgress: 54,
            seeked: 55,
            ended: 56,
            bufferStarted: 57,
            bufferEnded: 58,
            volumeChanged: 59,
            qualityChanged: 60,
            targetTimeReached: 61,
            cueChanged: 62,
            streamChanged: 63,
            ranIntoBuffer: 64,
            playbackResumed: 65,
            adaptiveBandwidth: 66,
            resize: 67,
            streamTargetChange: 68,
            forcedQuality: 69,
            cuepoint: 70,
            firstTimeUpdate: 71,
            droppedFrames: 72,
            fullscreenButtonPressed: 100,
            pauseButtonPressed: 101,
            playButtonPressed: 102,
            hdButtonPressed: 103,
            ccButtonPressed: 104,
            scrubbingStarted: 105,
            scrubbingEnded: 106,
            volumeScrubbingStarted: 107,
            volumeScrubbingEnded: 108,
            controlBarVisibilityChanged: 109,
            sidedockVisibilityChanged: 110,
            menuVisibilityChanged: 111,
            captionsChanged: 112,
            cuePointAdded: 113,
            cuePointRemoved: 114,
            spatialMotionStart: 115,
            spatialMotionEnd: 116,
            stereoscopicButtonPressed: 117,
            badgePressed: 140,
            willEnterFullscreen: 150,
            didEnterFullscreen: 151,
            willExitFullscreen: 152,
            didExitFullscreen: 153,
            likeButtonPressed: 200,
            watchLaterButtonPressed: 201,
            shareButtonPressed: 202,
            embedButtonPressed: 203,
            vodButtonPressed: 205,
            collectionsButtonPressed: 206,
            overlayOpened: 250,
            overlayClosed: 251,
            overlayCleared: 252,
            overlayCloseButtonPressed: 253,
            facebookButtonPressed: 254,
            twitterButtonPressed: 255,
            tumblrButtonPressed: 256,
            emailButtonPressed: 257,
            embedCodeCopied: 258,
            popupOpened: 259,
            effectButtonPressed: 260,
            debugButtonPressed: 261,
            emailCaptureSubmitted: 262,
            popupClosed: 263,
            mousedOut: 300,
            mousedOver: 301,
            mouseTimeout: 302,
            liked: 303,
            unliked: 304,
            addedToWatchLater: 305,
            removedFromWatchLater: 306,
            userLogIn: 307,
            userLoggedIn: 308,
            userLoggedOut: 309,
            loginFailure: 310,
            colorChanged: 311,
            configChanged: 312,
            passwordUnlocked: 313,
            privateUnlocked: 314,
            enteredTinyMode: 315,
            enteredMiniMode: 320,
            enteredNormalMode: 316,
            signatureExpired: 317,
            requestConfigReloaded: 318,
            embedSettingChanged: 319,
            outroDisplayed: 321,
            outroHidden: 322,
            outroVideoPressed: 323,
            becameActive: 324,
            becameInactive: 325,
            tipped: 326,
            emailCaptureSuccess: 327,
            loadVideo: 328,
            cameraUpdate: 329,
            outroLinkPressed: 330,
            titleModuleReady: 350,
            sidedockModuleReady: 351,
            controlBarModuleReady: 352,
            videoModuleReady: 353,
            overlayModuleReady: 354,
            notificationModuleReady: 355,
            statsModuleReady: 356,
            apiModuleReady: 357,
            analyticsModuleReady: 358,
            ready: 359,
            notificationHidden: 400,
            alertVisibilityChanged: 401,
            airPlayAvailable: 500,
            airPlayNotAvailable: 501,
            airPlayActivated: 502,
            airPlayDeactivated: 503,
            airPlayButtonPressed: 504,
            pictureInPictureAvailable: 505,
            pictureInPictureNotAvailable: 506,
            pictureInPictureActivated: 507,
            pictureInPictureDeactivated: 508
        },
        gt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        yt = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        _t = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        bt = function() {
            function e(e, t) {
                var n = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        !i && s.return && s.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        wt = Object.freeze({
            formatVodLabel: _,
            getDisplayPrice: b,
            isAvailableInCountry: w,
            translateFromRequest: k
        }),
        kt = e(function(e) {
            ! function() {
                function t(e, t, n) {
                    var i = "blur" == t || "focus" == t;
                    e.element.addEventListener(t, n, i)
                }

                function n(e) {
                    e.preventDefault(), e.stopPropagation()
                }

                function i(e) {
                    return d ? d : d = e.matches ? e.matches : e.webkitMatchesSelector ? e.webkitMatchesSelector : e.mozMatchesSelector ? e.mozMatchesSelector : e.msMatchesSelector ? e.msMatchesSelector : e.oMatchesSelector ? e.oMatchesSelector : u.matchesSelector
                }

                function r(e, t, n) {
                    if ("_root" == t) return n;
                    if (e !== n) return i(e).call(e, t) ? e : e.parentNode ? (l++, r(e.parentNode, t, n)) : void 0
                }

                function o(e, t, n, i) {
                    h[e.id] || (h[e.id] = {}), h[e.id][t] || (h[e.id][t] = {}), h[e.id][t][n] || (h[e.id][t][n] = []), h[e.id][t][n].push(i)
                }

                function a(e, t, n, i) {
                    if (h[e.id])
                        if (t) {
                            if (!i && !n) return void(h[e.id][t] = {});
                            if (!i) return void delete h[e.id][t][n];
                            if (h[e.id][t][n])
                                for (var r = 0; r < h[e.id][t][n].length; r++)
                                    if (h[e.id][t][n][r] === i) {
                                        h[e.id][t][n].splice(r, 1);
                                        break
                                    }
                        } else
                            for (var o in h[e.id]) h[e.id].hasOwnProperty(o) && (h[e.id][o] = {})
                }

                function s(e, t, n) {
                    if (h[e][n]) {
                        var i, o, a = t.target || t.srcElement,
                            s = {},
                            c = 0,
                            d = 0;
                        l = 0;
                        for (i in h[e][n]) h[e][n].hasOwnProperty(i) && (o = r(a, i, v[e].element), o && u.matchesEvent(n, v[e].element, o, "_root" == i, t) && (l++, h[e][n][i].match = o, s[l] = h[e][n][i]));
                        for (t.stopPropagation = function() {
                                t.cancelBubble = !0
                            }, c = 0; c <= l; c++)
                            if (s[c])
                                for (d = 0; d < s[c].length; d++) {
                                    if (s[c][d].call(s[c].match, t) === !1) return void u.cancel(t);
                                    if (t.cancelBubble) return
                                }
                    }
                }

                function c(e, t, n, i) {
                    function r(e) {
                        return function(t) {
                            s(d, t, e)
                        }
                    }
                    if (this.element) {
                        e instanceof Array || (e = [e]), n || "function" != typeof t || (n = t, t = "_root");
                        var c, d = this.id;
                        for (c = 0; c < e.length; c++) i ? a(this, e[c], t, n) : (h[d] && h[d][e[c]] || u.addEvent(this, e[c], r(e[c])), o(this, e[c], t, n));
                        return this
                    }
                }

                function u(e, t) {
                    if (!(this instanceof u)) {
                        for (var n in v)
                            if (v[n].element === e) return v[n];
                        return f++, v[f] = new u(e, f), v[f]
                    }
                    this.element = e, this.id = t
                }
                var d, l = 0,
                    f = 0,
                    h = {},
                    v = {};
                u.prototype.on = function(e, t, n) {
                    return c.call(this, e, t, n)
                }, u.prototype.off = function(e, t, n) {
                    return c.call(this, e, t, n, !0)
                }, u.matchesSelector = function() {}, u.cancel = n, u.addEvent = t, u.matchesEvent = function() {
                    return !0
                }, e.exports && (e.exports = u), window.Gator = u
            }()
        }),
        St = kt.addEvent,
        xt = "undefined" == typeof window.PointerEvent && "undefined" != typeof window.MSPointerEvent,
        Tt = {
            pointerdown: "MSPointerDown",
            pointerup: "MSPointerUp",
            pointercancel: "MSPointerCancel",
            pointermove: "MSPointerMove",
            pointerenter: "MSPointerEnter",
            pointerleave: "MSPointerLeave",
            pointerover: "MSPointerOver",
            pointerout: "MSPointerOut"
        },
        Et = "onmspointerenter" in document,
        Lt = "onmspointerleave" in document;
    kt.addEvent = function(e, t, n) {
        xt && Tt[t] && (t = Tt[t]), "transitionend" === t && (St(e, "webkitTransitionEnd", n), St(e, "otransitionend", n)), "mouseenter" === t && (t = "mouseover"), "mouseleave" === t && (t = "mouseout"), "MSPointerEnter" !== t || Et || (t = "MSPointerOver"), "MSPointerLeave" !== t || Lt || (t = "MSPointerOut"), St(e, t, n)
    }, kt.matchesEvent = function(e, t, n, i, r) {
        return !("mouseenter" === e || "mouseleave" === e || !Et && "MSPointerEnter" === e || !Lt && "MSPointerLeave" === e) || S(t, n, i, r)
    };
    var Pt = {},
        Ct = "en",
        At = e(function(e) {
            ! function() {
                var t = {};
                t.templates = {}, t.render = function(e, n) {
                    return t.templates[e] ? t.templates[e].call(t, n || {}) : ""
                }, t.map = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;"
                }, t.escape = function(e) {
                    return e.replace(/[&<>"'\/]/g, function(e) {
                        return t.map[e]
                    })
                }, t.helpers = {}, t.templates.stream_studder = function(e) {
                    var t = "<h3> ";
                    return t += this.render("icon_warning") || "", t += ' <span>Having issues? <button class="player-alert-button-link button-link" aria-label="Switch to auto" data-alert-autofocus data-close data-context="suggestion">Switch to Auto</button> for smoother streaming.</span></h3>'
                }, t.templates.warning_alert = function(e) {
                    var t = "<h3> ";
                    return t += this.render("icon_warning") || "", t += " <span>" + e.strings.text + "<span></h3>"
                }, t.templates.buffer_pattern = function(e) {
                    var t = '<pattern id="' + e.id + '" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10" viewBox="0 0 10 10"><line x1="5" y1="-1" x2="-5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="10" y1="-1" x2="0" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="15" y1="-1" x2="5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /></pattern>';
                    return t
                }, t.templates.compass = function(e) {
                    var t = '<svg viewBox="0 0 36 36"> ';
                    return t += 1 == e.version ? ' <circle class="compass-background" r="18" cx="18" cy="18"></circle><path class="compass-slice" transform="rotate(-45, 18, 18)" d="M0,0 m18,18 l12,0 A12,12 0 0,0 18,6 z"/><circle fill="none" class="compass-ring" stoke-width="3" r="14.5" cx="18" cy="18"></circle><polygon class="compass-dimple" points="16,3.5 18,1 20,3.5"/> ' : ' <circle class="compass-background" r="18" cx="18" cy="18"></circle><path class="compass-slice" transform="rotate(-30, 18, 18)" d="M0,0 m18,18 l13,0 A13,13 0 0,0 11.500000000000004,6.741669750802297 z"/><circle class="compass-centercircle" r="3" cx="18" cy="18"></circle><path class="compass-line" stroke-linecap="round" d="M0,18 L36,18 z" /> ', t += "</svg>"
                }, t.templates.content_rating = function(e) {
                    var t = '<div class="content-rating"><h1>' + e.strings.title + '</h1><p class="subtitle">' + e.strings.subtitle + "</p><p>" + e.strings.update + "</p><button>" + e.strings.watch + '</button><div class="logo">' + e.logo + "</div></div>";
                    return t
                }, t.templates.controlbar_trailer = function(e) {
                    var t = '<button class="play trailer rounded-box" title="' + e.strings.playTrailer + '" aria-label="' + e.strings.playTrailer + '"><div><span class="play-icon">';
                    return t += this.render("icon_play") || "", t += "</span><p>" + e.text + "</p></div></button>", e.vimeoLogo.show && (t += ' <div class="logo"> ', e.vimeoLogo.showLink && (t += ' <a href="' + e.vimeoLogo.url + '"', e.targetBlank && (t += ' target="_blank"'), t += ' title="' + e.strings.watchOnVimeo + '" aria-label="' + e.strings.watchOnVimeo + '" data-clip-link> '), t += this.render("logo") || "", e.vimeoLogo.showLink && (t += " </a> "), t += " </div>"), t += "", e.customLogo && (t += ' <div class="custom-logo', e.customLogo.sticky && (t += " sticky"), t += '" style="width:' + e.customLogo.width + "px;height:" + e.customLogo.height + 'px"> ', e.customLogo.showLink && (t += '<a href="' + e.customLogo.url + '" target="_blank">'), t += ' <img src="' + e.customLogo.img + '" alt=""> ', e.customLogo.showLink && (t += "</a>"), t += " </div>"), t += ""
                }, t.templates.controlbar = function(e) {
                    var t = '<button class="play rounded-box state-' + e.playState + '" title="' + e.strings.play + '" data-title-play="' + e.strings.play + '" data-title-pause="' + e.strings.pause + '" aria-label="' + e.strings.play + '"><div class="tiny-bars"><svg width="100%" height="100%" viewBox="0 0 65 40"><defs><clipPath id="rounded-border"><rect height="100%" width="100%" x="0" y="0" rx="5"/></clipPath> ';
                    return t += this.render("buffer_pattern", {
                        id: "tiny-buffer"
                    }) || "", t += ' </defs><g clip-path="url(#rounded-border)"><rect class="buffer hidden" height="3" width="110%" x="0" y="37" fill="url(#tiny-buffer)"/><rect class="loaded" height="3" width="0" x="0" y="37" fill="#666"/><rect class="played fill" height="3" width="0" x="0" y="37"/></g></svg></div><div class="play-icon">', t += this.render("icon_play") || "", t += '</div><div class="pause-icon">', t += this.render("icon_pause") || "", t += '</div></button><div class="play-bar rounded-box"><div class="progress"><div class="buffer hidden"><svg width="110%" tabindex="-1"><defs> ', t += this.render("buffer_pattern", {
                        id: "buffer"
                    }) || "", t += ' </defs><rect fill="url(#buffer)" width="100%" height="100%" /></svg></div><div class="loaded', e.rawDuration < 60 && (t += " short-video"), t += '" role="progressbar" aria-label="' + e.strings.loadedBar + '" aria-valuemin="0" aria-valuemax="' + e.rawDuration + '" aria-valuenow="0"></div><div class="played" role="progressbar" aria-label="' + e.strings.playedBar + '" aria-valuemin="0" aria-valuemax="' + e.rawDuration + '" aria-valuenow="0"></div><div class="cuepoints"></div><div class="thumb-preview invisible hidden" role="presentation" aria-hidden="true"><div class="thumb"></div></div><div class="ghost-timecode invisible hidden" role="presentation" aria-hidden="true"><div class="box">00:00</div></div><div class="timecode" role="presentation" aria-hidden="true"><div class="box">' + e.duration + "</div></div></div> ", e.volume && (t += ' <div class="volume" role="slider" aria-label="' + e.strings.volume + '" aria-valuemin="0" aria-valuemax="1" tabindex="0"><div></div><div></div><div></div><div></div><div></div></div> '), e.ccButton && (t += ' <button class="toggle cc ' + (e.ccOn ? "on" : "off") + '" title="' + e.strings.captions + '"> ', t += this.render("icon_cc") || "", t += " </button> "), e.hdButton && (t += ' <button class="hd" title="' + e.strings.hd + '" aria-label="HD"> ', t += this.render("icon_hd") || "", t += " </button> "), t += ' <button class="hidden toggle effect off" title="' + e.strings.effect + '"><svg viewBox="0 0 210 200" version="1.1"><g fill="none" fill-rule="evenodd"><circle class="red" fill="#f00" cx="63.5" cy="136.5" r="63.5"/><circle class="blue" fill="#2653ff" cx="146.5" cy="136.5" r="63.5"/><circle class="green" fill="#0f0" cx="104.5" cy="63.5" r="63.5"/></g></svg></button> ', e.airplayButton && (t += ' <button class="toggle airplay off hidden" title="' + e.strings.airPlay + '" data-title-off="' + e.strings.airPlay + '" data-title-on="' + e.strings.airPlayOff + '" hidden> ', t += this.render("icon_airplay") || "", t += " </button> "), e.stereoscopicButton && (t += ' <button class="toggle stereoscopic off" title="' + e.strings.stereoscopic + '" data-title-off="' + e.strings.stereoscopic + '" data-title-on="' + e.strings.stereoscopicOff + '"> ', t += this.render("icon_stereoscopic") || "", t += " </button> "), t += ' <button class="pip hidden enter" title="' + e.strings.pipEnter + '" data-title-enter="' + e.strings.pipEnter + '" data-title-return="' + e.strings.pipReturn + '" hidden> ', t += this.render("icon_pip") || "", t += ' </button><button class="fullscreen', e.fullscreenButton || (t += " only-in-fullscreen"), t += '" title="' + e.strings.enterFullscreen + '" data-title-fullscreen="' + e.strings.enterFullscreen + '" data-title-unfullscreen="' + e.strings.exitFullscreen + '" aria-label="' + e.strings.fullscreen + '"><div class="fullscreen-icon">', t += this.render("icon_fullscreen") || "", t += '</div><div class="unfullscreen-icon">', t += this.render("icon_unfullscreen") || "", t += "</div></button> ", e.vimeoLogo.show && (t += ' <div class="logo"> ', e.vimeoLogo.showLink && (t += ' <a href="' + e.vimeoLogo.url + '"', e.targetBlank && (t += ' target="_blank"'), t += ' title="' + e.strings.watchOnVimeo + '" aria-label="' + e.strings.watchOnVimeo + '" data-clip-link> '), t += this.render("logo") || "", e.vimeoLogo.showLink && (t += " </a> "), t += " </div> "), t += "</div> ", e.customLogo && (t += ' <div class="custom-logo', e.customLogo.sticky && (t += " sticky"), t += '" style="width:' + e.customLogo.width + "px;height:" + e.customLogo.height + 'px"> ', e.customLogo.showLink && (t += '<a href="' + e.customLogo.url + '" target="_blank">'), t += ' <img src="' + e.customLogo.img + '" alt=""> ', e.customLogo.showLink && (t += "</a>"), t += " </div>"), t += ""
                }, t.templates.error = function(e) {
                    var t = '<div class="window-wrapper error"><h1>' + e.title + "</h1> ";
                    return e.message && (t += " <p>" + e.message + "</p> "), t += "</div>"
                }, t.templates.help = function(e) {
                    var t = '<div class="window-wrapper help"><h1>' + e.strings.title + '</h1><dl><div class="volume-up secondary"><dt class="arrow">↑</dt><dd>' + e.strings.volumeUp + '</dd></div><div class="volume-down secondary"><dt class="arrow">↓</dt><dd>' + e.strings.volumeDown + '</dd></div><div class="scrub-forward secondary"><dt class="arrow">→</dt><dd>' + e.strings.scrubForward + '</dd></div><div class="scrub-backwards secondary"><dt class="arrow">←</dt><dd>' + e.strings.scrubBackwards + '</dd></div><div class="like"><dt>L</dt><dd>' + e.strings.like + '</dd></div><div class="share"><dt>S</dt><dd>' + e.strings.share + '</dd></div><div class="watch-later"><dt>W</dt><dd>' + e.strings.watchLater + '</dd></div><div class="toggle-captions"><dt>C</dt><dd>' + e.strings.captions + '</dd></div><div class="toggle-hd"><dt>H</dt><dd>' + e.strings.hd + '</dd></div><div class="fullscreen"><dt>F</dt><dd>' + e.strings.fullscreen + "</dd></div> ";
                    return e.onSite || (t += '<div class="view-on-vimeo"><dt>V</dt><dd>' + e.strings.viewOnVimeo + "</dd></div>"), t += " </dl></div>"
                }, t.templates.icon_airplay = function(e) {
                    var t = '<svg class="airplay-icon" viewBox="0 0 44 36" tabindex="-1"><polygon class="fill" points="0,0 44,0 44,27 34.5,27 31,23 40,23 40,4 4,4 4,23 13,23 9.5,27 0,27"/><polygon class="fill" points="7,36 22,18 37,36"/></svg>';
                    return t
                }, t.templates.icon_back = function(e) {
                    var t = '<svg class="icon-back" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M0 32l32 32v-20h32l0-24h-32v-20z"/></svg>';
                    return t
                }, t.templates.icon_broken_heart = function(e) {
                    var t = '<svg class="unlike-icon" viewBox="0 0 110 81" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M82.496 1c-14.594 0-23.198 10.043-25.948 14.48l-6.77 10.727 13.661 8.543-13.661 12.535 5.695 15.348-9.686-15.348 11.389-11.975-11.969-7.402s4.22-14.27 4.621-15.521c.782-2.438.782-2.438-.813-3.289-5.516-2.944-12.608-8.098-21.509-8.098-16.299 0-27.506 15.037-27.506 27.885 0 12.795 12.562 22.558 22.245 27.592 9.186 4.771 30.601 18.349 32.755 24.523 2.154-6.174 23.57-19.752 32.753-24.523 9.684-5.034 22.247-14.797 22.247-27.592 0-12.848-11.208-27.885-27.504-27.885z"/></svg>';
                    return t
                }, t.templates.icon_cc = function(e) {
                    var t = '<svg viewBox="0 0 20 14" tabindex="-1"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M17 0h-14c-1.657 0-3 1.343-3 3v8c0 1.656 1.343 3 3 3h14c1.657 0 3-1.344 3-3v-8c0-1.657-1.343-3-3-3zm-7.271 8.282c-.145.923-.516 1.686-1.105 2.268-.597.591-1.369.89-2.294.89-1.138 0-2.049-.402-2.706-1.195-.647-.786-.975-1.866-.975-3.215 0-1.458.372-2.603 1.105-3.403.65-.708 1.487-1.067 2.487-1.067 1.33 0 2.321.482 2.947 1.435.34.53.526 1.072.553 1.611l.013.236h-1.984l-.044-.169c-.092-.355-.207-.622-.343-.793-.239-.298-.591-.443-1.076-.443-.483 0-.856.209-1.14.641-.298.455-.449 1.12-.449 1.977 0 .851.156 1.49.466 1.898.298.395.666.588 1.122.588.469 0 .814-.16 1.058-.491.138-.183.255-.472.351-.856l.042-.17h2.013l-.041.258zm7.582 0c-.145.923-.516 1.686-1.104 2.268-.598.591-1.369.89-2.294.89-1.139 0-2.049-.402-2.707-1.195-.646-.785-.975-1.865-.975-3.214 0-1.458.372-2.603 1.106-3.403.649-.708 1.485-1.067 2.486-1.067 1.33 0 2.32.482 2.946 1.435.34.53.526 1.072.554 1.611l.012.236h-1.9829999999999999l-.043-.169c-.092-.355-.208-.623-.344-.793-.238-.298-.591-.443-1.076-.443-.483 0-.856.209-1.139.641-.299.455-.45 1.12-.45 1.977 0 .851.157 1.49.467 1.898.299.395.666.588 1.121.588.469 0 .814-.16 1.058-.491.138-.183.256-.472.352-.856l.042-.17h2.012l-.041.257z"/></svg>';
                    return t
                }, t.templates.icon_clock = function(e) {
                    var t = '<svg class="watch-later-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><polyline class="fill hour-hand" points="9.64,4.68 10.56,4.68 11.28,11.21 8.93,11.21 9.64,4.68" /><polyline class="fill minute-hand" points="14.19,13.65 13.7,14.14 8.58,10.4 10.44,8.5 14.19,13.65" /><circle class="stroke" cx="10" cy="10" r="8" stroke-width="2" /></svg>';
                    return t
                }, t.templates.icon_close = function(e) {
                    var t = '<svg class="icon-close" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M60 48.796l-16.812-16.796 16.812-16.796-11.204-11.204-16.796 16.804-16.804-16.804-11.196 11.204 16.796 16.796-16.796 16.796 11.196 11.204 16.804-16.804 16.796 16.804z"/></svg>';
                    return t
                }, t.templates.icon_collections = function(e) {
                    var t = '<svg class="collections-icon" viewBox="0 0 24 24" tabindex="-1"><path class="fill" d="M24 12c0-.3-.1-.6-.4-.8l-2.7-2.3 2.4-1c.4-.1.7-.5.7-.9 0-.3-.1-.6-.4-.8l-7-6c-.1-.1-.4-.2-.6-.2-.1 0-.3 0-.4.1l-15 6c-.3.1-.6.5-.6.9 0 .3.1.6.4.8l2.7 2.3-2.4 1c-.4.1-.7.5-.7.9 0 .3.1.6.4.8l2.7 2.3-2.4 1c-.4.1-.7.5-.7.9 0 .3.1.6.4.8l7 6c.1.1.4.2.6.2.1 0 .3 0 .4-.1l15-6c.4-.1.6-.5.6-.9 0-.3-.1-.6-.4-.8l-2.7-2.3 2.4-1c.4-.1.7-.5.7-.9zm-8.2-9.8l5.3 4.5-12.9 5.1-5.3-4.5 12.9-5.1zm5.3 14.5L8.2 21.8l-5.3-4.5 1.9-.8 2.6 2.2c.1.2.4.3.6.3.1 0 .3 0 .4-.1l10.5-4.2 2.2 2zm-12.9.1l-5.3-4.5 1.9-.8 2.6 2.2c.1.2.4.3.6.3.1 0 .3 0 .4-.1l10.5-4.2 2.3 1.9-13 5.2z"/></svg>';
                    return t
                }, t.templates.icon_embed = function(e) {
                    var t = '<svg class="embed-icon" viewBox="0 0 55 48" preserveAspectRatio="xMidYMid" tabindex="-1"><polygon class="fill" points="16.019,16.385 11.968,13.131 0,24.543 12.082,35.955 16.132,32.703 7.439,24.543"/><polygon class="fill" points="42.92,13.131 38.868,16.384 47.561,24.542 38.981,32.701 43.033,35.955 55,24.542"/><polygon class="fill" points="24.083,39.221 28.76,39.221 36.243,8.351 31.566,8.351"/></svg>';
                    return t
                }, t.templates.icon_facebook = function(e) {
                    var t = '<svg class="facebook-icon" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M35.992 64h-11.992v-32h-8v-11.028l8-0.004-0.013-6.497c0-8.997 2.44-14.471 13.037-14.471h8.824v11.030h-5.514c-4.127 0-4.325 1.541-4.325 4.418l-0.016 5.52h9.918l-1.169 11.028-8.741 0.004-0.008 32z"/></svg>';
                    return t
                }, t.templates.icon_fullscreen = function(e) {
                    var t = '<svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid" tabindex="-1"><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(90)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(180)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(270)" /></svg>';
                    return t
                }, t.templates.icon_hd = function(e) {
                    var t = '<svg viewBox="';
                    return t += e.notification ? "-1 -1 104.717 49.035" : "0 0 102.717 47.035", t += '" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="', t += e.stroke ? "stroke" : "fill", t += '" d="M100.014 6.758c-1.352-2.162-3.244-3.781-5.676-5.134-2.434-1.083-5.947-1.624-10.274-1.624h-21.625l-7.297 47.035h21.895c2.434 0 5.676-.274 8.92-1.352 2.434-.542 4.596-1.627 7.03-3.785 2.161-1.621 4.324-4.055 5.675-7.028 1.621-2.701 2.973-6.757 3.786-11.623.269-3.244.269-6.487.269-9.19-.54-2.704-1.352-5.138-2.703-7.299zm-12.433 16.76c-.541 3.783-1.352 6.485-2.165 8.109-1.08 1.893-2.162 2.703-3.782 3.514-1.083.541-3.515 1.082-6.217 1.082h-3.517l3.517-25.41h3.782c3.514 0 6.217.811 7.568 2.703 1.083 1.625 1.352 5.135.814 10.002z"/><path class="', t += e.stroke ? "stroke" : "fill", t += '" d="M37.572,0L35.14,16.491H19.463L21.895,0H7.027L0,47.035h14.866l2.703-18.922h15.677l-2.971,18.922h14.866L52.439,0H37.572z"/></svg>'
                }, t.templates.icon_heart = function(e) {
                    var t = '<svg class="like-icon" viewBox="0 0 110 81" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M82.496 1c-14.698 0-25.969 11.785-27.496 13.457-1.526-1.672-12.798-13.457-27.494-13.457-16.299 0-27.506 15.037-27.506 27.885 0 12.795 12.562 22.558 22.245 27.592 9.186 4.771 30.601 18.349 32.755 24.523 2.154-6.174 23.57-19.752 32.755-24.523 9.684-5.034 22.245-14.797 22.245-27.592 0-12.848-11.206-27.885-27.504-27.885z"/></svg>';
                    return t
                }, t.templates.icon_lock = function(e) {
                    var t = '<svg viewBox="0 0 46 76" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill bolt" d="M5,42v-15C8,5 39,5 42,27v30h-7v-30C32,14 15,14 12,27v15z"/><rect class="fill" x="0" y="41" height="35" width="46" rx="4" ry="4"/></svg>';
                    return t
                }, t.templates.icon_mail = function(e) {
                    var t = '<svg class="mail-icon" viewBox="0 0 72 72" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M71.754,57.6C71.9,57.169,72,56.718,72,56.241V16.759c0-0.453-0.092-0.881-0.225-1.291l-23.487,19.86L71.754,57.6z"/><path class="fill" d="M35.999,40.118l6.187-4.971l3.131-2.516L68.9,12.693c-0.387-0.113-0.789-0.193-1.213-0.193H4.312c-0.424,0-0.827,0.08-1.215,0.194l23.599,19.949l3.132,2.517L35.999,40.118z"/><path class="fill" d="M67.688,60.5c0.405,0,0.791-0.074,1.164-0.18L45.157,37.843l-9.159,7.361l-9.145-7.351L3.15,60.322C3.522,60.426,3.907,60.5,4.312,60.5H67.688z"/><path class="fill" d="M0.226,15.468C0.092,15.878,0,16.307,0,16.759v39.482c0,0.478,0.099,0.929,0.247,1.356l23.476-22.261L0.226,15.468z"/></svg>';
                    return t
                }, t.templates.icon_pause = function(e) {
                    var t = '<svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><rect class="fill" width="6" height="20" x="0" y="0" /><rect class="fill" width="6" height="20" x="12" y="0" /></svg>';
                    return t
                }, t.templates.icon_play = function(e) {
                    var t = '<svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><polygon class="fill" points="1,0 20,10 1,20" /></svg>';
                    return t
                }, t.templates.icon_share = function(e) {
                    var t = '<svg class="share-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><polygon class="fill" points="20,0 0,12 5,15 17,4 7,16 7,19 9,17 14,20"/></svg>';
                    return t
                }, t.templates.icon_stereoscopic = function(e) {
                    var t = '<svg viewBox="0 0 20 13" tabindex="-1"><path class="fill" d="M 18.74,0 1.2,0 C 0.55,0 0,0.57 0,1.27 L 0,11.73 C 0,12.43 0.55,13 1.23,13 L 6,13 c 0.54,0 1,-0.32 1.16,-0.79 L 8.55,8.74 C 8.79,8.16 9.35,7.75 10,7.75 c 0.65,0 1.21,0.41 1.45,0.99 l 1.39,3.47 c 0.19,0.47 0.62,0.79 1.11,0.79 l 4.79,0 C 19.45,13 20,12.43 20,11.73 L 20,1.27 C 20,0.57 19.45,0 18.74,0 M 5.22,8.58 C 4,8.58 3,7.55 3,6.29 3,5 4,4 5.22,4 6.44,4 7.43,5 7.43,6.29 7.43,7.55 6.44,8.58 5.22,8.58 m 9.56,0 C 13.56,8.58 12.57,7.55 12.57,6.29 12.57,5.03 13.56,4 14.78,4 16,4 17,5.03 17,6.29 17,7.55 16,8.58 14.78,8.58 Z" /></svg>';
                    return t
                }, t.templates.icon_tumblr = function(e) {
                    var t = '<svg class="tumblr-icon" viewBox="0 0 12 20" tabindex="-1"><path class="fill" d="M7.865,19.958 C3.629,19.958 2.02,16.834 2.02,14.627 L2.02,8.105 L0,8.105 L0,5.527 C3.027,4.436 3.756,1.705 3.927,0.149 C3.938,0.042 4.022,0 4.07,0 L6.994,0 L6.994,5.084 L10.987,5.084 L10.987,8.105 L6.979,8.105 L6.979,14.318 C6.993,15.149 7.291,16.287 8.815,16.287 C8.843,16.287 8.872,16.287 8.9,16.286 C9.43,16.272 10.14,16.118 10.511,15.941 L11.471,18.788 C11.11,19.317 9.481,19.932 8.015,19.957 C7.964,19.958 7.915,19.958 7.865,19.958"/></svg>';
                    return t
                }, t.templates.icon_twitter = function(e) {
                    var t = '<svg class="twitter-icon" viewBox="0 0 274 223" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M85.98,222 C54.305,222 24.822,212.715 0,196.801 C4.388,197.319 8.853,197.584 13.38,197.584 C39.658,197.584 63.843,188.617 83.039,173.574 C58.495,173.121 37.781,156.905 30.644,134.621 C34.068,135.276 37.582,135.627 41.196,135.627 C46.312,135.627 51.267,134.942 55.974,133.66 C30.314,128.508 10.981,105.838 10.981,78.662 C10.981,78.426 10.981,78.191 10.985,77.957 C18.548,82.158 27.196,84.681 36.391,84.972 C21.341,74.914 11.438,57.746 11.438,38.287 C11.438,28.008 14.204,18.373 19.032,10.089 C46.696,44.023 88.025,66.353 134.641,68.692 C133.685,64.587 133.188,60.306 133.188,55.91 C133.188,24.935 158.302,-0.178 189.279,-0.178 C205.411,-0.178 219.988,6.634 230.22,17.535 C242.996,15.019 255,10.351 265.837,3.924 C261.649,17.021 252.756,28.013 241.175,34.955 C252.521,33.599 263.331,30.584 273.39,26.123 C265.87,37.371 256.36,47.25 245.402,55.158 C245.51,57.563 245.564,59.982 245.564,62.414 C245.564,136.533 189.148,222 85.98,222"/></svg>';
                    return t
                }, t.templates.icon_unfullscreen = function(e) {
                    var t = '<svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid" tabindex="-1"><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) "/><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(90)" /><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(180)" /><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(270)" /></svg>';
                    return t
                }, t.templates.icon_vod = function(e) {
                    var t = '<svg class="vod-icon" viewBox="0 0 21 23" tabindex="-1"><path class="fill" d="M19.602,4.716l-7.665-4.385C11.169-0.108,9.91-0.111,9.139,0.327L1.4,4.721C0.63,5.158,0,6.234,0,7.112v8.776c0,0.878,0.63,1.955,1.398,2.393l0.526,0.3l7.176,4.09c0.77,0.438,2.028,0.438,2.798,0l7.702-4.39c0.77-0.438,1.4-1.516,1.4-2.393V7.112C21,6.234,20.37,5.156,19.602,4.716z M7.336,15.761L7.337,7.24l8.008,4.26L7.336,15.761z"/></svg>';
                    return t
                }, t.templates.icon_check = function(e) {
                    var t = '<svg class="check-icon" viewBox="0 0 12 12"><path class="fill" d="M10.9 2.9l-.7-.7c-.2-.2-.6-.2-.8-.1L5 6.6 2.6 4.1c-.2-.1-.6-.1-.7 0l-.8.8c-.1.1-.1.5 0 .7l3.1 3.1c.4.4 1 .4 1.4 0l5.1-5.1c.3-.2.3-.6.2-.7z"/></svg>';
                    return t
                }, t.templates.icon_pip = function(e) {
                    var t = '<svg class="pip-icon" viewBox="0 0 16 12"><polygon class="fill" points="6 8 1 8 1 1 14 1 14 6 15 6 15 0 0 0 0 9 6 9 6 8"/><rect class="fill" x="7" y="7" width="9" height="5"/><polyline class="fill enter" transform="translate(4, 4) rotate(180) translate(-4, -4)" points="5.33 2 5.33 3 3.67 3 5.67 5 5 5.67 3 3.67 3 5.33 2 5.33 2 2"/><polyline class="fill return" points="5.33 2 5.33 3 3.67 3 5.67 5 5 5.67 3 3.67 3 5.33 2 5.33 2 2"/></svg>';
                    return t
                }, t.templates.icon_vod_download = function(e) {
                    var t = '<svg class="vod-download-icon" viewBox="0 0 32 32" tabindex="-1"><path class="fill" d="M21.707 24.707l-5 5c-.39.39-1.024.39-1.414 0l-5-5c-.39-.39-.39-1.024 0-1.414l1.06-1.06c.392-.392 1.025-.392 1.415 0L14 23.462V15c0-.552.448-1 1-1h2c.552 0 1 .448 1 1v8.464l1.232-1.232c.39-.39 1.024-.39 1.414 0l1.06 1.06c.392.39.392 1.025 0 1.415z"/><path class="fill" d="M27.894 12.31c.063-.43.106-.864.106-1.31 0-4.97-4.03-9-9-9-3.6 0-6.7 2.12-8.138 5.175C10.175 6.75 9.368 6.5 8.5 6.5 6.015 6.5 4 8.515 4 11c0 .445.067.874.187 1.28C1.76 13.05 0 15.318 0 18c0 3.314 2.686 6 6 6h1c0-2.42 1.718-4.436 4-4.9V15c0-2.21 1.79-4 4-4h2c2.21 0 4 1.79 4 4v4.1c2.282.464 4 2.48 4 4.9h1c3.314 0 6-2.686 6-6 0-2.65-1.72-4.896-4.106-5.69z"/></svg>';
                    return t
                }, t.templates.icon_vod_rent = function(e) {
                    var t = '<svg class="vod-rent-icon" viewBox="0 0 32 32" tabindex="-1"><path class="fill" d="M23 11H9c-.552 0-1 .448-1 1v8c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-8c0-.552-.448-1-1-1z"/><path class="fill" d="M32 22V10c-2.76 0-5-2.24-5-5H5c0 2.76-2.24 5-5 5v12c2.76 0 5 2.24 5 5h22c0-2.76 2.24-5 5-5zm-6-1c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2V11c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2v10z"/></svg>';
                    return t
                }, t.templates.icon_vod_subscribe = function(e) {
                    var t = '<svg class="vod-subscribe-icon" viewBox="0 0 32 32" tabindex="-1"><path class="fill" d="M20 9v2c0 .552.448 1 1 1h10c.552 0 1-.448 1-1V1c0-.552-.448-1-1-1h-2c-.552 0-1 .448-1 1v4.445C24.98 2.01 20.523-.128 15.558.005 7.293.23.413 6.96.018 15.216-.42 24.41 6.905 32 16 32c8.47 0 15.404-6.583 15.964-14.912.04-.585-.413-1.088-1-1.088H28.96c-.514 0-.956.388-.994.9C27.506 23.107 22.326 28 16 28 9.217 28 3.748 22.37 4.01 15.53 4.246 9.284 9.47 4.147 15.72 4.003 19.38 3.92 22.674 5.483 24.926 8H21c-.552 0-1 .448-1 1z"/><path class="fill" d="M13 20v-8l8 4"/></svg>';
                    return t
                }, t.templates.icon_warning = function(e) {
                    var t = '<svg class="warning-icon" tabindex="-1" width="36" height="32.326" viewBox="287.915 380.297 36 32.326"><path d="M309.646 382.963c-2.052-3.555-5.41-3.555-7.462 0L288.79 406.16c-2.05 3.555-.372 6.463 3.732 6.463h26.786c4.104 0 5.783-2.908 3.73-6.463l-13.392-23.197zm-2 23.224c0 .983-.804 1.788-1.788 1.788-.983 0-1.788-.805-1.788-1.788 0-.984.805-1.79 1.788-1.79s1.79.805 1.788 1.79zm-.317-7.76c-.254 2.604-.916 4.735-1.472 4.735-.557 0-1.22-2.13-1.477-4.735-.255-2.604-.464-5.72-.464-6.925 0-1.204.87-2.19 1.935-2.19 1.066 0 1.936.986 1.936 2.19s-.205 4.32-.457 6.925z"/></svg>';
                    return t
                }, t.templates.logo = function(e) {
                    var t = '<svg viewBox="0 0 140 40" preserveAspectRatio="xMidYMid" role="img" aria-label="Vimeo" tabindex="-1"><title>Vimeo</title><g><path class="fill logo-v" d="M31.277 18.832c-.14 3.052-2.27 7.229-6.39 12.531-4.259 5.536-7.863 8.306-10.811 8.306-1.825 0-3.371-1.687-4.633-5.059l-2.529-9.275c-.938-3.372-1.943-5.06-3.019-5.06-.234 0-1.054.494-2.458 1.477l-1.474-1.901c1.546-1.358 3.071-2.717 4.572-4.078 2.062-1.783 3.609-2.72 4.642-2.814 2.438-.234 3.938 1.433 4.502 5.001.608 3.851 1.03 6.246 1.266 7.182.704 3.195 1.476 4.791 2.321 4.791.657 0 1.641-1.037 2.954-3.108 1.312-2.072 2.015-3.649 2.109-4.732.188-1.789-.516-2.686-2.109-2.686-.75 0-1.522.173-2.318.514 1.54-5.044 4.481-7.495 8.823-7.355 3.22.095 4.737 2.184 4.552 6.266z"/><path class="fill logo-i" d="M50.613 28.713c-1.313 2.484-3.119 4.733-5.417 6.748-3.143 2.718-6.285 4.076-9.425 4.076-1.456 0-2.57-.469-3.343-1.406-.773-.938-1.137-2.153-1.09-3.653.045-1.548.526-3.938 1.441-7.173.914-3.232 1.373-4.967 1.373-5.201 0-1.218-.423-1.828-1.266-1.828-.282 0-1.079.494-2.393 1.477l-1.618-1.901c1.501-1.358 3.001-2.717 4.502-4.078 2.017-1.783 3.518-2.72 4.504-2.814 1.546-.14 2.684.314 3.411 1.367.726 1.052.996 2.417.81 4.098-.61 2.852-1.268 6.472-1.972 10.864-.046 2.01.681 3.014 2.182 3.014.656 0 1.827-.693 3.518-2.083 1.406-1.156 2.555-2.243 3.447-3.262l1.336 1.755zm-6.12-25.016c-.047 1.168-.633 2.288-1.76 3.361-1.266 1.212-2.767 1.82-4.501 1.82-2.672 0-3.963-1.166-3.869-3.499.045-1.213.76-2.381 2.144-3.501 1.384-1.119 2.919-1.68 4.609-1.68.984 0 1.805.387 2.462 1.155.656.772.961 1.553.915 2.344z"/><path class="fill logo-m" d="M94.543 28.713c-1.314 2.484-3.117 4.733-5.416 6.748-3.145 2.718-6.285 4.076-9.426 4.076-3.051 0-4.527-1.687-4.432-5.06.045-1.501.338-3.306.877-5.415.539-2.108.832-3.748.879-4.921.049-1.779-.492-2.673-1.623-2.673-1.223 0-2.682 1.456-4.375 4.362-1.788 3.05-2.754 6.003-2.894 8.861-.095 2.02.103 3.568.592 4.645-3.272.096-5.565-.444-6.873-1.617-1.171-1.032-1.708-2.742-1.614-5.135.045-1.501.276-3.001.69-4.502.414-1.5.644-2.837.69-4.011.095-1.734-.54-2.604-1.9-2.604-1.177 0-2.444 1.339-3.806 4.011-1.361 2.673-2.113 5.465-2.253 8.371-.094 2.627.074 4.456.503 5.486-3.219.096-5.505-.582-6.857-2.035-1.122-1.214-1.634-3.06-1.539-5.54.044-1.214.258-2.911.645-5.084.386-2.175.603-3.87.647-5.087.093-.841-.119-1.263-.633-1.263-.281 0-1.079.475-2.393 1.424l-1.687-1.901c.234-.184 1.71-1.545 4.432-4.078 1.969-1.828 3.306-2.766 4.009-2.812 1.219-.095 2.204.409 2.954 1.511s1.126 2.38 1.126 3.834c0 .469-.047.915-.14 1.336.703-1.077 1.523-2.017 2.463-2.814 2.156-1.874 4.572-2.931 7.245-3.166 2.298-.187 3.938.352 4.925 1.617.795 1.033 1.17 2.511 1.125 4.433.329-.28.681-.586 1.056-.915 1.078-1.267 2.133-2.273 3.164-3.023 1.736-1.267 3.541-1.97 5.418-2.112 2.25-.187 3.867.35 4.852 1.611.844 1.028 1.219 2.5 1.127 4.415-.047 1.309-.363 3.213-.949 5.712-.588 2.501-.879 3.936-.879 4.31-.049.982.047 1.659.279 2.034.236.373.797.559 1.689.559.656 0 1.826-.693 3.518-2.083 1.406-1.156 2.555-2.243 3.447-3.262l1.337 1.757z"/><path class="fill logo-e" d="M120.922 28.642c-1.361 2.249-4.033 4.495-8.02 6.743-4.971 2.856-10.012 4.284-15.125 4.284-3.797 0-6.52-1.267-8.16-3.797-1.172-1.735-1.734-3.797-1.688-6.189.045-3.797 1.736-7.407 5.064-10.832 3.658-3.75 7.973-5.627 12.945-5.627 4.596 0 7.033 1.873 7.314 5.615.188 2.384-1.125 4.842-3.938 7.368-3.004 2.76-6.781 4.515-11.328 5.263.842 1.169 2.109 1.752 3.799 1.752 3.375 0 7.059-.855 11.045-2.574 2.859-1.207 5.111-2.461 6.754-3.76l1.338 1.754zm-15.969-7.345c.045-1.259-.469-1.89-1.547-1.89-1.406 0-2.83.969-4.283 2.906-1.451 1.936-2.201 3.789-2.248 5.562-.025 0-.025.305 0 .911 2.295-.839 4.287-2.122 5.971-3.849 1.357-1.491 2.06-2.707 2.107-3.64z"/><path class="fill logo-o" d="M140.018 23.926c-.189 4.31-1.781 8.031-4.783 11.169-3.002 3.137-6.73 4.706-11.186 4.706-3.705 0-6.52-1.195-8.441-3.585-1.404-1.777-2.182-4.001-2.32-6.668-.236-4.029 1.217-7.729 4.361-11.101 3.377-3.746 7.619-5.618 12.732-5.618 3.281 0 5.766 1.102 7.457 3.301 1.594 2.015 2.32 4.614 2.18 7.796zm-7.95-.264c.047-1.269-.129-2.434-.527-3.49-.4-1.057-.975-1.587-1.725-1.587-2.391 0-4.361 1.293-5.906 3.877-1.316 2.115-2.02 4.371-2.111 6.766-.049 1.176.164 2.21.633 3.104.514 1.032 1.242 1.549 2.182 1.549 2.109 0 3.914-1.244 5.416-3.735 1.267-2.068 1.945-4.23 2.038-6.484z"/></g></svg>';
                    return t
                }, t.templates.outer = function(e) {
                    var t = '<div class="video-wrapper"><div class="video"><div class="telecine"></div></div></div><div class="target"></div><div class="captions hidden with-controls" hidden aria-live="assertive"><span></span></div><div class="outro-wrapper hidden" hidden><div class="outro" role="dialog" aria-live="assertive"></div></div><div class="controls-wrapper"><div class="title" role="contentinfo"></div><div class="controls"></div><div class="sidedock hidden" role="toolbar" hidden></div></div><div class="overlay-wrapper hidden" hidden><div class="overlay-cell"><div class="overlay" role="dialog" aria-live="assertive"></div><div class="overlay-icon-wrapper hidden"><div class="overlay-icon"></div></div><div class="overlay-logo logo"></div></div><nav><button class="back cloaked" aria-label="' + e.strings.back + '">';
                    return t += this.render("icon_back") || "", t += '</button><button class="close" aria-label="' + e.strings.close + '">', t += this.render("icon_close") || "", t += '</button></nav></div><div class="notification-wrapper hidden" hidden><div class="notification-cell"><div class="notification" role="dialog" aria-live="assertive"></div></div></div><div class="stats-debug rounded-box hidden" aria-hidden="true" hidden></div>'
                }, t.templates.outro_image = function(e) {
                    var t = "<div> ";
                    return e.url && (t += '<a href="' + e.url + '" target="_blank">'), t += '<img src="' + e.svg_url + '" class="outro-image">', e.url && (t += "</a>"), t += "</div>"
                }, t.templates.outro_link = function(e) {
                    var t = '<h1><a href="' + e.url + '" target="_blank">' + (e.text ? e.text : e.url) + "</a></h1>";
                    return t
                }, t.templates.outro_text = function(e) {
                    var t = '<div class="text-wrapper"><div class="text">' + e.text + "</div></div>";
                    return t
                }, t.templates.outro_videos = function(e) {
                    for (var t = "", n = 0, i = e.contexts.length; n < i; n++) {
                        t += "";
                        var r = e.contexts[n];
                        t += '<div class="video-section', r.promoted && (t += " promoted"), t += '" data-videos="' + r.videos.length + '"><div><h1>' + r.context + '</h1><ul class="videos"> ';
                        for (var o = 0, a = r.videos.length; o < a; o++) t += ' <li><a href="' + r.videos[o].url + '"', e.target && (t += ' target="_blank"'), t += " title=\"'", t += this.escape(r.videos[o].title) || "", t += "'", r.videos[o].owner.id !== e.owner && (t += " from ", t += this.escape(r.videos[o].owner.name) || ""), t += '" data-video-id="' + r.videos[o].id + '"><div class="img-wrapper"><img src="' + r.videos[o].thumbnail + '" alt="" width="295" height="166"></div><div class="header-wrapper"><header><h1>', t += this.escape(r.videos[o].title) || "", t += "</h1> ", r.videos[o].owner.id !== e.owner && (t += " <h2><span>from</span>&nbsp;", t += this.escape(r.videos[o].owner.name) || "", t += "</h2> "), t += " </header></div></a> ";
                        t += " </ul></div></div>"
                    }
                    return t += ""
                }, t.templates.outro_vod = function(e) {
                    var t = '<div class="vod-wrapper"><h1 class="vod-header"><a href="' + e.url + '" target="_blank">';
                    t += this.escape(e.title) || "", t += "</a></h1> ";
                    var n = e.countries,
                        i = e.country;
                    if (this.helpers.isAvailableInCountry(n, i))
                        if (e.purchased) t += ' <a class="vod-watch-button" role="button" href="' + e.url + '" target="_blank">' + e.strings.watch + "</a> ";
                        else {
                            if (!e.isComingSoon) {
                                t += ' <ul class="vod"> ';
                                for (var r = 0, o = e.buttons.length; r < o; r++) {
                                    t += ' <li><a class="vod-button ' + e.buttons[r].type + '" role="button" href="' + e.url + "#buy=" + e.buttons[r].product_id + '" target="_blank" data-product-id="' + e.buttons[r].product_id + '" role="button"><div class="icon"> ', t += "buy" === e.buttons[r].type ? this.render("icon_vod_download") || "" : "rent" === e.buttons[r].type ? this.render("icon_vod_rent") || "" : "subscribe" === e.buttons[r].type ? this.render("icon_vod_subscribe") || "" : this.render("icon_vod") || "", t += " </div> ";
                                    var a = e.currency,
                                        s = e.buttons[r];
                                    t += " <p>" + this.helpers.formatVodLabel(e.translationMap, "outro_string", a, s) + "</p></a></li> "
                                }
                                t += " </ul> "
                            }(e.isPreorder || e.isComingSoon) && (t += " <p>" + e.strings.preRelease + "</p> ")
                        }
                    return t += "</div>"
                }, t.templates.overlay_app_redirect = function(e) {
                    var t = '<div class="window-wrapper"> ';
                    return e.strings.title && (t += ' <div class="app-redirect-title">' + e.strings.title + "</div> "), t += ' <div class="' + (e.strings.title ? "" : "app-redirect--topspace") + '"><a class="app-redirect-button" href="' + e.redirectUrl + '" role="button"', e.newWindow && (t += ' data-new-window="1" target="_blank"'), t += ">" + e.strings.buttonText + "</a></div> ", e.strings.ignoreText && (t += ' <div class="app-redirect-ignore">' + e.strings.ignoreText + "</div> "), e.strings.bottomText && (t += ' <div class="app-redirect-bottom-text">' + e.strings.bottomText + "</div> "), t += "</div>"
                }, t.templates.overlay_email_capture = function(e) {
                    var t = '<div class="window-wrapper email-capture form"><div class="email-capture-form"><h1>' + e.text + '</h1><p class="subtitle">' + e.subtitle + '</p><form action="' + e.action + '" method="post" novalidate><div class="validation-bubble hidden"><div class="validation-bubble-arrow-clipper"><div class="validation-bubble-arrow"></div></div><div class="validation-bubble-message"></div></div><input type="email" name="email" placeholder="' + e.strings.email + '" aria-label="' + e.strings.email + '" required aria-required="true"><input type="text" name="name" placeholder="' + e.strings.fullName + '" aria-label="' + e.strings.fullName + '" maxlength="180"><input type="hidden" name="referrer" value="' + e.referrer + '"><input type="hidden" name="signature" value=""><input type="hidden" name="time" value=""><input type="hidden" name="expires" value=""><input type="submit" value="' + e.strings.submit + '"></form></div><div class="email-capture-confirm hidden"><div class="check-icon-wrapper">';
                    return t += this.render("icon_check") || "", t += "</div><h1>" + e.confirmation + "</h1></div></div>"
                }, t.templates.password = function(e) {
                    var t = '<div class="window-wrapper password form"><h1>' + e.strings.title + '</h1><p class="subtitle">' + e.strings.subtitle + '</p><form action="' + e.action + '" method="post" novalidate><div class="validation-bubble hidden"><div class="validation-bubble-arrow-clipper"><div class="validation-bubble-arrow"></div></div><div class="validation-bubble-message"></div></div><input type="password" name="password" placeholder="' + e.strings.password + '" required aria-required="true" aria-label="' + e.strings.password + '"><input type="submit" value="' + e.strings.watch + '"></form></div>';
                    return t
                }, t.templates.private_locked = function(e) {
                    var t = '<div class="window-wrapper login"><h1>' + e.strings.title + '</h1><p class="subtitle">' + e.strings.subtitle + '</p><a href="' + e.action + '" class="popup" target="_blank" role="button" aria-label="' + e.strings.logInLabel + '">' + e.strings.logIn + "</a></div>";
                    return t
                }, t.templates.private_unlocked = function(e) {
                    var t = '<div class="window-wrapper form unlocked"><h1>' + e.strings.title + '</h1><p class="subtitle">' + e.strings.subtitle + "</p><button>" + e.strings.watch + "</button></div>";
                    return t
                }, t.templates.share = function(e) {
                    var t = '<div class="share-wrapper"><section class="share-screen' + (e.embedOnly ? " cloaked" : "") + '"><h1>' + e.strings.share + '</h1><ul class="buttons"><li><a href="' + e.playerShareUrl + '/facebook" target="_blank" class="facebook" title="' + e.strings.facebook + '" role="button" aria-label="' + e.strings.facebook + '">';
                    return t += this.render("icon_facebook") || "", t += '</a><li><a href="' + e.playerShareUrl + '/twitter" target="_blank" class="twitter" title="' + e.strings.twitter + '" role="button" aria-label="' + e.strings.twitter + '">', t += this.render("icon_twitter") || "", t += '</a><li><a href="' + e.playerShareUrl + '/tumblr" target="_blank" class="tumblr" title="' + e.strings.tumblr + '" role="button" aria-label="' + e.strings.tumblr + '">', t += this.render("icon_tumblr") || "", t += "</a> ", e.url && (t += ' <li><a href="mailto:?subject=', t += encodeURIComponent(e.strings.emailSubject) || "", t += "&amp;body=", t += encodeURIComponent(e.strings.emailBody) || "", t += '" class="email" title="' + e.strings.email + '" role="button" aria-label="' + e.strings.email + '">', t += this.render("icon_mail") || "", t += "</a> "), t += " </ul> ", e.embed && (t += ' <ul class="buttons"><li><a href="' + e.url + '#share" target="_blank" class="embed" title="' + e.strings.embedCode + '" role="button" aria-label="' + e.strings.embedCode + '">', t += this.render("icon_embed") || "", t += "</a></li></ul> "), e.url && (t += ' <p class="footnote share"><a class="clip_url" href="' + e.shareUrl + '" target="_blank">' + e.shareUrl + "</a></p> "), t += " </section> ", e.embed && (t += ' <section class="embed-screen' + (e.embedOnly ? "" : " cloaked") + '"><div class="embed-wrapper"><h1>' + e.strings.embedTitle + '</h1><p class="subtitle">' + e.strings.embedSubtitle + '</p><div class="embed-code form"><div><input type="text" name="embed_code" title="Embed code" value="' + e.embedCode + '" spellcheck="false" aria-readonly="true"', e.readOnly && (t += " readonly"), t += "></div> ", e.copyButton && (t += ' <button class="embed-copy" data-clipboard-text=\'' + e.embedCode + "' data-label=\"" + e.strings.copy + '" data-success-label="' + e.strings.copySuccess + '">' + e.strings.copy + "</button> "), t += " </div> ", e.customizeEmbed && (t += ' <p class="footnote">' + e.strings.customize + "</p> "), t += " </div></section> "), t += "</div>"
                }, t.templates.sidedock = function(e) {
                    var t = "";
                    return e.vodButton && (t += ' <div class="box" data-vod-expiring="' + e.vodPurchaseInfo.expiring + '" data-vod-purchased="' + e.purchased + '"><button class="vod-button rounded-box', e.purchased && (t += " on"), e.vodPurchaseInfo.expiring && (t += " expiring"), t += '" data-product-id="' + e.vodPurchaseInfo.product_id + '"><div class="vod-button-inner"><span class="vod-label">' + e.vodDisplayLabel + "</span> ", t += this.render("icon_vod") || "", t += ' </div></button></div><div class="sidedock-inner">'), e.likeButton && (t += ' <div class="box"><label class="rounded-box hidden like-label" role="presentation"><span>' + (e.liked ? e.strings.unlike : e.strings.like) + '</span></label><button class="like-button rounded-box', e.liked && (t += " on"), t += '" aria-label="', t += e.loggedOut ? "" + e.strings.likeLoggedOut : "" + (e.liked ? e.strings.unlike : e.strings.like), t += '" data-label-add="' + e.strings.like + '" data-label-add-logged-out="' + e.strings.likeLoggedOut + '" data-label-remove="' + e.strings.unlike + '"> ', t += this.render("icon_heart") || "", t += " </button></div>"), e.watchLaterButton && (t += ' <div class="box"><label class="rounded-box hidden watch-later-label" role="presentation"><span>' + (e.addedToWatchLater ? e.strings.watchLaterRemove : e.strings.watchLaterAdd) + '</span></label><button class="watch-later-button rounded-box', e.addedToWatchLater && (t += " on"), t += '" aria-label="', t += e.loggedOut ? "" + e.strings.watchLaterLoggedOut : "" + (e.addedToWatchLater ? e.strings.watchLaterRemove : e.strings.watchLaterAdd), t += '" data-label-add="' + e.strings.watchLaterAdd + '" data-label-add-logged-out="' + e.strings.watchLaterAddLoggedOut + '" data-label-remove="' + e.strings.watchLaterRemove + '"> ', t += this.render("icon_clock") || "", t += " </button></div>"), e.collectionsButton && (t += ' <div class="box"><label class="rounded-box hidden collections-label" role="presentation"><span>' + e.strings.collections + '</span></label><button class="collections-button rounded-box" aria-label="' + e.strings.collections + '"> ', t += this.render("icon_collections") || "", t += " </button></div>"), e.shareButton && (t += ' <div class="box"><label class="rounded-box hidden share-label" role="presentation"><span>' + e.strings.share + '</span></label><button class="share-button rounded-box" aria-label="' + e.strings.share + '"> ', t += this.render("icon_share") || "", t += " </button></div>"), e.vodButton && (t += " </div>"), t += ""
                }, t.templates.stats_debug = function(e) {
                    var t = '<p><span class="stats-debug-label">Clip ID:</span><span class="stats-debug-value stats-debug-clip-id">' + e.clipId + "</span></p>";
                    return e.displayProfile && (t += '<p><span class="stats-debug-label">Profile ID:</span><span class="stats-debug-value stats-debug-profile-id">' + e.profileId + "</span></p>"), t += '<p><span class="stats-debug-label">Delivery:</span><span class="stats-debug-value stats-debug-delivery">' + e.delivery + '</span></p><p><span class="stats-debug-label">Playing:</span><span class="stats-debug-value stats-debug-resolution">' + e.resolution + '</span></p><p><span class="stats-debug-label">Embed size:</span><span class="stats-debug-value stats-debug-dimensions">' + e.dimensions + '</span></p><p><span class="stats-debug-label">CDN:</span><span class="stats-debug-value stats-debug-cdn">' + e.cdn + "</span></p>", e.displayAudioVideoStream && (t += '<p><span class="stats-debug-label">Separate AV:</span><span class="stats-debug-value stats-debug-test-group">' + e.separateAudioVideo + "</span></p>"), t += "", e.testGroup && (t += '<p><span class="stats-debug-label">Tests:</span><span class="stats-debug-value stats-debug-test-group">' + e.testGroup + "</span></p>"), t += "", e.displayDroppedFrames && (t += '<p><span class="stats-debug-label">Dropped frames:</span><span class="stats-debug-value stats-debug-dropped-frames">0 / 0</span></p>'), t += "", e.displayBandwidth && (t += '<p><span class="stats-debug-label">Bandwidth:</span><span class="stats-debug-value stats-debug-bandwidth">0 Kbps</span><span class="stats-debug-bandwidth-minmax"> (<span class="stats-debug-value stats-debug-bandwidth-min"></span><span class="stats-debug-value stats-debug-bandwidth-max"></span>) </span></p><div class="stats-debug-time-series"></div>'), t += '<button class="stats-debug-close" aria-label="Close stats debug panel">', t += this.render("icon_close") || "", t += '</button><input type="text" class="stats-debug-code"><a href="javascript:void(0)" class="stats-debug-copy" target="_blank">Open link</a>'
                }, t.templates.threesixty_reminder = function(e) {
                    var t = '<div class="intro-wrap text-only"><div> ';
                    return e.showArrows && (t += ' <div class="key-wrapper"><div class="key-row"><div class="key"><div class="arrow arrow-top"></div></div></div><div class="key-row"><div class="key"><div class="arrow arrow-left"></div></div><div class="key"><div class="arrow arrow-down"></div></div><div class="key"><div class="arrow arrow-right"></div></div></div></div> '), t += " <div>" + e.text + "</div></div></div>"
                }, t.templates.title_byline_badge = function(e) {
                    var t = "&nbsp;";
                    return e.link && (t += '<a tabindex="-1" href="' + e.link + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <span class="byline-badge ' + e.cssClass + '">' + e.cssClass + "</span>", e.link && (t += "</a>"), t += ""
                }, t.templates.title_owner_byline = function(e) {
                    var t = "";
                    return e.linkToOwner ? (t += '<a href="' + e.ownerLink + '"', e.targetBlank && (t += ' target="_blank"'), t += ">", t += this.escape(e.owner) || "", t += "</a>") : (t += '<span class="user">', t += this.escape(e.owner) || "", t += "</span>"), t += ""
                }, t.templates.title = function(e) {
                    var t = "<header> ";
                    return e.badge && (t += ' <div class="badge', e.badge.shadow && (t += " shadow"), t += '"> ', e.badge.link && (t += '<a href="' + e.badge.link + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <img src="' + e.badge.img + '"', e.badge.offset && (t += ' style="margin-top:' + e.badge.offset.y + "px;margin-left:" + e.badge.offset.x + 'px"'), t += ' width="' + e.badge.width + '" height="' + e.badge.height + '" alt="' + e.badge.name + ' Badge"> ', e.badge.link && (t += "</a>"), t += " </div> "), e.showPortrait && (t += ' <div class="portrait" aria-hidden="true"> ', e.linkToOwner && (t += '<a tabindex="-1" href="' + e.ownerLink + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <img src="' + e.portraitImg + '" alt="" width="60" height="60"> ', e.linkToOwner && (t += "</a>"), t += " </div> "), t += ' <div class="headers"> ', e.showTitle && (t += " <h1> ", e.showTitleLink && (t += '<a href="' + e.titleLink + '"', e.targetBlank && (t += ' target="_blank"'), t += " data-clip-link>"), t += this.escape(e.title) || "", e.showTitleLink && (t += "</a>"), e.is360 && (t += '<div class="threesix-badge-title">360</div>'), t += " </h1> "), e.showByline && (t += ' <div class="sub-title"><h2 class="byline-from">' + e.strings.byline + "</h2> ", e.is360 && !e.showTitle && (t += ' <div class="threesix-badge-byline">360</div> '), t += " </div> "), !e.is360 || e.showByline || e.showTitle || (t += ' <div class="threesix-badge-loner">360</div> '), t += " </div></header>"
                }, e.exports ? e.exports = t : window.Aftershave = t
            }()
        }),
        Ot = e(function(e) {
            ! function(t, n, i) {
                function r() {
                    var e = Array.prototype.slice.apply(arguments),
                        t = e.shift();
                    p[t].forEach(function(t) {
                        "function" == typeof t && t.apply(t, e)
                    })
                }

                function o(e) {
                    return function(t, n) {
                        v.indexOf(t) !== -1 && e.call(this, t, n)
                    }
                }

                function a(e) {
                    var t = null;
                    if ("VIDEO" === e.tagName) t = e;
                    else {
                        var n = e.getElementsByTagName("video");
                        n[0] && (t = n[0])
                    }
                    return t
                }

                function s(e) {
                    var t = a(e);
                    if (t && t.webkitEnterFullscreen) {
                        try {
                            t.readyState < t.HAVE_METADATA ? (t.addEventListener("loadedmetadata", function e() {
                                t.removeEventListener("loadedmetadata", e, !1), t.webkitEnterFullscreen(), y = !!t.getAttribute("controls")
                            }, !1), t.load()) : (t.webkitEnterFullscreen(), y = !!t.getAttribute("controls")), g = t
                        } catch (t) {
                            return E("not_supported", e)
                        }
                        return !0
                    }
                    return E(void 0 === f.request ? "not_supported" : "not_enabled", e)
                }

                function c() {
                    L.element || (T(), d())
                }

                function u() {
                    i && "webkitfullscreenchange" === f.change && t.addEventListener("resize", c, !1)
                }

                function d() {
                    i && "webkitfullscreenchange" === f.change && t.removeEventListener("resize", c, !1)
                }
                var l = /i(Pad|Phone|Pod)/.test(navigator.userAgent) && parseInt(navigator.userAgent.replace(/^.*OS (\d+)_(\d+).*$/, "$1.$2"), 10) >= 7,
                    f = function() {
                        var e = n.createElement("video"),
                            t = {
                                request: ["requestFullscreen", "webkitRequestFullscreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullscreen"],
                                exit: ["exitFullscreen", "webkitCancelFullScreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"],
                                enabled: ["fullscreenEnabled", "webkitFullscreenEnabled", "mozFullScreenEnabled", "msFullscreenEnabled"],
                                element: ["fullscreenElement", "webkitFullscreenElement", "webkitCurrentFullScreenElement", "mozFullScreenElement", "msFullscreenElement"],
                                change: ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"],
                                error: ["fullscreenerror", "webkitfullscreenerror", "mozfullscreenerror", "MSFullscreenError"]
                            },
                            i = {};
                        for (var r in t)
                            for (var o = 0, a = t[r].length; o < a; o++)
                                if (t[r][o] in e || t[r][o] in n || "on" + t[r][o].toLowerCase() in n) {
                                    i[r] = t[r][o];
                                    break
                                }
                        return i
                    }(),
                    h = {
                        ENTER: "enter",
                        EXIT: "exit",
                        CHANGE: "change",
                        ERROR: "error"
                    },
                    v = [],
                    p = {},
                    m = null;
                Object.keys(h).forEach(function(e) {
                    v.push(h[e]), p[h[e]] = []
                });
                var g = null,
                    y = null,
                    _ = function() {},
                    b = [],
                    w = !1,
                    k = !1,
                    S = {
                        chrome: navigator.userAgent.indexOf("Chrome") !== -1,
                        android: navigator.userAgent.indexOf("Android") !== -1,
                        safari: navigator.userAgent.indexOf("Safari") !== -1,
                        apple: navigator.userAgent.indexOf("Apple") !== -1
                    };
                S.chrome && S.android && (w = parseInt(navigator.userAgent.replace(/^.*Chrome\/(\d+).*$/, "$1"), 10) || !0), S.safari && S.apple && !S.chrome && !S.android && (k = parseFloat(navigator.userAgent.replace(/^.*Version\/(\d+)\.(\d+).*$/, "$1.$2")) || !0);
                var x = function(e) {
                        var t = b[b.length - 1];
                        t && (e !== t.element && e !== g || !t.hasEntered) && ("VIDEO" === e.tagName && (g = e), 1 === b.length && L.onenter(L.element), t.enter.call(t.element, e || t.element), t.hasEntered = !0, r(h.ENTER, L.element))
                    },
                    T = function() {
                        !g || y || l || (g.setAttribute("controls", "controls"), g.removeAttribute("controls")), g = null, y = null;
                        var e = b.pop();
                        e && (e.exit.call(e.element), r(h.EXIT, e.element), !i && m && 0 === t.scrollY && t.scrollTo(0, m), L.element || (b.forEach(function(e) {
                            e.exit.call(e.element), r(h.EXIT, e.element)
                        }), b = [], L.onexit()))
                    },
                    E = function(e, t) {
                        if (b.length > 0) {
                            var n = b.pop();
                            t = t || n.element, n.error.call(t, e), L.onerror(t, e), r(h.ERROR, t, e)
                        }
                    },
                    L = {
                        request: function(e, r, o, a) {
                            if (e = e || n.body, b.push({
                                    element: e,
                                    enter: r || _,
                                    exit: o || _,
                                    error: a || _
                                }), void 0 === f.request) return s(e);
                            if (i && n[f.enabled] === !1) return s(e);
                            if (w !== !1 && w < 32) return s(e);
                            if (i && void 0 === f.enabled) return f.enabled = "webkitFullscreenEnabled", e[f.request](), void setTimeout(function() {
                                n[f.element] ? n[f.enabled] = !0 : (n[f.enabled] = !1, s(e))
                            }, 250);
                            try {
                                !i && t && (m = t.scrollY), e[f.request](), k >= 5.1 && setTimeout(function() {
                                    n[f.element] || E(i ? "not_enabled" : "not_allowed", e)
                                }, 100)
                            } catch (t) {
                                E("not_enabled", e)
                            }
                        },
                        exit: function() {
                            d(), !n[f.exit] && L.element ? L.element[f.exit]() : n[f.exit]()
                        },
                        toggle: function(e, t, n, i) {
                            L.element ? L.exit() : L.request(e, t, n, i)
                        },
                        videoEnabled: function(e) {
                            if (L.enabled) return !0;
                            e = e || n.body;
                            var t = a(e);
                            return !(!t || void 0 === t.webkitSupportsFullscreen) && (t.readyState < t.HAVE_METADATA ? "maybe" : t.webkitSupportsFullscreen)
                        },
                        on: o(function(e, t) {
                            p[e].push(t)
                        }),
                        off: o(function(e, t) {
                            var n = p[e].indexOf(t);
                            n > -1 && p[e].splice(n, 1)
                        }),
                        onenter: _,
                        onexit: _,
                        onchange: _,
                        onerror: _
                    };
                try {
                    Object.defineProperties(L, {
                        element: {
                            enumerable: !0,
                            get: function() {
                                return g && g.webkitDisplayingFullscreen ? g : n[f.element] || null
                            }
                        },
                        enabled: {
                            enumerable: !0,
                            get: function() {
                                return "webkitCancelFullScreen" === f.exit && !i || !(w !== !1 && w < 32) && (n[f.enabled] || !1)
                            }
                        }
                    })
                } catch (e) {
                    L.element = null, L.enabled = !1
                }
                f.change && n.addEventListener(f.change, function(e) {
                    if (L.onchange(L.element), r(h.CHANGE, L.element), L.element) {
                        var t = b[b.length - 2];
                        t && t.element === L.element ? T() : (x(L.element), u())
                    } else T()
                }, !1), n.addEventListener("webkitbeginfullscreen", function(e) {
                    var t = !0;
                    if (b.length > 0)
                        for (var n = 0, i = b.length; n < i; n++) {
                            var o = a(b[n].element);
                            if (o === e.srcElement) {
                                t = !1;
                                break
                            }
                        }
                    t && b.push({
                        element: e.srcElement,
                        enter: _,
                        exit: _,
                        error: _
                    }), L.onchange(e.srcElement), r(h.CHANGE, L.srcElement), x(e.srcElement)
                }, !0), n.addEventListener("webkitendfullscreen", function(e) {
                    L.onchange(e.srcElement), r(h.CHANGE, e.srcElement), T(e.srcElement)
                }, !0), f.error && n.addEventListener(f.error, function(e) {
                    E("not_allowed")
                }, !1), e.exports ? e.exports = L : t.BigScreen = L
            }(window, document, self !== top)
        }),
        Mt = navigator.userAgent.toLowerCase(),
        Ft = !!T("android") && (parseFloat(Mt.replace(/^.* android (\d+)\.(\d+).*$/, "$1.$2")) || !0),
        It = window.devicePixelRatio || 1,
        qt = !(!T("windows phone") && !T("iemobile")) && (parseFloat(Mt.replace(/^.* windows phone (os )?(\d+)\.(\d+).*$/, "$2.$3")) || !0),
        Rt = !!T("msie") && parseFloat(Mt.replace(/^.*msie (\d+).*$/, "$1")),
        Bt = !!T("trident") && parseFloat(Mt.replace(/^.*trident\/(\d+)\.(\d+).*$/, "$1.$2")) + 4,
        Dt = !!(T("ipad;") || T("iphone;") || T("ipod touch;")) && parseFloat(Mt.replace(/^.* os (\d+)_(\d+).*$/, "$1.$2")),
        Nt = {
            airPlay: "WebKitPlaybackTargetAvailabilityEvent" in window,
            android: Ft,
            iOS: Dt,
            mobileAndroid: Ft && T("mobile"),
            browser: {
                bb10: T("bb10"),
                chrome: T("chrome"),
                firefox: T("firefox"),
                ie: Rt || Bt,
                edge: T("edge"),
                opera: T("opera"),
                safari: T("safari") && T("apple") && !T("chrome") && !T("android")
            },
            devicePixelRatio: It,
            flash: L(),
            iPhone: T("iphone;") || T("ipod touch;") || T("ipod;"),
            iPad: T("ipad;"),
            iPadNonRetina: T("ipad;") && It < 2,
            mac: T("mac os"),
            pointerEvents: window.navigator.pointerEnabled || window.navigator.msPointerEnabled || !1,
            svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || T("windows phone") || window.navigator.maxTouchPoints > 1 || window.navigator.msMaxTouchPoints || !1,
            transformProperty: E("transform"),
            windowsPhone: qt
        };
    if (Nt.spatialPlayback = !(Nt.browser.safari || Nt.iOS || Nt.iPad || Nt.browser.ie), Nt.stereoscopic = Nt.spatialPlayback && Nt.mobileAndroid, function() {
            for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
                var n = e[t];
                window.requestAnimationFrame = window[n + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]
            }!/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) && window.requestAnimationFrame && window.cancelAnimationFrame || (window.requestAnimationFrame = function(e) {
                return setTimeout(e, 0)
            }, window.cancelAnimationFrame = clearTimeout)
        }(), Number.isInteger || (Number.isInteger = function(e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        }), !Object.setPrototypeOf && !{}.__proto__) {
        var jt = Object.getPrototypeOf;
        Object.getPrototypeOf = function(e) {
            return e.__proto__ ? e.__proto__ : jt.call(Object, e)
        }
    }
    if ("undefined" != typeof DOMTokenList) {
        var Vt = function() {
            var e = document.createElement("div");
            return e.classList.toggle("test-class", !1), !e.classList.contains("test-class")
        }();
        Vt || ! function() {
            var e = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(t, n) {
                return n === !0 ? void this.add(t) : n === !1 ? void this.remove(t) : void e.call(this, t)
            }
        }()
    }
    var Ht = {
            collectWindowErrors: !0,
            debug: !1
        },
        Ut = "undefined" != typeof window ? window : "undefined" != typeof ct ? ct : "undefined" != typeof self ? self : {},
        zt = [].slice,
        Wt = "?",
        Xt = /^(?:Uncaught (?:exception: )?)?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error): ?(.*)$/;
    Ht.report = function() {
        function e(e) {
            o(), l.push(e)
        }

        function t(e) {
            for (var t = l.length - 1; t >= 0; --t) l[t] === e && l.splice(t, 1)
        }

        function n() {
            a(), l = []
        }

        function i(e, t) {
            var n = null;
            if (!t || Ht.collectWindowErrors) {
                for (var i in l)
                    if (l.hasOwnProperty(i)) try {
                        l[i].apply(null, [e].concat(zt.call(arguments, 2)))
                    } catch (e) {
                        n = e
                    }
                if (n) throw n
            }
        }

        function r(e, t, n, r, o) {
            var a = null;
            if (v) Ht.computeStackTrace.augmentStackTraceWithInitialElement(v, t, n, e), s();
            else if (o) a = Ht.computeStackTrace(o), i(a, !0);
            else {
                var c, d = {
                        url: t,
                        line: n,
                        column: r
                    },
                    l = void 0,
                    f = e;
                if ("[object String]" === {}.toString.call(e)) {
                    var c = e.match(Xt);
                    c && (l = c[1], f = c[2])
                }
                d.func = Wt, a = {
                    name: l,
                    message: f,
                    url: M(),
                    stack: [d]
                }, i(a, !0)
            }
            return !!u && u.apply(this, arguments)
        }

        function o() {
            d || (u = Ut.onerror, Ut.onerror = r, d = !0)
        }

        function a() {
            d && (Ut.onerror = u, d = !1, u = void 0)
        }

        function s() {
            var e = v,
                t = f;
            f = null, v = null, h = null, i.apply(null, [e, !1].concat(t))
        }

        function c(e, t) {
            var n = zt.call(arguments, 1);
            if (v) {
                if (h === e) return;
                s()
            }
            var i = Ht.computeStackTrace(e);
            if (v = i, h = e, f = n, setTimeout(function() {
                    h === e && s()
                }, i.incomplete ? 2e3 : 0), t !== !1) throw e
        }
        var u, d, l = [],
            f = null,
            h = null,
            v = null;
        return c.subscribe = e, c.unsubscribe = t, c.uninstall = n, c
    }(), Ht.computeStackTrace = function() {
        function e(e) {
            if ("undefined" != typeof e.stack && e.stack) {
                for (var t, n, i = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, r = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i, o = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, a = e.stack.split("\n"), s = [], c = (/^(.*) is undefined$/.exec(e.message), 0), u = a.length; c < u; ++c) {
                    if (t = i.exec(a[c])) {
                        var d = t[2] && t[2].indexOf("native") !== -1;
                        n = {
                            url: d ? null : t[2],
                            func: t[1] || Wt,
                            args: d ? [t[2]] : [],
                            line: t[3] ? +t[3] : null,
                            column: t[4] ? +t[4] : null
                        }
                    } else if (t = o.exec(a[c])) n = {
                        url: t[2],
                        func: t[1] || Wt,
                        args: [],
                        line: +t[3],
                        column: t[4] ? +t[4] : null
                    };
                    else {
                        if (!(t = r.exec(a[c]))) continue;
                        n = {
                            url: t[3],
                            func: t[1] || Wt,
                            args: t[2] ? t[2].split(",") : [],
                            line: t[4] ? +t[4] : null,
                            column: t[5] ? +t[5] : null
                        }
                    }!n.func && n.line && (n.func = Wt), s.push(n)
                }
                return s.length ? (s[0].column || "undefined" == typeof e.columnNumber || (s[0].column = e.columnNumber + 1), {
                    name: e.name,
                    message: e.message,
                    url: M(),
                    stack: s
                }) : null
            }
        }

        function t(e, t, n, i) {
            var r = {
                url: t,
                line: n
            };
            if (r.url && r.line) {
                if (e.incomplete = !1, r.func || (r.func = Wt), e.stack.length > 0 && e.stack[0].url === r.url) {
                    if (e.stack[0].line === r.line) return !1;
                    if (!e.stack[0].line && e.stack[0].func === r.func) return e.stack[0].line = r.line, !1
                }
                return e.stack.unshift(r), e.partial = !0, !0
            }
            return e.incomplete = !0, !1
        }

        function n(e, r) {
            for (var o, a, s = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, c = [], u = {}, d = !1, l = n.caller; l && !d; l = l.caller)
                if (l !== i && l !== Ht.report) {
                    if (a = {
                            url: null,
                            func: Wt,
                            line: null,
                            column: null
                        }, l.name ? a.func = l.name : (o = s.exec(l.toString())) && (a.func = o[1]), "undefined" == typeof a.func) try {
                        a.func = o.input.substring(0, o.input.indexOf("{"))
                    } catch (e) {}
                    u["" + l] ? d = !0 : u["" + l] = !0, c.push(a)
                }
            r && c.splice(0, r);
            var f = {
                name: e.name,
                message: e.message,
                url: M(),
                stack: c
            };
            return t(f, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), f
        }

        function i(t, i) {
            var r = null;
            i = null == i ? 0 : +i;
            try {
                if (r = e(t)) return r
            } catch (e) {
                if (Ht.debug) throw e
            }
            try {
                if (r = n(t, i + 1)) return r
            } catch (e) {
                if (Ht.debug) throw e
            }
            return {
                name: t.name,
                message: t.message,
                url: M()
            }
        }
        return i.augmentStackTraceWithInitialElement = t, i.computeStackTraceFromStackProp = e, i
    }();
    var Kt = Ht;
    F.prototype = new Error, F.prototype.constructor = F;
    var $t = F,
        Yt = e(function(e, t) {
            function n(e, t, n, r) {
                return JSON.stringify(e, i(t, r), n)
            }

            function i(e, t) {
                var n = [],
                    i = [];
                return null == t && (t = function(e, t) {
                        return n[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, n.indexOf(t)).join(".") + "]"
                    }),
                    function(r, o) {
                        if (n.length > 0) {
                            var a = n.indexOf(this);
                            ~a ? n.splice(a + 1) : n.push(this), ~a ? i.splice(a, 1 / 0, r) : i.push(r), ~n.indexOf(o) && (o = t.call(this, r, o))
                        } else n.push(o);
                        return null == e ? o : e.call(this, r, o)
                    }
            }
            t = e.exports = n, t.getSerialize = i
        }),
        Gt = function(e, t, n) {
            var i = e[t],
                r = e;
            if (t in e) {
                var o = "warn" === t ? "warning" : t;
                e[t] = function() {
                    var e = [].slice.call(arguments),
                        t = "" + e.join(" "),
                        a = {
                            level: o,
                            logger: "console",
                            extra: {
                                arguments: e
                            }
                        };
                    n && n(t, a), i && Function.prototype.apply.call(i, r, e)
                }
            }
        },
        Qt = {
            wrapMethod: Gt
        },
        Jt = Kt,
        Zt = $t,
        en = Yt,
        tn = Qt.wrapMethod,
        nn = "source protocol user pass host port path".split(" "),
        rn = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
        on = "undefined" != typeof window ? window : "undefined" != typeof ct ? ct : "undefined" != typeof self ? self : {},
        an = on.document;
    q.prototype = {
        VERSION: "3.9.2",
        debug: !1,
        TraceKit: Jt,
        config: function(e, t) {
            var n = this;
            if (n._globalServer) return this._logDebug("error", "Error: Raven has already been configured"), n;
            if (!e) return n;
            var i = n._globalOptions;
            t && H(t, function(e, t) {
                "tags" === e || "extra" === e || "user" === e ? n._globalContext[e] = t : i[e] = t
            }), n.setDSN(e), i.ignoreErrors.push(/^Script error\.?$/), i.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), i.ignoreErrors = X(i.ignoreErrors), i.ignoreUrls = !!i.ignoreUrls.length && X(i.ignoreUrls), i.whitelistUrls = !!i.whitelistUrls.length && X(i.whitelistUrls), i.includePaths = X(i.includePaths), i.maxBreadcrumbs = Math.max(0, Math.min(i.maxBreadcrumbs || 100, 100));
            var r = {
                    xhr: !0,
                    console: !0,
                    dom: !0,
                    location: !0
                },
                o = i.autoBreadcrumbs;
            return "[object Object]" === {}.toString.call(o) ? o = U(r, o) : o !== !1 && (o = r), i.autoBreadcrumbs = o, Jt.collectWindowErrors = !!i.collectWindowErrors, n
        },
        install: function() {
            var e = this;
            return e.isSetup() && !e._isRavenInstalled && (Jt.report.subscribe(function() {
                e._handleOnErrorStackInfo.apply(e, arguments)
            }), e._instrumentTryCatch(), e._globalOptions.autoBreadcrumbs && e._instrumentBreadcrumbs(), e._drainPlugins(), e._isRavenInstalled = !0), Error.stackTraceLimit = e._globalOptions.stackTraceLimit, this
        },
        setDSN: function(e) {
            var t = this,
                n = t._parseDSN(e),
                i = n.path.lastIndexOf("/"),
                r = n.path.substr(1, i);
            t._dsn = e, t._globalKey = n.user, t._globalSecret = n.pass && n.pass.substr(1), t._globalProject = n.path.substr(i + 1), t._globalServer = t._getGlobalServer(n), t._globalEndpoint = t._globalServer + "/" + r + "api/" + t._globalProject + "/store/"
        },
        context: function(e, t, n) {
            return B(e) && (n = t || [], t = e, e = void 0), this.wrap(e, t).apply(this, n)
        },
        wrap: function(e, t, n) {
            function i() {
                var i = [],
                    o = arguments.length,
                    a = !e || e && e.deep !== !1;
                for (n && B(n) && n.apply(this, arguments); o--;) i[o] = a ? r.wrap(e, arguments[o]) : arguments[o];
                try {
                    return t.apply(this, i)
                } catch (t) {
                    throw r._ignoreNextOnError(), r.captureException(t, e), t
                }
            }
            var r = this;
            if (R(t) && !B(e)) return e;
            if (B(e) && (t = e, e = void 0), !B(t)) return t;
            try {
                if (t.__raven__) return t;
                if (t.__raven_wrapper__) return t.__raven_wrapper__
            } catch (e) {
                return t
            }
            for (var o in t) W(t, o) && (i[o] = t[o]);
            return i.prototype = t.prototype, t.__raven_wrapper__ = i, i.__raven__ = !0, i.__inner__ = t, i
        },
        uninstall: function() {
            return Jt.report.uninstall(), this._restoreBuiltIns(), Error.stackTraceLimit = this._originalErrorStackTraceLimit, this._isRavenInstalled = !1, this
        },
        captureException: function(e, t) {
            if (!V(e)) return this.captureMessage(e, U({
                trimHeadFrames: 1,
                stacktrace: !0
            }, t));
            this._lastCapturedException = e;
            try {
                var n = Jt.computeStackTrace(e);
                this._handleStackInfo(n, t)
            } catch (t) {
                if (e !== t) throw t
            }
            return this
        },
        captureMessage: function(e, t) {
            if (!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(e)) {
                t = t || {};
                var n = U({
                    message: e + ""
                }, t);
                if (this._globalOptions.stacktrace || t && t.stacktrace) {
                    var i;
                    try {
                        throw new Error(e)
                    } catch (e) {
                        i = e
                    }
                    i.name = null, t = U({
                        fingerprint: e,
                        trimHeadFrames: (t.trimHeadFrames || 0) + 1
                    }, t);
                    var r = Jt.computeStackTrace(i),
                        o = this._prepareFrames(r, t);
                    n.stacktrace = {
                        frames: o.reverse()
                    }
                }
                return this._send(n), this
            }
        },
        captureBreadcrumb: function(e) {
            var t = U({
                timestamp: I() / 1e3
            }, e);
            if (B(this._globalOptions.breadcrumbCallback)) {
                var n = this._globalOptions.breadcrumbCallback(t);
                if (N(n) && !j(n)) t = n;
                else if (n === !1) return this
            }
            return this._breadcrumbs.push(t), this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs && this._breadcrumbs.shift(), this
        },
        addPlugin: function(e) {
            var t = [].slice.call(arguments, 1);
            return this._plugins.push([e, t]), this._isRavenInstalled && this._drainPlugins(), this
        },
        setUserContext: function(e) {
            return this._globalContext.user = e, this
        },
        setExtraContext: function(e) {
            return this._mergeContext("extra", e), this
        },
        setTagsContext: function(e) {
            return this._mergeContext("tags", e), this
        },
        clearContext: function() {
            return this._globalContext = {}, this
        },
        getContext: function() {
            return JSON.parse(en(this._globalContext))
        },
        setEnvironment: function(e) {
            return this._globalOptions.environment = e, this
        },
        setRelease: function(e) {
            return this._globalOptions.release = e, this
        },
        setDataCallback: function(e) {
            var t = this._globalOptions.dataCallback;
            return this._globalOptions.dataCallback = B(e) ? function(n) {
                return e(n, t)
            } : e, this
        },
        setBreadcrumbCallback: function(e) {
            var t = this._globalOptions.breadcrumbCallback;
            return this._globalOptions.breadcrumbCallback = B(e) ? function(n) {
                return e(n, t)
            } : e, this
        },
        setShouldSendCallback: function(e) {
            var t = this._globalOptions.shouldSendCallback;
            return this._globalOptions.shouldSendCallback = B(e) ? function(n) {
                return e(n, t)
            } : e, this
        },
        setTransport: function(e) {
            return this._globalOptions.transport = e, this
        },
        lastException: function() {
            return this._lastCapturedException
        },
        lastEventId: function() {
            return this._lastEventId
        },
        isSetup: function() {
            return !!this._hasJSON && (!!this._globalServer || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this._logDebug("error", "Error: Raven has not been configured.")), !1))
        },
        afterLoad: function() {
            var e = on.RavenConfig;
            e && this.config(e.dsn, e.config).install()
        },
        showReportDialog: function(e) {
            if (an) {
                e = e || {};
                var t = e.eventId || this.lastEventId();
                if (!t) throw new Zt("Missing eventId");
                var n = e.dsn || this._dsn;
                if (!n) throw new Zt("Missing DSN");
                var i = encodeURIComponent,
                    r = "";
                r += "?eventId=" + i(t), r += "&dsn=" + i(n);
                var o = e.user || this._globalContext.user;
                o && (o.name && (r += "&name=" + i(o.name)), o.email && (r += "&email=" + i(o.email)));
                var a = this._getGlobalServer(this._parseDSN(n)),
                    s = an.createElement("script");
                s.async = !0, s.src = a + "/api/embed/error-page/" + r, (an.head || an.body).appendChild(s)
            }
        },
        _ignoreNextOnError: function() {
            var e = this;
            this._ignoreOnError += 1, setTimeout(function() {
                e._ignoreOnError -= 1
            })
        },
        _triggerEvent: function(e, t) {
            var n, i;
            if (this._hasDocument) {
                t = t || {}, e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1), an.createEvent ? (n = an.createEvent("HTMLEvents"), n.initEvent(e, !0, !0)) : (n = an.createEventObject(), n.eventType = e);
                for (i in t) W(t, i) && (n[i] = t[i]);
                if (an.createEvent) an.dispatchEvent(n);
                else try {
                    an.fireEvent("on" + n.eventType.toLowerCase(), n)
                } catch (e) {}
            }
        },
        _breadcrumbEventHandler: function(e) {
            var t = this;
            return function(n) {
                if (t._keypressTimeout = null, t._lastCapturedEvent !== n) {
                    t._lastCapturedEvent = n;
                    var i, r = n.target;
                    try {
                        i = G(r)
                    } catch (e) {
                        i = "<unknown>"
                    }
                    t.captureBreadcrumb({
                        category: "ui." + e,
                        message: i
                    })
                }
            }
        },
        _keypressEventHandler: function() {
            var e = this,
                t = 1e3;
            return function(n) {
                var i = n.target,
                    r = i && i.tagName;
                if (r && ("INPUT" === r || "TEXTAREA" === r || i.isContentEditable)) {
                    var o = e._keypressTimeout;
                    o || e._breadcrumbEventHandler("input")(n), clearTimeout(o), e._keypressTimeout = setTimeout(function() {
                        e._keypressTimeout = null
                    }, t)
                }
            }
        },
        _captureUrlChange: function(e, t) {
            var n = $(this._location.href),
                i = $(t),
                r = $(e);
            this._lastHref = t, n.protocol === i.protocol && n.host === i.host && (t = i.relative), n.protocol === r.protocol && n.host === r.host && (e = r.relative), this.captureBreadcrumb({
                category: "navigation",
                data: {
                    to: t,
                    from: e
                }
            })
        },
        _instrumentTryCatch: function() {
            function e(e) {
                return function(t, i) {
                    for (var r = new Array(arguments.length), o = 0; o < r.length; ++o) r[o] = arguments[o];
                    var a = r[0];
                    return B(a) && (r[0] = n.wrap(a)), e.apply ? e.apply(this, r) : e(r[0], r[1])
                }
            }

            function t(e) {
                var t = on[e] && on[e].prototype;
                t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (J(t, "addEventListener", function(t) {
                    return function(i, o, a, s) {
                        try {
                            o && o.handleEvent && (o.handleEvent = n.wrap(o.handleEvent))
                        } catch (e) {}
                        var c, u, d;
                        return r && r.dom && ("EventTarget" === e || "Node" === e) && (u = n._breadcrumbEventHandler("click"), d = n._keypressEventHandler(), c = function(e) {
                            if (e) return "click" === e.type ? u(e) : "keypress" === e.type ? d(e) : void 0
                        }), t.call(this, i, n.wrap(o, void 0, c), a, s)
                    }
                }, i), J(t, "removeEventListener", function(e) {
                    return function(t, n, i, r) {
                        try {
                            n = n && (n.__raven_wrapper__ ? n.__raven_wrapper__ : n)
                        } catch (e) {}
                        return e.call(this, t, n, i, r)
                    }
                }, i))
            }
            var n = this,
                i = n._wrappedBuiltIns,
                r = this._globalOptions.autoBreadcrumbs;
            J(on, "setTimeout", e, i), J(on, "setInterval", e, i), on.requestAnimationFrame && J(on, "requestAnimationFrame", function(e) {
                return function(t) {
                    return e(n.wrap(t))
                }
            }, i);
            for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < o.length; a++) t(o[a]);
            var s = on.jQuery || on.$;
            s && s.fn && s.fn.ready && J(s.fn, "ready", function(e) {
                return function(t) {
                    return e.call(this, n.wrap(t))
                }
            }, i)
        },
        _instrumentBreadcrumbs: function() {
            function e(e, n) {
                e in n && B(n[e]) && J(n, e, function(e) {
                    return t.wrap(e)
                })
            }
            var t = this,
                n = this._globalOptions.autoBreadcrumbs,
                i = t._wrappedBuiltIns;
            if (n.xhr && "XMLHttpRequest" in on) {
                var r = XMLHttpRequest.prototype;
                J(r, "open", function(e) {
                    return function(n, i) {
                        return D(i) && i.indexOf(t._globalKey) === -1 && (this.__raven_xhr = {
                            method: n,
                            url: i,
                            status_code: null
                        }), e.apply(this, arguments)
                    }
                }, i), J(r, "send", function(n) {
                    return function(i) {
                        function r() {
                            if (o.__raven_xhr && (1 === o.readyState || 4 === o.readyState)) {
                                try {
                                    o.__raven_xhr.status_code = o.status
                                } catch (e) {}
                                t.captureBreadcrumb({
                                    type: "http",
                                    category: "xhr",
                                    data: o.__raven_xhr
                                })
                            }
                        }
                        for (var o = this, a = ["onload", "onerror", "onprogress"], s = 0; s < a.length; s++) e(a[s], o);
                        return "onreadystatechange" in o && B(o.onreadystatechange) ? J(o, "onreadystatechange", function(e) {
                            return t.wrap(e, void 0, r)
                        }) : o.onreadystatechange = r, n.apply(this, arguments)
                    }
                }, i)
            }
            n.xhr && "fetch" in on && J(on, "fetch", function(e) {
                return function(n, i) {
                    for (var r = new Array(arguments.length), o = 0; o < r.length; ++o) r[o] = arguments[o];
                    var a = "GET";
                    r[1] && r[1].method && (a = r[1].method);
                    var s = {
                        method: a,
                        url: r[0],
                        status_code: null
                    };
                    return t.captureBreadcrumb({
                        type: "http",
                        category: "fetch",
                        data: s
                    }), e.apply(this, r).then(function(e) {
                        return s.status_code = e.status, e
                    })
                }
            }, i), n.dom && this._hasDocument && (an.addEventListener ? (an.addEventListener("click", t._breadcrumbEventHandler("click"), !1), an.addEventListener("keypress", t._keypressEventHandler(), !1)) : (an.attachEvent("onclick", t._breadcrumbEventHandler("click")), an.attachEvent("onkeypress", t._keypressEventHandler())));
            var o = on.chrome,
                a = o && o.app && o.app.runtime,
                s = !a && on.history && history.pushState;
            if (n.location && s) {
                var c = on.onpopstate;
                on.onpopstate = function() {
                    var e = t._location.href;
                    if (t._captureUrlChange(t._lastHref, e), c) return c.apply(this, arguments)
                }, J(history, "pushState", function(e) {
                    return function() {
                        var n = arguments.length > 2 ? arguments[2] : void 0;
                        return n && t._captureUrlChange(t._lastHref, n + ""), e.apply(this, arguments)
                    }
                }, i)
            }
            if (n.console && "console" in on && console.log) {
                var u = function(e, n) {
                    t.captureBreadcrumb({
                        message: e,
                        level: n.level,
                        category: "console"
                    })
                };
                H(["debug", "info", "warn", "error", "log"], function(e, t) {
                    tn(console, t, u)
                })
            }
        },
        _restoreBuiltIns: function() {
            for (var e; this._wrappedBuiltIns.length;) {
                e = this._wrappedBuiltIns.shift();
                var t = e[0],
                    n = e[1],
                    i = e[2];
                t[n] = i
            }
        },
        _drainPlugins: function() {
            var e = this;
            H(this._plugins, function(t, n) {
                var i = n[0],
                    r = n[1];
                i.apply(e, [e].concat(r))
            })
        },
        _parseDSN: function(e) {
            var t = rn.exec(e),
                n = {},
                i = 7;
            try {
                for (; i--;) n[nn[i]] = t[i] || ""
            } catch (t) {
                throw new Zt("Invalid DSN: " + e)
            }
            if (n.pass && !this._globalOptions.allowSecretKey) throw new Zt("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
            return n
        },
        _getGlobalServer: function(e) {
            var t = "//" + e.host + (e.port ? ":" + e.port : "");
            return e.protocol && (t = e.protocol + ":" + t), t
        },
        _handleOnErrorStackInfo: function() {
            this._ignoreOnError || this._handleStackInfo.apply(this, arguments)
        },
        _handleStackInfo: function(e, t) {
            var n = this._prepareFrames(e, t);
            this._triggerEvent("handle", {
                stackInfo: e,
                options: t
            }), this._processException(e.name, e.message, e.url, e.lineno, n, t)
        },
        _prepareFrames: function(e, t) {
            var n = this,
                i = [];
            if (e.stack && e.stack.length && (H(e.stack, function(e, t) {
                    var r = n._normalizeFrame(t);
                    r && i.push(r)
                }), t && t.trimHeadFrames))
                for (var r = 0; r < t.trimHeadFrames && r < i.length; r++) i[r].in_app = !1;
            return i = i.slice(0, this._globalOptions.stackTraceLimit)
        },
        _normalizeFrame: function(e) {
            if (e.url) {
                var t = {
                    filename: e.url,
                    lineno: e.line,
                    colno: e.column,
                    function: e.func || "?"
                };
                return t.in_app = !(this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(t.filename) || /(Raven|TraceKit)\./.test(t.function) || /raven\.(min\.)?js$/.test(t.filename)), t
            }
        },
        _processException: function(e, t, n, i, r, o) {
            var a;
            if ((!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(t)) && (t += "", r && r.length ? (n = r[0].filename || n, r.reverse(), a = {
                    frames: r
                }) : n && (a = {
                    frames: [{
                        filename: n,
                        lineno: i,
                        in_app: !0
                    }]
                }), (!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(n)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(n)))) {
                var s = U({
                    exception: {
                        values: [{
                            type: e,
                            value: t,
                            stacktrace: a
                        }]
                    },
                    culprit: n
                }, o);
                this._send(s)
            }
        },
        _trimPacket: function(e) {
            var t = this._globalOptions.maxMessageLength;
            if (e.message && (e.message = z(e.message, t)), e.exception) {
                var n = e.exception.values[0];
                n.value = z(n.value, t)
            }
            return e
        },
        _getHttpData: function() {
            if (this._hasDocument && an.location && an.location.href) {
                var e = {
                    headers: {
                        "User-Agent": navigator.userAgent
                    }
                };
                return e.url = an.location.href, an.referrer && (e.headers.Referer = an.referrer), e
            }
        },
        _send: function(e) {
            var t = this._globalOptions,
                n = {
                    project: this._globalProject,
                    logger: t.logger,
                    platform: "javascript"
                },
                i = this._getHttpData();
            i && (n.request = i), e.trimHeadFrames && delete e.trimHeadFrames, e = U(n, e), e.tags = U(U({}, this._globalContext.tags), e.tags), e.extra = U(U({}, this._globalContext.extra), e.extra), e.extra["session:duration"] = I() - this._startTime, this._breadcrumbs && this._breadcrumbs.length > 0 && (e.breadcrumbs = {
                values: [].slice.call(this._breadcrumbs, 0)
            }), j(e.tags) && delete e.tags, this._globalContext.user && (e.user = this._globalContext.user), t.environment && (e.environment = t.environment), t.release && (e.release = t.release), t.serverName && (e.server_name = t.serverName), B(t.dataCallback) && (e = t.dataCallback(e) || e), e && !j(e) && (B(t.shouldSendCallback) && !t.shouldSendCallback(e) || this._sendProcessedPayload(e))
        },
        _getUuid: function() {
            return Y()
        },
        _sendProcessedPayload: function(e, t) {
            var n = this,
                i = this._globalOptions;
            if (this._lastEventId = e.event_id || (e.event_id = this._getUuid()), e = this._trimPacket(e), this._logDebug("debug", "Raven about to send:", e), this.isSetup()) {
                var r = {
                    sentry_version: "7",
                    sentry_client: "raven-js/" + this.VERSION,
                    sentry_key: this._globalKey
                };
                this._globalSecret && (r.sentry_secret = this._globalSecret);
                var o = e.exception && e.exception.values[0];
                this.captureBreadcrumb({
                    category: "sentry",
                    message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                    event_id: e.event_id,
                    level: e.level || "error"
                });
                var a = this._globalEndpoint;
                (i.transport || this._makeRequest).call(this, {
                    url: a,
                    auth: r,
                    data: e,
                    options: i,
                    onSuccess: function() {
                        n._triggerEvent("success", {
                            data: e,
                            src: a
                        }), t && t()
                    },
                    onError: function(i) {
                        n._triggerEvent("failure", {
                            data: e,
                            src: a
                        }), i = i || new Error("Raven send failed (no additional details provided)"), t && t(i)
                    }
                })
            }
        },
        _makeRequest: function(e) {
            function t() {
                200 === n.status ? e.onSuccess && e.onSuccess() : e.onError && e.onError(new Error("Sentry error code: " + n.status))
            }
            var n = new XMLHttpRequest,
                i = "withCredentials" in n || "undefined" != typeof XDomainRequest;
            if (i) {
                var r = e.url;
                "withCredentials" in n ? n.onreadystatechange = function() {
                    4 === n.readyState && t()
                } : (n = new XDomainRequest, r = r.replace(/^https?:/, ""), n.onload = t), n.open("POST", r + "?" + K(e.auth)), n.send(en(e.data))
            }
        },
        _logDebug: function(e) {
            this._originalConsoleMethods[e] && this.debug && Function.prototype.apply.call(this._originalConsoleMethods[e], this._originalConsole, [].slice.call(arguments, 1))
        },
        _mergeContext: function(e, t) {
            R(t) ? delete this._globalContext[e] : this._globalContext[e] = U(this._globalContext[e] || {}, t)
        }
    };
    var sn = Object.prototype;
    "undefined" != typeof __false__ && __false__ && (q.utils = {
        isUndefined: R,
        isFunction: B,
        isString: D,
        isObject: N,
        isEmptyObject: j,
        isError: V,
        each: H,
        objectMerge: U,
        truncate: z,
        hasKey: W,
        joinRegExp: X,
        urlencode: K,
        uuid4: Y,
        htmlTreeAsString: G,
        htmlElementAsString: Q,
        parseUrl: $,
        fill: J
    }), q.prototype.setUser = q.prototype.setUserContext, q.prototype.setReleaseContext = q.prototype.setRelease;
    var cn = q,
        un = cn,
        dn = "undefined" != typeof window ? window : "undefined" != typeof ct ? ct : "undefined" != typeof self ? self : {},
        ln = dn.Raven,
        fn = new un;
    fn.noConflict = function() {
        return dn.Raven = ln, fn
    }, fn.afterLoad();
    var hn = fn;
    ie.prototype = {
        get complement() {
            var e = this.clone();
            return e.rgb = {
                red: 255 - this.red,
                green: 255 - this.green,
                blue: 255 - this.blue
            }, e
        },
        get hex() {
            return ie.rgbToHex(this.red, this.green, this.blue)
        },
        set hex(e) {
            return this.rgba = ie.hexToRgb(e), this
        },
        get hsl() {
            return "hsl(" + this.hue + "," + this.saturation + "%," + Math.round(this.lightness) + "%)"
        },
        set hsl(e) {
            this.hue = e.hue, this.saturation = e.saturation, this.lightness = e.lightness;
            var t = ie.hslToRgb(e.hue, e.saturation, e.lightness);
            return this.red = t.red, this.green = t.green, this.blue = t.blue, this.alpha = t.alpha, this
        },
        get luminance() {
            function e(e) {
                return e <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
            }
            var t = e(this.red / 255),
                n = e(this.green / 255),
                i = e(this.blue / 255),
                r = .2126 * t + .7152 * n + .0722 * i;
            return r
        },
        get rgb() {
            return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
        },
        set rgb(e) {
            return this.rgba = e, this
        },
        get rgba() {
            return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")"
        },
        set rgba(e) {
            this.red = e.red, this.green = e.green, this.blue = e.blue, this.alpha = e.alpha || 1;
            var t = ie.rgbToHsl(e.red, e.green, e.blue);
            return this.hue = t.hue, this.saturation = t.saturation, this.lightness = t.lightness, this
        },
        get yiq() {
            return (299 * this.red + 587 * this.green + 114 * this.blue) / 1e3
        },
        clone: function() {
            return new ie(this)
        },
        lighten: function(e, t, n) {
            if (this.hsl = {
                    hue: this.hue,
                    saturation: this.saturation,
                    lightness: this.lightness + e
                }, t && n)
                for (var i = n.contrast(this).ratio; i < t && (this.lighten(5), i = n.contrast(this).ratio, !(this.lightness >= 100)););
            return this
        },
        darken: function(e, t, n) {
            if (this.hsl = {
                    hue: this.hue,
                    saturation: this.saturation,
                    lightness: this.lightness - e
                }, t && n)
                for (var i = n.contrast(this).ratio; i < t && (this.darken(5), i = n.contrast(this).ratio, !(this.lightness <= 0)););
            return this
        },
        overlayOn: function(e) {
            if (this.alpha >= 1) return this;
            var t = this.clone();
            return t.rgba = {
                red: t.red * this.alpha + e.red * e.alpha * (1 - this.alpha),
                green: t.green * this.alpha + e.green * e.alpha * (1 - this.alpha),
                blue: t.blue * this.alpha + e.blue * e.alpha * (1 - this.alpha),
                alpha: t.alpha + e.alpha * (1 - this.alpha)
            }, t
        },
        contrast: function(e) {
            var t = this.alpha;
            if (t >= 1) {
                e.alpha < 1 && (e = e.overlayOn(this));
                var n = this.luminance + .05,
                    i = e.luminance + .05,
                    r = n / i;
                return i > n && (r = 1 / r), r = Math.round(10 * r) / 10, {
                    ratio: r,
                    error: 0,
                    min: r,
                    max: r
                }
            }
            var o = this.overlayOn(ie.white).contrast(e).ratio,
                a = this.overlayOn(ie.black).contrast(e).ratio,
                s = Math.max(o, a),
                c = {
                    red: Math.min(Math.max(0, (e.red - this.red * t) / (1 - t)), 255),
                    green: Math.min(Math.max(0, (e.green - this.green * t) / (1 - t)), 255),
                    blue: Math.min(Math.max(0, (e.blue - this.blue * t) / (1 - t)), 255)
                },
                u = this.clone();
            u.rgb = c;
            var d = this.overlayOn(u).contrast(e).ratio;
            return {
                ratio: Math.round((d + s) / 2 * 10) / 10,
                error: Math.round((s - d) / 2 * 10) / 10,
                min: d,
                max: s,
                closest: u,
                farthest: a === s ? ie.white : ie.black
            }
        },
        wcagAACompliant: function(e) {
            return this.contrast(e).ratio >= 4.5
        },
        wcagAAACompliant: function(e) {
            return this.contrast(e).ratio >= 7
        },
        yiqContrastColor: function() {
            return this.yiq >= 120 ? new ie(0, 0, 0) : new ie(255, 255, 255)
        }
    }, ie.hexToRgb = function(e) {
        var t;
        return e = String(e), 3 === e.length || 4 === e.length ? (t = /^#?([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/i.exec(e), t && (t[1] += t[1], t[2] += t[2], t[3] += t[3])) : t = /^#?([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$/i.exec(e), t ? {
            red: parseInt(t[1], 16),
            green: parseInt(t[2], 16),
            blue: parseInt(t[3], 16),
            alpha: 1
        } : null
    }, ie.rgbToHex = function(e, t, n) {
        return "#" + ((1 << 24) + (Math.round(e) << 16) + (Math.round(t) << 8) + Math.round(n)).toString(16).slice(1)
    }, ie.rgbToHsl = function(e, t, n) {
        e /= 255, t /= 255, n /= 255;
        var i = Math.max(e, t, n),
            r = Math.min(e, t, n),
            o = (i + r) / 2,
            a = o,
            s = o;
        if (i === r) return {
            hue: 0,
            saturation: 0,
            lightness: 100 * s
        };
        var c = i - r;
        return a = s > .5 ? c / (2 - i - r) : c / (i + r), i === e ? o = (t - n) / c + (t < n ? 6 : 0) : i === t ? o = (n - e) / c + 2 : i === n && (o = (e - t) / c + 4), o /= 6, {
            hue: Math.round(360 * o),
            saturation: Math.round(100 * a),
            lightness: Math.round(100 * s)
        }
    }, ie.hslToRgb = function(e, t, n) {
        function i(e, t, n) {
            return n < 0 && (n += 1), n > 1 && (n -= 1), 6 * n < 1 ? e + 6 * (t - e) * n : 2 * n < 1 ? t : 3 * n < 2 ? e + (t - e) * (6 * (2 / 3 - n)) : e
        }
        if (e /= 360, t /= 100, n /= 100, 0 === t) return {
            red: Math.floor(255 * n),
            green: Math.floor(255 * n),
            blue: Math.floor(255 * n)
        };
        var r = n < .5 ? n * (1 + t) : n + t - t * n,
            o = 2 * n - r;
        return {
            red: Math.floor(255 * i(o, r, e + 1 / 3)),
            green: Math.floor(255 * i(o, r, e)),
            blue: Math.floor(255 * i(o, r, e - 1 / 3))
        }
    }, ie.hslToHex = function(e, t, n) {
        var i = ie.hslToRgb(e, t, n);
        return ie.rgbToHex(i.red, i.green, i.blue)
    }, ie.white = new ie("fff"), ie.black = new ie("000");
    var vn = 6e4,
        pn = window.Array.from,
        mn = [1];
    "function" == typeof pn && pn(mn) === mn && (pn = !1);
    var gn, yn, _n, bn, wn = pn || function(e) {
            return [].slice.call(e, 0)
        },
        kn = ["quality", "volume", "captions"],
        Sn = null,
        xn = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = n.displayTimeout,
                    r = void 0 === i ? 0 : i,
                    o = n.label,
                    a = void 0 === o ? "Alert" : o;
                yt(this, e), Z(this), this._container = t, this._visible = !1, this._message = null, this._alert = null, this._alertLabel = a;
                var s = Math.round(r / 1e3);
                0 !== s && (this._alertLabel = a + " Will be dismissed in " + s + " seconds"), this._displayTimer = null, this._displayTimeout = r, this._renderTemplate(), this._attachEvents()
            }
            return _t(e, [{
                key: "show",
                value: function(e) {
                    var t = this;
                    if (this._visible !== !0) {
                        clearTimeout(this._displayTimer), this._alert.classList.remove("hidden"), this._alert.removeAttribute("hidden"), window.requestAnimationFrame(function() {
                            t._alert.classList.add("in")
                        });
                        var n = this._alert.querySelector("[data-alert-autofocus]") || this._alert;
                        n.focus(), this._visible = !0, this.fire("show", e), 0 !== this._displayTimeout && (this._displayTimer = setTimeout(function() {
                            t.hide("timeout")
                        }, this._displayTimeout))
                    }
                }
            }, {
                key: "hide",
                value: function(e) {
                    var t = this;
                    this._visible !== !1 && (clearTimeout(this._displayTimer), this._alert.classList.add("leaving"), window.requestAnimationFrame(function() {
                        var e = t;
                        t._setHideAttributes(), kt(t._alert).on("transitionend", function t(n) {
                            "opacity" === n.propertyName && (e._alert.classList.remove("leaving"), e._alert.classList.add("hidden"), e._alert.setAttribute("hidden", ""), kt(e._alert).off("transitionend", t))
                        })
                    }), this._visible = !1, this.fire("hide", e))
                }
            }, {
                key: "_setHideAttributes",
                value: function() {
                    this._alert.classList.remove("in")
                }
            }, {
                key: "_renderTemplate",
                value: function() {
                    this._alert || (this._alert = document.createElement("div"), this._alert.setAttribute("role", "alertdialog"), this._alert.setAttribute("aria-label", this._alertLabel), this._alert.setAttribute("aria-atomic", "true"), this._alert.classList.add("player-alert"), this._alert.classList.add("hidden"), this._alert.setAttribute("hidden", ""), this._container.appendChild(this._alert), this._setHideAttributes()), this._message instanceof HTMLElement ? (this._alert.innerHTML = "", this._alert.appendChild(this._message)) : (this._alert.textContent = this._message, this._alert.innerHTML = this._message);
                    var e = document.createElement("button");
                    e.setAttribute("data-close", ""), e.setAttribute("aria-label", "Close alert"), e.classList.add("close"), e.innerHTML = At.render("icon_close"), this._alert.appendChild(e)
                }
            }, {
                key: "_attachEvents",
                value: function() {
                    var e = this;
                    kt(this._alert).on("click", "[data-close]", function(t) {
                        e.hide(t)
                    })
                }
            }, {
                key: "visible",
                get: function() {
                    return this._visible
                }
            }, {
                key: "message",
                get: function() {
                    return this._message
                },
                set: function(e) {
                    e instanceof HTMLElement && this._message && e.textContent === this._message.textContent || e !== this._message && (this._message = e, this._renderTemplate())
                }
            }]), e
        }(),
        Tn = "app.vimeo.com/",
        En = "key_live_jpj6Duy53e6MhounkriNljdgsBhGbf0d",
        Ln = {
            object: !0,
            symbol: !0
        },
        Pn = function() {
            var e;
            if ("function" != typeof Symbol) return !1;
            e = Symbol("test symbol");
            try {
                String(e)
            } catch (e) {
                return !1
            }
            return !!Ln[typeof Symbol.iterator] && (!!Ln[typeof Symbol.toPrimitive] && !!Ln[typeof Symbol.toStringTag])
        },
        Cn = function() {
            var e, t = Object.assign;
            return "function" == typeof t && (e = {
                foo: "raz"
            }, t(e, {
                bar: "dwa"
            }, {
                trzy: "trzy"
            }), e.foo + e.bar + e.trzy === "razdwatrzy")
        },
        An = function() {
            try {
                return Object.keys("primitive"), !0
            } catch (e) {
                return !1
            }
        },
        On = Object.keys,
        Mn = function(e) {
            return On(null == e ? e : Object(e))
        },
        Fn = An() ? Object.keys : Mn,
        In = function(e) {
            if (null == e) throw new TypeError("Cannot use null or undefined");
            return e
        },
        qn = Fn,
        Rn = In,
        Bn = Math.max,
        Dn = function(e, t) {
            var n, i, r, o = Bn(arguments.length, 2);
            for (e = Object(Rn(e)), r = function(i) {
                    try {
                        e[i] = t[i]
                    } catch (e) {
                        n || (n = e)
                    }
                }, i = 1; i < o; ++i) t = arguments[i], qn(t).forEach(r);
            if (void 0 !== n) throw n;
            return e
        },
        Nn = Cn() ? Object.assign : Dn,
        jn = Array.prototype.forEach,
        Vn = Object.create,
        Hn = function(e, t) {
            var n;
            for (n in e) t[n] = e[n]
        },
        Un = function(e) {
            var t = Vn(null);
            return jn.call(arguments, function(e) {
                null != e && Hn(Object(e), t)
            }), t
        },
        zn = function(e) {
            return "function" == typeof e
        },
        Wn = "razdwatrzy",
        Xn = function() {
            return "function" == typeof Wn.contains && (Wn.contains("dwa") === !0 && Wn.contains("foo") === !1)
        },
        Kn = String.prototype.indexOf,
        $n = function(e) {
            return Kn.call(this, e, arguments[1]) > -1
        },
        Yn = Xn() ? String.prototype.contains : $n,
        Gn = e(function(e) {
            var t, n = Nn,
                i = Un,
                r = zn,
                o = Yn;
            t = e.exports = function(e, t) {
                var r, a, s, c, u;
                return arguments.length < 2 || "string" != typeof e ? (c = t, t = e, e = null) : c = arguments[2], null == e ? (r = s = !0, a = !1) : (r = o.call(e, "c"), a = o.call(e, "e"), s = o.call(e, "w")), u = {
                    value: t,
                    configurable: r,
                    enumerable: a,
                    writable: s
                }, c ? n(i(c), u) : u
            }, t.gs = function(e, t, a) {
                var s, c, u, d;
                return "string" != typeof e ? (u = a, a = t, t = e, e = null) : u = arguments[3], null == t ? t = void 0 : r(t) ? null == a ? a = void 0 : r(a) || (u = a, a = void 0) : (u = t, t = a = void 0), null == e ? (s = !0, c = !1) : (s = o.call(e, "c"), c = o.call(e, "e")), d = {
                    get: t,
                    set: a,
                    configurable: s,
                    enumerable: c
                }, u ? n(i(u), d) : d
            }
        }),
        Qn = function(e) {
            return !!e && ("symbol" == typeof e || !!e.constructor && ("Symbol" === e.constructor.name && "Symbol" === e[e.constructor.toStringTag]))
        },
        Jn = Qn,
        Zn = function(e) {
            if (!Jn(e)) throw new TypeError(e + " is not a symbol");
            return e
        },
        ei = Gn,
        ti = Zn,
        ni = Object.create,
        ii = Object.defineProperties,
        ri = Object.defineProperty,
        oi = Object.prototype,
        ai = ni(null);
    if ("function" == typeof Symbol) {
        gn = Symbol;
        try {
            String(gn()), bn = !0
        } catch (e) {}
    }
    var si = function() {
        var e = ni(null);
        return function(t) {
            for (var n, i, r = 0; e[t + (r || "")];) ++r;
            return t += r || "", e[t] = !0, n = "@@" + t, ri(oi, n, ei.gs(null, function(e) {
                i || (i = !0, ri(this, n, ei(e)), i = !1)
            })), n
        }
    }();
    _n = function(e) {
        if (this instanceof _n) throw new TypeError("TypeError: Symbol is not a constructor");
        return yn(e)
    };
    var ci = yn = function e(t) {
        var n;
        if (this instanceof e) throw new TypeError("TypeError: Symbol is not a constructor");
        return bn ? gn(t) : (n = ni(_n.prototype), t = void 0 === t ? "" : String(t), ii(n, {
            __description__: ei("", t),
            __name__: ei("", si(t))
        }))
    };
    ii(yn, {
        for: ei(function(e) {
            return ai[e] ? ai[e] : ai[e] = yn(String(e))
        }),
        keyFor: ei(function(e) {
            var t;
            ti(e);
            for (t in ai)
                if (ai[t] === e) return t
        }),
        hasInstance: ei("", gn && gn.hasInstance || yn("hasInstance")),
        isConcatSpreadable: ei("", gn && gn.isConcatSpreadable || yn("isConcatSpreadable")),
        iterator: ei("", gn && gn.iterator || yn("iterator")),
        match: ei("", gn && gn.match || yn("match")),
        replace: ei("", gn && gn.replace || yn("replace")),
        search: ei("", gn && gn.search || yn("search")),
        species: ei("", gn && gn.species || yn("species")),
        split: ei("", gn && gn.split || yn("split")),
        toPrimitive: ei("", gn && gn.toPrimitive || yn("toPrimitive")),
        toStringTag: ei("", gn && gn.toStringTag || yn("toStringTag")),
        unscopables: ei("", gn && gn.unscopables || yn("unscopables"))
    }), ii(_n.prototype, {
        constructor: ei(yn),
        toString: ei("", function() {
            return this.__name__
        })
    }), ii(yn.prototype, {
        toString: ei(function() {
            return "Symbol (" + ti(this).__description__ + ")"
        }),
        valueOf: ei(function() {
            return ti(this)
        })
    }), ri(yn.prototype, yn.toPrimitive, ei("", function() {
        var e = ti(this);
        return "symbol" == typeof e ? e : e.toString()
    })), ri(yn.prototype, yn.toStringTag, ei("c", "Symbol")), ri(_n.prototype, yn.toStringTag, ei("c", yn.prototype[yn.toStringTag])), ri(_n.prototype, yn.toPrimitive, ei("c", yn.prototype[yn.toPrimitive]));
    var ui = Pn() ? Symbol : ci,
        di = window.WeakMap || function() {
            var e = Object.defineProperty,
                t = Date.now() % 1e9,
                n = function() {
                    this.name = "__st" + (1e9 * Math.random() >>> 0) + (t++ + "__")
                };
            return n.prototype.set = function(t, n) {
                if ("object" !== ("undefined" == typeof t ? "undefined" : gt(t)) && "function" != typeof t) throw new TypeError("Invalid value used as weak map key");
                var i = t[this.name];
                return i && i[0] === t ? i[1] = n : e(t, this.name, {
                    value: [t, n],
                    writable: !0
                }), this
            }, n.prototype.get = function(e) {
                var t;
                return (t = e[this.name]) && t[0] === e ? t[1] : void 0
            }, n.prototype.delete = function(e) {
                var t = e[this.name];
                return !(!t || t[0] !== e) && (t[0] = t[1] = void 0, !0)
            }, n.prototype.has = function(e) {
                var t = e[this.name];
                return !!t && t[0] === e
            }, n
        }(),
        li = "function" == typeof ui && "symbol" == typeof ui.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof ui && e.constructor === ui && e !== ui.prototype ? "symbol" : typeof e
        },
        fi = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        hi = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        vi = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        },
        pi = function e(t, n, i) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === r) {
                var o = Object.getPrototypeOf(t);
                return null === o ? void 0 : e(o, n, i)
            }
            if ("value" in r) return r.value;
            var a = r.get;
            if (void 0 !== a) return a.call(i)
        },
        mi = function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        },
        gi = function(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        },
        yi = function e(t, n, i, r) {
            var o = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === o) {
                var a = Object.getPrototypeOf(t);
                null !== a && e(a, n, i, r)
            } else if ("value" in o && o.writable) o.value = i;
            else {
                var s = o.set;
                void 0 !== s && s.call(r, i)
            }
            return i
        },
        _i = function() {
            function e(e, t) {
                var n = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, s = e[ui.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        !i && s.return && s.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (ui.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        bi = function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return wn(e)
        },
        TelecineError = function TelecineError(e, t) {
            fi(this, TelecineError), this.name = e, this.message = t, Object.freeze(this)
        },
        wi = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, e), this._telecine = t, this._element = t._element, this._options = n
            }
            return hi(e, null, [{
                key: "displayName",
                get: function() {
                    return "Effect"
                }
            }, {
                key: "supported",
                get: function() {
                    return !1
                }
            }, {
                key: "supportedScanners",
                get: function() {
                    return []
                }
            }]), hi(e, [{
                key: "activate",
                value: function() {
                    throw new TelecineError("NotImplemented", "The effect must implement the activate method.")
                }
            }, {
                key: "deactivate",
                value: function() {
                    throw new TelecineError("NotImplemented", "The effect must implement the deactivate method.")
                }
            }]), e
        }(),
        ki = /Firefox/.test(navigator.userAgent),
        Si = /i(Phone|Pad|Pod touch);/.test(navigator.userAgent),
        xi = /Android/.test(navigator.userAgent),
        Ti = xi && /mobile/.test(navigator.userAgent.toLowerCase()),
        Ei = {
            firefox: ki,
            iOS: Si,
            android: xi,
            androidMobile: Ti
        },
        Li = function(e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (this[t].id === "" + e) return this[t];
            return null
        },
        Pi = function(e, t) {
            if (!e || void 0 === e[t]) throw Le(1, "INDEX_SIZE_ERR");
            return e[t]
        };
    Ne.from = function(e) {
        if (!(e instanceof TimeRanges)) throw new TypeError("Can only create a TelecineTimeRange from a TimeRanges object.");
        for (var t = [], n = [], i = 0, r = e.length; i < r; i++) t.push(e.start(i)), n.push(e.end(i));
        return Ne(t, n)
    };
    var Ci = function() {
            function e(t) {
                var n = this,
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, e), this._element = t, this._options = i, this._telecineVideo = null, this._currentFile = null, this._externalDisplays = [], Ee(this), this.on("play", function() {
                    return n._initMediaSession()
                })
            }
            return hi(e, null, [{
                key: "displayName",
                get: function() {
                    return "Scanner"
                }
            }, {
                key: "supported",
                get: function() {
                    return !1
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    return []
                }
            }, {
                key: "supportedAudioTypes",
                get: function() {
                    return []
                }
            }, {
                key: "supportedExternalDisplays",
                get: function() {
                    return []
                }
            }, {
                key: "supportsSettingVolume",
                get: function() {
                    return !0
                }
            }, {
                key: "supportsTextTracks",
                get: function() {
                    return !1
                }
            }]), hi(e, [{
                key: "deactivate",
                value: function() {
                    this._telecineVideo && (this._telecineVideo.off("filesrcupdate"), this._telecineVideo.off("texttracksrcupdate"))
                }
            }, {
                key: "reactivate",
                value: function() {}
            }, {
                key: "play",
                value: function() {
                    throw new TelecineError("NotImplemented", "The scanner must implement the play method.")
                }
            }, {
                key: "pause",
                value: function() {
                    throw new TelecineError("NotImplemented", "The scanner must implement the pause method.")
                }
            }, {
                key: "addTextTrack",
                value: function(e) {
                    return this
                }
            }, {
                key: "removeTextTrack",
                value: function(e) {
                    return this
                }
            }, {
                key: "getCuesForTrack",
                value: function(e) {
                    return []
                }
            }, {
                key: "getActiveCuesForTrack",
                value: function(e) {
                    return []
                }
            }, {
                key: "setModeForTrack",
                value: function(e, t) {
                    return this
                }
            }, {
                key: "setSrcForTrack",
                value: function(e, t) {
                    return this
                }
            }, {
                key: "addCuePoint",
                value: function(e) {
                    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    throw new TelecineError("CuePointsNotSupported", "Cue points are not supported in this scanner.")
                }
            }, {
                key: "removeCuePoint",
                value: function(e) {
                    return !1
                }
            }, {
                key: "removeAllCuePoints",
                value: function() {
                    return !1
                }
            }, {
                key: "showExternalDisplayPicker",
                value: function(e) {
                    if (!this._externalDisplays.length) throw new TelecineError("ExternalDisplayUnvailable", "No external displays are available.");
                    if (!e) return void this._externalDisplays[0].showPicker();
                    var t = this._externalDisplays.filter(function(t) {
                        return t.constructor.displayName.replace("ExternalDisplay", "") === e
                    })[0];
                    if (!t) throw new TelecineError("InvalidExternalDisplay", "The specified external display is not available.");
                    t.showPicker()
                }
            }, {
                key: "_pickFile",
                value: function() {
                    if (this._files.length < 1) return null;
                    var e = this._files.slice(0).sort(function(e, t) {
                        return e.priority - t.priority
                    });
                    return e[0]
                }
            }, {
                key: "_updateCurrentFile",
                value: function() {
                    var e = this._pickFile();
                    return e ? void(this.currentFile = e) : void this.fire("scannererror", {
                        reason: "all files failed"
                    })
                }
            }, {
                key: "_switchToNextFile",
                value: function() {
                    var e = this._files.indexOf(this._currentFile);
                    this._files.splice(e, 1), this._updateCurrentFile()
                }
            }, {
                key: "_initMediaSession",
                value: function() {
                    var e = this;
                    if ("mediaSession" in navigator) {
                        var t = {
                            title: this._telecineVideo.title,
                            artist: this._telecineVideo.subtitle,
                            artwork: []
                        };
                        this._telecineVideo.metadata.thumbnail && t.artwork.push({
                            src: this._telecineVideo.metadata.thumbnail
                        }), navigator.mediaSession.metadata = new MediaMetadata(t), "function" == typeof navigator.mediaSession.setActionHandler && (navigator.mediaSession.setActionHandler("play", function() {
                            return e.play()
                        }), navigator.mediaSession.setActionHandler("pause", function() {
                            return e.pause()
                        }), navigator.mediaSession.setActionHandler("seekforward", function() {
                            e.currentTime = Math.min(e.duration, e.currentTime + 10)
                        }), navigator.mediaSession.setActionHandler("seekbackward", function() {
                            e.currentTime = Math.max(0, e.currentTime - 10)
                        }))
                    }
                }
            }, {
                key: "buffered",
                get: function() {
                    return Ne()
                }
            }, {
                key: "cuePoints",
                get: function() {
                    return []
                }
            }, {
                key: "currentFile",
                get: function() {
                    return this._currentFile
                },
                set: function(e) {
                    this._currentFile = e, this.fire("currentfilechange", e)
                }
            }, {
                key: "currentTime",
                get: function() {
                    return 0
                },
                set: function(e) {}
            }, {
                key: "duration",
                get: function() {
                    return NaN
                }
            }, {
                key: "ended",
                get: function() {
                    return !1
                }
            }, {
                key: "externalDisplayAvailable",
                get: function() {
                    return this._externalDisplays.some(function(e) {
                        return e.available
                    })
                }
            }, {
                key: "externalDisplayActive",
                get: function() {
                    return this._externalDisplays.some(function(e) {
                        return e.active
                    })
                }
            }, {
                key: "loop",
                get: function() {
                    return !1
                },
                set: function(e) {}
            }, {
                key: "muted",
                get: function() {
                    return !1
                },
                set: function(e) {}
            }, {
                key: "paused",
                get: function() {
                    return !0
                }
            }, {
                key: "playbackRate",
                get: function() {
                    return 1
                },
                set: function(e) {}
            }, {
                key: "preload",
                get: function() {
                    return "none"
                },
                set: function(e) {}
            }, {
                key: "presentationMode",
                get: function() {
                    return "inline"
                },
                set: function(e) {
                    if (this.supportedPresentationModes.indexOf(e) === -1) throw new TelecineError("InvalidPresentationMode", "The “" + e + "” presentation mode is not supported.")
                }
            }, {
                key: "supportedPresentationModes",
                get: function() {
                    return ["inline"]
                }
            }, {
                key: "video",
                get: function() {
                    return this._telecineVideo
                },
                set: function(e) {
                    var t = this;
                    this.reactivate(), this._telecineVideo !== e && (this._telecineVideo && (this._telecineVideo.off("filesrcupdate"), this._telecineVideo.off("texttracksrcupdate")), this.removeAllCuePoints(), this._telecineVideo = e, this._files = e.files.filter(function(e) {
                        return t.constructor.supportedVideoTypes.indexOf(e.mime) !== -1
                    }), this._telecineVideo.on("filesrcupdate", function(e) {
                        e === t._currentFile && t._updateCurrentFile()
                    }), this._telecineVideo.on("texttracksrcupdate", function(e) {
                        t.video.currentScanner && t.video.currentScanner.setSrcForTrack(e, e.src)
                    }), this._options.externalDisplays && this._options.externalDisplays.length && ! function() {
                        t._externalDisplays = [];
                        var n = t.constructor.supportedExternalDisplays;
                        Array.isArray(n) || (n = []);
                        var i = n.map(function(e) {
                            return e.displayName
                        });
                        t._options.externalDisplays.filter(function(e) {
                            return e.supported && i.indexOf(e.displayName) !== -1
                        }).forEach(function(n) {
                            var i = new n(e),
                                r = n.displayName.replace("ExternalDisplay", "");
                            i.on("available", function() {
                                return t.fire("externaldisplayavailable", {
                                    type: r
                                })
                            }), i.on("unavailable", function() {
                                return t.fire("externaldisplayunavailable", {
                                    type: r
                                })
                            }), i.on("activated", function() {
                                "function" == typeof t.onexternaldisplayactivated && t.onexternaldisplayactivated(i), t.fire("externaldisplayactivated", {
                                    type: r
                                })
                            }), i.on("deactivated", function() {
                                "function" == typeof t.onexternaldisplaydeactivated && t.onexternaldisplaydeactivated(i), t.fire("externaldisplaydeactivated", {
                                    type: r
                                })
                            }), t._externalDisplays.push(i)
                        })
                    }(), this._updateCurrentFile())
                }
            }, {
                key: "videoWidth",
                get: function() {
                    return 0
                }
            }, {
                key: "videoHeight",
                get: function() {
                    return 0
                }
            }, {
                key: "volume",
                get: function() {
                    return 1
                },
                set: function(e) {}
            }]), e
        }(),
        Ai = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting", "webkitbeginfullscreen", "webkitendfullscreen", "webkitpresentationmodechanged"],
        Oi = ["externaldisplayavailable", "externaldisplayunavailable", "externaldisplayactivated", "externaldisplaydeactivated"],
        Mi = ["scannerchange", "scannererror", "fileerror", "downloaderror", "drmauthfailure", "drmauthsuccess", "drmfailure", "emeunsupported", "currentfilechange", "streamchange", "streambufferstart", "streambufferend", "droppedframes", "bandwidth", "streamtargetchange", "alert", "presentationmodechange", "cuepoint", "spatialunsupported"],
        Fi = [].concat(Ai, Oi, Mi),
        Ii = new di,
        qi = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, e);
                var i = parseFloat(t);
                if (isNaN(i)) throw new TypeError("Time must be a number.");
                if (i < 0) throw new TypeError("Time must be a positive number.");
                this.time = t, this.data = n, this.id = Fe();
                try {
                    var r = "undefined" == typeof VTTCue ? TextTrackCue : VTTCue;
                    this.vttCue = new r(t, t + .25, JSON.stringify(n)), this.vttCue.id = this.id
                } catch (e) {
                    throw new TelecineError("CuePointsNotSupported", "Cue points are not supported in this browser.")
                }
                Ii.set(this.vttCue, this), Object.freeze(this)
            }
            return hi(e, null, [{
                key: "fromVTTCue",
                value: function(t) {
                    if (Ii.has(t)) return Ii.get(t);
                    var n = {};
                    try {
                        n = JSON.parse(t.text)
                    } catch (e) {}
                    return new e(t.startTime, n)
                }
            }]), e
        }(),
        Ri = function() {
            function e(t) {
                var n = this;
                fi(this, e), this._interval = null, this._rates = [], this._averageRate = 0, this._lastChecked = null, this._lastLoaded = 0, this._scanner = t, this._scanner.on("loadstart", function() {
                    return n.startInterval()
                }), this._scanner.on("progress", function() {
                    return n.startInterval()
                }), this._scanner.on("ended", function() {
                    return n.stopInterval()
                })
            }
            return hi(e, [{
                key: "startInterval",
                value: function() {
                    var e = this;
                    this._interval || (this._interval = window.setInterval(function() {
                        return e.updateDownloadRate()
                    }, 1e3))
                }
            }, {
                key: "stopInterval",
                value: function() {
                    window.clearInterval(this._interval)
                }
            }, {
                key: "updateDownloadRate",
                value: function() {
                    for (var e = Me(), t = 0, n = this._scanner.buffered, i = Array.isArray(n), r = 0, n = i ? n : n[ui.iterator]();;) {
                        var o;
                        if (i) {
                            if (r >= n.length) break;
                            o = n[r++]
                        } else {
                            if (r = n.next(), r.done) break;
                            o = r.value
                        }
                        var a = o,
                            s = _i(a, 2),
                            c = s[0],
                            u = s[1];
                        t += u - c
                    }
                    if (!this._lastChecked) return this._lastChecked = e, void(this._lastLoaded = t);
                    if (this._lastLoaded !== t) {
                        var d = Math.max(t - this._lastLoaded, 0);
                        this._rates.push(d), this._rates = this._rates.slice(-15), this._averageRate = this._rates.reduce(function(e, t) {
                            return e + t
                        }) / this._rates.length, this._lastChecked = e, this._lastLoaded = t, Math.round(t) >= Math.round(this._scanner.duration) && this.stopInterval()
                    }
                }
            }, {
                key: "averageDownloadRate",
                get: function() {
                    return this._averageRate
                }
            }]), e
        }(),
        Bi = function() {
            function e(t) {
                fi(this, e), this._available = !1, this._active = !1, this._video = t, Ee(this)
            }
            return hi(e, null, [{
                key: "displayName",
                get: function() {
                    return "ExternalDisplay"
                }
            }, {
                key: "supported",
                get: function() {
                    return !1
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    return []
                }
            }]), hi(e, [{
                key: "showPicker",
                value: function() {}
            }, {
                key: "getFile",
                value: function() {
                    var e = this.constructor.displayName.replace("ExternalDisplay", "");
                    if (this._video.externalDisplayFiles[e]) return this._video.externalDisplayFiles[e];
                    var t = this.constructor.supportedVideoTypes,
                        n = this._video.files.filter(function(e) {
                            return t.indexOf(e.mime) !== -1
                        }).sort(function(e, n) {
                            return e.mime === n.mime ? e.priority - n.priority : t.indexOf(e.mime) - t.indexOf(n.mime)
                        });
                    if (!n.length) throw new Error("No files available for " + this.constructor.displayName + " external display.");
                    return n[0]
                }
            }, {
                key: "active",
                get: function() {
                    return this._active
                }
            }, {
                key: "available",
                get: function() {
                    return this._available
                }
            }, {
                key: "element",
                get: function() {
                    return document.createElement("div")
                }
            }]), e
        }(),
        AirPlayExternalDisplay = function(e) {
            function AirPlayExternalDisplay(e) {
                fi(this, AirPlayExternalDisplay);
                var t = gi(this, (AirPlayExternalDisplay.__proto__ || Object.getPrototypeOf(AirPlayExternalDisplay)).call(this, e));
                return t._videoElement = document.createElement("video"), t._videoElement.setAttribute("data-airplay", ""), t._videoElement.setAttribute("x-webkit-airplay", "allow"), t.addVideoEventListeners(), t
            }
            return mi(AirPlayExternalDisplay, e), hi(AirPlayExternalDisplay, null, [{
                key: "displayName",
                get: function() {
                    return "AirPlayExternalDisplay"
                }
            }, {
                key: "supported",
                get: function() {
                    return "WebKitPlaybackTargetAvailabilityEvent" in window
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    return ["application/vnd.apple.mpegurl", "video/mp4"]
                }
            }]), hi(AirPlayExternalDisplay, [{
                key: "addVideoEventListeners",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._videoElement;
                    t.addEventListener("webkitplaybacktargetavailabilitychanged", function(t) {
                        switch (t.availability) {
                            case "available":
                                e._available || (e._available = !0, e.fire("available"));
                                break;
                            case "not-available":
                                e._available && (e._available = !1, e.fire("unavailable"))
                        }
                    }), t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged", function(t) {
                        return t.target.webkitCurrentPlaybackTargetIsWireless ? (e._active = !0, void e.fire("activated")) : (e._active = !1, void e.fire("deactivated"))
                    })
                }
            }, {
                key: "showPicker",
                value: function() {
                    var e = this;
                    this._videoElement.webkitShowPlaybackTargetPicker(), this.loadMetadata().then(function() {
                        return e._videoElement.webkitShowPlaybackTargetPicker()
                    }).catch(function() {})
                }
            }, {
                key: "loadMetadata",
                value: function() {
                    var e = this;
                    return this._videoElement.readyState >= 1 ? ut.resolve() : new ut(function(t, n) {
                        e._videoElement.addEventListener("loadedmetadata", function() {
                            t()
                        }), e._videoElement.src = e.getFile().src
                    })
                }
            }, {
                key: "element",
                get: function() {
                    return this._videoElement
                },
                set: function(e) {
                    if (!(e instanceof HTMLVideoElement)) throw new TypeError("The element for AirPlay must be a <video>.");
                    e !== this._videoElement && (this.addVideoEventListeners(e), this._videoElement = e, this._videoElement.setAttribute("x-webkit-airplay", "allow"))
                }
            }]), AirPlayExternalDisplay
        }(Bi),
        Di = document.createElement("video"),
        Ni = {
            "application/vnd.apple.mpegurl": "application/vnd.apple.mpegurl",
            "video/mp4": 'video/mp4; codecs="avc1.64001E"',
            "video/webm": 'video/webm; codecs="vp8, vorbis"',
            "video/x-flv": 'video/x-flv; codecs="vp6"'
        },
        ji = function() {
            var e = "undefined" == typeof TextTrack ? {} : TextTrack;
            return {
                disabled: "DISABLED" in e ? e.DISABLED : "disabled",
                hidden: "HIDDEN" in e ? e.HIDDEN : "hidden",
                showing: "SHOWING" in e ? e.SHOWING : "showing"
            }
        }(),
        Vi = function() {
            var e = document.createElement("track");
            return "track" in e && "oncuechange" in e.track
        }(),
        Hi = new di,
        Ui = 0,
        zi = 1,
        Wi = 2,
        Xi = 3,
        Ki = 4,
        $i = function(e) {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, t);
                var i = gi(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
                    r = e.querySelector("video");
                return r || (r = document.createElement("video"), r.preload = "none", i._element.appendChild(r)), i._video = r, n.htmlScanner && n.htmlScanner.controls && (i._video.controls = !0), i._boundHandleVideoEvent = i.handleVideoEvent.bind(i), i.addVideoEventListeners(), i._downloadRate = new Ri(i), i._bufferTimer = null, i._readyState = Ui, i._paused = !0, i._preload = "none", i._externalDisplayActivated = !1, i._inFullscreen = !1, i
            }
            return mi(t, e), hi(t, null, [{
                key: "displayName",
                get: function() {
                    return "HTMLScanner"
                }
            }, {
                key: "supported",
                get: function() {
                    return t.supportedVideoTypes.length > 0
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    var e = [];
                    if ("function" != typeof Di.canPlayType) return e;
                    for (var t in Ni) {
                        var n = Ni[t];
                        Ei.android && "application/vnd.apple.mpegurl" === t || (!Ei.android || Ei.androidMobile || "video/mp4" !== t ? Di.canPlayType(n).replace(/^no$/, "") && e.push(t) : e.push(t))
                    }
                    return e
                }
            }, {
                key: "supportedExternalDisplays",
                get: function() {
                    return [AirPlayExternalDisplay]
                }
            }, {
                key: "supportsSettingVolume",
                get: function() {
                    if (Ei.android) return !1;
                    var e = Di.volume;
                    return Di.volume = .5 * e, Di.volume !== e
                }
            }, {
                key: "supportsTextTracks",
                get: function() {
                    return "undefined" != typeof Di.textTracks && Di.textTracks instanceof TextTrackList
                }
            }]), hi(t, [{
                key: "deactivate",
                value: function() {
                    pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "deactivate", this).call(this), this.removeVideoEventListeners(), this.removeSnapshot(), this._video.style.display = "none"
                }
            }, {
                key: "reactivate",
                value: function() {
                    pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "reactivate", this).call(this), this.addVideoEventListeners(), this._video.style.display = ""
                }
            }, {
                key: "addVideoEventListeners",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._video;
                    Ai.forEach(function(n) {
                        t.addEventListener(n, e._boundHandleVideoEvent)
                    })
                }
            }, {
                key: "removeVideoEventListeners",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._video;
                    Ai.forEach(function(n) {
                        t.removeEventListener(n, e._boundHandleVideoEvent)
                    })
                }
            }, {
                key: "play",
                value: function() {
                    this._video.preload = "", this._paused = !1, this._video.play()
                }
            }, {
                key: "pause",
                value: function() {
                    this._paused = !0, this._video.pause()
                }
            }, {
                key: "addTextTrack",
                value: function(e) {
                    var n = this,
                        i = document.createElement("track");
                    i.id = "telecine-track-" + e.id, i.src = e.src, i.kind = e.kind, i.srclang = e.language, i.label = e.label, i.addEventListener("cuechange", function() {
                        return e.dispatchEvent("cuechange")
                    }), this._video.addEventListener("timeupdate", function() {
                        n._video.webkitDisplayingFullscreen && (e.mode = i.track.mode)
                    });
                    var r = function() {
                            var t = Ei.iOS && n._video.webkitDisplayingFullscreen;
                            return e._modeHasBeenSet && !t ? void(i.track.mode = ji[e.mode]) : void(e.mode = i.track.mode)
                        },
                        o = [];
                    return i.addEventListener("load", r), ["loadeddata", "seeking"].forEach(function(e) {
                        n._video.addEventListener(e, r), o.push([e, r])
                    }), e._modeHasBeenSet && (i.track.mode = ji[e.mode]), Vi || ! function() {
                        var t = [],
                            r = function() {
                                var n = i.track;
                                if (n && "disabled" !== ji[n.mode]) {
                                    if (t.length !== n.activeCues.length) return e.dispatchEvent("cuechange"), void(t = wn(n.activeCues));
                                    for (var r = 0, o = n.activeCues.length; r < o; r++)
                                        if (n.activeCues[r].startTime !== t[r].startTime) return e.dispatchEvent("cuechange"), void(t = wn(n.activeCues))
                                }
                            };
                        n._video.addEventListener("timeupdate", r), o.push(["timeupdate", r])
                    }(), Be(function() {
                        return n._video.appendChild(i)
                    }), Hi.set(e, o), pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addTextTrack", this).call(this, e)
                }
            }, {
                key: "removeTextTrack",
                value: function(e) {
                    var n = this,
                        i = this._video.querySelector("#telecine-track-" + e.id);
                    i && this._video.removeChild(i);
                    var r = Hi.get(e);
                    return Array.isArray(r) && r.forEach(function(e) {
                        var t = _i(e, 2),
                            i = t[0],
                            r = t[1];
                        n._video.removeEventListener(i, r)
                    }), pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "removeTextTrack", this).call(this, e)
                }
            }, {
                key: "getCuesForTrack",
                value: function(e) {
                    var n = this.getTrackById("telecine-track-" + e.id);
                    return n ? wn(n.cues) : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "getCuesForTrack", this).call(this, e)
                }
            }, {
                key: "getActiveCuesForTrack",
                value: function(e) {
                    var n = this.getTrackById("telecine-track-" + e.id);
                    return n ? wn(n.activeCues) : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "getActiveCuesForTrack", this).call(this, e)
                }
            }, {
                key: "setModeForTrack",
                value: function(e, n) {
                    var i = this.getTrackById("telecine-track-" + e.id);
                    return i && i.mode !== ji[n] && (i.mode = ji[n], Vi || "disabled" === n || e.dispatchEvent("cuechange")), pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setModeForTrack", this).call(this, e, n)
                }
            }, {
                key: "setSrcForTrack",
                value: function(e, n) {
                    var i = this._video.querySelector("#telecine-track-" + e.id);
                    return i && null === i.track.cues && (i.src = n), pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setSrcForTrack", this).call(this, e, n)
                }
            }, {
                key: "addCuePoint",
                value: function(e) {
                    var t = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (this._cuePointTrack || (this._cuePointTrack = this._video.addTextTrack("metadata"), this._cuePointTrack.mode = "hidden", this._cuePointTrack.addEventListener("cuechange", function(e) {
                            [].concat(bi(e.target.activeCues)).forEach(function(e) {
                                t.fire("cuepoint", qi.fromVTTCue(e))
                            })
                        })), e = parseFloat(e), isNaN(e)) throw new TypeError("Time must be a number.");
                    if (e < 0 || e >= this.duration) throw new TypeError("Time must be a positive number less than the duration of the video.");
                    var i = new qi(e, n);
                    return this._cuePointTrack.addCue(i.vttCue), i
                }
            }, {
                key: "removeCuePoint",
                value: function(e) {
                    if (!e) throw new TelecineError("InvalidCuePoint", "The specified cue point is not valid.");
                    return this._cuePointTrack.removeCue(e.vttCue), !0
                }
            }, {
                key: "removeAllCuePoints",
                value: function() {
                    var e = this;
                    return this._cuePointTrack && this._cuePointTrack.length && [].concat(bi(this._cuePointTrack.cues)).forEach(function(t) {
                        e._cuePointTrack.removeCue(t)
                    }), !0
                }
            }, {
                key: "oncanplay",
                value: function() {
                    return !1
                }
            }, {
                key: "oncanplaythrough",
                value: function() {
                    return !1
                }
            }, {
                key: "onerror",
                value: function() {
                    if (!this._video.error) return !1;
                    switch (this._video.error.code) {
                        case this._video.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                            return this.fire("error", new TelecineError("MediaSrcNotSupportedError", "The media was not suitable.")), this._switchToNextFile(), !1;
                        case this._video.error.MEDIA_ERR_DECODE:
                            return this.fire("error", new TelecineError("MediaDecodeError", "The media could not be decoded.")), this._switchToNextFile(), !1;
                        case this._video.error.MEDIA_ERR_NETWORK:
                            return this.fire("error", new TelecineError("MediaNetworkError", "A network error ocurred while fetching the media.")), !1;
                        case this._video.error.MEDIA_ERR_ABORTED:
                            return this.fire("error", new TelecineError("MediaAbortedError", "The user agent aborted the fetching of the media.")), !1;
                        default:
                            return this.fire("error", new TelecineError("MediaUnknownError", "An unknown error occurred.")), !1
                    }
                }
            }, {
                key: "onloadedmetadata",
                value: function() {
                    this.readyState = zi
                }
            }, {
                key: "onloadeddata",
                value: function() {
                    this.readyState = Wi
                }
            }, {
                key: "onsuspend",
                value: function() {
                    this.updateReadyState()
                }
            }, {
                key: "onplay",
                value: function() {
                    return this._ignorePlayEvent ? (this._ignorePlayEvent = !1, !1) : void(("picture-in-picture" === this.presentationMode || "fullscreen" === this.presentationMode || this._inFullscreen) && (this._paused = !1))
                }
            }, {
                key: "onpause",
                value: function() {
                    return window.clearTimeout(this._bufferTimer), this._ignorePauseEvent ? (this._ignorePauseEvent = !1, !1) : void(("picture-in-picture" === this.presentationMode || "fullscreen" === this.presentationMode || this._inFullscreen) && (this._paused = !0))
                }
            }, {
                key: "onended",
                value: function() {
                    if (this._paused = !0, this._video.paused || this._video.pause(), this.currentTime < this._video.duration) return !1
                }
            }, {
                key: "onprogress",
                value: function() {
                    this.updateReadyState()
                }
            }, {
                key: "ontimeupdate",
                value: function() {
                    var e = this,
                        t = Oe(this.buffered, this.currentTime),
                        n = _i(t, 2),
                        i = n[1],
                        r = 1e3 * (i - this.currentTime);
                    if (!Ei.firefox && (r < .25 && this.currentTime + r < this.duration && (this.readyState = Wi), window.clearTimeout(this._bufferTimer), !this.paused)) {
                        for (var o = 0, a = this.buffered, s = Array.isArray(a), c = 0, a = s ? a : a[ui.iterator]();;) {
                            var u;
                            if (s) {
                                if (c >= a.length) break;
                                u = a[c++]
                            } else {
                                if (c = a.next(), c.done) break;
                                u = c.value
                            }
                            var d = u,
                                l = _i(d, 2),
                                f = l[0],
                                h = l[1];
                            o += h - f
                        }
                        o >= this.duration || (this._bufferTimer = window.setTimeout(function() {
                            e._video.paused || e.readyState > Wi && (e.readyState = Wi)
                        }, 1500))
                    }
                }
            }, {
                key: "onwaiting",
                value: function() {
                    return Ei.firefox && (this.readyState = Wi), !1
                }
            }, {
                key: "onemptied",
                value: function() {
                    this._readyState = Ui
                }
            }, {
                key: "onseeked",
                value: function() {
                    this.readyState < Wi && (this.readyState = Wi), this.updateReadyState()
                }
            }, {
                key: "onwebkitbeginfullscreen",
                value: function() {
                    this._inFullscreen = !0
                }
            }, {
                key: "onwebkitendfullscreen",
                value: function() {
                    this._inFullscreen = !1, this._video.paused && (this._paused = !0)
                }
            }, {
                key: "onwebkitpresentationmodechanged",
                value: function() {
                    switch (this._video.webkitPresentationMode) {
                        case "picture-in-picture":
                            this._video.controls = !0;
                            break;
                        case "inline":
                            var e = this._options.htmlScanner && this._options.htmlScanner.controls;
                            e || (this._video.controls = !1)
                    }
                    this.fire("presentationmodechange", this._video.webkitPresentationMode)
                }
            }, {
                key: "shouldHandleVideoEvent",
                value: function(e) {
                    return !0
                }
            }, {
                key: "handleVideoEvent",
                value: function(e) {
                    e.target === this._video && this.shouldHandleVideoEvent(e) !== !1 && ("function" == typeof this["on" + e.type] && this["on" + e.type](e) === !1 || this.fire(e.type))
                }
            }, {
                key: "swapVideo",
                value: function(e, t) {
                    var n = e.paused;
                    this.removeVideoEventListeners(e), e.parentElement.replaceChild(t, e), e.pause(), t.currentTime = e.currentTime, n || t.play(), this.addVideoEventListeners(t), this._video = t
                }
            }, {
                key: "onexternaldisplayactivated",
                value: function(e) {
                    this._externalDisplayActivated || (this._video !== e.element && (this._originalVideo = this._video, this.swapVideo(this._video, e.element)), this._externalDisplayActivated = !0)
                }
            }, {
                key: "onexternaldisplaydeactivated",
                value: function(e) {
                    this._externalDisplayActivated && (this._originalVideo && (this.swapVideo(e.element, this._originalVideo), this._originalVideo = null), this._externalDisplayActivated = !1)
                }
            }, {
                key: "setVideoSrc",
                value: function(e) {
                    this._video.src = e
                }
            }, {
                key: "canSeekTo",
                value: function(e) {
                    var t = this.duration;
                    if (t && e > t && (e = t), this._video.seekable.length > 0)
                        for (var n = 0, i = this._video.seekable.length; n < i; n++)
                            if (this._video.seekable.start(n) <= e && this._video.seekable.end(n) >= e) return !0;
                    return !1
                }
            }, {
                key: "seekToTime",
                value: function(e) {
                    var t = this;
                    return this.canSeekTo(e) ? (Oe(this.buffered, e).length || (this.readyState = zi), this._video.currentTime = e, ut.resolve(this._video.currentTime)) : new ut(function(n, i) {
                        var r = function i() {
                            t.canSeekTo(e) && (Ai.forEach(function(e) {
                                t._video.removeEventListener(e, i)
                            }), Oe(t.buffered, e).length || (t.readyState = zi), t._video.currentTime = e, n(t._video.currentTime))
                        };
                        Ai.forEach(function(e) {
                            t._video.addEventListener(e, r)
                        })
                    })
                }
            }, {
                key: "takeSnapshot",
                value: function() {
                    var e = this._element.querySelector("[telecine-snapshot]");
                    e || (e = document.createElement("canvas"), e.setAttribute("telecine-snapshot", ""), this._element.appendChild(e)), e.setAttribute("width", this._element.clientWidth + "px"), e.setAttribute("height", this._element.clientHeight + "px"), e.style.display = "";
                    var t = De(this._video.clientWidth, this._video.clientHeight, this._video.videoWidth, this._video.videoHeight),
                        n = t.width,
                        i = t.height,
                        r = t.left,
                        o = t.top;
                    e.style.cssText = "position:absolute;width:" + n + "px;height:" + i + "px;left:" + r + "px;top:" + o + "px";
                    var a = e.getContext("2d");
                    a.drawImage(this._video, 0, 0, e.width, e.height)
                }
            }, {
                key: "removeSnapshot",
                value: function() {
                    var e = this._element.querySelector("[telecine-snapshot]");
                    e && (e.style.display = "none")
                }
            }, {
                key: "getTrackById",
                value: function(e) {
                    if ("function" == typeof this._video.textTracks.getTrackById) return this._video.textTracks.getTrackById(e);
                    var t = document.getElementById(e);
                    return t ? t.track : null
                }
            }, {
                key: "updateReadyState",
                value: function() {
                    if (this.buffered.length) {
                        var e = this.duration - this.buffered.end(this.buffered.length - 1),
                            t = e / this._downloadRate.averageDownloadRate,
                            n = this.duration - this.currentTime;
                        if (isFinite(t)) {
                            var i = Oe(this.buffered, this.currentTime),
                                r = _i(i, 2),
                                o = r[1],
                                a = o - this.currentTime;
                            t < n ? this.readyState = Ki : this.readyState === Ki && t > n ? this.readyState = Xi : a > 2 && (t <= n / 2 || a > 10) && (this.readyState = Xi)
                        }
                    }
                }
            }, {
                key: "buffered",
                get: function() {
                    return Ne.from(this._video.buffered)
                }
            }, {
                key: "cuePoints",
                get: function() {
                    return this._cuePointTrack ? [].concat(bi(this._cuePointTrack.cues)).map(function(e) {
                        return qi.fromVTTCue(e)
                    }) : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "cuePoints", this)
                }
            }, {
                key: "currentFile",
                get: function() {
                    return pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "currentFile", this)
                },
                set: function(e) {
                    var n = this,
                        i = !this._video.paused,
                        r = this.currentTime,
                        o = !this._currentFile || e.video.id !== this._currentFile.video.id;
                    if (o || this.takeSnapshot(), this._ignorePlayEvent = !1, this._ignorePauseEvent = !1, this._currentFile = e, o && (this._video.preload = this._preload), this.constructor === t && this._video.readyState > Ui && (this._video.currentTime = 0), (Ei.iOS || Ei.android) && this._currentFile.video.title) {
                        var a = this._currentFile.video.title;
                        this._currentFile.video.subtitle && (a = a + " " + this._currentFile.video.subtitle), this._video.setAttribute("title", a)
                    } else this._video.removeAttribute("title");
                    this._readyState = Ui, this.setVideoSrc(this._currentFile.src, o), this.fire("currentfilechange", e), this.constructor !== t || o ? i && (this._video.preload = "", this._video.play()) : (this._video.preload = "", this.seekToTime(r).then(function(e) {
                        return i && n._video.play(), e
                    }).catch(function() {}), this.once("canplay", function() {
                        return n.removeSnapshot()
                    }), this.once("playing", function() {
                        return n.removeSnapshot()
                    }))
                }
            }, {
                key: "currentTime",
                get: function() {
                    return this._video.currentTime
                },
                set: function(e) {
                    this.seekToTime(e)
                }
            }, {
                key: "duration",
                get: function() {
                    return this._video.duration
                }
            }, {
                key: "ended",
                get: function() {
                    return this._video.ended
                }
            }, {
                key: "loop",
                get: function() {
                    return this._video.loop
                },
                set: function(e) {
                    this._video.loop = e
                }
            }, {
                key: "muted",
                get: function() {
                    return this._video.muted
                },
                set: function(e) {
                    this._video.muted = e
                }
            }, {
                key: "paused",
                get: function() {
                    return this._paused
                }
            }, {
                key: "playbackRate",
                get: function() {
                    return this.video.playbackRate
                },
                set: function(e) {
                    this.video.playbackRate = e
                }
            }, {
                key: "preload",
                get: function() {
                    return this._preload
                },
                set: function(e) {
                    this._video.preload = e, this._preload = e
                }
            }, {
                key: "presentationMode",
                get: function() {
                    return this._video.webkitPresentationMode ? this._video.webkitPresentationMode : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "presentationMode", this)
                },
                set: function(e) {
                    yi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "presentationMode", e, this), "function" == typeof this._video.webkitSetPresentationMode && this._video.webkitSetPresentationMode(e)
                }
            }, {
                key: "supportedPresentationModes",
                get: function() {
                    var e = pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "supportedPresentationModes", this);
                    if ("function" == typeof this._video.webkitSupportsPresentationMode && (this._video.webkitSupportsPresentationMode("picture-in-picture") && e.push("picture-in-picture"), !this._video.webkitSupportsPresentationMode("inline"))) {
                        var n = e.indexOf("inline");
                        n >= 0 && e.splice(n, 1)
                    }
                    return e
                }
            }, {
                key: "video",
                get: function() {
                    return this._telecineVideo
                },
                set: function(e) {
                    var n = this;
                    yi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "video", e, this), Ei.iOS && this._externalDisplays.forEach(function(e) {
                        "AirPlay" === e.constructor.displayName && (e.element = n._video)
                    }), this._telecineVideo.drmHandler && this._telecineVideo.drmHandler.init(this)
                }
            }, {
                key: "videoWidth",
                get: function() {
                    return this._video.videoWidth
                }
            }, {
                key: "videoHeight",
                get: function() {
                    return this._video.videoHeight
                }
            }, {
                key: "volume",
                get: function() {
                    return this._video.volume
                },
                set: function(e) {
                    this._video.volume = e
                }
            }, {
                key: "readyState",
                get: function() {
                    return this._readyState
                },
                set: function(e) {
                    if (this._readyState !== e && !(this._video.readyState === zi && e > zi)) {
                        var t = this._readyState;
                        this._readyState = e, t >= Xi && e <= Wi && (this.fire("waiting"), this._video.paused || (this._ignorePauseEvent = !0, this._video.pause())), t <= Wi && e === Xi && (this.fire("canplay"), this._paused === !1 && this._video.play()), e === Ki && (t <= Wi && (this.fire("canplay"), this._paused === !1 && this._video.paused && (this._ignorePlayEvent = !0, this._video.play())), this.fire("canplaythrough"))
                    }
                }
            }]), t
        }(Ci),
        Yi = "function" == typeof ui && "symbol" == typeof ui.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof ui && e.constructor === ui && e !== ui.prototype ? "symbol" : typeof e
        },
        Gi = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        Qi = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        Ji = function() {
            function e(e, t) {
                var n = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, s = e[ui.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        !i && s.return && s.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (ui.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        Zi = [],
        er = function() {
            function e() {
                var t = this,
                    n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    i = n.retryCount,
                    r = void 0 === i ? 3 : i,
                    o = n.parallel,
                    a = void 0 === o ? 1 : o,
                    s = n.includeWithSpeeds,
                    c = void 0 === s || s;
                Gi(this, e), this._queue = [], this._activeXhrRequests = new Set, this._retries = new di, this._retryCount = r, this._running = !1, this._processingQueue = !1, this._parallel = a, this._includeWithSpeeds = c, this._pendingFetchMap = new di, Ue(this), window.addEventListener("online", function() {
                    t.start()
                }), window.addEventListener("offline", function() {
                    t.stop(), t.abort()
                })
            }
            return Qi(e, null, [{
                key: "getPercentileSpeed",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .8,
                        n = Zi.slice(-e);
                    return Ve(n, t)
                }
            }, {
                key: "getAverageSpeed",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                        n = Zi.slice(-e);
                    return je(n, t)
                }
            }, {
                key: "getMedianSpeed",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5,
                        t = Zi.slice(-e);
                    return He(t)
                }
            }, {
                key: "getResponseSpeeds",
                value: function() {
                    return Zi
                }
            }, {
                key: "getTime",
                value: function() {
                    return "undefined" != typeof performance ? performance.now() : (new Date).getTime()
                }
            }, {
                key: "calculateExponentialBackoff",
                value: function(e) {
                    return 500 * Math.pow(2, e) + Math.round(1e3 * Math.random())
                }
            }]), Qi(e, [{
                key: "add",
                value: function(e, t, n) {
                    return this._addSegmentToQueue(e, t, n), this._running && !this._processingQueue && this._processQueue(), this
                }
            }, {
                key: "start",
                value: function() {
                    return this._running ? this : (this._running = !0, this._processQueue(), this)
                }
            }, {
                key: "stop",
                value: function() {
                    return this._running = !1, this
                }
            }, {
                key: "abort",
                value: function() {
                    var e = this;
                    this._queue.forEach(function(t) {
                        var n = e._getIdentifierFromData(t),
                            i = Ji(n, 3),
                            r = i[2];
                        e.fire("downloadabort", r)
                    }), this._queue = [], this._processingQueue = !1, this._activeXhrRequests.forEach(function(e) {
                        e.abort()
                    })
                }
            }, {
                key: "_insertAtPosition",
                value: function(e, t) {
                    for (var n = 0; n < this._queue.length; n++) {
                        var i = this._queue[n][0].priority;
                        if (i > e.priority) break
                    }
                    this._queue.splice(n, 0, [e, t])
                }
            }, {
                key: "_addSegmentToQueue",
                value: function(e, t, n) {
                    return e.hasOwnProperty("priority") ? void this._insertAtPosition(e, t) : void this._queue[n ? "unshift" : "push"]([e, t])
                }
            }, {
                key: "_processQueue",
                value: function() {
                    if (this._running) {
                        this._processingQueue = !0;
                        for (var e = this._parallel - this._activeXhrRequests.size, t = 0; t < e; t++) this._fetchOne()
                    }
                }
            }, {
                key: "_retry",
                value: function(t, n, i) {
                    var r = this,
                        o = n[0],
                        a = n[1];
                    if (this._retries.get(o) || this._retries.set(o, 0), this._retries.set(o, this._retries.get(o) + 1), this._retries.get(o) > this._retryCount) return void this._handleDownloadError(i, t.status);
                    var s = e.calculateExponentialBackoff(this._retries.get(o));
                    setTimeout(function() {
                        var e = !0;
                        r.add(o, a, e)
                    }, s)
                }
            }, {
                key: "_handleXHRResponse",
                value: function(e, t, n, i) {
                    return e.status >= 500 && e.status < 600 ? void this._retry(e, t, n) : e.status >= 400 && e.status < 500 ? void this._handleDownloadError(n, e.status) : (this.fire("downloadend", n), void i.call(this, new Uint8Array(e.response)))
                }
            }, {
                key: "_handleDownloadError",
                value: function(e, t) {
                    this.fire("downloaderror", e, t)
                }
            }, {
                key: "_getIdentifierFromData",
                value: function(e) {
                    var t = e[1],
                        n = e[0],
                        i = n;
                    return n.id && (i = n.id), [n.url, n.byteRange, i, t]
                }
            }, {
                key: "_continueProcessingQueue",
                value: function() {
                    return 0 === this._activeXhrRequests.size && 0 === this._queue.length ? void(this._processingQueue = !1) : void(this._activeXhrRequests.size < this._parallel && this._processQueue())
                }
            }, {
                key: "_fetchOne",
                value: function() {
                    var t = this;
                    if (0 === this._queue.length) return void(this._processingQueue = !1);
                    var n = this._queue.shift(),
                        i = this._getIdentifierFromData(n),
                        r = Ji(i, 4),
                        o = r[0],
                        a = r[1],
                        s = r[2],
                        c = r[3],
                        u = n[0].includeWithBandwidthChecks,
                        d = e.getTime(),
                        l = new XMLHttpRequest;
                    l.addEventListener("progress", function(e) {
                        e.lengthComputable && t._pendingFetchMap.set(l, {
                            bytesTotal: e.total,
                            bytesLoaded: e.loaded,
                            percent: e.loaded / e.total,
                            identifier: s
                        })
                    }), l.open("GET", o, !0), l.responseType = "arraybuffer", a && l.setRequestHeader("Range", "bytes=" + a), l.onload = function(i) {
                        t._activeXhrRequests.delete(l), t._pendingFetchMap.delete(l);
                        var r = (e.getTime() - d) / 1e3,
                            o = i.target.response.byteLength;
                        if (o > 40960) {
                            var a = 8 * o,
                                f = a / r;
                            Zi.length > 100 && Zi.shift(), t._includeWithSpeeds && u && Zi.push(f)
                        }
                        t._handleXHRResponse(l, n, s, c), t._continueProcessingQueue()
                    }, l.onerror = function() {
                        t._activeXhrRequests.delete(l), t._pendingFetchMap.delete(l), t._retry(l, n, s), t._continueProcessingQueue()
                    }, l.onabort = function() {
                        t._pendingFetchMap.delete(l), t._activeXhrRequests.delete(l), t.fire("downloadabort", s)
                    }, this.fire("downloadstart", s), this._activeXhrRequests.add(l), l.send()
                }
            }, {
                key: "parallel",
                get: function() {
                    return this._parallel
                },
                set: function(e) {
                    this._parallel = e
                }
            }, {
                key: "pendingFetches",
                get: function() {
                    var e = this,
                        t = [];
                    return this._activeXhrRequests.forEach(function(n) {
                        e._pendingFetchMap.get(n) && t.push(e._pendingFetchMap.get(n))
                    }), t
                }
            }]), e
        }(),
        tr = function() {
            function e(t) {
                Gi(this, e), Ue(this), this._sorcerer = t, this._sourceBuffer = null, this._activeStreamIndex = null, this._needsStreamSwitch = !1, this._needInitSegment = !0, this._lastAppended = null, this._toRemove = [], this._streams = [], this._quotaExceeded = !1, this._quotaExceededTimer = null, this._appendingFinalSegment = !1, this._finalSegmentTime = void 0
            }
            return Qi(e, [{
                key: "addStream",
                value: function(e) {
                    var t = this;
                    e.on("segmentadd", function() {
                        return t._process()
                    });
                    var n = this._streams.push(e) - 1;
                    e.index = n, null === this._activeStreamIndex && (this._setActiveIndex(n), this._needsStreamSwitch = !0)
                }
            }, {
                key: "switchTo",
                value: function(e) {
                    var t = this,
                        n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        i = e;
                    "object" === ("undefined" == typeof e ? "undefined" : Yi(e)) && (i = e.index);
                    var r = this._activeStreamIndex !== i,
                        o = r;
                    if (!r && this._needsStreamSwitch && (r = !0), r) {
                        this._needsStreamSwitch = !1;
                        var a = this._activeStreamIndex,
                            s = this._streams[a];
                        s && o && n && s.abort(), this._switchToIndex = i, this._setActiveIndex(i)
                    }
                    return this._process(), new ut(function(e) {
                        return r ? void(t._resolveSwitchComplete = function() {
                            t._switchToIndex === i && (t._resolveSwitchComplete = null, e(), t.fire("streamchange", i))
                        }) : void e()
                    })
                }
            }, {
                key: "isTimeInBuffer",
                value: function(e) {
                    for (var t = 0; t < this.sourceBuffer.buffered.length; t++) {
                        var n = this.sourceBuffer.buffered.start(t),
                            i = this.sourceBuffer.buffered.end(t);
                        if (n <= e && i >= e) return !0
                    }
                    return !1
                }
            }, {
                key: "hasAppendedFinalSegment",
                value: function() {
                    return void 0 !== this._finalSegmentTime && this.isTimeInBuffer(this._finalSegmentTime)
                }
            }, {
                key: "clear",
                value: function() {
                    this._streams.forEach(function(e) {
                        e.clear()
                    })
                }
            }, {
                key: "remove",
                value: function(e) {
                    var t = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._sorcerer._mediaSource.duration;
                    return new ut(function(i, r) {
                        t._toRemove.push([e, n, i]), t._process()
                    })
                }
            }, {
                key: "_attachEvents",
                value: function() {
                    var e = this;
                    this.bound = {
                        handleUpdateEnd: this._handleUpdateEnd.bind(this)
                    }, this._sourceBuffer.addEventListener("updateend", this.bound.handleUpdateEnd), this._sorcerer.on("endofstream", function() {
                        e._handleUpdateEnd()
                    }), this._sorcerer.on("ended", this.bound.handleEnded)
                }
            }, {
                key: "_handleUpdateEnd",
                value: function(e) {
                    this._appendingFinalSegment && (this._finalSegmentTime = this._sourceBuffer.buffered.end(this._sourceBuffer.buffered.length - 1), this._sorcerer._fireStreamHasEnded(), this._appendingFinalSegment = !1), this._lastAppended && (this.fire("appendbufferend", this._lastAppended), this._lastAppended = null, this._resolveSwitchComplete && this._resolveSwitchComplete()), this._process()
                }
            }, {
                key: "_removeEventListeners",
                value: function() {
                    this.bound && (this._sourceBuffer && this._sourceBuffer.removeEventListener("updateend", this.bound.handleUpdateEnd), this._sorcerer.off("endofstream", this.bound.handleUpdateEnd), this._sorcerer.off("ended", this.bound.handleEnded))
                }
            }, {
                key: "_setActiveIndex",
                value: function(e) {
                    this._needInitSegment = !0, this._activeStreamIndex = e, this._sorcerer._frameDropper.streamIndex = e
                }
            }, {
                key: "_process",
                value: function() {
                    var e = this,
                        t = this._streams[this._activeStreamIndex];
                    if (!this._sourceBuffer) return void this.on("sourcebufferattach", this._process);
                    if (t && "closed" !== this._sorcerer._mediaSource.readyState) {
                        var n = this._sourceBuffer;
                        if (!n.updating) {
                            if (this._toRemove.length) {
                                var i = this._toRemove.shift(),
                                    r = Ji(i, 3),
                                    o = r[0],
                                    a = r[1],
                                    s = r[2],
                                    c = this;
                                n.addEventListener("updateend", function e(t) {
                                    n.removeEventListener("updateend", e), s(), clearTimeout(c._quotaExceededTimer), c._quotaExceededTimer = setTimeout(function() {
                                        c._quotaExceeded = !1, c._process()
                                    }, 5e3)
                                });
                                var u = o;
                                return void n.remove(u, a)
                            }
                            if (!this._quotaExceeded) {
                                if (this._needInitSegment) return t.getInitSegment().then(function(t) {
                                    return e._lastAppended = null, n.appendBuffer(t), t
                                }).catch(function(e) {}), void(this._needInitSegment = !1);
                                var d = t.getNextSegment();
                                if (null !== d) {
                                    var l = t.getIdForSegment(d),
                                        f = t.isFinal(d);
                                    f && (this._appendingFinalSegment = !0), this._lastAppended = l, this.fire("appendbufferstart", l);
                                    try {
                                        n.appendBuffer(d)
                                    } catch (e) {
                                        if ("QuotaExceededError" === e.name) {
                                            this._quotaExceeded = !0;
                                            var h = 6;
                                            if (this._sorcerer._video.currentTime > h) {
                                                var v = 0,
                                                    p = this._sorcerer._video.currentTime - h;
                                                this._sorcerer.removeBuffer(v, p)
                                            }
                                            t._readyToAppend.unshift(d)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, {
                key: "streams",
                get: function() {
                    return this._streams
                }
            }, {
                key: "activeStreamIndex",
                get: function() {
                    return this._activeStreamIndex
                }
            }, {
                key: "sourceBuffer",
                get: function() {
                    return this._sourceBuffer
                },
                set: function(e) {
                    this._sourceBuffer = e, this._attachEvents(), this.fire("sourcebufferattach")
                }
            }]), e
        }(),
        nr = function() {
            function e(t) {
                var n = this,
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : new er;
                Gi(this, e), Ue(this), this._readyToAppend = [], this._initSegment = null, this._index = NaN, this._codec = i, this._fetcher = r, this._fetcher.start(), this._bufferData = new di, this._segmentToId = {}, this._getInitSegmentPromise = new ut(function(i, r) {
                    return e.isValidSegmentUrl(t) ? void n._fetcher.add({
                        url: t.url || t,
                        byteRange: t.byteRange,
                        id: null
                    }, function(e) {
                        n._initSegment = e, i(e)
                    }) : (n._initSegment = t, void i(t))
                })
            }
            return Qi(e, null, [{
                key: "isValidSegmentUrl",
                value: function(e) {
                    return "string" == typeof e || "string" == typeof e.url && "string" == typeof e.byteRange
                }
            }]), Qi(e, [{
                key: "getIdForSegment",
                value: function(t) {
                    return e.isValidSegmentUrl(t) ? this._segmentToId[t] : this._bufferData.get(t).id
                }
            }, {
                key: "isFinal",
                value: function(e) {
                    return this._bufferData.get(e).final
                }
            }, {
                key: "addSegment",
                value: function(t) {
                    var n = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = i.identifier,
                        o = void 0 === r ? null : r,
                        a = i.isFinalSegment,
                        s = void 0 !== a && a,
                        c = i.loadOnly,
                        u = void 0 !== c && c,
                        d = i.priority,
                        l = void 0 === d ? 0 : d,
                        f = i.includeWithBandwidthChecks,
                        h = void 0 === f || f;
                    return new ut(function(i, r) {
                        return e.isValidSegmentUrl(t) ? (n._segmentToId[t] = o || t, n.fire("queued", n.getIdForSegment(t)), void n._fetcher.add({
                            url: t.url || t,
                            byteRange: t.byteRange,
                            id: n.getIdForSegment(t),
                            includeWithBandwidthChecks: h,
                            priority: l
                        }, function(e) {
                            n._bufferData.set(e, {
                                id: o || t,
                                final: s
                            }), n._readyToAppend.push(e), n.fire("bufferqueueadd", n.getIdForSegment(t)), u || n.fire("segmentadd"), i()
                        })) : (n._bufferData.set(t, {
                            id: o,
                            final: s
                        }), n._readyToAppend.push(t), n.fire("bufferqueueadd", o), void i())
                    })
                }
            }, {
                key: "clear",
                value: function() {
                    this._readyToAppend = []
                }
            }, {
                key: "abort",
                value: function() {
                    var e = this;
                    this._getInitSegmentPromise.then(function() {
                        e._fetcher.abort()
                    })
                }
            }, {
                key: "getNextSegment",
                value: function() {
                    return 0 === this._readyToAppend.length ? null : this._readyToAppend.shift()
                }
            }, {
                key: "getInitSegment",
                value: function() {
                    return this._getInitSegmentPromise
                }
            }, {
                key: "codec",
                get: function() {
                    return this._codec
                },
                set: function(e) {
                    this._codec = e
                }
            }, {
                key: "index",
                get: function() {
                    return this._index
                },
                set: function(e) {
                    this._index = e
                }
            }, {
                key: "pendingFetches",
                get: function() {
                    return this._fetcher.pendingFetches
                }
            }]), e
        }(),
        ir = function() {
            function e(t) {
                Gi(this, e), this._video = t, this._running = !1, this._droppedFramesTimeout = null, this._droppedFrameData = {}, this._decodedFrameData = {}, this._droppedFrames = 0, this._decodedFrames = 0, this._streamIndex = "default", this.bound = {
                    startCheckingDroppedFrames: this._startCheckingDroppedFrames.bind(this),
                    stopCheckingDroppedFrames: this._stopCheckingDroppedFrames.bind(this)
                }
            }
            return Qi(e, [{
                key: "start",
                value: function() {
                    return this._startCheckingDroppedFrames(), this
                }
            }, {
                key: "stop",
                value: function() {
                    return this._stopCheckingDroppedFrames(), this
                }
            }, {
                key: "destroy",
                value: function() {
                    this._stopCheckingDroppedFrames(), this._removeEvents()
                }
            }, {
                key: "getDroppedFrameRate",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "average",
                        i = this._droppedFrameData[t];
                    if (!i) return 0;
                    if (i.length < e) return 0;
                    var r = i.slice(-e);
                    return "median" === n ? He(r) : je(r)
                }
            }, {
                key: "getDroppedFrameTotal",
                value: function() {
                    return {
                        dropped: this._getTotalDroppedFrames(),
                        total: this._getTotalFrames()
                    }
                }
            }, {
                key: "_attachEvents",
                value: function() {
                    this._video.addEventListener("playing", this.bound.startCheckingDroppedFrames), this._video.addEventListener("pause", this.bound.stopCheckingDroppedFrames), this._video.addEventListener("ended", this.bound.stopCheckingDroppedFrames)
                }
            }, {
                key: "_removeEvents",
                value: function() {
                    this._video.removeEventListener("playing", this.bound.startCheckingDroppedFrames), this._video.removeEventListener("pause", this.bound.stopCheckingDroppedFrames), this._video.removeEventListener("ended", this.bound.stopCheckingDroppedFrames)
                }
            }, {
                key: "_startCheckingDroppedFrames",
                value: function() {
                    this._running = !0, this._checkDroppedFrames()
                }
            }, {
                key: "_stopCheckingDroppedFrames",
                value: function() {
                    this._running = !1
                }
            }, {
                key: "_checkDroppedFrames",
                value: function() {
                    var e = this;
                    if (this._running && null !== this._streamIndex) {
                        clearTimeout(this._droppedFramesTimeout);
                        var t = this._getTotalDroppedFrames(),
                            n = t - this._droppedFrames;
                        this._droppedFrames = t;
                        var i = this._getTotalFrames(),
                            r = i - this._decodedFrames;
                        this._decodedFrames = i, this._droppedFrameData[this._streamIndex] || (this._droppedFrameData[this._streamIndex] = []), this._decodedFrameData[this._streamIndex] || (this._decodedFrameData[this._streamIndex] = []), this._droppedFrameData[this._streamIndex].length > 100 && this._droppedFrameData[this._streamIndex].shift(), this._decodedFrameData[this._streamIndex].length > 100 && this._decodedFrameData[this._streamIndex].shift(), this._droppedFrameData[this._streamIndex].push(n), this._decodedFrameData[this._streamIndex].push(r), this._droppedFramesTimeout = setTimeout(function() {
                            e._checkDroppedFrames()
                        }, 1e3)
                    }
                }
            }, {
                key: "_getTotalDroppedFrames",
                value: function() {
                    return "function" == typeof this._video.getVideoPlaybackQuality ? this._video.getVideoPlaybackQuality().droppedVideoFrames : this._video.webkitDroppedFrameCount || 0
                }
            }, {
                key: "_getTotalFrames",
                value: function() {
                    if ("function" == typeof this._video.getVideoPlaybackQuality) {
                        var e = this._video.getVideoPlaybackQuality();
                        return e.totalVideoFrames - e.droppedVideoFrames - e.corruptedVideoFrames
                    }
                    return this._video.webkitDecodedFrameCount || 0
                }
            }, {
                key: "streamIndex",
                get: function() {
                    return this._streamIndex
                },
                set: function(e) {
                    this._streamIndex = e
                }
            }]), e
        }(),
        rr = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                Gi(this, e), this._video = t, this._options = n, Ue(this), this._options.duration && (this._options.duration = Math.ceil(100 * this._options.duration) / 100), this._bufferCount = 0, this._frameDropper = new ir(t), this._mediaSource = new MediaSource, this._fetcher = new er({
                    parallel: 1
                }), this._video.src = URL.createObjectURL(this._mediaSource), this._buffersForCodec = {}, this._readyPromiseResolve = null, this._attachEvents()
            }
            return Qi(e, [{
                key: "switchTo",
                value: function(e) {
                    return 1 === this._bufferCount && this.video.switchTo(e)
                }
            }, {
                key: "getCurrentSpeed",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.type,
                        n = void 0 === t ? "average" : t,
                        i = e.howMany,
                        r = void 0 === i ? 10 : i,
                        o = e.weights,
                        a = void 0 === o ? [] : o,
                        s = e.percentile,
                        c = void 0 === s ? null : s;
                    return "average" === n ? er.getAverageSpeed(r, a) : "median" === n ? er.getMedianSpeed(r) : er.getPercentileSpeed(r, c)
                }
            }, {
                key: "getResponseSpeeds",
                value: function() {
                    return er.getResponseSpeeds()
                }
            }, {
                key: "getDroppedFrameRate",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.activeStreamIndex,
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "average";
                    return this._frameDropper.getDroppedFrameRate(e, t, n)
                }
            }, {
                key: "getDroppedFrameTotal",
                value: function() {
                    return this._frameDropper.getDroppedFrameTotal()
                }
            }, {
                key: "clear",
                value: function() {
                    for (var e in this._buffersForCodec) this._buffersForCodec[e].clear()
                }
            }, {
                key: "removeBuffer",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._video.duration;
                    if (e > t) return ut.resolve();
                    var n = [];
                    for (var i in this._buffersForCodec) n.push(this._buffersForCodec[i].remove(e, t));
                    return ut.all(n)
                }
            }, {
                key: "addStream",
                value: function(e, t) {
                    var n = this,
                        i = this._getCodecType(e);
                    if (!this._buffersForCodec[i]) {
                        this._bufferCount += 1;
                        var r = new tr(this, i);
                        this._buffersForCodec[i] = r, this.readyPromise.then(function() {
                            var t = void 0;
                            try {
                                t = n._mediaSource.addSourceBuffer(e)
                            } catch (e) {
                                if (22 !== e.code) return void n.fire("srcnotsupported", e);
                                t = n._buffersForCodec[i]
                            }
                            n._options.duration && (t.appendWindowEnd = n._options.duration), r.sourceBuffer = t
                        }), ["appendbufferstart", "appendbufferend", "streamchange"].forEach(function(e) {
                            r.on(e, function(t) {
                                n.fire(e, t)
                            })
                        })
                    }
                    var o = new nr(t, e, this._fetcher);
                    return ["queued", "bufferqueueadd"].forEach(function(e) {
                        o.on(e, function(t) {
                            n.fire(e, t)
                        })
                    }), this._buffersForCodec[i].addStream(o), o
                }
            }, {
                key: "destroy",
                value: function() {
                    this.clear(), this._removeEventListeners(), this._frameDropper.destroy(), this._fetcher.abort(), this._video.src && URL.revokeObjectURL(this._video.src)
                }
            }, {
                key: "_attachEvents",
                value: function() {
                    var e = this;
                    this.bound = {
                        handleSourceOpen: this._handleSourceOpen.bind(this)
                    }, this.readyPromise = new ut(function(t, n) {
                        e._readyPromiseResolve = t, e._mediaSource.addEventListener("sourceopen", e.bound.handleSourceOpen)
                    }), ["downloadstart", "downloadend", "downloadabort", "downloaderror"].forEach(function(t) {
                        e._fetcher.on(t, function() {
                            for (var n = arguments.length, i = Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                            e.fire.apply(e, [t].concat(i))
                        })
                    })
                }
            }, {
                key: "_sourceBuffersAreUpdating",
                value: function() {
                    for (var e = 0; e < this._mediaSource.sourceBuffers.length; e++)
                        if (this._mediaSource.sourceBuffers[e].updating) return !0;
                    return !1
                }
            }, {
                key: "_fireStreamHasEnded",
                value: function() {
                    for (var e in this._buffersForCodec) {
                        var t = this._buffersForCodec[e];
                        if (!t.hasAppendedFinalSegment()) return
                    }
                    "open" === this._mediaSource.readyState && (this._sourceBuffersAreUpdating() || (this._mediaSource.endOfStream(), this.fire("endofstream")))
                }
            }, {
                key: "_handleSourceOpen",
                value: function() {
                    this._options.duration && (this._mediaSource.duration = this._options.duration), this._readyPromiseResolve(), this._mediaSource.removeEventListener("sourceopen", this.bound.handleSourceOpen)
                }
            }, {
                key: "_removeEventListeners",
                value: function() {
                    for (var e in this._buffersForCodec) this._buffersForCodec[e]._removeEventListeners()
                }
            }, {
                key: "_getCodecType",
                value: function(e) {
                    return 0 === e.indexOf("audio") ? "audio" : "video"
                }
            }, {
                key: "mediaSource",
                get: function() {
                    return this._mediaSource
                }
            }, {
                key: "streams",
                get: function() {
                    return 1 === this._bufferCount && this.video.streams
                }
            }, {
                key: "activeStreamIndex",
                get: function() {
                    return 1 === this._bufferCount && this.video.activeStreamIndex
                }
            }, {
                key: "video",
                get: function() {
                    return !!this._buffersForCodec.video && this._buffersForCodec.video
                }
            }, {
                key: "audio",
                get: function() {
                    return !!this._buffersForCodec.audio && this._buffersForCodec.audio
                }
            }]), e
        }(),
        or = function() {
            function e(t) {
                fi(this, e), this.scanner = t
            }
            return hi(e, null, [{
                key: "displayName",
                get: function() {
                    return "Brain"
                }
            }]), hi(e, [{
                key: "shouldPowerUp",
                value: function(e, t) {
                    return !1
                }
            }, {
                key: "shouldPowerDown",
                value: function(e, t) {
                    return !1
                }
            }, {
                key: "canPowerUp",
                value: function(e, t) {
                    return 1 !== e.length && t < e.length - 1
                }
            }, {
                key: "canPowerDown",
                value: function(e, t) {
                    return 1 !== e.length && t > 0
                }
            }, {
                key: "filterStreams",
                value: function(e) {
                    return e
                }
            }]), e
        }(),
        ar = function(e) {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, t);
                var i = gi(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return i._options = n, i.finalSegmentLoaded = !1, i.blacklisted = [], i.whitelisted = [], i
            }
            return mi(t, e), hi(t, null, [{
                key: "displayName",
                get: function() {
                    return "Skyfire"
                }
            }]), hi(t, [{
                key: "shouldPowerUp",
                value: function(e, t, n) {
                    var i = .85;
                    n && this._options.startingBandwidthThreshold && (i = this._options.startingBandwidthThreshold);
                    var r = e.indexOf(t);
                    if (r === -1 && (r = 0), !this.canPowerUp(e, r)) return !1;
                    var o = this.getCurrentSpeed();
                    if (!o) return !1;
                    for (var a = r + 1, s = r; a < e.length;) o * i > e[a].bitrate + e[a].audioBitrate && (s = a), a += 1;
                    return s !== r && s
                }
            }, {
                key: "shouldPowerDown",
                value: function(e, t) {
                    var n = e.indexOf(t),
                        i = n === -1;
                    if (i) return e.length - 1;
                    if (!this.canPowerDown(e, n)) return !1;
                    var r = 10,
                        o = this.scanner.sorcerer.getDroppedFrameRate(r, n, "median"),
                        a = t.framerate,
                        s = this.getCurrentSpeed();
                    if (!s) return !1;
                    var c = o / a * 100;
                    if (c >= 50) return this.blacklist(n), n - 1;
                    for (var u = n, d = n; d > 0;) .9 * s < e[d].bitrate + e[d].audioBitrate && (u = d - 1), d -= 1;
                    return u !== n && u
                }
            }, {
                key: "isTimeInBuffer",
                value: function(e) {
                    var t = this.scanner._video;
                    return this._timesAreInRange(e, e, t.buffered)
                }
            }, {
                key: "getCurrentSpeed",
                value: function() {
                    var e = 3,
                        t = [1, 2, 5];
                    return this.scanner.sorcerer.getCurrentSpeed({
                        type: "average",
                        howMany: e,
                        weights: t
                    })
                }
            }, {
                key: "getDistanceFromBuffer",
                value: function(e) {
                    for (var t = e, n = this.scanner._video, i = 0; i < n.buffered.length; i++)
                        if (n.buffered.start(i) <= e && n.buffered.end(i) >= e) {
                            t = n.buffered.end(i);
                            break
                        }
                    return t - e
                }
            }, {
                key: "getTimeEstimateToLoad",
                value: function(e, t) {
                    if (null === t) return 3;
                    var n = t.segments[e],
                        i = n.end - n.start,
                        r = this.getCurrentSpeed(),
                        o = i * (t.bitrate + t.audioBitrate) / r;
                    return 1.3 * o
                }
            }, {
                key: "canPlayFromTimeInStream",
                value: function(e, t) {
                    if (!this.isTimeInBuffer(e)) return !1;
                    if (!t) return !1;
                    var n = this.getSegmentsToLoad();
                    if (0 === n.length) return !0;
                    var i = this.getDistanceFromBuffer(e);
                    return this.getTimeEstimateToLoad(n[0], t) < i
                }
            }, {
                key: "getSegmentsToLoad",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "video",
                        n = arguments[2],
                        i = this.scanner._video,
                        r = this.scanner.currentTime,
                        o = [],
                        a = this._getSecondsToLoadAhead(r, i.duration, n),
                        s = r + a,
                        c = this.scanner.sorcerer[t].activeStreamIndex,
                        u = this.scanner._streams[t][c],
                        d = this.scanner.sorcerer[t].sourceBuffer,
                        l = null;
                    d && (l = d.buffered);
                    for (var f = 0; f < u.segments.length; f++) {
                        var h = u.segments[f],
                            v = f === u.segments.length - 1;
                        if (!(h.end < r || h.start > s)) {
                            var p = r >= h.start && r < h.end,
                                m = this._isSegmentInBuffer(h, l, v);
                            !e && m || e && m && p || (p ? o.push(f) : s >= h.start && o.push(f))
                        }
                    }
                    return o
                }
            }, {
                key: "blacklist",
                value: function(e) {
                    this.blacklisted[e] = 1
                }
            }, {
                key: "lock",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    this.whitelisted = e
                }
            }, {
                key: "filterStreams",
                value: function(e) {
                    for (var t = this.scanner._video.clientWidth, n = this.scanner._video.clientHeight, i = [], r = void 0, o = !1, a = 0; a < e.length; a++)
                        if (r && r[0] === e[a].width && r[1] === e[a].height) i.push(e[a]);
                        else {
                            if (o) break;
                            if (!(this.blacklisted[a] && this.whitelisted.indexOf(a) === -1 || this.whitelisted.length && this.whitelisted.indexOf(a) === -1))
                                if (this.whitelisted.length) i.push(e[a]);
                                else {
                                    var s = this._getScaleFromDimensions(t, n, e[a].width, e[a].height),
                                        c = 1e3 / (window.devicePixelRatio || 1),
                                        u = n < c ? 1.75 : 1;
                                    s >= u && (o = !0), i.push(e[a]), r = [e[a].width, e[a].height]
                                }
                        }
                    return i
                }
            }, {
                key: "_getVisibleDimensions",
                value: function(e, t, n, i) {
                    var r = n / i,
                        o = e - t * r,
                        a = t - e / r,
                        s = e - o,
                        c = t - a;
                    return o > 0 && (c = t), a > 0 && (s = e), [s, c]
                }
            }, {
                key: "_getScaleFromDimensions",
                value: function(e, t, n, i) {
                    var r = this._getVisibleDimensions(e, t, n, i),
                        o = n * i;
                    this.scanner.video && this.scanner.video.metadata.percentShown && (o *= this.scanner.video.metadata.percentShown);
                    var a = window.devicePixelRatio || 1,
                        s = r[0] * r[1] * a * a;
                    return o / s
                }
            }, {
                key: "_getSecondsToLoadAhead",
                value: function(e, t, n) {
                    var i = 12e3,
                        r = n && n.bitrate > i;
                    return 1 === this.whitelisted.length ? r ? 30 : 90 : 18
                }
            }, {
                key: "_round",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
                    if (e = parseFloat(e), isNaN(e)) return 0;
                    var n = Math.pow(10, t);
                    return Math.round(e * n) / n
                }
            }, {
                key: "_timesAreInRange",
                value: function(e, t, n) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (!n) return !1;
                    t = Math.min(t, this.scanner._video.duration);
                    for (var r = 0; r < n.length; r++) {
                        var o = this._round(n.start(r)) - i,
                            a = this._round(n.end(r)) + i;
                        if (o <= e && a >= t) return !0
                    }
                    return !1
                }
            }, {
                key: "_hasSeparateStreams",
                value: function() {
                    return this.scanner._streams.video.length > 0 && this.scanner._streams.audio.length > 0
                }
            }, {
                key: "_isSegmentInBuffer",
                value: function(e, t, n) {
                    var i = 1;
                    return this._hasSeparateStreams() && (i = .05), n && !this.finalSegmentLoaded ? (this.finalSegmentLoaded = !0, !1) : this._timesAreInRange(e.start, e.end, t, i)
                }
            }]), t
        }(or),
        sr = 1,
        cr = 2,
        ur = 3,
        dr = 4,
        lr = 1e4,
        fr = 5,
        hr = "video",
        vr = "audio",
        pr = function(e) {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, t);
                var i = gi(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
                return i.reset(), n.mediaSourceScanner && (i._maxPreloadStreamIndex = n.mediaSourceScanner.maxPreloadStreamIndex), i
            }
            return mi(t, e), hi(t, null, [{
                key: "displayName",
                get: function() {
                    return "MediaSourceScanner"
                }
            }, {
                key: "supported",
                get: function() {
                    return "undefined" != typeof MediaSource && "undefined" != typeof Set
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    return ["application/vnd.vimeo.dash+json"]
                }
            }]), hi(t, [{
                key: "deactivate",
                value: function() {
                    pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "deactivate", this).call(this), this.reset(), this.sorcerer && this.sorcerer.destroy()
                }
            }, {
                key: "reset",
                value: function() {
                    this._waitingOnSet = new Set, this._streamsForSegment = {}, this._brain = new ar(this, this._options.mediaSourceScanner || {}), this._ready = !1, this._startedPlaying = !1, this._manifest = null, this._streams = {}, this._streams[vr] = [], this._streams[hr] = [], this._audioStreams = [], this._onReady = null, this._baseUrl = null, this._lastTargetStreamId = null, this._timeToSeekTo = null, this._resolveSeek = null, this._resolveStartPreload = null, this._reloadingExistingVideo = !1, this._lastStreamIndex = null, this._checkSwitchUp = !1, this._clearBufferAtTime = !1, this._preloadStream = null, this._removeBufferPromise = null, this._badPlaybackTimer = null, this._isBufferingTooLong = !1, this._ranIntoBuffer = !1, this._bufferCount = 0, this._restrictedStreamIndexes = [], this._switching = {}, this._fireEndedTimeout = null, this._firedFakeEndedEvent = !1
                }
            }, {
                key: "preloadStream",
                value: function() {
                    var e = this;
                    return this._preloadStream ? this._preloadStream : (this._preloadStream = new ut(function(t, n) {
                        var i = 1;
                        e._streams.audio.length && (i = 2);
                        var r = 0,
                            o = !1,
                            a = e.sorcerer.video.activeStreamIndex;
                        e._restrictedStreamIndexes.length && (a = e._streams[hr].indexOf(e._manifest.video[e._restrictedStreamIndexes[0]]));
                        var s = e._brain.getSegmentsToLoad(!1, hr, e._getCurrentStream()),
                            c = 0;
                        s.length > 0 && (c = s[0]);
                        var u = function() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                t && (a = e.sorcerer.video.activeStreamIndex);
                                for (var n in e._streams)
                                    if (0 !== e._streams[n].length) {
                                        var i = a;
                                        n === vr && (i = e._getAudioIndexFromVideo(a));
                                        var s = e._getSegmentUrl(i, c, n),
                                            u = e._isFinalSegment(i, c),
                                            d = e.sorcerer[n].streams[i],
                                            l = {
                                                stream: i,
                                                segment: c,
                                                type: n
                                            },
                                            f = !0,
                                            h = s;
                                        if (e._useRangeRequests()) {
                                            var v = e._getRangeForSegment(i, c, n);
                                            h = {
                                                url: h,
                                                byteRange: v
                                            }
                                        }
                                        "audio" !== n || i !== o ? ("audio" === n && o === !1 && (o = i), d.addSegment(h, {
                                            identifier: l,
                                            isFinalSegment: u,
                                            loadOnly: f,
                                            priority: 0
                                        })) : (r += 1, e._handleAppendBufferEnd(l))
                                    }
                            },
                            d = function n(o) {
                                if (r += 1, !(r < i) && o.segment === c) {
                                    if (0 === e._restrictedStreamIndexes.length) {
                                        var s = !0,
                                            d = e._getStreamIndexToLoad(s);
                                        if (d !== !1 && d > o.stream) return e.sorcerer.video.switchTo(d, !1), e._streams.audio.length && e.sorcerer.audio.switchTo(e._getAudioIndexFromVideo(d), !1), r = 0, void u(!0)
                                    }
                                    var l = e._getCurrentStream(a),
                                        f = l.segments[0].end,
                                        h = !0,
                                        v = e._getDuration(h);
                                    e.currentTime >= v && (e.currentTime = v), e.currentTime > f && (e.sorcerer.clear(), e._waitingOnSet = new Set), e.sorcerer.video.switchTo(a, !1), e._streams.audio.length && e.sorcerer.audio.switchTo(e._getAudioIndexFromVideo(a), !1), e.sorcerer.off("bufferqueueadd", n), e._ready = !0, t()
                                }
                            };
                        e.sorcerer.on("bufferqueueadd", d), u()
                    }), this._preloadStream)
                }
            }, {
                key: "loadManifest",
                value: function(e) {
                    var t = this;
                    return new ut(function(n, i) {
                        var r = new XMLHttpRequest;
                        r.open("GET", e, !0), r.onload = function() {
                            if (r.status >= 400) return t.reset(), void i("JSON manifest failed to load.");
                            try {
                                n(JSON.parse(r.response))
                            } catch (e) {
                                i()
                            }
                        }, r.onerror = function() {
                            t.reset(), i("JSON manifest failed to load.")
                        }, r.send()
                    })
                }
            }, {
                key: "setVideoSrc",
                value: function(e, t) {
                    var n = this,
                        i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    if (i && !t && this._onReady) {
                        if (("metadata" === this._preload || "none" === this._preload && !this._paused) && !this._ready) return void this._onReady.then(function() {
                            var t = n._paused;
                            n.setVideoSrc(e, t, !1)
                        });
                        if ("auto" === this._preload) return void this._onReady.then(function() {
                            n.setVideoSrc(e, !1, !1)
                        })
                    }
                    if (t) {
                        this.reset();
                        try {
                            this._video.currentTime = 0
                        } catch (e) {}
                    }
                    t || this._onReady || !this._paused || this.sorcerer || (t = !0);
                    var r = "_initializeManifest";
                    t && (this._video.preload = "", r = "_initialize");
                    var o = e.split("/");
                    o.pop(), this._baseUrl = o.join("/") + "/", this._reloadingExistingVideo = !t, this._onReady = this._startPreload(e, this._preload).then(this.loadManifest.bind(this)).then(this[r].bind(this)), t && "auto" === this._preload && (this._onReady = this._addCallbackToPromise(this._onReady, this.preloadStream.bind(this), !1)), this._onReady = this._addCatchToPromise(this._onReady)
                }
            }, {
                key: "updateReadyState",
                value: function() {}
            }, {
                key: "lockStreamIndexes",
                value: function() {
                    var e = this,
                        t = this._restrictedStreamIndexes.map(function(t) {
                            return e._streams[hr].indexOf(e._manifest.video[t])
                        });
                    if (this._video.paused || (this._ignorePauseEvent = !0, this._video.pause()), this._switching[hr] = !1, this._brain.lock(t), this._startedPlaying || "auto" === this._preload) {
                        var n = 7,
                            i = Math.max(this.currentTime - n, 0),
                            r = Math.min(this.currentTime + n, this._video.duration);
                        this.sorcerer.removeBuffer(i, r).then(function() {
                            return e._startedPlaying || "auto" !== e._preload ? (e.seekToTime(e.currentTime), void(!e._paused && e._video.paused && (e._ignorePlayEvent = !0, e.play()))) : void e._loadSegments()
                        })
                    }
                }
            }, {
                key: "seekToTime",
                value: function(e) {
                    var t = this;
                    clearTimeout(this._fireEndedTimeout), this._firedFakeEndedEvent = !1;
                    var n = null === this._timeToSeekTo;
                    if (n || (this._lastSeekReject && (this._lastSeekReject(), this._lastSeekReject = null), this._seekInProgressPromise = null, this._timeToSeekTo = null, this._resolveSeek = null), this._timeToSeekTo = e, this._ready)
                        for (var i in this._streams)
                            if (this._streams[i].length > 0) {
                                var r = this.sorcerer[i].activeStreamIndex,
                                    o = this.sorcerer[i].streams[r];
                                o.abort()
                            }
                    return this._seekInProgressPromise = this._getSeekReadyPromiseForTime(e), ut.all([this._onReady, this._removeBufferPromise]).then(function() {
                        t._loadSegments()
                    }), this._paused && 0 === e && this.fire("seeking"), this.readyState = sr, !n && this._waitingOnPlay && this.play(), this._onReady.then(function() {
                        return t._seekInProgressPromise
                    }).catch(function(e) {})
                }
            }, {
                key: "takeSnapshot",
                value: function() {}
            }, {
                key: "onstalled",
                value: function() {
                    return !1
                }
            }, {
                key: "onseeked",
                value: function(e) {
                    this._startedPlaying && (this._loadSegments(), pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onseeked", this).call(this, e))
                }
            }, {
                key: "onended",
                value: function(e) {
                    if (clearTimeout(this._fireEndedTimeout), this._firedFakeEndedEvent) return !1;
                    pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onended", this).call(this, e);
                    var n = 6;
                    return this.sorcerer.removeBuffer(n), !0
                }
            }, {
                key: "onseeking",
                value: function(e) {
                    var t = this;
                    this._startedPlaying && (clearTimeout(this._seekTimeout), this._seekTimeout = setTimeout(function() {
                        t._loadSegments()
                    }, 100))
                }
            }, {
                key: "onloadeddata",
                value: function() {
                    var e = this;
                    Be(function() {
                        e.readyState = dr
                    })
                }
            }, {
                key: "ontimeupdate",
                value: function(e) {
                    var t = this;
                    if (clearTimeout(this._fireEndedTimeout), 0 === this.currentTime) return this._startedPlaying;
                    if (this._timeToSeekTo) return !1;
                    if (this._startedPlaying || (this._startedPlaying = !0), this._clearBufferAtTime && this.currentTime >= this._clearBufferAtTime) {
                        var n = 2;
                        this.sorcerer.removeBuffer(0, this._clearBufferAtTime - n), this._clearBufferAtTime = !1
                    }
                    this._loadSegments();
                    var i = this.sorcerer.getDroppedFrameTotal();
                    this.fire("droppedframes", i);
                    var r = this.sorcerer.getResponseSpeeds(),
                        o = this._streams[hr][this.sorcerer.video.activeStreamIndex],
                        a = {
                            speed: this._brain.getCurrentSpeed(),
                            bitrate: o.bitrate,
                            speeds: r
                        };
                    this.fire("bandwidth", a);
                    var s = this._video.buffered.length;
                    if (!s) return !0;
                    var c = this._video.buffered.end(s - 1);
                    if (!this._firedFakeEndedEvent && this.currentTime + .5 > this._video.duration) {
                        var u = 500;
                        this._fireEndedTimeout = setTimeout(function() {
                            t.fire("ended", {
                                simulated: !0
                            }), t.onended(), t._firedFakeEndedEvent = !0
                        }, u)
                    }
                    if (Math.ceil(c) === Math.ceil(this._video.duration)) return !0;
                    var d = .2;
                    return Math.abs(this.currentTime - c) < d ? !this._ranIntoBuffer && (this._bufferCount += 1, this.fire("streambufferstart", {
                        hasLowerStreamIndex: this.sorcerer[hr].activeStreamIndex > 0
                    }), this._ranIntoBuffer = !0, this._startBadPlaybackTimer(), this.readyState = cr, !1) : void 0
                }
            }, {
                key: "onprogress",
                value: function() {
                    this._brain.canPlayFromTimeInStream(this.currentTime, this._getCurrentStream()) && (clearTimeout(this._badPlaybackTimer), this.readyState < ur && (this.readyState = dr), this._ranIntoBuffer && (this.fire("streambufferend"), this._ranIntoBuffer = !1))
                }
            }, {
                key: "onplay",
                value: function() {
                    return "picture-in-picture" === this.presentationMode && (this._paused = !1, !0)
                }
            }, {
                key: "onpause",
                value: function() {
                    return "picture-in-picture" === this.presentationMode && (this._paused = !0, !0)
                }
            }, {
                key: "onwaiting",
                value: function(e) {
                    return !1
                }
            }, {
                key: "onerror",
                value: function() {
                    return !!this._video.error && (this._video.error.code === this._video.error.MEDIA_ERR_DECODE ? (this.fire("scannererror", {
                        reason: "encountered media decode error"
                    }), !1) : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onerror", this).call(this))
                }
            }, {
                key: "pause",
                value: function() {
                    var e = this;
                    Be(function() {
                        e.fire("pause")
                    }), pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "pause", this).call(this)
                }
            }, {
                key: "play",
                value: function() {
                    var e = this;
                    this._firedFakeEndedEvent && (this.currentTime = 0), Be(function() {
                        e.fire("play")
                    }), this._waitingOnPlay = !0, this._paused = !1, Ei.android && !this._ready && (this._waitingOnPlay = !1, this._video.play()), this._resolveStartPreload && this._resolveStartPreload(), this._reloadingExistingVideo || this._ready || "auto" === this._preload || (this._onReady = this._addCallbackToPromise(this._onReady, this.preloadStream.bind(this))), this._ready || this._startBadPlaybackTimer();
                    var t = this._seekInProgressPromise || ut.resolve();
                    return this._onReady.then(function() {
                        return t
                    }).then(function() {
                        e._waitingOnPlay = !1, e._paused || e._video.play()
                    })
                }
            }, {
                key: "_getAudioIndexFromVideo",
                value: function(e) {
                    return 0 !== this._streams.audio.length && (this._streams.audio.length > 1 && this._streams.video[e].bitrate > 1e6 ? 1 : 0)
                }
            }, {
                key: "_addCallbackToPromise",
                value: function(e, t) {
                    var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                        i = e.then(t);
                    return n && (i = this._addCatchToPromise(i)), i
                }
            }, {
                key: "_addCatchToPromise",
                value: function(e) {
                    var t = this;
                    return e.catch(function(e) {
                        return t.fire("fileerror", {
                            reason: e
                        }), new ut(function(e, t) {})
                    })
                }
            }, {
                key: "_handleBufferForSeek",
                value: function() {
                    if (this._ready) {
                        var e = this._streams[hr][this.sorcerer.video.activeStreamIndex],
                            t = e.bitrate / 1e3,
                            n = 12e3;
                        t > n && (this._removeBufferPromise = this.sorcerer.removeBuffer())
                    }
                }
            }, {
                key: "_startPreload",
                value: function(e, t) {
                    var n = this;
                    return new ut(function(i, r) {
                        return "none" !== t || n._reloadingExistingVideo && !n._paused ? void i(e) : void(n._resolveStartPreload = function() {
                            i(e), n._resolveStartPreload = null
                        })
                    })
                }
            }, {
                key: "_getSeekReadyPromiseForTime",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._timeToSeekTo;
                    return new ut(function(n, i) {
                        var r = !e._startedPlaying && 0 === t;
                        return r || e._brain.canPlayFromTimeInStream(t, e._getCurrentStream()) ? void n(t) : (e._handleBufferForSeek(), void(e._resolveSeek = n))
                    }).then(function(t) {
                        e._timeToSeekTo = null, e._seekInProgressPromise = null, e.readyState = dr;
                        var n = new ut(function(t, n) {
                            e._lastSeekReject = n;
                            var i = function n() {
                                t(e._video.currentTime), e._video.removeEventListener("seeked", n)
                            };
                            e._video.addEventListener("seeked", i)
                        });
                        return e._video.currentTime = t, n
                    })
                }
            }, {
                key: "_handlePreloadChanged",
                value: function(e, t) {
                    "auto" !== e && "auto" === t && (this._onReady = this._addCallbackToPromise(this._onReady, this.preloadStream.bind(this))), e !== t && "none" !== t && this._resolveStartPreload && this._resolveStartPreload()
                }
            }, {
                key: "_initializeManifest",
                value: function(e) {
                    var t = this;
                    return new ut(function(n, i) {
                        t._manifest = e, t._streams[hr] = t._sortStreams(e.video), e.audio && (t._streams[vr] = t._sortStreams(e.audio));
                        for (var r = 0; r < t._streams[hr].length; r++) {
                            var o = 0;
                            if (e.audio) {
                                var a = t._streams[vr][t._getAudioIndexFromVideo(r)];
                                a && (o = a.bitrate)
                            }
                            t._streams[hr][r].audioBitrate = o
                        }
                        n()
                    })
                }
            }, {
                key: "_setUpSorcerer",
                value: function(e, t) {
                    this.sorcerer && this.sorcerer.destroy(), this.sorcerer = new rr(e, t)
                }
            }, {
                key: "_getDuration",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = e ? 1 / 0 : 0;
                    for (var n in this._streams) this._streams[n].length && (t = Math[e ? "min" : "max"](t, this._streams[n][0].duration));
                    return t
                }
            }, {
                key: "_initialize",
                value: function(e) {
                    var t = this;
                    return new ut(function(n, i) {
                        t._initializeManifest(e).then(function() {
                            var i = t._brain.filterStreams(t._streams[hr]),
                                r = i.length - 1,
                                o = e.video[0];
                            if (t._restrictedStreamIndexes.length && (o = e.video[t._restrictedStreamIndexes[0]]), void 0 !== t._maxPreloadStreamIndex) {
                                var a = t._streams[hr].indexOf(e.video[t._maxPreloadStreamIndex]);
                                r <= a && (o = t._streams[hr][r])
                            }
                            t._setUpSorcerer(t._video, {
                                duration: t._getDuration()
                            }), t.sorcerer.on("srcnotsupported", function() {
                                t.fire("scannererror", {
                                    reason: "this codec is not supported for mediasource playback"
                                })
                            });
                            var s = t._streams[hr].indexOf(o),
                                c = function(e) {
                                    t._streams[e].forEach(function(n, i) {
                                        var r = t._getSegmentUrl(i, "init", e);
                                        if (t._useRangeRequests() && t._streams[e][i].init_segment_range) {
                                            var o = t._getRangeForSegment(i, "init", e);
                                            r = {
                                                url: r,
                                                byteRange: o
                                            }
                                        }
                                        t.sorcerer.addStream(n.mime_type + '; codecs="' + t._streams[e][i].codecs + '"', r)
                                    })
                                };
                            for (var u in t._streams) c(u);
                            t.sorcerer.video.switchTo(s), t.sorcerer.on("queued", t._handleQueued.bind(t)), t.sorcerer.on("downloadabort", t._handleAborted.bind(t)), t.sorcerer.on("appendbufferend", t._handleAppendBufferEnd.bind(t)), t.sorcerer.on("downloadend", t._handleDownloadEnd.bind(t)), t.sorcerer.on("downloaderror", t._handleDownloadError.bind(t)), t.sorcerer.video.on("streamchange", function(e) {
                                e > t._lastStreamIndex && t.currentTime > 0 && (t._checkSwitchUp = !0), t._lastStreamIndex = e;
                                var n = t._manifest.video.indexOf(t._streams[hr][e]),
                                    i = {
                                        index: n,
                                        streams: t._manifest.video
                                    };
                                t.fire("streamchange", i), t._startBadPlaybackTimer()
                            }), t.sorcerer.on("droppedframes", function() {
                                return t.fire("alert", "droppedframes")
                            }), t.sorcerer.mediaSource.addEventListener("sourceended", function() {
                                t.fire("progress")
                            }), n()
                        })
                    })
                }
            }, {
                key: "_sortStreams",
                value: function(e) {
                    function t(e, t) {
                        var n = e.width * e.height * e.bitrate,
                            i = t.width * t.height * t.bitrate;
                        return e.width === t.width && e.height === t.height ? e.framerate - t.framerate : n - i
                    }
                    var n = e.slice(0);
                    return n.sort(t), n
                }
            }, {
                key: "_useRangeRequests",
                value: function() {
                    return !!this._manifest.video[0].segments[0].range
                }
            }, {
                key: "_getRangeForSegment",
                value: function(e, t, n) {
                    return "init" === t ? this._streams[n][e].init_segment_range : this._streams[n][e].segments[t].range
                }
            }, {
                key: "_getSegmentPriority",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : hr,
                        i = "init" === t;
                    if (i) return 0;
                    var r = this._streams[n][e].segments[t].start;
                    return r
                }
            }, {
                key: "_getSegmentUrl",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : hr,
                        i = "init" === t;
                    if (i && !this._streams[n][e].init_segment_range && this._streams[n][e].init_segment.indexOf(".") === -1) {
                        var r = this._streams[n][e].init_segment;
                        return qe(r)
                    }
                    var o = this._baseUrl,
                        a = this._manifest.base_url && this._manifest.base_url.indexOf("//") !== -1;
                    return a && (o = this._manifest.base_url), this._manifest.base_url && !a && (o += this._manifest.base_url), this._streams[n][e].base_url && (o += this._streams[n][e].base_url), this._useRangeRequests() ? o : "init" === t ? o += this._streams[n][e].init_segment : (this._streams[n][e].segments[t].url && (o += this._streams[n][e].segments[t].url), o)
                }
            }, {
                key: "_key",
                value: function(e, t, n) {
                    return e + ":" + t + ":" + n
                }
            }, {
                key: "_isFinalSegment",
                value: function(e, t) {
                    return t === this._streams[hr][e].segments.length - 1
                }
            }, {
                key: "_getCurrentlyLoadingStreamsForSegment",
                value: function(e, t) {
                    var n = [],
                        i = this._streamsForSegment[e];
                    if (!i) return n;
                    for (var r = 0; r < i.length; r++) this._waitingOnSet.has(this._key(i[r], e, t)) && n.push(i[r]);
                    return n
                }
            }, {
                key: "_getCurrentStream",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : hr;
                    return "undefined" != typeof this.sorcerer && (e = this.sorcerer[t].activeStreamIndex), this._streams[t][e]
                }
            }, {
                key: "_getStreamIndexToLoad",
                value: function(e) {
                    var t = this._streams[hr];
                    if (t = this._brain.filterStreams(t), 0 === t.length) return !1;
                    if (this._switching[hr]) return !1;
                    var n = t[t.length - 1];
                    if (n.id !== this._lastTargetStreamId) {
                        this._lastTargetStreamId = n.id;
                        var i = this._streams[hr].indexOf(n),
                            r = {
                                index: i,
                                streams: this._streams[hr]
                            };
                        this.fire("streamtargetchange", r)
                    }
                    var o = this._getCurrentStream(),
                        a = this._brain.shouldPowerUp(t, o, e);
                    return this._checkForBadPlayback(), a === !1 && (a = this._brain.shouldPowerDown(t, o)), a === !1 ? a : this._streams[hr].indexOf(t[a])
                }
            }, {
                key: "_startBadPlaybackTimer",
                value: function() {
                    var e = this;
                    clearTimeout(this._badPlaybackTimer), this._badPlaybackTimer = setTimeout(function() {
                        e._isBufferingTooLong = !0, e._checkForBadPlayback()
                    }, lr)
                }
            }, {
                key: "_checkForBadPlayback",
                value: function() {
                    this._isHavingBadPlaybackInCurrentQuality() && this.fire("alert", "streamstudder")
                }
            }, {
                key: "_isHavingBadPlaybackInCurrentQuality",
                value: function() {
                    return !!this._restrictedStreamIndexes.length && (!(!this._isBufferingTooLong && this._bufferCount < fr) && (this._isBufferingTooLong, this._bufferCount >= fr, this._isBufferingTooLong = !1, this._bufferCount = 0, !0))
                }
            }, {
                key: "_loadSegmentsForType",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : hr,
                        n = this._getStreamIndexToLoad();
                    t === vr && (n === !1 && (n = this.sorcerer[hr].activeStreamIndex), n = this._getAudioIndexFromVideo(n), this.sorcerer[vr].activeStreamIndex === n && (n = !1));
                    var i = !1;
                    n !== !1 && (i = n > this.sorcerer[t].activeStreamIndex, this._switching[t] = !0, this.sorcerer[t].switchTo(n).then(function() {
                        e._switching[t] = !1
                    }));
                    for (var r = this._brain.getSegmentsToLoad(i, t, this._getCurrentStream()), o = this.sorcerer[t].activeStreamIndex, a = 0; a < r.length; a++) {
                        var s = this._getSegmentUrl(o, r[a], t),
                            c = this._getCurrentlyLoadingStreamsForSegment(r[a], t);
                        if (!(c.length > 1 || 1 === c.length && o <= c[0])) {
                            var u = this._isFinalSegment(o, r[a], t),
                                d = {
                                    stream: o,
                                    segment: r[a],
                                    type: t
                                },
                                l = this.sorcerer[t].streams[o],
                                f = s;
                            if (this._useRangeRequests()) {
                                var h = this._getRangeForSegment(o, r[a], t);
                                f = {
                                    url: f,
                                    byteRange: h
                                }
                            }
                            var v = this._getSegmentPriority(o, r[a], t),
                                p = t === hr;
                            l.addSegment(f, {
                                identifier: d,
                                isFinalSegment: u,
                                priority: v,
                                includeWithBandwidthChecks: p
                            })
                        }
                    }
                }
            }, {
                key: "_loadSegments",
                value: function() {
                    var e = this;
                    return this._onReady.then(function() {
                        for (var t in e._streams) e._streams[t].length > 0 && e._loadSegmentsForType(t)
                    })
                }
            }, {
                key: "_handleQueued",
                value: function(e) {
                    this._waitingOnSet.add(this._key(e.stream, e.segment, e.type)), this._streamsForSegment[e.segment] || (this._streamsForSegment[e.segment] = []), this._streamsForSegment[e.segment].indexOf(e.stream) === -1 && this._streamsForSegment[e.segment].push(e.stream)
                }
            }, {
                key: "_clearWaitingOn",
                value: function(e) {
                    var t = this,
                        n = this._streamsForSegment[e.segment];
                    n.forEach(function(n) {
                        t._waitingOnSet.delete(t._key(n, e.segment, e.type))
                    })
                }
            }, {
                key: "_handleAborted",
                value: function(e) {
                    this._clearWaitingOn(e)
                }
            }, {
                key: "_handleAppendBufferEnd",
                value: function(e) {
                    this._checkSwitchUp && e.stream === this._lastStreamIndex && (this._checkSwitchUp = !1, this._clearBufferAtTime = this._streams[hr][e.stream].segments[e.segment].start), this._clearWaitingOn(e), null !== this._timeToSeekTo && this._resolveSeek && this._brain.canPlayFromTimeInStream(this._timeToSeekTo, this._getCurrentStream()) && (this._resolveSeek(this._timeToSeekTo), this._resolveSeek = null)
                }
            }, {
                key: "_handleDownloadEnd",
                value: function(e) {}
            }, {
                key: "_handleDownloadError",
                value: function(e, t) {
                    this._clearWaitingOn(e), this.fire("downloaderror", {
                        identifier: e,
                        status: t
                    })
                }
            }, {
                key: "preload",
                get: function() {
                    return this._preload
                },
                set: function(e) {
                    this._handlePreloadChanged(this._preload, e), this._preload = e
                }
            }, {
                key: "videoWidth",
                get: function() {
                    var e = this._getCurrentStream();
                    return e ? e.width : this._video.videoWidth
                }
            }, {
                key: "videoHeight",
                get: function() {
                    var e = this._getCurrentStream();
                    return e ? e.height : this._video.videoHeight
                }
            }, {
                key: "restrictedStreamIndexes",
                get: function() {
                    return this._restrictedStreamIndexes
                },
                set: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    this._restrictedStreamIndexes.join(",") !== t.join(",") && (this._restrictedStreamIndexes = t, this._onReady.then(function() {
                        return e.lockStreamIndexes()
                    }))
                }
            }, {
                key: "currentTime",
                get: function() {
                    return this._firedFakeEndedEvent ? this._video.duration : null !== this._timeToSeekTo ? this._timeToSeekTo : this._video.currentTime
                },
                set: function(e) {
                    (this._startedPlaying || 0 !== e) && this.seekToTime(e)
                }
            }]), t
        }($i),
        mr = function(e) {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, t);
                var i = gi(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
                    r = document.createElement("canvas");
                return i._backingCanvas = r.getContext("2d"), i._resizeHandler = function() {
                    return i.onresize()
                }, i
            }
            return mi(t, e), hi(t, null, [{
                key: "displayName",
                get: function() {
                    return "AsciiEffect"
                }
            }, {
                key: "supported",
                get: function() {
                    return !/iphone|ipod/i.test(navigator.userAgent)
                }
            }, {
                key: "supportedScanners",
                get: function() {
                    return [$i, pr]
                }
            }]), hi(t, [{
                key: "activate",
                value: function() {
                    return window.addEventListener("resize", this._resizeHandler, !1), this._telecine.paused ? void this._renderFrame() : void this._startRendering()
                }
            }, {
                key: "deactivate",
                value: function() {
                    this._stopRendering(), window.removeEventListener("resize", this._resizeHandler, !1), this._element.removeChild(this._output)
                }
            }, {
                key: "onplay",
                value: function() {
                    this._startRendering()
                }
            }, {
                key: "onpause",
                value: function() {
                    this._stopRendering()
                }
            }, {
                key: "onended",
                value: function() {
                    this._stopRendering()
                }
            }, {
                key: "onseeked",
                value: function() {
                    this._renderFrame()
                }
            }, {
                key: "onresize",
                value: function() {
                    var e = this._telecine._currentScanner._video,
                        t = this._getRenderProperties(e.clientWidth, e.clientHeight, this._telecine.videoWidth, this._telecine.videoHeight);
                    this._adjustRenderSize(this._output, t), this._telecine.paused && this._renderFrame()
                }
            }, {
                key: "_getRenderProperties",
                value: function(e, t, n, i) {
                    var r = De(e, t, n, i),
                        o = Math.max(Math.min(Math.floor(r.height / 10), 60), 10);
                    this._options.color && (o = Math.floor(o / 2));
                    var a = document.createElement("pre");
                    a.style.cssText = "position:absolute;left:-9001px;top:0;font-size:10px;margin:0;padding:0;line-height:1", a.innerHTML = "X", this._element.appendChild(a);
                    var s = t / o / a.clientHeight * 10 + "px";
                    a.style.fontSize = s;
                    for (var c = a.clientHeight, u = Math.ceil(r.height / c), d = r.height - u * c, l = parseFloat((d / u + c) / c), f = a.clientWidth, h = Math.ceil(r.width / f), v = [], p = 0; p < h; p++) v.push("X");
                    a.innerHTML = v.join("");
                    var m = r.width - a.clientWidth,
                        g = m / h + "px";
                    return this._element.removeChild(a), {
                        fontSize: s,
                        lineHeight: l,
                        letterSpacing: g,
                        horizontalResolution: h,
                        verticalResolution: u,
                        top: r.top
                    }
                }
            }, {
                key: "_createOutputElement",
                value: function(e) {
                    var t = document.createElement("pre");
                    return t.style.cssText = "position:absolute;left:0;top:0;margin:0;padding:0;background:#000;width:100%;height:100%;text-align:center", t.style.color = this._options.color ? "#fff" : "#0f0", this._adjustRenderSize(t, e), this._telecine._currentScanner._video.setAttribute("crossorigin", "anonymous"), t
                }
            }, {
                key: "_adjustRenderSize",
                value: function(e, t) {
                    var n = t.fontSize,
                        i = t.lineHeight,
                        r = t.letterSpacing,
                        o = t.horizontalResolution,
                        a = t.verticalResolution,
                        s = t.top;
                    this._backingCanvas.width = o, this._backingCanvas.height = a, this._renderWidth = o, this._renderHeight = a, e.style.fontSize = n, e.style.lineHeight = i, e.style.letterSpacing = r, e.style.paddingTop = s + "px"
                }
            }, {
                key: "_getFrame",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this._backingCanvas.drawImage(e, 0, 0, this._renderWidth, this._renderHeight);
                    var n = null;
                    try {
                        n = this._backingCanvas.getImageData(0, 0, this._renderWidth, this._renderHeight).data
                    } catch (e) {
                        this._stopRendering()
                    }
                    for (var i = [], r = 0; r < this._renderHeight; r++) {
                        for (var o = 0; o < this._renderWidth; o++) {
                            var a = 4 * (r * this._renderWidth + o),
                                s = n[a],
                                c = n[a + 1],
                                u = n[a + 2],
                                d = 3 * s + 4 * c + u >>> 3;
                            if (t) {
                                var l = " CGO08@" [Math.floor(d / 256 * 7)];
                                if (" " === l || s >= 250 && c >= 250 && u >= 250) {
                                    i.push(l);
                                    continue
                                }
                                i.push('<span style="color:rgb(' + s + "," + c + "," + u + ')">' + l + "</span>")
                            } else {
                                var f = "  .,:;iltfLG@" [Math.floor(d / 256 * 13)];
                                i.push(f)
                            }
                        }
                        i.push("\n")
                    }
                    return i.join("")
                }
            }, {
                key: "_requestRenderAnimationFrame",
                value: function() {
                    var e = this;
                    this._animationFrame && window.cancelAnimationFrame(this._animationFrame), this._content && (this._animationFrame = window.requestAnimationFrame(function() {
                        e._output.innerHTML = e._content, e._content = null
                    }))
                }
            }, {
                key: "_renderFrame",
                value: function() {
                    if (!this._output) {
                        var e = this._telecine._currentScanner._video,
                            t = this._getRenderProperties(e.clientWidth, e.clientHeight, this._telecine.videoWidth, this._telecine.videoHeight);
                        this._output = this._createOutputElement(t), this._element.appendChild(this._output)
                    }
                    this._content = this._getFrame(this._telecine._currentScanner._video, this._options.color), this._requestRenderAnimationFrame()
                }
            }, {
                key: "_startRendering",
                value: function() {
                    var e = this;
                    this._interval && window.clearInterval(this._interval);
                    var t = Math.min(Math.max(this._options.fps, 15), 30);
                    this._interval = window.setInterval(function() {
                        e._renderFrame()
                    }, 1 / t)
                }
            }, {
                key: "_stopRendering",
                value: function() {
                    this._interval && (window.clearInterval(this._interval), this._interval = null)
                }
            }]), t
        }(wi),
        gr = function() {
            var e = "Shockwave Flash",
                t = "application/x-shockwave-flash",
                n = "ShockwaveFlash.ShockwaveFlash",
                i = window.navigator,
                r = 0,
                o = !1,
                a = null;
            if ("undefined" != typeof i.plugins && "object" === li(i.plugins[e])) {
                if (a = i.plugins[e].description, a && ("undefined" == typeof i.mimeTypes || !i.mimeTypes[t] || i.mimeTypes[t].enabledPlugin)) {
                    o = !0, a = a.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    var s = parseInt(a.replace(/^(.*)\..*$/, "$1"), 10),
                        c = parseInt(a.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    r = parseFloat(s + "." + c)
                }
            } else if ("undefined" != typeof window.ActiveXObject) try {
                var u = new ActiveXObject(n);
                u && (a = u.GetVariable("$version"), a && (o = !0, a = a.split(" ")[1].split(","), r = parseFloat(parseInt(a[0], 10) + "." + parseInt(a[1], 10))))
            } catch (e) {}
            return {
                installed: o,
                version: r
            }
        }(),
        yr = function(e) {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (fi(this, t), !n.swfScanner || !n.swfScanner.swfUrl) throw new Error("The url to the swf is required to use the SWFScanner.");
                var i = gi(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
                    r = "flideo_" + Fe().replace(/-/g, "_");
                return window[r] = {
                    onFlashEvent: function(e) {
                        return i.onEvent(e)
                    }
                }, i._swf = i.createSwf(i._options.swfScanner.swfUrl, r + ".onFlashReady"), i._element.appendChild(i._swf), i._loaded = !1, i._volume = 1, i._muted = !1, i._loadedPromise = new ut(function(e, t) {
                    window[r].onFlashReady = function() {
                        i._loaded = !0, i.attachVideoEvents(r + ".onFlashEvent"), e()
                    }, setTimeout(t, 1e4)
                }), i
            }
            return mi(t, e), hi(t, null, [{
                key: "displayName",
                get: function() {
                    return "SWFScanner"
                }
            }, {
                key: "supported",
                get: function() {
                    return gr.installed && gr.version >= 10.1
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    return ["application/vnd.apple.mpegurl", "video/mp4", "video/x-flv"]
                }
            }]), hi(t, [{
                key: "deactivate",
                value: function() {
                    this._swf.parentElement.removeChild(this._swf)
                }
            }, {
                key: "play",
                value: function() {
                    var e = this;
                    this.onLoaded(function() {
                        return e._swf._play()
                    })
                }
            }, {
                key: "pause",
                value: function() {
                    var e = this;
                    this.onLoaded(function() {
                        return e._swf._pause()
                    })
                }
            }, {
                key: "attachVideoEvents",
                value: function(e) {
                    var t = this;
                    Ai.forEach(function(n) {
                        t._swf.api_addEventListener(n, e)
                    })
                }
            }, {
                key: "createSwf",
                value: function(e, t) {
                    var n = document.createElement("object");
                    n.setAttribute("type", "application/x-shockwave-flash"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("data", e);
                    var i = {
                        flashvars: "ready=" + t,
                        movie: e,
                        allowfullscreen: "true",
                        allowscriptaccess: "always",
                        bgcolor: "#000000",
                        wmode: "opaque",
                        quality: "high",
                        scalemode: "noscale"
                    };
                    for (var r in i) {
                        var o = document.createElement("param");
                        o.setAttribute("name", r), o.setAttribute("value", i[r]), n.appendChild(o)
                    }
                    return n
                }
            }, {
                key: "onEvent",
                value: function(e) {
                    "function" == typeof this["on" + e.type] && this["on" + e.type](e) === !1 || this.fire(e.type, e)
                }
            }, {
                key: "onLoaded",
                value: function(e) {
                    this._loadedPromise = this._loadedPromise.then(e)
                }
            }, {
                key: "onerror",
                value: function() {
                    var e = this._swf.getError(),
                        t = e.code;
                    switch (t) {
                        case 1:
                            return this.fire("error", new TelecineError("MediaAbortedError", "The user agent aborted the fetching of the media.")), !1;
                        case 2:
                            return this.fire("error", new TelecineError("MediaNetworkError", "A network error ocurred while fetching the media.")), !1;
                        case 3:
                            return this.fire("error", new TelecineError("MediaDecodeError", "The media could not be decoded.")), this._switchToNextFile(), !1;
                        case 4:
                            return this.fire("error", new TelecineError("MediaSrcNotSupportedError", "The media was not suitable.")), this._switchToNextFile(), !1;
                        default:
                            return this.fire("error", new TelecineError("MediaUnknownError", "An unknown error occurred.")), !1
                    }
                }
            }, {
                key: "buffered",
                get: function() {
                    if (!this._loaded) return pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buffered", this);
                    var e = this._swf.getBuffered(),
                        n = e.start,
                        i = e.end;
                    return Ne(n, i)
                }
            }, {
                key: "currentFile",
                get: function() {
                    return pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "currentFile", this)
                },
                set: function(e) {
                    var n = this,
                        i = this._currentFile;
                    yi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "currentFile", e, this), this.onLoaded(function() {
                        var t = !n._swf.getPaused(),
                            r = n._swf.getCurrentTime();
                        n._swf.setSrc(e.src), n.fire("currentfilechange", e), i && (n._swf.setCurrentTime(r), t && n._swf._play())
                    })
                }
            }, {
                key: "currentTime",
                get: function() {
                    return this._loaded ? this._swf.getCurrentTime() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "currentTime", this)
                },
                set: function(e) {
                    var t = this;
                    this.onLoaded(function() {
                        return t._swf.setCurrentTime(e)
                    })
                }
            }, {
                key: "duration",
                get: function() {
                    return this._loaded ? this._swf.getDuration() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "duration", this)
                }
            }, {
                key: "ended",
                get: function() {
                    return this._loaded ? this._swf.getEnded() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "ended", this)
                }
            }, {
                key: "loop",
                get: function() {
                    return this._loaded ? this._swf.getLoop() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "loop", this)
                },
                set: function(e) {
                    var t = this;
                    this.onLoaded(function() {
                        return t._swf.setLoop(e)
                    })
                }
            }, {
                key: "muted",
                get: function() {
                    return this._muted
                },
                set: function(e) {
                    var t = this;
                    this._muted = e;
                    var n = e === !0 ? 0 : this._volume;
                    this.onLoaded(function() {
                        return t._swf.setVolume(n)
                    })
                }
            }, {
                key: "paused",
                get: function() {
                    return this._loaded ? this._swf.getPaused() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "paused", this)
                }
            }, {
                key: "videoWidth",
                get: function() {
                    return this._loaded ? this._swf.getVideoWidth() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "videoWidth", this)
                }
            }, {
                key: "videoHeight",
                get: function() {
                    return this._loaded ? this._swf.getVideoHeight() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "videoHeight", this)
                }
            }, {
                key: "volume",
                get: function() {
                    return this._loaded ? this._swf.getVolume() : pi(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "volume", this)
                },
                set: function(e) {
                    var t = this;
                    this._volume = e, this.onLoaded(function() {
                        return t._swf.setVolume(e)
                    })
                }
            }]), t
        }(Ci),
        _r = new di,
        br = new di,
        TelecineFile = function() {
            function TelecineFile(e, t) {
                var n = e.src,
                    i = e.mime,
                    r = e.id,
                    o = void 0 === r ? Fe() : r,
                    a = e.priority,
                    s = void 0 === a ? 0 : a,
                    c = e.metadata,
                    u = void 0 === c ? {} : c;
                if (fi(this, TelecineFile), !n) throw new TypeError("Must provide a src for the file.");
                if (!i) throw new TypeError("Must provide a mime type for the file.");
                Object.defineProperties(this, {
                    mime: {
                        value: i,
                        enumerable: !0
                    },
                    id: {
                        value: "" + o,
                        enumerable: !0
                    },
                    metadata: {
                        value: u,
                        enumerable: !0
                    }
                }), this.video = t, this.priority = s, this.src = n
            }
            return hi(TelecineFile, [{
                key: "priority",
                get: function() {
                    return _r.get(this)
                },
                set: function(e) {
                    if (e = parseInt(e, 10), "number" == typeof e && isFinite(e) && Math.floor(e) === e && e >= 0) return void _r.set(this, e);
                    throw new TypeError("The file priority must be an integer greater than or equal to 0.")
                }
            }, {
                key: "src",
                get: function() {
                    return br.get(this)
                },
                set: function(e) {
                    br.set(this, e), this.video.fire("filesrcupdate", this)
                }
            }, {
                key: "restrictedStreamIndexes",
                get: function() {
                    if (!Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.video.currentScanner), "restrictedStreamIndexes")) throw new ReferenceError("The current scanner does not support streams.");
                    return this.video.currentScanner.restrictedStreamIndexes
                },
                set: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    if (!Array.isArray(e)) throw new TypeError("Indexes must be an array.");
                    if (!Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.video.currentScanner), "restrictedStreamIndexes")) throw new ReferenceError("The current scanner does not support streams.");
                    this.video.currentScanner.restrictedStreamIndexes = e
                }
            }]), TelecineFile
        }(),
        wr = ["disabled", "hidden", "showing"],
        kr = ["subtitles", "captions", "descriptions", "chapters", "metadata"],
        Sr = ["ar", "fa", "he", "iw", "ku", "ps", "sd", "ur", "yi"],
        xr = new di,
        Tr = new di,
        TelecineTextTrack = function() {
            function TelecineTextTrack(e, t) {
                var n = e.kind,
                    i = e.src,
                    r = void 0 === i ? null : i,
                    o = e.label,
                    a = void 0 === o ? "" : o,
                    s = e.language,
                    c = void 0 === s ? "" : s,
                    u = e.id,
                    d = void 0 === u ? Fe() : u;
                if (fi(this, TelecineTextTrack), kr.indexOf(n) === -1) throw Le(12, "SYNTAX_ERR", "Syntax Error");
                Ee(this), Object.defineProperties(this, {
                    kind: {
                        value: n,
                        enumerable: !0
                    },
                    label: {
                        value: a,
                        enumerable: !0
                    },
                    language: {
                        value: c,
                        enumerable: !0
                    },
                    id: {
                        value: "" + d,
                        enumerable: !0
                    },
                    rtl: {
                        value: Sr.indexOf(c.substr(0, 2)) !== -1,
                        enumerable: !0
                    }
                }), this.video = t, this.src = r, this._modeHasBeenSet = !1, xr.set(this, "disabled")
            }
            return hi(TelecineTextTrack, [{
                key: "dispatchEvent",
                value: function(e) {
                    this.fire(e, {
                        target: this
                    })
                }
            }, {
                key: "mode",
                get: function() {
                    return xr.get(this)
                },
                set: function(e) {
                    if (wr.indexOf(e) > -1) {
                        if (this._modeHasBeenSet = !0, xr.get(this) === e) return;
                        xr.set(this, e), this.video.currentScanner && this.video.currentScanner.setModeForTrack(this, e), this.dispatchEvent("modechange")
                    }
                }
            }, {
                key: "src",
                get: function() {
                    return Tr.get(this)
                },
                set: function(e) {
                    Tr.set(this, e), this.video.fire("texttracksrcupdate", this)
                }
            }, {
                key: "cues",
                get: function() {
                    return this.video.currentScanner ? this.video.currentScanner.getCuesForTrack(this) : []
                }
            }, {
                key: "activeCues",
                get: function() {
                    return this.video.currentScanner ? this.video.currentScanner.getActiveCuesForTrack(this) : []
                }
            }]), TelecineTextTrack
        }(),
        Er = function() {
            function e(t, n) {
                fi(this, e), this._cdms = t.cdms, this._lrToken = t.lr_token, this._userId = t.user, this._assetId = t.asset, this._useHls = n, this._licenseUrl = null, this._keySession = null, this._preferredKeySystem = null, this._encryptedEventName = null, this._boundGenerateRequest = this._generateRequest.bind(this)
            }
            return hi(e, [{
                key: "init",
                value: function(e) {
                    var t = this;
                    return this._video = e._video, this._scanner = e, this._canHandleEME() ? (this._licenseRequestMetadata = this._getLicenseRequestHeader(), this._getKeySystems().then(function(e) {
                        if (e.forEach(function(e) {
                                e.keySystem && (t._preferredKeySystem = e)
                            }), !t._preferredKeySystem) return t._scanner.fire("emeunsupported"), !1;
                        var n = t._getCdmFromSystem(t._preferredKeySystem);
                        return t._encryptedEventName = "encrypted", t._licenseUrl = n.license_url, t._useHls && (t._certificateUrl = n.certificate_url, t._encryptedEventName = "webkitneedkey"), t._video.addEventListener(t._encryptedEventName, t._boundGenerateRequest), t._useHls ? (t._video.webkitSetMediaKeys(t._preferredKeySystem.keySystem), !0) : t._video.mediaKeys ? (t._keySession = t._video.mediaKeys.createSession(), t._keySession.addEventListener("message", function(e) {
                            return t._getLicense(e)
                        }), !0) : (t._keySession = t._preferredKeySystem.keySystem.createSession(), t._keySession.addEventListener("message", function(e) {
                            return t._getLicense(e)
                        }), t._video.setMediaKeys(t._preferredKeySystem.keySystem), !0)
                    })) : (this._scanner.fire("emeunsupported"), !1)
                }
            }, {
                key: "destroy",
                value: function() {
                    this._keySession && this._keySession.sessionId && this._keySession.close(), this._video.removeEventListener(this._encryptedEventName, this._boundGenerateRequest)
                }
            }, {
                key: "_generateRequest",
                value: function(e) {
                    var t = this;
                    return "com.apple.fps.1_0" === this._preferredKeySystem.name ? (this._loadFairPlayCertificate().then(function(n) {
                        t._contentId = "assetId=" + t._assetId;
                        var i = t._concatInitDataIdAndCertificate(e.initData, t._contentId, n);
                        return t._keySession = t._preferredKeySystem.keySystem.createSession("video/mp4", i), t._keySession.addEventListener("webkitkeymessage", function(e) {
                            return t._getLicense(e)
                        }, !1), n
                    }).catch(function(e) {
                        t._scanner.fire(e.error, e.payload)
                    }), !0) : !this._keySession.sessionId && !this._activeKeySession && (this._activeKeySession = this._keySession.generateRequest(e.initDataType, e.initData).catch(function() {
                        t._scanner.fire("drmfailure")
                    }), !0)
                }
            }, {
                key: "_getLicense",
                value: function(e) {
                    var t = this;
                    return new ut(function(n, i) {
                        t._activeKeySession = null;
                        var r = new XMLHttpRequest;
                        r.keySession = e.target, r.responseType = "arraybuffer", r.open("POST", t._licenseUrl), r.setRequestHeader("dt-custom-data", window.btoa(JSON.stringify(t._licenseRequestMetadata)));
                        var o = e.message;
                        if ("com.microsoft.playready" === t._preferredKeySystem.name && ! function() {
                                var n = t._unpackPlayReadyRequest(e.message),
                                    i = n[0];
                                Object.keys(i).forEach(function(e) {
                                    r.setRequestHeader([e], i[e])
                                }), o = n[1]
                            }(), "com.apple.fps.1_0" === t._preferredKeySystem.name) {
                            var a = btoa(String.fromCharCode.apply(null, o));
                            a = encodeURIComponent(a), o = "spc=" + a + "&" + t._contentId, r.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                        }
                        r.onload = function() {
                            if (403 === r.status) {
                                var e = JSON.parse(r.getResponseHeader("x-dt-error-message"));
                                return void i({
                                    error: "drmauthfailure",
                                    payload: {
                                        text: e.error,
                                        code: e.error_code
                                    }
                                })
                            }
                            if (r.status >= 400) return void i({
                                error: "drmfailure"
                            });
                            try {
                                t._scanner.fire("drmauthsuccess");
                                var o = new Uint8Array(r.response),
                                    a = o.buffer;
                                "com.apple.fps.1_0" === t._preferredKeySystem.name && (a = t._unpackFairPlayLicenseResponse(btoa(String.fromCharCode.apply(null, o)))), r.keySession.update(a), n()
                            } catch (e) {
                                i("Error updating key session: " + e)
                            }
                        }, r.onerror = i, r.send(o)
                    }).catch(function(e) {
                        t._scanner.fire(e.error, e.payload)
                    })
                }
            }, {
                key: "_canHandleEME",
                value: function() {
                    var e = !!(window.MediaKeys && window.navigator && window.navigator.requestMediaKeySystemAccess && window.MediaKeySystemAccess && window.MediaKeySystemAccess.prototype.getConfiguration || window.WebKitMediaKeys);
                    return e
                }
            }, {
                key: "_concatInitDataIdAndCertificate",
                value: function(e, t, n) {
                    "string" == typeof t && (t = Re(t));
                    var i = 0,
                        r = new ArrayBuffer(e.byteLength + 4 + t.byteLength + 4 + n.byteLength),
                        o = new DataView(r),
                        a = new Uint8Array(r, i, e.byteLength);
                    a.set(e), i += e.byteLength, o.setUint32(i, t.byteLength, !0), i += 4;
                    var s = new Uint8Array(r, i, t.byteLength);
                    s.set(t), i += s.byteLength, o.setUint32(i, n.byteLength, !0), i += 4;
                    var c = new Uint8Array(r, i, n.byteLength);
                    return c.set(n), new Uint8Array(r, 0, r.byteLength)
                }
            }, {
                key: "_loadFairPlayCertificate",
                value: function() {
                    var e = this;
                    return new ut(function(t, n) {
                        var i = new XMLHttpRequest;
                        i.responseType = "arraybuffer", i.open("GET", e._certificateUrl), i.setRequestHeader("dt-custom-data", window.btoa(JSON.stringify(e._licenseRequestMetadata))), i.onload = function() {
                            if (403 === i.status) {
                                var e = JSON.parse(i.getResponseHeader("x-dt-error-message"));
                                return void n({
                                    error: "drmauthfailure",
                                    payload: {
                                        text: e.error,
                                        code: e.error_code
                                    }
                                })
                            }
                            if (i.status >= 400) return void n({
                                error: "drmfailure"
                            });
                            try {
                                t(new Uint8Array(i.response))
                            } catch (e) {
                                n(e)
                            }
                        }, i.onerror = n, i.send()
                    })
                }
            }, {
                key: "_getCdmFromSystem",
                value: function(e) {
                    var t = this,
                        n = null;
                    return Object.keys(this._cdms).forEach(function(i) {
                        e.name === t._cdms[i].id && (n = t._cdms[i])
                    }), n
                }
            }, {
                key: "_unpackFairPlayLicenseResponse",
                value: function(e) {
                    var t = window.atob(e.trim());
                    return "<ckc>" === t.substr(0, 5) && "</ckc>" === t.substr(-6) && (t = t.slice(5, -6)), new Uint8Array(atob(t).split("").map(function(e) {
                        return e.charCodeAt(0)
                    }))
                }
            }, {
                key: "_unpackPlayReadyRequest",
                value: function(e) {
                    for (var t = String.fromCharCode.apply(null, new Uint16Array(e)), n = (new DOMParser).parseFromString(t, "application/xml"), i = {}, r = n.getElementsByTagName("HttpHeader"), o = 0; o < r.length; ++o) {
                        var a = r[o].querySelector("name"),
                            s = r[o].querySelector("value");
                        i[a.textContent] = s.textContent
                    }
                    var c = n.querySelector("Challenge");
                    return e = new Uint8Array(atob(c.textContent).split("").map(function(e) {
                        return e.charCodeAt(0)
                    })), [i, e]
                }
            }, {
                key: "_getLicenseRequestHeader",
                value: function() {
                    var e = {},
                        t = window.screen.availWidth + "x" + window.screen.availHeight,
                        n = window.devicePixelRatio;
                    return e.merchant = "vimeo", e.sessionId = JSON.stringify({
                        ua: navigator.userAgent,
                        token: this._lrToken,
                        resolution: t,
                        pixelRatio: n
                    }), e.userId = this._userId, e
                }
            }, {
                key: "_getKeySystems",
                value: function() {
                    var e = this,
                        t = {
                            persistentState: "required",
                            sessionTypes: ["persistent-license"]
                        },
                        n = Object.keys(this._cdms).map(function(n) {
                            var i = e._cdms[n].id;
                            if (e._useHls) {
                                var r = null;
                                try {
                                    r = new window.WebKitMediaKeys(i)
                                } catch (e) {}
                                return ut.resolve({
                                    name: i,
                                    keySystem: r
                                })
                            }
                            return navigator.requestMediaKeySystemAccess(i, [t, {}]).then(function(e) {
                                return e.createMediaKeys()
                            }).catch(function(e) {}).then(function(e) {
                                return {
                                    name: i,
                                    keySystem: e
                                }
                            })
                        });
                    return ut.all(n)
                }
            }]), e
        }(),
        Lr = new di,
        TelecineVideo = function() {
            function TelecineVideo(e) {
                var t = this,
                    n = e.files,
                    i = e.id,
                    r = void 0 === i ? Fe() : i,
                    o = e.title,
                    a = void 0 === o ? null : o,
                    s = e.subtitle,
                    c = void 0 === s ? null : s,
                    u = e.metadata,
                    d = void 0 === u ? {} : u,
                    l = e.textTracks,
                    f = void 0 === l ? Ae() : l,
                    h = e.externalDisplayFiles,
                    v = void 0 === h ? {} : h;
                if (fi(this, TelecineVideo), !n || !Array.isArray(n)) throw new TypeError("Must provide files for the video.");
                Ee(this);
                var p = Ce(n.map(function(e) {
                        return e instanceof TelecineFile ? (e.video = t, e) : new TelecineFile(e, t)
                    })),
                    m = Ae(f.map(function(e) {
                        return e instanceof TelecineTextTrack ? (e.video = t, e) : new TelecineTextTrack(e, t)
                    }));
                Object.keys(v).forEach(function(e) {
                    !v[e] || v[e] instanceof TelecineFile || (v[e] = new TelecineFile(v[e], t))
                }), Object.defineProperties(this, {
                    id: {
                        value: "" + r,
                        enumerable: !0
                    },
                    title: {
                        value: a,
                        enumerable: !0
                    },
                    subtitle: {
                        value: c,
                        enumerable: !0
                    },
                    metadata: {
                        value: d,
                        enumerable: !0
                    },
                    files: {
                        value: p,
                        enumerable: !0
                    },
                    textTracks: {
                        value: m,
                        enumerable: !0
                    },
                    externalDisplayFiles: {
                        value: v,
                        enumerable: !0
                    }
                }), d.drm && (this._drmHandler = new Er(d.drm, d.useHls))
            }
            return hi(TelecineVideo, [{
                key: "deactivate",
                value: function() {
                    var e = this;
                    this._drmHandler && this._drmHandler.destroy(), this.textTracks.forEach(function(t) {
                        return e.currentScanner.removeTextTrack(t)
                    })
                }
            }, {
                key: "drmHandler",
                get: function() {
                    return this._drmHandler || null
                }
            }, {
                key: "currentFile",
                get: function() {
                    return this.currentScanner.currentFile
                },
                set: function(e) {
                    this.currentScanner.currentFile = e
                }
            }, {
                key: "currentScanner",
                get: function() {
                    return Lr.get(this)
                },
                set: function(e) {
                    var t = this;
                    this.currentScanner && this.textTracks.forEach(function(e) {
                        return t.currentScanner.removeTextTrack(e)
                    }), this.textTracks.forEach(function(t) {
                        return e.addTextTrack(t)
                    }), Lr.set(this, e)
                }
            }]), TelecineVideo
        }(),
        Pr = function() {
            function e(t, n) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                fi(this, e), this._element = t, this._scanners = n, this._options = i, this._video = null, this._textTracks = Ae(), this._properties = {}, this._currentScanner = new Ci, this._blacklistedScanners = [], this._activeEffects = [], Ee(this)
            }
            return hi(e, [{
                key: "supportsEffect",
                value: function(e) {
                    var t = this;
                    return !!e.supported && e.supportedScanners.some(function(e) {
                        return t._getScannerName(t._currentScanner) === e.displayName
                    })
                }
            }, {
                key: "getEffectByName",
                value: function(e) {
                    var t = this,
                        n = null;
                    return this._activeEffects.forEach(function(i) {
                        e === t._getEffectName(i) && (n = i)
                    }), n
                }
            }, {
                key: "activateEffect",
                value: function(e, t) {
                    var n = new e(this, t);
                    return n.activate(), this._activeEffects.push(n), n
                }
            }, {
                key: "deactivateEffect",
                value: function(e) {
                    var t = this;
                    this._activeEffects.some(function(n, i) {
                        return n.constructor === e && (n.deactivate(), t._activeEffects.splice(i, 1), !0)
                    })
                }
            }, {
                key: "deactivateEffects",
                value: function() {
                    var e = this;
                    this._activeEffects.forEach(function(t) {
                        return e.deactivateEffect(t.constructor)
                    })
                }
            }, {
                key: "play",
                value: function() {
                    if (!this._video || this._video.files.length < 1) throw new TelecineError("NoFiles", "There are no files to play.");
                    return this._currentScanner.play(), this._properties.paused = !1, this
                }
            }, {
                key: "pause",
                value: function() {
                    if (!this._video || this._video.files.length < 1) throw new TelecineError("NoFiles", "There are no files to play.");
                    return this._currentScanner.pause(), this._properties.paused = !0, this
                }
            }, {
                key: "showExternalDisplayPicker",
                value: function(e) {
                    return this._currentScanner.showExternalDisplayPicker(e)
                }
            }, {
                key: "supportsPresentationMode",
                value: function(e) {
                    return this.supportedPresentationModes.indexOf(e) !== -1
                }
            }, {
                key: "addCuePoint",
                value: function(e, t) {
                    return this._currentScanner.addCuePoint(e, t)
                }
            }, {
                key: "removeCuePoint",
                value: function(e) {
                    return this._currentScanner.removeCuePoint(e)
                }
            }, {
                key: "removeAllCuePoints",
                value: function() {
                    return this._currentScanner.removeAllCuePoints()
                }
            }, {
                key: "_findScanner",
                value: function() {
                    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.textTrackSupport, n = void 0 !== t && t, i = this._video.files.map(function(e) {
                            return e.mime
                        }), r = this._scanners, o = r, a = Array.isArray(o), s = 0, o = a ? o : o[ui.iterator]();;) {
                        var c;
                        if (a) {
                            if (s >= o.length) break;
                            c = o[s++]
                        } else {
                            if (s = o.next(), s.done) break;
                            c = s.value
                        }
                        var u = c;
                        if (u.supported && (!n || u.supportsTextTracks) && this._blacklistedScanners.indexOf(this._getScannerName(u)) === -1) {
                            var d = u.supportedVideoTypes;
                            if (d.some(function(e) {
                                    return i.indexOf(e) !== -1
                                })) return u
                        }
                    }
                    return n ? (this.fire("error", new TelecineError("TextTracksNotSupported", "None of the scanners support text tracks in this browser.")), this._blacklistedScanners = [], this._findScanner()) : null
                }
            }, {
                key: "_initScanner",
                value: function(e, t) {
                    var n = this;
                    if (this._currentScanner.constructor === e) return void(this._currentScanner.video !== t && (t.currentScanner = this._currentScanner, this._currentScanner.video = t));
                    this._currentScanner.deactivate();
                    var i = new e(this._element, this._options);
                    Fi.forEach(function(e) {
                        i.on(e, function(t) {
                            return n._handleEvent(e, t, i)
                        })
                    }), this._currentScanner = i, t.currentScanner = i, this._currentScanner.video = t, Object.keys(this._properties).forEach(function(e) {
                        return "paused" === e ? void(n._properties.paused === !1 && n._currentScanner.play()) : void(n._currentScanner[e] = n._properties[e])
                    }), this.fire("scannerchange", this._getScannerName(this._currentScanner))
                }
            }, {
                key: "_updateScanner",
                value: function() {
                    if (null !== this._video) {
                        var e = this._findScanner({
                            textTrackSupport: this._video.textTracks.length > 0
                        });
                        return e ? void this._initScanner(e, this._video) : void this.fire("error", new TelecineError("FilesNotPlayable", "None of the files could be played in this browser."))
                    }
                }
            }, {
                key: "_handleEvent",
                value: function(e, t, n) {
                    if (n === this._currentScanner) {
                        switch (e) {
                            case "error":
                                return void(t instanceof TelecineError && this.fire("error", t));
                            case "scannererror":
                                this.fire("error", new TelecineError("ScannerError", "The current scanner can no longer be used because " + t.reason)), this._blacklistedScanners.push(this._getScannerName(this._currentScanner)), this._updateScanner([]);
                                break;
                            case "fileerror":
                                this.fire("error", new TelecineError("FileError", "The current file can no longer be used because " + t.reason)), this._currentScanner._switchToNextFile();
                                break;
                            case "downloaderror":
                                this.fire("error", new TelecineError("DownloadError", t)), this._options.tests && this._options.tests.cdn_switching_v2.data.cdn_switching_v2 && this._currentScanner._switchToNextFile();
                                break;
                            case "emeunsupported":
                                this.fire("error", new TelecineError("DRMFailure", {
                                    text: null,
                                    code: "emeunsupported"
                                }));
                                break;
                            case "drmfailure":
                                this.fire("error", new TelecineError("DRMFailure", {
                                    text: null,
                                    code: null
                                }));
                                break;
                            case "drmauthfailure":
                                this.fire("error", new TelecineError("DRMFailure", {
                                    text: t.text,
                                    code: t.code
                                }));
                                break;
                            case "drmauthsuccess":
                                this.fire("drmauthsuccess");
                                break;
                            case "timeupdate":
                                this._properties.currentTime = this._currentScanner.currentTime;
                                break;
                            case "spatialunsupported":
                                this.getEffectByName("ThreeSixtyEffect").deactivate();
                                break;
                            case "ended":
                                this._properties.paused = !0
                        }
                        this._activeEffects.forEach(function(t) {
                            "function" == typeof t["on" + e] && t["on" + e]()
                        }), this.fire(e, t)
                    }
                }
            }, {
                key: "_getScannerName",
                value: function(e) {
                    return e instanceof Ci ? e.constructor.displayName : e.prototype.constructor.displayName
                }
            }, {
                key: "_getEffectName",
                value: function(e) {
                    return e instanceof wi ? e.constructor.displayName : e.prototype.constructor.displayName
                }
            }, {
                key: "supportsSettingVolume",
                get: function() {
                    return this._scanners.some(function(e) {
                        return e.supported && e.supportsSettingVolume
                    })
                }
            }, {
                key: "supportsTextTracks",
                get: function() {
                    return this._scanners.some(function(e) {
                        return e.supported && e.supportsTextTracks
                    })
                }
            }, {
                key: "activeEffects",
                get: function() {
                    return this._activeEffects
                }
            }, {
                key: "buffered",
                get: function() {
                    return this._currentScanner.buffered
                }
            }, {
                key: "cuePoints",
                get: function() {
                    return this._currentScanner.cuePoints
                }
            }, {
                key: "currentFile",
                get: function() {
                    return this._currentScanner.currentFile
                },
                set: function(e) {
                    if ("string" == typeof e && (e = this._files.filter(function(t) {
                            return t.id === e
                        })[0]), !e) throw new TelecineError("FileNotValid", "The file is not valid.");
                    this._currentScanner.currentFile = e
                }
            }, {
                key: "currentScanner",
                get: function() {
                    return this._getScannerName(this._currentScanner)
                }
            }, {
                key: "currentTime",
                get: function() {
                    return this._currentScanner.currentTime
                },
                set: function(e) {
                    this._properties.currentTime = e, this._currentScanner.currentTime = e
                }
            }, {
                key: "duration",
                get: function() {
                    return this._currentScanner.duration
                }
            }, {
                key: "ended",
                get: function() {
                    return this._currentScanner.ended
                }
            }, {
                key: "externalDisplayAvailable",
                get: function() {
                    return this._currentScanner.externalDisplayAvailable
                }
            }, {
                key: "externalDisplayActive",
                get: function() {
                    return this._currentScanner.externalDisplayActive
                }
            }, {
                key: "loop",
                get: function() {
                    return this._currentScanner.loop
                },
                set: function(e) {
                    this._properties.loop = e, this._currentScanner.loop = e
                }
            }, {
                key: "muted",
                get: function() {
                    return this._currentScanner.muted
                },
                set: function(e) {
                    this._properties.muted = !!e, this._currentScanner.muted = !!e
                }
            }, {
                key: "paused",
                get: function() {
                    return this._currentScanner.paused
                }
            }, {
                key: "playbackRate",
                get: function() {
                    return this._currentScanner.playbackRate
                },
                set: function(e) {
                    this._properties.playbackRate = e, this._currentScanner.playbackRate = e
                }
            }, {
                key: "preload",
                get: function() {
                    return this._currentScanner.preload
                },
                set: function(e) {
                    this._properties.preload = e, this._currentScanner.preload = e
                }
            }, {
                key: "presentationMode",
                get: function() {
                    return this._currentScanner.presentationMode
                },
                set: function(e) {
                    this._currentScanner.presentationMode = e
                }
            }, {
                key: "supportedPresentationModes",
                get: function() {
                    return this._currentScanner.supportedPresentationModes
                }
            }, {
                key: "video",
                get: function() {
                    return this._video
                },
                set: function(e) {
                    this._video && this._video.deactivate(), this._blacklistedScanners = [], this._video = new TelecineVideo(e), this._updateScanner()
                }
            }, {
                key: "videoWidth",
                get: function() {
                    return this._currentScanner.videoWidth
                }
            }, {
                key: "videoHeight",
                get: function() {
                    return this._currentScanner.videoHeight
                }
            }, {
                key: "volume",
                get: function() {
                    return this._currentScanner.volume
                },
                set: function(e) {
                    if (e < 0 || e > 1) throw new TelecineError("IndexSizeError", "Failed to set the 'volume' property: The volume provided (" + e + ") is outside of the range [0, 1].");
                    this._properties.volume = e, this._currentScanner.volume = e
                }
            }]), e
        }(),
        Cr = 300,
        Ar = 2,
        Or = 20,
        Mr = 85,
        Fr = 60,
        Ir = 500,
        qr = function(e) {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fi(this, t);
                var i = gi(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
                return i._activated = !1, i._camera = null, i._scene = null, i._renderer = null, i._animationFrame = null, i.isUserInteracting = !1, i._onMouseDownMouseX = 0, i._onMouseDownMouseY = 0, i._coordinates = {
                    lat: 0,
                    long: 0
                }, i._previousCoordinates = {
                    lat: 0,
                    long: 0
                }, i._onMouseDownCoordinates = {
                    lat: 0,
                    long: 0
                }, i._phi = 0, i._theta = 0, i._distance = Ir, i._video = i._telecine._currentScanner._video, i._rotation = 0, i._gyroVector = {
                    x: 0,
                    y: 0
                }, i._offset = {
                    lat: 0,
                    long: 0
                }, i._writeSpeeds = {
                    videoFps: i._options.fps,
                    motionRenderSpeed: Fr
                }, i._maxTimeBetweenWrites = 1e3 / i._writeSpeeds.videoFps, i._motionTimeouts = [], i._movingAutomatically = !1, i._deviceMotionHasOccurred = !1, i._updateFromGyroscopePending = !1, i._keysPressed = {
                    up: !1,
                    down: !1,
                    left: !1,
                    right: !1
                }, i
            }
            return mi(t, e), hi(t, [{
                key: "isUserInteracting",
                set: function(e) {
                    if (e !== this._isUserInteracting) return this._isUserInteracting = e, e ? void(this._options.isMobile || this._telecine.fire("motionstart")) : void(this._options.isMobile || this._telecine.fire("motionend"))
                },
                get: function() {
                    return this._isUserInteracting
                }
            }], [{
                key: "displayName",
                get: function() {
                    return "ThreeSixtyEffect"
                }
            }, {
                key: "supported",
                get: function() {
                    return !0
                }
            }, {
                key: "supportedScanners",
                get: function() {
                    return [$i, pr]
                }
            }]), hi(t, [{
                key: "activate",
                value: function() {
                    var e = this;
                    return new ut(function(t, n) {
                        if (window.THREE) return void t();
                        var i = document.createElement("script");
                        i.src = e._options.threeUrl, document.body.appendChild(i), i.onload = function() {
                            t()
                        }
                    }).then(function() {
                        return e._initialize()
                    })
                }
            }, {
                key: "_initialize",
                value: function() {
                    this._activated = !0, this._camera = new THREE.PerspectiveCamera(this._options.fieldOfView, this._video.clientWidth / this._video.clientHeight, 1, 2 * Ir), this._camera.target = new THREE.Vector3(0, 0, 0), this._initializeAutoMovement(this._options.directorTimeline), this._scene = new THREE.Scene;
                    var e = new THREE.SphereBufferGeometry(Ir, 120, 80);
                    e.scale(-1, 1, 1), this._texture = new THREE.VideoTexture(this._video), this._texture.minFilter = THREE.LinearFilter, this._texture.format = THREE.RGBFormat, "top-bottom" === this._options.stereoMode && (this._texture.offset.y = .5, this._texture.repeat.set(1, .5)), "left-right" === this._options.stereoMode && (this._texture.offset.x = .5, this._texture.repeat.set(.5, 1));
                    var t = new THREE.MeshBasicMaterial({
                            map: this._texture
                        }),
                        n = new THREE.Mesh(e, t);
                    this._scene.add(n);
                    try {
                        this._renderer = new THREE.WebGLRenderer
                    } catch (e) {
                        return void this._telecine._currentScanner.fire("spatialunsupported")
                    }
                    this._renderer.setPixelRatio(window.devicePixelRatio), this._output = document.createElement("div"), this._output.appendChild(this._renderer.domElement), this._element.appendChild(this._output), this._hideOutput(), this._telecine._currentScanner._video.setAttribute("crossorigin", "anonymous"), this._startRendering(), this._telecine._currentScanner.paused || this._showOutput()
                }
            }, {
                key: "onplay",
                value: function() {
                    this._activated && (this._showOutput(), this.adjustRenderSize())
                }
            }, {
                key: "deactivate",
                value: function() {
                    this._output && this._element.removeChild(this._output), this._stopRendering(), this._activated = !1
                }
            }, {
                key: "snapToCenter",
                value: function() {
                    var e = this;
                    this._motionTimeouts.forEach(function(e) {
                        return clearTimeout(e)
                    });
                    var t = 50,
                        n = this._coordinates.long >= 180 ? 360 : 0,
                        i = 0,
                        r = {
                            long: (n - this._coordinates.long) / 11,
                            lat: (i - this._coordinates.lat) / 11
                        };
                    this._rotation = 0;
                    for (var o = function(n) {
                            e._motionTimeouts.push(setTimeout(function() {
                                0 === n && (e._movingAutomatically = !0, e._options.isMobile || (e._maxTimeBetweenWrites = 1e3 / e._writeSpeeds.motionRenderSpeed)), n === t - 1 && (e._movingAutomatically = !1, e._options.isMobile || (e._maxTimeBetweenWrites = 1e3 / e._writeSpeeds.videoFps)), e._updateViewpoint(e._coordinates.lat + r.lat / Math.pow(1.1, n), e._coordinates.long + r.long / Math.pow(1.1, n)), e._offset.lat = THREE.Math.radToDeg(e._gyroVector.x) + e._coordinates.lat + r.lat / Math.pow(1.1, n), e._offset.long = THREE.Math.radToDeg(e._gyroVector.y) + e._coordinates.long + r.lat / Math.pow(1.1, n)
                            }, n * e._maxTimeBetweenWrites))
                        }, a = 0; a < t; a++) o(a)
                }
            }, {
                key: "activateStereoRendering",
                value: function() {
                    this._stereo || (this._stereo = new THREE.StereoCamera, this._stereo.aspect = .5, this._renderer.setSize(this._video.clientWidth, this._video.clientHeight), this.adjustRenderSize(), "mono" !== this._options.stereoMode && this._buildStereoAssets(), this._renderStereoScene())
                }
            }, {
                key: "deactivateStereoRendering",
                value: function() {
                    this._renderer.render(this._scene, this._camera), this._stereo = null, this.adjustRenderSize(), this._update()
                }
            }, {
                key: "toggleStereoRendering",
                value: function() {
                    return this._stereo ? void this.deactivateStereo() : void this.activateStereo()
                }
            }, {
                key: "isStereo",
                value: function() {
                    return !!this._stereo
                }
            }, {
                key: "_buildStereoAssets",
                value: function() {
                    this._stereoAssets = {
                        left: {
                            scene: new THREE.Scene,
                            geometry: new THREE.SphereBufferGeometry(Ir, 120, 80),
                            texture: new THREE.VideoTexture(this._video)
                        },
                        right: {
                            scene: new THREE.Scene,
                            geometry: new THREE.SphereBufferGeometry(Ir, 120, 80),
                            texture: new THREE.VideoTexture(this._video)
                        }
                    };
                    for (var e in this._stereoAssets) this._stereoAssets[e].texture.minFilter = THREE.LinearFilter, this._stereoAssets[e].texture.format = THREE.RGBFormat, this._stereoAssets[e].texture.offset.y = .5, this._stereoAssets[e].texture.repeat.set(1, .5), this._stereoAssets[e].material = new THREE.MeshBasicMaterial({
                        map: this._stereoAssets[e].texture
                    }), this._stereoAssets[e].mesh = new THREE.Mesh(this._stereoAssets[e].geometry, this._stereoAssets[e].material), this._stereoAssets[e].geometry.scale(-1, 1, 1), this._stereoAssets[e].scene.add(this._stereoAssets[e].mesh)
                }
            }, {
                key: "_initializeAutoMovement",
                value: function(e) {
                    e && e[0] && "undefined" != typeof e[0].p && "undefined" !== e[0].y && this._updateViewpoint(e[0].p, e[0].y)
                }
            }, {
                key: "_renderStereoScene",
                value: function() {
                    this._scene.updateMatrixWorld(), null === this._camera.parent && this._camera.updateMatrixWorld(), this._stereo.update(this._camera);
                    var e = this._renderer.getSize();
                    this._renderer.autoClear && this._renderer.clear(), this._renderer.setScissorTest(!0);
                    var t = this._stereoAssets ? {
                        right: this._stereoAssets.right.scene,
                        left: this._stereoAssets.left.scene
                    } : {
                        right: this._scene,
                        left: this._scene
                    };
                    this._renderer.setScissor(0, 0, e.width / 2, e.height), this._renderer.setViewport(0, 0, e.width / 2, e.height), this._renderer.render(t.right, this._stereo.cameraR), this._renderer.setScissor(e.width / 2, 0, e.width / 2, e.height), this._renderer.setViewport(e.width / 2, 0, e.width / 2, e.height), this._renderer.render(t.left, this._stereo.cameraL), this._renderer.setScissorTest(!1)
                }
            }, {
                key: "_updateViewpoint",
                value: function(e, t) {
                    e %= 360, this._coordinates.lat = Math.max(-Mr, Math.min(Mr, e)), t %= 360, t = t >= 0 ? t : 360 + t, this._coordinates.long = t
                }
            }, {
                key: "makeContact",
                value: function(e) {
                    this.isUserInteracting = !0, this._motionTimeouts.forEach(function(e) {
                        return clearTimeout(e)
                    }), this._movingAutomatically = !1, this._contactPoint = {
                        x: e.x,
                        y: e.y
                    }, this._onMouseDownCoordinates.long = this._coordinates.long, this._onMouseDownCoordinates.lat = this._coordinates.lat, this._motionStart = {
                        long: this._coordinates.long,
                        lat: this._coordinates.lat
                    }, this._options.isMobile || (this._maxTimeBetweenWrites = 1e3 / this._writeSpeeds.motionRenderSpeed)
                }
            }, {
                key: "move",
                value: function(e) {
                    this._previousCoordinates.long = this._coordinates.long, this._previousCoordinates.lat = this._coordinates.lat, this._offset.lat = THREE.Math.radToDeg(this._gyroVector.x) + this._previousCoordinates.lat, this._offset.long = THREE.Math.radToDeg(this._gyroVector.y) + this._previousCoordinates.long;
                    var t = this._motionStart.lat - .2 * (this._contactPoint.y - e.y),
                        n = .2 * (this._contactPoint.x - e.x) + this._motionStart.long;
                    this._updateViewpoint(t, n)
                }
            }, {
                key: "moveWheel",
                value: function(e) {
                    this._previousCoordinates.long = this._coordinates.long, this._previousCoordinates.lat = this._coordinates.lat, this._offset.lat = THREE.Math.radToDeg(this._gyroVector.x) + this._previousCoordinates.lat, this._offset.long = THREE.Math.radToDeg(this._gyroVector.y) + this._previousCoordinates.long;
                    var t = this._coordinates.lat - .1 * e.y,
                        n = this._coordinates.long + .1 * e.x;
                    this._updateViewpoint(t, n)
                }
            }, {
                key: "moveDevice",
                value: function(e, t, n, i) {
                    this._updateFromGyroscopePending = !0;
                    var r = new THREE.Quaternion,
                        o = window.orientation;
                    null === o && (o = this._video.clientWidth > this._video.clientHeight ? 90 : 0), e = e ? THREE.Math.degToRad(e) : 0, t = t ? THREE.Math.degToRad(t) : 0, n = n ? THREE.Math.degToRad(n) : 0;
                    var a = o ? THREE.Math.degToRad(o) : 0,
                        s = new THREE.Vector3(0, 0, 1),
                        c = new THREE.Euler,
                        u = new THREE.Quaternion,
                        d = new THREE.Quaternion(-Math.sqrt(.5), 0, 0, Math.sqrt(.5));
                    c.set(t, e, -n, "YXZ"), r.setFromEuler(c), r.multiply(d), r.multiply(u.setFromAxisAngle(s, -a)), this._gyroVector = (new THREE.Euler).setFromQuaternion(r, "YXZ"), this._rotation = this._gyroVector.z, this.isUserInteracting || this._movingAutomatically || this._updateViewpoint(THREE.Math.radToDeg(this._gyroVector.x) - this._offset.lat, -THREE.Math.radToDeg(this._gyroVector.y) + this._offset.long), this._deviceMotionHasOccurred || (this.snapToCenter(), this._telecine.fire("motionstart"), this._deviceMotionHasOccurred = !0)
                }
            }, {
                key: "releaseContact",
                value: function(e) {
                    if (this._offset.lat = THREE.Math.radToDeg(this._gyroVector.x) - this._coordinates.lat, this._offset.long = THREE.Math.radToDeg(this._gyroVector.y) + this._coordinates.long, this.isUserInteracting = !1, this._motionStart && !e) {
                        var t = Math.hypot(this._coordinates.long - this._motionStart.long, this._coordinates.lat - this._motionStart.lat);
                        this._moveDueToMomentum(t)
                    }
                }
            }, {
                key: "abandonMotion",
                value: function() {
                    this.isUserInteracting = !1, this._motionStart = null
                }
            }, {
                key: "keyPress",
                value: function(e) {
                    this._keyIsDown() || (this.isUserInteracting = !0), this._keysPressed[e] || (this._keysPressed[e] = !0)
                }
            }, {
                key: "keyUp",
                value: function(e) {
                    this._keysPressed[e] = !1, this._keyIsDown() || (this.isUserInteracting = !1), this._moveDueToMomentum(1 / 0)
                }
            }, {
                key: "_moveFromKeyPress",
                value: function() {
                    var e = this;
                    this._previousCoordinates.long = this._coordinates.long, this._previousCoordinates.lat = this._coordinates.lat, Object.keys(this._keysPressed).forEach(function(t) {
                        if (e._keysPressed[t]) switch (t) {
                            case "up":
                                e._updateViewpoint(e._coordinates.lat + Ar, e._coordinates.long);
                                break;
                            case "down":
                                e._updateViewpoint(e._coordinates.lat - Ar, e._coordinates.long);
                                break;
                            case "left":
                                e._updateViewpoint(e._coordinates.lat, e._coordinates.long - Ar);
                                break;
                            case "right":
                                e._updateViewpoint(e._coordinates.lat, e._coordinates.long + Ar)
                        }
                    })
                }
            }, {
                key: "_keyIsDown",
                value: function() {
                    var e = this;
                    return Object.keys(this._keysPressed).map(function(t) {
                        return e._keysPressed[t]
                    }).some(function(e) {
                        return e
                    })
                }
            }, {
                key: "_moveDueToMomentum",
                value: function(e) {
                    var t = this;
                    e >= Or && ! function() {
                        for (var e = {
                                long: t._coordinates.long - t._previousCoordinates.long,
                                lat: t._coordinates.lat - t._previousCoordinates.lat
                            }, n = function(n) {
                                t._motionTimeouts.push(setTimeout(function() {
                                    1 === n && (t._movingAutomatically = !0), n === Cr - 1 && (t._movingAutomatically = !1, t._maxTimeBetweenWrites = 1e3 / t._writeSpeeds.videoFps);
                                    var i = 2 / Math.pow(n, 1.5);
                                    t._offset.lat = THREE.Math.radToDeg(t._gyroVector.x) + t._coordinates.lat + e.lat, t._offset.long = THREE.Math.radToDeg(t._gyroVector.y) + t._coordinates.long + e.long, t._updateViewpoint(t._coordinates.lat + e.lat * i, t._coordinates.long + e.long * i)
                                }, n * t._maxTimeBetweenWrites))
                            }, i = 1; i < Cr; i++) n(i)
                    }()
                }
            }, {
                key: "onseeked",
                value: function() {
                    this._activated && this._update()
                }
            }, {
                key: "onresize",
                value: function() {
                    this.adjustRenderSize(), this.isUserInteracting = !1
                }
            }, {
                key: "_update",
                value: function() {
                    this._phi = THREE.Math.degToRad(90 + this._coordinates.lat), this._theta = THREE.Math.degToRad(this._coordinates.long), this._camera.position.x = this._distance * Math.sin(this._phi) * Math.cos(this._theta), this._camera.position.y = this._distance * Math.cos(this._phi), this._camera.position.z = this._distance * Math.sin(this._phi) * Math.sin(this._theta), this._camera.lookAt(this._camera.target), this._camera.rotation.z += this._rotation, this._stereo ? this._renderStereoScene() : this._renderer.render(this._scene, this._camera), this._telecine.fire("cameraupdate", {
                        lon: this._coordinates.long,
                        lat: this._coordinates.lat
                    })
                }
            }, {
                key: "adjustRenderSize",
                value: function() {
                    this._camera.aspect = Math.max(1 / 3, Math.min(3, this._video.clientWidth / this._video.clientHeight)), this._distance = Math.min(Ir / 2, this._options.dimensions.width / this._options.dimensions.height / this._camera.aspect * Ir / 2);
                    var e = De(this._video.clientWidth, this._video.clientHeight, this._camera.aspect, 1);
                    this._camera.aspect = e.width / e.height, this._camera.updateProjectionMatrix(), this._renderer.setSize(e.width, e.height), this._output.style.paddingTop = e.top + "px", this._renderer.render(this._scene, this._camera)
                }
            }, {
                key: "getRendererSize",
                value: function() {
                    return {
                        height: this._renderer.domElement.clientHeight,
                        width: this._renderer.domElement.clientWidth
                    }
                }
            }, {
                key: "_startRendering",
                value: function() {
                    var e = this;
                    this._interval && window.clearInterval(this._interval), this.adjustRenderSize();
                    var t = 1e3 / Fr;
                    this._interval = window.setInterval(function() {
                        e._renderFrame(), e._keyIsDown() && e._moveFromKeyPress()
                    }, t)
                }
            }, {
                key: "_stopRendering",
                value: function() {
                    this._interval && (window.clearInterval(this._interval), this._interval = null), this._motionTimeouts && this._motionTimeouts.forEach(function(e) {
                        return clearTimeout(e)
                    })
                }
            }, {
                key: "_renderFrame",
                value: function() {
                    this._requestRenderAnimationFrame()
                }
            }, {
                key: "_requestRenderAnimationFrame",
                value: function() {
                    var e = this;
                    this._animationFrame && window.cancelAnimationFrame(this._animationFrame);
                    var t = this._movingAutomatically || this.isUserInteracting || this._updateFromGyroscopePending || this._keyIsDown();
                    this._animationFrame = window.requestAnimationFrame(function() {
                        (!e._telecine._currentScanner.paused && !e._telecine._currentScanner._ranIntoBuffer || t) && (e._update(), e._updateFromGyroscopePending = !1)
                    })
                }
            }, {
                key: "_showOutput",
                value: function() {
                    this._styleOutput({
                        backgroundColor: "#000",
                        display: "block"
                    })
                }
            }, {
                key: "_hideOutput",
                value: function() {
                    this._styleOutput({
                        backgroundColor: "#000",
                        display: "none"
                    })
                }
            }, {
                key: "_styleOutput",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.backgroundColor,
                        n = e.display;
                    this._output.style.cssText = "position:absolute;left:0;top:0;margin-left:auto;margin-right:auto;padding:0;background:" + t + ";width:100%;height:100%;text-align:center;display:" + n
                }
            }, {
                key: "currentCoordinates",
                get: function() {
                    return this._coordinates
                },
                set: function(e) {
                    var t = _i(e, 2),
                        n = t[0],
                        i = t[1];
                    if (n > 90 || n < -90) throw new RangeError("Latitude should be a float between -90 and 90.");
                    if (i < 0 || i > 360) throw new RangeError("Longitude should be a float between 0 and 360.");
                    this._updateViewpoint(n, i), this._update()
                }
            }, {
                key: "fieldOfView",
                get: function() {
                    return this._camera.fov
                },
                set: function(e) {
                    this._camera.fov = e, this._camera.updateProjectionMatrix(), this._renderer.render(this._scene, this._camera)
                }
            }], [{
                key: "frustumSurfaceArea",
                value: function(e, t, n) {
                    var i = 2 * Ir * 2 * Math.sin(Math.PI / 180 * (e / 2)),
                        r = i * t / n,
                        o = i * r,
                        a = 4 * Math.PI * Math.pow(Ir, 2),
                        s = o / a;
                    return s
                }
            }]), t
        }(wi),
        Rr = function() {
            function e(t, n) {
                var i = this,
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                yt(this, e), Z(this), this.version = r, this.visible = !1;
                var o = this._wrap = document.createElement("div");
                o.classList.add("compass-wrapper"), o.innerHTML = At.render("compass", {
                    version: r
                }), o.classList.add("cloaked"), t.appendChild(o), n && o.addEventListener("click", n), this._layerSlice = o.querySelector(".compass-slice"), this._lineSlice = o.querySelector(".compass-line");
                var a = function() {
                        i._mouseIn = !0
                    },
                    s = function(e) {
                        return function() {
                            setTimeout(function() {
                                i._mouseIn || (i.fade(), i._mouseIn = !1)
                            }, e)
                        }
                    };
                kt(this._wrap).on("mousein", a).on("pointerin", a).on("mouseout", s(1e3)).on("pointerout", s(1e3)), s(2e3)()
            }
            return _t(e, [{
                key: "setAngle",
                value: function(e, t) {
                    var n = this;
                    this._animationFrame && window.cancelAnimationFrame(this._animationFrame);
                    var i = 0;
                    1 === this.version ? i = -45 : 2 === this.version && (i = -30);
                    var r = "" + (i + t),
                        o = (e + 85) / 170,
                        a = 18;
                    this._animationFrame = window.requestAnimationFrame(function() {
                        n._layerSlice.setAttribute("transform", "rotate(" + r + ", " + a + ", " + a + ")"), n._lineSlice && n._lineSlice.setAttribute("d", n._getLinePath(o, a))
                    })
                }
            }, {
                key: "_getLinePath",
                value: function(e, t) {
                    var n = 5,
                        i = 2 * t - Math.round(2 * t * e),
                        r = 2 * Math.sqrt(2 * i * t - Math.pow(i, 2)),
                        o = (2 * t - r) / 2,
                        a = o + n,
                        s = 2 * t - o - n;
                    return "M" + a + "," + i + " L" + s + "," + i + " z"
                }
            }, {
                key: "reveal",
                value: function() {
                    var e = this;
                    this._wrap.classList.remove("cloaked"), window.requestAnimationFrame(function() {
                        e._wrap.classList.add("in")
                    }), this.visible = !0
                }
            }, {
                key: "fade",
                value: function() {
                    this._wrap.classList.add("fade"), this.visible = !0
                }
            }, {
                key: "hide",
                value: function() {
                    var e = this;
                    this._wrap.classList.remove("in"), this._wrap.classList.remove("fade"), this._wrap.classList.add("leaving");
                    var t = function t() {
                        "opacity" === event.propertyName && (e._wrap.classList.remove("leaving"), e._wrap.classList.add("cloaked"), e.visible = !1), kt(e._wrap).off("transitionend", t)
                    };
                    kt(this._wrap).on("transitionend", t)
                }
            }, {
                key: "updatePosition",
                value: function(e) {
                    if (e) {
                        var t = o(e),
                            n = 265,
                            i = 336;
                        if (t.height < n) return this._wrap.classList.remove("align-bottom"), void this._wrap.classList.add("hidden");
                        if (t.height < i) return this._wrap.classList.remove("hidden"), void this._wrap.classList.add("align-bottom");
                        this._wrap.classList.remove("hidden"), this._wrap.classList.remove("align-bottom")
                    }
                }
            }, {
                key: "getWrapper",
                value: function() {
                    return this._wrap
                }
            }]), e
        }(),
        Br = 55,
        Dr = 45,
        Nr = .05,
        jr = {
            16: "shift",
            27: "esc",
            32: "space",
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        },
        Vr = "Uh Oh!,D’Oh!,Aw fiddlesticks!,Jeepers!,Oh dear!,Ouch!,Zoinks!,Awww, snap!,Blast!,Curses!,ACK!,Aw shucks.,Major bummer.,Dag-nab-it!,Aargh!,Boo-hoo!,¡Ay caramba!".split(","),
        Hr = [".title a"],
        Ur = [".title a:hover"],
        zr = ["a", ".button-link", ".overlay-wrapper .footnote.share a:hover", ".title h1", ".title span.user", ".outro .video-section > div > h1 a:hover", ".outro .videos h1", ".outro .videos h2", ".menu li:hover", ".menu li.active"],
        Wr = ["a:hover", ".button-link:hover"],
        Xr = [".overlay-wrapper .close:hover .fill", ".overlay-wrapper .back:hover .fill", ".stats-debug-close:hover .fill", ".stats-debug-copy:hover"],
        Kr = [".play-bar .on .fill", ".play-bar a:hover .fill", ".play-bar button:not(.toggle):hover .fill", ".tiny-bars .fill", ".sidedock .on .fill"],
        $r = [".sidedock .on:hover .fill"],
        Yr = [".play-bar .on .stroke", ".sidedock .on .stroke"],
        Gr = [".sidedock .on:hover .stroke"],
        Qr = [".sidedock button:hover", "&.touch-support .sidedock button:active", ".controls .play:hover", ".controls .play-bar .played", "&.no-playbar .play-bar button:not(.toggle):hover", ".controls.tiny .play-bar button:not(.toggle):hover", ".controls .volume div", ".overlay .buttons li", ".overlay .window-wrapper button", '.overlay .window-wrapper input[type="submit"]', '.overlay .window-wrapper a[role="button"]', ".overlay .embed-copy", ".overlay .email-capture-confirm .check-icon-wrapper", '.outro a[role="button"]', ".outro .videos li:hover img", ".outro .videos li a:focus img", ".outro .vod li", ".menu li.active:before"],
        Jr = [".outro .videos li:hover img", ".outro .videos li a:focus img", ".menu li.active:before"],
        Zr = [".overlay-wrapper .overlay .buttons li a", ".overlay-wrapper .overlay button.embed-copy", ".overlay-wrapper .footnote.share a:hover", ".overlay .window-wrapper button", '.overlay .window-wrapper input[type="submit"]', '.overlay .window-wrapper a[role="button"]', ".outro .vod-header a:hover", '.outro .vod-wrapper a[role="button"]', '.outro-wrapper .outro-inner a[role="button"]', ".sidedock button:hover", ".sidedock button:hover .vod-label", ".play:hover"],
        eo = [".controls .play:hover .fill", ".sidedock button:hover .fill", ".play-bar a:hover .fill", ".play-bar button:not(.toggle):hover .fill", "&.no-playbar .play-bar button:not(.toggle):hover .fill", ".controls.tiny .play-bar button:not(.toggle):hover .fill", ".sidedock .on .fill", '.overlay .share-wrapper a[role="button"] .fill', ".overlay .email-capture-confirm .check-icon .fill", '.outro .vod-wrapper a[role="button"] .fill'],
        to = [".controls .play:hover .stroke", ".sidedock button:hover .stroke", ".sidedock .on .stroke"],
        no = ['.overlay-wrapper .overlay a[role="button"]', ".overlay-wrapper .overlay button.embed-copy", ".sidedock button:hover", ".play:hover", '.outro a[role="button"]'],
        io = [".controls .play:hover .fill", ".sidedock button:hover .fill", ".controls .play-bar .fullscreen.tiny:hover .fill"],
        ro = [".sidedock button:hover .stroke"],
        oo = [".menu li:active:before"],
        ao = ['.overlay .window-wrapper input[type="submit"]:active', ".overlay .embed-copy.zeroclipboard-is-active", '.overlay a[role="button"]:active', ".outro .vod-watch-button:active", ".sidedock button:active"];
    return window.BigScreen = Ot, st
}();