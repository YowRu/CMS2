/*
 Highcharts JS v6.1.4 (2018-09-25)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (T, K) {
    "object" === typeof module && module.exports ? module.exports = T.document ? K(T) : K : "function" === typeof define && define.amd ? define(function () {
        return K(T)
    }) : T.Highcharts = K(T)
})("undefined" !== typeof window ? window : this, function (T) {
    var K = function () {
        var a = "undefined" === typeof T ? window : T
            , C = a.document
            , E = a.navigator && a.navigator.userAgent || ""
            , F = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
            , m = /(edge|msie|trident)/i.test(E) && !a.opera
            , h = -1 !== E.indexOf("Firefox")
            , e = -1 !== E.indexOf("Chrome")
            , t = h && 4 > parseInt(E.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts"
            , version: "6.1.4"
            , deg2rad: 2 * Math.PI / 360
            , doc: C
            , hasBidiBug: t
            , hasTouch: C && void 0 !== C.documentElement.ontouchstart
            , isMS: m
            , isWebKit: -1 !== E.indexOf("AppleWebKit")
            , isFirefox: h
            , isChrome: e
            , isSafari: !e && -1 !== E.indexOf("Safari")
            , isTouchDevice: /(Mobile|Android|Windows Phone)/.test(E)
            , SVG_NS: "http://www.w3.org/2000/svg"
            , chartCount: 0
            , seriesTypes: {}
            , symbolSizes: {}
            , svg: F
            , win: a
            , marginNames: ["plotTop"
, "marginRight", "marginBottom", "plotLeft"]
            , noop: function () {}
            , charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var C = a.charts
            , E = a.doc
            , F = a.win;
        a.error = function (m, h) {
            m = a.isNumber(m) ? "Highcharts error #" + m + ": www.highcharts.com/errors/" + m : m;
            if (h) throw Error(m);
            F.console && console.log(m)
        };
        a.Fx = function (a, h, e) {
            this.options = h;
            this.elem = a;
            this.prop = e
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0]
                    , h = this.paths[1]
                    , e = []
                    , t = this.now
                    , x = a.length
                    , p;
                if (1 === t) e = this.toD;
                else if (x === h.length && 1 > t)
                    for (; x--;) p = parseFloat(a[x])
                        , e[x] = isNaN(p) ? h[x] : t * parseFloat(h[x] - p) + p;
                else e = h;
                this.elem.attr("d", e, null, !0)
            }
            , update: function () {
                var a = this.elem
                    , h = this.prop
                    , e = this.now
                    , t = this.options.step;
                if (this[h + "Setter"]) this[h + "Setter"]();
                else a.attr ? a.element && a.attr(h, e, null, !0) : a.style[h] = e + this.unit;
                t && t.call(a, e, this)
            }
            , run: function (m, h, e) {
                var t = this
                    , x = t.options
                    , p = function (a) {
                        return p.stopped ? !1 : t.step(a)
                    }
                    , u = F.requestAnimationFrame || function (a) {
                        setTimeout(a, 13)
                    }
                    , f = function () {
                        for (var c = 0; c < a.timers.length; c++) a.timers[c]() || a.timers.splice(c--, 1);
                        a.timers.length && u(f)
                    };
                m !== h || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = m, this.end = h, this.unit = e, this.now = this.start, this.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === a.timers.push(p) && u(f)) : (delete x.curAnim[this.prop], x.complete && 0 === a.keys(x.curAnim).length && x.complete.call(this.elem))
            }
            , step: function (m) {
                var h = +new Date
                    , e, t = this.options
                    , x = this.elem
                    , p = t.complete
                    , u = t.duration
                    , f = t.curAnim;
                x.attr && !x.element ? m = !1 : m || h >= u + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), e = f[this.prop] = !0, a.objectEach(f, function (a) {
                    !0 !== a && (e = !1)
                }), e && p && p.call(x), m = !1) : (this.pos = t.easing((h - this.startTime) / u), this.now = this.start + (this.end - this.start) * this.pos, this.update(), m = !0);
                return m
            }
            , initPath: function (m, h, e) {
                function t(a) {
                    var d, l;
                    for (b = a.length; b--;) d = "M" === a[b] || "L" === a[b], l = /[a-zA-Z]/.test(a[b + 3]), d && l && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2])
                }

                function x(a, d) {
                    for (; a.length < l;) {
                        a[0] = d[l - a.length];
                        var c = a.slice(0, r);
                        [].splice.apply(a, [0, 0].concat(c));
                        v && (c = a.slice(a.length - r), [].splice.apply(a, [a.length, 0].concat(c)), b--)
                    }
                    a[0] = "M"
                }

                function p(a, b) {
                    for (var c = (l - a.length) / r; 0 < c && c--;) d = a.slice().splice(a.length / q - r, r * q), d[0] = b[l - r - c * r], k && (d[r - 6] = d[r - 2], d[r - 5] = d[r - 1]), [].splice.apply(a, [a.length / q, 0].concat(d)), v && c--
                }
                h = h || "";
                var u, f = m.startX
                    , c = m.endX
                    , k = -1 < h.indexOf("C")
                    , r = k ? 7 : 3
                    , l, d, b;
                h = h.split(" ");
                e = e.slice();
                var v = m.isArea
                    , q = v ? 2 : 1
                    , I;
                k && (t(h), t(e));
                if (f && c) {
                    for (b = 0; b < f.length; b++)
                        if (f[b] === c[0]) {
                            u = b;
                            break
                        }
                        else if (f[0] === c[c.length - f.length + b]) {
                        u = b;
                        I = !0;
                        break
                    }
                    void 0 === u && (h = [])
                }
                h.length && a.isNumber(u) && (l = e.length + u * q * r, I ? (x(h, e), p(e, h)) : (x(e, h), p(h, e)));
                return [h, e]
            }
            , fillSetter: function () {
                a.Fx.prototype.strokeSetter.apply(this, arguments)
            }
            , strokeSetter: function () {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            }
        };
        a.merge = function () {
            var m, h = arguments
                , e, t = {}
                , x = function (e, m) {
                    "object" !== typeof e && (e = {});
                    a.objectEach(m, function (f, c) {
                        !a.isObject(f, !0) || a.isClass(f) || a.isDOMElement(f) ? e[c] = m[c] : e[c] = x(e[c] || {}, f)
                    });
                    return e
                };
            !0 === h[0] && (t = h[1], h = Array.prototype.slice.call(h, 2));
            e = h.length;
            for (m = 0; m < e; m++) t = x(t, h[m]);
            return t
        };
        a.pInt = function (a, h) {
            return parseInt(a, h || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (m, h) {
            return !!m && "object" === typeof m && (!h || !a.isArray(m))
        };
        a.isDOMElement = function (m) {
            return a.isObject(m) && "number" === typeof m.nodeType
        };
        a.isClass = function (m) {
            var h = m && m.constructor;
            return !(!a.isObject(m, !0) || a.isDOMElement(m) || !h || !h.name || "Object" === h.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function (a, h) {
            for (var e = a.length; e--;)
                if (a[e] === h) {
                    a.splice(e, 1);
                    break
                }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (m, h, e) {
            var t;
            a.isString(h) ? a.defined(e) ? m.setAttribute(h, e) : m && m.getAttribute && ((t = m.getAttribute(h)) || "class" !== h || (t = m.getAttribute(h + "Name"))) : a.defined(h) && a.isObject(h) && a.objectEach(h, function (a, e) {
                m.setAttribute(e, a)
            });
            return t
        };
        a.splat = function (m) {
            return a.isArray(m) ? m : [m]
        };
        a.syncTimeout = function (a, h, e) {
            if (h) return setTimeout(a, h, e);
            a.call(0, e)
        };
        a.clearTimeout = function (m) {
            a.defined(m) && clearTimeout(m)
        };
        a.extend = function (a, h) {
            var e;
            a || (a = {});
            for (e in h) a[e] = h[e];
            return a
        };
        a.pick = function () {
            var a = arguments
                , h, e, t = a.length;
            for (h = 0; h < t; h++)
                if (e = a[h], void 0 !== e && null !== e) return e
        };
        a.css = function (m, h) {
            a.isMS && !a.svg && h && void 0 !== h.opacity && (h.filter = "alpha(opacity\x3d" + 100 * h.opacity + ")");
            a.extend(m.style, h)
        };
        a.createElement = function (m, h, e, t, x) {
            m = E.createElement(m);
            var p = a.css;
            h && a.extend(m, h);
            x && p(m, {
                padding: 0
                , border: "none"
                , margin: 0
            });
            e && p(m, e);
            t && t.appendChild(m);
            return m
        };
        a.extendClass = function (m, h) {
            var e = function () {};
            e.prototype = new m;
            a.extend(e.prototype, h);
            return e
        };
        a.pad = function (a, h, e) {
            return Array((h || 2) + 1 - String(a).replace("-", "").length).join(e || 0) + a
        };
        a.relativeLength = function (a, h, e) {
            return /%$/.test(a) ? h * parseFloat(a) / 100 + (e || 0) : parseFloat(a)
        };
        a.wrap = function (a, h, e) {
            var m = a[h];
            a[h] = function () {
                var a = Array.prototype.slice.call(arguments)
                    , p = arguments
                    , u = this;
                u.proceed = function () {
                    m.apply(u, arguments.length ? arguments : p)
                };
                a.unshift(m);
                a = e.apply(this, a);
                u.proceed = null;
                return a
            }
        };
        a.formatSingle = function (m, h, e) {
            var t = /\.([0-9])/
                , x = a.defaultOptions.lang;
            /f$/.test(m) ? (e = (e = m.match(t)) ? e[1] : -1, null !== h && (h = a.numberFormat(h, e, x.decimalPoint, -1 < m.indexOf(",") ? x.thousandsSep : ""))) : h = (e || a.time).dateFormat(m, h);
            return h
        };
        a.format = function (m, h, e) {
            for (var t = "{"
                    , x = !1, p, u, f, c, k = [], r; m;) {
                t = m.indexOf(t);
                if (-1 === t) break;
                p = m.slice(0, t);
                if (x) {
                    p = p.split(":");
                    u = p.shift().split(".");
                    c = u.length;
                    r = h;
                    for (f = 0; f < c; f++) r && (r = r[u[f]]);
                    p.length && (r = a.formatSingle(p.join(":"), r, e));
                    k.push(r)
                }
                else k.push(p);
                m = m.slice(t + 1);
                t = (x = !x) ? "}" : "{"
            }
            k.push(m);
            return k.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (m, h, e, t, x) {
            var p, u = m;
            e = a.pick(e, 1);
            p = m / e;
            h || (h = x ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === e ? h = a.grep(h, function (a) {
                return 0 === a % 1
            }) : .1 >= e && (h = [1 / e])));
            for (t = 0; t < h.length && !(u = h[t], x && u * e >= m || !x && p <= (h[t] + (h[t + 1] || h[t])) / 2); t++);
            return u = a.correctFloat(u * e, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, h) {
            var e = a.length
                , m, x;
            for (x = 0; x < e; x++) a[x].safeI = x;
            a.sort(function (a, e) {
                m = h(a, e);
                return 0 === m ? a.safeI - e.safeI : m
            });
            for (x = 0; x < e; x++) delete a[x].safeI
        };
        a.arrayMin = function (a) {
            for (var h = a.length, e = a[0]; h--;) a[h] < e && (e = a[h]);
            return e
        };
        a.arrayMax = function (a) {
            for (var h = a.length, e = a[0]; h--;) a[h] > e && (e = a[h]);
            return e
        };
        a.destroyObjectProperties = function (m, h) {
            a.objectEach(m, function (a, t) {
                a && a !== h && a.destroy && a.destroy();
                delete m[t]
            })
        };
        a.discardElement = function (m) {
            var h = a.garbageBin;
            h || (h = a.createElement("div"));
            m && h.appendChild(m);
            h.innerHTML = ""
        };
        a.correctFloat = function (a, h) {
            return parseFloat(a.toPrecision(h || 14))
        };
        a.setAnimation = function (m, h) {
            h.renderer.globalAnimation = a.pick(m, h.options.chart.animation, !0)
        };
        a.animObject = function (m) {
            return a.isObject(m) ? a.merge(m) : {
                duration: m ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1
            , second: 1E3
            , minute: 6E4
            , hour: 36E5
            , day: 864E5
            , week: 6048E5
            , month: 24192E5
            , year: 314496E5
        };
        a.numberFormat = function (m, h, e, t) {
            m = +m || 0;
            h = +h;
            var x = a.defaultOptions.lang
                , p = (m.toString().split(".")[1] || "").split("e")[0].length
                , u, f, c = m.toString().split("e"); - 1 === h ? h = Math.min(p, 20) : a.isNumber(h) ? h && c[1] && 0 > c[1] && (u = h + +c[1], 0 <= u ? (c[0] = (+c[0]).toExponential(u).split("e")[0], h = u) : (c[0] = c[0].split(".")[0] || 0, m = 20 > h ? (c[0] * Math.pow(10, c[1])).toFixed(h) : 0, c[1] = 0)) : h = 2;
            f = (Math.abs(c[1] ? c[0] : m) + Math.pow(10, -Math.max(h, p) - 1)).toFixed(h);
            p = String(a.pInt(f));
            u = 3 < p.length ? p.length % 3 : 0;
            e = a.pick(e, x.decimalPoint);
            t = a.pick(t, x.thousandsSep);
            m = (0 > m ? "-" : "") + (u ? p.substr(0, u) + t : "");
            m += p.substr(u).replace(/(\d{3})(?=\d)/g, "$1" + t);
            h && (m += e + f.slice(-h));
            c[1] && 0 !== +m && (m += "e" + c[1]);
            return m
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (m, h, e) {
            if ("width" === h) return Math.max(0, Math.min(m.offsetWidth, m.scrollWidth) - a.getStyle(m, "padding-left") - a.getStyle(m, "padding-right"));
            if ("height" === h) return Math.max(0, Math.min(m.offsetHeight, m.scrollHeight) - a.getStyle(m, "padding-top") - a.getStyle(m, "padding-bottom"));
            F.getComputedStyle || a.error(27, !0);
            if (m = F.getComputedStyle(m, void 0)) m = m.getPropertyValue(h), a.pick(e, "opacity" !== h) && (m = a.pInt(m));
            return m
        };
        a.inArray = function (m, h, e) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(h, m, e)
        };
        a.grep = function (m, h) {
            return (a.filterPolyfill || Array.prototype.filter).call(m, h)
        };
        a.find = Array.prototype.find ? function (a, h) {
            return a.find(h)
        } : function (a, h) {
            var e, t = a.length;
            for (e = 0; e < t; e++)
                if (h(a[e], e)) return a[e]
        };
        a.some = function (m, h, e) {
            return (a.somePolyfill || Array.prototype.some).call(m, h, e)
        };
        a.map = function (a, h) {
            for (var e = [], t = 0, x = a.length; t < x; t++) e[t] = h.call(a[t], a[t], t, a);
            return e
        };
        a.keys = function (m) {
            return (a.keysPolyfill || Object.keys).call(void 0, m)
        };
        a.reduce = function (m, h, e) {
            return (a.reducePolyfill || Array.prototype.reduce).apply(m, 2 < arguments.length ? [h, e] : [h])
        };
        a.offset = function (a) {
            var h = E.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                top: 0
                , left: 0
            };
            return {
                top: a.top + (F.pageYOffset || h.scrollTop) - (h.clientTop || 0)
                , left: a.left + (F.pageXOffset || h.scrollLeft) - (h.clientLeft || 0)
            }
        };
        a.stop = function (m, h) {
            for (var e = a.timers.length; e--;) a.timers[e].elem !== m || h && h !== a.timers[e].prop || (a.timers[e].stopped = !0)
        };
        a.each = function (m, h, e) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(m, h, e)
        };
        a.objectEach = function (a, h, e) {
            for (var t in a) a.hasOwnProperty(t) && h.call(e || a[t], a[t], t, a)
        };
        a.addEvent = function (m, h, e, t) {
            var x, p = m.addEventListener || a.addEventListenerPolyfill;
            x = "function" === typeof m && m.prototype ? m.prototype.protoEvents = m.prototype.protoEvents || {} : m.hcEvents = m.hcEvents || {};
            a.Point && m instanceof a.Point && m.series && m.series.chart && (m.series.chart.runTrackerClick = !0);
            p && p.call(m, h, e, !1);
            x[h] || (x[h] = []);
            x[h].push(e);
            t && a.isNumber(t.order) && (e.order = t.order, x[h].sort(function (a, f) {
                return a.order - f.order
            }));
            return function () {
                a.removeEvent(m, h, e)
            }
        };
        a.removeEvent = function (m, h, e) {
            function t(f, c) {
                var k = m.removeEventListener || a.removeEventListenerPolyfill;
                k && k.call(m, f, c, !1)
            }

            function x(f) {
                var c, k;
                m.nodeName && (h ? (c = {}, c[h] = !0) : c = f, a.objectEach(c, function (a, c) {
                    if (f[c])
                        for (k = f[c].length; k--;) t(c, f[c][k])
                }))
            }
            var p, u;
            a.each(["protoEvents", "hcEvents"], function (f) {
                var c = m[f];
                c && (h ? (p = c[h] || [], e ? (u = a.inArray(e, p), -1 < u && (p.splice(u, 1), c[h] = p), t(h, e)) : (x(c), c[h] = [])) : (x(c), m[f] = {}))
            })
        };
        a.fireEvent = function (m, h, e, t) {
            var x, p, u, f, c;
            e = e || {};
            E.createEvent && (m.dispatchEvent || m.fireEvent) ? (x = E.createEvent("Events"), x.initEvent(h, !0, !0), a.extend(x, e), m.dispatchEvent ? m.dispatchEvent(x) : m.fireEvent(h, x)) : a.each(["protoEvents", "hcEvents"], function (k) {
                if (m[k])
                    for (p = m[k][h] || [], u = p.length, e.target || a.extend(e, {
                            preventDefault: function () {
                                e.defaultPrevented = !0
                            }
                            , target: m
                            , type: h
                        }), f = 0; f < u; f++)(c = p[f]) && !1 === c.call(m, e) && e.preventDefault()
            });
            t && !e.defaultPrevented && t.call(m, e)
        };
        a.animate = function (m, h, e) {
            var t, x = ""
                , p, u, f;
            a.isObject(e) || (f = arguments, e = {
                duration: f[2]
                , easing: f[3]
                , complete: f[4]
            });
            a.isNumber(e.duration) || (e.duration = 400);
            e.easing = "function" === typeof e.easing ? e.easing : Math[e.easing] || Math.easeInOutSine;
            e.curAnim = a.merge(h);
            a.objectEach(h, function (c, f) {
                a.stop(m, f);
                u = new a.Fx(m, e, f);
                p = null;
                "d" === f ? (u.paths = u.initPath(m, m.d, h.d), u.toD = h.d, t = 0, p = 1) : m.attr ? t = m.attr(f) : (t = parseFloat(a.getStyle(m, f)) || 0, "opacity" !== f && (x = "px"));
                p || (p = c);
                p && p.match && p.match("px") && (p = p.replace(/px/g, ""));
                u.run(t, p, x)
            })
        };
        a.seriesType = function (m, h, e, t, x) {
            var p = a.getOptions()
                , u = a.seriesTypes;
            p.plotOptions[m] = a.merge(p.plotOptions[h], e);
            u[m] = a.extendClass(u[h] || function () {}, t);
            u[m].prototype.type = m;
            x && (u[m].prototype.pointClass = a.extendClass(a.Point, x));
            return u[m]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9)
                , h = 0;
            return function () {
                return "highcharts-" + a + "-" + h++
            }
        }();
        F.jQuery && (F.jQuery.fn.highcharts = function () {
            var m = [].slice.call(arguments);
            if (this[0]) return m[0] ? (new(a[a.isString(m[0]) ? m.shift() : "Chart"])(this[0], m[0], m[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        })
    })(K);
    (function (a) {
        var C = a.each
            , E = a.isNumber
            , F = a.map
            , m = a.merge
            , h = a.pInt;
        a.Color = function (e) {
            if (!(this instanceof a.Color)) return new a.Color(e);
            this.init(e)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/
                , parse: function (a) {
                    return [h(a[1]), h(a[2]), h(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/
                , parse: function (a) {
                    return [h(a[1]), h(a[2]), h(a[3]), 1]
                }
            }]
            , names: {
                white: "#ffffff"
                , black: "#000000"
            }
            , init: function (e) {
                var h
                    , x, p, u;
                if ((this.input = e = this.names[e && e.toLowerCase ? e.toLowerCase() : ""] || e) && e.stops) this.stops = F(e.stops, function (f) {
                    return new a.Color(f[1])
                });
                else if (e && e.charAt && "#" === e.charAt() && (h = e.length, e = parseInt(e.substr(1), 16), 7 === h ? x = [(e & 16711680) >> 16, (e & 65280) >> 8, e & 255, 1] : 4 === h && (x = [(e & 3840) >> 4 | (e & 3840) >> 8, (e & 240) >> 4 | e & 240, (e & 15) << 4 | e & 15, 1])), !x)
                    for (p = this.parsers.length; p-- && !x;) u = this.parsers[p], (h = u.regex.exec(e)) && (x = u.parse(h));
                this.rgba = x || []
            }
            , get: function (a) {
                var e = this.input
                    , h = this.rgba
                    , p;
                this.stops ? (p = m(e), p.stops = [].concat(p.stops), C(this.stops, function (e, f) {
                    p.stops[f] = [p.stops[f][0], e.get(a)]
                })) : p = h && E(h[0]) ? "rgb" === a || !a && 1 === h[3] ? "rgb(" + h[0] + "," + h[1] + "," + h[2] + ")" : "a" === a ? h[3] : "rgba(" + h.join(",") + ")" : e;
                return p
            }
            , brighten: function (a) {
                var e, x = this.rgba;
                if (this.stops) C(this.stops, function (e) {
                    e.brighten(a)
                });
                else if (E(a) && 0 !== a)
                    for (e = 0; 3 > e; e++) x[e] += h(255 * a), 0 > x[e] && (x[e] = 0), 255 < x[e] && (x[e] = 255);
                return this
            }
            , setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }
            , tweenTo: function (a, h) {
                var e = this.rgba
                    , p = a.rgba;
                p.length && e && e.length ? (a = 1 !== p[3] || 1 !== e[3], h = (a ? "rgba(" : "rgb(") + Math.round(p[0] + (e[0] - p[0]) * (1 - h)) + "," + Math.round(p[1] + (e[1] - p[1]) * (1 - h)) + "," + Math.round(p[2] + (e[2] - p[2]) * (1 - h)) + (a ? "," + (p[3] + (e[3] - p[3]) * (1 - h)) : "") + ")") : h = a.input || "none";
                return h
            }
        };
        a.color = function (e) {
            return new a.Color(e)
        }
    })(K);
    (function (a) {
        var C, E, F = a.addEvent
            , m = a.animate
            , h = a.attr
            , e = a.charts
            , t = a.color
            , x = a.css
            , p = a.createElement
            , u = a.defined
            , f = a.deg2rad
            , c = a.destroyObjectProperties
            , k = a.doc
            , r = a.each
            , l = a.extend
            , d = a.erase
            , b = a.grep
            , v = a.hasTouch
            , q = a.inArray
            , I = a.isArray
            , w = a.isFirefox
            , L = a.isMS
            , B = a.isObject
            , H = a.isString
            , n = a.isWebKit
            , D = a.merge
            , A = a.noop
            , M = a.objectEach
            , G = a.pick
            , g = a.pInt
            , y = a.removeEvent
            , Q = a.stop
            , N = a.svg
            , J = a.SVG_NS
            , P = a.symbolSizes
            , O = a.win;
        C = a.SVGElement = function () {
            return this
        };
        l(C.prototype, {
            opacity: 1
            , SVG_NS: J
            , textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" ")
            , init: function (a, g) {
                this.element = "span" === g ? p(g) : k.createElementNS(this.SVG_NS, g);
                this.renderer = a
            }
            , animate: function (z, g, b) {
                g = a.animObject(G(g, this.renderer.globalAnimation, !0));
                0 !== g.duration ? (b && (g.complete = b), m(this, z, g)) : (this.attr(z, null, b), g.step && g.step.call(this));
                return this
            }
            , complexColor: function (z, g, b) {
                var y = this.renderer
                    , d, c, l, n, f, J, A, k, R, v, q, w = []
                    , N;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    z.radialGradient ? c = "radialGradient" : z.linearGradient && (c = "linearGradient");
                    c && (l = z[c], f = y.gradients, A = z.stops, v = b.radialReference, I(l) && (z[c] = l = {
                        x1: l[0]
                        , y1: l[1]
                        , x2: l[2]
                        , y2: l[3]
                        , gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === c && v && !u(l.gradientUnits) && (n = l, l = D(l, y.getRadialAttr(v, n), {
                        gradientUnits: "userSpaceOnUse"
                    })), M(l, function (a, z) {
                        "id" !== z && w.push(z, a)
                    }), M(A, function (a) {
                        w.push(a)
                    }), w = w.join(","), f[w] ? q = f[w].attr("id") : (l.id = q = a.uniqueKey(), f[w] = J = y.createElement(c).attr(l).add(y.defs), J.radAttr = n, J.stops = [], r(A, function (z) {
                        0 === z[1].indexOf("rgba") ? (d = a.color(z[1]), k = d.get("rgb"), R = d.get("a")) : (k = z[1], R = 1);
                        z = y.createElement("stop").attr({
                            offset: z[0]
                            , "stop-color": k
                            , "stop-opacity": R
                        }).add(J);
                        J.stops.push(z)
                    })), N = "url(" + y.url + "#" + q + ")", b.setAttribute(g, N), b.gradient = w, z.toString = function () {
                        return N
                    })
                })
            }
            , applyTextOutline: function (z) {
                var g = this.element
                    , b, y, c, l, n; - 1 !== z.indexOf("contrast") && (z = z.replace(/contrast/g, this.renderer.getContrast(g.style.fill)));
                z = z.split(" ");
                y = z[z.length - 1];
                if ((c = z[0]) && "none" !== c && a.svg) {
                    this.fakeTS = !0;
                    z = [].slice.call(g.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a, z, g) {
                        return 2 * z + g
                    });
                    for (n = z.length; n--;) b = z[n], "highcharts-text-outline" === b.getAttribute("class") && d(z, g.removeChild(b));
                    l = g.firstChild;
                    r(z, function (a, z) {
                        0 === z && (a.setAttribute("x", g.getAttribute("x")), z = g.getAttribute("y"), a.setAttribute("y", z || 0), null === z && g.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        h(a, {
                            "class": "highcharts-text-outline"
                            , fill: y
                            , stroke: y
                            , "stroke-width": c
                            , "stroke-linejoin": "round"
                        });
                        g.insertBefore(a, l)
                    })
                }
            }
            , attr: function (a, g, b, y) {
                var z, d = this.element
                    , c, l = this
                    , n, f;
                "string" === typeof a && void 0 !== g && (z = a, a = {}, a[z] = g);
                "string" === typeof a ? l = (this[a + "Getter"] || this._defaultGetter).call(this, a, d) : (M(a, function (z, g) {
                    n = !1;
                    y || Q(this, g);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(g) && (c || (this.symbolAttr(a), c = !0), n = !0);
                    !this.rotation || "x" !== g && "y" !== g || (this.doTransform = !0);
                    n || (f = this[g + "Setter"] || this._defaultSetter, f.call(this, z, g, d), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(g) && this.updateShadows(g, z, f))
                }, this), this.afterSetters());
                b && b.call(this);
                return l
            }
            , afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            }
            , updateShadows: function (a, g, b) {
                for (var z = this.shadows, y = z.length; y--;) b.call(z[y], "height" === a ? Math.max(g - (z[y].cutHeight || 0), 0) : "d" === a ? this.d : g, a, z[y])
            }
            , addClass: function (a, g) {
                var z = this.attr("class") || ""; - 1 === z.indexOf(a) && (g || (a = (z + (z ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            }
            , hasClass: function (a) {
                return -1 !== q(a, (this.attr("class") || "").split(" "))
            }
            , removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            }
            , symbolAttr: function (a) {
                var z = this;
                r("x y r start end width height innerR anchorX anchorY".split(" "), function (g) {
                    z[g] = G(a[g], z[g])
                });
                z.attr({
                    d: z.renderer.symbols[z.symbolName](z.x, z.y, z.width, z.height, z)
                })
            }
            , clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            }
            , crisp: function (a, g) {
                var z;
                g = g || a.strokeWidth || 0;
                z = Math.round(g) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + z;
                a.y = Math.floor(a.y || this.y || 0) + z;
                a.width = Math.floor((a.width || this.width || 0) - 2 * z);
                a.height = Math.floor((a.height || this.height || 0) - 2 * z);
                u(a.strokeWidth) && (a.strokeWidth = g);
                return a
            }
            , css: function (a) {
                var z = this.styles
                    , b = {}
                    , y = this.element
                    , d, c = ""
                    , n, f = !z
                    , J = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                z && M(a, function (a, g) {
                    a !== z[g] && (b[g] = a, f = !0)
                });
                f && (z && (a = l(z, b)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === y.nodeName.toLowerCase() && a.width && (d = this.textWidth = g(a.width))), this.styles = a, d && !N && this.renderer.forExport && delete a.width, y.namespaceURI === this.SVG_NS ? (n = function (a, z) {
                    return "-" + z.toLowerCase()
                }, M(a, function (a, z) {
                    -1 === q(z, J) && (c += z.replace(/([A-Z])/g, n) + ":" + a + ";")
                }), c && h(y, "style", c)) : x(y, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            }
            , strokeWidth: function () {
                return this["stroke-width"] || 0
            }
            , on: function (a, g) {
                var z = this
                    , b = z.element;
                v && "click" === a ? (b.ontouchstart = function (a) {
                    z.touchEventFired = Date.now();
                    a.preventDefault();
                    g.call(b, a)
                }, b.onclick = function (a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (z.touchEventFired || 0)) && g.call(b, a)
                }) : b["on" + a] = g;
                return this
            }
            , setRadialReference: function (a) {
                var z = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                z && z.radAttr && z.animate(this.renderer.getRadialAttr(a, z.radAttr));
                return this
            }
            , translate: function (a, g) {
                return this.attr({
                    translateX: a
                    , translateY: g
                })
            }
            , invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            }
            , updateTransform: function () {
                var a = this.translateX || 0
                    , g = this.translateY || 0
                    , b = this.scaleX
                    , y = this.scaleY
                    , d = this.inverted
                    , c = this.rotation
                    , l = this.matrix
                    , n = this.element;
                d && (a += this.width, g += this.height);
                a = ["translate(" + a + "," + g + ")"];
                u(l) && a.push("matrix(" + l.join(",") + ")");
                d ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + G(this.rotationOriginX, n.getAttribute("x"), 0) + " " + G(this.rotationOriginY, n.getAttribute("y") || 0) + ")");
                (u(b) || u(y)) && a.push("scale(" + G(b, 1) + " " + G(y, 1) + ")");
                a.length && n.setAttribute("transform", a.join(" "))
            }
            , toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            }
            , align: function (a, g, b) {
                var z, y, c, l, n = {};
                y = this.renderer;
                c = y.alignedObjects;
                var f, J;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = g, !b || H(b)) this.alignTo = z = b || "renderer", d(c, this), c.push(this), b = null
                }
                else a = this.alignOptions, g = this.alignByTranslate, z = this.alignTo;
                b = G(b, y[z], y);
                z = a.align;
                y = a.verticalAlign;
                c = (b.x || 0) + (a.x || 0);
                l = (b.y || 0) + (a.y || 0);
                "right" === z ? f = 1 : "center" === z && (f = 2);
                f && (c += (b.width - (a.width || 0)) / f);
                n[g ? "translateX" : "x"] = Math.round(c);
                "bottom" === y ? J = 1 : "middle" === y && (J = 2);
                J && (l += (b.height - (a.height || 0)) / J);
                n[g ? "translateY" : "y"] = Math.round(l);
                this[this.placed ? "animate" : "attr"](n);
                this.placed = !0;
                this.alignAttr = n;
                return this
            }
            , getBBox: function (a, g) {
                var z, b = this.renderer
                    , y, d = this.element
                    , c = this.styles
                    , n, J = this.textStr
                    , A, k = b.cache
                    , v = b.cacheKeys
                    , q;
                g = G(g, this.rotation);
                y = g * f;
                n = c && c.fontSize;
                u(J) && (q = J.toString(), -1 === q.indexOf("\x3c") && (q = q.replace(/[0-9]/g, "0")), q += ["", g || 0, n, this.textWidth, c && c.textOverflow].join());
                q && !a && (z = k[q]);
                if (!z) {
                    if (d.namespaceURI === this.SVG_NS || b.forExport) {
                        try {
                            (A = this.fakeTS && function (a) {
                                r(d.querySelectorAll(".highcharts-text-outline"), function (z) {
                                    z.style.display = a
                                })
                            }) && A("none"), z = d.getBBox ? l({}, d.getBBox()) : {
                                width: d.offsetWidth
                                , height: d.offsetHeight
                            }, A && A("")
                        }
                        catch (W) {}
                        if (!z || 0 > z.width) z = {
                            width: 0
                            , height: 0
                        }
                    }
                    else z = this.htmlGetBBox();
                    b.isSVG && (a = z.width, b = z.height, c && "11px" === c.fontSize && 17 === Math.round(b) && (z.height = b = 14), g && (z.width = Math.abs(b * Math.sin(y)) + Math.abs(a * Math.cos(y)), z.height = Math.abs(b * Math.cos(y)) + Math.abs(a * Math.sin(y))));
                    if (q && 0 < z.height) {
                        for (; 250 < v.length;) delete k[v.shift()];
                        k[q] || v.push(q);
                        k[q] = z
                    }
                }
                return z
            }
            , show: function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            }
            , hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            }
            , fadeOut: function (a) {
                var z = this;
                z.animate({
                    opacity: 0
                }, {
                    duration: a || 150
                    , complete: function () {
                        z.attr({
                            y: -9999
                        })
                    }
                })
            }
            , add: function (a) {
                var z = this.renderer
                    , g = this.element
                    , b;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && z.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) b = this.zIndexSetter();
                b || (a ? a.element : z.box).appendChild(g);
                if (this.onAdd) this.onAdd();
                return this
            }
            , safeRemoveChild: function (a) {
                var z = a.parentNode;
                z && z.removeChild(a)
            }
            , destroy: function () {
                var a = this
                    , g = a.element || {}
                    , b = a.renderer.isSVG && "SPAN" === g.nodeName && a.parentGroup
                    , y = g.ownerSVGElement
                    , c = a.clipPath;
                g.onclick = g.onmouseout = g.onmouseover = g.onmousemove = g.point = null;
                Q(a);
                c && y && (r(y.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                    var g = a.getAttribute("clip-path")
                        , z = c.element.id;
                    (-1 < g.indexOf("(#" + z + ")") || -1 < g.indexOf('("#' + z + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = c.destroy());
                if (a.stops) {
                    for (y = 0; y < a.stops.length; y++) a.stops[y] = a.stops[y].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(g);
                for (a.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;) g = b.parentGroup, a.safeRemoveChild(b.div), delete b.div, b = g;
                a.alignTo && d(a.renderer.alignedObjects, a);
                M(a, function (g, z) {
                    delete a[z]
                });
                return null
            }
            , shadow: function (a, g, b) {
                var z = []
                    , y, d, c = this.element
                    , l, n, f, J;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    n = G(a.width, 3);
                    f = (a.opacity || .15) / n;
                    J = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
                    for (y = 1; y <= n; y++) d = c.cloneNode(0), l = 2 * n + 1 - 2 * y, h(d, {
                        stroke: a.color || "#fff"
                        , "stroke-opacity": f * y
                        , "stroke-width": l
                        , transform: "translate" + J
                        , fill: "none"
                    }), d.setAttribute("class", (d.getAttribute("class") || "") + " highcharts-shadow"), b && (h(d, "height", Math.max(h(d, "height") - l, 0)), d.cutHeight = l), g ? g.element.appendChild(d) : c.parentNode && c.parentNode.insertBefore(d, c), z.push(d);
                    this.shadows = z
                }
                return this
            }
            , destroyShadows: function () {
                r(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            }
            , xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            }
            , _defaultGetter: function (a) {
                a = G(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            }
            , dSetter: function (a, g, b) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[g] !== a && (b.setAttribute(g, a), this[g] = a)
            }
            , dashstyleSetter: function (a) {
                var b, z = this["stroke-width"];
                "inherit" === z && (z = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = g(a[b]) * z;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            }
            , alignSetter: function (a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start"
                    , center: "middle"
                    , right: "end"
                }[a])
            }
            , opacitySetter: function (a, g, b) {
                this[g] = a;
                b.setAttribute(g, a)
            }
            , titleSetter: function (a) {
                var g = this.element.getElementsByTagName("title")[0];
                g || (g = k.createElementNS(this.SVG_NS, "title"), this.element.appendChild(g));
                g.firstChild && g.removeChild(g.firstChild);
                g.appendChild(k.createTextNode(String(G(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            }
            , textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            }
            , fillSetter: function (a, g, b) {
                "string" === typeof a ? b.setAttribute(g, a) : a && this.complexColor(a, g, b)
            }
            , visibilitySetter: function (a, g, b) {
                "inherit" === a ? b.removeAttribute(g) : this[g] !== a && b.setAttribute(g, a);
                this[g] = a
            }
            , zIndexSetter: function (a, b) {
                var y = this.renderer
                    , z = this.parentGroup
                    , d = (z || y).element || y.box
                    , c, l = this.element
                    , n, f, y = d === y.box;
                c = this.added;
                var J;
                u(a) ? (l.setAttribute("data-z-index", a), a = +a, this[b] === a && (c = !1)) : u(this[b]) && l.removeAttribute("data-z-index");
                this[b] = a;
                if (c) {
                    (a = this.zIndex) && z && (z.handleZ = !0);
                    b = d.childNodes;
                    for (J = b.length - 1; 0 <= J && !n; J--)
                        if (z = b[J], c = z.getAttribute("data-z-index"), f = !u(c), z !== l)
                            if (0 > a && f && !y && !J) d.insertBefore(l, b[J]), n = !0;
                            else if (g(c) <= a || f && (!u(a) || 0 <= a)) d.insertBefore(l, b[J + 1] || null), n = !0;
                    n || (d.insertBefore(l, b[y ? 3 : 0] || null), n = !0)
                }
                return n
            }
            , _defaultSetter: function (a, g, b) {
                b.setAttribute(g, a)
            }
        });
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter = function (a, g) {
            this[g] = a;
            this.doTransform = !0
        };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, g, b) {
            this[g] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === g && 0 === a && this.hasStroke && (b.removeAttribute("stroke"), this.hasStroke = !1)
        };
        E = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        l(E.prototype, {
            Element: C
            , SVG_NS: J
            , init: function (a, g, b, y, d, c) {
                var z;
                y = this.createElement("svg").attr({
                    version: "1.1"
                    , "class": "highcharts-root"
                }).css(this.getStyle(y));
                z = y.element;
                a.appendChild(z);
                h(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && h(z, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = z;
                this.boxWrapper = y;
                this.alignedObjects = [];
                this.url = (w || n) && k.getElementsByTagName("base").length ? O.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 6.1.4"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = c;
                this.forExport = d;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(g, b, !1);
                var l;
                w && a.getBoundingClientRect && (g = function () {
                    x(a, {
                        left: 0
                        , top: 0
                    });
                    l = a.getBoundingClientRect();
                    x(a, {
                        left: Math.ceil(l.left) - l.left + "px"
                        , top: Math.ceil(l.top) - l.top + "px"
                    })
                }, g(), this.unSubPixelFix = F(O, "resize", g))
            }
            , getStyle: function (a) {
                return this.style = l({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif'
                    , fontSize: "16px"
                }, a)
            }
            , setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            }
            , isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }
            , destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                c(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }
            , createElement: function (a) {
                var g = new this.Element;
                g.init(this, a);
                return g
            }
            , draw: A
            , getRadialAttr: function (a, g) {
                return {
                    cx: a[0] - a[2] / 2 + g.cx * a[2]
                    , cy: a[1] - a[2] / 2 + g.cy * a[2]
                    , r: g.r * a[2]
                }
            }
            , truncate: function (a, g, b, y, d, c, l) {
                var z = this
                    , n = a.rotation
                    , f, J = y ? 1 : 0
                    , A = (b || y).length
                    , v = A
                    , q = []
                    , r = function (a) {
                        g.firstChild && g.removeChild(g.firstChild);
                        a && g.appendChild(k.createTextNode(a))
                    }
                    , w = function (c, n) {
                        n = n || c;
                        if (void 0 === q[n])
                            if (g.getSubStringLength) try {
                                q[n] = d + g.getSubStringLength(0, y ? n + 1 : n)
                            }
                            catch (X) {}
                            else r(l(b || y, c)), q[n] = d + z.getSpanWidth(a, g);
                        return q[n]
                    }
                    , D, N;
                a.rotation = 0;
                D = w(g.textContent.length);
                if (N = d + D > c) {
                    for (; J <= A;) v = Math.ceil((J + A) / 2), y && (f = l(y, v)), D = w(v, f && f.length - 1), J === A ? J = A + 1 : D > c ? A = v - 1 : J = v;
                    0 === A ? r("") : b && A === b.length - 1 || r(f || l(b || y, v))
                }
                y && y.splice(0, v);
                a.actualWidth = D;
                a.rotation = n;
                return N
            }
            , escapes: {
                "\x26": "\x26amp;"
                , "\x3c": "\x26lt;"
                , "\x3e": "\x26gt;"
                , "'": "\x26#39;"
                , '"': "\x26quot;"
            }
            , buildText: function (a) {
                var y = a.element
                    , d = this
                    , c = d.forExport
                    , l = G(a.textStr, "").toString()
                    , n = -1 !== l.indexOf("\x3c")
                    , z = y.childNodes
                    , f, A = h(y, "x")
                    , v = a.styles
                    , w = a.textWidth
                    , D = v && v.lineHeight
                    , e = v && v.textOutline
                    , B = v && "ellipsis" === v.textOverflow
                    , Q = v && "nowrap" === v.whiteSpace
                    , P = v && v.fontSize
                    , u, p, I = z.length
                    , v = w && !a.added && this.box
                    , H = function (a) {
                        var b;
                        b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : P || d.style.fontSize || 12;
                        return D ? g(D) : d.fontMetrics(b, a.getAttribute("style") ? a : y).h
                    }
                    , O = function (a, g) {
                        M(d.escapes, function (b, y) {
                            g && -1 !== q(b, g) || (a = a.toString().replace(new RegExp(b, "g"), y))
                        });
                        return a
                    }
                    , m = function (a, g) {
                        var b;
                        b = a.indexOf("\x3c");
                        a = a.substring(b, a.indexOf("\x3e") - b);
                        b = a.indexOf(g + "\x3d");
                        if (-1 !== b && (b = b + g.length + 1, g = a.charAt(b), '"' === g || "'" === g)) return a = a.substring(b + 1), a.substring(0, a.indexOf(g))
                    };
                u = [l, B, Q, D, e, P, w].join();
                if (u !== a.textCache) {
                    for (a.textCache = u; I--;) y.removeChild(z[I]);
                    n || e || B || w || -1 !== l.indexOf(" ") ? (v && v.appendChild(y), l = n ? l.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [l], l = b(l, function (a) {
                        return "" !== a
                    }), r(l, function (g, b) {
                        var l, n = 0
                            , z = 0;
                        g = g.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        l = g.split("|||");
                        r(l, function (g) {
                            if ("" !== g || 1 === l.length) {
                                var v = {}
                                    , q = k.createElementNS(d.SVG_NS, "tspan")
                                    , r, D;
                                (r = m(g, "class")) && h(q, "class", r);
                                if (r = m(g, "style")) r = r.replace(/(;| |^)color([ :])/, "$1fill$2"), h(q, "style", r);
                                (D = m(g, "href")) && !c && (h(q, "onclick", 'location.href\x3d"' + D + '"'), h(q, "class", "highcharts-anchor"), x(q, {
                                    cursor: "pointer"
                                }));
                                g = O(g.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== g) {
                                    q.appendChild(k.createTextNode(g));
                                    n ? v.dx = 0 : b && null !== A && (v.x = A);
                                    h(q, v);
                                    y.appendChild(q);
                                    !n && p && (!N && c && x(q, {
                                        display: "block"
                                    }), h(q, "dy", H(q)));
                                    if (w) {
                                        var e = g.replace(/([^\^])-/g, "$1- ").split(" ")
                                            , v = !Q && (1 < l.length || b || 1 < e.length);
                                        D = 0;
                                        var u = H(q);
                                        if (B) f = d.truncate(a, q, g, void 0, 0, Math.max(0, w - parseInt(P || 12, 10)), function (a, g) {
                                            return a.substring(0, g) + "\u2026"
                                        });
                                        else if (v)
                                            for (; e.length;) e.length && !Q && 0 < D && (q = k.createElementNS(J, "tspan"), h(q, {
                                                dy: u
                                                , x: A
                                            }), r && h(q, "style", r), q.appendChild(k.createTextNode(e.join(" ").replace(/- /g, "-"))), y.appendChild(q)), d.truncate(a, q, null, e, 0 === D ? z : 0, w, function (a, g) {
                                                return e.slice(0, g).join(" ").replace(/- /g, "-")
                                            }), z = a.actualWidth, D++
                                    }
                                    n++
                                }
                            }
                        });
                        p = p || y.childNodes.length
                    }), B && f && a.attr("title", O(a.textStr, ["\x26lt;", "\x26gt;"])), v && v.removeChild(y), e && a.applyTextOutline && a.applyTextOutline(e)) : y.appendChild(k.createTextNode(O(l)))
                }
            }
            , getContrast: function (a) {
                a = t(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }
            , button: function (a, g, b, y, d, c, n, f, J) {
                var z = this.label(a, g, b, J, null, null, null, null, "button")
                    , A = 0;
                z.attr(D({
                    padding: 8
                    , r: 2
                }, d));
                var v, q, k, r;
                d = D({
                    fill: "#fff"
                    , stroke: "#fff"
                    , "stroke-width": 1
                    , style: {
                       // color: "#333333",
                         cursor: "pointer"
                        , fontWeight: "normal"
                    }
                }, d);
                v = d.style;
                delete d.style;
                c = D(d, {
                    fill: "#e6e6e6"
                }, c);
                q = c.style;
                delete c.style;
                n = D(d, {
                    fill: "#e6ebf5"
                    , style: {
                        color: "#fff",
                         fontWeight: "bold"
                    }
                }, n);
                k = n.style;
                delete n.style;
                f = D(d, {
                    style: {
                        color: "#cccccc"
                    }
                }, f);
                r = f.style;
                delete f.style;
                F(z.element, L ? "mouseover" : "mouseenter", function () {
                    3 !== A && z.setState(1)
                });
                F(z.element, L ? "mouseout" : "mouseleave", function () {
                    3 !== A && z.setState(A)
                });
                z.setState = function (a) {
                    1 !== a && (z.state = A = a);
                    z.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    z.attr([d, c, n, f][a ||
0]).css([v, q, k, r][a || 0])
                };
                z.attr(d).css(l({
                    cursor: "default"
                }, v));
                return z.on("click", function (a) {
                    3 !== A && y.call(z, a)
                })
            }
            , crispLine: function (a, g) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - g % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + g % 2 / 2);
                return a
            }
            , path: function (a) {
                var g = {
                    fill: "none"
                };
                I(a) ? g.d = a : B(a) && l(g, a);
                return this.createElement("path").attr(g)
            }
            , circle: function (a, g, b) {
                a = B(a) ? a : {
                    x: a
                    , y: g
                    , r: b
                };
                g = this.createElement("circle");
                g.xSetter = g.ySetter = function (a, g, b) {
                    b.setAttribute("c" + g, a)
                };
                return g.attr(a)
            }
            , arc: function (a, g, b, y, d, c) {
                B(a) ? (y = a, g = y.y, b = y.r, a = y.x) : y = {
                    innerR: y
                    , start: d
                    , end: c
                };
                a = this.symbol("arc", a, g, b, b, y);
                a.r = b;
                return a
            }
            , rect: function (a, g, b, y, d, c) {
                d = B(a) ? a.r : d;
                var l = this.createElement("rect");
                a = B(a) ? a : void 0 === a ? {} : {
                    x: a
                    , y: g
                    , width: Math.max(b, 0)
                    , height: Math.max(y, 0)
                };
                void 0 !== c && (a.strokeWidth = c, a = l.crisp(a));
                a.fill = "none";
                d && (a.r = d);
                l.rSetter = function (a, g, b) {
                    h(b, {
                        rx: a
                        , ry: a
                    })
                };
                return l.attr(a)
            }
            , setSize: function (a, g, b) {
                var y = this.alignedObjects
                    , d = y.length;
                this.width = a;
                this.height = g;
                for (this.boxWrapper.animate({
                        width: a
                        , height: g
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        }
                        , duration: G(b, !0) ? void 0 : 0
                    }); d--;) y[d].align()
            }
            , g: function (a) {
                var g = this.createElement("g");
                return a ? g.attr({
                    "class": "highcharts-" + a
                }) : g
            }
            , image: function (a, g, b, y, d, c) {
                var n = {
                        preserveAspectRatio: "none"
                    }
                    , f, J = function (a, g) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", g) : a.setAttribute("hc-svg-href", g)
                    }
                    , z = function (g) {
                        J(f.element, a);
                        c.call(f, g)
                    };
                1 < arguments.length && l(n, {
                    x: g
                    , y: b
                    , width: y
                    , height: d
                });
                f = this.createElement("image").attr(n);
                c ? (J(f.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), n = new O.Image, F(n, "load", z), n.src = a, n.complete && z({})) : J(f.element, a);
                return f
            }
            , symbol: function (a, g, b, y, d, c) {
                var n = this
                    , f, J = /^url\((.*?)\)$/
                    , z = J.test(a)
                    , A = !z && (this.symbols[a] ? a : "circle")
                    , v = A && this.symbols[A]
                    , q = u(g) && v && v.call(this.symbols, Math.round(g), Math.round(b), y, d, c)
                    , D, w;
                v ? (f = this.path(q), f.attr("fill", "none"), l(f, {
                    symbolName: A
                    , x: g
                    , y: b
                    , width: y
                    , height: d
                }), c && l(f, c)) : z && (D = a.match(J)[1], f = this.image(D), f.imgwidth = G(P[D] && P[D].width, c && c.width), f.imgheight = G(P[D] && P[D].height, c && c.height), w = function () {
                    f.attr({
                        width: f.width
                        , height: f.height
                    })
                }, r(["width", "height"], function (a) {
                    f[a + "Setter"] = function (a, g) {
                        var b = {}
                            , y = this["img" + g]
                            , d = "width" === g ? "translateX" : "translateY";
                        this[g] = a;
                        u(y) && (this.element && this.element.setAttribute(g, y), this.alignByTranslate || (b[d] = ((this[g] || 0) - y) / 2, this.attr(b)))
                    }
                }), u(g) && f.attr({
                    x: g
                    , y: b
                }), f.isImg = !0, u(f.imgwidth) && u(f.imgheight) ? w() : (f.attr({
                    width: 0
                    , height: 0
                }), p("img", {
                    onload: function () {
                        var a = e[n.chartIndex];
                        0 === this.width && (x(this, {
                            position: "absolute"
                            , top: "-999em"
                        }), k.body.appendChild(this));
                        P[D] = {
                            width: this.width
                            , height: this.height
                        };
                        f.imgwidth = this.width;
                        f.imgheight = this.height;
                        f.element && w();
                        this.parentNode && this.parentNode.removeChild(this);
                        n.imgCount--;
                        if (!n.imgCount && a && a.onload) a.onload()
                    }
                    , src: D
                }), this.imgCount++));
                return f
            }
            , symbols: {
                circle: function (a, g, b, y) {
                    return this.arc(a + b / 2, g + y / 2, b / 2, y / 2, {
                        start: 0
                        , end: 2 * Math.PI
                        , open: !1
                    })
                }
                , square: function (a, g, b, y) {
                    return ["M", a, g, "L", a + b, g, a + b, g + y, a, g + y, "Z"]
                }
                , triangle: function (a, g, b, y) {
                    return ["M", a + b / 2, g, "L", a + b, g + y, a, g + y, "Z"]
                }
                , "triangle-down": function (a, g, b, y) {
                    return ["M", a, g, "L", a + b, g, a + b / 2, g + y, "Z"]
                }
                , diamond: function (a, g, b, y) {
                    return ["M", a + b / 2, g, "L", a + b, g + y / 2, a + b / 2, g + y, a, g + y / 2, "Z"]
                }
                , arc: function (a, g, b, y, d) {
                    var c = d.start
                        , l = d.r || b
                        , n = d.r || y || b
                        , f = d.end - .001;
                    b = d.innerR;
                    y = G(d.open, .001 > Math.abs(d.end - d.start - 2 * Math.PI));
                    var J = Math.cos(c)
                        , A = Math.sin(c)
                        , v = Math.cos(f)
                        , f = Math.sin(f);
                    d = .001 > d.end - c - Math.PI ? 0 : 1;
                    l = ["M", a + l * J, g + n * A, "A", l, n, 0, d, 1, a + l * v, g + n * f];
                    u(b) && l.push(y ? "M" : "L", a + b * v, g + b * f, "A", b, b, 0, d, 0, a + b * J, g + b * A);
                    l.push(y ? "" : "Z");
                    return l
                }
                , callout: function (a, g, b, y, d) {
                    var c = Math.min(d && d.r || 0, b, y)
                        , l = c + 6
                        , n = d && d.anchorX;
                    d = d && d.anchorY;
                    var f;
                    f = ["M", a + c, g, "L", a + b - c, g, "C", a + b, g, a + b, g, a + b, g + c, "L", a + b, g + y - c, "C", a + b, g + y, a + b, g + y, a + b - c, g + y, "L", a + c, g + y, "C", a, g + y, a, g + y, a, g + y - c, "L", a, g + c, "C", a, g, a, g, a + c, g];
                    n && n > b ? d > g + l && d < g + y - l ? f.splice(13, 3, "L", a + b, d - 6, a + b + 6, d, a + b, d + 6, a + b, g + y - c) : f.splice(13, 3, "L", a + b, y / 2, n, d, a + b, y / 2, a + b, g + y - c) : n && 0 > n ? d > g + l && d < g + y - l ? f.splice(33, 3, "L", a, d + 6, a - 6, d, a, d - 6, a, g + c) : f.splice(33, 3, "L", a, y / 2, n, d, a, y / 2, a, g + c) : d && d > y && n > a + l && n < a + b - l ? f.splice(23, 3, "L", n + 6, g + y, n, g + y + 6, n - 6, g + y, a + c, g + y) : d && 0 > d && n > a + l && n < a + b - l && f.splice(3, 3, "L", n - 6, g, n, g - 6, n + 6, g, b - c, g);
                    return f
                }
            }
            , clipRect: function (g, b, y, d) {
                var c = a.uniqueKey()
                    , n = this.createElement("clipPath").attr({
                        id: c
                    }).add(this.defs);
                g = this.rect(g, b, y, d, 0).add(n);
                g.id = c;
                g.clipPath = n;
                g.count = 0;
                return g
            }
            , text: function (a, g, b, y) {
                var d = {};
                if (y && (this.allowHTML || !this.forExport)) return this.html(a, g, b);
                d.x = Math.round(g || 0);
                b && (d.y = Math.round(b));
                if (a || 0 === a) d.text = a;
                a = this.createElement("text").attr(d);
                y || (a.xSetter = function (a, g, b) {
                    var y = b.getElementsByTagName("tspan")
                        , d, c = b.getAttribute(g)
                        , n;
                    for (n = 0; n < y.length; n++) d = y[n], d.getAttribute(g) === c && d.setAttribute(g, a);
                    b.setAttribute(g, a)
                });
                return a
            }
            , fontMetrics: function (a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? g(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b
                    , b: Math.round(.8 * b)
                    , f: a
                }
            }
            , rotCorr: function (a, g, b) {
                var y = a;
                g && b && (y = Math.max(y * Math.cos(g * f), 4));
                return {
                    x: -a / 3 * Math.sin(g * f)
                    , y: y
                }
            }
            , label: function (g, b, d, c, n, f, J, A, v) {
                var q = this
                    , k = q.g("button" !== v && "label")
                    , w = k.text = q.text("", 0, 0, J).attr({
                        zIndex: 1
                    })
                    , z, N, e = 0
                    , B = 3
                    , Q = 0
                    , h, P, p, G, I, H = {}
                    , O, M, x = /^url\((.*?)\)$/.test(c)
                    , m = x
                    , t, L, R, U;
                v && k.addClass("highcharts-" + v);
                m = x;
                t = function () {
                    return (O || 0) % 2 / 2
                };
                L = function () {
                    var a = w.element.style
                        , g = {};
                    N = (void 0 === h || void 0 === P || I) && u(w.textStr) && w.getBBox();
                    k.width = (h || N.width || 0) + 2 * B + Q;
                    k.height = (P || N.height || 0) + 2 * B;
                    M = B + q.fontMetrics(a && a.fontSize, w).b;
                    m && (z || (k.box = z = q.symbols[c] || x ? q.symbol(c) : q.rect(), z.addClass(("button" === v ? "" : "highcharts-label-box") + (v ? " highcharts-" + v + "-box" : "")), z.add(k), a = t(), g.x = a, g.y = (A ? -M : 0) + a), g.width = Math.round(k.width), g.height = Math.round(k.height), z.attr(l(g, H)), H = {})
                };
                R = function () {
                    var a = Q + B
                        , g;
                    g = A ? 0 : M;
                    u(h) && N && ("center" === I || "right" === I) && (a += {
                        center: .5
                        , right: 1
                    }[I] * (h - N.width));
                    if (a !== w.x || g !== w.y) w.attr("x", a), w.hasBoxWidthChanged && (N = w.getBBox(!0), L()), void 0 !== g && w.attr("y", g);
                    w.x = a;
                    w.y = g
                };
                U = function (a, g) {
                    z ? z.attr(a, g) : H[a] = g
                };
                k.onAdd = function () {
                    w.add(k);
                    k.attr({
                        text: g || 0 === g ? g : ""
                        , x: b
                        , y: d
                    });
                    z && u(n) && k.attr({
                        anchorX: n
                        , anchorY: f
                    })
                };
                k.widthSetter = function (g) {
                    h = a.isNumber(g) ? g : null
                };
                k.heightSetter = function (a) {
                    P = a
                };
                k["text-alignSetter"] = function (a) {
                    I = a
                };
                k.paddingSetter = function (a) {
                    u(a) && a !== B && (B = k.padding = a, R())
                };
                k.paddingLeftSetter = function (a) {
                    u(a) && a !== Q && (Q = a, R())
                };
                k.alignSetter = function (a) {
                    a = {
                        left: 0
                        , center: .5
                        , right: 1
                    }[a];
                    a !== e && (e = a, N && k.attr({
                        x: p
                    }))
                };
                k.textSetter = function (a) {
                    void 0 !== a && w.textSetter(a);
                    L();
                    R()
                };
                k["stroke-widthSetter"] = function (a, g) {
                    a && (m = !0);
                    O = this["stroke-width"] = a;
                    U(g, a)
                };
                k.strokeSetter = k.fillSetter = k.rSetter = function (a, g) {
                    "r" !== g && ("fill" === g && a && (m = !0), k[g] = a);
                    U(g, a)
                };
                k.anchorXSetter = function (a, g) {
                    n = k.anchorX = a;
                    U(g, Math.round(a) - t() - p)
                };
                k.anchorYSetter = function (a, g) {
                    f = k.anchorY = a;
                    U(g, a - G)
                };
                k.xSetter = function (a) {
                    k.x = a;
                    e && (a -= e * ((h || N.width) + 2 * B), k["forceAnimate:x"] = !0);
                    p = Math.round(a);
                    k.attr("translateX", p)
                };
                k.ySetter = function (a) {
                    G = k.y = Math.round(a);
                    k.attr("translateY", G)
                };
                var S = k.css;
                return l(k, {
                    css: function (a) {
                        if (a) {
                            var g = {};
                            a = D(a);
                            r(k.textProps, function (b) {
                                void 0 !== a[b] && (g[b] = a[b], delete a[b])
                            });
                            w.css(g);
                            "width" in g && L()
                        }
                        return S.call(k, a)
                    }
                    , getBBox: function () {
                        return {
                            width: N.width + 2 * B
                            , height: N.height + 2 * B
                            , x: N.x - B
                            , y: N.y - B
                        }
                    }
                    , shadow: function (a) {
                        a && (L(), z && z.shadow(a));
                        return k
                    }
                    , destroy: function () {
                        y(k.element, "mouseenter");
                        y(k.element, "mouseleave");
                        w && (w = w.destroy());
                        z && (z = z.destroy());
                        C.prototype.destroy.call(k);
                        k = q = L = R = U = null
                    }
                })
            }
        });
        a.Renderer = E
    })(K);
    (function (a) {
        var C = a.attr
            , E = a.createElement
            , F = a.css
            , m = a.defined
            , h = a.each
            , e = a.extend
            , t = a.isFirefox
            , x = a.isMS
            , p = a.isWebKit
            , u = a.pick
            , f = a.pInt
            , c = a.SVGRenderer
            , k = a.win
            , r = a.wrap;
        e(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var d = "SPAN" === this.element.tagName && a && "width" in a
                    , b = u(d && a.width, void 0);
                d && (delete a.width, this.textWidth = b, this.htmlUpdateTransform());
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = e(this.styles, a);
                F(this.element, a);
                return this
            }
            , htmlGetBBox: function () {
                var a = this.element;
                return {
                    x: a.offsetLeft
                    , y: a.offsetTop
                    , width: a.offsetWidth
                    , height: a.offsetHeight
                }
            }
            , htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer
                        , d = this.element
                        , b = this.translateX || 0
                        , c = this.translateY || 0
                        , k = this.x || 0
                        , r = this.y || 0
                        , w = this.textAlign || "left"
                        , e = {
                            left: 0
                            , center: .5
                            , right: 1
                        }[w]
                        , B = this.styles
                        , u = B && B.whiteSpace;
                    F(d, {
                        marginLeft: b
                        , marginTop: c
                    });
                    this.shadows && h(this.shadows, function (a) {
                        F(a, {
                            marginLeft: b + 1
                            , marginTop: c + 1
                        })
                    });
                    this.inverted && h(d.childNodes, function (b) {
                        a.invertChild(b, d)
                    });
                    if ("SPAN" === d.tagName) {
                        var B = this.rotation
                            , n = this.textWidth && f(this.textWidth)
                            , D = [B, w, d.innerHTML, this.textWidth, this.textAlign].join()
                            , A;
                        (A = n !== this.oldTextWidth) && !(A = n > this.oldTextWidth) && ((A = this.textPxLength) || (F(d, {
                            width: ""
                            , whiteSpace: u || "nowrap"
                        }), A = d.offsetWidth), A = A > n);
                        A && /[ \-]/.test(d.textContent || d.innerText) ? (F(d, {
                            width: n + "px"
                            , display: "block"
                            , whiteSpace: u || "normal"
                        }), this.oldTextWidth = n, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        D !== this.cTT && (u = a.fontMetrics(d.style.fontSize).b, !m(B) || B === (this.oldRotation || 0) && w === this.oldAlign || this.setSpanRotation(B, e, u), this.getSpanCorrection(!m(B) && this.textPxLength || d.offsetWidth, u, e, B, w));
                        F(d, {
                            left: k + (this.xCorr || 0) + "px"
                            , top: r + (this.yCorr || 0) + "px"
                        });
                        this.cTT = D;
                        this.oldRotation = B;
                        this.oldAlign = w
                    }
                }
                else this.alignOnAdd = !0
            }
            , setSpanRotation: function (a, d, b) {
                var c = {}
                    , l = this.renderer.getTransformKey();
                c[l] = c.transform = "rotate(" + a + "deg)";
                c[l + (t ? "Origin" : "-origin")] = c.transformOrigin = 100 * d + "% " + b + "px";
                F(this.element, c)
            }
            , getSpanCorrection: function (a, d, b) {
                this.xCorr = -a * b;
                this.yCorr = -d
            }
        });
        e(c.prototype, {
            getTransformKey: function () {
                return x && !/Edge/.test(k.navigator.userAgent) ? "-ms-transform" : p ? "-webkit-transform" : t ? "MozTransform" : k.opera ? "-o-transform" : ""
            }
            , html: function (a, d, b) {
                var c = this.createElement("span")
                    , l = c.element
                    , f = c.renderer
                    , k = f.isSVG
                    , p = function (a, b) {
                        h(["opacity", "visibility"], function (d) {
                            r(a, d + "Setter", function (a, d, c, n) {
                                a.call(this, d, c, n);
                                b[c] = d
                            })
                        });
                        a.addedSetters = !0
                    };
                c.textSetter = function (a) {
                    a !== l.innerHTML && delete this.bBox;
                    this.textStr = a;
                    l.innerHTML = u(a, "");
                    c.doTransform = !0
                };
                k && p(c, c.element.style);
                c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function (a, b) {
                    "align" === b && (b = "textAlign");
                    c[b] = a;
                    c.doTransform = !0
                };
                c.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                c.attr({
                    text: a
                    , x: Math.round(d)
                    , y: Math.round(b)
                }).css({
                    fontFamily: this.style.fontFamily
                    , fontSize: this.style.fontSize
                    , position: "absolute"
                });
                l.style.whiteSpace = "nowrap";
                c.css = c.htmlCss;
                k && (c.add = function (a) {
                    var b, d = f.box.parentNode
                        , k = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) k.push(a), a = a.parentGroup;
                            h(k.reverse(), function (a) {
                                function n(g, b) {
                                    a[b] = g;
                                    "translateX" === b ? l.left = g + "px" : l.top = g + "px";
                                    a.doTransform = !0
                                }
                                var l, g = C(a.element, "class");
                                g && (g = {
                                    className: g
                                });
                                b = a.div = a.div || E("div", g, {
                                    position: "absolute"
                                    , left: (a.translateX || 0) + "px"
                                    , top: (a.translateY || 0) + "px"
                                    , display: a.display
                                    , opacity: a.opacity
                                    , pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || d);
                                l = b.style;
                                e(a, {
                                    classSetter: function (a) {
                                        return function (g) {
                                            this.element.setAttribute("class", g);
                                            a.className = g
                                        }
                                    }(b)
                                    , on: function () {
                                        k[0].div && c.on.apply({
                                            element: k[0].div
                                        }, arguments);
                                        return a
                                    }
                                    , translateXSetter: n
                                    , translateYSetter: n
                                });
                                a.addedSetters || p(a, l)
                            })
                        }
                    }
                    else b = d;
                    b.appendChild(l);
                    c.added = !0;
                    c.alignOnAdd && c.htmlUpdateTransform();
                    return c
                });
                return c
            }
        })
    })(K);
    (function (a) {
        var C = a.defined
            , E = a.each
            , F = a.extend
            , m = a.merge
            , h = a.pick
            , e = a.timeUnits
            , t = a.win;
        a.Time = function (a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {}
            , update: function (a) {
                var e = h(a && a.useUTC, !0)
                    , u = this;
                this.options = a = m(!0, this.options || {}, a);
                this.Date = a.Date || t.Date;
                this.timezoneOffset = (this.useUTC = e) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(e && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function (a, c) {
                    var f = c.getTime()
                        , r = f - u.getTimezoneOffset(c);
                    c.setTime(r);
                    a = c["getUTC" + a]();
                    c.setTime(f);
                    return a
                }, this.set = function (a, c, k) {
                    var f;
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === c.getTimezoneOffset() % 60) c["set" + a](k);
                    else f = u.getTimezoneOffset(c), f = c.getTime() - f, c.setTime(f), c["setUTC" + a](k), a = u.getTimezoneOffset(c), f = c.getTime() + a, c.setTime(f)
                }) : e ? (this.get = function (a, c) {
                    return c["getUTC" + a]()
                }, this.set = function (a, c, k) {
                    return c["setUTC" + a](k)
                }) : (this.get = function (a, c) {
                    return c["get" + a]()
                }, this.set = function (a, c, k) {
                    return c["set" + a](k)
                })
            }
            , makeTime: function (e, p, u, f, c, k) {
                var r, l, d;
                this.useUTC ? (r = this.Date.UTC.apply(0, arguments), l = this.getTimezoneOffset(r), r += l, d = this.getTimezoneOffset(r), l !== d ? r += d - l : l - 36E5 !== this.getTimezoneOffset(r - 36E5) || a.isSafari || (r -= 36E5)) : r = (new this.Date(e, p, h(u, 1), h(f, 0), h(c, 0), h(k, 0))).getTime();
                return r
            }
            , timezoneOffsetFunction: function () {
                var e = this
                    , h = this.options
                    , u = t.moment;
                if (!this.useUTC) return function (a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (h.timezone) {
                    if (u) return function (a) {
                        return 6E4 * -u.tz(a, h.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && h.getTimezoneOffset ? function (a) {
                    return 6E4 * h.getTimezoneOffset(a)
                } : function () {
                    return 6E4 * (e.timezoneOffset || 0)
                }
            }
            , dateFormat: function (e, h, u) {
                if (!a.defined(h) || isNaN(h)) return a.defaultOptions.lang.invalidDate || "";
                e = a.pick(e, "%Y-%m-%d %H:%M:%S");
                var f = this
                    , c = new this.Date(h)
                    , k = this.get("Hours", c)
                    , r = this.get("Day", c)
                    , l = this.get("Date", c)
                    , d = this.get("Month", c)
                    , b = this.get("FullYear", c)
                    , v = a.defaultOptions.lang
                    , q = v.weekdays
                    , I = v.shortWeekdays
                    , w = a.pad
                    , c = a.extend({
                        a: I ? I[r] : q[r].substr(0, 3)
                        , A: q[r]
                        , d: w(l)
                        , e: w(l, 2, " ")
                        , w: r
                        , b: v.shortMonths[d]
                        , B: v.months[d]
                        , m: w(d + 1)
                        , o: d + 1
                        , y: b.toString().substr(2, 2)
                        , Y: b
                        , H: w(k)
                        , k: k
                        , I: w(k % 12 || 12)
                        , l: k % 12 || 12
                        , M: w(f.get("Minutes", c))
                        , p: 12 > k ? "AM" : "PM"
                        , P: 12 > k ? "am" : "pm"
                        , S: w(c.getSeconds())
                        , L: w(Math.floor(h % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(c, function (a, b) {
                    for (; - 1 !== e.indexOf("%" + b);) e = e.replace("%" + b, "function" === typeof a ? a.call(f, h) : a)
                });
                return u ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            }
            , getTimeTicks: function (a, p, u, f) {
                var c = this
                    , k = []
                    , r, l = {}
                    , d;
                r = new c.Date(p);
                var b = a.unitRange
                    , v = a.count || 1
                    , q;
                f = h(f, 1);
                if (C(p)) {
                    c.set("Milliseconds", r, b >= e.second ? 0 : v * Math.floor(c.get("Milliseconds", r) / v));
                    b >= e.second && c.set("Seconds", r, b >= e.minute ? 0 : v * Math.floor(c.get("Seconds", r) / v));
                    b >= e.minute && c.set("Minutes", r, b >= e.hour ? 0 : v * Math.floor(c.get("Minutes", r) / v));
                    b >= e.hour && c.set("Hours", r, b >= e.day ? 0 : v * Math.floor(c.get("Hours", r) / v));
                    b >= e.day && c.set("Date", r, b >= e.month ? 1 : v * Math.floor(c.get("Date", r) / v));
                    b >= e.month && (c.set("Month", r, b >= e.year ? 0 : v * Math.floor(c.get("Month", r) / v)), d = c.get("FullYear", r));
                    b >= e.year && c.set("FullYear", r, d - d % v);
                    b === e.week && (d = c.get("Day", r), c.set("Date", r, c.get("Date", r) - d + f + (d < f ? -7 : 0)));
                    d = c.get("FullYear", r);
                    f = c.get("Month", r);
                    var I = c.get("Date", r)
                        , w = c.get("Hours", r);
                    p = r.getTime();
                    c.variableTimezone && (q = u - p > 4 * e.month || c.getTimezoneOffset(p) !== c.getTimezoneOffset(u));
                    p = r.getTime();
                    for (r = 1; p < u;) k.push(p), p = b === e.year ? c.makeTime(d + r * v, 0) : b === e.month ? c.makeTime(d, f + r * v) : !q || b !== e.day && b !== e.week ? q && b === e.hour && 1 < v ? c.makeTime(d, f, I, w + r * v) : p + b * v : c.makeTime(d, f, I + r * v * (b === e.day ? 1 : 7)), r++;
                    k.push(p);
                    b <= e.hour && 1E4 > k.length && E(k, function (a) {
                        0 === a % 18E5 && "000000000" === c.dateFormat("%H%M%S%L", a) && (l[a] = "day")
                    })
                }
                k.info = F(a, {
                    higherRanks: l
                    , totalRange: b * v
                });
                return k
            }
        }
    })(K);
    (function (a) {
        var C = a.color
            , E = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ")
            , symbols: ["circle", "diamond", "square", "triangle", "triangle-down"]
            , lang: {
                loading: "Loading..."
                , months: "January February March April May June July August September October November December".split(" ")
                , shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
                , weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
                , decimalPoint: "."
                , numericSymbols: "kMGTPE".split("")
                , resetZoom: "Reset zoom"
                , resetZoomTitle: "Reset zoom level 1:1"
                , thousandsSep: " "
            }
            , global: {}
            , time: a.Time.prototype.defaultOptions
            , chart: {
                borderRadius: 0
                , defaultSeriesType: "line"
                , ignoreHiddenSeries: !0
                , spacing: [10, 10, 15, 10]
                , resetZoomButton: {
                    theme: {
                        zIndex: 6
                    }
                    , position: {
                        align: "right"
                        , x: -10
                        , y: 10
                    }
                }
                , width: null
                , height: null
                , borderColor: "#335cad"
                , backgroundColor: "#ffffff"
                , plotBorderColor: "#cccccc"
            }
            , title: {
                text: "Chart title"
                , align: "center"
                , margin: 15
                , widthAdjust: -44
            }
            , subtitle: {
                text: ""
                , align: "center"
                , widthAdjust: -44
            }
            , plotOptions: {}
            , labels: {
                style: {
                    position: "absolute"
                    , color: "#333333"
                }
            }
            , legend: {
                enabled: !0
                , align: "center"
                , alignColumns: !0
                , layout: "horizontal"
                , labelFormatter: function () {
                    return this.name
                }
                , borderColor: "#999999"
                , borderRadius: 0
                , navigation: {
                    activeColor: "#003399"
                    , inactiveColor: "#cccccc"
                }
                , itemStyle: {
                    color: "#333333"
                    , fontSize: "16px"
                    , fontWeight: "bold"
                    , textOverflow: "ellipsis"
                }
                , itemHoverStyle: {
                    color: "#fff"
                }
                , itemHiddenStyle: {
                    color: "#cccccc"
                }
                , shadow: !1
                , itemCheckboxStyle: {
                    position: "absolute"
                    , width: "13px"
                    , height: "13px"
                }
                , squareSymbol: !0
                , symbolPadding: 5
                , verticalAlign: "bottom"
                , x: 0
                , y: 0
                , title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            }
            , loading: {
                labelStyle: {
                    fontWeight: "bold"
                    , position: "relative"
                    , top: "45%"
                }
                , style: {
                    position: "absolute"
                    , backgroundColor: "#ffffff"
                    , opacity: .5
                    , textAlign: "center"
                }
            }
            , tooltip: {
                enabled: !0
                , animation: a.svg
                , borderRadius: 3
                , dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L"
                    , second: "%A, %b %e, %H:%M:%S"
                    , minute: "%A, %b %e, %H:%M"
                    , hour: "%A, %b %e, %H:%M"
                    , day: "%A, %b %e, %Y"
                    , week: "Week from %A, %b %e, %Y"
                    , month: "%B %Y"
                    , year: "%Y"
                }
                , footerFormat: ""
                , padding: 8
                , snap: a.isTouchDevice ? 25 : 10
                , backgroundColor: C("#f7f7f7").setOpacity(.85).get()
                , borderWidth: 1
                , headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e'
                , pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e'
                , shadow: !0
                , style: {
                    color: "#333333"
                    , cursor: "default"
                    , fontSize: "16px"
                    , pointerEvents: "none"
                    , whiteSpace: "nowrap"
                }
            }
            , credits: {
                enabled: !0
                , href: "https://www.highcharts.com"
                , position: {
                    align: "right"
                    , x: -10
                    , verticalAlign: "bottom"
                    , y: -5
                }
                , style: {
                    cursor: "pointer"
                    , color: "#999999"
                    , fontSize: "9px"
                }
                , text: "Highcharts.com"
            }
        };
        a.setOptions = function (C) {
            a.defaultOptions = E(!0, a.defaultOptions, C);
            a.time.update(E(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(E(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function (C, m, h) {
            return a.time.dateFormat(C, m, h)
        }
    })(K);
    (function (a) {
        var C = a.correctFloat
            , E = a.defined
            , F = a.destroyObjectProperties
            , m = a.fireEvent
            , h = a.isNumber
            , e = a.merge
            , t = a.pick
            , x = a.deg2rad;
        a.Tick = function (a, e, f, c) {
            this.axis = a;
            this.pos = e;
            this.type = f || "";
            this.isNewLabel = this.isNew = !0;
            f || c || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis
                    , h = a.options
                    , f = a.chart
                    , c = a.categories
                    , k = a.names
                    , r = this.pos
                    , l = h.labels
                    , d = a.tickPositions
                    , b = r === d[0]
                    , v = r === d[d.length - 1]
                    , k = c ? t(c[r], k[r], r) : r
                    , c = this.label
                    , d = d.info
                    , q;
                a.isDatetimeAxis && d && (q = h.dateTimeLabelFormats[d.higherRanks[r] || d.unitName]);
                this.isFirst = b;
                this.isLast = v;
                h = {
                    axis: a
                    , chart: f
                    , isFirst: b
                    , isLast: v
                    , dateTimeLabelFormat: q
                    , value: a.isLog ? C(a.lin2log(k)) : k
                    , pos: r
                };
                h = a.labelFormatter.call(h, h);
                if (E(c)) c && c.textStr !== h && (!c.textWidth || l.style && l.style.width || c.styles.width || c.css({
                    width: null
                }), c.attr({
                    text: h
                }));
                else {
                    if (this.label = c = E(h) && l.enabled ? f.renderer.text(h, 0, 0, l.useHTML).css(e(l.style)).add(a.labelGroup) : null) c.textPxLength = c.getBBox().width;
                    this.rotation = 0
                }
            }
            , getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }
            , handleOverflow: function (a) {
                var e = this.axis
                    , f = e.options.labels
                    , c = a.x
                    , k = e.chart.chartWidth
                    , r = e.chart.spacing
                    , l = t(e.labelLeft, Math.min(e.pos, r[3]))
                    , r = t(e.labelRight, Math.max(e.isRadial ? 0 : e.pos + e.len, k - r[1]))
                    , d = this.label
                    , b = this.rotation
                    , v = {
                        left: 0
                        , center: .5
                        , right: 1
                    }[e.labelAlign || d.attr("align")]
                    , q = d.getBBox().width
                    , h = e.getSlotWidth(this)
                    , w = h
                    , p = 1
                    , B, H = {};
                if (b || "justify" !== t(f.overflow, "justify")) 0 > b && c - v * q < l ? B = Math.round(c / Math.cos(b * x) - l) : 0 < b && c + v * q > r && (B = Math.round((k - c) / Math.cos(b * x)));
                else if (k = c + (1 - v) * q, c - v * q < l ? w = a.x + w * (1 - v) - l : k > r && (w = r - a.x + w * v, p = -1), w = Math.min(h, w), w < h && "center" === e.labelAlign && (a.x += p * (h - w - v * (h - Math.min(q, w)))), q > w || e.autoRotation && (d.styles || {}).width) B = w;
                B && (H.width = B, (f.style || {}).textOverflow || (H.textOverflow = "ellipsis"), d.css(H))
            }
            , getPosition: function (e, h, f, c) {
                var k = this.axis
                    , r = k.chart
                    , l = c && r.oldChartHeight || r.chartHeight;
                e = {
                    x: e ? a.correctFloat(k.translate(h + f, null, null, c) + k.transB) : k.left + k.offset + (k.opposite ? (c && r.oldChartWidth || r.chartWidth) - k.right - k.left : 0)
                    , y: e ? l - k.bottom + k.offset - (k.opposite ? k.height : 0) : a.correctFloat(l - k.translate(h + f, null, null, c) - k.transB)
                };
                m(this, "afterGetPosition", {
                    pos: e
                });
                return e
            }
            , getLabelPosition: function (a, e, f, c, k, r, l, d) {
                var b = this.axis
                    , v = b.transA
                    , q = b.reversed
                    , h = b.staggerLines
                    , w = b.tickRotCorr || {
                        x: 0
                        , y: 0
                    }
                    , u = k.y
                    , B = c || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1)
                    , H = {};
                E(u) || (u = 0 === b.side ? f.rotation ? -8 : -f.getBBox().height : 2 === b.side ? w.y + 8 : Math.cos(f.rotation * x) * (w.y - f.getBBox(!1, 0).height / 2));
                a = a + k.x + B + w.x - (r && c ? r * v * (q ? -1 : 1) : 0);
                e = e + u - (r && !c ? r * v * (q ? 1 : -1) : 0);
                h && (f = l / (d || 1) % h, b.opposite && (f = h - f - 1), e += b.labelOffset / h * f);
                H.x = a;
                H.y = Math.round(e);
                m(this, "afterGetLabelPosition", {
                    pos: H
                });
                return H
            }
            , getMarkPath: function (a, e, f, c, k, r) {
                return r.crispLine(["M", a, e, "L", a + (k ? 0 : -f), e +
                    (k ? f : 0)], c)
            }
            , renderGridLine: function (a, e, f) {
                var c = this.axis
                    , k = c.options
                    , r = this.gridLine
                    , l = {}
                    , d = this.pos
                    , b = this.type
                    , v = c.tickmarkOffset
                    , q = c.chart.renderer
                    , h = b ? b + "Grid" : "grid"
                    , w = k[h + "LineWidth"]
                    , u = k[h + "LineColor"]
                    , k = k[h + "LineDashStyle"];
                r || (l.stroke = u, l["stroke-width"] = w, k && (l.dashstyle = k), b || (l.zIndex = 1), a && (l.opacity = 0), this.gridLine = r = q.path().attr(l).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(c.gridGroup));
                if (!a && r && (a = c.getPlotLinePath(d + v, r.strokeWidth() * f, a, !0))) r[this.isNew ? "attr" : "animate"]({
                    d: a
                    , opacity: e
                })
            }
            , renderMark: function (a, e, f) {
                var c = this.axis
                    , k = c.options
                    , r = c.chart.renderer
                    , l = this.type
                    , d = l ? l + "Tick" : "tick"
                    , b = c.tickSize(d)
                    , v = this.mark
                    , q = !v
                    , h = a.x;
                a = a.y;
                var w = t(k[d + "Width"], !l && c.isXAxis ? 1 : 0)
                    , k = k[d + "Color"];
                b && (c.opposite && (b[0] = -b[0]), q && (this.mark = v = r.path().addClass("highcharts-" + (l ? l + "-" : "") + "tick").add(c.axisGroup), v.attr({
                    stroke: k
                    , "stroke-width": w
                })), v[q ? "attr" : "animate"]({
                    d: this.getMarkPath(h, a, b[0], v.strokeWidth() * f, c.horiz, r)
                    , opacity: e
                }))
            }
            , renderLabel: function (a, e, f, c) {
                var k = this.axis
                    , r = k.horiz
                    , l = k.options
                    , d = this.label
                    , b = l.labels
                    , v = b.step
                    , k = k.tickmarkOffset
                    , q = !0
                    , I = a.x;
                a = a.y;
                d && h(I) && (d.xy = a = this.getLabelPosition(I, a, d, r, b, k, c, v), this.isFirst && !this.isLast && !t(l.showFirstLabel, 1) || this.isLast && !this.isFirst && !t(l.showLastLabel, 1) ? q = !1 : !r || b.step || b.rotation || e || 0 === f || this.handleOverflow(a), v && c % v && (q = !1), q && h(a.y) ? (a.opacity = f, d[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (d.attr("y", -9999), this.isNewLabel = !0))
            }
            , render: function (e, h, f) {
                var c = this.axis
                    , k = c.horiz
                    , r = this.getPosition(k, this.pos, c.tickmarkOffset, h)
                    , l = r.x
                    , d = r.y
                    , c = k && l === c.pos + c.len || !k && d === c.pos ? -1 : 1;
                f = t(f, 1);
                this.isActive = !0;
                this.renderGridLine(h, f, c);
                this.renderMark(r, f, c);
                this.renderLabel(r, h, f, e);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            }
            , destroy: function () {
                F(this, this.axis)
            }
        }
    })(K);
    var V = function (a) {
        var C = a.addEvent
            , E = a.animObject
            , F = a.arrayMax
            , m = a.arrayMin
            , h = a.color
            , e = a.correctFloat
            , t = a.defaultOptions
            , x = a.defined
            , p = a.deg2rad
            , u = a.destroyObjectProperties
            , f = a.each
            , c = a.extend
            , k = a.fireEvent
            , r = a.format
            , l = a.getMagnitude
            , d = a.grep
            , b = a.inArray
            , v = a.isArray
            , q = a.isNumber
            , I = a.isString
            , w = a.merge
            , L = a.normalizeTickInterval
            , B = a.objectEach
            , H = a.pick
            , n = a.removeEvent
            , D = a.splat
            , A = a.syncTimeout
            , M = a.Tick
            , G = function () {
                this.init.apply(this, arguments)
            };
        a.extend(G.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L"
                    , second: "%H:%M:%S"
                    , minute: "%H:%M"
                    , hour: "%H:%M"
                    , day: "%e. %b"
                    , week: "%e. %b"
                    , month: "%b '%y"
                    , year: "%Y"
                }
                , endOnTick: !1
                , labels: {
                    enabled: !0
                    , x: 0
                    , style: {
                        color: "#666666"
                        , cursor: "default"
                        , fontSize: "11px"
                    }
                }
                , maxPadding: .01
                , minorTickLength: 2
                , minorTickPosition: "outside"
                , minPadding: .01
                , startOfWeek: 1
                , startOnTick: !1
                , tickLength: 10
                , tickPixelInterval: 100
                , tickmarkPlacement: "between"
                , tickPosition: "outside"
                , title: {
                    align: "middle"
                    , style: {
                        color: "#666666"
                    }
                }
                , type: "linear"
                , minorGridLineColor: "#f2f2f2"
                , minorGridLineWidth: 1
                , minorTickColor: "#999999"
                , lineColor: "#ccd6eb"
                , lineWidth: 1
                , gridLineColor: "#e6e6e6"
                , tickColor: "#ccd6eb"
            }
            , defaultYAxisOptions: {
                endOnTick: !0
                , maxPadding: .05
                , minPadding: .05
                , tickPixelInterval: 72
                , showLastLabel: !0
                , labels: {
                    x: -8
                }
                , startOnTick: !0
                , title: {
                    rotation: 270
                    , text: "Values"
                }
                , stackLabels: {
                    allowOverlap: !1
                    , enabled: !1
                    , formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }
                    , style: {
                        color: "#fff"
                        , fontSize: "11px"
                        , fontWeight: "bold"
                        , textOutline: "1px contrast"
                    }
                }
                , gridLineWidth: 1
                , lineWidth: 0
            }
            , defaultLeftAxisOptions: {
                labels: {
                    x: -15
                }
                , title: {
                    rotation: 270
                }
            }
            , defaultRightAxisOptions: {
                labels: {
                    x: 15
                }
                , title: {
                    rotation: 90
                }
            }
            , defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45]
                    , x: 0
                }
                , title: {
                    rotation: 0
                }
            }
            , defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45]
                    , x: 0
                }
                , title: {
                    rotation: 0
                }
            }
            , init: function (a, y) {
                var g = y.isX
                    , d = this;
                d.chart = a;
                d.horiz = a.inverted && !d.isZAxis ? !g : g;
                d.isXAxis = g;
                d.coll = d.coll || (g ? "xAxis" : "yAxis");
                k(this, "init", {
                    userOptions: y
                });
                d.opposite = y.opposite;
                d.side = y.side || (d.horiz ? d.opposite ? 0 : 2 : d.opposite ? 1 : 3);
                d.setOptions(y);
                var c = this.options
                    , n = c.type;
                d.labelFormatter = c.labels.formatter || d.defaultLabelFormatter;
                d.userOptions = y;
                d.minPixelPadding = 0;
                d.reversed = c.reversed;
                d.visible = !1 !== c.visible;
                d.zoomEnabled = !1 !== c.zoomEnabled;
                d.hasNames = "category" === n || !0 === c.categories;
                d.categories = c.categories || d.hasNames;
                d.names || (d.names = [], d.names.keys = {});
                d.plotLinesAndBandsGroups = {};
                d.isLog = "logarithmic" === n;
                d.isDatetimeAxis = "datetime" === n;
                d.positiveValuesOnly = d.isLog && !d.allowNegativeLog;
                d.isLinked = x(c.linkedTo);
                d.ticks = {};
                d.labelEdge = [];
                d.minorTicks = {};
                d.plotLinesAndBands = [];
                d.alternateBands = {};
                d.len = 0;
                d.minRange = d.userMinRange = c.minRange || c.maxZoom;
                d.range = c.range;
                d.offset = c.offset || 0;
                d.stacks = {};
                d.oldStacks = {};
                d.stacksTouched = 0;
                d.max = null;
                d.min = null;
                d.crosshair = H(c.crosshair, D(a.options.tooltip.crosshairs)[g ? 0 : 1], !1);
                y = d.options.events; - 1 === b(d, a.axes) && (g ? a.axes.splice(a.xAxis.length, 0, d) : a.axes.push(d), a[d.coll].push(d));
                d.series = d.series || [];
                a.inverted && !d.isZAxis && g && void 0 === d.reversed && (d.reversed = !0);
                B(y, function (a, g) {
                    C(d, g, a)
                });
                d.lin2log = c.linearToLogConverter || d.lin2log;
                d.isLog && (d.val2lin = d.log2lin, d.lin2val = d.lin2log);
                k(this, "afterInit")
            }
            , setOptions: function (a) {
                this.options = w(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], w(t[this.coll], a));
                k(this, "afterSetOptions", {
                    userOptions: a
                })
            }
            , defaultLabelFormatter: function () {
                var g = this.axis
                    , b = this.value
                    , d = g.chart.time
                    , c = g.categories
                    , n = this.dateTimeLabelFormat
                    , l = t.lang
                    , f = l.numericSymbols
                    , l = l.numericSymbolMagnitude || 1E3
                    , k = f && f.length
                    , A, q = g.options.labels.format
                    , g = g.isLog ? Math.abs(b) : g.tickInterval;
                if (q) A = r(q, this, d);
                else if (c) A = b;
                else if (n) A = d.dateFormat(n, b);
                else if (k && 1E3 <= g)
                    for (; k-- && void 0 === A;) d = Math.pow(l, k + 1), g >= d && 0 === 10 * b % d && null !== f[k] && 0 !== b && (A = a.numberFormat(b / d, -1) + f[k]);
                void 0 === A && (A = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return A
            }
            , getSeriesExtremes: function () {
                var a = this
                    , b = a.chart;
                k(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    f(a.series, function (g) {
                        if (g.visible || !b.options.chart.ignoreHiddenSeries) {
                            var y = g.options
                                , c = y.threshold
                                , n;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= c && (c = null);
                            if (a.isXAxis) y = g.xData, y.length && (g = m(y), n = F(y), q(g) || g instanceof Date || (y = d(y, q), g = m(y), n = F(y)), y.length && (a.dataMin = Math.min(H(a.dataMin, y[0], g), g), a.dataMax = Math.max(H(a.dataMax, y[0], n), n)));
                            else if (g.getExtremes(), n = g.dataMax, g = g.dataMin, x(g) && x(n) && (a.dataMin = Math.min(H(a.dataMin, g), g), a.dataMax = Math.max(H(a.dataMax, n), n)), x(c) && (a.threshold = c), !y.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                k(this, "afterGetSeriesExtremes")
            }
            , translate: function (a, b, d, c, n, l) {
                var g = this.linkedParent || this
                    , y = 1
                    , f = 0
                    , k = c ? g.oldTransA : g.transA;
                c = c ? g.oldMin : g.min;
                var J = g.minPixelPadding;
                n = (g.isOrdinal || g.isBroken || g.isLog && n) && g.lin2val;
                k || (k = g.transA);
                d && (y *= -1, f = g.len);
                g.reversed && (y *= -1, f -= y * (g.sector || g.len));
                b ? (a = (a * y + f - J) / k + c, n && (a = g.lin2val(a))) : (n && (a = g.val2lin(a)), a = q(c) ? y * (a - c) * k + f + y * J + (q(l) ? k * l : 0) : void 0);
                return a
            }
            , toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            }
            , toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            }
            , getPlotLinePath: function (a, b, d, c, n) {
                var g = this.chart
                    , y = this.left
                    , l = this.top
                    , f, k, J = d && g.oldChartHeight || g.chartHeight
                    , A = d && g.oldChartWidth || g.chartWidth
                    , v;
                f = this.transB;
                var e = function (a, g, b) {
                    if (a < g || a > b) c ? a = Math.min(Math.max(g, a), b) : v = !0;
                    return a
                };
                n = H(n, this.translate(a, null, null, d));
                n = Math.min(Math.max(-1E5, n), 1E5);
                a = d = Math.round(n + f);
                f = k = Math.round(J - n - f);
                q(n) ? this.horiz ? (f = l, k = J - this.bottom, a = d = e(a, y, y + this.width)) : (a = y, d = A - this.right, f = k = e(f, l, l + this.height)) : (v = !0, c = !1);
                return v && !c ? null : g.renderer.crispLine(["M", a, f, "L", d, k], b || 1)
            }
            , getLinearTickPositions: function (a, b, d) {
                var g, c = e(Math.floor(b / a) * a);
                d = e(Math.ceil(d / a) * a);
                var y = []
                    , n;
                e(c + a) === c && (n = 20);
                if (this.single) return [b];
                for (b = c; b <= d;) {
                    y.push(b);
                    b = e(b + a, n);
                    if (b === g) break;
                    g = b
                }
                return y
            }
            , getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? H(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            }
            , getMinorTickPositions: function () {
                var a = this
                    , b = a.options
                    , d = a.tickPositions
                    , c = a.minorTickInterval
                    , n = []
                    , l = a.pointRangePadding || 0
                    , k = a.min - l
                    , l = a.max + l
                    , A = l - k;
                if (A && A / c < a.len / 3)
                    if (a.isLog) f(this.paddedTicks, function (g, b, d) {
                        b && n.push.apply(n, a.getLogTickPositions(c, d[b - 1], d[b], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) n = n.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c), k, l, b.startOfWeek));
                else
                    for (b = k + (d[0] - k) % c; b <= l && b !== n[0]; b += c) n.push(b);
                0 !== n.length && a.trimTicks(n);
                return n
            }
            , adjustForMinRange: function () {
                var a = this.options
                    , b = this.min
                    , d = this.max
                    , c, n, l, k, A, q, v, e;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (x(a.min) || x(a.max) ? this.minRange = null : (f(this.series, function (a) {
                    q = a.xData;
                    for (k = v = a.xIncrement ? 1 : q.length - 1; 0 < k; k--)
                        if (A = q[k] - q[k - 1], void 0 === l || A < l) l = A
                }), this.minRange = Math.min(5 * l, this.dataMax - this.dataMin)));
                d - b < this.minRange && (n = this.dataMax - this.dataMin >= this.minRange, e = this.minRange, c = (e - d + b) / 2, c = [b - c, H(a.min, b - c)], n && (c[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = F(c), d = [b + e, H(a.max, b + e)], n && (d[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), d = m(d), d - b < e && (c[0] = d - e, c[1] = H(a.min, d - e), b = F(c)));
                this.min = b;
                this.max = d
            }
            , getClosest: function () {
                var a;
                this.categories ? a = 1 : f(this.series, function (g) {
                    var b = g.closestPointRange
                        , d = g.visible || !g.chart.options.chart.ignoreHiddenSeries;
                    !g.noSharedTooltip && x(b) && d && (a = x(a) ? Math.min(a, b) : b)
                });
                return a
            }
            , nameToX: function (a) {
                var g = v(this.categories)
                    , d = g ? this.categories : this.names
                    , c = a.options.x
                    , n;
                a.series.requireSorting = !1;
                x(c) || (c = !1 === this.options.uniqueNames ? a.series.autoIncrement() : g ? b(a.name, d) : H(d.keys[a.name], -1)); - 1 === c ? g || (n = d.length) : n = c;
                void 0 !== n && (this.names[n] = a.name, this.names.keys[a.name] = n);
                return n
            }
            , updateNames: function () {
                var g = this
                    , b = this.names;
                0 < b.length && (f(a.keys(b.keys), function (a) {
                    delete b.keys[a]
                }), b.length = 0, this.minRange = this.userMinRange, f(this.series || [], function (a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    f(a.points, function (b, d) {
                        var c;
                        b.options && (c = g.nameToX(b), void 0 !== c && c !== b.x && (b.x = c, a.xData[d] = c))
                    })
                }))
            }
            , setAxisTranslation: function (a) {
                var b = this
                    , g = b.max - b.min
                    , d = b.axisPointRange || 0
                    , c, n = 0
                    , l = 0
                    , A = b.linkedParent
                    , q = !!b.categories
                    , v = b.transA
                    , e = b.isXAxis;
                if (e || q || d) c = b.getClosest(), A ? (n = A.minPointOffset, l = A.pointRangePadding) : f(b.series, function (a) {
                    var g = q ? 1 : e ? H(a.options.pointRange, c, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    d = Math.max(d, g);
                    b.single || (n = Math.max(n, I(a) ? 0 : g / 2), l = Math.max(l, "on" === a ? 0 : g))
                }), A = b.ordinalSlope && c ? b.ordinalSlope / c : 1, b.minPointOffset = n *= A, b.pointRangePadding = l *= A, b.pointRange = Math.min(d, g), e && (b.closestPointRange = c);
                a && (b.oldTransA = v);
                b.translationSlope = b.transA = v = b.options.staticScale || b.len / (g + l || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = v * n;
                k(this, "afterSetAxisTranslation")
            }
            , minFromRange: function () {
                return this.max - this.range
            }
            , setTickInterval: function (b) {
                var g = this
                    , d = g.chart
                    , c = g.options
                    , n = g.isLog
                    , A = g.isDatetimeAxis
                    , v = g.isXAxis
                    , w = g.isLinked
                    , r = c.maxPadding
                    , D = c.minPadding
                    , h = c.tickInterval
                    , B = c.tickPixelInterval
                    , G = g.categories
                    , I = q(g.threshold) ? g.threshold : null
                    , u = g.softThreshold
                    , M, m, p, t;
                A || G || w || this.getTickAmount();
                p = H(g.userMin, c.min);
                t = H(g.userMax, c.max);
                w ? (g.linkedParent = d[g.coll][c.linkedTo], d = g.linkedParent.getExtremes(), g.min = H(d.min, d.dataMin), g.max = H(d.max, d.dataMax), c.type !== g.linkedParent.options.type && a.error(11, 1)) : (!u && x(I) && (g.dataMin >= I ? (M = I, D = 0) : g.dataMax <= I && (m = I, r = 0)), g.min = H(p, M, g.dataMin), g.max = H(t, m, g.dataMax));
                n && (g.positiveValuesOnly && !b && 0 >= Math.min(g.min, H(g.dataMin, g.min)) && a.error(10, 1), g.min = e(g.log2lin(g.min), 15), g.max = e(g.log2lin(g.max), 15));
                g.range && x(g.max) && (g.userMin = g.min = p = Math.max(g.dataMin, g.minFromRange()), g.userMax = t = g.max, g.range = null);
                k(g, "foundExtremes");
                g.beforePadding && g.beforePadding();
                g.adjustForMinRange();
                !(G || g.axisPointRange || g.usePercentage || w) && x(g.min) && x(g.max) && (d = g.max - g.min) && (!x(p) && D && (g.min -= d * D), !x(t) && r && (g.max += d * r));
                q(c.softMin) && !q(g.userMin) && (g.min = Math.min(g.min, c.softMin));
                q(c.softMax) && !q(g.userMax) && (g.max = Math.max(g.max, c.softMax));
                q(c.floor) && (g.min = Math.max(g.min, c.floor));
                q(c.ceiling) && (g.max = Math.min(g.max, c.ceiling));
                u && x(g.dataMin) && (I = I || 0, !x(p) && g.min < I && g.dataMin >= I ? g.min = I : !x(t) && g.max > I && g.dataMax <= I && (g.max = I));
                g.tickInterval = g.min === g.max || void 0 === g.min || void 0 === g.max ? 1 : w && !h && B === g.linkedParent.options.tickPixelInterval ? h = g.linkedParent.tickInterval : H(h, this.tickAmount ? (g.max - g.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (g.max - g.min) * B / Math.max(g.len, B));
                v && !b && f(g.series, function (a) {
                    a.processData(g.min !== g.oldMin || g.max !== g.oldMax)
                });
                g.setAxisTranslation(!0);
                g.beforeSetTickPositions && g.beforeSetTickPositions();
                g.postProcessTickInterval && (g.tickInterval = g.postProcessTickInterval(g.tickInterval));
                g.pointRange && !h && (g.tickInterval = Math.max(g.pointRange, g.tickInterval));
                b = H(c.minTickInterval, g.isDatetimeAxis && g.closestPointRange);
                !h && g.tickInterval < b && (g.tickInterval = b);
                A || n || h || (g.tickInterval = L(g.tickInterval, null, l(g.tickInterval), H(c.allowDecimals, !(.5 < g.tickInterval && 5 > g.tickInterval && 1E3 < g.max && 9999 > g.max)), !!this.tickAmount));
                this.tickAmount || (g.tickInterval = g.unsquish());
                this.setTickPositions()
            }
            , setTickPositions: function () {
                var g = this.options
                    , b, d = g.tickPositions;
                b = this.getMinorTickInterval();
                var c = g.tickPositioner
                    , n = g.startOnTick
                    , l = g.endOnTick;
                this.tickmarkOffset = this.categories && "between" === g.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && x(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== g.allowDecimals);
                this.tickPositions = b = d && d.slice();
                !b && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (b = [this.min, this.max], a.error(19)) : b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, g.units), this.min, this.max, g.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, c && (c = c.apply(this, [this.min, this.max]))) && (this.tickPositions = b = c);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, n, l);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), d || c || this.adjustTickAmount());
                k(this, "afterSetTickPositions")
            }
            , trimTicks: function (a, b, d) {
                var g = a[0]
                    , c = a[a.length - 1]
                    , n = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== g) this.min = g;
                    else
                        for (; this.min - n > a[0];) a.shift();
                    if (d) this.max = c;
                    else
                        for (; this.max + n < a[a.length - 1];) a.pop();
                    0 === a.length && x(g) && !this.options.tickPositions && a.push((c + g) / 2)
                }
            }
            , alignToOthers: function () {
                var a = {}
                    , b, d = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === d.alignTicks || !1 === d.startOnTick || !1 === d.endOnTick || this.isLog || f(this.chart[this.coll], function (g) {
                    var d = g.options
                        , d = [g.horiz ? d.left : d.top, d.width, d.height, d.pane].join();
                    g.series.length && (a[d] ? b = !0 : a[d] = 1)
                });
                return b
            }
            , getTickAmount: function () {
                var a = this.options
                    , b = a.tickAmount
                    , d = a.tickPixelInterval;
                !x(a.tickInterval) && this.len < d && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / d) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            }
            , adjustTickAmount: function () {
                var a = this.tickInterval
                    , b = this.tickPositions
                    , d = this.tickAmount
                    , c = this.finalTickAmt
                    , n = b && b.length
                    , l = H(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (n < d) {
                        for (; b.length < d;) b.length % 2 || this.min === l ? b.push(e(b[b.length - 1] + a)) : b.unshift(e(b[0] - a));
                        this.transA *= (n - 1) / (d - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    }
                    else n > d && (this.tickInterval *= 2, this.setTickPositions());
                    if (x(c)) {
                        for (a = d = b.length; a--;)(3 === c && 1 === a % 2 || 2 >= c && 0 < a && a < d - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            }
            , setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                f(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                k(this, "afterSetScale")
            }
            , setExtremes: function (a, b, d, n, l) {
                var g = this
                    , A = g.chart;
                d = H(d, !0);
                f(g.series, function (a) {
                    delete a.kdTree
                });
                l = c(l, {
                    min: a
                    , max: b
                });
                k(g, "setExtremes", l, function () {
                    g.userMin = a;
                    g.userMax = b;
                    g.eventArgs = l;
                    d && A.redraw(n)
                })
            }
            , zoom: function (a, b) {
                var g = this.dataMin
                    , d = this.dataMax
                    , c = this.options
                    , n = Math.min(g, H(c.min, g))
                    , c = Math.max(d, H(c.max, d));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (x(g) && (a < n && (a = n), a > c && (a = c)), x(d) && (b < n && (b = n), b > c && (b = c))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            }
            , setAxisSize: function () {
                var b = this.chart
                    , d = this.options
                    , c = d.offsets || [0, 0, 0, 0]
                    , n = this.horiz
                    , l = this.width = Math.round(a.relativeLength(H(d.width, b.plotWidth - c[3] + c[1]), b.plotWidth))
                    , f = this.height = Math.round(a.relativeLength(H(d.height, b.plotHeight - c[0] + c[2]), b.plotHeight))
                    , k = this.top = Math.round(a.relativeLength(H(d.top, b.plotTop + c[0]), b.plotHeight, b.plotTop))
                    , d = this.left = Math.round(a.relativeLength(H(d.left, b.plotLeft + c[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - f - k;
                this.right = b.chartWidth - l - d;
                this.len = Math.max(n ? l : f, 0);
                this.pos = n ? d : k
            }
            , getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? e(this.lin2log(this.min)) : this.min
                    , max: a ? e(this.lin2log(this.max)) : this.max
                    , dataMin: this.dataMin
                    , dataMax: this.dataMax
                    , userMin: this.userMin
                    , userMax: this.userMax
                }
            }
            , getThreshold: function (a) {
                var b = this.isLog
                    , g = b ? this.lin2log(this.min) : this.min
                    , b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = g : Infinity === a ? a = b : g > a ? a = g : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            }
            , autoLabelAlign: function (a) {
                a = (H(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            }
            , tickSize: function (a) {
                var b = this.options
                    , g = b[a + "Length"]
                    , d = H(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (d && g) return "inside" === b[a + "Position"] && (g = -g), [g, d]
            }
            , labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            }
            , unsquish: function () {
                var a = this.options.labels
                    , b = this.horiz
                    , d = this.tickInterval
                    , c = d
                    , n = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d)
                    , l, k = a.rotation
                    , A = this.labelMetrics()
                    , q, v = Number.MAX_VALUE
                    , w, r = function (a) {
                        a /= n || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return e(a * d)
                    };
                b ? (w = !a.staggerLines && !a.step && (x(k) ? [k] : n < H(a.autoRotationLimit, 80) && a.autoRotation)) && f(w, function (a) {
                    var b;
                    if (a === k || a && -90 <= a && 90 >= a) q = r(Math.abs(A.h / Math.sin(p * a))), b = q + Math.abs(a / 360), b < v && (v = b, l = a, c = q)
                }) : a.step || (c = r(A.h));
                this.autoRotation = w;
                this.labelRotation = H(l, k);
                return c
            }
            , getSlotWidth: function () {
                var a = this.chart
                    , b = this.horiz
                    , d = this.options.labels
                    , c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1)
                    , n = a.margin[3];
                return b && 2 > (d.step || 0) && !d.rotation && (this.staggerLines || 1) * this.len / c || !b && (d.style && parseInt(d.style.width, 10) || n && n - a.spacing[3] || .33 * a.chartWidth)
            }
            , renderUnsquish: function () {
                var a = this.chart
                    , b = a.renderer
                    , d = this.tickPositions
                    , c = this.ticks
                    , n = this.options.labels
                    , l = n && n.style || {}
                    , k = this.horiz
                    , A = this.getSlotWidth()
                    , q = Math.max(1, Math.round(A - 2 * (n.padding || 5)))
                    , v = {}
                    , e = this.labelMetrics()
                    , w = n.style && n.style.textOverflow
                    , r, D, h = 0
                    , B;
                I(n.rotation) || (v.rotation = n.rotation || 0);
                f(d, function (a) {
                    (a = c[a]) && a.label && a.label.textPxLength > h && (h = a.label.textPxLength)
                });
                this.maxLabelLength = h;
                if (this.autoRotation) h > q && h > e.h ? v.rotation = this.labelRotation : this.labelRotation = 0;
                else if (A && (r = q, !w))
                    for (D = "clip", q = d.length; !k && q--;)
                        if (B = d[q], B = c[B].label) B.styles && "ellipsis" === B.styles.textOverflow ? B.css({
                            textOverflow: "clip"
                        }) : B.textPxLength > A && B.css({
                            width: A + "px"
                        }), B.getBBox().height > this.len / d.length - (e.h - e.f) && (B.specificTextOverflow = "ellipsis");
                v.rotation && (r = h > .5 * a.chartHeight ? .33 * a.chartHeight : h, w || (D = "ellipsis"));
                if (this.labelAlign = n.align || this.autoLabelAlign(this.labelRotation)) v.align = this.labelAlign;
                f(d, function (a) {
                    var b = (a = c[a]) && a.label
                        , g = l.width
                        , d = {};
                    b && (b.attr(v), r && !g && "nowrap" !== l.whiteSpace && (r < b.textPxLength || "SPAN" === b.element.tagName) ? (d.width = r, w || (d.textOverflow = b.specificTextOverflow || D), b.css(d)) : b.styles && b.styles.width && !d.width && !g && b.css({
                        width: null
                    }), delete b.specificTextOverflow, a.rotation = v.rotation)
                });
                this.tickRotCorr = b.rotCorr(e.b, this.labelRotation || 0, 0 !== this.side)
            }
            , hasData: function () {
                return this.hasVisibleSeries || x(this.min) && x(this.max) && this.tickPositions && 0 < this.tickPositions.length
            }
            , addTitle: function (a) {
                var b = this.chart.renderer
                    , g = this.horiz
                    , d = this.opposite
                    , c = this.options.title
                    , n;
                this.axisTitle || ((n = c.textAlign) || (n = (g ? {
                    low: "left"
                    , middle: "center"
                    , high: "right"
                } : {
                    low: d ? "right" : "left"
                    , middle: "center"
                    , high: d ? "left" : "right"
                })[c.align]), this.axisTitle = b.text(c.text, 0, 0, c.useHTML).attr({
                    zIndex: 7
                    , rotation: c.rotation || 0
                    , align: n
                }).addClass("highcharts-axis-title").css(w(c.style)).add(this.axisGroup), this.axisTitle.isNew = !0);
                c.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            }
            , generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new M(this, a)
            }
            , getOffset: function () {
                var a = this
                    , b = a.chart
                    , d = b.renderer
                    , c = a.options
                    , n = a.tickPositions
                    , l = a.ticks
                    , A = a.horiz
                    , q = a.side
                    , v = b.inverted && !a.isZAxis ? [1, 0, 3, 2][q] : q
                    , e, w
                    , r = 0
                    , h, D = 0
                    , G = c.title
                    , I = c.labels
                    , u = 0
                    , M = b.axisOffset
                    , b = b.clipOffset
                    , p = [-1, 1, 1, -1][q]
                    , m = c.className
                    , t = a.axisParent
                    , L = this.tickSize("tick");
                e = a.hasData();
                a.showAxis = w = e || H(c.showEmpty, !0);
                a.staggerLines = a.horiz && I.staggerLines;
                a.axisGroup || (a.gridGroup = d.g("grid").attr({
                    zIndex: c.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (m || "")).add(t), a.axisGroup = d.g("axis").attr({
                    zIndex: c.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (m || "")).add(t), a.labelGroup = d.g("axis-labels").attr({
                    zIndex: I.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (m || "")).add(t));
                e || a.isLinked ? (f(n, function (b, d) {
                    a.generateTick(b, d)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === q || 2 === q || {
                    1: "left"
                    , 3: "right"
                }[q] === a.labelAlign, H(I.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && f(n, function (a) {
                    u = Math.max(l[a].getLabelSize(), u)
                }), a.staggerLines && (u *= a.staggerLines), a.labelOffset = u * (a.opposite ? -1 : 1)) : B(l, function (a, b) {
                    a.destroy();
                    delete l[b]
                });
                G && G.text && !1 !== G.enabled && (a.addTitle(w), w && !1 !== G.reserveSpace && (a.titleOffset = r = a.axisTitle.getBBox()[A ? "height" : "width"], h = G.offset, D = x(h) ? 0 : H(G.margin, A ? 5 : 10)));
                a.renderLine();
                a.offset = p * H(c.offset, M[q]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0
                    , y: 0
                };
                d = 0 === q ? -a.labelMetrics().h : 2 === q ? a.tickRotCorr.y : 0;
                D = Math.abs(u) + D;
                u && (D = D - d + p * (A ? H(I.y, a.tickRotCorr.y + 8 * p) : I.x));
                a.axisTitleMargin = H(h, D);
                M[q] = Math.max(M[q], a.axisTitleMargin + r + p * a.offset, D, e && n.length && L ? L[0] + p * a.offset : 0);
                c = c.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[v] = Math.max(b[v], c);
                k(this, "afterGetOffset")
            }
            , getLinePath: function (a) {
                var b = this.chart
                    , d = this.opposite
                    , g = this.offset
                    , c = this.horiz
                    , n = this.left + (d ? this.width : 0) + g
                    , g = b.chartHeight - this.bottom - (d ? this.height : 0) + g;
                d && (a *= -1);
                return b.renderer.crispLine(["M", c ? this.left : n, c ? g : this.top, "L", c ? b.chartWidth - this.right : n, c ? g : b.chartHeight - this.bottom], a)
            }
            , renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor
                    , "stroke-width": this.options.lineWidth
                    , zIndex: 7
                }))
            }
            , getTitlePosition: function () {
                var a = this.horiz
                    , b = this.left
                    , d = this.top
                    , c = this.len
                    , n = this.options.title
                    , l = a ? b : d
                    , f = this.opposite
                    , k = this.offset
                    , A = n.x || 0
                    , q = n.y || 0
                    , v = this.axisTitle
                    , e = this.chart.renderer.fontMetrics(n.style && n.style.fontSize, v)
                    , v = Math.max(v.getBBox(null, 0).height - e.h - 1, 0)
                    , c = {
                        low: l + (a ? 0 : c)
                        , middle: l + c / 2
                        , high: l + (a ? c : 0)
                    }[n.align]
                    , b = (a ? d + this.height : b) + (a ? 1 : -1) * (f ? -1 : 1) * this.axisTitleMargin + [-v, v, e.f, -v][this.side];
                return {
                    x: a ? c + A : b + (f ? this.width : 0) + k + A
                    , y: a ? b + q - (f ? this.height : 0) + k : c + q
                }
            }
            , renderMinorTick: function (a) {
                var b = this.chart.hasRendered && q(this.oldMin)
                    , d = this.minorTicks;
                d[a] || (d[a] = new M(this, a, "minor"));
                b && d[a].isNew && d[a].render(null, !0);
                d[a].render(null, !1, 1)
            }
            , renderTick: function (a, b) {
                var d = this.isLinked
                    , g = this.ticks
                    , c = this.chart.hasRendered && q(this.oldMin);
                if (!d || a >= this.min && a <= this.max) g[a] || (g[a] = new M(this, a)), c && g[a].isNew && g[a].render(b, !0, .1), g[a].render(b)
            }
            , render: function () {
                var b = this
                    , d = b.chart
                    , c = b.options
                    , n = b.isLog
                    , l = b.isLinked
                    , v = b.tickPositions
                    , e = b.axisTitle
                    , w = b.ticks
                    , r = b.minorTicks
                    , D = b.alternateBands
                    , h = c.stackLabels
                    , G = c.alternateGridColor
                    , I = b.tickmarkOffset
                    , u = b.axisLine
                    , H = b.showAxis
                    , p = E(d.renderer.globalAnimation)
                    , m, t;
                b.labelEdge.length = 0;
                b.overlap = !1;
                f([w, r, D], function (a) {
                    B(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || l) b.minorTickInterval && !b.categories && f(b.getMinorTickPositions(), function (a) {
                    b.renderMinorTick(a)
                }), v.length && (f(v, function (a, d) {
                    b.renderTick(a, d)
                }), I && (0 === b.min || b.single) && (w[-1] || (w[-1] = new M(b, -1, null, !0)), w[-1].render(-1))), G && f(v, function (c, g) {
                    t = void 0 !== v[g + 1] ? v[g + 1] + I : b.max - I;
                    0 === g % 2 && c < b.max && t <= b.max + (d.polar ? -I : I) && (D[c] || (D[c] = new a.PlotLineOrBand(b)), m = c + I, D[c].options = {
                        from: n ? b.lin2log(m) : m
                        , to: n ? b.lin2log(t) : t
                        , color: G
                    }, D[c].render(), D[c].isActive = !0)
                }), b._addedPlotLB || (f((c.plotLines || []).concat(c.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                f([w, r, D], function (a) {
                    var b, c = []
                        , g = p.duration;
                    B(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, c.push(b))
                    });
                    A(function () {
                        for (b = c.length; b--;) a[c[b]] && !a[c[b]].isActive && (a[c[b]].destroy(), delete a[c[b]])
                    }, a !== D && d.hasRendered && g ? g : 0)
                });
                u && (u[u.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(u.strokeWidth())
                }), u.isPlaced = !0, u[H ? "show" : "hide"](!0));
                e && H && (c = b.getTitlePosition(), q(c.y) ? (e[e.isNew ? "attr" : "animate"](c), e.isNew = !1) : (e.attr("y", -9999), e.isNew = !0));
                h && h.enabled && b.renderStackTotals();
                b.isDirty = !1;
                k(this, "afterRender")
            }
            , redraw: function () {
                this.visible && (this.render(), f(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                f(this.series, function (a) {
                    a.isDirty = !0
                })
            }
            , keepProps: "extKey hcEvents names series userMax userMin".split(" ")
            , destroy: function (a) {
                var d = this
                    , c = d.stacks
                    , g = d.plotLinesAndBands
                    , l;
                k(this, "destroy", {
                    keepEvents: a
                });
                a || n(d);
                B(c, function (a, b) {
                    u(a);
                    c[b] = null
                });
                f([d.ticks, d.minorTicks, d.alternateBands], function (a) {
                    u(a)
                });
                if (g)
                    for (a = g.length; a--;) g[a].destroy();
                f("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" "), function (a) {
                    d[a] && (d[a] = d[a].destroy())
                });
                for (l in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[l] = d.plotLinesAndBandsGroups[l].destroy();
                B(d, function (a, c) {
                    -1 === b(c, d.keepProps) && delete d[c]
                })
            }
            , drawCrosshair: function (a, b) {
                var d, c = this.crosshair
                    , g = H(c.snap, !0)
                    , n, l = this.cross;
                k(this, "drawCrosshair", {
                    e: a
                    , point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (x(b) || !g)) {
                    g ? x(b) && (n = H(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : n = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    x(n) && (d = this.getPlotLinePath(b && (this.isXAxis ? b.x : H(b.stackY, b.y)), null, null, null, n) || null);
                    if (!x(d)) {
                        this.hideCrosshair();
                        return
                    }
                    g = this.categories && !this.isRadial;
                    l || (this.cross = l = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (g ? "category " : "thin ") + c.className).attr({
                        zIndex: H(c.zIndex, 2)
                    }).add(), l.attr({
                        stroke: c.color || (g ? h("#ccd6eb").setOpacity(.25).get() : "#cccccc")
                        , "stroke-width": H(c.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), c.dashStyle && l.attr({
                        dashstyle: c.dashStyle
                    }));
                    l.show().attr({
                        d: d
                    });
                    g && !c.width && l.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                }
                else this.hideCrosshair();
                k(this, "afterDrawCrosshair", {
                    e: a
                    , point: b
                })
            }
            , hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = G
    }(K);
    (function (a) {
        var C = a.Axis
            , E = a.getMagnitude
            , F = a.normalizeTickInterval
            , m = a.timeUnits;
        C.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        C.prototype.normalizeTimeTickInterval = function (a, e) {
            var h = e || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]]
, ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            e = h[h.length - 1];
            var x = m[e[0]]
                , p = e[1]
                , u;
            for (u = 0; u < h.length && !(e = h[u], x = m[e[0]], p = e[1], h[u + 1] && a <= (x * p[p.length - 1] + m[h[u + 1][0]]) / 2); u++);
            x === m.year && a < 5 * x && (p = [1, 2, 5]);
            a = F(a / x, p, "year" === e[0] ? Math.max(E(a / x), 1) : 1);
            return {
                unitRange: x
                , count: a
                , unitName: e[0]
            }
        }
    })(K);
    (function (a) {
        var C = a.Axis
            , E = a.getMagnitude
            , F = a.map
            , m = a.normalizeTickInterval
            , h = a.pick;
        C.prototype.getLogTickPositions = function (a, t, x, p) {
            var e = this.options
                , f = this.len
                , c = [];
            p || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), c = this.getLinearTickPositions(a, t, x);
            else if (.08 <= a)
                for (var f = Math.floor(t), k, r, l, d, b, e = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < x + 1 && !b; f++)
                    for (r = e.length, k = 0; k < r && !b; k++) l = this.log2lin(this.lin2log(f) * e[k]), l > t && (!p || d <= x) && void 0 !== d && c.push(d), d > x && (b = !0), d = l;
            else t = this.lin2log(t), x = this.lin2log(x), a = p ? this.getMinorTickInterval() : e.tickInterval, a = h("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (p ? 5 : 1) * (x - t) / ((p ? f / this.tickPositions.length : f) || 1)), a = m(a, null, E(a)), c = F(this.getLinearTickPositions(a, t, x), this.log2lin), p || (this._minorAutoInterval = a / 5);
            p || (this.tickInterval = a);
            return c
        };
        C.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(K);
    (function (a, C) {
        var E = a.arrayMax
            , F = a.arrayMin
            , m = a.defined
            , h = a.destroyObjectProperties
            , e = a.each
            , t = a.erase
            , x = a.merge
            , p = a.pick;
        a.PlotLineOrBand = function (a, f) {
            this.axis = a;
            f && (this.options = f, this.id = f.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var e = this
                    , f = e.axis
                    , c = f.horiz
                    , k = e.options
                    , r = k.label
                    , l = e.label
                    , d = k.to
                    , b = k.from
                    , v = k.value
                    , q = m(b) && m(d)
                    , h = m(v)
                    , w = e.svgElem
                    , t = !w
                    , B = []
                    , H = k.color
                    , n = p(k.zIndex, 0)
                    , D = k.events
                    , B = {
                        "class": "highcharts-plot-" + (q ? "band " : "line ") + (k.className || "")
                    }
                    , A = {}
                    , M = f.chart.renderer
                    , G = q ? "bands" : "lines";
                f.isLog && (b = f.log2lin(b), d = f.log2lin(d), v = f.log2lin(v));
                h ? (B.stroke = H, B["stroke-width"] = k.width, k.dashStyle && (B.dashstyle = k.dashStyle)) : q && (H && (B.fill = H), k.borderWidth && (B.stroke = k.borderColor, B["stroke-width"] = k.borderWidth));
                A.zIndex = n;
                G += "-" + n;
                (H = f.plotLinesAndBandsGroups[G]) || (f.plotLinesAndBandsGroups[G] = H = M.g("plot-" + G).attr(A).add());
                t && (e.svgElem = w = M.path().attr(B).add(H));
                if (h) B = f.getPlotLinePath(v, w.strokeWidth());
                else if (q) B = f.getPlotBandPath(b, d, k);
                else return;
                t && B && B.length ? (w.attr({
                    d: B
                }), D && a.objectEach(D, function (a, b) {
                    w.on(b, function (a) {
                        D[b].apply(e, [a])
                    })
                })) : w && (B ? (w.show(), w.animate({
                    d: B
                })) : (w.hide(), l && (e.label = l = l.destroy())));
                r && m(r.text) && B && B.length && 0 < f.width && 0 < f.height && !B.isFlat ? (r = x({
                    align: c && q && "center"
                    , x: c ? !q && 4 : 10
                    , verticalAlign: !c && q && "middle"
                    , y: c ? q ? 16 : 10 : q ? 6 : -4
                    , rotation: c && !q && 90
                }, r), this.renderLabel(r, B, q, n)) : l && l.hide();
                return e
            }
            , renderLabel: function (a, f, c, k) {
                var e = this.label
                    , l = this.axis.chart.renderer;
                e || (e = {
                    align: a.textAlign || a.align
                    , rotation: a.rotation
                    , "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, e.zIndex = k, this.label = e = l.text(a.text, 0, 0, a.useHTML).attr(e).add(), e.css(a.style));
                k = f.xBounds || [f[1], f[4], c ? f[6] : f[1]];
                f = f.yBounds || [f[2], f[5], c ? f[7] : f[2]];
                c = F(k);
                l = F(f);
                e.align(a, !1, {
                    x: c
                    , y: l
                    , width: E(k) - c
                    , height: E(f) - l
                });
                e.show()
            }
            , destroy: function () {
                t(this.axis.plotLinesAndBands, this);
                delete this.axis;
                h(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function (a, f) {
                var c = this.getPlotLinePath(f, null, null, !0)
                    , k = this.getPlotLinePath(a, null, null, !0)
                    , e = []
                    , l = this.horiz
                    , d = 1
                    , b;
                a = a < this.min && f < this.min || a > this.max && f > this.max;
                if (k && c)
                    for (a && (b = k.toString() === c.toString(), d = 0), a = 0; a < k.length; a += 6) l && c[a + 1] === k[a + 1] ? (c[a + 1] += d, c[a + 4] += d) : l || c[a + 2] !== k[a + 2] || (c[a + 2] += d, c[a + 5] += d), e.push("M", k[a + 1], k[a + 2], "L", k[a + 4], k[a + 5], c[a + 4], c[a + 5], c[a + 1], c[a + 2], "z"), e.isFlat = b;
                return e
            }
            , addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }
            , addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            }
            , addPlotBandOrLine: function (e, f) {
                var c = (new a.PlotLineOrBand(this, e)).render()
                    , k = this.userOptions;
                c && (f && (k[f] = k[f] || [], k[f].push(e)), this.plotLinesAndBands.push(c));
                return c
            }
            , removePlotBandOrLine: function (a) {
                for (var f = this.plotLinesAndBands, c = this.options, k = this.userOptions, h = f.length; h--;) f[h].id === a && f[h].destroy();
                e([c.plotLines || [], k.plotLines || [], c.plotBands || [], k.plotBands || []], function (c) {
                    for (h = c.length; h--;) c[h].id === a && t(c, c[h])
                })
            }
            , removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            }
            , removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(K, V);
    (function (a) {
        var C = a.doc
            , E = a.each
            , F = a.extend
            , m = a.format
            , h = a.isNumber
            , e = a.map
            , t = a.merge
            , x = a.pick
            , p = a.splat
            , u = a.syncTimeout
            , f = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, f) {
                this.chart = a;
                this.options = f;
                this.crosshairs = [];
                this.now = {
                    x: 0
                    , y: 0
                };
                this.isHidden = !0;
                this.split = f.split && !a.inverted;
                this.shared = f.shared || this.split;
                this.outside = f.outside && !this.split
            }
            , cleanSplit: function (a) {
                E(this.chart.series, function (c) {
                    var f = c && c.tt;
                    f && (!f.isActive || a ? c.tt = f.destroy() : f.isActive = !1)
                })
            }
            , getLabel: function () {
                var c = this.chart.renderer
                    , f = this.options
                    , e;
                this.label || (this.outside && (this.container = e = a.doc.createElement("div"), e.className = "highcharts-tooltip-container", a.css(e, {
                    position: "absolute"
                    , top: "1px"
                    , pointerEvents: f.style && f.style.pointerEvents
                }), a.doc.body.appendChild(e), this.renderer = c = new a.Renderer(e, 0, 0)), this.split ? this.label = c.g("tooltip") : (this.label = c.label("", 0, 0, f.shape || "callout", null, null, f.useHTML, null, "tooltip").attr({
                    padding: f.padding
                    , r: f.borderRadius
                }), this.label.attr({
                    fill: f.backgroundColor
                    , "stroke-width": f.borderWidth
                }).css(f.style).shadow(f.shadow)), this.outside && (this.label.attr({
                    x: this.distance
                    , y: this.distance
                }), this.label.xSetter = function (a) {
                    e.style.left = a + "px"
                }, this.label.ySetter = function (a) {
                    e.style.top = a + "px"
                }), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            }
            , update: function (a) {
                this.destroy();
                t(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, t(!0, this.options, a))
            }
            , destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            }
            , move: function (c, f, e, l) {
                var d = this
                    , b = d.now
                    , k = !1 !== d.options.animation && !d.isHidden && (1 < Math.abs(c - b.x) || 1 < Math.abs(f - b.y))
                    , q = d.followPointer || 1 < d.len;
                F(b, {
                    x: k ? (2 * b.x + c) / 3 : c
                    , y: k ? (b.y + f) / 2 : f
                    , anchorX: q ? void 0 : k ? (2 * b.anchorX + e) / 3 : e
                    , anchorY: q ? void 0 : k ? (b.anchorY + l) / 2 : l
                });
                d.getLabel().attr(b);
                k && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    d && d.move(c, f, e, l)
                }, 32))
            }
            , hide: function (c) {
                var f = this;
                a.clearTimeout(this.hideTimer);
                c = x(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = u(function () {
                    f.getLabel()[c ? "fadeOut" : "hide"]();
                    f.isHidden = !0
                }, c))
            }
            , getAnchor: function (a, f) {
                var c = this.chart
                    , l = c.pointer
                    , d = c.inverted
                    , b = c.plotTop
                    , k = c.plotLeft
                    , q = 0
                    , h = 0
                    , w, m;
                a = p(a);
                this.followPointer && f ? (void 0 === f.chartX && (f = l.normalize(f)), a = [f.chartX - c.plotLeft, f.chartY - b]) : a[0].tooltipPos ? a = a[0].tooltipPos : (E(a, function (a) {
                    w = a.series.yAxis;
                    m = a.series.xAxis;
                    q += a.plotX + (!d && m ? m.left - k : 0);
                    h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!d && w ? w.top - b : 0)
                }), q /= a.length, h /= a.length, a = [d ? c.plotWidth - h : q, this.shared && !d && 1 < a.length && f ? f.chartY - b : d ? c.plotHeight - q : h]);
                return e(a, Math.round)
            }
            , getPosition: function (a, f, e) {
                var c = this.chart
                    , d = this.distance
                    , b = {}
                    , k = c.inverted && e.h || 0
                    , q, h = this.outside
                    , w = h ? C.documentElement.clientWidth - 2 * d : c.chartWidth
                    , r = h ? Math.max(C.body.scrollHeight, C.documentElement.scrollHeight, C.body.offsetHeight, C.documentElement.offsetHeight, C.documentElement.clientHeight) : c.chartHeight
                    , B = c.pointer.chartPosition
                    , H = ["y"
, r, f, (h ? B.top - d : 0) + e.plotY + c.plotTop, h ? 0 : c.plotTop, h ? r : c.plotTop + c.plotHeight]
                    , n = ["x", w, a, (h ? B.left - d : 0) + e.plotX + c.plotLeft, h ? 0 : c.plotLeft, h ? w : c.plotLeft + c.plotWidth]
                    , D = !this.followPointer && x(e.ttBelow, !c.inverted === !!e.negative)
                    , A = function (a, c, g, n, l, f) {
                        var A = g < n - d
                            , e = n + d + g < c
                            , q = n - d - g;
                        n += d;
                        if (D && e) b[a] = n;
                        else if (!D && A) b[a] = q;
                        else if (A) b[a] = Math.min(f - g, 0 > q - k ? q : q - k);
                        else if (e) b[a] = Math.max(l, n + k + g > c ? n : n + k);
                        else return !1
                    }
                    , M = function (a, c, g, n) {
                        var l;
                        n < d || n > c - d ? l = !1 : b[a] = n < g / 2 ? 1 : n > c - g / 2 ? c - g - 2 : n - g / 2;
                        return l
                    }
                    , G = function (a) {
                        var b = H;
                        H = n;
                        n = b;
                        q = a
                    }
                    , g = function () {
                        !1 !== A.apply(0, H) ? !1 !== M.apply(0, n) || q || (G(!0), g()) : q ? b.x = b.y = 0 : (G(!0), g())
                    };
                (c.inverted || 1 < this.len) && G();
                g();
                return b
            }
            , defaultFormatter: function (a) {
                var c = this.points || p(this)
                    , f;
                f = [a.tooltipFooterHeaderFormatter(c[0])];
                f = f.concat(a.bodyFormatter(c));
                f.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return f
            }
            , refresh: function (c, f) {
                var k, l = this.options
                    , d, b = c
                    , e, q = {}
                    , h = [];
                k = l.formatter || this.defaultFormatter;
                var q = this.shared
                    , w;
                l.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = p(b)[0].series.tooltipOptions.followPointer, e = this.getAnchor(b, f), f = e[0], d = e[1], !q || b.series && b.series.noSharedTooltip ? q = b.getLabelConfig() : (E(b, function (a) {
                    a.setState("hover");
                    h.push(a.getLabelConfig())
                }), q = {
                    x: b[0].category
                    , y: b[0].y
                }, q.points = h, b = b[0]), this.len = h.length, q = k.call(q, this), w = b.series, this.distance = x(w.tooltipOptions.distance, 16), !1 === q ? this.hide() : (k = this.getLabel(), this.isHidden && k.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(q, p(c)) : (l.style.width || k.css({
                    width: this.chart.spacingBox.width
                }), k.attr({
                    text: q && q.join ? q.join("") : q
                }), k.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + x(b.colorIndex, w.colorIndex)), k.attr({
                    stroke: l.borderColor || b.color || w.color || "#666666"
                }), this.updatePosition({
                    plotX: f
                    , plotY: d
                    , negative: b.negative
                    , ttBelow: b.ttBelow
                    , h: e[2] || 0
                })), this.isHidden = !1))
            }
            , renderSplit: function (c, f) {
                var k = this
                    , l = []
                    , d = this.chart
                    , b = d.renderer
                    , e = !0
                    , q = this.options
                    , h = 0
                    , w, m = this.getLabel()
                    , B = d.plotTop;
                a.isString(c) && (c = [!1, c]);
                E(c.slice(0, f.length + 1), function (a, c) {
                    if (!1 !== a) {
                        c = f[c - 1] || {
                            isHeader: !0
                            , plotX: f[0].plotX
                        };
                        var n = c.series || k
                            , A = n.tt
                            , v = c.series || {}
                            , r = "highcharts-color-" + x(c.colorIndex, v.colorIndex, "none");
                        A || (n.tt = A = b.label(null, null, null, "callout", null, null, q.useHTML).addClass("highcharts-tooltip-box " + r + (c.isHeader ? " highcharts-tooltip-header" : "")).attr({
                            padding: q.padding
                            , r: q.borderRadius
                            , fill: q.backgroundColor
                            , stroke: q.borderColor || c.color || v.color || "#333333"
                            , "stroke-width": q.borderWidth
                        }).add(m));
                        A.isActive = !0;
                        A.attr({
                            text: a
                        });
                        A.css(q.style).shadow(q.shadow);
                        a = A.getBBox();
                        v = a.width + A.strokeWidth();
                        c.isHeader ? (h = a.height, d.xAxis[0].opposite && (w = !0, B -= h), v = Math.max(0, Math.min(c.plotX + d.plotLeft - v / 2, d.chartWidth + (d.scrollablePixels ? d.scrollablePixels - d.marginRight : 0) - v))) : v = c.plotX + d.plotLeft - x(q.distance, 16) - v;
                        0 > v && (e = !1);
                        a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                        a -= B;
                        c.isHeader && (a = w ? -h : d.plotHeight + h);
                        l.push({
                            target: a
                            , rank: c.isHeader ? 1 : 0
                            , size: n.tt.getBBox().height + 1
                            , point: c
                            , x: v
                            , tt: A
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(l, d.plotHeight + h);
                E(l, function (a) {
                    var b = a.point
                        , c = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit"
                        , x: e || b.isHeader ? a.x : b.plotX + d.plotLeft + x(q.distance, 16)
                        , y: a.pos + B
                        , anchorX: b.isHeader ? b.plotX + d.plotLeft : b.plotX + c.xAxis.pos
                        , anchorY: b.isHeader ? d.plotTop + d.plotHeight / 2 : b.plotY + c.yAxis.pos
                    })
                })
            }
            , updatePosition: function (a) {
                var c = this.chart
                    , f = this.getLabel()
                    , l = (this.options.positioner || this.getPosition).call(this, f.width, f.height, a)
                    , d = a.plotX + c.plotLeft;
                a = a.plotY + c.plotTop;
                var b;
                this.outside && (b = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(f.width + b, f.height + b, !1), d += c.pointer.chartPosition.left - l.x, a += c.pointer.chartPosition.top - l.y);
                this.move(Math.round(l.x), Math.round(l.y || 0), d, a)
            }
            , getDateFormat: function (a, k, e, l) {
                var d = this.chart.time
                    , b = d.dateFormat("%m-%d %H:%M:%S.%L", k)
                    , c, q, h = {
                        millisecond: 15
                        , second: 12
                        , minute: 9
                        , hour: 6
                        , day: 3
                    }
                    , w = "millisecond";
                for (q in f) {
                    if (a === f.week && +d.dateFormat("%w", k) === e && "00:00:00.000" === b.substr(6)) {
                        q = "week";
                        break
                    }
                    if (f[q] > a) {
                        q = w;
                        break
                    }
                    if (h[q] && b.substr(h[q]) !== "01-01 00:00:00.000".substr(h[q])) break;
                    "week" !== q && (w = q)
                }
                q && (c = l[q]);
                return c
            }
            , getXDateFormat: function (a, f, e) {
                f = f.dateTimeLabelFormats;
                var c = e && e.closestPointRange;
                return (c ? this.getDateFormat(c, a.x, e.options.startOfWeek, f) : f.day) || f.year
            }
            , tooltipFooterHeaderFormatter: function (a, f) {
                f = f ? "footer" : "header";
                var c = a.series
                    , l = c.tooltipOptions
                    , d = l.xDateFormat
                    , b = c.xAxis
                    , e = b && "datetime" === b.options.type && h(a.key)
                    , k = l[f + "Format"];
                e && !d && (d = this.getXDateFormat(a, l, b));
                e && d && E(a.point && a.point.tooltipDateKeys || ["key"], function (a) {
                    k = k.replace("{point." + a + "}", "{point." + a + ":" + d + "}")
                });
                return m(k, {
                    point: a
                    , series: c
                }, this.chart.time)
            }
            , bodyFormatter: function (a) {
                return e(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.attr
            , F = a.charts
            , m = a.color
            , h = a.css
            , e = a.defined
            , t = a.each
            , x = a.extend
            , p = a.find
            , u = a.fireEvent
            , f = a.isNumber
            , c = a.isObject
            , k = a.offset
            , r = a.pick
            , l = a.splat
            , d = a.Tooltip;
        a.Pointer = function (a, d) {
            this.init(a, d)
        };
        a.Pointer.prototype = {
            init: function (a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !!c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                d && (a.tooltip = new d(a, c.tooltip), this.followTouchMove = r(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }
            , zoomOption: function (a) {
                var b = this.chart
                    , d = b.options.chart
                    , c = d.zoomType || ""
                    , b = b.inverted;
                /touch/.test(a.type) && (c = r(d.pinchType, c));
                this.zoomX = a = /x/.test(c);
                this.zoomY = c = /y/.test(c);
                this.zoomHor = a && !b || c && b;
                this.zoomVert = c && !b || a && b;
                this.hasZoom = a || c
            }
            , normalize: function (a, d) {
                var b;
                b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                d || (this.chartPosition = d = k(this.chart.container));
                return x(a, {
                    chartX: Math.round(b.pageX - d.left)
                    , chartY: Math.round(b.pageY - d.top)
                })
            }
            , getCoordinates: function (a) {
                var b = {
                    xAxis: []
                    , yAxis: []
                };
                t(this.chart.axes, function (d) {
                    b[d.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: d
                        , value: d.toValue(a[d.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            }
            , findNearestKDPoint: function (a, d, f) {
                var b;
                t(a, function (a) {
                    var l = !(a.noSharedTooltip && d) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(f, l);
                    if ((l = c(a, !0)) && !(l = !c(b, !0))) var l = b.distX - a.distX
                        , e = b.dist - a.dist
                        , k = (a.series.group && a.series.group.zIndex) - (b.series.group && b.series.group.zIndex)
                        , l = 0 < (0 !== l && d ? l : 0 !== e ? e : 0 !== k ? k : b.series.index > a.series.index ? -1 : 1);
                    l && (b = a)
                });
                return b
            }
            , getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            }
            , getChartCoordinatesFromPoint: function (a, d) {
                var b = a.series
                    , c = b.xAxis
                    , b = b.yAxis
                    , f = r(a.clientX, a.plotX)
                    , l = a.shapeArgs;
                if (c && b) return d ? {
                    chartX: c.len + c.pos - f
                    , chartY: b.len + b.pos - a.plotY
                } : {
                    chartX: f + c.pos
                    , chartY: a.plotY + b.pos
                };
                if (l && l.x && l.y) return {
                    chartX: l.x
                    , chartY: l.y
                }
            }
            , getHoverData: function (b, d, f, l, e, k, h) {
                var q, n = []
                    , v = h && h.isBoosting;
                l = !(!l || !b);
                h = d && !d.stickyTracking ? [d] : a.grep(f, function (a) {
                    return a.visible && !(!e && a.directTouch) && r(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                d = (q = l ? b : this.findNearestKDPoint(h, e, k)) && q.series;
                q && (e && !d.noSharedTooltip ? (h = a.grep(f, function (a) {
                    return a.visible && !(!e && a.directTouch) && r(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), t(h, function (a) {
                    var b = p(a.points, function (a) {
                        return a.x === q.x && !a.isNull
                    });
                    c(b) && (v && (b = a.getPoint(b)), n.push(b))
                })) : n.push(q));
                return {
                    hoverPoint: q
                    , hoverSeries: d
                    , hoverPoints: n
                }
            }
            , runPointActions: function (b, d) {
                var c = this.chart
                    , f = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0
                    , l = f ? f.shared : !1
                    , e = d || c.hoverPoint
                    , k = e && e.series || c.hoverSeries
                    , k = this.getHoverData(e, k, c.series, "touchmove" !== b.type && (!!d || k && k.directTouch && this.isDirectTouch), l, b, {
                        isBoosting: c.isBoosting
                    })
                    , h, e = k.hoverPoint;
                h = k.hoverPoints;
                d = (k = k.hoverSeries) && k.tooltipOptions.followPointer;
                l = l && k && !k.noSharedTooltip;
                if (e && (e !== c.hoverPoint || f && f.isHidden)) {
                    t(c.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, h) && b.setState()
                    });
                    t(h || [], function (a) {
                        a.setState("hover")
                    });
                    if (c.hoverSeries !== k) k.onMouseOver();
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!e.series) return;
                    e.firePointEvent("mouseOver");
                    c.hoverPoints = h;
                    c.hoverPoint = e;
                    f && f.refresh(l ? h : e, b)
                }
                else d && f && !f.isHidden && (e = f.getAnchor([{}], b), f.updatePosition({
                    plotX: e[0]
                    , plotY: e[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = C(c.container.ownerDocument, "mousemove", function (b) {
                    var d = F[a.hoverChartIndex];
                    if (d) d.pointer.onDocumentMouseMove(b)
                }));
                t(c.axes, function (d) {
                    var c = r(d.crosshair.snap, !0)
                        , n = c ? a.find(h, function (a) {
                            return a.series[d.coll] === d
                        }) : void 0;
                    n || !c ? d.drawCrosshair(b, n) : d.hideCrosshair()
                })
            }
            , reset: function (a, d) {
                var b = this.chart
                    , c = b.hoverSeries
                    , f = b.hoverPoint
                    , e = b.hoverPoints
                    , k = b.tooltip
                    , h = k && k.shared ? e : f;
                a && h && t(l(h), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) k && h && (k.refresh(h), k.shared && e ? t(e, function (a) {
                    a.setState(a.state, !0);
                    a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a);
                    a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a)
                }) : f && (f.setState(f.state, !0), t(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, f)
                })));
                else {
                    if (f) f.onMouseOut();
                    e && t(e, function (a) {
                        a.setState()
                    });
                    if (c) c.onMouseOut();
                    k && k.hide(d);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    t(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            }
            , scaleGroups: function (a, d) {
                var b = this.chart
                    , c;
                t(b.series, function (f) {
                    c = a || f.getPlotBox();
                    f.xAxis && f.xAxis.zoomEnabled && f.group && (f.group.attr(c), f.markerGroup && (f.markerGroup.attr(c), f.markerGroup.clip(d ? b.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(c))
                });
                b.clipRect.attr(d || b.clipBox)
            }
            , dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }
            , drag: function (a) {
                var b = this.chart
                    , d = b.options.chart
                    , c = a.chartX
                    , f = a.chartY
                    , l = this.zoomHor
                    , e = this.zoomVert
                    , k = b.plotLeft
                    , n = b.plotTop
                    , h = b.plotWidth
                    , A = b.plotHeight
                    , r, G = this.selectionMarker
                    , g = this.mouseDownX
                    , y = this.mouseDownY
                    , p = d.panKey && a[d.panKey + "Key"];
                G && G.touch || (c < k ? c = k : c > k + h && (c = k + h), f < n ? f = n : f > n + A && (f = n + A), this.hasDragged = Math.sqrt(Math.pow(g - c, 2) + Math.pow(y - f, 2)), 10 < this.hasDragged && (r = b.isInsidePlot(g - k, y - n), b.hasCartesianSeries && (this.zoomX || this.zoomY) && r && !p && !G && (this.selectionMarker = G = b.renderer.rect(k, n, l ? 1 : h, e ? 1 : A, 0).attr({
                    fill: d.selectionMarkerFill || m("#335cad").setOpacity(.25).get()
                    , "class": "highcharts-selection-marker"
                    , zIndex: 7
                }).add()), G && l && (c -= g, G.attr({
                    width: Math.abs(c)
                    , x: (0 < c ? 0 : c) + g
                })), G && e && (c = f - y, G.attr({
                    height: Math.abs(c)
                    , y: (0 < c ? 0 : c) + y
                })), r && !G && d.panning && b.pan(a, d.panning)))
            }
            , drop: function (a) {
                var b = this
                    , d = this.chart
                    , c = this.hasPinched;
                if (this.selectionMarker) {
                    var l = {
                            originalEvent: a
                            , xAxis: []
                            , yAxis: []
                        }
                        , k = this.selectionMarker
                        , r = k.attr ? k.attr("x") : k.x
                        , m = k.attr ? k.attr("y") : k.y
                        , n = k.attr ? k.attr("width") : k.width
                        , D = k.attr ? k.attr("height") : k.height
                        , A;
                    if (this.hasDragged || c) t(d.axes, function (d) {
                        if (d.zoomEnabled && e(d.min) && (c || b[{
                                xAxis: "zoomX"
                                , yAxis: "zoomY"
                            }[d.coll]])) {
                            var f = d.horiz
                                , g = "touchend" === a.type ? d.minPixelPadding : 0
                                , k = d.toValue((f ? r : m) + g)
                                , f = d.toValue((f ? r + n : m + D) - g);
                            l[d.coll].push({
                                axis: d
                                , min: Math.min(k, f)
                                , max: Math.max(k, f)
                            });
                            A = !0
                        }
                    }), A && u(d, "selection", l, function (a) {
                        d.zoom(x(a, c ? {
                            animation: !1
                        } : null))
                    });
                    f(d.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    c && this.scaleGroups()
                }
                d && f(d.index) && (h(d.container, {
                    cursor: d._cursor
                }), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }
            , onContainerMouseDown: function (a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            }
            , onDocumentMouseUp: function (b) {
                F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b)
            }
            , onDocumentMouseMove: function (a) {
                var b = this.chart
                    , d = this.chartPosition;
                a = this.normalize(a, d);
                !d || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            }
            , onContainerMouseLeave: function (b) {
                var d = F[a.hoverChartIndex];
                d && (b.relatedTarget || b.toElement) && (d.pointer.reset(), d.pointer.chartPosition = null)
            }
            , onContainerMouseMove: function (b) {
                var d = this.chart;
                e(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = d.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === d.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !d.isInsidePlot(b.chartX - d.plotLeft, b.chartY - d.plotTop) || d.openMenu || this.runPointActions(b)
            }
            , inClass: function (a, d) {
                for (var b; a;) {
                    if (b = E(a, "class")) {
                        if (-1 !== b.indexOf(d)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            }
            , onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            }
            , onContainerClick: function (a) {
                var b = this.chart
                    , d = b.hoverPoint
                    , c = b.plotLeft
                    , f = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (d && this.inClass(a.target, "highcharts-tracker") ? (u(d.series, "click", x(a, {
                    point: d
                })), b.hoverPoint && d.firePointEvent("click", a)) : (x(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - c, a.chartY - f) && u(b, "click", a)))
            }
            , setDOMEvents: function () {
                var b = this
                    , d = b.chart.container
                    , c = d.ownerDocument;
                d.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                d.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                d.onclick = function (a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = C(d, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(c, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (d.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, d.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(c, "touchend", b.onDocumentTouchEnd)))
            }
            , destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, d) {
                    b[d] = null
                })
            }
        }
    })(K);
    (function (a) {
        var C = a.charts
            , E = a.each
            , F = a.extend
            , m = a.map
            , h = a.noop
            , e = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function (a, e, h, m, f, c) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, e, h, m, f, c);
                this.zoomVert && this.pinchTranslateDirection(!1, a, e, h, m, f, c)
            }
            , pinchTranslateDirection: function (a, e, h, m, f, c, k, r) {
                var l = this.chart
                    , d = a ? "x" : "y"
                    , b = a ? "X" : "Y"
                    , v = "chart" + b
                    , q = a ? "width" : "height"
                    , p = l["plot" + (a ? "Left" : "Top")]
                    , w, t, B = r || 1
                    , H = l.inverted
                    , n = l.bounds[a ? "h" : "v"]
                    , D = 1 === e.length
                    , A = e[0][v]
                    , M = h[0][v]
                    , G = !D && e[1][v]
                    , g = !D && h[1][v]
                    , y;
                h = function () {
                    !D && 20 < Math.abs(A - G) && (B = r || Math.abs(M - g) / Math.abs(A - G));
                    t = (p - M) / B + A;
                    w = l["plot" + (a ? "Width" : "Height")] / B
                };
                h();
                e = t;
                e < n.min ? (e = n.min, y = !0) : e + w > n.max && (e = n.max - w, y = !0);
                y ? (M -= .8 * (M - k[d][0]), D || (g -= .8 * (g - k[d][1])), h()) : k[d] = [M, g];
                H || (c[d] = t - p, c[q] = w);
                c = H ? 1 / B : B;
                f[q] = w;
                f[d] = e;
                m[H ? a ? "scaleY" : "scaleX" : "scale" + b] = B;
                m["translate" + b] = c * p + (M - c * A)
            }
            , pinch: function (a) {
                var t = this
                    , p = t.chart
                    , u = t.pinchDown
                    , f = a.touches
                    , c = f.length
                    , k = t.lastValidTouch
                    , r = t.hasZoom
                    , l = t.selectionMarker
                    , d = {}
                    , b = 1 === c && (t.inClass(a.target, "highcharts-tracker") && p.runTrackerClick || t.runChartClick)
                    , v = {};
                1 < c && (t.initiated = !0);
                r && t.initiated && !b && a.preventDefault();
                m(f, function (a) {
                    return t.normalize(a)
                });
                "touchstart" === a.type ? (E(f, function (a, b) {
                    u[b] = {
                        chartX: a.chartX
                        , chartY: a.chartY
                    }
                }), k.x = [u[0].chartX, u[1] && u[1].chartX], k.y = [u[0].chartY, u[1] && u[1].chartY], E(p.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = p.bounds[a.horiz ? "h" : "v"]
                            , d = a.minPixelPadding
                            , c = a.toPixels(e(a.options.min, a.dataMin))
                            , f = a.toPixels(e(a.options.max, a.dataMax))
                            , l = Math.max(c, f);
                        b.min = Math.min(a.pos, Math.min(c, f) - d);
                        b.max = Math.max(a.pos + a.len, l + d)
                    }
                }), t.res = !0) : t.followTouchMove && 1 === c ? this.runPointActions(t.normalize(a)) : u.length && (l || (t.selectionMarker = l = F({
                    destroy: h
                    , touch: !0
                }, p.plotBox)), t.pinchTranslate(u, f, d, l, v, k), t.hasPinched = r, t.scaleGroups(d, v), t.res && (t.res = !1, this.reset(!1, 0)))
            }
            , touch: function (h, m) {
                var p = this.chart
                    , t, f;
                if (p.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = p.index;
                1 === h.touches.length ? (h = this.normalize(h), (f = p.isInsidePlot(h.chartX - p.plotLeft, h.chartY - p.plotTop)) && !p.openMenu ? (m && this.runPointActions(h), "touchmove" === h.type && (m = this.pinchDown, t = m[0] ? 4 <= Math.sqrt(Math.pow(m[0].chartX - h.chartX, 2) + Math.pow(m[0].chartY - h.chartY, 2)) : !1), e(t, !0) && this.pinch(h)) : m && this.reset()) : 2 === h.touches.length && this.pinch(h)
            }
            , onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }
            , onContainerTouchMove: function (a) {
                this.touch(a)
            }
            , onDocumentTouchEnd: function (e) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(e)
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.charts
            , F = a.css
            , m = a.doc
            , h = a.extend
            , e = a.noop
            , t = a.Pointer
            , x = a.removeEvent
            , p = a.win
            , u = a.wrap;
        if (!a.hasTouch && (p.PointerEvent || p.MSPointerEvent)) {
            var f = {}
                , c = !!p.PointerEvent
                , k = function () {
                    var c = [];
                    c.item = function (a) {
                        return this[a]
                    };
                    a.objectEach(f, function (a) {
                        c.push({
                            pageX: a.pageX
                            , pageY: a.pageY
                            , target: a.target
                        })
                    });
                    return c
                }
                , r = function (c, d, b, f) {
                    "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !E[a.hoverChartIndex] || (f(c), f = E[a.hoverChartIndex].pointer, f[d]({
                        type: b
                        , target: c.currentTarget
                        , preventDefault: e
                        , touches: k()
                    }))
                };
            h(t.prototype, {
                onContainerPointerDown: function (a) {
                    r(a, "onContainerTouchStart", "touchstart", function (a) {
                        f[a.pointerId] = {
                            pageX: a.pageX
                            , pageY: a.pageY
                            , target: a.currentTarget
                        }
                    })
                }
                , onContainerPointerMove: function (a) {
                    r(a, "onContainerTouchMove", "touchmove", function (a) {
                        f[a.pointerId] = {
                            pageX: a.pageX
                            , pageY: a.pageY
                        };
                        f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget)
                    })
                }
                , onDocumentPointerUp: function (a) {
                    r(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete f[a.pointerId]
                    })
                }
                , batchMSEvents: function (a) {
                    a(this.chart.container, c ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, c ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(m, c ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            u(t.prototype, "init", function (a, d, b) {
                a.call(this, d, b);
                this.hasZoom && F(d.container, {
                    "-ms-touch-action": "none"
                    , "touch-action": "none"
                })
            });
            u(t.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            u(t.prototype, "destroy", function (a) {
                this.batchMSEvents(x);
                a.call(this)
            })
        }
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.css
            , F = a.discardElement
            , m = a.defined
            , h = a.each
            , e = a.fireEvent
            , t = a.isFirefox
            , x = a.marginNames
            , p = a.merge
            , u = a.pick
            , f = a.setAnimation
            , c = a.stableSort
            , k = a.win
            , r = a.wrap;
        a.Legend = function (a, d) {
            this.init(a, d)
        };
        a.Legend.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.setOptions(d);
                d.enabled && (this.render(), C(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = C(this.chart, "render", function () {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            }
            , setOptions: function (a) {
                var d = u(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = p(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = d;
                this.initialItemY = d - 5;
                this.symbolWidth = u(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            }
            , update: function (a, d) {
                var b = this.chart;
                this.setOptions(p(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                u(d, !0) && b.redraw();
                e(this, "afterUpdate")
            }
            , colorizeItem: function (a, d) {
                a.legendGroup[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options
                    , c = a.legendItem
                    , f = a.legendLine
                    , l = a.legendSymbol
                    , k = this.itemHiddenStyle.color
                    , b = d ? b.itemStyle.color : k
                    , h = d ? a.color || k : k
                    , r = a.options && a.options.marker
                    , m = {
                        fill: h
                    };
                c && c.css({
                    fill: b
                    , color: b
                });
                f && f.attr({
                    stroke: h
                });
                l && (r && l.isMarker && (m = a.pointAttribs(), d || (m.stroke = m.fill = k)), l.attr(m));
                e(this, "afterColorizeItem", {
                    item: a
                    , visible: d
                })
            }
            , positionItems: function () {
                h(this.allItems, this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            }
            , positionItem: function (a) {
                var d = this.options
                    , b = d.symbolPadding
                    , d = !d.rtl
                    , c = a._legendItemPos
                    , f = c[0]
                    , c = c[1]
                    , l = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[m(a.translateY) ? "animate" : "attr"]({
                    translateX: d ? f : this.legendWidth - f - 2 * b - 4
                    , translateY: c
                });
                l && (l.x = f, l.y = c)
            }
            , destroyItem: function (a) {
                var d = a.checkbox;
                h(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                d && F(a.checkbox)
            }
            , destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                h(this.getAllItems(), function (d) {
                    h(["legendItem", "legendGroup"], a, d)
                });
                h("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            }
            , positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr
                    , d, b = this.clipHeight || this.legendHeight
                    , c = this.titleHeight;
                a && (d = a.translateY, h(this.allItems, function (f) {
                    var l = f.checkbox
                        , e;
                    l && (e = d + c + l.y + (this.scrollOffset || 0) + 3, E(l, {
                        left: a.translateX + f.checkboxOffset + l.x - 20 + "px"
                        , top: e + "px"
                        , display: e > d - 6 && e < d + b - 6 ? "" : "none"
                    }))
                }, this))
            }
            , renderTitle: function () {
                var a = this.options
                    , d = this.padding
                    , b = a.title
                    , c = 0;
                b.text && (this.title || (this.title = this.chart.renderer.label(b.text, d - 3, d - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: c
                }));
                this.titleHeight = c
            }
            , setText: function (c) {
                var d = this.options;
                c.legendItem.attr({
                    text: d.labelFormat ? a.format(d.labelFormat, c, this.chart.time) : d.labelFormatter.call(c)
                })
            }
            , renderItem: function (a) {
                var d = this.chart
                    , b = d.renderer
                    , c = this.options
                    , f = this.symbolWidth
                    , e = c.symbolPadding
                    , k = this.itemStyle
                    , l = this.itemHiddenStyle
                    , h = "horizontal" === c.layout ? u(c.itemDistance, 20) : 0
                    , r = !c.rtl
                    , n = a.legendItem
                    , D = !a.series
                    , A = !D && a.series.drawLegendSymbol ? a.series : a
                    , m = A.options
                    , m = this.createCheckboxForItem && m && m.showCheckbox
                    , h = f + e + h + (m ? 20 : 0)
                    , G = c.useHTML
                    , g = a.options.className;
                n || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + A.type + "-series highcharts-color-" + a.colorIndex + (g ? " " + g : "") + (D ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = n = b.text("", r ? f + e : -e, this.baseline || 0, G).css(p(a.visible ? k : l)).attr({
                    align: r ? "left" : "right"
                    , zIndex: 2
                }).add(a.legendGroup), this.baseline || (f = k.fontSize, this.fontMetrics = b.fontMetrics(f, n), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, n.attr("y", this.baseline)), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, A.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, n, G), m && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                k.width || n.css({
                    width: (c.itemWidth || c.width || d.spacingBox.width) - h
                });
                this.setText(a);
                d = n.getBBox();
                a.itemWidth = a.checkboxOffset = c.itemWidth || a.legendItemWidth || d.width + h;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || d.height || this.symbolHeight)
            }
            , layoutItem: function (a) {
                var c = this.options
                    , b = this.padding
                    , f = "horizontal" === c.layout
                    , e = a.itemHeight
                    , k = c.itemMarginBottom || 0
                    , l = this.itemMarginTop
                    , h = f ? u(c.itemDistance, 20) : 0
                    , r = c.width
                    , m = r || this.chart.spacingBox.width - 2 * b - c.x
                    , c = c.alignColumns && this.totalItemWidth > m ? this.maxItemWidth : a.itemWidth;
                f && this.itemX - b + c > m && (this.itemX = b, this.itemY += l + this.lastLineHeight + k, this.lastLineHeight = 0);
                this.lastItemY = l + this.itemY + k;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                f ? this.itemX += c : (this.itemY += l + e + k, this.lastLineHeight = e);
                this.offsetWidth = r || Math.max((f ? this.itemX - b - (a.checkbox ? 0 : h) : c) + b, this.offsetWidth)
            }
            , getAllItems: function () {
                var a = [];
                h(this.chart.series, function (c) {
                    var b = c && c.options;
                    c && u(b.showInLegend, m(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                e(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            }
            , getAlignment: function () {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            }
            , adjustMargins: function (a, c) {
                var b = this.chart
                    , d = this.options
                    , f = this.getAlignment();
                f && h([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e, k) {
                    e.test(f) && !m(a[k]) && (b[x[k]] = Math.max(b[x[k]], b.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * d[k % 2 ? "x" : "y"] + u(d.margin, 12) + c[k] + (0 === k && void 0 !== b.options.title.margin ? b.titleOffset + b.options.title.margin : 0)))
                })
            }
            , proximatePositions: function () {
                var c = this.chart
                    , d = []
                    , b = "left" === this.options.align;
                h(this.allItems, function (f) {
                    var e, k;
                    e = b;
                    f.xAxis && f.points && (f.xAxis.options.reversed && (e = !e), e = a.find(e ? f.points : f.points.slice(0).reverse(), function (b) {
                        return a.isNumber(b.plotY)
                    }), k = f.legendGroup.getBBox().height, d.push({
                        target: f.visible ? (e ? e.plotY : f.xAxis.height) - .3 * k : c.plotHeight
                        , size: k
                        , item: f
                    }))
                }, this);
                a.distribute(d, c.plotHeight);
                h(d, function (a) {
                    a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos
                })
            }
            , render: function () {
                var a = this.chart
                    , d = a.renderer
                    , b = this.group
                    , f, e, k, r = this.box
                    , m = this.options
                    , B = this.padding;
                this.itemX = B;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                b || (this.group = b = d.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = d.g().attr({
                    zIndex: 1
                }).add(b), this.scrollGroup = d.g().add(this.contentGroup));
                this.renderTitle();
                f = this.getAllItems();
                c(f, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                m.reversed && f.reverse();
                this.allItems = f;
                this.display = e = !!f.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                h(f, this.renderItem, this);
                h(f, this.layoutItem, this);
                f = (m.width || this.offsetWidth) + B;
                k = this.lastItemY + this.lastLineHeight + this.titleHeight;
                k = this.handleOverflow(k);
                k += B;
                r || (this.box = r = d.rect().addClass("highcharts-legend-box").attr({
                    r: m.borderRadius
                }).add(b), r.isNew = !0);
                r.attr({
                    stroke: m.borderColor
                    , "stroke-width": m.borderWidth || 0
                    , fill: m.backgroundColor || "none"
                }).shadow(m.shadow);
                0 < f && 0 < k && (r[r.isNew ? "attr" : "animate"](r.crisp.call({}, {
                    x: 0
                    , y: 0
                    , width: f
                    , height: k
                }, r.strokeWidth())), r.isNew = !1);
                r[e ? "show" : "hide"]();
                this.legendWidth = f;
                this.legendHeight = k;
                e && (d = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (d = p(d, {
                    y: d.y + a.titleOffset + a.options.title.margin
                })), b.align(p(m, {
                    width: f
                    , height: k
                    , verticalAlign: this.proximate ? "top" : m.verticalAlign
                }), !0, d));
                this.proximate || this.positionItems()
            }
            , handleOverflow: function (a) {
                var c = this
                    , b = this.chart
                    , f = b.renderer
                    , e = this.options
                    , k = e.y
                    , l = this.padding
                    , b = b.spacingBox.height + ("top" === e.verticalAlign ? -k : k) - l
                    , k = e.maxHeight
                    , r, m = this.clipRect
                    , p = e.navigation
                    , n = u(p.animation, !0)
                    , D = p.arrowSize || 12
                    , A = this.nav
                    , t = this.pages
                    , G, g = this.allItems
                    , y = function (a) {
                        "number" === typeof a ? m.attr({
                            height: a
                        }) : m && (c.clipRect = m.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + l + "px,9999px," + (l + a) + "px,0)" : "auto")
                    };
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (b /= 2);
                k && (b = Math.min(b, k));
                t.length = 0;
                a > b && !1 !== p.enabled ? (this.clipHeight = r = Math.max(b - 20 - this.titleHeight - l, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = a, h(g, function (a, b) {
                    var c = a._legendItemPos[1]
                        , d = Math.round(a.legendItem.getBBox().height)
                        , f = t.length;
                    if (!f || c - t[f - 1] > r && (G || c) !== t[f - 1]) t.push(G || c), f++;
                    a.pageIx = f - 1;
                    G && (g[b - 1].pageIx = f - 1);
                    b === g.length - 1 && c + d - t[f - 1] > r && (t.push(c), a.pageIx = f);
                    c !== G && (G = c)
                }), m || (m = c.clipRect = f.clipRect(0, l, 9999, 0), c.contentGroup.clip(m)), y(r), A || (this.nav = A = f.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = f.symbol("triangle", 0, 0, D, D).on("click", function () {
                    c.scroll(-1, n)
                }).add(A), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation").css(p.style).add(A), this.down = f.symbol("triangle-down", 0, 0, D, D).on("click", function () {
                    c.scroll(1, n)
                }).add(A)), c.scroll(0), a = b) : A && (y(), this.nav = A.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            }
            , scroll: function (a, c) {
                var b = this.pages
                    , d = b.length;
                a = this.currentPage + a;
                var e = this.clipHeight
                    , k = this.options.navigation
                    , l = this.pager
                    , h = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== c && f(c, this.chart), this.nav.attr({
                    translateX: h
                    , translateY: e + this.padding + 7 + this.titleHeight
                    , visibility: "visible"
                }), this.up.attr({
                    "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), l.attr({
                    text: a + "/" + d
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width
                    , "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({
                    fill: 1 === a ? k.inactiveColor : k.activeColor
                }).css({
                    cursor: 1 === a ? "default" : "pointer"
                }), this.down.attr({
                    fill: a === d ? k.inactiveColor : k.activeColor
                }).css({
                    cursor: a === d ? "default" : "pointer"
                }), this.scrollOffset = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, c) {
                var b = a.symbolHeight
                    , d = a.options.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(d ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, d ? b : a.symbolWidth, b, u(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(c.legendGroup)
            }
            , drawLineMarker: function (a) {
                var c = this.options
                    , b = c.marker
                    , f = a.symbolWidth
                    , e = a.symbolHeight
                    , k = e / 2
                    , h = this.chart.renderer
                    , l = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var r;
                r = {
                    "stroke-width": c.lineWidth || 0
                };
                c.dashStyle && (r.dashstyle = c.dashStyle);
                this.legendLine = h.path(["M", 0, a, "L", f, a]).addClass("highcharts-graph").attr(r).add(l);
                b && !1 !== b.enabled && f && (c = Math.min(u(b.radius, k), k), 0 === this.symbol.indexOf("url") && (b = p(b, {
                    width: e
                    , height: e
                }), c = 0), this.legendSymbol = b = h.symbol(this.symbol, f / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(l), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(k.navigator.userAgent) || t) && r(a.Legend.prototype, "positionItem", function (a, c) {
            var b = this
                , d = function () {
                    c._legendItemPos && a.call(b, c)
                };
            d();
            setTimeout(d)
        })
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.animate
            , F = a.animObject
            , m = a.attr
            , h = a.doc
            , e = a.Axis
            , t = a.createElement
            , x = a.defaultOptions
            , p = a.discardElement
            , u = a.charts
            , f = a.css
            , c = a.defined
            , k = a.each
            , r = a.extend
            , l = a.find
            , d = a.fireEvent
            , b = a.grep
            , v = a.isNumber
            , q = a.isObject
            , I = a.isString
            , w = a.Legend
            , L = a.marginNames
            , B = a.merge
            , H = a.objectEach
            , n = a.Pointer
            , D = a.pick
            , A = a.pInt
            , M = a.removeEvent
            , G = a.seriesTypes
            , g = a.splat
            , y = a.syncTimeout
            , Q = a.win
            , N = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new N(a, b, c)
        };
        r(N.prototype, {
            callbacks: []
            , getArgs: function () {
                var a = [].slice.call(arguments);
                if (I(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            }
            , init: function (b, c) {
                var g, f, n = b.series
                    , e = b.plotOptions || {};
                d(this, "init", {
                    args: arguments
                }, function () {
                    b.series = null;
                    g = B(x, b);
                    for (f in g.plotOptions) g.plotOptions[f].tooltip = e[f] && B(e[f].tooltip) || void 0;
                    g.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    g.series = b.series = n;
                    this.userOptions = b;
                    var k = g.chart
                        , h = k.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {}
                        , v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = c;
                    this.isResizing = 0;
                    this.options = g;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && a.keys(b.time).length ? new a.Time(b.time) : a.time;
                    this.hasCartesianSeries = k.showAxes;
                    var l = this;
                    l.index = u.length;
                    u.push(l);
                    a.chartCount++;
                    h && H(h, function (a, b) {
                        C(l, b, a)
                    });
                    l.xAxis = [];
                    l.yAxis = [];
                    l.pointCount = l.colorCounter = l.symbolCounter = 0;
                    d(l, "afterInit");
                    l.firstRender()
                })
            }
            , initSeries: function (b) {
                var c = this.options.chart;
                (c = G[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            }
            , orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            }
            , isInsidePlot: function (a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }
            , redraw: function (b) {
                d(this, "beforeRedraw");
                var c = this.axes
                    , g = this.series
                    , f = this.pointer
                    , n = this.legend
                    , e = this.userOptions.legend
                    , h = this.isDirtyLegend
                    , l, A, D = this.hasCartesianSeries
                    , y = this.isDirtyBox
                    , q, w = this.renderer
                    , m = w.isHidden()
                    , G = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                m && this.temporaryDisplay();
                this.layOutTitles();
                for (b = g.length; b--;)
                    if (q = g[b], q.options.stacking && (l = !0, q.isDirty)) {
                        A = !0;
                        break
                    }
                if (A)
                    for (b = g.length; b--;) q = g[b], q.options.stacking && (q.isDirty = !0);
                k(g, function (a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), h = !0) : e && (e.labelFormatter || e.labelFormat) && (h = !0));
                    a.isDirtyData && d(a, "updatedData")
                });
                h && n && n.options.enabled && (n.render(), this.isDirtyLegend = !1);
                l && this.getStacks();
                D && k(c, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                D && (k(c, function (a) {
                    a.isDirty && (y = !0)
                }), k(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, G.push(function () {
                        d(a, "afterSetExtremes", r(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (y || l) && a.redraw()
                }));
                y && this.drawChartBox();
                d(this, "predraw");
                k(g, function (a) {
                    (y || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                f && f.reset(!0);
                w.draw();
                d(this, "redraw");
                d(this, "render");
                m && this.temporaryDisplay(!0);
                k(G, function (a) {
                    a.call()
                })
            }
            , get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                var c, d = this.series
                    , g;
                c = l(this.axes, b) || l(this.series, b);
                for (g = 0; !c && g < d.length; g++) c = l(d[g].points || [], b);
                return c
            }
            , getAxes: function () {
                var a = this
                    , b = this.options
                    , c = b.xAxis = g(b.xAxis || {})
                    , b = b.yAxis = g(b.yAxis || {});
                d(this, "getAxes");
                k(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                k(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                k(c, function (b) {
                    new e(a, b)
                });
                d(this, "afterGetAxes")
            }
            , getSelectedPoints: function () {
                var a = [];
                k(this.series, function (c) {
                    a = a.concat(b(c.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }
            , getSelectedSeries: function () {
                return b(this.series, function (a) {
                    return a.selected
                })
            }
            , setTitle: function (a, b, c) {
                var d = this
                    , g = d.options
                    , f;
                f = g.title = B({
                    style: {
                        color: "#333333"
                        , fontSize: g.isStock ? "16px" : "18px"
                    }
                }, g.title, a);
                g = g.subtitle = B({
                    style: {
                        color: "#666666"
                    }
                }, g.subtitle, b);
                k([["title", a, f], ["subtitle", b, g]], function (a, b) {
                    var c = a[0]
                        , g = d[c]
                        , f = a[1];
                    a = a[2];
                    g && f && (d[c] = g = g.destroy());
                    a && !g && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align
                        , "class": "highcharts-" + c
                        , zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    }, d[c].css(a.style))
                });
                d.layOutTitles(c)
            }
            , layOutTitles: function (a) {
                var b = 0
                    , c, d = this.renderer
                    , g = this.spacingBox;
                k(["title", "subtitle"], function (a) {
                    var c = this[a]
                        , f = this.options[a];
                    a = "title" === a ? -3 : f.verticalAlign ? 0 : b + 2;
                    var n;
                    c && (n = f.style.fontSize, n = d.fontMetrics(n, c).b, c.css({
                        width: (f.width || g.width + f.widthAdjust) + "px"
                    }).align(r({
                        y: a + n
                    }, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = Math.ceil(b + c.getBBox(f.useHTML).height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && D(a, !0) && this.isDirtyBox && this.redraw())
            }
            , getChartSize: function () {
                var b = this.options.chart
                    , d = b.width
                    , b = b.height
                    , g = this.renderTo;
                c(d) || (this.containerWidth = a.getStyle(g, "width"));
                c(b) || (this.containerHeight = a.getStyle(g, "height"));
                this.chartWidth = Math.max(0, d || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            }
            , temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (h.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        h.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, h.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display
                            , height: c.style.height
                            , overflow: c.style.overflow
                        }, b = {
                            display: "block"
                            , overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === h.body) break
                    }
            }
            , setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }
            , getContainer: function () {
                var b, c = this.options
                    , g = c.chart
                    , f, n;
                b = this.renderTo;
                var e = a.uniqueKey()
                    , k;
                b || (this.renderTo = b = g.renderTo);
                I(b) && (this.renderTo = b = h.getElementById(b));
                b || a.error(13, !0);
                f = A(m(b, "data-highcharts-chart"));
                v(f) && u[f] && u[f].hasRendered && u[f].destroy();
                m(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                g.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                f = this.chartWidth;
                n = this.chartHeight;
                k = r({
                    position: "relative"
                    , overflow: "hidden"
                    , width: f + "px"
                    , height: n + "px"
                    , textAlign: "left"
                    , lineHeight: "normal"
                    , zIndex: 0
                    , "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, g.style);
                this.container = b = t("div", {
                    id: e
                }, k, b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[g.renderer] || a.Renderer)(b, f, n, null, g.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(g.className);
                this.renderer.setStyle(g.style);
                this.renderer.chartIndex = this.index;
                d(this, "afterGetContainer")
            }
            , getMargins: function (a) {
                var b = this.spacing
                    , g = this.margin
                    , f = this.titleOffset;
                this.resetMargins();
                f && !c(g[0]) && (this.plotTop = Math.max(this.plotTop, f + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(g, b);
                d(this, "getMargins");
                a || this.getAxisMargins()
            }
            , getAxisMargins: function () {
                var a = this
                    , b = a.axisOffset = [0, 0, 0, 0]
                    , d = a.margin;
                a.hasCartesianSeries && k(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                k(L, function (g, f) {
                    c(d[f]) || (a[g] += b[f])
                });
                a.setChartSize()
            }
            , reflow: function (b) {
                var d = this
                    , g = d.options.chart
                    , f = d.renderTo
                    , n = c(g.width) && c(g.height)
                    , e = g.width || a.getStyle(f, "width")
                    , g = g.height || a.getStyle(f, "height")
                    , f = b ? b.target : Q;
                if (!n && !d.isPrinting && e && g && (f === Q || f === h)) {
                    if (e !== d.containerWidth || g !== d.containerHeight) a.clearTimeout(d.reflowTimeout), d.reflowTimeout = y(function () {
                        d.container && d.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    d.containerWidth = e;
                    d.containerHeight = g
                }
            }
            , setReflow: function (a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = C(Q, "resize", function (a) {
                    b.reflow(a)
                }), C(this, "destroy", this.unbindReflow))
            }
            , setSize: function (b, c, g) {
                var n = this
                    , e = n.renderer;
                n.isResizing += 1;
                a.setAnimation(g, n);
                n.oldChartHeight = n.chartHeight;
                n.oldChartWidth = n.chartWidth;
                void 0 !== b && (n.options.chart.width = b);
                void 0 !== c && (n.options.chart.height = c);
                n.getChartSize();
                b = e.globalAnimation;
                (b ? E : f)(n.container, {
                    width: n.chartWidth + "px"
                    , height: n.chartHeight + "px"
                }, b);
                n.setChartSize(!0);
                e.setSize(n.chartWidth, n.chartHeight, g);
                k(n.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                n.isDirtyLegend = !0;
                n.isDirtyBox = !0;
                n.layOutTitles();
                n.getMargins();
                n.redraw(g);
                n.oldChartHeight = null;
                d(n, "resize");
                y(function () {
                    n && d(n, "endResize", null, function () {
                        --n.isResizing
                    })
                }, F(b).duration)
            }
            , setChartSize: function (a) {
                var b = this.inverted
                    , c = this.renderer
                    , g = this.chartWidth
                    , f = this.chartHeight
                    , n = this.options.chart
                    , e = this.spacing
                    , h = this.clipOffset
                    , l, A, D, r;
                this.plotLeft = l = Math.round(this.plotLeft);
                this.plotTop = A = Math.round(this.plotTop);
                this.plotWidth = D = Math.max(0, Math.round(g - l - this.marginRight));
                this.plotHeight = r = Math.max(0, Math.round(f - A - this.marginBottom));
                this.plotSizeX = b ? r : D;
                this.plotSizeY = b ? D : r;
                this.plotBorderWidth = n.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: e[3]
                    , y: e[0]
                    , width: g - e[3] - e[1]
                    , height: f - e[0] - e[2]
                };
                this.plotBox = c.plotBox = {
                    x: l
                    , y: A
                    , width: D
                    , height: r
                };
                g = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(g, h[3]) / 2);
                c = Math.ceil(Math.max(g, h[0]) / 2);
                this.clipBox = {
                    x: b
                    , y: c
                    , width: Math.floor(this.plotSizeX - Math.max(g, h[1]) / 2 - b)
                    , height: Math.max(0, Math.floor(this.plotSizeY - Math.max(g, h[2]) / 2 - c))
                };
                a || k(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                d(this, "afterSetChartSize", {
                    skipAxes: a
                })
            }
            , resetMargins: function () {
                var a = this
                    , b = a.options.chart;
                k(["margin", "spacing"], function (c) {
                    var d = b[c]
                        , g = q(d) ? d : [d, d, d, d];
                    k(["Top", "Right", "Bottom", "Left"], function (d, f) {
                        a[c][f] = D(b[c + d], g[f])
                    })
                });
                k(L, function (b, c) {
                    a[b] = D(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }
            , drawChartBox: function () {
                var a = this.options.chart
                    , b = this.renderer
                    , c = this.chartWidth
                    , g = this.chartHeight
                    , f = this.chartBackground
                    , n = this.plotBackground
                    , e = this.plotBorder
                    , k, h = this.plotBGImage
                    , l = a.backgroundColor
                    , A = a.plotBackgroundColor
                    , D = a.plotBackgroundImage
                    , r, y = this.plotLeft
                    , q = this.plotTop
                    , w = this.plotWidth
                    , m = this.plotHeight
                    , G = this.plotBox
                    , B = this.clipRect
                    , v = this.clipBox
                    , p = "animate";
                f || (this.chartBackground = f = b.rect().addClass("highcharts-background").add(), p = "attr");
                k = a.borderWidth || 0;
                r = k + (a.shadow ? 8 : 0);
                l = {
                    fill: l || "none"
                };
                if (k || f["stroke-width"]) l.stroke = a.borderColor, l["stroke-width"] = k;
                f.attr(l).shadow(a.shadow);
                f[p]({
                    x: r / 2
                    , y: r / 2
                    , width: c - r - k % 2
                    , height: g - r - k % 2
                    , r: a.borderRadius
                });
                p = "animate";
                n || (p = "attr", this.plotBackground = n = b.rect().addClass("highcharts-plot-background").add());
                n[p](G);
                n.attr({
                    fill: A || "none"
                }).shadow(a.plotShadow);
                D && (h ? h.animate(G) : this.plotBGImage = b.image(D, y, q, w, m).add());
                B ? B.animate({
                    width: v.width
                    , height: v.height
                }) : this.clipRect = b.clipRect(v);
                p = "animate";
                e || (p = "attr", this.plotBorder = e = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                e.attr({
                    stroke: a.plotBorderColor
                    , "stroke-width": a.plotBorderWidth || 0
                    , fill: "none"
                });
                e[p](e.crisp({
                    x: y
                    , y: q
                    , width: w
                    , height: m
                }, -e.strokeWidth()));
                this.isDirtyBox = !1;
                d(this, "afterDrawChartBox")
            }
            , propFromSeries: function () {
                var a = this
                    , b = a.options.chart
                    , c, d = a.options.series
                    , g, f;
                k(["inverted", "angular", "polar"], function (n) {
                    c = G[b.type || b.defaultSeriesType];
                    f = b[n] || c && c.prototype[n];
                    for (g = d && d.length; !f && g--;)(c = G[d[g].type]) && c.prototype[n] && (f = !0);
                    a[n] = f
                })
            }
            , linkSeries: function () {
                var a = this
                    , b = a.series;
                k(b, function (a) {
                    a.linkedSeries.length = 0
                });
                k(b, function (b) {
                    var c = b.options.linkedTo;
                    I(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = D(b.options.visible, c.options.visible, b.visible))
                });
                d(this, "afterLinkSeries")
            }
            , renderSeries: function () {
                k(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            }
            , renderLabels: function () {
                var a = this
                    , b = a.options.labels;
                b.items && k(b.items, function (c) {
                    var d = r(b.style, c.style)
                        , g = A(d.left) + a.plotLeft
                        , f = A(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, g, f).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            }
            , render: function () {
                var a = this.axes
                    , b = this.renderer
                    , c = this.options
                    , d, g, f;
                this.setTitle();
                this.legend = new w(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                k(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                g = 1.1 < c / this.plotWidth;
                f = 1.05 < d / this.plotHeight;
                if (g || f) k(a, function (a) {
                    (a.horiz && g || !a.horiz && f) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && k(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }
            , addCredits: function (a) {
                var b = this;
                a = B(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (Q.location.href = a.href)
                }).attr({
                    align: a.position.align
                    , zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            }
            , destroy: function () {
                var b = this
                    , c = b.axes
                    , g = b.series
                    , f = b.container
                    , n, e = f && f.parentNode;
                d(b, "destroy");
                b.renderer.forExport ? a.erase(u, b) : u[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                M(b);
                for (n = c.length; n--;) c[n] = c[n].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (n = g.length; n--;) g[n] = g[n].destroy();
                k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                f && (f.innerHTML = "", M(f), e && p(f));
                H(b, function (a, c) {
                    delete b[c]
                })
            }
            , firstRender: function () {
                var a = this
                    , b = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    k(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    d(a, "beforeRender");
                    n && (a.pointer = new n(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            }
            , onload: function () {
                k([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                d(this, "load");
                d(this, "render");
                c(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.Chart
            , F = a.each;
        C(E, "afterSetChartSize", function (m) {
            var h = this.options.chart.scrollablePlotArea;
            (h = h && h.minWidth) && !this.renderer.forExport && (this.scrollablePixels = h = Math.max(0, h - this.chartWidth)) && (this.plotWidth += h, this.clipBox.width += h, m.skipAxes || F(this.axes, function (e) {
                1 === e.side ? e.getPlotLinePath = function () {
                    var h = this.right
                        , m;
                    this.right = h - e.chart.scrollablePixels;
                    m = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                    this.right = h;
                    return m
                } : (e.setAxisSize(), e.setAxisTranslation())
            }))
        });
        C(E, "render", function () {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        E.prototype.setUpScrolling = function () {
            this.scrollingContainer = a.createElement("div", {
                className: "highcharts-scrolling"
            }, {
                overflowX: "auto"
                , WebkitOverflowScrolling: "touch"
            }, this.renderTo);
            this.innerContainer = a.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        E.prototype.applyFixed = function () {
            var m = this.container
                , h, e, t = !this.fixedDiv;
            t && (this.fixedDiv = a.createElement("div", {
                className: "highcharts-fixed"
            }, {
                position: "absolute"
                , overflow: "hidden"
                , pointerEvents: "none"
                , zIndex: 2
            }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.fixedRenderer = h = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = h.path().attr({
                fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get()
                , zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), a.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"], function (e) {
                a.each(m.querySelectorAll(e), function (a) {
                    (a.namespaceURI === h.SVG_NS ? h.box : h.box.parentNode).appendChild(a);
                    a.style.pointerEvents = "auto"
                })
            }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            e = this.chartWidth + this.scrollablePixels;
            a.stop(this.container);
            this.container.style.width = e + "px";
            this.renderer.boxWrapper.attr({
                width: e
                , height: this.chartHeight
                , viewBox: [0, 0, e, this.chartHeight].join(" ")
            });
            this.chartBackground.attr({
                width: e
            });
            t && (e = this.options.chart.scrollablePlotArea, e.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * e.scrollPositionX));
            t = this.axisOffset;
            e = this.plotTop - t[0] - 1;
            var t = this.plotTop + this.plotHeight + t[2]
                , x = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({
                d: this.scrollablePixels ? ["M", 0, e, "L", this.plotLeft - 1, e, "L", this.plotLeft - 1, t, "L", 0, t, "Z", "M", x, e, "L", this.chartWidth, e, "L", this.chartWidth, t, "L", x, t, "Z"] : ["M", 0, 0]
            })
        }
    })(K);
    (function (a) {
        var C, E = a.each
            , F = a.extend
            , m = a.erase
            , h = a.fireEvent
            , e = a.format
            , t = a.isArray
            , x = a.isNumber
            , p = a.pick
            , u = a.removeEvent;
        a.Point = C = function () {};
        a.Point.prototype = {
            init: function (a, c, e) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(c, e);
                a.options.colorByPoint ? (c = a.options.colors || a.chart.options.colors, this.color = this.color || c[a.colorCounter], c = c.length, e = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : e = a.colorIndex;
                this.colorIndex = p(this.colorIndex, e);
                a.chart.pointCount++;
                h(this, "afterInit");
                return this
            }
            , applyOptions: function (a, c) {
                var f = this.series
                    , e = f.options.pointValKey || f.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                e && (this.y = this[e]);
                this.isNull = p(this.isValid && !this.isValid(), null === this.x || !x(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
                void 0 === this.x && f && (this.x = void 0 === c ? f.autoIncrement(this) : c);
                return this
            }
            , setNestedProperty: function (f, c, e) {
                e = e.split(".");
                a.reduce(e, function (f, e, d, b) {
                    f[e] = b.length - 1 === d ? c : a.isObject(f[e], !0) ? f[e] : {};
                    return f[e]
                }, f);
                return f
            }
            , optionsToObject: function (f) {
                var c = {}
                    , e = this.series
                    , h = e.options.keys
                    , l = h || e.pointArrayMap || ["y"]
                    , d = l.length
                    , b = 0
                    , m = 0;
                if (x(f) || null === f) c[l[0]] = f;
                else if (t(f))
                    for (!h && f.length > d && (e = typeof f[0], "string" === e ? c.name = f[0] : "number" === e && (c.x = f[0]), b++); m < d;) h && void 0 === f[b] || (0 < l[m].indexOf(".") ? a.Point.prototype.setNestedProperty(c, f[b], l[m]) : c[l[m]] = f[b]), b++, m++;
                else "object" === typeof f && (c = f, f.dataLabels && (e._hasPointLabels = !0), f.marker && (e._hasPointMarkers = !0));
                return c
            }
            , getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            }
            , getZone: function () {
                var a = this.series
                    , c = a.zones
                    , a = a.zoneAxis || "y"
                    , e = 0
                    , h;
                for (h = c[e]; this[a] >= h.value;) h = c[++e];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = h && h.color && !this.options.color ? h.color : this.nonZonedColor;
                return h
            }
            , destroy: function () {
                var a = this.series.chart
                    , c = a.hoverPoints
                    , e;
                a.pointCount--;
                c && (this.setState(), m(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) u(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (e in this) this[e] = null
            }
            , destroyElements: function () {
                for (var a = ["graphic", "dataLabel"
, "dataLabelUpper", "connector", "shadowGroup"], c, e = 6; e--;) c = a[e], this[c] && (this[c] = this[c].destroy())
            }
            , getLabelConfig: function () {
                return {
                    x: this.category
                    , y: this.y
                    , color: this.color
                    , colorIndex: this.colorIndex
                    , key: this.name || this.category
                    , series: this.series
                    , point: this
                    , percentage: this.percentage
                    , total: this.total || this.stackTotal
                }
            }
            , tooltipFormatter: function (a) {
                var c = this.series
                    , f = c.tooltipOptions
                    , h = p(f.valueDecimals, "")
                    , l = f.valuePrefix || ""
                    , d = f.valueSuffix || "";
                E(c.pointArrayMap || ["y"], function (b) {
                    b = "{point." + b;
                    if (l || d) a = a.replace(RegExp(b + "}", "g"), l + b + "}" + d);
                    a = a.replace(RegExp(b + "}", "g"), b + ":,." + h + "f}")
                });
                return e(a, {
                    point: this
                    , series: this.series
                }, c.chart.time)
            }
            , firePointEvent: function (a, c, e) {
                var f = this
                    , k = this.series.options;
                (k.point.events[a] || f.options && f.options.events && f.options.events[a]) && this.importEvents();
                "click" === a && k.allowPointSelect && (e = function (a) {
                    f.select && f.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                h(this, a, c, e)
            }
            , visible: !0
        }
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.animObject
            , F = a.arrayMax
            , m = a.arrayMin
            , h = a.correctFloat
            , e = a.defaultOptions
            , t = a.defaultPlotOptions
            , x = a.defined
            , p = a.each
            , u = a.erase
            , f = a.extend
            , c = a.fireEvent
            , k = a.grep
            , r = a.isArray
            , l = a.isNumber
            , d = a.isString
            , b = a.merge
            , v = a.objectEach
            , q = a.pick
            , I = a.removeEvent
            , w = a.splat
            , L = a.SVGElement
            , B = a.syncTimeout
            , H = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2
            , allowPointSelect: !1
            , showCheckbox: !1
            , animation: {
                duration: 1E3
            }
            , events: {}
            , marker: {
                lineWidth: 0
                , lineColor: "#ffffff"
                , enabledThreshold: 2
                , radius: 4
                , states: {
                    normal: {
                        animation: !0
                    }
                    , hover: {
                        animation: {
                            duration: 50
                        }
                        , enabled: !0
                        , radiusPlus: 2
                        , lineWidthPlus: 1
                    }
                    , select: {
                        fillColor: "#cccccc"
                        , lineColor: "#fff"
                        , lineWidth: 2
                    }
                }
            }
            , point: {
                events: {}
            }
            , dataLabels: {
                align: "center"
                , formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                }
                , style: {
                    fontSize: "11px"
                    , fontWeight: "bold"
                    , color: "contrast"
                    , textOutline: "1px contrast"
                }
                , verticalAlign: "bottom"
                , x: 0
                , y: 0
                , padding: 5
            }
            , cropThreshold: 300
            , pointRange: 0
            , softThreshold: !0
            , states: {
                normal: {
                    animation: !0
                }
                , hover: {
                    animation: {
                        duration: 50
                    }
                    , lineWidthPlus: 1
                    , marker: {}
                    , halo: {
                        size: 10
                        , opacity: .25
                    }
                }
                , select: {}
            }
            , stickyTracking: !0
            , turboThreshold: 1E3
            , findNearestPointBy: "x"
        }, {
            isCartesian: !0
            , pointClass: a.Point
            , sorted: !0
            , requireSorting: !0
            , directTouch: !1
            , axisTypes: ["xAxis", "yAxis"]
            , colorCounter: 0
            , parallelArrays: ["x", "y"]
            , coll: "series"
            , init: function (a, b) {
                var d = this
                    , n, e = a.series
                    , g;
                d.chart = a;
                d.options = b = d.setOptions(b);
                d.linkedSeries = [];
                d.bindAxes();
                f(d, {
                    name: b.name
                    , state: ""
                    , visible: !1 !== b.visible
                    , selected: !0 === b.selected
                });
                n = b.events;
                v(n, function (a, b) {
                    C(d, b, a)
                });
                if (n && n.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                p(d.parallelArrays, function (a) {
                    d[a + "Data"] = []
                });
                d.setData(b.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                e.length && (g = e[e.length - 1]);
                d._i = q(g && g._i, -1) + 1;
                a.orderSeries(this.insert(e));
                c(this, "afterInit")
            }
            , insert: function (a) {
                var b = this.options.index
                    , c;
                if (l(b)) {
                    for (c = a.length; c--;)
                        if (b >= q(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                }
                else a.push(this);
                return q(c, a.length - 1)
            }
            , bindAxes: function () {
                var b = this
                    , c = b.options
                    , d = b.chart
                    , f;
                p(b.axisTypes || [], function (n) {
                    p(d[n], function (a) {
                        f = a.options;
                        if (c[n] === f.index || void 0 !== c[n] && c[n] === f.id || void 0 === c[n] && 0 === f.index) b.insert(a.series), b[n] = a, a.isDirty = !0
                    });
                    b[n] || b.optionalAxis === n || a.error(18, !0)
                })
            }
            , updateParallelArrays: function (a, b) {
                var c = a.series
                    , d = arguments
                    , f = l(b) ? function (d) {
                        var g = "y" === d && c.toYData ? c.toYData(a) : a[d];
                        c[d + "Data"][b] = g
                    } : function (a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                p(c.parallelArrays, f)
            }
            , autoIncrement: function () {
                var a = this.options
                    , b = this.xIncrement
                    , c, d = a.pointIntervalUnit
                    , f = this.chart.time
                    , b = q(b, a.pointStart, 0);
                this.pointInterval = c = q(this.pointInterval, a.pointInterval, 1);
                d && (a = new f.Date(b), "day" === d ? f.set("Date", a, f.get("Date", a) + c) : "month" === d ? f.set("Month", a, f.get("Month", a) + c) : "year" === d && f.set("FullYear", a, f.get("FullYear", a) + c), c = a.getTime() - b);
                this.xIncrement = b + c;
                return b
            }
            , setOptions: function (a) {
                var d = this.chart
                    , f = d.options
                    , n = f.plotOptions
                    , k = (d.userOptions || {}).plotOptions || {}
                    , g = n[this.type];
                this.userOptions = a;
                d = b(g, n.series, a);
                this.tooltipOptions = b(e.tooltip, e.plotOptions.series && e.plotOptions.series.tooltip, e.plotOptions[this.type].tooltip, f.tooltip.userOptions, n.series && n.series.tooltip, n[this.type].tooltip, a.tooltip);
                this.stickyTracking = q(a.stickyTracking, k[this.type] && k[this.type].stickyTracking, k.series && k.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : d.stickyTracking);
                null === g.marker && delete d.marker;
                this.zoneAxis = d.zoneAxis;
                a = this.zones = (d.zones || []).slice();
                !d.negativeColor && !d.negativeFillColor || d.zones || a.push({
                    value: d[this.zoneAxis + "Threshold"] || d.threshold || 0
                    , className: "highcharts-negative"
                    , color: d.negativeColor
                    , fillColor: d.negativeFillColor
                });
                a.length && x(a[a.length - 1].value) && a.push({
                    color: this.color
                    , fillColor: this.fillColor
                });
                c(this, "afterSetOptions", {
                    options: d
                });
                return d
            }
            , getName: function () {
                return this.name || "Series " + (this.index + 1)
            }
            , getCyclic: function (a, b, c) {
                var d, f = this.chart
                    , g = this.userOptions
                    , n = a + "Index"
                    , e = a + "Counter"
                    , k = c ? c.length : q(f.options.chart[a + "Count"], f[a + "Count"]);
                b || (d = q(g[n], g["_" + n]), x(d) || (f.series.length || (f[e] = 0), g["_" + n] = d = f[e] % k, f[e] += 1), c && (b = c[d]));
                void 0 !== d && (this[n] = d);
                this[a] = b
            }
            , getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
            }
            , getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            }
            , drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker
            , updateData: function (b) {
                var c = this.options
                    , d = this.points
                    , f = []
                    , n, g, e, k = this.requireSorting;
                p(b, function (b) {
                    var g;
                    g = a.defined(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b).x;
                    l(g) && (g = a.inArray(g, this.xData, e), -1 === g || d[g].touched ? f.push(b) : b !== c.data[g] ? (d[g].update(b, !1, null, !1), d[g].touched = !0, k && (e = g + 1)) : d[g] && (d[g].touched = !0), n = !0)
                }, this);
                if (n)
                    for (b = d.length; b--;) g = d[b], g.touched || g.remove(!1), g.touched = !1;
                else if (b.length === d.length) p(b, function (a, b) {
                    d[b].update && a !== c.data[b] && d[b].update(a, !1, null, !1)
                });
                else return !1;
                p(f, function (a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            }
            , setData: function (b, c, f, e) {
                var n = this
                    , g = n.points
                    , k = g && g.length || 0
                    , h, A = n.options
                    , D = n.chart
                    , m = null
                    , w = n.xAxis
                    , B = A.turboThreshold
                    , v = this.xData
                    , t = this.yData
                    , u = (h = n.pointArrayMap) && h.length
                    , H;
                b = b || [];
                h = b.length;
                c = q(c, !0);
                !1 !== e && h && k && !n.cropped && !n.hasGroupedData && n.visible && !n.isSeriesBoosting && (H = this.updateData(b));
                if (!H) {
                    n.xIncrement = null;
                    n.colorCounter = 0;
                    p(this.parallelArrays, function (a) {
                        n[a + "Data"].length = 0
                    });
                    if (B && h > B) {
                        for (f = 0; null === m && f < h;) m = b[f], f++;
                        if (l(m))
                            for (f = 0; f < h; f++) v[f] = this.autoIncrement(), t[f] = b[f];
                        else if (r(m))
                            if (u)
                                for (f = 0; f < h; f++) m = b[f], v[f] = m[0], t[f] = m.slice(1, u + 1);
                            else
                                for (f = 0; f < h; f++) m = b[f], v[f] = m[0], t[f] = m[1];
                        else a.error(12)
                    }
                    else
                        for (f = 0; f < h; f++) void 0 !== b[f] && (m = {
                            series: n
                        }, n.pointClass.prototype.applyOptions.apply(m, [b[f]]), n.updateParallelArrays(m, f));
                    t && d(t[0]) && a.error(14, !0);
                    n.data = [];
                    n.options.data = n.userOptions.data = b;
                    for (f = k; f--;) g[f] && g[f].destroy && g[f].destroy();
                    w && (w.minRange = w.userMinRange);
                    n.isDirty = D.isDirtyBox = !0;
                    n.isDirtyData = !!g;
                    f = !1
                }
                "point" === A.legendType && (this.processData(), this.generatePoints());
                c && D.redraw(f)
            }
            , processData: function (b) {
                var c = this.xData
                    , d = this.yData
                    , f = c.length
                    , n;
                n = 0;
                var g, e, k = this.xAxis
                    , h, l = this.options;
                h = l.cropThreshold;
                var r = this.getExtremesFromAll || l.getExtremesFromAll
                    , m = this.isCartesian
                    , l = k && k.val2lin
                    , q = k && k.isLog
                    , w = this.requireSorting
                    , B, p;
                if (m && !this.isDirty && !k.isDirty && !this.yAxis.isDirty && !b) return !1;
                k && (b = k.getExtremes(), B = b.min, p = b.max);
                m && this.sorted && !r && (!h || f > h || this.forceCrop) && (c[f - 1] < B || c[0] > p ? (c = [], d = []) : this.yData && (c[0] < B || c[f - 1] > p) && (n = this.cropData(this.xData, this.yData, B, p), c = n.xData, d = n.yData, n = n.start, g = !0));
                for (h = c.length || 1; --h;) f = q ? l(c[h]) - l(c[h - 1]) : c[h] - c[h - 1], 0 < f && (void 0 === e || f < e) ? e = f : 0 > f && w && (a.error(15), w = !1);
                this.cropped = g;
                this.cropStart = n;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = e
            }
            , cropData: function (a, b, c, d, f) {
                var g = a.length
                    , n = 0
                    , e = g
                    , k;
                f = q(f, this.cropShoulder, 1);
                for (k = 0; k < g; k++)
                    if (a[k] >= c) {
                        n = Math.max(0, k - f);
                        break
                    }
                for (c = k; c < g; c++)
                    if (a[c] > d) {
                        e = c + f;
                        break
                    }
                return {
                    xData: a.slice(n, e)
                    , yData: b.slice(n, e)
                    , start: n
                    , end: e
                }
            }
            , generatePoints: function () {
                var a = this.options
                    , b = a.data
                    , c = this.data
                    , d, e = this.processedXData
                    , g = this.processedYData
                    , k = this.pointClass
                    , h = e.length
                    , l = this.cropStart || 0
                    , r, m = this.hasGroupedData
                    , a = a.keys
                    , q, B = []
                    , p;
                c || m || (c = [], c.length = b.length, c = this.data = c);
                a && m && (this.options.keys = !1);
                for (p = 0; p < h; p++) r = l + p, m ? (q = (new k).init(this, [e[p]].concat(w(g[p]))), q.dataGroup = this.groupMap[p], q.dataGroup.options && (q.options = q.dataGroup.options, f(q, q.dataGroup.options))) : (q = c[r]) || void 0 === b[r] || (c[r] = q = (new k).init(this, b[r], e[p])), q && (q.index = r, B[p] = q);
                this.options.keys = a;
                if (c && (h !== (d = c.length) || m))
                    for (p = 0; p < d; p++) p !== l || m || (p += h), c[p] && (c[p].destroyElements(), c[p].plotX = void 0);
                this.data = c;
                this.points = B
            }
            , getExtremes: function (a) {
                var b = this.yAxis
                    , c = this.processedXData
                    , d, f = []
                    , g = 0;
                d = this.xAxis.getExtremes();
                var n = d.min
                    , e = d.max
                    , k, h, q = this.requireSorting ? 1 : 0
                    , w, B;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (B = 0; B < d; B++)
                    if (h = c[B], w = a[B], k = (l(w, !0) || r(w)) && (!b.positiveValuesOnly || w.length || 0 < w), h = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[B + q] || h) >= n && (c[B - q] || h) <= e, k && h)
                        if (k = w.length)
                            for (; k--;) "number" === typeof w[k] && (f[g++] = w[k]);
                        else f[g++] = w;
                this.dataMin = m(f);
                this.dataMax = F(f)
            }
            , translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options
                    , b = a.stacking
                    , d = this.xAxis
                    , f = d.categories
                    , e = this.yAxis
                    , g = this.points
                    , k = g.length
                    , r = !!this.modifyValue
                    , m = a.pointPlacement
                    , w = "between" === m || l(m)
                    , B = a.threshold
                    , p = a.startFromThreshold ? B : 0
                    , v, t, u, H, I = Number.MAX_VALUE;
                "between" === m && (m = .5);
                l(m) && (m *= q(a.pointRange || d.pointRange));
                for (a = 0; a < k; a++) {
                    var L = g[a]
                        , C = L.x
                        , E = L.y;
                    t = L.low;
                    var F = b && e.stacks[(this.negStacks && E < (p ? 0 : B) ? "-" : "") + this.stackKey]
                        , K;
                    e.positiveValuesOnly && null !== E && 0 >= E && (L.isNull = !0);
                    L.plotX = v = h(Math.min(Math.max(-1E5, d.translate(C, 0, 0, 0, 1, m, "flags" === this.type)), 1E5));
                    b && this.visible && !L.isNull && F && F[C] && (H = this.getStackIndicator(H, C, this.index), K = F[C], E = K.points[H.key], t = E[0], E = E[1], t === p && H.key === F[C].base && (t = q(l(B) && B, e.min)), e.positiveValuesOnly && 0 >= t && (t = null), L.total = L.stackTotal = K.total, L.percentage = K.total && L.y / K.total * 100, L.stackY = E, K.setOffset(this.pointXOffset || 0, this.barW || 0));
                    L.yBottom = x(t) ? Math.min(Math.max(-1E5, e.translate(t, 0, 1, 0, 1)), 1E5) : null;
                    r && (E = this.modifyValue(E, L));
                    L.plotY = t = "number" === typeof E && Infinity !== E ? Math.min(Math.max(-1E5, e.translate(E, 0, 1, 0, 1)), 1E5) : void 0;
                    L.isInside = void 0 !== t && 0 <= t && t <= e.len && 0 <= v && v <= d.len;
                    L.clientX = w ? h(d.translate(C, 0, 0, 0, 1, m)) : v;
                    L.negative = L.y < (B || 0);
                    L.category = f && void 0 !== f[L.x] ? f[L.x] : L.x;
                    L.isNull || (void 0 !== u && (I = Math.min(I, Math.abs(v - u))), u = v);
                    L.zone = this.zones.length && L.getZone()
                }
                this.closestPointRangePx = I;
                c(this, "afterTranslate")
            }
            , getValidPoints: function (a, b) {
                var c = this.chart;
                return k(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            }
            , setClip: function (a) {
                var b = this.chart
                    , c = this.options
                    , d = b.renderer
                    , f = b.inverted
                    , g = this.clipBox
                    , e = g || b.clipBox
                    , n = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, e.height, c.xAxis, c.yAxis].join()
                    , k = b[n]
                    , h = b[n + "m"];
                k || (a && (e.width = 0, f && (e.x = b.plotSizeX), b[n + "m"] = h = d.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[n] = k = d.clipRect(e), k.count = {
                    length: 0
                });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || g ? k : b.clipRect), this.markerGroup.clip(h), this.sharedClipKey = n);
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && n && b[n] && (g || (b[n] = b[n].destroy()), b[n + "m"] && (b[n + "m"] = b[n + "m"].destroy())))
            }
            , animate: function (a) {
                var b = this.chart
                    , c = E(this.options.animation)
                    , d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX
                    , x: 0
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99
                    , x: 0
                }, c), this.animate = null)
            }
            , afterAnimate: function () {
                this.setClip();
                c(this, "afterAnimate");
                this.finishedAnimating = !0
            }
            , drawPoints: function () {
                var a = this.points
                    , b = this.chart
                    , c, d, f, g, e = this.options.marker
                    , k, h, l, r = this[this.specialGroup] || this.markerGroup
                    , m, w = q(e.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= e.enabledThreshold * e.radius);
                if (!1 !== e.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) d = a[c], g = d.graphic, k = d.marker || {}, h = !!d.marker, f = w && void 0 === k.enabled || k.enabled, l = d.isInside, f && !d.isNull ? (f = q(k.symbol, this.symbol), m = this.markerAttribs(d, d.selected && "select"), g ? g[l ? "show" : "hide"](!0).animate(m) : l && (0 < m.width || d.hasImage) && (d.graphic = g = b.renderer.symbol(f, m.x, m.y, m.width, m.height, h ? k : e).add(r)), g && g.attr(this.pointAttribs(d, d.selected && "select")), g && g.addClass(d.getClassName(), !0)) : g && (d.graphic = g.destroy())
            }
            , markerAttribs: function (a, b) {
                var c = this.options.marker
                    , d = a.marker || {}
                    , f = d.symbol || c.symbol
                    , g = q(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], g = q(b && b.radius, c && c.radius, g + (c && c.radiusPlus || 0)));
                a.hasImage = f && 0 === f.indexOf("url");
                a.hasImage && (g = 0);
                a = {
                    x: Math.floor(a.plotX) - g
                    , y: a.plotY - g
                };
                g && (a.width = a.height = 2 * g);
                return a
            }
            , pointAttribs: function (a, b) {
                var c = this.options.marker
                    , d = a && a.options
                    , f = d && d.marker || {}
                    , g = this.color
                    , e = d && d.color
                    , n = a && a.color
                    , d = q(f.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                g = e || a || n || g;
                a = f.fillColor || c.fillColor || g;
                g = f.lineColor || c.lineColor || g;
                b && (c = c.states[b], b = f.states && f.states[b] || {}, d = q(b.lineWidth, c.lineWidth, d + q(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, g = b.lineColor || c.lineColor || g);
                return {
                    stroke: g
                    , "stroke-width": d
                    , fill: a
                }
            }
            , destroy: function () {
                var b = this
                    , d = b.chart
                    , f = /AppleWebKit\/533/.test(H.navigator.userAgent)
                    , e, k, g = b.data || []
                    , h, l;
                c(b, "destroy");
                I(b);
                p(b.axisTypes || [], function (a) {
                    (l = b[a]) && l.series && (u(l.series, b), l.isDirty = l.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (k = g.length; k--;)(h = g[k]) && h.destroy && h.destroy();
                b.points = null;
                a.clearTimeout(b.animationTimeout);
                v(b, function (a, b) {
                    a instanceof L && !a.survive && (e = f && "group" === b ? "hide" : "destroy", a[e]())
                });
                d.hoverSeries === b && (d.hoverSeries = null);
                u(d.series, b);
                d.orderSeries();
                v(b, function (a, c) {
                    delete b[c]
                })
            }
            , getGraphPath: function (a, b, c) {
                var d = this
                    , f = d.options
                    , g = f.step
                    , e, n = []
                    , k = []
                    , h;
                a = a || d.points;
                (e = a.reversed) && a.reverse();
                (g = {
                    right: 1
                    , center: 2
                }[g] || g && 3) && e && (g = 4 - g);
                !f.connectNulls || b || c || (a = this.getValidPoints(a));
                p(a, function (e, l) {
                    var m = e.plotX
                        , r = e.plotY
                        , q = a[l - 1];
                    (e.leftCliff || q && q.rightCliff) && !c && (h = !0);
                    e.isNull && !x(b) && 0 < l ? h = !f.connectNulls : e.isNull && !b ? h = !0 : (0 === l || h ? l = ["M", e.plotX, e.plotY] : d.getPointSpline ? l = d.getPointSpline(a, e, l) : g ? (l = 1 === g ? ["L", q.plotX, r] : 2 === g ? ["L", (q.plotX + m) / 2, q.plotY, "L", (q.plotX + m) / 2, r] : ["L", m, q.plotY], l.push("L", m, r)) : l = ["L", m, r], k.push(e.x), g && (k.push(e.x), 2 === g && k.push(e.x)), n.push.apply(n, l), h = !1)
                });
                n.xMap = k;
                return d.graphPath = n
            }
            , drawGraph: function () {
                var a = this
                    , b = this.options
                    , c = (this.gappedPath || this.getGraphPath).call(this)
                    , d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]]
                    , d = a.getZonesGraphs(d);
                p(d, function (d, f) {
                    var g = d[0]
                        , e = a[g];
                    e ? (e.endX = a.preventGraphAnimation ? null : c.xMap, e.animate({
                        d: c
                    })) : c.length && (a[g] = a.chart.renderer.path(c).addClass(d[1]).attr({
                        zIndex: 1
                    }).add(a.group), e = {
                        stroke: d[2]
                        , "stroke-width": b.lineWidth
                        , fill: a.fillGraph && a.color || "none"
                    }, d[3] ? e.dashstyle = d[3] : "square" !== b.linecap && (e["stroke-linecap"] = e["stroke-linejoin"] = "round"), e = a[g].attr(e).shadow(2 > f && b.shadow));
                    e && (e.startX = c.xMap, e.isArea = c.isArea)
                })
            }
            , getZonesGraphs: function (a) {
                p(this.zones, function (b, c) {
                    a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color || this.color, b.dashStyle || this.options.dashStyle])
                }, this);
                return a
            }
            , applyZones: function () {
                var a = this
                    , b = this.chart
                    , c = b.renderer
                    , d = this.zones
                    , f, g, e = this.clips || []
                    , k, h = this.graph
                    , l = this.area
                    , m = Math.max(b.chartWidth, b.chartHeight)
                    , r = this[(this.zoneAxis || "y") + "Axis"]
                    , w, B, v = b.inverted
                    , t, H, u, x, I = !1;
                d.length && (h || l) && r && void 0 !== r.min && (B = r.reversed, t = r.horiz, h && !this.showLine && h.hide(), l && l.hide(), w = r.getExtremes(), p(d, function (d, n) {
                    f = B ? t ? b.plotWidth : 0 : t ? 0 : r.toPixels(w.min);
                    f = Math.min(Math.max(q(g, f), 0), m);
                    g = Math.min(Math.max(Math.round(r.toPixels(q(d.value, w.max), !0)), 0), m);
                    I && (f = g = r.toPixels(w.max));
                    H = Math.abs(f - g);
                    u = Math.min(f, g);
                    x = Math.max(f, g);
                    r.isXAxis ? (k = {
                        x: v ? x : u
                        , y: 0
                        , width: H
                        , height: m
                    }, t || (k.x = b.plotHeight - k.x)) : (k = {
                        x: 0
                        , y: v ? x : u
                        , width: m
                        , height: H
                    }, t && (k.y = b.plotWidth - k.y));
                    v && c.isVML && (k = r.isXAxis ? {
                        x: 0
                        , y: B ? u : x
                        , height: k.width
                        , width: b.chartWidth
                    } : {
                        x: k.y - b.plotLeft - b.spacingBox.x
                        , y: 0
                        , width: k.height
                        , height: b.chartHeight
                    });
                    e[n] ? e[n].animate(k) : (e[n] = c.clipRect(k), h && a["zone-graph-" + n].clip(e[n]), l && a["zone-area-" + n].clip(e[n]));
                    I = d.value > w.max;
                    a.resetZones && 0 === g && (g = void 0)
                }), this.clips = e)
            }
            , invertGroups: function (a) {
                function b() {
                    p(["group", "markerGroup"], function (b) {
                        c[b] && (d.renderer.isVML && c[b].attr({
                            width: c.yAxis.len
                            , height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this
                    , d = c.chart
                    , f;
                c.xAxis && (f = C(d, "resize", b), C(c, "destroy", f), b(a), c.invertGroups = b)
            }
            , plotGroup: function (a, b, c, d, f) {
                var g = this[a]
                    , e = !g;
                e && (this[a] = g = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(f));
                g.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (x(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                g.attr({
                    visibility: c
                })[e ? "attr" : "animate"](this.getPlotBox());
                return g
            }
            , getPlotBox: function () {
                var a = this.chart
                    , b = this.xAxis
                    , c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft
                    , translateY: c ? c.top : a.plotTop
                    , scaleX: 1
                    , scaleY: 1
                }
            }
            , render: function () {
                var a = this
                    , b = a.chart
                    , d, f = a.options
                    , e = !!a.animate && b.renderer.isSVG && E(f.animation).duration
                    , g = a.visible ? "inherit" : "hidden"
                    , k = f.zIndex
                    , h = a.hasRendered
                    , l = b.seriesGroup
                    , r = b.inverted;
                d = a.plotGroup("group", "series", g, k, l);
                a.markerGroup = a.plotGroup("markerGroup", "markers", g, k, l);
                e && a.animate(!0);
                d.inverted = a.isCartesian ? r : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(r);
                !1 === f.clip || a.sharedClipKey || h || d.clip(b.clipRect);
                e && a.animate();
                h || (a.animationTimeout = B(function () {
                    a.afterAnimate()
                }, e));
                a.isDirty = !1;
                a.hasRendered = !0;
                c(a, "afterRender")
            }
            , redraw: function () {
                var a = this.chart
                    , b = this.isDirty || this.isDirtyData
                    , c = this.group
                    , d = this.xAxis
                    , f = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth
                    , height: a.plotHeight
                }), c.animate({
                    translateX: q(d && d.left, a.plotLeft)
                    , translateY: q(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            }
            , kdAxisArray: ["clientX", "plotY"]
            , searchPoint: function (a, b) {
                var c = this.xAxis
                    , d = this.yAxis
                    , f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos
                    , plotY: f ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            }
            , buildKDTree: function () {
                function a(c, d, f) {
                    var g, e;
                    if (e = c && c.length) return g = b.kdAxisArray[d % f], c.sort(function (a, b) {
                        return a[g] - b[g]
                    }), e = Math.floor(e / 2), {
                        point: c[e]
                        , left: a(c.slice(0, e), d + 1, f)
                        , right: a(c.slice(e + 1), d + 1, f)
                    }
                }
                this.buildingKdTree = !0;
                var b = this
                    , c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                B(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            }
            , searchKDTree: function (a, b) {
                function c(a, b, k, h) {
                    var n = b.point
                        , l = d.kdAxisArray[k % h]
                        , r, m, q = n;
                    m = x(a[f]) && x(n[f]) ? Math.pow(a[f] - n[f], 2) : null;
                    r = x(a[g]) && x(n[g]) ? Math.pow(a[g] - n[g], 2) : null;
                    r = (m || 0) + (r || 0);
                    n.dist = x(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    n.distX = x(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                    l = a[l] - n[l];
                    r = 0 > l ? "left" : "right";
                    m = 0 > l ? "right" : "left";
                    b[r] && (r = c(a, b[r], k + 1, h), q = r[e] < q[e] ? r : n);
                    b[m] && Math.sqrt(l * l) < q[e] && (a = c(a, b[m], k + 1, h), q = a[e] < q[e] ? a : q);
                    return q
                }
                var d = this
                    , f = this.kdAxisArray[0]
                    , g = this.kdAxisArray[1]
                    , e = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(K);
    (function (a) {
        var C = a.Axis
            , E = a.Chart
            , F = a.correctFloat
            , m = a.defined
            , h = a.destroyObjectProperties
            , e = a.each
            , t = a.format
            , x = a.objectEach
            , p = a.pick
            , u = a.Series;
        a.StackItem = function (a, c, e, h, l) {
            var d = a.chart.inverted;
            this.axis = a;
            this.isNegative = e;
            this.options = c;
            this.x = h;
            this.total = null;
            this.points = {};
            this.stack = l;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: c.align || (d ? e ? "left" : "right" : "center")
                , verticalAlign: c.verticalAlign || (d ? "middle" : e ? "bottom" : "top")
                , y: p(c.y, d ? 4 : e ? 14 : -6)
                , x: p(c.x, d ? e ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (d ? e ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function () {
                h(this, this.axis)
            }
            , render: function (a) {
                var c = this.axis.chart
                    , f = this.options
                    , e = f.format
                    , e = e ? t(e, this, c.time) : f.formatter.call(this);
                this.label ? this.label.attr({
                    text: e
                    , visibility: "hidden"
                }) : this.label = c.renderer.text(e, null, null, f.useHTML).css(f.style).attr({
                    align: this.textAlign
                    , rotation: f.rotation
                    , visibility: "hidden"
                }).add(a);
                this.label.labelrank = c.plotHeight
            }
            , setOffset: function (a, c) {
                var f = this.axis
                    , e = f.chart
                    , h = f.translate(f.usePercentage ? 100 : this.total, 0, 0, 0, 1)
                    , d = f.translate(0)
                    , d = m(h) && Math.abs(h - d);
                a = e.xAxis[0].translate(this.x) + a;
                f = m(h) && this.getStackBox(e, this, a, h, c, d, f);
                (c = this.label) && f && (c.align(this.alignOptions, null, f), f = c.alignAttr, c[!1 === this.options.crop || e.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0))
            }
            , getStackBox: function (a, c, e, h, l, d, b) {
                var f = c.axis.reversed
                    , k = a.inverted;
                a = b.height + b.pos - (k ? a.plotLeft : a.plotTop);
                c = c.isNegative && !f || !c.isNegative && f;
                return {
                    x: k ? c ? h : h - d : e
                    , y: k ? a - e - l : c ? a - h - d : a - h
                    , width: k ? d : l
                    , height: k ? l : d
                }
            }
        };
        E.prototype.getStacks = function () {
            var a = this;
            e(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            e(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + p(c.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function () {
            var a = this.series
                , c = p(this.options.reversedStacks, !0)
                , e = a.length
                , h;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (h = e; h--;) a[c ? h : e - h - 1].setStackedPoints();
                for (h = 0; h < e; h++) a[h].modifyStacks()
            }
        };
        C.prototype.renderStackTotals = function () {
            var a = this.chart
                , c = a.renderer
                , e = this.stacks
                , h = this.stackTotalGroup;
            h || (this.stackTotalGroup = h = c.g("stack-labels").attr({
                visibility: "visible"
                , zIndex: 6
            }).add());
            h.translate(a.plotLeft, a.plotTop);
            x(e, function (a) {
                x(a, function (a) {
                    a.render(h)
                })
            })
        };
        C.prototype.resetStacks = function () {
            var a = this
                , c = a.stacks;
            a.isXAxis || x(c, function (c) {
                x(c, function (f, e) {
                    f.touched < a.stacksTouched ? (f.destroy(), delete c[e]) : (f.total = null, f.cumulative = null)
                })
            })
        };
        C.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), x(a, function (a) {
                x(a, function (a) {
                    a.cumulative = a.total
                })
            }))
        };
        u.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var f = this.processedXData
                    , c = this.processedYData
                    , e = []
                    , h = c.length
                    , l = this.options
                    , d = l.threshold
                    , b = p(l.startFromThreshold && d, 0)
                    , v = l.stack
                    , l = l.stacking
                    , q = this.stackKey
                    , t = "-" + q
                    , w = this.negStacks
                    , u = this.yAxis
                    , B = u.stacks
                    , H = u.oldStacks
                    , n, D, A, x, G, g, y;
                u.stacksTouched += 1;
                for (G = 0; G < h; G++) g = f[G], y = c[G], n = this.getStackIndicator(n, g, this.index), x = n.key, A = (D = w && y < (b ? 0 : d)) ? t : q, B[A] || (B[A] = {}), B[A][g] || (H[A] && H[A][g] ? (B[A][g] = H[A][g], B[A][g].total = null) : B[A][g] = new a.StackItem(u, u.options.stackLabels, D, g, v)), A = B[A][g], null !== y ? (A.points[x] = A.points[this.index] = [p(A.cumulative, b)], m(A.cumulative) || (A.base = x), A.touched = u.stacksTouched, 0 < n.index && !1 === this.singleStacks && (A.points[x][0] = A.points[this.index + "," + g + ",0"][0])) : A.points[x] = A.points[this.index] = null, "percent" === l ? (D = D ? q : t, w && B[D] && B[D][g] ? (D = B[D][g], A.total = D.total = Math.max(D.total, A.total) + Math.abs(y) || 0) : A.total = F(A.total + (Math.abs(y) || 0))) : A.total = F(A.total + (y || 0)), A.cumulative = p(A.cumulative, b) + (y || 0), null !== y && (A.points[x].push(A.cumulative), e[G] = A.cumulative);
                "percent" === l && (u.usePercentage = !0);
                this.stackedYData = e;
                u.oldStacks = {}
            }
        };
        u.prototype.modifyStacks = function () {
            var a = this
                , c = a.stackKey
                , h = a.yAxis.stacks
                , m = a.processedXData
                , l, d = a.options.stacking;
            a[d + "Stacker"] && e([c, "-" + c], function (b) {
                for (var c = m.length, f, e; c--;)
                    if (f = m[c], l = a.getStackIndicator(l, f, a.index, b), e = (f = h[b] && h[b][f]) && f.points[l.key]) a[d + "Stacker"](e, f, c)
            })
        };
        u.prototype.percentStacker = function (a, c, e) {
            c = c.total ? 100 / c.total : 0;
            a[0] = F(a[0] * c);
            a[1] = F(a[1] * c);
            this.stackedYData[e] = a[1]
        };
        u.prototype.getStackIndicator = function (a, c, e, h) {
            !m(a) || a.x !== c || h && a.key !== h ? a = {
                x: c
                , index: 0
                , key: h
            } : a.index++;
            a.key = [e, c, a.index].join();
            return a
        }
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.animate
            , F = a.Axis
            , m = a.createElement
            , h = a.css
            , e = a.defined
            , t = a.each
            , x = a.erase
            , p = a.extend
            , u = a.fireEvent
            , f = a.inArray
            , c = a.isNumber
            , k = a.isObject
            , r = a.isArray
            , l = a.merge
            , d = a.objectEach
            , b = a.pick
            , v = a.Point
            , q = a.Series
            , I = a.seriesTypes
            , w = a.setAnimation
            , L = a.splat;
        p(a.Chart.prototype, {
            addSeries: function (a, c, d) {
                var f, e = this;
                a && (c = b(c, !0), u(e, "addSeries", {
                    options: a
                }, function () {
                    f = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    u(e, "afterAddSeries");
                    c && e.redraw(d)
                }));
                return f
            }
            , addAxis: function (a, c, d, f) {
                var e = c ? "xAxis" : "yAxis"
                    , h = this.options;
                a = l(a, {
                    index: this[e].length
                    , isX: c
                });
                c = new F(this, a);
                h[e] = L(h[e] || {});
                h[e].push(a);
                b(d, !0) && this.redraw(f);
                return c
            }
            , showLoading: function (a) {
                var b = this
                    , c = b.options
                    , d = b.loadingDiv
                    , f = c.loading
                    , e = function () {
                        d && h(d, {
                            left: b.plotLeft + "px"
                            , top: b.plotTop + "px"
                            , width: b.plotWidth + "px"
                            , height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = m("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = m("span", {
                    className: "highcharts-loading-inner"
                }, null, d), C(b, "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                h(d, p(f.style, {
                    zIndex: 10
                }));
                h(b.loadingSpan, f.labelStyle);
                b.loadingShown || (h(d, {
                    opacity: 0
                    , display: ""
                }), E(d, {
                    opacity: f.style.opacity || .5
                }, {
                    duration: f.showDuration || 0
                }));
                b.loadingShown = !0;
                e()
            }
            , hideLoading: function () {
                var a = this.options
                    , b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", E(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100
                    , complete: function () {
                        h(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            }
            , propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" ")
            , propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
            , update: function (a, h, k, m) {
                var n = this
                    , q = {
                        credits: "addCredits"
                        , title: "setTitle"
                        , subtitle: "setSubtitle"
                    }
                    , w = a.chart
                    , g, r, p = [];
                u(n, "update", {
                    options: a
                });
                if (w) {
                    l(!0, n.options.chart, w);
                    "className" in w && n.setClassName(w.className);
                    "reflow" in w && n.setReflow(w.reflow);
                    if ("inverted" in w || "polar" in w || "type" in w) n.propFromSeries(), g = !0;
                    "alignTicks" in w && (g = !0);
                    d(w, function (a, b) {
                        -1 !== f("chart." + b, n.propsRequireUpdateSeries) && (r = !0); - 1 !== f(b, n.propsRequireDirtyBox) && (n.isDirtyBox = !0)
                    });
                    "style" in w && n.renderer.setStyle(w.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && l(!0, this.options.plotOptions, a.plotOptions);
                d(a, function (a, b) {
                    if (n[b] && "function" === typeof n[b].update) n[b].update(a, !1);
                    else if ("function" === typeof n[q[b]]) n[q[b]](a);
                    "chart" !== b && -1 !== f(b, n.propsRequireUpdateSeries) && (r = !0)
                });
                t("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    var c;
                    a[b] && ("series" === b && (c = [], t(n[b], function (a, b) {
                        a.options.isInternal || c.push(b)
                    })), t(L(a[b]), function (a, d) {
                        (d = e(a.id) && n.get(a.id) || n[b][c ? c[d] : d]) && d.coll === b && (d.update(a, !1), k && (d.touched = !0));
                        if (!d && k)
                            if ("series" === b) n.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) n.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), k && t(n[b], function (a) {
                        a.touched || a.options.isInternal ? delete a.touched : p.push(a)
                    }))
                });
                t(p, function (a) {
                    a.remove(!1)
                });
                g && t(n.axes, function (a) {
                    a.update({}, !1)
                });
                r && t(n.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && l(!0, n.options.loading, a.loading);
                g = w && w.width;
                w = w && w.height;
                c(g) && g !== n.chartWidth || c(w) && w !== n.chartHeight ? n.setSize(g, w, m) : b(h, !0) && n.redraw(m);
                u(n, "afterUpdate", {
                    options: a
                })
            }
            , setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        p(v.prototype, {
            update: function (a, c, d, f) {
                function e() {
                    h.applyOptions(a);
                    null === h.y && g && (h.graphic = g.destroy());
                    k(a, !0) && (g && g.element && a && a.marker && void 0 !== a.marker.symbol && (h.graphic = g.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                    l = h.index;
                    n.updateParallelArrays(h, l);
                    w.data[l] = k(w.data[l], !0) || k(a, !0) ? h.options : b(a, w.data[l]);
                    n.isDirty = n.isDirtyData = !0;
                    !n.fixedBox && n.hasCartesianSeries && (m.isDirtyBox = !0);
                    "point" === w.legendType && (m.isDirtyLegend = !0);
                    c && m.redraw(d)
                }
                var h = this
                    , n = h.series
                    , g = h.graphic
                    , l, m = n.chart
                    , w = n.options;
                c = b(c, !0);
                !1 === f ? e() : h.firePointEvent("update", {
                    options: a
                }, e)
            }
            , remove: function (a, b) {
                this.series.removePoint(f(this, this.series.data), a, b)
            }
        });
        p(q.prototype, {
            addPoint: function (a, c, d, f) {
                var e = this.options
                    , h = this.data
                    , k = this.chart
                    , g = this.xAxis
                    , g = g && g.hasNames && g.names
                    , n = e.data
                    , l, m, w = this.xData
                    , q, r;
                c = b(c, !0);
                l = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                r = l.x;
                q = w.length;
                if (this.requireSorting && r < w[q - 1])
                    for (m = !0; q && w[q - 1] > r;) q--;
                this.updateParallelArrays(l, "splice", q, 0, 0);
                this.updateParallelArrays(l, q);
                g && l.name && (g[r] = l.name);
                n.splice(q, 0, a);
                m && (this.data.splice(q, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                d && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(l, "shift"), n.shift()));
                this.isDirtyData = this.isDirty = !0;
                c && k.redraw(f)
            }
            , removePoint: function (a, c, d) {
                var f = this
                    , e = f.data
                    , h = e[a]
                    , k = f.points
                    , g = f.chart
                    , n = function () {
                        k && k.length === e.length && k.splice(a, 1);
                        e.splice(a, 1);
                        f.options.data.splice(a, 1);
                        f.updateParallelArrays(h || {
                            series: f
                        }, "splice", a, 1);
                        h && h.destroy();
                        f.isDirty = !0;
                        f.isDirtyData = !0;
                        c && g.redraw()
                    };
                w(d, g);
                c = b(c, !0);
                h ? h.firePointEvent("remove", null, n) : n()
            }
            , remove: function (a, c, d) {
                function f() {
                    e.destroy();
                    h.isDirtyLegend = h.isDirtyBox = !0;
                    h.linkSeries();
                    b(a, !0) && h.redraw(c)
                }
                var e = this
                    , h = e.chart;
                !1 !== d ? u(e, "remove", null, f) : f()
            }
            , update: function (c, d) {
                var e = this
                    , h = e.chart
                    , k = e.userOptions
                    , m = e.oldType || e.type
                    , w = c.type || k.type || h.options.chart.type
                    , g = I[m].prototype
                    , q, r = ["group", "markerGroup", "dataLabelsGroup"]
                    , v = ["navigatorSeries", "baseSeries"]
                    , B = e.finishedAnimating && {
                        animation: !1
                    }
                    , x = ["data", "name", "turboThreshold"]
                    , H = a.keys(c)
                    , z = 0 < H.length;
                t(H, function (a) {
                    -1 === f(a, x) && (z = !1)
                });
                if (z) c.data && this.setData(c.data, !1), c.name && this.setName(c.name, !1);
                else {
                    v = r.concat(v);
                    t(v, function (a) {
                        v[a] = e[a];
                        delete e[a]
                    });
                    c = l(k, B, {
                        index: e.index
                        , pointStart: b(k.pointStart, e.xData[0])
                    }, {
                        data: e.options.data
                    }, c);
                    e.remove(!1, null, !1);
                    for (q in g) e[q] = void 0;
                    I[w || m] ? p(e, I[w || m].prototype) : a.error(17, !0);
                    t(v, function (a) {
                        e[a] = v[a]
                    });
                    e.init(h, c);
                    c.zIndex !== k.zIndex && t(r, function (a) {
                        e[a] && e[a].attr({
                            zIndex: c.zIndex
                        })
                    });
                    e.oldType = m;
                    h.linkSeries()
                }
                u(this, "afterUpdate");
                b(d, !0) && h.redraw(z ? void 0 : !1)
            }
            , setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        p(F.prototype, {
            update: function (a, c) {
                var f = this.chart
                    , e = a && a.events || {};
                a = l(this.userOptions, a);
                f.options[this.coll].indexOf && (f.options[this.coll][f.options[this.coll].indexOf(this.userOptions)] = a);
                d(f.options[this.coll].events, function (a, b) {
                    "undefined" === typeof e[b] && (e[b] = void 0)
                });
                this.destroy(!0);
                this.init(f, p(a, {
                    events: e
                }));
                f.isDirtyBox = !0;
                b(c, !0) && f.redraw()
            }
            , remove: function (a) {
                for (var c = this.chart, d = this.coll, f = this.series, e = f.length; e--;) f[e] && f[e].remove(!1);
                x(c.axes, this);
                x(c[d], this);
                r(c.options[d]) ? c.options[d].splice(this.options.index, 1) : delete c.options[d];
                t(c[d], function (a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                c.isDirtyBox = !0;
                b(a, !0) && c.redraw()
            }
            , setTitle: function (a, b) {
                this.update({
                    title: a
                }, b)
            }
            , setCategories: function (a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(K);
    (function (a) {
        var C = a.color
            , E = a.each
            , F = a.map
            , m = a.pick
            , h = a.Series
            , e = a.seriesType;
        e("area", "line", {
            softThreshold: !1
            , threshold: 0
        }, {
            singleStacks: !1
            , getStackPoints: function (e) {
                var h = []
                    , p = []
                    , t = this.xAxis
                    , f = this.yAxis
                    , c = f.stacks[this.stackKey]
                    , k = {}
                    , r = this.index
                    , l = f.series
                    , d = l.length
                    , b, v = m(f.options.reversedStacks, !0) ? 1 : -1
                    , q;
                e = e || this.points;
                if (this.options.stacking) {
                    for (q = 0; q < e.length; q++) e[q].leftNull = e[q].rightNull = null, k[e[q].x] = e[q];
                    a.objectEach(c, function (a, b) {
                        null !== a.total && p.push(b)
                    });
                    p.sort(function (a, b) {
                        return a - b
                    });
                    b = F(l, function () {
                        return this.visible
                    });
                    E(p, function (a, e) {
                        var l = 0
                            , m, w;
                        if (k[a] && !k[a].isNull) h.push(k[a]), E([-1, 1], function (f) {
                            var h = 1 === f ? "rightNull" : "leftNull"
                                , n = 0
                                , l = c[p[e + f]];
                            if (l)
                                for (q = r; 0 <= q && q < d;) m = l.points[q], m || (q === r ? k[a][h] = !0 : b[q] && (w = c[a].points[q]) && (n -= w[1] - w[0])), q += v;
                            k[a][1 === f ? "rightCliff" : "leftCliff"] = n
                        });
                        else {
                            for (q = r; 0 <= q && q < d;) {
                                if (m = c[a].points[q]) {
                                    l = m[1];
                                    break
                                }
                                q += v
                            }
                            l = f.translate(l, 0, 1, 0, 1);
                            h.push({
                                isNull: !0
                                , plotX: t.translate(a, 0, 0, 0, 1)
                                , x: a
                                , plotY: l
                                , yBottom: l
                            })
                        }
                    })
                }
                return h
            }
            , getGraphPath: function (a) {
                var e = h.prototype.getGraphPath
                    , p = this.options
                    , t = p.stacking
                    , f = this.yAxis
                    , c, k, r = []
                    , l = []
                    , d = this.index
                    , b, v = f.stacks[this.stackKey]
                    , q = p.threshold
                    , I = f.getThreshold(p.threshold)
                    , w, p = p.connectNulls || "percent" === t
                    , L = function (c, e, h) {
                        var k = a[c];
                        c = t && v[k.x].points[d];
                        var n = k[h + "Null"] || 0;
                        h = k[h + "Cliff"] || 0;
                        var m, w, k = !0;
                        h || n ? (m = (n ? c[0] : c[1]) + h, w = c[0] + h, k = !!n) : !t && a[e] && a[e].isNull && (m = w = q);
                        void 0 !== m && (l.push({
                            plotX: b
                            , plotY: null === m ? I : f.getThreshold(m)
                            , isNull: k
                            , isCliff: !0
                        }), r.push({
                            plotX: b
                            , plotY: null === w ? I : f.getThreshold(w)
                            , doCurve: !1
                        }))
                    };
                a = a || this.points;
                t && (a = this.getStackPoints(a));
                for (c = 0; c < a.length; c++)
                    if (k = a[c].isNull, b = m(a[c].rectPlotX, a[c].plotX), w = m(a[c].yBottom, I), !k || p) p || L(c, c - 1, "left"), k && !t && p || (l.push(a[c]), r.push({
                        x: c
                        , plotX: b
                        , plotY: w
                    })), p || L(c, c + 1, "right");
                c = e.call(this, l, !0, !0);
                r.reversed = !0;
                k = e.call(this, r, !0, !0);
                k.length && (k[0] = "L");
                k = c.concat(k);
                e = e.call(this, l, !1, p);
                k.xMap = c.xMap;
                this.areaPath = k;
                return e
            }
            , drawGraph: function () {
                this.areaPath = [];
                h.prototype.drawGraph.apply(this);
                var a = this
                    , e = this.areaPath
                    , p = this.options
                    , u = [["area", "highcharts-area", this.color, p.fillColor]];
                E(this.zones, function (f, c) {
                    u.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + f.className, f.color || a.color, f.fillColor ||
p.fillColor])
                });
                E(u, function (f) {
                    var c = f[0]
                        , h = a[c];
                    h ? (h.endX = a.preventGraphAnimation ? null : e.xMap, h.animate({
                        d: e
                    })) : (h = a[c] = a.chart.renderer.path(e).addClass(f[1]).attr({
                        fill: m(f[3], C(f[2]).setOpacity(m(p.fillOpacity, .75)).get())
                        , zIndex: 0
                    }).add(a.group), h.isArea = !0);
                    h.startX = e.xMap;
                    h.shiftUnit = p.step ? 2 : 1
                })
            }
            , drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function (a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, F, m) {
                var h = F.plotX
                    , e = F.plotY
                    , t = a[m - 1];
                m = a[m + 1];
                var x, p, u, f;
                if (t && !t.isNull && !1 !== t.doCurve && !F.isCliff && m && !m.isNull && !1 !== m.doCurve && !F.isCliff) {
                    a = t.plotY;
                    u = m.plotX;
                    m = m.plotY;
                    var c = 0;
                    x = (1.5 * h + t.plotX) / 2.5;
                    p = (1.5 * e + a) / 2.5;
                    u = (1.5 * h + u) / 2.5;
                    f = (1.5 * e + m) / 2.5;
                    u !== x && (c = (f - p) * (u - h) / (u - x) + e - f);
                    p += c;
                    f += c;
                    p > a && p > e ? (p = Math.max(a, e), f = 2 * e - p) : p < a && p < e && (p = Math.min(a, e), f = 2 * e - p);
                    f > m && f > e ? (f = Math.max(m, e), p = 2 * e - f) : f < m && f < e && (f = Math.min(m, e), p = 2 * e - f);
                    F.rightContX = u;
                    F.rightContY = f
                }
                F = ["C", C(t.rightContX, t.plotX), C(t.rightContY, t.plotY), C(x, h), C(p, e), h, e];
                t.rightContX = t.rightContY = null;
                return F
            }
        })
    })(K);
    (function (a) {
        var C = a.seriesTypes.area.prototype
            , E = a.seriesType;
        E("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints
            , getGraphPath: C.getGraphPath
            , drawGraph: C.drawGraph
            , drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function (a) {
        var C = a.animObject
            , E = a.color
            , F = a.each
            , m = a.extend
            , h = a.isNumber
            , e = a.merge
            , t = a.pick
            , x = a.Series
            , p = a.seriesType
            , u = a.svg;
        p("column", "line", {
            borderRadius: 0
            , crisp: !0
            , groupPadding: .2
            , marker: null
            , pointPadding: .1
            , minPointLength: 0
            , cropThreshold: 50
            , pointRange: null
            , states: {
                hover: {
                    halo: !1
                    , brightness: .1
                }
                , select: {
                    color: "#cccccc"
                    , borderColor: "#000000"
                }
            }
            , dataLabels: {
                align: null
                , verticalAlign: null
                , y: null
            }
            , softThreshold: !1
            , startFromThreshold: !0
            , stickyTracking: !1
            , tooltip: {
                distance: 6
            }
            , threshold: 0
            , borderColor: "#ffffff"
        }, {
            cropShoulder: 0
            , directTouch: !0
            , trackerGroups: ["group", "dataLabelsGroup"]
            , negStacks: !0
            , init: function () {
                x.prototype.init.apply(this, arguments);
                var a = this
                    , c = a.chart;
                c.hasRendered && F(c.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            }
            , getColumnMetrics: function () {
                var a = this
                    , c = a.options
                    , e = a.xAxis
                    , h = a.yAxis
                    , l = e.options.reversedStacks
                    , l = e.reversed && !l || !e.reversed && l
                    , d, b = {}
                    , m = 0;
                !1 === c.grouping ? m = 1 : F(a.chart.series, function (c) {
                    var f = c.options
                        , e = c.yAxis
                        , k;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || h.len !== e.len || h.pos !== e.pos || (f.stacking ? (d = c.stackKey, void 0 === b[d] && (b[d] = m++), k = b[d]) : !1 !== f.grouping && (k = m++), c.columnIndex = k)
                });
                var q = Math.min(Math.abs(e.transA) * (e.ordinalSlope || c.pointRange || e.closestPointRange || e.tickInterval || 1), e.len)
                    , p = q * c.groupPadding
                    , w = (q - 2 * p) / (m || 1)
                    , c = Math.min(c.maxPointWidth || e.len, t(c.pointWidth, w * (1 - 2 * c.pointPadding)));
                a.columnMetrics = {
                    width: c
                    , offset: (w - c) / 2 + (p + ((a.columnIndex || 0) + (l ? 1 : 0)) * w - q / 2) * (l ? -1 : 1)
                };
                return a.columnMetrics
            }
            , crispCol: function (a, c, e, h) {
                var f = this.chart
                    , d = this.borderWidth
                    , b = -(d % 2 ? .5 : 0)
                    , d = d % 2 ? .5 : 1;
                f.inverted && f.renderer.isVML && (d += 1);
                this.options.crisp && (e = Math.round(a + e) + b, a = Math.round(a) + b, e -= a);
                h = Math.round(c + h) + d;
                b = .5 >= Math.abs(c) && .5 < h;
                c = Math.round(c) + d;
                h -= c;
                b && h && (--c, h += 1);
                return {
                    x: a
                    , y: c
                    , width: e
                    , height: h
                }
            }
            , translate: function () {
                var a = this
                    , c = a.chart
                    , e = a.options
                    , h = a.dense = 2 > a.closestPointRange * a.xAxis.transA
                    , h = a.borderWidth = t(e.borderWidth, h ? 0 : 1)
                    , l = a.yAxis
                    , d = e.threshold
                    , b = a.translatedThreshold = l.getThreshold(d)
                    , m = t(e.minPointLength, 5)
                    , q = a.getColumnMetrics()
                    , p = q.width
                    , w = a.barW = Math.max(p, 1 + 2 * h)
                    , u = a.pointXOffset = q.offset;
                c.inverted && (b -= .5);
                e.pointPadding && (w = Math.ceil(w));
                x.prototype.translate.apply(a);
                F(a.points, function (f) {
                    var e = t(f.yBottom, b)
                        , h = 999 + Math.abs(e)
                        , h = Math.min(Math.max(-h, f.plotY), l.len + h)
                        , k = f.plotX + u
                        , q = w
                        , r = Math.min(h, e)
                        , v, g = Math.max(h, e) - r;
                    m && Math.abs(g) < m && (g = m, v = !l.reversed && !f.negative || l.reversed && f.negative, f.y === d && a.dataMax <= d && l.min < d && (v = !v), r = Math.abs(r - b) > m ? e - m : b - (v ? m : 0));
                    f.barX = k;
                    f.pointWidth = p;
                    f.tooltipPos = c.inverted ? [l.len + l.pos - c.plotLeft - h, a.xAxis.len - k - q / 2, g] : [k + q / 2, h + l.pos - c.plotTop, g];
                    f.shapeType = "rect";
                    f.shapeArgs = a.crispCol.apply(a, f.isNull ? [k, b, q, 0] : [k, r, q, g])
                })
            }
            , getSymbol: a.noop
            , drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
            , drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            }
            , pointAttribs: function (a, c) {
                var f = this.options
                    , h, l = this.pointAttrToOptions || {};
                h = l.stroke || "borderColor";
                var d = l["stroke-width"] || "borderWidth"
                    , b = a && a.color || this.color
                    , m = a && a[h] || f[h] || this.color || b
                    , q = a && a[d] || f[d] || this[d] || 0
                    , l = f.dashStyle;
                a && this.zones.length && (b = a.getZone(), b = a.options.color || b && b.color || this.color);
                c && (a = e(f.states[c], a.options.states && a.options.states[c] || {}), c = a.brightness, b = a.color || void 0 !== c && E(b).brighten(a.brightness).get() || b, m = a[h] || m, q = a[d] || q, l = a.dashStyle || l);
                h = {
                    fill: b
                    , stroke: m
                    , "stroke-width": q
                };
                l && (h.dashstyle = l);
                return h
            }
            , drawPoints: function () {
                var a = this
                    , c = this.chart
                    , k = a.options
                    , m = c.renderer
                    , l = k.animationLimit || 250
                    , d;
                F(a.points, function (b) {
                    var f = b.graphic
                        , q = f && c.pointCount < l ? "animate" : "attr";
                    if (h(b.plotY) && null !== b.y) {
                        d = b.shapeArgs;
                        if (f) f[q](e(d));
                        else b.graphic = f = m[b.shapeType](d).add(b.group || a.group);
                        k.borderRadius && f.attr({
                            r: k.borderRadius
                        });
                        f[q](a.pointAttribs(b, b.selected && "select")).shadow(k.shadow, null, k.stacking && !k.borderRadius);
                        f.addClass(b.getClassName(), !0)
                    }
                    else f && (b.graphic = f.destroy())
                })
            }
            , animate: function (a) {
                var c = this
                    , f = this.yAxis
                    , e = c.options
                    , h = this.chart.inverted
                    , d = {}
                    , b = h ? "translateX" : "translateY"
                    , p;
                u && (a ? (d.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(e.threshold))), h ? d.translateX = a - f.len : d.translateY = a, c.group.attr(d)) : (p = c.group.attr(b), c.group.animate({
                    scaleY: 1
                }, m(C(c.options.animation), {
                    step: function (a, e) {
                        d[b] = p + e.pos * (f.pos - p);
                        c.group.attr(d)
                    }
                })), c.animate = null))
            }
            , remove: function () {
                var a = this
                    , c = a.chart;
                c.hasRendered && F(c.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                x.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(K);
    (function (a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0
            , findNearestPointBy: "xy"
            , marker: {
                enabled: !0
            }
            , tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e'
                , pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1
            , requireSorting: !1
            , noSharedTooltip: !0
            , trackerGroups: ["group", "markerGroup", "dataLabelsGroup"]
            , takeOrdinalPosition: !1
            , drawGraph: function () {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function (a) {
        var C = a.deg2rad
            , E = a.isNumber
            , F = a.pick
            , m = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options
                    , e = this.chart
                    , t = 2 * (a.slicedOffset || 0)
                    , x = e.plotWidth - 2 * t
                    , e = e.plotHeight - 2 * t
                    , p = a.center
                    , p = [F(p[0], "50%"), F(p[1], "50%"), a.size || "100%", a.innerSize || 0]
                    , u = Math.min(x, e)
                    , f, c;
                for (f = 0; 4 > f; ++f) c = p[f], a = 2 > f || 2 === f && /%$/.test(c), p[f] = m(c, [x, e, u, p[2]][f]) + (a ? t : 0);
                p[3] > p[2] && (p[3] = p[2]);
                return p
            }
            , getStartAndEndRadians: function (a, e) {
                a = E(a) ? a : 0;
                e = E(e) && e > a && 360 > e - a ? e : a + 360;
                return {
                    start: C * (a + -90)
                    , end: C * (e + -90)
                }
            }
        }
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.CenteredSeriesMixin
            , F = a.defined
            , m = a.each
            , h = a.extend
            , e = E.getStartAndEndRadians
            , t = a.inArray
            , x = a.noop
            , p = a.pick
            , u = a.Point
            , f = a.Series
            , c = a.seriesType
            , k = a.setAnimation;
        c("pie", "line", {
            center: [null, null]
            , clip: !1
            , colorByPoint: !0
            , dataLabels: {
                allowOverlap: !0
                , distance: 30
                , enabled: !0
                , formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                }
                , x: 0
            }
            , ignoreHiddenPoint: !0
            , legendType: "point"
            , marker: null
            , size: null
            , showInLegend: !1
            , slicedOffset: 10
            , stickyTracking: !1
            , tooltip: {
                followPointer: !0
            }
            , borderColor: "#ffffff"
            , borderWidth: 1
            , states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1
            , requireSorting: !1
            , directTouch: !0
            , noSharedTooltip: !0
            , trackerGroups: ["group", "dataLabelsGroup"]
            , axisTypes: []
            , pointAttribs: a.seriesTypes.column.prototype.pointAttribs
            , animate: function (a) {
                var c = this
                    , d = c.points
                    , b = c.startAngleRad;
                a || (m(d, function (a) {
                    var d = a.graphic
                        , f = a.shapeArgs;
                    d && (d.attr({
                        r: a.startR || c.center[3] / 2
                        , start: b
                        , end: b
                    }), d.animate({
                        r: f.r
                        , start: f.start
                        , end: f.end
                    }, c.options.animation))
                }), c.animate = null)
            }
            , updateTotals: function () {
                var a, c = 0
                    , d = this.points
                    , b = d.length
                    , f, e = this.options.ignoreHiddenPoint;
                for (a = 0; a < b; a++) f = d[a], c += e && !f.visible ? 0 : f.isNull ? 0 : f.y;
                this.total = c;
                for (a = 0; a < b; a++) f = d[a], f.percentage = 0 < c && (f.visible || !e) ? f.y / c * 100 : 0, f.total = c
            }
            , generatePoints: function () {
                f.prototype.generatePoints.call(this);
                this.updateTotals()
            }
            , translate: function (a) {
                this.generatePoints();
                var c = 0
                    , d = this.options
                    , b = d.slicedOffset
                    , f = b + (d.borderWidth || 0)
                    , h, k, m, r = e(d.startAngle, d.endAngle)
                    , t = this.startAngleRad = r.start
                    , r = (this.endAngleRad = r.end) - t
                    , u = this.points
                    , n, x = d.dataLabels.distance
                    , d = d.ignoreHiddenPoint
                    , A, C = u.length
                    , G;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c, d) {
                    m = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(m) * (a[2] / 2 + d.labelDistance)
                };
                for (A = 0; A < C; A++) {
                    G = u[A];
                    G.labelDistance = p(G.options.dataLabels && G.options.dataLabels.distance, x);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, G.labelDistance);
                    h = t + c * r;
                    if (!d || G.visible) c += G.percentage / 100;
                    k = t + c * r;
                    G.shapeType = "arc";
                    G.shapeArgs = {
                        x: a[0]
                        , y: a[1]
                        , r: a[2] / 2
                        , innerR: a[3] / 2
                        , start: Math.round(1E3 * h) / 1E3
                        , end: Math.round(1E3 * k) / 1E3
                    };
                    m = (k + h) / 2;
                    m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI);
                    G.slicedTranslation = {
                        translateX: Math.round(Math.cos(m) * b)
                        , translateY: Math.round(Math.sin(m) * b)
                    };
                    k = Math.cos(m) * a[2] / 2;
                    n = Math.sin(m) * a[2] / 2;
                    G.tooltipPos = [a[0] + .7 * k, a[1] + .7 * n];
                    G.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0;
                    G.angle = m;
                    h = Math.min(f, G.labelDistance / 5);
                    G.labelPos = [a[0] + k + Math.cos(m) * G.labelDistance, a[1] + n + Math.sin(m) * G.labelDistance, a[0] + k + Math.cos(m) * h, a[1] + n + Math.sin(m) * h, a[0] + k, a[1] + n, 0 > G.labelDistance ? "center" : G.half ? "right" : "left", m]
                }
            }
            , drawGraph: null
            , drawPoints: function () {
                var a = this
                    , c = a.chart.renderer
                    , d, b, f, e, k = a.options.shadow;
                k && !a.shadowGroup && (a.shadowGroup = c.g("shadow").add(a.group));
                m(a.points, function (l) {
                    b = l.graphic;
                    if (l.isNull) b && (l.graphic = b.destroy());
                    else {
                        e = l.shapeArgs;
                        d = l.getTranslate();
                        var m = l.shadowGroup;
                        k && !m && (m = l.shadowGroup = c.g("shadow").add(a.shadowGroup));
                        m && m.attr(d);
                        f = a.pointAttribs(l, l.selected && "select");
                        b ? b.setRadialReference(a.center).attr(f).animate(h(e, d)) : (l.graphic = b = c[l.shapeType](e).setRadialReference(a.center).attr(d).add(a.group), b.attr(f).attr({
                            "stroke-linejoin": "round"
                        }).shadow(k, m));
                        b.attr({
                            visibility: l.visible ? "inherit" : "hidden"
                        });
                        b.addClass(l.getClassName())
                    }
                })
            }
            , searchPoint: x
            , sortByAngle: function (a, c) {
                a.sort(function (a, b) {
                    return void 0 !== a.angle && (b.angle - a.angle) * c
                })
            }
            , drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
            , getCenter: E.getCenter
            , getSymbol: x
        }, {
            init: function () {
                u.prototype.init.apply(this, arguments);
                var a = this
                    , c;
                a.name = p(a.name, "Slice");
                c = function (c) {
                    a.slice("select" === c.type)
                };
                C(a, "select", c);
                C(a, "unselect", c);
                return a
            }
            , isValid: function () {
                return a.isNumber(this.y, !0) && 0 <= this.y
            }
            , setVisible: function (a, c) {
                var d = this
                    , b = d.series
                    , f = b.chart
                    , e = b.options.ignoreHiddenPoint;
                c = p(c, e);
                a !== d.visible && (d.visible = d.options.visible = a = void 0 === a ? !d.visible : a, b.options.data[t(d, b.data)] = d.options, m(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (d[b]) d[b][a ? "show" : "hide"](!0)
                }), d.legendItem && f.legend.colorizeItem(d, a), a || "hover" !== d.state || d.setState(""), e && (b.isDirty = !0), c && f.redraw())
            }
            , slice: function (a, c, d) {
                var b = this.series;
                k(d, b.chart);
                p(c, !0);
                this.sliced = this.options.sliced = F(a) ? a : !this.sliced;
                b.options.data[t(this, b.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            }
            , getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0
                    , translateY: 0
                }
            }
            , haloPath: function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r - 1
                    , start: c.start
                    , end: c.end
                })
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.arrayMax
            , F = a.defined
            , m = a.each
            , h = a.extend
            , e = a.format
            , t = a.map
            , x = a.merge
            , p = a.noop
            , u = a.pick
            , f = a.relativeLength
            , c = a.Series
            , k = a.seriesTypes
            , r = a.some
            , l = a.stableSort;
        a.distribute = function (c, b, f) {
            function d(a, b) {
                return a.target - b.target
            }
            var e, h = !0
                , k = c
                , p = []
                , v;
            v = 0;
            var n = k.reducedLen || b;
            for (e = c.length; e--;) v += c[e].size;
            if (v > n) {
                l(c, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (v = e = 0; v <= n;) v += c[e].size, e++;
                p = c.splice(e - 1, c.length)
            }
            l(c, d);
            for (c = t(c, function (a) {
                    return {
                        size: a.size
                        , targets: [a.target]
                        , align: u(a.align, .5)
                    }
                }); h;) {
                for (e = c.length; e--;) h = c[e], v = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, v - h.size * h.align), b - h.size);
                e = c.length;
                for (h = !1; e--;) 0 < e && c[e - 1].pos + c[e - 1].size > c[e].pos && (c[e - 1].size += c[e].size, c[e - 1].targets = c[e - 1].targets.concat(c[e].targets), c[e - 1].align = .5, c[e - 1].pos + c[e - 1].size > b && (c[e - 1].pos = b - c[e - 1].size), c.splice(e, 1), h = !0)
            }
            k.push.apply(k, p);
            e = 0;
            r(c, function (c) {
                var d = 0;
                if (r(c.targets, function () {
                        k[e].pos = c.pos + d;
                        if (Math.abs(k[e].pos - k[e].target) > f) return m(k.slice(0, e + 1), function (a) {
                            delete a.pos
                        }), k.reducedLen = (k.reducedLen || b) - .1 * b, k.reducedLen > .1 * b && a.distribute(k, b, f), !0;
                        d += k[e].size;
                        e++
                    })) return !0
            });
            l(k, d)
        };
        c.prototype.drawDataLabels = function () {
            function c(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }
            var b = this
                , f = b.chart
                , h = b.options
                , k = h.dataLabels
                , l = b.points
                , p, r, t = b.hasRendered || 0
                , n, D, A = u(k.defer, !!h.animation)
                , E = f.renderer;
            if (k.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(k), D = b.plotGroup("dataLabelsGroup", "data-labels", A && !t ? "hidden" : "visible", k.zIndex || 6), A && (D.attr({
                opacity: +t
            }), t || C(b, "afterAnimate", function () {
                b.visible && D.show(!0);
                D[h.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), r = k, m(l, function (d) {
                var g, l = d.dataLabel
                    , m, q, w = d.connector
                    , t = !l
                    , v;
                p = d.dlOptions || d.options && d.options.dataLabels;
                (g = u(p && p.enabled, r.enabled) && !d.isNull) && (g = !0 === c(d, p || k));
                g && (k = x(r, p), m = d.getLabelConfig(), v = k[d.formatPrefix + "Format"] || k.format, n = F(v) ? e(v, m, f.time) : (k[d.formatPrefix + "Formatter"] || k.formatter).call(m, k), v = k.style, m = k.rotation, v.color = u(k.color, v.color, b.color, "#000000"), "contrast" === v.color && (d.contrastColor = E.getContrast(d.color || b.color), v.color = k.inside || 0 > u(d.labelDistance, k.distance) || h.stacking ? d.contrastColor : "#000000"), h.cursor && (v.cursor = h.cursor), q = {
                    fill: k.backgroundColor
                    , stroke: k.borderColor
                    , "stroke-width": k.borderWidth
                    , r: k.borderRadius || 0
                    , rotation: m
                    , padding: k.padding
                    , zIndex: 1
                }, a.objectEach(q, function (a, b) {
                    void 0 === a && delete q[b]
                }));
                !l || g && F(n) ? g && F(n) && (l ? q.text = n : (l = d.dataLabel = m ? E.text(n, 0, -9999, k.useHTML).addClass("highcharts-data-label") : E.label(n, 0, -9999, k.shape, null, null, k.useHTML, null, "data-label"), l.addClass(" highcharts-data-label-color-" + d.colorIndex + " " + (k.className || "") + (k.useHTML ? " highcharts-tracker" : ""))), l.attr(q), l.css(v).shadow(k.shadow), l.added || l.add(D), b.alignDataLabel(d, l, k, null, t)) : (d.dataLabel = l = l.destroy(), w && (d.connector = w.destroy()))
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        c.prototype.alignDataLabel = function (a, b, c, e, f) {
            var d = this.chart
                , k = d.inverted
                , l = u(a.dlBox && a.dlBox.centerX, a.plotX, -9999)
                , m = u(a.plotY, -9999)
                , n = b.getBBox()
                , q, p = c.rotation
                , r = c.align
                , t = this.visible && (a.series.forceDL || d.isInsidePlot(l, Math.round(m), k) || e && d.isInsidePlot(l, k ? e.x + 1 : e.y + e.height - 1, k))
                , g = "justify" === u(c.overflow, "justify");
            if (t && (q = c.style.fontSize, q = d.renderer.fontMetrics(q, b).b, e = h({
                    x: k ? this.yAxis.len - m : l
                    , y: Math.round(k ? this.xAxis.len - l : m)
                    , width: 0
                    , height: 0
                }, e), h(c, {
                    width: n.width
                    , height: n.height
                }), p ? (g = !1, l = d.renderer.rotCorr(q, p), l = {
                    x: e.x + c.x + e.width / 2 + l.x
                    , y: e.y + c.y + {
                        top: 0
                        , middle: .5
                        , bottom: 1
                    }[c.verticalAlign] * e.height
                }, b[f ? "attr" : "animate"](l).attr({
                    align: r
                }), m = (p + 720) % 360, m = 180 < m && 360 > m, "left" === r ? l.y -= m ? n.height : 0 : "center" === r ? (l.x -= n.width / 2, l.y -= n.height / 2) : "right" === r && (l.x -= n.width, l.y -= m ? 0 : n.height), b.placed = !0, b.alignAttr = l) : (b.align(c, null, e), l = b.alignAttr), g && 0 <= e.height ? a.isLabelJustified = this.justifyDataLabel(b, c, l, n, e, f) : u(c.crop, !0) && (t = d.isInsidePlot(l.x, l.y) && d.isInsidePlot(l.x + n.width, l.y + n.height)), c.shape && !p)) b[f ? "attr" : "animate"]({
                anchorX: k ? d.plotWidth - a.plotY : a.plotX
                , anchorY: k ? d.plotHeight - a.plotX : a.plotY
            });
            t || (b.attr({
                y: -9999
            }), b.placed = !1)
        };
        c.prototype.justifyDataLabel = function (a, b, c, e, f, h) {
            var d = this.chart
                , k = b.align
                , l = b.verticalAlign
                , n, m, q = a.box ? 0 : a.padding || 0;
            n = c.x + q;
            0 > n && ("right" === k ? b.align = "left" : b.x = -n, m = !0);
            n = c.x + e.width - q;
            n > d.plotWidth && ("left" === k ? b.align = "right" : b.x = d.plotWidth - n, m = !0);
            n = c.y + q;
            0 > n && ("bottom" === l ? b.verticalAlign = "top" : b.y = -n, m = !0);
            n = c.y + e.height - q;
            n > d.plotHeight && ("top" === l ? b.verticalAlign = "bottom" : b.y = d.plotHeight - n, m = !0);
            m && (a.placed = !h, a.align(b, null, f));
            return m
        };
        k.pie && (k.pie.prototype.drawDataLabels = function () {
            var d = this
                , b = d.data
                , e, f = d.chart
                , h = d.options.dataLabels
                , k = u(h.connectorPadding, 10)
                , l = u(h.connectorWidth, 1)
                , p = f.plotWidth
                , r = f.plotHeight
                , n = Math.round(f.chartWidth / 3)
                , t, x = d.center
                , C = x[2] / 2
                , G = x[1]
                , g, y, K, N, J = [[], []]
                , P, O, z, R, S = [0, 0, 0, 0];
            d.visible && (h.enabled || d._hasPointLabels) && (m(b, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto"
                    , textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), c.prototype.drawDataLabels.apply(d), m(b, function (a) {
                a.dataLabel && (a.visible ? (J[a.half].push(a), a.dataLabel._pos = null, !F(h.style.width) && !F(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > n && (a.dataLabel.css({
                    width: .7 * n
                }), a.dataLabel.shortened = !0)) : a.dataLabel = a.dataLabel.destroy())
            }), m(J, function (b, c) {
                var l, n, q = b.length
                    , w = []
                    , t;
                if (q)
                    for (d.sortByAngle(b, c - .5), 0 < d.maxLabelDistance && (l = Math.max(0, G - C - d.maxLabelDistance), n = Math.min(G + C + d.maxLabelDistance, f.plotHeight), m(b, function (a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, G - C - a.labelDistance), a.bottom = Math.min(G + C + a.labelDistance, f.plotHeight), t = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                target: a.labelPos[1] - a.top + t / 2
                                , size: t
                                , rank: a.y
                            }, w.push(a.distributeBox))
                        }), l = n + t - l, a.distribute(w, l, l / 5)), R = 0; R < q; R++) e = b[R], K = e.labelPos, g = e.dataLabel, z = !1 === e.visible ? "hidden" : "inherit", O = l = K[1], w && F(e.distributeBox) && (void 0 === e.distributeBox.pos ? z = "hidden" : (N = e.distributeBox.size, O = e.top + e.distributeBox.pos)), delete e.positionIndex, P = h.justify ? x[0] + (c ? -1 : 1) * (C + e.labelDistance) : d.getX(O < e.top + 2 || O > e.bottom - 2 ? l : O, c, e), g._attr = {
                        visibility: z
                        , align: K[6]
                    }, g._pos = {
                        x: P + h.x + ({
                            left: k
                            , right: -k
                        }[K[6]] || 0)
                        , y: O + h.y - 10
                    }, K.x = P, K.y = O, u(h.crop, !0) && (y = g.getBBox().width, l = null, P - y < k && 1 === c ? (l = Math.round(y - P + k), S[3] = Math.max(l, S[3])) : P + y > p - k && 0 === c && (l = Math.round(P + y - p + k), S[1] = Math.max(l, S[1])), 0 > O - N / 2 ? S[0] = Math.max(Math.round(-O + N / 2), S[0]) : O + N / 2 > r && (S[2] = Math.max(Math.round(O + N / 2 - r), S[2])), g.sideOverflow = l)
            }), 0 === E(S) || this.verifyDataLabelOverflow(S)) && (this.placeDataLabels(), l && m(this.points, function (a) {
                var b;
                t = a.connector;
                if ((g = a.dataLabel) && g._pos && a.visible && 0 < a.labelDistance) {
                    z = g._attr.visibility;
                    if (b = !t) a.connector = t = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(d.dataLabelsGroup), t.attr({
                        "stroke-width": l
                        , stroke: h.connectorColor || a.color || "#666666"
                    });
                    t[b ? "attr" : "animate"]({
                        d: d.connectorPath(a.labelPos)
                    });
                    t.attr("visibility", z)
                }
                else t && (a.connector = t.destroy())
            }))
        }, k.pie.prototype.connectorPath = function (a) {
            var b = a.x
                , c = a.y;
            return u(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L"
, a[4], a[5]]
        }, k.pie.prototype.placeDataLabels = function () {
            m(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width + "px"
                    , textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, k.pie.prototype.alignDataLabel = p, k.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center
                , c = this.options
                , d = c.center
                , e = c.minSize || 80
                , h, k = null !== c.size;
            k || (null !== d[0] ? h = Math.max(b[2] - Math.max(a[1], a[3]), e) : (h = Math.max(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2), null !== d[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0], a[2])), e) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2), h < b[2] ? (b[2] = h, b[3] = Math.min(f(c.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0);
            return k
        });
        k.column && (k.column.prototype.alignDataLabel = function (a, b, e, f, h) {
            var d = this.chart.inverted
                , k = a.series
                , l = a.dlBox || a.shapeArgs
                , m = u(a.below, a.plotY > u(this.translatedThreshold, k.yAxis.len))
                , n = u(e.inside, !!this.options.stacking);
            l && (f = x(l), 0 > f.y && (f.height += f.y, f.y = 0), l = f.y + f.height - k.yAxis.len, 0 < l && (f.height -= l), d && (f = {
                x: k.yAxis.len - f.y - f.height
                , y: k.xAxis.len - f.x - f.width
                , width: f.height
                , height: f.width
            }), n || (d ? (f.x += m ? 0 : f.width, f.width = 0) : (f.y += m ? f.height : 0, f.height = 0)));
            e.align = u(e.align, !d || n ? "center" : m ? "right" : "left");
            e.verticalAlign = u(e.verticalAlign, d || n ? "middle" : m ? "top" : "bottom");
            c.prototype.alignDataLabel.call(this, a, b, e, f, h);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(K);
    (function (a) {
        var C = a.Chart
            , E = a.each
            , F = a.objectEach
            , m = a.pick;
        a = a.addEvent;
        a(C, "render", function () {
            var a = [];
            E(this.labelCollectors || [], function (e) {
                a = a.concat(e())
            });
            E(this.yAxis || [], function (e) {
                e.options.stackLabels && !e.options.stackLabels.allowOverlap && F(e.stacks, function (e) {
                    F(e, function (e) {
                        a.push(e.label)
                    })
                })
            });
            E(this.series || [], function (e) {
                var h = e.options.dataLabels
                    , x = e.dataLabelCollections || ["dataLabel"];
                (h.enabled || e._hasPointLabels) && !h.allowOverlap && e.visible && E(x, function (h) {
                    E(e.points, function (e) {
                        e[h] && e.visible && (e[h].labelrank = m(e.labelrank, e.shapeArgs && e.shapeArgs.height), a.push(e[h]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        C.prototype.hideOverlappingLabels = function (a) {
            var e = a.length
                , h = this.renderer
                , m, p, u, f, c, k, r = function (a, c, b, e, f, h, k, m) {
                    return !(f > a + b || f + k < a || h > c + e || h + m < c)
                };
            u = function (a) {
                var c, b, e, f = 2 * (a.box ? 0 : a.padding || 0);
                e = 0;
                if (a && (!a.alignAttr || a.placed)) return c = a.alignAttr || {
                    x: a.attr("x")
                    , y: a.attr("y")
                }, b = a.parentGroup, a.width || (e = a.getBBox(), a.width = e.width, a.height = e.height, e = h.fontMetrics(null, a.element).h), {
                    x: c.x + (b.translateX || 0)
                    , y: c.y + (b.translateY || 0) - e
                    , width: a.width - f
                    , height: a.height - f
                }
            };
            for (p = 0; p < e; p++)
                if (m = a[p]) m.oldOpacity = m.opacity, m.newOpacity = 1, m.absoluteBox = u(m);
            a.sort(function (a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (p = 0; p < e; p++)
                for (k = (u = a[p]) && u.absoluteBox, m = p + 1; m < e; ++m)
                    if (c = (f = a[m]) && f.absoluteBox, k && c && u !== f && 0 !== u.newOpacity && 0 !== f.newOpacity && (c = r(k.x, k.y, k.width, k.height, c.x, c.y, c.width, c.height)))(u.labelrank < f.labelrank ? u : f).newOpacity = 0;
            E(a, function (a) {
                var c, b;
                a && (b = a.newOpacity, a.oldOpacity !== b && (a.alignAttr && a.placed ? (b ? a.show(!0) : c = function () {
                    a.hide()
                }, a.alignAttr.opacity = b, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, c)) : a.attr({
                    opacity: b
                })), a.isOld = !0)
            })
        }
    })(K);
    (function (a) {
        var C = a.addEvent
            , E = a.Chart
            , F = a.createElement
            , m = a.css
            , h = a.defaultOptions
            , e = a.defaultPlotOptions
            , t = a.each
            , x = a.extend
            , p = a.fireEvent
            , u = a.hasTouch
            , f = a.inArray
            , c = a.isObject
            , k = a.Legend
            , r = a.merge
            , l = a.pick
            , d = a.Point
            , b = a.Series
            , v = a.seriesTypes
            , q = a.svg
            , I;
        I = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this
                    , b = a.chart.pointer
                    , c = function (a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                t(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (t(a.trackerGroups, function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (u) a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(m).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                p(this, "afterDrawTracker")
            }
            , drawTrackerGraph: function () {
                var a = this
                    , b = a.options
                    , c = b.trackByArea
                    , d = [].concat(c ? a.areaPath : a.graphPath)
                    , e = d.length
                    , f = a.chart
                    , h = f.pointer
                    , k = f.renderer
                    , l = f.options.tooltip.snap
                    , g = a.tracker
                    , m, r = function () {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    }
                    , x = "rgba(192,192,192," + (q ? .0001 : .002) + ")";
                if (e && !c)
                    for (m = e + 1; m--;) "M" === d[m] && d.splice(m + 1, 0, d[m + 1] - l, d[m + 2], "L"), (m && "M" === d[m] || m === e) && d.splice(m, 0, "L", d[m - 2] + l, d[m - 1]);
                g ? g.attr({
                    d: d
                }) : a.graph && (a.tracker = k.path(d).attr({
                    "stroke-linejoin": "round"
                    , stroke: x
                    , fill: c ? x : "none"
                    , "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * l)
                    , visibility: a.visible ? "visible" : "hidden"
                    , zIndex: 2
                }).addClass(c ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), t([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", r).on("mouseout", function (a) {
                        h.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (u) a.on("touchstart", r)
                }));
                p(this, "afterDrawTracker")
            }
        };
        v.column && (v.column.prototype.drawTracker = I.drawTrackerPoint);
        v.pie && (v.pie.prototype.drawTracker = I.drawTrackerPoint);
        v.scatter && (v.scatter.prototype.drawTracker = I.drawTrackerPoint);
        x(k.prototype, {
            setItemEvents: function (a, b, c) {
                var e = this
                    , f = e.chart.renderer.boxWrapper
                    , h = "highcharts-legend-" + (a instanceof d ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    f.addClass(h);
                    b.css(e.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(r(a.visible ? e.itemStyle : e.itemHiddenStyle));
                    f.removeClass(h);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    f.removeClass(h);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : p(a, "legendItemClick", b, c)
                })
            }
            , createCheckboxForItem: function (a) {
                a.checkbox = F("input", {
                    type: "checkbox"
                    , className: "highcharts-legend-checkbox"
                    , checked: a.selected
                    , defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function (b) {
                    p(a.series || a, "checkboxClick", {
                        checked: b.target.checked
                        , item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        h.legend.itemStyle.cursor = "pointer";
        x(E.prototype, {
            showResetZoom: function () {
                function a() {
                    b.zoomOut()
                }
                var b = this
                    , c = h.lang
                    , d = b.options.chart.resetZoomButton
                    , e = d.theme
                    , f = e.states
                    , k = "chart" === d.relativeTo ? null : "plotBox";
                p(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, f && f.hover).attr({
                        align: d.position.align
                        , title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, k)
                })
            }
            , zoomOut: function () {
                p(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            }
            , zoom: function (a) {
                var b, d = this.pointer
                    , e = !1
                    , f;
                !a || a.resetSelection ? (t(this.axes, function (a) {
                    b = a.zoom()
                }), d.initiated = !1) : t(a.xAxis.concat(a.yAxis), function (a) {
                    var c = a.axis;
                    d[c.isXAxis ? "zoomX" : "zoomY"] && (b = c.zoom(a.min, a.max), c.displayBtn && (e = !0))
                });
                f = this.resetZoomButton;
                e && !f ? this.showResetZoom() : !e && c(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(l(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }
            , pan: function (a, b) {
                var c = this
                    , d = c.hoverPoints
                    , e;
                d && t(d, function (a) {
                    a.setState()
                });
                t("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz
                        , f = a[d ? "chartX" : "chartY"]
                        , d = d ? "mouseDownX" : "mouseDownY"
                        , h = c[d]
                        , g = (b.pointRange || 0) / 2
                        , k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1
                        , l = b.getExtremes()
                        , n = b.toValue(h - f, !0) + g * k
                        , k = b.toValue(h + b.len - f, !0) - g * k
                        , m = k < n
                        , h = m ? k : n
                        , n = m ? n : k
                        , k = Math.min(l.dataMin, g ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding))
                        , g = Math.max(l.dataMax, g ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding))
                        , m = k - h;
                    0 < m && (n += m, h = k);
                    m = n - g;
                    0 < m && (n = g, h -= m);
                    b.series.length && h !== l.min && n !== l.max && (b.setExtremes(h, n, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                m(c.container, {
                    cursor: "move"
                })
            }
        });
        x(d.prototype, {
            select: function (a, b) {
                var c = this
                    , d = c.series
                    , e = d.chart;
                a = l(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function () {
                    c.selected = c.options.selected = a;
                    d.options.data[f(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || t(e.getSelectedPoints(), function (a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[f(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }
            , onMouseOver: function (a) {
                var b = this.series.chart
                    , c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            }
            , onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                t(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }
            , importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this
                        , c = r(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        C(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            }
            , setState: function (a, b) {
                var c = Math.floor(this.plotX)
                    , d = this.plotY
                    , f = this.series
                    , h = f.options.states[a || "normal"] || {}
                    , k = e[f.type].marker && f.options.marker
                    , m = k && !1 === k.enabled
                    , q = k && k.states && k.states[a || "normal"] || {}
                    , g = !1 === q.enabled
                    , r = f.stateMarkerGraphic
                    , t = this.marker || {}
                    , u = f.chart
                    , w = f.halo
                    , v, C = k && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === h.enabled || a && (g || m && !1 === q.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
                    C && (v = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(f.pointAttribs(this, a), l(u.options.chart.animation, h.animation)), v && this.graphic.animate(v, l(u.options.chart.animation, q.animation, k.animation)), r && r.hide();
                    else {
                        if (a && q) {
                            k = t.symbol || f.symbol;
                            r && r.currentSymbol !== k && (r = r.destroy());
                            if (r) r[b ? "animate" : "attr"]({
                                x: v.x
                                , y: v.y
                            });
                            else k && (f.stateMarkerGraphic = r = u.renderer.symbol(k, v.x, v.y, v.width, v.height).add(f.markerGroup), r.currentSymbol = k);
                            r && r.attr(f.pointAttribs(this, a))
                        }
                        r && (r[a && u.isInsidePlot(c, d, u.inverted) ? "show" : "hide"](), r.element.point = this)
                    }(c = h.halo) && c.size ? (w || (f.halo = w = u.renderer.path().add((this.graphic || r).parentGroup)), w.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), w.attr({
                        "class": "highcharts-halo highcharts-color-" + l(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : "")
                        , zIndex: -1
                    }), w.point = this, w.attr(x({
                        fill: this.color || f.color
                        , "fill-opacity": c.opacity
                    }, c.attributes))) : w && w.point && w.point.haloPath && w.animate({
                        d: w.point.haloPath(0)
                    }, null, w.hide);
                    this.state = a;
                    p(this, "afterSetState")
                }
            }
            , haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        x(b.prototype, {
            onMouseOver: function () {
                var a = this.chart
                    , b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && p(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }
            , onMouseOut: function () {
                var a = this.options
                    , b = this.chart
                    , c = b.tooltip
                    , d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && p(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }
            , setState: function (a) {
                var b = this
                    , c = b.options
                    , d = b.graph
                    , e = c.states
                    , f = c.lineWidth
                    , c = 0;
                a = a || "";
                if (b.state !== a && (t([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (f = {
                            "stroke-width": f
                        }, d.animate(f, l(e[a || "normal"] && e[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(f), c += 1
            }
            , setVisible: function (a, b) {
                var c = this
                    , d = c.chart
                    , e = c.legendItem
                    , f, h = d.options.chart.ignoreHiddenSeries
                    , k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                t(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && t(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                t(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                p(c, f);
                !1 !== b && d.redraw()
            }
            , show: function () {
                this.setVisible(!0)
            }
            , hide: function () {
                this.setVisible(!1)
            }
            , select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                p(this, a ? "select" : "unselect")
            }
            , drawTracker: I.drawTrackerGraph
        })
    })(K);
    (function (a) {
        var C = a.Chart
            , E = a.each
            , F = a.inArray
            , m = a.isArray
            , h = a.isObject
            , e = a.pick
            , t = a.splat;
        C.prototype.setResponsive = function (e) {
            var h = this.options.responsive
                , m = []
                , f = this.currentResponsive;
            h && h.rules && E(h.rules, function (c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, m, e)
            }, this);
            var c = a.merge.apply(0, a.map(m, function (c) {
                    return a.find(h.rules, function (a) {
                        return a._id === c
                    }).chartOptions
                }))
                , m = m.toString() || void 0;
            m !== (f && f.ruleIds) && (f && this.update(f.undoOptions, e), m ? (this.currentResponsive = {
                ruleIds: m
                , mergedOptions: c
                , undoOptions: this.currentOptions(c)
            }, this.update(c, e)) : this.currentResponsive = void 0)
        };
        C.prototype.matchResponsiveRule = function (a, h) {
            var m = a.condition;
            (m.callback || function () {
                return this.chartWidth <= e(m.maxWidth, Number.MAX_VALUE) && this.chartHeight <= e(m.maxHeight, Number.MAX_VALUE) && this.chartWidth >= e(m.minWidth, 0) && this.chartHeight >= e(m.minHeight, 0)
            }).call(this) && h.push(a._id)
        };
        C.prototype.currentOptions = function (e) {
            function p(e, c, k, r) {
                var f;
                a.objectEach(e, function (a, b) {
                    if (!r && -1 < F(b, ["series", "xAxis", "yAxis"]))
                        for (a = t(a), k[b] = [], f = 0; f < a.length; f++) c[b][f] && (k[b][f] = {}, p(a[f], c[b][f], k[b][f], r + 1));
                    else h(a) ? (k[b] = m(a) ? [] : {}, p(a, c[b] || {}, k[b], r + 1)) : k[b] = c[b] || null
                })
            }
            var u = {};
            p(e, this.options, u, 0);
            return u
        }
    })(K);
    return K
});
//# sourceMappingURL=highcharts.js.map