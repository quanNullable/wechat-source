function n(n) {
    var i = t(n), r = e.call(this, i);
    if (r) {
        var u = r.getInstance.call(this, n, i);
        return u.init(), u;
    }
    return null;
}

function t(n) {
    var t = n && n.BizType || "";
    return n && t ? i(t) : null;
}

function e(n) {
    return u[n || ""];
}

function i(n) {
    return n;
}

var r, u = require("./librarian.js"), a = function() {
    function n() {
        var n = 0, t = {};
        this.add = function(e, i) {
            this.containsKey(e) || n++, t[e] = i;
        }, this.getValue = function(n) {
            return this.containsKey(n) ? t[n] : null;
        }, this.remove = function(e) {
            this.containsKey(e) && delete t[e] && n--;
        }, this.containsKey = function(n) {
            return n in t;
        }, this.containsValue = function(n) {
            return this.getValues().indexOf(n) > -1;
        }, this.getValues = function() {
            return _.map(t, function(n) {
                return n;
            });
        }, this.getKeys = function() {
            return _.keys(t);
        }, this.getSize = function() {
            return n;
        }, this.clear = function() {
            n = 0, t = {};
        };
    }
    var t;
    return {
        getInstance: function() {
            return t || (t = new n()), t;
        }
    };
}();

module.exports = {
    getActionData: function(n) {
        var t = null;
        if (r && r.containsKey(n)) {
            var e = r.getValue(n);
            t = _.find(e, function(n) {
                return "Detail" === n.ActionCode;
            });
        }
        return t || {};
    },
    getRenderData: function(t) {
        r = a.getInstance();
        var e = n(t);
        e.initCardData();
        var i = e.getRenderData(), u = e.getActionData();
        return r.add(i.baseData.orderId, u), i;
    }
};