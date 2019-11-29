Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.forceUpdate = void 0, exports.compareMyVersion = function(e) {
    return e === n.VERSION ? 0 : e > n.VERSION ? 1 : e < n.VERSION ? -1 : void 0;
};

var n = require("./../config"), e = function(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}(require("../network/network"));

exports.forceUpdate = function(n, o) {
    function t() {
        return new Promise(function(n, e) {
            var o = wx.getUpdateManager(), t = function() {
                return new Promise(function(n, e) {
                    o.onUpdateReady(function() {
                        n();
                    }), o.onUpdateFailed(function() {
                        e();
                    });
                });
            };
            Promise.race([ new Promise(function(n, e) {
                wx.showLoading({
                    content: "正在下载",
                    mask: !0
                });
            }), Promise.race([ new Promise(function(n, e) {
                setTimeout(function() {
                    e();
                }, 1e3);
            }), new Promise(function(n, e) {
                o.onCheckForUpdate(function(o) {
                    o.hasUpdate ? n() : e();
                });
            }) ]).then(function() {
                return t();
            }, function() {
                return Promise.reject();
            }) ]).then(function() {
                o.applyUpdate(), n();
            }, function() {
                e();
            });
        });
    }
    if (void 0 === wx.getUpdateManager) n(); else {
        var r = function o() {
            t().then(function() {}, function() {
                wx.hideLoading(), wx.showModal({
                    content: "请在检查网络状况后重试",
                    confirmText: "重试",
                    cancelText: "取消",
                    success: function(e) {
                        e.confirm ? o() : n();
                    },
                    fail: function() {
                        n();
                    }
                }), e.default.sendServerError(10);
            });
        };
        wx.showModal({
            content: o || "点击确定，进行版本更新后重试",
            success: function(e) {
                e.confirm ? r() : n();
            },
            fail: function() {
                n();
            }
        });
    }
};