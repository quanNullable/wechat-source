function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = e.self;
    t.imgid.bg++, t.imgid.btn++;
    var r = t.context.btn;
    r.clearRect(0, 0, s.WIDTH, s.HEIGHT), r.lineWidth = 1 * s.Dpr, r.strokeStyle = "rgba(255,255,255,0.1)", 
    (0, s.roundedRect)((0, s.cx)(30), (0, s.cy)(126), (0, s.cwh)(354), (0, s.cwh)(392), 2 * s.Dpr, r);
    var i = t.context.bg;
    i.clearRect(0, 0, s.WIDTH, s.HEIGHT), i.fillStyle = "rgba(0,0,0, 0.45)", i.fillRect(0, 0, s.WIDTH, s.HEIGHT), 
    (0, s.drawText)({
        self: t,
        size: 22,
        t: t.canvasType == s.CANVASTYPE.groupRank ? "群排行榜" : "好友排行榜",
        pos: [ 207, 89 ],
        bold: !0,
        type: "btn"
    }), (0, s.drawImageCenter)({
        round: !0,
        radius: 2 * s.Dpr,
        self: t,
        src: "res/bl3.png",
        pos: [ 207, 322, 354, 392 ],
        type: "bg",
        imgid: t.imgid.bg,
        cb: function() {
            (0, s.drawText)({
                self: t,
                size: 12,
                t: "每周一凌晨刷新",
                pos: [ 54, 141 ],
                type: "btn",
                color: "rgba(255,255,255,0.6)",
                align: "left"
            }), r.strokeStyle = "rgba(255,255,255,0.06)";
        }
    }), (0, s.drawImageCenter)({
        round: !0,
        self: t,
        src: "res/bl3.png",
        pos: [ 207, 573, 354, 90 ],
        type: "btn",
        imgid: t.imgid.btn,
        radius: 2 * s.Dpr,
        cb: function() {
            void 0 === t.myidx || (0, s.drawText)({
                self: t,
                size: 17,
                italic: !0,
                bold: !0,
                t: t.myidx,
                pos: [ 64, 574 ],
                type: "btn"
            }), (0, s.drawImageCenter)({
                round: !0,
                self: t,
                src: t.myUserInfo.headimg,
                pos: [ 107, 573, 34, 34 ],
                type: "btn",
                cb: function() {
                    (0, s.drawImageCenter)({
                        self: t,
                        src: "res/ava_rank.png",
                        pos: [ 107, 573, 36, 36 ],
                        type: "btn",
                        imgid: t.imgid.btn
                    });
                },
                imgid: t.imgid.btn,
                noupdate: !0
            }), (0, s.drawText)({
                self: t,
                align: "left",
                size: 17,
                t: (0, s.cname)(t.myUserInfo.nickname, 16),
                pos: [ 144, 573 ],
                type: "btn"
            }), (0, s.drawText)({
                self: t,
                align: "right",
                size: 22,
                special: !0,
                t: t.myUserInfo.week_best_score || 0,
                pos: [ 339, 575 ],
                type: "btn"
            }), t.myUserInfo.bottle_skin && (0, s.drawImageCenter)({
                self: t,
                src: t.myUserInfo.bottle_skin,
                pos: [ 362, 571, 15, 30 ],
                type: "btn",
                imgid: t.imgid.btn
            }), (0, s.updatePlane)({
                self: t,
                type: "btn"
            });
        }
    }), t.canvasType == s.CANVASTYPE.friendRank ? (0, s.drawImageCenter)({
        self: t,
        src: "res/2d/see_group.png",
        pos: [ 304, 674, 176, 75 ],
        type: "btn",
        imgid: t.imgid.btn
    }) : (0, s.drawImageCenter)({
        self: t,
        src: "res/2d/iplay.png",
        pos: [ 327, 670, 130, 75 ],
        type: "btn",
        imgid: t.imgid.btn,
        cb: function() {
            (0, s.drawText)({
                self: t,
                size: 17,
                t: "我也要玩",
                color: "#222",
                pos: [ 327, 670 ],
                type: "btn"
            }), (0, s.updatePlane)({
                self: t,
                type: "btn"
            });
        }
    }), (0, s.drawImageCenter)({
        self: t,
        src: "res/2d/new_return.png",
        pos: [ 54, 674, 70, 70 ],
        type: "btn",
        imgid: t.imgid.btn
    });
}

function r(e) {
    var t = e.self, r = e.list, n = [];
    t.myUserInfo = t.myUserInfo || {
        headimg: "",
        nickname: "",
        week_best_score: 0,
        score_info: [ {
            score: 0
        } ]
    }, t.myUserInfo.is_self = !0, (r = r || []).push(t.myUserInfo), n = (0, s.rerank)(r), 
    t.sotedRankList = n;
    var o, l = t.sotedRankList.length * (0, s.cwh)(s.ListLineHeight) / s.Dpr;
    t.myidx = n.findIndex(s.findSelfIndex.bind(t)) + 1, o = (0, s.cwh)(361) / s.Dpr;
    var d = 0, f = 0, p = 0;
    console.log(t.routesArr, t.lastScrollY), t.setScroll && (d = t.lastScrollY || 0, 
    f = t.lastOffset1 || 0, p = t.lastOffset2 || 0), t.setScroll = !1, t.scrollHandler = new a.default({
        innerOffsetHeight: l,
        outterOffsetHeight: o,
        updatePosition: t.updatePosition.bind(t),
        position: d
    }), i(t, f, "list1"), i(t, p, "list2");
}

function i(e, t, r) {
    "list1" == r ? (e.imgid.list1++, e.lastOffset1 = t) : "list2" == r && (e.imgid.list2++, 
    e.lastOffset2 = t);
    var i = e.sotedRankList.slice(t, t + 12), n = e.context[r];
    if (n.clearRect(0, 0, s.WIDTH, 12 * (0, s.cwh)(s.ListLineHeight)), 0 == t || 0 != i.length) {
        if (!(t < 0)) {
            for (var a = i.length, o = 0; o < a; o++) {
                var l, d, f;
                !function() {
                    o % 2 == 1 && (n.fillStyle = "rgba(255,255,255, 0.03)", n.fillRect(0, o * (0, s.cwh)(s.ListLineHeight), (0, 
                    s.cwh)(414), (0, s.cwh)(s.ListLineHeight)));
                    var a = (o + .5) * s.ListLineHeight;
                    n.textAlign = "center", d = "", d = 1 == (l = o + 1 + t) ? "rgb(250,126,0)" : 2 == l ? "rgb(254,193,30)" : 3 == l ? "rgb(251,212,19)" : "#aaa", 
                    (0, s.drawText)({
                        self: e,
                        color: d,
                        size: 17,
                        italic: !0,
                        bold: !0,
                        t: l,
                        pos: [ 58.5, a ],
                        type: r
                    });
                    i[o].grade;
                    n.beginPath(), n.strokeStyle = "rgba(255,255,255, 0.1)", n.fillStyle = "rgba(255,255,255, 0.1)", 
                    (0, s.roundedRect)((0, s.cx)(90), (0, s.cwh)(a - 17), (0, s.cwh)(34), (0, s.cwh)(34), 4 * s.Dpr, n), 
                    n.fill(), n.closePath(), (0, s.drawImageCenter)({
                        round: !0,
                        self: e,
                        src: i[o].headimg,
                        pos: [ 107, a, 34, 34 ],
                        type: r,
                        cb: function() {
                            (0, s.drawImageCenter)({
                                self: e,
                                src: "res/ava_rank.png",
                                pos: [ 107, a, 47, 47 ],
                                type: r,
                                imgid: e.imgid[r]
                            });
                        },
                        imgid: e.imgid[r],
                        noupdate: !0
                    }), (0, s.drawText)({
                        self: e,
                        align: "left",
                        size: 17,
                        t: (0, s.cname)(i[o].nickname, 12),
                        pos: [ 144, a ],
                        type: r
                    }), f = 0, i[o].bottle_skin && (0, s.drawImageCenter)({
                        self: e,
                        src: i[o].bottle_skin,
                        pos: [ 362, a, 15, 30 ],
                        type: r,
                        imgid: e.imgid[r]
                    }), f = 23, (0, s.drawText)({
                        self: e,
                        align: "right",
                        size: 22,
                        special: !0,
                        t: i[o].week_best_score || 0,
                        pos: [ 362 - f, a + 2 ],
                        type: r
                    });
                }();
            }
            (0, s.updatePlane)({
                self: e,
                type: r
            });
        }
    } else (0, s.updatePlane)({
        self: e,
        type: r
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawFriendRankList = function(e) {
    var i = e.self, a = i.last2CanvasType;
    (0, s.routeCanvas)(i, "friendRank"), i.lastCanvasType == s.CANVASTYPE.record && (i.lastCanvasType = a), 
    i.myUserInfo = n.default.getMyUserInfo() || {}, i.myUserInfo.week_best_score = i.opt.week_best_score || 0, 
    (0, s.createPlane)(i), (0, s.updateClip)({
        self: i
    }), t({
        self: i
    }), r({
        self: i,
        list: n.default.getFriendsScore()
    });
}, exports.drawGroupRankList = function(e, i, n) {
    (0, s.routeCanvas)(e, "groupRank"), e.myUserInfo = n || {
        headimg: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJBaI5ibAEtVLsv4KfFrRhad6VWuvvibKOkib8ibibWxsOFXWEUlhp3fo0NAwticZFicevpx1A/0?wx_fmt=png",
        nickname: "",
        week_best_score: 0,
        grade: 1
    }, (0, s.createPlane)(e), (0, s.updateClip)({
        self: e
    }), t({
        self: e
    }), r({
        self: e,
        list: i
    });
}, exports.drawRankList = i, exports.groupRankEve = function(e, t, r) {
    return t > 260 && t < 390 && r > 640 && r < 720 ? ((0, s.hide)(e), !!e.options.groupPlayGame && e.options.groupPlayGame(), 
    !1) : t > 30 && t < 110 && r > 640 && r < 720 ? (o.default.emit(l.EVENT.GOSTARTPAGE, {}), 
    !1) : void 0;
}, exports.friendRankEve = function(e, t, r, i) {
    if (t > 270 && t < 340 && r > 640 && r < 720) return !!e.options.onGroupShare && e.options.onGroupShare(), 
    !1;
    if (t > 30 && t < 95 && r > 640 && r < 720) return (0, s.back)(e), !!e.options.friendRankReturn && e.options.friendRankReturn(""), 
    !1;
    if (t > 30 && t < 379 && r > 140 && r < 518) {
        var n = Math.round((i - 171) / s.ListLineHeight);
        return !!e.opt.onProfile && !!e.sotedRankList[n] && e.opt.onProfile({
            user_data: e.sotedRankList[n],
            scene: "friends",
            routesArr: e.routesArr
        }), !1;
    }
    return t > 30 && t < 379 && r > 528 && r < 618 ? (!!e.opt.onProfile && !!e.sotedRankList[e.myidx - 1] && e.opt.onProfile({
        user_data: e.sotedRankList[e.myidx - 1],
        scene: "friends",
        routesArr: e.routesArr
    }), !1) : void 0;
};

var s = require("./base"), n = e(require("../../store/storage")), a = e(require("../../scroll/scrollHandler")), o = e(require("../../lib/mue/eventcenter")), l = require("../../config");