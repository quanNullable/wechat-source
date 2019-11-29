function e(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function e(e, o) {
        for (var t = 0; t < o.length; t++) {
            var n = o[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(o, t, n) {
        return t && e(o.prototype, t), n && e(o, n), o;
    };
}(), t = require("../config"), n = function() {
    function n(o) {
        var i = this;
        e(this, n), this.game = o, this.musicPool = [ "success", "combo1", "combo2", "combo3", "combo4", "combo5", "combo6", "combo7", "combo8", "scale_intro", "scale_loop", "restart", "fall", "fall_2", "pop", "icon", "sing", "store", "pay", "luban", "relax" ], 
        this.musicPool.forEach(function(e, o) {
            setTimeout(function(e) {
                this[e] = wx.createInnerAudioContext(), this[e].src = t.AUDIO[e];
            }.bind(i, e), 2 * o);
        }), setTimeout(function() {
            i.scale_loop.loop = !0, i.icon.onEnded(function() {
                i.icon.destroy();
            }), i.store.onPlay(function() {
                i.store.before && i.store.before();
            }), i.store.onEnded(function() {
                i.store.after && i.store.after(), i.timer = setTimeout(function() {
                    i.canTimer && (i.store.seek(0), i.store.play());
                }, 3e3);
            }), i.pay.onPlay(function() {
                i.pay.before && i.pay.before();
            }), i.pay.onEnded(function() {
                i.pay.after && i.pay.after(), i.timer = setTimeout(function() {
                    i.canTimer && (i.pay.seek(0), i.pay.play());
                }, 3e3);
            }), i.sing.onEnded(function() {
                i.timer = setTimeout(function() {
                    i.canTimer && (i.sing.seek(0), i.sing.play());
                }, 3e3);
            }), i.luban.onEnded(function() {
                i.timer = setTimeout(function() {
                    i.canTimer && (i.luban.seek(0), i.luban.play());
                }, 3e3);
            }), i.scale_intro.onEnded(function() {
                "prepare" == i.game.bottle.status && i.scale_loop.play();
            });
        }, 200);
    }
    return o(n, [ {
        key: "resetAudio",
        value: function() {
            var e = this;
            this.musicPool.forEach(function(o) {
                e[o].stop();
            });
        }
    }, {
        key: "register",
        value: function(e, o, t) {
            console.log("ley", e), this[e].before = o, this[e].after = t;
        }
    }, {
        key: "setTimerFlag",
        value: function(e) {
            this.canTimer = e;
        }
    }, {
        key: "clearTimer",
        value: function() {
            this.timer && (clearTimeout(this.timer), this.timer = null);
        }
    }, {
        key: "replay",
        value: function(e) {
            var o = this[e];
            o ? (o.stop(), o.play()) : console.warn("there is no music", e);
        }
    } ]), n;
}();

exports.default = n;