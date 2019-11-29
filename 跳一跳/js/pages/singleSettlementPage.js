function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../lib/three")), r = function() {
    function r(t) {
        e(this, r);
        var o = new n.MeshBasicMaterial({
            color: 32960
        }), i = new n.Mesh(new n.PlaneGeometry(5, 5), o), a = i.clone(), u = i.clone();
        a.position.set(0, -20, -1), i.position.set(-10, -20, -1), u.position.set(10, -20, -1), 
        this.ui = [ a, i, u ], this.camera = t;
    }
    return t(r, [ {
        key: "show",
        value: function() {
            var e = this;
            this.ui.forEach(function(t) {
                e.camera.add(t);
            });
        }
    }, {
        key: "hide",
        value: function() {
            var e = this;
            this.ui.forEach(function(t) {
                e.camera.remove(t);
            });
        }
    } ]), r;
}();

exports.default = r;