function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

function t(n) {
    if (Array.isArray(n)) {
        for (var t = 0, e = Array(n.length); t < n.length; t++) e[t] = n[t];
        return e;
    }
    return Array.from(n);
}

function e(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function n(n, t) {
        for (var e = 0; e < t.length; e++) {
            var o = t[e];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(n, o.key, o);
        }
    }
    return function(t, e, o) {
        return e && n(t.prototype, e), o && n(t, o), t;
    };
}(), i = require("./util/util"), s = require("./config"), l = n(require("./lib/mue/eventcenter")), r = n(require("./network/network"));

console.log("utildadsasdad", i.Util);

var c = {
    RESPONSEERROR: "返回码错了",
    REQUESTERROR: "wx.request fail"
}, a = function() {
    function n(t) {
        e(this, n), this.currentSkin = null, this.firstInit = !0, this.bindEvent(), this.skinSn = {};
    }
    return o(n, [ {
        key: "bindEvent",
        value: function() {
            var n = this;
            l.default.on(s.EVENT.INITRESPONSE, function(t, e) {
                var o = [];
                console.log("data", e);
                for (var i = 0; i < e.skin_list.length; ++i) o.push(e.skin_list[i].skin_id), n.skinSn[e.skin_list[i].skin_id] = e.skin_list[i].sn;
                e.current_skin || wx.setStorage({
                    key: "current_skin",
                    data: null
                }), n.update(e.current_skin && e.current_skin.skin_id, o);
            });
        }
    }, {
        key: "loadSkinForOtherMode",
        value: function(n, t) {
            var e = this;
            return this.skinSn[n] = t, console.log("??????? zaizhelile", n, t), new Promise(function(t, o) {
                n ? e.loadSkin([ n ]).then(e.loadSkinBlockInfo).then(e.loadBlockRes).then(function() {
                    t();
                }).catch(function(n) {
                    console.log("???????????????????? reject", n), o();
                }) : t();
            });
        }
    }, {
        key: "pipe",
        value: function(n, t) {
            var e = this;
            void 0 !== n ? this.loadSkin([ n ]).then(this.loadSkinBlockInfo).then(this.loadBlockRes).then(function() {
                return new Promise(function(t, e) {
                    console.log("currentSkin??????", n), wx.setStorage({
                        key: "current_skin",
                        data: n,
                        success: t,
                        fail: e
                    });
                });
            }).then(function() {
                return console.log("wow load skinIdlIstdasdasdasd", t), e.loadSkin(t);
            }).then(function(n) {
                var t = n.blockId;
                return new Promise(function(o, s) {
                    if (console.log("wowowowoowowowowowo??????", e.firstInit), e.firstInit) {
                        for (var l = [], r = 0; r < t.length; ++r) l.push("block_" + t[r]);
                        console.log("????dirs", l), i.Util.removeDirsNotInList(l);
                    } else e.firstInit = !1;
                    console.log("resolve-----------------------", n), o(n);
                });
            }).then(this.loadSkinBlockInfo).then(this.loadBlockRes).catch(function(n) {}) : void 0 !== t && t.length > 0 && this.loadSkin(t).then(this.loadSkinBlockInfo).then(this.loadBlockRes);
        }
    }, {
        key: "reset",
        value: function() {}
    }, {
        key: "loadSkin",
        value: function(n) {
            var e = this;
            return new Promise(function(o, i) {
                var s = wx.getStorageSync("skins") || {};
                console.log("skins", s, s[1], n);
                for (var l = [], a = {}, u = [], k = n.length - 1; k >= 0; --k) s[n[k]] ? (l = l.concat(s[n[k]].object_id_list), 
                console.log("ttttttt", s[n[k]]), n.splice(k, 1), Object.assign(a, a, s[n[k]])) : u.push({
                    skin_id: n[k],
                    sn: e.skinSn[n[k]]
                });
                console.log("hahahahahahha", n), n.length > 0 ? r.default.getSkin({
                    item_list: u
                }).then(function(n) {
                    if (console.log("loadSkin response", n), n && n.skin_list) {
                        console.log("response getskin", n, n.skin_list);
                        for (var r = 0; r < n.skin_list.length; ++r) {
                            var u = {};
                            u.object_id_list = [], u.skin_sn = e.skinSn[n.skin_list[r].skin_id];
                            for (var k = 0; k < n.skin_list[r].item_list.length; ++k) u.object_id_list.push(n.skin_list[r].item_list[k].object_id), 
                            u[n.skin_list[r].item_list[k].object_id] = n.skin_list[r].item_list[k].sn, a[n.skin_list[r].item_list[k].object_id] = n.skin_list[r].item_list[k].sn;
                            s[n.skin_list[r].skin_id] = u, s.block_sn = s.block_sn || {}, Object.assign(s.block_sn, s.block_sn, a), 
                            l = l.concat(u.object_id_list);
                        }
                        l = [].concat(t(new Set(l))), wx.setStorageSync("skins", s), o({
                            blockId: l,
                            blockSn: a
                        });
                    } else i(c.RESPONSEERROR);
                }).catch(function() {
                    i(c.REQUESTERROR);
                }) : (l = [].concat(t(new Set(l))), a = s.block_sn, console.log("blockidlist", l), 
                o({
                    blockId: l,
                    blockSn: a
                }));
            });
        }
    }, {
        key: "loadSkinBlockInfo",
        value: function(n) {
            var t = n.blockId, e = n.blockSn;
            return new Promise(function(n, o) {
                var i = t.concat(s.LOCALBLOCK).filter(function(n) {
                    return !s.LOCALBLOCK.includes(n);
                }), l = (wx.getStorageSync("blocks") || {
                    array: []
                }).array;
                if (i = i.concat(l).filter(function(n) {
                    return !l.includes(n);
                }), console.log("wtf not in local", i), 0 != i.length) {
                    console.log("??????", t, e);
                    for (var a = [], u = 0; u < i.length; ++u) a.push({
                        object_id: i[u],
                        sn: e[i[u]]
                    });
                    console.log("postDtaa", a), r.default.getBlock({
                        item_list: a
                    }).then(function(t) {
                        n(t.object_json_list);
                    }).catch(function() {
                        o(c.REQUESTERROR);
                    });
                } else n();
            });
        }
    }, {
        key: "loadBlockRes",
        value: function(n) {
            var t = this;
            return new Promise(function(e, o) {
                if (console.log("wowowoowowo loadBlockres", n), n) {
                    for (var s = [], l = 0; l < n.length; ++l) {
                        var r = new Promise(function(e, o) {
                            var s = 0;
                            n[l] = JSON.parse(n[l]);
                            var r = void 0 !== n[l].ad, c = n[l].block_res_list.length + (r ? 1 : 0), a = n[l].block_res_list.slice(0);
                            r && a.push({
                                path: "block_" + n[l].id + "/trade",
                                cdn_url: n[l].ad.trademark_url
                            });
                            for (var u = 0; u < a.length; ++u) i.Util.downloadSaveFile({
                                filePath: a[u].path,
                                url: a[u].cdn_url,
                                success: function(n) {
                                    ++s, console.log("count", s), s == c && e();
                                }.bind(t, l, u),
                                fail: function() {
                                    o();
                                }
                            });
                        }).then(function(t) {
                            var e = wx.getStorageSync("blocks") || {
                                array: []
                            };
                            e.array.push(n[t].id), e[n[t].id] = n[t], wx.setStorageSync("blocks", e);
                        }.bind(t, l));
                        s.push(r);
                    }
                    Promise.all(s).then(function() {
                        e();
                    }).catch(function() {
                        o();
                    });
                } else e();
            });
        }
    }, {
        key: "update",
        value: function(n, t) {
            this.pipe(n, t);
        }
    } ]), n;
}();

exports.default = a;