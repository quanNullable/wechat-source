function e(e) {
    e.opt.verify_step = e.opt.verify_step || 0;
    var o = e.opt.verify_step;
    0 == o ? ((0, n.createPlane)(e), (0, n.routeCanvas)(e, "verify"), t(e), e.opt.verify_step++) : 1 == o ? (i(e), 
    e.opt.verify_step++) : 2 == o ? a(e) : 3 == o && p(e);
}

function t(e) {
    e.imgid.bg++;
    var t = e.context.bg;
    t.clearRect(0, 0, n.WIDTH, n.HEIGHT), t.fillStyle = "#555", t.fillRect(0, 0, n.WIDTH, n.HEIGHT), 
    (0, n.drawText)({
        self: e,
        t: "游戏申诉",
        size: 30,
        pos: [ 207, 153 ]
    }), (0, n.drawText)({
        self: e,
        t: "我们需要验证你的玩家身份",
        size: 16,
        pos: [ 207, 496 ],
        color: "rgba(255,255,255,0.4)"
    }), (0, n.drawText)({
        self: e,
        t: "将会有专人与你联系",
        size: 16,
        pos: [ 207, 518 ],
        color: "rgba(255,255,255,0.4)"
    }), (0, n.drawText)({
        self: e,
        t: "第一步：请提交一份自拍照片",
        size: 20,
        pos: [ 207, 450 ],
        color: "white"
    }), (0, n.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VeiaWDZj6rCViaLsuSCWtnyo1mvNqBR05HxPZ5oXTzl0ODXjWiakTvq6yw/0?wx_fmt=png",
        pos: [ 207, 329, 139, 139 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, n.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
        pos: [ 207, 621, 138, 44 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, n.drawText)({
        self: e,
        t: "提交自拍",
        size: 15,
        pos: [ 207, 621 ]
    }), (0, n.drawText)({
        self: e,
        t: "退出申诉",
        size: 17,
        pos: [ 197, 690 ]
    }), (0, n.drawImageCenter)({
        self: e,
        src: "res/r_arr.png",
        pos: [ 247, 690, 6.5, 12.5 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, n.updatePlane)({
        self: e,
        type: "bg"
    });
}

function i(e) {
    wx.chooseImage({
        count: 1,
        sizeType: [ "original", "compressed" ],
        sourceType: [ "album", "camera" ],
        success: function(t) {
            e.opt.path = t.tempFilePaths[0], o(e);
        },
        fail: function(t) {
            e.opt.verify_step = 0;
        }
    });
}

function o(e) {
    var t = e.context.bg;
    t.clearRect(0, 0, n.WIDTH, n.HEIGHT), t.fillStyle = "#555", t.fillRect(0, 0, n.WIDTH, n.HEIGHT), 
    (0, n.drawText)({
        self: e,
        t: "拍摄完成",
        size: 30,
        pos: [ 207, 117 ]
    }), (0, n.drawText)({
        self: e,
        t: "照片已存档，仅供身份识别",
        size: 14,
        pos: [ 207, 158 ]
    }), (0, n.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
        pos: [ 207, 621, 138, 44 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, n.drawText)({
        self: e,
        t: "下一步",
        size: 15,
        pos: [ 207, 621 ]
    }), (0, n.drawText)({
        self: e,
        t: "退出申诉",
        size: 17,
        pos: [ 197, 690 ]
    }), (0, n.drawImageCenter)({
        self: e,
        src: "res/r_arr.png",
        pos: [ 247, 690, 6.5, 12.5 ],
        type: "bg",
        imgid: e.imgid.bg
    });
    var i = new Image();
    i.onload = function() {
        console.log(i.width, i.height);
        var t = 240, o = 320;
        i.width / i.height > .75 ? o = i.height / i.width * t : t = i.width / i.height * o, 
        console.log(t, o), (0, n.drawImageCenter)({
            self: e,
            src: e.opt.path,
            pos: [ 207, 388, t, o ],
            type: "bg",
            imgid: e.imgid.bg
        });
    }, i.src = e.opt.path, (0, n.updatePlane)({
        self: e,
        type: "bg"
    });
}

function a(e) {
    e.opt.loading || (e.opt.loading = !0, wx.showLoading({
        title: "上传中..."
    }), (0, c.upLoadVerifyPic)({
        path: e.opt.path,
        succ: function(t) {
            e.opt.fileid = t, e.opt.verify_step++, s(e);
        },
        complete: function() {
            e.opt.loading = !1, wx.hideLoading();
        }
    }));
}

function s(e) {
    var t = e.context.bg;
    t.clearRect(0, 0, n.WIDTH, n.HEIGHT), t.fillStyle = "#555", t.fillRect(0, 0, n.WIDTH, n.HEIGHT), 
    t.fillStyle = "#888", t.fillRect(0, (0, n.cy)(206), (0, n.cwh)(414), (0, n.cwh)(215)), 
    (0, n.drawText)({
        self: e,
        t: "第二步：请填写联系方式",
        size: 20,
        pos: [ 207, 117 ]
    }), (0, n.drawLine)(30, 299, 384, 299, "rgba(255,255,255,0.4)", .5, t), (0, n.drawLine)(30, 364, 384, 364, "rgba(255,255,255,0.4)", .5, t), 
    (0, n.drawText)({
        self: e,
        t: "姓名",
        align: "left",
        size: 17,
        pos: [ 30, 277 ],
        color: "rgba(255,255,255,1)"
    }), (0, n.drawText)({
        self: e,
        t: "手机号码",
        align: "left",
        size: 17,
        pos: [ 30, 342 ],
        color: "rgba(255,255,255,1)"
    }), (0, n.drawText)({
        self: e,
        t: "请填写",
        align: "left",
        size: 17,
        pos: [ 138, 277 ],
        color: "rgba(255,255,255,0.3)"
    }), (0, n.drawText)({
        self: e,
        t: "请填写",
        align: "left",
        size: 17,
        pos: [ 138, 342 ],
        color: "rgba(255,255,255,0.3)"
    }), (0, n.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
        pos: [ 207, 621, 138, 44 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, n.drawText)({
        self: e,
        t: "下一步",
        size: 15,
        pos: [ 207, 621 ]
    }), (0, n.drawText)({
        self: e,
        t: "退出申诉",
        size: 17,
        pos: [ 197, 690 ]
    }), (0, n.drawImageCenter)({
        self: e,
        src: "res/r_arr.png",
        pos: [ 247, 690, 6.5, 12.5 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, n.updatePlane)({
        self: e,
        type: "bg"
    });
}

function r(e, t) {
    console.log(e.opt.showkey), e.opt.showkey || (e.opt.showkey = !0, wx.showKeyboard({
        defaultValue: e.opt[t] || "",
        maxLength: 20,
        multiple: !1,
        confirmType: "done",
        complete: function() {}
    }), wx.onKeyboardComplete(function(i) {
        e.opt.showkey = !1, e.opt[t] = i.value;
        var o = e.context.bg;
        o.fillStyle = "#888", "name" == t ? (o.fillRect((0, n.cx)(135), (0, n.cy)(262), (0, 
        n.cwh)(250), (0, n.cwh)(30)), (0, n.drawText)({
            self: e,
            t: (0, n.cname)(e.opt.name || "请填写", 20),
            align: "left",
            size: 17,
            pos: [ 138, 277 ],
            color: e.opt.name ? "#fff" : "rgba(255,255,255,0.3)"
        })) : (o.fillRect((0, n.cx)(135), (0, n.cy)(327), (0, n.cwh)(250), (0, n.cwh)(30)), 
        (0, n.drawText)({
            self: e,
            t: (0, n.cname)(e.opt.mobile || "请填写", 20),
            align: "left",
            size: 17,
            pos: [ 138, 342 ],
            color: e.opt.mobile ? "#fff" : "rgba(255,255,255,0.3)"
        })), (0, n.updatePlane)({
            self: e,
            type: "bg"
        }), wx.offKeyboardComplete();
    }));
}

function p(e) {
    e.opt.mobile && e.opt.name ? e.opt.loading || (e.opt.loading = !0, (0, c.upLoadVerifySubmit)({
        name: e.opt.name,
        mobile: e.opt.mobile,
        fileid: e.opt.fileid,
        is_async: e.lastCanvasType == n.CANVASTYPE.start ? 1 : 0,
        succ: function() {
            l(e), e.opt.verify_step++;
        },
        complete: function() {
            e.opt.loading = !1;
        }
    })) : wx.showToast({
        title: "请填写完整信息",
        icon: "none"
    });
}

function l(e) {
    var t = e.context.bg;
    t.clearRect(0, 0, n.WIDTH, n.HEIGHT), t.fillStyle = "#555", t.fillRect(0, 0, n.WIDTH, n.HEIGHT), 
    (0, n.drawText)({
        self: e,
        t: "提交成功",
        size: 30,
        pos: [ 207, 237 ]
    }), (0, n.drawText)({
        self: e,
        t: "请耐心等待客服与你联系",
        size: 14,
        pos: [ 207, 278 ],
        color: "rgba(255,255,255,0.4)"
    }), (0, n.drawText)({
        self: e,
        t: "如有疑问，可关注“微信小游戏”官方公众号进行咨询",
        size: 14,
        pos: [ 207, 298 ],
        color: "rgba(255,255,255,0.4)"
    }), (0, n.drawImageCenter)({
        self: e,
        src: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
        pos: [ 207, 621, 138, 44 ],
        type: "bg",
        imgid: e.imgid.bg
    }), (0, n.drawText)({
        self: e,
        t: "完成",
        size: 15,
        pos: [ 207, 621 ]
    }), (0, n.updatePlane)({
        self: e,
        type: "bg"
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.routeVerify = e, exports.clickVerifyForm = r, exports.verifyEve = function(t, i, o) {
    return i > 130 && i < 280 && o > 607 && o < 640 ? (t.opt.verify_step >= 4 ? (t.opt.banType = 2, 
    t.lastCanvasType == n.CANVASTYPE.gameOver ? t.showGameOverPage(t.opt) : t.showStartPage(t.opt)) : e(t), 
    !1) : i > 130 && i < 280 && o > 670 && o < 720 ? (t.opt.verify_step = 0, back(this) == n.CANVASTYPE.gameOver ? t.showGameOverPage(t.opt) : t.showStartPage(t.opt), 
    !1) : 3 == t.opt.verify_step && i > 130 && i < 370 && o > 240 && o < 300 ? (r(t, "name"), 
    !1) : 3 == t.opt.verify_step && i > 130 && i < 370 && o > 300 && o < 360 ? (r(t, "mobile"), 
    !1) : void 0;
};

var n = require("./base"), c = require("../../network/network");