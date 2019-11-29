function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i;
    }
    return Array.from(e);
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
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
}(), r = require("../config"), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../lib/three")), o = require("../lib/animation"), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../lib/mue/eventcenter")), s = r.AD_BOARD.RADIUS, u = r.AD_BOARD.x, l = function() {
    function l(e) {
        var i = this;
        t(this, l), this.camera = e.camera;
        var o = e.trademark_url;
        this.ad_url = e.ad_url;
        var h = new n.MeshBasicMaterial({
            map: r.loader.load(r.BASE_TRADE_MARK_RUL),
            transparent: !0,
            opacity: 0
        }), c = new n.CircleGeometry(s, 32);
        this.mesh = new n.Mesh(c, h), this.ePosition = [ u, 22, 10 ], this.sPosition = [ u, 20, 10 ], 
        this.mesh.visible = !1, this.camera.add(this.mesh), a.default.on(r.EVENT.TRIGGER_AD_JUMP, this.jumpToH5.bind(this)), 
        o ? r.loader.load(o, function(e) {
            i.mesh.material.map = e, i.mesh.material.needsUpdate = !0, i.show();
        }, function() {}, function(e) {
            console.error("load AD texture error:" + e), i.show();
        }) : this.show();
    }
    return i(l, [ {
        key: "show",
        value: function() {
            var t;
            (t = this.mesh.position).set.apply(t, e(this.sPosition)), this.mesh.material.opacity = 0, 
            this.mesh.visible = !0, o.customAnimation.to(this.mesh.position, .4, {
                y: this.ePosition[1]
            }), o.customAnimation.to(this.mesh.material, .4, {
                opacity: 1
            });
        }
    }, {
        key: "jumpToH5",
        value: function() {
            this.mesh.visible && (wx.openUrl && wx.openUrl({
                url: this.ad_url
            }), this.mesh.visible = !1, a.default.emit(r.EVENT.JUMP_AD, {}));
        }
    }, {
        key: "destroy",
        value: function() {
            this.camera.remove(this.mesh), a.default.off(r.EVENT.TRIGGER_AD_JUMP, this.jumpToH5.bind(this));
        }
    } ]), l;
}();

exports.default = l;