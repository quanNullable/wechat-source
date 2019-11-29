function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var r = e[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, i, r) {
        return i && t(e.prototype, i), r && t(e, r), e;
    };
}(), i = function() {
    function i(e) {
        t(this, i), this._drag = e, this._dragLog = Math.log(e), this._x = 0, this._v = 0, 
        this._startTime = 0;
    }
    return e(i, [ {
        key: "set",
        value: function(t, e) {
            this._x = t, this._v = e, this._startTime = new Date().getTime();
        }
    }, {
        key: "x",
        value: function(t) {
            void 0 === t && (t = (new Date().getTime() - this._startTime) / 1e3);
            var e;
            return e = t === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, t), 
            this._dt = t, this._x + this._v * e / this._dragLog - this._v / this._dragLog;
        }
    }, {
        key: "dx",
        value: function(t) {
            void 0 === t && (t = (new Date().getTime() - this._startTime) / 1e3);
            var e;
            return e = t === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, t), 
            this._dt = t, this._v * e;
        }
    }, {
        key: "done",
        value: function() {
            return Math.abs(this.dx()) < 3;
        }
    } ]), i;
}();

exports.default = i;