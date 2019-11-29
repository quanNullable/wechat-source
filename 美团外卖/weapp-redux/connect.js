function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var s = t(require("./stateDiff.js")), i = t(require("./warning.js")), e = t(require("./wrapActionCreators.js")), n = require("../utils/object-assign.js"), r = function(t) {
    return {};
}, u = function(t) {
    return {
        dispatch: t
    };
};

module.exports = function(t, o) {
    var a = Boolean(t), c = t || r, f = getApp(), h = void 0;
    return h = "function" == typeof o ? o : o ? (0, e.default)(o) : u, function(t) {
        var e = function() {
            if (this.unsubscribe) {
                var t = this.store.getState(), i = c(t, this.data, this), e = this.__state, n = (0, 
                s.default)(i, e);
                n && (this.__state = i, this.setData(n));
            }
        }, r = t.onLoad, u = t.onUnload;
        return n({}, t, h(f.store.dispatch), {
            onLoad: function(t) {
                var s = this;
                this.store = f.store, this.store || (0, i.default)("Store对象不存在!"), a && (this.__state = {}, 
                this.unsubscribe = this.store.subscribe(function() {
                    e.call(s);
                }), e.call(this)), "function" == typeof r && r.call(this, t);
            },
            onUnload: function() {
                "function" == typeof this.unsubscribe && this.unsubscribe(), this.unsubscribe = null, 
                "function" == typeof u && u.call(this);
            }
        });
    };
};