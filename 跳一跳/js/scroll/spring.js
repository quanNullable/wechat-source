function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function t(t, i) {
        for (var o = 0; o < i.length; o++) {
            var e = i[o];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(i, o, e) {
        return o && t(i.prototype, o), e && t(i, e), i;
    };
}(), o = function() {
    function o(i, e, n) {
        t(this, o), this._m = i, this._k = e, this._c = n, this._solution = null, this._endPosition = 0, 
        this._startTime = 0;
    }
    return i(o, [ {
        key: "_solve",
        value: function(t, i) {
            var o = this._c, e = this._m, n = this._k, s = o * o - 4 * e * n;
            if (0 == s) {
                var r = t, a = i / ((_ = -o / (2 * e)) * t);
                return {
                    x: function(t) {
                        return (r + a * t) * Math.pow(Math.E, _ * t);
                    },
                    dx: function(t) {
                        var i = Math.pow(Math.E, _ * t);
                        return _ * (r + a * t) * i + a * i;
                    }
                };
            }
            if (s > 0) {
                var h = (-o - Math.sqrt(s)) / (2 * e), u = (-o + Math.sqrt(s)) / (2 * e), r = t - (a = (i - h * t) / (u - h));
                return {
                    x: function(t) {
                        var i, o;
                        return t === this._t && (i = this._powER1T, o = this._powER2T), this._t = t, i || (i = this._powER1T = Math.pow(Math.E, h * t)), 
                        o || (o = this._powER2T = Math.pow(Math.E, u * t)), r * i + a * o;
                    },
                    dx: function(t) {
                        var i, o;
                        return t === this._t && (i = this._powER1T, o = this._powER2T), this._t = t, i || (i = this._powER1T = Math.pow(Math.E, h * t)), 
                        o || (o = this._powER2T = Math.pow(Math.E, u * t)), r * h * i + a * u * o;
                    }
                };
            }
            var l = Math.sqrt(4 * e * n - o * o) / (2 * e), _ = -o / 2 * e, r = t, a = (i - _ * t) / l;
            return {
                x: function(t) {
                    return Math.pow(Math.E, _ * t) * (r * Math.cos(l * t) + a * Math.sin(l * t));
                },
                dx: function(t) {
                    var i = Math.pow(Math.E, _ * t), o = Math.cos(l * t), e = Math.sin(l * t);
                    return i * (a * l * o - r * l * e) + _ * i * (a * e + r * o);
                }
            };
        }
    }, {
        key: "x",
        value: function(t) {
            return void 0 == t && (t = (new Date().getTime() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(t) : 0;
        }
    }, {
        key: "dx",
        value: function(t) {
            return void 0 == t && (t = (new Date().getTime() - this._startTime) / 1e3), this._solution ? this._solution.dx(t) : 0;
        }
    }, {
        key: "setEnd",
        value: function(t, i, o) {
            if (o || (o = new Date().getTime()), t != this._endPosition || !this.almostZero(i, .4)) {
                i = i || 0;
                var e = this._endPosition;
                this._solution && (this.almostZero(i, .4) && (i = this._solution.dx((o - this._startTime) / 1e3)), 
                e = this._solution.x((o - this._startTime) / 1e3), this.almostZero(i, .4) && (i = 0), 
                this.almostZero(e, .4) && (e = 0), e += this._endPosition), this._solution && this.almostZero(e - t, .4) && this.almostZero(i, .4) || (this._endPosition = t, 
                this._solution = this._solve(e - this._endPosition, i), this._startTime = o);
            }
        }
    }, {
        key: "snap",
        value: function(t) {
            this._startTime = new Date().getTime(), this._endPosition = t, this._solution = {
                x: function() {
                    return 0;
                },
                dx: function() {
                    return 0;
                }
            };
        }
    }, {
        key: "done",
        value: function(t) {
            return t || (t = new Date().getTime()), this.almostEqual(this.x(), this._endPosition, .4) && this.almostZero(this.dx(), .4);
        }
    }, {
        key: "almostEqual",
        value: function(t, i, o) {
            return t > i - o && t < i + o;
        }
    }, {
        key: "almostZero",
        value: function(t, i) {
            return this.almostEqual(t, 0, i);
        }
    } ]), o;
}();

exports.default = o;