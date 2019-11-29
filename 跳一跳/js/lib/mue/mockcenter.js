function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), o = require("./util"), i = e(require("./mock/requestmocker")), n = e(require("./mock/socketmocker")), u = new (function() {
    function e() {
        t(this, e), this._mocker = {
            request: null,
            socket: null
        }, this.origWX = null;
    }
    return r(e, [ {
        key: "mocker",
        value: function(e) {
            return this._mocker[e] || (this._hookWX(), this._initMocker(e)), this._mocker[e] || {};
        }
    }, {
        key: "enable",
        value: function(e) {
            e || (e = {
                request: !0,
                socket: !0
            });
            for (var t in e) e[t] && !!this.mocker(t).enable && this.mocker(t).enable();
        }
    }, {
        key: "addRule",
        value: function(e, t) {
            this.mocker(e).addRule(t);
        }
    }, {
        key: "_hookWX",
        value: function() {
            if (!this.origWX) {
                this.origWX = wx, wx = {};
                for (var e in this.origWX) "[object Function]" === (0, o.getTypeOf)(this.origWX[e]) ? wx[e] = this.origWX[e].bind(this.origWX) : wx[e] = this.origWX[e];
            }
        }
    }, {
        key: "_initMocker",
        value: function(e) {
            "request" === e && (this._mocker.request || (this._mocker.request = new i.default())), 
            "socket" === e && (this._mocker.socket || (this._mocker.socket = new n.default()));
        }
    } ]), e;
}())();

exports.default = u;