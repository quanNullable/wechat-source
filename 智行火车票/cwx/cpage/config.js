var e = require("../ext/global.js"), n = {
    platform: "",
    clientInfo: "",
    partner: "zhixing",
    channel: "wechat_flight",
    channel2: "zhixingwx",
    channel3: "zxWechat",
    channel4: "ZX",
    channel5: "zhixingwx",
    wxPlatform: "wxapp",
    init: function() {
        e.CPage.use("Navigator"), e.CPage.use("UBT"), wx.getSystemInfo({
            success: function(e) {
                n.platform = e.platform, n.clientInfo = e.platform + "|" + e.model + "|" + e.system + "|" + e.version + "|" + e.language;
            }
        });
    },
    ubtDebug: !1
};

n.isTieyou = "tieyou" == n.partner, n.partnerCN = n.isTieyou ? "铁友" : "智行", module.exports = n;