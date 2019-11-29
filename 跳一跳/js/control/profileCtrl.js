function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    return Array.isArray(e) ? e : Array.from(e);
}

function t(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function e(e, r) {
        var t = [], a = !0, o = !1, i = void 0;
        try {
            for (var n, s = e[Symbol.iterator](); !(a = (n = s.next()).done) && (t.push(n.value), 
            !r || t.length !== r); a = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (o) throw i;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
}, i = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var a = r[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(r, t, a) {
        return t && e(r.prototype, t), a && e(r, a), r;
    };
}(), n = (e(require("../store/storage")), e(require("../network/network"))), s = e(require("../pages/profile/profile")), l = e(require("../control/propertyCtrl")), u = function() {
    function e(r) {
        var a = this, i = r.game, l = r.onReturn, u = r.onGoRecord, d = r.scene, f = r.user_data;
        t(this, e);
        var c = this;
        this.game = i, this.onReturn = l, this.onGoRecord = u, this.scene = d, this.user_data = f, 
        this.profilePage = new s.default({
            game: i,
            onGoRecord: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                a.onGoRecord && a.onGoRecord(o({}, a.profileData, {
                    playback_id: a.user_data.playback_id,
                    routesArr: e
                }));
            },
            onLike: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                c.data && !c.data.praise_info.is_already_praise && (c.data.praise_info.is_already_praise = 1, 
                n.default.sendLikeTo(c.user_data.playback_id).then(function() {
                    c.profilePage.updateProfilePraiseStatus(1), c.game.reporter.rpLike({
                        open_user_id: c.user_data.playback_id
                    });
                }, function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    c.data.praise_info.is_already_praise = 0, c.game.reporter.rpLike({
                        open_user_id: c.user_data.playback_id,
                        result: 1,
                        praise_over_limit: 1 == e.overLimit ? 0 : 1
                    }), showToast({
                        title: "点赞失败",
                        icon: "none"
                    });
                }));
                for (var r = e.length - 1; r >= 0; r--) {
                    if ("start" == e[r]) {
                        c.game.reporter.rpStartPageFriendInfoLike();
                        break;
                    }
                    if ("gameOver" == e[r]) {
                        c.game.reporter.rpGameOverOnlike();
                        break;
                    }
                }
            },
            onReturn: function() {
                a.destory && a.destory(), a.onReturn && a.onReturn();
            }
        });
    }
    return i(e, [ {
        key: "init",
        value: function() {
            function e(e) {
                i.profilePage.show(e);
                var r = !!e.is_self;
                i.game && i.game.reporter && i.game.reporter.rpClickProfile(r);
            }
            var t = this, i = this;
            if (!i.user_data.playback_id && !i.user_data.open_user_id) return console.log("-----------------------------"), 
            console.log("-----------------------------"), console.log("-----------------------------"), 
            console.log("-----------------------------"), console.log("-----------------------------"), 
            console.log("-----------------------------"), void console.log(i.user_data);
            i.user_data.open_user_id && (i.user_data.playback_id = i.user_data.open_user_id), 
            wx.showLoading(), function(e) {
                Promise.all([ i.user_data.is_self ? l.default.getProps() : Promise.resolve(), n.default.getUserProfile(i.user_data.playback_id) ]).then(function(t) {
                    var o = a(t, 2), n = o[0], s = void 0 === n ? [] : n, l = o[1];
                    if (s && Array.isArray(s.property_list)) {
                        var u = r(s.property_list).slice(0);
                        s.property_list = u.filter(function(e) {
                            return 1 == e.item_id;
                        });
                    }
                    wx.hideLoading(), i.profileData = l, e(l, s);
                }, function(e) {
                    wx.hideLoading(), wx.showToast({
                        title: "获取数据失败",
                        icon: "none"
                    }), i.destory();
                });
            }(function(r) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                i.data = o({}, r, {
                    propsData: a,
                    is_self: t.user_data.is_self
                }), e(t.data);
            });
        }
    }, {
        key: "showPage",
        value: function() {
            this.profilePage.show(this.data);
            var e = !!this.data.is_self;
            this.game && this.game.reporter && this.game.reporter.rpClickProfile(e);
        }
    }, {
        key: "destory",
        value: function() {}
    } ]), e;
}();

exports.default = u;