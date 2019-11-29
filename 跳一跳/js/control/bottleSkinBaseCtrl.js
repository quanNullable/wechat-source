function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), o = e(require("../store/storage")), l = require("../util/util"), r = e(require("../network/network")), u = function() {
    function e() {
        t(this, e);
    }
    return i(e, null, [ {
        key: "getBottleSkinResource",
        value: function(t) {
            return new Promise(function(n, i) {
                var l = o.default.getCanUseBottleSkinIdList(), r = o.default.getSkinResources(), u = o.default.getBottleSkinData(t);
                u && l.includes(t) ? void 0 !== r[t] ? n(r[t]) : ("string" == typeof u.property && (u.property = JSON.parse(u.property)), 
                e.downloadBottleSkin(u.property, u.id).then(function(e) {
                    u.property = e, r[t] = u, o.default.setSkinResources(r), n(u);
                }, function(e) {
                    i();
                })) : i();
            });
        }
    }, {
        key: "getBottleSkinResourceBySkinData",
        value: function(t) {
            return new Promise(function(n, i) {
                var l = o.default.getSkinResources();
                t && t.id ? void 0 !== l[t.id] ? n(l[t.id]) : ("string" == typeof t.property && (t.property = JSON.parse(t.property)), 
                e.downloadBottleSkin(t.property, t.id).then(function(e) {
                    t.property = e, l[t.id] = t, o.default.setSkinResources(l), n(t);
                }, function() {
                    i();
                })) : i();
            });
        }
    }, {
        key: "downloadBottleSkin",
        value: function(e, t) {
            function i(e) {
                return new Promise(function(t, n) {
                    wx.downloadFile({
                        url: e,
                        success: function(e) {
                            t(e.tempFilePath);
                        },
                        fail: function(e) {
                            n(e);
                        }
                    });
                });
            }
            function o(e, t) {
                var n = "bottleSkin/" + t;
                return new Promise(function(t, i) {
                    l.Util.saveFile({
                        tempFilePath: e,
                        filePath: n,
                        success: function(e) {
                            t(wx.env.USER_DATA_PATH + "/" + n);
                        },
                        fail: function(e) {
                            i();
                        }
                    });
                });
            }
            return new Promise(function(l, r) {
                if ("object" == (void 0 === e ? "undefined" : n(e))) {
                    var u = Object.assign(e);
                    if (Array.isArray(e.images) && e.images.length > 0) {
                        var a = [], c = [];
                        e.images.forEach(function(e) {
                            a.push(i(e));
                        }), Promise.all(a).then(function(e) {
                            e.forEach(function(e, n) {
                                c.push(o(e, "bottle_" + t + "_" + n));
                            }), Promise.all(c).then(function(e) {
                                u.images = e, l(u);
                            }, function(e) {
                                r();
                            });
                        }, function(e) {
                            r();
                        });
                    } else l(e);
                } else r();
            });
        }
    }, {
        key: "selectAndDownloadBottleSkin",
        value: function(t) {
            e.getBottleSkinResource(t.id).then(function() {
                o.default.setSelectBottleSkinId(t.id);
            }, function() {
                wx.showToast({
                    title: "下载皮肤失败"
                });
            });
        }
    }, {
        key: "getSelectedBottleSkinResource",
        value: function() {
            return new Promise(function(t, n) {
                var i = e.getSelectedSkinId();
                e.getBottleSkinResource(i).then(function(e) {
                    t(e);
                }, n);
            });
        }
    }, {
        key: "getSelectedBottleSkinResourceSync",
        value: function() {
            var t = e.getSelectedSkinId(), n = o.default.getCanUseBottleSkinIdList(), i = o.default.getSkinResources();
            if (!t) return !1;
            if (n.includes(t) && void 0 !== i[t]) {
                if (e.checkSkinExpire(t)) return i[t];
                o.default.setSelectBottleSkinId(0);
            }
        }
    }, {
        key: "getSelectedBottleSkinDisplayInfoSync",
        value: function() {
            var e = o.default.getSelectBottleSkinId(), t = o.default.getBottleSkinShopList() || [];
            if (e && t.length > 0) {
                var n = t.find(function(t) {
                    return t.id == e;
                });
                return !(!n || !n.display_info) && n.display_info;
            }
            return !1;
        }
    }, {
        key: "getSelectedBottleSkinDataSync",
        value: function(e) {
            var t = o.default.getBottleSkinShopList() || [];
            if (e && t.length > 0) {
                var n = t.find(function(t) {
                    return t.id == e;
                });
                return n || !1;
            }
            return !1;
        }
    }, {
        key: "checkSkinExpire",
        value: function(t) {
            var n = o.default.getBottleSkinShopList(), i = Math.floor(Date.now() / 1e3), l = n.find(function(e) {
                return e.id == t;
            });
            return !!l && (l.expire_time > i || 0 === l.expire_time || (e.setRankDataTolocalStorage({}), 
            !1));
        }
    }, {
        key: "getSelectedSkinId",
        value: function() {
            var t = o.default.getSelectBottleSkinId();
            return e.checkSkinExpire(t) ? t : (o.default.setSelectBottleSkinId(0), 0);
        }
    }, {
        key: "updateSkinExpire",
        value: function(e, t) {
            var n = o.default.getBottleSkinShopList() || [], i = Math.floor(Date.now() / 1e3), l = o.default.getCanUseBottleSkinIdList(), r = n.find(function(t) {
                return t.id == e;
            });
            r && (r.expire_time = t, t > i || 0 === t ? (r.use_status = 1, l.includes(e) || l.push(e)) : (r.use_status = 0, 
            l.includes(e) && (l = l.filter(function(t) {
                return t != e;
            }))), o.default.setCanUseBottleSkinIdList(l));
        }
    }, {
        key: "setRankDataTolocalStorage",
        value: function(t) {
            try {
                var n = Object.assign({}, o.default.getMyUserInfo() || {}), i = {};
                if (console.log("-----------------------------"), console.log(n), console.log(t), 
                t) {
                    t.playback_id && (i.playback_id = t.playback_id);
                    var l = e.getSelectedBottleSkinDisplayInfoSync();
                    i.bottle_skin = !!l && l.poster_min, o.default.saveMyUserInfo(Object.assign(n, i));
                }
            } catch (e) {
                console.log("-----------------------------"), console.log("-----------------------------"), 
                console.log("-----------------------------"), console.log(e);
            }
        }
    }, {
        key: "updateSkinExpireByPropertyList",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = (arguments[1], 
            {});
            t.map(function(e) {
                (n[e.item_id] && n[e.item_id] < e.expire_time || !n[e.item_id] || 0 === e.expire_time) && (n[e.item_id] = e.expire_time);
            });
            for (var i in n) e.updateSkinExpire(i, n[i]);
        }
    }, {
        key: "syncSelectBottleSkin",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n = e.getSelectedSkinId();
            (o.default.getSyncBottleSkinFailFlag() || t) && r.default.syncSelectedBottleSkin(n).then(function() {
                o.default.setSyncBottleSkinFailFlag(0);
            }, function() {
                o.default.setSyncBottleSkinFailFlag(1);
            });
        }
    }, {
        key: "getBottleSkinShopData",
        value: function() {
            return r.default.getBottleSkinShopData().then(function(e) {
                return o.default.setCanUseBottleSkinIdList(e.canUseSkinIdList), o.default.setBottleSkinShopList(e.bottleSkinShopList), 
                Promise.resolve(e);
            }, function(e) {
                return Promise.reject(e);
            });
        }
    } ]), e;
}();

exports.default = u;