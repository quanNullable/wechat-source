function o(o, e) {
    if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function o(o, e) {
        for (var n = 0; n < e.length; n++) {
            var t = e[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(o, t.key, t);
        }
    }
    return function(e, n, t) {
        return n && o(e.prototype, n), t && o(e, t), e;
    };
}(), n = function() {
    function n(e) {
        o(this, n), this.game = e;
    }
    return e(n, [ {
        key: "init",
        value: function() {}
    }, {
        key: "showIdentifyModeErr",
        value: function(o) {
            this.showModal(o);
        }
    }, {
        key: "showNoSession",
        value: function() {
            this.showModal();
        }
    }, {
        key: "showGetPkIdFail",
        value: function() {
            this.showModal();
        }
    }, {
        key: "showGroupShareFail",
        value: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "网络异常,点击确定回到游戏";
            this.showModal(o);
        }
    }, {
        key: "showGoToBattleFail",
        value: function() {
            this.showModal();
        }
    }, {
        key: "showUploadPkScoreFail",
        value: function() {
            this.showModal("数据上传失败");
        }
    }, {
        key: "showShareObserveCardFail",
        value: function(o) {
            this.showModal(o);
        }
    }, {
        key: "showObserveStateFail",
        value: function() {
            this.showModal("服务器异常");
        }
    }, {
        key: "showModal",
        value: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "网络异常,点击确定回到游戏";
            wx.showModal({
                title: "提示",
                content: o,
                showCancel: !1
            });
        }
    }, {
        key: "showServeConfigForbiddenObserveMode",
        value: function() {
            this.showModal("当前围观人数过多，请稍后再试");
        }
    }, {
        key: "showServeConfigForbiddenGroupShare",
        value: function() {
            this.showModal("查看群排行人数过多，请稍后再试");
        }
    }, {
        key: "showSocketCloseErr",
        value: function() {}
    }, {
        key: "showJoinRelayFail",
        value: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            this.showModal("加入游戏失败(" + o + ")，请检查网络后重试");
        }
    }, {
        key: "showVersionMismatching",
        value: function() {
            this.showModal("加入游戏失败,游戏版本不一致");
        }
    }, {
        key: "showJoinRelayFail2",
        value: function() {
            this.showModal("网络繁忙，请稍后再试");
        }
    }, {
        key: "showJoinNextRoomFail",
        value: function() {
            this.showModal("获取房间信息失败，请稍后再试");
        }
    }, {
        key: "showSyncopErr",
        value: function() {}
    } ]), n;
}();

exports.default = n;