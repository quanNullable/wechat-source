function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, n = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), o = t(require("../network/network")), i = t(require("../store/storage")), s = function() {
    function t(a) {
        var n = a.game, o = a.onReturn, i = a.onGoSkin, s = a.onGoProfile, r = a.onGoMyProfile;
        e(this, t), this.game = n, this.onReturn = o, this.onGoSkin = i, this.onGoProfile = s, 
        this.onGoMyProfile = r, this.page_index = 1, this.page_count = 100, this.oldData = [];
    }
    return n(t, [ {
        key: "init",
        value: function() {
            var t = this, e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            if (this.arriveLastPage = !1, e) wx.showLoading({
                mask: !0
            }), this.page_index = 1, o.default.requestMsg({
                type: 1,
                page_index: 1,
                page_count: this.page_count
            }).then(function(e) {
                if (wx.hideLoading(), !e || !e.msg_list || !e.msg_list.length) return t.arriveLastPage = !0, 
                t.oldData = [], void t.showPage([]);
                e.msg_list.length < t.page_count && (t.arriveLastPage = !0);
                var a = t.handleServerData(e);
                t.oldData = a, t.showPage(a);
            }, function(t) {
                console.log("request fail", t), wx.hideLoading(), wx.showToast({
                    icon: "none",
                    mask: !1,
                    title: "网络繁忙",
                    duration: 800
                });
            }); else {
                var a = this.oldData || [];
                this.showPage(a);
            }
        }
    }, {
        key: "handleServerData",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                msg_list: []
            }, e = [];
            return t.msg_list && t.ctx_info ? (t.msg_list.forEach(function(t) {
                e.push(a({
                    timestamp: t.timestamp,
                    sub_type: t.body.sub_type
                }, t.body.base_info));
            }), this.ctx_info = t.ctx_info) : this.ctx_info = {}, e;
        }
    }, {
        key: "showPage",
        value: function(t) {
            var e = this;
            this.game.full2D.showMsgBox({
                msg_list: t,
                onReturn: function() {
                    e.onReturn();
                },
                onGoSkin: function() {
                    e.onGoSkin();
                },
                onGoProfile: function(t) {
                    e.onGoProfile(t);
                },
                onGoMyProfile: function() {
                    e.onGoMyProfile();
                },
                onGoMsgDetail5: function(t) {
                    e.showDetailPage(t);
                },
                onEnd: function() {
                    e.getNextPage();
                }
            });
        }
    }, {
        key: "showDetailPage",
        value: function(t) {
            var e = this;
            this.game.full2D.showMsgDetailType5(a({}, t, {
                onReturn: function() {
                    e.showPage(e.oldData);
                }
            }));
        }
    }, {
        key: "getOldData",
        value: function() {
            var t = [];
            if (Array.isArray(this.oldData)) t = this.oldData; else {
                var e = i.default.getMsgBoxData();
                e && e.datalist && (t = e.datalist);
            }
            return t;
        }
    }, {
        key: "saveOldData",
        value: function(t, e) {
            this.oldData = t, i.default.saveMsgBoxData({
                datalist: t,
                ctx_info: e
            });
        }
    }, {
        key: "getNextPage",
        value: function() {
            var t = this;
            this.arriveLastPage || (wx.showLoading({
                mask: !0
            }), o.default.requestMsg({
                type: 1,
                page_index: this.page_index + 1,
                page_count: this.page_count,
                ctx_info: this.ctx_info
            }).then(function(e) {
                if (wx.hideLoading(), e && e.msg_list && e.msg_list.length) {
                    t.page_index += 1, e.msg_list.length < t.page_count && (t.arriveLastPage = !0);
                    var a = t.handleServerData(e);
                    Array.isArray(t.oldData) && (t.oldData = t.oldData.concat(a)), t.game.full2D.updateMsgBox(a);
                } else t.arriveLastPage = !0;
            }, function() {
                wx.hideLoading(), wx.showToast({
                    icon: "none",
                    mask: !1,
                    title: "网络繁忙",
                    duration: 800
                });
            }));
        }
    }, {
        key: "destroy",
        value: function() {}
    } ]), t;
}();

exports.default = s;