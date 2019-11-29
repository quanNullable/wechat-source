String.prototype.splice || (String.prototype.splice = function(e, t, r) {
    return this.slice(0, e) + r + this.slice(e + Math.abs(t));
});

module.exports = {
    parseURL: function(e) {
        0 == e.indexOf(".") && (e = e.substring(e.indexOf("?"))), e = "http://ctrip.com" + e;
        var t = new URL(e);
        return {
            source: e,
            protocol: t.protocol.replace(":", ""),
            host: t.hostname,
            port: t.port,
            query: t.search,
            params: function() {
                for (var e, r = {}, a = t.search.replace(/^\?/, "").split("&"), p = a.length, s = 0; s < p; s++) a[s] && (r[(e = a[s].split("="))[0]] = decodeURIComponent(e[1]));
                return r;
            }(),
            file: (t.pathname.match(/\/([^\/?#]+)$/i) || [ , "" ])[1],
            hash: t.hash.replace("#", ""),
            path: t.pathname.replace(/^([^\/])/, "/$1"),
            relative: (t.href.match(/tps?:\/\/[^\/]+(.+)/) || [ , "" ])[1],
            segments: t.pathname.replace(/^\//, "").split("/")
        };
    },
    serializeParams: function(e) {
        var t = [];
        for (var r in e) t.push(r + "=" + e[r] || "");
        return t.join("&");
    }
};