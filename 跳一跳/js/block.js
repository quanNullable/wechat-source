function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var s = i[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(i, t, s) {
        return t && e(i.prototype, t), s && e(i, s), i;
    };
}(), t = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    return i.default = e, i;
}(require("./lib/three")), s = require("./config"), a = require("./lib/animation"), h = require("./random"), o = {
    green: 6393958,
    white: 15658734,
    lightGreen: 8104320,
    gray: 10395294,
    black: 7171437,
    lightGray: 14408667,
    lightBlack: 13355979,
    brown: 6776679,
    middleLightGreen: 125084537,
    middleLightGray: 12303291,
    middleLightBlack: 8947848
}, r = new t.MeshBasicMaterial({
    map: s.loader.load("res/cylinder_shadow.png"),
    transparent: !0,
    alphaTest: .01
}), n = new t.MeshBasicMaterial({
    map: s.loader.load("res/desk_shadow.png"),
    transparent: !0,
    alphaTest: .01
}), l = new t.MeshBasicMaterial({
    map: s.loader.load("res/shadow.png"),
    transparent: !0,
    alphaTest: .01
}), d = new t.MeshLambertMaterial({
    map: s.loader.load("res/gray.png")
}), m = new t.MeshLambertMaterial({
    map: s.loader.load("res/number.png"),
    alphaTest: .6
}), c = new t.BoxGeometry(2 * s.BLOCK.radius + .02, s.BLOCK.height + .04, 2 * s.BLOCK.radius + .02), u = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height, 2 * s.BLOCK.radius), y = new t.PlaneGeometry(11, 11), p = new t.MeshBasicMaterial({
    map: s.loader.load("res/stripe.png")
}), g = s.GAME.canShadow ? t.MeshLambertMaterial : t.MeshBasicMaterial, w = function() {
    function w(i, h) {
        var M = this;
        if (e(this, w), this.radius = s.BLOCK.radius, this.status = "stop", this.scale = 1, 
        this.type = "green", this.types = [ "green", "black", "gray" ], this.radiusScale = 1, 
        this.obj = new t.Object3D(), this.obj.name = "block", this.body = new t.Object3D(), 
        (i <= 8 || 27 == i) && (this.greenMaterial = new t.MeshLambertMaterial({
            color: o.green
        }), this.whiteMaterial = new t.MeshLambertMaterial({
            color: o.white
        })), 32 != i && 33 != i && 34 != i && 35 != i || (this.greenMaterial = new t.MeshLambertMaterial({
            color: o.white
        }), this.whiteMaterial = new t.MeshLambertMaterial({
            color: o.gray
        })), this.shadowWidth = 11, 2 == i || 7 == i ? (this.shadow = new t.Mesh(y, n), 
        this.shadow.position.set(0, -s.BLOCK.height / 2 - .001 * i, -4.5), this.shadow.scale.y = 1.2) : 3 == i || 21 == i || 27 == i || 28 == i || 29 == i ? (this.shadow = new t.Mesh(y, r), 
        this.shadow.position.set(-.1, -s.BLOCK.height / 2 - .001 * i, -2.8), this.shadow.scale.y = 1.4, 
        this.shadow.scale.x = 1) : (this.shadow = new t.Mesh(y, l), this.shadow.position.set(-.74, -s.BLOCK.height / 2 - .001 * i, -2.73), 
        this.shadow.scale.y = 1.4), this.shadow.rotation.x = -Math.PI / 2, this.order = i, 
        this.radiusSegments = 4, this.height = s.BLOCK.height, this.canChange = !0, 0 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius);
            this.geometry = C;
            P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (1 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), v = s.BLOCK.height / 5, x = new t.BoxGeometry(2 * s.BLOCK.radius, v, 2 * s.BLOCK.radius);
            this.geometry = x, this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            }, {
                x: 0,
                y: -2 * v,
                z: 0
            }, {
                x: 0,
                y: 2 * v,
                z: 0
            } ]), this.merge(L, x, 1, [ {
                x: 0,
                y: -v,
                z: 0
            }, {
                x: 0,
                y: v,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (2 == i) {
            this.radiusSegments = 50, this.height = s.BLOCK.height / 21 * 1.5;
            var v = s.BLOCK.height / 21 * 19.5, K = s.BLOCK.height - v, f = new t.CylinderGeometry(s.BLOCK.radius - 4, s.BLOCK.radius - 2, v, 50), G = new t.CylinderGeometry(s.BLOCK.radius, s.BLOCK.radius, K, 50), z = new t.Mesh(G, this.greenMaterial);
            (I = new t.Mesh(f, this.whiteMaterial)).position.y = -s.BLOCK.height / 21 * 10.5, 
            this.body.add(I), this.hitObj = z;
        } else if (3 == i) {
            this.radiusSegments = 50, this.middleLightGreenMaterial = new t.MeshLambertMaterial({
                color: o.middleLightGreen
            });
            var B = [ this.greenMaterial, this.whiteMaterial, this.middleLightGreenMaterial ], L = new t.Geometry(), v = 5, K = s.BLOCK.height - v, f = new t.CylinderGeometry(s.BLOCK.radius, s.BLOCK.radius, v, 50), G = new t.CylinderGeometry(s.BLOCK.radius, s.BLOCK.radius, K, 50);
            this.geometry = G, (j = new t.RingGeometry(.6 * s.BLOCK.radius, .8 * s.BLOCK.radius, 30)).rotateX(-Math.PI / 2), 
            this.merge(L, f, 1, [ {
                x: 0,
                y: -(s.BLOCK.height - v) / 2,
                z: 0
            } ]), this.merge(L, G, 0, [ {
                x: 0,
                y: v + K / 2 - s.BLOCK.height / 2,
                z: 0
            } ]), this.merge(L, j, 2, [ {
                x: 0,
                y: s.BLOCK.height / 2 + .01,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (4 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), x = u;
            this.geometry = x, this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]);
            var j = new t.RingGeometry(1, 2, 30, 1);
            this.merge(L, j, 1, [ {
                x: 0,
                y: 0,
                z: s.BLOCK.radius + .01
            } ]), j.rotateY(-Math.PI / 2), this.merge(L, j, 1, [ {
                x: -s.BLOCK.radius - .01,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (5 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius), P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (6 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius), P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (7 == i) {
            this.radiusSegments = 50, this.height = s.BLOCK.height / 21 * 1.5;
            var v = s.BLOCK.height / 21 * 19.5, K = s.BLOCK.height - v, f = new t.CylinderGeometry(s.BLOCK.radius - 4, s.BLOCK.radius - 2, v, 50), G = new t.CylinderGeometry(s.BLOCK.radius, s.BLOCK.radius, K, 50), z = new t.Mesh(G, this.greenMaterial), I = new t.Mesh(f, this.whiteMaterial);
            I.position.y = -s.BLOCK.height / 21 * 10.5, this.body.add(I), this.hitObj = z;
        } else if (8 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), v = s.BLOCK.height / 5, x = new t.BoxGeometry(2 * s.BLOCK.radius, v, 2 * s.BLOCK.radius);
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            }, {
                x: 0,
                y: -2 * v,
                z: 0
            }, {
                x: 0,
                y: 2 * v,
                z: 0
            } ]), this.merge(L, x, 1, [ {
                x: 0,
                y: -v,
                z: 0
            }, {
                x: 0,
                y: v,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (9 == i) {
            var B = [ new t.MeshLambertMaterial({
                color: 15563832
            }), T = new t.MeshBasicMaterial({
                map: s.loader.load("res/game.png"),
                transparent: !0
            }) ], L = new t.Geometry(), x = u;
            this.geometry = x, this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, new t.PlaneGeometry(5, 5), 1, [ {
                x: 0,
                y: .1,
                z: s.BLOCK.radius + .01
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (10 == i) {
            var B = [ new t.MeshLambertMaterial({
                color: 16508510
            }), T = new t.MeshBasicMaterial({
                map: s.loader.load("res/emotion.png"),
                transparent: !0
            }) ], L = new t.Geometry(), x = u, _ = new t.CylinderGeometry(2, 2, 1, 50), k = new t.PlaneGeometry(1.5, 1.5);
            this.geometry = x, this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), _.rotateX(Math.PI / 2), this.merge(L, _, 0, [ {
                x: 0,
                y: 0,
                z: s.BLOCK.radius + .51
            } ]), _.rotateZ(Math.PI / 2), _.rotateY(Math.PI / 2), this.merge(L, _, 0, [ {
                x: -s.BLOCK.radius - .51,
                y: 0,
                z: 0
            } ]), this.merge(L, k, 1, [ {
                x: 0,
                y: 0,
                z: s.BLOCK.radius + 1.02
            } ]), k.rotateY(-Math.PI / 2), this.merge(L, k, 1, [ {
                x: -s.BLOCK.radius - 1.02,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (11 == i) {
            var x = u, U = new t.BoxGeometry(3, 2, 4);
            this.geometry = x;
            var S = new t.MeshLambertMaterial({
                color: 11855938
            }), T = new t.MeshBasicMaterial({
                map: s.loader.load("res/green_face.png"),
                transparent: !0
            }), k = new t.PlaneGeometry(6, 3), B = [ S, T ], L = new t.Geometry();
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, k, 1, [ {
                x: .5,
                y: -1,
                z: s.BLOCK.radius + .01
            } ]), U.rotateZ(Math.PI / 5), this.merge(L, U, 0, [ {
                x: -s.BLOCK.radius - 1,
                y: 1,
                z: 2.5
            } ]), U.rotateZ(-2 * Math.PI / 5), this.merge(L, U, 0, [ {
                x: s.BLOCK.radius,
                y: 1,
                z: 2.5
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (12 == i) {
            var x = u, U = new t.BoxGeometry(3, 2, 4);
            this.geometry = x;
            var S = new t.MeshLambertMaterial({
                color: 15921906
            }), T = new t.MeshLambertMaterial({
                map: s.loader.load("res/white_face.png")
            }), k = new t.PlaneGeometry(6, 3), B = [ S, T ], L = new t.Geometry();
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, k, 1, [ {
                x: .5,
                y: -1,
                z: s.BLOCK.radius + .01
            } ]), U.rotateZ(Math.PI / 5), this.merge(L, U, 0, [ {
                x: -s.BLOCK.radius - 1,
                y: 1,
                z: 2.5
            } ]), U.rotateZ(-2 * Math.PI / 5), this.merge(L, U, 0, [ {
                x: s.BLOCK.radius,
                y: 1,
                z: 2.5
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (13 == i) {
            x = u;
            this.geometry = x;
            var T = new t.MeshLambertMaterial({
                map: s.loader.load("res/money.png")
            }), k = new t.PlaneGeometry(3, 3), B = [ T ], L = new t.Geometry();
            this.mapUv(64, 64, x, 1, 2, 2, 4, 4), this.mapUv(64, 64, x, 2, 2, 2, 4, 4), this.mapUv(64, 64, x, 4, 2, 2, 4, 4), 
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, k, 0, [ {
                x: 0,
                y: 0,
                z: s.BLOCK.radius + .01
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (14 == i) {
            x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius);
            this.geometry = x;
            A = new t.MeshLambertMaterial({
                map: s.loader.load("res/tit.png")
            });
            this.mapUv(310, 310, x, 1, 0, 0, 200, 110), this.mapUv(310, 310, x, 2, 0, 110, 200, 310), 
            this.mapUv(310, 310, x, 4, 200, 110, 310, 310), this.hitObj = new t.Mesh(x, A);
        } else if (15 == i) {
            x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius);
            this.map = s.loader.load("res/bag.png");
            A = new t.MeshLambertMaterial({
                map: this.map
            });
            this.glowMap = s.loader.load("res/glow_bag.png"), this.hitObj = new t.Mesh(x, A), 
            this.whenSucceed = this.glow, this.beforePopup = this.hideGlow, this.score = 20;
        } else if (16 == i) {
            var x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius), A = new t.MeshLambertMaterial({
                map: s.loader.load("res/dict.png")
            });
            this.mapUv(428, 428, x, 1, 0, 148, 280, 0), this.mapUv(428, 428, x, 2, 0, 148, 280, 428), 
            this.mapUv(428, 428, x, 4, 280, 148, 428, 428), this.hitObj = new t.Mesh(x, A);
        } else if (17 == i) {
            this.height /= 3;
            var D = new t.MeshLambertMaterial({
                map: s.loader.load("res/box_top.png")
            }), Y = new t.MeshLambertMaterial({
                map: s.loader.load("res/box_bottom.png")
            }), x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius);
            this.geometry = x;
            var H = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius), B = [ D, Y ], L = new t.Geometry();
            this.mapUv(198, 198, x, 1, 0, 0, 148, 50), this.mapUv(198, 198, x, 2, 0, 50, 148, 198), 
            this.mapUv(198, 198, x, 4, 148, 50, 198, 198), this.mapUv(444, 50, H, 4, 148, 0, 296, 50, !0), 
            this.mapUv(444, 50, H, 1, 0, 0, 148, 50), this.mapUv(444, 50, H, 2, 0, 0, 1, 1), 
            this.mapUv(444, 50, H, 0, 296, 50, 444, 0), this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, H, 1, [ {
                x: 0,
                y: -2 * this.height,
                z: 0
            } ]);
            var E = new t.MeshLambertMaterial({
                map: s.loader.load("res/box_middle.png")
            });
            this.middle = new t.Mesh(H, E), this.middle.position.y = -this.height, this.body.add(this.middle), 
            this.hitObj = new t.Mesh(L, B), this.succeedTimer = this.rotateBox, this.score = 10;
        } else if (18 == i) {
            var x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius), A = new t.MeshLambertMaterial({
                map: s.loader.load("res/express.png")
            });
            this.mapUv(428, 428, x, 1, 0, 0, 280, 148), this.mapUv(428, 428, x, 2, 0, 148, 280, 428), 
            this.mapUv(428, 428, x, 4, 280, 148, 428, 428), this.hitObj = new t.Mesh(x, A);
        } else if (19 == i) {
            this.min = .9, this.height = s.BLOCK.height / 21 * 4;
            x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height + .1, 2 * s.BLOCK.radius);
            this.geometry = x;
            var A = new t.MeshLambertMaterial({
                color: 16777215,
                transparent: !0,
                opacity: .3
            }), f = new t.BoxGeometry(2.05 * s.BLOCK.radius, s.BLOCK.height / 21 * 17, 2.05 * s.BLOCK.radius), B = [ A, Y = new t.MeshBasicMaterial({
                map: s.loader.load("res/sing.png")
            }) ], L = new t.Geometry();
            this.mapUv(416, 416, f, 1, 0, 0, 256, 160), this.mapUv(416, 416, f, 2, 0, 160, 256, 416), 
            this.mapUv(416, 416, f, 4, 256, 160, 416, 416), this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, f, 1, [ {
                x: 0,
                y: -s.BLOCK.height / 21 * 10.5,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B), this.record = new t.Object3D(), this.record.add(new t.Mesh(new t.CylinderGeometry(.9 * s.BLOCK.radius, .9 * s.BLOCK.radius, .4, 50), new t.MeshBasicMaterial({
                color: 2894892
            })));
            var k = new t.CircleGeometry(.9 * s.BLOCK.radius, 40), T = new t.MeshBasicMaterial({
                map: s.loader.load("res/record.png")
            });
            (Me = new t.Mesh(k, T)).rotation.x = -Math.PI / 2, Me.position.y = .26, this.record.add(Me), 
            this.body.add(this.record);
            k = new t.PlaneGeometry(2, 2);
            this.musicIcon = new t.Mesh(k, new t.MeshBasicMaterial({
                map: s.loader.load("res/music_icon.png"),
                transparent: !0
            })), this.musicIcon.position.set(0, 0, 0), this.musicIcon.rotation.y = -Math.PI / 4, 
            this.musicIcon.rotation.x = -Math.PI / 5, this.musicIcon.rotation.z = -Math.PI / 5, 
            this.musicIcon.visible = !1, this.secondMusicIcon = new t.Mesh(k, new t.MeshBasicMaterial({
                map: s.loader.load("res/music_icon_two.png"),
                transparent: !0
            })), this.secondMusicIcon.rotation.y = -Math.PI / 4, this.secondMusicIcon.rotation.x = -Math.PI / 5, 
            this.secondMusicIcon.rotation.z = -Math.PI / 5, this.secondMusicIcon.visible = !1, 
            this.icons = [], this.icons.push(this.musicIcon, this.secondMusicIcon);
            for (N = 0; N < 2; ++N) this.body.add(this.icons[N]);
            this.succeedTimer = this.playMusic, this.score = 30, this.musicName = "sing", this.perFrame = function() {
                M.record.rotation.y += .01;
            }, this.whenLeave = function() {
                M.stopMusic();
            };
        } else if (20 == i) {
            x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius / 38 * 48);
            this.geometry = x, this.shadow.scale.set(1, 61 / 38, 48 / 38);
            var A = new t.MeshLambertMaterial({
                map: s.loader.load("res/disk.png")
            }), R = new t.MeshBasicMaterial({
                map: s.loader.load("res/disk_dark.png"),
                transparent: !0
            }), k = new t.PlaneGeometry(3, 3), B = [ R, A ], L = new t.Geometry();
            this.mapUv(236, 300, x, 1, 0, 250, 10, 260), this.mapUv(236, 300, x, 2, 0, 300, 236, 0), 
            this.mapUv(236, 300, x, 4, 0, 250, 10, 260), this.merge(L, x, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, k, 0, [ {
                x: 3.5,
                y: .5,
                z: s.BLOCK.radius / 38 * 48 + .01
            } ]), this.hitObj = new t.Mesh(L, B), this.plane = new t.Mesh(k, new t.MeshBasicMaterial({
                map: s.loader.load("res/disk_light.png"),
                transparent: !0
            })), this.plane.position.set(3.5, .5, s.BLOCK.radius / 38 * 48 + .03), this.plane.updateMatrix(), 
            this.plane.matrixAutoUpdate = !1, this.body.add(this.plane), this.timer = setInterval(function() {
                M.plane.visible = !M.plane.visible;
            }, 1e3);
        } else if (21 == i) {
            this.radiusSegments = 50, this.min = .8, this.height = s.BLOCK.height / 21 * 4;
            x = new t.CylinderGeometry(.7 * s.BLOCK.radius, .8 * s.BLOCK.radius, this.height, 50);
            this.geometry = x;
            var k = new t.CircleGeometry(.7 * s.BLOCK.radius, 50), f = new t.CylinderGeometry(.7 * s.BLOCK.radius, .5 * s.BLOCK.radius, s.BLOCK.height / 21 * 17, 50), A = new t.MeshBasicMaterial({
                color: 5066061
            }), T = new t.MeshLambertMaterial({
                map: s.loader.load("res/westore_desk.png")
            }), Y = new t.MeshBasicMaterial({
                map: s.loader.load("res/westore.png")
            });
            this.shadow.scale.set(.55, .9, .7);
            var B = [ A, Y, T ], L = new t.Geometry();
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), f.rotateY(2.3), this.merge(L, f, 1, [ {
                x: 0,
                y: -s.BLOCK.height / 21 * 10.5,
                z: 0
            } ]), k.rotateX(-Math.PI / 2), k.rotateY(-.7), this.merge(L, k, 2, [ {
                x: 0,
                y: this.height / 2 + .01,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (22 == i) {
            this.height = s.BLOCK.height / 21 * 6;
            x = new t.BoxGeometry(2.1 * s.BLOCK.radius, this.height, 2.1 * s.BLOCK.radius);
            this.geometry = x;
            var A = new t.MeshLambertMaterial({
                map: s.loader.load("res/gift.png")
            }), f = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height / 21 * 15, 2 * s.BLOCK.radius), Y = new t.MeshLambertMaterial({
                color: 11637749
            });
            this.mapUv(300, 370, x, 1, 0, 0, 300, 70), this.mapUv(300, 370, x, 2, 0, 70, 300, 370), 
            this.mapUv(300, 370, x, 4, 0, 0, 300, 70, !0);
            var B = [ A, Y ], L = new t.Geometry();
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.merge(L, f, 1, [ {
                x: 0,
                y: -s.BLOCK.height / 21 * 10.5,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (23 == i) {
            this.height = s.BLOCK.height / 21 * 5;
            var x = new t.Geometry(), Z = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius / 38 * 40);
            x.merge(Z), this.shadow.scale.set(1, 48 / 38, 48 / 38);
            var F = new t.BoxGeometry(1.5, 3.5, 1.5);
            F.rotateZ(-.3), F.vertices[7].y -= .4, F.vertices[6].y -= .4, F.translate(-4, -3, -3.5), 
            x.merge(F), F.vertices[6].y += .5, F.translate(0, 0, 7), F.rotateX(-.2), x.merge(F), 
            F.vertices[7].y += .4, F.translate(5, -1, 0), F.rotateZ(.4), x.merge(F);
            A = new t.MeshLambertMaterial({
                map: s.loader.load("res/stool.png")
            });
            this.hitObj = new t.Mesh(x, A), this.shadow = new t.Mesh(new t.PlaneGeometry(this.shadowWidth, this.shadowWidth), new t.MeshBasicMaterial({
                map: s.loader.load("res/stool_shadow.png"),
                transparent: !0,
                alphaTest: .01
            })), this.shadow.position.set(-.76, -s.BLOCK.height / 2 - .001 * i, -3.6), this.shadow.scale.y = 1.4, 
            this.shadow.scale.x = .9, this.shadow.rotation.x = -Math.PI / 2;
        } else if (24 == i) {
            this.height = s.BLOCK.height / 21 * 6;
            x = new t.BoxGeometry(2 * s.BLOCK.radius / 38 * 45, this.height, 2 * s.BLOCK.radius / 38 * 45);
            this.geometry = x;
            f = new t.BoxGeometry(2 * s.BLOCK.radius / 38 * 40, s.BLOCK.height / 21 * 15, 2 * s.BLOCK.radius / 38 * 40);
            this.shadow.scale.set(40 / 38, 1.4, 1);
            var B = [ A = new t.MeshLambertMaterial({
                map: s.loader.load("res/store_top.png")
            }), Y = new t.MeshBasicMaterial({
                map: s.loader.load("res/store_bottom.png"),
                transparent: !0
            }), T = new t.MeshBasicMaterial({
                map: s.loader.load("res/indoor.png"),
                transparent: !0
            }) ], k = new t.PlaneGeometry(3.1, 3.1), L = new t.Geometry();
            this.mapUv(340, 340, x, 1, 0, 0, 280, 60), this.mapUv(340, 340, x, 2, 0, 60, 280, 340), 
            this.mapUv(340, 340, x, 4, 280, 60, 340, 340), this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.mapUv(434, 164, f, 1, 0, 0, 217, 164), this.mapUv(434, 164, f, 4, 217, 0, 434, 164, !0), 
            this.merge(L, f, 1, [ {
                x: 0,
                y: -s.BLOCK.height / 21 * 10.5,
                z: 0
            } ]), k.rotateY(-Math.PI / 2), this.merge(L, k, 2, [ {
                x: -s.BLOCK.radius / 38 * 40 - .01,
                y: -3.3,
                z: -2.5
            } ]), this.hitObj = new t.Mesh(L, B);
            le = new t.PlaneGeometry(1.55, 3.1);
            this.door = new t.Mesh(le, new t.MeshBasicMaterial({
                map: s.loader.load("res/door.png"),
                transparent: !0
            })), this.door.rotation.y = -Math.PI / 2, this.door.position.set(-s.BLOCK.radius / 38 * 40 - .02, -3.3, -3.3), 
            this.body.add(this.door), this.secondDoor = new t.Mesh(le, new t.MeshBasicMaterial({
                map: s.loader.load("res/second_door.png"),
                transparent: !0
            })), this.secondDoor.rotation.y = -Math.PI / 2, this.secondDoor.position.set(-s.BLOCK.radius / 38 * 40 - .02, -3.3, -1.7), 
            this.body.add(this.secondDoor), this.score = 15;
        } else if (25 == i) {
            x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius);
            this.geometry = x;
            A = new t.MeshLambertMaterial({
                map: s.loader.load("res/clock.png")
            });
            this.mapUv(320, 200, x, 1, 0, 0, 5, 5), this.mapUv(320, 200, x, 2, 0, 0, 5, 5), 
            this.mapUv(320, 200, x, 4, 0, 200, 320, 0, !0);
            var X = p, W = new t.CylinderGeometry(1, 1, 1, 30), B = [ A, X ], L = new t.Geometry();
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), W.rotateZ(Math.PI / 2), this.merge(L, W, 1, [ {
                x: -s.BLOCK.radius - .5,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B), this.plane = new t.Mesh(new t.PlaneGeometry(3, 3), new t.MeshBasicMaterial({
                map: s.loader.load("res/point.png"),
                transparent: !0
            })), this.plane.position.set(0, 0, s.BLOCK.radius + .04), this.body.add(this.plane), 
            this.timer = setInterval(function() {
                M.plane.visible = !M.plane.visible;
            }, 1e3), this.numbers = [];
            for (var q = new t.PlaneGeometry(3, 3), N = 0; N < 10; ++N) {
                for (var V = new t.MeshBasicMaterial({
                    map: s.loader.load("res/" + N + ".png"),
                    alphaTest: .5
                }), J = [], Q = 0; Q < 4; ++Q) {
                    var $ = new t.Mesh(q, V);
                    $.position.z = s.BLOCK.radius + .01, $.visible = !1, J.push($), this.body.add($);
                }
                this.numbers.push(J);
            }
            var ee = new Date(), ie = ("0" + ee.getHours()).slice(-2), te = ("0" + ee.getMinutes()).slice(-2);
            this.numbers[ie[0]][0].position.x = -3.2 * this.radiusScale, this.numbers[ie[0]][0].visible = !0, 
            this.numbers[ie[1]][1].position.x = -1.3 * this.radiusScale, this.numbers[ie[1]][1].visible = !0, 
            this.numbers[te[0]][2].position.x = 1.3 * this.radiusScale, this.numbers[te[0]][2].visible = !0, 
            this.numbers[te[1]][3].position.x = 3.2 * this.radiusScale, this.numbers[te[1]][3].visible = !0;
        } else if (26 == i) {
            var x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius), A = new t.MeshLambertMaterial({
                map: s.loader.load("res/well.png")
            });
            this.mapUv(280, 428, x, 1, 0, 0, 280, 148), this.mapUv(280, 428, x, 2, 0, 148, 280, 428), 
            this.mapUv(280, 428, x, 4, 0, 0, 280, 148, !0), this.hitObj = new t.Mesh(x, A), 
            this.score = 5;
        } else if (27 == i) {
            this.radiusSegments = 50;
            x = new t.CylinderGeometry(2 * s.BLOCK.radius / 38 * 25, 2 * s.BLOCK.radius / 38 * 25, this.height, 50);
            this.geometry = x, this.shadow.scale.set(50 / 38, 50 / 38, 50 / 38);
            var A = new t.MeshBasicMaterial({
                map: s.loader.load("res/golf_bottom.png")
            }), k = new t.CircleGeometry(2 * s.BLOCK.radius / 38 * 25 + .01, 30), T = new g({
                map: s.loader.load("res/golf_top.png")
            }), L = new t.Geometry(), B = [ A, T ];
            x.rotateY(3), this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), k.rotateX(-Math.PI / 2), k.rotateY(-.7), this.merge(L, k, 1, [ {
                x: 0,
                y: this.height / 2 + .01,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B), this.sphere = new t.Mesh(new t.SphereGeometry(.6, 10, 10), this.whiteMaterial), 
            this.sphere.position.set(-8, -1, -1.5), this.obj.add(this.sphere);
            var se = new t.Mesh(new t.PlaneGeometry(2, 5), new t.MeshBasicMaterial({
                map: s.loader.load("res/flag.png"),
                transparent: !0
            }));
            this.body.add(se), se.position.set(-4.4, 5, -4.3), se.rotation.y = -Math.PI / 4, 
            se.rotation.x = -.928, se.rotation.z = -Math.PI / 5;
        } else if (28 == i) {
            this.radiusSegments = 50;
            x = new t.CylinderGeometry(2 * s.BLOCK.radius / 38 * 15, 2 * s.BLOCK.radius / 38 * 15, this.height, 50);
            this.geometry = x, this.shadow.scale.set(30 / 38, 30 / 38, 30 / 38);
            var A = new t.MeshBasicMaterial({
                map: s.loader.load("res/paper_bottom.png")
            }), k = new t.CircleGeometry(2 * s.BLOCK.radius / 38 * 15 + .01, 30), T = new g({
                map: s.loader.load("res/paper_top.png")
            }), L = new t.Geometry(), B = [ A, T ];
            x.rotateY(4), this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), k.rotateX(-Math.PI / 2), k.rotateY(-.7), this.merge(L, k, 1, [ {
                x: 0,
                y: this.height / 2 + .01,
                z: 0
            } ]), this.shadow.scale.y = 1.1, this.hitObj = new t.Mesh(L, B);
        } else if (29 == i) {
            this.radiusSegments = 50, this.min = .8, this.height = s.BLOCK.height / 21 * 4;
            x = new t.CylinderGeometry(.4 * s.BLOCK.radius, .4 * s.BLOCK.radius, this.height, 50);
            this.geometry = x;
            var A = p, k = new t.CircleGeometry(.4 * s.BLOCK.radius, 50), T = new t.MeshBasicMaterial({
                color: 16777215
            }), H = new t.CylinderGeometry(.4 * s.BLOCK.radius, .5 * s.BLOCK.radius, s.BLOCK.height / 21 * 1, 50), f = new t.CylinderGeometry(.5 * s.BLOCK.radius, .5 * s.BLOCK.radius, s.BLOCK.height / 21 * 16, 50), Y = new t.MeshBasicMaterial({
                map: s.loader.load("res/medicine.png")
            }), L = new t.Geometry(), B = [ A, T, Y ];
            this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), k.rotateX(-Math.PI / 2), this.merge(L, k, 1, [ {
                x: 0,
                y: this.height / 2 + .01,
                z: 0
            } ]), this.merge(L, H, 1, [ {
                x: 0,
                y: -s.BLOCK.height / 21 * 2.5,
                z: 0
            } ]), f.rotateY(2.3), this.merge(L, f, 2, [ {
                x: 0,
                y: -s.BLOCK.height / 21 * 11,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B), this.shadow.scale.set(.55, .9, .7);
        } else if (30 == i) {
            x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius);
            this.geometry = x;
            A = new t.MeshLambertMaterial({
                map: s.loader.load("res/luban.png")
            });
            this.mapUv(338, 338, x, 1, 0, 128, 208, 0), this.mapUv(338, 338, x, 2, 0, 128, 210, 338), 
            this.mapUv(338, 338, x, 4, 210, 129, 337, 338);
            var ae = new t.MeshLambertMaterial({
                color: 2199e3
            }), he = new t.Mesh(new t.BoxGeometry(10, .4, 1.5), ae), oe = new t.MeshLambertMaterial({
                color: 4531468
            }), re = new t.MeshLambertMaterial({
                color: 8037621
            });
            this.earBlack = new t.Mesh(new t.BoxGeometry(1.2, 3.5, 3.5), oe), this.earBlue = new t.Mesh(new t.BoxGeometry(1, 2.5, 2.5), re), 
            he.position.set(0, .8, 5.75), this.body.add(he), this.earBlack.position.set(-5.4, 0, 0), 
            this.earBlue.position.set(-6, 0, 0), this.body.add(this.earBlue), this.body.add(this.earBlack), 
            this.hitObj = new t.Mesh(x, A), this.musicName = "luban", this.score = 20;
            k = new t.PlaneGeometry(2, 2);
            this.icons = [];
            for (var ne = s.loader.load("res/music_icon_two.png"), N = 0; N < 4; ++N) this.icons[N] = new t.Mesh(k, new t.MeshBasicMaterial({
                map: ne,
                transparent: !0
            })), this.icons[N].rotation.y = -Math.PI / 4, this.icons[N].rotation.x = -Math.PI / 5, 
            this.icons[N].rotation.z = -Math.PI / 5, this.body.add(this.icons[N]), this.icons[N].scale.set(.6, .6, .6);
            this.succeedTimer = this.playLubanMusic, this.whenLeave = this.stopLubanMusic;
        } else if (31 == i) {
            this.canChange = !1, this.height = s.BLOCK.height / 21 * 7;
            x = new t.BoxGeometry(2 * s.BLOCK.radius / 38 * 45, this.height, 2 * s.BLOCK.radius / 38 * 45);
            this.geometry = x;
            f = new t.BoxGeometry(2 * s.BLOCK.radius / 38 * 40, s.BLOCK.height / 21 * 14, 2 * s.BLOCK.radius / 38 * 40);
            this.shadow.scale.set(40 / 38, 1.4, 1), this.map = s.loader.load("res/wechat_close.png"), 
            this.topMap = s.loader.load("res/wechat_top.png");
            var B = [ A = new t.MeshLambertMaterial({
                map: this.topMap
            }), Y = new t.MeshBasicMaterial({
                map: this.map,
                transparent: !0
            }) ], L = new t.Geometry();
            this.mapUv(340, 340, x, 1, 0, 0, 280, 60), this.mapUv(340, 340, x, 2, 0, 60, 280, 340), 
            this.mapUv(340, 340, x, 4, 280, 60, 340, 340), this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.mapUv(434, 164, f, 1, 0, 0, 217, 164), this.mapUv(434, 164, f, 4, 217, 0, 434, 164, !0), 
            this.merge(L, f, 1, [ {
                x: 0,
                y: -s.BLOCK.height / 21 * 10.5,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
            var le = new t.PlaneGeometry(2.5, 3.34);
            this.door = new t.Mesh(le, new t.MeshBasicMaterial({
                map: s.loader.load("res/wechat_door.png"),
                transparent: !0
            })), this.door.rotation.y = -Math.PI / 2, this.door.position.set(-s.BLOCK.radius / 38 * 40 - .05, -2.9, 1.2), 
            this.door.visible = !1, this.body.add(this.door), this.secondDoor = new t.Mesh(le, new t.MeshBasicMaterial({
                map: s.loader.load("res/wechat_second_door.png"),
                transparent: !0
            })), this.secondDoor.visible = !1, this.secondDoor.rotation.y = -Math.PI / 2, this.secondDoor.position.set(-s.BLOCK.radius / 38 * 40 - .05, -2.9, -1.2), 
            this.body.add(this.secondDoor), this.glowMap = s.loader.load("res/wechat_open.png"), 
            this.glowTopMap = s.loader.load("res/wechat_glow_top.png"), this.succeedTimer = function() {
                5 != this.score && (this.hitObj.material[1].map = this.glowMap, this.hitObj.material[0].map = this.glowTopMap, 
                this.logo.visible = !1, this.glowLogo.visible = !0, this.door.visible = !0, this.secondDoor.visible = !0);
            }, this.glowLogo = new t.Object3D(), this.logo = new t.Object3D();
            var H = new t.CylinderGeometry(1.8, 1.8, .5, 30), de = new t.MeshLambertMaterial({
                color: 3457369
            }), R = new t.MeshLambertMaterial({
                color: 5879160
            }), me = new t.Mesh(H, R), ce = new t.Mesh(H, de);
            (k = new t.CircleGeometry(1.8, 30)).rotateX(Math.PI / 2), k.rotateY(-Math.PI / 2);
            var T = new t.MeshBasicMaterial({
                map: s.loader.load("res/wechat_logo.png")
            }), ue = new t.MeshBasicMaterial({
                map: s.loader.load("res/wechat_glow_logo.png")
            }), ye = new t.Mesh(k, T), pe = new t.Mesh(k, ue);
            this.logo.add(me), ye.position.y = -.251, this.logo.add(ye), this.logo.position.x = -6.5, 
            this.logo.rotation.z = -Math.PI / 2, this.body.add(this.logo), pe.position.y = -.251, 
            this.glowLogo.add(pe), this.glowLogo.add(ce), this.glowLogo.position.x = -6.5, this.glowLogo.rotation.z = -Math.PI / 2, 
            this.glowLogo.visible = !1, this.body.add(this.glowLogo), this.musicName = "pay", 
            this.registerAudio = function() {
                5 != M.score && (a.customAnimation.to(M.door.position, 1, {
                    z: 2.2
                }), a.customAnimation.to(M.secondDoor.position, 1, {
                    z: -1.9
                }));
            }, this.registerEndAudio = function() {
                5 != M.score && (a.customAnimation.to(M.door.position, 1, {
                    z: 1.2
                }), a.customAnimation.to(M.secondDoor.position, 1, {
                    z: -1.2
                }));
            }, this.beforePopup = function() {
                M.hitObj.material[1].map = M.map, M.hitObj.material[0].map = M.topMap, M.logo.visible = !0, 
                M.glowLogo.visible = !1, M.door.visible = !1, M.secondDoor.visible = !1;
            }, this.score = 20;
        } else if (32 == i) {
            this.canChange = !1;
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius);
            this.geometry = C;
            P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
            var H = new t.CylinderGeometry(1.5, 1.5, .4, 30), ge = new t.Mesh(H, new t.MeshLambertMaterial({
                color: 9099465
            }));
            (k = new t.CircleGeometry(1.5, 30)).rotateX(Math.PI / 2), k.rotateY(-Math.PI / 2);
            var T = new t.MeshBasicMaterial({
                map: s.loader.load("res/relax_back.png")
            }), we = new t.MeshBasicMaterial({
                map: s.loader.load("res/relax_front.png"),
                side: t.DoubleSide
            }), Me = new t.Mesh(k, T), Be = new t.Mesh(k, we);
            this.board = new t.Object3D(), Me.position.y = -.21, Be.position.y = .21, this.board.add(Me), 
            this.board.add(Be), this.board.add(ge), this.board.rotation.z = -Math.PI / 2, this.board.position.set(6.7, 3.5, 6.7), 
            this.obj.add(this.board);
            var Le = new t.Mesh(H, this.greenMaterial), Oe = new t.Mesh(H, this.greenMaterial);
            Oe.scale.set(1, 1, 1), Oe.position.set(6.7, -2, 6.7), this.obj.add(Oe), Le.scale.set(.7, .7, .7), 
            Le.position.set(6.7, -1.5, 6.7), this.obj.add(Le);
            var be = Le.clone();
            be.scale.set(.1, 11, .1), be.position.set(6.7, 0, 6.7), this.obj.add(be), this.perFrame = function() {
                M.board.rotation.y += .01;
            }, this.score = -20, this.musicName = "relax";
        } else if (33 == i) {
            this.canChange = !1;
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius);
            this.geometry = C;
            P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (34 == i) {
            this.canChange = !1;
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius);
            this.geometry = C;
            P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (35 == i) {
            this.canChange = !1;
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius);
            this.geometry = C;
            P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (-1 == i) {
            var Ce = [ 15622240, 14980702, 15712087, 9089870, 7451844, 6519997, 10772948 ], x = c, A = new t.MeshLambertMaterial({
                color: Ce[h],
                transparent: !0
            });
            this.hitObj = new t.Mesh(x, A);
            var ve = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height, 2 * s.BLOCK.radius);
            this.mapUv(100, 88, ve, 2, 0, 0, 5, 5);
            var xe = new t.Mesh(ve, d);
            0 == h && (xe.receiveShadow = !0), this.body.add(xe);
            var Ke, fe, Ge, ze, k = new t.PlaneGeometry(4, 8);
            Ge = (Ke = h % 4 * 64) + 64, ze = (fe = 128 * parseInt(h / 4)) + 128, this.mapUv(256, 256, k, 0, Ke, ze, Ge, fe), 
            (Me = new t.Mesh(k, m)).rotation.x = -Math.PI / 2, Me.rotation.z = -Math.PI / 2, 
            Me.position.y = s.BLOCK.height / 2 + .05, this.body.add(Me), this.obj.scale.set(.7, 1, .7);
        } else {
            var je = arguments[1];
            if (1 == je.block_type) {
                var x = new t.BoxGeometry(2 * s.BLOCK.radius, this.height, 2 * s.BLOCK.radius), A = new t.MeshLambertMaterial({
                    map: s.loader.load(wx.env.USER_DATA_PATH + "/" + je.block_res_list[0].path)
                });
                this.mapUv(428, 428, x, 1, 0, 0, 280, 148), this.mapUv(428, 428, x, 2, 0, 148, 280, 428), 
                this.mapUv(428, 428, x, 4, 280, 148, 428, 428), this.hitObj = new t.Mesh(x, A), 
                this.shadow.position.set(0, -s.BLOCK.height / 2 - .001, -4.5);
            } else if (2 == je.block_type) {
                this.radiusSegments = 50;
                x = new t.CylinderGeometry(s.BLOCK.radius, s.BLOCK.radius, this.height, 50);
                this.geometry = x;
                var A = new t.MeshBasicMaterial({
                    map: s.loader.load(wx.env.USER_DATA_PATH + "/" + je.block_res_list[0].path)
                }), k = new t.CircleGeometry(s.BLOCK.radius + .01, 30), T = new g({
                    map: s.loader.load(wx.env.USER_DATA_PATH + "/" + je.block_res_list[1].path)
                }), L = new t.Geometry(), B = [ A, T ];
                x.rotateY(3), this.merge(L, x, 0, [ {
                    x: 0,
                    y: 0,
                    z: 0
                } ]), k.rotateX(-Math.PI / 2), k.rotateY(-.7), this.merge(L, k, 1, [ {
                    x: 0,
                    y: this.height / 2 + .01,
                    z: 0
                } ]), this.hitObj = new t.Mesh(L, B), this.shadow = new t.Mesh(y, r), this.shadow.position.set(-.1, -s.BLOCK.height / 2 - .001, -2.8), 
                this.shadow.scale.y = 1.4, this.shadow.scale.x = 1, this.shadow.rotation.x = -Math.PI / 2;
            }
            je.ad && (this.isAd = !0, this.trademark_url = "block_" + je.id + "/trade", this.ad_url = je.ad.activity_url), 
            this.score = je.score;
        }
        this.shadow.initZ = this.shadow.position.z, this.hitObj.receiveShadow = !0, this.hitObj.name = "hitObj", 
        this.body.add(this.hitObj), this.hitObj.matrixAutoUpdate = !1, this.shadow.initScale = this.shadow.scale.y, 
        this.body.position.y = s.BLOCK.height / 2 - this.height / 2, this.obj.add(this.shadow), 
        this.obj.add(this.body);
    }
    return i(w, [ {
        key: "merge",
        value: function(e, i, s, a) {
            for (var h = 0, o = i.faces.length; h < o; ++h) i.faces[h].materialIndex = 0;
            for (var r = new t.Mesh(i), h = 0, o = a.length; h < o; ++h) r.position.set(a[h].x, a[h].y, a[h].z), 
            r.updateMatrix(), e.merge(r.geometry, r.matrix, s);
        }
    }, {
        key: "_mapUv",
        value: function(e, i, s, a, h, o, r, n, l) {
            var d = 1 / e, m = 1 / i;
            if (s.faces[a] instanceof t.Face3) {
                c = s.faceVertexUvs[0][2 * a];
                4 == a && !l || 2 == a && l ? (c[0].x = h * d, c[0].y = o * m, c[2].x = h * d, c[2].y = n * m, 
                c[1].x = r * d, c[1].y = o * m) : (c[0].x = h * d, c[0].y = o * m, c[1].x = h * d, 
                c[1].y = n * m, c[2].x = r * d, c[2].y = o * m);
                var c = s.faceVertexUvs[0][2 * a + 1];
                4 == a && !l || 2 == a && l ? (c[2].x = h * d, c[2].y = n * m, c[1].x = r * d, c[1].y = n * m, 
                c[0].x = r * d, c[0].y = o * m) : (c[0].x = h * d, c[0].y = n * m, c[1].x = r * d, 
                c[1].y = n * m, c[2].x = r * d, c[2].y = o * m);
            }
        }
    }, {
        key: "mapUv",
        value: function(e, i, t, s, a, h, o, r, n) {
            if (s.length) for (var l = 0; l < s.length; ++l) this._mapUv(e, i, t, s[l], a, h, o, r, n); else this._mapUv(e, i, t, s, a, h, o, r, n);
        }
    }, {
        key: "showLight",
        value: function(e) {
            var i = this;
            this.light.visible = !0, this.light.material.opacity = 0, this.light.position.set(e.x - this.obj.position.x, 5.6, e.z - this.obj.position.z), 
            this.light.scale.set(1 / this.radiusScale, 1, 1 / this.radiusScale), a.customAnimation.to(this.light.material, 1, {
                opacity: 1
            }), setTimeout(function() {
                i.hideLight();
            }, 1500);
        }
    }, {
        key: "hideLight",
        value: function() {
            var e = this;
            a.customAnimation.to(this.light.material, .5, {
                opacity: 0,
                onComplete: function() {
                    e.light.visible = !1;
                }
            });
        }
    }, {
        key: "hideLightImediate",
        value: function() {
            this.light.visible = !1;
        }
    }, {
        key: "getBox",
        value: function() {
            return this.boundingBox ? this.boundingBox : (this.boundingBox = new t.Box3().setFromObject(this.body), 
            this.boundingBox);
        }
    }, {
        key: "glow",
        value: function() {
            this.hitObj.material.map = this.glowMap;
        }
    }, {
        key: "wechatGlow",
        value: function() {}
    }, {
        key: "openDoor",
        value: function() {
            a.customAnimation.to(this.door.position, 1, {
                z: -4.5
            }), a.customAnimation.to(this.secondDoor.position, 1, {
                z: -.5
            });
        }
    }, {
        key: "closeDoor",
        value: function() {
            a.customAnimation.to(this.door.position, 1, {
                z: -3.3
            }), a.customAnimation.to(this.secondDoor.position, 1, {
                z: -1.7
            });
        }
    }, {
        key: "rotateBox",
        value: function() {
            a.customAnimation.to(this.middle.rotation, .5, {
                y: -Math.PI / 2
            });
        }
    }, {
        key: "playLubanMusic",
        value: function() {
            var e = this, i = function() {
                e.icons[0].position.set(1, 7, -1), e.icons[1].position.set(-1, 7, -1), e.icons[2].position.set(1, 7, 1), 
                e.icons[3].position.set(-1, 7, 1);
                for (var i = 0, t = e.icons.length; i < t; ++i) e.icons[i].material.opacity = 0, 
                a.customAnimation.to(e.icons[i].position, .7, {
                    y: 12,
                    ease: "Cubic.easeIn",
                    delay: .1 * i
                }), a.customAnimation.to(e.icons[i].position, .7, {
                    x: 0 == i || 2 == i ? 3 : -3,
                    delay: .1 * i
                }), a.customAnimation.to(e.icons[i].material, .7, {
                    opacity: 1,
                    delay: .1 * i
                }), a.customAnimation.to(e.icons[i].position, .7, {
                    y: 17,
                    ease: "Cubic.easeOut",
                    delay: .1 * i + .7
                }), a.customAnimation.to(e.icons[i].position, .7, {
                    x: 0 == i || 2 == i ? 1 : -1,
                    delay: .1 * i + .7
                }), a.customAnimation.to(e.icons[i].material, .7, {
                    opacity: 0,
                    delay: .1 * i + .7
                });
            };
            setTimeout(function() {
                i();
            }, 1e3), this.lubanMusicTimer = setInterval(function() {
                i();
            }, 3e3);
            var t = function() {
                for (var i = 0; i < 15; ++i) a.customAnimation.to(e.earBlack.scale, .2, {
                    y: 1.3,
                    z: 1.3,
                    delay: .4 * i
                }), a.customAnimation.to(e.earBlue.scale, .2, {
                    y: 1.3,
                    z: 1.3,
                    delay: .4 * i
                }), a.customAnimation.to(e.earBlack.scale, .2, {
                    y: 1,
                    z: 1,
                    delay: .4 * i + .2
                }), a.customAnimation.to(e.earBlue.scale, .2, {
                    y: 1,
                    z: 1,
                    delay: .4 * i + .2
                });
            };
            t(), this.earTimer = setInterval(function() {
                t();
            }, 9e3);
        }
    }, {
        key: "stopLubanMusic",
        value: function() {
            this.earTimer && (clearTimeout(this.earTimer), this.earTimer = null), this.lubanMusicTimer && (clearTimeout(this.lubanMusicTimer), 
            this.lubanMusicTimer = null);
        }
    }, {
        key: "playMusic",
        value: function() {
            for (var e = this, i = 0; i < 2; ++i) setTimeout(function(e) {
                return function() {
                    e.visible = !0, e.position.set(0, 0, 0), e.material.opacity = 1, a.customAnimation.to(e.position, 2, {
                        x: 5 * (1 - 2 * Math.random()),
                        y: 15,
                        z: 5 * (1 - 2 * Math.random())
                    }), a.customAnimation.to(e.material, 2, {
                        opacity: 0
                    });
                };
            }(this.icons[i]), 1e3 * i);
            this.musicTimer = setTimeout(function() {
                e.playMusic();
            }, 2500);
        }
    }, {
        key: "stopMusic",
        value: function() {
            this.musicTimer && (clearTimeout(this.musicTimer), this.musicTimer = null);
        }
    }, {
        key: "change",
        value: function(e, i, t) {
            if (this.canChange) {
                if (this.order >= 9) {
                    var a = this.order >= 13 ? .7 : .6;
                    return this.radiusScale = t || Math.max((0, h.random)() * (s.BLOCK.maxRadiusScale - s.BLOCK.minRadiusScale) + s.BLOCK.minRadiusScale, this.min || a), 
                    this.radiusScale = +this.radiusScale.toFixed(2), this.radius = e || this.radiusScale * s.BLOCK.radius, 
                    this.radius = +this.radius.toFixed(2), void this.obj.scale.set(this.radiusScale, 1, this.radiusScale);
                }
                this.radiusScale = t || (0, h.random)() * (s.BLOCK.maxRadiusScale - s.BLOCK.minRadiusScale) + s.BLOCK.minRadiusScale, 
                this.radiusScale = +this.radiusScale.toFixed(2), this.radius = e || this.radiusScale * s.BLOCK.radius, 
                this.radius = +this.radius.toFixed(2), this.obj.scale.set(this.radiusScale, 1, this.radiusScale), 
                this.changeColor(i);
            }
        }
    }, {
        key: "changeColor",
        value: function(e) {
            var i = e || this.types[Math.floor(3 * Math.random())];
            this.type != i && (this.type = i, "green" == i ? (this.greenMaterial.color.setHex(o.green), 
            this.whiteMaterial.color.setHex(o.white), this.middleLightGreenMaterial && this.middleLightGreenMaterial.color.setHex(o.middleLightGreen)) : "gray" == i ? (this.greenMaterial.color.setHex(o.white), 
            this.whiteMaterial.color.setHex(o.gray), this.middleLightGreenMaterial && this.middleLightGreenMaterial.color.setHex(o.middleLightGray)) : "black" == i && (this.greenMaterial.color.setHex(o.black), 
            this.whiteMaterial.color.setHex(o.lightBlack), this.middleLightGreenMaterial && this.middleLightGreenMaterial.color.setHex(o.middleLightBlack)));
        }
    }, {
        key: "getVertices",
        value: function() {
            var e = this, i = [], t = this.geometry || this.hitObj.geometry;
            if (this.obj.updateMatrixWorld(), 4 === this.radiusSegments) [ 0, 1, 4, 5 ].forEach(function(s) {
                var a = t.vertices[s].clone().applyMatrix4(e.hitObj.matrixWorld);
                i.push([ a.x, a.z ]);
            }); else for (var s = 0; s < this.radiusSegments; ++s) {
                var a = t.vertices[s].clone().applyMatrix4(this.hitObj.matrixWorld);
                i.push([ a.x, a.z ]);
            }
            return i;
        }
    }, {
        key: "relayLimitTime",
        value: function(e) {
            this.limitTime = e;
        }
    }, {
        key: "shrink",
        value: function() {
            this.status = "shrink", this.prepareTime = 0;
        }
    }, {
        key: "_shrink",
        value: function(e) {
            if (!(void 0 !== this.limitTime && this.prepareTime > this.limitTime)) if (this.scale -= s.BLOCK.reduction, 
            this.scale = Math.max(s.BLOCK.minScale, this.scale), this.scale <= s.BLOCK.minScale) this.status = "stop"; else {
                this.body.scale.y = this.scale, this.shadow.scale.y -= s.BLOCK.reduction / 2, this.shadow.position.z += s.BLOCK.reduction / 4 * this.shadowWidth;
                var i = s.BLOCK.reduction / 2 * s.BLOCK.height * (s.BLOCK.height - this.height / 2) / s.BLOCK.height * 2;
                this.body.position.y -= i, this.prepareTime += e;
            }
        }
    }, {
        key: "showup",
        value: function(e) {
            var i = this.shadow.position.z;
            this.body.position.set(0, 20, 0), this.shadow.position.z = -15, this.obj.visible = !0, 
            3 == e || 4 == e || 6 == e ? this.obj.position.set(7.5 * (6 == e ? 5 : 3), 0, 3.8 * (3 == e || 6 == e ? -1 : 1)) : 5 == e ? this.obj.position.set(30, 0, 0) : this.obj.position.set(7.5 * e, 0, 0), 
            (0, a.TweenAnimation)(this.body.position.y, s.BLOCK.height / 2 - this.height / 2, 500, "Bounce.easeOut", function(e, i) {
                this.body.position.y = e;
            }.bind(this)), (0, a.TweenAnimation)(this.shadow.position.z, i, 500, "Bounce.easeOut", function(e, i) {
                this.shadow.position.z = e;
            }.bind(this));
        }
    }, {
        key: "hideGlow",
        value: function() {
            this.hitObj.material.map = this.map;
        }
    }, {
        key: "popup",
        value: function() {
            var e = this;
            if (this.beforePopup && this.beforePopup(), 25 == this.order) {
                for (var i = 0; i < 10; ++i) for (var t = 0; t < 4; ++t) this.numbers[i][t].visible = !1;
                var h = new Date(), o = ("0" + h.getHours()).slice(-2), r = ("0" + h.getMinutes()).slice(-2);
                this.numbers[o[0]][0].position.x = -3.1 * this.radiusScale, this.numbers[o[0]][0].visible = !0, 
                this.numbers[o[1]][1].position.x = -1.2 * this.radiusScale, this.numbers[o[1]][1].visible = !0, 
                this.numbers[r[0]][2].position.x = 1.2 * this.radiusScale, this.numbers[r[0]][2].visible = !0, 
                this.numbers[r[1]][3].position.x = 3.1 * this.radiusScale, this.numbers[r[1]][3].visible = !0;
            } else 17 == this.order && (this.middle.rotation.y = 0);
            var n = this.shadow.position.z;
            this.body.position.y = 20, this.shadow.position.z = -15, this.obj.visible = !0, 
            this.boundingBox = null, a.customAnimation.to(this.body.position, .5, {
                y: s.BLOCK.height / 2 - this.height / 2,
                ease: "Bounce.easeOut",
                onEnded: function() {
                    e.body.position.y = s.BLOCK.height / 2 - e.height / 2;
                }
            }), a.customAnimation.to(this.shadow.position, .5, {
                z: n,
                ease: "Bounce.easeOut",
                onEnded: function() {
                    e.shadow.position.z = n;
                }
            });
        }
    }, {
        key: "reset",
        value: function() {
            this.status = "stop", this.scale = 1, this.obj.scale.y = 1, this.body.scale.y = 1, 
            this.obj.position.y = 0, this.body.position.y = s.BLOCK.height / 2 - this.height / 2, 
            this.shadow.scale.y = this.shadow.initScale, this.shadow.position.z = this.shadow.initZ, 
            this.boundingBox = null, this.limitTime = void 0;
        }
    }, {
        key: "rebound",
        value: function() {
            this.limitTime = void 0, this.status = "stop", this.scale = 1, a.customAnimation.to(this.body.scale, .5, {
                ease: "Elastic.easeOut",
                y: 1
            }), a.customAnimation.to(this.body.position, .5, {
                ease: "Elastic.easeOut",
                y: s.BLOCK.height / 2 - this.height / 2
            }), a.customAnimation.to(this.shadow.scale, .5, {
                ease: "Elastic.easeOut",
                y: this.shadow.initScale
            }), a.customAnimation.to(this.shadow.position, .5, {
                ease: "Elastic.easeOut",
                z: this.shadow.initZ
            });
        }
    }, {
        key: "update",
        value: function(e) {
            this.perFrame && this.perFrame(), "stop" !== this.status && ("shrink" === this.status ? this._shrink(e) : this.status);
        }
    } ]), w;
}();

exports.default = w;