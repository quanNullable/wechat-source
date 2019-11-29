function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t;
    };
}(), i = require("../config"), a = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../lib/three")), n = require("../lib/animation"), o = 1.3, s = 1.5, r = function() {
    function r(t) {
        var i = t.camera, n = t.game;
        e(this, r), this.game = n, this.camera = i;
        var m = new a.CircleGeometry(s, 32), h = new a.MeshBasicMaterial({
            color: 16777215,
            transparent: !0,
            opacity: 1
        });
        this.bg = new a.Mesh(m, h);
        var c = new a.CircleGeometry(o, 32), l = new a.MeshBasicMaterial({
            transparent: !0,
            opacity: 1
        });
        this.main = new a.Mesh(c, l), this.main.position.set(0, 0, .1), this.mesh = new a.Object3D(), 
        this.mesh.add(this.bg), this.mesh.add(this.main), this.mesh.rotateY(-Math.PI / 4), 
        this.mesh.rotateX(-Math.PI / 16 * 3), this.mesh.visible = !1;
    }
    return t(r, [ {
        key: "show",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, a = i.PROP_BOARD.skin["s" + t];
            i.loader.load(a, function(t) {
                e.main.material.map = t, e.main.material.needsUpdate = !0, e.mesh.visible = !0;
            });
            var o = this.game.bottle.obj.position.clone(), s = o.x, r = o.z;
            this.mesh.position.set(s, 10, r), this.bg.material.opacity = 0, this.main.material.opacity = 0, 
            this.game.scene.add(this.mesh), n.customAnimation.to(this.mesh.position, .4, {
                y: 13
            }), n.customAnimation.to(this.bg.material, .4, {
                opacity: 1
            }), n.customAnimation.to(this.main.material, .4, {
                opacity: 1
            }), n.customAnimation.to(this.bg.material, .4, {
                opacity: 0,
                delay: .6
            }), n.customAnimation.to(this.main.material, .4, {
                opacity: 0,
                delay: .6,
                onComplete: function() {
                    e.game.scene.remove(e.mesh), e.mesh.visible = !1;
                }
            });
        }
    } ]), r;
}();

exports.default = r;