function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), i = require("../config"), r = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../lib/three")), n = (require("../lib/animation"), function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../lib/mue/eventcenter"))), s = i.PROP_BOARD.p.RADIUS, a = function() {
    function a(t) {
        var o = this;
        e(this, a), this.camera = t.camera, this.usingId = t.usingId, this.destroyCb = t.destroyCb, 
        this.game = t.game;
        var u = i.PROP_BOARD.skin["s" + t.usingId], h = new r.MeshBasicMaterial({
            transparent: !0
        }), l = new r.CircleGeometry(s, 32);
        this.mesh = new r.Mesh(l, h), this.mesh.position.set(i.PROP_BOARD.p.x, i.PROP_BOARD.p.y, -1), 
        this.mesh.visible = !1, this.mesh.material.depthTest = !1, this.camera.add(this.mesh), 
        n.default.on(i.EVENT.TRIGGER_PROP, this.touch.bind(this)), i.loader.load(u, function(e) {
            o.mesh.material.map = e, o.mesh.visible = !0, o.mesh.material.needsUpdate = !0;
        });
    }
    return t(a, [ {
        key: "touch",
        value: function() {
            this.mesh.visible && this.game.gameCtrl.touchProp({
                id: this.usingId,
                cb: this.afterUsingPorp.bind(this),
                seed: this.game.randomSeed
            });
        }
    }, {
        key: "afterUsingPorp",
        value: function(e) {
            e && this.destroyCb();
        }
    }, {
        key: "destroy",
        value: function() {
            this.camera.remove(this.mesh), n.default.off(i.EVENT.TRIGGER_PROP, this.touch.bind(this));
        }
    } ]), a;
}();

exports.default = a;