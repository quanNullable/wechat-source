Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawLookersPage = function(t) {
    var r = t.self;
    (0, e.routeCanvas)(r, "lookers"), (0, e.createPlane)(r);
    var i = r.context.bg;
    i.clearRect(0, 0, e.WIDTH, e.HEIGHT);
    var g = r.opt, s = g.score || 0, a = g.nickname || "";
    "in" == g.type ? ((0, e.drawImageCenter)({
        self: r,
        src: g.headimg,
        pos: [ 207, 91, 50, 50 ],
        type: "bg",
        cb: function() {
            (0, e.drawImageCenter)({
                self: r,
                src: "res/2d/ava_square.png",
                pos: [ 207, 91, 53, 53 ],
                type: "bg",
                imgid: r.imgid.bg
            });
        },
        imgid: r.imgid.bg,
        noupdate: !0,
        round: !0
    }), (0, e.drawText)({
        self: r,
        t: a + " 正在游戏中",
        size: 17,
        pos: [ 207, 144 ],
        type: "bg",
        color: "black"
    })) : "gg" == g.type ? (i.fillStyle = "rgba(0,0,0, 0.4)", i.fillRect(0, 0, e.WIDTH, e.HEIGHT), 
    (0, e.drawImageCenter)({
        self: r,
        src: g.headimg,
        pos: [ 207, 91, 50, 50 ],
        type: "bg",
        cb: function() {
            (0, e.drawImageCenter)({
                self: r,
                src: "res/2d/ava_square.png",
                pos: [ 207, 91, 53, 53 ],
                type: "bg",
                imgid: r.imgid.bg
            });
        },
        imgid: r.imgid.bg,
        noupdate: !0,
        round: !0
    }), (0, e.drawText)({
        self: r,
        t: a + " 游戏已结束",
        size: 17,
        pos: [ 207, 144 ],
        type: "bg"
    }), (0, e.drawText)({
        self: r,
        t: "游戏得分",
        size: 14,
        pos: [ 207, 207 ],
        type: "bg"
    }), (0, e.drawText)({
        self: r,
        t: s,
        size: 80,
        pos: [ 212, 267 ],
        type: "bg",
        special: !0
    }), (0, e.drawLine)(157, 176, 257, 176, "rgba(255,255,255,0.5)", .5, i), i.fillStyle = "rgba(255,255,255,0.2)", 
    i.fillRect((0, e.cx)(156), (0, e.cy)(203), (0, e.cwh)(9), (0, e.cwh)(3)), i.fillRect((0, 
    e.cx)(156), (0, e.cy)(209), (0, e.cwh)(9), (0, e.cwh)(3)), i.fillRect((0, e.cx)(243), (0, 
    e.cy)(203), (0, e.cwh)(9), (0, e.cwh)(3)), i.fillRect((0, e.cx)(243), (0, e.cy)(209), (0, 
    e.cwh)(9), (0, e.cwh)(3))) : "out" == g.type ? (i.fillStyle = "rgba(0,0,0, 0.4)", 
    i.fillRect(0, 0, e.WIDTH, e.HEIGHT), (0, e.drawImageCenter)({
        self: r,
        src: g.headimg,
        pos: [ 207, 221, 50, 50 ],
        type: "bg",
        cb: function() {
            (0, e.drawImageCenter)({
                self: r,
                src: "res/2d/ava_square.png",
                pos: [ 207, 221, 53, 53 ],
                type: "bg",
                imgid: r.imgid.bg
            });
        },
        imgid: r.imgid.bg,
        noupdate: !0,
        round: !0
    }), (0, e.drawText)({
        self: r,
        t: a + " 游戏已结束",
        size: 17,
        pos: [ 207, 278 ],
        type: "bg"
    })) : "record" == g.type && (0, e.drawImageCenter)({
        self: r,
        src: g.headimg,
        pos: [ 71, 91, 42, 42 ],
        type: "bg",
        cb: function() {
            (0, e.drawImageCenter)({
                self: r,
                src: "res/2d/ava_square.png",
                pos: [ 71, 91, 43, 43 ],
                type: "bg",
                imgid: r.imgid.bg
            });
        },
        imgid: r.imgid.bg,
        noupdate: !0,
        round: !0
    }), "record" != g.type ? (0, e.drawImageCenter)({
        self: r,
        src: "res/btn_iplay.png",
        pos: [ 207, 663, 131, 54 ],
        type: "bg",
        imgid: r.imgid.bg
    }) : (0, e.drawImageCenter)({
        self: r,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJBEN0IEbib1Cef1vsVKvSKGJkU5R4HlfLFrnficcs7hc7VlYRRu523WotJ9QselXVaHQ/0?wx_fmt=png",
        pos: [ 207, 665, 131, 64 ],
        type: "bg",
        imgid: r.imgid.bg
    }), (0, e.updatePlane)({
        self: r,
        type: "bg"
    });
}, exports.lookersEve = function(e, t, r) {
    if (t > 130 && t < 280 && r > 650 && r < 720) return !!e.options.onLookersStart && e.options.onLookersStart(), 
    !1;
};

var e = require("./base");