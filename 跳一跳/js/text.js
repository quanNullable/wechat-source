function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}(), i = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("./lib/three")), s = (require("./config"), function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./font"))), r = function() {
    function r(t, o) {
        if (e(this, r), this.material = new i.MeshBasicMaterial({
            color: o.fillStyle || 16777215,
            transparent: !0
        }), o.opacity && (this.material.opacity = o.opacity), this.options = o || {}, this.obj = new i.Object3D(), 
        this.obj.name = "text", o.chinese) {
            var n = new i.Mesh(new i.TextBufferGeometry(t, {
                font: s.default,
                size: 1,
                height: .1
            }), this.material);
            this.obj.add(n), "center" == o.textAlign && (n.position.x = 1.1 * t.length / -2);
        } else {
            this.scores = [], this.plus = new i.Mesh(new i.TextBufferGeometry("+", {
                font: s.default,
                size: 3,
                height: .1
            }), this.material), this.sub = new i.Mesh(new i.TextBufferGeometry("-", {
                font: s.default,
                size: 3,
                height: .1
            }), this.material);
            for (var a = this.options.sumScore ? 5 : 2, h = 0; h < 10; ++h) {
                for (var u = [], l = new i.TextBufferGeometry(h, {
                    font: s.default,
                    size: 3,
                    height: .1
                }), f = 0; f < a; ++f) {
                    var c = new i.Mesh(l, this.material);
                    c.using = !1, u.push(c);
                }
                this.scores.push(u);
            }
            this.setScore(t);
        }
    }
    return t(r, [ {
        key: "setScore",
        value: function(e) {
            this.sub.visible = !1, this.plus.visible = !1;
            var t = !1;
            e < 0 && (t = !0, e = Math.abs(e));
            var i = 2.5 * (e = e.toString()).length, s = this.options.sumScore ? 5 : 2, r = "center" == this.options.textAlign ? -i / 2 : 0;
            this.options.plusScore && (r = -(i + 2.5) / 2, t || (this.plus.position.x = r, this.obj.add(this.plus), 
            this.plus.visible = !0), r += 2.5), t && (this.sub.position.x = r, this.obj.add(this.sub), 
            this.sub.visible = !0, r += 2.5);
            for (var o = 0, n = this.scores.length; o < n; ++o) for (h = 0; h < s; ++h) this.scores[o][h].using && (this.obj.remove(this.scores[o][h]), 
            this.scores[o][h].using = !1);
            for (var o = 0, n = e.length; o < n; ++o) {
                for (var a = this.scores[e[o]], h = 0; h < s; ++h) if (!a[h].using) {
                    a[h].position.x = r, a[h].using = !0, this.obj.add(a[h]);
                    break;
                }
                r += 2.5;
            }
        }
    }, {
        key: "changeStyle",
        value: function(e) {
            Object.assign(this.options, e), this.obj.updateMatrix();
        }
    } ]), r;
}();

exports.default = r;