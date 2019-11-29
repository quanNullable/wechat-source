function i(i, t) {
    if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function i(i, t) {
        for (var o = 0; o < t.length; o++) {
            var e = t[o];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(i, e.key, e);
        }
    }
    return function(t, o, e) {
        return o && i(t.prototype, o), e && i(t, e), t;
    };
}(), o = function(i) {
    if (i && i.__esModule) return i;
    var t = {};
    if (null != i) for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
    return t.default = i, t;
}(require("../lib/three")), e = require("../lib/animation"), s = require("../config"), n = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../lib/mue/eventcenter")), r = function() {
    function e(t, s) {
        i(this, e);
        var n = new o.Shape();
        n = this.roundedRect(n, -1.5, -1.5, 3, 3, .25);
        new o.Shape();
        var r = new o.ShapeGeometry(n);
        this.reMapUv(r), this.avatorFrame = new o.Mesh(r, new o.MeshBasicMaterial({
            transparent: !0,
            map: t,
            opacity: 1
        })), this.outer = new o.Mesh(r, new o.MeshBasicMaterial({
            transparent: !0,
            color: 16777215,
            opacity: 1
        })), this.outer.scale.set(1.05, 1.05, 1.05), this.outer.position.z = -.1, this.obj = new o.Object3D(), 
        this.obj.add(this.avatorFrame), this.obj.add(this.outer), this.id = s, this.waitingList = [];
    }
    return t(e, [ {
        key: "roundedRect",
        value: function(i, t, o, e, s, n) {
            return i.moveTo(t, o + n), i.lineTo(t, o + s - n), i.quadraticCurveTo(t, o + s, t + n, o + s), 
            i.lineTo(t + e - n, o + s), i.quadraticCurveTo(t + e, o + s, t + e, o + s - n), 
            i.lineTo(t + e, o + n), i.quadraticCurveTo(t + e, o, t + e - n, o), i.lineTo(t + n, o), 
            i.quadraticCurveTo(t, o, t, o + n), i;
        }
    }, {
        key: "reMapUv",
        value: function(i) {
            i.computeBoundingBox();
            var t = i.boundingBox.max, e = i.boundingBox.min, s = new o.Vector2(0 - e.x, 0 - e.y), n = new o.Vector2(t.x - e.x, t.y - e.y), r = i.faces;
            i.faceVertexUvs[0] = [];
            for (var a = 0; a < r.length; a++) {
                var l = i.vertices[r[a].a], c = i.vertices[r[a].b], h = i.vertices[r[a].c];
                i.faceVertexUvs[0].push([ new o.Vector2((l.x + s.x) / n.x, (l.y + s.y) / n.y), new o.Vector2((c.x + s.x) / n.x, (c.y + s.y) / n.y), new o.Vector2((h.x + s.x) / n.x, (h.y + s.y) / n.y) ]);
            }
            i.uvsNeedUpdate = !0;
        }
    } ]), e;
}(), a = function() {
    function a() {
        i(this, a), this.obj = new o.Object3D(), this.list = [], this.secondList = [];
        var t = new o.PlaneBufferGeometry(26, .76, 30);
        this.progress = new o.Object3D();
        var e = s.loader.load("res/progress2.png"), n = new o.CircleGeometry(.38, 15, 0, Math.PI);
        this.roundCircle = new o.Mesh(n, new o.MeshBasicMaterial({
            map: e
        })), this.roundCircleBack = new o.Mesh(n, new o.MeshBasicMaterial({
            transparent: !0,
            opacity: .08,
            color: 0
        })), this.secondRoundCircleBack = this.roundCircleBack.clone(), this.secondRoundCircle = this.roundCircle.clone(), 
        this.backgroundBar = new o.Mesh(t, new o.MeshBasicMaterial({
            transparent: !0,
            opacity: .08,
            color: 0
        })), this.progressBar = new o.Object3D(), this.progressBar.add(new o.Mesh(t, new o.MeshBasicMaterial({
            map: e,
            transparent: !0
        }))), this.progressShadow = new o.Mesh(new o.PlaneGeometry(26, .38), new o.MeshBasicMaterial({
            transparent: !0,
            color: 16777215,
            opacity: .08
        })), this.progressShadow.position.set(0, .19, .1), this.progressBar.add(this.progressShadow), 
        this.progress.add(this.roundCircleBack), this.secondRoundCircleBack.position.z = this.roundCircleBack.position.z = this.backgroundBar.position.z = -.1, 
        this.progress.add(this.secondRoundCircleBack), this.progress.add(this.backgroundBar), 
        this.progress.add(this.progressBar), this.roundCircle.rotation.z = this.roundCircleBack.rotation.z = -Math.PI / 2, 
        this.roundCircle.position.x = this.roundCircleBack.position.x = 13, this.secondRoundCircle = this.roundCircle.clone(), 
        this.secondRoundCircle.rotation.z = this.secondRoundCircleBack.rotation.z = Math.PI / 2, 
        this.secondRoundCircle.position.x = this.secondRoundCircleBack.position.x = -13, 
        this.progress.add(this.roundCircle), this.progress.add(this.secondRoundCircle), 
        this.progress.position.set(8.2, 3.25, 0), this.obj.add(this.progress), this.turnAudio = wx.createInnerAudioContext(), 
        this.turnAudio.src = "res/turn.mp3";
    }
    return t(a, [ {
        key: "set",
        value: function(i, t) {
            var o = this;
            this.destroy(), this.list = [];
            for (var a = 0, l = i.length; a < l; ++a) {
                "/0" != i[a].headimg && "/96" != i[a].headimg && "/64" != i[a].headimg && i[a].headimg || (i[a].headimg = "res/ava.png");
                var c = s.loader.load(i[a].headimg), h = new r(c, i[a].seat_no);
                this.obj.add(h.obj), h.obj.position.x = 4 * (a - 5 >= 1 ? a - 5 : a), 0 == a && (h.obj.scale.set(2.2, 2.2, 2.2), 
                h.obj.position.set(-1.8, -1.8, 0)), a >= 6 && (h.obj.position.y = -3.5), this.list.push(h);
                var u = new r(c, i[a].seat_no);
                u.obj.visible = !1, this.obj.add(u.obj), this.secondList.push(u);
            }
            this.progressBar.scale.x = 1, this.progressBar.position.x = 0, this.roundCircle.position.x = 13, 
            this.roundCircle.visible = !0, this.secondRoundCircle.visible = !0;
            var d = 5;
            t && t.timeout && (d = 1), e.customAnimation.to(this.progressBar.scale, d, {
                x: .01,
                name: "progress",
                onComplete: function() {
                    o.progressBlinkTimer = setInterval(function() {
                        o.roundCircle.visible = !o.roundCircle.visible, o.secondRoundCircle.visible = !o.secondRoundCircle.visible;
                    }, 800), t && t.noEmit || n.default.emitSync(s.EVENT.PROGRESSOVER);
                }
            }), e.customAnimation.to(this.progressBar.position, d, {
                x: -13,
                name: "progress"
            }), e.customAnimation.to(this.roundCircle.position, d, {
                x: -13,
                name: "progress"
            });
        }
    }, {
        key: "next",
        value: function(i, t) {
            var o = this;
            if (console.log("next111111"), this.progressBlinkTimer && (clearInterval(this.progressBlinkTimer), 
            this.progressBlinkTimer = null), this.animating) return console.log("waitingList!!!!!!!!"), 
            void this.waitingList.push(i);
            console.log("next22222222"), e.TweenAnimation.kill("progress"), this.roundCircle.visible = !0, 
            this.secondRoundCircle.visible = !0, this.animating = !0;
            var r = this.list.shift(), a = this.secondList.shift();
            if (i && i.now_player_seat_no == r.id) return console.warn("data 重复的next 导致头像不匹配"), 
            this.list.unshift(r), this.secondList.unshift(a), void (this.animating = !1);
            if (this.list[0]) {
                i && i.my_seat_no == i.now_player_seat_no && this.turnAudio.play(), i && this.currentDie(r.id, i.playerlist) && (r.died = !0);
                var l = .3;
                t && t.noAnimation && (l = .01), this.list[0].avatorFrame.material.opacity = .3, 
                this.list[0].outer.material.opacity = .3, e.customAnimation.to(this.list[0].avatorFrame.material, l, {
                    opacity: 1
                }), e.customAnimation.to(this.list[0].outer.material, l, {
                    opacity: 1
                }), e.customAnimation.to(this.list[0].obj.scale, l, {
                    x: 2.2,
                    y: 2.2,
                    z: 2.2
                }), e.customAnimation.to(this.list[0].obj.position, l, {
                    x: -1.8,
                    y: -1.8
                }), this.progressBar.scale.x = 1, this.progressBar.position.x = 0, this.roundCircle.position.x = 13, 
                e.customAnimation.to(this.progressBar.scale, 5, {
                    x: .01,
                    name: "progress",
                    onComplete: function() {
                        console.log("fuck progress over"), o.progressBlinkTimer = setInterval(function() {
                            o.roundCircle.visible = !o.roundCircle.visible, o.secondRoundCircle.visible = !o.secondRoundCircle.visible;
                        }, 800), i && n.default.emitSync(s.EVENT.PROGRESSOVER);
                    }
                }), e.customAnimation.to(this.progressBar.position, 5, {
                    x: -13,
                    name: "progress"
                }), e.customAnimation.to(this.roundCircle.position, 5, {
                    x: -13,
                    name: "progress"
                });
                for (var c = 1, h = this.list.length; c < h; ++c) if (5 == c) {
                    var u = this.list[5];
                    u.obj.position.z = -1;
                    var d = this.secondList[5];
                    e.customAnimation.to(u.outer.material, l, {
                        opacity: 0
                    }), e.customAnimation.to(u.avatorFrame.material, l, {
                        opacity: 0
                    }), e.customAnimation.to(u.obj.position, l, {
                        x: 0
                    }), d.obj.visible = !0, d.outer.material.opacity = 0, d.avatorFrame.material.opacity = 0, 
                    d.obj.position.x = 24, d.obj.position.y = 0, e.customAnimation.to(d.obj.position, l, {
                        x: d.obj.position.x - 4,
                        onEnded: function() {
                            u.obj.position.x = d.obj.position.x, u.obj.position.y = d.obj.position.y, u.outer.material.opacity = 1, 
                            u.avatorFrame.material.opacity = 1, d.obj.visible = !1;
                        }
                    }), e.customAnimation.to(d.avatorFrame.material, l, {
                        opacity: 1
                    }), e.customAnimation.to(d.outer.material, l, {
                        opacity: 1
                    });
                } else this.list[c].obj.position.z = 0, e.customAnimation.to(this.list[c].obj.position, l, {
                    x: 4 * (c - 5 >= 1 ? c - 5 : c)
                });
                e.customAnimation.to(r.obj.position, l, {
                    x: -8,
                    onEnded: function() {
                        if (o.animating = !1, o.waitingList.length > 0) {
                            console.log("onComplete next");
                            var i = o.waitingList.shift();
                            o.next(i, {
                                noAnimation: !0
                            });
                        }
                    }
                }), e.customAnimation.to(r.avatorFrame.material, l, {
                    opacity: 0
                }), e.customAnimation.to(r.outer.material, l, {
                    opacity: 0
                }), r.died ? (this.obj.remove(r.obj), this.obj.remove(a.obj)) : (a.obj.position.x = 4 * (this.list.length - 5 >= 1 ? this.list.length - 5 : this.list.length) + 4, 
                console.log("secondFirstItem obj", a.obj.position.x, this.list.length), a.obj.position.y = this.list.length + 1 > 6 ? -3.5 : 0, 
                a.avatorFrame.material.opacity = 0, a.outer.material.opacity = 0, a.obj.visible = !0, 
                e.customAnimation.to(a.obj.position, l, {
                    x: a.obj.position.x - 4,
                    onEnded: function() {
                        r.obj.scale.set(1, 1, 1), r.obj.position.x = a.obj.position.x, r.obj.position.y = a.obj.position.y, 
                        console.log("final", r.obj.position.x, r.obj.position.y), r.avatorFrame.material.opacity = 1, 
                        r.outer.material.opacity = 1, a.obj.visible = !1;
                    }
                }), e.customAnimation.to(a.avatorFrame.material, l, {
                    opacity: 1
                }), e.customAnimation.to(a.outer.material, l, {
                    opacity: 1
                }), this.list.push(r), this.secondList.push(a));
            } else this.animating = !1;
        }
    }, {
        key: "currentJumperDie",
        value: function() {
            this.list[0].died = !0;
        }
    }, {
        key: "currentDie",
        value: function(i, t) {
            console.log("id", i, t);
            for (var o = 0, e = t.length; o < e; ++o) if (t[o].seat_no == i && 0 != t[o].rank) return !0;
        }
    }, {
        key: "destroy",
        value: function() {
            this.progressBlinkTimer && (clearInterval(this.progressBlinkTimer), this.progressBlinkTimer = null);
            for (var i = 0, t = this.list.length; i < t; ++i) this.list[i] && this.list[i].obj && this.list[i].obj.material && this.list[i].obj.material.map && this.list[i].obj.material.map.dispose(), 
            this.obj.remove(this.list[i].obj);
            for (var i = 0, t = this.secondList.length; i < t; ++i) this.secondList[i] && this.secondList[i].obj && this.secondList[i].obj.material && this.secondList[i].obj.material.map && this.secondList[i].obj.material.map.dispose(), 
            this.obj.remove(this.secondList[i].obj);
            this.list = [], this.secondList = [], this.waitingList = [], this.animating = !1;
        }
    } ]), a;
}();

exports.default = a;