Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TweenAnimation = exports.customAnimation = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./tween")), n = -1, t = n - 1, o = {};

(exports.customAnimation = {}).to = function(e, t, o) {
    t *= 1e3;
    o.delay;
    for (var i in o) if ("delay" === i) ; else if ("onComplete" === i || "onEnded" === i) ; else if ("ease" === i) ; else if ("name" === i) ; else if (o.delay || 0 !== t) {
        var a = ++n;
        setTimeout(function(n) {
            return function() {
                r(e[n], o[n], t, o.ease || "Linear", function(t, r, i) {
                    i && o.onEnded && o.onEnded(), void 0 !== t && (e[n] = t), r && o.onComplete && o.onComplete();
                }, o.name, a);
            };
        }(i), 1e3 * (o.delay || 0));
    } else e[i] = o[i], o.onComplete && o.onComplete(), o.onEnded && o.onEnded();
};

var r = exports.TweenAnimation = function(r, i, a, l, s, u, f) {
    var f = f || ++n;
    u && (o[u] || (o[u] = []), o[u].push(f));
    var c = function(e) {
        return "function" == typeof e;
    }, d = function(e) {
        return "number" == typeof e;
    }, m = function(e) {
        return "string" == typeof e;
    }, p = function(e) {
        return "[object Array]" == Object.prototype.toString.call(e);
    }, v = function(e) {
        if (d(e)) return e;
        if (m(e)) {
            if (/\d+m?s$/.test(e)) return /ms/.test(e) ? 1 * e.replace("ms", "") : 1e3 * e.replace("s", "");
            if (/^\d+$/.test(e)) return +e;
        }
        return -1;
    };
    d(r) && d(i) || p(r) && p(i) || window.console && console.error("from和to两个参数必须且为数值");
    var g = !1;
    p(r) && p(i) && (g = !0);
    var w = e.default;
    if (!w) return window.console && console.error("缓动算法函数缺失"), 0;
    var y = {
        duration: 300,
        easing: "Linear",
        callback: function() {}
    }, A = function(e) {
        c(e) ? y.callback = e : -1 != v(e) ? y.duration = v(e) : m(e) && (y.easing = e);
    };
    A(a), A(l), A(s), window.requestAnimationFrame || (requestAnimationFrame = function(e) {
        setTimeout(e, 17);
    });
    var b = -1, h = Math.ceil(y.duration / 17);
    y.easing = y.easing.slice(0, 1).toUpperCase() + y.easing.slice(1);
    var k, x = y.easing.split(".");
    if (1 == x.length ? k = w[x[0]] : 2 == x.length && (k = w[x[0]] && w[x[0]][x[1]]), 
    0 != c(k)) {
        var C = Date.now(), q = Date.now();
        !function e() {
            var n = Date.now(), a = n - q, l = Math.ceil(1e3 / a);
            if (q = n, a > 100) requestAnimationFrame(e); else {
                if (l >= 30) b++; else {
                    var s = Math.floor((n - C) / 17);
                    b = s > b ? s : b + 1;
                }
                var c;
                if (g) {
                    c = [];
                    for (var d = 0, m = r.length; d < m; ++d) c.push(k(b, r[d], i[d] - r[d], h));
                } else c = k(b, r, i - r, h);
                if (b <= h && f > t) {
                    if (u && o[u] && o[u].indexOf(f) < 0) return;
                    y.callback(c), requestAnimationFrame(e);
                } else if (b > h && f > t) {
                    if (u && o[u] && o[u].indexOf(f) < 0) return;
                    y.callback(i, !0, !0);
                } else y.callback(void 0, !1, !0);
            }
        }();
    } else console.error('没有找到名为"' + y.easing + '"的动画算法');
};

r.kill = function(e) {
    o[e] = [];
}, r.killAll = function() {
    t = n;
    for (var e in o) o[e] = [];
};