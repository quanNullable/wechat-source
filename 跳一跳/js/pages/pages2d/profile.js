function e(e) {
    var r = e.context.btn, i = e.opt;
    console.log("profile data", i), i.is_self && r.clearRect((0, t.cx)(35), (0, t.cy)(485), (0, 
    t.cwh)(345), (0, t.cwh)(125));
    var s = 0;
    if (i.is_self && (s = -57), i.praise_info.praise_count > 0) {
        var a = 314 / i.praise_info.reward_count, n = e.context.bg;
        n.fillStyle = "#FFD240", n.strokeStyle = "rgba(255,255,255,0.1)", (0, t.roundedRect)((0, 
        t.cx)(50), (0, t.cy)(485 + s), (0, t.cwh)(a * i.praise_info.praise_count), (0, t.cwh)(28), (0, 
        t.cwh)(.5), n);
        for (var o = 0; o < i.praise_info.praise_count; o++) (0, t.drawImageCenter)({
            self: e,
            src: "res/2d/shade.png",
            pos: [ 52 + o * a + .5 * a, 497 + s, a, 28 ],
            type: "bg",
            imgid: e.imgid.bg
        });
        n.fill();
    }
    if (i.is_self) {
        if ((0, t.drawLine)(30, 480, 384, 480, "rgba(255,255,255,0.1)", .5, r), (0, t.drawLine)(30, 541, 384, 541, "rgba(255,255,255,0.1)", .5, r), 
        i.praise_info.total_praise_count > 0) {
            (0, t.drawText)({
                self: e,
                t: "共 " + i.praise_info.total_praise_count + " 个赞",
                size: 14,
                pos: [ 364, 511 ],
                align: "right",
                type: "btn"
            });
            var p = i.praise_info.headimg_list;
            (0, t.drawImageCenter)({
                self: e,
                src: "res/2d/profile_zan_icon.png",
                pos: [ 54, 511, 16, 24 ],
                type: "btn",
                imgid: e.imgid.btn
            });
            var g = p.length;
            g > 6 && (g = 5, (0, t.drawImageCenter)({
                self: e,
                src: "res/2d/profile_zan.png",
                pos: [ 258, 511, 24, 24 ],
                type: "btn",
                imgid: e.imgid.btn
            }));
            for (var l = 0; l < g; l++) !function(r) {
                (0, t.drawImageCenter)({
                    self: e,
                    round: !0,
                    src: p[r],
                    pos: [ 88 + 34 * r, 511, 23, 23 ],
                    type: "btn",
                    cb: function() {
                        (0, t.drawImageCenter)({
                            self: e,
                            src: "res/2d/ava_square.png",
                            pos: [ 88 + 34 * r, 511, 24, 24 ],
                            type: "btn",
                            imgid: e.imgid.btn
                        });
                    },
                    imgid: e.imgid.btn,
                    noupdate: !0
                });
            }(l);
        } else (0, t.drawText)({
            self: e,
            t: "暂无人点赞",
            size: 14,
            pos: [ 207, 511 ],
            type: "btn",
            color: "rgba(255,255,255,0.6)"
        });
        var c = i.propsData.property_list || [];
        if (0 == c.length) (0, t.drawText)({
            self: e,
            t: "暂无道具",
            size: 14,
            pos: [ 207, 577 ],
            type: "btn",
            color: "rgba(255,255,255,0.6)"
        }); else {
            (0, t.drawImageCenter)({
                self: e,
                src: "res/2d/profile_prop_icon.png",
                pos: [ 54, 576, 16, 24 ],
                type: "btn",
                imgid: e.imgid.btn
            }), (g = c.length) > 6 && (g = 5, (0, t.drawImageCenter)({
                self: e,
                src: "res/2d/profile_prop.png",
                pos: [ 258, 576, 24, 24 ],
                type: "btn",
                imgid: e.imgid.btn
            }));
            for (var d = 0; d < g; d++) (0, t.drawImageCenter)({
                self: e,
                src: "res/2d/target.png",
                pos: [ 88 + 34 * d, 576, 24, 24 ],
                type: "btn",
                imgid: e.imgid.btn
            });
            (0, t.drawText)({
                self: e,
                t: "共 " + c.length + " 个道具",
                size: 14,
                pos: [ 364, 576 ],
                type: "btn",
                align: "right"
            });
        }
    } else r.clearRect((0, t.cx)(48), (0, t.cy)(455), (0, t.cwh)(100), (0, t.cwh)(20)), 
    (0, t.drawText)({
        self: e,
        t: "还差" + (i.praise_info.reward_count - i.praise_info.praise_count) + "个好友的赞",
        size: 12,
        pos: [ 50, 465 ],
        type: "btn",
        align: "left"
    });
    var f = "res/2d/like.png";
    i.praise_info.is_already_praise && (f = "res/2d/like1.png"), (0, t.drawImageCenter)({
        self: e,
        src: f,
        pos: [ 354, 671, 82, 76 ],
        type: "btn",
        imgid: e.imgid.btn
    });
}

function r(e) {
    var r = e.context.btn;
    e.timer || (0, t.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJFHiaWIxfyWrESuKDicrZJNaicFibAB2deJFicf7ahrv9LzA5gf90icrPhLk45Pw2dDNA12Q/0?wx_fmt=png",
        pos: [ 320, 446.5, 150, 69 ],
        type: "btn",
        imgid: e.imgid.btn,
        cb: function() {
            e.showDialog = !0, (0, t.drawText)({
                self: e,
                t: "在游戏中使用本道具可",
                size: 12,
                pos: [ 260, 432 ],
                type: "btn",
                align: "left",
                color: "#000"
            }), (0, t.drawText)({
                self: e,
                t: "自动完成一次完美跳跃",
                size: 12,
                pos: [ 260, 448 ],
                type: "btn",
                align: "left",
                color: "#000"
            }), e.timer = setTimeout(function() {
                e.timer = null, e.canvasType == t.CANVASTYPE.profile && (r.clearRect((0, t.cx)(245), (0, 
                t.cy)(415), (0, t.cwh)(150), (0, t.cwh)(66)), (0, t.updatePlane)({
                    self: e,
                    type: "btn"
                }));
            }, 2e3);
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawProfile = function(r) {
    r.imgid.bg++, r.imgid.btn++, r.imgid.list1++, r.imgid.list2++, r.showDialog = !1, 
    (0, t.routeCanvas)(r, "profile"), (0, t.createPlane)(r);
    var i = r.context.bg;
    i.clearRect(0, 0, t.WIDTH, t.HEIGHT), i.fillStyle = "rgba(0,0,0, 0.45)", i.fillRect(0, 0, t.WIDTH, t.HEIGHT), 
    r.context.btn.clearRect(0, 0, t.WIDTH, t.HEIGHT);
    var s = r.opt, a = 430, n = 0;
    s.is_self && (a = 520, n = -30), i.strokeStyle = "rgba(255, 255, 255, 0.06)", (0, 
    t.drawImageCenter)({
        round: !0,
        radius: 2 * t.Dpr,
        self: r,
        src: "res/bl3.png",
        pos: [ 207, 123 + a / 2 + n, 354, a ],
        type: "bg",
        imgid: r.imgid.bg,
        cb: function() {
            i.strokeStyle = "rgba(255,255,255,0.1)", (0, t.roundedRect)((0, t.cx)(30), (0, t.cy)(123 + n), (0, 
            t.cwh)(354), (0, t.cwh)(a), 2 * t.Dpr, i), (0, t.drawText)({
                self: r,
                t: "本周最高分",
                size: 14,
                pos: [ 186, 160 + n ],
                type: "bg"
            }), (0, t.drawText)({
                self: r,
                t: s.week_best_score || 0,
                size: 28,
                pos: [ 186, 191 + n ],
                type: "bg",
                special: !0
            }), (0, t.drawText)({
                self: r,
                t: "历史最高分",
                size: 14,
                pos: [ 307, 160 + n ],
                type: "bg"
            }), (0, t.drawText)({
                self: r,
                t: s.highest_score || 0,
                size: 28,
                pos: [ 307, 191 + n ],
                type: "bg",
                special: !0
            }), (0, t.drawLine)(30, 233 + n, 384, 233 + n, "rgba(255,255,255,0.1)", .5, i), 
            (0, t.drawText)({
                self: r,
                t: "本周精彩回放",
                size: 12,
                pos: [ 87, 272 + n ],
                type: "bg"
            }), (0, t.drawImageCenter)({
                self: r,
                round: !0,
                src: s.playback_poster || "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJHSzlW8rkRicx6ppKtmCKMC9a5Qmdm5l19UJguw969rjWV43K3OECytHQ07XPsscjKw/0?wx_fmt=png",
                pos: [ 207, 362.5 + n, 314, 141 ],
                type: "bg",
                imgid: r.imgid.bg,
                radius: 2 * t.Dpr,
                cb: function() {
                    i.fillStyle = "rgba(0,0,0, 0.4)", (0, t.roundedRect)((0, t.cx)(50), (0, t.cy)(292 + n), (0, 
                    t.cwh)(314), (0, t.cwh)(141), 2 * t.Dpr, i), i.fill(), 0 == s.week_best_score ? (0, 
                    t.drawText)({
                        self: r,
                        t: "暂无回放",
                        size: 17,
                        pos: [ 207, 362.5 + n ],
                        type: "bg"
                    }) : (0, t.drawImageCenter)({
                        self: r,
                        src: "res/2d/record.png",
                        pos: [ 207, 362.5 + n, 40, 40 ],
                        type: "bg",
                        imgid: r.imgid.bg
                    });
                }
            }), console.log(s.praise_info), e(r), (0, t.drawImageCenter)({
                self: r,
                round: !0,
                src: s.headimg,
                pos: [ 80, 173 + n, 60, 60 ],
                type: "bg",
                cb: function() {
                    (0, t.drawImageCenter)({
                        self: r,
                        src: "res/2d/ava_square.png",
                        pos: [ 80, 173 + n, 61, 61 ],
                        type: "bg",
                        imgid: r.imgid.bg
                    });
                },
                imgid: r.imgid.bg,
                noupdate: !0
            }), (0, t.drawImageCenter)({
                self: r,
                src: "res/2d/new_return.png",
                pos: [ 54, 674, 70, 70 ],
                type: "bg",
                imgid: r.imgid.bg
            }), s.is_self || (0, t.drawImageCenter)({
                self: r,
                src: "res/2d/target.png",
                pos: [ 354, 499, 32, 32 ],
                type: "btn",
                imgid: r.imgid.btn
            });
            var o = 0;
            s.is_self && (o = -57), i.fillStyle = "rgba(255,255,255,0.1)", i.strokeStyle = "rgba(255,255,255,0.1)", 
            i.fillRect((0, t.cx)(50), (0, t.cy)(485 + o), (0, t.cwh)(314), (0, t.cwh)(28)), 
            i.fill();
            for (var p = 314 / s.praise_info.reward_count, g = 0; g < s.praise_info.reward_count - 1; g++) (0, 
            t.drawLine)(82 + p * g, 485 + o, 82 + p * g, 513 + o, "rgba(255,255,255,0.1)", .5, i);
        }
    }), (0, t.updatePlane)({
        self: r,
        type: "bg"
    });
}, exports.drawProfileUpdate = e, exports.profileEve = function(e, i, s) {
    return i > 30 && i < 95 && s > 640 && s < 720 ? ("friendRank" == e.routesArr[e.routesArr.length - 2] && (e.setScroll = !0), 
    (0, t.back)(e), !!e.opt.onReturn && e.opt.onReturn(), !1) : e.opt.week_best_score > 0 && i > 50 && i < 350 && s > 290 && s < 430 ? (!!e.opt.onRecord && e.opt.onRecord(e.routesArr), 
    !1) : i > 310 && i < 390 && s > 640 && s < 700 ? (!!e.opt.onLike && e.opt.onLike(e.routesArr), 
    !1) : !e.opt.is_self && i > 330 && i < 380 && s > 476 && s < 516 ? (r(e), !1) : void 0;
};

var t = require("./base");