function t(t) {
    t.imgid.btn++, t.imgid.bg++;
    var e = t.context.bg;
    e.clearRect(0, 0, s.WIDTH, s.HEIGHT);
    var i = t.context.btn;
    i.clearRect(0, 0, s.WIDTH, s.HEIGHT), e.fillStyle = "rgba(0,0,0, 0.45)", e.fillRect(0, 0, s.WIDTH, s.HEIGHT), 
    (0, s.updatePlane)({
        self: t,
        type: "bg"
    }), (0, s.drawText)({
        self: t,
        size: 22,
        t: "皮肤中心",
        pos: [ 207, 89 ],
        type: "bg",
        bold: !0
    }), (0, s.drawImageCenter)({
        round: !0,
        radius: 2 * s.Dpr,
        self: t,
        src: "res/bl3.png",
        pos: [ 207, 372, 354, 492 ],
        type: "bg",
        imgid: t.imgid.bg,
        cb: function() {
            for (var e = t.opt.skin_list, r = 0; r < e.length; r++) !function(r) {
                var n = Math.floor(r / 2), o = r % 2, l = 1;
                e[r].id == t.opt.id ? i.fillStyle = "#F7E6FF" : 0 == e[r].use_status ? (i.fillStyle = "#D1D1D1", 
                l = .5) : 1 == e[r].use_status && (i.fillStyle = "#F7E6FF"), i.strokeStyle = "#ccc", 
                (0, s.roundedRect)((0, s.cx)(50 + 167 * o), (0, s.cy)(157 + 187 * n), (0, s.cwh)(147), (0, 
                s.cwh)(167), 2 * s.Dpr, i), i.fill(), (0, s.drawImageCenter)({
                    self: t,
                    src: e[r].img,
                    pos: [ 124 + 167 * o, 220 + 187 * n, 33, 66 ],
                    type: "btn",
                    imgid: t.imgid.btn,
                    alpha: l,
                    cb: function() {
                        0 == e[r].use_status && (0, s.drawText)({
                            self: t,
                            size: 17,
                            t: e[r].unlock_wording,
                            pos: [ 123 + 167 * o, 226 + 187 * n ],
                            type: "btn"
                        });
                    }
                }), i.beginPath(), i.lineWidth = .5 * s.Dpr, i.strokeStyle = "rgba(0,0,0,0.1)", 
                i.moveTo((0, s.cx)(50 + 167 * o), (0, s.cy)(271 + 187 * n)), i.lineTo((0, s.cx)(197 + 167 * o), (0, 
                s.cy)(271 + 187 * n)), i.stroke(), e[r].id == t.opt.id ? (0, s.drawImageCenter)({
                    self: t,
                    src: "res/2d/sel.png",
                    pos: [ 123 + 167 * o, 296 + 187 * n, 50, 42 ],
                    type: "btn",
                    imgid: t.imgid.btn
                }) : 0 == e[r].use_status ? (0, s.drawText)({
                    self: t,
                    size: 17,
                    t: "待解锁",
                    pos: [ 123 + 167 * o, 296 + 187 * n ],
                    type: "btn",
                    color: "#3A3743"
                }) : 1 == e[r].use_status && (0, s.drawText)({
                    self: t,
                    size: 17,
                    t: "使用",
                    pos: [ 123 + 167 * o, 296 + 187 * n ],
                    type: "btn",
                    color: "#3A3743"
                }), e[r].left_time && (0, s.drawText)({
                    self: t,
                    size: 10,
                    t: "有效期" + Math.ceil(e[r].left_time / 3600 / 24) + "天",
                    pos: [ 123 + 167 * o, 166 + 187 * n ],
                    type: "btn",
                    color: "#888"
                });
            }(r);
        }
    }), (0, s.drawImageCenter)({
        self: t,
        src: "res/2d/new_return.png",
        pos: [ 54, 674, 70, 70 ],
        type: "btn",
        imgid: t.imgid.btn
    });
}

function e(t, e, s) {
    return t.id === this.opt.new_id;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawSkin = function(e) {
    (0, s.routeCanvas)(e, "skinList"), (0, s.createPlane)(e), t(e);
}, exports.updateSkinUseStatus = function(t) {
    for (var i = t.opt.skin_list, r = i.findIndex(e.bind(t)), n = 0; n < i.length; n++) {
        var o = Math.floor(n / 2), l = n % 2, a = t.context.btn;
        1 == i[n].use_status && (a.fillStyle = "#F7E6FF", a.fillRect((0, s.cx)(90 + 167 * l), (0, 
        s.cy)(276 + 187 * o), (0, s.cwh)(80), (0, s.cwh)(45)), n == r ? (0, s.drawImageCenter)({
            self: t,
            src: "res/2d/sel.png",
            pos: [ 123 + 167 * l, 296 + 187 * o, 50, 42 ],
            type: "btn",
            imgid: t.imgid.btn
        }) : (0, s.drawText)({
            self: t,
            size: 17,
            t: "使用",
            pos: [ 123 + 167 * l, 296 + 187 * o ],
            type: "btn",
            color: "#555"
        }));
    }
}, exports.skinListEve = function(t, e, s, i) {
    if (e > 30 && e < 95 && s > 640 && s < 720) return !!t.opt.onReturn && t.opt.onReturn(), 
    !1;
    if (e > 30 && e < 384 && s > 86 && s < 618) {
        i = 0;
        var r = 2 * Math.floor((s + i - 157) / 177) + Math.floor(e / 207);
        return t.opt.skin_list[r] && !!t.opt.onClickUse && t.opt.onClickUse(t.opt.skin_list[r]), 
        !1;
    }
};

var s = require("./base");

!function(t) {
    t && t.__esModule;
}(require("../../scroll/scrollHandler"));