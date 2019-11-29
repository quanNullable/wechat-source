function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.shareGroupRank = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
    wx.getNetworkType({
        success: function(i) {
            "none" !== i.networkType ? wx.updateShareMenu({
                withShareTicket: !0,
                success: function() {
                    wx.shareAppMessage({
                        title: "群雄逐鹿，看看你第几",
                        query: "mode=groupShare",
                        imageUrl: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBrAavqMRykpovYxSA9RRTwIjde6a68ZCczLMBBd8eSoOyTRyp2Codc5IObdeqZVFyw/0?wx_fmt=png",
                        success: function(i) {
                            e(!0, 1);
                        },
                        fail: function(i) {
                            e(!1);
                        }
                    });
                }
            }) : (e(!1), wx.showModal({
                title: "提示",
                content: "网络状态异常",
                showCancel: !1
            }));
        }
    });
}, exports.shareBattle = function(e, i) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
    s.getShareCard({
        score: i,
        type: "shareBattle"
    }, function(i) {
        var n = "";
        try {
            n = i.toTempFilePathSync();
        } catch (e) {
            console.log("shareBattle: ", e);
        }
        e && wx.updateShareMenu({
            withShareTicket: !0,
            success: function() {
                wx.shareAppMessage({
                    title: "小试牛刀，不服来战",
                    query: "mode=battle&pkId=" + e,
                    imageUrl: n,
                    success: function(i) {
                        t(!0, 1), console.log("mode=battle&pkId=" + e);
                    },
                    fail: function() {
                        t(!1);
                    }
                });
            },
            fail: function(e) {
                t(!1);
            }
        });
    });
}, exports.shareObserve = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.bottle_skin_id, s = void 0 === n ? "" : n, c = e.skin_id, r = void 0 === c ? "" : c, o = e.skin_sn, u = void 0 === o ? "" : o, p = e.cb, h = void 0 === p ? function() {} : p, l = t.default.getMyUserInfo();
    l || (l = {
        nickname: "",
        headimg: ""
    });
    var d = "gameId=" + i.default.gameId + "&mode=observe&version=" + a.VERSION + "&skin_id=" + r + "&skin_sn=" + u + "&bottle_skin_id=" + s + "&nickName=" + l.nickname + "&headimg=" + l.headimg;
    console.log(d), wx.updateShareMenu({
        withShareTicket: !0,
        success: function() {
            wx.shareAppMessage({
                title: "即刻起跳，速来围观",
                query: d,
                imageUrl: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBiaBtXsYrvBsYBdBdDtKE7y638J84JKPckcOtFMp4QunIWFGc7pibQLm13s9fKZ9ic9ew/0?wx_fmt=png",
                success: function(e) {
                    h(!0, 1);
                },
                fail: function(e) {
                    h(!1);
                }
            });
        },
        fail: function() {
            h(!1);
        }
    });
}, exports.pureShare = function(e, i) {
    s.getShareCard({
        type: e,
        score: i
    }, function(i) {
        var t = "";
        try {
            t = i.toTempFilePathSync();
        } catch (e) {
            console.log("pureShare: ", e);
        }
        var n = "";
        n = "rank" == e ? "跳遍天下，已无敌手" : "不好意思，又破纪录了", wx.shareAppMessage({
            title: n,
            imageUrl: t,
            success: function(e) {},
            fail: function(e) {}
        });
    });
}, exports.ShareRelayCard = function(e) {
    var i = e.room_id, t = e.router_id, n = e.version, a = e.cb;
    if (i && t && n) {
        var s = "room_id=" + i + "&mode=relay&router_id=" + encodeURIComponent(t) + "&version=" + n;
        console.log(s), wx.updateShareMenu({
            withShareTicket: !0,
            success: function() {
                wx.shareAppMessage({
                    title: "房已开好，就差你了！",
                    query: s,
                    imageUrl: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJN1hYNSmzE0JHB0FicpvibX9tgX8mb3MxbrtpgVxR9ZJaez7Uys56ckP57EU9ib1365Ng/0?wx_fmt=png",
                    success: function(e) {
                        var i = "";
                        e.shareTickets && (i = e.shareTickets[0]), wx.getShareInfo({
                            shareTicket: i,
                            success: function(e) {
                                a(s, e.rawData);
                            }
                        });
                    },
                    fail: function(e) {}
                });
            },
            fail: function() {
                a(!1);
            }
        });
    } else console.log("shareRelay", i, t, n);
}, exports.ShareReviewCard = function(e) {
    var i = e.open_playback_id, t = e.headimg, n = e.cb;
    e.playback_poster;
    wx.updateShareMenu({
        withShareTicket: !0,
        success: function() {
            wx.shareAppMessage({
                title: "快来看看我的精彩回放！",
                query: "mode=reviewPage&open_playback_id=" + i + "&headimg=" + t,
                imageUrl: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJD1yfAwp8hgmBhTVR0ZoYKwhfUCTo3oOUpibmSNogexQs3IvzE5kTnfT2PR53VwR6tw/0?wx_fmt=png",
                success: function(e) {
                    n(!0, 1);
                },
                fail: function(e) {
                    n(!1);
                }
            });
        }
    });
}, exports.shareGiftCard = function(e) {
    wx.shareAppMessage({
        title: "领取皮肤",
        query: "mode=getGiftPage&id=" + e,
        imageUrl: "http://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNTTiaKet81gQJF2kbzlGb8r41QlLdiacISXtmPusJQKVhWuK2MuCaWUgroa8iaruibAI6XGR0iaheoHEibA/0?wx_fmt=jpeg",
        success: function() {}
    });
}, exports.shareSkin = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    wx.shareAppMessage({
        title: "我获得了新皮肤",
        imageUrl: e || "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJFHiaWIxfyWrEDAehVqPgyVM4pia5WLiaH3pqhlibn3N8rJibl9LMibEZbSJX6MdjFnHxMdg/0?wx_fmt=png",
        success: function() {}
    });
};

var i = e(require("./store/session")), t = e(require("./store/storage")), n = e(require("./pages/shareCard")), a = require("./config"), s = new n.default({});