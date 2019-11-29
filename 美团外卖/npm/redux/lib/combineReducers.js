function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var n = t && t.type;
    return "Given action " + (n && '"' + n.toString() + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.';
}

function n(e) {
    Object.keys(e).forEach(function(t) {
        var n = e[t];
        if (void 0 === n(void 0, {
            type: r.ActionTypes.INIT
        })) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
        if (void 0 === n(void 0, {
            type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".")
        })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + r.ActionTypes.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.');
    });
}

exports.__esModule = !0, exports.default = function(e) {
    for (var r = Object.keys(e), i = {}, o = 0; o < r.length; o++) {
        var u = r[o];
        "function" == typeof e[u] && (i[u] = e[u]);
    }
    var a = Object.keys(i), d = void 0;
    try {
        n(i);
    } catch (e) {
        d = e;
    }
    return function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
        if (d) throw d;
        for (var r = !1, o = {}, u = 0; u < a.length; u++) {
            var s = a[u], c = i[s], f = e[s], l = c(f, n);
            if (void 0 === l) {
                var h = t(s, n);
                throw new Error(h);
            }
            o[s] = l, r = r || l !== f;
        }
        return r ? o : e;
    };
};

var r = require("./createStore.js");

e(require("../../lodash/isPlainObject.js")), e(require("./utils/warning.js"));