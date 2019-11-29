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

var i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}(), s = e(require("./storage")), u = e(require("../network/network")), n = function() {
    function e(i) {
        t(this, e), this.times = s.default.getHistoryTimes(), this.times || (this.times = {
            accurate: 0,
            bonus: 0
        }), this.game = i, this.limitScore = 5;
    }
    return i(e, [ {
        key: "verifyScore",
        value: function(e) {
            e >= this.times.accurate ? (this.times.accurate = e, this.times.bonus >= this.limitScore ? this.upLoadHistoryTimes() : s.default.saveHistoryTimes(this.times)) : this.upLoadHistoryTimes();
        }
    }, {
        key: "addOne",
        value: function() {
            this.times.bonus++;
        }
    }, {
        key: "checkUp",
        value: function() {
            this.times.bonus >= this.limitScore ? this.upLoadHistoryTimes() : s.default.saveHistoryTimes(this.times);
        }
    }, {
        key: "upLoadHistoryTimes",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = this.times.accurate + this.times.bonus;
            u.default.requestSettlement(e, i, this.afterUpload.bind(this), t);
        }
    }, {
        key: "afterUpload",
        value: function(e) {
            e && (this.times.accurate += this.times.bonus, this.times.bonus = 0), s.default.saveHistoryTimes(this.times);
        }
    }, {
        key: "getTimes",
        value: function() {
            return this.times.accurate + this.times.bonus;
        }
    } ]), e;
}();

exports.default = n;