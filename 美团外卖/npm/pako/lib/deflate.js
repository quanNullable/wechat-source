function t(i) {
    if (!(this instanceof t)) return new t(i);
    this.options = n.assign({
        level: h,
        method: l,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: d,
        to: ""
    }, i || {});
    var f = this.options;
    f.raw && f.windowBits > 0 ? f.windowBits = -f.windowBits : f.gzip && f.windowBits > 0 && f.windowBits < 16 && (f.windowBits += 16), 
    this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new o(), 
    this.strm.avail_out = 0;
    var p = e.deflateInit2(this.strm, f.level, f.method, f.windowBits, f.memLevel, f.strategy);
    if (p !== u) throw new Error(r[p]);
    if (f.header && e.deflateSetHeader(this.strm, f.header), f.dictionary) {
        var w;
        if (w = "string" == typeof f.dictionary ? s.string2buf(f.dictionary) : "[object ArrayBuffer]" === a.call(f.dictionary) ? new Uint8Array(f.dictionary) : f.dictionary, 
        (p = e.deflateSetDictionary(this.strm, w)) !== u) throw new Error(r[p]);
        this._dict_set = !0;
    }
}

function i(i, e) {
    var n = new t(e);
    if (n.push(i, !0), n.err) throw n.msg || r[n.err];
    return n.result;
}

var e = require("./zlib/deflate.js"), n = require("./utils/common.js"), s = require("./utils/strings.js"), r = require("./zlib/messages.js"), o = require("./zlib/zstream.js"), a = Object.prototype.toString, u = 0, h = -1, d = 0, l = 8;

t.prototype.push = function(t, i) {
    var r, o, h = this.strm, d = this.options.chunkSize;
    if (this.ended) return !1;
    o = i === ~~i ? i : !0 === i ? 4 : 0, "string" == typeof t ? h.input = s.string2buf(t) : "[object ArrayBuffer]" === a.call(t) ? h.input = new Uint8Array(t) : h.input = t, 
    h.next_in = 0, h.avail_in = h.input.length;
    do {
        if (0 === h.avail_out && (h.output = new n.Buf8(d), h.next_out = 0, h.avail_out = d), 
        1 !== (r = e.deflate(h, o)) && r !== u) return this.onEnd(r), this.ended = !0, !1;
        0 !== h.avail_out && (0 !== h.avail_in || 4 !== o && 2 !== o) || ("string" === this.options.to ? this.onData(s.buf2binstring(n.shrinkBuf(h.output, h.next_out))) : this.onData(n.shrinkBuf(h.output, h.next_out)));
    } while ((h.avail_in > 0 || 0 === h.avail_out) && 1 !== r);
    return 4 === o ? (r = e.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === u) : 2 !== o || (this.onEnd(u), 
    h.avail_out = 0, !0);
}, t.prototype.onData = function(t) {
    this.chunks.push(t);
}, t.prototype.onEnd = function(t) {
    t === u && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), 
    this.chunks = [], this.err = t, this.msg = this.strm.msg;
}, exports.Deflate = t, exports.deflate = i, exports.deflateRaw = function(t, e) {
    return e = e || {}, e.raw = !0, i(t, e);
}, exports.gzip = function(t, e) {
    return e = e || {}, e.gzip = !0, i(t, e);
};