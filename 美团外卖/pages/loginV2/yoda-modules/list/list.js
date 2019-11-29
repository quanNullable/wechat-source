var t = require("../utils/config.js");

Page({
    data: {
        list: [],
        show: !0
    },
    onLoad: function(r) {
        var e = [], i = r.riskLevel.split("|"), l = !0, o = !1, a = void 0;
        try {
            for (var n, s = i[Symbol.iterator](); !(l = (n = s.next()).done); l = !0) {
                var u = n.value.split(","), f = [], v = [], h = !0, y = !1, c = void 0;
                try {
                    for (var d, g = u[Symbol.iterator](); !(h = (d = g.next()).done); h = !0) {
                        var p = d.value;
                        if (!t.modules[p]) {
                            f = [], v = [];
                            break;
                        }
                        f.push(p), v.push(t.modules[p]);
                    }
                } catch (r) {
                    y = !0, c = r;
                } finally {
                    try {
                        !h && g.return && g.return();
                    } finally {
                        if (y) throw c;
                    }
                }
                f.length > 0 && v.length > 0 && e.push({
                    key: f.join(","),
                    value: v.join("+")
                });
            }
        } catch (r) {
            o = !0, a = r;
        } finally {
            try {
                !l && s.return && s.return();
            } finally {
                if (o) throw a;
            }
        }
        this.setData({
            list: e
        });
    },
    bindClick: function(t) {
        console.log(t);
    }
});