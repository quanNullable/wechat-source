Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkUpdate = void 0;

var e = require("./../config"), o = void 0;

"function" == typeof wx.getUpdateManager && (o = wx.getUpdateManager());

exports.checkUpdate = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    arguments[1];
    return new Promise(function(a, n) {
        function d() {
            t == e.VERSION ? a() : n();
        }
        if (0 == t && n(), o) try {
            console.log("can use updateManager"), o.onCheckForUpdate(function(e) {
                console.log("onCheckForUpdate"), e.hasUpdate ? (console.log("hasUpdate"), wx.showLoading({
                    mask: !0,
                    title: "正在努力更新中～"
                })) : (console.log("dontHasUpdate"), n());
            }), o.onUpdateReady(function() {
                console.log("updateReady"), wx.hideLoading(), o.applyUpdate();
            }), o.onUpdateFailed(function() {
                console.log("updateFail"), wx.hideLoading(), n();
            });
        } catch (e) {
            d();
        } else d();
    });
};