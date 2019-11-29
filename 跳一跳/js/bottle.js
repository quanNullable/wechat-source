function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var o = i[e];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(i, e, o) {
        return e && t(i.prototype, e), o && t(i, o), i;
    };
}(), o = function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    return i.default = t, i;
}(require("./lib/three")), s = require("./lib/animation"), a = require("./config"), n = t(require("./lib/mue/eventcenter")), h = t(require("./text")), r = function t() {
    i(this, t);
    var e = new o.CylinderGeometry(.8, .8, .5, 15, 1, !0), s = new o.CylinderGeometry(.65, .65, .5, 15, 1, !0), a = new o.RingGeometry(.65, .8, 10);
    this.obj = new o.Object3D();
    var n = new o.MeshLambertMaterial({
        color: 14110276,
        side: o.DoubleSide
    }), h = new o.Mesh(e, n), r = new o.Mesh(s, n), l = new o.Mesh(a, n);
    this.obj.add(h), this.obj.add(r), l.rotation.x = -Math.PI / 2, l.position.y = .25, 
    this.obj.add(l);
    var c = new o.BoxGeometry(1, .25, .5);
    c.vertices[1].y -= .2, c.vertices[0].y -= .2;
    var u = new o.Mesh(c, new o.MeshLambertMaterial({
        color: 13059648
    }));
    u.position.set(-1, -.2, 0), u.rotation.z = .5, this.obj.scale.set(.9, .9, .9), this.obj.add(u);
}, l = function t() {
    i(this, t);
    var e = new o.CylinderGeometry(.73, .68, 1, 20), s = new o.CylinderGeometry(1.5, 1.5, .2, 20), a = new o.CylinderGeometry(.68, .65, .3, 15);
    this.obj = new o.Object3D();
    var n = new o.MeshLambertMaterial({
        color: 4605510
    }), h = new o.Mesh(s, n), r = new o.Mesh(a, new o.MeshLambertMaterial({
        color: 14110276
    })), l = new o.Mesh(e, n);
    r.position.y = .25, l.position.y = .9, this.obj.add(h), this.obj.add(r), this.obj.add(l);
}, c = function() {
    function t() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).getSelectedBottleSkinResourceSync, s = void 0 === e ? function() {} : e;
        i(this, t), this.getSelectedBottleSkinResourceSync = s, this.obj = new o.Object3D(), 
        this.obj.name = "bottle", this.trail = null, this.bottle = new o.Object3D(), this.maps = {}, 
        this.scarf = new r(), this.scarf.obj.position.y = -1.5, this.scarf.obj.visible = !1, 
        this.hat = new l(), this.hat.obj.position.y = 1, this.hat.obj.scale.set(.8, .8, .8), 
        this.hat.obj.visible = !1, this.checkSkin();
        this.human = new o.Object3D(), this.head = new o.Mesh(new o.SphereGeometry(2.1 * .45, 17, 17), this.headMaterial), 
        this.head.castShadow = !0, this.bottom = new o.Mesh(new o.CylinderGeometry(.8316, 1.20015, 2.1 * .45 * 2.68, 20), this.bottomMaterial), 
        this.bottom.rotation.y = 4.7, this.bottom.castShadow = !0;
        var n = new o.CylinderGeometry(2.1 * .45, .8316, 2.1 * .45 * 1.2, 15), c = [ this.middleMaterial, this.middleTopMaterial ], u = new o.Geometry();
        n.rotateY(4.7), this.merge(u, n, 0, [ {
            x: 0,
            y: this.bottom.position.y + 2.1 * .45 * 1.94,
            z: 0
        } ]);
        var d = new o.SphereGeometry(2.1 * .45, 17, 17);
        d.scale(1, .54, 1), this.merge(u, d, 1, [ {
            x: 0,
            y: this.bottom.position.y + 2.4003,
            z: 0
        } ]), this.middle = new o.Mesh(u, c), this.middle.castShadow = !0, this.body = new o.Object3D(), 
        this.body.add(this.bottom), this.body.add(this.middle), this.human.add(this.body), 
        this.head.position.y = 4.725, this.human.add(this.head), this.bottle.add(this.human), 
        this.bottle.position.y = a.BOTTLE.bodyHeight / 2 - .25, this.obj.add(this.bottle), 
        this.head.add(this.scarf.obj), this.head.add(this.hat.obj), this.status = "stop", 
        this.scale = 1, this.double = 1, this.velocity = {}, this.flyingTime = 0, this.direction = "straight", 
        this.jumpStatus = "init", this.particles = [];
        for (var m = new o.MeshBasicMaterial({
            map: a.loader.load("res/white.png"),
            alphaTest: .5
        }), p = new o.MeshBasicMaterial({
            map: a.loader.load("res/green.png"),
            alphaTest: .5
        }), y = new o.PlaneGeometry(1, 1), b = 0; b < 15; ++b) (f = new o.Mesh(y, m)).rotation.y = -Math.PI / 4, 
        f.rotation.x = -Math.PI / 5, f.rotation.z = -Math.PI / 5, this.particles.push(f), 
        this.obj.add(f);
        for (b = 0; b < 5; ++b) {
            var f = new o.Mesh(y, p);
            f.rotation.y = -Math.PI / 4, f.rotation.x = -Math.PI / 5, f.rotation.z = -Math.PI / 5, 
            this.particles.push(f), this.obj.add(f);
        }
        this.scoreText = new h.default("0", {
            fillStyle: 2434341,
            textAlign: "center",
            plusScore: !0
        }), this.scoreText.obj.visible = !1, this.scoreText.obj.rotation.y = -Math.PI / 4, 
        this.scoreText.obj.scale.set(.5, .5, .5), this.obj.add(this.scoreText.obj);
    }
    return e(t, [ {
        key: "merge",
        value: function(t, i, e, s) {
            for (var a = 0, n = i.faces.length; a < n; ++a) i.faces[a].materialIndex = 0;
            for (var h = new o.Mesh(i), a = 0, n = s.length; a < n; ++a) h.position.set(s[a].x, s[a].y, s[a].z), 
            h.updateMatrix(), t.merge(h.geometry, h.matrix, e);
        }
    }, {
        key: "showAddScore",
        value: function(t, i, e, o) {
            o ? this.scoreText.setScore(t.toString()) : (i ? 1 === this.double ? this.double = 2 : this.double += 2 : this.double = 1, 
            e && this.double <= 2 && (this.double *= 2), this.double = Math.min(32, this.double), 
            t *= this.double, this.scoreText.setScore(t.toString())), this.scoreText.obj.visible = !0, 
            this.scoreText.obj.position.y = 3, this.scoreText.material.opacity = 1, (0, s.TweenAnimation)(this.scoreText.obj.position.y, a.BOTTLE.bodyHeight + 6, 700, function(t) {
                void 0 !== t && (this.scoreText.obj.position.y = t);
            }.bind(this)), (0, s.TweenAnimation)(this.scoreText.material.opacity, 0, 700, function(t, i, e) {
                void 0 !== t && (this.scoreText.material.opacity = t, e && (this.scoreText.obj.visible = !1));
            }.bind(this));
        }
    }, {
        key: "changeScorePos",
        value: function(t) {
            this.scoreText.obj.position.z = t;
        }
    }, {
        key: "resetParticles",
        value: function() {
            this.gatherTimer && clearTimeout(this.gatherTimer), this.gatherTimer = null;
            for (var t = 0, i = this.particles.length; t < i; ++t) this.particles[t].gathering = !1, 
            this.particles[t].visible = !1, this.particles[t].scattering = !1;
        }
    }, {
        key: "scatterParticles",
        value: function() {
            for (var t = 0; t < 10; ++t) this.particles[t].scattering = !0, this.particles[t].gathering = !1, 
            this._scatterParticles(this.particles[t]);
        }
    }, {
        key: "_scatterParticles",
        value: function(t) {
            var i = a.BOTTLE.bodyWidth / 2, e = (i + Math.random() * (2 - i)) * (1 - 2 * Math.random()), o = (i + Math.random() * (2 - i)) * (1 - 2 * Math.random());
            t.scale.set(1, 1, 1), t.visible = !1, t.position.x = e, t.position.y = -.5, t.position.z = o, 
            setTimeout(function(t) {
                return function() {
                    if (t.scattering) {
                        t.visible = !0;
                        var i = .3 + .2 * Math.random();
                        s.customAnimation.to(t.scale, i, {
                            x: .2,
                            y: .2,
                            z: .2
                        }), s.customAnimation.to(t.position, i, {
                            x: 2 * e,
                            y: 2.5 * Math.random() + 2,
                            z: 2 * o,
                            onComplete: function() {
                                t.scattering = !1, t.visible = !1;
                            }
                        });
                    }
                };
            }(t), 0);
        }
    }, {
        key: "gatherParticles",
        value: function() {
            for (var t = this, i = 10; i < 20; ++i) this.particles[i].gathering = !0, this.particles[i].scattering = !1, 
            this._gatherParticles(this.particles[i]);
            this.gatherTimer = setTimeout(function() {
                for (var i = 0; i < 10; ++i) t.particles[i].gathering = !0, t.particles[i].scattering = !1, 
                t._gatherParticles(t.particles[i]);
            }, 500 + 1e3 * Math.random());
        }
    }, {
        key: "_gatherParticles",
        value: function(t) {
            var i = this;
            t.scale.set(1, 1, 1), t.visible = !1;
            var e = Math.random() > .5 ? 1 : -1, o = Math.random() > .5 ? 1 : -1;
            t.position.x = (1 + 7 * Math.random()) * e, t.position.y = 1 + 7 * Math.random(), 
            t.position.z = (1 + 7 * Math.random()) * o, setTimeout(function(t) {
                return function() {
                    if (t.gathering) {
                        t.visible = !0;
                        var a = .5 + .4 * Math.random();
                        (0, s.TweenAnimation)(t.scale.x, .8 + Math.random(), 1e3 * a, function(i) {
                            void 0 !== i && (t.scale.x = i);
                        }), (0, s.TweenAnimation)(t.scale.y, .8 + Math.random(), 1e3 * a, function(i) {
                            void 0 !== i && (t.scale.y = i);
                        }), (0, s.TweenAnimation)(t.scale.z, .8 + Math.random(), 1e3 * a, function(i) {
                            void 0 !== i && (t.scale.z = i);
                        }), (0, s.TweenAnimation)(t.position.x, Math.random() * e, 1e3 * a, function(i) {
                            void 0 !== i && (t.position.x = i);
                        }), (0, s.TweenAnimation)(t.position.y, 2.5 * Math.random(), 1e3 * a, function(i) {
                            void 0 !== i && (t.position.y = i);
                        }), (0, s.TweenAnimation)(t.position.z, Math.random() * o, 1e3 * a, function(e, o) {
                            void 0 !== e && (t.position.z = e, o && t.gathering && i._gatherParticles(t));
                        });
                    }
                };
            }(t), 500 * Math.random());
        }
    }, {
        key: "update",
        value: function(t) {
            "stop" != this.status && ("prepare" == this.status ? this._prepare(t) : "jump" == this.status ? this._jump(t) : "turn" == this.status && this.turn());
        }
    }, {
        key: "lookAt",
        value: function(t, i) {
            t !== this.direction && ("straight" === t ? (this.turnAngle = -Math.PI / 2, this.angle = 0) : (this.turnAngle = Math.PI / 2, 
            this.angle = Math.PI / 2), this.direction = t);
        }
    }, {
        key: "turn",
        value: function() {
            var t = this.turnAngle > 0 ? .2 : -.2;
            this.bottle.rotation.y += t, this.turnAngle -= t, this.turnAngle >= -.2 && this.turnAngle <= .2 && (this.bottle.rotation.y = this.angle, 
            this.status = "stop");
        }
    }, {
        key: "fall",
        value: function() {
            var t = this;
            this.stop(), setTimeout(function() {
                t.status = "fall", (0, s.TweenAnimation)(t.obj.position.y, -a.BLOCK.height / 2 - .3, 400, function(t) {
                    void 0 !== t && (this.obj.position.y = t);
                }.bind(t));
            }, 0);
        }
    }, {
        key: "forerake",
        value: function() {
            var t = this;
            this.stop(), this.status = "forerake", setTimeout(function() {
                "straight" === t.direction ? (0, s.TweenAnimation)(t.obj.rotation.z, -Math.PI / 2, 1e3, function(t) {
                    void 0 !== t && (this.obj.rotation.z = t);
                }.bind(t)) : (0, s.TweenAnimation)(t.obj.rotation.x, -Math.PI / 2, 1e3, function(t) {
                    void 0 !== t && (this.obj.rotation.x = t);
                }.bind(t)), setTimeout(function() {
                    "suspend" != t.status ? ((0, s.TweenAnimation)(t.obj.position.y, -a.BLOCK.height / 2 + 1.2, 400, function(t, i) {
                        void 0 !== t && (this.obj.position.y = t);
                    }.bind(t)), s.customAnimation.to(t.head.position, .2, {
                        x: -1.125
                    }), s.customAnimation.to(t.head.position, .2, {
                        x: 0,
                        delay: .2
                    })) : t.status = "stop";
                }, 200);
            }, 200);
        }
    }, {
        key: "hypsokinesis",
        value: function() {
            var t = this;
            this.stop(), this.status = "hypsokinesis", setTimeout(function() {
                "straight" === t.direction ? (0, s.TweenAnimation)(t.obj.rotation.z, Math.PI / 2, 800, function(t) {
                    void 0 !== t && (this.obj.rotation.z = t);
                }.bind(t)) : (0, s.TweenAnimation)(t.obj.rotation.x, Math.PI / 2, 800, function(t) {
                    void 0 !== t && (this.obj.rotation.x = t);
                }.bind(t)), setTimeout(function() {
                    "suspend" != t.status ? ((0, s.TweenAnimation)(t.obj.position.y, -a.BLOCK.height / 2 + 1.2, 400, function(t, i) {
                        void 0 !== t && (this.obj.position.y = t);
                    }.bind(t)), s.customAnimation.to(t.head.position, .2, {
                        x: 1.125
                    }), s.customAnimation.to(t.head.position, .2, {
                        x: 0,
                        delay: .2
                    })) : t.status = "stop";
                }, 350);
            }, 200);
        }
    }, {
        key: "_jump",
        value: function(t) {
            var i = new o.Vector3(0, 0, 0);
            i.z = this.velocity.vz * t, i.y = this.velocity.vy * t - a.GAME.gravity / 2 * t * t - a.GAME.gravity * this.flyingTime * t, 
            this.flyingTime += t, this.obj.translateY(i.y), this.obj.translateOnAxis(this.axis, i.z);
        }
    }, {
        key: "squeeze",
        value: function() {
            this.obj.position.y = a.BLOCK.height / 2, this.head.position.x = 0, s.customAnimation.to(this.body.scale, .15, {
                y: .9,
                x: 1.07,
                z: 1.07
            }), s.customAnimation.to(this.body.scale, .15, {
                y: 1,
                x: 1,
                z: 1,
                delay: .15
            }), s.customAnimation.to(this.head.position, .15, {
                y: 4.725,
                delay: .15
            });
        }
    }, {
        key: "stop",
        value: function() {
            this.status = "stop", this.flyingTime = 0, this.scale = 1, this.velocity = {}, this.jumpStatus = "init";
        }
    }, {
        key: "suspend",
        value: function() {
            this.status = "suspend", s.TweenAnimation.killAll();
        }
    }, {
        key: "rotate",
        value: function() {
            if (s.TweenAnimation.killAll(), "straight" === this.direction) {
                (0, s.TweenAnimation)(this.obj.rotation.z, 0, 300, function(t) {
                    void 0 !== t && (this.obj.rotation.z = t);
                }.bind(this));
                var t;
                t = this.status.indexOf("forerake") >= 0 ? 2 : -2, (0, s.TweenAnimation)(this.obj.position.x, this.obj.position.x + t, 300, function(t) {
                    void 0 !== t && (this.obj.position.x = t);
                }.bind(this));
            } else (0, s.TweenAnimation)(this.obj.rotation.x, 0, 300, function(t) {
                void 0 !== t && (this.obj.rotation.x = t);
            }.bind(this)), t = this.status.indexOf("forerake") >= 0 ? -2 : 2, (0, s.TweenAnimation)(this.obj.position.z, this.obj.position.z + t, 300, function(t) {
                void 0 !== t && (this.obj.position.z = t);
            }.bind(this));
            (0, s.TweenAnimation)(this.head.position.x, 0, 100, function(t) {
                void 0 !== t && (this.head.position.x = t);
            }.bind(this)), (0, s.TweenAnimation)(this.obj.position.y, -a.BLOCK.height / 2, 300, function(t, i) {
                void 0 !== t && (this.obj.position.y = t, i && (this.status = "stop"));
            }.bind(this)), this.status = "rotate";
        }
    }, {
        key: "_prepare",
        value: function(t) {
            if (!(void 0 !== this.limitTime && this.prepareTime > this.limitTime || (this.scale -= a.BOTTLE.reduction, 
            this.scale = Math.max(a.BOTTLE.minScale, this.scale), this.scale <= a.BOTTLE.minScale))) {
                this.body.scale.y = this.scale, this.body.scale.x += .007, this.body.scale.z += .007, 
                this.head.position.y -= .018;
                this.obj.position.y -= a.BLOCK.reduction / 2 * a.BLOCK.height / 2 + .027, this.prepareTime += t, 
                this.prepareTime - this.lastPrepareTime >= .1 && (this.lastPrepareTime = this.prepareTime, 
                n.default.emit(a.EVENT.SEND_REALTIME_MSG_TO_CTRL, {
                    time: this.prepareTime
                }));
            }
        }
    }, {
        key: "prepare",
        value: function() {
            this.lastPrepareTime = 0, this.prepareTime = 0, this.status = "prepare", this.gatherParticles();
        }
    }, {
        key: "relayLimitTime",
        value: function(t) {
            this.limitTime = t;
        }
    }, {
        key: "jump",
        value: function(t) {
            this.resetParticles(), this.status = "jump", this.axis = t, s.customAnimation.to(this.body.scale, .25, {
                x: 1,
                y: 1,
                z: 1
            }), this.head.position.y = 4.725, this.scale = 1, this.limitTime = void 0;
            var i = Math.min(Math.max(this.velocity.vz / 35, 1.2), 1.4);
            this.human.rotation.z = this.human.rotation.x = 0, "straight" === this.direction ? (s.customAnimation.to(this.human.rotation, .14, {
                z: this.human.rotation.z - Math.PI
            }), s.customAnimation.to(this.human.rotation, .18, {
                z: this.human.rotation.z - 2 * Math.PI,
                delay: .14
            }), s.customAnimation.to(this.head.position, .1, {
                y: this.head.position.y + .9 * i,
                x: this.head.position.x + .45 * i
            }), s.customAnimation.to(this.head.position, .1, {
                y: this.head.position.y - .9 * i,
                x: this.head.position.x - .45 * i,
                delay: .1
            }), s.customAnimation.to(this.head.position, .15, {
                y: 4.725,
                x: 0,
                delay: .25
            }), s.customAnimation.to(this.body.scale, .1, {
                y: Math.max(i, 1),
                x: Math.max(Math.min(1 / i, 1), .7),
                z: Math.max(Math.min(1 / i, 1), .7)
            }), s.customAnimation.to(this.body.scale, .1, {
                y: Math.min(.9 / i, .7),
                x: Math.max(i, 1.2),
                z: Math.max(i, 1.2),
                delay: .1
            }), s.customAnimation.to(this.body.scale, .3, {
                y: 1,
                x: 1,
                z: 1,
                delay: .2
            })) : (s.customAnimation.to(this.human.rotation, .14, {
                x: this.human.rotation.x - Math.PI
            }), s.customAnimation.to(this.human.rotation, .18, {
                x: this.human.rotation.x - 2 * Math.PI,
                delay: .14
            }), s.customAnimation.to(this.head.position, .1, {
                y: this.head.position.y + .9 * i,
                z: this.head.position.z - .45 * i
            }), s.customAnimation.to(this.head.position, .1, {
                z: this.head.position.z + .45 * i,
                y: this.head.position.y - .9 * i,
                delay: .1
            }), s.customAnimation.to(this.head.position, .15, {
                y: 4.725,
                z: 0,
                delay: .25
            }), s.customAnimation.to(this.body.scale, .05, {
                y: Math.max(i, 1),
                x: Math.max(Math.min(1 / i, 1), .7),
                z: Math.max(Math.min(1 / i, 1), .7)
            }), s.customAnimation.to(this.body.scale, .05, {
                y: Math.min(.9 / i, .7),
                x: Math.max(i, 1.2),
                z: Math.max(i, 1.2),
                delay: .1
            }), s.customAnimation.to(this.body.scale, .2, {
                y: 1,
                x: 1,
                z: 1,
                delay: .2
            }));
        }
    }, {
        key: "showup",
        value: function() {
            this.status = "showup", this.obj.position.y = 25, this.human.rotation.x = this.human.rotation.z = 0, 
            (0, s.TweenAnimation)(this.obj.position.y, a.BLOCK.height / 2, 500, "Bounce.easeOut", function(t, i) {
                void 0 !== t && (this.obj.position.y = t, i && (this.status = "stop"));
            }.bind(this));
        }
    }, {
        key: "stopPrepare",
        value: function() {
            this.obj.position.y = a.BLOCK.height / 2, this.stop(), this.body.scale.set(1, 1, 1), 
            this.head.position.y = 4.725, this.head.position.x = 0, this.resetParticles();
        }
    }, {
        key: "getBox",
        value: function() {
            return [ new o.Box3().setFromObject(this.head), new o.Box3().setFromObject(this.middle), new o.Box3().setFromObject(this.bottom) ];
        }
    }, {
        key: "resetToDefaultSkin",
        value: function() {
            this.changeBottleMaterial([ "res/head.png", "res/head.png", "res/middle.png", "res/bottom.png" ]), 
            this.scarf.obj.visible = !1, this.hat.obj.visible = !1;
        }
    }, {
        key: "changeSkin",
        value: function(t) {
            t ? (this.skinId = t.id || null, 1 == t.type ? (this.scarf.obj.visible = !1, this.hat.obj.visible = !1, 
            this.skin = t.property.images.join(""), this.changeBottleMaterial(t.property.images)) : 2 == t.type && (this.resetToDefaultSkin(), 
            this.scarf.obj.visible = !0)) : (this.skinId = null, this.resetToDefaultSkin());
        }
    }, {
        key: "changeBottleMaterial",
        value: function(t) {
            for (var i = 0; i < 4; ++i) this.maps[t[i]] || (this.maps[t[i]] = a.loader.load(t[i]));
            this.headMaterial && this.bottomMaterial && this.middleTopMaterial && this.middleMaterial ? (this.headMaterial.map = this.maps[t[0]], 
            this.middleTopMaterial.map = this.maps[t[1]], this.middleMaterial.map = this.maps[t[2]], 
            this.bottomMaterial.map = this.maps[t[3]]) : (this.headMaterial = new o.MeshBasicMaterial({
                map: this.maps[t[0]]
            }), this.middleTopMaterial = new o.MeshBasicMaterial({
                map: this.maps[t[1]]
            }), this.middleMaterial = new o.MeshBasicMaterial({
                map: this.maps[t[2]]
            }), this.bottomMaterial = new o.MeshBasicMaterial({
                map: this.maps[t[3]]
            }));
        }
    }, {
        key: "checkSkin",
        value: function(t) {
            if (t && t.bottleSkin) this.changeSkin(t.bottleSkin); else if (t && null === t.bottleSkin) this.changeSkin(); else {
                var i = this.getSelectedBottleSkinResourceSync();
                i ? this.changeSkin(i) : this.changeSkin();
            }
        }
    }, {
        key: "reset",
        value: function(t) {
            this.resetPosition(t), this.checkSkin(t);
        }
    }, {
        key: "resetPosition",
        value: function(t) {
            this.stop(), this.obj.position.y = a.BLOCK.height / 2, this.obj.position.x = this.obj.position.z = 0, 
            this.obj.rotation.z = 0, this.obj.rotation.y = 0, this.obj.rotation.x = 0, this.bottle.rotation.y = 0, 
            this.bottle.rotation.z = 0, this.bottle.rotation.x = 0, this.body && this.head && (this.body.scale.set(1, 1, 1), 
            this.body.rotation.z = this.body.rotation.x = this.body.rotation.y = 0, this.head.position.y = 4.725, 
            this.head.position.x = 0, this.human.rotation.y = this.human.rotation.z = this.human.rotation.x = 0), 
            t && t.preserveDirection || (this.direction = "straight"), this.jumpStatus = "init", 
            this.double = 1, this.resetParticles(), this.scoreText.obj.visible = !1, this.destination = [];
        }
    } ]), t;
}();

exports.default = c;