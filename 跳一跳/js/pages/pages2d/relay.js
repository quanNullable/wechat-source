function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    if (!t) return !1;
    if ((t = JSON.parse(t)).my_seat_no != t.room_owner_seat && e.my_seat_no == e.room_owner_seat) return !1;
    var s = void 0, n = void 0, i = void 0;
    if (e.players.length == t.players.length) for (var p = 0; p < e.players.length; p++) e.players[p].headimg == t.players[p].headimg && e.players[p].name == t.players[p].name || (s = !0); else s = !0;
    return s && o(a), e.game_level != t.game_level && (n = !0, r(a)), e.players.length > 1 && 1 == t.players.length ? (i = !0, 
    l(a)) : t.players.length > 1 && 1 == e.players.length && (i = !0, l(a)), !!(s || n || i) || void 0 == s && void 0 == n && void 0 == i;
}

function a(e) {
    var t = "data:image/jpeg;base64," + e.opt.room_wxa_code, a = e.context.bg;
    (0, _.drawImageCenter)({
        self: e,
        src: "res/qr.png",
        pos: [ 207, 368, 390, 390 ],
        type: "bg",
        imgid: e.imgid.bg,
        cb: function() {
            var r = new Image();
            r.onload = function() {
                a.save(), a.beginPath(), a.arc((0, _.cx)(207), (0, _.cy)(368), (0, _.cwh)(150), 0, 2 * Math.PI), 
                a.clip(), a.drawImage(r, (0, _.cx)(67), (0, _.cy)(228), (0, _.cwh)(280), (0, _.cwh)(280)), 
                a.closePath(), a.restore(), (0, _.updatePlane)({
                    self: e,
                    type: "bg"
                });
            }, e.opt.room_wxa_code && (r.src = t);
        }
    });
}

function r(e) {
    e.context.btn.clearRect((0, _.cx)(100), (0, _.cy)(555), (0, _.cwh)(200), (0, _.cwh)(40)), 
    (0, _.drawText)({
        self: e,
        t: "游戏难度  :   " + e.opt.game_level_s,
        size: 17,
        pos: [ 138, 575 ],
        align: "left",
        type: "btn"
    }), (0, _.drawImageCenter)({
        self: e,
        src: "res/r_arr.png",
        pos: [ 273, 575, 6.5, 12.5 ],
        type: "btn",
        imgid: e.imgid.btn
    }), (0, _.updatePlane)({
        self: e,
        type: "btn"
    });
}

function o(e) {
    var t = e.context.btn;
    t.clearRect((0, _.cx)(20), (0, _.cy)(270), (0, _.cwh)(370), (0, _.cwh)(210));
    for (var a = e.opt.players, r = 0; r < 10; r++) !function(r) {
        var o = 59 + r % 5 * 74, l = 314 + 103 * Math.floor(r / 5);
        a[r] ? ((0, _.drawImageCenter)({
            self: e,
            src: a[r].headimg,
            pos: [ o, l, 51, 51 ],
            type: "btn",
            imgid: e.imgid.btn,
            round: !0,
            noupdate: !0,
            cb: function() {
                (0, _.drawImageCenter)({
                    self: e,
                    src: "res/2d/ava_square.png",
                    pos: [ o, l, 53, 53 ],
                    type: "btn",
                    imgid: e.imgid.btn,
                    cb: function() {
                        console.log(a[r].seat_no, e.opt.room_owner_seat), a[r].seat_no == e.opt.room_owner_seat && (0, 
                        _.drawImageCenter)({
                            self: e,
                            src: "res/2d/owner.png",
                            pos: [ o, l - 27, 40, 18 ],
                            imgid: e.imgid.btn,
                            type: "btn",
                            cb: function() {
                                (0, _.updatePlane)({
                                    self: e,
                                    type: "btn"
                                });
                            }
                        });
                    }
                });
            }
        }), (0, _.drawText)({
            self: e,
            t: (0, _.cname)(a[r].name, 6),
            size: 14,
            pos: [ o, l + 45 ],
            type: "btn"
        })) : (t.lineWidth = 1 * _.Dpr, t.strokeStyle = "rgba(0,0,0,0.06)", t.fillStyle = "rgba(0,0,0,0.06)", 
        (0, _.roundedRect)((0, _.cx)(o - 27), (0, _.cy)(l - 27), (0, _.cwh)(53), (0, _.cwh)(53), 4 * _.Dpr, t), 
        t.fill());
    }(r);
}

function l(e) {
    e.context.btn.clearRect((0, _.cx)(100), (0, _.cy)(620), (0, _.cwh)(220), (0, _.cwh)(80)), 
    e.opt.players.length > 1 && (0, _.drawImageCenter)({
        self: e,
        src: "res/play.png",
        pos: [ 207, 657, 208, 78 ],
        type: "btn",
        imgid: e.imgid.btn
    });
}

function s(e) {
    var t = e.context.bg;
    t.clearRect(0, 0, _.WIDTH, _.HEIGHT);
    var a = t.createLinearGradient(0, 0, 0, _.HEIGHT);
    a.addColorStop(0, "#D6F1F1"), a.addColorStop(1, "#D3EDE6"), t.fillStyle = a, t.fillRect(0, 0, _.WIDTH, _.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.3)", t.fillRect(0, 0, _.WIDTH, _.HEIGHT), (0, _.drawImageCenter)({
        self: e,
        src: "res/2d/555.png",
        pos: [ 207, 214, 37.4, 27 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, _.drawText)({
        self: e,
        size: 24,
        t: "该局游戏已结束",
        pos: [ 207, 286 ]
    }), (0, _.drawHomeImg)(t, e), (0, _.drawImageCenter)({
        self: e,
        src: "res/lookers_btn.png",
        pos: [ 207, 588, 162, 78 ],
        type: "bg",
        imgid: e.imgid.bg,
        cb: function() {
            (0, _.drawText)({
                self: e,
                t: "我也要玩",
                size: 18,
                pos: [ 207, 588 ],
                color: "#000"
            });
        }
    }), (0, _.updatePlane)({
        self: e,
        type: "bg"
    });
}

function n(e, t, a) {
    if (!t) return !1;
    if (t.my_seat_no != t.room_owner_seat && e.my_seat_no == e.room_owner_seat) return !1;
    t = JSON.parse(t);
    var r = void 0, o = void 0;
    if (e.players.length == t.players.length) for (var l = 0; l < e.players.length; l++) e.players[l].headimg == t.players[l].headimg && e.players[l].name == t.players[l].name || (r = !0); else r = !0;
    return r && i(a), (t.players.length < 10 && e.players.length >= 10 || t.game_level != e.game_level) && (o = !0, 
    p(a)), !(!r && !o);
}

function i(e) {
    console.log("diff player");
    var t = e.context.btn, a = e.opt.players;
    t.clearRect((0, _.cx)(20), (0, _.cy)(260), (0, _.cwh)(370), (0, _.cwh)(210));
    for (var r = 0; r < 10; r++) !function(t) {
        var r = 59 + t % 5 * 74, o = 299 + 103 * Math.floor(t / 5);
        a[t] && ((0, _.drawImageCenter)({
            self: e,
            src: a[t].headimg,
            pos: [ r, o, 52, 52 ],
            type: "btn",
            imgid: e.imgid.btn,
            round: !0,
            noupdate: !0,
            cb: function() {
                (0, _.drawImageCenter)({
                    self: e,
                    src: "res/2d/ava_square.png",
                    pos: [ r, o, 54, 54 ],
                    imgid: e.imgid.btn,
                    type: "btn",
                    cb: function() {
                        a[t].seat_no == e.opt.room_owner_seat && (0, _.drawImageCenter)({
                            self: e,
                            src: "res/2d/owner.png",
                            pos: [ r, o - 27, 40, 18 ],
                            imgid: e.imgid.btn,
                            type: "btn",
                            cb: function() {
                                (0, _.updatePlane)({
                                    self: e,
                                    type: "btn"
                                });
                            }
                        });
                    }
                });
            }
        }), (0, _.drawText)({
            self: e,
            t: (0, _.cname)(a[t].name, 6),
            size: 14,
            pos: [ r, o + 45 ],
            type: "btn"
        }));
    }(r);
}

function p(e) {
    e.context.btn.clearRect((0, _.cx)(120), (0, _.cy)(111), (0, _.cwh)(170), (0, _.cwh)(90)), 
    10 == e.opt.players.length ? (0, _.drawText)({
        self: e,
        size: 24,
        t: "房间人数已满",
        pos: [ 207, 131.5 ],
        type: "btn"
    }) : (0, _.drawText)({
        self: e,
        size: 24,
        t: "等待开始游戏",
        pos: [ 207, 131.5 ],
        type: "btn"
    }), (0, _.drawText)({
        self: e,
        size: 17,
        t: "游戏难度 : " + e.opt.game_level_s,
        pos: [ 207, 167 ],
        color: "#FCBA4B",
        type: "btn"
    }), (0, _.updatePlane)({
        self: e,
        type: "btn"
    });
}

function c(e) {
    var t = e.context.bg;
    t.clearRect(0, 0, _.WIDTH, _.HEIGHT);
    var a = t.createLinearGradient(0, 0, 0, _.HEIGHT);
    a.addColorStop(0, "#D6F1F1"), a.addColorStop(1, "#D3EDE6"), t.fillStyle = a, t.fillRect(0, 0, _.WIDTH, _.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.3)", t.fillRect(0, 0, _.WIDTH, _.HEIGHT);
    e.opt.players, e.opt;
    (0, _.drawHomeImg)(t, e);
    for (var r = 0; r < 10; r++) {
        var o = 59 + r % 5 * 74, l = 299 + 103 * Math.floor(r / 5);
        t.lineWidth = 1 * _.Dpr, t.strokeStyle = "rgba(0,0,0,0.06)", t.fillStyle = "rgba(0,0,0,0.06)", 
        (0, _.roundedRect)((0, _.cx)(o - 27), (0, _.cy)(l - 27), (0, _.cwh)(54), (0, _.cwh)(54), 4 * _.Dpr, t), 
        t.fill();
    }
    i(e), p(e), (0, _.drawText)({
        self: e,
        size: 14,
        t: "仅房主可开始游戏以及设置游戏难度",
        pos: [ 207, 214 ]
    }), (0, _.drawText)({
        self: e,
        t: "+  邀请好友",
        size: 17,
        pos: [ 207, 608 ]
    }), (0, _.drawImageCenter)({
        self: e,
        src: "res/btn_invite_fri.png",
        pos: [ 207, 608, 152, 37 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, _.updatePlane)({
        self: e,
        type: "bg"
    });
}

function g(e) {
    e.imgid.bg++;
    var t = e.context.bg;
    t.clearRect(0, 0, _.WIDTH, _.HEIGHT);
    var a = t.createLinearGradient(0, 0, 0, _.HEIGHT);
    a.addColorStop(0, "#D6F1F1"), a.addColorStop(1, "#D3EDE6"), t.fillStyle = a, t.fillRect(0, 0, _.WIDTH, _.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.3)", t.fillRect(0, 0, _.WIDTH, _.HEIGHT);
    var r = e.opt.players, o = e.opt;
    (0, _.drawHomeImg)(t, e);
    var l = [];
    r.length < 6 ? d(e, l = r, 299) : (l = r.slice(0, Math.ceil(r.length / 2)), d(e, l, 299), 
    l = r.slice(Math.ceil(r.length / 2), r.length), d(e, l, 402)), (0, _.drawText)({
        self: e,
        size: 24,
        t: "游戏已开始",
        pos: [ 207, 141 ]
    }), (0, _.drawText)({
        self: e,
        size: 17,
        t: "游戏难度 : " + o.game_level_s,
        pos: [ 207, 167 ],
        color: "#FCBA4B"
    }), (0, _.drawImageCenter)({
        self: e,
        src: "res/lookers_btn.png",
        pos: [ 207, 588, 152, 78 ],
        type: "bg",
        imgid: e.imgid.bg,
        cb: function() {
            (0, _.drawText)({
                self: e,
                t: "观战",
                size: 22,
                pos: [ 207, 588 ],
                color: "#000"
            });
        }
    }), (0, _.updatePlane)({
        self: e,
        type: "bg"
    });
}

function d(e, t, a) {
    for (var r = t.length, o = 54, l = 207 - (r * o + 20 * (r - 1)) / 2, s = (e.context.bg, 
    0); s < r; s++) !function() {
        var r = l + 27 + 74 * s;
        (0, _.drawImageCenter)({
            self: e,
            round: !0,
            src: t[s].headimg,
            pos: [ r, a, o, o ],
            type: "bg",
            cb: function() {
                (0, _.drawImageCenter)({
                    self: e,
                    src: "res/2d/ava_square.png",
                    pos: [ r, a, 56, 56 ],
                    type: "bg",
                    imgid: e.imgid.bg
                });
            },
            imgid: e.imgid.bg,
            noupdate: !0
        }), (0, _.drawText)({
            self: e,
            t: (0, _.cname)(t[s].name, 6),
            size: 14,
            pos: [ r, a + 45 ]
        });
    }();
}

function f(e) {
    e.imgid.btn++, e.imgid.bg++, e.context.btn.clearRect(0, 0, _.WIDTH, _.HEIGHT);
    var t = e.context.bg;
    t.clearRect(0, 0, _.WIDTH, _.HEIGHT);
    var a = t.createLinearGradient(0, 0, 0, _.HEIGHT);
    a.addColorStop(0, "#D6F1F1"), a.addColorStop(1, "#D3EDE6"), t.fillStyle = a, t.fillRect(0, 0, _.WIDTH, _.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.5)", t.fillRect(0, 0, _.WIDTH, (0, _.cy)(247)), t.fillStyle = "rgba(0,0,0, 0.3)", 
    t.fillRect(0, (0, _.cy)(247), _.WIDTH, (0, _.cy)(489)), o(e), (0, _.drawText)({
        self: e,
        t: "通过房间码邀请",
        size: 17,
        pos: [ 198, 181 ],
        color: "rgba(255,255,255,0.7)"
    }), (0, _.drawImageCenter)({
        self: e,
        src: "res/r_arr.png",
        pos: [ 273, 181, 6.5, 12.5 ],
        type: "btn",
        imgid: e.imgid.btn
    }), r(e), (0, _.drawText)({
        self: e,
        t: "+  邀请好友",
        size: 17,
        pos: [ 207, 119 ]
    }), (0, _.drawImageCenter)({
        self: e,
        src: "res/btn_invite_fri.png",
        pos: [ 207, 119, 152, 37 ],
        type: "bg",
        imgid: e.imgid.bg
    }), l(e), (0, _.drawHomeImg)(t, e), (0, _.updatePlane)({
        self: e,
        type: "bg"
    });
}

function m(e, t, a, r, o, l) {
    l.beginPath(), l.moveTo(e, t + o - 1), l.lineTo(e, t + r - o), l.quadraticCurveTo(e, t + r, e + o, t + r), 
    l.lineTo(e + a - o, t + r), l.quadraticCurveTo(e + a, t + r, e + a, t + r - o), 
    l.lineTo(e + a, t), l.lineTo(e, t), l.stroke(), l.closePath();
}

function y(e) {
    (0, _.routeCanvas)(e, "relayRank"), (0, _.createPlane)(e), (0, _.updateClip)({
        self: e
    });
    var t = e.context.bg;
    (0, _.drawHomeImg)(t, e), t.fillStyle = "rgba(255,255,255,0.04)", t.fillRect((0, 
    _.cx)(30), (0, _.cy)(177), (0, _.cwh)(354), (0, _.cwh)(227)), t.fillStyle = "rgba(0,0,0,0.3)", 
    t.lineWidth = .5 * _.Dpr, t.strokeStyle = "rgba(0,0,0,0.2)", m((0, _.cx)(30), (0, 
    _.cy)(561), (0, _.cwh)(354), (0, _.cwh)(90), 2 * _.Dpr, t), t.fill();
    var a = e.opt.players || [];
    console.log("排行榜的 players: ", a), (0, _.drawText)({
        self: e,
        t: a.length + "人总得分：" + e.opt.total_score,
        size: 17,
        pos: [ 207, 145 ]
    }), (0, _.drawImageCenter)({
        self: e,
        src: a[0].headimg,
        pos: [ 207, 247, 48, 48 ],
        type: "bg",
        imgid: e.imgid.bg,
        cb: function() {
            (0, _.drawImageCenter)({
                self: e,
                src: "res/2d/ava_square.png",
                pos: [ 207, 247, 50, 50 ],
                imgid: e.imgid.bg
            });
        }
    }), (0, _.drawText)({
        self: e,
        t: "第" + e.opt.my_rank + "名",
        size: 30,
        pos: [ 207, 316 ],
        color: "#E3B857"
    }), (0, _.drawText)({
        self: e,
        t: "共" + a.length + "名玩家",
        size: 15,
        pos: [ 207, 356 ],
        color: "#888"
    }), (0, _.drawText)({
        self: e,
        t: "再来一局",
        size: 22,
        pos: [ 207, 606 ]
    }), (0, _.updatePlane)({
        self: e,
        type: "bg"
    }), u(e, a);
}

function b(e) {
    (0, _.routeCanvas)(e, "relayRank"), (0, _.updateClip)({
        self: e
    });
    var t = e.context.bg;
    (0, _.drawHomeImg)(t, e), t.fillStyle = "rgba(255,255,255,0.04)", t.fillRect((0, 
    _.cx)(30), (0, _.cy)(177), (0, _.cwh)(354), (0, _.cwh)(141)), t.fill();
    var a = e.opt.players, r = !1;
    0 == e.opt.my_seat_no && (r = !0), r ? (0, _.drawText)({
        self: e,
        t: "游戏结束",
        size: 30,
        pos: [ 207, 243 ]
    }) : (t.fillStyle = "rgba(0,0,0,0.3)", t.strokeStyle = "rgba(0,0,0,0.2)", t.lineWidth = .5 * _.Dpr, 
    m((0, _.cx)(30), (0, _.cy)(560), (0, _.cwh)(354), (0, _.cwh)(90), 2 * _.Dpr, t), 
    t.fill(), (0, _.drawText)({
        self: e,
        t: "第" + e.opt.my_rank + "名",
        size: 30,
        pos: [ 207, 237 ],
        color: "#E3B857"
    }), (0, _.drawText)({
        self: e,
        t: "共" + a.length + "名玩家",
        size: 17,
        pos: [ 207, 275 ]
    }), (0, _.drawText)({
        self: e,
        t: "再来一局",
        size: 22,
        pos: [ 207, 606 ]
    })), (0, _.drawText)({
        self: e,
        t: a.length + "人总得分：" + e.opt.total_score,
        size: 17,
        pos: [ 207, 145 ]
    }), (0, _.updatePlane)({
        self: e,
        type: "bg"
    }), u(e, a);
}

function u(e, t) {
    console.log("renderRelayRankList :: ");
    e.sotedRankList = t;
    var a = e.sotedRankList.length * (0, _.cwh)(_.ListLineHeight) / _.Dpr, r = (0, _.cwh)(157) / _.Dpr;
    1 != e.opt.my_rank && (r = (0, _.cwh)(242) / _.Dpr), e.scrollHandler = new T.default({
        innerOffsetHeight: a,
        outterOffsetHeight: r,
        updatePosition: e.updatePosition.bind(e)
    }), w(e, 0, "list1");
}

function w(e, t, a) {
    "list1" == a ? e.imgid.list1++ : "list2" == a && e.imgid.list2++;
    var r = e.sotedRankList.slice(t, t + 10), o = e.context[a];
    if (o.clearRect(0, 0, _.WIDTH, 10 * (0, _.cwh)(_.ListLineHeight)), o.textBaseline = "middle", 
    0 == t || 0 != r.length) {
        if (!(t < 0)) {
            for (var l = r.length, s = 0; s < l; s++) !function() {
                console.log(s);
                var o = (s + .5) * _.ListLineHeight, l = s + 1 + t, n = "";
                n = 1 == l ? "#ffd800" : "#888", (0, _.drawText)({
                    self: e,
                    bold: !0,
                    italic: !0,
                    size: 17,
                    t: l,
                    pos: [ 58.5, o ],
                    type: a,
                    color: n
                }), (0, _.drawImageCenter)({
                    self: e,
                    src: r[s].headimg,
                    pos: [ 107, o, 36, 36 ],
                    type: a,
                    cb: function() {
                        (0, _.drawImageCenter)({
                            self: e,
                            src: "res/2d/ava_square.png",
                            pos: [ 107, o, 37, 37 ],
                            type: a,
                            imgid: e.imgid[a]
                        });
                    },
                    round: !0,
                    imgid: e.imgid[a],
                    noupdate: !0
                }), (0, _.drawText)({
                    self: e,
                    align: "left",
                    size: 17,
                    bold: !0,
                    t: (0, _.cname)(r[s].name, 14),
                    pos: [ 144, o ],
                    type: a
                });
            }();
            (0, _.updatePlane)({
                self: e,
                type: a
            });
        }
    } else (0, _.updatePlane)({
        self: e,
        type: a
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawRelayRoomPage = function(e) {
    var a = e.opt;
    if ((0, _.createPlane)(e, [ "bg", "btn" ]), (0, _.routeCanvas)(e, "relayRoom"), 
    1 == a.game_level ? a.game_level_s = "中" : 2 == a.game_level ? a.game_level_s = "高" : a.game_level_s = "低", 
    2 == a.game_status) (0, _.createPlane)(e), s(e); else if (1 == a.game_status) (0, 
    _.createPlane)(e), g(e); else if (0 == a.game_status) if (a.my_seat_no == a.room_owner_seat) {
        if (t(e.opt, e.lastopt, e)) return void (e.lastopt = JSON.stringify(e.opt));
        e.lastopt = JSON.stringify(e.opt), f(e);
    } else {
        if (n(e.opt, e.lastopt, e)) return void (e.lastopt = JSON.stringify(e.opt));
        e.context.btn.clearRect(0, 0, _.WIDTH, _.HEIGHT), e.lastopt = JSON.stringify(e.opt), 
        c(e);
    }
}, exports.drawRelayLookers = function(e) {
    e.opt;
    (0, _.createPlane)(e), (0, _.routeCanvas)(e, "relayLookers"), e.context.btn.clearRect(0, 0, _.WIDTH, _.HEIGHT), 
    (0, _.drawImageCenter)({
        self: e,
        src: "res/relay_return.png",
        pos: [ 207, 678, 140, 54 ],
        imgid: e.imgid.bg,
        type: "bg",
        cb: function() {
            (0, _.drawText)({
                self: e,
                t: "我也要玩",
                size: 17,
                pos: [ 207, 678 ],
                color: "#555"
            }), (0, _.updatePlane)({
                self: e,
                type: "bg"
            });
        }
    });
}, exports.drawRelayQr = function(e) {
    e.opt;
    (0, _.createPlane)(e), (0, _.routeCanvas)(e, "relayQr");
    var t = e.context.bg;
    t.clearRect(0, 0, _.WIDTH, _.HEIGHT);
    var r = t.createLinearGradient(0, 0, 0, _.HEIGHT);
    r.addColorStop(0, "#D6F1F1"), r.addColorStop(1, "#D3EDE6"), t.fillStyle = r, t.fillRect(0, 0, _.WIDTH, _.HEIGHT), 
    t.fillStyle = "rgba(0,0,0, 0.3)", t.fillRect(0, 0, _.WIDTH, _.HEIGHT), (0, _.drawText)({
        self: e,
        t: "扫码即可进入房间",
        size: 17,
        pos: [ 207, 180 ]
    }), a(e), (0, _.drawReturnImg)(t, e), (0, _.updatePlane)({
        self: e,
        type: "bg"
    });
}, exports.drawRelaying = function(e) {
    var t = e.opt;
    (0, _.createPlane)(e), (0, _.routeCanvas)(e, "relayRoom"), e.context.btn.clearRect(0, 0, _.WIDTH, _.HEIGHT), 
    (0, _.drawText)({
        self: e,
        t: t.text,
        size: 26,
        pos: [ 34, 220 ],
        align: "left",
        type: "btn",
        color: "#403A5B"
    }), (0, _.updatePlane)({
        self: e,
        type: "btn"
    });
}, exports.drawRelayGG = function(e) {
    if (e.canvasType == _.CANVASTYPE.relayRoom || _.DEBUGVIEW) {
        (0, _.createPlane)(e);
        var t = e.context.bg;
        t.clearRect(0, 0, _.WIDTH, _.HEIGHT), (0, _.routeCanvas)(e, "relayGG");
        var a = e.opt;
        (0, _.drawHomeImg)(t, e), (0, _.drawImageCenter)({
            self: e,
            src: "res/bl3.png",
            pos: [ 207, 342.5, 354, 417 ],
            imgid: e.imgid.bg,
            type: "bg",
            round: !0,
            cb: function() {
                (0, _.drawImageCenter)({
                    self: e,
                    src: "res/2d/555.png",
                    pos: [ 207, 214, 37.4, 27 ],
                    type: "bg",
                    imgid: e.imgid.bg
                }), (0, _.drawText)({
                    self: e,
                    t: "游戏结束",
                    size: 36,
                    pos: [ 207, 298 ]
                }), (0, _.drawText)({
                    self: e,
                    t: "第" + a.my_rank + "名",
                    size: 30,
                    pos: [ 207, 358 ],
                    color: "#E3B857"
                }), (0, _.drawText)({
                    self: e,
                    t: "共" + a.all_player + "名玩家",
                    size: 17,
                    pos: [ 207, 398 ],
                    color: "#888"
                }), t.lineWidth = 2 * _.Dpr, t.strokeStyle = "rgba(255,255,255,0.06)", t.fillStyle = "rgba(0,0,0,0.3)", 
                m((0, _.cx)(30), (0, _.cy)(460), (0, _.cwh)(354), (0, _.cwh)(91), 4 * _.Dpr, t), 
                t.fill(), (0, _.drawText)({
                    self: e,
                    t: "继续观战",
                    size: 22,
                    pos: [ 207, 506 ]
                });
            }
        }), (0, _.updatePlane)({
            self: e,
            type: "bg"
        });
    }
}, exports.drawRelayRank = function(e) {
    if (e.opt.players = (0, _.relayRerank)(e.opt.players), (0, _.createPlane)(e), e.context.bg.clearRect(0, 0, _.WIDTH, _.HEIGHT), 
    1 == e.opt.my_rank) (0, _.drawImageCenter)({
        round: !0,
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 382.5, 354, 537 ],
        type: "bg",
        imgid: e.imgid.bg,
        cb: function() {
            y(e);
        }
    }); else {
        var t = !1, a = 0;
        0 == e.opt.my_seat_no && (t = !0), a = t ? 446 : 537, (0, _.drawImageCenter)({
            round: !0,
            self: e,
            src: "res/bl3.png",
            pos: [ 207, 114 + a / 2, 354, a ],
            type: "bg",
            imgid: e.imgid.bg,
            cb: function() {
                b(e);
            }
        });
    }
}, exports.drawRelayList = w, exports.drawRelayBeginner = function(e) {
    (0, _.routeCanvas)(e, "relayBeginner"), (0, _.createPlane)(e), e.imgid.bg++, e.imgid.btn++;
    var t = e.context.bg;
    t.clearRect(0, 0, _.WIDTH, _.HEIGHT), e.context.btn.clearRect(0, 0, _.WIDTH, _.HEIGHT), 
    t.beginPath(), t.fillStyle = "rgba(132,111,126,0.8)", t.fillRect(0, (0, _.cy)(547), _.WIDTH, (0, 
    _.cwh)(189)), t.fill(), t.closePath(), (0, _.drawImageCenter)({
        self: e,
        src: "res/2d/skip.png",
        pos: [ 357, 547, 80, 48 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, _.drawText)({
        self: e,
        t: "玩法说明",
        size: 17,
        pos: [ 207, 599 ]
    }), (0, _.drawText)({
        self: e,
        t: "邀请好友进入游戏，轮流操作。每个人在规定时间内",
        size: 14,
        pos: [ 207, 631 ]
    }), (0, _.drawText)({
        self: e,
        t: "完成一次操作。掉落者则被淘汰，坚持到最后的玩",
        size: 14,
        pos: [ 207, 653 ]
    }), (0, _.drawText)({
        self: e,
        t: "家即为胜利。",
        size: 14,
        pos: [ 207, 675 ]
    }), (0, _.updatePlane)({
        self: e,
        type: "bg"
    });
}, exports.relayRoomEve = function(e, t, a) {
    return 0 == e.opt.game_status && e.opt.my_seat_no == e.opt.room_owner_seat && e.opt.players.length > 1 && t > 160 && t < 260 && a > 627 && a < 677 ? (e.opt.game_level = e.opt.game_level || 0, 
    !!e.options.startRelay && e.options.startRelay(e.opt.game_level), !1) : 0 == e.opt.game_status && e.opt.my_seat_no == e.opt.room_owner_seat && t > 160 && t < 260 && a > 555 && a < 595 ? (wx.showActionSheet({
        itemList: [ "低", "中", "高" ],
        success: function(t) {
            e.opt.game_level = t.tapIndex, e.showRelayRoom(e.opt), v.default.emit(H.EVENT.CHANGEGAMELEVEL, t.tapIndex);
        }
    }), !1) : 0 == e.opt.game_status && t < 100 && a < 70 ? (e.relayHeadImg && e.relayHeadImg.obj && e.options.camera.remove(e.relayHeadImg.obj), 
    e.relayText && e.options.camera.remove(e.relayText), !!e.options.outRelay1 && e.options.outRelay1(), 
    !1) : 0 == e.opt.game_status && e.opt.my_seat_no == e.opt.room_owner_seat && t > 160 && t < 260 && a > 99 && a < 140 ? (!!e.options.shareRelay && e.options.shareRelay(), 
    !1) : 0 == e.opt.game_status && e.opt.my_seat_no != e.opt.room_owner_seat && t > 160 && t < 260 && a > 598 && a < 618 ? (!!e.options.shareRelay && e.options.shareRelay(), 
    !1) : (1 == e.opt.game_status || 2 == e.opt.game_status) && t < 100 && a < 70 ? (e.relayHeadImg && e.relayHeadImg.obj && e.options.camera.remove(e.relayHeadImg.obj), 
    e.relayText && e.options.camera.remove(e.relayText), !!e.options.outRelay2 && e.options.outRelay2(), 
    !1) : 1 == e.opt.game_status && t > 160 && t < 260 && a > 568 && a < 608 ? (!!e.options.watchRelay && e.options.watchRelay(), 
    !1) : 0 == e.opt.game_status && e.opt.my_seat_no == e.opt.room_owner_seat && t > 160 && t < 260 && a > 161 && a < 201 ? (v.default.emit(H.EVENT.GETRELAYQR), 
    !!e.options.getRelayQr && e.options.getRelayQr(), e.showRelayQr({}), !1) : 2 == e.opt.game_status && t > 160 && t < 260 && a > 568 && a < 608 ? (!!e.options.newRelay && e.options.newRelay(), 
    !1) : void 0;
}, exports.relayRankEve = function(e, t, a) {
    return t < 100 && a < 70 ? (!!e.options.outRelay1 && e.options.outRelay1(), !1) : 0 != e.opt.my_seat_no && t > 30 && t < 380 && a > 561 && a < 651 ? (v.default.emit(H.EVENT.REPLAYAGAIN, {}), 
    !1) : void 0;
}, exports.relayGGEve = function(e, t, a) {
    return t > 30 && t < 384 && a > 460 && a < 550 ? (e.hide2D(), !1) : t < 100 && a < 70 ? (e.relayHeadImg && e.relayHeadImg.obj && e.options.camera.remove(e.relayHeadImg.obj), 
    e.relayText && e.options.camera.remove(e.relayText), !!e.options.outRelay1 && e.options.outRelay1(), 
    !1) : void 0;
}, exports.relayBeginnerEve = function(e, t, a) {
    if (t > 310 && t < 397 && a > 530 && a < 560) return !!e.options.skipRelayBeginner && e.options.skipRelayBeginner(), 
    !1;
}, exports.relayQrEve = function(e, t, a) {
    if (t < 100 && a < 70) return e.showRelayRoom(e.relayOpt, !0), !1;
};

var _ = require("./base"), T = e(require("../../scroll/scrollHandler")), v = e(require("../../lib/mue/eventcenter")), H = require("../../config");