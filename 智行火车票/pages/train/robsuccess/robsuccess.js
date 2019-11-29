var t = require("../../../cwx/cwx"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../common/util")), n = t.cwx.train, a = "http://images3.c-ctrip.com/", i = {
    ty: {
        title: "铁友",
        link_icon: a + "train/tieyou/tyzx/ty_icon.png",
        link_qr: a + "zt/share/QRcode-ty.png",
        link_btn: a + "train/tieyou/tyzx/ty_dl.png",
        topImg: a + "/zt/share/ty.png",
        share_icon: a + "tieyou/201612/share_ty.png",
        doc_title: "铁友火车票"
    },
    zx: {
        title: "智行",
        link_icon: a + "train/tieyou/tyzx/zx_icon.png",
        link_qr: a + "zt/share/QRcode-zx.png",
        link_btn: a + "train/tieyou/tyzx/ty_dl.png",
        topImg: a + "zt/share/zx.png",
        share_icon: a + "tieyou/201612/share_zx.png",
        doc_title: "智行火车票"
    },
    zs: {
        title: "助手",
        link_icon: a + "train/tieyou/tyzx/zx_icon.png",
        link_qr: a + "zt/share/QRcode-zs.png",
        link_btn: a + "train/tieyou/tyzx/ty_dl.png",
        topImg: a + "zt/share/zs.png",
        share_icon: a + "tieyou/201612/share_zs.jpg",
        doc_title: "订票助手"
    }
}, r = null;

(0, t.CPage)({
    data: {
        grabInfo: {}
    },
    onLoad: function(t) {
        var a = n.query = {};
        a.jlrate = t.jlrate || 80, a.jlprice = t.jlprice || 30, a.hard = t.hard || 5, a.fname = t.fname || "上海", 
        a.tname = t.tname || "北京", a.ddate = t.ddate || "2017-05-01", a.ftype = t.ftype || "zx";
        for (var o = a.hard, c = new Array(5), l = 1; l <= o; l++) c[l - 1] = !0;
        r = i[a.ftype], this.setData({
            grabInfo: {
                qRate: a.jlrate + "%",
                qPrice: a.jlprice,
                stars: c,
                from: a.fname,
                to: a.tname,
                ddate: a.ddate,
                cInfo: r
            }
        }), e.default.setTitle(r.doc_title);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    goGrap: function() {
        wx.switchTab({
            url: "/pages/train/index/index",
            success: function() {
                console.log(arguments);
            },
            fail: function() {
                console.log(arguments);
            }
        });
    },
    onShareAppMessage: function() {
        var t = n.query, e = "jlrate=" + t.jlrate + "&jlprice=" + t.jlprice + "&hard=" + t.hard + "&fname=" + t.fname + "&tname=" + t.tname + "&ftype=" + t.ftype + "&ddate=" + t.ddate;
        return {
            bu: "train",
            title: r.doc_title + "助我春日出行",
            desc: "预订安全靠谱，抢票快人一步！【" + r.doc_title + "】",
            path: "pages/train/robsuccess/robsuccess?" + e
        };
    }
});