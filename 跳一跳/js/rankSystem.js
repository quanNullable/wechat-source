function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e, i, a, o, r) {
    return t.moveTo(e, i + r), t.lineTo(e, i + o - r), t.quadraticCurveTo(e, i + o, e + r, i + o), 
    t.lineTo(e + a - r, i + o), t.quadraticCurveTo(e + a, i + o, e + a, i + o - r), 
    t.lineTo(e + a, i + r), t.quadraticCurveTo(e + a, i, e + a - r, i), t.lineTo(e + r, i), 
    t.quadraticCurveTo(e, i, e, i + r), t;
}

function i(t) {
    t.computeBoundingBox();
    var e = t.boundingBox.max, i = t.boundingBox.min, a = new o.Vector2(0 - i.x, 0 - i.y), r = new o.Vector2(e.x - i.x, e.y - i.y), s = t.faces;
    t.faceVertexUvs[0] = [];
    for (var n = 0; n < s.length; n++) {
        var h = t.vertices[s[n].a], u = t.vertices[s[n].b], c = t.vertices[s[n].c];
        t.faceVertexUvs[0].push([ new o.Vector2((h.x + a.x) / r.x, (h.y + a.y) / r.y), new o.Vector2((u.x + a.x) / r.x, (u.y + a.y) / r.y), new o.Vector2((c.x + a.x) / r.x, (c.y + a.y) / r.y) ]);
    }
    t.uvsNeedUpdate = !0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, i, a) {
        return i && t(e.prototype, i), a && t(e, a), e;
    };
}(), o = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("./lib/three")), r = (require("./config"), function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./text"))), s = require("./lib/animation"), n = 1.3, h = n / 20 * 21, u = function() {
    function u(a) {
        t(this, u), this.game = a, this.seed = 0, this.startDist = 0, this.hitPoint = {
            uuid: "",
            ready: !1,
            texture: null
        }, this.loader = new o.TextureLoader(), this.text = new r.default("超越！", {
            fillStyle: 2434341,
            chinese: !0,
            textAlign: "center"
        });
        var s = new o.Shape();
        s = e(s, -h, -h, 2 * h, 2 * h, .5);
        var c = new o.Shape();
        c = e(c, -n, -n, 2 * n, 2 * n, .5);
        var l = new o.ShapeGeometry(c);
        i(l), this.avatorFrame = new o.Mesh(l, new o.MeshBasicMaterial({
            transparent: !0,
            opacity: 1
        })), this.avatorOuter = new o.Mesh(new o.ShapeGeometry(s), new o.MeshBasicMaterial({
            color: 16777215,
            transparent: !0,
            opacity: 1
        })), this.text.obj.scale.set(.8, .8, .8), this.text.obj.position.set(0, 2.2, .1), 
        this.avatorFrame.position.set(0, 0, .1), this.avatorFrame.material.opacity = 0, 
        this.avatorOuter.position.set(0, 0, 0), this.avatorOuter.material.opacity = 0, this.text.material.opacity = 0, 
        this.obj = new o.Object3D(), this.text.obj.visible = !1, this.obj.add(this.avatorOuter), 
        this.obj.add(this.avatorFrame), this.obj.add(this.text.obj), this.obj.rotateY(-Math.PI / 4), 
        this.obj.rotateX(-Math.PI / 16 * 3), this.game.scene.add(this.obj), this.obj.visible = !1;
    }
    return a(u, [ {
        key: "update",
        value: function() {
            this.game.gameModel.friendsScore && this.game.gameModel.friendsScore.length && (this.seed++, 
            this.hitPoint.uuid == this.game.currentBlock.obj.uuid && this.hitPoint.ready && this.hitPoint.texture && (this.startDist < 2 && (this.startDist++, 
            this.text.obj.visible = !0), this.playAnimate(), this.seed = 0), this.seed >= 5 && this.checkScore());
        }
    }, {
        key: "checkScore",
        value: function() {
            var t = this.game.UI.score, e = this.game.gameModel.friendsScore;
            try {
                for (var i = 0; i < e.length; i++) if (e[i].week_best_score == t) {
                    this.hitPoint.uuid = this.game.nextBlock.obj.uuid, this.hitPoint.ready = !1, this.animateAvator(e[i]);
                    break;
                }
            } catch (t) {
                console.log("RankSystem checkScore err:", t);
            }
        }
    }, {
        key: "animateAvator",
        value: function(t) {
            var e = this;
            this.loader.load(t.headimg, function(t) {
                e.hitPoint.uuid == e.game.nextBlock.obj.uuid && (e.hitPoint.ready = !0, t.minFilter = o.LinearFilter, 
                e.hitPoint.texture = t);
            });
        }
    }, {
        key: "playAnimate",
        value: function() {
            var t = this;
            this.game.bottle.changeScorePos(3);
            var e = this.game.bottle.obj.position.clone(), i = e.x, a = e.z;
            this.obj.position.set(i, 10, a), this.avatorFrame.material.map = this.hitPoint.texture, 
            this.obj.visible = !0, s.customAnimation.to(this.obj.position, .4, {
                y: 13
            }), s.customAnimation.to(this.text.material, .4, {
                opacity: 1
            }), s.customAnimation.to(this.avatorOuter.material, .4, {
                opacity: 1
            }), s.customAnimation.to(this.avatorFrame.material, .4, {
                opacity: 1
            }), s.customAnimation.to(this.text.material, .4, {
                opacity: 0,
                delay: .6,
                onComplete: function() {
                    t.resetAvator(), t.game.bottle.changeScorePos(0);
                }
            }), s.customAnimation.to(this.avatorOuter.material, .4, {
                opacity: 0,
                delay: .6
            }), s.customAnimation.to(this.avatorFrame.material, .4, {
                opacity: 0,
                delay: .6
            }), this.hitPoint.uuid = "", this.hitPoint.ready = !1, this.hitPoint.texture = null;
        }
    }, {
        key: "resetAvator",
        value: function() {
            this.obj.visible = !1, this.text.obj.visible = !1, this.avatorFrame.material.opacity = 0, 
            this.avatorFrame.material.map && this.avatorFrame.material.map.dispose(), this.avatorFrame.material.map = "", 
            this.avatorOuter.material.opacity = 0, this.text.material.opacity = 0;
        }
    }, {
        key: "reset",
        value: function() {
            this.seed = 0, this.seed = 0, this.startDist = 0, this.startDist = 0, this.hitPoint = {
                uuid: "",
                ready: !1,
                texture: null
            }, this.obj.visible = !1;
        }
    } ]), u;
}();

exports.default = u;