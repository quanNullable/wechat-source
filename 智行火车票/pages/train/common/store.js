function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this.key = t;
    }
    return t(n, [ {
        key: "set",
        value: function(e) {
            if (void 0 == e) return wx.setStorageSync(this.key, "");
            wx.setStorageSync(this.key, e);
        }
    }, {
        key: "get",
        value: function() {
            return wx.getStorageSync(this.key);
        }
    }, {
        key: "setAttr",
        value: function(e, t) {
            var n = this.get() || {};
            n[e] = t, this.set(n);
        }
    }, {
        key: "getAttr",
        value: function(e) {
            return this.get()[e];
        }
    }, {
        key: "removeAttr",
        value: function(e) {
            wx.removeStorageSync(e);
        }
    } ], [ {
        key: "getInstance",
        value: function(e) {
            return new n(e);
        }
    } ]), n;
}();

exports.TrainStationStore = n.getInstance("TRAIN_STATION_STORE"), exports.TrainQueryStore = n.getInstance("TRAIN_QUERY_STORE"), 
exports.TrainBookStore = n.getInstance("TRAIN_BOOK_STORE"), exports.TrainPassStore = n.getInstance("TRAIN_PASS_STORE"), 
exports.TrainUserStore = n.getInstance("TRAIN_USER_STORE");