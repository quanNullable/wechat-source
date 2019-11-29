function t(t) {
    var e = Math.floor(1e3 * Math.random());
    this.settings = t || {
        key: "PAYMENT_DEFAULT_STORE_" + e
    };
}

t.prototype = {
    get: function() {
        var t = null, e = this;
        try {
            t = wx.getStorageSync(e.settings.key);
        } catch (t) {}
        return t;
    },
    getAttr: function(t) {
        var e = this.get();
        return e && e[t] || "";
    },
    set: function(t) {
        var e = this;
        t = t || {};
        try {
            wx.setStorageSync(e.settings.key, t);
        } catch (t) {}
    },
    setAttr: function(t, e) {
        var r = this, n = r.get() || {};
        n[t] = e, r.set(n);
    },
    remove: function() {
        var t = this;
        try {
            wx.removeStorageSync(t.settings.key);
        } catch (t) {}
    }
}, module.exports = {
    BaseStore: t
};