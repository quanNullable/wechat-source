function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "", d = arguments[4], r = arguments[5];
    this.dstation = t, this.dCDate = e instanceof o.default ? e : o.default.parse(e), 
    this.astation = a, this.aCDate = s instanceof o.default ? s : o.default.parse(s), 
    this.price = parseInt(d), this.dTime = this.dCDate.format("H:i"), this.aTime = this.aCDate.format("H:i");
    var c = i.default.getDiffDHS(this.dCDate.valueOf(), this.aCDate.valueOf());
    this.takeDays = c.days, this.takeHours = c.hours, this.takeSeconds = c.seconds, 
    this.isTrain = r == n.TRAIN, this.isFlight = r == n.FLIGHT, this.isBus = r == n.BUS, 
    this.transType = r;
}

var a = require("../../../cwx/cwx"), i = t(require("../common/util")), o = t(require("../common/cDate")), n = {
    MIX: 0,
    TRAIN: 1,
    FLIGHT: 2,
    BUS: 3
}, s = {
    pageId: a.cwx.config.isTieyou ? "10320667200" : "10320667168",
    data: {
        isTieyou: a.cwx.config.isTieyou,
        partnerCN: a.cwx.config.partnerCN,
        transferInfo: [],
        overallTripInfo: null
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: this.data.partnerCN + "火车票 抢票神器"
        });
        var a = decodeURIComponent(t.dstation1), i = decodeURIComponent(t.astation1), o = decodeURIComponent(t.dtimestamp1), s = decodeURIComponent(t.atimestamp1), d = t.price1, r = t.transtype1, c = decodeURIComponent(t.dstation2), p = decodeURIComponent(t.astation2), u = decodeURIComponent(t.dtimestamp2), f = decodeURIComponent(t.atimestamp2), h = t.price2, l = t.transtype2, m = [];
        m.push(new e(a, o, i, s, d, r)), m.push(new e(c, u, p, f, h, l));
        var C = new e(m[0].dstation, m[0].dCDate, m[1].astation, m[1].aCDate, m[0].price + m[1].price, n.MIX);
        this.setData({
            transferInfo: m,
            overallTripInfo: C
        });
    },
    goHome: function() {
        a.cwx.switchTab({
            url: "/pages/train/index/index"
        });
    },
    download: function() {
        var t = this.data.partnerCN, e = t + "火车票";
        a.cwx.setClipboardData ? a.cwx.setClipboardData({
            data: e,
            success: function(e) {
                i.default.showModal({
                    title: " ",
                    m: "已为您复制“" + t + "火车票”，即刻前往应用市场搜索下载" + t + "app",
                    confirmText: "好的"
                });
            }
        }) : i.default.showModal({
            m: "亲爱的用户，由于您的微信版本过低，无法使用复制粘贴功能，请尽快前往应用商店更新微信"
        });
    }
};

(0, a.CPage)(s);