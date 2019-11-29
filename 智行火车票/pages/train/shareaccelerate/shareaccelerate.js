function e(e) {
    var a = "";
    if (e.mid) a = decodeURIComponent(e.mid); else if (e.scene) {
        var t = decodeURIComponent(e.scene || ""), i = t.slice(0, 4);
        a = 32 === t.length ? t : 4001 == i ? t.substr(4) : t;
    }
    return a;
}

var a = require("../../../cwx/cwx"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common/util")), i = require("../common/model");

(0, a.CPage)({
    pageId: "10320663265",
    data: {
        isAccelerated: !1,
        accelerateNum: 0,
        successRate: 0,
        shareKey: "",
        toStation: "",
        monitorStatus: 0,
        isRobing: !1,
        isRobSuccess: !1,
        isRobFail: !1,
        isTieyou: !0,
        sharedUnionData: null
    },
    onLoad: function(t) {
        console.log("TRN shareaccelerate onLoad options begin:"), console.log(t), console.log("TRN shareaccelerate onLoad options end");
        var i = "tieyouwx" === a.cwx.config.channel2;
        this.setData({
            shareKey: e(t),
            isTieyou: i
        });
    },
    onShow: function() {
        this.getAccelerateInfo(), this.loadUnionData();
    },
    loadUnionData: function() {
        var e = this, t = void 0;
        a.cwx.mkt.getUnion(function(i) {
            i.allianceid && i.sid ? t = i : (t = e.data.isTieyou ? {
                allianceid: 653997,
                sid: 1181392
            } : {
                allianceid: 653998,
                sid: 1181382
            }, a.cwx.mkt.setUnion(t)), e.unionData = i;
        });
    },
    accelerate: function() {
        var e = this, n = {
            shareKey: this.data.shareKey,
            weixinId: a.cwx.user.openid
        };
        t.default.showLoading();
        (0, i.AccelerateModel)(n, function(a) {
            t.default.hideLoading(), e.getAccelerateInfo();
        }, function(e) {
            t.default.hideLoading();
        }, function() {});
    },
    buy: function() {
        wx.switchTab({
            url: "/pages/train/index/index"
        });
    },
    getAccelerateInfo: function() {
        var e = this, n = {
            shareKey: this.data.shareKey,
            weixinId: a.cwx.user.openid
        };
        t.default.showLoading(), (0, i.GetAccelerateInfoModel)(n, function(a) {
            if (t.default.hideLoading(), 0 == a.status) {
                var i = a.data, n = i.activeNum, o = void 0 === n ? 0 : n, s = i.activeFlag, c = i.toStation, d = i.monitorStatus;
                e.setDataHandler({
                    accelerateNum: o,
                    isAccelerated: s,
                    toStation: c,
                    monitorStatus: d
                });
            }
        }, function(e) {}, function() {});
    },
    setDataHandler: function(e) {
        e.accelerateNum >= 0 && (e.successRate = this.getSuccessRate(e.accelerateNum)), 
        1 == e.monitorStatus ? e.isRobSuccess = !0 : 2 == e.monitorStatus ? e.isRobFail = !0 : e.isRobing = !0, 
        this.setData(e);
    },
    getSuccessRate: function(e) {
        return (100 * (.5 + e / (20 + e) * .45)).toFixed(2);
    },
    onShareAppMessage: function() {
        var e = this.data.isTieyou ? {
            allianceid: 653997,
            sid: 1181387
        } : {
            allianceid: 653998,
            sid: 1181379
        };
        return {
            title: this.data.isTieyou ? "铁友火车票" : "智行火车票",
            path: "/pages/train/shareaccelerate/shareaccelerate?mid=" + this.data.shareKey + "&allianceid=" + e.allianceid + "&sid=" + e.sid
        };
    }
});