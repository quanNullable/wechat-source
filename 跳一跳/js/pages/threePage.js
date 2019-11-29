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
}(require("../lib/three")), n = require("../config"), i = function() {
    function i(t, o, a, s, u, l) {
        e(this, i);
        var f = new r.PlaneBufferGeometry(s, u), c = new r.MeshBasicMaterial({
            map: n.loader.load(l),
            transparent: !0
        });
        this.obj = new r.Mesh(f, c), this.obj.visible = !0, this.obj.position.y = o || 0, 
        this.obj.position.z = a || 0, this.obj.position.x = t || 0;
    }
    return t(i, [ {
        key: "rotate",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            this.timer || (this.timer = setInterval(function() {
                e.obj.rotation.z += t;
            }, 20));
        }
    }, {
        key: "destroy",
        value: function() {
            this.timer && (clearInterval(this.timer), this.timer = null);
        }
    } ]), i;
}();

exports.default = i;