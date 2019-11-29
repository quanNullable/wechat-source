function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function t(t, i) {
        for (var n = 0; n < i.length; n++) {
            var e = i[n];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(i, n, e) {
        return n && t(i.prototype, n), e && t(i, e), i;
    };
}(), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./scroll")), e = function() {
    function e(i) {
        t(this, e), i = i || {}, this._options = i, this._itemSize = i.itemSize || 0, this._innerOffsetHeight = i.innerOffsetHeight || 0, 
        this._outterOffsetHeight = i.outterOffsetHeight || 0, this._extent = this._innerOffsetHeight - this._outterOffsetHeight, 
        this._position = i.position || 0, this._scroll = new n.default(this._extent), this.updatePosition();
    }
    return i(e, [ {
        key: "onTouchStart",
        value: function() {
            this._startPosition = this._position, this._lastChangePos = this._startPosition, 
            this._startPosition > 0 ? this._startPosition /= .5 : this._startPosition < -this._extent && (this._startPosition = (this._startPosition + this._extent) / .5 - this._extent), 
            this._animation && (this._animation.cancel(), this._scrolling = !1), this.updatePosition();
        }
    }, {
        key: "onTouchMove",
        value: function(t, i) {
            var n = this._startPosition;
            (n += i) > 0 ? n *= .5 : n < -this._extent && (n = .5 * (n + this._extent) - this._extent), 
            this._position = n, this.updatePosition();
        }
    }, {
        key: "onTouchEnd",
        value: function(t, i, n) {
            var e = this;
            this._scroll.set(this._position, n.y), this._scrolling = !0, this._lastChangePos = this._position, 
            this._animation = this.animation(this._scroll, function() {
                var t = (Date.now() - e._scroll._startTime) / 1e3, i = e._scroll.x(t);
                e._position = i, e.updatePosition();
            }, function() {
                e._scrolling = !1;
            });
        }
    }, {
        key: "scrollTo",
        value: function(t) {
            this._animation && (this._animation.cancel(), this._scrolling = !1), "number" == typeof t && (this._position = -t), 
            this._position < -this._extent ? this._position = -this._extent : this._position > 0 && (this._position = 0), 
            this.updatePosition();
        }
    }, {
        key: "updatePosition",
        value: function() {
            this._options.updatePosition(this._position);
        }
    }, {
        key: "animation",
        value: function(t, i, n) {
            function e(i, n, s, o) {
                if (!i || !i.cancelled) {
                    s(n);
                    var a = t.done();
                    a || i.cancelled || (i.id = requestAnimationFrame(e.bind(null, i, n, s, o))), a && o && o(n);
                }
            }
            var s = {
                id: 0,
                cancelled: !1
            };
            return e(s, t, i, n), {
                cancel: function(t) {
                    t && t.id && cancelAnimationFrame(t.id), t && (t.cancelled = !0);
                }.bind(null, s),
                model: t
            };
        }
    }, {
        key: "setInnerHeight",
        value: function(t, i) {
            this._innerOffsetHeight = t, this._extent = this._innerOffsetHeight - this._outterOffsetHeight, 
            this._scroll.setExtent(this._extent);
        }
    } ]), e;
}();

exports.default = e;