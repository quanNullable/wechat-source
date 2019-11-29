function e(e) {
    (e = Object.assign({}, {
        self: {},
        type: "bg"
    }, e)).self.showState && (e.self.canvasType == v.gameOver && "bg" != e.type && "btn" != e.type && "sample" != e.type || e.self.canvasType == v.start && "bg" != e.type && "btn" != e.type && "sample" != e.type || e.self.canvasType == v.record && "bg" != e.type || (e.self.texture[e.type].needsUpdate = !0, 
    e.self.obj[e.type].visible = !0, e.self.options.camera.add(e.self.obj[e.type])));
}

function t(e, t, n) {
    if (e && t) {
        var r = e.distanceToPoint(t);
        r < 0 && !n && e.negate(), n && r > 0 && e.negate();
    }
}

function n(e, t) {
    if (!T) {
        e.showState = !1, !!e.bannerAd && e.bannerAd.hide(), !!e.bannerAd && e.bannerAd.destory(), 
        e.bannerAd = null;
        for (var n = 0; n < y.length; n++) !e.obj[y[n]] || t && t.indexOf(y[n]) >= 0 || (e.obj[y[n]].visible = !1, 
        e.options.camera.remove(e.obj[y[n]]));
        e.canvasType != v.getNewSkin && e.canvasType != v.gameOver && e.canvasType != v.jiliProp && e.sunGif && (e.options.camera.remove(e.sunGif.obj), 
        e.sunGif.destroy()), t || (e.lastopt = void 0);
    }
}

function r(e) {
    var t = e * g / 414;
    return w / g < 736 / 414 && (t = e * w / 736), t * f;
}

function o(e) {
    var t = e * g / 414;
    return w / g < 736 / 414 && (t = e * w / 736 + (g - 414 * w / 736) / 2), t * f;
}

function a(e) {
    return (w / g > 736 / 414 ? e * g / 414 + (w - 736 * g / 414) / 2 : e * w / 736) * f;
}

function s(e, t) {
    var n = e * f * g / 414;
    return w / g < 736 / 414 && (n = e * f * w / 736), t && V ? n + "px " + V : n + "px Helvetica";
}

function p(t) {
    "/0" != (t = Object.assign({}, {
        self: {},
        src: "",
        pos: [ 0, 0, 100, 100 ],
        type: "bg",
        cb: null,
        imgid: 0,
        noupdate: !1,
        round: !1,
        radius: 2,
        alpha: 1
    }, t)).src && "/96" != t.src && "/64" != t.src && t.src || (t.src = "res/ava.png");
    var n = new Image(), s = t.self.context[t.type];
    n.onload = function() {
        if (t.self.imgid[t.type] == t.imgid) {
            if (t.round) {
                s.save();
                var p = void 0;
                p = "list1" == t.type || "list2" == t.type ? r(t.pos[1]) - r(t.pos[3]) / 2 : a(t.pos[1]) - r(t.pos[3]) / 2, 
                i(o(t.pos[0]) - r(t.pos[2]) / 2, p, r(t.pos[2]), r(t.pos[3]), t.radius, s), s.clip(), 
                s.globalAlpha = t.alpha, s.drawImage(n, o(t.pos[0]) - r(t.pos[2]) / 2, p, r(t.pos[2]), r(t.pos[3])), 
                s.globalAlpha = 1, s.closePath(), s.restore();
            } else s.globalAlpha = t.alpha, "list1" == t.type || "list2" == t.type ? s.drawImage(n, o(t.pos[0]) - r(t.pos[2]) / 2, r(t.pos[1]) - r(t.pos[3]) / 2, r(t.pos[2]), r(t.pos[3])) : s.drawImage(n, o(t.pos[0]) - r(t.pos[2]) / 2, a(t.pos[1]) - r(t.pos[3]) / 2, r(t.pos[2]), r(t.pos[3])), 
            s.globalAlpha = 1;
            !!t.cb && t.cb(), t.noupdate || e({
                self: t.self,
                type: t.type
            });
        }
    }, n.onerror = function(e) {
        !!t.cb && t.cb();
    }, n.src = t.src;
}

function i(e, t, n, r, o, a) {
    a.beginPath(), a.moveTo(e, t + o - 1), a.lineTo(e, t + r - o), a.quadraticCurveTo(e, t + r, e + o, t + r), 
    a.lineTo(e + n - o, t + r), a.quadraticCurveTo(e + n, t + r, e + n, t + r - o), 
    a.lineTo(e + n, t + o), a.quadraticCurveTo(e + n, t, e + n - o, t), a.lineTo(e + o, t), 
    a.quadraticCurveTo(e, t, e, t + o), a.stroke(), a.closePath();
}

function l(e, t) {
    e.routesArr = e.routesArr || [], e.routesArr.push(t);
}

function c(e, t) {
    return (e = e || "").replace(/[^\x00-\xff]/g, "**").length > t && (e = c(e = e.substring(0, e.length - 1), t)), 
    e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ListLineHeight = exports.DEBUGVIEW = exports.frustumSizeWidth = exports.frustumSizeHeight = exports.CANVASTYPE = exports.WIDTH = exports.HEIGHT = exports.H = exports.W = exports.realDpr = exports.Dpr = void 0, 
exports.createPlane = function(e, t) {
    if (n(e, t), e.showState = !0, !e.canvas.bg) {
        T && (y = [ "sample", "btn", "list1", "list2", "bg" ]);
        for (var o = 0; o < y.length; o++) e.canvas[y[o]] = document.createElement("canvas"), 
        e.context[y[o]] = e.canvas[y[o]].getContext("2d"), e.canvas[y[o]].width = m, "list1" == y[o] || "list2" == y[o] ? e.canvas[y[o]].height = r(720) : e.canvas[y[o]].height = x, 
        e.texture[y[o]] = new u.Texture(e.canvas[y[o]]), e.material[y[o]] = new u.MeshBasicMaterial({
            map: e.texture[y[o]],
            transparent: !0
        }), "list1" == y[o] || "list2" == y[o] ? e.geometry[y[o]] = new u.PlaneBufferGeometry(b, r(720) / x * h) : e.geometry[y[o]] = new u.PlaneBufferGeometry(b, h), 
        e.obj[y[o]] = new u.Mesh(e.geometry[y[o]], e.material[y[o]]), e.material[y[o]].map.minFilter = u.LinearFilter, 
        e.obj[y[o]].position.y = 0, e.obj[y[o]].position.x = 0, e.obj[y[o]].position.z = 9 - .001 * o;
        T && k && (e.context.sample, setTimeout(function() {
            p({
                self: e,
                src: "res/sample.png",
                pos: [ 207, 368, 414, 736 ],
                type: "sample",
                imgid: e.imgid.sample,
                alpha: .5
            });
        }, 2e3));
    }
}, exports.updatePlane = e, exports.updateClip = function(e) {
    var n = e.self;
    n.p0 || (n.p0 = new u.Vector3(0, 0, 9), n.p1 = new u.Vector3(-b * (.5 - o(30) / m), (.5 - a(157) / x) * h, 9), 
    n.p2 = new u.Vector3(b * (.5 - o(30) / m), h * (.5 - a(157) / x), 9), n.p3 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(218) / x), 9), 
    n.p4 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(218) / x), 9)), n.p5 || (n.p5 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(299) / x), 9), 
    n.p6 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(299) / x), 9), n.p7 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(104) / x), 9), 
    n.p8 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(104) / x), 9)), n.p9 || (n.p9 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(332) / x), 9), 
    n.p10 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(332) / x), 9), n.p11 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(175) / x), 9), 
    n.p12 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(175) / x), 9)), n.p13 || (n.p13 = new u.Vector3(-b * (.5 - o(30) / m), (.5 - a(318) / x) * h, 9), 
    n.p14 = new u.Vector3(b * (.5 - o(30) / m), h * (.5 - a(318) / x), 9), n.p15 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(176) / x), 9), 
    n.p16 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(176) / x), 9)), n.p17 || (n.p17 = new u.Vector3(-b * (.5 - o(30) / m), (.5 - a(136) / x) * h, 9), 
    n.p18 = new u.Vector3(b * (.5 - o(30) / m), h * (.5 - a(136) / x), 9), n.p19 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(118) / x), 9), 
    n.p20 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(118) / x), 9)), n.p21 || (n.p21 = new u.Vector3(-b * (.5 - o(30) / m), (.5 - a(278) / x) * h, 9), 
    n.p22 = new u.Vector3(b * (.5 - o(30) / m), h * (.5 - a(278) / x), 9), n.p23 = new u.Vector3(b * (.5 - o(30) / m), -h * (.5 - a(157) / x), 9), 
    n.p24 = new u.Vector3(-b * (.5 - o(30) / m), -h * (.5 - a(157) / x), 9));
    var r = n.p0.clone(), s = n.p1.clone(), p = n.p2.clone(), i = n.p3.clone(), l = n.p4.clone();
    n.canvasType == v.pk && (s = n.p5.clone(), p = n.p6.clone(), i = n.p7.clone(), l = n.p8.clone()), 
    n.canvasType == v.relayRank && (s = n.p9.clone(), p = n.p10.clone(), i = n.p11.clone(), 
    l = n.p12.clone(), 1 != n.opt.my_rank && (s = n.p13.clone(), p = n.p14.clone(), 
    i = n.p15.clone(), l = n.p16.clone())), n.canvasType == v.msgBox && (s = n.p17.clone(), 
    p = n.p18.clone(), i = n.p19.clone(), l = n.p20.clone()), n.canvasType == v.shareSkin && (s = n.p21.clone(), 
    p = n.p22.clone(), i = n.p23.clone(), l = n.p24.clone()), n.options.camera.updateMatrixWorld();
    var c = n.options.camera.matrixWorld;
    r.applyMatrix4(c), s.applyMatrix4(c), p.applyMatrix4(c), i.applyMatrix4(c), l.applyMatrix4(c);
    var d = new u.Triangle(p, s), f = d.plane();
    n.canvasType == v.relayRank && 1 == n.opt.my_rank || n.canvasType == v.pk ? t(f, r.clone(), !0) : t(f, r.clone());
    var g = (d = new u.Triangle(i, p)).plane();
    t(g, r.clone());
    var w = (d = new u.Triangle(l, i)).plane();
    t(w, r.clone());
    var y = (d = new u.Triangle(s, l)).plane();
    t(y, r.clone()), n.material.list1.clippingPlanes = [ f, g, w, y ], n.material.list1.needsUpdate = !0, 
    n.material.list2.clippingPlanes = [ f, g, w, y ], n.material.list2.needsUpdate = !0;
}, exports.hide = n, exports.cwh = r, exports.cx = o, exports.cy = a, exports.rerank = function(e) {
    for (var t, n, r = 0, o = e.length; r < o; r++) for (t = 0; t < o; t++) e[r].week_best_score > e[t].week_best_score && (n = e[t], 
    e[t] = e[r], e[r] = n);
    return e;
}, exports.drawImageCenter = p, exports.drawLine = function(e, t, n, r, s, p, i) {
    i.beginPath(), i.lineWidth = p * f, i.strokeStyle = s, i.moveTo(o(e), a(t)), i.lineTo(o(n), a(r)), 
    i.stroke(), i.closePath();
}, exports.drawHomeImg = function(t, n) {
    var r = new Image();
    r.onload = function() {
        1624 == x && 750 == m ? t.drawImage(r, 10 * f, 44 * f, 104, 64) : t.drawImage(r, 10 * f, 10 * f, 104, 64), 
        e({
            self: n,
            type: "bg"
        });
    }, r.src = "res/2d/home.png";
}, exports.drawReturnImg = function(t, n) {
    var r = new Image();
    r.onload = function() {
        1624 == x && 750 == m ? t.drawImage(r, 10 * f, 45 * f, 86, 64) : t.drawImage(r, 10 * f, 10 * f, 86, 64), 
        e({
            self: n,
            type: "bg"
        });
    }, r.src = "res/2d/return.png";
}, exports.roundedRect = i, exports.drawText = function(e) {
    var t = (e = Object.assign({}, {
        self: {},
        t: "",
        size: 17,
        pos: [ 0, 0 ],
        type: "bg",
        special: !1,
        align: "center",
        color: "#fff",
        bold: !1,
        italic: !1
    }, e)).self.context[e.type], n = s(e.size, e.special);
    e.bold && (n = "bold " + n), e.italic && (n = "italic " + n), t.font = n, t.textBaseline = "middle", 
    t.textAlign = e.align, t.fillStyle = e.color, "list1" == e.type || "list2" == e.type ? t.fillText(e.t, o(e.pos[0]), r(e.pos[1])) : t.fillText(e.t, o(e.pos[0]), a(e.pos[1]));
}, exports.routeCanvas = function(e, t) {
    e.last2CanvasType = e.lastCanvasType, e.lastCanvasType = e.canvasType, e.canvasType = v[t], 
    l(e, t);
}, exports.go = l, exports.back = function(e, t) {
    return e.routesArr.pop(), e.routesArr.pop();
}, exports.cname = function(e, t) {
    return t = t || 16, (e = e || "").replace(/[^\x00-\xff]/g, "**").length > t + 2 && (e = c(e, t) + "..."), 
    e;
}, exports.findSelfIndex = function(e, t, n) {
    return e.nickname === this.myUserInfo.nickname && e.week_best_score === this.myUserInfo.week_best_score;
}, exports.relayRerank = function(e) {
    for (var t, n, r = 0, o = e.length; r < o; r++) for (t = 0; t < o; t++) e[r].rank < e[t].rank && (n = e[t], 
    e[t] = e[r], e[r] = n);
    return e;
}, exports.gtVersion = function(e) {
    var t = wx.getSystemInfoSync().SDKVersion;
    console.log("sdk version", t), e = e.split("."), t = t.split(".");
    for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) if (console.log(t[r], e[r]), 
    parseInt(t[r]) >= parseInt(e[r])) return !0;
    return !1;
};

var u = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../lib/three")), d = require("../../config"), f = exports.Dpr = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio, g = (exports.realDpr = window.devicePixelRatio, 
exports.W = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth), w = exports.H = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, x = exports.HEIGHT = w * f, m = exports.WIDTH = g * f, y = [ "btn", "list1", "list2", "bg" ], v = exports.CANVASTYPE = {
    friendRank: 0,
    groupRank: 1,
    gameOver: 2,
    start: 3,
    pk: 4,
    lookers: 5,
    gameOverNew: 6,
    gameOverHighest: 7,
    beginner: 8,
    verify: 9,
    relayRoom: 10,
    relayGG: 11,
    relayRank: 12,
    relayLookers: 13,
    record: 14,
    relayBeginner: 15,
    relayQr: 16,
    recordShare: 17,
    profile: 18,
    msgBox: 19,
    shareSkin: 20,
    getNewSkin: 21,
    skinList: 22,
    jiliProp: 23,
    msgDetail5: 24
}, h = exports.frustumSizeHeight = d.FRUSTUMSIZE, b = exports.frustumSizeWidth = m / x * h, T = exports.DEBUGVIEW = !1, k = !1, V = (exports.ListLineHeight = 60, 
wx.loadFont("res/num.ttf"));