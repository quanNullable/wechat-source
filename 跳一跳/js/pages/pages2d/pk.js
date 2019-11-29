function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = e.self;
    e.list;
    t.sotedRankList = e.list;
    var i = t.sotedRankList.length * (0, r.cwh)(r.ListLineHeight) / r.Dpr, s = (0, r.cwh)(194) / r.Dpr;
    t.scrollHandler = new l.default({
        innerOffsetHeight: i,
        outterOffsetHeight: s,
        updatePosition: t.updatePosition.bind(t)
    }), o(t, 0, "list1");
}

function o(e, t, o) {
    "list1" == o ? e.imgid.list1++ : "list2" == o && e.imgid.list2++;
    var i = e.sotedRankList.slice(t, t + 12), s = e.context[o];
    if (s.clearRect(0, 0, r.WIDTH, 12 * (0, r.cwh)(r.ListLineHeight)), s.fillStyle = "white", 
    s.textBaseline = "middle", s.fillRect(0, 0, r.WIDTH, 12 * (0, r.cwh)(r.ListLineHeight)), 
    0 == t || 0 != i.length) {
        if (!(t < 0)) {
            for (var l = i.length, a = 0; a < l; a++) !function() {
                var s = (a + .5) * r.ListLineHeight, l = a + 1 + t, n = "";
                n = 1 == l ? "rgb(250,126,0)" : 2 == l ? "rgb(254,193,30)" : 3 == l ? "rgb(251,212,19)" : "#aaa", 
                (0, r.drawText)({
                    self: e,
                    bold: !0,
                    italic: !0,
                    size: 17,
                    t: l,
                    pos: [ 58.5, s ],
                    type: o,
                    color: n
                });
                i[a].grade;
                (0, r.drawImageCenter)({
                    self: e,
                    src: i[a].headimg,
                    pos: [ 107, s, 34, 34 ],
                    type: o,
                    cb: function() {
                        (0, r.drawImageCenter)({
                            self: e,
                            src: "res/2d/ava_square.png",
                            pos: [ 107, s, 37, 37 ],
                            type: o,
                            imgid: e.imgid[o]
                        });
                    },
                    round: !0,
                    imgid: e.imgid[o],
                    noupdate: !0
                }), (0, r.drawText)({
                    self: e,
                    align: "left",
                    color: "#000",
                    size: 17,
                    bold: !0,
                    t: (0, r.cname)(i[a].nickname, 14),
                    pos: [ 144, s - 10 ],
                    type: o
                }), i[a].score_info[0].score > e.opt.organizerInfo.score_info[0].score ? (0, r.drawText)({
                    self: e,
                    color: "#FC4814",
                    size: 12,
                    t: "挑战成功",
                    pos: [ 144, s + 12 ],
                    type: o,
                    align: "left"
                }) : (0, r.drawText)({
                    self: e,
                    color: "#888",
                    size: 12,
                    t: "挑战失败",
                    pos: [ 144, s + 12 ],
                    type: o,
                    align: "left"
                }), (0, r.drawText)({
                    self: e,
                    color: "#888",
                    size: 22,
                    special: !0,
                    t: i[a].score_info[0].score || 0,
                    pos: [ 364, s ],
                    type: o,
                    align: "right"
                });
            }();
            0 == l && (0, r.drawText)({
                self: e,
                color: "#ccc",
                size: 14,
                t: "暂无人应战",
                pos: [ 207, 100 ],
                type: o
            }), (0, r.updatePlane)({
                self: e,
                type: o
            });
        }
    } else (0, r.updatePlane)({
        self: e,
        type: o
    });
}

function i(e, t, o) {
    return 1 === e.is_self;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawPkPage = function(e) {
    var o = e.self;
    (0, r.routeCanvas)(o, "pk"), (0, r.createPlane)(o), (0, r.updateClip)({
        self: o
    }), o.myidx = o.opt.pkListInfo.findIndex(i) + 1, o.myUserInfo = o.opt.pkListInfo[o.myidx - 1] || s.default.getMyUserInfo() || {
        headimg: "",
        nickname: "",
        week_best_score: 0,
        score_info: [ {
            score: 0
        } ]
    }, t({
        self: o,
        list: o.opt.pkListInfo
    });
    var l = o.context.bg;
    if (l.clearRect(0, 0, r.WIDTH, r.HEIGHT), l.fillStyle = "rgba(0,0,0, 0.8)", l.fillRect(0, 0, (r.WIDTH - (0, 
    r.cwh)(354)) / 2, r.HEIGHT), l.fillRect((0, r.cx)(384), 0, (r.WIDTH - (0, r.cwh)(354)) / 2, r.HEIGHT), 
    l.fillRect((0, r.cx)(30), 0, (0, r.cwh)(354), (0, r.cy)(110)), l.fillRect((0, r.cx)(30), (0, 
    r.cy)(632), (0, r.cwh)(354), (0, r.cy)(144)), l.fillStyle = "rgb(250,250,250)", 
    l.fillRect((0, r.cx)(31), (0, r.cy)(103), (0, r.cwh)(354), (0, r.cwh)(335)), l.lineWidth = 2 * r.Dpr, 
    l.strokeStyle = "#fff", (0, r.roundedRect)((0, r.cx)(30), (0, r.cy)(102), (0, r.cwh)(354), (0, 
    r.cwh)(530), 1 * r.Dpr, l), void 0 == o.opt.gg_score) (0, r.drawImageCenter)({
        self: o,
        src: o.opt.organizerInfo.headimg,
        pos: [ 207, 158, 50, 50 ],
        type: "bg",
        imgid: o.imgid.bg
    }), (0, r.drawText)({
        self: o,
        t: o.opt.organizerInfo.nickname,
        color: "rgba(0,0,0,0.8)",
        size: 14,
        pos: [ 207, 195 ]
    }), (0, r.drawText)({
        self: o,
        t: "擂主得分",
        color: "rgba(0,0,0,0.8)",
        size: 14,
        pos: [ 207, 242 ]
    }), (0, r.drawLine)(160, 217, 254, 217, "rgba(0,0,0,0.06)", .5, l), l.fillStyle = "rgba(0,0,0,0.2)", 
    l.fillRect((0, r.cx)(162), (0, r.cy)(239), (0, r.cwh)(9), (0, r.cwh)(3)), l.fillRect((0, 
    r.cx)(162), (0, r.cy)(244), (0, r.cwh)(9), (0, r.cwh)(3)), l.fillRect((0, r.cx)(241), (0, 
    r.cy)(239), (0, r.cwh)(9), (0, r.cwh)(3)), l.fillRect((0, r.cx)(241), (0, r.cy)(244), (0, 
    r.cwh)(9), (0, r.cwh)(3)), (0, r.drawText)({
        self: o,
        t: o.opt.organizerInfo.score_info[0].score,
        color: "#000",
        size: 66,
        pos: [ 207, 298 ],
        special: !0
    }); else {
        var a = void 0, n = void 0, c = void 0, f = void 0;
        o.opt.gg_score > o.opt.organizerInfo.score_info[0].score ? (a = "res/suc.png", n = "挑战成功", 
        c = "rgba(0,0,0,1)", f = "rgba(0,0,0,0.3)", (0, r.drawImageCenter)({
            self: o,
            src: "res/flower_small.png",
            pos: [ 207, 175, 140, 53 ],
            type: "bg",
            imgis: o.imgid.bg
        })) : (a = "res/fail.png", n = "挑战失败", c = "rgba(0,0,0,0.3)", f = "rgba(0,0,0,1)"), 
        (0, r.drawImageCenter)({
            self: o,
            src: a,
            pos: [ 207, 135, 20, 15 ],
            type: "bg",
            imgid: o.imgid.bg
        }), (0, r.drawText)({
            self: o,
            color: "#000",
            bold: !0,
            size: 30,
            t: n,
            pos: [ 207, 178 ]
        }), (0, r.drawImageCenter)({
            self: o,
            src: o.myUserInfo.headimg,
            pos: [ 158, 289, 26, 26 ],
            type: "bg",
            imgid: o.imgid.bg
        }), (0, r.drawImageCenter)({
            self: o,
            src: o.opt.organizerInfo.headimg,
            pos: [ 260, 289, 26, 26 ],
            type: "bg",
            imgid: o.imgid.bg
        }), (0, r.drawText)({
            self: o,
            color: "rgba(0,0,0,0.8)",
            size: 11,
            t: (0, r.cname)(o.myUserInfo.nickname),
            pos: [ 158, 318 ]
        }), (0, r.drawText)({
            self: o,
            color: "rgba(0,0,0,0.8)",
            size: 11,
            t: (0, r.cname)(o.opt.organizerInfo.nickname),
            pos: [ 260, 318 ]
        }), o.opt.gg_score > 999 ? (0, r.drawText)({
            self: o,
            color: c,
            size: 44,
            special: !0,
            t: o.opt.gg_score,
            align: "right",
            pos: [ 190, 253 ]
        }) : (0, r.drawText)({
            self: o,
            color: c,
            size: 44,
            special: !0,
            t: o.opt.gg_score,
            align: "center",
            pos: [ 158, 253 ]
        }), l.fillStyle = "rgba(0,0,0,0.3)", l.fillRect((0, r.cx)(202), (0, r.cy)(242), (0, 
        r.cwh)(10), (0, r.cwh)(4)), o.opt.organizerInfo.score_info[0].score > 999 ? (0, 
        r.drawText)({
            self: o,
            color: f,
            size: 44,
            special: !0,
            t: o.opt.organizerInfo.score_info[0].score,
            align: "left",
            pos: [ 231, 253 ]
        }) : (0, r.drawText)({
            self: o,
            color: f,
            size: 44,
            special: !0,
            t: o.opt.organizerInfo.score_info[0].score,
            pos: [ 260, 253 ]
        });
    }
    (0, r.drawLine)(30, 437, 384, 437, "rgba(0,0,0,0.06)", .5, l);
    var g = "挑战";
    if (o.opt.organizerInfo.left_time > 0 && 0 == o.opt.organizerInfo.is_self) o.myidx > 0 && (g = "再次挑战"), 
    (0, r.drawImageCenter)({
        self: o,
        src: "res/btn_bg_g.png",
        pos: [ 207, 368, 130, 63 ],
        type: "bg",
        cb: function() {
            (0, r.drawText)({
                self: o,
                size: 14,
                t: g,
                pos: [ 207, 368 ]
            }), (0, r.updatePlane)({
                self: o,
                type: "bg"
            });
        },
        imgid: o.imgid.bg
    }), (0, r.drawText)({
        self: o,
        size: 12,
        align: "right",
        color: "#000",
        t: "有效时间至",
        pos: [ 223, 403.5 ]
    }), d = (p = +new Date()) + 1e3 * o.opt.organizerInfo.left_time, w = (w = (p = new Date(d)).getHours()) < 10 ? "0" + w : w, 
    m = (m = p.getMinutes()) < 10 ? "0" + m : m, (0, r.drawText)({
        self: o,
        size: 12,
        align: "left",
        color: "#fc4814",
        t: w + ":" + m,
        pos: [ 225, 403.5 ]
    }); else if (0 == o.opt.organizerInfo.left_time && 0 == o.opt.organizerInfo.is_self) (0, 
    r.drawImageCenter)({
        self: o,
        src: "res/btn_bg_h.png",
        pos: [ 207, 368, 130, 63 ],
        type: "bg",
        cb: function() {
            (0, r.drawText)({
                self: o,
                size: 14,
                color: "rgba(0,0,0,0.3)",
                t: "挑战结束",
                pos: [ 207, 368 ]
            }), (0, r.updatePlane)({
                self: o,
                type: "bg"
            });
        },
        imgid: o.imgid.bg
    }), (0, r.drawText)({
        self: o,
        size: 14,
        color: "#888",
        t: "已失效",
        pos: [ 207, 403.5 ]
    }); else if (o.opt.organizerInfo.left_time > 0 && 1 == o.opt.organizerInfo.is_self) {
        (0, r.drawText)({
            self: o,
            size: 14,
            align: "right",
            color: "#888",
            t: "有效时间至",
            pos: [ 223, 369 ]
        }), l.textAlign = "left", l.fillStyle = "#2c9f67";
        var p = +new Date(), d = p + 1e3 * o.opt.organizerInfo.left_time, w = (p = new Date(d)).getHours();
        w = w < 10 ? "0" + w : w;
        var m = p.getMinutes();
        m = m < 10 ? "0" + m : m, (0, r.drawText)({
            self: o,
            size: 14,
            align: "left",
            color: "#2c9f67",
            t: w + ":" + m,
            pos: [ 225, 369 ]
        });
    }
    (0, r.drawText)({
        self: o,
        size: 17,
        t: "不挑战，直接开始",
        pos: [ 199, 688 ]
    }), (0, r.drawImageCenter)({
        self: o,
        src: "res/r_arr.png",
        pos: [ 280, 688, 6.5, 12.5 ],
        type: "bg",
        imgid: o.imgid.bg
    }), (0, r.updatePlane)({
        self: o,
        type: "bg"
    });
}, exports.drawPkList = o, exports.pkEve = function(e, t, o) {
    return t > 110 && t < 310 && o > 650 && o < 730 ? (!!e.options.onBattlePlay && e.options.onBattlePlay(""), 
    !1) : e.opt.organizerInfo.left_time > 0 && 0 == e.opt.organizerInfo.is_self && t > 140 && t < 280 && o > 325 && o < 405 ? (!!e.options.onBattlePlay && e.options.onBattlePlay("pk"), 
    !1) : void 0;
};

var r = require("./base"), s = e(require("../../store/storage")), l = e(require("../../scroll/scrollHandler"));