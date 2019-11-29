Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    Linear: function(t, n, e, u) {
        return e * t / u + n;
    },
    Quad: {
        easeIn: function(t, n, e, u) {
            return e * (t /= u) * t + n;
        },
        easeOut: function(t, n, e, u) {
            return -e * (t /= u) * (t - 2) + n;
        },
        easeInOut: function(t, n, e, u) {
            return (t /= u / 2) < 1 ? e / 2 * t * t + n : -e / 2 * (--t * (t - 2) - 1) + n;
        }
    },
    Cubic: {
        easeIn: function(t, n, e, u) {
            return e * (t /= u) * t * t + n;
        },
        easeOut: function(t, n, e, u) {
            return e * ((t = t / u - 1) * t * t + 1) + n;
        },
        easeInOut: function(t, n, e, u) {
            return (t /= u / 2) < 1 ? e / 2 * t * t * t + n : e / 2 * ((t -= 2) * t * t + 2) + n;
        }
    },
    Quart: {
        easeIn: function(t, n, e, u) {
            return e * (t /= u) * t * t * t + n;
        },
        easeOut: function(t, n, e, u) {
            return -e * ((t = t / u - 1) * t * t * t - 1) + n;
        },
        easeInOut: function(t, n, e, u) {
            return (t /= u / 2) < 1 ? e / 2 * t * t * t * t + n : -e / 2 * ((t -= 2) * t * t * t - 2) + n;
        }
    },
    Quint: {
        easeIn: function(t, n, e, u) {
            return e * (t /= u) * t * t * t * t + n;
        },
        easeOut: function(t, n, e, u) {
            return e * ((t = t / u - 1) * t * t * t * t + 1) + n;
        },
        easeInOut: function(t, n, e, u) {
            return (t /= u / 2) < 1 ? e / 2 * t * t * t * t * t + n : e / 2 * ((t -= 2) * t * t * t * t + 2) + n;
        }
    },
    Sine: {
        easeIn: function(t, n, e, u) {
            return -e * Math.cos(t / u * (Math.PI / 2)) + e + n;
        },
        easeOut: function(t, n, e, u) {
            return e * Math.sin(t / u * (Math.PI / 2)) + n;
        },
        easeInOut: function(t, n, e, u) {
            return -e / 2 * (Math.cos(Math.PI * t / u) - 1) + n;
        }
    },
    Expo: {
        easeIn: function(t, n, e, u) {
            return 0 == t ? n : e * Math.pow(2, 10 * (t / u - 1)) + n;
        },
        easeOut: function(t, n, e, u) {
            return t == u ? n + e : e * (1 - Math.pow(2, -10 * t / u)) + n;
        },
        easeInOut: function(t, n, e, u) {
            return 0 == t ? n : t == u ? n + e : (t /= u / 2) < 1 ? e / 2 * Math.pow(2, 10 * (t - 1)) + n : e / 2 * (2 - Math.pow(2, -10 * --t)) + n;
        }
    },
    Circ: {
        easeIn: function(t, n, e, u) {
            return -e * (Math.sqrt(1 - (t /= u) * t) - 1) + n;
        },
        easeOut: function(t, n, e, u) {
            return e * Math.sqrt(1 - (t = t / u - 1) * t) + n;
        },
        easeInOut: function(t, n, e, u) {
            return (t /= u / 2) < 1 ? -e / 2 * (Math.sqrt(1 - t * t) - 1) + n : e / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
        }
    },
    Elastic: {
        easeIn: function(t, n, e, u, a, r) {
            var o;
            return 0 == t ? n : 1 == (t /= u) ? n + e : (void 0 === r && (r = .3 * u), !a || a < Math.abs(e) ? (o = r / 4, 
            a = e) : o = r / (2 * Math.PI) * Math.asin(e / a), -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) + n);
        },
        easeOut: function(t, n, e, u, a, r) {
            var o;
            return 0 == t ? n : 1 == (t /= u) ? n + e : (void 0 === r && (r = .3 * u), !a || a < Math.abs(e) ? (a = e, 
            o = r / 4) : o = r / (2 * Math.PI) * Math.asin(e / a), a * Math.pow(2, -10 * t) * Math.sin((t * u - o) * (2 * Math.PI) / r) + e + n);
        },
        easeInOut: function(t, n, e, u, a, r) {
            var o;
            return 0 == t ? n : 2 == (t /= u / 2) ? n + e : (void 0 === r && (r = u * (.3 * 1.5)), 
            !a || a < Math.abs(e) ? (a = e, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(e / a), 
            t < 1 ? a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * -.5 + n : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * .5 + e + n);
        }
    },
    Back: {
        easeIn: function(t, n, e, u, a) {
            return void 0 === a && (a = 1.70158), e * (t /= u) * t * ((a + 1) * t - a) + n;
        },
        easeOut: function(t, n, e, u, a) {
            return void 0 === a && (a = 1.70158), e * ((t = t / u - 1) * t * ((a + 1) * t + a) + 1) + n;
        },
        easeInOut: function(t, n, e, u, a) {
            return void 0 === a && (a = 1.70158), (t /= u / 2) < 1 ? e / 2 * (t * t * ((1 + (a *= 1.525)) * t - a)) + n : e / 2 * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + n;
        }
    },
    Bounce: {
        easeIn: function(n, e, u, a) {
            return u - t.Bounce.easeOut(a - n, 0, u, a) + e;
        },
        easeOut: function(t, n, e, u) {
            return (t /= u) < 1 / 2.75 ? e * (7.5625 * t * t) + n : t < 2 / 2.75 ? e * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? e * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : e * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n;
        },
        easeInOut: function(n, e, u, a) {
            return n < a / 2 ? .5 * t.Bounce.easeIn(2 * n, 0, u, a) + e : .5 * t.Bounce.easeOut(2 * n - a, 0, u, a) + .5 * u + e;
        }
    }
};

exports.default = t;