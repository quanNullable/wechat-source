function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = (function(e) {
    e && e.__esModule;
}(require("../store/storage")), window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio), i = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, 
window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, 
wx.loadFont("res/num.ttf")), a = function() {
    function n(t) {
        e(this, n), this.texture = {}, this.material = {};
    }
    return t(n, [ {
        key: "getShareCard",
        value: function(e, t) {
            e = e || {};
            this.canvas || (this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), 
            this.canvas.width = 693, this.canvas.height = 558);
            var n = this.context;
            if ("shareBattle" == e.type) {
                n.fillStyle = "white", n.fillRect(0, 0, 693, 558);
                a = this;
                this._drawImageCanvas1("res/changlle_share.png", 0, 0, 693, 558, "share", function() {
                    n.fillStyle = "rgba(0,0,0,0.8)", n.font = "180px " + i, n.textBaseline = "middle", 
                    n.textAlign = "center", n.fillText(e.score || 0, 356.5, 334.8), !!t && t(a.canvas);
                });
            }
            if ("history" == e.type) {
                n.fillStyle = "white", n.fillRect(0, 0, 693, 558);
                a = this;
                this._drawImageCanvas1("res/high_score.png", 0, 0, 693, 558, "share", function() {
                    n.fillStyle = "#00c777", n.font = "180px " + i, n.textBaseline = "middle", n.textAlign = "center", 
                    n.fillText(e.score || 0, 356.5, .68 * 558), !!t && t(a.canvas);
                });
            }
            if ("week" == e.type || "skin" == e.type) {
                n.fillStyle = "white", n.fillRect(0, 0, 693, 558);
                var a = this;
                this._drawImageCanvas1("res/high_score_week.png", 0, 0, 693, 558, "share", function() {
                    n.fillStyle = "#00c777", n.font = "180px " + i, n.textBaseline = "middle", n.textAlign = "center", 
                    n.fillText(e.score || 0, 356.5, .68 * 558), !!t && t(a.canvas);
                });
            }
        }
    }, {
        key: "_smallReat",
        value: function() {
            for (var e = this.context, t = [ "red", "blue", "green", "yellow", "skyblue" ], n = 0; n < t.length; n++) {
                e.fillStyle = t[n];
                for (var i = 0; i < 5; i++) e.fillRect(553 * Math.random(), 691 * Math.random(), 15, 15);
            }
        }
    }, {
        key: "_drawImageCanvas",
        value: function(e, t, n, i, a, r, l) {
            var o = new Image(), s = this;
            o.onload = function() {
                s.context.drawImage(o, t - i / 2, n - a / 2, i, a), !!l && l(s.canvas);
            }, o.onerror = function() {
                !!l && l(s.canvas);
            }, o.src = e;
        }
    }, {
        key: "_drawImageCanvas1",
        value: function(e, t, n, i, a, r, l) {
            "/0" != e && "/96" != e && "/64" != e && e || (e = "res/ava.png");
            var o = new Image(), s = this;
            o.onload = function() {
                s.context.drawImage(o, t, n, i, a), !!l && l(s.canvas);
            }, o.onerror = function() {
                !!l && l(s.canvas);
            }, o.src = e;
        }
    } ]), n;
}();

exports.default = a;