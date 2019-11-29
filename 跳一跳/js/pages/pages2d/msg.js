function e(e) {
    e.imgid.bg++, e.imgid.btn++;
    var t = e.context.bg;
    t.clearRect(0, 0, i.WIDTH, i.HEIGHT), t.fillStyle = "rgba(0,0,0, 0.45)", t.fillRect(0, 0, i.WIDTH, i.HEIGHT), 
    t.lineWidth = 2 * i.Dpr, t.strokeStyle = "rgba(255,255,255,0.06)", (0, i.drawText)({
        self: e,
        size: 22,
        t: "消息盒子",
        pos: [ 207, 89 ],
        bold: !0,
        type: "bg"
    }), (0, i.drawImageCenter)({
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 372, 354, 492 ],
        type: "bg",
        imgid: e.imgid.bg,
        round: !0,
        radius: 2 * i.Dpr,
        cb: function() {
            0 == e.opt.msg_list.length && (0, i.drawText)({
                self: e,
                size: 17,
                t: "暂无消息",
                pos: [ 207, 318 ],
                type: "bg"
            }), (0, i.drawImageCenter)({
                self: e,
                src: "res/2d/new_return.png",
                pos: [ 54, 674, 70, 70 ],
                type: "bg",
                imgid: e.imgid.bg
            });
        }
    }), (0, i.updatePlane)({
        self: e,
        type: "bg"
    });
}

function t(e) {
    var t = e.opt.msg_list.length * (0, i.cwh)(o) / i.Dpr, r = (0, i.cwh)(482) / i.Dpr;
    e.scrollHandler = new l.default({
        innerOffsetHeight: t,
        outterOffsetHeight: r,
        updatePosition: e.updatePosition.bind(e)
    }), s(e, 0, "list1"), s(e, 10, "list2");
}

function s(e, t, s) {
    e.scrolloffset = t, e.scrolltype = s, "list1" == s ? e.imgid.list1++ : "list2" == s && e.imgid.list2++;
    var l = e.opt.msg_list.slice(t, t + 8), r = e.context[s];
    if (r.clearRect(0, 0, i.WIDTH, (0, i.cwh)(720)), 0 == t || 0 != l.length) {
        if (!(t < 0)) {
            for (var n = l.length, a = 0; a < n; a++) {
                var g, p, d;
                !function() {
                    a % 2 == 1 && (r.fillStyle = "rgba(255,255,255, 0.03)", r.fillRect(0, a * (0, i.cwh)(o), (0, 
                    i.cwh)(414), (0, i.cwh)(o))), g = new Date(1e3 * l[a].timestamp), p = g.getMonth() + 1 + "月" + g.getDate() + "日";
                    var t = a * o;
                    r.textAlign = "center", d = "res/2d/msg_default.png", l[a].icon && (d = l[a].icon), 
                    1 == l[a].sub_type ? ((0, i.drawImageCenter)({
                        round: !0,
                        self: e,
                        src: d,
                        pos: [ 69, t + 34, 34, 34 ],
                        type: s,
                        cb: function() {
                            (0, i.drawImageCenter)({
                                self: e,
                                src: "res/ava_rank.png",
                                pos: [ 69, t + 34, 47, 47 ],
                                type: s,
                                imgid: e.imgid[s]
                            });
                        },
                        imgid: e.imgid[s],
                        noupdate: !0
                    }), (0, i.drawText)({
                        self: e,
                        align: "left",
                        size: 14,
                        t: (0, i.cname)(l[a].title || "", 30),
                        pos: [ 106, t + 23 ],
                        type: s
                    }), (0, i.drawText)({
                        self: e,
                        align: "left",
                        size: 14,
                        t: (0, i.cname)(l[a].content || "", 30),
                        pos: [ 106, t + 45 ],
                        type: s
                    }), (0, i.drawText)({
                        self: e,
                        align: "left",
                        size: 12,
                        t: p,
                        pos: [ 106, t + 67 ],
                        type: s,
                        color: "rgba(255,255,255,0.6)"
                    }), (0, i.drawImageCenter)({
                        self: e,
                        src: "res/2d/zan.png",
                        pos: [ 353, t + 35, 18, 25 ],
                        type: s,
                        imgid: e.imgid[s]
                    })) : 5 == l[a].sub_type ? ((0, i.drawImageCenter)({
                        self: e,
                        src: d,
                        pos: [ 69, t + 45, 34, 34 ],
                        type: s,
                        imgid: e.imgid[s]
                    }), (0, i.drawText)({
                        self: e,
                        align: "left",
                        size: 14,
                        t: (0, i.cname)(l[a].title || "", 30),
                        pos: [ 106, t + 34 ],
                        type: s
                    }), (0, i.drawText)({
                        self: e,
                        align: "left",
                        size: 14,
                        t: p,
                        pos: [ 106, t + 56 ],
                        type: s,
                        color: "rgba(255,255,255,0.6)"
                    })) : ((0, i.drawImageCenter)({
                        self: e,
                        src: d,
                        pos: [ 69, t + 45, 34, 34 ],
                        type: s,
                        imgid: e.imgid[s]
                    }), (0, i.drawText)({
                        self: e,
                        align: "left",
                        size: 14,
                        t: (0, i.cname)(l[a].content || "", 30),
                        pos: [ 106, t + 34 ],
                        type: s
                    }), (0, i.drawText)({
                        self: e,
                        align: "left",
                        size: 14,
                        t: p,
                        pos: [ 106, t + 56 ],
                        type: s,
                        color: "rgba(255,255,255,0.6)"
                    }));
                }();
            }
            (0, i.updatePlane)({
                self: e,
                type: s
            });
        }
    } else (0, i.updatePlane)({
        self: e,
        type: s
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawMsgBox = function(s) {
    (0, i.routeCanvas)(s, "msgBox"), (0, i.createPlane)(s), e(s), (0, i.updateClip)({
        self: s
    }), t(s);
}, exports.updateMsgBox = function(e) {
    e.scrollHandler.setInnerHeight(e.opt.msg_list.length * (0, i.cwh)(o) / i.Dpr, e.lastScrollY), 
    s(e, e.scrolloffset, e.scrolltype), e.pending = void 0, console.log("END finish");
}, exports.drawMsgList = s, exports.msgBoxEve = function(e, t, s, i) {
    if (t > 30 && t < 95 && s > 640 && s < 720) return !!e.opt.onReturn && e.opt.onReturn(), 
    !1;
    if (t > 30 && t < 384 && s > 106 && s < 618) {
        var l = Math.floor((i - 136) / 90);
        return console.log(e.opt.msg_list[l]), e.opt.msg_list[l] && 2 == e.opt.msg_list[l].sub_type ? !!e.opt.onGoSkin && e.opt.onGoSkin() : e.opt.msg_list[l] && 1 == e.opt.msg_list[l].sub_type ? !!e.opt.onGoProfile && e.opt.onGoProfile(e.opt.msg_list[l]) : e.opt.msg_list[l] && 4 == e.opt.msg_list[l].sub_type ? !!e.opt.onGoMyProfile && e.opt.onGoMyProfile() : e.opt.msg_list[l] && 5 == e.opt.msg_list[l].sub_type && !!e.opt.onGoMsgDetail5 && e.opt.onGoMsgDetail5(e.opt.msg_list[l]), 
        !1;
    }
}, exports.drawMsgDetailType5 = function(e) {
    (0, i.routeCanvas)(e, "msgDetail5"), (0, i.createPlane)(e), e.imgid.bg++;
    var t = e.context.bg;
    t.clearRect(0, 0, i.WIDTH, i.HEIGHT), t.fillStyle = "rgba(0,0,0, 0.45)", t.fillRect(0, 0, i.WIDTH, i.HEIGHT), 
    (0, i.drawImageCenter)({
        self: e,
        src: "res/bl3.png",
        pos: [ 207, 372, 354, 492 ],
        type: "bg",
        imgid: e.imgid.bg,
        round: !0,
        radius: 2 * i.Dpr,
        cb: function() {
            t.fillStyle = "#111619", t.fillRect((0, i.cx)(30), (0, i.cy)(126), (0, i.cwh)(354), (0, 
            i.cwh)(160)), (0, i.drawText)({
                self: e,
                size: 20,
                t: "banner位置",
                pos: [ 207, 212 ],
                color: "rgba(255,255,255,0.2)"
            }), t.lineWidth = .5, (0, i.drawImageCenter)({
                self: e,
                src: e.opt.banner_icon || "aaa",
                pos: [ 207, 206, 354, 160 ],
                type: "bg",
                imgid: e.imgid.bg,
                round: !0
            }), (0, i.drawText)({
                self: e,
                size: 20,
                t: e.opt.title,
                pos: [ 60, 330 ],
                align: "left"
            });
            for (var s = e.opt.content.split("\\n"), l = 0, o = 0; o < s.length; o++) {
                for (var r = s[o].replace(/[^\x00-\xff]/g, "**").length, n = Math.ceil(r / 22 / 2), a = 0; a < n; a++) {
                    var g = 364 + 28 * l;
                    l++, (0, i.drawText)({
                        self: e,
                        size: 14,
                        t: s[o].slice(22 * a, 22 * a + 22),
                        pos: [ 60, g ],
                        align: "left",
                        color: "#BEBEBE"
                    });
                }
                0 == r && l++;
            }
            (0, i.drawImageCenter)({
                self: e,
                src: "res/2d/new_return.png",
                pos: [ 54, 674, 70, 70 ],
                type: "bg",
                imgid: e.imgid.bg
            });
        }
    }), t.lineWidth = 2 * i.Dpr, t.strokeStyle = "rgba(255, 255, 255, 0.06)", (0, i.updatePlane)({
        self: e,
        type: "bg"
    });
}, exports.drawMsgDetailType5Eve = function(e, t, s) {
    if (t > 30 && t < 95 && s > 640 && s < 720) return !!e.opt.onReturn && e.opt.onReturn(), 
    !1;
};

var i = require("./base"), l = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../scroll/scrollHandler")), o = 90;