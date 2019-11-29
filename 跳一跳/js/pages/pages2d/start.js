Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawStartPage = function(t) {
    t.imgid.btn++, t.imgid.bg++, (0, e.routeCanvas)(t, "start"), (0, e.createPlane)(t);
    var i = t.context.bg;
    i.clearRect(0, 0, e.WIDTH, e.HEIGHT), i.fillStyle = "rgba(0,0,0, 0.3)", i.fillRect(0, 0, e.WIDTH, e.HEIGHT), 
    (0, e.drawImageCenter)({
        self: t,
        src: "res/title.png",
        pos: [ 204, 168, 207, 52 ],
        type: "bg",
        imgid: t.imgid.bg
    }), t.context.btn.clearRect(0, 0, e.WIDTH, e.HEIGHT), (0, e.drawImageCenter)({
        self: t,
        src: "res/play.png",
        pos: [ 207, 505, 212, 84 ],
        type: "btn",
        imgid: t.imgid.btn
    }), t.opt.hideRank || ((0, e.drawText)({
        t: "多人游戏",
        self: t,
        size: 17,
        pos: [ 163, 571 ],
        align: "left"
    }), (0, e.drawImageCenter)({
        self: t,
        src: "res/r_arr.png",
        pos: [ 247, 571, 6.6, 10 ],
        type: "bg",
        imgid: t.imgid.bg
    }), i.fillStyle = "rgba(0,0,0, 0.15)", i.fillRect(0, (0, e.cy)(617), e.WIDTH, (0, 
    e.cwh)(250)), (0, e.drawImageCenter)({
        self: t,
        src: "res/2d/rank.png",
        pos: [ 111.5, 671, 74, 74 ],
        type: "btn",
        imgid: t.imgid.btn
    }), (0, e.drawImageCenter)({
        self: t,
        src: "res/2d/msg.png",
        pos: [ 207.5, 671, 74, 74 ],
        type: "btn",
        imgid: t.imgid.btn
    }), (0, e.drawImageCenter)({
        self: t,
        src: "res/2d/skin.png",
        pos: [ 303.5, 671, 74, 74 ],
        type: "btn",
        imgid: t.imgid.btn
    }), (0, e.drawText)({
        t: "排行榜",
        self: t,
        size: 12,
        pos: [ 111.5, 711.5 ]
    }), (0, e.drawText)({
        t: "消息",
        self: t,
        size: 12,
        pos: [ 207.5, 711.5 ]
    }), (0, e.drawText)({
        t: "皮肤中心",
        self: t,
        size: 12,
        pos: [ 303.5, 711.5 ]
    })), 1 == t.opt.banType && (i.lineWidth = 1, i.strokeStyle = "rgba(0,0,0,0.7)", 
    i.fillStyle = "rgba(0,0,0,0.7)", (0, e.roundedRect)((0, e.cx)(30), (0, e.cy)(258), (0, 
    e.cwh)(354), (0, e.cwh)(196), 4, i), i.fill(), (0, e.drawText)({
        t: "游戏中存在可疑操作，存疑分数",
        self: t,
        size: 17,
        pos: [ 207, 310 ]
    }), (0, e.drawText)({
        t: "将不在排行榜中显示。",
        self: t,
        size: 17,
        pos: [ 207, 336 ]
    }), (0, e.drawImageCenter)({
        self: t,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
        pos: [ 207, 401, 138, 44 ],
        type: "bg",
        imgid: t.imgid.bg
    }), (0, e.drawText)({
        t: "我要申诉",
        self: t,
        size: 15,
        pos: [ 207, 401 ]
    })), (0, e.updatePlane)({
        self: t,
        type: "bg"
    });
}, exports.drawStartUpdate = function(t) {
    var i = t.context.btn;
    i.fillStyle = "red", i.beginPath(), i.arc((0, e.cx)(230), (0, e.cy)(650), (0, e.cwh)(5), 0, 2 * Math.PI), 
    i.stroke(), i.fill(), (0, e.updatePlane)({
        self: t,
        type: "btn"
    });
}, exports.startEve = function(e, i, r) {
    return i > 86 && i < 318 && r > 458 && r < 552 ? (!!e.options.onClickStart && e.options.onClickStart(), 
    !1) : !e.opt.hideRank && i > 83 && i < 139 && r > 643 && r < 726 ? (!!e.options.onShowFriendRank && e.options.onShowFriendRank(), 
    !1) : !e.opt.hideRank && i > 157 && i < 257 && r > 552 && r < 591 ? (!!e.options.newRelay && e.options.newRelay(), 
    !1) : 1 == e.opt.banType && i > 128 && i < 286 && r > 369 && r < 433 ? ((0, t.routeVerify)(e), 
    !1) : !e.opt.hideRank && i > 179 && i < 235 && r > 643 && r < 726 ? (!!e.opt.onMsgBox && e.opt.onMsgBox(), 
    !1) : !e.opt.hideRank && i > 275 && i < 331 && r > 643 && r < 726 ? (!!e.opt.onBottleSkin && e.opt.onBottleSkin(), 
    !1) : void 0;
};

var e = require("./base"), t = require("./verify");