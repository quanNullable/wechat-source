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
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), r = (function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    t.default = e;
}(require("./lib/three")), require("./config")), o = (require("./lib/animation"), 
e(require("./text"))), a = e(require("./ui/adBoard")), s = e(require("./ui/propBoard")), n = e(require("./ui/propAniManager")), d = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, u = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, 
function() {
    function e(i, r, a, s) {
        t(this, e);
        this.game = s, this.full2D = a, this.scene = i, this.camera = r, this.score = 0, 
        this.double = 1, this.scoreText = new o.default("0", {
            fillStyle: 2434341,
            sumScore: !0,
            opacity: .8
        }), this.scoreText.obj.position.set(-13, 21, -10), this.scoreText.obj.updateMatrix(), 
        this.scoreText.obj.matrixAutoUpdate = !1, this.camera.add(this.scoreText.obj);
    }
    return i(e, [ {
        key: "reset",
        value: function() {
            this.scoreText.setScore(0), this.score = 0, this.double = 1;
        }
    }, {
        key: "update",
        value: function() {}
    }, {
        key: "hideScore",
        value: function() {
            this.scoreText.obj.visible = !1;
        }
    }, {
        key: "showScore",
        value: function() {
            this.scoreText.obj.visible = !0;
        }
    }, {
        key: "addScore",
        value: function(e, t, i, r) {
            return r ? (this.score += e, void this.setScore(this.score)) : (t ? 1 === this.double ? this.double = 2 : this.double += 2 : this.double = 1, 
            i && this.double <= 2 && (this.double *= 2), this.double = Math.min(32, this.double), 
            e *= this.double, this.score += e, this.setScore(this.score), e);
        }
    }, {
        key: "showAdAvator",
        value: function(e, t, i) {
            this.adBoard && this.adBoard.destroy && (console.error("Already exist adBoard"), 
            this.adBoard.destroy()), this.adBoard = new a.default({
                camera: e,
                trademark_url: t,
                ad_url: i
            }), this.game.reporter.rpShowAdCard();
        }
    }, {
        key: "hideAdAvator",
        value: function() {
            this.adBoard && this.adBoard.destroy && this.adBoard.destroy(), this.adBoard = null;
        }
    }, {
        key: "showProp",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.propBoard && this.adBoard.destroy && this.propBoard.destroy(), this.propBoard = new s.default({
                camera: this.camera,
                game: this.game,
                usingId: t,
                destroyCb: function() {
                    e.hideProp();
                }
            });
        }
    }, {
        key: "hideProp",
        value: function() {
            this.propBoard && this.propBoard.destroy && this.propBoard.destroy(), this.propBoard = null;
        }
    }, {
        key: "audienceWatchPropAni",
        value: function(e) {
            this.propAniManager || (this.propAniManager = new n.default({
                camera: this.camera,
                game: this.game
            })), this.propAniManager.show(e);
        }
    }, {
        key: "setScore",
        value: function(e) {
            this.scoreText.setScore(e), r.BLOCK.minRadiusScale -= .005, r.BLOCK.minRadiusScale = Math.max(.25, r.BLOCK.minRadiusScale), 
            r.BLOCK.maxRadiusScale -= .005, r.BLOCK.maxRadiusScale = Math.max(r.BLOCK.maxRadiusScale, .6), 
            r.BLOCK.maxDistance += .03, r.BLOCK.maxDistance = Math.min(22, r.BLOCK.maxDistance);
        }
    } ]), e;
}());

exports.default = u;