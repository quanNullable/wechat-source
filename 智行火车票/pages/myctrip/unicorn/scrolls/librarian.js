var r = require("./depot.js"), n = require("./iohelper.js"), e = {
    cardScroll: require("./card.js"),
    iohelperScroll: n
}, t = function r(n) {
    if (n && n instanceof Array) {
        for (var e = [], t = 0; t < n.length; t++) e[t] = r(n[t]);
        return e;
    }
    if (n && n instanceof Object) {
        var i = {};
        for (var u in n) i[u] = r(n[u]);
        return i;
    }
    return n;
}, i = function(n) {
    var e = r.depotConfig.files;
    if (void 0 !== n) return _.find(e, function(r) {
        return r.fileName === n;
    });
}, u = function(r) {
    var n = i(r);
    return _.result(n, "scrollName");
}, o = function(r) {
    var n = i(r);
    return _.result(n, "requireKey");
}, a = function(r) {
    var n = i(r);
    return _.has(n, "requireKey");
}, c = function(r, n, e) {
    var t = {};
    if (_.has(n, "requireScrollId")) {
        var i = o(r), u = _.find(e, function(r) {
            return r.scrollId === n.requireScrollId;
        });
        _.each(n[i], function(r) {
            var n = _.find(u[i], function(n) {
                return r === n.paramId;
            });
            _.extend(t, _.result(n, "paramValue"));
        }), n[i].length = "", n[i] = t;
    }
    return n;
}, f = function(r, n) {
    var e = i(r).scrollInfo;
    if (void 0 === n) {
        var t = [];
        return _.each(e, function(r) {
            t.push(r.scrollId);
        }), t;
    }
    var u = [];
    return _.each(n, function(r) {
        var n = _.find(e, function(n) {
            return n.scrollType === r;
        });
        if (void 0 !== n) {
            var t = _.result(n, "scrollId");
            u.push(t);
        }
    }), u;
};

module.exports = {
    getTargetValue: function(r, n, i) {
        2 === arguments.length && "string" == typeof n && (i = n, n = void 0);
        var o = f(r, n), l = u(r);
        if (!(o && o instanceof Array)) return null;
        var s = [];
        if (_.each(o, function(n) {
            var i = e[l][l], u = t(i), o = _.filter(u, function(r) {
                return r.scrollId === n;
            });
            o = o[0], a(r) && (o = c(r, o, u)), s.push(o);
        }), void 0 !== i || 2 === arguments.length && "string" == typeof n) {
            var v = [];
            return _.each(s, function(r) {
                var n = _.pick(r, i)[i];
                v.push(n);
            }), v;
        }
        return s;
    }
};