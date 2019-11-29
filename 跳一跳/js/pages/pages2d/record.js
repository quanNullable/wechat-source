function e(e) {
    return e.canvas.bg;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawRecordPage = function(e) {
    var i = e.self;
    i.imgid.bg++, (0, t.routeCanvas)(i, "record"), (0, t.createPlane)(i), i.context.bg.clearRect(0, 0, t.WIDTH, t.HEIGHT);
    var r = i.opt;
    (0, t.drawImageCenter)({
        self: i,
        src: r.headimg,
        pos: [ 61, 128, 42, 42 ],
        type: "bg",
        cb: function() {
            (0, t.drawImageCenter)({
                self: i,
                src: "res/2d/ava_square.png",
                pos: [ 61, 128, 43, 43 ],
                type: "bg",
                imgid: i.imgid.bg
            });
        },
        imgid: i.imgid.bg,
        noupdate: !0,
        round: !0
    }), (0, t.drawImageCenter)({
        self: i,
        src: "res/2d/new_return.png",
        pos: [ 54, 674, 70, 70 ],
        type: "bg",
        imgid: i.imgid.bg
    }), r.is_self && (0, t.drawImageCenter)({
        self: i,
        src: "res/2d/iplay.png",
        pos: [ 317, 670, 166, 75 ],
        type: "bg",
        imgid: i.imgid.bg,
        cb: function() {
            (0, t.drawImageCenter)({
                self: i,
                src: "res/2d/share_black.png",
                pos: [ 275, 670, 16, 20 ],
                type: "bg",
                imgid: i.imgid.bg
            }), (0, t.drawText)({
                self: i,
                size: 17,
                t: "立即分享",
                pos: [ 294, 670 ],
                align: "left",
                type: "bg",
                color: "#222"
            });
        }
    }), (0, t.updatePlane)({
        self: i,
        type: "bg"
    });
}, exports.drawRecordSharePage = function(e) {
    (0, t.routeCanvas)(e, "recordShare"), (0, t.createPlane)(e), e.imgid.bg++;
    var i = e.context.bg;
    i.clearRect(0, 0, t.WIDTH, t.HEIGHT), e.context.btn.clearRect(0, 0, t.WIDTH, t.HEIGHT), 
    i.fillStyle = "rgba(0,0,0, 0.8)", i.fillRect(0, 0, t.WIDTH, t.HEIGHT), i.fillStyle = "white", 
    i.fillRect((0, t.cx)(46), (0, t.cy)(95), (0, t.cwh)(322), (0, t.cwh)(524));
    var r = e.opt;
    (0, t.drawText)({
        self: e,
        size: 14,
        align: "left",
        t: "游戏得分",
        pos: [ 70, 412 ],
        color: "#000"
    }), (0, t.drawText)({
        self: e,
        bold: !0,
        size: 60,
        align: "left",
        t: r.score || 0,
        pos: [ 70, 458 ],
        special: !0,
        color: "#00c777"
    }), (0, t.drawText)({
        self: e,
        size: 17,
        align: "left",
        t: "游戏最高连击",
        pos: [ 111, 541 ],
        color: "#000"
    }), (0, t.drawText)({
        self: e,
        bold: !0,
        size: 23,
        align: "left",
        t: r.combo || 0,
        pos: [ 220, 541 ],
        special: !0,
        color: "#00c777"
    }), (0, t.drawText)({
        self: e,
        size: 17,
        align: "left",
        t: "跳跃基座总数",
        pos: [ 111, 584 ],
        color: "#000"
    }), (0, t.drawText)({
        self: e,
        bold: !0,
        size: 23,
        align: "left",
        t: r.blocks || 0,
        pos: [ 222, 584 ],
        special: !0,
        color: "#00c777"
    }), (0, t.drawImageCenter)({
        self: e,
        src: "res/2d/new_return.png",
        pos: [ 54, 674, 70, 70 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, t.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNTTiaKet81gQJM5kF68vSvHb8fGUK7Gxet3cpo27XHdThFxDKxa9udIrIRrfib6iceCbdOmMIA8ia6nrQ/0?wx_fmt=jpeg",
        pos: [ 207, 237, 314, 274 ],
        type: "bg",
        imgid: e.imgid.bg,
        cb: function() {
            if (e.opt.qrcode) {
                var a = "data:image/jpeg;base64," + e.opt.qrcode, g = new Image();
                g.onload = function() {
                    i.save(), i.beginPath(), i.arc((0, t.cx)(207), (0, t.cy)(237), (0, t.cwh)(75), 0, 2 * Math.PI), 
                    i.clip(), i.drawImage(g, (0, t.cx)(137), (0, t.cy)(167), (0, t.cwh)(140), (0, t.cwh)(140)), 
                    i.closePath(), i.restore(), (0, t.updatePlane)({
                        self: e,
                        type: "bg"
                    });
                }, e.opt.qrcode && (g.src = a);
            }
            (0, t.drawImageCenter)({
                self: e,
                src: r.headimg,
                pos: [ 91, 365, 42, 42 ],
                type: "bg",
                cb: function() {
                    (0, t.drawImageCenter)({
                        self: e,
                        src: "res/2d/ava_square.png",
                        pos: [ 91, 365, 44, 44 ],
                        type: "bg",
                        imgid: e.imgid.bg
                    });
                },
                imgid: e.imgid.bg,
                noupdate: !0,
                round: !0
            });
        }
    }), (0, t.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJM5kF68vSvHbGCBbdgOO38RUykCLXfxY4AqvbpYlicNty1spYAodBn0VaIlUTmUWZPA/0?wx_fmt=png",
        pos: [ 83, 541, 30, 30 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, t.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJM5kF68vSvHbIzzKuHlGd6VRrYJDvWRW8ualJGGNUAjAsqqexE8oqPpmME0FwHa5qg/0?wx_fmt=png",
        pos: [ 83, 584, 30, 30 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, t.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJM5kF68vSvHbfc7nDtrYImbjUnlqZ4koWibPibgYJVxlg8StI6Q9VuxaIwicLkFtOrhzQ/0?wx_fmt=png",
        pos: [ 282.5, 674, 47, 47 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, t.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJM5kF68vSvHbbwRXvZtMDn4vIzraOmfMnic8R4qMMQgEV0XLG3unlM2fpHFG9FSBaSg/0?wx_fmt=png",
        pos: [ 359.5, 674, 47, 47 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, t.updatePlane)({
        self: e,
        type: "bg"
    });
}, exports.getRecordSavePhoto = e, exports.recordEve = function(e, i, r) {
    return i > 30 && i < 95 && r > 640 && r < 720 ? ((0, t.back)(e), !!e.options.quitRecord && e.options.quitRecord(), 
    !1) : e.opt.is_self && i > 270 && i < 340 && r > 640 && r < 720 ? (!!e.opt.onShare && e.opt.onShare(), 
    !1) : void 0;
}, exports.recordShareEve = function(i, r, a) {
    if (r > 30 && r < 95 && a > 640 && a < 720) (0, t.back)(i), !!i.opt.onClose && i.opt.onClose(); else if (r > 259 && r < 306 && a > 640 && a < 720) {
        var g = e(i);
        !!i.opt.onSave && i.opt.onSave(g);
    } else r > 336 && r < 383 && a > 640 && a < 720 && !!i.opt.onShare && i.opt.onShare();
};

var t = require("./base");