function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    e.imgid.bg++;
    var t = e.context.bg;
    t.clearRect(0, 0, s.WIDTH, s.HEIGHT), e.imgid.btn++, e.context.btn.clearRect(0, 0, s.WIDTH, s.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.45)", t.fillRect(0, 0, s.WIDTH, s.HEIGHT), t.lineWidth = 2 * s.Dpr, 
    t.strokeStyle = "rgba(255,255,255,0.1)";
    var i = e.opt;
    (0, s.drawImageCenter)({
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 154, 354, 124 ],
        type: "bg",
        imgid: e.imgid.bg,
        round: !0,
        radius: 2 * s.Dpr,
        cb: function() {
            var t = e.opt.gift_list.findIndex(n.bind(e)), i = e.opt.gift_list[t];
            (0, s.drawText)({
                self: e,
                size: 17,
                t: e.opt.nickname,
                pos: [ 62, 154 ],
                align: "left",
                type: "bg"
            }), i ? (0, s.drawText)({
                self: e,
                size: 17,
                t: "送出的 " + i.gift_name,
                pos: [ 62, 178 ],
                align: "left",
                type: "bg"
            }) : (0, s.drawText)({
                self: e,
                size: 17,
                t: "送出的礼包已被抢光",
                pos: [ 62, 178 ],
                align: "left",
                type: "bg"
            }), (0, s.drawImageCenter)({
                self: e,
                src: e.opt.headimg,
                pos: [ 86, 98, 47, 47 ],
                type: "bg",
                cb: function() {
                    (0, s.drawImageCenter)({
                        self: e,
                        src: "res/2d/ava_square.png",
                        pos: [ 86, 98, 48, 48 ],
                        type: "bg",
                        imgid: e.imgid.bg
                    });
                },
                imgid: e.imgid.bg,
                noupdate: !0,
                round: !0
            });
        }
    }), (0, s.drawImageCenter)({
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 407.5, 354, 343 ],
        type: "bg",
        imgid: e.imgid.bg,
        round: !0,
        radius: 2 * s.Dpr,
        cb: function() {
            (0, s.drawText)({
                self: e,
                size: 12,
                t: "共有" + i.total_gift + "份礼物，" + i.gift_list.length + "位好友领取",
                pos: [ 62, 260 ],
                align: "left",
                type: "bg"
            }), (0, s.drawLine)(30, 278, 384, 278, "rgba(255,255,255,0.1)", .5, t);
        }
    }), (0, s.drawImageCenter)({
        self: e,
        src: "res/2d/new_return.png",
        pos: [ 54, 674, 70, 70 ],
        type: "btn",
        imgid: e.imgid.btn
    }), (0, s.updatePlane)({
        self: e,
        type: "bg"
    });
}

function i(e) {
    var t, i = e.opt.gift_list.length * (0, s.cwh)(s.ListLineHeight) / s.Dpr;
    t = (0, s.cwh)(301) / s.Dpr, e.scrollHandler = new a.default({
        innerOffsetHeight: i,
        outterOffsetHeight: t,
        updatePosition: e.updatePosition.bind(e)
    }), r(e, 0, "list1");
}

function r(e, t, i) {
    "list1" == i ? e.imgid.list1++ : "list2" == i && e.imgid.list2++;
    var r = e.opt.gift_list.slice(t, t + 12), n = e.context[i];
    if (n.clearRect(0, 0, s.WIDTH, 12 * (0, s.cwh)(s.ListLineHeight)), 0 == t || 0 != r.length) {
        if (!(t < 0)) {
            var a = r.length;
            console.log(r);
            for (var g = 0; g < a; g++) !function() {
                g % 2 == 1 && (n.fillStyle = "rgba(255,255,255, 0.03)", n.fillRect(0, g * (0, s.cwh)(s.ListLineHeight), (0, 
                s.cwh)(414), (0, s.cwh)(s.ListLineHeight)));
                var t = (g + .5) * s.ListLineHeight;
                (0, s.drawImageCenter)({
                    round: !0,
                    self: e,
                    src: r[g].headimg,
                    pos: [ 77, t, 34, 34 ],
                    type: i,
                    cb: function() {
                        (0, s.drawImageCenter)({
                            self: e,
                            src: "res/ava_rank.png",
                            pos: [ 77, t, 47, 47 ],
                            type: i,
                            imgid: e.imgid[i]
                        });
                    },
                    imgid: e.imgid[i],
                    noupdate: !0
                }), (0, s.drawText)({
                    self: e,
                    align: "left",
                    size: 17,
                    t: (0, s.cname)(r[g].nickname, 10),
                    pos: [ 114, t ],
                    type: i
                }), (0, s.drawText)({
                    self: e,
                    size: 14,
                    align: "right",
                    t: "获得" + r[g].gift_name,
                    pos: [ 320, t ],
                    type: i
                }), r[g].gift_icon && (0, s.drawImageCenter)({
                    self: e,
                    src: r[g].gift_icon,
                    pos: [ 348, t, 28, 28 ],
                    type: i,
                    imgid: e.imgid[i]
                });
            }();
            (0, s.updatePlane)({
                self: e,
                type: i
            });
        }
    } else (0, s.updatePlane)({
        self: e,
        type: i
    });
}

function n(e, t, i) {
    return !0 === e.received;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawShareSkin = function(e) {
    (0, s.routeCanvas)(e, "shareSkin"), (0, s.createPlane)(e), t(e), (0, s.updateClip)({
        self: e
    }), i(e);
}, exports.drawShareSkinList = r, exports.shareSkinEve = function(e, t, i) {
    if (t > 30 && t < 95 && i > 640 && i < 720) return !!e.opt.onReturn && e.opt.onReturn(), 
    !1;
};

var s = require("./base"), a = (e(require("../../store/storage")), e(require("../../scroll/scrollHandler")));