function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}(), t = function() {
    function t(n, o) {
        e(this, t), this._mocker = n, this._rule = o, this._userOpt = {}, this._cb = {};
    }
    return n(t, [ {
        key: "send",
        value: function(e) {
            this._userOpt = e, this._mocker._send(this);
        }
    }, {
        key: "close",
        value: function(e) {
            this._userOpt = e, this._mocker._close(this);
        }
    }, {
        key: "onOpen",
        value: function(e) {
            this._cb.onOpen = e;
        }
    }, {
        key: "onClose",
        value: function(e) {
            this._cb.onClose = e;
        }
    }, {
        key: "onError",
        value: function(e) {
            this._cb.onError = e;
        }
    }, {
        key: "onMessage",
        value: function(e) {
            this._cb.onMessage = e;
        }
    }, {
        key: "sendMessage",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            this._applyCallback("onMessage", e, n);
        }
    }, {
        key: "closeSocket",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            this._applyCallback("onClose", e, n);
        }
    }, {
        key: "throwError",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            this._applyCallback("onError", e, n);
        }
    }, {
        key: "_applyCallback",
        value: function(e, n, t) {
            var o = this;
            setTimeout(function() {
                o._cb[e] && o._cb[e].call(o, n);
            }, t);
        }
    } ]), t;
}();

exports.default = t;