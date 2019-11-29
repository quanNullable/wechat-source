function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
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
}(), e = t(require("./friction")), s = t(require("./spring")), r = function() {
    function t(n) {
        i(this, t), this._extent = n, this._friction = new e.default(.01), this._spring = new s.default(1, 90, 20), 
        this._startTime = 0, this._springing = !1, this._springOffset = 0;
    }
    return n(t, [ {
        key: "set",
        value: function(t, i) {
            this._friction.set(t, i), t > 0 && i >= 0 ? (this._springOffset = 0, this._springing = !0, 
            this._spring.snap(t), this._spring.setEnd(0)) : t < -this._extent && i <= 0 ? (this._springOffset = 0, 
            this._springing = !0, this._spring.snap(t), this._spring.setEnd(-this._extent)) : this._springing = !1, 
            this._startTime = new Date().getTime();
        }
    }, {
        key: "x",
        value: function(t) {
            if (!this._startTime) return 0;
            if (t || (t = (new Date().getTime() - this._startTime) / 1e3), this._springing) return this._spring.x() + this._springOffset;
            var i = this._friction.x(t), n = this.dx(t);
            return i < -this._extent && n <= 0 && (this._springing = !0, this._spring.setEnd(0, n), 
            i < -this._extent ? this._springOffset = -this._extent : this._springOffset = 0, 
            i = this._spring.x() + this._springOffset), i;
        }
    }, {
        key: "dx",
        value: function(t) {
            var i = 0;
            return i = this._lastTime === t ? this._lastDx : this._springing ? this._spring.dx(t) : this._friction.dx(t), 
            this._lastTime = t, this._lastDx = i, i;
        }
    }, {
        key: "done",
        value: function() {
            return this._springing ? this._spring.done() : this._friction.done();
        }
    }, {
        key: "setExtent",
        value: function(t) {
            this._extent = t;
        }
    } ]), t;
}();

exports.default = r;