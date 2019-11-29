var e = require("../../../cwx/cwx"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common/util"));

(0, e.CPage)({
    pageId: "10320663270",
    data: {
        oInfo: null,
        userInfo: null,
        mask: !1,
        isMe: !1,
        sentence: "",
        type: "",
        isOrderJL: !1,
        isOrderE: !1
    },
    onLoad: function(e) {
        var t = [ "跋山涉水，不远千里，只为与你相见", "最美不是下雨天，是与你一起坐过的列车", "最美的旅途就是，两张车票，两座城，我和你", "一个人的旅行，在路上遇见最真实的自己", "家，是我此次旅程唯一的理由" ], n = JSON.parse(e.oinfo), a = JSON.parse(e.userinfo), s = e.type, i = parseInt(e.sentenceidx) - 1, r = !1, c = !1;
        switch (s) {
          case "jl":
            c = !0;
            break;

          case "e":
            r = !0;
        }
        var o = !!e.isme, f = !!e.firsttime;
        if (this.setData({
            oInfo: n,
            userInfo: a,
            mask: f,
            isMe: o,
            type: s,
            isOrderJL: c,
            isOrderE: r,
            sentences: t
        }), this.changeSentence(i), f) try {
            this.invokeCallback();
        } catch (e) {}
    },
    buy: function() {
        e.cwx.switchTab({
            url: "/pages/train/index/index"
        });
    },
    hideMask: function() {
        this.setData({
            mask: !1
        });
    },
    onShareAppMessage: function() {
        var t = this, n = this.data.oInfo, a = this.data.userInfo, s = this.data.type, i = "/pages/train/friend/friend?oinfo=" + JSON.stringify(n) + "&userinfo=" + JSON.stringify(a) + "&type=" + s;
        return i += "&sentenceidx=" + this.data.sentences.indexOf(this.data.sentence), {
            title: "我购买了" + this.data.oInfo.DepartStation + " - " + this.data.oInfo.ArriveStation + "的车票",
            path: i,
            success: function(n) {
                t.ubtTrace(101013, {
                    page: e.cwx.config.partner + "friend"
                });
            }
        };
    },
    changeSentenceHandler: function() {
        this.changeSentence();
    },
    changeSentence: function(e) {
        var t = this.data.sentences, n = e || t.indexOf(this.data.sentence);
        n = (n + 1) % t.length, this.setData({
            sentence: t[n]
        });
    },
    share: function() {
        t.default.canIUse("button.open-type.share") || this.setData({
            mask: !0
        });
    }
});