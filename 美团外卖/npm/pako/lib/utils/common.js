var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, t = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

exports.assign = function(t) {
    for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
        var n = e.shift();
        if (n) {
            if ("object" != (void 0 === n ? "undefined" : r(n))) throw new TypeError(n + "must be non-object");
            for (var o in n) n.hasOwnProperty(o) && (t[o] = n[o]);
        }
    }
    return t;
}, exports.shrinkBuf = function(r, t) {
    return r.length === t ? r : r.subarray ? r.subarray(0, t) : (r.length = t, r);
};

var e = {
    arraySet: function(r, t, e, n, o) {
        if (t.subarray && r.subarray) r.set(t.subarray(e, e + n), o); else for (var a = 0; a < n; a++) r[o + a] = t[e + a];
    },
    flattenChunks: function(r) {
        var t, e, n, o, a, f;
        for (n = 0, t = 0, e = r.length; t < e; t++) n += r[t].length;
        for (f = new Uint8Array(n), o = 0, t = 0, e = r.length; t < e; t++) a = r[t], f.set(a, o), 
        o += a.length;
        return f;
    }
}, n = {
    arraySet: function(r, t, e, n, o) {
        for (var a = 0; a < n; a++) r[o + a] = t[e + a];
    },
    flattenChunks: function(r) {
        return [].concat.apply([], r);
    }
};

exports.setTyped = function(r) {
    r ? (exports.Buf8 = Uint8Array, exports.Buf16 = Uint16Array, exports.Buf32 = Int32Array, 
    exports.assign(exports, e)) : (exports.Buf8 = Array, exports.Buf16 = Array, exports.Buf32 = Array, 
    exports.assign(exports, n));
}, exports.setTyped(t);