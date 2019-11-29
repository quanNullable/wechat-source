function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), r = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("./lib/three")), n = require("./config"), i = new r.RingBufferGeometry(n.WAVE.innerRadius, n.WAVE.outerRadius, n.WAVE.thetaSeg), o = function() {
    function o() {
        e(this, o);
        var t = new r.MeshBasicMaterial({
            color: n.COLORS.pureWhite,
            transparent: !0
        });
        this.obj = new r.Mesh(i, t), this.obj.rotation.x = -Math.PI / 2, this.obj.name = "wave";
    }
    return t(o, [ {
        key: "reset",
        value: function() {
            this.obj.scale.set(1, 1, 1), this.obj.material.opacity = 1, this.obj.visible = !1;
        }
    } ]), o;
}();

exports.default = o;