function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    e.imgid.bg++;
    var t = e.opt, r = e.context.bg;
    d(e, r, Math.max(t.highest_score, t.score)), c(e, t.score, r, 69), p(e), (0, f.drawText)({
        self: e,
        t: "游戏中存在可疑操作，该分数",
        pos: [ 207, 373 ],
        size: 17
    }), (0, f.drawText)({
        self: e,
        t: "将不在排行榜中显示",
        pos: [ 207, 399 ],
        size: 17
    }), (0, f.drawLine)(0, 296, 414, 296, "rgba(255,255,255,0.1)", .5, r), (0, f.drawLine)(0, 526, 414, 526, "rgba(255,255,255,0.1)", .5, r), 
    1 == t.banType && ((0, f.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
        pos: [ 207, 459, 138, 44 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, f.drawText)({
        self: e,
        t: "我要申诉",
        pos: [ 207, 459 ],
        size: 17
    })), (0, f.updatePlane)({
        self: e,
        type: "bg"
    });
}

function r(e) {
    e.imgid.bg++;
    var t = e.opt, r = e.context.bg;
    d(e, r, Math.max(t.highest_score, t.score)), (0, f.drawImageCenter)({
        self: e,
        src: "res/2d/new_home.png",
        pos: [ 76, 607, 74, 74 ],
        type: "bg",
        imgid: e.imgid.bg
    }), l(e), c(e, t.score, r, 0), r.lineWidth = 4 * f.Dpr, r.strokeStyle = "#fff", 
    r.fillStyle = "#fff", (0, f.roundedRect)((0, f.cx)(31), (0, f.cy)(298), (0, f.cwh)(354), (0, 
    f.cwh)(210), 1 * f.Dpr, r), r.fill(), (0, f.drawText)({
        self: e,
        t: "玩了这么久",
        pos: [ 80, 370 ],
        size: 17,
        color: "black",
        align: "left"
    }), (0, f.drawText)({
        self: e,
        t: "休息一下吧",
        pos: [ 80, 410 ],
        size: 17,
        color: "black",
        align: "left"
    }), (0, f.drawImageCenter)({
        self: e,
        src: "res/tired.png",
        pos: [ 297, 397, 179, 185 ],
        type: "bg",
        imgid: e.imgid.bg
    });
    var i = e.context.btn;
    i.clearRect(0, 0, f.WIDTH, f.HEIGHT), (0, f.drawImageCenter)({
        self: e,
        src: "res/noplay.png",
        pos: [ 257, 607, 212, 84 ],
        type: "btn",
        cb: function() {
            e.noplay_time = 5, (0, f.drawText)({
                self: e,
                type: "btn",
                color: "#00C777",
                size: 22,
                t: e.noplay_time,
                pos: [ 190, 607 ]
            }), (0, f.updatePlane)({
                self: e,
                type: "btn"
            }), e.timer = setInterval(function() {
                e.noplay_time--, "tired" == e.opt.type ? e.noplay_time <= 0 ? (clearInterval(e.timer), 
                i.clearRect(0, 0, f.WIDTH, f.HEIGHT), (0, f.drawImageCenter)({
                    self: e,
                    src: "res/replay.png",
                    pos: [ 257, 607, 212, 84 ],
                    type: "btn",
                    imgid: e.imgid.btn
                })) : (i.fillStyle = "white", i.fillRect((0, f.cx)(175), (0, f.cy)(590), (0, f.cwh)(30), (0, 
                f.cwh)(30)), (0, f.drawText)({
                    self: e,
                    color: "#00C777",
                    size: 22,
                    t: e.noplay_time,
                    pos: [ 190, 607 ],
                    type: "btn"
                }), (0, f.updatePlane)({
                    self: e,
                    type: "btn"
                })) : clearInterval(e.timer);
            }, 1e3);
        },
        imgid: e.imgid.btn
    }), (0, f.updatePlane)({
        self: e,
        type: "bg"
    });
}

function i(e) {
    e.imgid.bg++, e.imgid.btn++;
    var t = e.opt, r = e.context.bg;
    if (d(e, r, Math.max(t.highest_score, t.score)), t.advertise && t.advertise.score ? (l(e, 244), 
    (0, f.drawText)({
        self: e,
        size: 14,
        t: "本次得分",
        pos: [ 119, 118 ]
    }), (0, f.drawText)({
        self: e,
        size: 58,
        special: !0,
        t: t.score,
        pos: [ 119, 166 ]
    }), (0, f.drawLine)(227, 98, 227, 186, "rgba(255,255,255,0.4)", .5, r), (0, f.drawText)({
        self: e,
        t: "为你助力",
        align: "left",
        size: 17,
        pos: [ 255, 149 ]
    }), (0, f.drawText)({
        self: e,
        t: "+ " + t.advertise.score,
        align: "left",
        special: !0,
        size: 17,
        pos: [ 325, 149 ]
    }), (0, f.drawText)({
        self: e,
        t: "查看详情",
        align: "left",
        size: 12,
        pos: [ 256, 175 ]
    }), (0, f.drawImageCenter)({
        self: e,
        src: "res/r_arr.png",
        pos: [ 315, 175, 6.6, 10 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, f.drawImageCenter)({
        self: e,
        src: t.advertise.icon_url,
        pos: [ 269, 115, 24, 24 ],
        type: "bg",
        imgid: e.imgid.bg
    })) : (l(e), c(e, t.score, r, 0)), r.lineWidth = 1 * f.Dpr, r.strokeStyle = "rgba(255,255,255,0.06)", 
    (0, f.roundedRect)((0, f.cx)(30), (0, f.cy)(297), (0, f.cwh)(354), (0, f.cwh)(192), 4 * f.Dpr, r), 
    (0, f.drawImageCenter)({
        round: !0,
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 393, 354, 192 ],
        type: "bg",
        imgid: e.imgid.bg,
        radius: 4 * f.Dpr,
        cb: function() {
            r.fillStyle = "rgba(255,255,255,0.06)", r.fillRect((0, f.cx)(150), (0, f.cy)(296), (0, 
            f.cwh)(115), (0, f.cwh)(153)), (0, f.drawLine)(30, 449, 384, 449, "rgba(255,255,255,0.06)", .5, r), 
            (0, f.drawText)({
                self: e,
                t: "排行榜 · 每周一凌晨刷新",
                color: "rgba(255,255,255,0.6)",
                align: "left",
                size: 12,
                pos: [ 46, 468 ]
            }), (0, f.drawText)({
                self: e,
                t: "查看全部排行",
                align: "left",
                size: 12,
                pos: [ 291, 468 ]
            }), (0, f.drawImageCenter)({
                self: e,
                src: "res/r_arr.png",
                pos: [ 371, 468, 6.6, 10 ],
                type: "bg",
                imgid: e.imgid.bg
            });
            var t = e.myidx - 2, i = 0;
            1 == e.sotedRankList.length && (i = 1);
            for (var o = 0; o < 3; o++) if (1 == e.myidx && 0 == o && t++, e.myidx != e.sotedRankList.length || 2 != o) {
                var n = "";
                n = e.myidx == t + 1 + o ? "#41bf8c" : "#888", e.sotedRankList[t + o] && function() {
                    (0, f.drawText)({
                        self: e,
                        color: n,
                        italic: !0,
                        bold: !0,
                        size: 16,
                        t: t + 1 + o,
                        pos: [ 90 + 118 * (o + i), 318 ]
                    }), (0, f.drawText)({
                        self: e,
                        color: "#888",
                        t: (0, f.cname)(e.sotedRankList[t + o].nickname, 14),
                        pos: [ 90 + 118 * (o + i), 394 ],
                        size: 14
                    }), (0, f.drawText)({
                        self: e,
                        size: 22,
                        special: !0,
                        t: e.sotedRankList[t + o].week_best_score || 0,
                        pos: [ 90 + 118 * (o + i), 426 ]
                    });
                    var r = 90 + 118 * (o + i);
                    (0, f.drawImageCenter)({
                        self: e,
                        round: !0,
                        src: e.sotedRankList[t + o].headimg,
                        pos: [ r, 355, 42, 42 ],
                        type: "bg",
                        cb: function() {
                            (0, f.drawImageCenter)({
                                self: e,
                                src: "res/ava_rank.png",
                                pos: [ r, 355, 58, 58 ],
                                type: "bg",
                                imgid: e.imgid.bg
                            });
                        },
                        imgid: e.imgid.bg,
                        noupdate: !0
                    });
                }();
            }
        }
    }), (0, f.updatePlane)({
        self: e,
        type: "bg"
    }), console.log(e.opt.ad_type, !!wx.createRewardedVideoAd, "reward" == e.opt.ad_type), 
    wx.createBannerAd && "banner" == e.opt.ad_type && (0, f.gtVersion)("2.0.6")) return e.bannerAd || (e.bannerAd = wx.createBannerAd({
        adUnitId: "adunit-eed18d29ad7e511b",
        style: {
            left: 0,
            top: f.HEIGHT / f.Dpr - 119,
            width: f.WIDTH / f.Dpr
        }
    })), e.bannerAd.show(), e.bannerAd.onError(function(t) {
        console.log("banner load err"), p(e);
    }), e.bannerAd.onLoad(function(t) {
        console.log("23333? ", window.innerHeight, window.innerWidth, f.HEIGHT, f.WIDTH, f.HEIGHT / f.WIDTH > 736 / 414), 
        f.HEIGHT / f.WIDTH > 736 / 414 + .5 ? p(e) : p(e, 548), !!e.opt.onShowBannerAd && e.opt.onShowBannerAd(), 
        console.log("banner ad load succ");
    }), void e.bannerAd.onResize(function(t) {
        console.log("on resize", t.width, t.height), e.bannerAd && e.bannerAd.style && (e.bannerAd.style.top = f.HEIGHT / f.Dpr - t.height);
    });
    wx.createRewardedVideoAd && "reward" == e.opt.ad_type && (e.opt.videoAd = wx.createIncentiveVideoAd({
        adUnitId: "adunit-d8b47b944fa90908"
    }), e.opt.videoAd.load().then(function() {
        console.load("load reward ad succ"), e.opt.loadAdSuc = !0, e.hasAd = !0, o(e);
    }).catch(function(t) {
        e.opt.loadAdSuc = !1, console.log("reward ad err", t);
    }), e.hasAd || e.opt.videoAd.onClose(function() {
        e.opt.loadAdSuc = !1, !!e.opt.onRewardAdGetProp && e.opt.onRewardAdGetProp();
    }), console.log("load reward ? ")), p(e);
}

function o(e) {
    e.context.bg.strokeStyle = "rgba(255,255,255,0.06)", (0, f.drawImageCenter)({
        round: !0,
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 521, 354, 50 ],
        type: "bg",
        imgid: e.imgid.bg,
        radius: 4 * f.Dpr,
        cb: function() {
            (0, f.drawText)({
                self: e,
                size: 14,
                t: "看广告拿道具",
                pos: [ 220, 521 ]
            }), (0, f.drawImageCenter)({
                self: e,
                src: "res/2d/target.png",
                pos: [ 154, 521, 24, 24 ],
                type: "bg",
                imgid: e.imgid.bg
            }), (0, f.drawImageCenter)({
                self: e,
                src: "res/r_arr.png",
                pos: [ 276, 521, 6.6, 10 ],
                type: "bg",
                imgid: e.imgid.bg
            });
        }
    });
}

function n(e) {
    e.imgid.bg++, e.imgid.btn++;
    var t = e.opt, r = e.context.bg;
    d(e, r, Math.max(t.highest_score, t.score));
    var i = e.context.btn;
    i.clearRect(0, 0, f.WIDTH, f.HEIGHT), r.lineWidth = 1 * f.Dpr, r.strokeStyle = "rgba(255,255,255,0.06)";
    var o = 401;
    0 == e.changlleList.length && (o = 318), (0, f.roundedRect)((0, f.cx)(30), (0, f.cy)(104), (0, 
    f.cwh)(354), (0, f.cwh)(o), 4 * f.Dpr, r), r.strokeStyle = "rgba(255,255,255,0.06)", 
    (0, f.drawImageCenter)({
        round: !0,
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 104 + o / 2, 354, o ],
        type: "bg",
        imgid: e.imgid.bg,
        radius: 4 * f.Dpr,
        cb: function() {
            s(e, r), r.fillStyle = "rgba(255,255,255,0.2)", r.fillRect((0, f.cx)(155), (0, f.cy)(157), (0, 
            f.cwh)(9), (0, f.cwh)(3)), r.fillRect((0, f.cx)(155), (0, f.cy)(162), (0, f.cwh)(9), (0, 
            f.cwh)(3)), r.fillRect((0, f.cx)(248), (0, f.cy)(157), (0, f.cwh)(9), (0, f.cwh)(3)), 
            r.fillRect((0, f.cx)(248), (0, f.cy)(162), (0, f.cwh)(9), (0, f.cwh)(3)), (0, f.drawText)({
                self: e,
                size: 14,
                t: "history" == e.opt.type ? "历史最高分" : "本周最高分",
                pos: [ 207, 160 ]
            }), (0, f.drawText)({
                self: e,
                size: 86,
                special: !0,
                t: t.score,
                pos: [ 207, 244.5 ],
                color: "#00c777"
            }), (0, f.drawImageCenter)({
                self: e,
                src: "res/flower.png",
                pos: [ 207, 220, 260, 141 ],
                type: "bg",
                imgid: e.imgid.bg
            }), (0, f.drawImageCenter)({
                self: e,
                src: "res/pure_share.png",
                pos: [ 207, 327.5, 18, 24 ],
                type: "bg",
                imgid: e.imgid.bg
            }), r.lineWidth = 2 * f.Dpr, r.strokeStyle = "rgba(255,255,255,0.04)", r.fillStyle = "rgba(255,255,255,0.04)";
            var i = 0;
            0 != e.changlleList.length && (i = 82), r.fillRect((0, f.cx)(30), (0, f.cy)(376 + i), (0, 
            f.cwh)(354), (0, f.cwh)(46)), (0, f.drawLine)(30, 375 + i, 384, 375 + i, "rgba(255,255,255,0.1)", .5, r), 
            (0, f.drawText)({
                self: e,
                size: 12,
                t: "查看全部排行",
                pos: [ 166, 397 + i ],
                align: "left"
            }), (0, f.drawImageCenter)({
                self: e,
                src: "res/r_arr.png",
                pos: [ 247, 397 + i, 6.6, 10 ],
                type: "bg",
                imgid: e.imgid.bg
            });
        }
    }), e.changlleList.length > 0 && (e.changlleListStart = 0, a(e, 0)), (i = e.context.btn).clearRect((0, 
    f.cx)(91), (0, f.cy)(490), (0, f.cwh)(232), (0, f.cwh)(94)), "skin" == e.opt.type ? (e.sunGif = new m.default(0, -20, 8.998, 20, 20, "res/2d/sun.png"), 
    e.sunGif.rotate(.005), e.options.camera.add(e.sunGif.obj), (0, f.drawImageCenter)({
        self: e,
        src: t.bottle_skin_icon,
        pos: [ 207, 607, 80, 80 ],
        type: "btn",
        imgid: e.imgid.btn
    })) : p(e), e.changlleList.length > 0 && (0, f.drawText)({
        self: e,
        size: 14,
        t: "排名新超越" + e.changlleList.length + "位好友",
        pos: [ 207, 372 ],
        type: "btn",
        color: "rgba(255,255,255,0.8)"
    }), (0, f.updatePlane)({
        self: e,
        type: "bg"
    });
}

function s(e, t) {
    var r = "新纪录", i = "#E11212";
    "history" == e.opt.type && (e.opt.highest_score < 100 && e.opt.score >= 100 ? (r = "初窥门径", 
    i = "#509FC9") : e.opt.highest_score < 500 && e.opt.score >= 500 ? (r = "耐得寂寞", 
    i = "#E67600") : e.opt.highest_score < 1e3 && e.opt.score >= 1e3 ? (r = "登堂入室", 
    i = "#009D5E") : e.opt.highest_score < 2e3 && e.opt.score >= 2e3 ? (r = "无聊大师", 
    i = "#7A0096") : e.opt.highest_score < 3e3 && e.opt.score >= 3e3 && (r = "一指禅", 
    i = "#555555")), t.lineWidth = 1 * f.Dpr, t.strokeStyle = "#fff", t.fillStyle = "#fff", 
    (0, f.roundedRect)((0, f.cx)(166), (0, f.cy)(88), (0, f.cwh)(82), (0, f.cwh)(32), 4 * f.Dpr, t), 
    t.fill(), t.lineWidth = 1 * f.Dpr, t.strokeStyle = "#800000", t.fillStyle = "#800000", 
    (0, f.roundedRect)((0, f.cx)(169), (0, f.cy)(91), (0, f.cwh)(76), (0, f.cwh)(26), 2 * f.Dpr, t), 
    t.fill(), t.lineWidth = 1 * f.Dpr, t.strokeStyle = i, t.fillStyle = i, (0, f.roundedRect)((0, 
    f.cx)(169), (0, f.cy)(91), (0, f.cwh)(76), (0, f.cwh)(24), 2 * f.Dpr, t), t.fill(), 
    (0, f.drawText)({
        self: e,
        bold: !0,
        size: 14,
        t: r,
        pos: [ 207, 104 ]
    });
}

function a(e, t) {
    if (e.imgid.btn++, !(e.changlleListStart + 5 * t < 0 || e.changlleListStart + 5 * t >= e.changlleList.length)) {
        e.changlleListStart = e.changlleListStart + 5 * t;
        var r = e.changlleList.slice(e.changlleListStart, e.changlleListStart + 5), i = r.length, o = 32, n = 207 - (32 * i + 10 * (i - 1)) / 2;
        e.context.btn.clearRect((0, f.cx)(30), (0, f.cy)(390), (0, f.cwh)(354), (0, f.cwh)(55));
        for (var s = 0; s < i; s++) !function() {
            var t = n + 16 + 42 * s;
            (0, f.drawImageCenter)({
                self: e,
                round: !0,
                src: r[s].headimg,
                pos: [ t, 412, o, o ],
                type: "btn",
                cb: function() {
                    (0, f.drawImageCenter)({
                        self: e,
                        src: "res/ava_rank.png",
                        pos: [ t, 412, 46, 46 ],
                        type: "btn",
                        imgid: e.imgid.btn
                    });
                },
                imgid: e.imgid.btn,
                noupdate: !0
            });
        }();
        e.changlleList.length > 5 && e.changlleListStart + 5 < e.changlleList.length && (0, 
        f.drawImageCenter)({
            self: e,
            src: "res/r_arr1.png",
            pos: [ 339, 412, 6, 8 ],
            type: "btn",
            imgid: e.imgid.btn
        }), e.changlleList.length > 5 && 0 != e.changlleListStart && (0, f.drawImageCenter)({
            self: e,
            src: "res/l_arr.png",
            pos: [ 69, 412, 6, 8 ],
            type: "btn",
            imgid: e.imgid.btn
        });
    }
}

function l(e, t) {
    t = t || 214, (0, f.drawImageCenter)({
        self: e,
        src: "res/btn.png",
        pos: [ 207, t, 86, 32 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, f.drawText)({
        self: e,
        size: 13,
        t: "发起挑战",
        pos: [ 207, t ]
    });
}

function c(e, t, r, i) {
    i = i || 0, (0, f.drawText)({
        self: e,
        size: 14,
        t: "本次得分",
        pos: [ 207, 84 + i ]
    }), (0, f.drawText)({
        self: e,
        size: 88,
        special: !0,
        t: t,
        pos: [ 212, 150 + i ]
    }), r.fillStyle = "rgba(255,255,255,0.2)", r.fillRect((0, f.cx)(162), (0, f.cy)(78 + i), (0, 
    f.cwh)(9), (0, f.cwh)(3)), r.fillRect((0, f.cx)(162), (0, f.cy)(84 + i), (0, f.cwh)(9), (0, 
    f.cwh)(3)), r.fillRect((0, f.cx)(241), (0, f.cy)(78 + i), (0, f.cwh)(9), (0, f.cwh)(3)), 
    r.fillRect((0, f.cx)(241), (0, f.cy)(84 + i), (0, f.cwh)(9), (0, f.cwh)(3));
}

function p(e, t) {
    t = t || 607, e.replayBtnPosy = t, (0, f.drawImageCenter)({
        self: e,
        src: "res/2d/new_home.png",
        pos: [ 76, t, 74, 74 ],
        type: "bg",
        imgid: e.imgid.bg
    }), e.context.btn.clearRect(0, 0, f.WIDTH, f.HEIGHT), (0, f.drawImageCenter)({
        self: e,
        src: "res/replay.png",
        pos: [ 256, t, 212, 84 ],
        type: "btn",
        imgid: e.imgid.btn
    }), console.log("draw home and replay succ");
}

function d(e, t, r) {
    t.clearRect(0, 0, f.WIDTH, f.HEIGHT), t.fillStyle = "rgba(0,0,0, 0.45)", t.fillRect(0, 0, f.WIDTH, f.HEIGHT), 
    (0, f.drawText)({
        self: e,
        t: "历史最高分：" + r,
        size: 14,
        pos: [ 207, 706 ]
    });
}

function g(e) {
    e.lineWidth = 1 * f.Dpr, e.strokeStyle = "#fff", e.fillStyle = "#fff", (0, f.roundedRect)((0, 
    f.cx)(144), (0, f.cy)(96), (0, f.cwh)(126), (0, f.cwh)(44), 4 * f.Dpr, e), e.fill(), 
    e.lineWidth = 1 * f.Dpr, e.strokeStyle = "#555", e.fillStyle = "#555", (0, f.roundedRect)((0, 
    f.cx)(147), (0, f.cy)(99), (0, f.cwh)(120), (0, f.cwh)(38), 2 * f.Dpr, e), e.fill(), 
    e.lineWidth = 1 * f.Dpr, e.strokeStyle = "#D2A764", e.fillStyle = "#D2A764", (0, 
    f.roundedRect)((0, f.cx)(147), (0, f.cy)(99), (0, f.cwh)(120), (0, f.cwh)(36), 2 * f.Dpr, e), 
    e.fill();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.routeGameOver = function(e, o) {
    (0, f.createPlane)(e);
    var s = e.opt;
    e.myUserInfo = y.default.getMyUserInfo() || {
        headimg: "",
        nickname: "",
        week_best_score: 0,
        score_info: [ {
            score: 0
        } ]
    }, e.myUserInfo.last_week_best_score = s.week_best_score, e.myUserInfo.week_best_score = Math.max(s.week_best_score, s.score) || 0;
    var a = y.default.getFriendsScore() || [];
    a.push(e.myUserInfo);
    var l = (0, f.rerank)(a);
    if (e.sotedRankList = l, e.myidx = l.findIndex(f.findSelfIndex.bind(e)) + 1, e.changlleList = [], 
    s.score >= s.highest_score || s.score >= e.myUserInfo.last_week_best_score) {
        (y.default.getMyUserInfo() || {
            headimg: "",
            nickname: "",
            week_best_score: 0,
            score_info: [ {
                score: 0
            } ]
        }).week_best_score = s.score;
        for (var c = y.default.getFriendsScore() || [], p = 0; p < c.length; p++) c[p].week_best_score < s.score && c[p].week_best_score > e.myUserInfo.last_week_best_score && e.changlleList.push(c[p]);
    }
    var d = !1;
    (s.game_cnt > 5 || s.score > 5) && !e._has_show_tired && +new Date() / 1e3 - s.start_time > 1800 && (d = !0, 
    e._has_show_tired = !0), (0, f.routeCanvas)(e, "gameOver"), console.log(s), e.opt.banType ? (e.opt.type = "ban", 
    t(e)) : s.bottle_skin_icon ? (e.opt.type = "skin", n(e)) : s.score > s.highest_score ? (e.opt.type = "history", 
    n(e)) : s.score > e.myUserInfo.last_week_best_score ? (e.opt.type = "week", n(e)) : d ? (e.opt.type = "tired", 
    r(e)) : (e.opt.type = "gg", i(e));
}, exports.gameOverEve = function(e, t, r) {
    return console.log(t, r), "skin" != e.opt.type && t > 42 && t < 110 && r > e.replayBtnPosy - 50 && r < e.replayBtnPosy + 50 && b.default.emit(w.EVENT.GOSTARTPAGE, {}), 
    "tired" != e.opt.type && "skin" != e.opt.type && t > 207 && t < 360 && r > e.replayBtnPosy - 50 && r < e.replayBtnPosy + 50 ? ((0, 
    f.hide)(e), !!e.options.onClickReplay && e.options.onClickReplay(), !1) : "tired" == e.opt.type && e.noplay_time <= 0 && t > 207 && t < 360 && r > 540 && r < 660 ? (!!e.options.onClickReplay && e.options.onClickReplay(), 
    !1) : "ban" == e.opt.type && 1 == e.opt.banType && t > 150 && t < 260 && r > 430 && r < 500 ? ((0, 
    h.routeVerify)(e), !1) : ("week" == e.opt.type || "history" == e.opt.type || "skin" == e.opt.type) && t > 170 && t < 230 && r > 310 && r < 350 ? (!!e.options.onClickPureShare && e.options.onClickPureShare(e.opt.type), 
    !1) : ("week" == e.opt.type || "history" == e.opt.type || "skin" == e.opt.type) && e.changlleList.length > 5 && t > 55 && t < 115 && r > 402 && r < 422 ? (a(e, -1), 
    !1) : ("week" == e.opt.type || "history" == e.opt.type || "skin" == e.opt.type) && e.changlleList.length > 5 && t > 297 && t < 357 && r > 402 && r < 422 ? (a(e, 1), 
    !1) : ("week" == e.opt.type || "history" == e.opt.type || "skin" == e.opt.type) && 0 == e.changlleList.length && t > 25 && t < 385 && r > 376 && r < 426 ? (e.sunGif && (e.options.camera.remove(e.sunGif.obj), 
    e.sunGif.destroy()), !!e.options.onClickRank && e.options.onClickRank(), !1) : ("week" == e.opt.type || "history" == e.opt.type || "skin" == e.opt.type) && e.changlleList.length > 0 && t > 25 && t < 385 && r > 459 && r < 509 ? (e.sunGif && (e.options.camera.remove(e.sunGif.obj), 
    e.sunGif.destroy()), !!e.options.onClickRank && e.options.onClickRank(), !1) : "gg" == e.opt.type && t > 25 && t < 385 && r > 290 && r < 490 ? (!!e.options.onClickRank && e.options.onClickRank(), 
    !1) : "skin" == e.opt.type && t > 150 && t < 260 && r < 720 && r > 500 ? (e.sunGif && (e.options.camera.remove(e.sunGif.obj), 
    e.sunGif.destroy()), !!e.opt.onClickBottleSkin && e.opt.onClickBottleSkin(), !1) : "gg" == e.opt.type && e.opt.advertise && t > 250 && t < 325 && r > 155 && r < 195 ? (!!wx.openUrl && wx.openUrl({
        url: e.opt.advertise.url
    }), b.default.emit(w.EVENT.JUMP_AD_GG, {}), !1) : ("gg" == e.opt.type || "tired" == e.opt.type) && t > 150 && t < 260 && r > 199 && r < 260 ? (!!e.options.onClickShare && e.options.onClickShare(), 
    !1) : "gg" == e.opt.type && e.opt.advertise && t > 150 && t < 260 && r > 199 && r < 260 ? (!!e.options.onClickShare && e.options.onClickShare(), 
    !1) : "gg" == e.opt.type && 1 == e.opt.loadAdSuc && t > 25 && t < 385 && r > 511 && r < 531 ? (e.opt.videoAd.show(), 
    !1) : void 0;
}, exports.drawGetNewSkin = function(e) {
    e.sunGif = new m.default(-.5, 4, 8.998, 20, 20, "res/2d/sun.png"), e.sunGif.rotate(.002), 
    e.options.camera.add(e.sunGif.obj), (0, f.createPlane)(e), (0, f.routeCanvas)(e, "getNewSkin"), 
    e.imgid.bg++, e.imgid.btn++;
    var t = e.context.btn;
    t.clearRect(0, 0, f.WIDTH, f.HEIGHT), e.context.bg.clearRect(0, 0, f.WIDTH, f.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.45)", t.fillRect(0, 0, f.WIDTH, f.HEIGHT);
    var r = e.opt;
    (0, f.drawImageCenter)({
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 304.5, 354, 401 ],
        type: "bg",
        imgid: e.imgid.bg,
        cb: function() {
            (0, f.drawText)({
                self: e,
                size: 12,
                t: r.desc,
                pos: [ 207, 176 ],
                type: "btn",
                color: "rgba(255,255,255,0.6)"
            }), g(t), (0, f.drawText)({
                self: e,
                size: 17,
                t: "获得新皮肤",
                pos: [ 207, 115 ],
                bold: !0,
                type: "btn"
            }), (0, f.drawImageCenter)({
                self: e,
                src: r.poster,
                pos: [ 207, 308, 50, 100 ],
                type: "btn",
                imgid: e.imgid.btn
            }), (0, f.drawImageCenter)({
                self: e,
                src: "res/pure_share.png",
                pos: [ 207, 456, 18, 24 ],
                type: "btn",
                imgid: e.imgid.btn
            }), t.strokeStyle = "rgba(255,255,255,0.06)";
        }
    }), (0, f.drawImageCenter)({
        self: e,
        src: "res/2d/new_return.png",
        pos: [ 54, 674, 70, 70 ],
        type: "btn",
        imgid: e.imgid.btn
    }), (0, f.drawImageCenter)({
        self: e,
        src: "res/2d/iplay.png",
        pos: [ 322, 670, 160, 75 ],
        type: "btn",
        imgid: e.imgid.btn,
        cb: function() {
            (0, f.drawImageCenter)({
                self: e,
                src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJDb9JwwmxHtnUrFjffD8F0VaaNDyic3X9Uy7Vsj4iaw3U2MyLcYv7gUcp0VgZRafjvhA/0?wx_fmt=png",
                pos: [ 265, 645, 54, 105 ],
                type: "btn",
                imgid: e.imgid.btn
            }), (0, f.drawText)({
                self: e,
                size: 17,
                t: "分享",
                color: "#222",
                pos: [ 327, 670 ],
                type: "btn"
            }), (0, f.updatePlane)({
                self: e,
                type: "btn"
            });
        }
    });
}, exports.getNewSkinEve = function(e, t, r) {
    return t > 42 && t < 110 && r > 640 && r < 720 ? (e.options.camera.remove(e.sunGif.obj), 
    e.sunGif.destroy(), !!e.opt.onReturn && e.opt.onReturn(), !1) : t > 220 && t < 440 && r > 640 && r < 720 ? (!!e.opt.onShareGift && e.opt.onShareGift(), 
    !1) : t > 177 && t < 237 && r > 436 && r < 476 ? (!!e.opt.onShareSkin && e.opt.onShareSkin(), 
    !1) : void 0;
}, exports.drawJiLiAdGetPropPage = function(e) {
    e.sunGif = new m.default(-.5, 4, 8.998, 20, 20, "res/2d/sun.png"), e.sunGif.rotate(.002), 
    e.options.camera.add(e.sunGif.obj), (0, f.routeCanvas)(e, "jiliProp"), (0, f.createPlane)(e), 
    e.imgid.bg++, e.imgid.btn++;
    var t = e.context.bg;
    t.clearRect(0, 0, f.WIDTH, f.HEIGHT), e.context.btn.clearRect(0, 0, f.WIDTH, f.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.45)", t.fillRect(0, 0, f.WIDTH, f.HEIGHT), t.lineWidth = 1 * f.Dpr, 
    t.strokeStyle = "rgba(255,255,255,0.06)", (0, f.roundedRect)((0, f.cx)(30), (0, 
    f.cy)(144), (0, f.cwh)(354), (0, f.cwh)(421), 4 * f.Dpr, t), t.strokeStyle = "rgba(255,255,255,0.06)", 
    (0, f.drawImageCenter)({
        round: !0,
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 354.5, 354, 421 ],
        type: "bg",
        imgid: e.imgid.bg,
        radius: 4 * f.Dpr,
        cb: function() {
            (0, f.drawImageCenter)({
                self: e,
                src: e.opt.icon,
                pos: [ 207, 314, 96, 96 ],
                type: "btn",
                imgid: e.imgid.btn
            }), t.lineWidth = 1 * f.Dpr, t.strokeStyle = "#fff", t.fillStyle = "#fff", (0, f.roundedRect)((0, 
            f.cx)(146), (0, f.cy)(128), (0, f.cwh)(122), (0, f.cwh)(40), 4 * f.Dpr, t), t.fill(), 
            t.lineWidth = 1 * f.Dpr, t.strokeStyle = "#999", t.fillStyle = "#999", (0, f.roundedRect)((0, 
            f.cx)(149), (0, f.cy)(131), (0, f.cwh)(116), (0, f.cwh)(34), 2 * f.Dpr, t), t.fill(), 
            t.lineWidth = 1 * f.Dpr, t.strokeStyle = "#D2A764", t.fillStyle = "#D2A764", (0, 
            f.roundedRect)((0, f.cx)(149), (0, f.cy)(131), (0, f.cwh)(116), (0, f.cwh)(32), 2 * f.Dpr, t), 
            t.fill(), (0, f.drawText)({
                self: e,
                size: 17,
                t: "获得道具",
                pos: [ 207, 147 ]
            }), (0, f.drawText)({
                self: e,
                size: 14,
                t: "在游戏中使用本道具可自动完",
                pos: [ 207, 453 ],
                color: "rgba(255,255,255,0.8)"
            }), (0, f.drawText)({
                self: e,
                size: 14,
                t: "成一次完美的跳跃",
                pos: [ 207, 475 ],
                color: "rgba(255,255,255,0.8)"
            });
        }
    }), (0, f.drawImageCenter)({
        self: e,
        src: "res/2d/new_return.png",
        pos: [ 54, 674, 70, 70 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, f.updatePlane)({
        self: e,
        type: "bg"
    });
}, exports.drawJiLiAdGetPropPageEve = function(e, t, r) {
    if (t > 42 && t < 110 && r > 640 && r < 720) return e.options.camera.remove(e.sunGif.obj), 
    e.sunGif.destroy(), !!e.opt.onReturn && e.opt.onReturn(), !1;
};

var f = require("./base"), y = e(require("../../store/storage")), b = e(require("../../lib/mue/eventcenter")), w = require("../../config"), h = require("./verify"), m = e(require("../threePage"));