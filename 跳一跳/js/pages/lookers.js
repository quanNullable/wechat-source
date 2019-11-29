function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
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
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../lib/three")), a = require("../config"), r = (e(require("../store/storage")), 
e(require("../scroll/scrollHandler")), window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio), s = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, o = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, h = o * r, c = s * r, l = a.FRUSTUMSIZE, u = c / h * l, d = [ "bg" ], f = function() {
    function e(i) {
        t(this, e), this.texture = {}, this.material = {}, this.geometry = {}, this.obj = {}, 
        this.canvas = {}, this.context = {}, this._touchInfo = {
            trackingID: -1,
            maxDy: 0,
            maxDx: 0
        }, this.cwidth = c, this.cheight = 50, this.options = Object.assign({}, {}, i), 
        this._createPlane();
    }
    return i(e, [ {
        key: "showLookers",
        value: function(e) {
            this.showState = !0, e = e || {}, this._drawLookers(e);
        }
    }, {
        key: "showLookersShare",
        value: function(e) {
            this.showState = !0, e = e || {};
        }
    }, {
        key: "hideLookers",
        value: function() {
            this.showState = !1;
            for (var e = 0; e < d.length; e++) this.obj[d[e]].visible = !1, this.options.camera.remove(this.obj[d[e]]);
        }
    }, {
        key: "_drawLookers",
        value: function(e) {
            var t = this, i = this.context.bg;
            i.fillStyle = "pink", i.strokeStyle = "red", i.lineWidth = 2 * r, i.clearRect(0, 0, this._cx(414), this._cx(this.cheight));
            var n = this.cheight;
            if (e.avaImg) {
                for (var a = c - e.avatar.length * this._cx(32), s = this, o = 0; o < e.avatar.length; o++) !function() {
                    var i = o * t._cx(36) + a;
                    t._drawImageCenter(e.avatar[o], i, n / 2, s._cx(25), s._cx(25), "bg", function() {
                        s._drawImageCenter("res/2d/ava_square.png", i, n / 2, s._cx(26), s._cx(26), "bg");
                    });
                }();
                i.fillStyle = "rgba(0,0,0,0.56)", i.font = this._cf(14), i.textAlign = "right", 
                i.textBaseline = "middle", i.fillText(e.num + "人围观", a - this._cx(20), this._cx(16));
            }
            e.icon && this._drawImageCenter("res/observShare.png", this._cx(35), n / 2, this._cx(14), this._cx(16), "bg"), 
            e.wording && (i.fillStyle = "rgba(0,0,0,0.56)", i.font = this._cf(14), i.textAlign = "left", 
            i.textBaseline = "middle", i.fillText("邀请围观", this._cx(55), this._cx(16))), this._updatePlane("bg");
        }
    }, {
        key: "_createPlane",
        value: function() {
            for (var e = 0; e < d.length; e++) this.canvas[d[e]] = document.createElement("canvas"), 
            this.context[d[e]] = this.canvas[d[e]].getContext("2d"), this.canvas[d[e]].width = c, 
            this.canvas[d[e]].height = this.cheight * r, this.texture[d[e]] = new n.Texture(this.canvas[d[e]]), 
            this.material[d[e]] = new n.MeshBasicMaterial({
                map: this.texture[d[e]],
                transparent: !0
            }), this.geometry[d[e]] = new n.PlaneGeometry(u, this.cheight / o * l), this.obj[d[e]] = new n.Mesh(this.geometry[d[e]], this.material[d[e]]), 
            this.material[d[e]].map.minFilter = n.LinearFilter, this.obj[d[e]].position.y = -(.5 - this.cheight / 2 / o) * l, 
            this.obj[d[e]].position.x = 0, this.obj[d[e]].position.z = 9 - .001 * e;
        }
    }, {
        key: "_updatePlane",
        value: function(e) {
            this.showState && (this.texture[e].needsUpdate = !0, this.obj[e].visible = !0, this.options.camera.add(this.obj[e]));
        }
    }, {
        key: "_drawImageCenter",
        value: function(e, t, i, n, a, r, s) {
            "/0" != e && "/96" != e && "/64" != e && e || (e = "res/ava.png");
            var o = new Image(), h = this, c = this.context[r];
            o.onload = function() {
                c.drawImage(o, t - n / 2, i - a / 2, n, a), !!s && s(), h._updatePlane(r);
            }, o.onerror = function() {
                !!s && s();
            }, o.src = e;
        }
    }, {
        key: "_cx",
        value: function(e) {
            return e * s / 414 * r;
        }
    }, {
        key: "_cf",
        value: function(e) {
            return e * r * s / 414 + "px Helvetica";
        }
    } ]), e;
}();

exports.default = f;